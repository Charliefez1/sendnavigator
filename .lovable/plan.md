

## Site-Wide Visual Refresh: Elevated Cards + Bold Colour Palette

The reference design shows cards with strong visual definition — clean white surfaces that "float" off the background with pronounced shadows, generous rounding, and subtle coloured accents that give each card its own identity. Combined with the already-approved colour boldness plan, this becomes a single visual refresh.

### What changes

**1. Foundation: stronger card elevation (3 files)**

The core `Card` component and shadow tokens get updated to produce the lifted, defined look from the reference:

| Token | Current | New |
|---|---|---|
| `shadow-card` | Subtle 2-layer, max 12px blur | Deeper 3-layer: soft ambient + directional + subtle colour tint |
| `shadow-card-hover` | Slightly stronger version | Pronounced lift with translateY(-2px) feel via deeper shadow |
| `--card` (light) | `0 0% 100%` (pure white) | Keep — but border goes softer (`border-border/60`) |
| `--radius` | `0.75rem` | `1rem` — rounder corners match the reference |
| Card border | `border border-border` | `border border-border/50` — softer border lets shadow do the work |

Files: `tailwind.config.ts` (shadow tokens, radius), `src/components/ui/card.tsx` (border classes), `src/index.css` (radius variable)

**2. ContentBox gets the lifted treatment (1 file)**

`ContentBox.tsx` currently uses inline `shadow-card`. Update to use the new stronger shadow + increase rounding to `rounded-2xl`. The accent border becomes a left-edge stripe (`border-l-4`) instead of a full-border tint — matching the reference's card accent pattern.

**3. InfoCard alignment (1 file)**

`InfoCard.tsx` gets the same `rounded-2xl` + stronger shadow + page-accent-aware icon box (replacing hardcoded `bg-primary/10`).

**4. DataVisuals colour expansion (1 file)**

Expand `StatCard`, `PercentageRing`, `HorizontalBarChart`, `TierDiagram` accent maps from 4 options to 9 (adding teal, blue, amber, coral, violet, sage, rose). Update the StatCard template to use `rounded-2xl` and the new shadow.

**5. Page accent wiring (~20 pages)**

Wrap remaining pages in `PageAccentProvider`:

| Section | Colour | Pages |
|---|---|---|
| SEND Reform | Teal | Already handled via ReportLayout |
| EHCPs | Blue | Already done |
| Actions | Coral | Exclusions, AlternativeProvision, ForParents, Sendiass, LocalVariation |
| Understanding | Violet | UnderstandingYourChild, UnderstandingAutism, UnderstandingADHD |
| About/Meta | Amber | About, HowToUse, Sources, RichFerriman, WhyIBuiltThis, PrivacyPolicy |
| Community | Deep Blue | HaveYourSay, CommunityQuestions, Feedback |
| Other | Sage | DevolvedNations, Post16AndTransition |

Each page: one-line `<PageAccentProvider color="hsl(...)">` wrapper.

**6. Callout card refactor (~6 pages, 65 instances)**

Replace `border-2 border-primary/30 bg-primary/5` with a new `HighlightCard` component:
- `rounded-2xl border-l-4 border-l-[accent] bg-[accent-bg] shadow-card`
- Reads `usePageAccent()` for automatic section colouring
- Falls back to primary if no accent set

Pages: Exclusions, EHCPHealth, DevolvedNations, AlternativeProvision, ForParents, LocalVariation.

**7. Icon box accent swap (~33 files, 245 instances)**

The `bg-primary/10` icon boxes become page-accent-aware. Two approaches:
- Components that already use `usePageAccent()` (ContentBox) — already handled
- Standalone icon boxes in pages — replace `bg-primary/10 text-primary` with a small utility that reads the page accent, or inline style matching the ContentBox pattern

This is the largest stream — systematic find-and-replace across all content pages.

### Execution order

1. **Tailwind tokens + Card component** — foundation that everything inherits
2. **HighlightCard component** — new shared component
3. **DataVisuals expansion** — colour maps
4. **ContentBox + InfoCard** — updated styling
5. **Page accent wiring** — 20 pages get providers
6. **Callout card migration** — 6 pages swap to HighlightCard
7. **Icon box sweep** — 33 files get accent-aware icons

### What does NOT change
- No route changes
- No database changes
- No new dependencies
- Dark mode tokens scale automatically (existing `--card`, `--border` dark variants apply)

