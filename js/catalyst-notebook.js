(function(root){
  'use strict';
  const MAX_IMPORT_BYTES=5*1024*1024;
  const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  const text=(value,max,required=false)=>typeof value==='string'&&value.length<=max&&(!required||!!value.trim());
  const language=value=>text(value,35,true)&&/^[a-z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/.test(value);
  const date=value=>text(value,40,true)&&Number.isFinite(Date.parse(value));
  function fields(value,allowed){
    if(Object.keys(value).some(k=>!allowed.includes(k)))throw new Error('This file contains unsupported fields. Keep the original export.');
  }
  function validateEntry(e){
    if(!object(e))throw new Error('Invalid sentence record.');
    fields(e,['id','original','lesson','meaning','meaningLanguage','createdAt','corrections','activityId']);
    if(!text(e.id,255,true)||!text(e.original,5000,true)||!text(e.lesson,100)||!/^[a-z0-9_-]*$/.test(e.lesson)||
       !text(e.meaning,5000)||!language(e.meaningLanguage)||!date(e.createdAt)||
       (e.activityId!==undefined&&(!text(e.activityId,100,true)||!/^[a-z0-9-]+$/.test(e.activityId)))||
       !Array.isArray(e.corrections)||e.corrections.length>1000)throw new Error('Invalid sentence record.');
    for(const c of e.corrections){
      if(!object(c))throw new Error('Invalid correction note.');
      fields(c,['text','createdAt','source']);
      if(!text(c.text,5000,true)||!date(c.createdAt)||c.source!=='user-entered')throw new Error('Invalid correction note.');
    }
  }
  function key(scope,language){
    if(!scope||scope==='loading'||!language)throw new Error('Account not ready');
    return 'catalyst_notebook_v1:'+encodeURIComponent(scope)+':'+encodeURIComponent(language);
  }
  function parse(raw){
    if(raw===null)return {version:1,entries:[]};
    const data=JSON.parse(raw);
    if(!object(data)||data.version!==1||!Array.isArray(data.entries))throw new Error('Unreadable notebook');
    fields(data,['version','entries']);
    const ids=new Set();
    for(const e of data.entries){
      validateEntry(e);
      if(ids.has(e.id))throw new Error('Duplicate sentence IDs.');
      ids.add(e.id);
    }
    return data;
  }
  function add(data,{id,original,lesson='',meaning='',meaningLanguage='en',createdAt,activityId}){
    const entry={id,original,lesson,meaning,meaningLanguage,createdAt,corrections:[]};
    if(activityId!==undefined)entry.activityId=activityId;
    validateEntry(entry);
    if(data.entries.some(e=>e.id===id))throw new Error('Invalid entry');
    return {...data,entries:[entry,...data.entries]};
  }
  function correct(data,id,note,createdAt){
    if(!text(note,5000,true)||!date(createdAt)||!data.entries.some(e=>e.id===id))throw new Error('Invalid correction');
    const next={...data,entries:data.entries.map(e=>e.id===id?{...e,corrections:[...e.corrections,{text:note,createdAt,source:'user-entered'}]}:e)};
    validateEntry(next.entries.find(e=>e.id===id));
    return next;
  }
  function parseImport(raw,targetLanguage){
    if(typeof raw!=='string'||new TextEncoder().encode(raw).byteLength>MAX_IMPORT_BYTES)throw new Error('Choose a notebook export smaller than 5 MB.');
    let backup;
    try{backup=JSON.parse(raw.replace(/^\uFEFF/,''));}catch(e){throw new Error('This file is not valid JSON. Choose a Catalyst notebook export.');}
    if(!object(backup)||backup.version!==1)throw new Error('Unsupported notebook format. Choose a version 1 Catalyst notebook export.');
    fields(backup,['language','version','entries']);
    if(!language(backup.language))throw new Error('The export is missing a valid learning language.');
    if(backup.language!==targetLanguage)throw new Error('This export is for '+backup.language+'. Switch the learning language before importing.');
    if(!Array.isArray(backup.entries)||backup.entries.length>10000)throw new Error('Invalid notebook or too many sentences (maximum 10,000 per import).');
    return {language:backup.language,...parse(JSON.stringify({version:backup.version,entries:backup.entries}))};
  }
  // Identity excludes notes so a later backup can add notes without replacing an original.
  const identity=e=>JSON.stringify([e.original,e.lesson,e.meaning,e.meaningLanguage,e.createdAt,e.activityId||'']);
  const noteIdentity=c=>JSON.stringify([c.text,c.createdAt,c.source]);
  function merge(data,backup){
    const entries=data.entries.map(e=>({...e,corrections:[...e.corrections]}));
    const byId=new Map(entries.map(e=>[e.id,e])),byIdentity=new Map(entries.map(e=>[identity(e),e]));
    const added=[],summary={added:0,updated:0,notesAdded:0,unchanged:0,conflictCopies:0};
    for(const incoming of backup.entries){
      const sameId=byId.get(incoming.id),same=identity(incoming);
      const existing=sameId&&identity(sameId)===same?sameId:byIdentity.get(same);
      if(existing){
        const notes=new Set(existing.corrections.map(noteIdentity));
        let count=0;
        for(const c of incoming.corrections){
          if(!notes.has(noteIdentity(c))){existing.corrections.push({...c});notes.add(noteIdentity(c));count++;}
        }
        validateEntry(existing);
        if(count){summary.updated++;summary.notesAdded+=count;}else summary.unchanged++;
      }else{
        let id=incoming.id,n=1;
        if(sameId){
          do{id=incoming.id.slice(0,230)+'-import-'+n++;}while(byId.has(id));
          summary.conflictCopies++;
        }
        const entry={...incoming,id,corrections:incoming.corrections.map(c=>({...c}))};
        byId.set(id,entry);byIdentity.set(same,entry);added.push(entry);summary.added++;
      }
    }
    return {data:{version:1,entries:[...added,...entries]},summary};
  }
  function addFromActivity(data,{pilot,targetLanguage,...entry}){
    if(!pilot||pilot.language!==targetLanguage)throw new Error('This activity belongs to another learning language.');
    const input={...entry,activityId:pilot.id,lesson:pilot.concept||''};
    const candidate=add({version:1,entries:[]},input).entries[0];
    // Repeated clicks or returning to the same draft do not create duplicate attempts.
    const existing=data.entries.find(e=>e.activityId===candidate.activityId&&e.original===candidate.original&&e.meaning===candidate.meaning&&e.meaningLanguage===candidate.meaningLanguage&&e.lesson===candidate.lesson);
    if(existing)return {data,added:false};
    return {data:add(data,input),added:true};
  }
  // Read latest storage immediately before a single atomic setItem. Failures propagate to UI.
  function commit(storage,scope,targetLanguage,change){
    if(root.CatalystSafety?.isLocked())throw Error('An update is being checked. Retry after it finishes.');
    const storageKey=key(scope,targetLanguage),current=parse(storage.getItem(storageKey));
    const next=change(current);
    const serialized=JSON.stringify(next);
    parse(serialized);
    storage.setItem(storageKey,serialized);
    return next;
  }
  root.CatalystNotebook={key,parse,add,correct,parseImport,merge,addFromActivity,commit,MAX_IMPORT_BYTES};
})(typeof window==='undefined'?globalThis:window);
