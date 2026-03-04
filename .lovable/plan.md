

## Plan: Reduce freetext saturation and narrative bias in scoring

### What changes

All changes are in **`src/lib/scoring-engine.ts`** and **`src/components/child-profile/dashboard/ProfileWheel.tsx`** (for the banner). No database, edge function, or signal library changes needed.

### 1. Tag freetext signals as `evidence_only` by default

In `extractSignalsFromAnswers`, add a new field `signalType: "evidence_only" | "trait_confirmed"` to each signal. Freetext signals get `"evidence_only"` by default. Structured option signals get `"trait_confirmed"`. Update the `Signal` interface in `signal-library.ts` to include this optional field.

### 2. Exclude `evidence_only` signals from intensity calculation

In `scoreDomain`, when selecting the top 6 signals for intensity (`cappedSignals`), filter out signals where `signalType === "evidence_only"`. They still count toward **evidence** and **signal counts** but do not inflate the `weightedSum` used for intensity.

### 3. Cap freetext intensity contribution at 2 per domain

Even if a freetext signal is somehow `trait_confirmed` (future: via a tick-box), at most 2 freetext-origin signals may enter the intensity calculation per domain. Add a counter during the capping step.

### 4. Add `freetextContributionRatio` diagnostic

Add a new field to `DomainScores`:
```
freetextContributionRatio: number; // 0–1
```
Calculated as `freetextWeightedSum / totalWeightedSum` across all confirmed signals (not just the capped ones). This is a transparency metric.

### 5. Show banner when ratio > 0.5

In `ProfileWheel.tsx`, after rendering domain scores, check each domain's `freetextContributionRatio`. If any domain exceeds 0.5, show a small amber banner beneath the radar chart:

> "Some domains are mostly based on written notes. Adding structured answers will improve reliability."

### Files to change

| File | Change |
|------|--------|
| `src/config/signal-library.ts` | Add optional `signalType?: "evidence_only" \| "trait_confirmed"` to `Signal` interface |
| `src/lib/scoring-engine.ts` | Tag freetext signals as `evidence_only`, filter them from intensity calc, cap at 2, compute `freetextContributionRatio`, bump `SCORING_VERSION` |
| `src/components/child-profile/dashboard/ProfileWheel.tsx` | Read `freetextContributionRatio` from domain scores, render amber banner if any domain > 0.5 |

### Acceptance criteria met

- Freetext weight stays at 1 and cannot inflate intensity (evidence_only by default)
- At most 2 freetext signals can contribute to intensity per domain
- `freetextContributionRatio` diagnostic exposed per domain
- Banner warns parents when freetext dominates a domain
- Structured signals dominate intensity; verbose parents no longer inflate scores

