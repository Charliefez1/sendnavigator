import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Knowledge base content - the ONLY source AI may use
const KNOWLEDGE_BASE = `
# SEND REFORM NAVIGATOR - KNOWLEDGE BASE
Last updated: 4th February 2026

## CURRENT LEGAL POSITION (CONFIRMED)

The current legal framework for SEND in England is:
- Children and Families Act 2014: This remains the primary legislation governing SEND
- SEND Code of Practice 2015: This remains the statutory guidance
- Education, Health and Care Plans (EHCPs): These continue to be the mechanism for legally binding support
- Tribunal rights: The SEND Tribunal system remains in place

These laws and protections are IN FORCE TODAY. No legislation has been passed to change them.

Local authority duties under the current law include:
- Identifying children with SEND
- Assessing needs where requested
- Issuing EHCPs where the legal threshold is met
- Ensuring provision in the EHCP is delivered
- Conducting annual reviews

## CONFIRMED CHANGES (CONFIRMED)

March 2022: The SEND Review was published, followed by the Green Paper consultation.
March 2023: The SEND and Alternative Provision Improvement Plan was published.

The Improvement Plan includes:
- Plans to develop national standards
- Proposals for strengthening early support
- Intentions around workforce development
- Commitment to improving local SEND services

IMPORTANT: The Improvement Plan describes intentions. It does NOT automatically change the law. Any changes to legal rights would require consultation and legislation.

## EHCPS AND RIGHTS (CONFIRMED)

EHCPs remain the legal mechanism for specifying and securing support for children and young people with significant SEND.

Key facts:
- EHCPs are issued under the Children and Families Act 2014
- They create legally binding duties on local authorities
- Parents have the right to request an assessment
- There is a right of appeal to the SEND Tribunal
- Annual reviews are required

There is NO confirmed legislation to abolish EHCPs or remove the right to appeal.

## LEAKS AND UNCONFIRMED REPORTS (UNCONFIRMED)

Various media outlets have reported on possible government plans for SEND reform. These include reports about:
- Possible changes to eligibility thresholds
- Discussions about funding mechanisms
- Potential reforms to the EHCP system

CRITICAL CONTEXT:
- These are NOT government policy
- They have NOT been formally announced
- They would require legislation to implement

What would need to happen for changes to become real:
1. Formal government announcement or white paper
2. Public consultation period
3. Draft legislation published
4. Parliamentary scrutiny and debate
5. Royal Assent for any Bill
6. Implementation period
7. Commencement orders to bring provisions into force

## AREAS WHERE INFORMATION IS NOT KNOWN (UNKNOWN)

- Full implementation timeline for announced improvement plan commitments
- Detailed guidance to accompany any policy changes
- How funding will be allocated across local authorities
- What any future legislation might contain
- When or if consultations will be launched on specific changes
- How any changes would affect existing EHCPs

## INTERNAL PAGES FOR REFERENCE

- /where-we-are-now - Current SEND system and law
- /what-is-changing - Confirmed reforms and plans
- /what-the-leaks-are-saying - Unconfirmed reports
- /what-this-could-mean - Practical implications
- /timeline - Key dates and milestones
- /about - About this resource
`;

// System prompt encoding all guardrails
const SYSTEM_PROMPT = `You are the Q&A assistant for SEND Reform Navigator, a calm, neutral, plain English public resource about SEND reform in England.

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

## KNOWLEDGE BASE

${KNOWLEDGE_BASE}
`;

serve(async (req) => {
  // Handle CORS
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

    // Log the question for audit (without PII)
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
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Question: ${question}\n\nRespond with valid JSON only, following the exact format specified.` },
        ],
        temperature: 0.2, // Low temperature for consistency
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

    // Parse the JSON response from the AI
    try {
      // Extract JSON from the response (handle markdown code blocks)
      let jsonContent = content;
      if (content.includes("```json")) {
        jsonContent = content.split("```json")[1].split("```")[0].trim();
      } else if (content.includes("```")) {
        jsonContent = content.split("```")[1].split("```")[0].trim();
      }
      
      const parsedAnswer = JSON.parse(jsonContent);
      
      // Validate required fields
      if (!parsedAnswer.plainAnswer || !parsedAnswer.confidence) {
        throw new Error("Missing required fields");
      }

      // Add last updated date
      parsedAnswer.lastUpdated = "4th February 2026";

      // Log successful response for audit
      console.log(`Q&A response generated with confidence: ${parsedAnswer.confidence}`);

      return new Response(
        JSON.stringify({ 
          type: "answer",
          data: parsedAnswer 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, content);
      
      // Return a safe fallback response
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
            lastUpdated: "4th February 2026"
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Q&A function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
