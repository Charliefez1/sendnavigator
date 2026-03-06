

## Emerging Themes Page — Dashboard Summary Header

### What We Have to Work With

Each `ThemeAnalysisResult` contains:
- **Themes** (up to 6): name, confidence level (emerging/developing/established), signal count, mechanisms with counts, context tags, top signals
- **Patterns** (up to 5): label, matching signal count, matching contexts
- **Contradictions**: domain, contexts pair

This is enough data for a compelling visual summary row above the existing theme cards.

### Design

```text
┌─────────────────────────────────────────────────────┐
│  EMERGING THEMES — VISUAL SUMMARY                   │
│                                                     │
│  ┌────────────┐ ┌──────────────────┐ ┌────────────┐│
│  │ Theme      │ │ Mechanism        │ │ Context    ││
│  │ Strength   │ │ Treemap          │ │ Heatmap    ││
│  │ [horiz     │ │ [proportional    │ │ [grid of   ││
│  │  bars by   │ │  blocks sized    │ │  context   ││
│  │  signal    │ │  by signal       │ │  tags with ││
│  │  count,    │ │  count]          │ │  intensity ││
│  │  colored   │ │                  │ │  shading]  ││
│  │  by        │ │                  │ │            ││
│  │  confid.]  │ │                  │ │            ││
│  └────────────┘ └──────────────────┘ └────────────┘│
│                                                     │
│  ┌──────────────────────────────────────────────────┐│
│  │ At a glance:  6 themes · 3 patterns · 2 env.   ││
│  │               sensitivities · 47 signals mapped ││
│  └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘

[Existing theme cards, pattern cards, contradiction cards below]
```

### Three Visualizations

**1. Theme Strength Bars**
Horizontal bars for each theme, length = `totalSignalCount`, color-coded by confidence (grey = emerging, amber = developing, primary = established). Simple, scannable ranking.

**2. Mechanism Treemap**
Proportional blocks (CSS grid, no library needed) where each mechanism's area reflects its signal count. Gives an instant visual of *what's driving* the themes. Colored by mechanism category (orange tones).

**3. Context Heatmap**
A grid of all 11 context tags. Each cell's background intensity reflects how many signals mention that context across all themes. Instantly shows "where does this child struggle most?" — e.g. School dark, Clubs light.

**4. Summary Strip**
A single-line stat strip: "6 themes · 3 patterns · 2 environment sensitivities · 47 signals mapped"

### Technical Approach

| File | Change |
|---|---|
| `dashboard/ThemesSummaryHeader.tsx` | **New** — contains all 3 visualizations + summary strip |
| `dashboard/EmergingThemes.tsx` | Import and render `ThemesSummaryHeader` above existing content |

The summary header derives all data from the existing `ThemeAnalysisResult` prop — no new scoring or engine changes needed. The treemap and heatmap use pure CSS (grid + opacity/background) with no additional chart library.

### Data Extraction (all from `analysis: ThemeAnalysisResult`)

- **Theme bars**: `themes.map(t => ({ name: t.theme, count: t.totalSignalCount, confidence: t.confidence }))`
- **Mechanism treemap**: Flatten `themes.flatMap(t => t.mechanisms)`, deduplicate by mechanism name, sum signal counts
- **Context heatmap**: Flatten `themes.flatMap(t => t.contexts)`, count occurrences of each of the 11 `CONTEXT_TAGS`
- **Summary stats**: `themes.length`, `patterns.length`, `contradictions.length`, total unique signals

