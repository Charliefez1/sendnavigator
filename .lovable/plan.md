

# Iterative Upgrade Plan for My Child: A Profile

## A. Feasibility Statement

| Capability | Feasible | Notes |
|---|---|---|
| Dashboard first report | Yes | The in-app `ReportPreview` already exists. Needs elevation to a proper "Report Dashboard" with per-section cards and richer layout. |
| Section level editing and regeneration | Yes | Requires a new edge function that accepts a single section plus shared context. Accept/reject UI is straightforward state management. |
| Mini report and full report | Yes | Achievable by defining a subset map of section indices and question IDs. Full upgrade unlocks the remainder without losing answers. |
| Export options (PDF download or email) | Yes | Both already work. Needs a cleaner UI to offer the choice from the Report Dashboard. |
| Persistence with explicit consent | Yes | `saved_profiles` table exists with 14 day expiry. Needs a `consent_given_at` column, delete and export endpoints, and a consent screen. |
| Knowledge base usage clarity | Confirmed below | No external web calls at runtime. |

### Knowledge Base Clarity

The app uses `knowledge_chunks` (a Supabase table with `tsvector` full text search) inside the `generate-profile-report` edge function only. It searches for relevant passages using extracted keywords from the parent's input and injects up to 5 chunks as context for the AI. No Lovable AI model or runtime feature pulls external web information automatically. The Q&A function (`qanda`) also searches `knowledge_chunks` and `knowledge_base` but never fetches from the open web. The only external API calls are to Anthropic (report generation) and Perplexity (news tracker, admin only). No disabling is needed because no runtime web retrieval exists for end users.

---

## B. Data Model Changes

### Modified table: `saved_profiles`

Add columns via migration:

```sql
ALTER TABLE saved_profiles
  ADD COLUMN consent_given_at timestamptz,
  ADD COLUMN report_mode text NOT NULL DEFAULT 'full',
  ADD COLUMN ai_report jsonb;
```

- `consent_given_at`: null means session only (no persistence beyond current use). Non-null means the user explicitly consented.
- `report_mode`: `'mini'` or `'full'`.
- `ai_report`: stores the structured AI report JSON so it can be loaded back when returning.

No new tables needed. The existing `saved_profiles` with access code pattern remains the record. No user authentication required (matches current design). No audit log table needed because the `saved_profiles` row itself tracks `created_at`, `expires_at`, and `consent_given_at`.

---

## C. Front End Component Plan

### New and modified screens

```text
Stage Flow (updated):

opening → setup → [NEW: mode-select] → builder → dashboard → final → report-loading → report-dashboard
                                                                                          │
                                                                              ┌─────────────┴──────────────┐
                                                                              │ Per-section cards          │
                                                                              │ Accept / Reject per section│
                                                                              │ Edit → regenerate section  │
                                                                              │ Download PDF or Email      │
                                                                              │ Upgrade mini → full        │
                                                                              └────────────────────────────┘
```

| Component | Status | Description |
|---|---|---|
| `ModeSelectScreen` | New | Simple choice: "Mini profile (core sections)" or "Full profile (all 22 sections)". One screen, two buttons. |
| `ReportDashboard` | New (replaces `ReportPreview`) | Per-section cards showing AI insight with accept/reject toggle. Summary cards at top (At a Glance, Ways of Working, Conclusion). Edit button per section returns to builder at that section. Regenerate button per section. Export bar at bottom (Download PDF / Email me a copy). |
| `SectionRegenConfirm` | New | Modal or inline: shows old vs new AI output for a single section. Accept or reject buttons. |
| `ConsentScreen` | New | Shown when user wants to save progress or return later. Captures explicit consent with timestamp. Offers "Delete my data" and "Export my data" actions. |
| `ProfileBuilder` | Modified | Filters visible sections based on `report_mode`. Shows "Upgrade to full" prompt if in mini mode. |
| `FinalScreen` | Modified | Minor: remove redundant consent (moved to dedicated screen). |
| `MyChildProfile.tsx` | Modified | Add `mode-select` stage. Pass `reportMode` to builder. Add section regeneration handler. |

