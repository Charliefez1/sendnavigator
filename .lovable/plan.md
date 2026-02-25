

# Static Plain Text Content Mirror

## Overview
Create a `public/content/` directory containing plain text extracts of every parent-facing page on the site, plus a master index. This allows external AI tools (ChatGPT, Claude) to read all site content without JavaScript rendering.

## Scope
- Content extraction only -- no changes to routing, UI, styling, or functionality
- `public/send-navigator-full-export.txt` remains unchanged
- Extract only parent-facing copy as displayed in the UI
- Preserve UK spelling, punctuation, headings, lists, and numbered steps exactly

## Files to create

### 1. Master index: `public/content/index.txt`

Pipe-separated, one page per line, header row first:

```text
route | title | description | last_updated | status | content_file
```

Underscore file names (not hyphens).

### 2. Individual content files (35 files)

Each file follows this exact structure:

```text
Title: [page title]
Route: [route path]
Description: [page description]
Last updated: [date]
Status: [confirmed / discussed / unconfirmed / n/a]
Key topics: [comma-separated]
Key numbers: [comma-separated stat values]
Key sources: [sources cited on page]

---

[Body content with headings, subheadings, lists, numbered steps preserved]
[Internal links shown as: text [/route]]
```

### Page list (35 content files)

**State of SEND 2026 report (9 files):**
1. `public/content/state_of_send_2026.txt` -- Report hub (/state-of-send-2026)
2. `public/content/where_we_are_now.txt` -- 8 sections, stats, data visuals (/state-of-send-2026/where-we-are-now)
3. `public/content/what_is_changing.txt` -- 10 sections including white paper (/state-of-send-2026/what-is-changing)
4. `public/content/what_has_not_changed.txt` -- 9 sections, rights checklist (/state-of-send-2026/what-has-not-changed)
5. `public/content/what_is_being_discussed.txt` -- 9 sections, tier diagram (/state-of-send-2026/what-is-being-discussed)
6. `public/content/what_we_do_not_know.txt` -- 9 sections (/state-of-send-2026/what-we-do-not-know)
7. `public/content/what_the_leaks_are_saying.txt` -- 9 sections (/state-of-send-2026/what-the-leaks-are-saying)
8. `public/content/what_the_leaks_do_not_mean.txt` -- (/state-of-send-2026/what-the-leaks-do-not-mean)
9. `public/content/timeline.txt` -- Visual timeline milestones (/state-of-send-2026/timeline)

**Parent guides (11 files):**
10. `public/content/ehcps.txt` -- Full EHCP guide, all sections A-K, process, stats (/ehcps)
11. `public/content/ehcp_health.txt` -- Health in EHCPs (/ehcp-health)
12. `public/content/understanding_your_child.txt` -- (/understanding-your-child)
13. `public/content/understanding_autism.txt` -- (/understanding-your-child/autism)
14. `public/content/understanding_adhd.txt` -- (/understanding-your-child/adhd)
15. `public/content/exclusions.txt` -- Full exclusions and rights guide (/exclusions)
16. `public/content/alternative_provision.txt` -- (/alternative-provision)
17. `public/content/post_16_and_transition.txt` -- (/post-16-and-transition)
18. `public/content/what_to_do_right_now.txt` -- 5 situations, help resources (/what-to-do-right-now)
19. `public/content/sendiass.txt` -- (/sendiass)
20. `public/content/quick_read.txt` -- Quick summary of all 8 report sections (/quick-read)

**System pages (2 files):**
21. `public/content/local_variation.txt` -- (/local-variation)
22. `public/content/devolved_nations.txt` -- (/devolved-nations)

**Action and community (5 files):**
23. `public/content/have_your_say.txt` -- (/have-your-say)
24. `public/content/for_parents.txt` -- Support and wellbeing (/for-parents)
25. `public/content/what_we_owe_our_children.txt` -- (/what-we-owe-our-children)
26. `public/content/community_questions.txt` -- (/community-questions)
27. `public/content/questions_and_answers.txt` -- Ask Rich intro (/questions-and-answers)

**About and meta (6 files):**
28. `public/content/about.txt` -- Governance, independence (/about)
29. `public/content/sources.txt` -- (/sources)
30. `public/content/how_to_use.txt` -- (/how-to-use)
31. `public/content/why_i_built_this.txt` -- (/why-i-built-this)
32. `public/content/rich_ferriman.txt` -- (/rich-ferriman)
33. `public/content/neurodiversity_global.txt` -- (/neurodiversity-global)

**Other (2 files):**
34. `public/content/start.txt` -- Home page with all navigation sections (/start)
35. `public/content/privacy_policy.txt` -- (/privacy-policy)

### 3. Sitemap update: `public/sitemap.xml`

- Add missing `/state-of-send-2026/` routes (hub + 8 sections)
- Add missing pages: `/ehcps`, `/exclusions`, `/for-parents`, `/what-to-do-right-now`, `/post-16-and-transition`, `/ehcp-health`, `/alternative-provision`, `/understanding-your-child`, `/local-variation`, `/devolved-nations`, `/have-your-say`, `/what-we-owe-our-children`, `/quick-read`, `/my-child-profile`, `/privacy-policy`
- Remove old redirected routes (`/where-we-are-now`, `/what-is-changing`, etc.)
- Content mirror routes (`/content/*.txt`) included at lower priority (0.2) if added

## Extraction rules (confirmed)
- Extract only parent-facing copy as displayed in UI
- Do not summarise or rewrite content
- Do not introduce new wording
- Do not attempt to reconcile statistics
- Preserve UK spelling and punctuation
- Include internal link text with destination routes in brackets
- Exclude navigation chrome, developer labels, and non-meaningful UI text

## Technical notes
- All files in `public/` so Vite serves them as static assets, bypassing the SPA router
- `.txt` extension ensures tools get plain text
- This is a large batch of file creation (37 new files + 1 update) -- will be done in parallel batches
- Each page's JSX must be read and its text content extracted faithfully
- Word From Rich blocks, confidence labels, and stat cards are all included as text content
- Collapsible/accordion content (e.g. EHCP sections A-K, situations in What To Do) is extracted in full (expanded state)

