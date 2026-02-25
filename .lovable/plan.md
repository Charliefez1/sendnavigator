

# Landing Page Redesign

## Overview
Redesign the `/landing` page to serve as a compelling, modern entry point that showcases what the SEND Navigator offers, includes a limited "Ask Rich" preview with a frosted paywall, and draws inspiration from SiteGround's animated feature showcase pattern.

## Changes

### 1. Remove the Neurodiversity Global image panel
- Remove the right-hand image column from the hero section (the `neurodiversityLanding` import and its navy container)
- The hero becomes a single-column, text-led layout

### 2. Update Beacon logo in both positions
- Header logo and the "About" section logo both currently use `beacon-logo.png`
- Update both `<img>` tags to use the current Beacon logo asset (confirm with you if a new file is needed, or if the existing `beacon-logo.png` has been updated)

### 3. Add "Ask Rich" preview with frosted paywall
- Create a new `LandingAskRich` component that embeds a simplified version of the `QuestionInput` component
- When a user submits a question:
  - The question is sent to the existing `qanda` edge function as normal
  - The answer renders but with a CSS frost/blur overlay covering roughly 70% of the response (the first ~30% is visible)
  - A call-to-action overlay appears on the frosted area: "Sign up or sign in to read the full answer"
  - Clicking it scrolls to or focuses the AuthForm
- This uses the existing `qanda` edge function with no backend changes

### 4. Animated feature showcase (SiteGround-inspired)
- Create an `AnimatedFeatureShowcase` component
- Right side: a stack of 5 feature "cards" that animate in sequence (auto-cycling every 4 seconds, pausable on hover)
- Each card has an icon + label, and when active it scales up / highlights
- Left side: a headline and short description that updates to match the active feature
- The 5 features:
  1. **SEND Reform Report** - "Track every aspect of SEND reform across 8 detailed sections"
  2. **EHCP Guide** - "Understand your rights, the process, and what to do when things go wrong"
  3. **My Child: A Profile** - "Build a professional document about your child to share with schools"
  4. **What to do now** - "Practical steps based on current law, not speculation"
  5. **Ask Rich** - "Get plain-English answers to your SEND questions"
- Uses the existing 5-colour accent system (teal, deep blue, amber, coral, violet)
- Smooth CSS transitions with `transition-all duration-500`

### 5. Rewrite landing page copy
Current copy is heavily focused on "what has changed" and reassurance about EHCPs. The new copy should reflect what the tool actually is now:

**Hero headline**: "The independent guide to SEND reform in England"
**Sub-headline**: "Clear facts, practical tools, and honest answers for parents navigating the SEND system"

**About section** (replaces current long text block):
- Short, punchy description of what the Navigator is
- What it includes (the 5 tools above)
- Trust signals remain (Independent, Fact-based, For families)
- Attribution to Rich Ferriman with link

### 6. Updated page structure (top to bottom)
1. Navy header with Beacon logo (updated)
2. News ticker (unchanged)
3. Hero section: headline + sub-headline + AuthForm (single column, centred)
4. Animated feature showcase (the 5 tools)
5. Ask Rich preview with frosted paywall
6. Trust/about card (shortened copy, Beacon logo updated)
7. Footer (unchanged)

## Technical details

### New components
- `src/components/landing/LandingAskRich.tsx` - Wraps QuestionInput + frosted answer display
- `src/components/landing/AnimatedFeatureShowcase.tsx` - Auto-cycling feature cards with synced descriptions

### Modified files
- `src/pages/Landing.tsx` - Full rewrite of the page layout and copy
- No changes to `AuthForm.tsx`, `QandAComponent.tsx`, `QuestionInput.tsx`, or any edge functions

### Frosted answer implementation
```text
Answer container:
  - position: relative
  - First 30%: visible normally
  - Remaining 70%: CSS mask-image gradient from transparent to opaque white
  - Overlaid with: backdrop-blur-md + semi-transparent bg + CTA button
```

### Animation implementation
- `useState` for `activeIndex` (0-4)
- `useEffect` with `setInterval(4000)` for auto-cycling
- `onMouseEnter` pauses, `onMouseLeave` resumes
- Each card transitions with scale, opacity, and border-color changes
- Description area uses `AnimatePresence`-style fade (CSS transitions, no extra library)

### No backend changes required
- The `qanda` edge function already works for unauthenticated users (it's invoked via the Supabase client which includes the anon key)
- The frosting is purely a frontend visual treatment

