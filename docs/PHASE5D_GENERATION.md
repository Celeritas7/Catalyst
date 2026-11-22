# Phase 5D — generate in the selected learning language

Prepared on 2026-11-22. This change is code and a reviewed-before-use migration;
no production SQL, secrets, Edge Function deployment, or paid model calls were
performed as part of development. Merging the frontend alone does not enable
live generation. The earlier 2026-11-15 audit recorded an absent backend; that
historical audit is not a new production availability check.

## Behavior

A Burmese learner needs at least eight eligible Burmese words in KG Chart, with
no Japanese or Chinese progress requirement. Japanese, Chinese and Marathi work
independently in the same way. English currently has no generation vocabulary
provider. The separate grammar-reference/comparison settings do not impose a
vocabulary requirement or add extra generated sentences.

Eligible vocabulary retains the existing rule: words in completed KG Chart
topics, plus words answered correctly at least twice in the selected language's
quiz sessions. It is not a conversion of KG word ratings, Japanese word markings,
or Burmese Study's practice levels. Explicit user/language filters and the
learner's Supabase client are used for progress reads. All sources are paginated;
a failed or excessively large read fails explicitly rather than displaying a
false zero or using partial progress. The prompt uses up to 400 eligible words.

The meaning language is independent (Marathi or English). New Marathi meanings
come from the generation response and are stored with it. Optional English display
follows the existing preference. Existing multilingual rows remain readable for
the selected target; their Marathi sentence remains the legacy Marathi meaning.
No original notebook attempts, correction notes, imported backups, ratings,
review intervals or shared vocabulary tables are modified.

Generated examples are labelled **AI generated · not reviewed**. Validation checks
response structure, script, readings, highlight occurrence and the model's listed
words against known words. This is not full tokenization, complete detection of
undeclared unknown words, grammatical assessment or a native-speaker review. The
existing Japanese stem heuristic remains approximate. One invalid model response
gets one correction attempt; a second invalid response is not saved.

## API and compatibility

POST `catalyst-sentence`, with the learner's Bearer token:

```json
{"concept_id":"want_tai","target_language":"my","meaning_language":"mr"}
```

The server verifies the session and `kg_chart_is_allowed`. A browser-supplied
`user_id` is never used. Missing/unsupported selections are rejected before any
paid call, including requests from the old multilingual client.

A successful response retains `row`, `known`, `used` and `limit` and adds
`api_version: 2`. `known` contains only the selected target. New rows have
`target_language` and `meaning_language`; the previous columns and sentence JSON
are preserved. New sentence JSON contains `en`, `meanings` and only the target
object (`t`, optional `r`, `h`, `words`). Old rows keep NULL language metadata.

GET returns `{ok, configured, api_version, targets}`. `configured` means the model
name and API key are present; it does not prove database readiness or credential
validity. The frontend will not send a generation request to an older or
unconfigured endpoint, but can still show older saved examples. A missing quota
RPC or failed history/content read stops generation before contacting the model.

Pending UI work is scoped to the account, concept, target and meaning. Account or
language changes discard late replies. A failed flag keeps the sentence visible
until a successful own-user update is confirmed. A failed/ambiguous generation
save instructs the learner to reload saved sentences before requesting again.
There is no automatic retry of an ambiguous POST; exactly-once delivery across
page reloads is not claimed. Navigating away can abort the browser fetch while
server generation still completes; the row can be read on returning to that scope.

## Daily requests and privileges

`sql/catalyst-generation-v2.sql` adds nullable language metadata, a private
`catalyst_generation_daily` ledger and the service-role-only
`catalyst_reserve_generation(uuid)` RPC. The RPC uses SECURITY INVOKER and an empty
search path. PUBLIC, anon and authenticated cannot execute it or access the ledger.
Explicit sentence table and column grants allow authenticated users to select,
delete and update only `flagged`, subject to existing own-user RLS policies.

