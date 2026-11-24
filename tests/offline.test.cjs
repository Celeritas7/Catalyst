const {test}=require('node:test'),assert=require('node:assert/strict');
const {base,core,fixture,worker}=require('./offline-fixture.cjs');
const nav=(suffix='')=>({url:base+suffix,method:'GET',mode:'navigate'});

test('explicit verified download survives manager restart and never touches sibling caches',async()=>{
  const f=await fixture(),sibling=await f.caches.open('other-app');await sibling.put(base+'other',new Response('retain'));
  assert.equal((await f.manager.status()).activeHealthy,false);
  await f.manager.download();const state=await f.manager.status();
  assert.equal(state.complete,true);assert.equal(state.activeHealthy,true);assert.equal(state.files,3);assert.equal(state.bytes,f.release.totalBytes);
  assert.equal(f.requests.length,3);for(const request of f.requests){assert.equal(request.options.credentials,'omit');assert.equal(request.options.redirect,'error');}
  const restarted=core.manager(f.options);assert.equal((await restarted.status()).activeBuild,f.release.buildId);
  await restarted.download();assert.equal(f.requests.length,3);assert.equal(await(await sibling.match(base+'other')).text(),'retain');
  assert.match(await(await restarted.cached(nav())).text(),/<!doctype html>/);
});

test('pause preserves complete files and a new worker resumes only missing files',async()=>{
  const f=await fixture();let reached;const waiting=new Promise(resolve=>reached=resolve);
  const manager=core.manager({...f.options,fetch:async(url,options)=>{
    if(String(url).endsWith('.js')){reached();return new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new DOMException('Pause','AbortError'))));}
    return f.network(url,options);
  }});
  const download=manager.download();await waiting;await manager.pause();await download;
  const status=await manager.status();assert.equal(status.state,'paused');assert.equal(status.files,1);assert.equal(status.activeBuild,null);
  const next=core.manager(f.options);await next.download();assert.equal((await next.status()).activeHealthy,true);
  assert.equal(f.requests.filter(r=>r.url.endsWith('index.html')).length,1);
});

test('bad hash, HTML for scripts, HTTP failure, redirect and network failure cannot become ready',async()=>{
  for(const kind of ['hash','html','http','redirect','network']){
    const f=await fixture();const manager=core.manager({...f.options,fetch:async(url,options)=>{
      if(String(url).endsWith('.js')){
        if(kind==='network')throw new TypeError('Network failed');
        const response=kind==='http'?new Response('unauthorized',{status:401}):kind==='redirect'?await f.network(url,options):new Response(kind==='html'?'<html>error</html>':'wrong',{headers:{'Content-Type':kind==='html'?'text/html':'application/javascript'}});
        if(kind==='redirect')Object.defineProperty(response,'redirected',{value:true});return response;
      }
      return f.network(url,options);
    }});
    await manager.download();const state=await manager.status();assert.equal(state.state,'error',kind);assert.equal(state.activeBuild,null,kind);assert.equal(state.files,1,kind);
  }
});

test('failed candidate cache/metadata writes leave active release intact and retries work',async()=>{
  const old=await fixture();await old.manager.download();
  const next=await fixture('b'.repeat(20),old);next.caches.fail=true;await next.manager.download();
  let state=await next.manager.status();assert.equal(state.activeBuild,old.release.buildId);assert.equal(state.activeHealthy,true);assert.match(state.error,/full/);
  next.caches.fail=false;let fail=true;
  const db={...next.db,put:async(...args)=>{if(fail)throw new DOMException('Metadata full','QuotaExceededError');return next.db.put(...args);}};
  const manager=core.manager({...next.options,db});await assert.rejects(manager.download(),/Metadata full/);
  fail=false;await manager.download();state=await manager.status();assert.equal(state.complete,true);assert.equal(state.activeBuild,old.release.buildId);
  const failing=core.manager({...next.options,db:{...next.db,putMany:async()=>{throw Error('Commit failed');}}});
  await assert.rejects(failing.promote(),/Commit failed/);assert.equal((await next.manager.status()).activeBuild,old.release.buildId);
  await next.manager.promote();assert.equal((await next.manager.status()).previousBuild,old.release.buildId);
  assert.ok(await next.manager.cached({url:base+old.release.assets[1].url.slice(2),method:'GET',mode:'cors'}));
  const third=await fixture('c'.repeat(20),next);await third.manager.download();await third.manager.promote();
  assert.ok(await third.manager.cached({url:base+old.release.assets[1].url.slice(2),method:'GET',mode:'cors'}),'A still-open older tab retains its own inventoried assets');
});

