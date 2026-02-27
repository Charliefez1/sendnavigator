import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── CORS: allow production + Lovable preview domains ───
const PRIMARY_ORIGIN = "https://sendnavigator.lovable.app";
const ALLOWED_EXACT_ORIGINS = new Set([PRIMARY_ORIGIN]);

function isAllowedOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (url.protocol !== "https:") return false;
    if (ALLOWED_EXACT_ORIGINS.has(origin)) return true;
    return url.hostname.endsWith(".lovable.app") || url.hostname.endsWith(".lovableproject.com");
  } catch {
    return false;
  }
}

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = isAllowedOrigin(origin) ? origin : PRIMARY_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

// ─── Rate limiting ───
const failedAttempts = new Map<string, { count: number; firstAt: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const MAX_FAILURES = 5;

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const record = failedAttempts.get(ip);
  if (!record) return false;
  if (Date.now() - record.firstAt > RATE_LIMIT_WINDOW) {
    failedAttempts.delete(ip);
    return false;
  }
  return record.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const record = failedAttempts.get(ip);
  if (!record || Date.now() - record.firstAt > RATE_LIMIT_WINDOW) {
    failedAttempts.set(ip, { count: 1, firstAt: Date.now() });
  } else {
    record.count++;
  }
}

function clearFailures(ip: string) {
  failedAttempts.delete(ip);
}

