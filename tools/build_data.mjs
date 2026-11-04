// Catalyst: build the app data from data/grammar.yaml.
//   node tools/build_data.mjs                  (converters fetched from celeritas7.github.io/language-utils)
//   node tools/build_data.mjs --lu ../language-utils   (use a local clone instead)
// Writes js/catalyst-data.js (the app's built-in copy) and sql/catalyst-seed.sql (paste into the Supabase SQL editor).
// Stops with a list of problems if the content breaks a rule (missing pair level, highlight not in the text…).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');
const GC = require('../js/catalyst-scripts.js');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const luDir = args.includes('--lu') ? path.resolve(args[args.indexOf('--lu') + 1]) : null;

export const LANGS = ['ja', 'my', 'zh', 'mr', 'en'];
const STUDY = ['ja', 'my', 'zh'];
const LEVELS = ['close', 'partial', 'none'];
const pairKey = (a, b) => {
  const [x, y] = [a, b].sort((p, q) => LANGS.indexOf(p) - LANGS.indexOf(q));
  return `${x}-${y}`;
};
const ALL_PAIRS = [];
for (let i = 0; i < LANGS.length; i++) for (let j = i + 1; j < LANGS.length; j++) ALL_PAIRS.push(`${LANGS[i]}-${LANGS[j]}`);

const src = yaml.load(fs.readFileSync(path.join(ROOT, 'data/grammar.yaml'), 'utf8'));
const soundSrc = yaml.load(fs.readFileSync(path.join(ROOT, 'data/sounds.yaml'), 'utf8')) || [];
const sarcasmSrc = yaml.load(fs.readFileSync(path.join(ROOT, 'data/sarcasm.yaml'), 'utf8')) || [];
const RULES = new Set(soundSrc.map(r => r.id));
const problems = [];
const ids = new Set();

await GC.loadAll(luDir ? async (file) => fs.readFileSync(path.join(luDir, `${file}.js`), 'utf8') : undefined);
for (const l of Object.keys(GC.FILES)) if (!GC.converters[l]) problems.push(`converter for ${l} did not load`);

const concepts = src.map((c, ci) => {
  const where = c.id || `concept #${ci + 1}`;
  if (!c.id || !/^[a-z0-9_]+$/.test(c.id)) problems.push(`${where}: id must be lower_case_with_underscores`);
  if (ids.has(c.id)) problems.push(`${where}: duplicate id`);
  ids.add(c.id);
  for (const f of ['group', 'title', 'summary']) if (!c[f]) problems.push(`${where}: missing ${f}`);

  // every pair needs a level, written in the standard order (ja-my, not my-ja)
  const levels = {};
  for (const [k, v] of Object.entries(c.levels || {})) {
    const [a, b] = k.split('-');
    const std = pairKey(a, b);
    if (!LANGS.includes(a) || !LANGS.includes(b)) { problems.push(`${where}: unknown pair ${k}`); continue; }
    if (!LEVELS.includes(v)) problems.push(`${where}: ${k} level "${v}" is not close / partial / none`);
    levels[std] = v;
  }
  for (const p of ALL_PAIRS) if (!levels[p]) problems.push(`${where}: no level for ${p}`);
  const pairNotes = {};
  for (const [k, v] of Object.entries(c.pair_notes || {})) { const [a, b] = k.split('-'); pairNotes[pairKey(a, b)] = v; }

  const entries = {};
  for (const lang of LANGS) {
    const e = c[lang];
    if (!e) { problems.push(`${where}: no ${lang} entry`); continue; }
    if (!e.form) problems.push(`${where}/${lang}: missing form`);
    if (!e.note) problems.push(`${where}/${lang}: missing note`);
    const ex = (e.ex || []).map((x, xi) => {
      const at = `${where}/${lang} example ${xi + 1}`;
      if (!x.t) problems.push(`${at}: no text`);
      if (lang !== 'en' && !x.e) problems.push(`${at}: no English`);
      if ((lang === 'ja' || lang === 'zh') && !x.r) problems.push(`${at}: no reading`);
      if (lang === 'ja' && x.r && /[一-鿿]/.test(x.r)) problems.push(`${at}: reading has kanji`);
      const h = x.h == null ? [] : Array.isArray(x.h) ? x.h : [x.h];
      for (const part of h) if (!(x.t || '').includes(part)) problems.push(`${at}: highlight "${part}" is not in the text`);
      const out = { t: x.t, e: x.e || '', h };
      if (x.r) out.r = x.r;
      if (x.dev) out.devOverride = x.dev;
      if (STUDY.includes(lang)) {
        out.dev = GC.devanagari(out, lang);
        if (!out.dev) problems.push(`${at}: no Devanagari`);
        // sound changes: worked out (Chinese, Burmese) + written by hand (sd: in the YAML)
        if (x.say === false) out.say = false;
        const hand = x.sd == null ? [] : Array.isArray(x.sd) ? x.sd : [x.sd];
        for (const c of hand) {
          if (!RULES.has(c.rule)) problems.push(`${at}: sound rule "${c.rule}" is not in data/sounds.yaml`);
          if (!c.w || !(x.t || '').includes(c.w)) problems.push(`${at}: sound change word "${c.w}" is not in the text`);
          if (!c.from || !c.to) problems.push(`${at}: sound change needs from and to`);
        }
        out.sdHand = hand.map(c => ({ w: c.w, from: c.from, to: c.to, rule: c.rule }));
        out.sd = GC.sounds(out, lang);
        delete out.sdHand;
      }
      return out;
    });
    if (lang !== 'en' && ex.length < 2) problems.push(`${where}/${lang}: needs at least 2 examples`);
    if (lang === 'en' && ex.length < 1) problems.push(`${where}/${lang}: needs an example`);
    entries[lang] = { form: e.form, note: e.note, none: !!e.none, checked: e.checked === true, ex };
  }
  return { id: c.id, sort: ci + 1, group: c.group, title: c.title, summary: c.summary, levels, pairNotes, entries };
});

