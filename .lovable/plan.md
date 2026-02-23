

## Regenerate Full Site Export

The current `public/send-navigator-full-export.txt` is 970 lines and was originally created on 19 February 2026. Since then, 15+ new pages have been added, the White Paper has been published, the My Child: A Profile tool has been built, the State of SEND 2026 report hub has been restructured, and the knowledge base and admin panel have expanded significantly.

### What the new export will contain

The file will be completely rewritten from scratch with the date set to **23 February 2026**. It will include:

**1. Table of Contents** - Updated to reflect all 35+ pages and sections

**2. Every current page and route, including all new pages since 19 February:**
- Landing Page (`/landing`)
- Start / Home Page (`/`)
- Quick Read Summary (`/quick-read`)
- State of SEND 2026 hub (`/state-of-send-2026`) and all 8 sub-pages:
  - Where We Are Now, What Is Changing, What Has Not Changed, What Is Being Discussed, What We Do Not Know, What The Leaks Are Saying, What The Leaks Do Not Mean, Timeline
- EHCPs: Complete Guide (`/ehcps`)
- Have Your Say (`/have-your-say`) - updated with White Paper publication on 23 February 2026
- What To Do Right Now (`/what-to-do-right-now`)
- What We Owe Our Children (`/what-we-owe-our-children`)
- Understanding Your Child hub (`/understanding-your-child`) with sub-pages:
  - Autism (`/understanding-your-child/autism`)
  - ADHD (`/understanding-your-child/adhd`)
- For Parents (`/for-parents`)
- Exclusions (`/exclusions`)
- EHCP Health (`/ehcp-health`)
- Alternative Provision (`/alternative-provision`)
- Local Variation (`/local-variation`)
- Devolved Nations (`/devolved-nations`)
- Post-16 and Transition (`/post-16-and-transition`)
- SENDIASS (`/sendiass`)
- Statistics and Data (`/statistics-and-data`)
- Community Questions (`/community-questions`)
- Neurodiversity Global (`/neurodiversity-global`)
- My Child: A Profile (`/my-child-profile`)
- Questions and Answers (`/questions-and-answers`)
- Sources (`/sources`)
- About (`/about`)
- Why I Built This (`/why-i-built-this`)
- Rich Ferriman (`/rich-ferriman`)

**3. AI System Prompts:**
- Ask Rich Q&A system prompt (from `src/config/ai-prompts.ts`)
- Generate Profile Report system prompt (from `supabase/functions/generate-profile-report/index.ts`) - full locked prompt including language rules, banned words, replacement framing, and section structure

**4. Knowledge Base:**
- 91 entries, 53 chunks
- Full content of all 7 knowledge sections (current legal position, confirmed changes, EHCPs and rights, leaks and reports, unknown areas, practical implications, timeline, operational reform architecture)

**5. Admin Panel:**
- 8 tabs: Questions, Feedback, Knowledge Base, News Tracker, Content Updates, Page Flags, Page Reviews, Analytics

**6. Design System:**
- 5-colour status system:
  - Confirmed (teal, HSL 175)
  - Discussed (amber, HSL 42)
  - Unconfirmed (orange, HSL 25)
  - Leaked (red, HSL 0)
  - Journey/Next (for timeline navigation)
- Semantic tokens: foreground, muted-foreground, card, border, primary, destructive

**7. Security and RLS:**
- 11 database tables, all with RLS enabled
- 5 linter warnings (4 permissive RLS policies using `true`, 1 leaked password protection disabled)
- Edge functions with `verify_jwt = false` for public access

**8. Governance and Editorial Rules** - carried forward from existing export

**9. Sources Registry** - carried forward from existing export

**10. Timeline Configuration** - updated with White Paper publication on 23 February 2026

### Technical approach

- Single file write to `public/send-navigator-full-export.txt`
- Content extracted from every page component's JSX text content
- All statistics verified against current page content
- Expected line count: approximately 2,200-2,500 lines (more than double the current 970)

### What will NOT change
- File location remains `public/send-navigator-full-export.txt`
- Markdown format preserved
- Accessible at the same URL

