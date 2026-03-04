

## What needs doing

Two things:

1. **Add hover-over explainer tooltips across the Report Dashboard** — each card and the Section Insights heading needs a small info icon that, on hover (desktop) or tap (mobile), shows a short plain-English explanation of what the section is and what the parent should do with it.

2. **Clarify the "Regenerate" behaviour** — currently, "Regenerate" on a section insight calls the AI again with the *current section answers* and produces a fresh reflection. The parent then gets a side-by-side comparison and can accept or reject the new version. This means a parent could regenerate repeatedly until they get wording they prefer. This is the intended design (the data does not change, only the AI's phrasing). But nowhere in the UI does it explain this. We need to make it obvious.

## Design: reusable InfoTip component

Create a small `InfoTip` component wrapping `@radix-ui/react-tooltip` (already installed, pattern exists in `ContentBox.tsx`). It renders an `Info` icon (12-14px) that shows a tooltip on hover/focus. This keeps it consistent and avoids duplicating tooltip boilerplate everywhere.

```text
[Icon] Card title  [ⓘ ← hover shows tooltip]
```

## Explainer text for each card/section

| Element | Tooltip text |
|---------|-------------|
| **At a glance** | "A short summary of the key themes from your child's profile. This is the overview that appears at the top of the PDF." |
| **Ways of working** | "Practical strategies for the adults around your child. Written based on what you told us across all sections." |
| **Some things that may help** | "Suggested approaches and adjustments. These are not prescriptions. Use what feels right for your child." |
| **Conclusion** | "A closing reflection drawing together what the profile tells us about your child as a whole person." |
| **Section insights (N)** | "Each section you completed has its own AI-written reflection. You can review them one by one. Accept the ones that feel right, exclude any that do not, or regenerate for a fresh version. Regenerating re-reads your answers and writes a new reflection. Your answers stay the same. Only the wording changes." |
| **Regenerate** button (inside each card) | "Ask the AI to write a fresh reflection for this section using your current answers. You will see both versions side by side and can choose which to keep." |
| **Accept** button | "Include this reflection in your final report." |
| **Exclude** button | "Remove this reflection from your final report." |
| **Edit section** button | "Go back to this section to change your answers. You can regenerate the report afterwards." |

## Files to change

1. **New file: `src/components/child-profile/InfoTip.tsx`** — small reusable tooltip wrapper using the existing Tooltip primitives and the `Info` icon from lucide.

2. **`src/components/child-profile/ReportDashboard.tsx`** — import `InfoTip`, add it next to each `CardTitle` and the "Section insights" heading. Add tooltips to the action buttons inside `SectionInsightCard`.

No database changes. No edge function changes. No scoring engine changes.

