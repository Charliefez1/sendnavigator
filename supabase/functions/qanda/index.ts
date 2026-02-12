import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// System prompt encoding all guardrails
const SYSTEM_PROMPT_TEMPLATE = `You are the Q&A assistant for SEND Reform Navigator, a calm, neutral, plain English public resource about SEND reform in England.

## YOUR ROLE
You help parents, teachers, and professionals understand what is happening with SEND reform. You reduce confusion and anxiety. You do NOT persuade, campaign, or provide legal advice.

## ABSOLUTE RULES - NEVER BREAK THESE

1. **SOURCE BOUND**: You may ONLY answer using information from the KNOWLEDGE BASE provided. Do NOT introduce external knowledge.

2. **CONFIDENCE LABELS**: Every answer must include the confidence level from the source:
   - "confirmed" - Official policy, law, or statistics
   - "discussed" - Proposals under consideration or credible reporting
   - "unconfirmed" - Leaked, not policy, may never happen
   - "unknown" - Information not yet available

3. **MANDATORY REFUSALS**: You MUST refuse to:
   - Give legal advice about specific situations
   - Comment on individual cases
   - Speculate beyond the KNOWLEDGE BASE
   - Predict outcomes or exact timelines
   - Tell people what to do

4. **UNCERTAINTY IS MANDATORY**: If information is incomplete, say so explicitly.

## RESPONSE FORMAT (JSON)

You MUST respond with valid JSON in this exact format:
{
  "plainAnswer": ["paragraph 1", "paragraph 2"],
  "confidence": "confirmed|discussed|unconfirmed|unknown",
  "whatWeKnow": ["fact 1", "fact 2"],
  "whatWeDoNotKnow": ["gap 1", "gap 2"],
  "clarifications": {
    "doesMean": ["clarification 1"],
    "doesNotMean": ["clarification 1"]
  },
  "readMore": [{"label": "Page name", "path": "/path"}]
}

## FOR LEAKS/RUMOUR QUESTIONS

Always include:
- Statement that this is unconfirmed and NOT government policy
- What would need to happen (consultation, legislation, parliamentary approval)
- What legal protections apply TODAY

## FOR SENSITIVE TOPICS (rights removal, eligibility, funding cuts)

Always:
- State the CURRENT legal position first
- Distinguish confirmed from proposals
- NEVER imply inevitability

## TONE
- Calm, neutral, plain English
- Short paragraphs
- No emotive or political language
- No reassurance without evidence

## INTERNAL PAGES FOR REFERENCE
- /where-we-are-now - Current SEND system and law
- /what-is-changing - Confirmed reforms and plans
- /what-the-leaks-are-saying - Unconfirmed reports
- /what-this-could-mean - Practical implications
- /timeline - Key dates and milestones
- /about - About this resource

## KNOWLEDGE BASE

`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    
    if (!question || typeof question !== "string") {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch knowledge base from database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: kbEntries, error: kbError } = await supabase
      .from("knowledge_base")
      .select("topic, content")
      .eq("status", "active")
      .order("topic");

    if (kbError) {
      console.error("Failed to fetch knowledge base:", kbError);
    }

    // Build knowledge base text from DB entries
    let knowledgeText = "";
    if (kbEntries && kbEntries.length > 0) {
      knowledgeText = kbEntries
        .map((entry: { topic: string; content: string }) => `## ${entry.topic}\n\n${entry.content}`)
        .join("\n\n");
    } else {
      knowledgeText = "No knowledge base entries available. Please inform the user that the knowledge base is being updated.";
    }

    const systemPrompt = SYSTEM_PROMPT_TEMPLATE + knowledgeText;

    console.log(`Q&A query received: ${question.substring(0, 100)}...`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Question: ${question}\n\nRespond with valid JSON only, following the exact format specified.` },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Service is busy. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Unable to generate answer" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No response generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    try {
      let jsonContent = content;
      if (content.includes("```json")) {
        jsonContent = content.split("```json")[1].split("```")[0].trim();
      } else if (content.includes("```")) {
        jsonContent = content.split("```")[1].split("```")[0].trim();
      }
      
      const parsedAnswer = JSON.parse(jsonContent);
      
      if (!parsedAnswer.plainAnswer || !parsedAnswer.confidence) {
        throw new Error("Missing required fields");
      }

      parsedAnswer.lastUpdated = "7th February 2026";

      console.log(`Q&A response generated with confidence: ${parsedAnswer.confidence}`);

      return new Response(
        JSON.stringify({ type: "answer", data: parsedAnswer }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, content);
      
      return new Response(
        JSON.stringify({
          type: "answer",
          data: {
            plainAnswer: [
              "I was unable to generate a structured answer to your question.",
              "Please try rephrasing your question, or explore the pages below for relevant information."
            ],
            confidence: "unknown",
            whatWeKnow: ["Your question has been received"],
            whatWeDoNotKnow: ["Unable to retrieve specific information for this query"],
            clarifications: {
              doesMean: ["You can try asking in a different way"],
              doesNotMean: ["This does not mean the information doesn't exist"]
            },
            readMore: [
              { label: "Where we are now", path: "/where-we-are-now" },
              { label: "What is changing", path: "/what-is-changing" }
            ],
            lastUpdated: "7th February 2026"
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Q&A function error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to process your question. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
