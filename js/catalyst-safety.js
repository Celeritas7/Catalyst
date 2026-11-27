/* Existing learner keys remain authoritative. Only explicit Catalyst records are read. */
(function(root){
  'use strict';
  const object=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
  const clone=v=>JSON.parse(JSON.stringify(v));
  const languages=['ja','my','zh','mr','en'];
  const guards=new Map(),memory=new Map();
  let locked=false;
  function dirty(id,value){if(value)guards.set(id,true);else guards.delete(id);}
  const hasDirty=()=>guards.size>0||[...memory.values()].some(value=>!value.saved);
  function settings(raw){
    if(raw===null)return {};
    const value=JSON.parse(raw);
    if(!object(value)||(value.preferencesVersion!==undefined&&![1,2].includes(value.preferencesVersion))||
       (value.learned!==undefined&&(!Array.isArray(value.learned)||value.learned.some(id=>typeof id!=='string')))||
       ['practice','activities'].some(key=>value[key]!==undefined&&!object(value[key])))throw Error('Settings or history cannot be read. The original is preserved; export a recovery file before making repairs.');
    return value;
  }
  function writeSettings(storage,patch){
    if(locked)throw Error('An app update is being checked. Wait a moment.');
    const previous=root.CatalystPreferences.normalize(settings(storage.getItem('catalyst_settings')));
    const next=root.CatalystPreferences.normalize({...previous,...(typeof patch==='function'?patch(previous):patch)});
    settings(JSON.stringify(next));storage.setItem('catalyst_settings',JSON.stringify(next));return next;
  }
  function draftKey(scope,language){
    if(!scope||scope==='loading'||!languages.includes(language))throw Error('Account is not ready for saving a draft.');
    return 'catalyst_drafts_v1:'+encodeURIComponent(scope)+':'+language;
  }
  function parseDrafts(raw){
    if(raw===null)return {version:1,drafts:{}};
    const value=JSON.parse(raw);
    if(!object(value)||value.version!==1||!object(value.drafts)||Object.keys(value.drafts).length>500)throw Error('Saved drafts cannot be read. Their original data is preserved.');
    for(const [id,draft] of Object.entries(value.drafts)){
      if(!/^[a-zA-Z0-9-]{1,100}$/.test(id)||!object(draft)||!['notebook','activity'].includes(draft.type)||typeof draft.context!=='string'||draft.context.length>150||!Number.isFinite(draft.updatedAt)||!object(draft.fields)||JSON.stringify(draft.fields).length>150000)throw Error('Unsupported draft record.');
      const allowed=draft.type==='notebook'?['original','meaning','lesson','corrections']:['draft','meaning'];
      for(const [key,field] of Object.entries(draft.fields)){
        if(!allowed.includes(key))throw Error('Unsupported draft field.');
        if(key==='corrections'){
          if(!object(field)||Object.values(field).some(text=>typeof text!=='string'||text.length>5000))throw Error('Invalid correction draft.');
        }else if(typeof field!=='string'||field.length>5000)throw Error('Invalid writing draft.');
      }
    }
    return value;
  }
  function draftSlots(storage,key){
    const slots=[];
    for(let i=0;i<storage.length;i++){
      const slot=storage.key(i);
      // Read only this exact owner/language prefix, never another account's values.
      if(slot?.startsWith(key+':'))slots.push({key:slot,raw:storage.getItem(slot)});
    }
    return slots;
  }
  function readDrafts(storage,key){
    const data=parseDrafts(storage.getItem(key)),drafts={...data.drafts};
    for(const slot of draftSlots(storage,key))for(const [id,draft] of Object.entries(parseDrafts(slot.raw).drafts)){
      if(!drafts[id]||draft.updatedAt>=drafts[id].updatedAt)drafts[id]=draft;
    }
    return {version:1,drafts};
  }
  function saveDraft(storage,scope,language,id,type,context,fields,{unsaved=true}={}){
    if(locked)throw Error('An update is being checked; wait before typing.');
    const key=draftKey(scope,language),draft={type,context,fields:clone(fields),updatedAt:Date.now()};
    memory.set(key+':'+id,{key,id,draft,saved:false});dirty('draft:'+id,unsaved);
    const current=readDrafts(storage,key); // preserve unreadable/future records
    const next={version:1,drafts:{[id]:draft}};
    // One atomic slot per page draft avoids a cross-tab read/modify/write race.
    // The aggregate key remains readable for recovery imports and older drafts.
    parseDrafts(JSON.stringify({version:1,drafts:{...current.drafts,[id]:draft}}));storage.setItem(key+':'+id,JSON.stringify(next));
    memory.set(key+':'+id,{key,id,draft,saved:true});return draft;
  }
  function listDrafts(storage,scope,language,type,context){
    const key=draftKey(scope,language),drafts={...readDrafts(storage,key).drafts};
    for(const value of memory.values())if(value.key===key)drafts[value.id]=value.draft;
    return Object.entries(drafts).filter(([,draft])=>draft.type===type&&draft.context===context).map(([id,draft])=>({id,...draft})).sort((a,b)=>b.updatedAt-a.updatedAt);
  }
  function removeDraft(storage,scope,language,id,expected){
    const key=draftKey(scope,language),data=readDrafts(storage,key);
    if(expected&&JSON.stringify(data.drafts[id])!==JSON.stringify({type:expected.type,context:expected.context,fields:expected.fields,updatedAt:expected.updatedAt}))return;
    const aggregate=parseDrafts(storage.getItem(key));
    if(aggregate.drafts[id]){const drafts={...aggregate.drafts};delete drafts[id];storage.setItem(key,JSON.stringify({version:1,drafts}));}
    storage.removeItem(key+':'+id);memory.delete(key+':'+id);dirty('draft:'+id,false);
  }
  // Recovery files use record descriptors, never arbitrary storage keys supplied by a file.
  function recordKey(record,scope){
    const owner=record.owner==='guest'?'guest':scope;
    if(record.type==='settings')return 'catalyst_settings';
    if(record.type==='audio')return 'catalyst_audio_prefs';
    if(record.type==='notebook')return root.CatalystNotebook.key(owner,record.language);
    if(record.type==='review')return root.CatalystReview.storageKey(owner,record.language);
    if(record.type==='activity')return root.CatalystActivityProgress.key(owner,record.language);
    if(record.type==='draft')return draftKey(owner,record.language);
    throw Error('Unsupported recovery record.');
  }
  const archiveKey=scope=>'catalyst_recovery_copies_v1:'+encodeURIComponent(scope);
  const journalKey=scope=>'catalyst_recovery_journal_v1:'+encodeURIComponent(scope);
  function parseCopies(raw){const value=raw===null?{version:1,copies:[]}:JSON.parse(raw);if(!object(value)||value.version!==1||Object.keys(value).some(key=>!['version','copies'].includes(key))||!Array.isArray(value.copies)||value.copies.some(copy=>!object(copy)||!object(copy.record)||typeof copy.raw!=='string'))throw Error('Recovery copies cannot be read; export their raw contents first.');return value;}
  const copyDescriptor=record=>({type:record.type,owner:record.owner,language:record.language});
  const copyIdentity=(record,raw)=>JSON.stringify([copyDescriptor(record),raw]);
  function knownCopies(raw){
    try{
      const value=parseCopies(raw);
      // Flatten only the known inert envelope. Unknown fields/formats are kept
      // verbatim as a single copy rather than silently discarded or executed.
      if(Object.keys(value).some(key=>!['version','copies'].includes(key))||value.copies.some(copy=>
        Object.keys(copy).some(key=>!['record','raw'].includes(key))||
        Object.keys(copy.record).some(key=>!['type','owner','language'].includes(key))||
        !['notebook','review','draft','activity','settings','audio','retained-copies','retained-journal'].includes(copy.record.type)||
        !['current','guest','device'].includes(copy.record.owner)||
        (copy.record.language!==undefined&&!languages.includes(copy.record.language))))return null;
      return value.copies;
    }catch{return null;}
  }
  function exportRecovery(storage,scope,{guest=false,device=true}={}){
    if(!scope||scope==='loading')throw Error('Wait for the current account before exporting.');
    const records=[],damagedDraftCopies=[];
    const owners=scope==='guest'?['guest']:['current',...guest?['guest']:[]];
    for(const owner of owners)for(const language of languages)for(const type of ['notebook','review','draft','activity']){
      const descriptor={owner,language,type},key=recordKey(descriptor,scope);let raw=storage.getItem(key);
      if(type==='draft'&&draftSlots(storage,key).length){
        try{raw=JSON.stringify(readDrafts(storage,key));}
        catch(error){for(const slot of draftSlots(storage,key))damagedDraftCopies.push({record:descriptor,raw:slot.raw});}
      }
      if(raw!==null)records.push({...descriptor,raw});
    }
    if(device)for(const type of ['settings','audio']){const raw=storage.getItem(recordKey({type},scope));if(raw!==null)records.push({owner:'device',type,raw});}
    let copies=storage.getItem(archiveKey(scope));const journal=storage.getItem(journalKey(scope));
    if(damagedDraftCopies.length)copies=JSON.stringify({version:1,copies:[...damagedDraftCopies,...copies?[{record:{type:'retained-copies',owner:scope==='guest'?'guest':'current'},raw:copies}]:[]]});
    const result={format:'catalyst-recovery',version:1,owner:scope==='guest'?{kind:'guest'}:{kind:'account',id:scope},createdAt:new Date().toISOString(),records,copies,journal};
    if(new TextEncoder().encode(JSON.stringify(result)).length>MAX_RECOVERY_BYTES)throw Error('This recovery file exceeds 25 MB. Export individual notebooks to protect them, then review the retained recovery copies.');
    return result;
  }
  const MAX_RECOVERY_BYTES=25*1024*1024;
  function parseRecovery(raw,scope){
    if(typeof raw!=='string'||new TextEncoder().encode(raw).length>MAX_RECOVERY_BYTES)throw Error('Choose a Catalyst recovery file smaller than 25 MB.');
    const value=JSON.parse(raw.replace(/^\uFEFF/,''));
    if(!object(value)||value.format!=='catalyst-recovery'||value.version!==1||!object(value.owner)||!['guest','account'].includes(value.owner.kind)||!Array.isArray(value.records)||value.records.length>42)throw Error('Unsupported Catalyst recovery file. Notebook-only exports still use Import / restore notebook.');
    if(value.owner.kind==='account'&&(scope==='guest'||scope!==value.owner.id))throw Error('Sign in to the same account that created this recovery file. Import never signs you in or transfers another account’s records.');
    const seen=new Set();
    for(const record of value.records){
      if(!object(record)||typeof record.raw!=='string'||!['notebook','review','draft','activity','settings','audio'].includes(record.type))throw Error('Invalid recovery record.');
      if(['settings','audio'].includes(record.type)){if(record.owner!=='device'||record.language!==undefined)throw Error('Invalid device record.');}
      else if(!['guest','current'].includes(record.owner)||!languages.includes(record.language)||(record.owner==='current'&&value.owner.kind!=='account'))throw Error('Invalid recovery owner or language.');
      const key=recordKey(record,scope);if(seen.has(key))throw Error('Duplicate recovery records.');seen.add(key);
    }
    for(const key of ['copies','journal'])if(value[key]!==null&&value[key]!==undefined&&typeof value[key]!=='string')throw Error('Invalid retained recovery copy.');
    return value;
  }
  function parsed(record,raw){
    if(record.type==='notebook')return root.CatalystNotebook.parse(raw);
    if(record.type==='review')return root.CatalystReview.parse(raw);
    if(record.type==='activity')return root.CatalystActivityProgress.parse(raw);
    if(record.type==='draft')return parseDrafts(raw);
    if(record.type==='settings')return settings(raw);
    if(record.type==='audio'){const value=JSON.parse(raw);if(!object(value))throw Error('Invalid audio preferences.');return value;}
  }
  function planRecovery(storage,scope,backup){
    const originalCopies=storage.getItem(archiveKey(scope)),archive=parseCopies(originalCopies),previousJournal=storage.getItem(journalKey(scope));
    const copies=[...archive.copies],seen=new Set(copies.map(copy=>copyIdentity(copy.record,copy.raw)));
    const summary={records:backup.records.length,changed:0,notebooks:0,sentences:0,notes:0,reviews:0,drafts:0,activities:0,copies:0,damaged:0};
    const changes=[],snapshots=[],draftInventories=[];
    const retain=(record,raw)=>{const descriptor=copyDescriptor(record);const identity=copyIdentity(descriptor,raw);if(!seen.has(identity)){copies.push({record:descriptor,raw});seen.add(identity);summary.copies++;}};
    for(const record of backup.records){
      const key=recordKey(record,scope),before=storage.getItem(key);snapshots.push({key,raw:before});
      let incoming,current;
      if(record.type==='draft'){const slots=draftSlots(storage,key);snapshots.push(...slots);draftInventories.push({key,slots:slots.map(slot=>slot.key).sort()});}
      try{incoming=parsed(record,record.raw);current=record.type==='draft'?readDrafts(storage,key):before===null?null:parsed(record,before);}catch(error){retain(record,record.raw);summary.damaged++;continue;}
      let next=current===null?incoming:current;
      if(record.type==='notebook'){
        const merged=root.CatalystNotebook.merge(current||{version:1,entries:[]},incoming);next=merged.data;summary.notebooks++;summary.sentences+=merged.summary.added;summary.notes+=merged.summary.notesAdded;
      }else if(current!==null&&JSON.stringify(current)!==JSON.stringify(incoming)){
        // Conflicting snapshots are retained in full; never add review counters
        // from two histories or silently replace a newer schedule/draft.
        retain(record,record.raw);
        if(record.type==='review'){
          next={version:1,items:{...incoming.items,...current.items},states:{...incoming.states,...current.states}};
        }else if(record.type==='activity')next={version:1,items:{...incoming.items,...current.items}};
        else if(record.type==='draft')next={version:1,drafts:{...incoming.drafts,...current.drafts}};
        else if(record.type==='settings')next={...incoming,...current,learned:[...new Set([...(current.learned||[]),...(incoming.learned||[])])]};
      }
      if(record.type==='review')summary.reviews+=Object.keys(next.items).length;
      if(record.type==='draft')summary.drafts+=Object.keys(next.drafts).length;
      if(record.type==='activity')summary.activities+=Object.keys(next.items).length;
      const after=JSON.stringify(next);if(before!==after){changes.push({key,before,after});summary.changed++;}
    }
    // Existing history must not wrap itself on each export/import cycle.
    // Known copy envelopes merge as inert records; journals are never replayed.
    const owner=scope==='guest'?'guest':'current';
    if(backup.copies&&backup.copies!==originalCopies){
      const incomingCopies=knownCopies(backup.copies);
      if(incomingCopies){for(const copy of incomingCopies)if(!(copy.record.type==='retained-journal'&&copy.record.owner===owner&&copy.raw===previousJournal))retain(copy.record,copy.raw);}
      else retain({type:'retained-copies',owner},backup.copies);
    }
    if(backup.journal&&backup.journal!==previousJournal)retain({type:'retained-journal',owner},backup.journal);
    snapshots.push({key:archiveKey(scope),raw:originalCopies},{key:journalKey(scope),raw:previousJournal});
    if(changes.length&&previousJournal)retain({type:'retained-journal',owner:scope==='guest'?'guest':'current'},previousJournal);
    const archiveAfter=JSON.stringify({version:1,copies});
    if(copies.length&&archiveAfter!==originalCopies)changes.push({key:archiveKey(scope),before:originalCopies,after:archiveAfter});
    return {scope,summary,changes,snapshots,draftInventories};
  }
  function commitRecovery(storage,plan){
    if(locked)throw Error('An update is in progress. Retry afterward.');
    for(const inventory of plan.draftInventories)if(JSON.stringify(draftSlots(storage,inventory.key).map(slot=>slot.key).sort())!==JSON.stringify(inventory.slots))throw Error('Drafts changed since preview. Select the file again to review the current merge.');
    for(const snapshot of plan.snapshots)if(storage.getItem(snapshot.key)!==snapshot.raw)throw Error('Records changed since preview. Select the file again to review the current merge.');
    if(!plan.changes.length)return;
    const archiveChange=plan.changes.find(change=>change.key===archiveKey(plan.scope));
    const records=plan.changes.filter(change=>change.key!==archiveKey(plan.scope));
    // Append retained history atomically before replacing its old journal. If
    // this fails, the previous journal and learner records are untouched.
    if(archiveChange)storage.setItem(archiveChange.key,archiveChange.after);
    if(!records.length)return;
    // The archive is additive and already durable: do not embed its whole
    // history inside the next journal. Record both sides of learner changes.
    const journal=plan.snapshots.find(snapshot=>snapshot.key===journalKey(plan.scope));
    if(storage.getItem(journal.key)!==journal.raw)throw Error('Recovery history changed during restore. Preview the file again.');
    storage.setItem(journal.key,JSON.stringify({version:1,createdAt:new Date().toISOString(),changes:records}));
    for(const change of records){
      if(storage.getItem(change.key)!==change.before)throw Error('A record changed during restore. The recovery journal preserves the proposed merge. Preview again.');
      storage.setItem(change.key,change.after);
    }
    // Keep the journal for recovery/export; do not delete historical data.
  }
  root.CatalystSafety={dirty,hasDirty,setLocked:value=>{locked=value;},isLocked:()=>locked,settings,writeSettings,draftKey,parseDrafts,saveDraft,listDrafts,removeDraft,exportRecovery,parseRecovery,planRecovery,commitRecovery,MAX_RECOVERY_BYTES,archiveKey,journalKey};
})(typeof window==='undefined'?globalThis:window);
