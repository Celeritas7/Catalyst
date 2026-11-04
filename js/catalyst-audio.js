// Catalyst: audio player. Copied from KG Chart's js/kg-audio.js (same hash, manifest and voices).
// Clips come from tools/gen_catalyst_audio.py, in their own folder audio-grammar/<lang>/.
// Until a language has clips, it falls back to the phone's own text-to-speech voice, if it has one.
// Voice + mute are kept on this device only (no login in this app). Exposes window.CatalystAudio.
(function () {
  const BASE = 'https://ulgrfumbwjovbjzjiems.supabase.co/storage/v1/object/public/vocabulary-assets/audio-grammar';
  const PREFS_KEY = 'catalyst_audio_prefs';
  const SLOW_RATE = 0.7;

  const norm = (t) => (t || '').normalize('NFC').trim().split(/\s+/).filter(Boolean).join(' ');
  const enc = new TextEncoder();
  function hash(text) {
    let h = 0x811c9dc5;
    for (const b of enc.encode(norm(text))) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }

  const listeners = new Set();
  let version = 0;
  const emit = () => { version++; listeners.forEach(fn => fn()); };

  // ---- prefs: voice m/f + mute (account row, localStorage mirror for first paint) ----
  let prefs = { voice: 'f', muted: false };
  try { prefs = { ...prefs, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') }; } catch (e) {}
  let sb = null, userId = null;

  async function initPrefs(client, uid) {
    sb = client; userId = uid;
    if (!sb || !uid) return;
    const { data, error } = await sb.from('kg_chart_user_prefs').select('audio_voice, audio_muted').eq('user_id', uid).maybeSingle();
    if (error) { console.warn('CatalystAudio: prefs table not available, using this device only.', error.message); return; }
    if (data) setPrefsLocal({ voice: data.audio_voice === 'm' ? 'm' : 'f', muted: !!data.audio_muted });
  }
  function setPrefsLocal(p) {
    prefs = { ...prefs, ...p };
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) {}
    emit();
  }
  async function setPrefs(p) {
    setPrefsLocal(p);
    if (!sb || !userId) return;
    const { error } = await sb.from('kg_chart_user_prefs').upsert({
      user_id: userId, audio_voice: prefs.voice, audio_muted: prefs.muted, updated_at: new Date().toISOString(),
    });
    if (error) console.warn('CatalystAudio: could not save prefs to account.', error.message);
  }

  // ---- manifests: audio/<lang>/clips.json -> { m: [hash], f: [hash] } ----
  const manifests = {};   // lang -> { m:Set, f:Set } | null (no audio) | 'loading'
  function loadManifest(lang) {
    if (!lang || manifests[lang] !== undefined) return;
    manifests[lang] = 'loading';
    fetch(`${BASE}/${lang}/clips.json`, { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : null))
      .then(j => { manifests[lang] = j ? { m: new Set(j.m || []), f: new Set(j.f || []) } : null; emit(); })
      .catch(() => { manifests[lang] = null; emit(); });
  }

  // Which clip to play: the asked-for voice (conversations: A and B), else the preferred voice, else the other one, else none.
  function resolve(text, lang, voice) {
    const m = manifests[lang];
    if (!m || m === 'loading' || !norm(text)) return null;
    const h = hash(text);
    const first = voice === 'm' || voice === 'f' ? voice : prefs.voice;
    const order = first === 'm' ? ['m', 'f'] : ['f', 'm'];
    const g = order.find(v => m[v].has(h));
    return g ? `${BASE}/${lang}/${g}/${h}.mp3` : null;
  }
  // 'loading' while the manifest is on its way, true/false after
  function has(text, lang) {
    const m = manifests[lang];
    if (m === undefined || m === 'loading') return 'loading';
    return !!resolve(text, lang);
  }

  // ---- playback: one shared <audio>, so a new tap stops the previous clip ----
  const audio = new Audio();
  audio.preload = 'auto';
  let current = null;     // { key, state: 'loading' | 'playing' }
  const keyOf = (text, lang, slow) => `${lang}|${norm(text)}|${slow ? 's' : 'n'}`;
  const setCurrent = (c) => { current = c; emit(); };
  audio.addEventListener('playing', () => { if (current) setCurrent({ ...current, state: 'playing' }); });
  audio.addEventListener('ended', () => setCurrent(null));
  audio.addEventListener('pause', () => { if (current && current.state === 'playing') setCurrent(null); });
  audio.addEventListener('error', () => { if (current) { setCurrent(null); toast("Couldn't play this clip"); } });

  function play(text, lang, opts) {
    const slow = !!(opts && opts.slow);
    const url = resolve(text, lang, opts && opts.voice);
    if (!url) {
      if (speakTTS(text, lang, slow)) return true;
      if (!(opts && opts.silent)) toast('No audio for this yet'); return false;
    }
    const key = keyOf(text, lang, slow);
    if (current && current.key === key) { stop(); return true; }
    audio.pause();
    setCurrent({ key, state: 'loading' });
    if (audio.src !== url) audio.src = url;
    audio.currentTime = 0;
    audio.playbackRate = slow ? SLOW_RATE : 1;
    audio.defaultPlaybackRate = audio.playbackRate;
    if ('preservesPitch' in audio) audio.preservesPitch = true;
    const p = audio.play();
    if (p && p.catch) p.catch(err => { if (err && err.name !== 'AbortError') { setCurrent(null); toast("Couldn't play audio"); } });
    return true;
  }
  // ---- fallback: the device's own voice (Japanese, Chinese and Marathi usually have one; Burmese rarely) ----
  const TTS_LANG = { ja: 'ja-JP', my: 'my-MM', zh: 'zh-CN', mr: 'mr-IN', en: 'en-US' };
  const ttsVoice = (lang) => {
    if (typeof speechSynthesis === 'undefined') return null;
    const want = (TTS_LANG[lang] || '').toLowerCase();
    return speechSynthesis.getVoices().find(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(want.slice(0, 2)) &&
      (v.lang.replace('_', '-').toLowerCase() === want || want.length === 2)) || null;
  };
  function speakTTS(text, lang, slow) {
    const v = ttsVoice(lang);
    if (!v) return false;
    audio.pause();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(norm(text));
    u.voice = v; u.lang = v.lang; u.rate = slow ? 0.6 : 0.85;
    const key = keyOf(text, lang, slow);
    u.onend = u.onerror = () => { if (current && current.key === key) setCurrent(null); };
    setCurrent({ key, state: 'playing' });
    speechSynthesis.speak(u);
    return true;
  }
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.onvoiceschanged = () => emit();
  // 'clip' (recorded), 'tts' (device voice), 'loading', or null (nothing to play)
  function source(text, lang) {
    const m = manifests[lang];
    if (m === undefined || m === 'loading') return 'loading';
    if (resolve(text, lang)) return 'clip';
    return ttsVoice(lang) ? 'tts' : null;
  }

  // Used after answering: respects mute, never shows a toast
  function autoPlay(text, lang, voice) { if (!prefs.muted) play(text, lang, { silent: true, voice }); }
  function stop() { audio.pause(); if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); setCurrent(null); }
  function stateOf(text, lang, slow) { return current && current.key === keyOf(text, lang, slow) ? current.state : null; }

  // ---- tiny toast ----
  let toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#1f2937;color:#fff;padding:10px 18px;border-radius:999px;font:500 14px "DM Sans",sans-serif;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.25);transition:opacity .2s;pointer-events:none';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.style.opacity = '0'; }, 1800);
  }

  window.CatalystAudio = {
    hash, norm, loadManifest, has, source, play, autoPlay, stop, stateOf, initPrefs, setPrefs, toast,
    get prefs() { return prefs; },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    getVersion() { return version; },
  };
})();
