

# SEND Navigator — Foundation Audit and Cleanup Plan

## Section A: Executive Summary

### Top 10 System Risks

1. **PDF cover page still says "A Profile"** — `src/lib/generate-profile-pdf.ts` line 479 renders the old subtitle. Parents receive PDFs with the wrong product name.
2. **Admin route has no role-based access control** — `/admin` only requires authentication, any logged-in user can access it. No `user_roles` table exists.
3. **`check_max_profiles` trigger function exists but no trigger is attached** — the 3-profile limit is only enforced in the edge function, not at the database level.
4. **No scheduled cleanup of expired profiles** — `cleanup_expired_profiles` function exists but nothing calls it automatically. Only runs opportunistically via `save-profile`.
5. **`orientationOn` state still in context with no toggle** — the toggle was removed from `ExperienceSelector` but `ExperienceModeContext` still has `orientationOn` (defaults `true`). `OrientationBar` checks this at line 82 and returns null if false.
6. **Access code and stage lost on page refresh** — `accessCode` is React state only in `ChildProfileContext`; `stage` is React state only in `MyChildProfile.tsx`. Both reset on refresh.
7. **Hardcoded domain `send.neurodiversityglobal.com` in 7 files** — PDF, email templates, CORS headers, SEO, and structured data all reference this domain as string literals rather than a shared constant.
8. **Dual toast systems mounted** — both Radix `Toaster` and `Sonner` are mounted in `App.tsx` (lines 90-91).
9. **3 dead page components still lazy-loaded** — `WhatWeKnowSoFar`, `WhatThisCouldMean`, `WhatHappensNext` are imported but only serve as redirect targets.
10. **EHCP page reported broken** — user reports loading failure on `/ehcps`. Code structure looks correct; requires browser-level debugging to isolate (possibly a runtime error in `DataVisuals` or `LatestUpdatesStream`).

### Top 10 Cleanup Priorities

1. Complete rename: PDF subtitle line 479, `public/my-child-profile-audit.txt` title.
2. Remove dead code: `Navigation.tsx`, `SiteNavigation.tsx`, `JourneyNavBar.tsx`, 3 dead page components.
3. Remove `orientationOn`/`setOrientationOn` from `ExperienceModeContext` — make `OrientationBar` always render when meta exists.
4. Persist `accessCode` and `stage` to localStorage.
5. Create `user_roles` table and add admin role check on `/admin`.
6. Attach `check_max_profiles` trigger to `saved_profiles`.
7. Centralise domain string into a single constant.
8. Remove one toast system (keep Sonner or Radix, not both).
9. Debug and fix EHCP page loading failure.
10. Add `pg_cron` for expired profile cleanup.

### Top 10 Features That Appear Only Surface Level

1. **Listen mode** — button exists in `ExperienceSelector`, `ListenModePlayer` renders in Layout, but no audio source is wired.
2. **Scan mode** — `ScanModeBanner` renders conditionally but no content actually changes.
3. **Guide Me** — calls `guide-me` edge function, depends on `knowledge_chunks` being populated.
4. **News Tracker** — edge function exists, no automated trigger.
5. **Content Update Manager** — admin tool, no automated pipeline.
6. **Knowledge Base seeding** — `seed-knowledge` edge function exists, unclear if run.
7. **Run Test Harness** — edge function exists, purpose unclear.
8. **PageSearch** — component file exists, not integrated.
9. **ExitIntentPopup** — renders in Layout, unclear trigger/content.
10. **Anonymised sharing** — not implemented at all.

### Top 10 Blockers to Site-Wide UI Refresh

1. No shared `PageShell` component — each page manually assembles its own Layout + PageOrientation + containers.
2. Inline HSL accent colours as string props in 20+ page files instead of CSS variables.
3. Multiple overlapping card components: `ContentBox`, `Card` (shadcn), `InfoCard`, `HighlightCard`.
4. Inconsistent container classes (`content-section` vs `content-wide`).
5. `PageOrientation` has highly variable prop usage across pages.
6. Duplicate toast systems.
7. Large monolithic page files mixing data, logic, and presentation (`MyChildProfile.tsx` 721 lines, `EHCPs.tsx` 354 lines, `Admin.tsx` 593 lines).
8. Heading hierarchy varies per page with no shared scale.
9. `PageAccentContext` used by some pages while others pass HSL strings directly.
10. Footer contains 40+ links with inconsistent grouping vs Header mega menu.

