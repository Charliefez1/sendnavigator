import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Loader2 } from "lucide-react";

interface PageFlag {
  id: string;
  page_path: string;
  flag_reason: string;
  status: string;
  flagged_at: string;
  resolved_at: string | null;
}

export function PageFlagsPanel({ pin }: { pin: string }) {
  const [flags, setFlags] = useState<PageFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFlags = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "list", table: "page_update_flags" },
      });
      if (error) {
        console.error("PageFlags fetch error:", error);
        toast({ title: "Failed to load flags", description: error.message, variant: "destructive" });
        return;
      }
      if (data?.data) {
        setFlags(data.data);
      } else {
        console.warn("PageFlags: unexpected response", data);
        setFlags([]);
      }
    } catch (err: any) {
      console.error("PageFlags fetch exception:", err);
      toast({ title: "Failed to load flags", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [pin, toast]);

  useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  const handleResolve = async (flagId: string, newStatus: string) => {
    try {
      const { error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "resolve_flag", table: "page_update_flags", id: { flagId, status: newStatus } },
      });
      if (error) throw error;
      toast({ title: `Flag ${newStatus}` });
      await fetchFlags();
    } catch {
      toast({ title: "Failed to update flag", variant: "destructive" });
    }
  };

  const staleFlags = flags.filter((f) => f.status === "stale");
  const resolvedFlags = flags.filter((f) => f.status !== "stale");

  // Group stale flags by page
  const groupedStale = staleFlags.reduce<Record<string, PageFlag[]>>((acc, flag) => {
    if (!acc[flag.page_path]) acc[flag.page_path] = [];
    acc[flag.page_path].push(flag);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">
          Page Staleness Flags
          {staleFlags.length > 0 && (
            <span className="ml-2 text-sm font-normal bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
              {staleFlags.length} stale
            </span>
          )}
        </h3>
        <Button variant="ghost" size="sm" onClick={fetchFlags} disabled={loading} className="gap-1.5">
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Refresh
        </Button>
      </div>

      {loading && flags.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
          <p>Loading flags...</p>
        </div>
      ) : staleFlags.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-status-confirmed" />
          <p>All pages are up to date.</p>
          {resolvedFlags.length > 0 && (
            <p className="text-xs mt-1">{resolvedFlags.length} resolved flag{resolvedFlags.length > 1 ? "s" : ""} below</p>
          )}
        </div>
      ) : (
        Object.entries(groupedStale).map(([pagePath, pageFlags]) => (
          <div key={pagePath} className="bg-card border-l-4 border-l-destructive border border-border rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="font-mono text-sm font-semibold">{pagePath}</span>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                {pageFlags.length} update{pageFlags.length > 1 ? "s" : ""}
              </span>
            </div>
            {pageFlags.map((flag) => (
              <div key={flag.id} className="flex items-start justify-between gap-3 pl-6">
                <div className="flex-1">
                  <p className="text-sm text-foreground">{flag.flag_reason}</p>
                  <p className="text-xs text-muted-foreground">
                    Flagged {new Date(flag.flagged_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleResolve(flag.id, "updated")}
                    className="h-7 px-2 text-xs text-status-confirmed hover:bg-status-confirmed-bg gap-1"
                  >
                    <CheckCircle className="h-3.5 w-3.5" /> Updated
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleResolve(flag.id, "dismissed")}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive gap-1"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {resolvedFlags.length > 0 && (
        <details className="text-sm">
          <summary className="text-muted-foreground cursor-pointer hover:text-foreground">
            {resolvedFlags.length} resolved flag{resolvedFlags.length > 1 ? "s" : ""}
          </summary>
          <div className="mt-2 space-y-2">
            {resolvedFlags.map((f) => (
              <div key={f.id} className="flex items-center gap-2 text-muted-foreground pl-2">
                <CheckCircle className="h-3.5 w-3.5" />
                <span className="font-mono text-xs">{f.page_path}</span>
                <span className="text-xs">{f.flag_reason}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