// ---- sound-change rules (data/sounds.yaml) ----
const SOUND_LANGS = ['ja', 'my', 'zh', 'mr'];
const sounds = soundSrc.map((r, ri) => {
  const where = `sounds.yaml: ${r.id || `rule #${ri + 1}`}`;
  if (!r.id || !/^[a-z0-9_]+$/.test(r.id)) problems.push(`${where}: id must be lower_case_with_underscores`);
  if (!SOUND_LANGS.includes(r.lang)) problems.push(`${where}: lang must be one of ${SOUND_LANGS.join(', ')}`);
  for (const f of ['title', 'short', 'how']) if (!r[f]) problems.push(`${where}: missing ${f}`);
  const ex = (r.ex || []).map((x, xi) => {
    const at = `${where} example ${xi + 1}`;
    if (!x.t) problems.push(`${at}: no text`);
    const out = { t: x.t, e: x.e || '' };
    if (x.r) out.r = x.r;
    if (r.auto) {
      if (r.lang === 'zh' && !x.r) problems.push(`${at}: no pinyin`);
      out.dev = GC.devanagari(out, r.lang);
      out.sd = r.lang === 'zh' ? GC.zhSounds(x.t, x.r) : GC.mySounds(x.t);
    } else {
      if (!x.from || !x.to) problems.push(`${at}: needs from and to`);
      out.dev = r.lang === 'ja' ? GC.kanaToDev(x.to) : r.lang === 'my' ? GC.devanagari({ t: x.t }, 'my') : '';
      out.sd = { say: '', sayDev: '', ch: [{ w: x.t, from: x.from, to: x.to, rule: r.id }] };
    }
    return out;
  });
  if (!ex.length) problems.push(`${where}: needs at least one example`);
  return { id: r.id, lang: r.lang, title: r.title, short: r.short, how: r.how, auto: !!r.auto, ex };
});

