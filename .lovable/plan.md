

## Fix 1: Add questions alongside answers in the PDF

**The problem**: In `src/lib/generate-profile-pdf.ts` (lines 428-453), the PDF collects only answer values without their question labels, then joins them into a single paragraph. This produces the contextless output you described.

**The fix**: Change the "In [name]'s parent's words" block to render each answer as a **question label in bold** followed by the answer text underneath. Same treatment for child voice answers (lines 457-481). This gives every answer its context.

**Before**: `"Over an hour. He wakes two or three times a week..."`
**After**:
```text
How long does it take your child to fall asleep?
Over an hour.

How often does your child wake during the night?
He wakes two or three times a week. Usually between 2 and 4am...
```

Each Q&A pair rendered inside the warm background box, with the question in bold and the answer in normal weight below it.

## Fix 2: Add a one-page "Conclusion" summary

**The change**: Add a new section to the AI system prompt in `supabase/functions/generate-profile-report/index.ts` requesting a **Conclusion** block after "Some Things That May Help". This should be a one-page overview summarising the whole child — who they are, what matters most, and the key priorities — drawing on everything across all sections.

**PDF changes** in `src/lib/generate-profile-pdf.ts`:
- Parse the new `__conclusion__` block from the AI output (in `parseAIReport`)
- Render it as its own page between "Some Things That May Help" and the parent's closing statement
- Title: "Conclusion" with the same navy heading and accent line styling as other pages

**AI prompt addition** (appended after the "Some Things That May Help" rules):
```text
After the Some Things That May Help block, produce a final block headed Conclusion.
This is a one-page summary of everything in this profile. It should read as a 
standalone document that a professional could read in two minutes and understand 
who this child is, what they need, and what matters most. Written in your voice. 
No more than 400 words.
```

## Files to change

1. **`src/lib/generate-profile-pdf.ts`** — render Q&A pairs with labels; add Conclusion page
2. **`supabase/functions/generate-profile-report/index.ts`** — add Conclusion instruction to system prompt
3. **`src/components/child-profile/FinalScreen.tsx`** — update `buildProfileText()` to ensure question labels are clearly marked (already partially done, but worth ensuring consistency)

