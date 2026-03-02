

## Update "My Child: A Profile" pages to reflect the full tool

The new features (dashboard, report preview, structured AI, regeneration) are all wired up correctly in code. But the two user-facing pages that describe the tool have not been updated to reflect them.

### What needs updating

**1. Feature landing page (`src/pages/landing/FeatureMyChildProfile.tsx`)**
The guest-facing page at `/feature/my-child-profile` still lists 8 bullet points that predate the new features. Update to:
- Add new bullets: "Preview your report in-browser before downloading", "At-a-glance dashboard showing strengths, needs, and progress", "Regenerate your report after making edits"
- Update the "AI-generated professional summary report" bullet to mention structured insights
- Add a "How it works" section with a simple 5-step numbered list (Start → Answer → Review dashboard → Generate report → Download PDF)
- Update the "Why it matters" copy to mention the dashboard and preview

**2. Main tool page header (`src/pages/MyChildProfile.tsx`)**
The `PageOrientation` description is generic. Update it to mention the dashboard and report preview alongside the existing "22 sections" and "Download as PDF" messaging.

**3. Opening screen (`src/components/child-profile/OpeningScreen.tsx`)**
Add a brief line in the short version mentioning the dashboard and report preview so users know what to expect before they start: "When you are ready, you can preview an AI-generated summary, view a dashboard of your child's profile, and download everything as a PDF."

### Files changed
- `src/pages/landing/FeatureMyChildProfile.tsx` — expanded feature list, new "How it works" section
- `src/pages/MyChildProfile.tsx` — updated PageOrientation description (1 line)
- `src/components/child-profile/OpeningScreen.tsx` — add 1 sentence to the short intro

