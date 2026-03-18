# Product Requirements Document: SEND Navigator

**Version:** 1.0
**Date:** 2026-03-18
**Status:** Draft
**Owner:** Rich Ferriman / SEND Navigator Team

---

## 1. Overview

### 1.1 Purpose

SEND Navigator is a web application that helps parents and carers navigate the UK's Special Educational Needs and Disabilities (SEND) system. It combines an AI-powered child profile builder with a comprehensive knowledge hub, community Q&A, and news tracker — all designed to give families clarity, confidence, and practical tools when engaging with schools, local authorities, and the EHCP process.

### 1.2 Vision

To be the most trusted digital companion for UK SEND families — reducing overwhelm, improving outcomes, and making the system more navigable for every parent regardless of their background or familiarity with SEND processes.

### 1.3 Target Users

| User Type | Description |
|-----------|-------------|
| **Primary** | Parents and carers of children with SEND (any age, any need type) |
| **Secondary** | SENCOs and school staff supporting families |
| **Tertiary** | SEND advocates, support workers, and organisations working with families |

---

## 2. Goals and Success Metrics

### 2.1 Business Goals

- Grow to 10,000 active registered users within 12 months of launch
- Establish SEND Navigator as a leading authority on UK SEND policy and process
- Build a sustainable model (subscriptions, partnerships, grants) to fund ongoing development
- Support the broader "State of SEND 2026" report and policy advocacy

### 2.2 User Goals

- Create a clear, accurate profile of their child's needs and strengths
- Understand their rights under the SEND Code of Practice
- Get practical answers to specific SEND questions quickly
- Stay informed about SEND policy changes affecting them

### 2.3 Success Metrics

| Metric | Target |
|--------|--------|
| Profile completion rate | ≥ 60% of started profiles completed |
| AI report generation rate | ≥ 70% of completed profiles generate a report |
| PDF/email export rate | ≥ 40% of generated reports exported |
| Monthly active users | 5,000 within 6 months, 10,000 within 12 months |
| Knowledge hub page sessions | ≥ 3 pages per session average |
| Ask Rich submission rate | ≥ 5% of registered users submit a question |
| User satisfaction (NPS) | ≥ 50 |

---

## 3. Features and Requirements

### 3.1 "This Is Me" Profile Builder

**Description:** An interactive, 22-section questionnaire that helps parents build a structured profile of their child. The profile captures needs, strengths, communication preferences, and goals, then generates an AI-powered narrative report suitable for use in school meetings, EHCP requests, and other formal contexts.

#### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| P-01 | Users must be able to start a profile without creating an account (guest mode) | High |
| P-02 | Profile progress must persist across page refreshes using localStorage | High |
| P-03 | Authenticated users can save up to 3 profiles to the cloud via a 6-digit access code | High |
| P-04 | Each section must allow a "child's own voice" block for direct quotes or contributions | High |
| P-05 | Profile must support a "filled by" and "shared with" metadata block for context | Medium |
| P-06 | Users can navigate non-linearly between sections and return to any section | High |
| P-07 | All 22 sections must be completable on mobile without horizontal scroll | High |
| P-08 | Progress indicator must show completed vs remaining sections | Medium |
| P-09 | A final "statement of intent" block must be available at the end of the questionnaire | High |
| P-10 | Saved profiles expire after 14 days without renewal (shown clearly to user) | Medium |

#### AI Report Generation

| ID | Requirement | Priority |
|----|-------------|----------|
| R-01 | AI must generate a structured, narrative report from completed profile answers | High |
| R-02 | Report must reference up to 5 relevant knowledge chunks from the knowledge base (RAG) | High |
| R-03 | Report output must be capped at 8,000 tokens to prevent runaway costs | High |
| R-04 | Individual sections must be regeneratable independently without full report re-run | Medium |
| R-05 | Report tone must be professional, empathetic, and suitable for formal SEND documentation | High |
| R-06 | AI model used must be configurable (currently Google Gemini Flash) | Low |

#### Export & Sharing

| ID | Requirement | Priority |
|----|-------------|----------|
| E-01 | Users must be able to export the full profile + report as a PDF | High |
| E-02 | PDF cover must display "This is me" as the document subtitle (not "A Profile") | High |
| E-03 | PDF must include profile metadata, all completed sections, and the AI report | High |
| E-04 | Users must be able to email the PDF report to themselves or others | High |
| E-05 | Anonymised profile sharing (for advocacy or research) must be supported | Low |

---

### 3.2 Knowledge Hub

