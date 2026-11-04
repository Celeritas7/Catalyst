// Tests for supabase/functions/catalyst-sentence/core.ts with a fake Claude and a fake database.
// Run: node tests/sentence.test.ts   (Node 22.18+ runs TypeScript directly)
import { makeHandler, check, buildPrompt, MIN_WORDS } from '../supabase/functions/catalyst-sentence/core.ts';
import assert from 'node:assert/strict';

const W = {
  ja: ['水', '飲む', '本', '読む', '日本', '行く', '泳ぐ', '明日', '来る', '猫'],
  my: ['ရေ', 'သောက်', 'စာအုပ်', 'ဖတ်', 'ဂျပန်', 'သွား', 'ရေကူး', 'မနက်ဖြန်', 'လာ', 'ကြောင်'],
  zh: ['水', '喝', '书', '看', '日本', '去', '游泳', '明天', '来', '猫'],
};
// fake Supabase: every chain resolves to rows from `tables` (filters ignored except a few we need)
function fakeDb(tables: Record<string, any>, log: any[] = []) {
  const q = (t: string) => {
    let state: any = { t, head: false, lang: null };
    const res = () => {
      const v = typeof tables[t] === 'function' ? tables[t](state) : tables[t];
      if (state.head) return { count: (v || []).length, data: null, error: null };
      return { data: v, error: null };
    };
    const chain: any = new Proxy({}, { get: (_o, k) => {
      if (k === 'then') return (ok: any, bad: any) => Promise.resolve(res()).then(ok, bad);
      if (k === 'maybeSingle' || k === 'single') return () => Promise.resolve({ data: Array.isArray(res().data) ? res().data[0] : res().data, error: null });
      if (k === 'insert') return (row: any) => { log.push(row); state.inserted = row; tables[t] = [{ id: 'new', ...row }]; return chain; };
      if (k === 'select') return (_s: string, o?: any) => { if (o?.head) state.head = true; return chain; };
      if (k === 'eq') return (col: string, v: any) => { if (col === 'language_code') state.lang = v; return chain; };
      return () => chain;
    } });
    return chain;
  };
  return { from: q, rpc: async () => ({ data: true }), auth: { getUser: async () => ({ data: { user: { id: 'u1' } }, error: null }) } };
}
const words = (st: any) => (W as any)[st.lang || 'ja'].map((w: string) => ({ native_text: w, vocabulary: { english_text: 'x' } }));
const baseTables = () => ({
  kg_chart_topic_completions: [{ topic_id: 'drinks' }],
  kg_chart_vocabulary: [{ id: 'v1' }],
  kg_chart_quiz_sessions: [],
  kg_chart_quiz_answers: [],
  kg_chart_vocabulary_translations: words,
  kg_chart_settings: [],
  catalyst_generated: [],
  catalyst_concepts: [{ id: 'want_tai', title: 'Want to', summary: 's' }],
  catalyst_entries: [{ language_code: 'ja', form: 'たい', note: 'n', examples: [] }],
});
const good = {
  en: 'I want to drink water.',
  ja: { t: '水が飲みたい。', r: 'みず が のみたい', h: ['たい'], words: ['水', '飲む'] },
  my: { t: 'ရေ သောက်ချင်တယ်။', h: ['ချင်'], words: ['ရေ', 'သောက်'] },
  zh: { t: '我想喝水。', r: 'wǒ xiǎng hē shuǐ', h: ['想'], words: ['水', '喝'] },
  mr: { t: 'मला पाणी प्यायचं आहे.', h: ['प्यायचं'] },
};
const claude = (answers: any[]) => { let i = 0; const calls: any[] = []; const f: any = async (_u: string, init: any) => {
  calls.push(JSON.parse(init.body)); const a = answers[Math.min(i++, answers.length - 1)];
  return new Response(JSON.stringify({ content: [{ type: 'text', text: typeof a === 'string' ? a : '```json\n' + JSON.stringify(a) + '\n```' }] }), { status: 200 });
}; f.calls = calls; return f; };
const handler = (tables: any, fetchFn: any, env: any = { ANTHROPIC_API_KEY: 'k' }, log: any[] = []) =>
  makeHandler({ env: (k) => env[k], fetch: fetchFn, userClient: () => fakeDb(tables, log), adminClient: () => fakeDb(tables, log) });
const post = (body: any, auth = 'Bearer t') => new Request('https://x/f', { method: 'POST', headers: { Authorization: auth, 'content-type': 'application/json' }, body: JSON.stringify(body) });

let n = 0; const t = async (name: string, fn: () => Promise<void> | void) => { await fn(); n++; console.log('✓', name); };

