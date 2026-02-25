
# Landing Page: Full Redesign

## Philosophy
Stop treating this like an information page. This is a **conversion page**. One job: make a parent feel understood, show them something powerful exists, and get them to sign up. Everything else is noise.

## New Page Structure

### Section 1: Hero (full viewport height)
- **Dark navy**, full-bleed, edge to edge
- Beacon logo top-left, "Sign in" top-right — minimal header
- Centre of screen: one powerful headline in large display type
  - "Your child's SEND rights. Explained by someone who gets it."
- Below that: a single line of subtext
  - "Independent. Fact-based. Built by a parent, for parents."
- A single CTA button: "Get started free" (scrolls to auth)
- No cards, no boxes, no trust pills cluttering this space
- Subtle animated gradient behind the text (slow-moving, not distracting)

### Section 2: The Problem Statement (emotional hook)
- Light background, generous whitespace
- Short, punchy copy in Rich's voice:
  - "SEND reform is coming. The government won't tell you what it means. The media gets it wrong. And the jargon makes it impossible to know what's real."
  - "I spent months researching every angle so you don't have to."
- This section is text only. No icons, no cards. Just words that land.

### Section 3: Animated Feature Showcase (what's inside)
- Keep the existing `AnimatedFeatureShowcase` component but give it more room
- Full-width section with a tinted background
- Larger typography for the active feature description
- The 5 features remain: SEND Reform Report, EHCP Guide, My Child Profile, What to do now, Ask Rich

### Section 4: Ask Rich Preview (the hook)
- Keep the existing `LandingAskRich` component with the frosted paywall
- But give it a dramatic presentation:
  - Section headline: "Try it. Ask me anything."
  - Dark background again to create rhythm (dark-light-dark)
  - The input is large and prominent
  - Example questions are clearly clickable

### Section 5: Auth + Close (conversion)
- Clean, centered `AuthForm`
- Above it: "Join thousands of parents staying informed" (or similar social proof line)
- Below it: "Free. No spam. Built by Rich Ferriman." with link to About

### Section 6: Minimal footer
- Copyright, About, Privacy, Sources links
- No cards, no extra content

## Technical Details

### Files modified
- `src/pages/Landing.tsx` — full rewrite with the new 6-section structure
- `src/components/landing/AnimatedFeatureShowcase.tsx` — minor spacing/typography tweaks for the larger context
- `src/components/landing/LandingAskRich.tsx` — no structural changes, just container styling adjustments

### No new components needed
The existing `AnimatedFeatureShowcase` and `LandingAskRich` components work well — the issue is the page wrapping them, not the components themselves.

### Design approach
- Full-bleed sections alternating dark/light/tinted/dark/light
- Much larger headline typography (text-4xl to text-5xl on desktop)
- Generous vertical padding (py-20 to py-32 on desktop)
- Remove all unnecessary cards, boxes, and borders from the landing page
- The landing page uses its own visual language — bolder and more spacious than the app interior
- CSS animated gradient on the hero (keyframe animation, no library)
- Scroll-based fade-in for sections below the fold using IntersectionObserver + CSS transitions

### What gets removed
- Trust pills from the hero (moved conceptually into the problem statement copy)
- The bouncing arrow (replaced by natural scroll flow)
- The about card section (absorbed into the auth/close section)
- The side-by-side auth + showcase layout (each gets its own full-width section)
- News ticker from the hero (it breaks the dramatic opening — can remain elsewhere in the app)

### What stays
- `AnimatedFeatureShowcase` component (with more breathing room)
- `LandingAskRich` component with frosted paywall
- `AuthForm` component
- Beacon logo
- Preview mode bypass (`?preview=true`)