**Description:** A structured library of educational content covering the full range of UK SEND law, policy, processes, and practice. Content is organised by topic and kept up to date via an admin content pipeline.

#### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| K-01 | All knowledge hub pages must be publicly accessible without login | High |
| K-02 | Pages must be organised by topic (EHCPs, exclusions, alternative provision, etc.) | High |
| K-03 | Content must reflect devolved nations differences (England, Wales, Scotland, NI) | High |
| K-04 | Each page must display a "last reviewed" date | High |
| K-05 | Stale pages (not reviewed in 90 days) must be flagged to admins | Medium |
| K-06 | Full-text search across all knowledge hub content must be available | Medium |
| K-07 | Pages must support SEO-optimised meta titles and descriptions | High |
| K-08 | Related pages must be surfaced at the bottom of each article | Low |

---

### 3.3 Ask Rich (Community Q&A)

**Description:** A curated Q&A feature where parents submit questions that are answered by Rich Ferriman. Approved answers are published publicly to benefit the wider community.

#### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| Q-01 | Any user (authenticated or not) must be able to submit a question | High |
| Q-02 | Submitted questions must go into a moderation queue before publication | High |
| Q-03 | Approved Q&As must be searchable and browsable by topic | Medium |
| Q-04 | Users who submitted a question must be notified by email when answered | Medium |
| Q-05 | Questions must be anonymised before publication (no personal details) | High |

---

### 3.4 News Tracker

**Description:** An aggregated feed of SEND-relevant policy news, tribunal outcomes, guidance updates, and sector news. Keeps families and professionals informed about changes that affect them.

#### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| N-01 | News items must be manually curated and published by admins | High |
| N-02 | News must be filterable by tag/category | Medium |
| N-03 | A headline ticker must surface recent news across the site | Medium |
| N-04 | Automated news ingestion (from RSS or other sources) is a future enhancement | Low |

---

### 3.5 Admin Dashboard

**Description:** An internal tool for content management, moderation, and analytics. Only accessible to admin users.

#### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| A-01 | Admin route must be protected by role-based access control (admin role only) | Critical |
| A-02 | Admins must be able to add, edit, and delete knowledge base chunks | High |
| A-03 | Admins must be able to manage news items (create, publish, archive) | High |
| A-04 | Admins must be able to moderate Q&A submissions (approve, reject, edit) | High |
| A-05 | Admins must be able to review and flag pages for content staleness | Medium |
| A-06 | Analytics dashboard must show page view counts and top pages | Medium |
| A-07 | Content update pipeline must allow tracking of in-progress content edits | Low |

---

### 3.6 Authentication & Accounts

| ID | Requirement | Priority |
|----|-------------|----------|
| AU-01 | Users must be able to register with email and password | High |
| AU-02 | Email verification must be required before accessing protected features | High |
| AU-03 | Users must be able to reset their password via email | High |
| AU-04 | Sessions must persist across browser refreshes | High |
| AU-05 | Admin accounts must be distinguishable from standard user accounts | Critical |

---

### 3.7 Accessibility & Experience Modes

| ID | Requirement | Priority |
|----|-------------|----------|
| AX-01 | Site must meet WCAG 2.1 AA accessibility standards | High |
| AX-02 | Listen Mode must provide audio playback of page content | Medium |
| AX-03 | Scan Mode must adapt layout for easier visual scanning | Medium |
| AX-04 | Orientation bar must be toggleable and persist user preference | Medium |
| AX-05 | All interactive elements must be keyboard-navigable | High |
| AX-06 | Colour contrast must meet WCAG AA requirements in both light and dark mode | High |

---

## 4. Technical Requirements

### 4.1 Architecture

- **Frontend:** React 18 with TypeScript, Vite, Tailwind CSS, shadcn-ui
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions, Row Level Security)
- **AI:** Google Gemini Flash (via Lovable gateway) for report generation
- **Email:** Resend for transactional email (report delivery, notifications)
- **PDF:** jsPDF for client-side PDF generation
- **Hosting:** Lovable.dev deployment (custom domain support)

### 4.2 Performance

| Requirement | Target |
|-------------|--------|
| First Contentful Paint (FCP) | < 2s on 4G mobile |
| Time to Interactive (TTI) | < 4s on 4G mobile |
| Lighthouse Performance Score | ≥ 80 |
| Page bundle size | Core bundle < 250KB gzipped |
| Lazy loading | All page components must be lazy-loaded |

### 4.3 Security

