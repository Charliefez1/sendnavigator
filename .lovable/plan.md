

## Reimagined Profile Dashboard

### The Problem

The current dashboard is a flat grid of bullet point cards. It reads like a checklist, not a portrait of a child. Parents will not pay for a list. They will pay for something that makes them feel seen, that captures who their child actually is, and that they can hand to a school and say "this is my child."

### The Vision

A single screen that tells the story of a child across three layers: who they are, what the world needs to understand, and how ready this profile is to generate something powerful.

### Architecture: 5 New Panels

**1. Child Identity Header**
A warm, personalised hero block at the top. Shows the child's name large, the reason for building this profile, who completed it, and the report mode (Mini/Full). Includes a circular "profile depth" ring (not just completion %, but weighted by answer length and reflection presence) so parents see that a 40% complete profile with rich answers is more valuable than an 80% profile with one word answers.

**2. Profile Wheel (Radar Chart)**
A recharts RadarChart mapping the 8 core domains (Environment, Nervous System, Sensory, Executive Function, Masking, Communication, Behaviour, Strengths) as axes. Each axis scores 0 to 3 based on: 0 = empty, 1 = started (some answers), 2 = detailed (most answers filled), 3 = rich (answers + reflection + child voice). This gives parents a visual shape of where they have gone deep and where gaps remain. Clicking a segment navigates to that section.

**3. In Their Own Words**
A dedicated panel that pulls all child voice answers from across every section and displays them as a warm, quote-style mosaic. These are the child's actual words, formatted with large quotation marks and a soft amber background. If no child voice answers exist, this panel shows a gentle prompt: "Your child's voice makes this profile powerful. Even one or two answers can change how a school sees them."

**4. Emerging Themes**
Instead of fixed "strengths" and "needs" cards, this panel uses pattern detection across answers to surface 3 to 5 short theme sentences. For example, if sensory answers mention noise and the nervous system section mentions overwhelm, the theme might read: "Noise is a significant trigger that connects to dysregulation." This uses client side keyword matching (no AI call), scanning for common terms across sections and grouping them. Each theme links to the relevant sections.

**5. Next Steps and Readiness**
A smart recommendation panel. It analyses which sections are empty, which are thin, and which have no reflection, then produces 2 to 3 ranked suggestions: "Add a reflection to Sensory Processing to deepen this section" or "The Behaviour section would benefit from the child's voice." Below this, a clear call to action: "Generate report" (enabled/disabled based on minimum threshold) with a readiness label like "Your profile is ready for a meaningful report" or "A few more sections will make the report much stronger."

### Technical Approach

**New files:**
- `src/components/child-profile/dashboard/ProfileIdentityHeader.tsx`
- `src/components/child-profile/dashboard/ProfileWheel.tsx`
- `src/components/child-profile/dashboard/ChildVoicePanel.tsx`
- `src/components/child-profile/dashboard/EmergingThemes.tsx`
- `src/components/child-profile/dashboard/ReadinessPanel.tsx`

**Updated files:**
- `src/components/child-profile/ProfileDashboard.tsx` (compose the 5 panels)
- `src/lib/profile-dashboard-utils.ts` (add depth scoring, theme extraction, child voice collection, readiness logic)

**Key details:**
- The radar chart uses `recharts` (already installed) with `RadarChart`, `PolarGrid`, `PolarAngleAxis`, `Radar`
- Theme extraction scans all answers for keyword overlap across sections (e.g. "noise", "overwhelm", "meltdown") using a small dictionary of ~30 common SEND terms grouped into theme clusters
- Depth scoring weights: answer present = 1, answer > 50 chars = 2, reflection present = +0.5, child voice present = +0.5
- Child voice collection iterates `childVoiceQuestions` config and pulls matching answers from state
- No new database tables or edge functions required
- No changes to PDF generation, report dashboard, or section model

### What stays the same
- Section completion list (moved into the Readiness panel as a collapsible checklist)
- Back to profile button
- Navigation to sections on click
- All existing extraction functions remain available

