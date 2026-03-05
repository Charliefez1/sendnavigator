

## Card Makeover Plan: "What's Inside" Section

The current six feature cards in `AnimatedFeatureShowcase.tsx` use colored backgrounds with accent-tinted borders and heavy box shadows. Based on the design reference, here's the modernization approach:

### What changes

**Card container styling** (in `AnimatedFeatureShowcase.tsx`):
- Replace the colored tinted backgrounds with clean white/dark surface (`bg-card`) 
- Use a subtle, uniform border (`border-border`) instead of accent-colored borders
- Replace the heavy colored box-shadows with the existing `shadow-card` / `shadow-card-hover` system
- Add a thin accent-colored top border (3px) as the only color pop per card — clean and modern
- Increase padding slightly and add more breathing room between elements

**Icon treatment**:
- Make the icon container slightly larger (w-11 h-11) with softer rounded corners (rounded-xl)
- Keep the accent-colored icon but use a lighter, more subtle background tint

**Typography refinements**:
- Move the label above the headline as a small colored eyebrow tag
- Make the headline slightly larger and bolder for hierarchy
- Improve description line spacing

**Hover state**:
- Subtle lift (`hover:-translate-y-1`) with smooth shadow transition
- Accent top border thickens or glows slightly on hover

**Layout**:
- Keep the 3-column grid but add slightly more gap (`gap-5` or `gap-6`)

### Files to edit
- `src/components/landing/AnimatedFeatureShowcase.tsx` — all styling changes contained here

### What stays the same
- All feature data (labels, descriptions, links, icons)
- Auth-aware routing logic
- The section wrapper in `Start.tsx`

