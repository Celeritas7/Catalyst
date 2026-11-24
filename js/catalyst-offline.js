/* Window-side controller. Registration/download happen only after a user action. */
(function(root){
  'use strict';
  if(!root.document)return;
  const base=new URL('./',location.href);base.search='';base.hash='';
  const workerURL=new URL('sw.js',base).href;
  const build=()=>document.querySelector('meta[name="catalyst-build"]')?.content||'unknown';
  const supported=()=>!!(root.isSecureContext&&navigator.serviceWorker&&root.caches&&root.indexedDB&&root.crypto?.subtle);
  let state={supported:supported(),appBuild:build(),phase:'idle',message:'',active:null,candidate:null,manifest:null,locked:false},registration=null,initialized=false,applying=false,lockNonce=null,unlockTimer=null;
  const listeners=new Set(),publish=patch=>{state={...state,...patch};for(const fn of listeners)fn();};
  function rpc(worker,type,timeout=15000){
    return new Promise((resolve,reject)=>{
      if(!worker){reject(Error('The app worker is not ready. Retry while connected.'));return;}
      const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();reject(Error('The offline worker did not respond. Keep this page open and retry.'));},timeout);
      channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();event.data.ok?resolve(event.data.value):reject(Error(event.data.error));};
      worker.postMessage({catalystOffline:1,type},[channel.port2]);
    });
  }
  const owned=worker=>worker?.scriptURL===workerURL;
  async function refresh(){
    if(!supported())return;
    try{
      const found=await navigator.serviceWorker.getRegistration(base.href);
      registration=found&&[found.active,found.waiting,found.installing].some(owned)?found:null;
      if(!registration){publish({active:null,candidate:null,phase:'idle'});return;}
      const active=owned(registration.active)?await rpc(registration.active,'STATUS'):null;
      const candidate=owned(registration.waiting)?await rpc(registration.waiting,'STATUS'):active;
      publish({active,candidate,phase:candidate?.state||'idle',controlled:owned(navigator.serviceWorker.controller),appBuild:build()});
    }catch(error){publish({phase:'error',message:error.message,controlled:false});}
  }
  function unlock(){clearTimeout(unlockTimer);lockNonce=null;root.CatalystSafety.setLocked(false);document.getElementById('root')?.removeAttribute('inert');publish({locked:false});}
  function init(){
    if(initialized)return;initialized=true;
    root.addEventListener('beforeunload',event=>{if(root.CatalystSafety.hasDirty()){event.preventDefault();event.returnValue='';}});
    if(!supported())return;
    navigator.serviceWorker.addEventListener('message',event=>{
      const data=event.data;if(data?.catalystOffline!==1||!owned(event.source))return;
      if(data.type==='PREPARE_UPDATE'){
        const credentials=[...document.querySelectorAll('input[type="password"],input[type="email"]')].some(input=>input.value);
        const clean=!root.CatalystSafety.hasDirty()&&!credentials;
        if(clean){lockNonce=data.nonce;root.CatalystSafety.setLocked(true);document.getElementById('root')?.setAttribute('inert','');publish({locked:true});clearTimeout(unlockTimer);unlockTimer=setTimeout(unlock,30000);}
        event.source.postMessage({catalystOffline:1,type:'UPDATE_VOTE',nonce:data.nonce,clean});
      }else if(data.type==='CANCEL_UPDATE'&&lockNonce===data.nonce)unlock();
      else if(data.type==='ACTIVATED'){
        const reload=applying&&lockNonce===data.nonce;unlock();applying=false;
        if(reload)location.reload();else{publish({message:'An updated app is active. Reload this tab when your writing is saved.'});refresh();}
      }else if(data.type==='PROGRESS'){
        if(data.value.state==='repair-needed'){publish({active:null,phase:'repair-needed',message:data.value.error});}
        else publish({phase:data.value.state,candidate:{...state.candidate,...data.value,candidateBuild:data.value.buildId},message:data.value.error||''});
      }else if(data.type==='ERROR')publish({message:data.error,phase:'error'});
      else if(data.type==='CHANGED')refresh();
    });
    navigator.serviceWorker.addEventListener('controllerchange',()=>refresh()); // never auto-reload
    root.addEventListener('focus',refresh);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refresh();});
    refresh();
  }
  async function open(){
    init();publish({message:''});
    if(!supported())return;
    await refresh();
    const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),15000);
    try{
      const response=await fetch(new URL('release-manifest.json',base),{cache:'no-store',credentials:'omit',signal:abort.signal});
      if(!response.ok)throw Error('Connect to check the current app download.');
      const manifest=await response.json();if(manifest.schemaVersion!==1||!/^[a-f0-9]{20}$/.test(manifest.buildId))throw Error('The release inventory is unavailable.');
      const estimate=await navigator.storage?.estimate?.().catch(()=>null);
      const persisted=await navigator.storage?.persisted?.().catch(()=>false);
      publish({manifest,estimate,persisted});
    }catch(error){if(!state.candidate)publish({message:'Connect to check download size and prepare the app.'});}finally{clearTimeout(timer);}
  }
  async function ensure(){
    registration=await navigator.serviceWorker.register(workerURL,{scope:base.pathname,updateViaCache:'none'});
    if(registration.installing)await new Promise((resolve,reject)=>{
      const worker=registration.installing,timer=setTimeout(()=>reject(Error('Worker installation is still pending. Retry shortly.')),15000);
      const changed=()=>{if(['installed','activated'].includes(worker.state)){clearTimeout(timer);resolve();}else if(worker.state==='redundant'){clearTimeout(timer);reject(Error('The new worker could not install. The previous app is preserved.'));}};
      worker.addEventListener('statechange',changed);changed();
    });
    return registration.waiting||registration.active;
  }
  async function action(fn){try{publish({message:''});await fn();}catch(error){publish({phase:'error',message:error.message});applying=false;unlock();}}
  async function download(){return action(async()=>{
    if(!supported())throw Error('This browser cannot save an offline app. Use a secure browser or Home Screen web app.');
    init();publish({phase:'preparing'});
    const worker=await ensure(),info=await rpc(worker,'STATUS');
    const estimate=await navigator.storage?.estimate?.();
    if(estimate?.quota&&estimate.quota-estimate.usage<info.totalBytes-info.bytes+1024*1024)throw Error('There may not be enough device storage for this download. Free space and retry; saved writing is untouched.');
    const persisted=await navigator.storage?.persist?.().catch(()=>false);
    publish({candidate:info,persisted,phase:'downloading'});await rpc(worker,'DOWNLOAD');
  });}
  async function pause(){return action(async()=>{await rpc(registration?.waiting||registration?.active,'PAUSE');await refresh();});}
  async function check(){return action(async()=>{if(!registration)return open();publish({phase:'checking'});await registration.update();await ensure();await refresh();});}
  async function apply(){return action(async()=>{
    if(root.CatalystSafety.hasDirty())throw Error('Save your writing or keep the draft for later before updating.');
    applying=true;await rpc(registration?.waiting||registration?.active,'APPLY',20000);
  });}
  function ready(){return !!(state.active?.activeHealthy&&state.controlled&&state.appBuild===state.active.workerBuild&&state.appBuild===state.active.activeBuild);}
  root.CatalystOffline={init,open,download,pause,check,apply,refresh,ready,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},getSnapshot:()=>state};
})(typeof window==='undefined'?globalThis:window);
