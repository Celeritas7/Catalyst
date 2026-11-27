/* Guided progress is account/language scoped. Legacy device writing is never assigned automatically. */
(function(root){
  'use strict';
  const object=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
  const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
  const empty=()=>({version:1,items:{}});
  function key(scope,language){
    if(typeof scope!=='string'||!scope||scope==='loading'||!['my','ja','zh','mr','en'].includes(language))throw Error('Wait for the study account before saving an activity.');
    return 'catalyst_activity_v1:'+encodeURIComponent(scope)+':'+language;
  }
  function parse(raw){
    if(raw===null)return empty();
    const value=JSON.parse(raw);
    const invalid=()=>{throw Error('Activity progress cannot be read. The original is preserved; export a recovery file.');};
    if(!object(value)||value.version!==1||!object(value.items)||Object.keys(value).some(k=>!['version','items'].includes(k))||Object.keys(value.items).length>500)invalid();
    for(const [id,item] of Object.entries(value.items)){
      if(!/^[a-z][a-z0-9-]{0,99}$/.test(id)||!object(item)||Object.keys(item).some(k=>!['step','completed','writing','updatedAt'].includes(k))||
        !Number.isInteger(item.step)||item.step<0||item.step>4||typeof item.completed!=='boolean'||!Number.isFinite(item.updatedAt)||!object(item.writing))invalid();
      for(const [language,writing] of Object.entries(item.writing)){
        if(!['mr','en'].includes(language)||!object(writing)||Object.keys(writing).some(k=>!['draft','meaning'].includes(k))||
          typeof writing.draft!=='string'||writing.draft.length>4000||typeof writing.meaning!=='string'||writing.meaning.length>5000)invalid();
      }
    }
    return value;
  }
  function commit(storage,scope,language,id,patch,expected){
    if(root.CatalystSafety?.isLocked())throw Error('An app update is being checked. Wait a moment.');
    const storageKey=key(scope,language),before=storage.getItem(storageKey),data=parse(before),previous=own(data.items,id)?data.items[id]:null;
    if(JSON.stringify(previous)!==JSON.stringify(expected))throw Error('This activity changed in another view. Keep your writing for later, then close and reopen the activity.');
    const item={step:0,completed:false,...previous,...patch,writing:{...previous?.writing,...patch.writing},updatedAt:Date.now()};
    const next={version:1,items:{...data.items,[id]:item}},raw=JSON.stringify(next);parse(raw);
    if(storage.getItem(storageKey)!==before)throw Error('Activity progress changed before saving. Reopen the activity and try again.');
    storage.setItem(storageKey,raw);return next;
  }
  function legacyWriting(raw,pilotKey){
    const settings=root.CatalystSafety.settings(raw),record=object(settings.activities)&&own(settings.activities,pilotKey)?settings.activities[pilotKey]:null;
    return object(record)&&typeof record.draft==='string'&&record.draft.trim()&&record.draft.length<=4000?record.draft:null;
  }
  root.CatalystActivityProgress={empty,key,parse,commit,legacyWriting};
})(typeof window==='undefined'?globalThis:window);
