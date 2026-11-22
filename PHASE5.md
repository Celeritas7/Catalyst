# Phase 5 — audio and personal learning

## 5A — implemented
- Explicit Listen/Slow controls on sentence meaning practice and reviews. Uses existing recording manifests, then an exact-language device voice. Clearly reports unavailable audio. Never reads grammar templates as sentences.
- Stop playback on question, route or target changes; repeated taps stop device speech too.
- My Learning → Your Burmese words reads the existing vocabulary and only the signed-in user's `word_type=word` progress. Refresh reloads; no imported progress is written or persisted locally.
- Levels 4–5 are labelled Known, levels 0–3 Learning, absent state Not rated. This is a transparent Catalyst grouping of the Burmese app's 0–5 practice levels, not its latest manual rating or proof of mastery.
- After answering a meaning question, optional dictionary matches show their levels. Longest exact matches win; unmatched text is unclassified, not declared unknown. No Burmese tokenizer claim.
- English vocabulary glosses are optional. Existing Marathi sentence meanings are unchanged.
- Pagination, failed reads, guests and account changes handled explicitly. Query errors never become zero ratings.

## Verified
- Existing study, activities and review tests pass.
- Vocabulary unit tests cover account/type isolation, zero level vs missing state, overlapping strings, filters and failure handling.
- Audio unit tests cover device fallback, missing voice, stop/restart and slow playback state.
- Browser preview: Burmese quiz with Marathi choices, optional English off, unavailable audio notice, ratings hidden until answering, guest vocabulary view.
- Signed-in end-to-end account switching and physical phone audio have not been tested.

## Backend work — historical audit and remaining deployment
Audit on 2026-11-15 found no Catalyst content/generated tables or `catalyst-sentence` function in the configured Supabase project. Existing repository SQL/function code is not evidence of a deployed backend.
- Deploy and validate own-user personal sentence storage and atomic daily quotas.
- Replace mandatory three-language vocabulary minimum with a selected-target provider.
- Validate model configuration and real generation; do not claim API key is configured.
- Central saved sentences; preserve original attempts and corrections separately.
- Review Burmese progress RLS before wider multi-user release: existing table has permissive public policies. This release uses explicit user filters and read-only access but does not fix those underlying policies or change the Burmese app's access.

No database changes or audio generation charges were made in 5A.

## 5A follow-up — multiple vocabulary sources

- Added read-only KG Chart word ratings (language-scoped) and Japanese Study markings (kanji-keyed, as in that app). My Learning has a source selector; source changes clear previous results. Target/account changes remount the provider and discard stale replies.
- Original rating labels replace a misleading universal mastery scale. KG rating 1 means Monthly Review; rating 5 means Don't know. Japanese custom categories are read when available; the optional missing category table falls back to source defaults.
- Current Catalyst targets with KG support: Japanese, Burmese, Chinese, Marathi. English has no connected provider. Registry can extend to the other KG languages when Catalyst lesson targets support them; this release does not claim those lesson packs exist.
- Burmese zero-count diagnosis: regular Study's REST client is anonymous and omits user_id when saving; `burmese_app_user_state.user_id` defaults to `gen_random_uuid()`. Thus populated legacy records are not reliably account-owned. New UI says No account-linked rating and explains the limitation. No legacy rows were reassigned, copied to a user, or exposed through a broader query.
- Burmese Song reviews use separate private storage; this connection does not conflate them with regular Study progress.
- Kata Kita `src/srs/local-review.js` stores reviews under `kk.reviews.v1` in localStorage. No cloud review source exists in its current integration. Cloud sync/import and verified ownership migration are follow-ups.
- Validation: existing tests plus connections tests (original rating meanings, custom labels, account/language isolation, source availability, 1001-row pagination, error handling) pass. Browser checked source selector and Burmese→Japanese target switch as guest. Signed-in end-to-end checks remain unverified.

## 5B and 5C — personal notebook

The device-local original/correction notebook, export/merge-only restore and guided
writing save are implemented (PRs #13 and #14). The user confirmed desktop refresh
persistence and unchanged-writing duplicate prevention. Physical iPad export/import
remains pending. See [Notebook](docs/NOTEBOOK.md).

## 5D — selected-language generation prepared

The backend now requires an explicit target and reads only that language's KG Chart
progress. Marathi/English meanings are independent, legacy generated examples stay
readable, and an additive migration provides atomic daily request reservations and
explicit permissions. The frontend handles unavailable/older services and stale
account/target responses. See [implementation, tests and deployment gates](docs/PHASE5D_GENERATION.md).

This code has not been deployed to production or validated with a paid model.
Notebook cloud sync and the central generated-sentence view remain pending.

## 5E — backend readiness prepared

A fresh read-only Technical audit confirmed the five source prerequisites pass,
but Catalyst tables, quota RPC and sentence function are absent. Added explicit
content grants, a reproducible read-only preflight, and an atomic first-install
bundle that refuses existing Catalyst objects and starts generation at limit zero.

Local first-install/RLS/grant/rollback tests and a PostgreSQL 17.6 rehearsal with
20 separate concurrent sessions passed. See [Phase 5E](docs/PHASE5E_BACKEND_READINESS.md)
for evidence, safe installation and remaining account/model/iPad acceptance.
Production is unchanged. A fresh backup and separately authorized paused install
come before deployment and live-model activation.
