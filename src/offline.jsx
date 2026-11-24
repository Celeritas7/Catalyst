    function useUpdateGuard(value) {
      const [id]=useState(()=>crypto.randomUUID());
      window.CatalystSafety.dirty(id,!!value);
      useEffect(()=>()=>window.CatalystSafety.dirty(id,false),[id]);
    }
    function useWritingDraft({scope,language,type,context,fields,restore,empty}) {
      const safety=window.CatalystSafety;
      const [id,setId]=useState(()=>crypto.randomUUID()),[saved,setSaved]=useState([]),[notice,setNotice]=useState('');
      const latest=React.useRef(fields);latest.current=fields;
      const hasText=value=>Object.entries(value).some(([key,value])=>key!=='lesson'&&(typeof value==='string'?!!value:Object.values(value||{}).some(Boolean)));
      const refresh=()=>{if(scope==='loading')return;try{setSaved(safety.listDrafts(localStorage,scope,language,type,context).filter(d=>d.id!==id));}catch(error){setNotice(error.message);}};
      useEffect(()=>{refresh();const sync=e=>{const key=safety.draftKey(scope,language);if(e.key===key||e.key?.startsWith(key+':'))refresh();};if(scope!=='loading')window.addEventListener('storage',sync);return()=>{window.removeEventListener('storage',sync);safety.dirty('draft:'+id,false);};},[id,scope,language]);
      function write(value,unsaved=true){
        latest.current=value;
        try{
          if(hasText(value))safety.saveDraft(localStorage,scope,language,id,type,context,value,{unsaved});
          else safety.removeDraft(localStorage,scope,language,id);
          setNotice(hasText(value)?'Recovery draft saved on this device.':'');return true;
        }catch(error){safety.dirty('draft:'+id,true);setNotice('Recovery draft could not be saved. Keep this page open and copy your writing. '+error.message);return false;}
      }
      function keep(){if(write(latest.current,false)){restore(empty);setId(crypto.randomUUID());setNotice('Draft kept for later. Use Resume draft to continue.');}}
      function resume(draft){
        if(hasText(latest.current)){setNotice('Save or keep the current writing for later before opening another draft.');return;}
        if(write(draft.fields)){
          restore(draft.fields);
          // This old copy is removed only after its replacement has been saved.
          try{safety.removeDraft(localStorage,scope,language,draft.id,draft);}catch(error){/* retain both copies */}
          refresh();
        }
      }
      const panel=<div className="draft-recovery"><p role="status">{notice}</p>{hasText(fields)&&<button className="quiet-btn" type="button" onClick={keep}>Keep draft for later</button>}{saved.length>0&&<details><summary>Recovered writing ({saved.length})</summary>{saved.map(draft=><div className="recovery-row" key={draft.id}><span>{new Date(draft.updatedAt).toLocaleString()}</span><button className="quiet-btn" disabled={hasText(fields)} onClick={()=>resume(draft)}>Resume draft</button></div>)}</details>}</div>;
      return {write,panel};
    }
    function downloadRecovery(value,name) {
      const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');
      link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
    function RecoveryPanel({scope}) {
      const safety=window.CatalystSafety;
      const [guest,setGuest]=useState(false),[device,setDevice]=useState(true),[snapshot,setSnapshot]=useState(null),[pending,setPending]=useState(null),[message,setMessage]=useState(''),[reading,setReading]=useState(false);
      const sequence=React.useRef(0);useEffect(()=>()=>{sequence.current++;},[]);
      useUpdateGuard(!!pending||reading);
      const exportPreview=()=>{try{setSnapshot(safety.exportRecovery(localStorage,scope,{guest,device}));setMessage('');}catch(error){setMessage(error.message);}};
      async function choose(event){
        const file=event.target.files?.[0];event.target.value='';if(!file)return;
        const token=++sequence.current;setReading(true);setPending(null);setMessage('');
        try{
          if(file.size>safety.MAX_RECOVERY_BYTES)throw Error('Choose a recovery file smaller than 25 MB.');
          const raw=await file.text();if(sequence.current!==token)return;
          const backup=safety.parseRecovery(raw,scope),plan=safety.planRecovery(localStorage,scope,backup);setPending({backup,plan});
        }catch(error){if(sequence.current===token)setMessage(error.message);}finally{if(sequence.current===token)setReading(false);}
      }
      function commit(){
        try{
          safety.commitRecovery(localStorage,pending.plan);
          for(const record of pending.plan.snapshots)window.dispatchEvent(new StorageEvent('storage',{key:record.key}));
          setPending(null);setSnapshot(null);setMessage('Recovery merged. Existing originals, notes and schedules were retained. Conflicting snapshots remain in recovery copies.');
        }catch(error){setMessage('Restore paused: '+error.message+' Export a recovery file to keep the journal, then preview again.');}
      }
      return <section className="recovery-panel"><h3>Protect your saved work</h3><p>Destination: {scope==='loading'?'Checking account…':scope==='guest'?'Guest records':'Current study account'} · all five learning languages on this device. Recovery files include writing and may contain personal notes. They stay on your device.</p>
        {scope!=='guest'&&<label><input type="checkbox" checked={guest} disabled={scope==='loading'} onChange={e=>{setGuest(e.target.checked);setSnapshot(null);}}/> Include guest notebooks, reviews and drafts</label>}
        <label><input type="checkbox" checked={device} onChange={e=>{setDevice(e.target.checked);setSnapshot(null);}}/> Include device-wide settings, legacy practice, guided drafts and audio preferences</label>
        <button className="quiet-btn" disabled={scope==='loading'} onClick={exportPreview}>Preview recovery export</button>
        {snapshot&&<div className="recovery-preview"><p>{snapshot.records.filter(r=>r.type==='notebook').length} notebooks · {snapshot.records.filter(r=>r.type==='review').length} review sets · {snapshot.records.filter(r=>r.type==='draft').length} draft sets · {snapshot.records.filter(r=>r.owner==='device').length} device records. Damaged raw records and any existing recovery copies/journal are retained. Credentials and other accounts are excluded.</p><button className="primary-btn" onClick={()=>downloadRecovery(snapshot,'catalyst-recovery-'+new Date().toISOString().slice(0,10)+'.json')}>Download recovery file</button></div>}
        <details><summary>Restore a recovery file</summary><p>A preview comes first. Current records win conflicting review schedules, draft versions and settings; the incoming history is kept separately in recovery copies. Existing notebook-only JSON files still use My Learning → Import / restore notebook.</p><label>Choose recovery file<input type="file" accept="application/json,.json" disabled={scope==='loading'||reading} onChange={choose}/></label>
          {reading&&<p role="status">Reading recovery file…</p>}{pending&&<div className="recovery-preview"><p>Destination: {scope==='guest'?'guest':'current account and any guest/device scopes included in this file'}.</p><p>{pending.plan.summary.changed} records to merge · {pending.plan.summary.sentences} sentences and {pending.plan.summary.notes} correction notes to add · {pending.plan.summary.copies} recovery copies · {pending.plan.summary.damaged} unreadable records retained as copies.</p><div className="offline-actions"><button className="primary-btn" onClick={commit}>Merge recovery</button><button className="quiet-btn" onClick={()=>{sequence.current++;setPending(null);setReading(false);}}>Cancel restore</button></div></div>}
        </details><p role="status">{message}</p>
      </section>;
    }
    function OfflineAccountPanel({language}) {
      const identity=React.useContext(StudyAccountContext),version=useSyncExternalStore(snapshotApi.subscribe,snapshotApi.getVersion);
      const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[records,setRecords]=useState({});
      const sequence=React.useRef(0);
      const sources=[...window.CatalystVocabulary.sources(language).map(p=>({source:p.id,kind:'ratings',label:p.name})),...(language==='my'?[{source:'kg',kind:'patterns',label:'KG Chart · learned nouns for patterns'}]:[])];
      useUpdateGuard(busy);
      useEffect(()=>{return()=>{sequence.current++;};},[identity.scope,language]);
      useEffect(()=>{
        let cancelled=false;
        if(!identity.prepared||!identity.owner)return;
        for(const source of sources){const id=source.source+':'+source.kind,d=window.CatalystSnapshots.descriptor(identity.owner.id,language,source.source,source.kind);
          snapshotApi.read(d).then(record=>{if(!cancelled&&record)setRecords(old=>({...old,[id]:`${record.data.words.length} words · saved ${new Date(record.savedAt).toLocaleString()}`}));}).catch(error=>{if(!cancelled)setRecords(old=>({...old,[id]:error.message}));});}
        return()=>{cancelled=true;};
      },[identity.scope,identity.prepared,language,version]);
      async function prepare(){
        const run=++sequence.current,current=()=>sequence.current===run;setBusy(true);setMessage('Checking this account…');
        try{
          const ticket=await accountApi.prepare();if(!current())return;
          setMessage('Notebook and reviews prepared. Saving complete word sources…');
          let complete=0;
          for(const source of sources){
            if(!current()||!accountApi.valid(ticket))break;
            const id=source.source+':'+source.kind,d=window.CatalystSnapshots.descriptor(ticket.owner,language,source.source,source.kind);
            setRecords(old=>({...old,[id]:'Downloading…'}));
            try{const record=await snapshotApi.refresh(d,{persist:true,current});if(!current())return;complete++;setRecords(old=>({...old,[id]:`${record.data.words.length} words · saved ${new Date(record.savedAt).toLocaleString()}`}));}
            catch(error){if(!current())return;setRecords(old=>({...old,[id]:error.message||'Download failed. Previous complete snapshot retained.'}));}
          }
          if(current())setMessage(accountApi.valid(ticket)?`Notebook and reviews ready for this account. ${complete}/${sources.length} word sources refreshed. Sources marked unavailable need an online retry.`:'Account changed during preparation. Reconnect and try again.');
        }catch(error){if(current())setMessage(error.message);}finally{if(current())setBusy(false);}
      }
      return <section className="recovery-panel"><h3>Your account and words</h3>
        <p>{identity.owner?`Account: ${identity.owner.label}`:'Sign in through Settings to prepare your account.'} · {LANG[language].name}</p>
        <p>{identity.prepared?'Notebook and reviews: ready for this account on this device.':'Notebook and reviews: account not prepared for offline access.'} Word sources are saved separately for each account and learning language. Saving words does not sync your writing to the cloud.</p>
        <p>Prepare in the actual iPad Home Screen app before leaving Wi-Fi. After signing out here or in another app sharing this sign-in, reconnect and prepare again. Source permissions cannot be checked while disconnected.</p>
        <div className="offline-actions"><button className="primary-btn" disabled={!identity.online||busy} onClick={prepare}>{identity.prepared?'Refresh offline account and words':'Prepare this account for offline study'}</button>{busy&&<button className="quiet-btn" onClick={()=>{sequence.current++;setBusy(false);setMessage('Download cancelled. Completed snapshots and existing writing are retained.');}}>Cancel word download</button>}{!identity.online&&<button className="quiet-btn" onClick={()=>accountApi.verify()}>Check account online</button>}</div>
        {sources.map(source=><div className="recovery-row" key={source.source+source.kind}><strong>{source.label}</strong><span>{records[source.source+':'+source.kind]||'Not saved for offline study'}</span></div>)}
        {!sources.length&&<p>No connected vocabulary source for this language. Lessons, notebooks and reviews can still be used offline.</p>}
        <p role="status">{message}</p>
      </section>;
    }
    function OfflinePanel({scope,language,onClose}) {
      const api=window.CatalystOffline,state=useSyncExternalStore(api.subscribe,api.getSnapshot),close=React.useRef(null);
      useEffect(()=>{
        const previous=document.activeElement,overflow=document.body.style.overflow;document.body.style.overflow='hidden';api.open();close.current?.focus();
        const keyboard=e=>{
          if(e.key==='Escape')onClose();
          if(e.key==='Tab'){
            const nodes=[...close.current.closest('[role="dialog"]').querySelectorAll('button:not(:disabled),input:not(:disabled),summary,a[href]')].filter(node=>node.getClientRects().length);
            const first=nodes[0],last=nodes[nodes.length-1];
            if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
            else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
          }
        };
        window.addEventListener('keydown',keyboard);return()=>{window.removeEventListener('keydown',keyboard);document.body.style.overflow=overflow;previous?.focus();};
      },[]);
      const progress=state.candidate,total=progress?.totalBytes||state.manifest?.totalBytes||0,done=progress?.bytes||0;
      const size=n=>(n/1024/1024).toFixed(1)+' MB';
      const downloading=['downloading','preparing','checking'].includes(state.phase);
      const update=progress?.complete&&(progress.candidateBuild!==state.appBuild||progress.candidateBuild!==state.active?.activeBuild||progress.candidateBuild!==state.active?.workerBuild);
      const newCandidate=progress?.candidateBuild&&progress.candidateBuild!==state.active?.activeBuild;
      return <div className="offline-backdrop"><section className="offline-dialog" role="dialog" aria-modal="true" aria-labelledby="offline-title"><div className="offline-heading"><h2 id="offline-title">Study offline</h2><button ref={close} className="quiet-btn" aria-label="Close offline settings" onClick={onClose}>Close</button></div>
        <p>{LANG[language].name} · {scope==='loading'?'Checking account':scope==='guest'?'Guest study':'Current study account'}</p>
        <div className="offline-readiness"><strong>{api.ready()?'App and text ready offline':state.phase==='repair-needed'?'App files need repair':'App and text not ready offline'}</strong><p>Public lessons, quizzes, fonts and converters for all five languages. Prepare your account and word sources separately below. Audio has not been downloaded.</p></div>
        {!state.supported?<p role="alert">This browser cannot save the offline app. Use HTTPS in a supported browser or Home Screen web app. Recovery export still works below.</p>:<>
          <p>{total?`${size(done)} of ${size(total)} saved · ${size(Math.max(0,total-done))} remaining`:'Connect to check the download size.'}{progress?` · ${progress.files||0}/${progress.totalFiles||0} files`:''}</p>
          {total>0&&<progress max={total} value={Math.min(done,total)} aria-label="App download progress"/>}
          <p role="status">{state.phase==='downloading'?'Downloading and checking files…':state.phase==='preparing'?'Preparing app storage…':state.phase==='checking'?'Checking for updates…':state.phase==='paused'?'Download paused. Saved files will be reused.':state.phase==='interrupted'?'Download was interrupted. Resume to reuse verified files.':update?'Update downloaded and verified. Save writing in every Catalyst tab before applying.':''}</p>
          {state.message&&<p role="alert">{state.message}</p>}
          <div className="offline-actions">
            {!downloading&&(!api.ready()||newCandidate)&&!update&&<button className="primary-btn" onClick={api.download}>{done?'Resume / repair download':newCandidate&&state.active?'Download update':'Download app and lessons'}</button>}
            {state.phase==='downloading'&&<button className="quiet-btn" onClick={api.pause}>Pause download</button>}
            {!downloading&&state.active&&<button className="quiet-btn" onClick={api.check}>Check for updates</button>}
            {update&&!downloading&&<button className="primary-btn" onClick={api.apply}>Apply update and reload</button>}
            {!downloading&&state.active&&<button className="quiet-btn" onClick={api.refresh}>Verify saved files</button>}
          </div>
          <p className="offline-meta">App: {state.appBuild} · Worker: {state.active?.workerBuild||'not active'}{state.candidate?.candidateBuild&&state.candidate.candidateBuild!==state.active?.workerBuild?` · Candidate: ${state.candidate.candidateBuild}`:''}</p>
          {state.active?.verifiedAt&&<p className="offline-meta">Last verification: {new Date(state.active.verifiedAt).toLocaleString()}</p>}
          <p className="offline-meta">Storage protection: {state.persisted?'persistent storage granted':'best effort; keep a recovery file'}. Available storage estimates are not a reservation.</p>
        </>}
        <p className="offline-help">On iPad, open the actual Home Screen app and download here before leaving Wi-Fi. Keep this window visible during the download. If it stops, reopen and resume. Updates do not require clearing website data.</p>
        <OfflineAccountPanel key={scope+':'+language} language={language}/>
        <RecoveryPanel key={scope} scope={scope}/>
      </section></div>;
    }
