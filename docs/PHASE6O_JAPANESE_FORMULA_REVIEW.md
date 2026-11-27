# Phase 6O — Japanese formula source review and lesson mapping

Checkpoint: 2026-11-27 (Japan), after merged PR #36 at
`300f22f0d0bd71bd8d47fee4cd821dc15562ab92`.

## Result

The notes contain a useful comparison-based learning method, but they are not
a ready-to-import course. This phase maps **16 selected formula families** to
the current app and selects **聞こえる versus 聞ける** for the next bounded
implementation, Phase 6P. It completes the source-review step recorded in
Phase 6N; it does not add a lesson or change the published application.

[The structured map](japanese-formula-map.json) records source aliases,
attachment/conjugation review, meaning, limits, example needs, Marathi support,
existing concept/activity IDs and blockers for every mapped family. None is
marked linguistically approved. The statuses describe development readiness,
not correctness scores or learner progress.

## What was read

Four private documents were selected: a substantial pattern-comparison draft,
a separate conditional-comparison draft, foundational pattern notes and a
short conjunction list. The first three were read through their complete body
text and table structures from the original DOCX files, including the nested
table in the pattern notes. Headers and footnote/endnote parts were inspected.
The fourth was read through the complete connector-provided text.

Ruby readings were kept separate from base Japanese text during inspection;
flattened text had omitted some characters. Repeated cells and alternative
drafts were not counted as independent formulas. The November conditional
copy is narrower than the March pattern document, so its later modification
date does not make it a replacement for the whole document. Page rendering and
a complete visual-layout audit were not performed.

The owner's private companion source register records exact files, locations,
modification times, downloaded-file hashes and table/row locators. This public
repository contains generic grammar summaries, opaque source aliases and
public references; it contains no private originals, personal conversations,
Drive identifiers or copied third-party lesson transcripts. Source access
does not establish permission to redistribute material embedded in the notes.

The earlier archive inventory remains separate. This is not a new count of
the whole Language_package, nor a claim that all its files or formulas have
been reviewed. The larger workbooks, chart documents, other pattern revisions,
and the unselected families remain outside this bounded map.

## Mapping to the current app

“Related” means a suitable existing concept or activity was found, not that
the source's full explanation is implemented. New senses must not be attached
to a lesson merely because they share a particle or English gloss.

| Family | Current coverage | Decision |
| --- | --- | --- |
| JP-F01 Hearing | `ability` gives general potential examples | First pilot |
| JP-F02 Seeing | Same general `ability` concept | Follow after hearing |
| JP-F03 General potential | `ability` | Review scope and formation |
| JP-F04 Prior experience | `experience` | Review count/meaning shortcut |
| JP-F05 Ease/difficulty | No dedicated concept/activity | Fill empty source sections |
| JP-F06 Conditions/concession | No dedicated concept/activity | Reconcile drafts, split lessons |
| JP-F07 Completion/contractions | No dedicated concept/activity | Correct formation/register |
| JP-F08 Without doing | No dedicated concept/activity | Review negative-base formation |
| JP-F09 Nominalization | No dedicated concept/activity | Review overlap and fixed expressions |
| JP-F10 Aspect/state | `progressive` | Resolve conflicting columns |
| JP-F11 Preparation/result | No dedicated concept/activity | Review viewpoint/particles |
| JP-F12 Reason/concession | `because` covers reasons only | Separate senses and register |
| JP-F13 Desire/plans | `want_tai`, `future` | Review viewpoint and attachment |
| JP-F14 Comparisons | No dedicated concept/activity | Complete comparison contexts |
| JP-F15 Respectful/humble forms | `politeness` covers basic endings | Separate social-role review |
| JP-F16 Topic transitions | `ja-topic-transitions` already exists | Keep; do not duplicate |

## Corrections needed before import

The notes mix finished explanations with headings, empty cells, placeholders,
copied excerpts and personal examples. Several tables disagree with other
tables in the same file. These are review findings, not changes to the originals.

