import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Trusted sources to scrape with Firecrawl
const TRUSTED_SOURCES = [
  { url: "https://www.gov.uk/search/news-and-communications?keywords=SEND", name: "GOV.UK" },
  { url: "https://www.specialneedsjungle.com/", name: "Special Needs Jungle" },
  { url: "https://www.theguardian.com/education/send", name: "The Guardian" },
];

// SEND-related search queries for Perplexity
const SEARCH_QUERIES = [
  "UK SEND reform news today",
  "EHCP education health care plan England news",
  "special educational needs England policy update",
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
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");

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
                  "You are a news aggregator. Return ONLY a JSON array of news items about UK SEND (Special Educational Needs and Disabilities) reform, EHCPs, and related policy. Each item must have: title, summary (1-2 sentences), url, source_name. Only include items from the last 7 days. Return [] if nothing found. Do not include any text outside the JSON array.",
              },
              { role: "user", content: query },
            ],
            temperature: 0.1,
            search_recency_filter: "week",
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
                  else if (lower.includes("fund") || lower.includes("budget")) topic = "funding";
                  else if (lower.includes("tribunal")) topic = "tribunal";

                  results.push({
                    title: item.title,
                    summary: item.summary || "",
                    url: item.url,
                    source_name: item.source_name || domain,
                    source_domain: domain,
                    topic,
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

    // ─── Firecrawl scraping (optional, only if key available) ───
    if (firecrawlKey) {
      for (const source of TRUSTED_SOURCES) {
        try {
          const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${firecrawlKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: source.url,
              formats: ["links"],
              onlyMainContent: true,
            }),
          });

          const data = await response.json();
          const links = data?.data?.links || data?.links || [];

          // Filter for SEND-relevant links
          const sendKeywords = ["send", "ehcp", "special-educational", "special-needs", "sen-", "disability"];
          const relevantLinks = links
            .filter((link: string) => {
              const lower = link.toLowerCase();
              return sendKeywords.some((kw) => lower.includes(kw));
            })
            .slice(0, 5);

          for (const link of relevantLinks) {
            let domain = "";
            try {
              domain = new URL(link).hostname;
            } catch { continue; }

            // Extract a title from the URL path
            const pathParts = new URL(link).pathname.split("/").filter(Boolean);
            const slug = pathParts[pathParts.length - 1] || "";
            const title = slug
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (c: string) => c.toUpperCase())
              .substring(0, 200);

            if (title.length > 10) {
              results.push({
                title,
                summary: `Found on ${source.name}`,
                url: link,
                source_name: source.name,
                source_domain: domain,
                topic: "send_reform",
              });
            }
          }
        } catch (err) {
          console.error(`Firecrawl scrape failed for ${source.url}:`, err);
        }
      }
    }

    // ─── Deduplicate and insert ───
    const uniqueUrls = new Set<string>();
    const uniqueResults = results.filter((r) => {
      if (uniqueUrls.has(r.url)) return false;
      uniqueUrls.add(r.url);
      return true;
    });

    let inserted = 0;
    let skipped = 0;

    for (const item of uniqueResults) {
      const { error } = await supabase.from("news_items").upsert(
        {
          title: item.title,
          summary: item.summary,
          url: item.url,
          source_name: item.source_name,
          source_domain: item.source_domain,
          topic: item.topic,
          status: "published",
          discovered_at: new Date().toISOString(),
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
