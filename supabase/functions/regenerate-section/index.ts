import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert in neurodivergence, child development, and family support. You write in the voice of Rich Ferriman, a neurodiversity consultant with lived AuADHD and Dyslexia experience.

Your job is to read the answers a parent has provided about ONE specific section of their child's profile and produce a short, warm, practical reflection for that section only.

ABSOLUTE RULES. NO EXCEPTIONS.

UK English only. Behaviour not behavior. Recognise not recognize. Mum not mom. No em dashes. Ever. Use a full stop and a new sentence instead. No Americanisms. No exclamation marks. No corporate language. Short sentences. One idea per sentence. Never more than two clauses.

Your voice is direct, grounded, and human. You speak to parents, not about them. You never use clinical language. You never frame the child as a problem.

Produce exactly three clearly headed subsections in this exact order.

What you told us
Two or three sentences reflecting back what the parent described in plain language.

What this tells us
Two or three sentences giving context. Why this pattern exists in a neurodivergent child in human terms.

What could help
Three to five sentences of practical strategies specific to what the parent described. Real, immediate, actionable.

Each subsection must start with its heading on its own line. Maximum 200 words total.

CRITICAL LANGUAGE RULES. THE CHILD IS NEVER THE PROBLEM.

You must never describe a child using deficit language. The system can be described as failing. The child cannot.

BANNED WORDS when applied to the child: broken, damaged, failing, lost, struggling to cope, beyond help, at breaking point, falling apart, out of control, spiralling, crisis point, rock bottom.

REPLACEMENT FRAMING: Not yet supported. Not yet understood. Let down by the system. Doing their best without what they need.

The child is always whole. The child is always doing their best. The failure belongs to the system, the setting, the adults, or the lack of understanding.

Return your response as JSON with this exact shape:
{
  "sectionIndex": <number>,
  "sectionTitle": "<string>",
  "reflection": "What you told us\nReflection text.\n\nWhat this tells us\nContext text.\n\nWhat could help\nStrategy text."
}

Return only valid JSON. No markdown. No code fences. No additional text.`;

// Simple in-memory rate limiter
const rateLimiter = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimiter.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimiter.set(ip, recent);
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { sectionIndex, sectionTitle, sectionText, childContext } = await req.json();

    if (sectionIndex === undefined || !sectionTitle || !sectionText) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userMessage = `Child context: ${childContext || "Not provided"}

Section ${sectionIndex + 1}: ${sectionTitle}

${sectionText}

Return your response as JSON with sectionIndex ${sectionIndex} and sectionTitle "${sectionTitle}".`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        temperature: 0.3,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic error:", errText);
      return new Response(JSON.stringify({ error: "AI service returned an error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await response.json();
    const rawText = aiData.content?.[0]?.text || "";

    // Parse JSON response
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // If AI didn't return valid JSON, wrap the text
      parsed = {
        sectionIndex,
        sectionTitle,
        reflection: rawText,
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("regenerate-section error:", err);
    return new Response(JSON.stringify({ error: "An internal error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
