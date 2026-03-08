

# Fix EHCP Page: Make it Public

## The Problem
The EHCP page (`/ehcps`) is behind `ProtectedRoute`, which shows "Loading..." while auth resolves. If auth takes too long or has any hiccup, you get stuck on a blank loading screen.

## The Fix
One line change in `src/App.tsx` — remove the `ProtectedRoute` wrapper from the `/ehcps` route, making it publicly accessible like `/for-parents`, `/exclusions`, etc.

**Before:** `<Route path="/ehcps" element={<ProtectedRoute><EHCPs /></ProtectedRoute>} />`
**After:** `<Route path="/ehcps" element={<EHCPs />} />`

This is a single-line edit. No other files need to change.

