

## Plan: Dual-Tab Ask Rich — Policy + Parent Guide

### Problem
The `qanda` edge function only reads from the `knowledge_base` database table, which contains SEND reform/policy entries. The 7 deep neurodiversity research modules (PDA, behaviour as communication, co-occurring profiles, etc.) exist in TypeScript config files but were never inserted into the database. So Ask Rich can only answer about reforms, not about conditions themselves.

### Solution — 3 changes

**1. Seed neurodiversity research into the `knowledge_base` table**

Create a database migration that inserts the 7 research modules as new rows in the `knowledge_base` table with topics like "Neurodivergent Children Overview", "Behaviour as Communication", "Co-occurring Profiles" (which covers PDA, ADHD, dyslexia, etc.), "School Experience", "Family Experience", "What Works What Doesn't", and "Life Outcomes and Models". Status set to `active` so the existing DB query picks them up automatically.

This alone would improve answers significantly — the AI would have the full evidence base to draw from.

**2. Update the edge function to return an optional `parentGuide` tab**

Modify `supabase/functions/qanda/index.ts`:
- Expand the system prompt to instruct the AI: when a question is about understanding a condition, profile, or lived experience (not just reform policy), also return a `parentGuide` object
- New JSON field structure:
```json
{
  "parentGuide": {
    "title": "Understanding PDA",
    "overview": ["paragraph 1", "paragraph 2"],
    "whatHelps": ["strategy 1", "strategy 2"],
    "whatToAvoid": ["approach 1"],
    "encouragement": "A closing message of warmth"
  }
}
```
- Field is optional — only generated when the question warrants it
- Update hardcoded `lastUpdated` from "23rd February 2026" to "16th March 2026"
- Add internal page routes for `/understanding-adhd`, `/understanding-autism`, `/understanding-your-child`

**3. Add `parentGuide` type and dual-tab UI**

- **`src/components/qanda/types.ts`**: Add optional `parentGuide` field to `QandAAnswer`
- **`src/components/qanda/AnswerDisplay.tsx`**: When `parentGuide` is present, render a tabbed interface using the existing `Tabs` component:
  - Tab 1 (default): **"Understanding this"** — warm, parent-focused content with title, overview paragraphs, "What helps" list, "What to avoid" list, and an encouraging closing message
  - Tab 2: **"What the reforms say"** — the existing structured policy answer
- When `parentGuide` is absent, render exactly as today (no tabs)

### What changes for users

A parent asking "Tell me about PDA" will see two tabs:
- **Understanding this** (shown first) — empathetic, evidence-based explanation in Rich's voice
- **What the reforms say** — how it fits into the current policy landscape

Questions purely about reform ("Will EHCPs be abolished?") show no tabs, just the existing format.

