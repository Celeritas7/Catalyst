# Language preference and content contract

`js/catalyst-preferences.js` owns the registry and version-2 preference normalization. Each registry entry has a code, display/native name, font class and text direction. Additional languages require real content and correct font/direction metadata before becoming selectable targets. Target availability is derived from entries with examples. Keep pair-key order stable when extending the registry so old comparison data remains readable.

Independent stored preferences:
- targetLanguage: one language used by meaning/form quizzes and the first lesson tab.
- anchor: grammar reference or `none`; does not translate explanations.
- meaningLanguage: selected from available translation packs (currently mr/en).
- interfaceLanguage: selected from available interface packs (currently en only).
- comparisonLanguages: optional lesson comparisons. Connections questions include the target language.
- showEnglish: optional secondary sentence meaning / quiz feedback; default false.

Legacy `anchor`, `show`, learned IDs, practice totals and lastConcept are preserved. The first previously enabled study language becomes the initial target; the others become comparisons. The normalized meaning language is then independent of reference changes. Unknown registry codes are filtered rather than causing render failures. No startup URL mutation is required, preserving OAuth callbacks.

Content must keep target text, readings/transliteration, natural meaning, grammar explanation, provenance and review status distinct. Devanagari transliteration is a pronunciation aid, not a Marathi meaning. Existing fields remain compatible; current English explanations are identified as such in Settings. Do not claim language-localized grammar notes until an explanation pack exists.

Current meanings use exact English source gloss keys in catalyst-meanings.js. This is deliberately conservative: never infer equivalent meanings from example positions. Unknown glosses produce a visible missing-translation message and are excluded from translated quizzes. For a future import, introduce stable example/meaning IDs and explicitly linked translations, retaining legacy gloss resolution during migration. Distinct meanings, tense, speaker identity and grammatical notes must not be collapsed by string normalization. Language/script/register and review status must be explicit in imported material.

Changing target/meaning/reference/comparison preferences resets only the active practice UI so a stale question deck cannot continue under different labels. Saved answer history remains intact. Interface translations can be added to the registry only after the relevant interface strings and fallback disclosures are implemented.

Phase 6G exposes availability in Explore and records the bundled baseline in
`docs/content-coverage.json`. Update it with `npm run inventory:content`; CI checks
it with `npm run check:content`. Counts use the currently loaded target examples
and exact gloss resolution, separately from guided activities. Neither a count
nor the legacy `checked` flag proves linguistic review. Preserve provenance,
reviewer evidence, register and sense when expanding content; unresolved repeats
remain separate until their context has been reviewed. See
[the coverage checkpoint](PHASE6G_CONTENT_COVERAGE.md) for measured gaps and limits.

Guided activities may declare a build `joiner` of `''` for authored grammar
pieces that touch in writing; omitted joiners retain the legacy space. Use the
same assembler for displayed accepted answers and activity/review records.
Do not infer Burmese word boundaries by splitting the text. Phase 6H's draft
metadata includes language, script, bilingual register/sense/provenance and
pinned example references; the inventory validates these and keeps older
pilots' missing structured metadata explicit.
