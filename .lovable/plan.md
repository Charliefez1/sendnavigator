

## Two bugs identified

**Bug 1: Clicking Dashboard during report generation kills the report**
The FinalScreen (with its report loading/preview stages) lives inside ProfileBuilder. When you click "Dashboard" in the compact header, the parent stage changes to `"dashboard"`, which unmounts ProfileBuilder entirely — destroying the report generation state. When you go back, ProfileBuilder remounts fresh and the report is gone.

**Bug 2: Report preview not rendering / no PDF download**
After report generation completes, FinalScreen calls `handleDownloadPDF` which calls `generateProfilePDF` and then sets `stage = "complete"`. The "complete" stage shows a static message but no longer shows the report preview or offers another download. The report preview should be the primary destination after generation, with download as a button within it — which is how `ReportPreview` works. But the flow in `FinalScreen` goes loading → preview → (download click) → complete. If anything resets state in between, it breaks.

## Plan

### 1. Lift FinalScreen/report state to the parent level
Add `"final"` and `"report-preview"` to the parent `Stage` type in `MyChildProfile.tsx`. This way switching to dashboard and back preserves the report state (which is already cached in ChildProfileContext as `state.aiReport`).

**Changes to `src/pages/MyChildProfile.tsx`:**
- Change `Stage` to include `"final" | "report-preview"`
- Render `FinalScreen` when stage is `"final"`
- Render `ReportPreview` when stage is `"report-preview"`
- Pass stage transitions so dashboard button works without unmounting report state

### 2. Update ProfileBuilder to use parent stage for final/report
Instead of ProfileBuilder managing `showFinal` internally, it calls `onShowFinal` prop to transition the parent stage.

**Changes to `src/components/child-profile/ProfileBuilder.tsx`:**
- Add `onShowFinal` prop, remove internal `showFinal` state
- "Final statement" and "Skip to final statement" buttons call `onShowFinal()`

### 3. Fix FinalScreen to return to report-preview correctly
**Changes to `src/components/child-profile/FinalScreen.tsx`:**
- After successful report generation, call a new `onReportReady` prop to transition parent to `"report-preview"` stage
- Remove the internal preview/complete stages that duplicate ReportPreview

### 4. Hide Dashboard button during report loading
**Changes to `src/components/child-profile/ProfileCompactHeader.tsx`:**
- Accept optional `showDashboard` prop (default true), hide the button when false (e.g. during loading)

### Files changed
- `src/pages/MyChildProfile.tsx` — expanded Stage type, render FinalScreen and ReportPreview at parent level
- `src/components/child-profile/ProfileBuilder.tsx` — delegate final/report to parent via props
- `src/components/child-profile/FinalScreen.tsx` — simplify to input-only, delegate preview to parent
- `src/components/child-profile/ProfileCompactHeader.tsx` — optional dashboard button visibility

