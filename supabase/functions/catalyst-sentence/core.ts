// Catalyst ✨ "New sentence from my words": the logic of the catalyst-sentence Edge Function.
// No imports here, so it can be tested outside Supabase with a fake Claude and fake database (index.ts wires the real ones).
//
// POST (with the learner's login token, same account as KG Chart):  { concept_id }
// → 200 { ok: true, row, known: { ja, my, zh }, used, limit }
//   4xx/5xx { ok: false, reason, message }
//     reason: auth | not_allowed | bad_request | few_words | limit | claude | invalid | config
// GET ?check=1 (no login needed) → { ok, configured }  says whether the Claude key is set, never its value.
//
// "Learned" words = the same idea as KG Chart: every word in a topic the learner has completed
// (kg_chart_topic_completions), plus any word answered correctly at least MIN_CORRECT times in KG Chart quizzes.

export const STUDY = ['ja', 'my', 'zh'];
export const ALL = ['ja', 'my', 'zh', 'mr'];
export const MIN_CORRECT = 2;
export const MIN_WORDS = 8;            // fewer learned words than this in a language: ask the learner to learn more first
export const MAX_WORDS = 400;          // words per language sent to Claude
export const DEFAULT_LIMIT = 30;       // sentences per learner per day (kg_chart_settings key 'catalyst_daily_limit')
export const DEFAULT_MODEL = 'claude-sonnet-5-5';
export const CLAUDE_TIMEOUT_MS = 60_000;

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
const fail = (status: number, reason: string, message: string) => json(status, { ok: false, reason, message });

type Deps = {
  env: (k: string) => string | undefined;
  fetch: typeof fetch;
  userClient: (authHeader: string) => any;
  adminClient: () => any;
  now?: () => Date;
};

// ---- learned words, read with the learner's own login (RLS keeps it to their rows) ----
export async function learnedWords(db: any, userId: string, lang: string): Promise<{ w: string; en: string }[]> {
  const ids = new Set<string>();
  const { data: done } = await db.from('kg_chart_topic_completions').select('topic_id').eq('user_id', userId).eq('language_code', lang);
  const topics = (done || []).map((r: any) => r.topic_id);
  if (topics.length) {
    const { data: v } = await db.from('kg_chart_vocabulary').select('id').in('topic_id', topics).limit(5000);
    (v || []).forEach((r: any) => ids.add(r.id));
  }
  const { data: sessions } = await db.from('kg_chart_quiz_sessions').select('id').eq('user_id', userId).eq('language_code', lang)
    .order('created_at', { ascending: false }).limit(3000);
  const sids = (sessions || []).map((s: any) => s.id);
  const correct: Record<string, number> = {};
  for (let i = 0; i < sids.length; i += 300) {
    const { data: ans } = await db.from('kg_chart_quiz_answers').select('vocabulary_id').in('session_id', sids.slice(i, i + 300))
      .eq('is_correct', true).not('vocabulary_id', 'is', null).limit(20000);
    (ans || []).forEach((a: any) => { correct[a.vocabulary_id] = (correct[a.vocabulary_id] || 0) + 1; });
  }
  Object.entries(correct).forEach(([id, n]) => { if (n >= MIN_CORRECT) ids.add(id); });
  if (!ids.size) return [];
  const list = [...ids];
  const out: { w: string; en: string }[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < list.length; i += 300) {
    const { data: tr } = await db.from('kg_chart_vocabulary_translations')
      .select('native_text, vocabulary:kg_chart_vocabulary(english_text)')
      .eq('language_code', lang).in('vocabulary_id', list.slice(i, i + 300));
    (tr || []).forEach((t: any) => {
      const w = (t.native_text || '').normalize('NFC').trim();
      if (w && !seen.has(w)) { seen.add(w); out.push({ w, en: t.vocabulary?.english_text || '' }); }
    });
  }
  return out.slice(0, MAX_WORDS);
}

