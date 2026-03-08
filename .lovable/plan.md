

# New Page: How This Site Works — Transparency, AI, Data and Security

## What we are building
A dedicated `/how-this-site-works` page that consolidates all trust, transparency, AI usage, data handling, and security information into one clearly structured, parent-friendly page. This replaces the scattered trust notices and overlapping copy across the site.

## Page structure

### 1. Page orientation
Title: "How this site works"
Description: "How we research, build, and protect your information — and what Ask Rich can and cannot do."
Accent colour consistent with governance/about pages.

### 2. Sections (each in a ContentBox or similar card)

**A. Who we are and what this site does**
- Built by Rich and Charlie Ferriman / Neurodiversity Global Ltd
- Independent, free, not government or advocacy affiliated
- 1,000+ sources researched personally

**B. How we use AI**
- Ask Rich uses AI to deliver answers, but every piece of information is researched and written by Charlie and Rich
- AI draws only from content published on this site — nothing else
- AI tools helped build the site and conduct research across 1,000+ sources
- If something is unknown or incomplete, we say so straight

**C. What Ask Rich can and cannot do**
- Can: explain the big picture, what we know right now
- Cannot: comment on individual cases, give legal advice, predict outcomes
- Step-by-step: you ask → AI searches our knowledge base → returns answer grounded in our content → flags uncertainty

**D. How we label information**
- Reuse the existing StatusExplainer (Confirmed / Being discussed / Unconfirmed) with brief descriptions

**E. How we handle your data**
- What we collect (analytics, contact, feedback, child profile, auth)
- How long we keep it (14 days for profiles, 12 months for analytics, etc.)
- Who processes it (Lovable Cloud hosting, Anthropic for AI — not used for training)
- Link to full Privacy Policy

**F. Child profile ("This is me") data**
- Step-by-step: consent → enter answers → stored encrypted → AI generates report → auto-deleted after 14 days
- Access code system, no names stored in analytics
- GDPR lawful basis: consent

**G. Security measures**
- Encryption in transit and at rest
- Admin access protected by PIN + rate limiting
- RLS policies on all database tables
- CORS origin validation on backend functions
- Honeypot + timing-based spam protection on forms
- Password breach checks enabled
- No data sold or shared with advertisers

**H. How to challenge us**
- Feedback form link
- LinkedIn contact
- We correct errors transparently with dates

### 3. Route and navigation
- Route: `/how-this-site-works`
- Add to App.tsx routes (public)
- Create content file `public/content/how_this_site_works.txt`
- Add link from Footer and About page

## Technical approach
- New page component `src/pages/HowThisSiteWorks.tsx`
- Uses existing Layout, PageOrientation, ContentBox, StatusExplainer components
- Lazy-loaded in App.tsx
- New route added as public
- Content file for knowledge base indexing

## Files to create/edit
1. **Create** `src/pages/HowThisSiteWorks.tsx` — the full page
2. **Create** `public/content/how_this_site_works.txt` — content file
3. **Edit** `src/App.tsx` — add lazy import + route
4. **Edit** `src/components/Footer.tsx` — add link

