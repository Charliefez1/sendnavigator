import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = new Uint8Array(8);
  crypto.getRandomValues(values);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[values[i] % chars.length];
  }
  return code;
}

/**
 * Extract user_id from the Authorization header JWT.
 * Returns null if not authenticated (access code only flow).
 */
async function getUserId(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const adminSupabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const userId = await getUserId(req);
    const { action, access_code, profile_data, stage, active_section, report_mode, ai_report, consent_given_at } = await req.json();

    // Clean up expired profiles on each request
    try { await adminSupabase.rpc("cleanup_expired_profiles"); } catch (_) { /* ignore */ }

    if (action === "save") {
      // Check if updating an existing code
      if (access_code) {
        const { data: existing } = await adminSupabase
          .from("saved_profiles")
          .select("id, user_id")
          .eq("access_code", access_code)
          .maybeSingle();

        if (existing) {
          // If profile has a user_id, verify ownership
          if (existing.user_id && userId && existing.user_id !== userId) {
            return new Response(
              JSON.stringify({ error: "You do not have permission to update this profile" }),
              { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          const updatePayload: Record<string, unknown> = {
            stage: stage || "builder",
            active_section: active_section ?? 0,
            report_mode: report_mode || "full",
            last_active_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          };
          if (profile_data !== undefined) updatePayload.profile_data = profile_data;
          if (ai_report !== undefined) updatePayload.ai_report = ai_report;
          if (consent_given_at !== undefined) updatePayload.consent_given_at = consent_given_at;
          // Associate with user if not already
          if (userId && !existing.user_id) updatePayload.user_id = userId;

          const { error } = await adminSupabase
            .from("saved_profiles")
            .update(updatePayload)
            .eq("access_code", access_code);

          if (error) throw error;
          return new Response(JSON.stringify({ access_code }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      // New profile: enforce 3 profile limit for authenticated users
      if (userId) {
        const { count } = await adminSupabase
          .from("saved_profiles")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId);

        if ((count ?? 0) >= 3) {
          return new Response(
            JSON.stringify({ error: "You have reached the maximum of 3 profiles. Please delete an existing profile before creating a new one." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      // Generate new code (retry if collision)
      let code = "";
      let attempts = 0;
      while (attempts < 10) {
        code = generateAccessCode();
        const { data: clash } = await adminSupabase
          .from("saved_profiles")
          .select("id")
          .eq("access_code", code)
          .maybeSingle();
        if (!clash) break;
        attempts++;
      }

      const { error } = await adminSupabase.from("saved_profiles").insert({
        access_code: code,
        profile_data: profile_data || {},
        stage: stage || "opening",
        active_section: active_section ?? 0,
        report_mode: report_mode || "full",
        ...(userId ? { user_id: userId } : {}),
        ...(ai_report !== undefined ? { ai_report } : {}),
        ...(consent_given_at !== undefined ? { consent_given_at } : {}),
      });

      if (error) {
        if (error.message?.includes("Maximum of 3 profiles")) {
          return new Response(
            JSON.stringify({ error: "You have reached the maximum of 3 profiles. Please delete an existing profile before creating a new one." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        throw error;
      }

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

      const { data, error } = await adminSupabase
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

      // Associate profile with user if loading while logged in and profile is unowned
      if (userId && !data.user_id) {
        await adminSupabase
          .from("saved_profiles")
          .update({ user_id: userId, last_active_at: new Date().toISOString() })
          .eq("access_code", access_code)
          .catch(() => {});
      }

      // Update last_active_at
      await adminSupabase
        .from("saved_profiles")
        .update({ last_active_at: new Date().toISOString() })
        .eq("access_code", access_code)
        .catch(() => {});

      return new Response(
        JSON.stringify({
          profile_data: data.profile_data,
          stage: data.stage,
          active_section: data.active_section,
          report_mode: data.report_mode,
          ai_report: data.ai_report,
          access_code: data.access_code,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // List profiles for authenticated user
    if (action === "list") {
      if (!userId) {
        return new Response(JSON.stringify({ error: "Authentication required" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await adminSupabase
        .from("saved_profiles")
        .select("access_code, stage, active_section, report_mode, created_at, last_active_at, expires_at, profile_data")
        .eq("user_id", userId)
        .gt("expires_at", new Date().toISOString())
        .order("last_active_at", { ascending: false });

      if (error) throw error;

      const profiles = (data || []).map((p) => ({
        access_code: p.access_code,
        child_name: (p.profile_data as any)?.setup?.childName || "",
        stage: p.stage,
        active_section: p.active_section,
        report_mode: p.report_mode,
        created_at: p.created_at,
        last_active_at: p.last_active_at,
        expires_at: p.expires_at,
      }));

      return new Response(JSON.stringify({ profiles }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Delete action
    if (action === "delete") {
      if (!access_code) {
        return new Response(JSON.stringify({ error: "Access code required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Verify ownership if authenticated
      if (userId) {
        const { data: profile } = await adminSupabase
          .from("saved_profiles")
          .select("user_id")
          .eq("access_code", access_code)
          .maybeSingle();

        if (profile?.user_id && profile.user_id !== userId) {
          return new Response(
            JSON.stringify({ error: "You do not have permission to delete this profile" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      const { error } = await adminSupabase
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

      const { data, error } = await adminSupabase
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