---

## Section B: Complete Route Map

### Active Routes

| Route | File | Auth | Status |
|---|---|---|---|
| `/landing` | Landing.tsx | Public | Active |
| `/` | Start.tsx | Protected | Active |
| `/quick-read` | QuickRead.tsx | Protected | Active |
| `/ehcps` | EHCPs.tsx | Protected | **Reported broken** |
| `/ehcp-health` | EHCPHealth.tsx | Protected | Active |
| `/post-16-and-transition` | Post16AndTransition.tsx | Protected | Active |
| `/what-to-do-right-now` | WhatToDoRightNow.tsx | Protected | Active |
| `/my-child-profile` | MyChildProfile.tsx | Protected | Active |
| `/state-of-send-2026` | StateOfSend2026.tsx | Protected | Active |
| `/state-of-send-2026/where-we-are-now` | WhereWeAreNow.tsx | Protected | Active |
| `/state-of-send-2026/what-is-changing` | WhatIsChanging.tsx | Protected | Active |
| `/state-of-send-2026/what-has-not-changed` | WhatHasNotChanged.tsx | Protected | Active |
| `/state-of-send-2026/what-is-being-discussed` | WhatIsBeingDiscussed.tsx | Protected | Active |
| `/state-of-send-2026/what-we-do-not-know` | WhatWeDoNotKnow.tsx | Protected | Active |
| `/state-of-send-2026/what-the-leaks-are-saying` | WhatTheLeaksAreSaying.tsx | Protected | Active |
| `/state-of-send-2026/what-the-leaks-do-not-mean` | WhatTheLeaksDoNotMean.tsx | Protected | Active |
| `/state-of-send-2026/timeline` | Timeline.tsx | Protected | Active |
| `/questions-and-answers` | QuestionsAndAnswers.tsx | Protected | Active |
| `/community-questions` | CommunityQuestions.tsx | Protected | Active |
| `/admin` | Admin.tsx | Protected (no role check) | **Security risk** |
| `/about` | About.tsx | Public | Active |
| `/sources` | Sources.tsx | Public | Active |
| `/statistics-and-data` | StatisticsAndData.tsx | Public | Active |
| `/how-to-use` | HowToUse.tsx | Public | Active |
| `/why-i-built-this` | WhyIBuiltThis.tsx | Public | Active |
| `/rich-ferriman` | RichFerriman.tsx | Public | Active |
| `/richs-take` | RichsTake.tsx | Public | Active |
| `/neurodiversity-global` | NeurodiversityGlobal.tsx | Public | Active |
| `/feedback` | Feedback.tsx | Public | Active |
| `/privacy-policy` | PrivacyPolicy.tsx | Public | Active |
| `/sendiass` | Sendiass.tsx | Public | Active |
| `/have-your-say` | HaveYourSay.tsx | Public | Active |
| `/what-we-owe-our-children` | WhatWeOweOurChildren.tsx | Public | Active |
| `/understanding-your-child` | UnderstandingYourChild.tsx | Public | Active |
| `/understanding-your-child/autism` | UnderstandingAutism.tsx | Public | Active |
| `/understanding-your-child/adhd` | UnderstandingADHD.tsx | Public | Active |
| `/for-parents` | ForParents.tsx | Public | Active |
| `/exclusions` | Exclusions.tsx | Public | Active |
| `/ehcp-health` | EHCPHealth.tsx | Public | Active |
| `/alternative-provision` | AlternativeProvision.tsx | Public | Active |
| `/local-variation` | LocalVariation.tsx | Public | Active |
| `/devolved-nations` | DevolvedNations.tsx | Public | Active |
| `/reset-password` | ResetPassword.tsx | Public | Active |
| `/feature/*` (6 routes) | landing/*.tsx | Public | Active |

### Redirect Routes (11 total, all active, point to correct destinations)

Old paths like `/where-we-are-now` redirect to `/state-of-send-2026/where-we-are-now` etc.

### Dead/Orphaned Code

- `Navigation.tsx` — old nav items, not imported anywhere
- `SiteNavigation.tsx` — old nav items, not imported anywhere
- `JourneyNavBar.tsx` — returns `null` unconditionally
- `WhatWeKnowSoFar.tsx`, `WhatThisCouldMean.tsx`, `WhatHappensNext.tsx` — lazy-loaded but only redirect targets render

---

## Section C: Feature Wiring Matrix

| Feature | Status | Key Gap |
|---|---|---|
| This is me: full workflow | Fully wired | Stage/accessCode lost on refresh |
| Save/restore (access code) | Fully wired | Access code lost on refresh |
| AI report generation | Fully wired | max_tokens 8000 may truncate long profiles |
| Knowledge chunks retrieval | Fully wired | Keyword-based (tsvector), top 5 |
| PDF generation | Fully wired | **Cover says "A Profile" not "This is me"** |
| Dashboard views | Fully wired | — |
| Mini report mode | Fully wired | — |
| Section AI regeneration | Fully wired | — |
| Ask Rich | Fully wired | Recently fixed CORS |
| Auth (accounts) | Fully wired | Auto-confirm enabled |
| 3-profile limit | Partially wired | **No DB trigger attached** |
| 14-day expiry | Partially wired | **No scheduled cleanup** |
| Email reports | Fully wired | Uses Resend |
| Anonymised sharing | Not implemented | — |
| Listen mode | UI only | No audio source |
| Scan mode | UI only | No content adaptation |

---

## Section D: Data Flow and Persistence

### What survives refresh
- Profile answers, AI report → localStorage (500ms debounce via `ChildProfileContext`)

### What is lost on refresh
- `accessCode` — React state only in `ChildProfileContext`
- `stage` — React state only in `MyChildProfile.tsx` (resets to "opening")
- `regenState` — transient

### Key flow
1. User fills sections → context state → auto-saved to localStorage
2. Manual save → `save-profile` edge function → `saved_profiles` table (service role key bypasses RLS)
3. Restore → access code → edge function returns profile_data → loaded into context
4. Report generation → builds text from all sections → sends to `generate-profile-report` edge function with up to 5 knowledge chunks → response stored in context + localStorage + DB on next save

---

## Section E: AI Usage Audit

- **Model**: `google/gemini-3-flash-preview` via Lovable AI gateway
- **What is sent**: Full profile text (all section answers + reflections + child voice + final statement), child name, reason, shared-with list, up to 5 knowledge chunks
- **Knowledge retrieval**: Full-text search (`tsvector`) extracting top 15 distinctive terms, OR-based query, limit 5 chunks
- **No external access**: No web retrieval at runtime
- **Storage**: AI report stored in context → localStorage → `saved_profiles.ai_report` on manual save
- **Section regeneration**: Sends single section to `regenerate-section` edge function
- **Token risk**: `max_tokens: 8000` output limit; no input size check
- **UI/reality mismatch**: Some SEO text previously said "Nothing is stored" — needs verification that this was updated

---

## Section F: Database and Schema

| Table | Purpose | RLS | Active | Issues |
|---|---|---|---|---|
| `saved_profiles` | Profile persistence | Yes (user CRUD own) | Active | No trigger attached for max 3 check; no scheduled expiry cleanup |
| `knowledge_chunks` | RAG knowledge base | Yes (public read) | Active | — |
| `knowledge_base` | Topic-level entries | Yes (public read active) | Active | — |
| `news_items` | News tracker | Yes (public read published) | Active | — |
| `user_questions` | Ask Rich submissions | Yes (public insert, read approved) | Active | — |
| `user_feedback` | Feedback | Yes (public insert, read approved) | Active | — |
| `contact_submissions` | Contact form | Yes (public insert, no read) | Active | — |
| `page_views` | Analytics | Yes (public insert, no read) | Active | — |
| `page_update_flags` | Content staleness | Yes (no public access) | Active (admin) | — |
| `page_reviews` | Review checklist | Yes (no public access) | Active (admin) | — |
| `content_updates` | Update pipeline | Yes (no public access) | Active (admin) | — |

**Missing**: `user_roles` table for admin access control.

---

## Section G: Rename Audit

### Still using old name
| File | Line | Content | Fix |
|---|---|---|---|
| `src/lib/generate-profile-pdf.ts` | 479 | `doc.text("A Profile", ...)` — PDF cover subtitle | Change to "This is me" |
| `public/my-child-profile-audit.txt` | 1 | `My Child: A Profile — Complete Technical...` | Update title |

### Internal identifiers (keep unchanged)
- Route `/my-child-profile` — URL stability
- File `MyChildProfile.tsx`, component name `MyChildProfile` — internal
- Context `ChildProfileContext`, localStorage key `my-child-profile-draft` — internal
- Directory `child-profile/` — internal

All other user-facing references were correctly renamed in the previous batch.

---

## Section H: UI Foundation Audit

Top blockers to site-wide refresh (summarised from analysis):

1. No `PageShell` — each page builds its own structure
2. Inline HSL strings in 20+ files instead of CSS variables
3. 4 overlapping card components
4. Inconsistent `content-section` vs `content-wide` containers
5. Variable `PageOrientation` props
6. Two toast systems
7. Large monolithic files
8. No shared heading scale
9. Split accent colour system (`PageAccentContext` vs inline props)
10. Footer/Header link duplication

---

## Section I: Bug List

| # | Issue | Severity | Fix |
|---|---|---|---|
| 1 | EHCP page fails to load | High | Browser debug required — check `DataVisuals` or `LatestUpdatesStream` for runtime error |
| 2 | PDF cover says "A Profile" not "This is me" | Medium | Update line 479 of `generate-profile-pdf.ts` |
| 3 | Admin accessible to any authenticated user | High | Add `user_roles` table + check |
| 4 | `check_max_profiles` trigger not attached | Medium | Create trigger on `saved_profiles` |
| 5 | No scheduled expired profile cleanup | Medium | Add `pg_cron` job |
| 6 | Access code lost on refresh | Medium | Persist to localStorage |
| 7 | Stage lost on refresh | Medium | Persist to localStorage |
| 8 | `orientationOn` state orphaned | Low | Remove from context, always render bar |
| 9 | Listen/Scan modes do nothing | Low | Remove or implement |
| 10 | 3 dead page components lazy-loaded | Low | Remove imports |
| 11 | Dual toast systems | Low | Remove one |
| 12 | Hardcoded domain in 7 files | Low | Centralise |

---

## Section J: Ordered Cleanup Plan

### Batch 1: Critical bugs and rename completion
- Debug and fix EHCP page loading failure
- Update PDF cover subtitle from "A Profile" to "This is me" (`generate-profile-pdf.ts` line 479)
- Update `public/my-child-profile-audit.txt` title

### Batch 2: Dead code removal
- Delete `Navigation.tsx`, `SiteNavigation.tsx`, `JourneyNavBar.tsx`
- Delete `WhatWeKnowSoFar.tsx`, `WhatThisCouldMean.tsx`, `WhatHappensNext.tsx`
- Remove corresponding lazy imports from `App.tsx` (keep redirect routes)

### Batch 3: State persistence
- Persist `accessCode` to localStorage in `ChildProfileContext`
- Persist `stage` to localStorage in `MyChildProfile.tsx`

### Batch 4: OrientationBar cleanup
- Remove `orientationOn`/`setOrientationOn` from `ExperienceModeContext`
- Remove the `if (!orientationOn)` check in `OrientationBar` line 82

### Batch 5: Security
- Create `user_roles` table with `app_role` enum and `has_role` function
- Add admin role check to `/admin` route
- Attach `check_max_profiles` trigger to `saved_profiles`

### Batch 6: Database maintenance
- Add `pg_cron` job for daily `cleanup_expired_profiles`

### Batch 7: UI-only feature decision
- Remove Listen mode and Scan mode from `ExperienceSelector`, delete `ListenModePlayer` and `ScanModeBanner` (or implement — user decision needed)

### Batch 8: Technical debt
- Centralise domain string into shared constant
- Remove one toast system
- Extract `TEST_DATA` from `MyChildProfile.tsx` into separate file

### Batch 9: Pre-refresh UI foundation
- Create accent colour CSS variables to replace all inline HSL strings
- Identify and build 5 shared components: `PageShell`, `ContentSection`, `CalloutBox`, `StatBlock`, `SectionHeader`

