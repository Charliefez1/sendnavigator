import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── CORS: restrict to production domain ───
const ALLOWED_ORIGINS = [
  "https://sendnavigator.lovable.app",
  "https://id-preview--d1ead2e0-00aa-4f4e-8ab5-05dd5a79d10b.lovable.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

// ─── Allowed tables and actions ───
const ALLOWED_TABLES = new Set([
  "user_questions",
  "user_feedback",
  "knowledge_base",
  "news_items",
  "content_updates",
  "page_update_flags",
  "page_reviews",
  "contact_submissions",
]);

const ALLOWED_ACTIONS = new Set([
  "list", "approve", "reject", "delete", "respond", "update_answer",
  "kb_list", "kb_create", "kb_update", "kb_delete",
  "news_list", "news_update_status",
  "insert_content_update",
  "resolve_flag", "resolve_all_flags", "stale_flag_count", "flag_all_pages",
  "review_list", "mark_reviewed", "mark_all_reviewed",
  "analytics_summary", "stats",
  "contact_list",
]);

// ─── Rate limiting ───
const failedAttempts = new Map<string, { count: number; firstAt: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
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
    const body = await req.json();
    const { pin, action, table, id } = body;

    // Validate action
    if (!action || !ALLOWED_ACTIONS.has(action)) {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate table if provided
    if (table && !ALLOWED_TABLES.has(table)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify PIN from environment secret
    const adminPin = Deno.env.get("ADMIN_PIN");
    if (!adminPin || pin !== adminPin) {
      recordFailure(clientIp);
      return new Response(JSON.stringify({ error: "Invalid PIN" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    clearFailures(clientIp);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ─── Analytics actions ───
    if (action === "analytics_summary") {
      const { days = 30 } = body;
      const since = new Date();
      since.setDate(since.getDate() - days);
      const sinceISO = since.toISOString();

      const { data: views, error } = await supabase
        .from("page_views")
        .select("path, referrer, visitor_id, session_id, device_type, created_at")
        .gte("created_at", sinceISO)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const totalViews = views?.length || 0;
      const uniqueVisitors = new Set(views?.map((v: any) => v.visitor_id).filter(Boolean)).size;
      const uniqueSessions = new Set(views?.map((v: any) => v.session_id).filter(Boolean)).size;

      const visitorSessions: Record<string, Set<string>> = {};
      for (const v of views || []) {
        if (v.visitor_id && v.session_id) {
          if (!visitorSessions[v.visitor_id]) visitorSessions[v.visitor_id] = new Set();
          visitorSessions[v.visitor_id].add(v.session_id);
        }
      }
      const returningVisitors = Object.values(visitorSessions).filter((s) => s.size > 1).length;
      const newVisitors = uniqueVisitors - returningVisitors;

      const pageViewCounts: Record<string, number> = {};
      for (const v of views || []) {
        pageViewCounts[v.path] = (pageViewCounts[v.path] || 0) + 1;
      }
      const pageViews = Object.entries(pageViewCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count);

      const deviceCounts: Record<string, number> = {};
      for (const v of views || []) {
        const dt = v.device_type || "unknown";
        deviceCounts[dt] = (deviceCounts[dt] || 0) + 1;
      }
      const devices = Object.entries(deviceCounts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);

      const sourceCounts: Record<string, number> = {};
      for (const v of views || []) {
        let source = "direct";
        if (v.referrer) {
          try { source = new URL(v.referrer).hostname; } catch { source = v.referrer; }
        }
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      }
      const sources = Object.entries(sourceCounts)
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      const sessionPages: Record<string, { path: string; time: string }[]> = {};
      for (const v of views || []) {
        if (v.session_id) {
          if (!sessionPages[v.session_id]) sessionPages[v.session_id] = [];
          sessionPages[v.session_id].push({ path: v.path, time: v.created_at });
        }
      }
      const transitionCounts: Record<string, number> = {};
      for (const pages of Object.values(sessionPages)) {
        const sorted = pages.sort((a, b) => a.time.localeCompare(b.time));
        for (let i = 0; i < sorted.length - 1; i++) {
          const key = `${sorted[i].path} → ${sorted[i + 1].path}`;
          transitionCounts[key] = (transitionCounts[key] || 0) + 1;
        }
      }
      const navigationPaths = Object.entries(transitionCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      const pageTimeTotals: Record<string, { total: number; count: number }> = {};
      for (const pages of Object.values(sessionPages)) {
        const sorted = pages.sort((a, b) => a.time.localeCompare(b.time));
        for (let i = 0; i < sorted.length - 1; i++) {
          const duration = (new Date(sorted[i + 1].time).getTime() - new Date(sorted[i].time).getTime()) / 1000;
          if (duration > 0 && duration < 600) {
            if (!pageTimeTotals[sorted[i].path]) pageTimeTotals[sorted[i].path] = { total: 0, count: 0 };
            pageTimeTotals[sorted[i].path].total += duration;
            pageTimeTotals[sorted[i].path].count += 1;
          }
        }
      }
      const avgTimePerPage = Object.entries(pageTimeTotals)
        .map(([path, { total, count }]) => ({ path, avgSeconds: Math.round(total / count) }))
        .sort((a, b) => b.avgSeconds - a.avgSeconds);

      let totalSessionDuration = 0;
      let sessionCount = 0;
      for (const pages of Object.values(sessionPages)) {
        if (pages.length < 2) continue;
        const sorted = pages.sort((a, b) => a.time.localeCompare(b.time));
        const duration = (new Date(sorted[sorted.length - 1].time).getTime() - new Date(sorted[0].time).getTime()) / 1000;
        if (duration > 0 && duration < 3600) {
          totalSessionDuration += duration;
          sessionCount += 1;
        }
      }
      const avgSessionDuration = sessionCount > 0 ? Math.round(totalSessionDuration / sessionCount) : 0;

      const dailyViews: Record<string, number> = {};
      for (const v of views || []) {
        const day = v.created_at.substring(0, 10);
        dailyViews[day] = (dailyViews[day] || 0) + 1;
      }
      const dailyTrend = Object.entries(dailyViews)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return new Response(
        JSON.stringify({
          data: {
            totalViews, uniqueVisitors, uniqueSessions, returningVisitors, newVisitors,
            avgSessionDuration, pageViews, avgTimePerPage, devices, sources, navigationPaths, dailyTrend,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── Contact submissions list ───
    if (action === "contact_list") {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── Existing actions ───
    if (action === "list") {
      if (!table) throw new Error("Table required");
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "approve" || action === "reject") {
      if (!table || !id) throw new Error("Table and id required");
      const newStatus = action === "approve" ? "approved" : "rejected";
      const { data, error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      if (!table || !id) throw new Error("Table and id required");
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "respond" && table === "user_feedback") {
      const { data, error } = await supabase
        .from("user_feedback")
        .update({ admin_response: id.response })
        .eq("id", id.feedbackId)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update_answer") {
      const { data, error } = await supabase
        .from("user_questions")
        .update({ answer: id.answer, status: "approved" })
        .eq("id", id.questionId)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Knowledge base CRUD
    if (action === "kb_list") {
      const { data, error } = await supabase
        .from("knowledge_base")
        .select("*")
        .order("topic", { ascending: true });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "kb_create") {
      const { data, error } = await supabase
        .from("knowledge_base")
        .insert({ topic: id.topic, content: id.content })
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "kb_update") {
      const { data, error } = await supabase
        .from("knowledge_base")
        .update({ topic: id.topic, content: id.content, status: id.status })
        .eq("id", id.entryId)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "kb_delete") {
      const { error } = await supabase.from("knowledge_base").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // News items management
    if (action === "news_list") {
      const { data, error } = await supabase
        .from("news_items")
        .select("*")
        .order("discovered_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "news_update_status") {
      const { data, error } = await supabase
        .from("news_items")
        .update({ status: id.status })
        .eq("id", id.itemId)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Content updates management
    if (action === "insert_content_update") {
      const { data, error } = await supabase
        .from("content_updates")
        .insert({
          source: "manual",
          source_name: id.source_name,
          raw_content: id.raw_content,
          status: "pending",
        })
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Resolve page flag
    if (action === "resolve_flag" && table === "page_update_flags") {
      const { data, error } = await supabase
        .from("page_update_flags")
        .update({ status: id.status, resolved_at: new Date().toISOString() })
        .eq("id", id.flagId)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "resolve_all_flags") {
      const { data, error } = await supabase
        .from("page_update_flags")
        .update({ status: "updated", resolved_at: new Date().toISOString() })
        .eq("status", "stale")
        .select();
      if (error) throw error;
      return new Response(JSON.stringify({ data, count: data?.length || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "stale_flag_count") {
      const { data, error } = await supabase
        .from("page_update_flags")
        .select("id, page_path, flag_reason, status")
        .eq("status", "stale");
      if (error) throw error;
      return new Response(JSON.stringify({ data, count: data?.length || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "flag_all_pages") {
      const { data: allPages, error: pagesError } = await supabase
        .from("page_reviews")
        .select("page_path");
      if (pagesError) throw pagesError;

      const reason = id?.reason || "Breaking news — all pages flagged for review";
      const contentUpdateId = id?.content_update_id || null;

      let flagsCreated = 0;
      for (const page of allPages || []) {
        const { error } = await supabase.from("page_update_flags").insert({
          page_path: page.page_path,
          flag_reason: reason,
          content_update_id: contentUpdateId,
          status: "stale",
        });
        if (!error) flagsCreated++;
      }

      return new Response(JSON.stringify({ success: true, flags_created: flagsCreated }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Page review checklist
    if (action === "review_list" && table === "page_reviews") {
      const { data, error } = await supabase
        .from("page_reviews")
        .select("*")
        .order("page_path", { ascending: true });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "mark_reviewed" && table === "page_reviews") {
      const { data, error } = await supabase
        .from("page_reviews")
        .update({ last_reviewed_at: new Date().toISOString(), reviewed_by: "Admin" })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "mark_all_reviewed" && table === "page_reviews") {
      const { data, error } = await supabase
        .from("page_reviews")
        .update({ last_reviewed_at: new Date().toISOString(), reviewed_by: "Admin" })
        .not("id", "is", null)
        .select();
      if (error) throw error;
      return new Response(JSON.stringify({ data, count: data?.length || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "stats") {
      const [questions, feedback] = await Promise.all([
        supabase.from("user_questions").select("status", { count: "exact" }),
        supabase.from("user_feedback").select("status", { count: "exact" }),
      ]);

      return new Response(
        JSON.stringify({
          data: {
            totalQuestions: questions.count || 0,
            totalFeedback: feedback.count || 0,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("admin-moderate error:", err);
    return new Response(JSON.stringify({ error: "An internal error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