A slot is reserved before the paid model call using a conditional UPDATE of the
user/day ledger. Simultaneous requests serialize on that row. Initial usage for a
new day is seeded from that user's existing saved rows for that UTC day. A flag or
deletion does not refund usage. Attempts that reach generation count even if the
provider, validation or save fails; the one validation retry uses the same slot.
Preflight failures (auth, unsupported language, too few words or failed reads)
do not reserve a slot.

`kg_chart_settings.catalyst_daily_limit` defaults to 30 requests per user/day,
shared across targets. Integers or digit-only JSON strings from 0 through 1000 are
accepted. Zero pauses new generation. Malformed limits fail closed. The database
chooses the UTC day; the browser cannot supply a date or limit. Midnight UTC is
09:00 in Japan. Each reservation can make at most two model calls of 1500 output
tokens, each with a 60-second timeout.

## Validation and deployment gates

Run with Node 22.18+:

```sh
npm ci
npm test
npm run check:app
```

Tests cover selected-language-only generation, selected meanings, auth/allow-list,
account/language query filters, pagination beyond 1000 rows, failed reads, quota
refusal, model retry limits, invalid responses, save failures and legacy rows.
An isolated PostgreSQL engine (PGlite) applies the migration twice and checks
existing JSON, RLS, table/column grants, per-user/day limits, disabled/malformed
settings and non-refundable usage. PGlite queues parallel calls on one backend;
real multi-session contention was a remaining gate at the end of this phase.
[Phase 5E](PHASE5E_BACKEND_READINESS.md) subsequently passed a disposable PostgreSQL
17.6 test using 20 separate sessions. Hosted Auth/Edge validation remains pending.
Mounted React interaction tests cover legacy/new meaning display, flag/save
failures, outdated-service gating, delayed responses after account changes,
language/meaning changes and sign-out. These do not substitute for visual browser,
Safari or physical iPad testing. A standalone Chromium launch was blocked by the
execution environment, and the connected browser could not reach the local preview.

Before a separately authorized deployment:

1. Inventory and back up the actual configured project; compare existing schema,
   constraints, policies and privileges with the repository. Do not assume the
   historical audit still describes the live project.
2. On isolated staging, apply the original Catalyst content schema/seed and
   generated-sentence schema if absent, then `catalyst-generation-v2.sql`. Verify
   the migration against representative legacy rows and actual Supabase roles.
3. Confirm source-table RLS and KG allow-list behavior with two test accounts.
   This change does not broaden or repair source-app policies. Test true concurrent
   reservations from separate sessions and verify a combined per-user limit.
4. Configure `ANTHROPIC_API_KEY` and explicitly choose `CATALYST_MODEL` from models
   available to that account; no model name or key is assumed to work. Confirm
   the operator's intended costs before any live-model acceptance run.
5. Deploy the function with JWT verification disabled only because the handler
   performs its own `auth.getUser` and allow-list checks (including CORS handling).
   Then test one approved real generation, reload, failed request, flag and
   user/language switch. Check readings and Marathi meaning with a competent speaker.
6. Test the frontend on desktop and iPad. The earlier notebook's physical iPad
   export/import test is still pending; notebook refresh and duplicate prevention
   were confirmed by the user on desktop before this phase.

Suggested deployment order: additive SQL → configured v2 function → frontend.
Until the service is ready the new frontend disables generation honestly.
Do not automatically apply the SQL or deploy on merge.

## Rollback and remaining work

Retain the additive columns and ledger. To pause generation, set the existing
daily-limit setting to zero through the normal authorized admin process; reading
saved sentences continues. Revert frontend code if necessary, but retain the v2
handler's explicit-target checks and quota protection (old clients are rejected).
Do not roll the function back to the unreserved three-language implementation,
drop the ledger, remove language columns, or delete saved rows as a rollback step.

Cloud sync of learner-written notebook entries, a central generated-sentence
view, automatic correction, additional vocabulary providers, and Phase 6 offline
application startup/content packs remain separate work. Live backend deployment
and real-model acceptance are not completed by this PR.

Implementation references: [Supabase database functions](https://supabase.com/docs/guides/database/functions)
and [Claude Messages API](https://platform.claude.com/docs/en/api/messages/create).