// Page path mapping for flag generation
const PAGE_TOPIC_MAP: Record<string, string[]> = {
  "legal_position": ["/where-we-are-now", "/ehcps"],
  "ehcp": ["/where-we-are-now", "/ehcps", "/ehcp-health"],
  "confirmed_changes": ["/what-is-changing", "/what-happens-next"],
  "ten_year_plan": ["/what-is-changing"],
  "leaks": ["/what-the-leaks-are-saying", "/what-the-leaks-do-not-mean"],
  "timeline": ["/timeline", "/what-happens-next"],
  "statistics": ["/statistics-and-data"],
  "funding": ["/statistics-and-data", "/what-is-changing"],
  "practical_impact": ["/what-this-could-mean", "/for-parents", "/what-to-do-right-now"],
  "exclusions": ["/exclusions"],
  "alternative_provision": ["/alternative-provision"],
  "tribunal": ["/where-we-are-now", "/ehcps"],
  "devolved_nations": ["/devolved-nations"],
  "post_16": ["/post-16-and-transition"],
  "send_reform": ["/what-is-changing", "/where-we-are-now", "/what-happens-next"],
  "inclusion": ["/what-is-changing", "/what-this-could-mean"],
  "local_variation": ["/local-variation"],
};

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many failed attempts. Try again later." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { content_update_id, pin } = await req.json();

    // Verify admin PIN — no fallback
    const adminPin = Deno.env.get("ADMIN_PIN");
    if (!adminPin || pin !== adminPin) {
      recordFailure(clientIp);
      return new Response(JSON.stringify({ error: "Invalid PIN" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    clearFailures(clientIp);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch the content update
    const { data: contentUpdate, error: fetchError } = await supabase
      .from("content_updates")
      .select("*")
      .eq("id", content_update_id)
      .single();

    if (fetchError || !contentUpdate) {
      throw new Error(`Content update not found: ${fetchError?.message}`);
    }

    // Mark as processing
    await supabase
      .from("content_updates")
      .update({ status: "processing" })
      .eq("id", content_update_id);

    // Get existing knowledge base topics for context
    const { data: existingTopics } = await supabase
      .from("knowledge_base")
      .select("topic, content")
      .eq("status", "active");

    const topicList = (existingTopics || []).map((t) => t.topic).join(", ");

    // Call Lovable AI (Gemini Flash) to extract facts
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a UK SEND (Special Educational Needs and Disabilities) information analyst. You extract facts from raw text and categorise them for a knowledge base that powers a parent-facing information site about SEND reform in England.

Your tasks:
1. Extract key facts from the provided text
2. Categorise each fact by topic
3. Identify which existing knowledge base topics need updating vs which are new
4. Identify which site pages are affected

Existing knowledge base topics: ${topicList || "None yet"}

Available topic categories for page mapping: ${Object.keys(PAGE_TOPIC_MAP).join(", ")}`,
          },
          {
            role: "user",
            content: `Analyse this content and extract SEND-relevant information:\n\nSource: ${contentUpdate.source_name || contentUpdate.source}\n\n${contentUpdate.raw_content}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "process_content",
              description: "Process extracted SEND information into knowledge base entries and page flags",
              parameters: {
                type: "object",
                properties: {
                  entries: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        topic: { type: "string", description: "Knowledge base topic name (lowercase, descriptive)" },
                        content: { type: "string", description: "Full knowledge base entry content (2-4 paragraphs, factual, parent-friendly)" },
                        is_update: { type: "boolean", description: "True if this updates an existing topic" },
                        existing_topic_match: { type: "string", description: "Name of existing topic being updated, if is_update is true" },
                      },
                      required: ["topic", "content", "is_update"],
                    },
                  },
                  affected_categories: {
                    type: "array",
                    items: { type: "string" },
                    description: "Which topic categories from the page mapping are affected",
                  },
                  summary: {
                    type: "string",
                    description: "Brief summary of what was extracted (1-2 sentences)",
                  },
                },
                required: ["entries", "affected_categories", "summary"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "process_content" } },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      await supabase
        .from("content_updates")
        .update({ status: "failed", result_summary: `AI error: ${aiResponse.status}` })
        .eq("id", content_update_id);
      throw new Error(`AI processing failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      await supabase
        .from("content_updates")
        .update({ status: "failed", result_summary: "AI returned no structured output" })
        .eq("id", content_update_id);
      throw new Error("AI returned no structured output");
    }

    const result = JSON.parse(toolCall.function.arguments);
    const { entries, affected_categories, summary } = result;

    // Upsert knowledge base entries
    let kbUpdated = 0;
    let kbCreated = 0;

    for (const entry of entries) {
      if (entry.is_update && entry.existing_topic_match) {
        // Update existing entry
        const { error } = await supabase
          .from("knowledge_base")
          .update({
            content: entry.content,
            updated_at: new Date().toISOString(),
          })
          .eq("topic", entry.existing_topic_match);

        if (!error) kbUpdated++;
      } else {
        // Insert new entry
        const { error } = await supabase
          .from("knowledge_base")
          .insert({
            topic: entry.topic,
            content: entry.content,
            status: "active",
          });

        if (!error) kbCreated++;
      }
    }

    // Rechunk updated content into knowledge_chunks
    for (const entry of entries) {
      const docName = `kb_${entry.topic.replace(/\s+/g, "_")}`;

      // Delete old chunks for this document
      await supabase
        .from("knowledge_chunks")
        .delete()
        .eq("document_name", docName);

      // Create new chunks (split at ~250 words)
      const words = entry.content.split(/\s+/);
      const chunkSize = 250;
      let chunkIndex = 0;

      for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize).join(" ");
        await supabase.from("knowledge_chunks").insert({
          document_name: docName,
          chunk_index: chunkIndex,
          content: chunk,
        });
        chunkIndex++;
      }
    }

    // Generate page flags
    const affectedPages = new Set<string>();
    for (const category of affected_categories) {
      const pages = PAGE_TOPIC_MAP[category];
      if (pages) {
        pages.forEach((p) => affectedPages.add(p));
      }
    }

    let flagsCreated = 0;
    for (const pagePath of affectedPages) {
      const { error } = await supabase.from("page_update_flags").insert({
        page_path: pagePath,
        flag_reason: summary,
        content_update_id: content_update_id,
        status: "stale",
      });
      if (!error) flagsCreated++;
    }

    // Mark content update as processed
    const resultSummary = `${summary} | KB: ${kbCreated} new, ${kbUpdated} updated | ${flagsCreated} pages flagged`;
    await supabase
      .from("content_updates")
      .update({
        status: "processed",
        processed_at: new Date().toISOString(),
        result_summary: resultSummary,
      })
      .eq("id", content_update_id);

    return new Response(
      JSON.stringify({
        success: true,
        summary: resultSummary,
        kb_created: kbCreated,
        kb_updated: kbUpdated,
        flags_created: flagsCreated,
        affected_pages: Array.from(affectedPages),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("process-update error:", err);
    return new Response(
      JSON.stringify({ error: "An internal error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
