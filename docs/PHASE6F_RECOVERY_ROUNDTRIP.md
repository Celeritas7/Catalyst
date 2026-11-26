# Phase 6F — recovery round-trip acceptance

Checkpoint: 2026-11-27 (Japan), following merged PR #27 (`b50f0a6`).
Final release: **`1da0f45bc1eeb72c2d73`**, 252 files, 11,585,743 bytes.
This is a recovery-preservation correction within 6F, not a new numbered phase
or a claim of physical iPad acceptance.

## Reproduced problems

1. Restoring an export from the same unchanged installation retained its own
   copies/journal as new wrapper records. Each following export included those
   wrappers inside another journal. A synthetic one-sentence example grew from
   792 bytes to 2,207, 11,511, 73,075, 509,787 and 3,709,263 bytes, then exceeded
   the 25 MB export limit after the sixth restore cycle.
2. A restore wrote the new journal and learner records before saving the retained
   previous journal. An injected failure on the recovery-copies key left the old
   journal replaced before its preservation copy had been saved.

Both were reproduced against the merged baseline. New regression tests fail on
that baseline and pass with the correction.

## Preservation rules

- Known version-1 copy envelopes merge by descriptor and exact raw contents.
  They remain inert: no embedded storage keys or journal operations are replayed.
- An unchanged current journal/copy envelope is not wrapped into itself.
  Duplicate identity is independent of descriptor property order.
- Unknown or malformed incoming copy formats remain verbatim inert copies.
  Unknown current envelopes block mutation and remain fully exportable.
- Retained history is appended atomically before replacing the current journal.
  If this write fails, learner records and the prior journal remain untouched.
- A copies-only merge does not replace the journal. A learner-record merge records
  both sides of those changes, without embedding the entire copy archive again.
- If journal creation fails after retention, the retained archive may have grown,
  but learner records and the prior journal remain unchanged. If a learner write
  fails later, the new journal retains both its old and proposed contents, and the
  previous journal is already retained separately. Re-preview and retry remain
  required; no all-or-nothing multi-key transaction is claimed.
- A detected journal change during retention pauses before learner writes.
  Existing stale-preview and per-record change checks remain enforced. These
  checks are not a general cross-tab transactional lock for localStorage.

The export version stays 1 and prior files remain readable. The change does not
clear, recursively unpack or automatically shrink old retained history. Unknown
nested history is deliberately retained as data. Historical data can still be
large; this fix prevents unnecessary new wrapping, not all possible storage limits.

## Evidence

| Check | Result | Scope |
| --- | --- | --- |
| Same-installation export/restore, 12 unchanged cycles | PASS | No writes or size growth |
| Exchange unchanged backups between two synthetic installations | PASS | Converges with both notes preserved; eight additional exchanges do not grow history |
| Copy, journal and learner-record write failures | PASS | Existing history retained; safe re-preview/retry |
| Concurrent journal change and stale preview | PASS | Refuses affected learner writes |
| Unknown/malformed copy envelopes | PASS | Preserved as inert bytes or writes blocked |
| Compiled app preview, cancel, merge, export/re-import and remount | PASS | Mounted UI, four cycles; originals/notes and storage unchanged after first merge |
| Account switch while a recovery file is reading | PASS | Late preview ignored; another account's backup rejected |
| Chromium browser UI | PASS (synthetic) | Actual File/Blob parsing and app merge/export handlers; zero changes/copies on re-import; repeated export 2,444 bytes; two sentences and both notes visible after reload |
| Native iPad Files, Safari/Home Screen and Airplane mode | NOT RUN | Physical device results still required |
| Android, fresh browser profile and live permission changes | NOT RUN in this checkpoint | Prior evidence remains separately recorded |

Browser QA used a non-production fixture at `/qa-recovery/`, a fictional account,
a mocked backend and a CSP blocking external connections. Explicit fixture
controls selected a generated test File in the real recovery input. Export bytes
were observed at Blob creation and fed back through the form; successful saving
in the browser's Downloads folder or iPad Files was **not** independently verified.
The profile was reused. No new service-worker/cold-offline result is claimed.
The final build was rechecked after the additional journal/current-envelope guards.

Validation commands:

```sh
npm run check:app
npm run check:build
node --test --test-concurrency=1 tests/*.test.cjs tests/*.test.ts
git diff --check
```

**136 tests pass locally.** Existing GitHub CI runs its normal parallel test command.
Its first run exposed an existing mounted account test reading the word count
before the asynchronous post-download recheck finished. The test now waits for
the verified saved-word state (including after cancellation), without weakening
application readiness or changing production code.
No production database changes, paid API calls, deployment, real account records,
or clearing of learner storage were needed.

## Next acceptance checkpoint

Follow [the device guide](PHASE6F_DEVICE_ACCEPTANCE.md): first export and confirm
a backup in Files, establish matching app/worker readiness in the actual iPad
study instance, then perform the cold Airplane-mode and preservation checks.
Keep 6F open until those results are recorded; a merged PR is not device evidence.
