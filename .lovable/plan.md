

## Dashboard Redesign: My Child — A Profile

### The Problem
The current dashboard is a vertical scroll of dense cards: Identity Header → Radar Chart + Domain Legend → Child Voice → Emerging Themes → Readiness. Everything is visible at once, making it feel complex and overwhelming — the opposite of what SEND parents need.

### Design Direction
Inspired by the reference dashboards you shared, the redesign uses a **card-based grid layout** with headline stats at the top, visual data widgets in the middle, and click-through for detail. The Emerging Themes section becomes its own dedicated page accessed from the dashboard.

### New Dashboard Layout

```text
┌─────────────────────────────────────────────────┐
│  [Child Name]'s Profile          [Back] [Report]│
│  Filled by: [name]  ·  Full report  ·  Depth 67%│
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────┐│
│  │Questions │ │ Sections │ │  Child   │ │ Top ││
│  │Answered  │ │Completed │ │  Voice   │ │Theme││
│  │  47/154  │ │  14/22   │ │ 4 quotes │ │label││
│  │ [gauge]  │ │ [ring]   │ │          │ │     ││
│  └──────────┘ └──────────┘ └──────────┘ └─────┘│
│                                                 │
│  ┌──────────────────────┐ ┌────────────────────┐│
│  │  Profile Shape       │ │  Strongest Areas   ││
│  │  [radar chart]       │ │  • Strengths  ████ ││
│  │                      │ │  • Sensory    ███  ││
│  │  [Detail|Impact|     │ │  • Nervous S. ██   ││
│  │   Reliability]       │ │                    ││
│  │                      │ │  Needs Attention   ││
│  │                      │ │  • Exec Func  █   ││
│  │                      │ │  • Masking    █   ││
│  └──────────────────────┘ └────────────────────┘│
│                                                 │
│  ┌──────────────────────┐ ┌────────────────────┐│
│  │  Detected Patterns   │ │  Next Steps        ││
│  │  "After school crash"│ │  [readiness badge]  ││
│  │  "Environment sens." │ │  • Add detail to...││
│  │                      │ │                    ││
│  │  [View all themes →] │ │  [Generate Report] ││
│  └──────────────────────┘ └────────────────────┘│
│                                                 │
│  ┌──────────────────────────────────────────────┐│
│  │  In Their Own Words  (top 3 quotes)   [→]   ││
│  └──────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

### Key Changes

**1. Stat cards row (new)**
Four compact cards across the top showing at-a-glance numbers:
- **Questions answered** — gauge/arc showing e.g. 47/154 (computed from all section answers)
- **Sections completed** — circular progress ring showing e.g. 14/22
- **Child voice contributions** — count of child voice quotes captured
- **Top theme** — the strongest emerging theme label with confidence badge

**2. Profile Shape (simplified)**
Keep the radar chart and view toggle (Detail/Impact/Reliability) but move the domain legend into a simpler sorted bar list on the right showing "Strongest Areas" and "Needs Attention" — no expandable explainers on this view. Clicking a domain navigates to that section.

**3. Detected Patterns card (new)**
A compact card showing pattern names (e.g. "After school crash", "Environment sensitivity") with a count badge. A "View all themes" button navigates to the full Emerging Themes page.

**4. Emerging Themes → dedicated page**
Move the full EmergingThemes component (theme cards, mechanisms, contexts, contradictions) to a sub-view accessible via "View all themes →" from the dashboard. The dashboard shows only a preview.

**5. Child Voice (compact)**
Show top 3 quotes in a horizontal strip at the bottom with a "See all →" expand.

**6. Next Steps & Readiness (compact)**
Stays as a card in the grid but without the collapsible section checklist on the main view.

**7. Identity Header (streamlined)**
Remove the large gradient banner. Use a compact header row with child name, filled-by pill, report mode pill, and the depth ring — all inline.

### Technical Approach

| File | Change |
|---|---|
| `ProfileDashboard.tsx` | Restructure layout to grid, add stat cards row, add state for themes sub-view |
| `dashboard/StatCards.tsx` | New component: 4 stat cards with gauge/ring visuals |
| `dashboard/DomainBars.tsx` | New component: sorted horizontal bars for strongest/weakest domains |
| `dashboard/PatternPreview.tsx` | New component: compact pattern summary card |
| `dashboard/ProfileIdentityHeader.tsx` | Simplify to compact inline header |
| `dashboard/ProfileWheel.tsx` | Remove domain legend column, pair with DomainBars instead |
| `dashboard/ChildVoicePanel.tsx` | Compact to 3-quote horizontal strip |
| `dashboard/EmergingThemes.tsx` | No changes — used as full page view |
| `dashboard/ReadinessPanel.tsx` | Remove collapsible checklist from main view |
| `profile-dashboard-utils.ts` | Add `countTotalAnswers()` helper for the questions gauge |

### Data Points for Stat Cards
- **Questions answered**: iterate all sections, count non-empty answers vs total possible (154 from audit)
- **Sections completed**: already available via `extractSectionCompletion`
- **Child voice count**: already available via `extractChildVoiceEntries().length`
- **Top theme**: take `themeAnalysis.themes[0]` if present

All existing scoring, signals, and theme analysis logic remains unchanged. This is purely a layout and presentation restructure.

