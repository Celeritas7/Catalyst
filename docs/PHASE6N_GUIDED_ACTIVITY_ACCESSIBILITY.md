# Phase 6N — guided-activity keyboard and feedback access

Checkpoint: 2026-11-27 (Japan), based on merged PR #35,
`e61168e01592a8e62e11e78dfea7cce109d33c04`.

## Problem and result

Opening an activity removed the launcher without placing focus in the new view.
Step changes had no focus destination, and selecting or removing a sentence
chunk could disable or remove the focused button. Hint content and results also
needed stable, explicitly associated announcement regions and question groups.
The new navigation test fails on the merged release at its first focus check
and passes against this implementation.

All six existing guided activities now share the following behavior:

- Opening focuses the activity title; selecting a step or Previous/Next focuses
  its heading. Closing restores focus to that activity's card. This is inline
  content, not a modal: ordinary Tab/Shift+Tab remains available, with no focus
  trap, custom arrow-key navigation or positive tabindex.
- Adding a chunk moves focus to the first remaining available chunk, or Check
  order when complete. Removing one focuses the next selected chunk, the last
  remaining selected chunk, or the removed chunk's newly enabled bank button.
  Clear, Hint, Reveal and answer checks retain their initiating control.
- Chunk groups have names and keyboard instructions. Buttons distinguish Add
  from Remove, and a visible polite status reports selection counts/removal.
- Hint, build and choice feedback regions exist before an answer is entered.
  Their content updates with `role="status"` and `aria-atomic="true"`, without
  shifting focus. Each choice group references its own prompt; reveal controls
  reference their feedback. Reveals can be hidden. After an answer is selected,
  its persistent result is not misrepresented as a collapsed disclosure.
- Activity titles and summaries use the selected meaning language; target
  sentence spans and revealed answers retain their language tags.
- The writing field references its limit/self-review explanation. Keeping,
  resuming or explicitly copying older writing focuses the writing field, so a
  disappearing recovery button cannot strand focus. Changing a meaning removes
  an outdated draft-saved message. Storage failures keep writing and report the
  existing failure messages without moving focus away from the save action.
- Activity controls, disclosure summaries, links, fields, headings and cards
  have a visible focus outline. Step and card text is larger and wraps. Explicit
  focus placement accounts for the current header and bottom-navigation bounds;
  scroll margins also help ordinary keyboard navigation.

The implementation follows W3C guidance on
[focus order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html),
[status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
and the [status role](https://www.w3.org/TR/wai-aria-1.2/#status).
This bounded improvement is not a full accessibility-conformance claim.

## Preservation and scope

Activity definitions, all 218 core examples, meanings, review task IDs, scoring,
assistance/retry handling and account-scoped storage formats are unchanged.
All Phase 6M ownership and recovery tests remain included. No SQL, paid API,
production-data, cloud-sync or source-content publication change is included.
Adaptive review and other app screens are outside this keyboard review.

## Validation

- **177 tests pass**, using `node --test --test-concurrency=1
  tests/*.test.cjs tests/*.test.ts`. The four new compiled-UI tests cover all six
  activities' entry/step/close focus, add/remove/clear/reveal behavior, stable
  status nodes, question associations, save failure and retry, recovery focus,
  unsaved meaning edits and cancelled navigation.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release **`7f184c96af14164db8f2`**: 252 files, 11,658,772 bytes. Earlier release
  assets are retained for the existing update/recovery mechanism.
- Desktop Chromium: keyboard entry focuses the title, Build focuses the step,
  Tab/Space/Enter assembles the taught Burmese sentence, and Check order reports
  acceptance while retaining focus. Removing a middle chunk focuses the next
  selected chunk. Hint and choice feedback retain their control. Save/close
  returns to the matching card; reopening retains writing/meaning, and Keep
  draft for later moves focus to the now-empty writing field. Screenshots show
  the focus outline, readable Burmese and unobstructed controls at desktop size.
- Browser QA used fictional account data, a mocked backend, and a CSP blocking
  external requests and workers. The connected browser could not reach the
  workspace preview; the workspace Chromium browser completed the checks.

The accessibility tree and DOM checks do not prove spoken announcements in
VoiceOver/NVDA. Physical iPad touch/keyboard, Safari/Home Screen, Files handling,
offline cold startup and language pronunciation remain Phase 6F acceptance.
Browser zoom keys did not produce a verified size change, so enlarged-text and
mobile-layout acceptance are not claimed for this checkpoint.

## Physical follow-up

After downloading this version, use the existing Phase 6F backup-first checklist.
With a hardware keyboard, check title/step/close focus, Tab/Shift+Tab order,
Enter/Space chunk selection/removal and visible focus at actual 200% zoom. With
VoiceOver, verify question context, Add/Remove names, hints, results and save
errors without losing the current control. Check Keep/Resume draft and the
explicit older-writing path. Report unavailable equipment as NOT RUN.

## Next content work

The user's Japanese grammar formula notes are retained as planned work. The
next bounded content step is to review and map those sources: record each
formula's source, meaning, attachment/conjugation rules, exceptions, examples,
Marathi support and review status. Select a small pilot only after the relevant
notes have been fully read. Subsequent implementation batches can then add
explanations, worked examples and exercises without treating the private archive
as fully reviewed or authorized for wholesale publication.
