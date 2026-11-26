# Phase 6I — Marathi meaning coverage

Checkpoint: 2026-11-27 (Japan), based on merged PR #30
(`1eaece6a1d726879a2bde248483a2edfb67d74fb`).

## Result and review boundary

The 27 missing Marathi meanings recorded in Phase 6G are now available: 23
Marathi-target examples and four English-target examples. There are 26 distinct
exact English glosses because the tea example occurs in both target languages.
All 218 bundled examples now resolve to a Marathi meaning. This measures
availability, not translation accuracy or a complete course.

| Target language | Examples | Marathi meanings before | After |
| --- | ---: | ---: | ---: |
| Japanese | 48 | 48 | 48 |
| Burmese | 50 | 50 | 50 |
| Chinese | 48 | 48 | 48 |
| Marathi | 48 | 25 | 48 |
| English | 24 | 20 | 24 |

The additions and 13 optional Marathi usage notes are authored **drafts**. They
have not received independent native-speaker review. Existing source `checked`
flags remain false; no reviewer, approval or source credential is invented.
Settings identifies meanings and usage notes as drafts, and Explore retains its
availability-versus-review distinction. A live online content override with an
unknown gloss still shows a gap and is excluded from translated quizzes.

## Provenance and exact sense decisions

Source: the existing public
[lesson pack at the merged checkpoint](https://github.com/Celeritas7/Catalyst/blob/1eaece6a1d726879a2bde248483a2edfb67d74fb/data/grammar.yaml)
and [Phase 6G's inventory](PHASE6G_CONTENT_COVERAGE.md). No external language
archive, private material, automatic model output or new source lesson was
imported. This table records the translation decisions for human review; it does
not certify the source pack's linguistic accuracy.

Each row below has target meaning language **Marathi**, script **Devanagari**,
and review status **draft / native-speaker review pending**. The default wording
is everyday Marathi; explicit request/register differences are retained. Source
locations are `concept:target-language:one-based-example`.

| Source location(s) | Exact English gloss | Draft Marathi meaning | Sense or register retained |
| --- | --- | --- | --- |
| `verb_final:mr:1` | I eat an apple. (male; a woman says खाते) | मी सफरचंद खातो. | Male speaker; separate note gives the female form. |
| `verb_final:mr:2` | My brother went to school. | माझा भाऊ शाळेत गेला. | Does not add “younger”; past event. |
| `modifier_before_noun:mr:1` | the book bought yesterday | काल विकत घेतलेलं पुस्तक | Buyer unspecified; no invented “I”. |
| `modifier_before_noun:mr:2` | a man who speaks Japanese | जपानी बोलणारा माणूस | Retains the male referent. |
| `modifier_before_noun:en:1` | the book that I bought yesterday | मी काल विकत घेतलेलं पुस्तक | “I” is explicitly the buyer. |
| `topic_wa:mr:1`, `topic_wa:en:1` | As for me, I'll have tea. | मी तर चहा घेईन. | Contrastive choice of tea. |
| `topic_wa:mr:2` | An elephant's trunk is long. (Marathi says 'of') | हत्तीची सोंड लांब असते. | Generic singular; relationship explained separately. |
| `subject_ga:mr:1` | Ram read the book. | रामने पुस्तक वाचलं. | Past reading event. |
| `subject_ga:mr:2` | Who came? (no marker) | कोण आलं? | Marker observation kept in a separate note. |
| `object_o:mr:2` | I know him. | मी त्याला ओळखतो / ओळखते. | Male object; source gloss leaves speaker gender unspecified. |
| `direction_ni_e:mr:1` | I'm going to Pune. | मी पुण्याला जात आहे. | Pune destination and current-going sense from the gloss. |
| `also_mo:mr:1` | I'll come too. | मीही येईन. | Coming, future, additive “too”. |
| `also_mo:mr:2` | I eat meat and fish too. | मी मांसही खातो / खाते आणि मासेही खातो / खाते. | Both food types, as in the source example; habitual eating. |
| `possessive_no:mr:2` | my car (गाडी is feminine, so माझी) | माझी गाडी | Agreement explanation separate from the noun phrase. |
| `tag_ne:mr:1` | It's very hot today, isn't it? | आज खूप गरम आहे ना? | Degree and confirmation tag retained. |
| `tag_ne:mr:2` | Do come tomorrow. | उद्या ये ना. | Familiar, insistent invitation/request. |
| `past:mr:1` | I watched a film yesterday. (agrees with सिनेमा) | मी काल सिनेमा पाहिला. | Past event; agreement note separate. |
| `past:mr:2` | I ate. (male) | मी जेवलो. | Male speaker, completed meal in the source context; not “already eaten”. |
| `future:mr:2` | I'm going to study Japanese next year. | पुढच्या वर्षी मी जपानी शिकणार आहे. | Planned future, distinct from a bare future or stated plan. |
| `ability:mr:2` | I won't be able to come tomorrow. | मी उद्या येऊ शकणार नाही. | Future inability. |
| `because:en:1` | I'm not going because it's raining. | पाऊस पडतोय म्हणून मी जाणार नाही. | The lesson's causal reading: rain is the reason for not going. Separate note discloses that reading. |
| `politeness:mr:1` | Where are you going? (polite) | तुम्ही कुठे जात आहात? | Respectful address, using the lesson's singular-addressee context. |
| `politeness:mr:2` | Where are you going? (to a friend) | तू कुठे जात आहेस? | Familiar singular address. |
| `politeness:en:1` | Could you sit down, please? | कृपया बसाल का? | Polite request, not a question about physical ability. |
| `counters:mr:1` | Give me three pens. | मला तीन पेन द्या. | Request for three pens, retaining “me”. |
| `counters:mr:2` | There are four of us. | आम्ही चार जण आहोत. | Speaker-inclusive group of four. |

Some source Marathi examples use habitual-looking verb forms where their English
gloss uses a current-going interpretation. The new natural meanings follow the
exact gloss and the recorded lesson context; they do not rewrite the source
example or make a universal grammar claim. These pairs remain candidates for
linguistic review. Existing 191 translated occurrences keep their prior strings.

## Behaviour and preservation

- `CatalystMeanings.translate` remains a string-or-null API with exact keys.
  No case, punctuation, spacing, parenthesis or sense normalization is added.
  Unknown prototype names such as `constructor` and `toString`, and non-text
  inputs, cannot masquerade as translated strings.
- `CatalystMeanings.note` returns optional Marathi guidance separately from the
  natural meaning. Notes appear only with revealed lesson meanings or after
  an answer/reveal in practice and adaptive review. They are not quiz options or
  stored answers. This is a small set of usage notes, not a translated grammar
  interface. English mode keeps the original exact gloss and its annotations.
- Distinct glosses remain independent even when their natural Marathi meanings
  happen to match. Quiz distractors still use distinct translated strings.
- Lesson IDs, source examples, quiz IDs, review scheduling, notebook schemas,
  originals, correction notes and account/device boundaries are unchanged.
- No migration, Supabase write, API key, paid generation or deployment is needed
  for the content changes. The normal compiled app update includes them offline.

## Validation

- Focused compiled-UI tests cover reveal/hide, polite/familiar notes, English
  switching, translated quiz options, note timing, preserved notebook bytes,
  existing review IDs/history and delayed correct recall.
- Coverage checks exercise all five bundled targets, all 218 translated
  examples, distinct quiz choices and late online content with an unknown gloss.
  That unknown gloss remains missing and its gap link opens the correct lesson.
- Exact-match tests cover unsupported contexts, malformed inputs, prototype
  names and key gender/tense/agency/register distinctions.
- Direct comparison against the merged base confirms 27 newly translated
  occurrences (26 glosses), with all 191 prior translated occurrences unchanged.
- All 155 tests pass with serial execution. The previous English-meaning review
  record also retains its ID and historical expected answer when the new Marathi
  meaning is used for a later due check.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release `aadadc01dbc77da77bfc`: 252 files, 11,609,321 bytes.

Physical Phase 6F iPad Files, Home Screen, Airplane-mode, VoiceOver and visual/font
acceptance remains pending. Compiled DOM fixtures do not establish those results.
The recent managed-browser page-enable timeout also leaves visual checks
unconfirmed; this phase does not reuse older screenshots as new evidence.

After the update, choose English or Marathi as the learning language and Marathi
as the meaning language. Explore should show 24/24 or 48/48 Marathi meanings.
Open the politeness lesson, reveal the meaning, and try its meaning practice to
see the separate usage note after answering.

Next bounded content phase: a sourced Burmese yes/no-question guided activity,
with explicit question/statement context, register and draft provenance.
Native-speaker review and physical device acceptance remain separate gates.
