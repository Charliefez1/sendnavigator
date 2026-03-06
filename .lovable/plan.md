

## Rename "Themes" → "Patterns" + Bold Up the Colour Palette

### 1. Terminology Rename

The user chose **Patterns** for the top-level groupings. Since "Detected patterns" already exists as a sub-level (e.g. "After school crash"), that sub-level becomes **"Recognised sequences"** — a warm, parent-friendly term that distinguishes the two concepts.

| Current | New |
|---|---|
| "Emerging themes" (page title) | **"Emerging patterns"** |
| "Theme strength" (chart label) | **"Pattern strength"** |
| "Theme details" (section heading) | **"Pattern details"** |
| "Themes" (stat pill) | **"Patterns"** |
| "What's driving the themes" | **"What's driving the patterns"** |
| "X themes" (context heatmap) | **"X patterns"** |
| "Detected patterns" (sub-level) | **"Recognised sequences"** |
| `StructuredTheme.theme` field | Keep as-is internally — only change UI labels |
| `ThemeKey` / `THEMES` config | Keep as-is — these are internal ontology keys |

**Files to update UI labels:**
- `EmergingThemes.tsx` — heading, section headings, sub-headings
- `ThemesSummaryHeader.tsx` — stat pill label, section labels, heatmap text
- `PatternPreview.tsx` — card title "Detected patterns" → "Recognised sequences"
- `ProfileDashboard.tsx` — any visible label text

Internal type names (`StructuredTheme`, `DetectedPattern`, `ThemeAnalysisResult`) stay unchanged to avoid a large refactor with no user-facing benefit.

---

### 2. Bolder Colour Palette Across Data Visualisations

The problem: data visualisations currently use faint tints (`bg-primary/10`, `bg-status-discussed-bg/30`, `bg-accent/30`) that wash out the data. Each page has its own accent colour, but the *data within* each page should use the full palette boldly.

**Colour assignment system for data elements:**

Each distinct data category gets its own strong colour from the existing palette:

| Data element | Colour token | Current | Proposed |
|---|---|---|---|
| Stat pill icons | All `text-primary` | Monochrome | Each pill gets a different colour (teal, amber, coral, violet) |
| Mechanism treemap blocks | Orange gradient only | All orange shades | Rotate through teal, blue, amber, coral, violet, sage, rose |
| Context heatmap cells | `bg-primary` only | All terracotta | Hot = coral, warm = amber, cool = teal, empty = grey |
| Theme/Pattern cards | `bg-card` uniform | All identical | Left border stripe coloured by confidence (teal = established, amber = developing, muted = emerging) |
| Pattern sub-cards | `bg-status-discussed-bg/30` | Faint yellow | Solid `bg-accent-amber-bg` with `border-l-4 border-accent-amber` |
| Contradiction cards | `bg-accent/30` | Barely visible | Solid `bg-accent-coral-bg` with `border-l-4 border-accent-coral` |
| Chip variants | 3 variants, all faint | `bg-primary/10` etc. | Bold backgrounds: warm = coral-bg, muted = deep-blue-bg, accent = teal-bg |
| Confidence legend dots | Correct colours but tiny | 2px dots | 3px dots with subtle glow ring |

**Specific changes by file:**

**`ThemesSummaryHeader.tsx`:**
- Stat pills: assign `accent-teal`, `accent-amber`, `accent-coral`, `accent-violet` to each of the 4 pills
- Mechanism treemap: rotate through 7 palette colours instead of orange gradient
- Context heatmap: use a 3-colour heat scale (teal → amber → coral) instead of single-colour opacity

**`EmergingThemes.tsx`:**
- Theme cards: add `border-l-4` with confidence colour (teal/amber/grey)
- Pattern cards: use solid `bg-[hsl(var(--accent-amber-bg))]` with amber left border
- Contradiction cards: use solid `bg-[hsl(var(--accent-coral-bg))]` with coral left border
- Chip variants: bolder background fills using the palette accent-bg tokens

**`DomainBars.tsx`:**
- Assign each domain its own colour from the palette rather than the single `scoreColor` function

**`StatCards.tsx`:**
- Each of the 4 stat cards gets a distinct accent colour for its gauge/ring/icon

**`SourceDiversity.tsx`:**
- Already uses good colours — no change needed

**`PatternPreview.tsx`:**
- Rename heading + use bolder chip colours consistent with the above

---

### Summary

Two streams of work:
1. **Rename**: Find-and-replace UI-facing "theme"→"pattern" and "Detected patterns"→"Recognised sequences" across ~4 files
2. **Bold colours**: Update ~5 dashboard components to use strong, distinct colours from the full 7-colour palette instead of faint single-colour tints

No new dependencies. No database changes. No new files — all edits to existing components.

