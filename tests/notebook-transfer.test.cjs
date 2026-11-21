const assert=require('node:assert/strict');
const {test}=require('node:test');
require('../js/catalyst-notebook.js');
const n=globalThis.CatalystNotebook;
const empty=()=>n.parse(null);
const sentence=(patch={})=>({id:'sample-a',original:'စာ',lesson:'verb_final',meaning:'सराव',meaningLanguage:'mr',createdAt:'2026-11-22T00:00:00.000Z',corrections:[],...patch});
const note=(text='note',createdAt='2026-11-22T00:01:00.000Z')=>({text,createdAt,source:'user-entered'});
const file=entries=>JSON.stringify({version:1,language:'my',entries});
const backup=entries=>n.parseImport(file(entries),'my');
const storage=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),map};};

test('restores version 1 exports without losing originals, meanings, notes or dates',()=>{
 const input=sentence({corrections:[note()]});
 const result=n.merge(empty(),backup([input]));
 assert.deepEqual(result.data.entries,[input]);
 assert.equal(result.summary.added,1);
 assert.deepEqual(n.parse(JSON.stringify(result.data)),result.data);
 const again=n.merge(result.data,backup([input]));
 assert.deepEqual(again.data,result.data);assert.equal(again.summary.unchanged,1);
 assert.deepEqual(n.parseImport('\uFEFF'+file([input]),'my').entries,[input]);
});
test('merges missing notes and never removes newer local notes on old backup import',()=>{
 const local={version:1,entries:[sentence({corrections:[note('local')]})]};
 const snapshot=JSON.stringify(local);
 const result=n.merge(local,backup([sentence({corrections:[note('imported'),note('imported')]})]));
 assert.equal(result.summary.updated,1);assert.equal(result.summary.notesAdded,1);
 assert.deepEqual(result.data.entries[0].corrections,[note('local'),note('imported')]);
 assert.equal(JSON.stringify(local),snapshot);
 assert.deepEqual(n.merge(result.data,backup([sentence()])).data,result.data);
});
test('keeps conflicting original/meaning versions separately and reimport is idempotent',()=>{
 const local={version:1,entries:[sentence(),sentence({id:'sample-a-import-1',original:'another original'})]};
 const incoming=backup([sentence({original:'changed original',corrections:[note()]})]);
 const result=n.merge(local,incoming);
 assert.equal(result.summary.conflictCopies,1);assert.equal(result.data.entries.length,3);
 assert.equal(result.data.entries[0].id,'sample-a-import-2');
 assert.deepEqual(result.data.entries.slice(1),local.entries);
 assert.deepEqual(n.merge(result.data,incoming).data,result.data);
 const meaningChange=n.merge(result.data,backup([sentence({meaning:'different meaning'})]));
 assert.equal(meaningChange.summary.conflictCopies,1);
});
test('handles HTML as literal writing and prevents duplicate IDs or unsupported file content',()=>{
 const literal=sentence({original:'<img src=x onerror=alert(1)>'});
 assert.equal(backup([literal]).entries[0].original,literal.original);
 for(const raw of ['null','[]','{}','{',JSON.stringify({version:2,language:'my',entries:[]}),file([sentence(),sentence()]),file([sentence({meaning:{}})]),file([sentence({createdAt:'invalid'})]),file([sentence({corrections:[{text:'note'}]})]),file([sentence({unexpected:true})]),file([sentence({original:' '})]),file([sentence({lesson:'javascript:alert(1)'})])])assert.throws(()=>n.parseImport(raw,'my'));
 assert.throws(()=>n.parseImport(file([sentence()]),'ja'),/Switch the learning language/);
 assert.throws(()=>n.parseImport(JSON.stringify({version:1,entries:[]}), 'my'),/language/);
 assert.throws(()=>n.parseImport('x'.repeat(n.MAX_IMPORT_BYTES+1),'my'),/5 MB/);
 assert.throws(()=>n.parseImport(file([sentence({original:'x'.repeat(5001)})]),'my'));
 assert.deepEqual(backup([]).entries,[]);
});
test('writes only to the selected account and language; refuses corrupt or unavailable storage',()=>{
 const s=storage();
 n.commit(s,'guest','my',()=>({version:1,entries:[sentence()]}));
 n.commit(s,'account-a','ja',()=>({version:1,entries:[sentence({id:'japanese'})]}));
 assert.equal(n.parse(s.getItem(n.key('guest','my'))).entries[0].id,'sample-a');
 assert.equal(n.parse(s.getItem(n.key('account-a','ja'))).entries[0].id,'japanese');
 assert.equal(s.getItem(n.key('account-a','my')),null);
 assert.throws(()=>n.commit(s,'loading','my',()=>empty()));
 s.setItem(n.key('guest','my'),'{broken');
 assert.throws(()=>n.commit(s,'guest','my',()=>empty()));
 assert.equal(s.getItem(n.key('guest','my')),'{broken');
 const quota={getItem:()=>JSON.stringify({version:1,entries:[sentence()]}),setItem:()=>{throw new Error('quota');}};
 assert.throws(()=>n.commit(quota,'guest','my',data=>n.merge(data,backup([sentence({id:'new',original:'new'})])).data),/quota/);
 assert.equal(n.parse(quota.getItem()).entries.length,1);
});
test('commit rereads latest entries before applying an import',()=>{
 const s=storage(),saved={version:1,entries:[sentence({id:'other-tab',original:'Other tab'})]};
 s.setItem(n.key('guest','my'),JSON.stringify(saved));
 const result=n.commit(s,'guest','my',current=>n.merge(current,backup([sentence()])).data);
 assert.equal(result.entries.length,2);assert.deepEqual(result.entries[1],saved.entries[0]);
});
test('guided writing links its source; repeated saves preserve notes, edits create new attempts',()=>{
 const pilot={id:'my-word-order',language:'my',concept:'verb_final'};
 const input={pilot,targetLanguage:'my',...sentence(),id:'guided'};
 const first=n.addFromActivity(empty(),input);
 assert.equal(first.added,true);assert.equal(first.data.entries[0].activityId,pilot.id);
 assert.equal(first.data.entries[0].lesson,'verb_final');
 const withNote=n.correct(first.data,'guided','My note','2026-11-22T00:02:00Z');
 const repeated=n.addFromActivity(withNote,{...input,id:'next-id',createdAt:'2026-11-23T00:00:00Z'});
 assert.equal(repeated.added,false);assert.deepEqual(repeated.data,withNote);
 const edit=n.addFromActivity(withNote,{...input,id:'next-id',original:'Changed writing'});
 assert.equal(edit.added,true);assert.equal(edit.data.entries.length,2);assert.deepEqual(edit.data.entries[1],withNote.entries[0]);
 assert.throws(()=>n.addFromActivity(empty(),{...input,targetLanguage:'ja'}),/another learning language/);
 assert.throws(()=>n.addFromActivity(empty(),{...input,original:' '}));
 const noLesson=n.addFromActivity(empty(),{...input,pilot:{id:'ja-topic-transitions',language:'ja'},targetLanguage:'ja'});
 assert.equal(noLesson.data.entries[0].lesson,'');
 assert.deepEqual(n.parseImport(JSON.stringify({language:'my',...first.data}),'my').entries,first.data.entries);
});
