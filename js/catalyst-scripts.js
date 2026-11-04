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
    const mod = new Function(`${code}\nreturn { toDev: typeof toDev === 'function' ? toDev : null };`)();
    return mod.toDev;
  }
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

  const api = { kanaToDev, loadConverter, loadAll, devanagari, converters, LANG_UTILS_BASE, FILES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CatalystScripts = api;
})(typeof window !== 'undefined' ? window : globalThis);
