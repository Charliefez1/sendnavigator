import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  ArrowRight,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  uniqueSessions: number;
  returningVisitors: number;
  newVisitors: number;
  avgSessionDuration: number;
  pageViews: { path: string; count: number }[];
  avgTimePerPage: { path: string; avgSeconds: number }[];
  devices: { type: string; count: number }[];
  sources: { source: string; count: number }[];
  navigationPaths: { path: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
}

function StatCard({ icon: Icon, label, value, subtext }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function DeviceIcon({ type }: { type: string }) {
  switch (type) {
    case "mobile": return <Smartphone className="w-4 h-4" />;
    case "tablet": return <Tablet className="w-4 h-4" />;
    default: return <Monitor className="w-4 h-4" />;
  }
}

const PATH_LABELS: Record<string, string> = {
  "/": "Home",
  "/where-we-are-now": "Current situation",
  "/what-is-changing": "Confirmed changes",
  "/what-has-not-changed": "What has not changed",
  "/what-is-being-discussed": "Under discussion",
  "/what-we-do-not-know": "What we do not know",
  "/what-the-leaks-are-saying": "Unconfirmed reports",
  "/what-the-leaks-do-not-mean": "What leaks do not mean",
  "/what-happens-next": "What happens next",
  "/timeline": "Timeline",
  "/about": "About",
  "/sources": "Sources",
  "/how-to-use": "How to use",
  "/questions-and-answers": "Q&A",
  "/community-questions": "Community questions",
  "/feedback": "Feedback",
  "/rich-ferriman": "Rich Ferriman",
  "/neurodiversity-global": "Neurodiversity Global",
  "/why-i-built-this": "Why I built this",
};

function friendlyPath(path: string): string {
  return PATH_LABELS[path] || path;
}

function BarRow({ label, value, max, suffix = "" }: { label: string; value: number; max: number; suffix?: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground truncate max-w-[200px]">{label}</span>
        <span className="text-muted-foreground font-medium">{value}{suffix}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.max(pct, 2)}%` }} />
      </div>
    </div>
  );
}

export function AnalyticsDashboard({ pin }: { pin: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(30);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: err } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "analytics_summary", days },
      });
      if (err) throw err;
      if (result?.error) throw new Error(result.error);
      setData(result.data);
    } catch (e: any) {
      setError(e.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, [pin, days]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading && !data) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-destructive">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchAnalytics} className="mt-3 rounded-full">
          Retry
        </Button>
      </div>
    );
  }

  if (!data) return null;

  const maxPageViews = data.pageViews[0]?.count || 1;
  const maxSource = data.sources[0]?.count || 1;
  const maxNavPath = data.navigationPaths[0]?.count || 1;
  const maxTimePerPage = data.avgTimePerPage[0]?.avgSeconds || 1;

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                days === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {d} days
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={fetchAnalytics} disabled={loading} className="rounded-full gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Eye} label="Total page views" value={data.totalViews.toLocaleString()} />
        <StatCard icon={Users} label="Unique visitors" value={data.uniqueVisitors.toLocaleString()} subtext={`${data.newVisitors} new · ${data.returningVisitors} returning`} />
        <StatCard icon={BarChart3} label="Sessions" value={data.uniqueSessions.toLocaleString()} />
        <StatCard icon={Clock} label="Avg session" value={formatDuration(data.avgSessionDuration)} />
      </div>

      {/* Daily trend */}
      {data.dailyTrend.length > 1 && (
        <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Daily views</h3>
          </div>
          <div className="flex items-end gap-[2px] h-24">
            {data.dailyTrend.map((d) => {
              const maxDaily = Math.max(...data.dailyTrend.map((t) => t.count));
              const pct = maxDaily > 0 ? (d.count / maxDaily) * 100 : 0;
              return (
                <div
                  key={d.date}
                  className="flex-1 bg-primary/70 hover:bg-primary rounded-t transition-colors cursor-default group relative"
                  style={{ height: `${Math.max(pct, 3)}%` }}
                  title={`${d.date}: ${d.count} views`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">{data.dailyTrend[0]?.date}</span>
            <span className="text-[10px] text-muted-foreground">{data.dailyTrend[data.dailyTrend.length - 1]?.date}</span>
          </div>
        </div>
      )}

      {/* Page views + Time per page side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Page views</h3>
          </div>
          <div className="space-y-3">
            {data.pageViews.slice(0, 12).map((p) => (
              <BarRow key={p.path} label={friendlyPath(p.path)} value={p.count} max={maxPageViews} />
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Avg time per page</h3>
          </div>
          <div className="space-y-3">
            {data.avgTimePerPage.slice(0, 12).map((p) => (
              <BarRow key={p.path} label={friendlyPath(p.path)} value={p.avgSeconds} max={maxTimePerPage} suffix="s" />
            ))}
            {data.avgTimePerPage.length === 0 && (
              <p className="text-xs text-muted-foreground py-4 text-center">Not enough data yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Devices + Sources side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Devices</h3>
          </div>
          <div className="space-y-3">
            {data.devices.map((d) => (
              <div key={d.type} className="flex items-center gap-3">
                <DeviceIcon type={d.type} />
                <span className="text-sm text-foreground capitalize flex-1">{d.type}</span>
                <span className="text-sm font-medium text-muted-foreground">{d.count}</span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {data.totalViews > 0 ? Math.round((d.count / data.totalViews) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Traffic sources</h3>
          </div>
          <div className="space-y-3">
            {data.sources.slice(0, 10).map((s) => (
              <BarRow key={s.source} label={s.source} value={s.count} max={maxSource} />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation paths */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Common navigation paths</h3>
        </div>
        <div className="space-y-3">
          {data.navigationPaths.slice(0, 10).map((np) => {
            const [from, to] = np.path.split(" → ");
            return (
              <div key={np.path} className="flex items-center gap-2 text-sm">
                <span className="text-foreground truncate max-w-[120px] sm:max-w-[180px]">{friendlyPath(from)}</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground truncate max-w-[120px] sm:max-w-[180px]">{friendlyPath(to)}</span>
                <span className="ml-auto text-muted-foreground font-medium flex-shrink-0">{np.count}×</span>
              </div>
            );
          })}
          {data.navigationPaths.length === 0 && (
            <p className="text-xs text-muted-foreground py-4 text-center">Not enough data yet.</p>
          )}
        </div>
      </div>

      {/* Privacy note */}
      <div className="bg-muted/50 border border-border rounded-xl p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          All analytics data is anonymous. No personal information is collected. Visitor and session identifiers are random and cannot be used to identify individuals. Data is only accessible to site administrators.
        </p>
      </div>
    </div>
  );
}
