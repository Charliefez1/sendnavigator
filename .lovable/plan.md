

## Problem diagnosis

The report generation is failing because of a critical architectural flaw in how the async call is managed:

1. User clicks "Generate my report" in `FinalScreen`
2. `handleGenerateReport` immediately calls `onReportLoading()` on line 116, which sets stage to `"report-loading"`
3. This **unmounts** `FinalScreen` and mounts `ReportLoadingScreen`
4. The `supabase.functions.invoke` call on line 121 is now running inside an unmounted component
5. The browser/React may abort the in-flight request, or the promise resolves but the error/success handlers (`setError`, `updateAiReport`, `onReportReady`) run against stale or dead component state
6. Edge function logs confirm: "connection closed before message completed" - the client is dropping the connection

Additionally, the Anthropic API call with 22 sections of dense content and 8000 max tokens can take 60-90 seconds, which may also exceed edge function timeouts.

## Plan

### 1. Lift report generation logic into the parent (`ProfileContent` in `MyChildProfile.tsx`)

Move the entire `supabase.functions.invoke("generate-profile-report")` call out of `FinalScreen` and into `ProfileContent`, which stays mounted across all stage transitions. This ensures the async call is never interrupted by component unmounting.

- Create a `handleGenerateReport` callback in `ProfileContent` that:
  - Sets stage to `"report-loading"`
  - Calls the edge function
  - On success: stores the report via `updateAiReport`, sets stage to `"report-preview"`
  - On error: sets stage back to `"final"` and shows a toast with the error

- Pass this callback to `FinalScreen` as a single `onGenerate` prop (replacing `onReportLoading`, `onReportReady`, `onReportError`)

### 2. Simplify `FinalScreen`

- Remove the `supabase.functions.invoke` call entirely
- Remove `onReportLoading`, `onReportReady`, `onReportError` props
- Accept a new `onGenerate: (email?: string) => void` prop
- The "Generate my report" button calls `onGenerate(parentEmail)` and nothing else
- Keep the consent logic, email input, and final statement as-is

### 3. Pass email through for background send

- The parent `ProfileContent` receives the email from `onGenerate`, stores it in a ref, and after report generation succeeds, sends the email in the background (same logic currently in `onReportReady`)

### 4. Add a longer timeout to the edge function call

- Use `AbortController` with a 120-second timeout on the `supabase.functions.invoke` call to prevent premature client-side cancellation

### Files changed

- `src/pages/MyChildProfile.tsx` - move generation logic here
- `src/components/child-profile/FinalScreen.tsx` - simplify to just UI + `onGenerate` callback

