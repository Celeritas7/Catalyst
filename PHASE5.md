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

## 5B — pending
Audit on 2026-11-15 found no Catalyst content/generated tables or `catalyst-sentence` function in the configured Supabase project. Existing repository SQL/function code is not evidence of a deployed backend.
- Deploy and validate own-user personal sentence storage and atomic daily quotas.
- Replace mandatory three-language vocabulary minimum with a selected-target provider.
- Validate model configuration and real generation; do not claim API key is configured.
- Central saved sentences; preserve original attempts and corrections separately.
- Review Burmese progress RLS before wider multi-user release: existing table has permissive public policies. This release uses explicit user filters and read-only access but does not fix those underlying policies or change the Burmese app's access.

No database changes or audio generation charges were made in 5A.
