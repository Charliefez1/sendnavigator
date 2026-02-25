

# Temporarily Disable Authentication Gate

## What this does
Bypasses the sign-in requirement across the entire site so that external AI tools (ChatGPT, Claude) can access and review all pages without needing to log in.

## Approach
A single, minimal change to the `ProtectedRoute` component -- make it pass all children through without checking auth. This means every protected route (Start, EHCPs, State of SEND 2026 sections, Q&A, etc.) becomes publicly accessible immediately.

## Changes

**File: `src/components/ProtectedRoute.tsx`**
- Replace the auth check logic so it always renders children directly, bypassing the login redirect
- Keep the original code commented out so it can be restored in seconds

## Re-enabling
When you're done with the review, just ask me to re-enable authentication and I'll restore the original `ProtectedRoute` logic.

## Technical detail
No database, routing, or auth configuration changes needed. The `AuthProvider` and `useAuth` hook remain intact -- only the gate component stops enforcing the redirect.

