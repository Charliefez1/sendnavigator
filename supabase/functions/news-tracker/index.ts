import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── SEND keyword filter ───
const SEND_KEYWORDS = [
  "send", "ehcp", "special educational needs", "inclusion",
  "white paper", "isp", "individual support plan", "tribunal",
  "ehc plan",
];

function matchesSendKeywords(text: string): boolean {
  const lower = text.toLowerCase();
  return SEND_KEYWORDS.some((kw) => lower.includes(kw));
}

function classifyTopic(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("ehcp") || lower.includes("education health and care") || lower.includes("ehc plan")) return "ehcp";
  if (lower.includes("fund") || lower.includes("budget") || lower.includes("deficit")) return "funding";
  if (lower.includes("tribunal")) return "tribunal";
  return "send_reform";
}

// ─── RSS feed URLs ───
const RSS_FEEDS = [
  { url: "https://schoolsweek.co.uk/feed/", name: "Schools Week", domain: "schoolsweek.co.uk" },
  { url: "https://www.specialneedsjungle.com/feed/", name: "Special Needs Jungle", domain: "specialneedsjungle.com" },
  { url: "https://www.gov.uk/search/news-and-communications.atom?organisations%5B%5D=department-for-education", name: "GOV.UK DfE", domain: "gov.uk" },
];

// ─── Perplexity search queries ───
const SEARCH_QUERIES = [
  "UK SEND reform news latest",
  "EHCP education health care plan England news today",
  "special educational needs disability England policy update",
  "SEND inclusion bases mainstream schools England",
];

// ─── RSS parser ───
interface ParsedItem {
  title: string;
  summary: string;
  url: string;
  source_name: string;
  source_domain: string;
  topic: string;
  published_at: string | null;
}

function parseRssXml(xml: string, feedName: string, feedDomain: string): ParsedItem[] {
  const items: ParsedItem[] = [];

  // Handle both RSS <item> and Atom <entry>
  const isAtom = xml.includes("<feed") && xml.includes("xmlns=\"http://www.w3.org/2005/Atom\"");

  if (isAtom) {
    // Atom feed (GOV.UK)
    const entries = xml.split("<entry>").slice(1);
    for (const entry of entries) {
      const title = extractTag(entry, "title");
      const summary = extractTag(entry, "summary") || extractTag(entry, "content") || "";
      const link = extractAtomLink(entry);
      const published = extractTag(entry, "updated") || extractTag(entry, "published") || null;

      if (title && link && matchesSendKeywords(`${title} ${summary}`)) {
        items.push({
          title: cleanHtml(title),
          summary: cleanHtml(summary).slice(0, 300),
          url: link,
          source_name: feedName,
          source_domain: feedDomain,
          topic: classifyTopic(`${title} ${summary}`),
          published_at: parseDate(published),
        });
      }
    }
  } else {
    // RSS feed
    const rssItems = xml.split("<item>").slice(1);
    for (const item of rssItems) {
      const title = extractTag(item, "title");
      const description = extractTag(item, "description") || "";
      const link = extractTag(item, "link");
      const pubDate = extractTag(item, "pubDate") || null;

      if (title && link && matchesSendKeywords(`${title} ${description}`)) {
        items.push({
          title: cleanHtml(title),
          summary: cleanHtml(description).slice(0, 300),
          url: link.trim(),
          source_name: feedName,
          source_domain: feedDomain,
          topic: classifyTopic(`${title} ${description}`),
          published_at: parseDate(pubDate),
        });
      }
    }
  }

  return items.slice(0, 10); // Max 10 per feed
}

function extractTag(xml: string, tag: string): string {
  // Handle CDATA
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();

  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const match = xml.match(re);
  return match ? match[1].trim() : "";
}

function extractAtomLink(entry: string): string {
  const match = entry.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/) ||
                entry.match(/<link[^>]*>([^<]+)<\/link>/);
  return match ? match[1].trim() : "";
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch { /* skip */ }
  return null;
}

// ─── Main handler ───
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const results: ParsedItem[] = [];

    // ─── Pass 1: RSS feeds ───
    console.log("Starting RSS feed scrape...");
    for (const feed of RSS_FEEDS) {
      try {
        const resp = await fetch(feed.url, {
          headers: { "User-Agent": "SENDNavigator/1.0 (news aggregator)" },
        });
        if (resp.ok) {
          const xml = await resp.text();
          const items = parseRssXml(xml, feed.name, feed.domain);
          results.push(...items);
          console.log(`RSS ${feed.name}: found ${items.length} SEND-relevant items`);
        } else {
          console.error(`RSS ${feed.name}: HTTP ${resp.status}`);
        }
      } catch (err) {
        console.error(`RSS ${feed.name} failed:`, err);
      }
    }

    // ─── Pass 2: Perplexity search ───
    const perplexityKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (perplexityKey) {
      console.log("Starting Perplexity search...");
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
                    try { domain = new URL(item.url).hostname; } catch { /* skip */ }

                    results.push({
                      title: item.title,
                      summary: item.summary || "",
                      url: item.url,
                      source_name: item.source_name || domain,
                      source_domain: domain,
                      topic: classifyTopic(`${item.title} ${item.summary || ""}`),
                      published_at: parseDate(item.published_date),
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
    } else {
      console.log("PERPLEXITY_API_KEY not set, skipping Perplexity pass");
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
    }

    return new Response(
      JSON.stringify({
        success: true,
        found: uniqueResults.length,
        inserted,
        skipped,
        rss_sources: RSS_FEEDS.map((f) => f.name),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("News tracker error:", err);
    return new Response(
      JSON.stringify({ error: "An internal error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
