# Phase 6P — Japanese hearing in context

Checkpoint: 2026-11-27 (Japan), after merged PR #37 at
`1391e64b0a092ef5835ac3befbab4e7c2c915757`.

## Result and scope

One draft Japanese guided activity, `ja-hearing-possibility`, implements the
JP-F01 hearing comparison selected in [Phase 6O](PHASE6O_JAPANESE_FORMULA_REVIEW.md).
Choose Japanese in Settings, then open **聞こえる की 聞ける?** in Today or
Explore. It is also linked from the `ability` lesson (`#ability`). English
meanings show the title **聞こえる or 聞ける?**.

The activity uses Situation → Notice → Build → Choose → Use. Notice shows
authored form changes with separate kana readings and Marathi/English
explanations:

| Expression | Worked forms | Context in this activity |
| --- | --- | --- |
| 聞こえる | 聞こえる → 聞こえます / 聞こえません | Sound reaches the listener, or noise prevents that |
| 聞ける | 聞く → 聞ける → 聞けます / 聞けません | A recording is available to play, or access is unavailable |

聞こえる is a separate lexical verb, not another potential conjugation of
聞く. The group-1 く → ける explanation applies to this worked verb; there is
no general conjugation engine. The distinction is taught through situations,
not a blanket rule that every English “can hear” maps to one expression.

## Authored examples and answer scope

Four new examples append to the Japanese `ability` entry. Existing indices 1–2,
all other language examples, concept IDs and previous activity IDs remain intact.
All four have kana readings, exact English glosses, draft Marathi meanings and
separate Marathi usage notes. The notes are not scored answers.

| Stable example | Japanese | Intended situation |
| --- | --- | --- |
| `ability:ja:3` | 外から鳥の声が聞こえます。 | Birds are audible from a quiet room |
| `ability:ja:4` | 周りがうるさくて、先生の声が聞こえません。 | Noise drowns out a teacher's voice |
| `ability:ja:5` | このサイトで授業の録音が聞けます。 | An example website offers recordings to play |
| `ability:ja:6` | パスワードがないので、録音が聞けません。 | A missing password prevents opening a recording |

The recordings and website are fictional language-practice situations, not a
claim that Catalyst has published lesson recordings. The four choice answers,
in activity order, are 聞こえます, 聞けます, 聞こえません, 聞けません.
Questions state the intended meaning before asking for a form. Distractors are
contrasts for that intention, not claims that a form is universally ungrammatical.

The build prompt explicitly asks for 外から first and joins the three authored
chunks without spaces. Its accepted order is limited to that prompt; the
explanation does not reject other Japanese discourse orders. Free writing asks
for two situations and stays self-reviewed. Notebook saving does not grade or
complete an activity. Hints/reveals retain existing assisted-answer behavior.

## Content provenance and review

The learning idea is mapped to private source alias JN01 in Phase 6O. These are
fresh examples and explanations; private originals, personal examples, file
identifiers and copied third-party passages are not included. Authored examples
are pinned to content commit
[`c49e669f904cc2c163701f81b9ea6bdf7990453a`](https://github.com/Celeritas7/Catalyst/blob/c49e669f904cc2c163701f81b9ea6bdf7990453a/data/grammar.yaml).

Primary references consulted for the distinction and formation:

- [Japan Foundation: potential forms and perception verbs](https://www.kyozai.jpf.go.jp/kyozai/material/BTS00063/ja/render.do)
- [TUFS: potential-form formation](https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/074.html)
- [TUFS: perception expressions](https://www.coelang.tufs.ac.jp/mt/grammar/gmod/contents/card/048.html)

Language, script, register, intended sense, provenance and draft status are
explicit. Independent review of Japanese naturalness, readings, distractors
and Marathi phrasing remains pending. Reference checks and test results do not
change this to native-speaker-approved material.

## Bundled and online content

The bundled `ability` summary, Japanese/English notes and Japanese–Burmese pair
note no longer say that Japanese has one “can”. They distinguish potential
forms, audible sound and context-dependent English glosses without treating
an isolated translation as permission.

There are now **222 bundled examples** across 24 concepts, including 52 Japanese
examples, and **7 guided activities** (2 Japanese, 5 Burmese). Every bundled
example has a Marathi meaning available; availability does not certify accuracy.

The guided activity is bundled and works with either the older online lesson
rows or the offline lesson pack. The existing content-source precedence is
unchanged: when Supabase supplies lessons, its older general `ability` summary,
notes and two Japanese examples remain until a separately approved hosted
content update. Coverage reports the actual loaded lesson examples separately
from the bundled activities; it must not report 52 online Japanese examples
when only the earlier content is loaded. Offline/bundled study uses the corrected
summary and all six Japanese ability examples.

`sql/catalyst-seed.sql` and the generated first-install bundle reflect the authored
source. They were regenerated for consistency only. The first-install bundle
rejects an existing installation and must not be used as an upgrade. No SQL was
applied, no production rows changed, and no paid generation was activated.

## Verification

The release is `528de2291926f04cffe5`. The new UI checks cover both meaning
languages, separate form/reading semantics, positive and negative context keys,
assisted builds, independent review records, failed notebook writes, safe retry,
duplicate prevention, older correction preservation, lesson revisiting and
account isolation. A prepared offline remount verifies the password context
against the same-option noise context without changing its sibling history.
An older-online-content fixture verifies that the bundled activity remains
available and coverage does not invent hosted examples.

The content audit rejects incomplete guide translations or readings and keeps
pinned source references valid. Existing accessibility checks include the new
activity. All **181 tests pass**. `check:app`, `check:content`, `check:build`,
`check:backend` and `git diff --check` pass. The release inventory contains 252
files (11,678,852 bytes). A comparison with the merged base confirms that all
six earlier activity definitions, all earlier examples and the other 23 concepts
are preserved.

Synthetic Chromium checks used a fake account/backend and blocked real network
connections. Keyboard entry, step focus, chunk assembly, all four choices,
Marathi guidance with optional English, notebook saving and repeated-save
protection passed. Form guides were visually checked at desktop width and in
320px/768px iframe viewports; neither frame had horizontal content overflow.
These layout checks do not emulate Safari or certify a physical iPad, Home
Screen reopening, enlarged text, VoiceOver or speech/audio quality.

## After merging

1. Obtain the normal app update without clearing website data; check the release
   ID above in Study offline.
2. Select Japanese, open the hearing activity in Today or Explore, and inspect
   Notice in Marathi. Enable Show English if useful.
3. Try the four Choose situations, then save your own writing and intended
   meaning to the notebook. Confirm the original and any earlier notes remain.
4. For offline use, prepare the new app version while connected before leaving
   Wi-Fi. Physical iPad acceptance remains under Phase 6F.

Next: **Phase 6Q — seeing, 見える versus 見られる**, as a separate bounded
activity with fresh visibility/viewing-opportunity examples. Explain that
見られる can have passive/honorific readings elsewhere; do not include those
senses or colloquial 見れる in the first scored batch. Broader formula families,
hosted content publication, independent language review and the remaining device,
audio and cloud-sync work retain their separate scope.
