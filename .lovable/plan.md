

## Diagnosis

The edge function logs reveal two distinct failures:

1. **Temperature parameter error (400)**: The `openai/gpt-5` model rejected `temperature: 0.7`. This was fixed in a previous edit but the log entry persists from before the fix.

2. **Connection closed before message completed (Http error)**: This is the current, active bug. The client sets a 120-second AbortController timeout. The `openai/gpt-5` model with a ~4,000-word system prompt, knowledge base context, and a full 22-section profile text is exceeding that window. The client aborts, the edge function sees "connection closed", and the user gets a generic failure toast.

## Root cause

`openai/gpt-5` is the slowest and most expensive model available. For a full profile with all 22 sections, the input payload can exceed 10,000 tokens, and the 8,000 max completion tokens output takes GPT-5 well beyond 120 seconds. Edge functions themselves have a ~150s wall clock limit, so even raising the client timeout would only buy marginal headroom.

## Plan

### 1. Switch to `google/gemini-3-flash-preview` (edge function)

Replace `openai/gpt-5` with `google/gemini-3-flash-preview` in the edge function. This model is fast, capable, handles large context well, and is the recommended default. It should complete in 30-60 seconds for a full profile, well within timeouts.

Update the `model` field in the `generate-profile-report/index.ts` fetch body and the `max_completion_tokens` parameter (rename to `max_tokens` if needed for Gemini compatibility, or keep as-is since the gateway normalises it).

### 2. Increase client timeout to 180 seconds (MyChildProfile.tsx)

Change the AbortController timeout from `120_000` to `180_000` as a safety margin, matching the edge function wall clock limit more closely.

### 3. Update the stored model name in the client (MyChildProfile.tsx)

Change the `model` field in the `updateAiReport` call from `"openai/gpt-5"` to `"google/gemini-3-flash-preview"` so the report metadata is accurate.

### 4. Add retry with exponential backoff for transient failures (edge function)

Wrap the AI gateway fetch call in a simple retry loop (max 2 retries, 2s then 4s delay) to handle transient 500/503 errors from the gateway without requiring the user to manually retry.

### Files changed

- `supabase/functions/generate-profile-report/index.ts` — model switch + retry logic
- `src/pages/MyChildProfile.tsx` — timeout increase + model name update

