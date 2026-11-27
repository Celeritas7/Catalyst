# Phase 6M — guided-activity account ownership

Checkpoint: 2026-11-27 (Japan), based on merged PR #34
(`079937367bf5b1ddb6b2da4c8157daa82a73f897`).

## Problem and result

Guided activity steps, saved drafts and completion marks still lived in
device-wide `catalyst_settings.activities`. Completing an activity as one
account made it appear completed after switching to another account; reopening
could also load the first account's writing. Notebooks, adaptive reviews and
recovery drafts already used separate account/language records.

The new account-switch UI regression failed against merged main: the second
account incorrectly displayed a completed activity. It passes with this change.

New guided progress belongs to the current study account or guest, for the
selected target language. Switching accounts resets the visible activity to
that account's state. Returning restores its saved step, writing and completion.
Marathi and English writing contexts retain separate draft/meaning pairs; a
meaning is not silently relabelled when the preference changes. Completion is
still the learner's self-review, not a mastery score or automatic grammar check.

## Older writing

The legacy `activities` object is retained unchanged. It has no reliable owner,
so the new app does not automatically copy its writing, step or completion to a
signed-in account or guest.

For an activity with older writing, open **Use → Review older writing**. The
preview explains the missing ownership. **Copy this writing into my draft**
requires an empty current draft/meaning; keep current writing for later first
if needed. Copying saves a recovery draft in the selected account and language,
then the learner can save it normally. The original stays intact and remains
included in optional device-record recovery exports. Older completion marks
remain in the legacy data and are not copied as proof of current completion.

An unreadable legacy settings record is not repaired or erased automatically.
Guest work is not automatically transferred when someone signs in.

## Storage and failure handling

| Record | Behaviour |
| --- | --- |
| `catalyst_activity_v1:<encoded-scope>:<language>` | Version 1 activity records with step, self-reviewed completion, timestamp and Marathi/English writing pairs |
| `catalyst_drafts_v1:<encoded-scope>:<language>` and page slots | Existing recovery drafts, including unfinished writing and retained failed saves |
| `catalyst_settings.activities` | Retained device-wide legacy data; no new activity progress writes |
| Notebook and review keys | Existing formats and task IDs remain unchanged |

Activity writes reread current data, preserve other activities and meaning
contexts, and reject a detected change to the activity opened by this editor.
The editor keeps its own expected record, including after a storage event, so
refreshing the list cannot silently make stale local writing overwrite another
view's save. Reopen after keeping unfinished writing for later to continue from
the newer saved version. These checks are not a transactional cross-tab lock.

**Save draft** and **Complete activity** first save the recovery draft, then
commit activity progress. They announce success and clear the unsaved-update
guard only after both writes succeed. A rejected/full store retains writing in
the open view and, where available, its recovery copy. A failed progress commit
may leave that additional recovery copy; it does not claim an all-or-nothing
multi-key transaction. Account-change callbacks are checked before saving.

Malformed or future progress formats block writes and stay exportable as raw
data. A pending account cannot load or save an activity under a guessed owner.

## Recovery compatibility

Recovery version 1 now recognizes an `activity` record descriptor alongside
notebook, review and draft records. The maximum selected record count becomes
42: four kinds × five languages × current/guest, plus two device records.
Exports read only the selected account and optional guest/device scopes.

Earlier recovery files remain readable. New files containing activity records
require this app version or later; earlier app versions reject that unsupported
record type. Notebook-only import/export is unchanged. Rolling back does not
delete the new storage key, but an older app cannot display its progress.

On restore, current activity records win conflicts, missing activity IDs merge,
and incoming conflicting records remain in recovery copies. Unknown/corrupt
records are retained rather than overwritten. Repeated unchanged export/import
cycles do not grow recovery history. Restoring device settings never assigns
legacy activity writing to an account.

## Verification

- **173 tests pass**, using local serial execution. New checks cover account
  and guest switching, late save actions, meaning-language preservation,
  explicit legacy copying, failed draft/progress writes, stale editors,
  unreadable/future records, full 42-record recovery, conflict preservation and
  repeated recovery cycles.
- A prepared synthetic account reopens its saved activity with network,
  content and auth reads failing; recovery preview includes its activity record.
- **Synthetic desktop Chromium check passed:** complete a Burmese activity as
  account A; switch to B and observe Start activity with empty writing/meaning;
  switch back to A and observe its completion, Burmese sentence and Marathi
  meaning. The restored form and script rendering were visually inspected.
- Browser QA used fictional accounts, a mocked backend and a CSP blocking
  external connections. It did not use a real Supabase account or change
  production data. This is not a physical iPad, OAuth, service-worker cold-start,
  Files-download or VoiceOver certification.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release `f7924e546d7830fa7efe`: 252 files, 11,653,950 bytes.

All six activity definitions, 218 core examples and existing meanings are
unchanged. No SQL, paid API, content approval or cloud synchronization is added.
Native-speaker review and the physical Phase 6F checklist remain pending.

Next bounded development step: review keyboard navigation, focus and announced
feedback in guided activities, preserving this account ownership contract.