test('eviction withdraws readiness, refuses incomplete offline navigation, and repairs without resetting metadata',async()=>{
  const f=await fixture();await f.manager.download();
  const cache=await f.caches.open(f.manager.cacheName(f.release.buildId));await cache.delete(new URL(f.release.assets[1].url,base).href);
  assert.equal((await f.manager.status()).activeHealthy,false);assert.equal(await f.manager.cached(nav()),null);
  const w=worker(f,{network:async()=>{throw Error('offline');}}),response=await w.fetch(nav());
  assert.equal(response.status,503);assert.match(await response.text(),/App files need repair/);
  await f.manager.download();assert.equal((await f.manager.status()).activeHealthy,true);assert.equal(f.requests.length,4);
});

test('worker excludes auth queries, APIs, siblings, all mutations, and unknown asset HTML fallbacks',async()=>{
  const f=await fixture();await f.manager.download();const w=worker(f);
  for(const request of [nav('?code=synthetic'),nav('rest/v1/table'),nav('../Other/'),{url:'https://service.test/auth/v1',method:'GET',mode:'cors'},{url:base+'assets/x.js',method:'POST',mode:'cors'}]){
    assert.equal(f.manager.eligible(request),false);assert.equal(await w.fetch(request),undefined);
  }
  assert.equal((await w.fetch({url:base+'assets/not-listed.js',method:'GET',mode:'cors'})).status,404);
  const cache=await f.caches.open(f.manager.cacheName(f.release.buildId));assert.equal((await cache.keys()).length,3);
  assert.throws(()=>core.validate({...f.release,assets:[{...f.release.assets[0],url:'../Other/index.html'}]},base));
});

test('worker install neither downloads nor skips waiting, and invalid install leaves the prior shell intact',async()=>{
  const old=await fixture();await old.manager.download();const next=await fixture('b'.repeat(20),old),w=worker(next);
  await w.lifecycle('install');assert.equal(w.skips,0);assert.equal(next.requests.length,0);assert.equal((await next.manager.status()).activeBuild,old.release.buildId);
  const bad={...next,release:{...next.release,totalBytes:1}};
  assert.throws(()=>worker(bad),/release size/);assert.equal((await old.manager.status()).activeHealthy,true);
});

test('all clean tabs are required to activate; incomplete, dirty, absent and newly opened tabs block updates',async()=>{
  for(const scenario of ['incomplete','dirty','unresponsive','new-tab','clean']){
    const old=await fixture();await old.manager.download();const next=await fixture('b'.repeat(20),old);
    if(scenario!=='incomplete')await next.manager.download();
    const w=worker(next,{clients:[{id:'one',clean:true},{id:'two',clean:scenario==='dirty'?false:scenario==='unresponsive'?undefined:true}]});
    if(scenario==='new-tab'){
      const oldPost=w.clients[1].postMessage;w.clients[1].postMessage=function(message){oldPost.call(this,message);if(message.type==='PREPARE_UPDATE')w.clients.push({id:'new',url:base,postMessage(){}});};
    }
    const op=w.send('APPLY');const result=await op.reply;await op.done;
    assert.equal(result.ok,scenario==='clean',scenario);assert.equal(w.skips,scenario==='clean'?1:0,scenario);
    assert.equal((await next.manager.status()).activeBuild,scenario==='clean'?next.release.buildId:old.release.buildId,scenario);
    if(scenario==='clean'){
      assert.equal(w.claims,1);assert.equal(w.messages.filter(m=>m.type==='ACTIVATED').length,2);
      assert.equal((await next.db.get(next.manager.key('activation'))).requester,'one');
    }else assert.ok(!w.messages.some(m=>m.type==='ACTIVATED'));
  }
});

test('sibling client messages cannot initiate downloads or activate a release',async()=>{
  const f=await fixture(),w=worker(f);await w.send('DOWNLOAD','foreign').done;
  assert.equal(f.requests.length,0);assert.equal(w.skips,0);
});
