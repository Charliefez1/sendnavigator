import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle, CheckCircle, XCircle, RefreshCw, Loader2,
  ChevronDown, ChevronRight, ExternalLink, Trash2,
} from "lucide-react";

interface PageFlag {
  id: string;
  page_path: string;
  flag_reason: string;
  status: string;
  flagged_at: string;
  resolved_at: string | null;
  content_update_id: string | null;
}

interface GroupedPage {
  page_path: string;
  flags: PageFlag[];
  uniqueReasons: string[];
}

export function PageFlagsPanel({ pin }: { pin: string }) {
  const [flags, setFlags] = useState<PageFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [resolvingPage, setResolvingPage] = useState<string | null>(null);
  const [resolvingAll, setResolvingAll] = useState(false);
  const { toast } = useToast();

  const fetchFlags = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "list", table: "page_update_flags" },
      });
      if (error) throw error;
      if (data?.data) setFlags(data.data);
      else setFlags([]);
    } catch (err: any) {
      toast({ title: "Failed to load flags", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [pin, toast]);

  useEffect(() => { fetchFlags(); }, [fetchFlags]);

  const staleFlags = flags.filter(f => f.status === "stale");
  const resolvedFlags = flags.filter(f => f.status !== "stale");

  // Group stale flags by page, sorted by count descending
  const grouped: GroupedPage[] = Object.values(
    staleFlags.reduce<Record<string, GroupedPage>>((acc, flag) => {
      if (!acc[flag.page_path]) {
        acc[flag.page_path] = { page_path: flag.page_path, flags: [], uniqueReasons: [] };
      }
      acc[flag.page_path].flags.push(flag);
      // Deduplicate reasons (truncated for display)
      const short = flag.flag_reason.substring(0, 120);
      if (!acc[flag.page_path].uniqueReasons.includes(short)) {
        acc[flag.page_path].uniqueReasons.push(short);
      }
      return acc;
    }, {})
  ).sort((a, b) => b.flags.length - a.flags.length);

  const toggleExpand = (path: string) => {
    setExpandedPages(prev => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  const resolveByPage = async (pagePath: string, status: "updated" | "dismissed") => {
    setResolvingPage(pagePath);
    try {
      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "resolve_flags_by_page", id: { page_path: pagePath, status } },
      });
      if (error) throw error;
      toast({ title: `${pagePath}: ${data?.count || 0} flags marked as ${status}` });
      await fetchFlags();
    } catch {
      toast({ title: "Failed to resolve flags", variant: "destructive" });
    } finally {
      setResolvingPage(null);
    }
  };

  const resolveAllFlags = async (status: "updated" | "dismissed") => {
    setResolvingAll(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "resolve_all_flags", id: { status } },
      });
      if (error) throw error;
      toast({ title: `All ${data?.count || 0} flags marked as ${status}` });
      await fetchFlags();
    } catch {
      toast({ title: "Failed to resolve flags", variant: "destructive" });
    } finally {
      setResolvingAll(false);
    }
  };

  const resolveSingle = async (flagId: string, status: string) => {
    try {
      const { error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "resolve_flag", table: "page_update_flags", id: { flagId, status } },
      });
      if (error) throw error;
      await fetchFlags();
    } catch {
      toast({ title: "Failed to update flag", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-display text-lg font-bold">
          Page Staleness Flags
          {staleFlags.length > 0 && (
            <span className="ml-2 text-sm font-normal bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
              {staleFlags.length} stale across {grouped.length} page{grouped.length !== 1 ? "s" : ""}
            </span>
          )}
        </h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={fetchFlags} disabled={loading} className="gap-1.5">
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Refresh
          </Button>
        </div>
      </div>

      {/* Bulk actions bar */}
      {staleFlags.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-muted/50 border border-border rounded-lg flex-wrap">
          <span className="text-sm font-medium">Bulk actions:</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => resolveAllFlags("updated")}
            disabled={resolvingAll}
            className="gap-1.5 text-xs rounded-full"
          >
            {resolvingAll ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5 text-status-confirmed" />}
            Mark all {staleFlags.length} as reviewed
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => resolveAllFlags("dismissed")}
            disabled={resolvingAll}
            className="gap-1.5 text-xs rounded-full"
          >
            {resolvingAll ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />}
            Dismiss all
          </Button>
        </div>
      )}

      {/* Loading state */}
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
            <p className="text-xs mt-1">{resolvedFlags.length} resolved flag{resolvedFlags.length > 1 ? "s" : ""} in history</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {grouped.map(({ page_path, flags: pageFlags, uniqueReasons }) => {
            const isExpanded = expandedPages.has(page_path);
            const isResolving = resolvingPage === page_path;

            return (
              <div key={page_path} className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Page header row */}
                <div className="flex items-center gap-3 p-4">
                  <button
                    onClick={() => toggleExpand(page_path)}
                    className="flex items-center gap-2 flex-1 min-w-0 text-left"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                    <span className="font-mono text-sm font-semibold truncate">{page_path}</span>
                    <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full flex-shrink-0">
                      {pageFlags.length}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <a
                      href={page_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3" /> View
                    </a>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => resolveByPage(page_path, "updated")}
                      disabled={isResolving}
                      className="h-7 px-2 text-xs text-status-confirmed hover:bg-status-confirmed-bg gap-1"
                    >
                      {isResolving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5" />}
                      Reviewed
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => resolveByPage(page_path, "dismissed")}
                      disabled={isResolving}
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive gap-1"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Dismiss
                    </Button>
                  </div>
                </div>

                {/* Summary line (always visible) */}
                {!isExpanded && uniqueReasons.length > 0 && (
                  <div className="px-4 pb-3 -mt-1">
                    <p className="text-xs text-muted-foreground line-clamp-2 pl-10">
                      {uniqueReasons[0]}{uniqueReasons.length > 1 ? ` (+${uniqueReasons.length - 1} more)` : ""}
                    </p>
                  </div>
                )}

                {/* Expanded: show all individual flags */}
                {isExpanded && (
                  <div className="border-t border-border divide-y divide-border">
                    {pageFlags.map(flag => (
                      <div key={flag.id} className="flex items-start justify-between gap-3 px-4 py-3 pl-10">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{flag.flag_reason}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Flagged {new Date(flag.flagged_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => resolveSingle(flag.id, "updated")}
                            className="h-7 px-2 text-xs text-status-confirmed hover:bg-status-confirmed-bg gap-1"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => resolveSingle(flag.id, "dismissed")}
                            className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive gap-1"
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Resolved history */}
      {resolvedFlags.length > 0 && (
        <details className="text-sm">
          <summary className="text-muted-foreground cursor-pointer hover:text-foreground">
            {resolvedFlags.length} resolved flag{resolvedFlags.length > 1 ? "s" : ""} in history
          </summary>
          <div className="mt-2 space-y-1 max-h-64 overflow-y-auto">
            {resolvedFlags.slice(0, 50).map(f => (
              <div key={f.id} className="flex items-center gap-2 text-muted-foreground pl-2 py-0.5">
                {f.status === "updated" ? (
                  <CheckCircle className="h-3 w-3 text-status-confirmed flex-shrink-0" />
                ) : (
                  <XCircle className="h-3 w-3 flex-shrink-0" />
                )}
                <span className="font-mono text-xs">{f.page_path}</span>
                <span className="text-xs truncate">{f.flag_reason.substring(0, 80)}</span>
              </div>
            ))}
            {resolvedFlags.length > 50 && (
              <p className="text-xs text-muted-foreground pl-2">...and {resolvedFlags.length - 50} more</p>
            )}
          </div>
        </details>
      )}
    </div>
  );
}