// ---- prompt ----
export function buildPrompt(concept: any, entries: Record<string, any>, known: Record<string, { w: string; en: string }[]>, previous: string[], fix?: string[]) {
  const langName: Record<string, string> = { ja: 'Japanese', my: 'Burmese', zh: 'Chinese (Mandarin, simplified)', mr: 'Marathi' };
  const lines: string[] = [];
  lines.push(`Grammar point: ${concept.title}. ${concept.summary}`);
  for (const l of ALL) {
    const e = entries[l];
    if (!e) continue;
    lines.push(`\n${langName[l]}: form "${e.form}". ${e.note}`);
    (e.examples || []).slice(0, 2).forEach((x: any) => lines.push(`  example: ${x.native_text}${x.reading ? ` (${x.reading})` : ''} = ${x.english_text}`));
  }
  for (const l of STUDY) {
    lines.push(`\nWords the learner knows in ${langName[l]} (word = meaning):`);
    lines.push(known[l].map(k => `${k.w} = ${k.en}`).join('; '));
  }
  if (previous.length) lines.push(`\nDo not repeat these meanings already made for this learner: ${previous.join(' | ')}`);
  if (fix?.length) lines.push(`\nYour previous answer had these problems, fix them:\n- ${fix.join('\n- ')}`);
  lines.push(`
Write ONE new, short, everyday sentence that clearly uses this grammar point, and give it in Japanese, Burmese, Chinese and Marathi with the same meaning.
Rules:
- In Japanese, Burmese and Chinese, every content word (noun, verb, adjective, adverb) must come from the learner's word list for that language. Particles, grammar endings, the grammar form itself, pronouns (I, you, he, this, that), numbers and counters may be used freely. Verbs and adjectives may be conjugated.
- Marathi is the learner's anchor language: no word limit, natural everyday Marathi.
- Use the grammar form exactly as described above for each language. Where a language has no equivalent, use what its entry says is used instead.
- Natural spoken style (Burmese colloquial: တယ်, မယ်; not written style).
- Keep it under 12 words.
Answer with JSON only, no other text:
{"en": "English meaning",
 "ja": {"t": "Japanese sentence", "r": "reading in hiragana as pronounced, words separated by spaces; topic は written わ, へ written え, を written お", "h": ["the grammar form exactly as it appears in t"], "words": ["each content word from the list, written exactly as in the list"]},
 "my": {"t": "...", "h": [...], "words": [...]},
 "zh": {"t": "...", "r": "pinyin with tone marks, words separated by spaces", "h": [...], "words": [...]},
 "mr": {"t": "...", "h": [...]}}`);
  return lines.join('\n');
}

// ---- answer → checked sentences ----
export function parseAnswer(text: string): any {
  const s = text.indexOf('{'), e = text.lastIndexOf('}');
  if (s < 0 || e < s) throw new Error('no JSON in the answer');
  return JSON.parse(text.slice(s, e + 1));
}
const nfc = (x: unknown) => (typeof x === 'string' ? x.normalize('NFC').trim() : '');
// A listed word is "in" the sentence if it appears as is, or (Japanese verbs/adjectives) its stem without the last kana does
function appears(word: string, t: string, lang: string) {
  if (t.includes(word)) return true;
  if (lang === 'ja' && word.length >= 2) return t.includes(word.slice(0, -1));
  return false;
}
export function check(ans: any, known: Record<string, { w: string; en: string }[]>) {
  const problems: string[] = [];
  const out: any = { en: nfc(ans?.en) };
  if (!out.en) problems.push('missing "en"');
  for (const l of ALL) {
    const x = ans?.[l];
    const t = nfc(x?.t);
    if (!t) { problems.push(`${l}: missing sentence`); continue; }
    const h = (Array.isArray(x.h) ? x.h : [x.h]).map(nfc).filter(Boolean);
    const row: any = { t, h: h.filter((p: string) => t.includes(p)) };
    if (!row.h.length) problems.push(`${l}: the highlighted grammar form must appear exactly in the sentence`);
    if (l === 'ja' || l === 'zh') {
      row.r = nfc(x.r);
      if (!row.r) problems.push(`${l}: missing reading`);
      if (l === 'ja' && /[一-鿿]/.test(row.r)) problems.push('ja: the reading must be kana only');
    }
    if (STUDY.includes(l)) {
      const set = new Set(known[l].map(k => k.w));
      const words = (Array.isArray(x.words) ? x.words : []).map(nfc).filter(Boolean);
      const unknown = words.filter((w: string) => !set.has(w));
      const missing = words.filter((w: string) => set.has(w) && !appears(w, t, l));
      if (!words.length) problems.push(`${l}: list the content words used`);
      if (unknown.length) problems.push(`${l}: these words are not in the learner's list: ${unknown.join(', ')}`);
      if (missing.length) problems.push(`${l}: these listed words do not appear in the sentence: ${missing.join(', ')}`);
      row.words = words;
    }
    out[l] = row;
  }
  return { sentences: out, problems };
}

