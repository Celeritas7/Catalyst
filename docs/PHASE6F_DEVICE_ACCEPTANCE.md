# Phase 6F — device acceptance

**Started 2026-11-25 (Japan). Physical acceptance is pending.**

Baseline: merged Phase 6E PR #23, commit
`9cd13c5696ba79ad08bbcb4d5602732cc194b75c`, release
`6e993fd5a1ca723dd86f`. At the dated preflight, the public app at
<https://celeritas7.github.io/Catalyst/> served that release. A read-only check
verified **252/252 files**, 11,575,825 bytes, against the release inventory.
See [the dated preflight result](phase6f-release-preflight.json).

This phase found and fixes a header layout problem: at a narrow viewport with
200% root text size, the title overlapped the progress count and offline button.
At normal size, Study offline measured about 34 px high and Settings 36 × 36 px.
The header now wraps its brand and action groups, keeps controls at least 44 px
high (44 × 44 px for Back and Settings), and respects display safe-area insets.

The header correction in merged PR #24 is release **`e890e4d32c01fdb2a434`**, 252 files,
11,576,539 bytes. It is distinct from the live baseline above; merging a PR
alone is not evidence that a particular iPad has downloaded the new release.

## In-app preparation and status report — 2026-11-26

The follow-up release adds a five-step iPad preparation checklist inside Study
offline. Under **Share offline status**, use **Preview status report**, then
**Copy status report**. If clipboard access fails, the report is selected for
manual copying. Refresh the preview after changing preparation or downloads.
The report is a snapshot, not a backup or an automatic device-test result.

Only allowlisted versions, download counts, readiness flags, selected learning
language, generic study scope and window mode appear in the report. It does not
read notebook contents, include account identifiers or credentials, copy raw
errors, or send a report over the network. It reports unknown candidate progress
as unknown, not zero, and separates app readiness from account preparation and
manual backup/cold-reopen verification. Word/audio sections remain independent.

Mounted UI tests cover ready/not-ready versions, unknown progress, private-data
exclusion, no report-triggered storage/network writes, clipboard success and
manual-copy fallback. All **120 tests**, JSX and reproducible-build checks pass.
No new physical device results are claimed; Phase 6F remains pending.

## Checks completed here

- `npm run check:app`, `npm run check:build`, all **118 tests**, and
  `git diff --check` pass against the corrected release. Storage/auth/download
  logic is unchanged; existing preservation tests remain included.
- Synthetic Chromium viewport checks used 390, 768 and 1024 px iframe widths.
  With the browser's scrollbar, content widths were 375, 753 and 1009 CSS px.
  There was no document-level horizontal overflow at those widths.
- At 375 CSS px with 200% root text size, brand and actions occupy separate rows
  without overlap. At normal size, Back, Study offline and Settings measure
  44 px high; the two icon buttons measure 44 px wide.
- The Burmese lesson and Devanagari reading render; offline settings and the
  recovery preview remain reachable. Shift+Tab from Close reaches the final
  recovery disclosure; Escape closes the dialog and restores focus to Study
  offline. No real account, notebook, restore or backend write was used.

The preview uses blocked external requests and a synthetic account, at a separate
`/Catalyst-6F/` path. Preview build `5fb2ab7ea5f1f85885de` is not a production
version. The browser process/profile was reused, so this is not fresh-profile
acceptance. The text-size control changes the root font size; it does not prove
native Safari page zoom, VoiceOver or device orientation behavior. Browser zoom
keyboard commands did not produce a verified zoom change and are not counted.
The previous 6C–6E cold-reopen evidence remains recorded in its own checkpoints;
it has not been relabelled as an iPad result.

## How to conduct the physical checks

Work through one checkpoint at a time. Test the **existing study instance**
first. Safari and a Home Screen app require separate records and preparation;
do not assume a download in one proves readiness in the other. Do not reinstall
the existing app or clear website data to run this checklist.

### Checkpoint 1 — protect writing and establish readiness, online

1. Open Catalyst where you normally study, using the same account and learning
   language. Record iPad model, iPadOS version, Safari/Home Screen mode, target
   language and meaning language. Record account/guest mode only; keep email and
   account IDs out of shared results.
2. In My Learning, record the saved-sentence count and verify an existing
   original and correction remain readable. Use **Export notebook** and keep
   the JSON in Files. Keep this private; a public issue only needs counts and
   pass/fail observations.
3. Open **Study offline → Protect your saved work → Preview recovery export →
   Download recovery file**. Check that Files contains a nonempty recovery JSON.
   Preserve it as the before-test copy. Record its filename/size locally.
4. In Study offline, record App and Worker IDs and use **Check for updates** if
   shown. If an update is available, save or keep drafts in every Catalyst tab,
   download it, and use the explicit
   **Apply update and reload** action. Do not bypass a busy-draft warning.
5. Use **Download app and lessons** (or **Resume / repair download**) as needed,
   keeping the app visible. Wait for **App and text ready offline** with matching
   App/Worker IDs and no remaining bytes. Use **Verify saved files** once.
6. If studying under an account, use **Prepare this account for offline study**
   or its refresh action while online. Record notebook/review readiness and each
   word source separately. An unavailable source is not zero learned words and
   does not cancel text-only study. The prior 6D KG permission prerequisite and
   6E audio-publication gap remain separate checks; record what this device shows.

