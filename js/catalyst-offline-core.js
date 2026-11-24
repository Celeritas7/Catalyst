/* Shared by the worker and tests. Public app files only; no account or learner records. */
(function(root){
  'use strict';
  const DB_NAME='catalyst_offline_v1', ID=/^[a-f0-9]{20}$/;
  const digest=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
  function validate(manifest,base){
    const scope=new URL(base);
    if(scope.search||scope.hash||!scope.pathname.endsWith('/')||!manifest||manifest.schemaVersion!==1||!ID.test(manifest.buildId)||!Array.isArray(manifest.assets)||!manifest.assets.length||manifest.assets.length>1000)throw Error('Unsupported app release. Check for an update.');
    const seen=new Set();let total=0,documents=0;
    for(const file of manifest.assets){
      if(!file||!/^\.\/(?:index\.html|assets\/[a-zA-Z0-9.-]+)$/.test(file.url)||!Number.isSafeInteger(file.bytes)||file.bytes<1||file.bytes>25*1024*1024||!/^[a-f0-9]{64}$/.test(file.sha256)||!['document','script','style','font','license','icon','manifest'].includes(file.kind))throw Error('Invalid app file inventory.');
      const url=new URL(file.url,scope);
      if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname)||url.search||url.hash||seen.has(url.href))throw Error('Invalid app file address.');
      seen.add(url.href);total+=file.bytes;
      if(file.kind==='document'){documents++;if(file.url!=='./index.html')throw Error('Invalid app document.');}
    }
    if(documents!==1||total!==manifest.totalBytes||total>100*1024*1024)throw Error('Invalid app release size.');
    return manifest;
  }
  function database(indexedDB){
    let pending;
    function open(){
      if(!pending)pending=new Promise((resolve,reject)=>{
        const request=indexedDB.open(DB_NAME,1);
        request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('state'))request.result.createObjectStore('state');};
        request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>{db.close();pending=null;};resolve(db);};
        request.onerror=()=>{pending=null;reject(request.error);};
        request.onblocked=()=>{pending=null;reject(Error('Close other Catalyst windows and retry storage access.'));};
      });
      return pending;
    }
    async function get(key){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction('state','readonly'),request=tx.objectStore('state').get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
    async function putMany(entries){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction('state','readwrite');for(const [key,value] of entries)tx.objectStore('state').put(value,key);tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error||Error('Download metadata could not be saved.'));tx.onerror=()=>{};});}
    return {get,putMany,put:(key,value)=>putMany([[key,value]])};
  }
  async function validResponse(response,file){
    if(!response||!response.ok||response.type==='opaque'||response.redirected)return false;
    const mime=(response.headers.get('Content-Type')||'').split(';')[0].toLowerCase();
    const types={document:['text/html'],script:['application/javascript','text/javascript','application/ecmascript'],style:['text/css'],font:['font/woff2','application/font-woff2','application/octet-stream'],license:['text/plain','application/octet-stream'],icon:['image/png'],manifest:['application/manifest+json','application/json']};
    if(!types[file.kind]?.includes(mime))return false;
    const bytes=await response.clone().arrayBuffer();
    return bytes.byteLength===file.bytes&&await digest(bytes)===file.sha256;
  }
  function manager({base,release,caches,db,fetch,notify=()=>{},now=()=>Date.now()}){
    validate(release,base);
    const prefix='catalyst-shell-v1-'+encodeURIComponent(new URL(base).pathname)+'-', key=suffix=>new URL(base).pathname+':'+suffix;
    const cacheName=id=>{if(!ID.test(id))throw Error('Invalid release ID');return prefix+id;};
    let running=null,abort=null;
    const getRelease=id=>ID.test(id||'')?db.get(key('release:'+id)):null;
    async function scan(manifest){
      validate(manifest,base);
      const cache=await caches.open(cacheName(manifest.buildId));let bytes=0,files=0;
      for(const file of manifest.assets)if(await validResponse(await cache.match(new URL(file.url,base).href),file)){bytes+=file.bytes;files++;}
      return {bytes,files,complete:files===manifest.assets.length};
    }
    async function status(){
      const active=await db.get(key('active')),job=await db.get(key('job:'+release.buildId));
      const activeRelease=active?await getRelease(active.buildId):null;
      const health=activeRelease?await scan(activeRelease):null;
      const progress=activeRelease?.buildId===release.buildId?health:await scan(release);
      return {workerBuild:release.buildId,activeBuild:active?.buildId||null,previousBuild:active?.previousBuild||null,activeHealthy:!!health?.complete,verifiedAt:health?.complete?now():null,candidateBuild:release.buildId,totalBytes:release.totalBytes,totalFiles:release.assets.length,...progress,state:running?'downloading':progress.complete?'complete':job?.state==='downloading'?'interrupted':job?.state||'not-downloaded',error:job?.error||''};
    }
    async function promote({entries=[],canCommit=()=>true}={}){
      const health=await scan(release);if(!health.complete)throw Error('Some app files are missing. Resume the download before activating.');
      const old=await db.get(key('active'));
      if(!await canCommit())throw Error('The update check expired or the open tabs changed. Your current app is preserved; retry when every tab is ready.');
      const retainedBuilds=[...new Set([old?.buildId,old?.previousBuild,...old?.retainedBuilds||[]])].filter(id=>ID.test(id||'')&&id!==release.buildId);
      await db.putMany([[key('release:'+release.buildId),release],[key('active'),{buildId:release.buildId,previousBuild:old?.buildId===release.buildId?old.previousBuild:old?.buildId||null,retainedBuilds,verifiedAt:now()}],...entries]);
    }
    async function download(){
      if(running)return running;
      abort=new AbortController();const signal=abort.signal;
      running=(async()=>{
        try {
        const cache=await caches.open(cacheName(release.buildId));
        await db.put(key('release:'+release.buildId),release);
        const active=await db.get(key('active')),previous=active?await caches.open(cacheName(active.buildId)):null;
        let bytes=0,files=0;
        const progress=async(state,error='')=>{const value={state,bytes,files,totalBytes:release.totalBytes,totalFiles:release.assets.length,buildId:release.buildId,error,updatedAt:now()};await db.put(key('job:'+release.buildId),value);notify(value);};
        try{
          await progress('downloading');
          for(const file of release.assets){
            if(signal.aborted)throw new DOMException('Paused','AbortError');
            const url=new URL(file.url,base).href;
            let response=await cache.match(url),saved=await validResponse(response,file);
            if(!saved&&previous){response=await previous.match(url);if(!await validResponse(response,file))response=null;}
            if(!saved){
              if(!response||!await validResponse(response,file))response=await fetch(url,{cache:'no-store',credentials:'omit',redirect:'error',signal});
              if(!await validResponse(response,file))throw Error('An app file is unavailable or differs from this release. Check the connection, then retry or check for updates.');
              if(signal.aborted)throw new DOMException('Paused','AbortError');
              await cache.put(url,response);
              if(!await validResponse(await cache.match(url),file))throw Error('An app file could not be saved. Free device space and retry.');
            }
            bytes+=file.bytes;files++;await progress('downloading');
          }
          if(!(await scan(release)).complete)throw Error('Download verification failed. Retry the download.');
          await progress('complete');
          // The first download is already the page's release. Later releases
          // need the worker's explicit, multi-tab activation handshake.
          if(!active)await promote();
        }catch(error){
          const message=error.name==='AbortError'?'':error.name==='QuotaExceededError'?'Device storage is full. Existing writing and the previous download are preserved. Free space and retry.':error.message||'Download interrupted. Retry when connected.';
          await progress(error.name==='AbortError'?'paused':'error',message);
        }
        }finally{running=null;abort=null;}
      })();
      return running;
    }
    async function pause(){abort?.abort();if(running)await running;}
    function eligible(request){
      const url=new URL(request.url),scope=new URL(base);
      // All queries (including OAuth codes) and every non-GET remain network-only.
      if(request.method!=='GET'||url.origin!==scope.origin||url.search||url.username||url.password)return false;
      if(request.mode==='navigate')return url.pathname===scope.pathname||url.pathname===scope.pathname+'index.html';
      return url.pathname.startsWith(scope.pathname+'assets/')&&/^[-a-zA-Z0-9.]+$/.test(url.pathname.slice((scope.pathname+'assets/').length));
    }
    async function cached(request){
      if(!eligible(request))return null;
      const active=await db.get(key('active'));if(!active)return null;
      const navigation=request.mode==='navigate';
      const url=navigation?new URL('index.html',base).href:request.url;
      // Only explicitly inventoried files from active/retained releases qualify.
      for(const id of [active.buildId,...(navigation?[]:active.retainedBuilds||[active.previousBuild])].filter(Boolean)){
        const manifest=await getRelease(id);if(!manifest)continue;
        if(navigation&&!(await scan(manifest)).complete){notify({state:'repair-needed',buildId:id,error:'Saved app files need repair. Reconnect and resume the download.'});return null;}
        const file=manifest.assets.find(file=>new URL(file.url,base).href===url);if(!file)continue;
        const response=await (await caches.open(cacheName(id))).match(url);
        if(await validResponse(response,file))return response;
        notify({state:'repair-needed',buildId:id,error:'Saved app files need repair. Reconnect and resume the download.'});
      }
      return null;
    }
    return {status,download,pause,promote,cached,eligible,scan,cacheName,key,getRelease};
  }
  root.CatalystOfflineCore={DB_NAME,validate,database,digest,validResponse,manager};
  if(typeof module!=='undefined')module.exports=root.CatalystOfflineCore;
})(typeof self!=='undefined'?self:globalThis);