// ---- Claude ----
export async function askClaude(deps: Deps, prompt: string) {
  const key = deps.env('ANTHROPIC_API_KEY');
  const model = deps.env('CATALYST_MODEL') || DEFAULT_MODEL;
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), CLAUDE_TIMEOUT_MS);
  try {
    const r = await deps.fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctl.signal,
      headers: { 'x-api-key': key!, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model, max_tokens: 1500,
        system: 'You write short example sentences for a language learner comparing grammar across Japanese, Burmese, Chinese and Marathi. You follow the word list strictly and answer with JSON only.',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!r.ok) throw new Error(`Claude ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const data = await r.json();
    return { text: (data.content || []).filter((c: any) => c.type === 'text').map((c: any) => c.text).join(''), model };
  } finally { clearTimeout(timer); }
}

export function makeHandler(deps: Deps) {
  return async (req: Request): Promise<Response> => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
    if (req.method === 'GET') return json(200, { ok: true, configured: !!deps.env('ANTHROPIC_API_KEY') });
    if (req.method !== 'POST') return fail(405, 'bad_request', 'POST only.');
    if (!deps.env('ANTHROPIC_API_KEY')) return fail(500, 'config', 'The Claude key is not set up yet (Supabase → Edge Functions → Secrets → ANTHROPIC_API_KEY).');

    // 1. login + allow-list (same as KG Chart)
    const auth = req.headers.get('Authorization') || '';
    if (!auth.startsWith('Bearer ')) return fail(401, 'auth', 'Please sign in.');
    const db = deps.userClient(auth);
    const { data: u, error: uErr } = await db.auth.getUser(auth.slice(7));
    const user = u?.user;
    if (uErr || !user) return fail(401, 'auth', 'Please sign in again.');
    const { data: allowed } = await db.rpc('kg_chart_is_allowed');
    if (allowed !== true) return fail(403, 'not_allowed', 'This account is not allowed to use the app.');

    // 2. request
    let body: any;
    try { body = await req.json(); } catch { return fail(400, 'bad_request', 'Send JSON.'); }
    const conceptId = typeof body?.concept_id === 'string' ? body.concept_id : '';
    if (!/^[a-z0-9_]+$/.test(conceptId)) return fail(400, 'bad_request', 'Unknown concept.');

    // 3. daily limit (since midnight UTC)
    const admin = deps.adminClient();
    const { data: lim } = await admin.from('kg_chart_settings').select('value').eq('key', 'catalyst_daily_limit').maybeSingle();
    const limit = Number.isInteger(lim?.value) && lim.value > 0 ? lim.value : DEFAULT_LIMIT;
    const now = deps.now ? deps.now() : new Date();
    const since = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
    const { count } = await admin.from('catalyst_generated').select('id', { count: 'exact', head: true }).eq('user_id', user.id).gte('created_at', since);
    const used = count || 0;
    if (used >= limit) return fail(429, 'limit', `That's ${limit} sentences today, the daily limit. More tomorrow.`);

    // 4. the concept, its entries and examples
    const { data: concept } = await admin.from('catalyst_concepts').select('*').eq('id', conceptId).maybeSingle();
    if (!concept) return fail(404, 'bad_request', 'Unknown concept.');
    const { data: ents } = await admin.from('catalyst_entries').select('*, examples:catalyst_examples(native_text, reading, english_text, sort_order)').eq('concept_id', conceptId);
    const entries: Record<string, any> = {};
    (ents || []).forEach((e: any) => { entries[e.language_code] = { ...e, examples: (e.examples || []).sort((a: any, b: any) => a.sort_order - b.sort_order) }; });

    // 5. learned words in each study language
    const known: Record<string, { w: string; en: string }[]> = {};
    for (const l of STUDY) known[l] = await learnedWords(db, user.id, l);
    const counts = Object.fromEntries(STUDY.map(l => [l, known[l].length]));
    const short = STUDY.filter(l => known[l].length < MIN_WORDS);
    if (short.length) return json(422, { ok: false, reason: 'few_words', known: counts,
      message: `Learn a few more words in KG Chart first: ${short.map(l => `${({ ja: 'Japanese', my: 'Burmese', zh: 'Chinese' } as any)[l]} ${known[l].length}/${MIN_WORDS}`).join(', ')}.` });

    // 6. ask Claude; one retry with the problems listed
    const { data: prev } = await admin.from('catalyst_generated').select('sentences').eq('user_id', user.id).eq('concept_id', conceptId)
      .order('created_at', { ascending: false }).limit(20);
    const previous = (prev || []).map((p: any) => p.sentences?.en).filter(Boolean);
    let result: any = null, fix: string[] | undefined, model = '';
    for (let attempt = 0; attempt < 2 && !result; attempt++) {
      let text = '';
      try { ({ text, model } = await askClaude(deps, buildPrompt(concept, entries, known, previous, fix))); }
      catch (e) { return fail(502, 'claude', `Claude did not answer (${(e as Error).message}). Try again.`); }
      try {
        const c = check(parseAnswer(text), known);
        if (!c.problems.length) result = c.sentences; else fix = c.problems;
      } catch (e) { fix = [`the answer was not valid JSON (${(e as Error).message})`]; }
    }
    if (!result) return fail(422, 'invalid', `Claude's sentence didn't pass the checks: ${fix!.join('; ')}. Try again.`);

    // 7. save (only this function can insert; the learner can read and flag their own rows)
    const { data: row, error: insErr } = await admin.from('catalyst_generated')
      .insert({ user_id: user.id, concept_id: conceptId, sentences: result, model }).select('*').single();
    if (insErr) return fail(500, 'config', `Made a sentence but could not save it: ${insErr.message}`);
    return json(200, { ok: true, row, known: counts, used: used + 1, limit });
  };
}
