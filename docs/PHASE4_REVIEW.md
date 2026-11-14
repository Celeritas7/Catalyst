# Phase 4 — adaptive practice and mistake review

## What is available

Today shows due checks and open mistakes. My Learning adds the persistent mistake list, skill counts and four per-lesson self-assessments: needs revision, known but misused, cannot write yet, and known but never used. A lesson also has its own state selector. These labels never claim mastery or silently change after one answer.

Practice ranks due tasks first, then open mistakes, unseen tasks and other practice. Within each band, a lesson's assigned state gives preference to the corresponding skill. The selected quiz mode still limits the question pool; production is available through the two guided pilots and their reviews. Questions are regenerated using the current target/reference/meaning settings, not replayed in an old meaning language. Unavailable saved tasks are retained and counted with an explicit message.

## Skills and scoring

- Meaning and form recognition: understanding.
- Cross-language connections and guided contextual choices: contextual selection.
- Authored sentence-chunk tasks: guided production. This does not assess free writing or pronunciation.
- Correct/incorrect independent checks at their due dates: delayed recall, tracked in addition to the task's skill.
- Free writing remains self-reviewed. Saving or completing a draft does not produce a correctness score.

The old global quiz accuracy is retained as an attempt count, not reinterpreted as independent mastery. New review skill counts appear separately.

## Scheduling rules

Times are stored as epoch milliseconds and rendered in the browser's local time. A day is 24 hours. Independent correct checks progress through intervals of 1, 3, 7, 14 and 30 days (then 30 again). Independent failures reset the interval to one day. A mistake stays open until a correct independent check when due.

To qualify as independent, the check must be due, at least 24 hours after the last exposure, and neither assisted nor an explicit retry. Hint use remains assisted even if the hint is hidden again. Reveals, immediate retries, early practice and reopening the same exercise cannot advance the interval or independent counts. Every exposure enforces at least a fresh 24-hour gap; this can move the next date without advancing the interval stage. Failures remain reviewable immediately through the Mistakes tab. The original most recent wrong response remains available after early successful practice.

These are transparent product defaults, not a validated prediction of mastery. Tests use an injected clock to check due boundaries and all intervals without changing the device clock.

## Storage, account separation and migration

New records use `catalyst_review_v1:<scope>:<target language>`, where scope is the existing session's user ID or `guest`. The UI waits for initial session resolution before writing review results and remounts its review state when the scope/target changes. Guest and account records are not automatically merged or uploaded. This is organization of browser-local data, not a security boundary against other users of the same browser profile.

Existing `catalyst_settings` fields, learned IDs, practice counts and Phase 3 drafts are preserved. Historical records lack reliable per-language/per-account attribution, so they remain under Legacy history rather than being assigned invented ownership or mastery. Phase 3 drafts retain their existing local storage behavior. Changing meaning/reference language does not reset the target's review records.

Storage failures show an error rather than claiming a result was saved. Unknown or malformed review data is preserved and not overwritten. Writes read the latest persisted record first; storage events refresh other tabs. No Supabase tables, access rules, authentication permissions or remote writes were added. New review records do not yet synchronize across devices.

## Verification and limits

- Scheduler tests: all intervals, exact due boundaries, early/repeated/assisted attempts, open-mistake resolution, skill isolation, state changes, scope keys, parsing failures and legacy preservation.
- Existing 644-question and 50 Burmese-to-Marathi checks, plus guided pilot permutations/coverage.
- Browser: wrong quiz answer → saved mistake → immediate correct review keeps it open; state label and mistake survive reload; Japanese/Burmese isolation; guided production mistake and answer reveal.
- Future-time behavior and separate account keys tested in code. No real account switching or cross-device sync test; desktop visual inspection only.

Phase 5 remains audio, shared vocabulary ratings and personal sentence generation integration.