- Hearing/seeing must not be taught as two interchangeable potential
  conjugations. The potential forms and lexical perception verbs need distinct
  records. The comparison is supported by the Japan Foundation's
  [potential-form explanation](https://www.kyozai.jpf.go.jp/kyozai/material/BTS00063/ja/render.do)
  and TUFS's [perception overview](https://www.coelang.tufs.ac.jp/mt/grammar/gmod/contents/card/048.html).
- Several source conjugation shortcuts are inconsistent with their examples;
  contraction and negative-joining tables require a verb-class review. Do not
  turn the source's shorthand into a general conjugation algorithm.
- Conditional tables contain contradictory restrictions, shifted examples and
  context-free correctness marks. Keep them outside scored practice until
  their intended situations and accepted alternatives are reviewed.
- The nominalizer shortcut is too broad. The Japan Foundation's
  [こと/の explanation](https://www.jpf.go.jp/j/project/japanese/teach/tsushin/grammar/201112.html)
  describes both overlap and restricted environments. The copied transcript
  embedded in the notes is not an import asset.
- Aspect, experience, preparation and politeness tables need separate semantic
  checks. Their presence in the notes does not validate the existing app's
  corresponding summaries or justify copying blank/misaligned entries.

## Phase 6P implementation contract

Build one draft Japanese activity, proposed ID `ja-hearing-possibility`, linked
to `ability`. Keep the first batch to two expressions and explicit contexts:

| Target | Form focus | Intended contrast |
| --- | --- | --- |
| 聞こえます / 聞こえません | Inflect the lexical verb 聞こえる | Sound is or is not audible |
| 聞けます / 聞けません | 聞く → 聞ける; then polite inflection | Conditions permit or prevent listening |

The formation follows [TUFS's potential-form explanation](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/074.html).
Use the source's Marathi comparison as a starting point, then author complete
natural Marathi and English explanations. A short Marathi label alone is not
an answer key. No second potential transformation is applied to 聞こえる.

Author a small set of fresh examples: an audible sound, a sound obscured by
noise, available access to a recording, and a situation preventing access.
Choose the final sentences and readings during implementation. The questions
must state the intended situation; a bare translation of “can hear” is too
ambiguous for a single accepted answer. Exclude asking a question, metaphorical
“sounds like”, hearing impairment labels and the seeing pair from this pilot.

Use the existing notice/build/choose/write activity flow. Teach a worked form
change before chunk practice, pin only the authored accepted orders, and retain
self-reviewed free writing. Add draft language/script/register/sense/provenance
metadata, public references and stable example references. Keep target text,
reading, natural meaning and explanation separate. The source alias records
the origin of the learning idea; it does not imply that the examples were copied.

Before shipping that activity, revise the overly broad “Japanese has one
'can'” framing in `ability` and review its Japanese note and relevant pair
notes. Add only the examples needed for this pilot to `data/grammar.yaml`,
regenerate bundled data and the content inventory, then build the offline
release. Generated SQL is not authorization to apply it to a database.

Implementation checks must cover the chosen contextual answers and distractors,
negative forms, reading/meaning availability, chunk assembly, source/example
references and the Japanese-only activity placement. Run the existing review,
account-isolation, draft/recovery, keyboard and offline checks. Revealed or
assisted answers must retain their current review behavior. New examples and
Marathi explanations remain drafts until an independent linguistic review.

Seeing can follow in a separate batch using the same approach. Conditions,
nominalizers, contractions and broader respectful language require their own
source correction passes. No automatic grammar engine, paid generation,
cloud sync or full-archive import is part of the first pilot.

## Validation and remaining gates

This change is documentation and a documentation-side JSON map only. The map
was checked for unique family IDs, valid source/reference aliases, existing
concept/activity links, all required review fields and exactly one selected
pilot. Markdown links and the repository diff were checked. Existing content
and release verification remain unchanged; no runtime files or learner data
were edited.

Physical iPad/Safari/Home Screen and VoiceOver acceptance under Phase 6F,
production audio publication, cloud sync and independent language review remain
separate work. This phase produces no new app version to test on the iPad.
