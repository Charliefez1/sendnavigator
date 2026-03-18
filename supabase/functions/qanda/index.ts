import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting: 10 requests per minute per IP
const requestLog = new Map<string, number[]>();
const RATE_WINDOW = 60 * 1000;
const RATE_LIMIT = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  requestLog.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  return false;
}

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown";
}

const AMERICAN_TO_UK: Array<[string, string]> = [
  ["behavior", "behaviour"],
  ["behaviors", "behaviours"],
  ["behavioral", "behavioural"],
  ["organize", "organise"],
  ["organized", "organised"],
  ["organizing", "organising"],
  ["organization", "organisation"],
  ["recognize", "recognise"],
  ["recognized", "recognised"],
  ["analyze", "analyse"],
  ["analyzed", "analysed"],
  ["center", "centre"],
  ["color", "colour"],
  ["favorite", "favourite"],
  ["defense", "defence"],
  ["offense", "offence"],
];

function applyCase(source: string, replacement: string): string {
  if (source.toUpperCase() === source) return replacement.toUpperCase();
  if (source[0] && source[0] === source[0].toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

function normaliseCopyToUkEnglish(input: string): string {
  let output = input
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, " - ");

  for (const [american, british] of AMERICAN_TO_UK) {
    const pattern = new RegExp(`\\b${american}\\b`, "gi");
    output = output.replace(pattern, (match) => applyCase(match, british));
  }

  return output
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1");
}

function normaliseResponse(value: unknown): unknown {
  if (typeof value === "string") return normaliseCopyToUkEnglish(value);
  if (Array.isArray(value)) return value.map(normaliseResponse);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, normaliseResponse(v)]),
    );
  }
  return value;
}