### Mini report section mapping

Define in a new config `src/config/mini-profile-sections.ts`:

```typescript
// Indices of the 8 core sections for mini report
export const MINI_SECTIONS = [0, 3, 5, 6, 9, 10, 11, 13];
// Environment, Nervous System, Sensory, Executive Function,
// Masking, Communication, Behaviour, Strength Profile
```

Full report uses all 22. When upgrading from mini to full, existing answers are preserved. The builder simply shows additional sections.

---

## D. Edge Function Plan

| Function | Status | Purpose |
|---|---|---|
| `generate-profile-report` | Exists, no change | Full report generation. Already returns structured JSON. |
| `regenerate-section` | New | Accepts: `sectionIndex`, `sectionTitle`, `sectionText` (parent + child answers for that section), `childContext` (child name, reason, 2 sentence summary). Returns: single `sectionInsight` object with the same shape as one entry in `sectionInsights[]`. Uses the same system prompt rules but scoped to one section. Uses Anthropic with max_tokens 1000. |
| `save-profile` | Exists, modified | Accept optional `ai_report` and `consent_given_at` fields. On save, store them. On load, return them. Add a `delete` action that removes the row. Add an `export` action that returns the full profile JSON. |
| `email-profile-report` | Exists, no change | Already sends formatted HTML email via Resend. |

### `regenerate-section` prompt structure

The system prompt will be a trimmed version of the existing one (same voice rules, same banned words, same framing) but scoped to produce only the three paragraph output for a single section. It will receive a short context summary (child name, reason, top needs) plus the full section answers. Returns JSON: `{ sectionIndex, sectionTitle, reflection }`.

---

## E. Security Plan

| Area | Approach |
|---|---|
| Authentication | None required (current design). Access is via 8 character alphanumeric codes. No user accounts. |
| RLS on `saved_profiles` | Stays as-is: `false` for all operations. All access goes through edge functions using service role key. |
| Rate limiting | Edge functions already run server-side. Add a simple in-memory rate limit (per IP, 10 requests per minute) to `regenerate-section` to prevent abuse. |
| Data minimisation | Profiles auto-expire after 14 days. `consent_given_at` is required for any persistence. Delete and export actions give the user full control. |
| Consent | Explicit opt-in before data is stored. No data stored without consent. Session-only mode is the default. |
| GDPR | Right to erasure via delete action. Right to portability via export action (returns full JSON). No tracking beyond existing page views. |

---

## F. Implementation Sequence

Each step is a discrete, testable increment. Current functionality stays working throughout.

### Step 1: Mini/Full mode selection
- Add `ModeSelectScreen` component
- Add `report_mode` to context state and stage flow
- Add `MINI_SECTIONS` config
- Filter `ProfileBuilder` sections by mode
- Add "Upgrade to full" button in mini mode
- Migration: add `report_mode` column to `saved_profiles`

### Step 2: Report Dashboard (dashboard first)
- Build `ReportDashboard` component with per-section cards
- Replace `ReportPreview` as the post-generation destination
- Show At a Glance, Ways of Working, Conclusion as summary cards
- Add Download PDF and Email buttons to the dashboard
- Accept/reject toggles per section (UI only, state stored in context)

### Step 3: Section level regeneration
- Create `regenerate-section` edge function
- Add regenerate button per section card on Report Dashboard
- Build `SectionRegenConfirm` component (old vs new comparison)
- Wire accept/reject to update the stored `sectionInsights` array

### Step 4: Consent and persistence
- Build `ConsentScreen` component
- Migration: add `consent_given_at` and `ai_report` columns to `saved_profiles`
- Update `save-profile` edge function with delete and export actions
- Store AI report in `saved_profiles` when consent is given
- Add "Delete my data" and "Export my data" buttons to the consent/settings area

### Step 5: Polish and testing
- End to end testing of mini and full flows
- Test section regeneration with accept/reject
- Test persistence with consent, delete, and export
- Verify PDF generation still works with accepted/rejected sections
- Mobile responsiveness pass on new screens