await t('check accepts a good answer, ja conjugated verb by stem', () => {
  const known = Object.fromEntries(Object.entries(W).map(([l, ws]) => [l, ws.map(w => ({ w, en: '' }))]));
  assert.deepEqual(check(good, known).problems, []);
});
await t('check rejects an unknown word and a missing highlight', () => {
  const known = Object.fromEntries(Object.entries(W).map(([l, ws]) => [l, ws.map(w => ({ w, en: '' }))]));
  const bad = structuredClone(good); bad.zh.words = ['水', '咖啡']; bad.my.h = ['နေ'];
  const p = check(bad, known).problems.join(' | ');
  assert.match(p, /zh: these words are not in the learner's list: 咖啡/); assert.match(p, /my: the highlighted/);
});
await t('check rejects kanji in the Japanese reading', () => {
  const known = Object.fromEntries(Object.entries(W).map(([l, ws]) => [l, ws.map(w => ({ w, en: '' }))]));
  const bad = structuredClone(good); bad.ja.r = '水 が のみたい';
  assert.match(check(bad, known).problems.join(), /kana only/);
});
await t('GET check says whether the key is set', async () => {
  const r = await handler(baseTables(), claude([good]))(new Request('https://x/f?check=1'));
  assert.deepEqual(await r.json(), { ok: true, configured: true });
});
await t('no key → config', async () => {
  const r = await handler(baseTables(), claude([good]), {})(post({ concept_id: 'want_tai' }));
  assert.equal(r.status, 500); assert.equal((await r.json()).reason, 'config');
});
await t('no login → 401', async () => {
  const r = await handler(baseTables(), claude([good]))(post({ concept_id: 'want_tai' }, ''));
  assert.equal(r.status, 401);
});
await t('bad concept id → 400', async () => {
  const r = await handler(baseTables(), claude([good]))(post({ concept_id: 'DROP TABLE' }));
  assert.equal(r.status, 400);
});
await t('happy path: saves and returns the sentence', async () => {
  const log: any[] = []; const f = claude([good]);
  const r = await handler(baseTables(), f, { ANTHROPIC_API_KEY: 'k' }, log)(post({ concept_id: 'want_tai' }));
  const j = await r.json();
  assert.equal(r.status, 200, JSON.stringify(j)); assert.equal(j.ok, true);
  assert.equal(log[0].sentences.ja.t, '水が飲みたい。'); assert.equal(log[0].user_id, 'u1');
  assert.deepEqual(j.known, { ja: 10, my: 10, zh: 10 });
  assert.match(f.calls[0].messages[0].content, /ရေ = x/);
  assert.equal(f.calls[0].model, 'claude-sonnet-5-5');
});
await t('bad first answer → one retry listing the problems, then success', async () => {
  const bad = structuredClone(good); bad.ja.words = ['水', 'コーヒー'];
  const f = claude([bad, good]);
  const r = await handler(baseTables(), f)(post({ concept_id: 'want_tai' }));
  assert.equal(r.status, 200); assert.equal(f.calls.length, 2);
  assert.match(f.calls[1].messages[0].content, /コーヒー/);
});
await t('two bad answers → invalid', async () => {
  const r = await handler(baseTables(), claude(['not json']))(post({ concept_id: 'want_tai' }));
  assert.equal(r.status, 422); assert.equal((await r.json()).reason, 'invalid');
});
await t('too few learned words → few_words', async () => {
  const tb = baseTables(); tb.kg_chart_vocabulary_translations = (st: any) => words(st).slice(0, st.lang === 'my' ? 3 : 10);
  const r = await handler(tb, claude([good]))(post({ concept_id: 'want_tai' }));
  const j = await r.json(); assert.equal(j.reason, 'few_words'); assert.match(j.message, new RegExp(`Burmese 3/${MIN_WORDS}`));
});
await t('daily limit', async () => {
  const tb = baseTables(); tb.kg_chart_settings = [{ value: 2 }]; tb.catalyst_generated = [{ id: 1 }, { id: 2 }];
  const r = await handler(tb, claude([good]))(post({ concept_id: 'want_tai' }));
  assert.equal(r.status, 429);
});
await t('words answered correctly twice count as learned', async () => {
  const tb = baseTables(); tb.kg_chart_topic_completions = [];
  tb.kg_chart_quiz_sessions = [{ id: 's1' }];
  tb.kg_chart_quiz_answers = [{ vocabulary_id: 'a' }, { vocabulary_id: 'a' }, { vocabulary_id: 'b' }];
  const r = await handler(tb, claude([good]))(post({ concept_id: 'want_tai' }));
  assert.equal(r.status, 200);
});
await t('prompt includes the grammar form and the word list', () => {
  const p = buildPrompt({ title: 'Want to', summary: 's' }, { ja: { form: 'たい', note: 'n', examples: [] } }, { ja: [{ w: '水', en: 'water' }], my: [], zh: [] }, ['I want tea.']);
  assert.match(p, /form "たい"/); assert.match(p, /水 = water/); assert.match(p, /I want tea\./);
});
console.log(`\n${n} tests passed`);
