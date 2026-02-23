

# Dynamic Knowledge Base Update System

## Current State

The site's SEND information lives in three disconnected places:

1. **Hardcoded page content** -- 20+ page files (e.g. WhereWeAreNow.tsx, WhatIsChanging.tsx) with static text and "last updated" dates frozen at mid-February 2026
2. **Database knowledge base** -- 65 entries in `knowledge_base` table, powering "Ask Rich" Q&A answers
3. **Knowledge chunks** -- 27 RAG chunks across 8 documents, powering profile report generation

When new information arrives (from you or from the news tracker API), none of these update automatically. You have to manually edit each page file, then separately update the knowledge base via admin.

## What This Plan Delivers

A system where you submit new information once, and it flows through the entire site -- updating the AI answers, the knowledge chunks, and flagging which pages need content refreshes.

---

## Architecture

```text
+------------------+       +------------------+
|  Admin Panel     |       |  News Tracker    |
|  (you paste new  |       |  (Perplexity     |
|   information)   |       |   cron job)      |
+--------+---------+       +--------+---------+
         |                          |
         v                          v
+------------------------------------------------+
|        content_updates table (new)             |
|  source, raw_content, status, processed_at     |
+------------------------+-----------------------+
                         |
                         v
+------------------------------------------------+
|     process-update edge function (new)         |
|  - AI summarises into KB-ready entries         |
|  - Upserts knowledge_base rows                |
|  - Regenerates knowledge_chunks               |
|  - Flags affected pages in page_update_flags  |
+------------------------+-----------------------+
                         |
            +------------+------------+
            |                         |
            v                         v
   knowledge_base             page_update_flags
   (Ask Rich answers          (new table showing
    auto-updated)              which pages are stale)
```

## Implementation Steps

### 1. New Database Tables

**content_updates** -- stores raw information submissions
- id, source (manual / news_tracker / api), raw_content, status (pending / processed / failed), submitted_at, processed_at

**page_update_flags** -- tracks which pages need content refreshes
- id, page_path, flag_reason, status (stale / updated / dismissed), flagged_at, resolved_at

### 2. New Edge Function: `process-update`

Takes raw content from `content_updates`, uses AI (Gemini Flash) to:
- Extract key facts and categorise by topic
- Upsert matching `knowledge_base` entries (update existing topics or create new ones)
- Rechunk updated content into `knowledge_chunks`
- Analyse which site pages are affected and insert flags into `page_update_flags`
- Mark the content_update as processed

### 3. Admin Panel: Content Update Submission

A new tab in the admin panel where you can:
- Paste raw text (articles, government announcements, briefings)
- Name the source
- Submit for processing
- See processing status and results
- View which pages are flagged as needing updates

### 4. News Tracker Integration

Update the existing `news-tracker` edge function to automatically create `content_updates` entries when significant news is discovered, so the pipeline processes them without manual intervention.

### 5. Page Staleness Indicators

Add a small admin-only banner on pages flagged as stale, visible only when logged in with the admin PIN, showing what new information is available and needs to be incorporated.

### 6. Knowledge Base Sync for Ask Rich

The `qanda` edge function already reads from `knowledge_base` dynamically -- no changes needed there. Once `process-update` writes new entries, Ask Rich immediately has access to them.

---

## Technical Details

### process-update Edge Function Logic

```text
1. Receive content_update ID
2. Read raw_content from content_updates table
3. Call Gemini Flash with prompt:
   - "Extract SEND-relevant facts from this text"
   - "Categorise each fact by topic"
   - "Identify which existing KB topics need updating"
   - "Identify which site pages are affected"
4. For each extracted topic:
   - Search knowledge_base for matching topic
   - If match: update content, set updated_at
   - If new: insert new entry
5. Rechunk the updated entries into knowledge_chunks
6. Insert page_update_flags for affected pages
7. Mark content_update as processed
```

### Page Path Mapping (for flag generation)

The AI will map topics to pages using a defined mapping:
- Legal position / EHCPs / rights --> /where-we-are-now, /ehcps
- Confirmed changes / 10 year plan --> /what-is-changing
- Leaks / unconfirmed --> /what-the-leaks-are-saying
- Timeline / dates --> /timeline, /what-happens-next
- Statistics / data --> /statistics-and-data
- Practical impact --> /what-this-could-mean, /for-parents

### Admin UI Changes

The existing Admin page gets a new "Content Updates" tab with:
- A text area to paste raw content + source name field
- A "Process" button that submits to the edge function
- A list of recent updates with status badges
- A "Page Flags" section showing which pages need attention

### Files to Create
| File | Purpose |
|------|---------|
| `supabase/functions/process-update/index.ts` | AI-powered content processing pipeline |
| `src/components/admin/ContentUpdateManager.tsx` | Admin UI for submitting and viewing updates |
| `src/components/admin/PageFlagsPanel.tsx` | Admin UI showing stale page flags |

### Files to Modify
| File | Change |
|------|---------|
| `supabase/functions/news-tracker/index.ts` | Auto-create content_updates from discovered news |
| `src/pages/Admin.tsx` | Add Content Updates and Page Flags tabs |
| `supabase/config.toml` | Register process-update function |

### Database Migrations
- Create `content_updates` table with RLS (insert via edge function only)
- Create `page_update_flags` table with RLS (read for admin, write via edge function)