**Stop here if readiness, backup, identity or existing writing is wrong.** Keep
the page and records intact and report the displayed message. Do not begin the
offline test until app readiness and the intended account/guest scope are clear.

### Checkpoint 2 — café-style cold reopening and writing

1. Turn on Airplane Mode and explicitly turn Wi-Fi off in Settings. Wi-Fi can be
   enabled while Airplane Mode is on, so the airplane icon alone is insufficient.
   Disconnect any Ethernet/hotspot connection for this test.
2. Close Catalyst through the app switcher (or close its Safari tabs), then reopen
   the same Home Screen app or exact Safari URL. Record whether the app starts,
   the same study scope is shown, and App/Worker IDs match the prepared baseline.
3. Open **Verb at the end**, check the Burmese and Devanagari text, navigate to a
   second lesson and answer one practice question. Record navigation and practice
   separately. A cache-missing or account warning is a failure for that check,
   not permission to reset storage.
4. In My Learning, save one clearly identifiable test sentence and add a
   correction separately. Confirm the earlier originals remain and the count
   increases by one. Close/reopen again while disconnected and verify both the
   test original and its correction, plus the earlier writing.
5. Reconnect, reopen and recheck the same records and count. A source refresh
   failure must not remove local writing. Export an after-test recovery copy
   under a distinct filename.

### Checkpoint 3 — interruptions, recovery and accessibility

- Type a new test draft and wait for **Recovery draft saved on this device**.
  Switch away/lock the iPad, return, then close/reopen and use **Recovered writing
  → Resume draft**. Check original and meaning text. Use **Keep draft for later**
  before any update. If draft saving reports a failure, keep the page open and
  copy the test text instead of terminating the app.
- During the next needed app/update download, pause or background the app and
  resume. Verify retained bytes, accurate remaining bytes and matching IDs after
  completion. If the pack is already complete, mark this **NOT RUN** until a real
  update; do not delete downloaded packs just to manufacture the scenario.
- For Files recovery: use **Restore a recovery file** to select the after-test
  export, inspect its destination/counts, then cancel once. Re-preview that same
  file and merge; existing originals/corrections and review dates must remain,
  and importing the same file again must not duplicate them. Keep both exports.
  Stop if the preview reports damage or an unexpected destination.
- Check portrait/landscape and actual 200% Safari zoom, especially the header,
  offline dialog, text fields, on-screen keyboard and bottom navigation. Check
  Burmese/Devanagari/Japanese/Chinese shaping, touch targets, keyboard Tab/Shift+Tab
  and Escape where a hardware keyboard is available, and VoiceOver labels/status
  announcements. Missing equipment means **NOT RUN**, not PASS.
- Record device speech separately from downloaded recordings. The last audio
  audit found no published Catalyst clips; real recorded-audio acceptance stays
  **BLOCKED** until recordings exist. Do not use paid generation for this test.
- Repeat with a separate record for iPad Safari, iPad Home Screen, Android Home
  Screen and a fresh desktop browser profile. Preserve existing installed apps.

Apple references: [Airplane Mode](https://support.apple.com/en-la/108785),
[fully turning Wi-Fi off](https://support.apple.com/en-nz/102412), and
[Home Screen web apps](https://support.apple.com/en-gb/guide/ipad/ipad8f1f7a29/ipados).
Menu wording varies with iPadOS. A Home Screen install is needed only if that
study instance does not already exist; do not replace an existing installation.

## Result record (one per device and study instance)

Copy this into a private note and report only the filled metadata/counts and
observations. Leave personal writing and backup contents on the device.

```text
Date/time (Japan):
Device / OS:
Mode: Safari / Home Screen / desktop browser
App URL: https://celeritas7.github.io/Catalyst/
App ID / Worker ID:
Target / meaning language:
Scope: prepared account / guest
Before-test sentence count:
Notebook + recovery files saved: PASS / FAIL / NOT RUN
App/text readiness: PASS / FAIL / NOT RUN
Account readiness: PASS / FAIL / NOT RUN (reason if guest)
Word sources: list each separately, with displayed counts/status
Cold offline reopen: PASS / FAIL / NOT RUN
Offline lesson / practice: PASS / FAIL / NOT RUN
Offline original + correction survive reopen: PASS / FAIL / NOT RUN
After-test sentence count:
Reconnect preserves writing: PASS / FAIL / NOT RUN
Interrupted draft / download: PASS / FAIL / NOT RUN
Files restore preview / merge / repeated import: PASS / FAIL / NOT RUN
Portrait / landscape / actual 200% zoom: PASS / FAIL / NOT RUN
Keyboard / VoiceOver: PASS / FAIL / NOT RUN
Recorded audio / device voice: PASS / FAIL / BLOCKED / NOT RUN
Displayed error or observation (no private text):
```

## Completion gate

F1–F5 remain pending until device-specific evidence is supplied. This PR's layout
fix and desktop results do not complete Phase 6F or authorize a new deployment,
production database change, source-permission change or paid audio generation.
Text-only acceptance may be recorded separately with explicit word/audio limits;
do not label all features ready from the app-file badge alone.
