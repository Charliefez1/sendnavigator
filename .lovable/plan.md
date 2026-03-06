

## Rename "My Child: A Profile" → "My Child: This is me"

The name change is meaningful — it shifts the voice from clinical description to the child saying "this is who I am." The impact is wide but straightforward: it is a text rename across ~20 files with no route, type, or structural changes.

### What changes

**UI-facing text (rename all instances):**

| Location | Current | New |
|---|---|---|
| `OpeningScreen.tsx` | "My Child: A Profile" (title + body) | "My Child: This is me" |
| `ProfileCompactHeader.tsx` | fallback "My Child: A Profile" | "My Child: This is me" |
| `ProfileIdentityHeader.tsx` | "Your Child's Profile" / `childName's Profile` | "This is me" / `This is {childName}` |
| `ChildVoicePanel.tsx` | "profile" references | "This is me" references |
| `Header.tsx` | nav label "My Child: A Profile" | "My Child: This is me" |
| `Footer.tsx` | link label | "My Child: This is me" |
| `Start.tsx` | card title | "My Child: This is me" |
| `OrientationBar.tsx` | section + title labels | "My Child: This is me" |
| `AnimatedFeatureShowcase.tsx` | showcase label | "My Child: This is me" |
| `FeatureMyChildProfile.tsx` | page title, heading, body text | "My Child: This is me" |
| `ExitIntentPopup.tsx` | "My Child Profile" label | "My Child: This is me" |
| `ProfileDashboard.tsx` | empty state text | updated copy |
| `ReportDashboard.tsx` | heading references | updated copy |
| `profile-dashboard-utils.ts` | "your child's profile" text | updated copy |

**Edge functions (rename in visible text only):**

| Location | Change |
|---|---|
| `email-profile-report/index.ts` | Email subject + body: "My Child: A Profile" → "My Child: This is me" |
| `guide-me/index.ts` | Description text in route list |

**Content files:**

| Location | Change |
|---|---|
| `public/content/my_child_profile.txt` | Title and body text |
| `public/content/start.txt` | Navigation list entry |
| `public/llms.txt` | Tool description |

**Pages with incidental references:**

| Location | Change |
|---|---|
| `PrivacyPolicy.tsx` | "child's profile document" → "This is me document" |
| `WhatWeOweOurChildren.tsx` | "child's profile" references — keep as-is (these refer to the concept of understanding a child's profile, not the tool name) |

**Knowledge base comments** (internal, low priority): ~8 files have `For use by Ask Rich Q&A and My Child: A Profile report generation` in code comments. These are developer-facing and can be updated for consistency.

**What does NOT change:**
- Route stays `/my-child-profile` (URL stability, bookmarks, SEO)
- File names stay as-is (`MyChildProfile.tsx`, `child-profile/` directory)
- Internal types (`ChildProfileState`, `ChildProfileContext`) unchanged
- localStorage key `my-child-profile-draft` unchanged
- Database table/column names unchanged
- Export filename `my-child-profile-export.json` unchanged

### Opening screen copy adjustment

The narrative in `OpeningScreen.tsx` currently says: *"My Child: A Profile, is that."* This becomes: *"My Child: This is me, is that."* — which actually reads better given the new framing. The paragraph about the "quiet word" and "this is George" document naturally leads into "This is me" as a concept.

### Contextual phrasing

Where we currently say `{childName}'s Profile`, the new name opens up warmer phrasing:
- Profile header: **"This is {childName}"** instead of "{childName}'s Profile"
- Email subject: **"This is {childName} — from SEND Navigator"**
- Compact header fallback: **"My Child: This is me"**

### Scope

~25 files touched, all text-only changes. No migrations, no new components, no route changes. Edge functions will need redeployment (automatic).