// ---- 😏 Sarcasm zone (data/sarcasm.yaml), Burmese only ----
const sarcIds = new Set();
const sarcasm = sarcasmSrc.map((j, ji) => {
  const where = `sarcasm.yaml: ${j.id || `#${ji + 1}`}`;
  if (!j.id || !/^[a-z0-9_]+$/.test(j.id)) problems.push(`${where}: id must be lower_case_with_underscores`);
  if (sarcIds.has(j.id)) problems.push(`${where}: duplicate id`);
  sarcIds.add(j.id);
  for (const f of ['t', 'e', 'why']) if (!j[f]) problems.push(`${where}: missing ${f}`);
  const parts = (j.parts || []).map(p => ({ w: p.w, m: p.m || '' }));
  if (!parts.length) problems.push(`${where}: needs parts`);
  for (const p of parts) if (!p.w || !(j.t || '').includes(p.w)) problems.push(`${where}: part "${p.w}" is not in the sentence`);
  const out = { id: j.id, t: j.t, e: j.e, why: j.why, parts, h: [...parts.map(p => p.w)].sort((a, b) => b.length - a.length), checked: j.checked === true };
  out.dev = GC.devanagari(out, 'my');
  out.sd = GC.mySounds(j.t);
  return out;
});

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) in data/grammar.yaml:\n  - ` + problems.join('\n  - '));
  process.exit(1);
}

const data = { builtAt: new Date().toISOString(), languages: LANGS, concepts, sounds, sarcasm };
fs.writeFileSync(path.join(ROOT, 'js/catalyst-data.js'),
  '// Generated by tools/build_data.mjs from data/grammar.yaml. Do not edit by hand.\n' +
  `window.CATALYST_DATA = ${JSON.stringify(data, null, 1)};\n`);

// ---- SQL seed: safe to run twice (upserts, then removes rows that are no longer in the YAML) ----
const q = (s) => (s == null ? 'null' : `'${String(s).replace(/'/g, "''")}'`);
const j = (o) => `${q(JSON.stringify(o))}::jsonb`;
const arr = (a) => (a.length ? `array[${a.map(q).join(', ')}]::text[]` : `'{}'::text[]`);
const lines = [
  '-- Catalyst: content. Generated by tools/build_data.mjs from data/grammar.yaml. Safe to run twice.',
  '-- Run catalyst-schema.sql first.',
  'begin;',
];
const cRows = [], eRows = [], xRows = [];
for (const c of concepts) {
  cRows.push(`(${q(c.id)}, ${c.sort}, ${q(c.group)}, ${q(c.title)}, ${q(c.summary)}, ${j(c.levels)}, ${j(c.pairNotes)})`);
  for (const [lang, e] of Object.entries(c.entries)) {
    const eid = `${c.id}:${lang}`;
    eRows.push(`(${q(eid)}, ${q(c.id)}, ${q(lang)}, ${q(e.form)}, ${q(e.note)}, ${!e.none}, ${e.checked})`);
    e.ex.forEach((x, i) => xRows.push(`(${q(`${eid}:${i + 1}`)}, ${q(eid)}, ${i + 1}, ${q(x.t)}, ${q(x.r)}, ${q(x.e)}, ${arr(x.h)}, ${q(x.devOverride || x.dev)}, ${x.sd === undefined ? 'null' : j(x.sd)})`));
  }
}
lines.push(
  'insert into public.catalyst_concepts (id, sort_order, group_name, title, summary, levels, pair_notes) values',
  cRows.join(',\n') + '\non conflict (id) do update set sort_order = excluded.sort_order, group_name = excluded.group_name, title = excluded.title, summary = excluded.summary, levels = excluded.levels, pair_notes = excluded.pair_notes, updated_at = now();',
  'insert into public.catalyst_entries (id, concept_id, language_code, form, note, has_equivalent, checked) values',
  eRows.join(',\n') + '\non conflict (id) do update set form = excluded.form, note = excluded.note, has_equivalent = excluded.has_equivalent, checked = excluded.checked, updated_at = now();',
  'insert into public.catalyst_examples (id, entry_id, sort_order, native_text, reading, english_text, highlight, devanagari, sounds) values',
  xRows.join(',\n') + '\non conflict (id) do update set sort_order = excluded.sort_order, native_text = excluded.native_text, reading = excluded.reading, english_text = excluded.english_text, highlight = excluded.highlight, devanagari = excluded.devanagari, sounds = excluded.sounds, updated_at = now();',
  `delete from public.catalyst_examples where id not in (${xRows.length ? concepts.flatMap(c => Object.entries(c.entries).flatMap(([l, e]) => e.ex.map((_, i) => q(`${c.id}:${l}:${i + 1}`)))).join(', ') : "''"});`,
  `delete from public.catalyst_entries where id not in (${concepts.flatMap(c => Object.keys(c.entries).map(l => q(`${c.id}:${l}`))).join(', ')});`,
  `delete from public.catalyst_concepts where id not in (${concepts.map(c => q(c.id)).join(', ')});`,
  'commit;', '',
);
fs.writeFileSync(path.join(ROOT, 'sql/catalyst-seed.sql'), lines.join('\n'));

const nEx = concepts.reduce((n, c) => n + Object.values(c.entries).reduce((m, e) => m + e.ex.length, 0), 0);
const nSd = concepts.reduce((n, c) => n + Object.values(c.entries).reduce((m, e) => m + e.ex.filter(x => x.sd).length, 0), 0);
console.log(`✓ ${concepts.length} concepts, ${nEx} examples (${nSd} with sound changes), ${sounds.length} sound rules, ${sarcasm.length} sarcasm sentences → js/catalyst-data.js, sql/catalyst-seed.sql`);
