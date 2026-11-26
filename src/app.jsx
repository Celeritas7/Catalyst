
    const { useState, useEffect, useMemo, useSyncExternalStore } = React;

    // ---- Supabase (same project as KG Chart). Content tables catalyst_*; the built-in copy is used if they're not there. ----
    const SUPABASE_URL = 'https://ulgrfumbwjovbjzjiems.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZ3JmdW1id2pvdmJqemppZW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzIyNjcsImV4cCI6MjA4Mjk0ODI2N30.ix5Vh4Y3GXNbQbzVtTD_WSko0L3cr5q_eCnTuDEMh7M';
    const sb = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

    // ---- login: same Supabase account as KG Chart. On celeritas7.github.io both apps share the saved session. ----
    const accountApi=window.CatalystAccount.create({client:sb,storage:localStorage,authKey:'sb-'+new URL(SUPABASE_URL).hostname.split('.')[0]+'-auth-token'});
    const snapshotApi=window.CatalystSnapshots.create({client:sb,storage:localStorage,indexedDB:window.indexedDB,account:accountApi});
    const StudyAccountContext=React.createContext(null);
    function useStudySource(language,source,kind='ratings',enabled=true) {
      const identity=React.useContext(StudyAccountContext);
      const [data,setData]=useState({status:'loading',words:[]}),[reload,setReload]=useState(0);
      useEffect(()=>{
        let cancelled=false;
        if(!enabled||!source){setData({status:'unsupported',words:[]});return;}
        if(!identity.owner){setData({status:identity.scope==='loading'?'error':'guest',words:[],error:identity.message});return;}
        const d=window.CatalystSnapshots.descriptor(identity.owner.id,language,source,kind),current=()=>!cancelled;
        setData({status:'loading',words:[]});
        snapshotApi.load(d,{current}).then(result=>{if(current())setData({...result,status:'ready'});}).catch(error=>{if(current())setData({status:'error',words:[],error:error.message});});
        const unsubscribe=snapshotApi.subscribe(()=>{snapshotApi.read(d).then(record=>{if(current()&&record)setData({...record.data,status:'ready',savedAt:record.savedAt,stale:!accountApi.getSnapshot().online,message:!accountApi.getSnapshot().online?'Offline · saved words; refresh pending.':''});}).catch(error=>{if(current())setData({status:'error',words:[],error:error.message});});});
        return()=>{cancelled=true;unsubscribe();};
      },[identity.scope,identity.online,identity.prepared,identity.epoch,language,source,kind,enabled,reload]);
      return {...data,reload:()=>setReload(v=>v+1)};
    }
    function SnapshotNotice({data}) {
      return <>{data.message&&<p className="review-notice" role="status">{data.message}</p>}{data.savedAt&&<p className="text-xs mt-2">Words saved: {new Date(data.savedAt).toLocaleString()}</p>}</>;
    }

    const LANG = window.CatalystPreferences.registry;
    const ORDER = ['ja', 'my', 'zh', 'mr', 'en'];
    const STUDY = ['ja', 'my', 'zh'];
    const ANCHORS = window.CatalystPreferences.meaningLanguages;
    const LEVEL = {
      close:   { label: 'Close', sym: '≈', chip: 'bg-emerald-50 text-emerald-800 border-emerald-200', cell: 'bg-emerald-500 text-white' },
      partial: { label: 'Partial', sym: '~', chip: 'bg-amber-50 text-amber-800 border-amber-200', cell: 'bg-amber-400 text-amber-950' },
      none:    { label: 'No equivalent', sym: '✕', chip: 'bg-rose-50 text-rose-800 border-rose-200', cell: 'bg-rose-500 text-white' },
    };
    const pairKey = (a, b) => (ORDER.indexOf(a) < ORDER.indexOf(b) ? `${a}-${b}` : `${b}-${a}`);
    const levelOf = (c, a, b) => c.levels[pairKey(a, b)];

    // ---- settings + learned, on this device ----
    const SETTINGS_KEY = 'catalyst_settings';
    const DEFAULTS = window.CatalystPreferences.normalize({});
    function useSettings() {
      const safety=window.CatalystSafety;
      const read=()=>{try{return {data:window.CatalystPreferences.normalize(safety.settings(localStorage.getItem(SETTINGS_KEY))),error:''};}catch(error){return {data:DEFAULTS,error:'Settings or history could not be read. The original has not been overwritten. Open Study offline to export a recovery file.'};}};
      const [state,setState]=useState(read);
      const reload=()=>{const next=read();setState(previous=>next.error?{...previous,error:next.error}:next);};
      useEffect(()=>{const sync=e=>{if(e.key===SETTINGS_KEY)reload();};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);},[]);
      const update=patch=>{try{const data=safety.writeSettings(localStorage,patch);setState({data,error:''});return true;}catch(error){setState(previous=>({...previous,error:'Changes could not be saved. Existing history is preserved. '+error.message}));return false;}};
      return [state.data,update,state.error,reload];
    }

    // ---- content: built-in copy first, then Supabase if its tables exist ----
    function fromDb(concepts, entries, examples) {
      const exBy = {};
      for (const x of examples) (exBy[x.entry_id] = exBy[x.entry_id] || []).push(x);
      const enBy = {};
      for (const e of entries) (enBy[e.concept_id] = enBy[e.concept_id] || {})[e.language_code] = {
        form: e.form, note: e.note, none: !e.has_equivalent, checked: e.checked,
        ex: (exBy[e.id] || []).sort((a, b) => a.sort_order - b.sort_order).map(x => ({ t: x.native_text, r: x.reading || undefined, e: x.english_text, h: x.highlight || [], dev: x.devanagari || '' })),
      };
      return concepts.sort((a, b) => a.sort_order - b.sort_order).map(c => ({
        id: c.id, sort: c.sort_order, group: c.group_name, title: c.title, summary: c.summary,
        levels: c.levels || {}, pairNotes: c.pair_notes || {}, entries: enBy[c.id] || {},
      }));
    }
    function useContent() {
      const [state, setState] = useState({ concepts: window.CATALYST_DATA?.concepts || [], source: 'built-in' });
      useEffect(() => {
        if (!sb) return;
        let cancelled = false;
        Promise.all(['catalyst_concepts', 'catalyst_entries', 'catalyst_examples'].map(t => sb.from(t).select('*').limit(10000)))
          .then(([c, e, x]) => {
            if (cancelled || c.error || e.error || x.error || !c.data?.length) return;
            setState({ concepts: fromDb(c.data, e.data, x.data), source: 'Supabase' });
          })
          .catch(() => {});
        return () => { cancelled = true; };
      }, []);
      return state;
    }

    // ---- converters (language-utils) load in the background; the saved Devanagari shows until then ----
    function useConverters() {
      const [v, setV] = useState(0);
      useEffect(() => { window.CatalystScripts.loadAll().then(() => setV(1)); }, []);
      return v;
    }
    function useAudio() {
      useEffect(() => { ['ja', 'my', 'zh', 'mr', 'en'].forEach(l => window.CatalystAudio.loadManifest(l)); }, []);
      return useSyncExternalStore(window.CatalystAudio.subscribe, window.CatalystAudio.getVersion);
    }

    // ---- routing: no hash (list) and #<concept-id> with hyphens (one concept), so the phone's back button works ----
    function useRoute() {
      const read = () => { const m = location.hash.match(/^#([a-z0-9-]+)$/); return m ? m[1].replace(/-/g, '_') : null; };
      const [id, setId] = useState(read);
      useEffect(() => { const f = () => { setId(read()); window.scrollTo(0, 0); }; window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
      return id;
    }
    const go = (id) => { location.hash = id ? `#${id.replace(/_/g, '-')}` : ''; };

    // ---- small pieces ----
    function Highlight({ text, parts }) {
      const ranges = [];
      for (const p of parts || []) {
        if (!p) continue;
        let from = 0, i;
        // first occurrence that doesn't overlap an earlier highlight
        while ((i = text.indexOf(p, from)) !== -1) {
          if (!ranges.some(r => i < r[1] && i + p.length > r[0])) { ranges.push([i, i + p.length]); break; }
          from = i + 1;
        }
      }
      ranges.sort((a, b) => a[0] - b[0]);
      const out = []; let at = 0;
      ranges.forEach(([s, e], k) => { if (s > at) out.push(text.slice(at, s)); out.push(<mark key={k} className="gc">{text.slice(s, e)}</mark>); at = e; });
      if (at < text.length) out.push(text.slice(at));
      return <>{out}</>;
    }

    function LangTag({ lang, small }) {
      const L = LANG[lang];
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold ${small ? 'text-xs' : 'text-sm'} text-slate-700`}>
          <span className={`w-2 h-2 rounded-full ${L.dot}`}></span>{L.name}
          <span className={`${L.font} font-normal text-slate-400`}>{L.native}</span>
        </span>
      );
    }

    function LevelChip({ level, children, onClick, active }) {
      const L = LEVEL[level] || LEVEL.partial;
      return (
        <button onClick={onClick} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${L.chip} ${active ? 'ring-2 ring-offset-1 ring-slate-400' : ''}`}>
          <span>{L.sym}</span>{children}
        </button>
      );
    }

    function Speak({ text, lang }) {
      useAudio();
      const src = window.CatalystAudio.source(text, lang);
      const state = window.CatalystAudio.stateOf(text, lang, false);
      if (src === null) return null;
      return (
        <button aria-label="Play" title={src === 'saved'?'Downloaded recording':src === 'tts' ? 'Device voice — offline availability depends on this device' : 'Play recording online'}
          onClick={(e) => { e.stopPropagation(); window.CatalystAudio.play(text, lang); }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base transition ${state ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-600 active:bg-slate-100'}`}>
          {state === 'loading' ? '…' : '🔊'}
          {src === 'tts' && !state && <span className="sr-only">(device voice)</span>}
        </button>
      );
    }

    function SentenceAudio({text,lang}) {
      useAudio();
      useEffect(()=>()=>window.CatalystAudio.stop(),[text,lang]);
      const source=window.CatalystAudio.source(text,lang);
      return <div className="sentence-audio"><span className="text-xs text-slate-500">{source==='loading'?'Checking audio…':source==='saved'?'Downloaded recording':source==='clip'?'Recorded audio · connection required':source==='tts'?'Device voice · offline availability depends on this device':'Audio unavailable for this sentence on this device'}</span>{source&&source!=='loading'&&<div className="flex gap-2 flex-wrap">{[false,true].map(slow=><button className="quiet-btn" key={String(slow)} aria-label={slow?'Play slowly':'Play sentence'} onClick={()=>window.CatalystAudio.play(text,lang,{slow})}>{window.CatalystAudio.stateOf(text,lang,slow)?'■ Stop':slow?'🔊 Slow':'🔊 Listen'}</button>)}</div>}</div>;
    }
    const VocabularyContext=React.createContext({status:'guest',words:[]});
    function VocabularyProvider({session,language,children}) {
      const sources=window.CatalystVocabulary.sources(language);
      const identity=React.useContext(StudyAccountContext),[source,setSource]=useState(sources[0]?.id||'');
      const loaded=useStudySource(language,source);
      const data=loaded.source&&loaded.source!==source?{...loaded,status:'loading',words:[]}:loaded;
      return <VocabularyContext.Provider value={{...data,source,sources,changeSource:setSource,account:identity.owner?.label}}>{children}</VocabularyContext.Provider>;
    }

    function WordProgress({text,lang}) {
      const data=React.useContext(VocabularyContext);
      if(!data.source)return null;
      const found=data.status==='ready'?window.CatalystVocabulary.matches(text,data.words):[];
      return <details className="word-progress"><summary>Linked word ratings</summary><p className="text-xs mt-2">Source: {window.CatalystVocabulary.providers[data.source].name}. Change source in My Learning.</p><SnapshotNotice data={data}/>{data.status==='ready'?<><p className="text-xs mt-2">Exact dictionary matches only; other text is unclassified. These are word ratings, not grammar mastery.</p>{data.source==='burmese'&&!data.linked&&<p className="review-notice">No account-linked progress found. Legacy Study ratings cannot yet be attributed to your account.</p>}<div className="flex flex-wrap gap-2 mt-3">{found.map(w=><span className={'word-badge '+w.status} key={w.id}><span lang={lang}>{w.text}</span> · {w.label}</span>)}</div>{!found.length&&<p className="text-sm mt-2">No dictionary matches. This does not mean you do not know the sentence.</p>}</>:<p className="text-sm mt-2">{data.status==='guest'?'Sign in through Settings to see your own ratings.':data.status==='error'?'Could not load ratings. Retry in My Learning.':'Loading word ratings…'}</p>}</details>;
    }
    function VocabularyPanel({settings}) {
      const data=React.useContext(VocabularyContext),[query,setQuery]=useState(''),[filter,setFilter]=useState('all');
      useEffect(()=>{setFilter('all');setQuery('');},[data.source]);
      const provider=window.CatalystVocabulary.providers[data.source];
      const rows=data.words.filter(w=>(filter==='all'||w.label===filter)&&w.text.toLowerCase().includes(query.trim().toLowerCase()));
      const categories=[...new Set(data.words.map(w=>w.label))];
      return <section className="study-panel"><div className="eyebrow">CONNECTED LEARNING APPS</div><h2 className="text-2xl font-bold mt-2">Your {LANG[settings.targetLanguage].name} words</h2><p className="text-sm mt-3">Read-only connections. Each source keeps its own ratings; identical words from different apps are not merged.</p>{data.account&&<p className="text-xs mt-3">Reading account: {data.account}</p>}{data.sources.length>0&&<label className="review-state">Ratings source<select aria-label="Ratings source" value={data.source} onChange={e=>data.changeSource(e.target.value)}>{data.sources.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>}{provider&&<p className="text-sm mt-3">{provider.note}</p>}<SnapshotNotice data={data}/>
      {data.status==='unsupported'?<p className="review-notice">No vocabulary provider is connected for this learning language yet.</p>:data.status==='guest'?<p className="review-notice">Sign in through Settings with the same account as the source app.</p>:data.status==='loading'?<p role="status" className="mt-3">Loading your ratings…</p>:data.status==='error'?<p role="alert" className="review-notice">Could not load vocabulary or rating labels. Ratings are unavailable, not zero. {data.error}</p>:<>{!data.linked&&<p className="review-notice">No account-linked ratings found in this source. {data.source==='burmese'?'This does not mean all these words are unrated: legacy Study records use random IDs rather than your sign-in ID.':'Check that the same account and source app were used to rate these words.'}</p>}<div className="flex gap-2 flex-wrap my-4"><button className={'language-pill '+(filter==='all'?'selected':'')} onClick={()=>setFilter('all')}>All words ({data.words.length})</button>{categories.map(k=><button className={'language-pill '+(filter===k?'selected':'')} aria-pressed={filter===k} key={k} onClick={()=>setFilter(k)}>{k} ({data.words.filter(w=>w.label===k).length})</button>)}</div><input className="search-input w-full" aria-label="Search linked words" placeholder="Search in the learning language…" value={query} onChange={e=>setQuery(e.target.value)}/>{rows.slice(0,30).map(w=><div className="review-row" key={w.id}><strong lang={settings.targetLanguage}>{w.text}</strong><span>{w.label}</span>{(settings.meaningLanguage==='en'||settings.showEnglish)&&w.english&&<small lang="en">{w.english}</small>}</div>)}<p className="text-xs mt-3">Showing {Math.min(rows.length,30)} of {rows.length}. Search or filter to narrow the list. English glosses, when available, follow your Show English preference.</p></>}{!['guest','unsupported'].includes(data.status)&&<button className="quiet-btn mt-4" disabled={data.status==='loading'} onClick={data.reload}>Refresh ratings</button>}<details className="activity-detail"><summary>Other app connections</summary><p>Japanese Study: word markings. KG Chart: ratings in supported learning languages. Burmese Study: account-linked practice levels only; legacy ownership migration pending. Kata Kita: reviews currently stay on its device; cloud connection pending. Changing the learning language in Settings changes the available sources.</p></details></section>;
    }

    function Meaning({text,settings}) {
      if (!text) return null;
      const language=window.CatalystMeanings.language(settings);
      const translated=window.CatalystMeanings.translate(text,language);
      return <div className="text-sm text-slate-600 mt-1">
        <div lang={language}>{translated || 'Translation not available in your meaning language yet.'}</div>
        {language!=='en' && settings.showEnglish && <div lang="en" className="mt-1 text-slate-500">{text}</div>}
      </div>;
    }
    function EnglishOption({settings,update}) {
      const language=window.CatalystMeanings.language(settings);
      return <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 my-3"><span>Meanings: {LANG[language]?.name || language}</span>{language!=='en' && <label className="inline-flex items-center gap-2"><input type="checkbox" checked={!!settings.showEnglish} onChange={e=>update({showEnglish:e.target.checked})}/>Show English</label>}</div>;
    }
    function Example({ ex, lang, settings, conv }) {
      const dev = useMemo(() => (STUDY.includes(lang) ? window.CatalystScripts.devanagari(ex, lang) : ''), [ex, lang, conv]);
      const L = LANG[lang];
      return (
        <div className="py-2.5 border-t border-slate-100 first:border-t-0">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div lang={lang} dir={L.dir} className={`${L.font} text-lg text-slate-900 leading-snug break-words`}><Highlight text={ex.t} parts={ex.h} /></div>
              {settings.dev && dev && <div className="dev-line text-[15px] leading-snug mt-0.5">{dev}</div>}
              {settings.reading && ex.r && <div className="text-xs text-slate-400 mt-0.5">{ex.r}</div>}
              {ex.e && <Meaning text={ex.e} settings={settings}/>}
            </div>
            {lang !== 'en' && <Speak text={ex.t} lang={lang} />}
          </div>
        </div>
      );
    }

    // ---- closeness grid: every pair among the languages on screen ----
    function Closeness({ concept, langs, pick, setPick }) {
      const note = pick ? concept.pairNotes[pick] : null;
      const [a, b] = pick ? pick.split('-') : [];
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">How close? <span className="normal-case font-normal">tap a square</span></div>
          <div className="grid gap-1 max-w-lg" style={{ gridTemplateColumns: `4.2rem repeat(${langs.length}, minmax(0, 1fr))` }}>
            <div></div>
            {langs.map(l => <div key={l} className="text-[11px] text-center font-semibold text-slate-600 truncate">{LANG[l].name}</div>)}
            {langs.map(r => (
              <React.Fragment key={r}>
                <div className="text-[11px] font-semibold text-slate-600 self-center truncate">{LANG[r].name}</div>
                {langs.map(c => {
                  if (r === c) return <div key={c} className="h-9 rounded-lg bg-slate-100"></div>;
                  const k = pairKey(r, c), lv = concept.levels[k], has = !!concept.pairNotes[k];
                  return (
                    <button key={c} onClick={() => setPick(pick === k ? null : k)}
                      className={`h-9 rounded-lg text-sm font-bold relative ${LEVEL[lv]?.cell || 'bg-slate-200'} ${pick === k ? 'ring-2 ring-offset-1 ring-slate-800' : ''}`}>
                      {LEVEL[lv]?.sym}{has && <span className="absolute top-0.5 right-1 text-[9px] opacity-80">●</span>}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="flex gap-3 mt-2 text-[11px] text-slate-500 flex-wrap">
            {Object.entries(LEVEL).map(([k, L]) => <span key={k}><b>{L.sym}</b> {L.label}</span>)}
            <span>● has a note</span>
          </div>
          {pick && (
            <div className="mt-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <b>{LANG[a].name} ↔ {LANG[b].name}: {LEVEL[concept.levels[pick]]?.label}.</b>{' '}
              {note || 'No extra note: compare the two cards below.'}
            </div>
          )}
        </div>
      );
    }

    function EntryCard({ concept, lang, langs, settings, conv, pick, setPick, anchor }) {
      const e = concept.entries[lang];
      if (!e) return null;
      const others = langs.filter(l => l !== lang);
      return (
        <div className={`rounded-2xl p-3.5 ${e.none ? 'bg-white/60 border-2 border-dashed border-rose-200' : 'bg-white border border-slate-200'} ${anchor ? 'ring-1 ring-orange-200' : ''}`}>
          <div className="flex items-center justify-between gap-2">
            <LangTag lang={lang} />
            {anchor && <span className="text-[10px] uppercase tracking-wide font-semibold text-orange-600">anchor</span>}
          </div>
          <div className={`mt-1.5 text-xl font-semibold text-slate-900 ${LANG[lang].font}`}>{e.form}</div>
          {e.none && <div className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wide text-rose-700 bg-rose-50 px-2 py-0.5 rounded">No equivalent</div>}
          <div className="flex flex-wrap gap-1 mt-2">
            {others.map(o => { const k = pairKey(lang, o); return (
              <LevelChip key={o} level={concept.levels[k]} active={pick === k} onClick={() => setPick(pick === k ? null : k)}>{LANG[o].name}</LevelChip>
            ); })}
          </div>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">{e.note}</p>
          <div className="mt-1">{e.ex.map((x, i) => <Example key={i} ex={x} lang={lang} settings={settings} conv={conv} />)}</div>
        </div>
      );
    }

    // Example n says the same thing in every language: show them together
    function SentenceView({ concept, langs, settings, conv }) {
      const n = Math.max(...langs.map(l => concept.entries[l]?.ex.length || 0));
      return (
        <div className="space-y-3">
          {Array.from({ length: n }, (_, i) => {
            const meaning = concept.entries.ja?.ex[i]?.e || concept.entries.my?.ex[i]?.e || '';
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-3.5">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sentence {i + 1}</div>
                {meaning && <Meaning text={meaning} settings={settings}/>}
                {langs.map(l => {
                  const x = concept.entries[l]?.ex[i];
                  if (!x) return null;
                  return (
                    <div key={l} className="pt-2">
                      <LangTag lang={l} small />
                      <Example ex={{ ...x, e: l === 'en' ? '' : x.e === meaning ? '' : x.e }} lang={l} settings={settings} conv={conv} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    }

    // Account/target/meaning/concept changes remount this whole practice view.
    function PatternPractice({concept,settings,session,openSettings}) {
      const api=window.CatalystPatterns,{scope}=React.useContext(ReviewContext);
      const identity=React.useContext(StudyAccountContext);
      const enabled=settings.targetLanguage==='my'&&concept.id==='verb_final';
      const state=useStudySource('my','kg','patterns',enabled);
      const [patternId,setPatternId]=useState(api.patterns[0].id),[speaker,setSpeaker]=useState('masculine'),[wordKey,setWordKey]=useState('');
      const [result,setResult]=useState(null),[notice,setNotice]=useState(''),[saved,setSaved]=useState(false);
      const uid=identity.owner?.id;
      const clear=()=>{setResult(null);setNotice('');setSaved(false);};
      if(settings.targetLanguage!=='my')return <section className="pattern-box"><h2 className="text-xl font-bold">Practice with my words</h2><p className="mt-3">Pattern practice currently supports Burmese in the “Verb at the end” lesson. Your lessons and notebook are available in {LANG[settings.targetLanguage].name}.</p></section>;
      if(!enabled)return <section className="pattern-box"><h2 className="text-xl font-bold">Practice with my words</h2><p className="mt-3">Start with three Burmese patterns in “Verb at the end”: eating, drinking and going to a place.</p><button className="primary-btn mt-3" onClick={()=>go('verb_final')}>Open word-order lesson</button></section>;
      if(identity.scope==='loading')return <p role="status">{identity.message||'Checking sign-in…'}</p>;
      if(!uid)return <section className="pattern-box"><h2 className="text-xl font-bold">Practice with my words</h2><p className="mt-3">Sign in with your KG Chart account to use your learned Burmese words. No AI key is needed.</p><button className="primary-btn mt-3" onClick={openSettings}>Sign in</button></section>;
      const p=api.pattern(patternId),options=api.choices(state.words,patternId),selected=options.find(w=>w.key===wordKey)||options[0];
      const make=key=>{try{setResult(api.build(patternId,key,speaker,state.words));setNotice('');setSaved(false);}catch(error){setResult(null);setNotice(error.message);}};
      const save=()=>{
        if(!result||scope!==uid)return;
        try{
          let added=false;
          window.CatalystNotebook.commit(localStorage,scope,'my',data=>{
            const next=window.CatalystNotebook.addFromActivity(data,{pilot:{id:result.patternId,language:'my',concept:'verb_final'},targetLanguage:'my',
              id:crypto.randomUUID(),original:result.t,meaning:result.meanings[settings.meaningLanguage],meaningLanguage:settings.meaningLanguage,createdAt:new Date().toISOString()});
            added=next.added;return next.data;
          });
          setSaved(true);setNotice(added?'Saved to My Learning → My sentence notebook on this device.':'This pattern sentence is already in your notebook. No duplicate was added.');
        }catch(error){setSaved(false);setNotice('Could not save to the notebook. The sentence is still here; copy it and try again.');}
      };
      return <section className="pattern-practice study-panel" aria-labelledby="pattern-practice-title">
        <span className="eyebrow">BURMESE · WORD ORDER</span><h2 id="pattern-practice-title" className="text-2xl font-bold mt-2">Practice with my words</h2>
        <p className="mt-3">Build a sentence from a fixed pattern and a noun you have learned in KG Chart. No AI key or generation charge.</p>
        <p className="mt-2">A noun qualifies through a completed Burmese topic or two correct quiz answers. The pattern supplies “I”, the verb and the ending; these are lesson words, not a claim that you already know them.</p>
        <SnapshotNotice data={state}/>{state.status==='loading'&&<p role="status" className="review-notice">Loading your learned Burmese words…</p>}
        {state.status==='error'&&<p role="alert" className="review-notice">{state.error}</p>}
        {state.status==='ready'&&<>
          <div className="pattern-controls">
            <label>Sentence pattern<select className="search-input" value={patternId} onChange={e=>{setPatternId(e.target.value);setWordKey('');clear();}}>{api.patterns.map(item=><option key={item.id} value={item.id}>{item.label[settings.meaningLanguage]}</option>)}</select></label>
            <label>Speaker form<select className="search-input" value={speaker} onChange={e=>{setSpeaker(e.target.value);clear();}}><option value="masculine">Masculine · ကျွန်တော်</option><option value="feminine">Feminine · ကျွန်မ</option></select></label>
          </div>
          {options.length?<><label className="block mt-4">Learned word<select className="search-input block w-full mt-2" value={selected.key} onChange={e=>{setWordKey(e.target.value);clear();}}>{options.map(w=><option key={w.key} value={w.key}>{w.native} · {settings.meaningLanguage==='mr'?w.mr:w.en}</option>)}</select></label><p className="mt-2">{options.length} compatible learned {options.length===1?'word':'words'}. One is enough to practise this pattern.</p><button className="primary-btn mt-4" onClick={()=>make(selected.key)}>Make practice sentence</button></>:<p className="review-notice" role="status">{p.kind==='place'?'No matching learned place word yet. This pattern needs a standalone KG Chart word such as school, home, market or park. Try the food or drink pattern for now.':'No compatible learned '+(p.kind==='food'?'food':'drink')+' word yet. Complete a matching Burmese topic or answer the word correctly twice in KG Chart, then refresh your words here.'}</p>}
        </>}
        <button className="quiet-btn mt-4" disabled={state.status==='loading'} onClick={state.reload}>Refresh learned words</button>
        {result&&<div className="pattern-result mt-5" aria-live="polite">
          <p className="font-bold">Pattern example · {p.label[settings.meaningLanguage]}</p>
          <p lang="my" className="font-burmese text-2xl mt-3 break-words">{result.t}</p>
          <p className="text-sm mt-3">Approximate Devanagari reading</p><p lang="mr" className="dev-line text-lg mt-1 break-words">{result.dev}</p>
          <p lang={settings.meaningLanguage} className="text-lg mt-3">{result.meanings[settings.meaningLanguage]}</p>
          {settings.meaningLanguage!=='en'&&settings.showEnglish&&<p lang="en" className="mt-2">{result.meanings.en}</p>}
          <p className="mt-3">Your learned noun: <span lang="my">{result.word}</span>. Patterns and readings await native-speaker review.</p>
          <div className="notebook-actions mt-4"><button className="primary-btn" disabled={scope!==uid} onClick={save}>Save pattern to notebook</button>{options.length>1&&<button className="quiet-btn" onClick={()=>{const next=options[(options.findIndex(w=>w.key===selected.key)+1)%options.length];setWordKey(next.key);make(next.key);}}>Next word</button>}{saved&&<button className="quiet-btn" onClick={()=>go('learning')}>Open notebook</button>}</div>
        </div>}
        <p role="status" className="mt-3">{notice}</p>
      </section>;
    }

    // Read existing AI examples without contacting the generation function.
    function SavedAiSentences({concept,settings,conv,session}) {
      const api=window.CatalystGeneration,target=settings.targetLanguage,meaningLanguage=settings.meaningLanguage;
      const [rows,setRows]=useState(null),[busy,setBusy]=useState(false),[msg,setMsg]=useState(''),[reload,setReload]=useState(0);
      const active=React.useRef(false),locked=React.useRef(false);
      useEffect(()=>{active.current=true;return()=>{active.current=false;};},[]);
      useEffect(()=>{
        let cancelled=false;setRows(null);setMsg('');
        api.load(sb,session.user.id,concept.id,target).then(data=>{if(!cancelled)setRows(data);})
          .catch(error=>{if(!cancelled){setRows([]);setMsg(error.message);}});
        return()=>{cancelled=true;};
      },[reload]);
      const flag=async(row)=>{
        if(locked.current)return;
        locked.current=true;setBusy(true);setMsg('');
        try{
          const {data,error}=await sb.from('catalyst_generated').update({flagged:true}).eq('id',row.id).eq('user_id',session.user.id).select('id');
          if(!active.current)return;
          if(error||!data?.some(item=>item.id===row.id))setMsg('Could not save the flag. The sentence remains visible; try again.');
          else{setRows(prev=>prev.filter(item=>item.id!==row.id));setMsg('Sentence hidden and kept for review.');}
        }catch(error){if(active.current)setMsg('Could not save the flag. Please try again.');}
        finally{if(active.current){locked.current=false;setBusy(false);}}
      };
      return <div className="mt-3"><p>Previously saved AI examples are unreviewed. New AI generation is paused.</p>
        <button disabled={busy} className="quiet-btn mt-3" onClick={()=>setReload(n=>n+1)}>Reload saved sentences</button>
        {msg&&<p role="status" className="review-notice">{msg}</p>}{rows===null&&<p role="status">Loading saved sentences…</p>}
        {rows?.length===0&&<p className="mt-3">No saved examples loaded for this lesson and learning language.</p>}
        <div className="space-y-3 mt-3">{(rows||[]).map(row=><div key={row.id} className="pattern-box">
          <div className="flex justify-between gap-2"><span>AI generated · not reviewed{!row.target_language?' · earlier multilingual example':''}</span><button disabled={busy} className="quiet-btn" onClick={()=>flag(row)}>🚩 Wrong</button></div>
          <LangTag lang={target} small/><Example ex={row.sentences[target]} lang={target} settings={settings} conv={conv}/>
          <p className="mt-2" lang={meaningLanguage}>{api.meaning(row,meaningLanguage)||'Meaning unavailable in this language for this saved example.'}</p>
          {meaningLanguage!=='en'&&settings.showEnglish&&<p className="mt-1" lang="en">{api.meaning(row,'en')}</p>}
        </div>)}</div>
      </div>;
    }
    function YourSentences(props) {
      const [showSaved,setShowSaved]=useState(false);
      return <div className="space-y-4"><PatternPractice {...props}/>
        {sb&&props.session?.user?.id&&window.CatalystGeneration.targets.includes(props.settings.targetLanguage)&&<section className="pattern-box">
          <button className="quiet-btn" aria-expanded={showSaved} onClick={()=>setShowSaved(value=>!value)}>{showSaved?'Hide earlier AI sentences':'Show earlier AI sentences'}</button>
          {showSaved&&<SavedAiSentences {...props}/>}
        </section>}
      </div>;
    }

    const ReviewContext=React.createContext(null);
    function ReviewProvider({scope,language,children}) {
      const engine=window.CatalystReview,key=engine.storageKey(scope,language);
      const read=()=>{try{return {data:engine.parse(localStorage.getItem(key)),error:''};}catch(e){return {data:engine.empty(),error:'Review records could not be loaded. They have not been overwritten.'};}};
      const [state,setState]=useState(read);
      const [now,setNow]=useState(Date.now());
      useEffect(()=>{const tick=()=>setNow(Date.now()),sync=e=>{if(e.key===key)setState(read());};const timer=setInterval(tick,60000);window.addEventListener('focus',tick);window.addEventListener('storage',sync);return()=>{clearInterval(timer);window.removeEventListener('focus',tick);window.removeEventListener('storage',sync);};},[key]);
      const commit=change=>{
        if(scope==='loading'||window.CatalystSafety.isLocked())return false;
        try{const latest=engine.parse(localStorage.getItem(key)),data=change(latest);localStorage.setItem(key,JSON.stringify(data));setState({data,error:''});setNow(Date.now());return true;}
        catch(e){setState(s=>({...s,error:'Review progress could not be saved. Existing records are preserved; keep this page open and try again.'}));return false;}
      };
      const value={data:state.data,now,scope,record:(task,event)=>commit(data=>engine.record(data,task,event)),setState:(id,value)=>commit(data=>engine.setState(data,id,value))};
      return <ReviewContext.Provider value={value}>{scope==='loading'&&<p className="review-notice" role="status">Checking the account for review progress…</p>}{state.error&&<p className="review-notice" role="alert">{state.error}</p>}{children}</ReviewContext.Provider>;
    }

    const GROUP_ICON = {'Word order':'🧩','Particles':'🔗','Questions and endings':'💬','Tense and aspect':'⏳','Mood':'✨','Politeness and negation':'🤝','Counting':'🔢'};
    const shuffle = (xs) => { const a = [...xs]; for (let i=a.length-1;i>0;i--) {const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
    // Concept labels describe meaning, independently of Japanese source titles.
    const QUIZ_LABELS = {"verb_final": {"en": "Verb at the end", "mr": "वाक्याच्या शेवटी क्रियापद"}, "modifier_before_noun": {"en": "Describing clause before the noun", "mr": "नामापूर्वी वर्णन करणारे उपवाक्य"}, "topic_wa": {"en": "Topic marker", "mr": "विषय दर्शवणारा शब्द"}, "subject_ga": {"en": "Subject marker", "mr": "कर्ता दर्शवणारा शब्द"}, "object_o": {"en": "Object marker", "mr": "कर्म दर्शवणारा शब्द"}, "place_de_ni": {"en": "Place of action / existence", "mr": "क्रियेचे ठिकाण / अस्तित्वाचे ठिकाण"}, "direction_ni_e": {"en": "Destination / recipient", "mr": "गंतव्य / प्राप्तकर्ता"}, "also_mo": {"en": "Also / too", "mr": "सुद्धा / देखील"}, "from_until": {"en": "From / until", "mr": "पासून / पर्यंत"}, "possessive_no": {"en": "Possession", "mr": "मालकी / संबंध"}, "with_to": {"en": "And / with", "mr": "आणि / सोबत"}, "yes_no_ka": {"en": "Yes/no question", "mr": "होय / नाही असे उत्तर असलेला प्रश्न"}, "wh_question": {"en": "Question words", "mr": "प्रश्नार्थक शब्द"}, "tag_ne": {"en": "Seeking agreement", "mr": "संमती विचारणे"}, "past": {"en": "Past tense", "mr": "भूतकाळ"}, "progressive": {"en": "Ongoing action / state", "mr": "चालू क्रिया / स्थिती"}, "future": {"en": "Future / plans", "mr": "भविष्यकाळ / योजना"}, "experience": {"en": "Past experience", "mr": "पूर्वी केलेल्या गोष्टीचा अनुभव"}, "want_tai": {"en": "Want to do", "mr": "काही करण्याची इच्छा"}, "ability": {"en": "Ability / can", "mr": "क्षमता / शकणे"}, "because": {"en": "Reason / because", "mr": "कारण सांगणे"}, "politeness": {"en": "Politeness", "mr": "आदरार्थी भाषा"}, "negation": {"en": "Negation / not", "mr": "नकार / नाही"}, "counters": {"en": "Counting words", "mr": "मोजणीचे शब्द"}};
    const quizLabel = (concept, language) => QUIZ_LABELS[concept.id]?.[language] || null;
    function makeQuestions(concepts, langs, kind='meaning', meaningLanguage='en', targetLanguages=STUDY) {
      const pool=[];
      for (const c of concepts) {
        for (const l of langs.filter(l=>targetLanguages.includes(l))) {
          const e=c.entries[l]; if (!e) continue;
          if (kind==='meaning') for (const x of e.ex || []) {
            const translated=window.CatalystMeanings.translate(x.e || (l==='en'?x.t:''),meaningLanguage);
            if (!translated) continue;
            // Only use unique translations; never invent distractor translations.
            const wrong=[...new Set(concepts.flatMap(o=>(o.entries[l]?.ex||[]).map(z=>window.CatalystMeanings.translate(z.e || (l==='en'?z.t:''),meaningLanguage))).filter(t=>t && t!==translated))];
            if (wrong.length<2) continue;
            pool.push({id:`${c.id}-${l}-${x.t}`,concept:c,lang:l,prompt:'What does this example mean?',text:x.t,answer:translated,options:shuffle([translated,...shuffle(wrong).slice(0,2)]),note:e.note,example:{...x,e:x.e || (l==='en'?x.t:'')}});
          }
        }
        if (kind==='connections') for(let i=0;i<langs.length;i++) for(let j=i+1;j<langs.length;j++) {
          if (!targetLanguages.includes(langs[i]) && !targetLanguages.includes(langs[j])) continue;
          const level=levelOf(c,langs[i],langs[j]); if (!LEVEL[level]) continue;
          pool.push({id:`${c.id}-${langs[i]}-${langs[j]}`,concept:c,prompt:`For “${quizLabel(c,meaningLanguage) || c.id}”, how closely do these languages match?`,text:`${LANG[langs[i]].name} ↔ ${LANG[langs[j]].name}`,answer:LEVEL[level].label,options:shuffle(Object.values(LEVEL).map(x=>x.label)),note:c.pairNotes[pairKey(langs[i],langs[j])] || c.summary});
        }
        if (kind==='forms') for(const l of langs.filter(l=>targetLanguages.includes(l))) {
          const e=c.entries[l]; if(!e || e.none) continue;
          const answer=quizLabel(c,meaningLanguage); if(!answer) continue;
          const wrong=[...new Set(concepts.filter(o=>o.id!==c.id && o.entries[l] && !o.entries[l].none && o.entries[l].form!==e.form).map(o=>quizLabel(o,meaningLanguage)).filter(label=>label && label!==answer))];
          if(wrong.length<2) continue;
          pool.push({id:`${c.id}-${l}-form`,concept:c,lang:l,prompt:'Which grammar lesson uses this form?',text:e.form,answer,options:shuffle([answer,...shuffle(wrong).slice(0,2)]),note:e.note});
        }
      }
      return shuffle(pool);
    }
    function quizTask(q,kind){return {...q,id:`quiz:${kind}:${q.id}`,conceptId:q.concept.id,skill:kind==='connections'?'context':'understanding',kind,type:'choice'};}
    function activityTask(pilot,kind,index,language){
      const conceptId=pilot.concept||pilot.id,base={conceptId,lang:pilot.language,kind:'activity',pilotId:pilot.id};
      if(kind==='build')return {...base,id:`activity:${pilot.id}:build`,type:'build',skill:'production',prompt:pilot.build.prompt[language],text:'',build:pilot.build,note:pilot.build.explanation[language],answer:window.CatalystActivities.assemble(pilot.build,pilot.build.orders[0])};
      const q=pilot.choices[index];return {...base,id:`activity:${pilot.id}:choice:${index}`,type:'choice',skill:'context',prompt:q.prompt[language],text:'',options:q.options,answer:q.options[q.accepted[0]],accepted:q.accepted.map(i=>q.options[i]),note:q.explanation[language]};
    }
    function reviewTasks(concepts,settings){
      const language=window.CatalystMeanings.language(settings),langs=window.CatalystPreferences.languages(settings);
      return ['meaning','forms','connections'].flatMap(kind=>makeQuestions(concepts,langs,kind,language,[settings.targetLanguage]).map(q=>quizTask(q,kind))).concat(window.CatalystActivities.pilots.filter(p=>p.language===settings.targetLanguage).flatMap(p=>[activityTask(p,'build',0,language),...p.choices.map((_,i)=>activityTask(p,'choice',i,language))]));
    }

    function Practice({ concepts, settings, update, focus, onClose }) {
      const review=React.useContext(ReviewContext);
      const [kind,setKind]=useState('meaning');
      const [deck,setDeck]=useState(null); const [index,setIndex]=useState(0);
      const [answer,setAnswer]=useState(null); const [missed,setMissed]=useState([]); const [score,setScore]=useState(0);
      const [retry,setRetry]=useState(false);
      const langs=window.CatalystPreferences.languages(settings);
      const start=(questions,isRetry=false)=>{setDeck(questions);setIndex(0);setAnswer(null);setMissed([]);setScore(0);setRetry(isRetry);};
      const available=window.CatalystReview.rank(makeQuestions(concepts,langs,kind,window.CatalystMeanings.language(settings),[settings.targetLanguage]).filter(q=>!focus || q.concept.id===focus).map(q=>quizTask(q,kind)),review.data,review.now);
      const choose=(value)=>{
        if(answer!==null) return;
        const q=deck[index],correct=value===q.answer;
        if(!review.record(q,{correct,retry,response:value}))return;
        setAnswer(value);
        if(correct) setScore(s=>s+1); else setMissed(m=>[...m,q]);
        const day=new Date().toLocaleDateString('en-CA');
        update(s=>{ const p=s.practice||{}, old=p.byConcept?.[q.concept.id]||{attempts:0,correct:0}; return {practice:{...p,answers:(p.answers||0)+1,correct:(p.correct||0)+(correct?1:0),day,today:(p.day===day?p.today||0:0)+1,byConcept:{...p.byConcept,[q.concept.id]:{attempts:old.attempts+1,correct:old.correct+(correct?1:0)}}}}; });
      };
      return <section className="study-panel">
        <p className="text-sm text-slate-600 mb-2">Practising {LANG[settings.targetLanguage].name}{settings.anchor!=='none'?` · reference: ${LANG[settings.anchor].name}`:''}</p><EnglishOption settings={settings} update={update}/><div className="flex items-center justify-between mb-5"><span className="eyebrow">🎯 Practice lab</span><button className="quiet-btn" onClick={onClose}>Close practice</button></div>
        {!deck ? <><h2 className="study-title">Make it stick.</h2><p className="text-slate-500 mt-2">Five questions. Due checks and mistakes come first, followed by new material. Immediate retries do not advance your review interval.</p>
          <div className="grid sm:grid-cols-3 gap-3 my-6">{[['meaning','💭','Meaning','Understand a sentence'],['forms','🧩','Grammar forms','Recognise the pattern'],['connections','🌏','Connections','Compare languages']].map(([id,icon,title,sub])=><button key={id} onClick={()=>setKind(id)} aria-pressed={kind===id} className={`mode-card ${kind===id?'selected':''}`}><span className="text-3xl">{icon}</span><strong className="block mt-3">{title}</strong><span className="text-sm text-slate-500">{sub}</span></button>)}</div>
          <button className="primary-btn" disabled={!available.length||review.scope==='loading'} onClick={()=>start(available.slice(0,5))}>Start {Math.min(5,available.length)} questions →</button>
          {!available.length && <p className="mt-3 text-slate-500">No questions available for this combination. Connections needs a reference or comparison language. Meaning practice requires a matching translation; no English fallback is added automatically.</p>}</>
        : index>=deck.length ? <div className="text-center py-7"><div className="text-6xl">{score===deck.length?'🌟':'🌱'}</div><h2 className="study-title mt-4">{score===deck.length?'Beautiful connections!':'A little stronger already.'}</h2><p className="text-lg mt-3">{score} of {deck.length} correct{retry?' in your retry':''}</p><p className="text-slate-500 mt-2">{missed.length?'Revisit the tricky ones while they’re fresh.':'Keep building with another lesson.'}</p><div className="flex flex-wrap gap-3 justify-center mt-6">{missed.length>0 && <button className="primary-btn" onClick={()=>start(shuffle(missed),true)}>Retry {missed.length} mistakes</button>}<button className="quiet-btn" onClick={()=>setDeck(null)}>Choose practice</button><button className="quiet-btn" onClick={onClose}>Done</button></div></div>
        : <><div className="flex justify-between text-sm text-slate-500"><span>Question {index+1} / {deck.length}</span><span>{score} correct</span></div><div className="progress-track my-3"><div style={{width:`${index/deck.length*100}%`}} /></div>
          <h2 className="text-lg font-semibold mt-6">{deck[index].prompt}</h2>{deck[index].lang && <div className="mt-4"><LangTag lang={deck[index].lang}/></div>}<div lang={deck[index].lang} dir={LANG[deck[index].lang]?.dir} className={`question-text ${deck[index].lang?LANG[deck[index].lang].font:''}`}>{deck[index].text}</div>
          {deck[index].kind==='meaning'&&<SentenceAudio text={deck[index].text} lang={deck[index].lang}/>}
          <div className="grid gap-3">{deck[index].options.map((option,i)=><button key={option} disabled={answer!==null} onClick={()=>choose(option)} className={`answer-btn ${answer!==null && option===deck[index].answer?'correct':''} ${answer===option && option!==deck[index].answer?'incorrect':''}`}><span className="answer-number">{i+1}</span><span>{option}</span>{answer!==null && option===deck[index].answer && <span>✓</span>}</button>)}</div>
          {answer!==null&&deck[index].kind==='meaning'&&<WordProgress text={deck[index].text} lang={deck[index].lang}/>}
          {answer!==null && <div className="feedback" role="status"><strong>{answer===deck[index].answer?'✓ That’s right!':'Keep this connection in mind.'}</strong><p className="mt-2">{answer!==deck[index].answer && <span>Answer: {deck[index].answer}. </span>}{(window.CatalystMeanings.language(settings)==='en' || settings.showEnglish) && deck[index].note}</p>{kind==='meaning' && settings.showEnglish && <p className="mt-2">English: {deck[index].example?.e}</p>}<button className="primary-btn mt-4" onClick={()=>{setIndex(i=>i+1);setAnswer(null);}}>{index===deck.length-1?'See results':'Next question →'}</button></div>}
        </>}
      </section>;
    }
    function Lesson({concept,langs,settings,conv,onPractice}) {
      const [lang,setLang]=useState(langs[0]); const [n,setN]=useState(0); const [reveal,setReveal]=useState(false);
      const active=langs.includes(lang)?lang:langs[0],entry=concept.entries[active];
      const examples=entry?.ex||[],ex=examples[n]||examples[0];
      return <div className="study-panel"><div className="flex items-center justify-between gap-2"><span className="eyebrow">01 / Explore the pattern</span><span className="text-2xl">{GROUP_ICON[concept.group]}</span></div>
        <div className="flex gap-2 flex-wrap mt-5">{langs.map(l=><button className={`language-pill ${active===l?'selected':''}`} key={l} onClick={()=>{setLang(l);setN(0);setReveal(false);}}>{LANG[l].name}{l===settings.targetLanguage?' · learning':l===settings.anchor?' · reference':''}</button>)}</div>
        <div className="pattern-box"><div className={`text-2xl font-bold ${LANG[active].font}`}>{entry?.form||'No entry yet'}</div><p className="mt-3 text-slate-600">{entry?.note}</p></div>
        {ex && <><div className="flex justify-between items-center text-sm text-slate-500"><span>Example {Math.min(n+1,examples.length)} of {examples.length}</span><span>Read · listen · recall</span></div><Example ex={{...ex,e:reveal?(ex.e || (active==='en'?ex.t:'')):''}} lang={active} settings={settings} conv={conv}/>
          <button className="quiet-btn w-full mt-2" aria-expanded={reveal} onClick={()=>setReveal(v=>!v)}>{reveal?'Hide meaning':'Think of the meaning, then tap to reveal'}</button>
          <div className="flex gap-3 mt-5"><button className="quiet-btn flex-1" disabled={n===0} onClick={()=>{setN(i=>i-1);setReveal(false);}}>← Previous</button><button className="quiet-btn flex-1" disabled={n>=examples.length-1} onClick={()=>{setN(i=>i+1);setReveal(false);}}>Next example →</button></div></>}
        <button className="primary-btn w-full mt-5" onClick={onPractice}>02 / Try it yourself →</button>
      </div>;
    }
    function ConceptPage({ concept, concepts, settings, update, conv, session, openSettings }) {
      const [pick,setPick]=useState(null); const [mode,setMode]=useState('learn');
      const langs=window.CatalystPreferences.languages(settings);
      const i=concepts.findIndex(c=>c.id===concept.id),next=concepts[i+1];
      const learned=settings.learned.includes(concept.id);
      return <div className="space-y-5"><div className="lesson-heading"><div className="eyebrow">{concept.group} · Lesson {i+1} of {concepts.length}</div><h1 className="study-title mt-2">{concept.title}</h1><p className="text-slate-500 mt-3 max-w-2xl">{concept.summary}</p></div>
        <LearningState id={concept.id}/><EnglishOption settings={settings} update={update}/><nav className="study-tabs" aria-label="Lesson mode">{[['learn','📖 Learn'],['practice','🎯 Practice'],['compare','🌏 Compare'],['create','✨ Your words']].map(([m,label])=><button key={m} className={mode===m?'selected':''} onClick={()=>setMode(m)} aria-current={mode===m?'page':undefined}>{label}</button>)}</nav>
        {mode==='learn' && <><ActivityLibrary settings={settings} update={update} conceptId={concept.id}/><Lesson concept={concept} langs={langs} settings={settings} conv={conv} onPractice={()=>setMode('practice')}/></>}
        {mode==='practice' && <Practice concepts={concepts} focus={concept.id} settings={settings} update={update} onClose={()=>setMode('learn')}/>}
        {mode==='compare' && <><Closeness concept={concept} langs={langs} pick={pick} setPick={setPick}/><div className="flex gap-2">{[['lang','By language'],['sentence','By sentence']].map(([v,label])=><button key={v} className={`language-pill ${settings.view===v?'selected':''}`} onClick={()=>update({view:v})}>{label}</button>)}</div>{settings.view==='sentence'?<SentenceView concept={concept} langs={langs} settings={settings} conv={conv}/>:<div className="grid gap-3 md:grid-cols-2">{langs.map(l=><EntryCard key={l} concept={concept} lang={l} langs={langs} settings={settings} conv={conv} pick={pick} setPick={setPick} anchor={l===settings.anchor}/>)}</div>}</>}
        {mode==='create' && <YourSentences key={`${concept.id}:${session?.user?.id||'guest'}:${settings.targetLanguage}:${settings.meaningLanguage}`} concept={concept} settings={settings} conv={conv} session={session} openSettings={openSettings}/>}
        <div className="flex flex-wrap gap-3"><button className={`quiet-btn flex-1 ${learned?'text-emerald-700':''}`} onClick={()=>update(s=>({learned:learned?s.learned.filter(x=>x!==concept.id):[...s.learned,concept.id]}))}>{learned?'✓ Learned · tap to undo':'✓ Mark as learned'}</button>{next && <button className="quiet-btn flex-1" onClick={()=>go(next.id)}>Next lesson →</button>}</div>
        <p className="text-xs text-slate-500">Learning progress is saved on this device. Examples await native-speaker review.</p>
      </div>;
    }
    function SkillSummary({data,conceptId}){
      const scores=window.CatalystReview.summary(data,conceptId);
      return <div className="skill-grid">{Object.entries({...window.CatalystReview.skills,retention:'Delayed recall'}).map(([id,label])=><div key={id}><strong>{label}</strong><span>{scores[id].attempts?`${scores[id].correct} / ${scores[id].attempts} independent checks`:'Not assessed yet'}</span></div>)}</div>;
    }
    function LearningState({id}){
      const review=React.useContext(ReviewContext);
      return <label className="review-state">My learning state<select aria-label="My learning state" value={review.data.states[id]||''} disabled={review.scope==='loading'} onChange={e=>review.setState(id,e.target.value)}><option value="">Not assigned</option>{Object.entries(window.CatalystReview.states).map(([key,label])=><option value={key} key={key}>{label}</option>)}</select></label>;
    }
    function ReviewQueue({concepts,settings,compact=false}){
      const review=React.useContext(ReviewContext),engine=window.CatalystReview;
      const [mode,setMode]=useState('due'),[deck,setDeck]=useState(null),[index,setIndex]=useState(0);
      const tasks=useMemo(()=>reviewTasks(concepts,settings),[concepts,settings.targetLanguage,settings.anchor,settings.meaningLanguage,settings.comparisonLanguages.join('-')]);
      const byId=new Map(tasks.map(t=>[t.id,t]));
      const rows=Object.values(review.data.items),due=rows.filter(r=>r.dueAt<=review.now),mistakes=rows.filter(r=>r.mistake);
      const filtered=mode==='due'?due:mistakes;
      const available=engine.rank(filtered.map(r=>byId.get(r.id)).filter(Boolean),review.data,review.now);
      const missing=filtered.length-available.length;
      const titleFor=id=>quizLabel(concepts.find(c=>c.id===id)||{id},settings.meaningLanguage)||window.CatalystActivities.pilots.find(p=>p.id===id)?.title[settings.meaningLanguage]||id;
      if(deck&&index<deck.length)return <ReviewQuestion key={`${index}-${deck[index].id}`} task={deck[index]} settings={settings} onNext={()=>setIndex(index+1)} onClose={()=>setDeck(null)} position={`${index+1} / ${deck.length}`}/>;
      if(deck)return <section className="study-panel"><h2 className="study-title">Review session complete</h2><p className="mt-3">The next review dates are saved. Immediate retries and assisted answers do not advance the interval. After seeing an answer, wait at least 24 hours for an independent check.</p><button className="primary-btn mt-4" onClick={()=>setDeck(null)}>Back to reviews</button></section>;
      return <section className="study-panel w-full"><div className="eyebrow">{LANG[settings.targetLanguage].name} · ADAPTIVE REVIEW</div><h2 className="text-2xl font-bold mt-2">{due.length?`${due.length} checks due`:'Your next small step'}</h2><p className="text-sm text-slate-500 mt-2">{mistakes.length} open mistakes · {review.scope==='guest'?'Guest progress':'Account progress'}, saved on this device only.</p>
        <div className="flex gap-2 flex-wrap mt-4"><button className={`language-pill ${mode==='due'?'selected':''}`} aria-pressed={mode==='due'} onClick={()=>setMode('due')}>Due now ({due.length})</button><button className={`language-pill ${mode==='mistakes'?'selected':''}`} aria-pressed={mode==='mistakes'} onClick={()=>setMode('mistakes')}>Mistakes ({mistakes.length})</button></div>
        <p className="text-sm mt-4">{mode==='mistakes'?'Practise mistakes now. A correct independent answer when due resolves them.':'Reviews use 1, 3, 7, 14 and 30-day intervals. These are practice dates, not mastery scores.'}</p>
        <button className="primary-btn mt-4" disabled={!available.length||review.scope==='loading'} onClick={()=>{setDeck(available.slice(0,5));setIndex(0);}}>Review {Math.min(5,available.length)} {mode==='mistakes'?'mistakes':'due checks'} →</button>
        {!rows.length&&<p className="text-sm mt-3">Answer practice questions or try a guided activity to start your review schedule.</p>}
        {!!rows.length&&!filtered.length&&<p className="text-sm mt-3">{mode==='due'?`Nothing due now. Next: ${new Date(Math.min(...rows.map(r=>r.dueAt))).toLocaleString()}`:'No open mistakes in this learning language.'}</p>}
        {missing>0&&<p className="review-notice">{missing} saved checks are unavailable with the current content or comparison settings. Their records are retained.</p>}
        {!compact&&<><SkillSummary data={review.data}/><p className="text-xs text-slate-500 mt-3">Production checks use guided sentence building. Free writing is self-reviewed, not automatically graded.</p>{filtered.slice().sort((a,b)=>a.dueAt-b.dueAt).slice(0,20).map(r=><div className="review-row" key={r.id}><strong>{titleFor(r.conceptId)}</strong><span>{engine.skills[r.skill]} · {r.dueAt<=review.now?'Due now':new Date(r.dueAt).toLocaleString()}</span>{r.mistake&&<span className="text-rose-700">Needs another independent check</span>}{r.mistake&&r.lastMistake&&<small>Last mistake: {r.lastMistake.response||'No answer'} · Expected: {r.lastMistake.expected}</small>}</div>)}{filtered.length>20&&<p className="text-sm mt-3">Showing the first 20 records. Review sessions include all available checks.</p>}</>}
      </section>;
    }
    function ReviewQuestion({task,settings,onNext,onClose,position}){
      const review=React.useContext(ReviewContext),[answer,setAnswer]=useState(null),[order,setOrder]=useState([]),[feedback,setFeedback]=useState(null),[assisted,setAssisted]=useState(false),[showHint,setShowHint]=useState(false);
      const bank=useMemo(()=>task.build?shuffle(task.build.chunks.map((_,i)=>i)):[],[task.id]);
      const grade=(value,reveal=false)=>{
        if(feedback)return;
        const correct=reveal?null:task.type==='build'?window.CatalystActivities.validOrder(task.build,order):(task.accepted||[task.answer]).includes(value);
        if(!review.record(task,{correct,assisted:assisted||reveal,response:value}))return;
        setAnswer(value);setFeedback(reveal?'revealed':correct?'correct':'incorrect');
      };
      const record=review.data.items[task.id];
      return <section className="study-panel"><div className="flex justify-between gap-3"><span className="eyebrow">REVIEW · {position}</span><button className="quiet-btn" onClick={onClose}>Close review</button></div><p className="text-sm mt-3">{LANG[settings.targetLanguage].name} · {window.CatalystReview.skills[task.skill]}</p><p className="text-xs text-slate-500 mt-2">{review.data.items[task.id]?.dueAt>review.now?'Early practice: this will not resolve the mistake or advance the interval.':'Independent recall requires 24 hours since the previous attempt or reveal.'}</p><h2 className="text-lg font-bold mt-4">{task.prompt}</h2>{task.text&&<div className={`question-text ${LANG[task.lang]?.font||''}`} lang={task.lang}>{task.text}</div>}
      {task.kind==='meaning'&&<SentenceAudio text={task.text} lang={task.lang}/>}
      {feedback&&task.kind==='meaning'&&<WordProgress text={task.text} lang={task.lang}/>}
      {task.type==='build'?<><div className="chunk-answer" aria-label="Your review sentence">{order.map((n,i)=><button className="chunk" disabled={!!feedback} key={n} onClick={()=>setOrder(order.filter((_,j)=>j!==i))}>{task.build.chunks[n]}</button>)}</div><div className="chunk-bank">{bank.map(i=><button className="chunk" key={i} disabled={!!feedback||order.includes(i)} onClick={()=>setOrder([...order,i])}>{task.build.chunks[i]}</button>)}</div><div className="flex gap-3 mt-4"><button className="primary-btn" disabled={!!feedback||order.length!==task.build.chunks.length} onClick={()=>grade(window.CatalystActivities.assemble(task.build,order))}>Check sentence</button><button className="quiet-btn" disabled={!!feedback} onClick={()=>{setAssisted(true);setShowHint(true);}}>Hint</button></div>{showHint&&<div className="feedback">{task.build.hint[settings.meaningLanguage]}</div>}</>:<div className="grid gap-3 mt-4">{task.options.map(option=><button className={`answer-btn ${answer===option?(feedback==='correct'?'correct':'incorrect'):''}`} key={option} disabled={!!feedback} onClick={()=>grade(option)}>{option}</button>)}</div>}
      {!feedback&&<button className="quiet-btn mt-4" onClick={()=>grade(task.answer,true)}>Reveal answer</button>}
      {feedback&&<div className="feedback" role="status"><strong>{feedback==='correct'?'✓ Correct':feedback==='revealed'?'Answer revealed · assisted practice':'Keep practising this skill'}</strong><p className="mt-2">Answer: {task.answer}</p>{(task.kind==='activity'||settings.meaningLanguage==='en'||settings.showEnglish)&&<p className="mt-2">{task.note}</p>}<p className="mt-2">Next check: {new Date(record.dueAt).toLocaleString()}. {record.mistake?'The mistake stays open until an independent correct answer when due.':''}</p><button className="primary-btn mt-4" onClick={onNext}>Continue review →</button></div>}
      </section>;
    }

    function ActivityText({value,settings}) {
      const language=window.CatalystMeanings.language(settings);
      return <><p lang={language}>{window.CatalystActivities.text(value,language)||'Translation not available.'}</p>{language!=='en'&&settings.showEnglish&&value?.en&&<p lang="en" className="text-sm text-slate-500 mt-2">{value.en}</p>}</>;
    }
    function ActivityLibrary({settings,update,conceptId}) {
      const api=window.CatalystActivities;
      const pilots=api.pilots.filter(p=>p.language===settings.targetLanguage&&(!conceptId||p.concept===conceptId));
      const [active,setActive]=useState(null);
      const pilot=pilots.find(p=>p.id===active);
      if(!pilots.length) return conceptId?null:<section className="study-panel"><h2 className="text-xl font-bold">Guided activities</h2><p className="mt-2 text-slate-500">Pilots are available for Burmese sentence order and negation, and Japanese topic transitions. Activities for your selected learning language are not available yet.</p></section>;
      if(pilot) return <ActivityLesson key={`${pilot.id}-${settings.meaningLanguage}`} pilot={pilot} settings={settings} update={update} onClose={()=>setActive(null)}/>;
      return <section className="study-panel w-full"><div className="eyebrow">NEW · GUIDED ACTIVITIES</div><h2 className="text-2xl font-bold mt-2">From noticing to using</h2><p className="text-sm text-slate-500 mt-2">Situation → Notice → Build → Choose → Use</p>{pilots.map(p=><button className="lesson-link mt-4" key={p.id} onClick={()=>setActive(p.id)}><span className="lesson-number">✦</span><span className="flex-1"><strong>{api.text(p.title,settings.meaningLanguage)}</strong><small>{api.text(p.summary,settings.meaningLanguage)} · {settings.activities?.[api.key(p)]?.completed?'Completed activity · revisit':settings.activities?.[api.key(p)]?'Resume activity':'Start activity'}</small></span><span>→</span></button>)}</section>;
    }
    function ActivityLesson({pilot,settings,update,onClose}) {
      const api=window.CatalystActivities, recordKey=api.key(pilot), saved=settings.activities?.[recordKey]||{};
      const review=React.useContext(ReviewContext),attempted=React.useRef(new Set()),activityAssisted=React.useRef(new Set());
      const track=(kind,index,correct,response,assisted=false)=>{const task=activityTask(pilot,kind,index,settings.meaningLanguage),ok=review.record(task,{correct,response,assisted:assisted||activityAssisted.current.has(task.id),retry:attempted.current.has(task.id)});if(ok)attempted.current.add(task.id);return ok;};
      const [step,setStep]=useState(Number.isInteger(saved.step)?Math.max(0,Math.min(4,saved.step)):0);
      const [order,setOrder]=useState([]),[buildFeedback,setBuildFeedback]=useState(null),[hint,setHint]=useState(false);
      const [answers,setAnswers]=useState({}),[revealed,setRevealed]=useState({});
      const [draft,setDraft]=useState(typeof saved.draft==='string'?saved.draft:'');
      const [notebookMeaning,setNotebookMeaning]=useState('');
      const [notebookStatus,setNotebookStatus]=useState('');
      const [notebookSaved,setNotebookSaved]=useState(null);
      const [checked,setChecked]=useState(false);
      const [saveStatus,setSaveStatus]=useState('');
      const writing=useWritingDraft({scope:review.scope,language:settings.targetLanguage,type:'activity',context:pilot.id+':'+settings.meaningLanguage,fields:{draft,meaning:notebookMeaning},empty:{draft:'',meaning:''},restore:value=>{setDraft(value.draft||'');setNotebookMeaning(value.meaning||'');setStep(4);setNotebookSaved(null);}});
      const steps=['Situation','Notice','Build','Choose','Use'];
      const persist=patch=>update(s=>({activities:{...s.activities,[recordKey]:{...s.activities?.[recordKey],...patch,updatedAt:new Date().toISOString()}}}));
      const move=n=>{setStep(n);persist({step:n});};
      const say=value=><ActivityText value={value} settings={settings}/>;
      const bank=useMemo(()=>shuffle(pilot.build.chunks.map((_,i)=>i)),[pilot.id]);
      const language=LANG[pilot.language];
      const saveToNotebook=()=>{
        try{
          let added=false;
          window.CatalystNotebook.commit(localStorage,review.scope,settings.targetLanguage,data=>{
            const result=window.CatalystNotebook.addFromActivity(data,{pilot,targetLanguage:settings.targetLanguage,
              id:crypto.randomUUID(),original:draft,meaning:notebookMeaning,meaningLanguage:settings.meaningLanguage,createdAt:new Date().toISOString()});
            added=result.added;return result.data;
          });
          writing.write({draft,meaning:notebookMeaning},false);
          setNotebookSaved({draft,meaning:notebookMeaning});
          setNotebookStatus(added?'Saved to My Learning → My sentence notebook on this device.':'This writing is already in your notebook. No duplicate was added.');
        }catch(e){setNotebookStatus('Could not save to the notebook. Your writing is still here; copy it before leaving and try again.');}
      };
      const saveDraft=()=>{
        if(persist({draft,step})&&writing.write({draft,meaning:notebookMeaning},false))setSaveStatus('Draft saved on this device.');
        else setSaveStatus('Could not save. Keep this page open and copy your draft before leaving.');
      };
      const finish=()=>{
        if(persist({draft,step:4,completed:true})&&writing.write({draft,meaning:notebookMeaning},false))setSaveStatus('Activity completed and draft saved. This is self-reviewed practice, not a mastery score.');
        else setSaveStatus('Could not save. Keep this page open and copy your draft before leaving.');
      };
      return <section className="study-panel activity-panel"><div className="flex items-start justify-between gap-3"><div><div className="eyebrow">{language.name} · GUIDED PILOT</div><h2 className="text-2xl font-bold mt-2">{api.text(pilot.title,settings.meaningLanguage)}</h2></div><button className="quiet-btn" onClick={()=>{if(((draft!==(saved.draft||'')&&draft!==notebookSaved?.draft)||(notebookMeaning&&notebookMeaning!==notebookSaved?.meaning))&&!window.confirm('Leave without saving your writing?'))return;onClose();}}>Close activity</button></div>
        <p className="text-xs text-amber-800 mt-3">Draft content · examples and Marathi guidance await native-speaker review.</p>
        <nav className="activity-steps" aria-label="Activity steps">{steps.map((name,i)=><button key={name} aria-current={step===i?'step':undefined} onClick={()=>move(i)}><span>{i+1}</span>{name}</button>)}</nav>
        <EnglishOption settings={settings} update={update}/>
        <div className="activity-body">
        {step===0&&<><h3 className="text-xl font-bold mb-3">01 / Situation</h3>{say(pilot.situation)}<div className="pattern-box"><p className={`text-2xl ${language.font}`} lang={pilot.language}>{pilot.example}</p><div className="mt-4">{say(pilot.meaning)}</div></div></>}
        {step===1&&<><h3 className="text-xl font-bold mb-3">02 / Notice</h3>{say(pilot.notice)}<details className="activity-detail"><summary>Compare with Marathi · optional</summary>{say(pilot.comparison)}</details>{pilot.deeper&&<details className="activity-detail"><summary>{api.text(pilot.deeperTitle,settings.meaningLanguage)||'Different pattern: verb-past + ところで'}</summary>{say(pilot.deeper)}</details>}</>}
        {step===2&&<><h3 className="text-xl font-bold mb-3">03 / Build</h3>{say(pilot.build.prompt)}<p className="text-sm text-slate-500 mt-3">Tap chunks in order. Tap a selected chunk to remove it.</p><div className="chunk-answer" aria-label="Your sentence">{!order.length&&<span className="text-slate-400">Your sentence appears here</span>}{order.map((id,i)=><button className={`chunk ${language.font}`} lang={pilot.language} key={id} aria-label={`Remove chunk ${i+1}: ${pilot.build.chunks[id]}`} onClick={()=>{setOrder(order.filter((_,n)=>n!==i));setBuildFeedback(null);}}>{pilot.build.chunks[id]}</button>)}</div><div className="chunk-bank" aria-label="Available chunks">{bank.map(id=><button key={id} className={`chunk ${language.font}`} lang={pilot.language} disabled={order.includes(id)} onClick={()=>{setOrder([...order,id]);setBuildFeedback(null);}}>{pilot.build.chunks[id]}</button>)}</div><div className="flex flex-wrap gap-2 mt-4"><button className="primary-btn" disabled={order.length!==pilot.build.chunks.length} onClick={()=>{const correct=api.validOrder(pilot.build,order);if(track('build',0,correct,api.assemble(pilot.build,order)))setBuildFeedback(correct?'correct':'retry');}}>Check order</button><button className="quiet-btn" onClick={()=>{setOrder([]);setBuildFeedback(null);}}>Clear</button><button className="quiet-btn" aria-expanded={hint} onClick={()=>{activityAssisted.current.add(activityTask(pilot,'build',0,settings.meaningLanguage).id);setHint(!hint);}}>Hint</button><button className="quiet-btn" onClick={()=>{if(track('build',0,null,null,true)){activityAssisted.current.add(activityTask(pilot,'build',0,settings.meaningLanguage).id);setOrder([...pilot.build.orders[0]]);setBuildFeedback('revealed');}}}>Reveal one answer</button></div>{hint&&<div className="feedback">{say(pilot.build.hint)}</div>}{buildFeedback&&<div className="feedback" role="status"><strong>{buildFeedback==='correct'?'✓ Accepted order':buildFeedback==='revealed'?'One accepted answer · revealed':'Try another order for this pattern'}</strong>{['correct','revealed'].includes(buildFeedback)&&<p className={language.font} lang={pilot.language}>{api.assemble(pilot.build,order)}</p>}{say(pilot.build.explanation)}</div>}</>}
        {step===3&&<><h3 className="text-xl font-bold mb-3">04 / Choose</h3>{pilot.choices.map((q,i)=><div className="activity-choice" key={i}>{say(q.prompt)}<div className="grid gap-2 mt-3">{q.options.map((option,j)=><button lang={pilot.language} className={`answer-btn ${answers[i]===j?(api.choiceCorrect(q,j)?'correct':'incorrect'):''}`} key={j} aria-pressed={answers[i]===j} onClick={()=>{if(track('choice',i,api.choiceCorrect(q,j),option)){setAnswers({...answers,[i]:j});setRevealed({...revealed,[i]:false});}}}>{option}</button>)}</div><button className="quiet-btn mt-3" onClick={()=>{if(!revealed[i]){activityAssisted.current.add(activityTask(pilot,'choice',i,settings.meaningLanguage).id);if(!track('choice',i,null,null,true))return;}setRevealed({...revealed,[i]:!revealed[i]});}} aria-expanded={!!revealed[i]}>Reveal answer and explanation</button>{(answers[i]!==undefined||revealed[i])&&<div className="feedback" role="status"><strong>{revealed[i]?`Accepted answer: ${q.accepted.map(a=>q.options[a]).join(' / ')}`:api.choiceCorrect(q,answers[i])?'✓ Fits this intention':'Try again · consider the stated intention'}</strong>{say(q.explanation)}</div>}</div>)}</>}
        {step===4&&<><h3 className="text-xl font-bold mb-3">05 / Use it yourself</h3>{say(pilot.use)}<label className="block mt-4 font-bold" htmlFor={`draft-${pilot.id}`}>Your {language.name} sentences</label><textarea id={`draft-${pilot.id}`} lang={pilot.language} className={`activity-draft ${language.font}`} rows={5} value={draft} maxLength={4000} disabled={review.scope==='loading'} onChange={e=>{writing.write({draft:e.target.value,meaning:notebookMeaning});setDraft(e.target.value);setChecked(false);setNotebookStatus('');setSaveStatus('Unsaved changes');}}/><div className="text-sm text-slate-500">{draft.length}/4000 · Saved locally only. No automatic grammar grading.</div>
          {writing.panel}
          <div className="notebook-transfer">
            <h4 className="font-bold">Keep this writing in your notebook</h4>
            <p className="mt-2">Save this attempt, then add correction notes later in My Learning. Saving does not grade or complete the activity.</p>
            <label className="block mt-3">What I meant ({LANG[settings.meaningLanguage]?.name||settings.meaningLanguage}, optional)
              <textarea className="search-input block w-full mt-2" lang={settings.meaningLanguage} rows={2} maxLength={5000} value={notebookMeaning} disabled={review.scope==='loading'} onChange={e=>{writing.write({draft,meaning:e.target.value});setNotebookMeaning(e.target.value);setNotebookStatus('');}}/>
            </label>
            <p className="mt-2">Destination: {language.name} · {review.scope==='loading'?'Checking account…':review.scope==='guest'?'Guest notebook':'Current account notebook'} · this device only.</p>
            <div className="notebook-actions mt-3"><button className="quiet-btn" disabled={review.scope==='loading'||!draft.trim()} onClick={saveToNotebook}>Save to notebook</button>
              {notebookSaved?.draft===draft&&notebookSaved?.meaning===notebookMeaning&&<button className="quiet-btn" onClick={()=>go('learning')}>Open notebook</button>}
            </div><p className="mt-3" role="status">{notebookStatus}</p>
          </div>
          <div className="feedback">{say(pilot.checklist)}</div><label className="flex gap-3 mt-4 items-start"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/><span>I reviewed my sentence using the checklist.</span></label><div className="flex gap-3 flex-wrap mt-4"><button className="quiet-btn" onClick={saveDraft}>Save draft</button><button className="primary-btn" disabled={!checked||!draft.trim()} onClick={finish}>Complete activity</button></div><p role="status" className="text-sm mt-3">{saveStatus}</p></>}
        </div><div className="flex justify-between gap-3 mt-6"><button className="quiet-btn" disabled={step===0} onClick={()=>move(step-1)}>← Previous step</button>{step<4&&<button className="primary-btn" onClick={()=>move(step+1)}>Next: {steps[step+1]} →</button>}</div>
        <details className="activity-detail"><summary>Content sources and review status</summary>{pilot.content?<><p className="mt-3">{LANG[pilot.content.language].name} · {pilot.content.script} script · Draft; awaiting native-speaker review.</p><h4 className="font-bold mt-3">Usage and context</h4>{say(pilot.content.register)}{say(pilot.content.sense)}<h4 className="font-bold mt-3">Where this activity comes from</h4>{say(pilot.content.provenance)}</>:<p>Japanese guidance is informed by the linked reference. Burmese sentences come from the existing lesson pack. Activities, translations and added examples are drafts, not native-speaker-approved material.</p>}{pilot.sources.map(source=><a className="block underline mt-2" key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</details>
      </section>;
    }

    function ContentCoverage({concepts,settings,source}) {
      const report=window.CatalystCoverage.summarize(concepts,settings.targetLanguage,settings.meaningLanguage,window.CatalystMeanings.translate,window.CatalystActivities.pilots);
      const gaps=report.lessons.filter(lesson=>lesson.missing.length);
      return <section className="study-panel" aria-labelledby="coverage-title">
        <div className="eyebrow">{LANG[settings.targetLanguage].name} · STUDY MATERIAL</div>
        <h2 id="coverage-title" className="text-2xl font-bold mt-2">Content coverage</h2>
        <p className="text-sm mt-2">{source==='Supabase'?'Showing online lessons. Offline study uses the lessons included in this app version.':'Showing lessons included in this app version.'} Guided activities are included in the app.</p>
        <dl className="coverage-grid">
          <div><dt>Lessons with examples</dt><dd>{report.availableLessons}</dd></div>
          <div><dt>Examples</dt><dd>{report.examples}</dd></div>
          <div><dt>{LANG[settings.meaningLanguage].name} meanings</dt><dd>{report.translated} / {report.examples}</dd></div>
          <div><dt>Guided activities</dt><dd>{report.guidedActivities}</dd></div>
        </dl>
        <p className="text-sm mt-3">Available material is not a complete course or a review of its accuracy. Examples and Marathi meanings await native-speaker review.</p>
        <details className="activity-detail"><summary>Translation gaps and review status</summary>
          <p className="mt-3">{report.examples===0?'No examples are available for this learning language.':gaps.length?`${report.examples-report.translated} ${report.examples-report.translated===1?'example':'examples'} in ${gaps.length} ${gaps.length===1?'lesson has':'lessons have'} no ${LANG[settings.meaningLanguage].name} meaning yet. Examples without meanings are skipped by meaning practice.`:`Every example has a ${LANG[settings.meaningLanguage].name} meaning available. This does not certify translation quality.`}</p>
          {report.unavailableLessons>0&&<p className="mt-3">{report.unavailableLessons} lessons have no examples for this learning language.</p>}
          {gaps.map(lesson=><button className="lesson-link" key={lesson.id} onClick={()=>go(lesson.id)}><span><strong>{quizLabel(lesson,settings.meaningLanguage)||lesson.title||lesson.id}</strong><small>{lesson.missing.length} of {lesson.examples} meanings unavailable</small></span><span aria-hidden="true">→</span></button>)}
          <p className="mt-3">{report.sourceCheckedLessons?`${report.sourceCheckedLessons} ${report.sourceCheckedLessons===1?'lesson is':'lessons are'} marked “checked” by the content source. Reviewer details and evidence are not available here.`:'No lessons are marked as checked in this content source.'} Guided activities and fixed sentence patterns are drafts. Your own “learned” marks are separate.</p>
        </details>
      </section>;
    }

    function Home({concepts,settings,update,screen,source}) {
      const [q,setQ]=useState('');
      const [onlyFalse,setOnlyFalse]=useState(false);
      const learned=concepts.filter(c=>settings.learned.includes(c.id)).length;
      const next=concepts.find(c=>c.id===settings.lastConcept && !settings.learned.includes(c.id))||concepts.find(c=>!settings.learned.includes(c.id))||concepts[0];
      const p=settings.practice||{},today=p.day===new Date().toLocaleDateString('en-CA')?p.today||0:0;
      const selected=window.CatalystPreferences.languages(settings);
      const risky=c=>Object.keys(c.pairNotes||{}).some(k=>k.split('-').every(l=>selected.includes(l))&&c.levels[k]!=='close');
      const list=concepts.filter(c=>(!onlyFalse||risky(c))&&[c.title,c.group,c.summary,...Object.values(c.entries).map(e=>e.form)].join(' ').toLowerCase().includes(q.toLowerCase()));
      return <div className="space-y-7">{screen==='today' && <><section className="hero"><div className="hero-copy"><span className="hero-kicker">SMALL LESSONS. BIG CONNECTIONS.</span><h1>Grammar that<br/><em>clicks.</em></h1><p>Use the languages you know to unlock the ones you’re learning.</p><button className="hero-button" disabled={!next} onClick={()=>next&&go(next.id)}>{learned===concepts.length && concepts.length?'Revisit a lesson':learned?'Continue learning':'Start your first lesson'} <span>↗</span></button>{next && <div className="hero-next">Up next · {next.title}</div>}</div><div className="grammar-art" aria-hidden="true"><div className="art-orbit"></div><div className="art-core">あ<span>↔</span>က</div><span className="art-tag tag-one">你好</span><span className="art-tag tag-two">नमस्कार</span><span className="art-spark">✦</span><span className="art-caption">Different words.<br/>Connected ideas.</span></div></section>
        <div className="stats-grid"><div><span>🌱 Marked learned</span><strong>{learned}<small> / {concepts.length}</small></strong><div className="progress-track"><div style={{width:`${concepts.length?learned/concepts.length*100:0}%`}}/></div></div><div><span>🎯 Today’s practice</span><strong>{today}<small> / 5 answers</small></strong><div className="progress-track"><div style={{width:`${Math.min(today/5*100,100)}%`}}/></div></div><div><span>✨ Practice accuracy</span><strong>{p.answers?Math.round(p.correct/p.answers*100)+'%':'—'}</strong><small>{p.answers||0} answers on this device</small></div></div>
        <section className="study-panel w-full"><h2 className="text-xl font-bold">A little practice today</h2><p className="text-slate-500 mt-2">Recall a meaning, recognise a form, or compare languages. Five questions, at your pace.</p><button className="primary-btn mt-4" onClick={()=>go('practice')}>Start practice →</button><button className="quiet-btn mt-4 ml-3" onClick={()=>go('explore')}>Explore lessons</button></section></>}
        {screen==='today'&&<ReviewQueue concepts={concepts} settings={settings} compact/>}
        {screen==='explore'&&<ContentCoverage concepts={concepts} settings={settings} source={source}/>}
        {['today','explore'].includes(screen)&&<ActivityLibrary settings={settings} update={update}/>}
        {screen==='practice' && <Practice concepts={concepts} settings={settings} update={update} onClose={()=>go(null)}/>}
        {screen==='learning' && <><SentenceNotebook key={`${settings.targetLanguage}-${settings.meaningLanguage}`} concepts={concepts} settings={settings}/><ReviewQueue concepts={concepts} settings={settings}/><VocabularyPanel settings={settings}/><MyLearning concepts={concepts} settings={settings}/></>}
        {screen==='explore' && <><div className="flex flex-wrap gap-3 items-center"><div className="flex-1 min-w-0"><h2 className="text-2xl font-bold text-slate-800">Your learning path</h2><p className="text-sm text-slate-500 mt-1">Explore in order, or follow your curiosity.</p></div><span className="text-sm text-slate-500">{concepts.length} bite-size lessons</span></div><div className="flex gap-2"><input aria-label="Search lessons" className="search-input flex-1 min-w-0" value={q} onChange={e=>setQ(e.target.value)} placeholder="Find a pattern: は, ကို, past…"/><button className={`language-pill ${onlyFalse?'selected':''}`} aria-pressed={onlyFalse} onClick={()=>setOnlyFalse(v=>!v)}>Tricky matches</button></div>
          <div className="course-grid">{[...new Set(list.map(c=>c.group))].map(g=>{const items=list.filter(c=>c.group===g);return <section className="course-card" key={g}><div className="flex items-center gap-3 mb-4"><div className="course-icon">{GROUP_ICON[g]||'📚'}</div><div><h3 className="font-bold text-lg">{g}</h3><p className="text-xs text-slate-500">{items.filter(c=>settings.learned.includes(c.id)).length} of {items.length} learned</p></div></div>{items.map(c=><button key={c.id} onClick={()=>go(c.id)} className="lesson-link"><span className={`lesson-number ${settings.learned.includes(c.id)?'done':''}`}>{settings.learned.includes(c.id)?'✓':concepts.indexOf(c)+1}</span><span className="flex-1"><strong>{c.title}</strong><small>{p.byConcept?.[c.id]?.attempts?`${p.byConcept[c.id].correct}/${p.byConcept[c.id].attempts} practice answers correct`:'Explore · recall · practise'}</small></span><span className="text-violet-400">↗</span></button>)}</section>})}</div>{!list.length&&<p className="study-panel text-center">No matching lessons. Try another word.</p>}</>}
        <p className="text-xs text-slate-500 text-center">A little every day goes a long way. Progress stays on this device.</p>
      </div>;
    }

    function NotebookImport({scope,language,disabled,onImported}) {
      const api=window.CatalystNotebook,sequence=React.useRef(0);
      const [pending,setPending]=useState(null),[message,setMessage]=useState(''),[reading,setReading]=useState(false);
      useUpdateGuard(!!pending||reading);
      useEffect(()=>()=>{sequence.current++;},[]);
      const cancel=()=>{sequence.current++;setPending(null);setReading(false);setMessage('Import cancelled. Your notebook was not changed.');};
      const choose=async e=>{
        const file=e.target.files?.[0];e.target.value='';
        if(!file)return;
        const request=++sequence.current;
        setPending(null);setMessage('');setReading(true);
        try{
          if(file.size>api.MAX_IMPORT_BYTES)throw new Error('Choose a notebook export smaller than 5 MB.');
          const raw=await file.text();
          if(request!==sequence.current)return;
          const backup=api.parseImport(raw,language),key=api.key(scope,language);
          const current=api.parse(localStorage.getItem(key)),preview=api.merge(current,backup);
          setPending({backup,key,name:file.name,before:JSON.stringify(current),...preview});
        }catch(error){if(request===sequence.current)setMessage(error.message+' Nothing was imported.');}
        finally{if(request===sequence.current)setReading(false);}
      };
      const restore=()=>{
        if(!pending||disabled||pending.key!==api.key(scope,language))return;
        try{
          let result;
          const data=api.commit(localStorage,scope,language,current=>{
            result=api.merge(current,pending.backup);
            if(JSON.stringify(current)!==pending.before){
              setPending({...pending,before:JSON.stringify(current),...result});
              throw new Error('Your notebook changed after the preview. Review the updated counts and confirm again.');
            }
            return result.data;
          });
          const s=result.summary;
          onImported(data,`Import complete: ${s.added} sentences added, ${s.notesAdded} correction notes added to saved sentences, ${s.unchanged} already present. Saved on this device.`);
          setPending(null);setMessage('Import complete. Existing writing was preserved.');
        }catch(error){setMessage(error.message+' The import has not been saved. You can retry.');}
      };
      return <details className="activity-detail notebook-import"><summary>Import / restore notebook</summary>
        <p className="mt-3">Choose a Catalyst JSON export to restore it into this {LANG[language].name} notebook. Existing writing stays; missing correction notes are added. Importing the same file again does not duplicate it.</p>
        <label className="block mt-3">Choose notebook export (JSON, up to 5 MB)
          <input className="block w-full mt-2" type="file" accept=".json,application/json" disabled={disabled||scope==='loading'||reading} onChange={choose}/>
        </label>
        {reading&&<p role="status" className="mt-3">Reading notebook export…</p>}
        {pending&&<div className="notebook-transfer">
          <h3 className="font-bold">Import preview</h3><p className="mt-2 break-words">{pending.name}</p>
          <p className="mt-2">Destination: {LANG[language].name} · {scope==='guest'?'Guest notebook':'Current study account notebook'} · this device only.</p>
          <ul className="list-disc pl-5 mt-3"><li>{pending.summary.added} new sentences (including {pending.summary.conflictCopies} separate copies of conflicting versions)</li><li>{pending.summary.notesAdded} missing correction notes across {pending.summary.updated} saved sentences</li><li>{pending.summary.unchanged} sentences already present</li></ul>
          {!!pending.summary.conflictCopies&&<p className="mt-3">Some saved IDs refer to different writing. Both versions will be kept as separate sentences.</p>}
          {!!pending.backup.entries.length&&<details className="mt-3"><summary>Preview first {Math.min(3,pending.backup.entries.length)} sentences</summary>{pending.backup.entries.slice(0,3).map(entry=><div className="mt-3" key={entry.id}><p className="whitespace-pre-wrap break-words" lang={language}>{entry.original}</p>{entry.meaning&&<p className="mt-2 whitespace-pre-wrap break-words" lang={entry.meaningLanguage}>{entry.meaning}</p>}<p className="mt-2">{entry.corrections.length} correction notes</p></div>)}</details>}
          {!pending.summary.added&&!pending.summary.updated&&<p className="mt-3">Nothing new to restore.</p>}
          <div className="notebook-actions mt-4"><button className="primary-btn" disabled={disabled||(!pending.summary.added&&!pending.summary.updated)} onClick={restore}>Import into this notebook</button><button className="quiet-btn" onClick={cancel}>Cancel import</button></div>
        </div>}
        {reading&&<button className="quiet-btn mt-3" onClick={cancel}>Cancel import</button>}
        <p role="status" className="mt-3">{message}</p>
      </details>;
    }

    function SentenceNotebook({concepts,settings}) {
      const {scope}=React.useContext(ReviewContext),api=window.CatalystNotebook;
      const [data,setData]=useState({version:1,entries:[]}),[error,setError]=useState(''),[status,setStatus]=useState('');
      const [original,setOriginal]=useState(''),[meaning,setMeaning]=useState(''),[lesson,setLesson]=useState('');
      const [corrections,setCorrections]=useState({});
      const draftFields={original,meaning,lesson,corrections};
      const writing=useWritingDraft({scope,language:settings.targetLanguage,type:'notebook',context:settings.meaningLanguage,fields:draftFields,empty:{original:'',meaning:'',lesson:'',corrections:{}},restore:value=>{setOriginal(value.original||'');setMeaning(value.meaning||'');setLesson(value.lesson||'');setCorrections(value.corrections||{});}});
      const edit=patch=>writing.write({...draftFields,...patch});
      const key=scope==='loading'?null:api.key(scope,settings.targetLanguage);
      const dirty=!!(original||meaning||Object.values(corrections).some(Boolean));
      useEffect(()=>{const warn=e=>{if(dirty){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn);},[dirty]);
      const read=()=>{if(!key)return;try{setData(api.parse(localStorage.getItem(key)));setError('');}catch(e){setError('Notebook could not be read. Existing records have not been overwritten.');}};
      useEffect(()=>{read();const sync=e=>{if(e.key===key)read();};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);},[key]);
      const commit=change=>{if(!key)return false;try{const next=api.commit(localStorage,scope,settings.targetLanguage,change);setData(next);setError('');setStatus('Saved on this device.');return true;}catch(e){setError('Could not save. Copy your writing before leaving and try again. Existing records are preserved.');return false;}};
      const [exportStatus,setExportStatus]=useState('');
      const exportNotes=()=>{try{
        const current=api.parse(localStorage.getItem(key));
        const name=downloadBackup({language:settings.targetLanguage,...current},'catalyst-notebook-'+settings.targetLanguage);
        setExportStatus('Download requested: '+name+'. Confirm this file is in Files or Downloads before continuing.');
      }catch(e){setExportStatus('Notebook export could not start. Your saved writing is retained. Retry Export notebook; if records cannot be read, use Study offline → Protect your saved work.');}};
      return <section className="study-panel w-full"><span className="eyebrow">WRITE · REFLECT · REVISIT</span><h2 className="study-title mt-2">My sentence notebook</h2><p className="mt-3">{LANG[settings.targetLanguage].name} · {scope==='guest'?'Guest notebook':'Account notebook'} · saved on this device only. Corrections are your notes, not automatic grading.</p>
        <label className="block mt-4">Lesson (optional)<select className="search-input block w-full mt-2" value={lesson} disabled={scope==='loading'} onChange={e=>{edit({lesson:e.target.value});setLesson(e.target.value);}}><option value="">Everyday writing</option>{concepts.map(c=><option key={c.id} value={c.id}>{quizLabel(c,settings.meaningLanguage)||c.id}</option>)}</select></label>
        <label className="block mt-4">My original sentence<textarea className="search-input block w-full mt-2" lang={settings.targetLanguage} rows="3" maxLength={5000} value={original} disabled={scope==='loading'} onChange={e=>{edit({original:e.target.value});setOriginal(e.target.value);}}/></label>
        <label className="block mt-4">What I meant ({LANG[settings.meaningLanguage]?.name||settings.meaningLanguage}, optional)<textarea className="search-input block w-full mt-2" lang={settings.meaningLanguage} rows="2" maxLength={5000} value={meaning} disabled={scope==='loading'} onChange={e=>{edit({meaning:e.target.value});setMeaning(e.target.value);}}/></label>
        <button className="primary-btn mt-4" disabled={!key||!original.trim()||!!error} onClick={()=>{if(commit(d=>api.add(d,{id:crypto.randomUUID(),original,meaning,meaningLanguage:settings.meaningLanguage,lesson,createdAt:new Date().toISOString()}))){edit({original:'',meaning:''});setOriginal('');setMeaning('');}}}>Save original sentence</button>
        {error&&<p role="alert" className="review-notice">{error} <button className="quiet-btn" onClick={read}>Retry loading</button></p>}<p role="status" className="text-sm mt-3">{dirty?'Writing is not yet in the notebook. Save each entry or keep the draft for later.':status}</p>
        {writing.panel}
        <div className="notebook-actions mt-6"><h3 className="font-bold">Saved sentences ({data.entries.length})</h3><button className="quiet-btn" disabled={!key||!data.entries.length||!!error} onClick={exportNotes}>Export notebook</button></div>
        <p role="status" className="text-sm mt-3 break-words">{exportStatus}</p>
        <NotebookImport scope={scope} language={settings.targetLanguage} disabled={!key||!!error} onImported={(next,message)=>{setData(next);setError('');setStatus(message);}}/>
        {!data.entries.length&&<p className="mt-3 text-slate-500">Write one sentence about your day. Your original stays here when you add a correction.</p>}
        {data.entries.map(entry=><details className="activity-detail" key={entry.id}><summary className="break-words" lang={settings.targetLanguage}>{entry.original}</summary><p className="text-xs text-slate-500 mt-3">{new Date(entry.createdAt).toLocaleString()} · {entry.corrections.length?'Has correction notes':'Not reviewed'}</p>
          {entry.activityId&&<p className="mt-3">{entry.activityId.startsWith('pattern-')?'From pattern practice: ':'From guided activity: '}{window.CatalystPatterns.pattern(entry.activityId)?.label[settings.meaningLanguage]||window.CatalystActivities.pilots.find(p=>p.id===entry.activityId&&p.language===settings.targetLanguage)?.title[settings.meaningLanguage]||entry.activityId}</p>}
          {window.CatalystPatterns.savedReading(entry)&&<><p className="text-sm mt-3">Approximate Devanagari reading</p><p lang="mr" className="dev-line mt-1">{window.CatalystPatterns.savedReading(entry)}</p></>}
          {entry.lesson&&concepts.some(c=>c.id===entry.lesson)&&<button className="quiet-btn mt-2" onClick={()=>go(entry.lesson)}>Revisit lesson →</button>}{entry.meaning&&<p className="mt-3 whitespace-pre-wrap" lang={entry.meaningLanguage}>{entry.meaning}</p>}<h4 className="font-bold mt-4">{entry.activityId?.startsWith('pattern-')?'Saved pattern sentence':'Original attempt'}</h4><p className="whitespace-pre-wrap break-words" lang={settings.targetLanguage}>{entry.original}</p>{entry.corrections.map((c,i)=><div key={i} className="pattern-box"><strong>Correction note {i+1} · user-entered</strong><p lang={settings.targetLanguage} className="whitespace-pre-wrap break-words mt-2">{c.text}</p></div>)}<label className="block mt-4">Add a correction or explanation<textarea className="search-input block w-full mt-2" rows="3" maxLength={5000} value={corrections[entry.id]||''} disabled={scope==='loading'} onChange={e=>{const next={...corrections,[entry.id]:e.target.value};edit({corrections:next});setCorrections(next);}}/></label><button className="quiet-btn mt-3" disabled={!key||!!error||!corrections[entry.id]?.trim()} onClick={()=>{if(commit(d=>api.correct(d,entry.id,corrections[entry.id],new Date().toISOString()))){const next={...corrections,[entry.id]:''};edit({corrections:next});setCorrections(next);}}}>Save correction separately</button></details>)}
      </section>;
    }

    function MyLearning({concepts,settings}) {
      const review=React.useContext(ReviewContext);
      const learningItems=[...concepts.map(c=>({id:c.id,title:quizLabel(c,settings.meaningLanguage)||c.id})),...window.CatalystActivities.pilots.filter(p=>p.language===settings.targetLanguage&&!p.concept).map(p=>({id:p.id,title:p.title[settings.meaningLanguage]}))];
      const history=concepts.filter(c=>settings.learned.includes(c.id)||settings.practice?.byConcept?.[c.id]?.attempts);
      return <section className="study-panel w-full"><span className="eyebrow">Your progress</span><h1 className="study-title mt-2">My Learning</h1><p className="mt-3">Learning states for {LANG[settings.targetLanguage].name}. These are your assessments; correctness and delayed recall are tracked separately.</p><div className="mt-4 space-y-3">{learningItems.map(item=><details className="activity-detail" key={item.id}><summary>{item.title} · {window.CatalystReview.states[review.data.states[item.id]]||'Not assigned'}</summary><LearningState id={item.id}/><SkillSummary data={review.data} conceptId={item.id}/><p className="text-sm mt-3">{({revision:'Recall the meaning, then review it after a delay.',misused:'Practise contextual choices in guided activities and connections.',writing:'Use sentence building, then write without the chunks.',unused:'Write your own sentence in a guided activity or the lesson’s Your words tab.'})[review.data.states[item.id]]||'Choose the state that best describes what you need to practise.'}</p></details>)}</div><h2 className="text-xl font-bold mt-8">Legacy history</h2><p className="text-slate-500 mt-3">Your practice and lessons marked learned across languages, saved on this device. Marking a lesson learned is your own assessment, not a mastery score.</p>
        {!history.length && <div className="pattern-box"><h2 className="text-lg font-bold">Your journey starts with one lesson.</h2><p className="mt-2">Study a pattern or answer a question, and it will appear here.</p><button className="primary-btn mt-4" onClick={()=>go('explore')}>Find a lesson →</button></div>}
        {history.map(c=>{const p=settings.practice?.byConcept?.[c.id];return <button className="lesson-link" key={c.id} onClick={()=>go(c.id)}><span className="lesson-number">{settings.learned.includes(c.id)?'✓':'↻'}</span><span><strong>{c.title}</strong><small>{settings.learned.includes(c.id)?'Marked learned · ':''}{p?.attempts?`${p.correct} of ${p.attempts} practice answers correct`:'No practice answers yet'}</small></span></button>})}
        <p className="text-sm text-slate-500 mt-5">Saved AI sentences remain in each lesson’s “Your words” tab. Sign in there to access them.</p>
      </section>;
    }

    function Account({ session }) {
      const identity=React.useContext(StudyAccountContext);
      const [email, setEmail] = useState('');
      const [pw, setPw] = useState('');
      const [err, setErr] = useState('');
      const [busy, setBusy] = useState(false);
      if (!sb) return null;
      if (identity.owner) return (
        <div className="flex items-center justify-between gap-2 py-2">
          <span className="text-sm text-slate-700 truncate">{identity.online?'Signed in as':'Offline study account:'} <b>{identity.owner.label}</b></span>
          <button onClick={() => accountApi.signOut()} className="text-sm text-slate-500 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">Sign out</button>
        </div>
      );
      const signIn = async (e) => {
        e.preventDefault(); setBusy(true); setErr('');
        const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password: pw });
        if (error) setErr(error.message);
        setBusy(false);
      };
      const google = () => sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.href.split('#')[0] } });
      return (
        <form onSubmit={signIn} className="space-y-2 py-2">
          {identity.message&&<p role="status">{identity.message}</p>}<button type="button" className="quiet-btn" onClick={()=>accountApi.verify()}>Retry sign-in check</button>{identity.scope==='loading'&&<button type="button" className="quiet-btn" onClick={()=>accountApi.signOut()}>Sign out on this device and use guest study</button>}
          <p className="text-xs text-slate-500">Same account as KG Chart. Needed for ✨ sentences from your words.</p>
          <button type="button" onClick={google} className="w-full py-2 rounded-xl border border-slate-300 text-sm font-medium">Sign in with Google</button>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
          {err && <p className="text-xs text-rose-700">{err}</p>}
          <button disabled={busy} className="w-full py-2 rounded-xl bg-slate-800 text-white text-sm font-semibold disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
      );
    }

    function SettingsSheet({ settings, update, onClose, source, session, concepts }) {
      const Row = ({ label, children }) => <div className="flex items-center justify-between gap-3 py-2.5"><span className="text-slate-700">{label}</span>{children}</div>;
      const Toggle = ({ on, set }) => (
        <button role="switch" aria-checked={on} onClick={() => set(!on)} className={`w-11 h-6 rounded-full relative transition ${on ? 'bg-sky-600' : 'bg-slate-300'}`}>
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition ${on ? 'left-[22px]' : 'left-0.5'}`}></span>
        </button>
      );
      const targets = window.CatalystPreferences.availableTargets(concepts);
      return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30" onClick={onClose}>
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 safe-bottom max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-xl">Settings</h3>
              <button aria-label="Close settings" onClick={onClose} className="text-slate-400 text-2xl leading-none px-2">×</button>
            </div>
            <p className="text-sm text-slate-500 mt-2">Choose what you learn separately from the languages that help you understand it.</p>
            <label className="preference-field">I’m learning<select value={settings.targetLanguage} onChange={e=>update({targetLanguage:e.target.value})}>{targets.map(l=><option key={l} value={l}>{LANG[l].name} · {LANG[l].native}</option>)}</select></label>
            <label className="preference-field">Grammar reference<select value={settings.anchor} onChange={e=>update({anchor:e.target.value})}><option value="none">None — study without a comparison</option>{ORDER.map(l=><option key={l} value={l}>{LANG[l].name} · {LANG[l].native}</option>)}</select></label>
            <p className="text-xs text-slate-500">A reference helps you compare structure. It does not change the meaning language.</p>
            <label className="preference-field">Meaning language<select value={settings.meaningLanguage} onChange={e=>update({meaningLanguage:e.target.value})}>{ANCHORS.map(l=><option value={l} key={l}>{LANG[l].name} · {LANG[l].native}</option>)}</select></label>
            <EnglishOption settings={settings} update={update}/>
            <label className="preference-field">Interface language<select value={settings.interfaceLanguage} onChange={e=>update({interfaceLanguage:e.target.value})}><option value="en">English — currently available</option></select></label>
            <p className="text-xs text-slate-500">Menus and grammar explanations are currently in English. Marathi sentence meanings are drafts. Other meaning languages will appear when translations are available.</p>
            <fieldset className="mt-4"><legend className="text-sm font-semibold">Additional comparisons (optional)</legend><p className="text-xs text-slate-500 my-2">These appear in lessons; quizzes focus on your learning language.</p>
              {ORDER.filter(l=>l!==settings.targetLanguage && l!==settings.anchor).map(l=><label key={l} className="flex items-center gap-3 py-2"><input type="checkbox" checked={settings.comparisonLanguages.includes(l)} onChange={e=>update(s=>({comparisonLanguages:e.target.checked?[...s.comparisonLanguages,l]:s.comparisonLanguages.filter(x=>x!==l)}))}/><LangTag lang={l}/></label>)}
            </fieldset>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-4">Show</div>
            <div className="divide-y divide-slate-100">
              <Row label={<span>Devanagari line <span className="dev-line">देवनागरी</span></span>}><Toggle on={settings.dev} set={(v) => update({ dev: v })} /></Row>
              <Row label="Reading (kana, pinyin)"><Toggle on={settings.reading} set={(v) => update({ reading: v })} /></Row>
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-4">Account</div>
            <Account session={session} />
            <p className="text-[11px] text-slate-400 mt-3">Content: {source}. {settings.learned.length} learned.</p>
          </div>
        </div>
      );
    }

    function App() {
      const [settings, update, settingsError, reloadSettings] = useSettings();
      const { concepts, source } = useContent();
      const conv = useConverters();
      const id = useRoute();
      const [sheet, setSheet] = useState(false),[offlinePanel,setOfflinePanel]=useState(false);
      const offline=useSyncExternalStore(window.CatalystOffline.subscribe,window.CatalystOffline.getSnapshot);
      useEffect(()=>window.CatalystOffline.init(),[]);
      const identity=useSyncExternalStore(accountApi.subscribe,accountApi.getSnapshot);
      useEffect(()=>{accountApi.start();return()=>accountApi.stop();},[]);
      const session=identity.session,scope=identity.scope;
      const concept = concepts.find(c => c.id === id);
      useEffect(()=>()=>window.CatalystAudio.stop(),[id,settings.targetLanguage]);
      const screen = ['explore','practice','learning'].includes(id) ? id : 'today';
      useEffect(() => { if (concept && settings.lastConcept !== concept.id) update({lastConcept:concept.id}); }, [concept?.id]);
      return (
        <StudyAccountContext.Provider value={identity}><VocabularyProvider key={`${scope}-${settings.targetLanguage}`} session={session} language={settings.targetLanguage}><ReviewProvider key={`${scope}-${settings.targetLanguage}`} scope={scope} language={settings.targetLanguage}><div className="min-h-screen">
          <header className="sticky top-0 z-40 bg-[#251c48] text-white">
            <div className="app-header max-w-6xl mx-auto px-4 py-3">
              <div className="app-header-brand">
              {concept
                ? <button onClick={() => go(null)} className="app-icon-button text-2xl leading-none" aria-label="Back">‹</button>
                : null}
              <button onClick={() => go(null)} className="app-brand text-left">
                <div className="font-body font-bold text-xl leading-tight">Catalyst</div>
                <div className="text-[11px] text-sky-200 truncate">
                  Learning {LANG[settings.targetLanguage].name} · {settings.anchor==='none'?'no reference':`reference ${LANG[settings.anchor].name}`}
                </div>
              </button>
              </div>
              <div className="app-header-actions">
              <span className="text-xs text-sky-200 tabular-nums">{settings.learned.filter(x => concepts.some(c => c.id === x)).length}/{concepts.length}</span>
              <button className="offline-launch" onClick={()=>setOfflinePanel(true)}>{window.CatalystOffline.ready()?'Ready offline':'Study offline'}</button>
              <button onClick={() => setSheet(true)} className="app-icon-button rounded-full bg-white/10" aria-label="Settings">⚙︎</button>
              </div>
            </div>
          </header>
          {(identity.message||!identity.online&&identity.owner)&&<div className="settings-error" role="status">{identity.owner&&!identity.online?`Offline study: ${identity.owner.label}. `:""}{identity.message} <button className="quiet-btn" onClick={()=>accountApi.verify()}>Check connection</button></div>}
          {settingsError&&<div className="settings-error" role="alert">{settingsError} <button className="quiet-btn" onClick={reloadSettings}>Retry settings</button></div>}
          <main id="main-content" className="max-w-6xl mx-auto px-4 py-6 app-content">
            {concept
              ? <ConceptPage key={`${concept.id}-${settings.targetLanguage}-${settings.meaningLanguage}-${settings.anchor}-${settings.comparisonLanguages.join('-')}`} concept={concept} concepts={concepts} settings={settings} update={update} conv={conv} session={session} openSettings={() => setSheet(true)} />
              : <Home key={`${screen}-${settings.targetLanguage}-${settings.meaningLanguage}-${settings.anchor}-${settings.comparisonLanguages.join('-')}`} concepts={concepts} settings={settings} update={update} screen={screen} source={source} />}
          </main>
          <nav className="app-navigation" aria-label="Main navigation">{[['today','Today','☀'],['explore','Explore','⌕'],['practice','Practice','✦'],['learning','My Learning','◷']].map(([key,label,icon])=><button key={key} aria-current={!concept && screen===key?'page':undefined} onClick={()=>go(key==='today'?null:key)}><span aria-hidden="true">{icon}</span>{label}</button>)}</nav>
          {offlinePanel&&<OfflinePanel key={scope} scope={scope} language={settings.targetLanguage} onClose={()=>setOfflinePanel(false)}/>}
          {offline.locked&&ReactDOM.createPortal(<div className="update-lock" role="status">Checking open Catalyst tabs before updating…</div>,document.body)}
          {sheet && <SettingsSheet settings={settings} update={update} onClose={() => setSheet(false)} source={source} session={session} concepts={concepts} />}
        </div></ReviewProvider></VocabularyProvider></StudyAccountContext.Provider>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
