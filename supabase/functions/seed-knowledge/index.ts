import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Chunks text into passages of approximately 200-300 words.
 * Never splits mid-sentence. Preserves meaning across chunks.
 */
function chunkText(text: string, targetWords = 250): string[] {
  // Clean up markdown artifacts, image references, page headers
  const cleaned = text
    .replace(/### Images from page \d+:[\s\S]*?(?=\n##|\n#[^#]|$)/g, "")
    .replace(/`parsed-documents:\/\/[^`]+`[^\n]*/g, "")
    .replace(/<parsed-image>[\s\S]*?<\/parsed-image>/g, "")
    .replace(/\(full page screenshot\)/g, "")
    .replace(/## Page \d+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Split into sentences (rough but effective)
  const sentences = cleaned.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current: string[] = [];
  let wordCount = 0;

  for (const sentence of sentences) {
    const sWords = sentence.split(/\s+/).length;

    if (wordCount + sWords > targetWords * 1.3 && current.length > 0) {
      chunks.push(current.join(" ").trim());
      current = [];
      wordCount = 0;
    }

    current.push(sentence);
    wordCount += sWords;

    if (wordCount >= targetWords && current.length > 0) {
      chunks.push(current.join(" ").trim());
      current = [];
      wordCount = 0;
    }
  }

  if (current.length > 0) {
    const remaining = current.join(" ").trim();
    if (remaining.split(/\s+/).length > 30) {
      chunks.push(remaining);
    } else if (chunks.length > 0) {
      // Append short remainder to last chunk
      chunks[chunks.length - 1] += " " + remaining;
    } else {
      chunks.push(remaining);
    }
  }

  return chunks.filter((c) => c.split(/\s+/).length > 20);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentName, content, clearExisting } = await req.json();

    if (!documentName || !content) {
      return new Response(
        JSON.stringify({ error: "Missing documentName or content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Optionally clear existing chunks for this document
    if (clearExisting) {
      await supabase
        .from("knowledge_chunks")
        .delete()
        .eq("document_name", documentName);
    }

    const chunks = chunkText(content);

    // Insert in batches of 20
    const batchSize = 20;
    let inserted = 0;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize).map((chunk, idx) => ({
        document_name: documentName,
        chunk_index: i + idx,
        content: chunk,
      }));

      const { error } = await supabase.from("knowledge_chunks").insert(batch);
      if (error) {
        console.error("Insert error:", error);
        throw error;
      }
      inserted += batch.length;
    }

    return new Response(
      JSON.stringify({ success: true, chunks: inserted, documentName }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("seed-knowledge error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
