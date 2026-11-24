/* Generated with a pinned release inventory. Scope is this script's directory. */
'use strict';
const base=new URL('./',self.location.href).href;
const db= self.CatalystOfflineCore.database(self.indexedDB);
const pages=async()=> (await self.clients.matchAll({type:'window',includeUncontrolled:true})).filter(client=>{
  const url=new URL(client.url),scope=new URL(base);
  return url.origin===scope.origin&&(url.pathname===scope.pathname||url.pathname===scope.pathname+'index.html');
});
const broadcast=async message=>{for(const client of await pages())client.postMessage({catalystOffline:1,...message});};
const manager=self.CatalystOfflineCore.manager({base,release:RELEASE,caches:self.caches,db,fetch:self.fetch.bind(self),notify:value=>broadcast({type:'PROGRESS',value})});
const media=self.CatalystMediaCore.manager({base,catalog:RELEASE.audio?.languages||{},caches:self.caches,db,fetch:self.fetch.bind(self),notify:value=>broadcast({type:'AUDIO_PROGRESS',value})});
let activation=null;
self.addEventListener('install',event=>event.waitUntil(Promise.resolve().then(()=>self.CatalystOfflineCore.validate(RELEASE,base))));
// No install-time skipWaiting, download, cache deletion or learner-data access.
async function finishActivation(){
  const pending=await db.get(manager.key('activation'));
  const state=await manager.status();
  if(state.activeBuild!==RELEASE.buildId||!state.activeHealthy)return;
  await self.clients.claim();
  if(pending?.buildId===RELEASE.buildId)await broadcast({type:'ACTIVATED',nonce:pending.nonce,requester:pending.requester,buildId:RELEASE.buildId});
}
self.addEventListener('activate',event=>event.waitUntil(finishActivation()));
self.addEventListener('fetch',event=>{
  if(media.eligible(event.request)){event.respondWith(media.serve(event.request).catch(()=>new Response('Saved audio is unavailable. Retry its verification.',{status:503})));return;}
  if(!manager.eligible(event.request))return;
  event.respondWith((async()=>{
    try{const saved=await manager.cached(event.request);if(saved)return saved;}catch(error){/* use network without overwriting any records */}
    try{return await fetch(event.request);}catch(error){
      if(event.request.mode!=='navigate')throw error;
      return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Catalyst needs a connection</title><body style="font:18px system-ui;max-width:42rem;margin:3rem auto;padding:1rem;background:#f7f5fc;color:#251c48"><h1>App files need repair</h1><p>Reconnect to the internet, open Catalyst, then choose Study offline to resume or repair the download.</p><p>Repairing the app does not clear notebooks or progress. Keep a recovery file because browsers can remove stored website data.</p><a href="./">Try opening Catalyst again</a></body></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    }
  })());
});
async function apply(source){
  if(media.busy)throw Error('Pause the audio download or check before applying an app update.');
  if(activation)throw Error('Another update check is in progress.');
  if(!(await manager.status()).complete)throw Error('Finish downloading and verifying the update first.');
  const clients=await pages(),nonce=crypto.randomUUID(),started=Date.now();
  const votes=new Map(clients.map(client=>[client.id,null]));
  let settle;const voted=new Promise(resolve=>{settle=resolve;});
  const timer=setTimeout(()=>settle(false),5000);
  activation={nonce,votes,settle};
  try{
    for(const client of clients)client.postMessage({catalystOffline:1,type:'PREPARE_UPDATE',nonce});
    const accepted=await voted;
    const current=await pages();
    if(!accepted||current.length!==clients.length||current.some(client=>!votes.has(client.id)))throw Error('Save or keep drafts for later in every Catalyst tab, then retry. A busy or unresponsive tab also pauses updates.');
    await manager.promote({entries:[[manager.key('activation'),{buildId:RELEASE.buildId,nonce,requester:source.id}]],canCommit:async()=>{
      const latest=await pages();
      return !media.busy&&Date.now()-started<10000&&latest.length===clients.length&&latest.every(client=>votes.get(client.id)===true);
    }});
    await self.skipWaiting(); // only after verified files and unanimous clean votes
    try{await finishActivation();}catch(error){/* A waiting worker finishes in activate. */}
    return {accepted:true,nonce};
  }catch(error){await broadcast({type:'CANCEL_UPDATE',nonce});throw error;}
  finally{clearTimeout(timer);activation=null;}
}
self.addEventListener('message',event=>{
  const message=event.data;if(message?.catalystOffline!==1||typeof message.type!=='string'||!event.source?.id)return;
  event.waitUntil((async()=>{
    const source=(await pages()).find(client=>client.id===event.source.id);if(!source)return;
    if(message.type==='UPDATE_VOTE'){
      if(activation?.nonce===message.nonce&&activation.votes.has(source.id)){
        activation.votes.set(source.id,message.clean===true);
        if(message.clean!==true)activation.settle(false);
        else if([...activation.votes.values()].every(value=>value===true))activation.settle(true);
      }
      return;
    }
    const reply=value=>event.ports[0]?.postMessage(value);
    try{
      if(message.type==='STATUS')reply({ok:true,value:{...await manager.status(),audioProtocol:1}});
      else if(message.type.startsWith('AUDIO_')){
        if(activation)throw Error('App update in progress. Retry audio afterwards.');
        const {language,voice}=message;
        if(message.type==='AUDIO_STATUS')reply({ok:true,value:await media.status(language,voice)});
        else if(message.type==='AUDIO_CHECK')reply({ok:true,value:await media.inspect(language,voice)});
        else if(message.type==='AUDIO_DOWNLOAD'){reply({ok:true});try{await media.download(language,voice);}catch(error){await broadcast({type:'AUDIO_ERROR',language,voice,error:error.message});}}
        else if(message.type==='AUDIO_PAUSE'){media.pause(language,voice);reply({ok:true});}
        else if(message.type==='AUDIO_REMOVE'){await media.remove(language,voice);reply({ok:true});}
        else throw Error('Unsupported audio operation.');
      }
      else if(message.type==='DOWNLOAD'){
        reply({ok:true});await manager.download();await finishActivation();await broadcast({type:'CHANGED'});
      }else if(message.type==='PAUSE'){await manager.pause();reply({ok:true});}
      else if(message.type==='APPLY'){const value=await apply(source);reply({ok:true,value});}
    }catch(error){reply({ok:false,error:error.message||'Offline storage is unavailable. Retry without clearing your data.'});await broadcast(message.type.startsWith('AUDIO_')?{type:'AUDIO_ERROR',language:message.language,voice:message.voice,error:error.message||'Audio operation failed.'}:{type:'ERROR',error:error.message||'Offline operation failed.'});}
  })());
});
