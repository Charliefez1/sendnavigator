

# Fix: Report Generation Failing

## Problem

The edge function logs show `Http: connection closed before message completed`. The client is disconnecting before the Anthropic API finishes responding. With a full 22-section profile, the Claude API call can take 60-90 seconds, and Supabase edge functions have execution time limits that can cause premature termination.

## Solution

Switch from the direct Anthropic API call to the **Lovable AI proxy**, which is already available in this project (the `LOVABLE_API_KEY` secret is configured). This removes the dependency on the separate `ANTHROPIC_API_KEY`, provides better connection handling, and uses the OpenAI-compatible endpoint format.

### Changes

**File: `supabase/functions/generate-profile-report/index.ts`**

Replace the Anthropic API call with a Lovable AI proxy call:
- Use the Lovable AI gateway URL (`https://api.lovable.dev/v1/chat/completions`) with the `LOVABLE_API_KEY`
- Switch to `openai/gpt-5` (strong reasoning, excellent for this structured JSON output task) or keep using `claude-sonnet-4-20250514` via the proxy
- Use the OpenAI-compatible chat completions format
- The system prompt and all content rules remain identical

The key change is approximately 15 lines in the API call section (lines 245-268), swapping the Anthropic fetch for the Lovable AI fetch. Everything else (CORS, knowledge base search, JSON parsing, response format) stays the same.

**File: `src/pages/MyChildProfile.tsx`** (line 479)

Update the model name string in `updateAiReport` to match whichever model is used via the proxy.

### Why this fixes it

The Lovable AI proxy has better timeout handling and connection management than a direct Anthropic API call from an edge function. It also means one fewer external API key to manage.

