import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No I/O/0/1 to avoid confusion
  const values = new Uint8Array(8);
  crypto.getRandomValues(values);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[values[i] % chars.length];
  }
  return code;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const { action, access_code, profile_data, stage, active_section, report_mode, ai_report, consent_given_at } = await req.json();

    // Clean up expired profiles on each request
    await supabase.rpc("cleanup_expired_profiles").catch(() => {});

    if (action === "save") {
      // Check if updating an existing code
      if (access_code) {
        const { data: existing } = await supabase
          .from("saved_profiles")
          .select("id")
          .eq("access_code", access_code)
          .maybeSingle();

        if (existing) {
          const { error } = await supabase
            .from("saved_profiles")
            .update({
              profile_data,
              stage: stage || "builder",
              active_section: active_section ?? 0,
              report_mode: report_mode || "full",
              ...(ai_report !== undefined ? { ai_report } : {}),
              ...(consent_given_at !== undefined ? { consent_given_at } : {}),
              expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            })
            .eq("access_code", access_code);

          if (error) throw error;
          return new Response(JSON.stringify({ access_code }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      // Generate new code (retry if collision)
      let code = "";
      let attempts = 0;
      while (attempts < 10) {
        code = generateAccessCode();
        const { data: clash } = await supabase
          .from("saved_profiles")
          .select("id")
          .eq("access_code", code)
          .maybeSingle();
        if (!clash) break;
        attempts++;
      }

      const { error } = await supabase.from("saved_profiles").insert({
        access_code: code,
        profile_data,
        stage: stage || "builder",
        active_section: active_section ?? 0,
        report_mode: report_mode || "full",
        ...(ai_report !== undefined ? { ai_report } : {}),
        ...(consent_given_at !== undefined ? { consent_given_at } : {}),
      });

      if (error) throw error;

      return new Response(JSON.stringify({ access_code: code }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "load") {
      if (!access_code) {
        return new Response(JSON.stringify({ error: "Access code required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await supabase
        .from("saved_profiles")
        .select("*")
        .eq("access_code", access_code)
        .gt("expires_at", new Date().toISOString())
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        return new Response(
          JSON.stringify({ error: "Invalid or expired access code" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          profile_data: data.profile_data,
          stage: data.stage,
          active_section: data.active_section,
          report_mode: data.report_mode,
          ai_report: data.ai_report,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Delete action
    if (action === "delete") {
      if (!access_code) {
        return new Response(JSON.stringify({ error: "Access code required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabase
        .from("saved_profiles")
        .delete()
        .eq("access_code", access_code);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Export action
    if (action === "export") {
      if (!access_code) {
        return new Response(JSON.stringify({ error: "Access code required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await supabase
        .from("saved_profiles")
        .select("*")
        .eq("access_code", access_code)
        .gt("expires_at", new Date().toISOString())
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return new Response(
          JSON.stringify({ error: "Invalid or expired access code" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          profile_data: data.profile_data,
          ai_report: data.ai_report,
          created_at: data.created_at,
          expires_at: data.expires_at,
          report_mode: data.report_mode,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Content-Disposition": `attachment; filename="my-child-profile-export.json"`,
          },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("save-profile error:", err);
    return new Response(JSON.stringify({ error: "An internal error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
