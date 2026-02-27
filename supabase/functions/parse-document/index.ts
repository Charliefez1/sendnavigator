import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pin, file_path, file_name } = await req.json();

    // Verify admin PIN
    const adminPin = Deno.env.get("ADMIN_PIN");
    if (!pin || pin !== adminPin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
        JSON.stringify({ error: "Failed to download file", details: downloadError?.message }),
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
        "https://api.lovable.dev/v1/chat/completions",
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
        const errBody = await response.text();
        return new Response(
          JSON.stringify({ error: "AI extraction failed", details: errBody }),
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
    return new Response(
      JSON.stringify({ error: "Internal error", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
