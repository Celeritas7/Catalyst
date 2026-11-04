// Catalyst: Devanagari lines for every example.
// Burmese and Chinese use the same converters as KG Chart (celeritas7.github.io/language-utils).
// Japanese has no converter there, so this file turns the kana reading into Devanagari.
// Works in the browser (window.CatalystScripts) and in Node (module.exports) for tools/build_data.mjs.
(function (root) {
  const LANG_UTILS_BASE = 'https://celeritas7.github.io/language-utils';
  const FILES = { my: 'burmese', zh: 'chinese' };

  // ---- Japanese kana → Devanagari ----
  // Reading is kana as pronounced (は → わ). Katakana is treated as hiragana.
  const KANA = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko','が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to','だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo','や':'ya','ゆ':'yu','よ':'yo',
    'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro','わ':'wa','を':'o','ん':'N','っ':'Q','ー':'L',
    'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o',
  };
  const YOON = { 'ゃ':'a','ゅ':'u','ょ':'o' };
  const CONS = {
    k:'क', g:'ग', s:'स', sh:'श', z:'ज़', j:'ज', t:'त', ch:'च', ts:'त्स', d:'द', n:'न', h:'ह', f:'फ',
    b:'ब', p:'प', m:'म', y:'य', r:'र', w:'व',
  };
  const VSIGN = { a:'ा', i:'ि', u:'ु', e:'े', o:'ो' };
  const VFULL = { a:'आ', i:'इ', u:'उ', e:'ए', o:'ओ' };
  const LONG = { 'ि':'ी', 'ु':'ू', 'इ':'ई', 'उ':'ऊ' };

  const toHira = (s) => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));

  // kana → list of { c: consonant romaji, v: vowel } plus N (ん), Q (っ), L (ー), or other characters
  function syllables(kana) {
    const out = [];
    const s = toHira(kana);
    for (let i = 0; i < s.length; i++) {
      const ch = s[i], r = KANA[ch];
      if (r === undefined) { out.push({ raw: ch }); continue; }
      if (r === 'N' || r === 'Q' || r === 'L') { out.push({ mark: r }); continue; }
      const m = r.match(/^([^aiueo]*)([aiueo])$/);
      let c = m[1], v = m[2];
      const next = s[i + 1];
      if (YOON[next]) {                       // きゃ → kya, しゃ → sha, ちゃ → cha, じゃ → ja
        v = YOON[next]; i++;
        c = (c === 'sh' || c === 'ch' || c === 'j') ? c : c + 'y';
      }
      out.push({ c, v });
    }
    return out;
  }
  function consDev(c) {
    if (!c) return '';
    if (CONS[c]) return CONS[c];
    if (c.endsWith('y') && CONS[c.slice(0, -1)]) return CONS[c.slice(0, -1)] + '्य';
    return c;
  }
  function kanaToDev(kana) {
    if (!kana) return '';
    const syl = syllables(kana);
    let out = '', prevV = '';
    for (let i = 0; i < syl.length; i++) {
      const x = syl[i];
      if (x.raw !== undefined) { out += x.raw === '、' ? ',' : x.raw === '。' ? '।' : x.raw; prevV = ''; continue; }
      if (x.mark === 'N') { out += 'ं'; prevV = ''; continue; }
      if (x.mark === 'Q') {                   // small っ doubles the next consonant: いった → इत्ता
        const n = syl[i + 1];
        if (n && n.c) out += consDev(n.c)[0] + '्';
        continue;
      }
      if (x.mark === 'L') {                   // ー lengthens i / u; a, e, o look the same long or short
        const last = out.slice(-1);
        if (LONG[last]) out = out.slice(0, -1) + LONG[last];
        continue;
      }
      // おう, よう, こう…: the う only lengthens the o
      if (!x.c && x.v === 'u' && prevV === 'o') continue;
      out += x.c ? consDev(x.c) + VSIGN[x.v] : VFULL[x.v];
      prevV = x.v;
    }
    return out;
  }

  // ---- language-utils converters (same loading as KG Chart) ----
  const converters = {};
  function compile(code) {
    code = code.replace(/export\s+function\s+/g, 'function ')
      .replace(/export\s+\{[^}]*\};?/g, '')
      .replace(/export\s+const\s+/g, 'const ');
    const mod = new Function(`${code}\nreturn { toDev: typeof toDev === 'function' ? toDev : null, sandhi: typeof sandhi === 'function' ? sandhi : null };`)();
    if (mod.sandhi) sandhiFns.my = mod.sandhi;
    return mod.toDev;
  }
  const sandhiFns = {};
  async function loadConverter(lang, fetchText) {
    if (converters[lang]) return converters[lang];
    const file = FILES[lang];
    if (!file) return null;
    try {
      const code = fetchText ? await fetchText(file) : await fetch(`${LANG_UTILS_BASE}/${file}.js`).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); });
      converters[lang] = compile(code);
      return converters[lang];
    } catch (e) {
      if (typeof console !== 'undefined') console.warn(`Catalyst: ${file}.js not loaded (${e.message}); using the saved Devanagari.`);
      return null;
    }
  }
  const loadAll = (fetchText) => Promise.all(Object.keys(FILES).map(l => loadConverter(l, fetchText)));

  // Devanagari for one example: the override, else the live converter, else the saved line
  function devanagari(ex, lang) {
    if (ex.devOverride) return ex.devOverride;
    try {
      if (lang === 'ja') return kanaToDev(ex.r) || ex.dev || '';
      if (lang === 'zh' && converters.zh) return converters.zh(ex.r || '') || ex.dev || '';
      if (lang === 'my' && converters.my) return converters.my(ex.t || '') || ex.dev || '';
    } catch (e) { /* fall through */ }
    return ex.dev || '';
  }

  // ---- Sound changes: what is said when it differs from what is written ----
  // One result shape for every language:
  //   { say, sayDev, ch: [{ w, from, to, rule }] }   or null when nothing changes.
  //   say    = spoken reading (pinyin for Chinese, voiced spelling for Burmese); sayDev = its Devanagari
  //   ch     = each change: w = the written word/syllable, from → to, rule = id in data/sounds.yaml
  // Chinese (3rd tone, 不, 一) and Burmese (voicing) are worked out here by rule.
  // Japanese and the creaky-tone possessive in Burmese are written by hand in the YAML (sd: on the example).

  // Chinese
  const TONED = {
    'ā':['a',1],'á':['a',2],'ǎ':['a',3],'à':['a',4], 'ē':['e',1],'é':['e',2],'ě':['e',3],'è':['e',4],
    'ī':['i',1],'í':['i',2],'ǐ':['i',3],'ì':['i',4], 'ō':['o',1],'ó':['o',2],'ǒ':['o',3],'ò':['o',4],
    'ū':['u',1],'ú':['u',2],'ǔ':['u',3],'ù':['u',4], 'ǖ':['ü',1],'ǘ':['ü',2],'ǚ':['ü',3],'ǜ':['ü',4],
  };
  const MARK = {};
  for (const [k, [b, t]] of Object.entries(TONED)) (MARK[b] = MARK[b] || {})[t] = k;
  const PY_INI = ['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s','y','w',''];
  const PY_FIN = ['iang','iong','uang','ueng','ang','eng','ing','ong','ian','iao','uai','uan','üan','van','ai','ao','an','ei','en','er','ia','ie','in','iu','ou','ua','uo','ui','un','ün','üe','ue','a','e','i','o','u','ü','v']
    .sort((a, b) => b.length - a.length);
  const isPyLetter = (ch) => /[a-zü]/i.test(ch) || !!TONED[ch.toLowerCase()];
  const baseOf = (ch) => { const l = ch.toLowerCase(); return TONED[l] ? TONED[l][0] : l; };

  // one pinyin word (letters only) → syllable lengths, longest-first with backtracking
  function pySplit(base) {
    const go = (i) => {
      if (i === base.length) return [];
      for (const ini of PY_INI) {
        if (!base.startsWith(ini, i)) continue;
        for (const fin of PY_FIN) {
          if (!base.startsWith(fin, i + ini.length)) continue;
          const len = ini.length + fin.length;
          if (!len) continue;
          const rest = go(i + len);
          if (rest) return [len, ...rest];
        }
      }
      return null;
    };
    return go(0);
  }
  // pinyin text → tokens: { syl: true, text, tone } or { text } for spaces / punctuation
  function pyTokens(r) {
    const out = [];
    const re = /([a-zA-ZüÜÀ-ǜ]+)|([^a-zA-ZüÜÀ-ǜ]+)/g;
    let m;
    while ((m = re.exec(r))) {
      if (m[2]) { out.push({ text: m[2], brk: /[^\s']/.test(m[2]) }); continue; }
      const word = m[1];
      const base = [...word].map(baseOf).join('');
      const lens = pySplit(base);
      if (!lens) { out.push({ text: word, syl: true, tone: toneOf(word), odd: true }); continue; }
      let at = 0;
      for (const n of lens) { const s = word.slice(at, at + n); out.push({ text: s, syl: true, tone: toneOf(s) }); at += n; }
    }
    return out;
  }
  function toneOf(s) { for (const ch of s) { const x = TONED[ch.toLowerCase()]; if (x) return x[1]; } return 0; }
  function setTone(s, tone) {
    return [...s].map(ch => {
      const x = TONED[ch.toLowerCase()];
      if (!x) return ch;
      const n = MARK[x[0]][tone];
      return ch === ch.toLowerCase() ? n : n.toUpperCase();
    }).join('');
  }
  const YI_KEEP_NEXT = '一二三四五六七八九十零百千万月号';

  function zhSounds(t, r) {
    if (!t || !r) return null;
    const toks = pyTokens(r);
    const syl = toks.filter(x => x.syl);
    if (syl.some(x => x.odd)) return null;                    // pinyin we can't split: say nothing rather than guess
    const han = [...t].filter(ch => /\p{Script=Han}/u.test(ch));
    const aligned = han.length === syl.length;
    const ch = [];
    const tone = syl.map(x => x.tone);
    // 不 and 一 (only when every character lines up with a syllable)
    if (aligned) {
      syl.forEach((x, i) => {
        const nx = tone[i + 1], last = i === syl.length - 1 || toks[toks.indexOf(x) + 1]?.brk;
        if (han[i] === '不' && baseOf(x.text[0]) === 'b' && x.tone) {
          const want = nx === 4 ? 2 : 4;
          tone[i] = want;
          if (want !== 4) ch.push({ i, w: '不', from: setTone(x.text, 4), to: setTone(x.text, want), rule: 'zh_bu' });
        }
        if (han[i] === '一' && x.tone && !last && han[i - 1] !== '第' && han[i - 1] !== '十' && !YI_KEEP_NEXT.includes(han[i + 1] || '')) {
          if (!nx) return;                                     // next syllable neutral: leave as written
          const want = nx === 4 ? 2 : 4;
          tone[i] = want;
          ch.push({ i, w: '一', from: setTone(x.text, 1), to: setTone(x.text, want), rule: 'zh_yi' });
        }
      });
    }
    // two 3rd tones in a row (inside one phrase): the first becomes 2nd
    // Inside a word always; across a space only when the first word is one syllable (我很好 → wó hén hǎo,
    // but 所以我 → suóyǐ wǒ). A rule of thumb: real speech groups words by rhythm.
    const word = []; let wn = 0;
    for (const tok of toks) { if (tok.syl) word[syl.indexOf(tok)] = wn; else wn++; }
    const wordLen = (k) => word.filter(x => x === k).length;
    let prev = -1;
    for (const tok of toks) {
      if (!tok.syl) { if (tok.brk) prev = -1; continue; }
      const i = syl.indexOf(tok);
      if (prev >= 0 && tone[prev] === 3 && tone[i] === 3 && (word[prev] === word[i] || wordLen(word[prev]) === 1)) {
        tone[prev] = 2;
        ch.push({ i: prev, w: aligned ? han[prev] : syl[prev].text, from: syl[prev].text, to: setTone(syl[prev].text, 2), rule: 'zh_t3' });
      }
      prev = i;
    }
    const say = toks.map(x => (x.syl ? setTone(x.text, tone[syl.indexOf(x)] || x.tone) : x.text)).join('');
    if (say === r && !ch.length) return null;
    ch.sort((a, b) => a.i - b.i).forEach(c => delete c.i);
    return { say, sayDev: converters.zh ? converters.zh(say) : '', ch };
  }

  // Burmese: voicing sandhi from language-utils (sandhi()), minus words it gets wrong
  const MY_NO_SANDHI = ['ကျွန်တော်', 'ကျွန်တော့်', 'ဂျပန်', 'ကော်ဖီ']; // ကျွန်တော် is reduced in speech, not voiced; the others are loanwords
  function mySylls(w) {                                      // same split as language-utils (keeps န့် together)
    const out = []; let cur = '';
    const isCons = (c) => { const n = c.charCodeAt(0); return (n >= 0x1000 && n <= 0x1021) || n === 0x103F; };
    for (let i = 0; i < w.length; i++) {
      const c = w[i];
      if (isCons(c) && cur) {
        let j = i + 1; while (w[j] === '့') j++;
        if (w[j] !== '်' && w[j] !== '္' && !cur.endsWith('္')) { out.push(cur); cur = c; continue; }
      }
      cur += c;
    }
    if (cur) out.push(cur);
    return out;
  }
  function mySounds(t) {
    if (!t || !sandhiFns.my) return null;
    const text = t.normalize('NFC');
    let say = sandhiFns.my(text);
    if (say.length !== text.length) return null;
    for (const w of MY_NO_SANDHI) {                          // put protected words back as written
      let i = -1;
      while ((i = text.indexOf(w, i + 1)) !== -1) say = say.slice(0, i) + w + say.slice(i + w.length);
    }
    if (say === text) return null;
    const a = mySylls(text), b = mySylls(say);
    if (a.length !== b.length) return null;
    const dev = converters.my || ((s) => s);
    const ch = [];
    const clean = (x) => x.replace(/[\s။၊]+/g, '');
    a.forEach((s, i) => {
      if (s === b[i]) return;
      const w = clean(s), v = clean(b[i]);
      ch.push({ w, sayW: v, from: dev(w), to: dev(v), rule: 'my_voice' });
    });
    return { say, sayDev: dev(say), ch };
  }

  // Everything for one example. Saved results (built in, or from Supabase) win; else work them out now.
  // Hand-written changes (ex.sdHand, from sd: in the YAML) are always added.
  function sounds(ex, lang) {
    if (!ex) return null;
    if (ex.sd !== undefined) return ex.sd;                   // saved: an object, or null for "nothing changes"
    let s = null;
    if (ex.say === false) s = null;
    else if (lang === 'zh') s = zhSounds(ex.t, ex.r);
    else if (lang === 'my') s = mySounds(ex.t);
    const hand = ex.sdHand || [];
    if (!hand.length) return s;
    return { say: s?.say || '', sayDev: s?.sayDev || '', ch: [...(s?.ch || []), ...hand] };
  }

  const api = { kanaToDev, loadConverter, loadAll, devanagari, converters, LANG_UTILS_BASE, FILES, sounds, zhSounds, mySounds, sandhiFns };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CatalystScripts = api;
})(typeof window !== 'undefined' ? window : globalThis);
