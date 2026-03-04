import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── CORS: allow production + Lovable preview domains ───
const PRIMARY_ORIGIN = "https://send.neurodiversityglobal.com";
const ALLOWED_EXACT_ORIGINS = new Set([PRIMARY_ORIGIN]);

function isAllowedOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (url.protocol !== "https:") return false;
    if (ALLOWED_EXACT_ORIGINS.has(origin)) return true;
    return url.hostname.endsWith(".lovable.app") || url.hostname.endsWith(".lovableproject.com");
  } catch {
    return false;
  }
}

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = isAllowedOrigin(origin) ? origin : PRIMARY_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

// ─── Rate limiting ───
const failedAttempts = new Map<string, { count: number; firstAt: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const MAX_FAILURES = 5;

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const record = failedAttempts.get(ip);
  if (!record) return false;
  if (Date.now() - record.firstAt > RATE_LIMIT_WINDOW) {
    failedAttempts.delete(ip);
    return false;
  }
  return record.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const record = failedAttempts.get(ip);
  if (!record || Date.now() - record.firstAt > RATE_LIMIT_WINDOW) {
    failedAttempts.set(ip, { count: 1, firstAt: Date.now() });
  } else {
    record.count++;
  }
}

function clearFailures(ip: string) {
  failedAttempts.delete(ip);
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many failed attempts. Try again later." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { pin, file_path, file_name } = await req.json();

    // Verify admin PIN
    const adminPin = Deno.env.get("ADMIN_PIN");
    if (!adminPin || pin !== adminPin) {
      recordFailure(clientIp);
      return new Response(JSON.stringify({ error: "Invalid PIN" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    clearFailures(clientIp);

    if (!file_path) {
      return new Response(
        JSON.stringify({ error: "file_path is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Download the file from storage using service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: fileData, error: downloadError } = await supabase.storage
      .from("admin-uploads")
      .download(file_path);

    if (downloadError || !fileData) {
      return new Response(
        JSON.stringify({ error: "Failed to download file" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const ext = (file_name || file_path).split(".").pop()?.toLowerCase() || "";
    let extractedText = "";

    // For plain text files, read directly
    if (["txt", "md", "csv", "json", "xml", "html"].includes(ext)) {
      extractedText = await fileData.text();
    } else {
      // For PDFs and other binary docs, use Gemini to extract text
      const apiKey = Deno.env.get("LOVABLE_API_KEY");
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "AI API key not configured" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Convert file to base64
      const arrayBuffer = await fileData.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = "";
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64Data = btoa(binary);

      // Determine MIME type
      const mimeMap: Record<string, string> = {
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };
      const mimeType = mimeMap[ext] || "application/octet-stream";

      // Call Gemini to extract text
      const response = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `Extract ALL text content from this document. Preserve the structure (headings, paragraphs, lists, tables). Return ONLY the extracted text, no commentary. The file is called "${file_name || file_path}".`,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:${mimeType};base64,${base64Data}`,
                    },
                  },
                ],
              },
            ],
            max_tokens: 16000,
          }),
        }
      );

      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: "AI extraction failed" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const result = await response.json();
      extractedText =
        result.choices?.[0]?.message?.content || "No text extracted";
    }

    // Clean up the uploaded file
    await supabase.storage.from("admin-uploads").remove([file_path]);

    return new Response(
      JSON.stringify({ text: extractedText, file_name }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    const corsHeaders = getCorsHeaders(req);
    return new Response(
      JSON.stringify({ error: "An internal error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
