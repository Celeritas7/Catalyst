const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDBFactory}=require('fake-indexeddb');
require('../js/catalyst-account.js');require('../js/catalyst-vocabulary.js');require('../js/catalyst-patterns.js');require('../js/catalyst-snapshots.js');
const api=globalThis.CatalystSnapshots;
function fixture(){
  const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
  const identity={scope:'a',owner:{id:'a'},epoch:1,prepared:true,online:true};
  const account={getSnapshot:()=>identity,ticket:()=>({owner:identity.owner?.id,epoch:identity.epoch}),valid:t=>t.owner===identity.owner?.id&&t.epoch===identity.epoch,disable:()=>{identity.prepared=false;}};
  const config={allowed:true,contract:{contract:1,mode:'legacy',revision:1,languages:null,topics:null,features:null},hidden:[],failure:null,delay:null,calls:[],tables:{burmese_app_words:[{id:'apple',burmese_word:'ပန်းသီး',english_meaning:'apple'}],burmese_app_user_state:[{id:1,user_id:'a',word_id:'apple',word_type:'word',mastery_level:4}]}};
  const client={rpc:async(name)=>{config.calls.push(name);if(config.rpcError)return {error:config.rpcError};return {data:name==='kg_chart_is_allowed'?config.allowed:name==='kg_chart_u3_my_access_snapshot'?config.contract:{contract:1,topics:config.hidden,groups:[]}};},from(table){
    let start=0,end=499;const filters=[];config.calls.push(table);
    const query={select(){return query;},order(){return query;},eq:(k,v)=>{filters.push(r=>r[k]===v);return query;},in:(k,v)=>{filters.push(r=>v.includes(r[k]));return query;},not:(k,op,v)=>{filters.push(r=>r[k]!==v);return query;},range:(a,b)=>{start=a;end=b;return query;},then:async(resolve,reject)=>{try{if(config.delay)await config.delay;return resolve(config.failure?.table===table?{error:config.failure.error,data:null}:config.nullTable===table?{data:null}:{data:(config.tables[table]||[]).filter(r=>filters.every(fn=>fn(r))).slice(start,end+1)});}catch(e){return reject(e);}}};return query;
  }};
  const indexedDB=new IDBFactory(),snapshots=api.create({indexedDB,storage,account,client,now:()=> '2026-11-25T02:00:00Z'});
  return {storage,values,identity,account,config,client,indexedDB,snapshots,d:api.descriptor('a','my','burmese')};
}
test('snapshots keep own complete paginated provider semantics and exclude credentials; empty is a valid separate result',async()=>{
  const f=fixture();f.config.tables.burmese_app_words=Array.from({length:1001},(_,i)=>({id:String(i),burmese_word:'word'+i,english_meaning:'gloss',access_token:'SECRET'}));
  f.config.tables.burmese_app_user_state=[{id:1,user_id:'a',word_id:'1000',word_type:'word',mastery_level:4},{id:2,user_id:'b',word_id:'0',word_type:'word',mastery_level:5}];
  const record=await f.snapshots.refresh(f.d,{persist:true});assert.equal(record.data.words.length,1001);assert.equal(record.data.linked,1);assert.equal(record.data.words[1000].label,'Practice level 4/5');assert.ok(!JSON.stringify(record).includes('SECRET'));
  f.config.tables={};await f.snapshots.refresh(f.d,{persist:true});assert.equal((await f.snapshots.read(f.d)).data.words.length,0);await f.snapshots.close();
});
test('offline reads are isolated by owner, language and provider; network and incomplete responses retain the last complete snapshot',async()=>{
  const f=fixture();await f.snapshots.refresh(f.d,{persist:true});const saved=await f.snapshots.read(f.d);
  f.config.failure={table:'burmese_app_words',error:{message:'network failed'}};let result=await f.snapshots.load(f.d);assert.equal(result.stale,true);assert.equal(result.words.length,1);assert.equal(result.savedAt,saved.savedAt);
  f.config.failure=null;f.config.nullTable='burmese_app_user_state';result=await f.snapshots.load(f.d);assert.equal(result.stale,true);assert.deepEqual(await f.snapshots.read(f.d),saved);
  f.identity.online=false;assert.equal((await f.snapshots.load(f.d)).words.length,1);assert.equal(await f.snapshots.read({...f.d,owner:'b'}),null);assert.equal(await f.snapshots.read({...f.d,language:'ja'}),null);assert.equal(await f.snapshots.read({...f.d,source:'kg'}),null);
  f.identity.owner={id:'b'};f.identity.epoch++;assert.equal(await f.snapshots.read(f.d),null);await f.snapshots.close();
});
test('authoritative denial locks saved source persistently, keeps writing, and requires a complete explicit refresh',async()=>{
  const f=fixture();await f.snapshots.refresh(f.d,{persist:true});f.storage.setItem('notebook','original');
  f.config.failure={table:'burmese_app_user_state',error:{code:'42501'}};await assert.rejects(f.snapshots.load(f.d),/unavailable/);await assert.rejects(f.snapshots.read(f.d),/locked/);assert.equal(f.storage.getItem('notebook'),'original');
  f.identity.online=false;await assert.rejects(f.snapshots.load(f.d),/locked/);f.identity.online=true;f.config.failure=null;await assert.rejects(f.snapshots.load(f.d),/locked/);
  await f.snapshots.refresh(f.d,{persist:true});assert.equal((await f.snapshots.read(f.d)).data.words.length,1);await f.snapshots.close();
});
test('late refresh on account or target switch is discarded without replacing the old snapshot',async()=>{
  for(const changeAccount of [false,true]){
    const f=fixture();await f.snapshots.refresh(f.d,{persist:true});let release,current=true;f.config.delay=new Promise(r=>{release=r;});
    const pending=f.snapshots.refresh(f.d,{persist:true,current:()=>current});await new Promise(r=>setTimeout(r,5));
    if(changeAccount){f.identity.owner={id:'b'};f.identity.epoch++;}else current=false;
    release();await assert.rejects(pending,e=>e.code==='CANCELLED');f.identity.owner={id:'a'};f.identity.epoch++;f.config.delay=null;assert.equal((await f.snapshots.read(f.d)).data.words[0].id,'apple');await f.snapshots.close();
  }
});
test('KG snapshot preparation needs deployed private visibility and compatible permissions; excludes hidden topics and detects changes',async()=>{
  const f=fixture(),d=api.descriptor('a','my','kg');f.config.rpcError={code:'PGRST202'};await assert.rejects(f.snapshots.refresh(d,{persist:true}));assert.equal(f.config.calls.some(c=>c.startsWith('kg_chart_vocabulary')),false);
  f.config.rpcError=null;f.config.contract.mode='restricted';await assert.rejects(f.snapshots.refresh(d,{persist:true}),/permission contract/);
  f.config.contract.mode='legacy';f.config.tables.kg_chart_vocabulary_translations=[{vocabulary_id:'public',language_code:'my',native_text:'Public',vocabulary:{topic_id:'food'}},{vocabulary_id:'private',language_code:'my',native_text:'Private',vocabulary:{topic_id:'private'}},{vocabulary_id:'no-topic',language_code:'my',native_text:'Missing topic'}];
  f.config.hidden=['private'];const record=await f.snapshots.refresh(d,{persist:true});assert.deepEqual(record.data.words.map(w=>w.text),['Public']);
  let calls=0;const rpc=f.client.rpc;f.client.rpc=async(name)=>{const result=await rpc(name);if(name==='kg_chart_u3_my_access_snapshot')result.data={...result.data,revision:++calls};return result;};
  await assert.rejects(f.snapshots.refresh(d,{persist:true}),/permissions changed/);await assert.rejects(f.snapshots.read(d),/locked/);await f.snapshots.close();
});
test('learned nouns survive complete eligibility pagination and reject duplicate quiz retries and private words',async()=>{
  const f=fixture(),d=api.descriptor('a','my','kg','patterns');
  f.config.tables={kg_chart_topic_completions:[],kg_chart_quiz_sessions:Array.from({length:1001},(_,i)=>({id:'s'+i,user_id:'a',language_code:'my'})),kg_chart_quiz_answers:[{id:'one',session_id:'s1000',vocabulary_id:'apple',is_correct:true},{id:'one',session_id:'s1000',vocabulary_id:'apple',is_correct:true},{id:'two',session_id:'s1000',vocabulary_id:'water',is_correct:true},{id:'three',session_id:'s1000',vocabulary_id:'water',is_correct:true}],kg_chart_vocabulary_translations:[{vocabulary_id:'apple',language_code:'my',native_text:'ပန်းသီး',vocabulary:{english_text:'apple',topic_id:'food'}},{vocabulary_id:'water',language_code:'my',native_text:'ရေ',vocabulary:{english_text:'water',topic_id:'drink'}}]};
  let result=await f.snapshots.refresh(d,{persist:true});assert.deepEqual(result.data.words.map(w=>w.id),['water']);f.config.hidden=['drink'];result=await f.snapshots.refresh(d,{persist:true});assert.equal(result.data.words.length,0);await f.snapshots.close();
});
test('storage rejection preserves snapshot; failed denial persistence disables offline account access',async()=>{
  const f=fixture();await f.snapshots.refresh(f.d,{persist:true});const original=await f.snapshots.read(f.d);
  const db=await new Promise(resolve=>{const request=f.indexedDB.open(api.DB,1);request.onsuccess=()=>resolve(request.result);});
  const proto=Object.getPrototypeOf(db.transaction(api.STORE,'readonly').objectStore(api.STORE)),put=proto.put;
  try{proto.put=function(){throw Error('Quota exceeded');};await assert.rejects(f.snapshots.refresh(f.d,{persist:true}),/Quota/);}finally{proto.put=put;}
  assert.deepEqual(await f.snapshots.read(f.d),original);f.storage.setItem=()=>{throw Error('Full');};f.snapshots.lock(f.d);assert.equal(f.identity.prepared,false);assert.equal(await f.snapshots.read(f.d),null);db.close();await f.snapshots.close();
});
test('a concurrent source lock defeats both a late successful download and a stale-on-network-error fallback',async()=>{
  for(const networkError of [true,false]){
    const f=fixture();await f.snapshots.refresh(f.d,{persist:true});let release;f.config.delay=new Promise(r=>{release=r;});
    if(networkError)f.config.failure={table:'burmese_app_words',error:{message:'network failed'}};
    const job=f.snapshots.load(f.d);await new Promise(r=>setTimeout(r,5));f.snapshots.lock(f.d);release();
    await assert.rejects(job,/locked|changed/);await assert.rejects(f.snapshots.read(f.d),/locked/);await f.snapshots.close();
  }
});
test('future or corrupt snapshot formats remain unchanged even on explicit preparation',async()=>{
  const f=fixture();await f.snapshots.refresh(f.d,{persist:true});const db=await new Promise(resolve=>{const request=f.indexedDB.open(api.DB,1);request.onsuccess=()=>resolve(request.result);});
  const original={version:99,...f.d,raw:'preserve this'};await new Promise((resolve,reject)=>{const tx=db.transaction(api.STORE,'readwrite');tx.objectStore(api.STORE).put(original,api.key(f.d));tx.oncomplete=resolve;tx.onerror=reject;});
  await assert.rejects(f.snapshots.refresh(f.d,{persist:true}),/unreadable/);await assert.rejects(f.snapshots.read(f.d),/unreadable/);
  const retained=await new Promise(resolve=>{db.transaction(api.STORE,'readonly').objectStore(api.STORE).get(api.key(f.d)).onsuccess=e=>resolve(e.target.result);});assert.deepEqual(retained,original);db.close();await f.snapshots.close();
});
