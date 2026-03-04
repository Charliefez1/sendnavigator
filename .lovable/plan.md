

## Problem diagnosis

The "everything is Very high" issue is entirely caused by the **test data**, not the scoring engine. The `TEST_DATA` constant in `MyChildProfile.tsx` (lines 28-336) fills all 22 sections with the most extreme answer options for every structured question:

- `transitions`: "Almost always difficult" (weight 3)
- `recovery_time`: "Several hours" (weight 3)
- `school_home_difference`: "Yes, significantly different" (weight 3)
- `post_school_exhaustion`: "Yes, they need significant time to recover" (weight 3)
- `knowing_doing_gap`: "Yes, frequently" (weight 3)
- Every other structured question is also set to the highest severity option

On top of that, every free-text field is filled with detailed, lengthy content that generates additional weight-1 signals, and every section has a reflection, adding yet more signals per domain.

The scoring engine is working correctly. It caps intensity signals at the top 6 by weight, normalises against max possible weight, and applies gating rules. But when every input is maximum severity, the output will naturally be maximum too.

The separate `dev-test-profile.ts` (loaded via the dashboard dev button) is better calibrated with moderate answers but only covers 8 sections.

The internal error (36d...) is an editor/chat platform issue, not a code bug.

## Plan

### 1. Rewrite TEST_DATA with realistic varied severity

Replace the `TEST_DATA` in `MyChildProfile.tsx` with a profile that has:

- **2-3 domains genuinely high** (Nervous System, Masking) — keep extreme answers here
- **2-3 domains moderate** (Environment, Sensory, Behaviour) — use mid-range structured options like "Sometimes difficult", "Sometimes"
- **2-3 domains low or light** (Communication, Strengths) — use mild options or leave some questions unanswered
- **1-2 domains with insufficient data** (Energy and Recovery stays sparse) — leave most questions blank so it shows "Unknown"
- **Some sections left completely empty** (e.g., Trauma section 4, Physical Health section 16) to test the "no data" path

This means changing the structured answer values (e.g., `"Almost always difficult"` → `"Sometimes difficult"`) and removing some free-text answers entirely from lower-severity domains.

### 2. Update dev-test-profile.ts to match

Align the mini dev test profile with the same philosophy — varied, not uniformly high.

### 3. No scoring engine changes needed

The engine is functioning as designed. The issue is purely input data.