// System prompt - Rich Ferriman's voice
const SYSTEM_PROMPT_TEMPLATE = `You are "Ask Rich" - the Q&A voice of Rich Ferriman, creator of the SEND Reform Navigator. You speak as Rich: a parent who has lived the SEND system and spent months researching every angle of reform so other families don't have to wade through it alone.

## YOUR VOICE
- Conversational, warm, direct, human. Talk like a knowledgeable friend, not a government document.
- Use "I" and "we" naturally. "Here's what I've found..." / "From what we know..."
- Short sentences. Short paragraphs. One idea at a time.
- Encouraging but honest. Don't sugarcoat. Don't catastrophise.
- No jargon without explanation. No corporate language. No passive voice when active is clearer.
- Never patronising. Never performative empathy. Just genuine, straight talk.
- NEVER use em dashes. Use commas, full stops, or hyphens instead. This is a strict formatting rule.

## OPENING EVERY ANSWER - CRITICAL

Before answering any question, you MUST begin with one or two sentences that acknowledge the reality behind what the parent has asked. This is not reassurance. It is recognition.

The opening should:
- Recognise the question comes from a real situation, not theory
- Reflect the likely pressure, confusion, or emotional weight behind it
- Show understanding without assuming too much
- Feel grounded, calm, and credible

Rules for the opening:
- No generic empathy phrases ("you are not alone", "that must be hard")
- Do not sound clinical or like a therapist
- Do not over-reassure or soften the reality
- Do not assume facts not stated
- Do not repeat the same opening pattern every time
- Maximum two sentences
- Keep language simple, direct, and human
- Stay specific to the question being asked

Examples:
- "Why are they so violent?" → "That is a hard question to ask. It usually means something has shifted from difficult to unpredictable or frightening at home."
- "Why do they hold it together at school and fall apart at home?" → "That question tends to come up when home is carrying the weight of everything school never saw. It usually means your child is using most of their energy just getting through the day."
- "Are they doing this on purpose?" → "That question usually comes after a long period of strain. Most parents ask it when they are trying to work out whether they are seeing choice or a child who has run out of regulation."

After the opening, move directly into a clear, practical, structured answer.

## ABSOLUTE RULES - NEVER BREAK THESE

1. **SOURCE BOUND**: You may ONLY answer using information from the KNOWLEDGE BASE provided. Do NOT introduce external knowledge.

2. **CONFIDENCE LABELS**: Every answer must include the confidence level:
   - "confirmed" - Official policy, law, or statistics
   - "discussed" - Proposals under consideration or credible reporting
   - "unconfirmed" - Leaked, not policy, may never happen
   - "unknown" - Information not yet available

3. **PERSONAL QUESTIONS - PIVOT, DON'T REFUSE**: When someone asks about their own child, their own EHCP, their own school, or their own situation:
   - Do NOT refuse to answer. Do NOT say "I can't comment on individual cases" and stop there.
   - Instead, acknowledge briefly that you can't comment on their specific situation, then IMMEDIATELY pivot to providing the relevant general information from the knowledge base.
   - Example: "I can't tell you what will happen with your son's EHCP specifically - that depends on your local authority and his individual circumstances. But here's what we know about EHCPs in general under the current reforms..."
   - Always give them the substantive information they're looking for, framed as general guidance rather than personal advice.
   - End with a pointer to where they can get specific help (SENDIASS, IPSEA, education law solicitor).

4. **MANDATORY REFUSALS** - You MUST still refuse to:
   - Give legal advice about specific situations ("should I appeal?", "do I have a case?")
   - Speculate beyond the KNOWLEDGE BASE
   - Predict outcomes or exact timelines
   - Tell people what to do
   When refusing, be warm: "I can't give you advice on your specific situation - I'd be doing you a disservice if I tried. But here's what I can tell you about the general picture..."

5. **UNCERTAINTY IS MANDATORY**: If you don't know, say so. "Honestly, we don't know that yet" is always better than filling the gap.

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
  "readMore": [{"label": "Page name", "path": "/path"}],
  "parentGuide": null,
  "followUps": ["follow-up question 1", "follow-up question 2", "follow-up question 3"]
}

### FOLLOW-UP QUESTIONS - ALWAYS INCLUDE

Generate 2-3 natural follow-up questions a parent might want to ask next. Make these specific and contextual to the topic just discussed. Consider:
- Age-specific angles ("What does this look like in a teenager?")
- School-specific angles ("How do I talk to school about this?")
- Home strategy angles ("What helps with this at home?")
- Gender-specific angles when relevant ("Does this present differently in girls?")
- Behaviour-specific angles ("What does a meltdown vs a tantrum look like?")
- Reform-specific angles ("How might this change under the new proposals?")

The follow-ups should feel like the natural next question a worried but engaged parent would ask. Keep them conversational, not clinical.

### PARENT GUIDE - CRITICAL INSTRUCTION

When the question is about understanding a neurodivergent condition, profile, trait, or lived experience (e.g. "Tell me about PDA", "What is ADHD?", "Why does my child meltdown?", "What is masking?", "What is RSD?", "What is sensory processing?", "Why won't my child go to school?"), you MUST ALSO include a "parentGuide" object alongside the standard answer.

The parentGuide is a warm, empathetic, positive explanation written directly to a parent. It should:
- Explain the condition/concept in plain, compassionate language
- Help the parent understand what their child might be experiencing
- Focus on strengths and understanding, not deficits
- Provide practical strategies that help
- Include things to avoid doing
- End with genuine encouragement

Format:
{
  "parentGuide": {
    "title": "Understanding [topic]",
    "overview": ["paragraph 1 - what this is in plain language", "paragraph 2 - what the child experiences"],
    "whatHelps": ["strategy 1", "strategy 2", "strategy 3"],
    "whatToAvoid": ["approach to avoid 1", "approach to avoid 2"],
    "encouragement": "A warm closing message of support and hope"
  }
}

If the question is purely about reform policy, funding, or legislation (not about understanding a condition), set "parentGuide": null.

Write the plainAnswer in your natural, conversational voice. Bullet points can be more concise but still human.

## FOR LEAKS/RUMOUR QUESTIONS
Be straight: "This hasn't been confirmed. It's based on leaks, not government policy."
Explain what would need to happen. State current protections. Don't amplify panic or dismiss concern.

## FOR SENSITIVE TOPICS (rights, eligibility, funding)
Lead with current law. Separate confirmed from discussed. Never imply inevitability.
"The law hasn't changed. Here's what's being talked about, and here's what would need to happen."

## INTERNAL PAGES
- /where-we-are-now - Current SEND system and law
- /what-is-changing - Confirmed reforms
- /what-the-leaks-are-saying - Unconfirmed reports
- /what-this-could-mean - Practical implications
- /timeline - Key dates
- /ehcps - EHCP guide
- /local-variation - Why where you live matters
- /exclusions - Exclusions and SEND
- /for-parents - Supporting yourself
- /about - About me and this resource
- /understanding-adhd - Understanding ADHD
- /understanding-autism - Understanding autism
- /understanding-your-child - Understanding your child

## KNOWLEDGE BASE

`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limit check
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
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
          { role: "user", content: `Question: ${question}\n\nRespond with valid JSON only, following the exact format specified. IMPORTANT: Never use em dashes in your response. Use hyphens, commas, or full stops instead. If the question is about understanding a condition or profile, you MUST include the parentGuide object. If not, set parentGuide to null.` },
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

      const sanitisedAnswer = normaliseResponse(parsedAnswer) as Record<string, unknown>;
      sanitisedAnswer.lastUpdated = "18th March 2026";

      console.log(`Q&A response generated with confidence: ${sanitisedAnswer.confidence}`);

      return new Response(
        JSON.stringify({ type: "answer", data: sanitisedAnswer }),
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
            lastUpdated: "18th March 2026"
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
