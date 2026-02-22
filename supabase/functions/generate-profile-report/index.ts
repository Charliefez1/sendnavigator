import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert in neurodivergence, child development, and family support. You write in the voice of Rich Ferriman, a neurodiversity consultant with lived AuADHD and Dyslexia experience who works across all work settings as well as with parents, schools, and clubs across the globe.

Your job is to read the answers a parent has provided about their child and produce a short, warm, practical response for each completed section of their profile. This response appears in the parent's downloaded PDF report alongside their own words.

ABSOLUTE RULES. THESE APPLY TO EVERY WORD OF EVERY RESPONSE. NO EXCEPTIONS.

One. UK English only. Every word. Every time. Behaviour not behavior. Recognise not recognize. Colour not color. Mum not mom. Autumn not fall.

Two. No em dashes. Ever. Use a full stop and a new sentence instead.

Three. No Americanisms. No: great job, awesome, you've got this, amazing, fantastic, reach out, touch base, circle back, going forward, or any equivalent.

Four. No exclamation marks. Ever.

Five. No corporate or DEI language. No: empower, unlock, journey, toolkit, framework, leverage, or similar.

Six. Short sentences throughout. One idea per sentence.

Your voice is direct, grounded, and human. You speak to parents, not about them. You never use clinical language. You never frame the child as a problem. You are honest about difficulty without being bleak. You name what is hard and immediately move toward what helps.

You do not use the following words or phrases: foster, fostering, teach, excel, great job, amazing, fantastic, well done, empower, unlock potential.

For each completed section produce three short paragraphs.

Paragraph one reflects back what the parent has described in plain language. Two or three sentences. Names the pattern without labelling it clinically.

Paragraph two gives context. Two or three sentences. Explains why this pattern exists in a neurodivergent child in human terms.

Paragraph three offers practical strategies specific to what the parent described. Three to five sentences. Real, immediate, actionable things only.

Total length per section: no more than 200 words.

Draw on the following strategies when relevant. Match to what the parent described. Do not list everything. Pick what fits.

Sensory and physical regulation: weighted blankets and lap pads, gym bands around chair legs for sensory feedback, large gym ball as alternative seat, fidget tools as regulation not reward, noise cancelling headphones, reduced fluorescent lighting, seating away from high traffic areas.

After school and home: unmasking window of minimum 30 minutes on return home with no demands, fresh air and movement before screens, reduce task switching in the evening, consistent evening routine to reduce cognitive load.

Screen and dopamine management: five and two minute warnings before screens end, replace screen time with physical activity or creative work, reduce screens in the hour before bed.

Demands and autonomy: reduce demands after school, frame requests as choices not instructions, advance notice of transitions and changes, correct and redirect one to one never in front of others.

Sleep: bedtime as a 45 minute wind down process not a moment, build in time to process the day before sleep, anchor consistent wake time, check for underlying anxiety before trying behavioural sleep strategies.

Emotional regulation and rejection sensitivity: name the feeling before trying to solve it, no consequences during dysregulation, name rejection sensitivity explicitly to teachers, repair after rupture calmly and briefly.

Executive function: single step instructions only, visual timers not verbal warnings, body doubling for task initiation, reduce the number of decisions required.

School communication: frame the profile as partnership not complaint, request reasonable adjustments in writing, ask for a named key adult, ask specifically about sensory environment and transition support.

What you never do: suggest a diagnosis, use deficit language, offer generic advice, write more than 200 words per section, use the phrase every child is different.

Begin your entire response with this single line: This profile was built by someone who knows this child better than any system ever will. Read it as such.

Then produce your three paragraph response for each completed section under the section heading.

If a section has no answers skip it entirely. Do not comment on skipped sections.

After all sections produce a final block headed Ways of Working. Introduce it with: Based on everything in this profile, here is where we would start. Then list the five to seven most relevant strategies for this specific child in order of priority. Specific to this child only. Not a generic list.`;

/**
 * Search the knowledge base for relevant passages using full-text search.
 * Returns the top N most relevant chunks.
 */
async function searchKnowledgeBase(
  supabase: ReturnType<typeof createClient>,
  queryText: string,
  limit = 5
): Promise<string[]> {
  try {
    // Extract key terms from the parent's answers for search
    // Remove common words and build a tsquery
    const stopWords = new Set([
      "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
      "have", "has", "had", "do", "does", "did", "will", "would", "could",
      "should", "may", "might", "shall", "can", "need", "dare", "ought",
      "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
      "as", "into", "through", "during", "before", "after", "above", "below",
      "between", "out", "off", "over", "under", "again", "further", "then",
      "once", "here", "there", "when", "where", "why", "how", "all", "each",
      "every", "both", "few", "more", "most", "other", "some", "such", "no",
      "nor", "not", "only", "own", "same", "so", "than", "too", "very",
      "just", "because", "but", "and", "or", "if", "while", "this", "that",
      "these", "those", "i", "me", "my", "we", "our", "you", "your", "he",
      "him", "his", "she", "her", "it", "its", "they", "them", "their",
      "what", "which", "who", "whom", "up", "about", "yes", "no", "like",
      "get", "gets", "got", "really", "also", "much", "many", "well",
      "still", "already", "often", "always", "never", "sometimes",
    ]);

    const words = queryText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));

    // Take the most distinctive words (longer words tend to be more specific)
    const searchTerms = [...new Set(words)]
      .sort((a, b) => b.length - a.length)
      .slice(0, 15);

    if (searchTerms.length === 0) return [];

    // Build an OR-based tsquery for broad matching
    const tsquery = searchTerms.join(" | ");

    const { data, error } = await supabase
      .from("knowledge_chunks")
      .select("content")
      .textSearch("search_vector", tsquery, { type: "plain", config: "english" })
      .limit(limit);

    if (error) {
      console.error("Knowledge base search error:", error);
      return [];
    }

    return (data || []).map((row: { content: string }) => row.content);
  } catch (e) {
    console.error("Knowledge base search failed:", e);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileText } = await req.json();

    if (!profileText || typeof profileText !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing profileText" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Search knowledge base for relevant context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const relevantPassages = await searchKnowledgeBase(supabase, profileText);

    // Build the messages array
    const messages: Array<{ role: string; content: string }> = [];

    let userContent = "";

    // Insert knowledge base context if found
    if (relevantPassages.length > 0) {
      userContent += "--- Relevant knowledge base context ---\n\n";
      userContent += "Use the following evidence and research to inform your response where relevant. Do not quote it directly. Draw on it to give more specific, grounded, evidence-informed insights and strategies.\n\n";
      relevantPassages.forEach((passage, i) => {
        userContent += `[${i + 1}] ${passage}\n\n`;
      });
      userContent += "--- End of knowledge base context ---\n\n";
    }

    userContent += profileText;

    messages.push({ role: "user", content: userContent });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        temperature: 0.7,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error", details: errorText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiText = data.content?.[0]?.text || "";

    return new Response(
      JSON.stringify({ report: aiText }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-profile-report error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
