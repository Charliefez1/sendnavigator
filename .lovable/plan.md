

## Fix: Lifted boxes on How to Use + Site-wide font consistency

### Problem 1: How to Use boxes are flat
Every box on the How to Use page uses `bg-card border border-border rounded-xl` but has **no shadow at all**. The rest of the site uses `shadow-lg` on cards. There are 11 box elements on this page that need fixing.

### Problem 2: Font inconsistency across the site
The root cause is a conflict between two font systems:
- `index.css` sets all `h1-h6` tags to Fraunces (the display font) via a CSS rule
- But Tailwind's utility classes like `font-medium`, `font-semibold` can interfere with inheritance, and some heading elements are rendered as `span`, `p`, or `div` instead of actual heading tags
- Some pages explicitly add `font-display` (Fraunces) to elements, others rely on the CSS rule, and some elements that should use the display font are not heading tags at all

The fix is to add a **global `!important` override** in `index.css` to force Fraunces on all headings regardless of utility class interference, and to ensure all heading-like elements (card titles, section titles) consistently use `font-display`.

---

### Changes

**1. `src/pages/HowToUse.tsx`** -- Add `shadow-lg` to all 11 card/box elements

Every `bg-card border border-border rounded-xl` div will get `shadow-lg` added. The `reassurance-banner` CTA at the bottom will also get `shadow-lg`.

**2. `src/index.css`** -- Strengthen font rules with `!important`

Change the heading font rule from:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Fraunces', Georgia, serif;
}
```
to:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Fraunces', Georgia, serif !important;
}
```

Also add a new rule to ensure `.font-display` works as an override for non-heading elements:
```css
.font-display {
  font-family: 'Fraunces', Georgia, serif !important;
}
```

**3. `src/components/templates/PageOrientation.tsx`** -- Add `font-display` to the h1 explicitly for clarity and consistency.

**4. Content pages audit** -- Ensure all `h2` and `h3` tags across content pages use `font-display` class explicitly rather than relying solely on the CSS tag selector. This covers pages:
- `HowToUse.tsx` (h2 and h3 tags)
- `WhatTheLeaksDoNotMean.tsx`
- `WhatIsBeingDiscussed.tsx`
- `WhatIsChanging.tsx`
- `WhatWeKnowSoFar.tsx`
- `WhereWeAreNow.tsx`
- `WhatHasNotChanged.tsx`
- `WhatHappensNext.tsx`
- `WhatThisCouldMean.tsx`
- `WhatWeDoNotKnow.tsx`
- `WhatTheLeaksAreSaying.tsx`
- And any other content pages with headings

This belt-and-braces approach (CSS `!important` + explicit `font-display` classes) ensures the font issue cannot recur regardless of class ordering or specificity conflicts.

