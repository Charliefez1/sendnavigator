

# Security Audit Remediation Plan

## Summary

The uploaded security audit identified 18 issues (3 Critical, 5 High, 6 Medium, 4 Low). The existing Lovable security scan also flagged several overlapping concerns. This plan addresses all fixable issues in priority order.

---

## Issue-by-Issue Remediation

### CRITICAL Issues

**1. Admin PIN hardcoded in source code (Issue #1)**
- The PIN `8385` is hardcoded on line 9 of `supabase/functions/admin-moderate/index.ts`
- Fix: Replace with `Deno.env.get("ADMIN_PIN")`. The `ADMIN_PIN` secret already exists in the project secrets, so no new secret is needed
- Also add an action allowlist and table allowlist to the same function (covers Issue #9)

**2. .env file missing from .gitignore (Issue #2)**
- `.gitignore` does not include `.env`
- Fix: Add `.env`, `.env.local`, and `.env.*.local` to `.gitignore`
- Note: In Lovable Cloud the `.env` is auto-generated and not pushed to public repos, but adding it is best practice

**3. Child profile data privacy notice (Issue #3)**
- The profile builder collects sensitive child data with no explicit GDPR consent screen
- Fix: Add a clear data privacy notice and consent checkbox to `OpeningScreen.tsx` before the user can start. Also strengthen the access code generator in `save-profile/index.ts` to use `crypto.getRandomValues()` and 8 alphanumeric characters instead of 6 digits (covers Issue #12)

---

### HIGH Issues

**4. CORS wildcard on admin endpoint (Issue #4)**
- All edge functions use `Access-Control-Allow-Origin: *`
- Fix: Restrict CORS origin on `admin-moderate` to the production domain (`https://sendnavigator.lovable.app`). Other public-facing functions (qanda, save-profile, etc.) can keep the wildcard since they serve the preview and published URLs

**5. Admin rate limiting (Issue #5)**
- No rate limiting on PIN attempts
- Fix: Add an in-memory rate limiter to `admin-moderate/index.ts` — track failed attempts per IP, reject after 5 failures within 10 minutes

**6. Full export file publicly accessible (Issue #6)**
- `public/send-navigator-full-export.txt` is served to anyone
- Fix: Delete this file from the `public/` folder. If needed for internal use, store it outside the public directory

**7. Analytics fires before cookie consent (Issue #7)**
- `PageViewTracker` fires on every route change regardless of consent
- Fix: Update `usePageView.ts` to check `localStorage.getItem("cookieConsent") === "accepted"` before inserting into `page_views`. If consent is not given or is declined, skip tracking

**8. No rate limiting on Q&A edge function (Issue #8)**
- Fix: Add a simple per-IP rate limiter to `qanda/index.ts` — max 10 requests per minute per IP

---

### MEDIUM Issues

**9. Admin function accepts arbitrary table names (Issue #9)**
- Covered by the admin-moderate rewrite in Issue #1 — add a strict `ALLOWED_TABLES` allowlist

**10. Password minimum too short (Issue #10)**
- `AuthForm.tsx` accepts 6-character passwords
- Fix: Change `minLength` to 8 and update placeholder text to "Password (min 8 characters)"

**11. No spam protection on feedback/question forms (Issue #11)**
- Contact form already has a honeypot + timing check
- Fix: Add the same honeypot + timing pattern to the Feedback page (`src/pages/Feedback.tsx`)

**12. Weak access codes (Issue #12)**
- Covered in Issue #3 — upgrade to 8-character alphanumeric codes with `crypto.getRandomValues()`

**13. No privacy policy page (Issue #13)**
- Fix: Create `/privacy-policy` page covering: data collected, lawful basis, retention periods, user rights, contact details. Add link to footer and cookie consent banner

**14. Contact submissions not readable by admin (Issue #14)**
- Fix: Add a `contact_list` action to `admin-moderate/index.ts` and a "Contact Submissions" tab to the Admin page

---

### LOW Issues (post-release candidates, but included)

**15. Hardcoded lastUpdated date (Issue #15)**
- Fix: Already updated to "23rd February 2026" in recent changes. For dynamic fetching, add a simple query to get the max `updated_at` from `knowledge_base` in the qanda function

**16. Error messages may leak internal detail (Issue #16)**
- Fix: Replace `err.message` in catch blocks of all edge functions with generic error messages. Log the real error via `console.error`

**17. Admin route discoverable (Issue #17)**
- Low risk given other fixes. No action needed beyond what Issues #1 and #5 already cover

**18. No CSP headers (Issue #18)**
- Fix: Add a `_headers` file or `<meta>` tag with a basic Content-Security-Policy. This is hosting-level and has limited scope in Lovable Cloud — defer to post-release

---

## Files to Change

| File | Changes |
|------|---------|
| `.gitignore` | Add `.env` entries |
| `supabase/functions/admin-moderate/index.ts` | Use env secret for PIN, add table/action allowlists, add rate limiting, restrict CORS, add contact_list action, sanitise error messages |
| `supabase/functions/qanda/index.ts` | Add rate limiting, sanitise error messages, dynamic lastUpdated |
| `supabase/functions/save-profile/index.ts` | Upgrade access code to 8-char alphanumeric with crypto.getRandomValues(), sanitise error messages |
| `src/hooks/usePageView.ts` | Gate tracking on cookie consent |
| `src/components/AuthForm.tsx` | Change password minLength to 8 |
| `src/components/child-profile/OpeningScreen.tsx` | Add GDPR consent notice + checkbox before starting |
| `src/pages/Feedback.tsx` | Add honeypot + timing anti-spam |
| `src/pages/PrivacyPolicy.tsx` | New page with privacy policy content |
| `src/components/Footer.tsx` | Add Privacy Policy link |
| `src/components/CookieConsent.tsx` | Add Privacy Policy link |
| `src/App.tsx` | Add /privacy-policy route |
| `src/pages/Admin.tsx` | Add Contact Submissions tab |
| `public/send-navigator-full-export.txt` | Delete this file |

---

## Security Scan Findings to Update

After implementing, the following existing security findings will be resolved and marked as fixed:
- `admin_pin_hardcoded` (CRITICAL)
- `no_rate_limit_admin` (ERROR)
- `pin_client_transmission` (ERROR) — partially addressed; PIN still sent per-request but now rate-limited and from env secret
- `admin_table_injection` (currently ignored, will be properly fixed)
- `admin_error_exposure` (WARN)
- `weak_access_codes` (WARN)
- `saved_profiles_public_access` (WARN) — already fixed, access codes strengthened

## Order of Implementation

1. `.gitignore` update
2. `admin-moderate/index.ts` full rewrite (PIN, allowlists, rate limiting, CORS, error handling, contact_list)
3. `qanda/index.ts` rate limiting + error handling
4. `save-profile/index.ts` access code upgrade + error handling
5. `usePageView.ts` consent gate
6. `AuthForm.tsx` password length
7. `OpeningScreen.tsx` GDPR consent
8. `Feedback.tsx` anti-spam
9. Privacy Policy page + routing + footer/cookie links
10. Admin page contact submissions tab
11. Delete `public/send-navigator-full-export.txt`
12. Deploy edge functions and verify

