

## Plan: Produce Complete Site Audit Document

I will generate a comprehensive site audit as a downloadable document at `/mnt/documents/SEND-Navigator-Complete-Audit.md`. This is a research/documentation task, not a code change.

### What the document will cover

**1. Route Inventory** — All 50 routes mapped with page component, category, and purpose.

**2. Component Inventory** — Every component in `src/components/` categorised as: Layout, AI/Search, Content Template, UI Primitive, Navigation, Feedback, Admin, Profile, or Orphaned. Import count noted (0 = dead code).

**3. AI and Search Tools** — The 6 AI-touching components and 12 edge functions, showing which calls which, what model each uses, and what knowledge source feeds it.

**4. Database Tables** — All 11 tables with row counts, RLS policy summary, and which features use them.

**5. Edge Functions** — All 12 functions with purpose, model used, and dependencies.

**6. Config Files** — All 15 config files in `src/config/` with purpose and whether they are actively used.

**7. Lib Files** — All 11 lib files with purpose and usage.

**8. Contexts** — All 5 React contexts with purpose.

**9. Content Files** — All 40+ public content text files.

**10. Auth Architecture** — How auth works, what it protects, what it doesn't.

**11. Orphaned/Dead Code** — Components, configs, and files that are imported by nothing.

**12. Known Issues** — Duplicated logic, disconnected knowledge bases, generic AI responses.

### How I will do it

- Run database queries to get row counts for all tables
- Use the file readings already completed plus targeted additional reads
- Write the full audit to `/mnt/documents/SEND-Navigator-Complete-Audit.md`
- Present it as a downloadable artifact

### No code changes

This is a documentation-only task. No files in the project will be created, modified, or deleted.

