const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const media=require('../js/catalyst-media-core.js');
const {fixture,worker,base}=require('./offline-fixture.cjs');
const tone=fs.readFileSync(__dirname+'/fixtures/audio-tone.mp3');
async function setup(shared={}){
  const shell=await fixture(undefined,shared),hash=media.hash('example'),textSha256=await media.digest(new TextEncoder().encode('example')),sha256=await media.digest(tone);
  const raw={version:2,lang:'my',m:[hash],f:[hash],voices:{m:'Synthetic male',f:'Synthetic female'},files:['m','f'].map(voice=>({voice,hash,bytes:tone.length,sha256,textSha256,mime:'audio/mpeg'}))};
  const catalog={my:{[hash]:textSha256}},config={raw,body:tone,status:200,mime:'audio/mpeg',calls:[],events:[],delay:null};
  const network=async(url,options)=>{config.calls.push({url,options});if(config.delay&&!String(url).endsWith('clips.json'))await config.delay;
    return String(url).endsWith('clips.json')?new Response(JSON.stringify(config.raw),{status:config.manifestStatus||200,headers:{'Content-Type':'application/json'}}):new Response(config.body,{status:config.status,headers:{'Content-Type':config.mime}});
  };
  const options={base,catalog,db:shell.db,caches:shell.caches,fetch:network,notify:v=>config.events.push(v)};
  return {shell,hash,sha256,textSha256,raw,catalog,config,options,manager:media.manager(options)};
}
test('catalog validates exact text, language, voice, size and checksum; legacy or malformed manifests cannot claim offline readiness',async()=>{
  const f=await setup(),pack=await media.inventory(f.raw,'my','f',f.catalog.my);assert.equal(pack.files.length,1);assert.equal(pack.totalBytes,tone.length);assert.equal(pack.voiceName,'Synthetic female');
  for(const raw of [{m:[],f:[]},{...f.raw,lang:'ja'},{...f.raw,files:[...f.raw.files,f.raw.files[0]]},{...f.raw,files:f.raw.files.map(x=>({...x,bytes:0}))},{...f.raw,files:f.raw.files.map(x=>({...x,mime:'text/html'}))}])await assert.rejects(media.inventory(raw,'my','f',f.catalog.my));
  assert.equal((await media.inventory(f.raw,'my','m',{})).files.length,0);
  assert.equal((await media.inventory(f.raw,'my','m',{[f.hash]:'0'.repeat(64)})).files.length,0);
});
test('explicit download verifies real MP3 bytes, survives manager restart and serves full, closed, open and suffix byte ranges',async()=>{
  const f=await setup();await f.manager.inspect('my','f');await f.manager.download('my','f');
  const restarted=media.manager(f.options),state=await restarted.status('my','f');assert.equal(state.activeHealthy,true);assert.equal(state.progress.files,1);assert.equal(state.progress.bytes,tone.length);
  const url=restarted.mediaURL(state.active,state.active.files[0]);
  for(const [range,start,end] of [[null,0,tone.length-1],['bytes=0-1',0,1],['bytes=100-',100,tone.length-1],['bytes=-16',tone.length-16,tone.length-1]]){
    const r=await restarted.serve(new Request(url,{headers:range?{Range:range}:{}}));assert.equal(r.status,range?206:200);assert.deepEqual(Buffer.from(await r.arrayBuffer()),tone.subarray(start,end+1));assert.equal(r.headers.get('Accept-Ranges'),'bytes');
  }
  for(const range of ['bytes=999999-','bytes=-0','bytes=9-3','bytes=0-1,4-5','garbage'])assert.equal((await restarted.serve(new Request(url,{headers:{Range:range}}))).status,416);
  assert(f.config.calls.every(c=>c.options.credentials==='omit'&&c.options.redirect==='error'));
});
test('missing manifests, auth/server/network errors, empty or corrupt recordings never become ready',async()=>{
  const f=await setup();f.config.manifestStatus=400;f.config.raw={code:'NoSuchKey'};await assert.rejects(f.manager.inspect('my','f'),/No recorded lesson audio/);assert.equal((await f.manager.status('my','f')).activeHealthy,false);
  f.config.manifestStatus=403;await assert.rejects(f.manager.inspect('my','f'),/HTTP 403/);
  for(const change of [{status:404},{status:500},{body:new Uint8Array()},{mime:'text/html'},{body:Buffer.alloc(tone.length)}]){
    const g=await setup();await g.manager.inspect('my','f');Object.assign(g.config,change);await assert.rejects(g.manager.download('my','f'));assert.equal((await g.manager.status('my','f')).activeHealthy,false);
  }
  const g=await setup();g.options.fetch=async()=>{throw Error('Disconnected');};await assert.rejects(media.manager(g.options).inspect('my','f'),/Disconnected/);
});
test('paused downloads retain verified files and restart without re-fetching or double-counting them',async()=>{
  const f=await setup(),hash2=media.hash('another'),text2=await media.digest(new TextEncoder().encode('another')),data2=Buffer.from(tone);data2[data2.length-1]^=1;
  f.catalog.my[hash2]=text2;f.raw.f.push(hash2);f.raw.files.push({voice:'f',hash:hash2,textSha256:text2,bytes:data2.length,sha256:await media.digest(data2),mime:'audio/mpeg'});
  const original=f.options.fetch;f.options.fetch=async(url,opts)=>String(url).includes(hash2+'.mp3')?new Response(data2,{headers:{'Content-Type':'audio/mpeg'}}):original(url,opts);
  let count=0;f.options.notify=v=>{if(v.state==='downloading'&&v.progress.files===1&&++count===1)f.manager.pause();};f.manager=media.manager(f.options);
  await f.manager.inspect('my','f');await f.manager.download('my','f');let state=await f.manager.status('my','f');assert.equal(state.state,'paused');assert.equal(state.progress.files,1);assert.equal(state.activeHealthy,false);
  f.options.notify=()=>{};f.manager=media.manager(f.options);await f.manager.download('my','f');state=await f.manager.status('my','f');assert.equal(state.progress.files,2);assert.equal(state.progress.bytes,tone.length+data2.length);assert.equal(state.activeHealthy,true);
});
test('failed replacement and quota preserve the active pack; eviction removes readiness and repair restores it',async()=>{
  const f=await setup();await f.manager.inspect('my','f');await f.manager.download('my','f');const old=(await f.manager.status('my','f')).active;
  const replacement=Buffer.from(tone);replacement[replacement.length-1]^=1;f.raw.files.forEach(row=>{row.sha256='1'.repeat(64);});await f.manager.inspect('my','f');await assert.rejects(f.manager.download('my','f'));assert.equal((await f.manager.status('my','f')).active.id,old.id);
  f.raw.files.forEach(row=>{row.sha256=f.sha256;});await f.manager.inspect('my','f');const cache=await f.shell.caches.open(f.manager.cacheName);await cache.delete(f.manager.blobURL(f.sha256));assert.equal((await f.manager.status('my','f')).activeHealthy,false);
  assert.equal((await f.manager.serve(new Request(f.manager.mediaURL(old,old.files[0])))).status,503);
  f.shell.caches.fail=true;await assert.rejects(f.manager.download('my','f'));assert.equal((await f.manager.status('my','f')).active.id,old.id);
  f.shell.caches.fail=false;await f.manager.download('my','f');assert.equal((await f.manager.status('my','f')).activeHealthy,true);
});
test('public media is exact-scope only; removal keeps other voices, shared bytes and unrelated caches',async()=>{
  const f=await setup();await f.manager.inspect('my','f');await f.manager.download('my','f');await f.manager.inspect('my','m');await f.manager.download('my','m');assert.equal(f.config.calls.filter(c=>c.url.endsWith('.mp3')).length,1,'Identical verified bytes are reused across voices');
  const sibling=await f.shell.caches.open('sibling-app');await sibling.put('https://offline.test/other',new Response('keep'));
  for(const url of ['https://offline.test/Other/__catalyst_audio__/my/f/'+f.hash+'/'+f.sha256+'.mp3',media.BASE+'my/f/'+f.hash+'.mp3',base+'api',base+'__catalyst_audio__/my/f/'+f.hash+'/'+f.sha256+'.mp3?token=x'])assert.equal(f.manager.eligible(new Request(url)),false);
  assert.equal(f.manager.eligible(new Request(base+'__catalyst_audio__/my/f/'+f.hash+'/'+f.sha256+'.mp3',{method:'POST'})),false);
  await f.manager.remove('my','f');assert.equal((await f.manager.status('my','f')).activeHealthy,false);assert.equal((await f.manager.status('my','m')).activeHealthy,true);assert.equal(await (await sibling.match('https://offline.test/other')).text(),'keep');
  await f.manager.remove('my','m');assert.equal((await (await f.shell.caches.open(f.manager.cacheName)).keys()).length,0);
});
test('concurrent mutations cannot replace a running job, and cancellation prevents activation',async()=>{
  const f=await setup();await f.manager.inspect('my','f');let release;f.config.delay=new Promise(resolve=>{release=resolve;});const download=f.manager.download('my','f');await new Promise(r=>setTimeout(r,5));
  await assert.rejects(f.manager.inspect('my','m'),/Another audio operation/);await assert.rejects(f.manager.remove('my','f'),/Another audio operation/);
  f.manager.pause('my','m');assert.equal(f.manager.busy,true);f.manager.pause('my','f');release();await download;assert.equal((await f.manager.status('my','f')).activeHealthy,false);
});
test('an interrupted removal can be retried; unknown metadata is preserved',async()=>{
  const f=await setup();await f.manager.inspect('my','f');await f.manager.download('my','f');const open=f.shell.caches.open.bind(f.shell.caches);
  f.shell.caches.open=async name=>{const cache=await open(name);cache.delete=async()=>{throw Error('Storage unavailable');};return cache;};await assert.rejects(f.manager.remove('my','f'));assert.equal((await f.manager.status('my','f')).state,'removal-paused');
  f.shell.caches.open=open;await f.manager.remove('my','f');assert.equal((await f.manager.status('my','f')).removing.length,0);
  const unknown={version:2,raw:'retain'};await f.shell.db.put(f.manager.key('my','f'),unknown);await assert.rejects(f.manager.inspect('my','f'),/unreadable/);assert.deepEqual(await f.shell.db.get(f.manager.key('my','f')),unknown);
});
test('worker isolates missing-audio errors from app readiness and does not intercept remote media or sibling URLs',async()=>{
  const f=await setup();await f.shell.manager.download();await f.shell.manager.promote();f.shell.release.audio={version:1,languages:f.catalog};
  const w=worker(f.shell,{network:async()=>new Response(JSON.stringify({code:'NoSuchKey'}),{status:400,headers:{'Content-Type':'application/json'}})});
  const check=w.send('AUDIO_CHECK','one',{language:'my',voice:'f'});assert.equal((await check.reply).ok,false);await check.done;
  assert(w.messages.some(m=>m.type==='AUDIO_ERROR'));assert(!w.messages.some(m=>m.type==='ERROR'));
  const status=await w.send('STATUS').reply;assert.equal(status.value.activeHealthy,true);assert.equal(status.value.audioProtocol,1);
  assert.equal(await w.fetch(new Request(media.BASE+'my/f/'+f.hash+'.mp3')),undefined);
  assert.equal(await w.fetch(new Request('https://offline.test/Sibling/audio.mp3')),undefined);
});
test('worker message download persists real bytes and serves browser Range requests after network loss',async()=>{
  const f=await setup();f.shell.release.audio={version:1,languages:f.catalog};let connected=true;
  const w=worker(f.shell,{network:(url,opts)=>{if(!connected)throw Error('Offline');return f.options.fetch(url,opts);}});
  const checked=w.send('AUDIO_CHECK','one',{language:'my',voice:'f'});assert.equal((await checked.reply).ok,true);await checked.done;
  const downloaded=w.send('AUDIO_DOWNLOAD','one',{language:'my',voice:'f'});assert.equal((await downloaded.reply).ok,true);await downloaded.done;
  connected=false;const status=await w.send('AUDIO_STATUS','one',{language:'my',voice:'f'}).reply;assert.equal(status.value.activeHealthy,true);
  const url=f.manager.mediaURL(status.value.active,status.value.active.files[0]),response=await w.fetch(new Request(url,{headers:{Range:'bytes=0-255'}}));
  assert.equal(response.status,206);assert.deepEqual(Buffer.from(await response.arrayBuffer()),tone.subarray(0,256));
});
