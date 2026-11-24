// UI controller for optional public audio packs. Only the matching active app worker owns writes.
(function(root){
  'use strict';if(!root.document)return;
  const base=new URL('./',location.href);base.search='';base.hash='';
  const workerURL=new URL('sw.js',base).href,core=root.CatalystMediaCore;
  let state={packs:{},busy:null,message:''},initialized=false,lastSequence=0;const listeners=new Set(),pending=new Map(),wanted=new Set();
  const key=(l,v)=>l+':'+v,owned=worker=>worker?.scriptURL===workerURL;
  function emit(patch){state={...state,...patch};root.CatalystSafety?.dirty('audio-operation',!!state.busy);listeners.forEach(fn=>fn());root.CatalystAudio?.refreshSources();}
  function update(language,voice,value){emit({packs:{...state.packs,[key(language,voice)]:{...state.packs[key(language,voice)],...value}}});}
  const supported=()=>root.CatalystOffline?.ready()&&root.CatalystOffline.getSnapshot().active?.audioProtocol===1&&owned(navigator.serviceWorker?.controller);
  function rpc(type,language,voice,timeout=40000){
    if(!supported())return Promise.reject(Error('Download or update the app files first, then prepare audio.'));
    return new Promise((resolve,reject)=>{const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();reject(Error('The audio worker did not respond. Reopen Study offline to verify saved files and resume.'));},timeout);
      channel.port1.onmessage=e=>{clearTimeout(timer);channel.port1.close();e.data.ok?resolve(e.data.value):reject(Error(e.data.error));};
      navigator.serviceWorker.controller.postMessage({catalystOffline:1,type,language,voice},[channel.port2]);
    });
  }
  function init(){
    if(initialized)return;initialized=true;if(!navigator.serviceWorker)return;
    navigator.serviceWorker.addEventListener('message',e=>{
      if(!owned(e.source)||e.source!==navigator.serviceWorker.controller||e.data?.catalystOffline!==1)return;const m=e.data;
      if(m.type==='AUDIO_PROGRESS'){
        const v=m.value;if(v.sequence<=lastSequence)return;lastSequence=v.sequence;if(v.state){update(v.language,v.voice,v);emit({busy:['downloading','checking','removing'].includes(v.state)?key(v.language,v.voice):null});}
        if(v.repair)update(v.language,v.voice,{activeHealthy:false,error:'A saved recording is missing or damaged. Resume / repair this audio pack.'});
        if(v.changed)refresh(v.language,v.voice,true);
      }else if(m.type==='AUDIO_ERROR'){update(m.language,m.voice,{error:m.error,state:'error'});refresh(m.language,m.voice,true);}
    });
    const recheck=()=>{for(const k of wanted){const [l,v]=k.split(':');refresh(l,v);}};
    let wasReady=false;root.CatalystOffline.subscribe(()=>{const ready=!!supported();if(ready!==wasReady){wasReady=ready;if(ready)recheck();root.CatalystAudio?.refreshSources();}});
    root.addEventListener('focus',recheck);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')recheck();});navigator.serviceWorker.addEventListener('controllerchange',()=>{lastSequence=0;recheck();});
  }
  async function refresh(language,voice,force=false){
    init();if(!voice)return Promise.all(core.VOICES.map(v=>refresh(language,v)));
    const k=key(language,voice);wanted.add(k);if(pending.has(k))return force?pending.get(k).then(()=>refresh(language,voice)):pending.get(k);if(!supported())return null;
    const promise=(async()=>{try{const value=await rpc('AUDIO_STATUS',language,voice);update(language,voice,value);emit({busy:value.busy});return value;}catch(error){update(language,voice,{activeHealthy:false,error:error.message});emit({busy:null});return null;}finally{pending.delete(k);}})();pending.set(k,promise);return promise;
  }
  async function action(type,language,voice){
    init();emit({message:''});
    try{
      if(type==='AUDIO_DOWNLOAD'){
        const pack=state.packs[key(language,voice)]?.candidate,done=state.packs[key(language,voice)]?.progress?.bytes||0;
        const estimate=await navigator.storage?.estimate?.();
        if(estimate?.quota&&pack&&estimate.quota-estimate.usage<pack.totalBytes-done+1024*1024)throw Error('There may not be enough device space. Free space and retry; existing writing and audio are preserved.');
        await navigator.storage?.persist?.().catch(()=>false);
      }
      if(type!=='AUDIO_PAUSE'){emit({busy:key(language,voice)});update(language,voice,{state:type==='AUDIO_CHECK'?'checking':type==='AUDIO_REMOVE'?'removing':'downloading',error:''});}
      await rpc(type,language,voice);
      if(type!=='AUDIO_DOWNLOAD')await refresh(language,voice,true);
    }catch(error){emit({message:error.message});await refresh(language,voice);if(!supported())emit({busy:null});}
  }
  function lookup(text,language,voice){
    if(!supported())return null;const hash=core.hash(text),first=voice==='m'?'m':'f';
    for(const v of [first,first==='m'?'f':'m']){
      const r=state.packs[key(language,v)];if(!r?.activeHealthy)continue;
      const file=r.active?.files.find(f=>f.hash===hash&&f.textSha256===root.CatalystMediaCatalog?.languages[language]?.[hash]);
      if(file)return {url:new URL(`__catalyst_audio__/${language}/${v}/${hash}/${file.sha256}.mp3`,base).href,voice:v,voiceName:r.active.voiceName};
    }
    return null;
  }
  root.CatalystMedia={init,refresh,lookup,supported,check:(l,v)=>action('AUDIO_CHECK',l,v),download:(l,v)=>action('AUDIO_DOWNLOAD',l,v),pause:(l,v)=>action('AUDIO_PAUSE',l,v),remove:(l,v)=>action('AUDIO_REMOVE',l,v),getSnapshot:()=>state,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);}};
})(typeof window==='undefined'?globalThis:window);
