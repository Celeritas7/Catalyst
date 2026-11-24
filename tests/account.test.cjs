const {test}=require('node:test'),assert=require('node:assert/strict');
require('../js/catalyst-account.js');
const api=globalThis.CatalystAccount,authKey='sdk-test-auth-token';
const pause=()=>new Promise(resolve=>setTimeout(resolve,5));
const memory=initial=>{const map=new Map(Object.entries(initial||{}));return {map,getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};};
const marker=id=>JSON.stringify({version:1,enabled:true,revision:'test',owner:{id,label:id+'@example.invalid'},verifiedAt:'2026-11-25T01:00:00Z'});
function fixture({id='a',prepared=true,online=true,storage=memory(),getUser,signOut}={}){
  const events=new EventTarget();let callback,connected=online;
  const session=()=>id?{user:{id,email:id+'@example.invalid'},access_token:'SYNTHETIC_SECRET',expires_at:1}:null;
  const persist=()=>{if(id)storage.setItem(authKey,JSON.stringify(session()));else storage.removeItem(authKey);};persist();
  if(prepared&&!storage.getItem(api.KEY))storage.setItem(api.KEY,marker(id));
  const client={auth:{getSession:async()=>({data:{session:session()}}),getUser:getUser||(async()=>({data:{user:session()?.user}})),onAuthStateChange:fn=>{callback=fn;return {data:{subscription:{unsubscribe(){}}}};},signOut:signOut||(async()=>{id=null;persist();callback?.('SIGNED_OUT',null);return {error:null};})}};
  const account=api.create({client,storage,authKey,events,online:()=>connected,timeout:40});
  function change(next,event='SIGNED_IN'){id=next;persist();callback(event,session());}
  function network(value){connected=value;events.dispatchEvent(new Event(value?'online':'offline'));}
  function changed(key){const e=new Event('storage');e.key=key;events.dispatchEvent(e);}
  return {account,storage,client,events,change,network,changed};
}
test('expired SDK session opens only the prepared local owner offline; never fabricates a session',async()=>{
  const f=fixture({online:false});const original=f.storage.getItem(authKey);f.account.start();
  assert.equal(f.account.getSnapshot().scope,'a');assert.equal(f.account.getSnapshot().session,null);assert.equal(f.account.getSnapshot().online,false);assert.equal(f.storage.getItem(authKey),original);
  assert.ok(!f.storage.getItem(api.KEY).includes('SYNTHETIC_SECRET'));f.account.stop();
});
test('unprepared offline identity cannot silently write into guest; absent SDK and changed owner revoke preparation',()=>{
  for(const id of ['a','b',null]){
    const storage=memory({[api.KEY]:marker('a')});const f=fixture({id,prepared:false,online:false,storage});
    if(id==='a')storage.removeItem(api.KEY);f.account.start();
    assert.equal(f.account.getSnapshot().owner,null);assert.equal(f.account.getSnapshot().scope,id?'loading':'guest');f.account.stop();
  }
});
test('network failure retains a prepared owner while authoritative rejection locks access without deleting writing',async()=>{
  let reject=false;const f=fixture({getUser:async()=>({error:reject?{status:401}:{message:'network failed'}})});
  f.storage.setItem('catalyst_notebook_v1:a:my','original');f.account.start();await pause();assert.equal(f.account.getSnapshot().scope,'a');assert.equal(f.account.getSnapshot().online,false);
  reject=true;await f.account.verify();assert.equal(f.account.getSnapshot().owner,null);assert.equal(JSON.parse(f.storage.getItem(api.KEY)).enabled,false);assert.equal(f.storage.getItem('catalyst_notebook_v1:a:my'),'original');f.account.stop();
});
test('late verification of A cannot restore A after B signs in; prep changes only after online verification',async()=>{
  let release;const f=fixture({getUser:()=>new Promise(resolve=>{release=resolve;})});f.account.start();await pause();const old=release;
  f.change('b');assert.equal(f.account.getSnapshot().owner,null);await pause();old({data:{user:{id:'a'}}});await pause();assert.notEqual(f.account.getSnapshot().owner?.id,'a');
  release({data:{user:{id:'b',email:'b@example.invalid'}}});await pause();assert.equal(f.account.getSnapshot().scope,'b');assert.equal(f.account.getSnapshot().prepared,false);f.account.stop();
});
test('explicit sign-out revokes offline ownership before a failing network call; sibling SDK sign-out also hides it',async()=>{
  const f=fixture({signOut:async()=>{throw Error('offline');}});f.account.start();await pause();await f.account.signOut();assert.equal(f.account.getSnapshot().scope,'guest');assert.equal(JSON.parse(f.storage.getItem(api.KEY)).enabled,false);
  const g=fixture({online:false,storage:f.storage,prepared:false});g.account.start();assert.equal(g.account.getSnapshot().owner,null);g.account.stop();f.account.stop();
  const h=fixture({online:false});h.account.start();h.storage.removeItem(authKey);h.changed(authKey);assert.equal(h.account.getSnapshot().scope,'guest');assert.equal(JSON.parse(h.storage.getItem(api.KEY)).enabled,false);h.account.stop();
});
test('corrupt and future markers are preserved and never authorize offline access or get overwritten by prepare',async()=>{
  for(const raw of ['{broken',JSON.stringify({version:2,enabled:true,owner:{id:'a'}})]){
    const f=fixture({prepared:false,storage:memory({[api.KEY]:raw})});f.account.start();await pause();await assert.rejects(f.account.prepare(),/unreadable/);assert.equal(f.storage.getItem(api.KEY),raw);f.network(false);assert.equal(f.account.getSnapshot().owner,null);f.account.stop();
  }
});
test('storage quota during preparation does not claim readiness; sibling preparation removal invalidates jobs',async()=>{
  const f=fixture({prepared:false});f.account.start();await pause();const set=f.storage.setItem;f.storage.setItem=(k,v)=>{if(k===api.KEY)throw Error('full');set(k,v);};
  await assert.rejects(f.account.prepare(),/full/);assert.equal(f.account.getSnapshot().prepared,false);f.storage.setItem=set;await f.account.prepare();const ticket=f.account.ticket();f.network(false);f.storage.removeItem(api.KEY);f.changed(api.KEY);assert.equal(f.account.valid(ticket),false);assert.equal(f.account.getSnapshot().owner,null);f.account.stop();
});
module.exports={memory};
