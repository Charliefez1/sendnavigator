

## My Child: A Profile — GitHub Update Audit

Here is what has changed since the last Lovable-side audit (1st March 2026). These are the additions and modifications that came in through GitHub.

---

### NEW COMPONENTS

**1. ReportPreview (`src/components/child-profile/ReportPreview.tsx`)** — entirely new
- In-browser preview of the AI report before PDF download
- Renders structured reports with dedicated cards: At a Glance, Ways of Working, Some Things That May Help, Conclusion
- Collapsible section-by-section insights accordion
- Action buttons: Download PDF, Back to edit, Regenerate report
- Regeneration cooldown: warns if regenerating within 60 seconds of last generation
- Legacy fallback for non-structured reports (shows first 2000 characters)

**2. ProfileDashboard (`src/components/child-profile/ProfileDashboard.tsx`)** — entirely new
- At-a-glance dashboard summarising the full profile
- Six cards: Child overview, Section completion (with progress bar), Key strengths, Key needs, Communication snapshot, What helps most
- Each section row is clickable to navigate back to that section in the builder
- Pulls data via utility functions from `profile-dashboard-utils.ts`

**3. Dashboard Utilities (`src/lib/profile-dashboard-utils.ts`)** — entirely new
- `extractChildOverview` — name, reason, filled-by
- `extractKeyStrengths` — pulls from Strength Profile section (up to 5 items + child voice)
- `extractKeyNeeds` — pulls from Nervous System, Sensory, Behaviour sections
- `extractCommunicationSnapshot` — literal language, expressing feelings, social cues
- `extractWhatHelps` — from dysregulation helps + sensory seeking + reflections
- `extractSectionCompletion` — progress tracker across all 22 sections
- `hasAnyContent` — boolean check

---

### NEW TYPES

**`src/types/ai-report.ts`** — entirely new
- `StructuredAIReport` interface (version 2 format):
  - `openingLine`, `topSummary` (headline + bullets), `sectionInsights[]`, `waysOfWorking`, `someThingsThatMayHelp`, `conclusion`
- `isStructuredReport()` type guard function

---

### MODIFIED: AI Edge Function (`generate-profile-report`)

- **System prompt expanded** from ~93 lines to ~129 lines
- **New JSON output format**: AI now returns structured JSON (version 2) instead of plain text
  - `topSummary` with headline + 4-6 bullets
  - `sectionInsights[]` with per-section reflections
  - Separate `waysOfWorking`, `someThingsThatMayHelp`, `conclusion` fields
- **JSON parsing**: function now attempts to parse AI response as structured JSON, falls back to legacy text
- **Max tokens increased**: from 4,000 to 8,000
- **Knowledge base search**: unchanged (still uses tsquery on `knowledge_chunks`)

---

### MODIFIED: State Management (`ChildProfileContext.tsx`)

- **New type**: `SectionStatus` now includes `"in-progress"` (was only `"empty"` | `"complete"`)
- **New state field**: `aiReport?: CachedAIReport` added to `ChildProfileState`
- **New methods**: `updateAiReport()` and `clearAiReport()` for caching the generated report in context
- **Status logic**: still only returns `"empty"` or `"complete"` in practice (no in-progress detection yet)

---

### MODIFIED: FinalScreen (`FinalScreen.tsx`)

- **New stage**: `"preview"` added between `"loading"` and `"complete"`
- After generation, goes to preview (ReportPreview) instead of auto-downloading
- PDF download moved to preview screen via `handleDownloadPDF`
- Report cached in context via `updateAiReport()` — returning to FinalScreen shows preview immediately
- **Dashboard link**: new `onViewDashboard` prop with LayoutDashboard button on complete screen

---

### MODIFIED: ProfileBuilder (`ProfileBuilder.tsx`)

- **Dashboard stage**: new `onViewDashboard` prop wired through sidebar
- **Edit tracking**: `editedSinceReport` state warns users when they edit after generating a report
- **Stale report banner**: amber warning "You have changed the profile since the last report. Regenerate to update the report."

---

### MODIFIED: PDF Generator (`generate-profile-pdf.ts`)

- **Grew from 862 to 965 lines** (+103 lines)
- **New page**: "At a Glance" page for structured reports (between cover and "Why we built this")
  - Renders opening line, headline, bullets, and first 3 paragraphs of Ways of Working
- **Structured report support**: PDF now maps `StructuredAIReport` fields into dedicated pages
- **Variable scoping fix**: `let y` declaration moved to prevent TS2448 errors

---

### MODIFIED: MyChildProfile page

- **New stage**: `"dashboard"` added to stage routing
- Dashboard accessible from ProfileBuilder sidebar and FinalScreen complete state
- Navigation from dashboard back to builder with section jump

---

### UNCHANGED

- 22 sections, 123 parent questions, 31 child voice questions — no changes
- Opening screen, setup flow — no changes
- Save/restore system (access code) — no changes
- Child voice questions config — no changes
- Test data — no changes

---

### SUMMARY TABLE

```text
Component                  Status      Key Change
─────────────────────────  ──────────  ─────────────────────────────────────
ReportPreview.tsx          NEW         In-browser report preview before PDF
ProfileDashboard.tsx       NEW         At-a-glance dashboard with 6 cards
profile-dashboard-utils.ts NEW         Data extraction for dashboard
ai-report.ts               NEW         StructuredAIReport type + guard
generate-profile-report    MODIFIED    Structured JSON output, 8k tokens
ChildProfileContext.tsx    MODIFIED    AI report caching, new methods
FinalScreen.tsx            MODIFIED    Preview stage, dashboard link
ProfileBuilder.tsx         MODIFIED    Dashboard nav, stale report warning
generate-profile-pdf.ts   MODIFIED    At a Glance page, structured support
MyChildProfile.tsx         MODIFIED    Dashboard stage routing
```

---

### CURRENT KNOWN GAPS

1. No localStorage auto-save (unchanged)
2. No unsaved progress warning (unchanged)
3. `"in-progress"` status type exists but is never returned by `getSectionStatus`
4. Child voice questions still missing for 8 of 22 sections
5. Anonymised summary sharing still has no backend implementation

