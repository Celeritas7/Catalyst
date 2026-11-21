# Personal sentence notebook

## Restore an exported notebook

1. Select the learning language used in the export (for example, Burmese).
2. Open My Learning → My sentence notebook → Import / restore notebook.
3. Choose your `catalyst-notebook-*.json` file.
4. Check the destination and preview. Choose **Import into this notebook**.

The destination is the current account's notebook on this device, or the guest
notebook when signed out. The file does not choose an account or sign you in.
Nothing is written until you confirm the preview. You can cancel at any time.

Import merges with existing writing. It keeps existing originals, meanings and
notes, adds missing correction notes, and preserves conflicting versions as
separate sentences. Repeating an import does not duplicate the same records.
If another tab changes this notebook after the preview, review the refreshed
counts and confirm again. Wrong-language files are rejected; change your learning
language in Settings and choose the file again.

Version 1 JSON exports are supported, up to 5 MB and 10,000 entries per import.
Invalid fields or unsupported formats are rejected as a whole. Keep the original
export if you see an error. A failed save leaves the preview available for retry;
no successful import is reported until storage accepts the complete notebook.

## Save guided writing

Open a guided activity's **Use it yourself** step. Write your sentence and,
optionally, what you intended to say in your selected meaning language. Tap
**Save to notebook**, then **Open notebook**. The activity name and any available
lesson link appear alongside your unchanged original. Add corrections separately.

Saving the same activity writing and meaning again does not duplicate it. Editing
the writing or meaning and saving creates another original attempt. Saving does
not grade the sentence or complete the activity. Existing **Save draft** and
**Complete activity** controls retain their previous behavior; the optional
meaning in the notebook section is saved with **Save to notebook**.

## Storage and privacy

All notebook operations use this device's browser storage, separately for each
account (or guest) and learning language. Imports are read in the browser without
uploading their contents. Signing in does not move guest writing automatically;
you can export it, sign in and explicitly import it into your account notebook.
This separation is organizational, not encryption against someone with access to
the same browser. Export periodically to retain a copy outside the browser.

No shared vocabulary, ratings, Supabase schema or Akatsuki contracts are modified.
