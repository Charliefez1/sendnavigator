import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a warm, direct guide for the SEND Reform Navigator - a site built for parents and carers of neurodivergent children in England. A visitor has just told you why they are here today.

Your job: understand what they need and recommend 2 to 4 pages from the site. No more than 4.

RULES:
- Write 2-3 short sentences acknowledging what they said. Warm, human, not robotic.
- Use "you" and "your". Speak to them directly.
- Do not use exclamation marks. Do not say "great question" or "I understand".
- Do not give advice or information. Just point them to the right pages.
- UK English only.
- NEVER use em dashes. Use commas, full stops, or hyphens instead.

AVAILABLE PAGES (use ONLY these paths and titles):

SEND Reform Report:
- /state-of-send-2026 - "Report Overview" - The full 8-part report on SEND reform
- /state-of-send-2026/where-we-are-now - "Where we are now" - Current state of SEND
- /state-of-send-2026/what-is-changing - "What is changing" - Confirmed reforms
- /state-of-send-2026/what-has-not-changed - "What has not changed" - Existing rights still in force
- /state-of-send-2026/what-is-being-discussed - "What is being discussed" - Proposals under consideration
- /state-of-send-2026/what-we-do-not-know - "What we don't know" - Unanswered questions
- /state-of-send-2026/what-the-leaks-are-saying - "What the leaks say" - Leaked documents analysed
- /state-of-send-2026/what-the-leaks-do-not-mean - "What the leaks don't mean" - Avoiding misinterpretation
- /state-of-send-2026/timeline - "Timeline and next steps" - Key dates

Parent Guides:
- /ehcps - "The EHCP Guide" - Rights, process, what to do when things go wrong
- /ehcp-health - "Health in EHCPs" - NHS responsibilities and therapy provision
- /understanding-your-child - "Understanding your child" - Neurodivergence explained for families
- /understanding-your-child/autism - "Understanding Autism" - Autism in the SEND system
- /understanding-your-child/adhd - "Understanding ADHD" - ADHD rights and school support
- /exclusions - "Exclusions and rights" - School exclusions and SEND protections
- /alternative-provision - "Alternative Provision" - When mainstream does not work
- /post-16-and-transition - "Post-16 and Transition" - Moving into adulthood
- /what-to-do-right-now - "What to do right now" - Practical steps based on current law
- /sendiass - "Free help: SENDIASS" - Free independent advice near you
- /my-child-profile - "My Child: This is me" - Build a document about your child

System:
- /local-variation - "Why where you live matters" - Local authority variation
- /devolved-nations - "Wales, Scotland and NI" - Outside England

Community:
- /have-your-say - "Have your say" - Respond to consultation, contact your MP
- /questions-and-answers - "Ask Rich" - Ask a question, get a plain-English answer
- /community-questions - "Lived experience" - Real stories from families
- /for-parents - "You are carrying a lot" - Support for parents and carers

About:
- /about - "About this resource"
- /sources - "Sources and evidence"

You MUST respond with valid JSON in this exact format:
{
  "message": "Your 2-3 sentence response to the visitor",
  "recommendations": [
    {"path": "/ehcps", "title": "The EHCP Guide", "reason": "One sentence why this page fits what they described"}
  ]
}

Match based on what the person actually said. If they mention school, EHCPs, exclusions, leaks, reforms, their child, feeling overwhelmed, etc. - pick the pages that genuinely help. If unsure, include /questions-and-answers so they can ask Rich directly.`;

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || "";

    // Parse the JSON from the AI response
    let parsed;
    try {
      // Handle potential markdown code fences
      const jsonStr = aiText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI JSON:", aiText);
      parsed = {
        message: "Let me help you find what you need. Here are some good starting points.",
        recommendations: [
          { path: "/questions-and-answers", title: "Ask Rich", reason: "Ask a specific question and get a direct answer" },
          { path: "/state-of-send-2026", title: "Report Overview", reason: "Start with the full picture of SEND reform" },
        ],
      };
    }

    const sanitisedParsed = normaliseResponse(parsed);

    return new Response(
      JSON.stringify(sanitisedParsed),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("guide-me error:", e);
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});