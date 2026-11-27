const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function fixture(initial={}){
  const c={TextEncoder,Date,crypto};vm.createContext(c);
  for(const name of ['preferences','review','notebook','activity-progress','safety'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/catalyst-'+name+'.js'),'utf8'),c);
  const values=new Map(Object.entries(initial));
  const storage={get length(){return values.size;},key:i=>[...values.keys()][i],getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
  return {a:c.CatalystActivityProgress,s:c.CatalystSafety,values,storage};
}
const writing=(text='My draft')=>({draft:text,meaning:'My meaning'});
const item=(text='My draft')=>({step:4,completed:false,writing:{mr:writing(text)},updatedAt:1});
const data=text=>({version:1,items:{'my-word-order':item(text)}});

test('activity writes preserve other activities and meaning languages, reject stale editors, and separate owners and targets',()=>{
  const {a,storage}=fixture(),key=a.key('one','my');
  let first=a.commit(storage,'one','my','my-word-order',{writing:{mr:writing()}},null).items['my-word-order'];
  a.commit(storage,'one','my','my-negation',{step:2},null);
  const second=a.commit(storage,'one','my','my-word-order',{writing:{en:writing('English-context draft')}},first).items['my-word-order'];
  const before=storage.getItem(key);assert.throws(()=>a.commit(storage,'one','my','my-word-order',{completed:true},first),/changed in another view/);assert.equal(storage.getItem(key),before);
  assert.equal(second.writing.mr.draft,'My draft');assert.equal(second.writing.en.draft,'English-context draft');assert.equal(a.parse(before).items['my-negation'].step,2);
  a.commit(storage,'two','my','my-word-order',{step:1},null);a.commit(storage,'guest','my','my-word-order',{step:3},null);a.commit(storage,'one','ja','ja-topic-transitions',{step:2},null);
  assert.equal(storage.getItem(key),before);assert.notEqual(a.key('one:my','ja'),a.key('one','my'));
  assert.throws(()=>a.commit(storage,'loading','my','my-word-order',{},null));
});

test('damaged, future and invalid activity records block writes and remain exportable unchanged',()=>{
  for(const raw of ['{broken','null',JSON.stringify({version:2,items:{}}),JSON.stringify({version:1,items:{'my-word-order':{...item(),writing:{mr:{draft:123,meaning:''}}}}})]){
    const {a,s,storage}=fixture({'catalyst_activity_v1:one:my':raw});
    assert.throws(()=>a.commit(storage,'one','my','my-word-order',{step:1},null));assert.equal(storage.getItem(a.key('one','my')),raw);
    assert.equal(s.exportRecovery(storage,'one',{device:false}).records[0].raw,raw);
  }
  const {a,s,storage}=fixture();assert.throws(()=>a.commit(storage,'one','my','my-word-order',{writing:{mr:writing('x'.repeat(4001))}},null));assert.equal(storage.length,0);
  s.setLocked(true);assert.throws(()=>a.commit(storage,'one','my','my-word-order',{step:1},null),/update/);assert.equal(storage.length,0);
});

test('recovery includes scoped activity data and accepts all 42 selected records without exporting another account or auth',()=>{
  const {a,s,storage}=fixture({'catalyst_activity_v1:two:my':'OTHER_ACCOUNT','sb-token':'AUTH_TOKEN'});
  for(const owner of ['one','guest'])for(const language of ['my','ja','zh','mr','en']){
    storage.setItem(a.key(owner,language),JSON.stringify(data(owner+' '+language)));
    storage.setItem('catalyst_notebook_v1:'+owner+':'+language,'{"version":1,"entries":[]}');
    storage.setItem('catalyst_review_v1:'+owner+':'+language,'{"version":1,"items":{},"states":{}}');
    storage.setItem('catalyst_drafts_v1:'+owner+':'+language,'{"version":1,"drafts":{}}');
  }
  storage.setItem('catalyst_settings','{}');storage.setItem('catalyst_audio_prefs','{}');
  const own=s.exportRecovery(storage,'one',{device:false});assert.equal(own.records.length,20);assert.ok(own.records.every(r=>r.owner==='current'));
  const all=s.exportRecovery(storage,'one',{guest:true,device:true}),raw=JSON.stringify(all);
  assert.equal(all.records.length,42);assert.equal(all.records.filter(r=>r.type==='activity').length,10);assert.doesNotMatch(raw,/OTHER_ACCOUNT|AUTH_TOKEN/);
  assert.equal(s.parseRecovery(raw,'one').records.length,42);assert.throws(()=>s.parseRecovery(raw,'two'),/same account/);
  const target=fixture();target.s.commitRecovery(target.storage,target.s.planRecovery(target.storage,'one',target.s.parseRecovery(raw,'one')));
  assert.equal(target.storage.getItem(a.key('one','my')),JSON.stringify(data('one my')));assert.equal(target.storage.getItem(a.key('guest','ja')),JSON.stringify(data('guest ja')));
});

test('activity recovery retains conflicting writing, merges missing activities and repeats without history growth',()=>{
  const {a,s,storage,values}=fixture({'catalyst_activity_v1:one:my':JSON.stringify(data('Current draft'))});
  const incoming=data('Incoming conflicting draft');incoming.items['my-negation']=item('Missing activity');
  const backup={format:'catalyst-recovery',version:1,owner:{kind:'account',id:'one'},records:[{type:'activity',owner:'current',language:'my',raw:JSON.stringify(incoming)}],copies:null,journal:null};
  s.commitRecovery(storage,s.planRecovery(storage,'one',s.parseRecovery(JSON.stringify(backup),'one')));
  const saved=a.parse(storage.getItem(a.key('one','my')));assert.equal(saved.items['my-word-order'].writing.mr.draft,'Current draft');assert.equal(saved.items['my-negation'].writing.mr.draft,'Missing activity');
  assert.ok(JSON.parse(storage.getItem(s.archiveKey('one'))).copies.some(copy=>copy.raw===JSON.stringify(incoming)));
  const before=Object.fromEntries(values);assert.equal(s.planRecovery(storage,'one',backup).changes.length,0);
  for(let i=0;i<8;i++){const exported=s.exportRecovery(storage,'one'),plan=s.planRecovery(storage,'one',s.parseRecovery(JSON.stringify(exported),'one'));assert.equal(plan.changes.length,0);s.commitRecovery(storage,plan);}
  assert.deepEqual(Object.fromEntries(values),before);
});
