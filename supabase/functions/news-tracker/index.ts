import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// SEND-related search queries for Perplexity — staggered for variety
const SEARCH_QUERIES = [
  "UK SEND reform news latest",
  "EHCP education health care plan England news today",
  "special educational needs disability England policy update",
  "SEND inclusion bases mainstream schools England",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const perplexityKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!perplexityKey) {
      throw new Error("PERPLEXITY_API_KEY is not configured");
    }

    const results: Array<{
      title: string;
      summary: string;
      url: string;
      source_name: string;
      source_domain: string;
      topic: string;
      published_at: string | null;
    }> = [];

    // ─── Perplexity search ───
    for (const query of SEARCH_QUERIES) {
      try {
        const response = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${perplexityKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "sonar",
            messages: [
              {
                role: "system",
                content:
                  `You are a UK SEND news aggregator. Return ONLY a JSON object with an "items" array. Each item must have: title (string), summary (1-2 sentence description), url (string), source_name (string, e.g. "The Guardian", "GOV.UK", "Schools Week"), published_date (ISO date string if known, otherwise null). Only include genuinely different news stories from the last 48 hours. Prefer stories from different publications. Return {"items":[]} if nothing found.`,
              },
              { role: "user", content: query },
            ],
            temperature: 0.1,
            search_recency_filter: "day",
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "news_items",
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          summary: { type: "string" },
                          url: { type: "string" },
                          source_name: { type: "string" },
                          published_date: { type: "string" },
                        },
                        required: ["title", "summary", "url", "source_name"],
                      },
                    },
                  },
                  required: ["items"],
                },
              },
            },
          }),
        });

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        if (content) {
          try {
            const parsed = JSON.parse(content);
            const items = parsed.items || parsed;
            if (Array.isArray(items)) {
              for (const item of items) {
                if (item.title && item.url) {
                  let domain = "";
                  try {
                    domain = new URL(item.url).hostname;
                  } catch { /* skip */ }

                  // Classify topic
                  const lower = `${item.title} ${item.summary || ""}`.toLowerCase();
                  let topic = "send_reform";
                  if (lower.includes("ehcp") || lower.includes("education health and care")) topic = "ehcp";
                  else if (lower.includes("fund") || lower.includes("budget") || lower.includes("deficit")) topic = "funding";
                  else if (lower.includes("tribunal")) topic = "tribunal";

                  // Parse published date
                  let publishedAt: string | null = null;
                  if (item.published_date) {
                    try {
                      const d = new Date(item.published_date);
                      if (!isNaN(d.getTime())) {
                        publishedAt = d.toISOString();
                      }
                    } catch { /* skip */ }
                  }

                  results.push({
                    title: item.title,
                    summary: item.summary || "",
                    url: item.url,
                    source_name: item.source_name || domain,
                    source_domain: domain,
                    topic,
                    published_at: publishedAt,
                  });
                }
              }
            }
          } catch {
            console.error("Failed to parse Perplexity response:", content?.substring(0, 200));
          }
        }
      } catch (err) {
        console.error(`Perplexity search failed for "${query}":`, err);
      }
    }

    // ─── Deduplicate by URL ───
    const uniqueUrls = new Set<string>();
    const uniqueResults = results.filter((r) => {
      if (uniqueUrls.has(r.url)) return false;
      uniqueUrls.add(r.url);
      return true;
    });

    let inserted = 0;
    let skipped = 0;

    for (const item of uniqueResults) {
      // Use published_at as discovered_at if available, otherwise now
      const discoveredAt = item.published_at || new Date().toISOString();

      const { error } = await supabase.from("news_items").upsert(
        {
          title: item.title,
          summary: item.summary,
          url: item.url,
          source_name: item.source_name,
          source_domain: item.source_domain,
          topic: item.topic,
          status: "published",
          discovered_at: discoveredAt,
          published_at: item.published_at,
        },
        { onConflict: "url", ignoreDuplicates: true }
      );

      if (error) {
        skipped++;
      } else {
        inserted++;
      }
    }

    console.log(`News tracker: found ${uniqueResults.length}, inserted ${inserted}, skipped ${skipped}`);

    // Auto-create content_updates for significant news batches
    if (inserted > 0) {
      const newsSummary = uniqueResults
        .slice(0, 10)
        .map((r) => `• ${r.title}: ${r.summary}`)
        .join("\n");

      await supabase.from("content_updates").insert({
        source: "news_tracker",
        source_name: `News Tracker batch – ${new Date().toLocaleDateString("en-GB")}`,
        raw_content: newsSummary,
        status: "pending",
      });
      console.log("Content update created from news tracker batch");
    }

    return new Response(
      JSON.stringify({
        success: true,
        found: uniqueResults.length,
        inserted,
        skipped,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("News tracker error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