| Requirement | Priority |
|-------------|----------|
| Row Level Security (RLS) on all Supabase tables | Critical |
| Admin role-based access control enforced at route and API level | Critical |
| No sensitive keys exposed in client-side code | Critical |
| 3-profile limit enforced by database trigger (not just edge function) | High |
| Expired profile cleanup via scheduled Supabase function | Medium |
| CORS properly configured on all edge functions | High |

### 4.4 Data & Privacy

| Requirement | Priority |
|-------------|----------|
| No personal data shared with AI provider (profile answers anonymised or summarised) | Critical |
| Cookie consent banner with granular consent options | High |
| Privacy policy and terms of service pages available | High |
| User data exportable and deletable on request (GDPR) | High |
| Profiles expired and deleted after 14 days inactivity | High |

---

## 5. Known Issues and Technical Debt

The following issues are known and should be resolved as part of the v1.0 stabilisation effort:

| Issue | Severity | Description |
|-------|----------|-------------|
| Admin route unprotected | Critical | `/admin` is accessible to any authenticated user — no role check |
| EHCP page broken | Critical | `/ehcps` has a suspected runtime error in `DataVisuals` or `LatestUpdatesStream` |
| PDF subtitle incorrect | High | PDF cover shows "A Profile" instead of "This is me" |
| Access code lost on refresh | High | Access code stored in React state only — lost on page refresh |
| Profile stage lost on refresh | High | `MyChildProfile.tsx` stage stored in component state only |
| DB trigger missing | Medium | `check_max_profiles` trigger not attached — 3-profile limit only enforced in edge function |
| No scheduled profile cleanup | Medium | `cleanup_expired_profiles` function exists but is never invoked |
| Dual toast systems | Low | Both Radix Toast and Sonner are mounted — should consolidate to one |
| Hardcoded domain strings | Low | Domain string hardcoded in 7 files — should use a shared constant |
| Dead components | Low | 3 lazy-loaded page components and 3 navigation components are unreachable |

---

## 6. Roadmap

### Phase 1 — Stabilise (Current)
- Fix critical bugs (admin RBAC, EHCP page, PDF subtitle)
- Fix high-severity data persistence issues (access code, stage on refresh)
- Implement DB-level 3-profile limit trigger
- Consolidate toast notification system
- Remove dead code

### Phase 2 — Complete Core Features
- Wire Listen Mode (audio playback)
- Wire Scan Mode (layout adaptation)
- Fix Orientation Bar toggle
- Implement anonymised sharing
- Add site-wide search integration

### Phase 3 — Growth & Scale
- Automated news ingestion
- Email notifications for Q&A answers
- GDPR data export/deletion tooling
- Partner and advocacy organisation features
- Subscription/payment model exploration

### Phase 4 — Intelligence
- Personalised knowledge recommendations based on profile
- Trend analysis across anonymised profiles (aggregate insights)
- Automated content staleness detection using AI
- Multi-language support (Welsh as first priority)

---

## 7. Out of Scope (v1.0)

- Native mobile apps (iOS/Android)
- Real-time collaboration on profiles
- Video or multimedia content within the knowledge hub
- Integration with local authority portals or case management systems
- Automated legal advice or case assessment

---

## 8. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | What is the monetisation model? Subscription, freemium, grants, or partnership? | Rich | Open |
| 2 | Should Listen Mode use browser TTS or a third-party audio service? | Tech | Open |
| 3 | What is the admin role assignment process? Manual DB update or self-service? | Tech | Open |
| 4 | Are there plans to support devolved nation-specific profile templates? | Rich | Open |
| 5 | Should news ingestion be automated via RSS in Phase 3? | Rich | Open |
| 6 | How should profile expiry notification be communicated to users (email, in-app)? | Rich | Open |

---

## 9. Appendix

### 9.1 Glossary

| Term | Definition |
|------|-----------|
| **SEND** | Special Educational Needs and Disabilities |
| **EHCP** | Education, Health and Care Plan — a legal document for children with complex SEND needs |
| **SENCO** | Special Educational Needs Coordinator — a school staff role |
| **RAG** | Retrieval-Augmented Generation — AI technique using a knowledge base to ground responses |
| **RLS** | Row Level Security — Supabase/PostgreSQL feature for per-row data access control |
| **RBAC** | Role-Based Access Control — restricting features by user role |

### 9.2 Related Documents

- `/home/user/sendnavigator/.lovable/plan.md` — Foundation Audit & Cleanup Plan
- Supabase project: `mtvgtroqdjuffdhvgfzg`
- Lovable project dashboard
