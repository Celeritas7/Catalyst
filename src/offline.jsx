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
      return {write,panel,markSaved:()=>safety.dirty('draft:'+id,false)};
    }
    function downloadBackup(value,prefix) {
      const name=prefix+'-'+new Date().toISOString().replace(/[:.]/g,'-')+'-'+crypto.randomUUID().slice(0,8)+'.json';
      const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'});
      let url,link,requested=false;
      try{
        url=URL.createObjectURL(blob);link=document.createElement('a');
        link.href=url;link.download=name;link.hidden=true;document.body.appendChild(link);
        link.click();requested=true;
        return name;
      }finally{
        link?.remove();
        // Allow the browser time to consume the file, including its save dialog.
        // A click requests a download; it cannot confirm that Files saved it.
        if(url){if(requested)setTimeout(()=>URL.revokeObjectURL(url),60000);else URL.revokeObjectURL(url);}
      }
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
        {scope!=='guest'&&<label><input type="checkbox" checked={guest} disabled={scope==='loading'} onChange={e=>{setGuest(e.target.checked);setSnapshot(null);}}/> Include guest notebooks, reviews, activities and drafts</label>}
        <label><input type="checkbox" checked={device} onChange={e=>{setDevice(e.target.checked);setSnapshot(null);}}/> Include device-wide settings, legacy practice, older guided writing and audio preferences</label>
        <button className="quiet-btn" disabled={scope==='loading'} onClick={exportPreview}>Preview recovery export</button>
        {snapshot&&<div className="recovery-preview"><p>{snapshot.records.filter(r=>r.type==='notebook').length} notebooks · {snapshot.records.filter(r=>r.type==='review').length} review sets · {snapshot.records.filter(r=>r.type==='activity').length} activity sets · {snapshot.records.filter(r=>r.type==='draft').length} draft sets · {snapshot.records.filter(r=>r.owner==='device').length} device records. Damaged raw records and any existing recovery copies/journal are retained. Credentials and other accounts are excluded.</p><button className="primary-btn" onClick={()=>{try{const name=downloadBackup(snapshot,'catalyst-recovery');setMessage('Download requested: '+name+'. Confirm this file is in Files or Downloads before continuing.');}catch(error){setMessage('Recovery download could not start. Your preview and saved work are retained. Try Download recovery file again.');}}}>Download recovery file</button></div>}
        <details><summary>Restore a recovery file</summary><p>A preview comes first. Current records win conflicting review schedules, draft versions and settings; the incoming history is kept separately in recovery copies. Existing notebook-only JSON files still use My Learning → Import / restore notebook.</p><label>Choose recovery file<input type="file" accept="application/json,.json" disabled={scope==='loading'||reading} onChange={choose}/></label>
          {reading&&<p role="status">Reading recovery file…</p>}{pending&&<div className="recovery-preview"><p>Destination: {scope==='guest'?'guest':'current account and any guest/device scopes included in this file'}.</p><p>{pending.plan.summary.changed} records to merge · {pending.plan.summary.sentences} sentences and {pending.plan.summary.notes} correction notes to add · {pending.plan.summary.copies} recovery copies · {pending.plan.summary.damaged} unreadable records retained as copies.</p><div className="offline-actions"><button className="primary-btn" onClick={commit}>Merge recovery</button><button className="quiet-btn" onClick={()=>{sequence.current++;setPending(null);setReading(false);}}>Cancel restore</button></div></div>}
        </details><p role="status">{message}</p>
      </section>;
    }
    function OfflineAccountPanel({language}) {
      const identity=React.useContext(StudyAccountContext),version=useSyncExternalStore(snapshotApi.subscribe,snapshotApi.getVersion);
      const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[records,setRecords]=useState({}),[refreshErrors,setRefreshErrors]=useState({});
      const sequence=React.useRef(0);
      const sources=[...window.CatalystVocabulary.sources(language).map(p=>({source:p.id,kind:'ratings',label:p.name})),...(language==='my'?[{source:'kg',kind:'patterns',label:'KG Chart · learned nouns for patterns'}]:[])];
      useUpdateGuard(busy);
      useEffect(()=>{return()=>{sequence.current++;};},[identity.scope,language]);
      useEffect(()=>{
        let cancelled=false;
        // Download progress owns the rows until it completes or is cancelled.
        // Older background reads must not overwrite an in-flight refresh.
        if(busy)return;
        if(!identity.prepared||!identity.owner){setRecords({});return;}
        setRecords(Object.fromEntries(sources.map(source=>[source.source+':'+source.kind,'Checking saved words…'])));
        for(const source of sources){const id=source.source+':'+source.kind,d=window.CatalystSnapshots.descriptor(identity.owner.id,language,source.source,source.kind);
          snapshotApi.read(d).then(record=>{if(!cancelled)setRecords(old=>({...old,[id]:record?`${record.data.words.length} words · saved ${new Date(record.savedAt).toLocaleString()}`:'Not saved for offline study'}));}).catch(error=>{if(!cancelled)setRecords(old=>({...old,[id]:error.message||'Saved words could not be checked.'}));});}
        return()=>{cancelled=true;};
      },[identity.scope,identity.prepared,language,version,busy]);
      async function prepare(){
        const run=++sequence.current,current=()=>sequence.current===run;setBusy(true);setRefreshErrors({});setMessage('Checking this account…');
        try{
          const ticket=await accountApi.prepare();if(!current())return;
          setMessage('Notebook and reviews prepared. Saving complete word sources…');
          let complete=0;
          for(const source of sources){
            if(!current()||!accountApi.valid(ticket))break;
            const id=source.source+':'+source.kind,d=window.CatalystSnapshots.descriptor(ticket.owner,language,source.source,source.kind);
            setRecords(old=>({...old,[id]:'Downloading…'}));
            try{const record=await snapshotApi.refresh(d,{persist:true,current});if(!current())return;complete++;setRecords(old=>({...old,[id]:`${record.data.words.length} words · saved ${new Date(record.savedAt).toLocaleString()}`}));}
            catch(error){if(!current())return;setRefreshErrors(old=>({...old,[id]:error.message||'Download failed. Retry online.'}));setRecords(old=>({...old,[id]:'Checking saved words after refresh…'}));}
          }
          if(current())setMessage(accountApi.valid(ticket)?`Notebook and reviews ready for this account. ${complete}/${sources.length} word sources refreshed. Sources marked unavailable need an online retry.`:'Account changed during preparation. Reconnect and try again.');
        }catch(error){if(current())setMessage(error.message);}finally{if(current())setBusy(false);}
      }
      return <section className="recovery-panel"><h3>Your account and words</h3>
        <p>{identity.owner?`Account: ${identity.owner.label}`:'Sign in through Settings to prepare your account.'} · {LANG[language].name}</p>
        <p>{identity.prepared?'Notebook and reviews: ready for this account on this device.':'Notebook and reviews: account not prepared for offline access.'} Word sources are saved separately for each account and learning language. Saving words does not sync your writing to the cloud.</p>
        <p>Prepare in the actual iPad Home Screen app before leaving Wi-Fi. After signing out here or in another app sharing this sign-in, reconnect and prepare again. Source permissions cannot be checked while disconnected.</p>
        <div className="offline-actions"><button className="primary-btn" disabled={!identity.online||busy} onClick={prepare}>{identity.prepared?'Refresh offline account and words':'Prepare this account for offline study'}</button>{busy&&<button className="quiet-btn" onClick={()=>{sequence.current++;setBusy(false);setMessage('Download cancelled. Completed snapshots and existing writing are retained.');}}>Cancel word download</button>}{!identity.online&&<button className="quiet-btn" onClick={()=>accountApi.verify()}>Check account online</button>}</div>
        {sources.map(source=><div className="recovery-row" key={source.source+source.kind}><strong>{source.label}</strong><span>{identity.prepared?(records[source.source+':'+source.kind]||'Checking saved words…'):'Account not prepared for offline words'}{refreshErrors[source.source+':'+source.kind]&&<span className="block">Last refresh failed: {refreshErrors[source.source+':'+source.kind]}</span>}</span></div>)}
        {!sources.length&&<p>No connected vocabulary source for this language. Lessons, notebooks and reviews can still be used offline.</p>}
        <p role="status">{message}</p>
      </section>;
    }
    function OfflineAudioPanel({language}) {
      const api=window.CatalystMedia,state=useSyncExternalStore(api.subscribe,api.getSnapshot);
      const [voice,setVoice]=useState(window.CatalystAudio.prefs.voice==='m'?'m':'f'),[confirm,setConfirm]=useState(false);
      const value=state.packs[language+':'+voice],pack=value?.candidate,progress=value?.progress;
      const size=n=>((n||0)/1024/1024).toFixed(2)+' MB',busy=!!state.busy;
      useEffect(()=>{api.refresh(language,voice);setConfirm(false);return()=>{if(api.getSnapshot().busy===language+':'+voice)api.pause(language,voice);};},[language,voice]);
      return <section className="recovery-panel"><h3>Recorded lesson audio</h3>
        <p>{LANG[language].name} · optional. Public lesson recordings are separate from word snapshots. Normal and slow playback reuse the same downloaded file.</p>
        <label>Audio voice<select className="search-input block mt-2" value={voice} disabled={busy} onChange={e=>{setVoice(e.target.value);window.CatalystAudio.setPrefs({voice:e.target.value});}}><option value="f">Female voice</option><option value="m">Male voice</option></select></label>
        <p><strong>{value?.activeHealthy?'Saved recordings ready offline':value?.active?'Saved audio needs repair':'Recorded audio not downloaded'}</strong>{value?.activeHealthy&&` · ${value.active.files.length} clips · ${value.active.voiceName}`}</p>
        {value?.verifiedAt&&<p className="offline-meta">Last audio verification: {new Date(value.verifiedAt).toLocaleString()}</p>}
        {pack&&<><p>{pack.files.length} available clips for {pack.lessonCount} bundled example texts · {pack.voiceName}. {pack.lessonCount-pack.files.length} example texts have no verified recording for this voice.</p><p>{size(progress?.bytes)} of {size(pack.totalBytes)} saved · {size(Math.max(0,pack.totalBytes-(progress?.bytes||0)))} remaining · {progress?.files||0}/{new Set(pack.files.map(f=>f.sha256)).size} files</p>{pack.totalBytes>0&&<progress aria-label="Audio download progress" max={pack.totalBytes} value={Math.min(progress?.bytes||0,pack.totalBytes)}/>}</>}
        <p role="status">{value?.state==='checking'?'Checking available recordings…':value?.state==='downloading'?'Downloading and verifying audio…':value?.state==='paused'?'Audio paused. Verified files will be reused.':value?.state==='interrupted'?'Audio download interrupted. Resume to reuse saved files.':value?.state==='removal-paused'?'Audio removal was interrupted. Retry removal below.':value?.state==='removing'?'Removing this voice’s saved audio…':''}</p>
        {(value?.error||state.message)&&<p role="alert">{state.message||value.error}</p>}
        {!api.supported()&&<p>Download and activate the current app files first to prepare audio.</p>}
        <div className="offline-actions"><button className="quiet-btn" disabled={!api.supported()||busy} onClick={()=>api.check(language,voice)}>Check available recordings</button>{!!pack?.files.length&&<button className="primary-btn" disabled={!api.supported()||busy} onClick={()=>api.download(language,voice)}>{progress?.bytes?'Resume / repair audio':'Download audio'}</button>}{busy&&<button className="quiet-btn" onClick={()=>api.pause(...state.busy.split(':'))}>Pause audio</button>}{value?.active&&<button className="quiet-btn" disabled={busy} onClick={()=>api.refresh(language,voice)}>Verify saved audio</button>}{(value?.active||pack||value?.removing?.length>0)&&<button className="quiet-btn" disabled={busy} onClick={()=>setConfirm(true)}>Remove this voice’s audio</button>}</div>
        {confirm&&<div className="recovery-preview"><p>Remove downloaded {LANG[language].name} {voice==='m'?'male':'female'} recordings from this device? Shared files still used by another audio pack are kept. Notebooks, reviews, word snapshots and app files are retained.</p><div className="offline-actions"><button className="quiet-btn" disabled={busy} onClick={()=>{setConfirm(false);window.CatalystAudio.stop();api.remove(language,voice);}}>Remove selected audio</button><button className="quiet-btn" onClick={()=>setConfirm(false)}>Keep audio</button></div></div>}
        <p>Device voices are provided by your browser or operating system. They are not downloaded by this button and may require internet. Test playback in the actual iPad Home Screen app before relying on it offline.</p>
      </section>;
    }
    function OfflineDeviceCheck({scope,language,state,ready}) {
      const identity=React.useContext(StudyAccountContext);
      const [report,setReport]=useState(''),[notice,setNotice]=useState('');
      const reportField=React.useRef(null),sequence=React.useRef(0);
      useEffect(()=>()=>{sequence.current++;},[]);
      const build=value=>/^[a-f0-9]{20}$/.test(value||'')?value:'unavailable';
      function preview(){
        sequence.current++;setNotice('');
        const progress=state.candidate;
        const count=value=>Number.isSafeInteger(value)&&value>=0?value:'unknown';
        const remaining=Number.isFinite(progress?.totalBytes)&&Number.isFinite(progress?.bytes)?count(Math.max(0,progress.totalBytes-progress.bytes)):'unknown';
        const standalone=window.navigator.standalone===true||window.matchMedia?.('(display-mode: standalone)').matches;
        setReport([
          'Catalyst offline status — '+new Date().toISOString(),
          'Window: '+(standalone?'Home Screen / standalone':'Browser tab'),
          'Learning language: '+LANG[language].name,
          'Study scope: '+(scope==='loading'?'checking':scope==='guest'?'guest':'current account'),
          'App: '+build(state.appBuild),
          'Worker: '+build(state.active?.workerBuild),
          'Active release: '+build(state.active?.activeBuild),
          'Download candidate: '+build(progress?.candidateBuild),
          'App and text ready: '+(ready?'yes':'no'),
          'Worker controls this page: '+(state.controlled?'yes':'no'),
          'Candidate files saved: '+count(progress?.files)+' / '+count(progress?.totalFiles),
          'Candidate bytes remaining: '+remaining,
          'Account notebook/reviews prepared: '+(scope==='loading'?'checking':scope==='guest'?'not applicable (guest)':identity.prepared?'yes':'no'),
          'Storage protection: '+(state.persisted===true?'persistent':state.persisted===false?'best effort':'not checked'),
          'Word sources and audio: check their separate sections; not certified by this report.',
          'Backup in Files: not verified by this report.',
          'Airplane-mode cold reopen and writing preservation: not verified by this report.'
        ].join('\n'));
      }
      async function copy(){
        const token=++sequence.current;
        try{
          if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');
          await navigator.clipboard.writeText(report);
          if(sequence.current===token)setNotice('Status copied. You can paste it into your support conversation.');
        }catch(error){
          if(sequence.current!==token)return;
          reportField.current?.focus();reportField.current?.select();
          setNotice('Automatic copy is unavailable. Select and copy the report below.');
        }
      }
      return <section className="recovery-panel"><h3>Check this iPad before leaving Wi-Fi</h3>
        <ol className="offline-device-steps">
          <li>Open the Home Screen app you normally study in. Safari and Home Screen readiness must be checked separately.</li>
          <li>Export your notebook from My Learning, or use Protect your saved work below. Confirm the backup is in Files.</li>
          <li>Download or repair the app above. Wait for App and text ready offline, then use Verify saved files. Save or keep unfinished writing before applying an update.</li>
          <li>If using an account, prepare it below. Check word sources and optional audio separately.</li>
          <li>After preparation, turn on Airplane Mode and turn Wi-Fi off in Settings. Close and reopen the app, try a lesson, then save a test sentence and correction. Reopen again and check both old and new writing. Reconnect and check once more.</li>
        </ol>
        <p>Keep your existing installation and saved data. Readiness here does not prove a successful offline reopening on your device.</p>
        <details><summary>Share offline status</summary>
          <p>Preview a report containing versions and readiness only. It excludes account identifiers, writing, credentials and error details. Nothing is sent automatically. This is a status report, not a recovery backup.</p>
          <button className="quiet-btn" onClick={preview}>{report?'Refresh status report':'Preview status report'}</button>
          {report&&<><label>Offline status report<textarea ref={reportField} className="offline-status-report" readOnly rows={12} value={report}/></label><p>This snapshot reflects the time shown. Refresh it after downloading or preparing your account.</p><button className="quiet-btn" onClick={copy}>Copy status report</button></>}
          <p role="status">{notice}</p>
        </details>
      </section>;
    }
    function OfflinePanel({scope,language,onClose}) {
      const api=window.CatalystOffline,state=useSyncExternalStore(api.subscribe,api.getSnapshot),close=React.useRef(null);
      useEffect(()=>{
        const previous=document.activeElement,overflow=document.body.style.overflow;document.body.style.overflow='hidden';api.open();close.current?.focus();
        const keyboard=e=>{
          if(e.key==='Escape')onClose();
          if(e.key==='Tab'){
            const nodes=[...close.current.closest('[role="dialog"]').querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,a[href]')].filter(node=>node.getClientRects().length);
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
        <div className="offline-readiness"><strong>{api.ready()?'App and text ready offline':state.phase==='repair-needed'?'App files need repair':'App and text not ready offline'}</strong><p>Public lessons, quizzes, fonts and converters for all five languages. Account, word-source and recorded-audio readiness are shown separately below.</p></div>
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
        <OfflineDeviceCheck key={scope+':'+language} scope={scope} language={language} state={state} ready={api.ready()}/>
        <OfflineAccountPanel key={scope+':'+language} language={language}/>
        <OfflineAudioPanel key={'audio:'+language} language={language}/>
        <RecoveryPanel key={scope} scope={scope}/>
      </section></div>;
    }
