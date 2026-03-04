

# Domain Migration: sendnavigator.lovable.app → send.neurodiversityglobal.com

## Summary

A bulk find-and-replace of `sendnavigator.lovable.app` with `send.neurodiversityglobal.com` across 10 files containing 292 references. This ensures Google, Bing, ChatGPT, Claude, and Perplexity all attribute content to your authoritative domain under neurodiversityglobal.com.

## Files to update

| File | Changes |
|---|---|
| `index.html` | Canonical, OG URLs, Twitter image URLs, all JSON-LD blocks (~20 references) |
| `src/components/SEOHead.tsx` | `BASE_URL` constant (line 15) |
| `src/pages/Landing.tsx` | JSON-LD URL (line 66) |
| `public/sitemap.xml` | Every `<loc>` URL (~35 references) |
| `public/robots.txt` | Sitemap URL (line 84) |
| `public/llms.txt` | All page links (~12 references) |
| `supabase/functions/admin-moderate/index.ts` | `PRIMARY_ORIGIN` (line 4) |
| `supabase/functions/process-update/index.ts` | `PRIMARY_ORIGIN` (line 4) |
| `supabase/functions/parse-document/index.ts` | `PRIMARY_ORIGIN` (line 4) |
| `supabase/functions/email-profile-report/index.ts` | Email footer link (line 134) |

## Edge function CORS

The `PRIMARY_ORIGIN` in the three edge functions will change to `https://send.neurodiversityglobal.com`. The existing wildcard check for `*.lovable.app` and `*.lovableproject.com` will continue to allow preview/dev access.

## What stays the same

All content, structured data schemas, meta descriptions, and robots.txt crawler permissions remain unchanged. Only the domain string is swapped.

## After you publish

1. **Google Search Console**: Add `send.neurodiversityglobal.com` as a URL prefix property (your verified parent domain should make this instant). Submit the sitemap at `https://send.neurodiversityglobal.com/sitemap.xml`.
2. **Bing Webmaster Tools**: Same process, add the subdomain and submit the sitemap.
3. Google will begin re-indexing with the correct canonical URLs within days.

