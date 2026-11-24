// Complete, derived source data only. Learner writing remains in its existing stores.
(function(root){
  'use strict';
  const DB='catalyst_study_snapshots_v1',STORE='snapshots';
  const error=(message,code)=>Object.assign(Error(message),{code});
  const denied=e=>root.CatalystAccount.denied(e)||e?.code==='ACCESS_DENIED';
  const changed=e=>['ACCESS_DENIED','ACCESS_CHANGED','ACCESS_UNAVAILABLE'].includes(e?.code)||denied(e);
  const descriptor=(owner,language,source,kind='ratings')=>({owner,language,source,kind});
  const key=d=>JSON.stringify([1,d.owner,d.language,d.source,d.kind]);
  function normalize(d,data){
    if(!Array.isArray(data?.words)||data.words.length>100000)throw error('Source did not return a complete word list.','INVALID_SOURCE');
    const seen=new Set(),words=data.words.map(row=>{
      if(!row||!['string','number'].includes(typeof row.id)||row.language!==d.language||seen.has(String(row.id)))throw error('Source returned ambiguous words. Previous snapshot retained.','INVALID_SOURCE');
      seen.add(String(row.id));
      const fields=d.kind==='patterns'?['id','language','native','english']:['id','language','source','text','english','status','label','level','rating'];
      const out={};for(const field of fields)if(row[field]!==undefined){if(row[field]!==null&&!['string','number'].includes(typeof row[field]))throw error('Invalid word value.','INVALID_SOURCE');out[field]=row[field];}
      if(typeof out[d.kind==='patterns'?'native':'text']!=='string'||(d.kind==='ratings'&&(out.source!==d.source||typeof out.label!=='string')))throw error('Source word contract changed.','INVALID_SOURCE');
      return out;
    });
    return {words,linked:d.kind==='patterns'?words.length:words.filter(w=>w.status!=='unrated').length,source:d.source,language:d.language};
  }
  async function kgAccess(client,language){
    const allowed=await client.rpc('kg_chart_is_allowed');if(allowed.error)throw Object.assign(Error(allowed.error.message||'KG Chart access check failed.'),allowed.error,{status:allowed.error.status||allowed.status});
    if(allowed.data!==true)throw error('KG Chart access is no longer available for this account.','ACCESS_DENIED');
    const access=await client.rpc('kg_chart_u3_my_access_snapshot');
    if(access.error){access.error.status=access.error.status||access.status;if(denied(access.error))throw access.error;if(['PGRST202','42883'].includes(access.error.code))throw error('KG Chart offline words are not ready: the account permission service has not been deployed.','ACCESS_UNAVAILABLE');throw access.error;}
    const a=access.data;
    // Restricted profiles need a separately validated source contract. Never infer
    // permission from an empty result or from unenforced client-side feature grants.
    if(a?.contract!==1||a.mode!=='legacy'||!Number.isInteger(a.revision)||a.languages!==null||a.topics!==null||a.features!==null)throw error('KG Chart offline words require a compatible, verified permission contract.','ACCESS_UNAVAILABLE');
    const visibility=await client.rpc('kg_chart_my_private_lesson_visibility',{p_language:language});
    if(visibility.error){visibility.error.status=visibility.error.status||visibility.status;if(denied(visibility.error))throw visibility.error;if(['PGRST202','42883'].includes(visibility.error.code))throw error('KG Chart offline words are not ready: private lesson checks have not been deployed.','ACCESS_UNAVAILABLE');throw visibility.error;}
    const v=visibility.data;
    if(v?.contract!==1||!Array.isArray(v.topics)||!v.topics.every(t=>typeof t==='string')||!Array.isArray(v.groups)||!v.groups.every(g=>typeof g==='string'))throw error('KG Chart private lesson checks are unavailable.','ACCESS_UNAVAILABLE');
    const hidden=[...new Set(v.topics)].sort();
    return {signature:JSON.stringify([1,a.mode,a.revision,hidden]),allows:topic=>typeof topic==='string'&&!!topic&&!hidden.includes(topic)};
  }
  function create({indexedDB,storage,account,client,events=root,now=()=>new Date().toISOString()}){
    let dbPromise,version=0;const listeners=new Set();
    const notify=()=>{version++;listeners.forEach(fn=>fn());};
    function db(){return dbPromise||(dbPromise=new Promise((resolve,reject)=>{
      if(!indexedDB){reject(Error('This browser cannot save word snapshots.'));return;}
      const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>request.result.createObjectStore(STORE);
      request.onerror=()=>{dbPromise=null;reject(request.error);};request.onblocked=()=>reject(Error('Close older Catalyst tabs and retry word storage.'));
      request.onsuccess=()=>{const value=request.result;value.onversionchange=()=>{value.close();dbPromise=null;};resolve(value);};
    }));}
    async function transact(mode,fn){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction(STORE,mode);let result,failure;tx.oncomplete=()=>resolve(result);tx.onerror=tx.onabort=()=>reject(failure||tx.error||Error('Word storage interrupted.'));fn(tx.objectStore(STORE),value=>{result=value;},tx,error=>{failure=error;tx.abort();});});}
    const gateKey=d=>'catalyst_snapshot_gate_v1:'+encodeURIComponent(d.owner)+':'+d.source;
    const gate=d=>storage.getItem(gateKey(d))||'initial';
    const storageChanged=e=>{const owner=account.getSnapshot().owner?.id;if(owner&&(e.key===null||e.key?.startsWith('catalyst_snapshot_gate_v1:'+encodeURIComponent(owner)+':')))notify();};
    events.addEventListener?.('storage',storageChanged);
    function usable(d){const s=account.getSnapshot();return s.prepared&&s.owner?.id===d.owner&&account.valid(account.ticket());}
    function validate(d,record){
      if(record.version!==1||key(record)!==key(d)||!Number.isFinite(Date.parse(record.savedAt))||typeof record.gate!=='string')throw Error('Saved words are unreadable. The original snapshot is preserved.');
      return {...record,data:normalize(d,record.data)};
    }
    async function read(d){
      if(!usable(d))return null;
      const ticket=account.ticket(),record=await transact('readonly',(store,done)=>{store.get(key(d)).onsuccess=e=>done(e.target.result);});
      if(!account.valid(ticket)||!usable(d))return null;
      if(!record)return null;
      const validated=validate(d,record);
      if(record.gate!==gate(d))throw Error('Saved words are locked until source access is checked and refreshed online.');
      return validated;
    }
    function lock(d){
      try{storage.setItem(gateKey(d),root.crypto.randomUUID());}
      catch{account.disable('Offline account access paused because a source denial could not be saved. Reconnect and prepare again.');}
      notify();
    }
    async function fetch(d,access){
      if(d.kind==='patterns')return {words:await root.CatalystPatterns.load(client,d.owner,access)};
      return root.CatalystVocabulary.loadSource(client,d.owner,d.language,d.source,access);
    }
    async function refresh(d,{persist=false,current=()=>true}={}){
      const ticket=account.ticket(),initialGate=gate(d),check=()=>account.valid(ticket)&&current()&&gate(d)===initialGate;
      if(!account.getSnapshot().online||!check())throw error('Connect to refresh your words.','OFFLINE');
      try{
        const before=persist&&d.source==='kg'?await kgAccess(client,d.language):null;
        if(!check())throw error('Account or language changed.','CANCELLED');
        const data=normalize(d,await fetch(d,before));
        if(!check())throw error('Account or language changed.','CANCELLED');
        if(before){const after=await kgAccess(client,d.language);if(after.signature!==before.signature)throw error('KG Chart permissions changed during download. Retry to refresh.','ACCESS_CHANGED');}
        if(!check())throw error('Account or language changed.','CANCELLED');
        if(!persist)return {data,savedAt:null};
        if(!usable(d))throw error('Prepare this account before saving words.','CANCELLED');
        const record={version:1,...d,data,savedAt:now(),gate:initialGate,permission:before?.signature||'owner-v1'};
        await transact('readwrite',(store,done,tx,fail)=>{
          if(!check()){tx.abort();return;}
          // Validate inside the write transaction so a newer/unknown format is
          // never overwritten, including one another tab wrote during download.
          store.get(key(d)).onsuccess=e=>{
            try{
              if(e.target.result)validate(d,e.target.result);
              if(!check()){tx.abort();return;}
              const request=store.put(record,key(d));request.onsuccess=()=>{if(!check())tx.abort();else done(record);};
            }catch(error){fail(error);}
          };
        });
        if(!check())throw error('Account or language changed.','CANCELLED');
        notify();return record;
      }catch(e){if(check()&&changed(e))lock(d);throw e;}
    }
    async function load(d,{current=()=>true}={}){
      let cached=null,readError;try{cached=await read(d);}catch(e){readError=e;}
      if(!current())throw error('View changed.','CANCELLED');
      if(!account.getSnapshot().online){if(cached)return {...cached.data,savedAt:cached.savedAt,stale:true,message:'Offline · saved words; refresh pending.'};throw readError||Error('No saved words for this account, language and source. Prepare them online in Study offline.');}
      if(readError)throw readError;
      try{
        // Only an explicitly prepared source is automatically refreshed.
        const result=await refresh(d,{persist:!!cached,current});
        return {...result.data,savedAt:result.savedAt,stale:false,message:''};
      }catch(e){
        if(e.code==='CANCELLED'||!current())throw e;
        if(changed(e)||readError)throw e;
        if(cached&&usable(d)){
          // A sibling tab may have locked this source while the network request
          // was pending. Re-read the durable gate before showing stale words.
          const retained=await read(d);
          if(retained&&current())return {...retained.data,savedAt:retained.savedAt,stale:true,message:'Refresh failed · using the last complete saved words.'};
        }
        throw e;
      }
    }
    return {read,refresh,load,lock,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},getVersion:()=>version,close:async()=>{events.removeEventListener?.('storage',storageChanged);if(dbPromise)(await dbPromise).close();dbPromise=null;}};
  }
  root.CatalystSnapshots={DB,STORE,descriptor,key,normalize,kgAccess,create};
})(typeof window==='undefined'?globalThis:window);
