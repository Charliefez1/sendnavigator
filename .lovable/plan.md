

## Update the My Child: A Profile opening page

The current opening screen has a brief intro, beta disclaimer, GDPR notice, and buttons. It lacks a clear explanation of what the tool actually does, what the 22 sections cover, what the output looks like, and how the journey works. A parent landing here for the first time needs to understand the full picture before committing.

### What to add to OpeningScreen.tsx

**1. "What this tool does" section** (below the intro text, above beta disclaimer)
A concise expandable block explaining:
- 22 guided sections covering environment, sensory processing, masking, executive function, behaviour, identity, strengths, and more
- Each section has a short framing paragraph explaining why it matters, then questions in your own words
- Optional "child voice" questions so your child can contribute directly
- A closing reflection at the end of each section for anything else you want to say

**2. "What you get at the end" section**
- An at-a-glance dashboard summarising what you have told us
- An AI-generated report written in plain language, drawing on the SEND Navigator research base
- A downloadable PDF you can share with schools, SENCOs, GPs, or keep for yourself
- Optionally, the report emailed directly to you

**3. "How it works" visual step list**
A compact numbered list showing the journey:
1. Tell us about your child (name, who is filling this in, who it is for)
2. Work through the sections at your own pace (skip any that do not apply)
3. View your dashboard and add a final statement
4. Generate your AI report and download the PDF

**4. "What the sections cover" expandable list**
A collapsible accordion or "show/hide" showing all 22 section titles grouped logically, so parents can see the scope before starting.

### Files changed
- `src/components/child-profile/OpeningScreen.tsx` — add the four new content blocks between the intro and the beta disclaimer, using existing UI patterns (collapsible sections, simple lists)

### Design approach
- Use existing component patterns: `Collapsible` for expandable sections, simple `ol`/`ul` lists
- Keep Rich's voice and tone throughout
- No new components needed, just structured content within the existing OpeningScreen

