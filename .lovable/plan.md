

## Ask Rich and Search Tools: Full Architecture Audit

### The Problem You Noticed

You asked "my child is still non-verbal at 6, what have done wrong?" and got an adequate but underwhelming answer. You remember having much richer, deeper content written for exactly this kind of question. You are right. Here is why the answer fell short.

---

### How It All Fits Together

There are **three AI-powered tools** on the site, plus one client-side config that is no longer connected to any of them:

```text
TOOL                WHERE                    AI MODEL                    KNOWLEDGE SOURCE
─────────────────   ──────────────────────   ─────────────────────────   ─────────────────────────────
Ask Rich (qanda)    /questions-and-answers   google/gemini-3-flash       knowledge_base DB table (176 rows)
                    Homepage embed                                       
                    Landing page preview                                

Guide Me            Homepage wizard          google/gemini-2.5-flash     No DB. Hardcoded page list in prompt.

Profile Report      /my-child-profile        google/gemini-3-flash       knowledge_chunks DB table (157 rows)
                                                                         + profile answers from user

Client-side config  src/config/knowledge-    NOT USED BY ANY AI TOOL     7 deep research TS files
                    base/*.ts                                             (neurodivergent-children-overview,
                                                                          behaviour-as-communication,
                                                                          family-experience, etc.)
```

### The Core Problem: Two Disconnected Knowledge Bases

**This is the main issue.** You and I built seven deeply researched TypeScript knowledge modules containing thousands of words of expert-level content about:

1. **Neurodivergent Children Overview** — early signs, masking, uneven profiles
2. **Behaviour as Communication** — episode cycles (meltdown, shutdown, panic, rage), polyvagal framework
3. **School Experience** — sensory environment, exclusions, attendance
4. **Family Experience** — parenting pressure, sleep, sibling impact, trauma load
5. **Co-occurring Profiles** — Autism+ADHD, PDA, RSD, dyspraxia
6. **What Works/What Doesn't** — evidence-rated strategies, collaborative problem solving
7. **Life Outcomes and Models** — Polyvagal, neurodevelopmental frameworks

**None of this content reaches Ask Rich.** The `qanda` edge function reads from the `knowledge_base` database table (176 rows). The TypeScript config files in `src/config/knowledge-base/` are imported by the client-side code but are never sent to the AI. They exist in the codebase but the AI never sees them.

The database table contains mostly reform/policy content (white paper, EHCPs, funding breakdowns, leaks) plus a handful of the deep research entries (Behaviour as Communication and Co-occurring Profiles were seeded). But the full richness of the family experience, school experience, what-works evidence, and neurodivergent children overview appears to be partially or entirely missing from the DB.

### What This Means for the Non-Verbal Question

When you asked about a non-verbal 6-year-old, Ask Rich had:
- Reform policy content (EHCPs, white paper, funding) — available
- Some neurodivergent overview — partially available
- Family experience content about parenting pressure, sleep, trauma — **not available to the AI**
- Episode cycles, masking, communication profiles — **partially available**
- What works evidence, strategies — **not available to the AI**

So the AI gave a competent but generic answer using what it had: reform facts and basic EHCP guidance. It missed the rich, empathetic, deeply informed parenting content that you wrote precisely for this kind of question.

---

### The Second Problem: Prompt Architecture

The system prompt in `qanda/index.ts` is strong on voice and structure. But it dumps **all 176 knowledge base entries** into a single prompt on every request. No filtering, no relevance matching. The profile report function uses text search on `knowledge_chunks` to find relevant content. Ask Rich does not. It sends everything.

This means:
- The AI gets ~100K+ characters of context, most of it irrelevant to the question
- The signal-to-noise ratio is poor — the AI has to find relevant content in a wall of policy text
- Reform/policy content overwhelms the neurodivergent-child content simply by volume

---

### The Third Problem: Duplicate AI Systems

There is also a **second system prompt** for Ask Rich in `src/config/ai-prompts.ts`. This file is imported by... nothing in the edge functions. It is client-side only. It was the original prompt, now orphaned. The actual prompt lives in `qanda/index.ts`. So there are two versions of Rich's voice rules, and only one is used.

---

### What We Have That We Do Not Need

| Item | Status |
|------|--------|
| `src/config/ai-prompts.ts` | Orphaned. Not used by any edge function. The real prompt is in `qanda/index.ts`. |
| `src/config/knowledge-base/*.ts` (7 files + index) | Orphaned from Ask Rich. Only imported client-side. Never sent to the AI. |
| `src/config/knowledge-base.ts` (the old monolith) | Imports the modular files but is not used by edge functions. |
| Client-side `checkForRefusal()` in `types.ts` | Duplicates guardrail logic. The AI prompt already handles refusals. Client-side blocking on "my child" would prevent the question from ever reaching the AI — but "individualCases" is excluded from client blocking, so it works by accident. |

---

### What Is Not Clear

1. **Were the 7 deep research TS files ever seeded into the DB?** Some topics appear (Behaviour as Communication = 7232 chars in DB), others may be missing or truncated.
2. **Are there duplicate rows in `knowledge_base`?** The query showed 176 rows but only 144 unique topics — meaning 32 duplicate entries cluttering the context.
3. **Is the `knowledge_chunks` table (used by profile reports) kept in sync with `knowledge_base`?** They appear to be separate pipelines.

---

### Where Other AIs May Have Made Things Worse

The `process-update` edge function uses AI to process new content and auto-insert into `knowledge_base`. This is how duplicate rows likely appeared (the same white paper content processed multiple times). Each processing run may have created slightly different topic names or chunking, diluting rather than improving the knowledge base.

---

### Recommended Fix (Before the Reimage)

**Phase 0: Knowledge Base Repair** — before changing any navigation or UI:

1. **Seed the missing deep research content** — Take the 7 TypeScript knowledge modules and insert them into the `knowledge_base` table so Ask Rich can actually use them.

2. **Deduplicate the knowledge base** — Remove the 32+ duplicate rows that are adding noise.

3. **Add relevance filtering to Ask Rich** — Instead of dumping all 176 entries into the prompt, use text search (like the profile report already does with `knowledge_chunks`) to send only the 10-15 most relevant entries for each question.

4. **Clean up orphaned files** — Remove or archive `src/config/ai-prompts.ts` and decide whether the TS knowledge modules should remain as a source-of-truth or be fully replaced by the DB.

### What This Would Not Change

- No database table changes (just inserting/cleaning data in existing tables)
- No edge function signature changes
- No UI changes
- No changes to "This is me" or profile generation

