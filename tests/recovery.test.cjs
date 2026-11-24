const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function fixture(initial={}){
  const context={TextEncoder,Date,crypto};vm.createContext(context);
  for(const file of ['preferences','review','notebook','safety'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/catalyst-'+file+'.js'),'utf8'),context);
  const values=new Map(Object.entries(initial));let count=0,failAt=Infinity;
  const storage={get length(){return values.size;},key:i=>[...values.keys()][i],getItem:key=>values.has(key)?values.get(key):null,removeItem:key=>values.delete(key),setItem:(key,value)=>{if(++count===failAt)throw new DOMException('Full','QuotaExceededError');values.set(key,value);}};
  return {s:context.CatalystSafety,n:context.CatalystNotebook,r:context.CatalystReview,values,storage,failNext:n=>{failAt=count+n;}};
}
const plain=value=>JSON.parse(JSON.stringify(value));
const notebook=(original='Original',notes=[])=>({version:1,entries:[{id:'original',original,meaning:'Meaning',meaningLanguage:'en',lesson:'',createdAt:'2026-11-24',corrections:notes.map(text=>({text,source:'user-entered',createdAt:'2026-11-24'}))}]});
function backup(records,owner={kind:'account',id:'one'}){return {format:'catalyst-recovery',version:1,owner,records,copies:null,journal:null};}

test('malformed and future settings remain byte-for-byte unchanged; valid writes reread newer history',()=>{
  for(const raw of ['{broken','null',JSON.stringify({preferencesVersion:99}),JSON.stringify({learned:'wrong'})]){
    const f=fixture({catalyst_settings:raw});assert.throws(()=>f.s.writeSettings(f.storage,{targetLanguage:'my'}));assert.equal(f.storage.getItem('catalyst_settings'),raw);
  }
  const f=fixture({catalyst_settings:JSON.stringify({learned:['old'],activities:{pilot:{draft:'Keep me'}}})});
  f.s.writeSettings(f.storage,previous=>({learned:[...previous.learned,'new']}));
  const next=f.s.writeSettings(f.storage,{targetLanguage:'my'});assert.deepEqual(plain(next.learned),['old','new']);assert.equal(next.activities.pilot.draft,'Keep me');
  const raw=f.storage.getItem('catalyst_settings');f.failNext(1);assert.throws(()=>f.s.writeSettings(f.storage,{reading:false}),/Full/);assert.equal(f.storage.getItem('catalyst_settings'),raw);
});

test('drafts survive reload, remain owner/language/tab specific, and failed saves prevent updates',()=>{
  const f=fixture(),fields={original:'ကျွန်တော်',meaning:'Meaning',lesson:'verb-final',corrections:{original:'Unfinished note'}};
  f.s.saveDraft(f.storage,'one','my','tab-a','notebook','mr',fields);
  f.s.saveDraft(f.storage,'one','my','tab-b','notebook','mr',{...fields,original:'Second tab'});
  assert.equal(f.s.hasDirty(),true);
  const restored=fixture(Object.fromEntries(f.values));assert.equal(restored.s.listDrafts(restored.storage,'one','my','notebook','mr').length,2);
  assert.equal(restored.s.listDrafts(restored.storage,'two','my','notebook','mr').length,0);assert.equal(restored.s.listDrafts(restored.storage,'one','ja','notebook','mr').length,0);
  const old=restored.s.listDrafts(restored.storage,'one','my','notebook','mr').find(d=>d.id==='tab-a');
  restored.s.saveDraft(restored.storage,'one','my','tab-a','notebook','mr',{...fields,original:'Newer copy'});
  restored.s.removeDraft(restored.storage,'one','my','tab-a',old);assert.equal(restored.s.listDrafts(restored.storage,'one','my','notebook','mr').length,2);
  const before=restored.storage.getItem(restored.s.draftKey('one','my'));restored.failNext(1);
  assert.throws(()=>restored.s.saveDraft(restored.storage,'one','my','tab-c','notebook','mr',fields),/Full/);
  restored.s.dirty('draft:tab-c',false);assert.equal(restored.s.hasDirty(),true);assert.equal(restored.storage.getItem(restored.s.draftKey('one','my')),before);
  assert.equal(restored.s.listDrafts(restored.storage,'one','my','notebook','mr').length,3);
  assert.throws(()=>restored.s.saveDraft(restored.storage,'loading','my','nope','notebook','mr',fields));
  restored.s.setLocked(true);assert.throws(()=>restored.s.writeSettings(restored.storage,{}));assert.throws(()=>restored.n.commit(restored.storage,'one','my',d=>d));
});

test('recovery export includes only selected scopes and raw damaged data, never auth or another account',()=>{
  const f=fixture({'catalyst_settings':'{damaged','catalyst_notebook_v1:one:my':'my notes','catalyst_notebook_v1:one:ja':'ja notes','catalyst_notebook_v1:guest:my':'guest notes','catalyst_notebook_v1:two:my':'OTHER_PRIVATE','sb-synthetic-auth-token':'SECRET_TOKEN','sibling-settings':'SIBLING'});
  let exported=f.s.exportRecovery(f.storage,'one',{device:false});assert.equal(exported.records.length,2);
  assert.doesNotMatch(JSON.stringify(exported),/OTHER_PRIVATE|SECRET_TOKEN|SIBLING|guest notes|damaged/);
  exported=f.s.exportRecovery(f.storage,'one',{guest:true,device:true});assert.equal(exported.records.length,4);assert.equal(exported.records.find(r=>r.type==='settings').raw,'{damaged');
  assert.doesNotMatch(JSON.stringify(exported),/OTHER_PRIVATE|SECRET_TOKEN|SIBLING/);
  assert.throws(()=>f.s.parseRecovery(JSON.stringify(exported),'two'),/same account/);assert.throws(()=>f.s.exportRecovery(f.storage,'loading'));
});

test('recovery merges notebook notes and conflicts without replacing originals or newer review schedules; reimport is idempotent',()=>{
  const f=fixture({'catalyst_notebook_v1:one:my':JSON.stringify(notebook('Original',['newer note'])),'catalyst_settings':JSON.stringify({preferencesVersion:2,targetLanguage:'my',learned:['local'],practice:{answers:12,correct:8}})});
  const localReview=f.r.record(f.r.empty(),{id:'q',conceptId:'verb-final',skill:'understanding'},{correct:true},2000000000000);
  const incomingReview=f.r.record(f.r.empty(),{id:'q',conceptId:'verb-final',skill:'understanding'},{correct:false},1700000000000);
  f.storage.setItem(f.r.storageKey('one','my'),JSON.stringify(localReview));
  const data=backup([
    {owner:'current',language:'my',type:'notebook',raw:JSON.stringify(notebook('Original',['older note']))},
    {owner:'current',language:'my',type:'review',raw:JSON.stringify(incomingReview)},
    {owner:'device',type:'settings',raw:JSON.stringify({preferencesVersion:2,targetLanguage:'ja',learned:['incoming'],practice:{answers:4,correct:1}})},
  ]);
  const plan=f.s.planRecovery(f.storage,'one',f.s.parseRecovery(JSON.stringify(data),'one'));assert.equal(plan.summary.notes,1);assert.equal(plan.summary.copies,2);
  f.s.commitRecovery(f.storage,plan);let saved=JSON.parse(f.storage.getItem('catalyst_notebook_v1:one:my'));
  assert.equal(saved.entries[0].original,'Original');assert.deepEqual(saved.entries[0].corrections.map(c=>c.text),['newer note','older note']);
  assert.deepEqual(JSON.parse(f.storage.getItem(f.r.storageKey('one','my'))),plain(localReview));
  const settings=JSON.parse(f.storage.getItem('catalyst_settings'));assert.deepEqual(settings.learned,['local','incoming']);assert.equal(settings.practice.answers,12);assert.equal(settings.targetLanguage,'my');
  const before=Object.fromEntries(f.values);const repeat=f.s.planRecovery(f.storage,'one',data);assert.equal(repeat.changes.length,0);f.s.commitRecovery(f.storage,repeat);assert.deepEqual(Object.fromEntries(f.values),before);
  const conflict=backup([{owner:'current',language:'my',type:'notebook',raw:JSON.stringify(notebook('Conflicting original'))}]);
  f.s.commitRecovery(f.storage,f.s.planRecovery(f.storage,'one',conflict));saved=JSON.parse(f.storage.getItem('catalyst_notebook_v1:one:my'));assert.equal(saved.entries.length,2);assert.ok(saved.entries.some(e=>e.original==='Original'));
  assert.equal(f.s.planRecovery(f.storage,'one',conflict).changes.length,0);
});

test('damaged current records are preserved and incoming snapshots remain recoverable without executable storage keys',()=>{
  const f=fixture({'catalyst_notebook_v1:one:my':'{raw damage','sibling-settings':'retain'});
  const data=backup([{owner:'current',language:'my',type:'notebook',raw:JSON.stringify(notebook())}]);
  data.journal=JSON.stringify({changes:[{key:'sibling-settings',after:'overwrite'}]});
  const plan=f.s.planRecovery(f.storage,'one',data);assert.equal(plan.summary.damaged,1);f.s.commitRecovery(f.storage,plan);
  assert.equal(f.storage.getItem('catalyst_notebook_v1:one:my'),'{raw damage');assert.equal(f.storage.getItem('sibling-settings'),'retain');
  assert.equal(JSON.parse(f.storage.getItem(f.s.archiveKey('one'))).copies.length,2);
  for(const invalid of [backup([{type:'arbitrary',owner:'current',raw:'x'}]),backup([{type:'notebook',owner:'current',language:'my',raw:'x'}],{kind:'guest'}),{...data,version:9}])assert.throws(()=>f.s.parseRecovery(JSON.stringify(invalid),'one'));
});

test('stale preview refuses writes, journal quota failure changes nothing, and partial restore retains both sides',()=>{
  const data=backup([{owner:'current',type:'notebook',language:'my',raw:JSON.stringify(notebook())},{owner:'device',type:'settings',raw:JSON.stringify({learned:['incoming']})}]);
  const stale=fixture(),plan=stale.s.planRecovery(stale.storage,'one',data);stale.storage.setItem('catalyst_settings','{"learned":["new"]}');
  assert.throws(()=>stale.s.commitRecovery(stale.storage,plan),/changed since preview/);assert.equal(stale.storage.getItem('catalyst_notebook_v1:one:my'),null);
  const full=fixture(),before=Object.fromEntries(full.values);full.failNext(1);assert.throws(()=>full.s.commitRecovery(full.storage,full.s.planRecovery(full.storage,'one',data)),/Full/);assert.deepEqual(Object.fromEntries(full.values),before);
  const partial=fixture();partial.failNext(3);assert.throws(()=>partial.s.commitRecovery(partial.storage,partial.s.planRecovery(partial.storage,'one',data)),/Full/);
  const journal=JSON.parse(partial.storage.getItem(partial.s.journalKey('one')));assert.equal(journal.changes.length,2);assert.ok(journal.changes.every(c=>c.before===null&&typeof c.after==='string'));
  assert.ok(partial.s.exportRecovery(partial.storage,'one').journal);assert.equal(partial.storage.getItem('catalyst_settings'),null);
  const previousJournal=partial.storage.getItem(partial.s.journalKey('one'));
  const next=backup([{owner:'device',type:'settings',raw:JSON.stringify({learned:['different']})}]);
  partial.s.commitRecovery(partial.storage,partial.s.planRecovery(partial.storage,'one',next));
  assert.ok(JSON.parse(partial.storage.getItem(partial.s.archiveKey('one'))).copies.some(copy=>copy.raw===previousJournal));
});

test('interleaved tab saves use separate atomic slots; export and restore include all drafts',()=>{
  const f=fixture(),other=fixture(),fields={draft:'First',meaning:'Meaning'};let interleave=true;
  const storage={...f.storage,get length(){return f.values.size;},setItem:(key,value)=>{
    if(interleave){interleave=false;other.s.saveDraft(f.storage,'one','my','second','activity','pilot:mr',{...fields,draft:'Second'});}
    f.storage.setItem(key,value);
  }};
  f.s.saveDraft(storage,'one','my','first','activity','pilot:mr',fields);
  assert.equal(f.s.listDrafts(f.storage,'one','my','activity','pilot:mr').length,2);
  const exported=f.s.exportRecovery(f.storage,'one'),target=fixture();assert.equal(exported.records.length,1);
  target.s.commitRecovery(target.storage,target.s.planRecovery(target.storage,'one',target.s.parseRecovery(JSON.stringify(exported),'one')));
  assert.equal(target.s.listDrafts(target.storage,'one','my','activity','pilot:mr').length,2);
  const plan=f.s.planRecovery(f.storage,'one',exported);other.s.saveDraft(f.storage,'one','my','third','activity','pilot:mr',fields);
  assert.throws(()=>f.s.commitRecovery(f.storage,plan),/changed since preview/);
});
