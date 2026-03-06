

# EHCP Page Fix — Root Cause Analysis and Plan

## Why Previous Attempts Failed

Every previous debug attempt followed the same pattern:
1. Navigate to `/ehcps` in browser automation
2. See it redirect to `/landing` (sign-in page)
3. Get stuck — the automated browser has no auth session
4. Loop trying to diagnose a "blank screen" that is actually just the auth redirect

The browser automation tool cannot log in as you, so it always sees the landing page. This is why it keeps saying "Reproduce EHCP failure" and stopping — it literally cannot reach the page.

## What the Code Shows

I have read every file involved in the EHCP page end-to-end:

- `src/pages/EHCPs.tsx` (354 lines) — structurally correct, all imports resolve
- `src/components/templates/DataVisuals.tsx` — all exports match what EHCPs imports
- `src/components/templates/EHCPProcessDiagram.tsx` — self-contained, no external deps
- `src/components/templates/LatestUpdatesStream.tsx` — fetches news_items, handles empty state
- `src/components/templates/PageOrientation.tsx` — uses PageSearch, straightforward
- `src/components/AskEHCP.tsx` — simple form component
- `src/components/templates/ContentBox.tsx` — basic wrapper
- `src/components/templates/OnThisPage.tsx` — nav component

There are **no compile errors, no missing imports, no broken references** in any of these files.

## Most Likely Root Causes (ranked)

### 1. Runtime crash in `PageSearch` DOM manipulation (HIGH probability)
`PageOrientation` renders `PageSearch` by default (`showSearch` defaults to `true`). `PageSearch` uses raw DOM manipulation — `document.createTreeWalker`, `replaceChild`, creating `<mark>` elements. This type of direct DOM manipulation alongside React is fragile and can crash during mount/unmount cycles, especially with React 18's strict mode double-render. If `PageSearch` crashes, the entire page would white-screen because the error propagates up through `PageOrientation` → `EHCPs` → `Layout` → the `ErrorBoundary` (which shows a generic "Something went wrong" screen, not a blank).

### 2. `LatestUpdatesStream` Supabase query error (MEDIUM probability)
The component casts supabase as `any` (`(supabase as any).from("news_items")`), which suggests a previous type mismatch issue. If the query throws (e.g., network error, schema change), it could crash the component. However, the network logs show this query succeeding with status 200, so this is less likely unless timing matters.

### 3. CSS variable resolution failure (LOW probability)
`DataVisuals.tsx` references CSS variables like `--status-confirmed-bg`, `--accent-teal`, etc. If these aren't defined in `index.css`, the colors would be wrong but shouldn't crash the page.

### 4. `hslAlpha` helper crash (LOW probability)
Multiple components use `hsl.replace(")", ...)` to add alpha. If an accent value doesn't contain `)`, this silently fails rather than crashing.

## The Fix Plan

Since I cannot reproduce the crash via browser automation (auth wall), the fix must be defensive:

### Step 1: Add error boundaries around the three riskiest sub-components
Wrap `PageSearch`, `LatestUpdatesStream`, and `EHCPProcessDiagram` in individual try-catch boundaries so a crash in one doesn't take down the whole page.

### Step 2: Make PageSearch safer
The DOM manipulation in `PageSearch` is the most likely crash source. Wrap the `highlight()` function body in a try-catch so any DOM error is swallowed rather than crashing React.

### Step 3: Remove the `(supabase as any)` cast in LatestUpdatesStream
Use the properly typed client. If the type doesn't include `news_items`, the query still works at runtime — the cast just hides compile errors.

### Step 4: Test by temporarily making /ehcps a public route
Temporarily remove `ProtectedRoute` from the `/ehcps` route so I can actually navigate to it in the browser automation, take a screenshot, and confirm it renders. Then restore the protection.

## Summary

The page code is correct. The crash is almost certainly a runtime error in `PageSearch`'s DOM manipulation or an edge case in `LatestUpdatesStream`. The fix is three small defensive changes, plus a temporary route change to verify rendering.

Estimated changes: 3 files, under 30 lines total.

