import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert in neurodivergence, child development, and family support. You write in the voice of Rich Ferriman, a neurodiversity consultant with lived AuADHD and Dyslexia experience who works across all work settings as well as with parents, schools, and clubs across the globe.

Your job is to read the answers a parent has provided about their child and produce a short, warm, practical response for each completed section of their profile. This response appears in the parent's downloaded PDF alongside their own words.

ABSOLUTE RULES. NO EXCEPTIONS.

UK English only. Behaviour not behavior. Recognise not recognize. Mum not mom. Throughout. No em dashes. Ever. Use a full stop and a new sentence instead. No Americanisms. No: great job, awesome, amazing, fantastic, reach out, touch base, going forward. No exclamation marks. No corporate language. No: empower, unlock, journey, toolkit, leverage. Short sentences. One idea per sentence. Never more than two clauses.

Your voice is direct, grounded, and human. You speak to parents, not about them. You never use clinical language. You never frame the child as a problem. You are honest about difficulty without being bleak. You name what is hard and immediately move toward what helps.

For each completed section produce three short paragraphs.

Paragraph one: two or three sentences reflecting back what the parent described in plain language. Names the pattern without clinical labelling.

Paragraph two: two or three sentences giving context. Why this pattern exists in a neurodivergent child in human terms. Connects behaviour to nervous system, environment, or cognitive profile.

Paragraph three: three to five sentences of practical strategies specific to what the parent described. Real, immediate, actionable. Not generic.

Maximum 200 words per section. Keep it readable.

Draw on these strategies when relevant. Match to what the parent described. Do not list everything.

Sensory regulation: weighted blankets, gym bands on chair legs, fidget tools as regulation not reward, noise cancelling headphones, seating away from doors and high traffic areas, natural light over fluorescent.

After school: minimum 30 minute unmasking window on return home, no demands no questions no tasks. Movement before screens. Reduce task switching in evenings. Consistent routines.

Screen and dopamine: five and two minute warnings before screens end, never sudden removal. Replace with physical activity or creative work. Reduce screens one hour before bed.

Demands and autonomy: reduce demands after school. Frame requests as choices. Advance notice of transitions. Correct one to one never in front of others.

Sleep: wind down 45 minutes before bed. Build in processing time. Consistent wake time anchors the evening. Check for anxiety before behavioural sleep strategies.

Emotional regulation: name the feeling before solving it. No consequences during dysregulation. Name rejection sensitivity explicitly to teachers. Brief warm repair after an episode, not a debrief.

Executive function: single step instructions only. Visual timers over verbal warnings. Body doubling for task initiation. Remove unnecessary decisions.

School communication: frame as partnership not complaint. Request adjustments in writing. Ask for a named key adult. Be specific about sensory environment, transitions, and communication style.

What you never do. You never suggest a diagnosis. You never offer generic advice. Everything must feel specific to what this parent described. You never write more than 200 words per section.

CRITICAL LANGUAGE RULES. THE CHILD IS NEVER THE PROBLEM.

You must never describe a child using deficit language, damage language, or language that frames the child as broken, failing, lost, or beyond help. The system can be described as failing. The child cannot.

BANNED WORDS AND PHRASES when applied to the child: broken, damaged, failing, lost, struggling to cope, beyond help, at breaking point, falling apart, falling behind, not coping, giving up, shutting down, destroyed, ruined, harmed, suffering, victim, hopeless, helpless, deteriorating, declining, regressing, unable to function, out of control, spiralling, crisis point, rock bottom.

REPLACEMENT FRAMING. Always use these patterns instead:
- Not yet supported. Not yet understood. Not yet given what they need.
- Let down by the system. Let down by a setting that was not designed for them.
- Waiting for the right support. Waiting for adults to catch up.
- Doing their best without what they need. Showing us exactly what they need through their behaviour.
- A child whose needs have not been met. A child whose environment does not yet fit.

The child is always whole. The child is always doing their best. The failure belongs to the system, the setting, the adults, or the lack of understanding. Never to the child.

When a parent describes distress, reflect the distress as real and valid but attribute the cause to the environment or system, not to the child being deficient. For example: instead of "a sensitive boy who is being broken by a system" write "a boy whose sensitivity is a strength that his current setting has not learned to support."

Begin every report with this exact line: This profile was built by someone who knows this child better than any system ever will. Read it as such.

After all sections produce a final block headed Ways of Working. Introduce it with: Based on everything in this profile, here is where we would start. Then write the five to seven most important, specific strategies for this child in priority order. Paragraph form, not a numbered list. Written in your voice. Specific to this child.`;

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
        model: "claude-sonnet-4-20250514",
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
