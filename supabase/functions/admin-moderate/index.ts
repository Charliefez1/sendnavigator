import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_PIN = "8385";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { pin, action, table, id } = body;

    if (pin !== ADMIN_PIN) {
      return new Response(JSON.stringify({ error: "Invalid PIN" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

      // Aggregate on server
      const totalViews = views?.length || 0;
      const uniqueVisitors = new Set(views?.map((v: any) => v.visitor_id).filter(Boolean)).size;
      const uniqueSessions = new Set(views?.map((v: any) => v.session_id).filter(Boolean)).size;

      // Returning vs new: visitors with >1 session
      const visitorSessions: Record<string, Set<string>> = {};
      for (const v of views || []) {
        if (v.visitor_id && v.session_id) {
          if (!visitorSessions[v.visitor_id]) visitorSessions[v.visitor_id] = new Set();
          visitorSessions[v.visitor_id].add(v.session_id);
        }
      }
      const returningVisitors = Object.values(visitorSessions).filter((s) => s.size > 1).length;
      const newVisitors = uniqueVisitors - returningVisitors;

      // Page views by page
      const pageViewCounts: Record<string, number> = {};
      for (const v of views || []) {
        pageViewCounts[v.path] = (pageViewCounts[v.path] || 0) + 1;
      }
      const pageViews = Object.entries(pageViewCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count);

      // Device breakdown
      const deviceCounts: Record<string, number> = {};
      for (const v of views || []) {
        const dt = v.device_type || "unknown";
        deviceCounts[dt] = (deviceCounts[dt] || 0) + 1;
      }
      const devices = Object.entries(deviceCounts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);

      // Traffic sources (referrer domains)
      const sourceCounts: Record<string, number> = {};
      for (const v of views || []) {
        let source = "direct";
        if (v.referrer) {
          try {
            source = new URL(v.referrer).hostname;
          } catch {
            source = v.referrer;
          }
        }
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      }
      const sources = Object.entries(sourceCounts)
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      // Navigation paths (most common page-to-page transitions within sessions)
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

      // Average time on page (estimated from sequential views within a session)
      const pageTimeTotals: Record<string, { total: number; count: number }> = {};
      for (const pages of Object.values(sessionPages)) {
        const sorted = pages.sort((a, b) => a.time.localeCompare(b.time));
        for (let i = 0; i < sorted.length - 1; i++) {
          const duration = (new Date(sorted[i + 1].time).getTime() - new Date(sorted[i].time).getTime()) / 1000;
          // Cap at 10 minutes to exclude abandoned tabs
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

      // Average session duration
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

      // Daily views trend
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
            totalViews,
            uniqueVisitors,
            uniqueSessions,
            returningVisitors,
            newVisitors,
            avgSessionDuration,
            pageViews,
            avgTimePerPage,
            devices,
            sources,
            navigationPaths,
            dailyTrend,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── Existing actions ───
    if (action === "list") {
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
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
