// Public, bundled lesson recordings only. Never caches arbitrary URLs or account media.
(function(root){
  'use strict';
  const BASE='https://ulgrfumbwjovbjzjiems.supabase.co/storage/v1/object/public/vocabulary-assets/audio-grammar/';
  const LANGS=['ja','my','zh','mr','en'],VOICES=['f','m'],HEX=/^[a-f0-9]{64}$/;
  const norm=text=>(text||'').normalize('NFC').trim().split(/\s+/).filter(Boolean).join(' ');
  function hash(text){let h=0x811c9dc5;for(const b of new TextEncoder().encode(norm(text))){h^=b;h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,'0');}
  const digest=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
  const fail=(message,code)=>Object.assign(Error(message),{code});
  const pair=(lang,voice)=>{if(!LANGS.includes(lang)||!VOICES.includes(voice))throw fail('Unsupported audio language or voice.','invalid');return lang+':'+voice;};
  function validate(pack){
    if(!pack||pack.version!==1||!HEX.test(pack.id)||!Array.isArray(pack.files)||pack.files.length>1000||typeof pack.voiceName!=='string'||!pack.voiceName.trim()||pack.voiceName.length>128)throw fail('Saved audio inventory is unreadable. Existing data is preserved.','invalid');
    pair(pack.language,pack.voice);const hashes=new Set(),sizes=new Map();let total=0;
    for(const f of pack.files){
      if(!f||!/^[a-f0-9]{8}$/.test(f.hash)||!HEX.test(f.sha256)||!HEX.test(f.textSha256)||!Number.isSafeInteger(f.bytes)||f.bytes<4||f.bytes>20*1024*1024||hashes.has(f.hash))throw fail('Invalid recorded-audio inventory.','invalid');
      hashes.add(f.hash);if(sizes.has(f.sha256)&&sizes.get(f.sha256)!==f.bytes)throw fail('Conflicting audio file sizes.','invalid');
      if(!sizes.has(f.sha256))total+=f.bytes;sizes.set(f.sha256,f.bytes);
    }
    if(total!==pack.totalBytes||total>100*1024*1024||!Number.isSafeInteger(pack.lessonCount)||pack.lessonCount<pack.files.length)throw fail('Invalid audio download size.','invalid');
    return pack;
  }
  async function inventory(raw,language,voice,allowed){
    pair(language,voice);
    if(raw?.version!==2||raw.lang!==language||!Array.isArray(raw.files)||raw.files.length>2000||!raw.voices||typeof raw.voices[voice]!=='string')throw fail('Recordings need a verified size and checksum inventory before offline download.','unverified');
    for(const v of VOICES)if(!Array.isArray(raw[v])||raw[v].some(h=>!/^[a-f0-9]{8}$/.test(h))||new Set(raw[v]).size!==raw[v].length)throw fail('Invalid audio manifest.','invalid');
    const names=new Set();
    for(const f of raw.files){if(!f||!VOICES.includes(f.voice)||f.mime!=='audio/mpeg'||!HEX.test(f.sha256)||!HEX.test(f.textSha256)||!Number.isSafeInteger(f.bytes)||f.bytes<4||f.bytes>20*1024*1024||!raw[f.voice].includes(f.hash)||names.has(f.voice+':'+f.hash))throw fail('Conflicting audio manifest entries.','invalid');names.add(f.voice+':'+f.hash);}
    if(raw.m.length+raw.f.length!==raw.files.length)throw fail('Audio inventory is incomplete.','invalid');
    const files=raw.files.filter(f=>f.voice===voice&&allowed?.[f.hash]===f.textSha256).map(({hash,bytes,sha256,textSha256})=>({hash,bytes,sha256,textSha256})).sort((a,b)=>a.hash.localeCompare(b.hash));
    const content={version:1,language,voice,voiceName:raw.voices[voice],lessonCount:Object.keys(allowed||{}).length,files,totalBytes:[...new Map(files.map(f=>[f.sha256,f.bytes])).values()].reduce((n,b)=>n+b,0)};
    return validate({...content,id:await digest(new TextEncoder().encode(JSON.stringify(content)))});
  }
  function mp3(bytes){
    // Reject HTML/JSON/empty files even when a server sends an audio MIME type.
    const b=new Uint8Array(bytes);if(b.length<4)return false;
    if(b[0]===73&&b[1]===68&&b[2]===51&&b.length>=10&&[2,3,4].includes(b[3])){
      if([b[6],b[7],b[8],b[9]].some(n=>n>127))return false;
      const end=10+((b[6]<<21)|(b[7]<<14)|(b[8]<<7)|b[9]);
      if(end>=b.length)return false;
      return frame(b,end);
    }
    return frame(b,0);
  }
  function frame(b,i){return b[i]===255&&(b[i+1]&224)===224&&(b[i+1]&24)!==8&&(b[i+1]&6)!==0&&(b[i+2]&240)!==0&&(b[i+2]&240)!==240&&(b[i+2]&12)!==12;}
  async function verified(response,file){
    if(!response||response.status!==200||response.type==='opaque'||response.redirected||(response.headers.get('Content-Type')||'').split(';')[0].trim().toLowerCase()!=='audio/mpeg')return false;
    const bytes=await response.clone().arrayBuffer();return bytes.byteLength===file.bytes&&mp3(bytes)&&await digest(bytes)===file.sha256;
  }
  async function range(response,value){
    const bytes=await response.arrayBuffer(),length=bytes.byteLength,headers={'Content-Type':'audio/mpeg','Accept-Ranges':'bytes','Cache-Control':'no-store'};
    if(!value)return new Response(bytes,{status:200,headers:{...headers,'Content-Length':String(length)}});
    const match=/^bytes=(\d*)-(\d*)$/.exec(value);let start,end;
    if(match&&(match[1]||match[2])){
      start=match[1]?Number(match[1]):Math.max(0,length-Number(match[2]));end=match[1]?(match[2]?Math.min(Number(match[2]),length-1):length-1):length-1;
      if(!match[1]&&Number(match[2])===0)start=length;
    }
    if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=length||end<start)return new Response(null,{status:416,headers:{...headers,'Content-Range':'bytes */'+length}});
    return new Response(bytes.slice(start,end+1),{status:206,headers:{...headers,'Content-Length':String(end-start+1),'Content-Range':`bytes ${start}-${end}/${length}`}});
  }
  function manager({base,catalog={},caches,db,fetch,notify=()=>{},now=()=>Date.now(),timeout=30000}){
    const scope=new URL(base),prefix=scope.pathname+':audio:',cacheName='catalyst-audio-v1-'+encodeURIComponent(scope.pathname);
    const key=(lang,voice)=>prefix+pair(lang,voice),blobURL=sha=>new URL('__catalyst_audio_blob__/'+sha,base).href;
    const mediaURL=(pack,file)=>new URL(`__catalyst_audio__/${pack.language}/${pack.voice}/${file.hash}/${file.sha256}.mp3`,base).href;
    let job=null,sequence=0;const publish=value=>notify({...value,sequence:++sequence});
    const record=async(lang,voice)=>{
      const r=await db.get(key(lang,voice));if(!r)return {version:1,active:null,candidate:null,state:'not-downloaded'};
      if(r.version!==1||(r.removing&&(!Array.isArray(r.removing)||r.removing.some(sha=>!HEX.test(sha)))))throw fail('Audio metadata is unreadable. Saved files are preserved.','invalid');
      for(const p of [r.active,r.candidate].filter(Boolean)){validate(p);const {id,...content}=p;if(await digest(new TextEncoder().encode(JSON.stringify(content)))!==id)throw fail('Saved audio inventory checksum differs. Existing data is preserved.','invalid');if(p.language!==lang||p.voice!==voice)throw fail('Audio ownership metadata does not match this language and voice.','invalid');}
      return r;
    };
    async function scan(pack){
      if(!pack)return {files:0,bytes:0,complete:false};validate(pack);const cache=await caches.open(cacheName);let files=0,bytes=0;
      for(const file of new Map(pack.files.map(f=>[f.sha256,f])).values())if(await verified(await cache.match(blobURL(file.sha256)),file)){files++;bytes+=file.bytes;}
      return {files,bytes,complete:pack.files.length>0&&files===new Set(pack.files.map(f=>f.sha256)).size};
    }
    async function status(language,voice){
      const r=await record(language,voice),active=await scan(r.active),candidate=await scan(r.candidate);
      return {language,voice,state:job?.pair===pair(language,voice)?job.type:r.state==='downloading'?'interrupted':r.removing?.length?'removal-paused':r.state,error:r.error||'',active:r.active,activeHealthy:active.complete,candidate:r.candidate,progress:candidate,verifiedAt:active.complete?now():null,busy:job?.pair||null,removing:r.removing||[]};
    }
    async function request(url,signal,limit=1024*1024){
      const controller=new AbortController(),abort=()=>controller.abort();signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
      const timer=setTimeout(abort,timeout);
      try{
        const response=await fetch(url,{credentials:'omit',redirect:'error',cache:'no-store',mode:'cors',signal:controller.signal});
        if(response.type==='opaque'||response.redirected)throw fail('The audio server did not return a readable file.','invalid');
        if(Number(response.headers.get('Content-Length'))>limit)throw fail('An audio response exceeds its declared size.','invalid');
        const reader=response.body?.getReader();let total=0;const chunks=[];
        if(reader){try{while(true){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>limit)throw fail('An audio response exceeds its declared size.','invalid');chunks.push(value);}}catch(error){await reader.cancel().catch(()=>{});throw error;}}
        const bytes=new Uint8Array(total);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
        return new Response(bytes,{status:response.status,headers:response.headers});
      }
      finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
    }
    async function operate(language,voice,type,fn){
      if(job)throw fail('Another audio operation is running. Pause it before starting another.','busy');
      const current={pair:pair(language,voice),type,abort:new AbortController()};job=current;
      try{return await fn(current.abort.signal);}finally{if(job===current)job=null;publish({language,voice,changed:true});}
    }
    async function inspect(language,voice){return operate(language,voice,'checking',async signal=>{
      const old=await record(language,voice);
      try{
        const response=await request(BASE+language+'/clips.json',signal);
        if(!response.ok){
          let body;try{body=await response.json();}catch{}
          if(response.status===404||response.status===400&&['NoSuchKey','not_found'].includes(body?.code))throw fail('No recorded lesson audio has been published for this language. Device voices are separate.','missing');
          throw fail('The audio inventory could not be read (HTTP '+response.status+'). Retry when connected.','network');
        }
        if((response.headers.get('Content-Type')||'').split(';')[0].trim().toLowerCase()!=='application/json')throw fail('The audio manifest has an invalid format.','invalid');
        const raw=await response.text();if(raw.length>1024*1024)throw fail('Audio manifest is too large.','invalid');
        const pack=await inventory(JSON.parse(raw),language,voice,catalog[language]);if(signal.aborted)throw fail('Audio check paused.','paused');
        await db.put(key(language,voice),{...old,candidate:pack,state:pack.files.length?'available':'unavailable',error:pack.files.length?'':'No verified recordings match the bundled lessons for this voice.',checkedAt:now()});return pack;
      }catch(error){await db.put(key(language,voice),{...old,state:signal.aborted?'paused':error.code==='missing'?'unavailable':'error',error:signal.aborted?'':error.message||'Audio check failed. Previous downloads retained.'});if(!signal.aborted)throw error;}
    });}
    async function download(language,voice){return operate(language,voice,'downloading',async signal=>{
      const old=await record(language,voice),pack=old.candidate;if(!pack?.files.length)throw fail('Check available recordings before downloading.','missing');
      const cache=await caches.open(cacheName);let files=0,bytes=0;
      const progress=async(state,error='')=>{const value={...old,state,error,progress:{files,bytes},updatedAt:now()};await db.put(key(language,voice),value);publish({language,voice,state,error,progress:{files,bytes,complete:false}});};
      try{
        await progress('downloading');
        for(const file of new Map(pack.files.map(f=>[f.sha256,f])).values()){
          if(signal.aborted)throw fail('Audio download paused.','paused');
          let saved=await cache.match(blobURL(file.sha256));
          if(!await verified(saved,file)){
            const response=await request(BASE+language+'/'+voice+'/'+file.hash+'.mp3',signal,file.bytes);
            if(!response.ok)throw fail('A recording is unavailable (HTTP '+response.status+'). Saved files are retained; retry later.','network');
            if(!await verified(response,file))throw fail('A recording differs from its size, format or checksum. No replacement was saved.','invalid');
            if(signal.aborted)throw fail('Audio download paused.','paused');
            await cache.put(blobURL(file.sha256),new Response(await response.arrayBuffer(),{headers:{'Content-Type':'audio/mpeg'}}));
            if(!await verified(await cache.match(blobURL(file.sha256)),file))throw fail('A recording could not be saved. Free space and retry.','storage');
          }
          files++;bytes+=file.bytes;await progress('downloading');
        }
        if(signal.aborted)throw fail('Audio download paused.','paused');
        if(!(await scan(pack)).complete)throw fail('Audio verification failed. Resume to repair missing files.','storage');
        await db.put(key(language,voice),{...old,active:pack,candidate:pack,state:'complete',error:'',verifiedAt:now()});
      }catch(error){await progress(signal.aborted?'paused':'error',signal.aborted?'':error.message||'Audio download interrupted.');if(!signal.aborted)throw error;}
    });}
    function pause(language,voice){if(job&&(!language||job.pair===pair(language,voice)))job.abort.abort();}
    async function remove(language,voice){return operate(language,voice,'removing',async signal=>{
      const old=await record(language,voice),candidates=new Set([...(old.removing||[]),...[old.active,old.candidate].filter(Boolean).flatMap(p=>p.files.map(f=>f.sha256))]),keep=new Set();
      for(const l of LANGS)for(const v of VOICES)if(l!==language||v!==voice){const r=await record(l,v);for(const p of [r.active,r.candidate].filter(Boolean))for(const f of p.files)keep.add(f.sha256);}
      // Detach first: an interrupted removal cannot claim a missing pack ready.
      await db.put(key(language,voice),{version:1,active:null,candidate:null,state:'removal-paused',error:'',removing:[...candidates]});
      const cache=await caches.open(cacheName);for(const sha of candidates){if(signal.aborted)return;if(!keep.has(sha))await cache.delete(blobURL(sha));}
      await db.put(key(language,voice),{version:1,active:null,candidate:null,state:'not-downloaded',error:'',removing:[]});
    });}
    function eligible(request){const url=new URL(request.url);return request.method==='GET'&&url.origin===scope.origin&&!url.search&&!url.hash&&url.pathname.startsWith(scope.pathname+'__catalyst_audio__/');}
    async function serve(request){
      const url=new URL(request.url),match=/^__catalyst_audio__\/(ja|my|zh|mr|en)\/(m|f)\/([a-f0-9]{8})\/([a-f0-9]{64})\.mp3$/.exec(url.pathname.slice(scope.pathname.length));
      if(!eligible(request)||!match)return new Response('Unknown audio file',{status:404});
      const [,language,voice,hash,sha]=match,r=await record(language,voice),file=r.active?.files.find(f=>f.hash===hash&&f.sha256===sha);
      if(file){const response=await (await caches.open(cacheName)).match(blobURL(sha));if(await verified(response,file))return range(response,request.headers.get('Range'));}
      publish({language,voice,repair:true,changed:true});return new Response('Saved recording is missing or damaged. Reconnect and repair this audio pack.',{status:503,headers:{'Content-Type':'text/plain','Cache-Control':'no-store'}});
    }
    return {status,inspect,download,pause,remove,eligible,serve,scan,mediaURL,cacheName,blobURL,key,get busy(){return !!job;}};
  }
  root.CatalystMediaCore={BASE,LANGS,VOICES,norm,hash,digest,validate,inventory,mp3,verified,range,manager};
  if(typeof module!=='undefined')module.exports=root.CatalystMediaCore;
})(typeof self!=='undefined'?self:globalThis);
