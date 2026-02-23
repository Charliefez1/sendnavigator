import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, RefreshCw, Loader2, ClipboardCheck } from "lucide-react";

interface PageReview {
  id: string;
  page_path: string;
  page_name: string;
  last_reviewed_at: string | null;
  reviewed_by: string | null;
}

export function PageReviewChecklist({ pin }: { pin: string }) {
  const [pages, setPages] = useState<PageReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);
  const { toast } = useToast();

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "review_list", table: "page_reviews" },
      });
      if (error) throw error;
      setPages(data?.data || []);
    } catch (err: any) {
      toast({ title: "Failed to load review checklist", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [pin, toast]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const markReviewed = async (pageId: string) => {
    setMarkingId(pageId);
    try {
      const { error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "mark_reviewed", table: "page_reviews", id: pageId },
      });
      if (error) throw error;
      toast({ title: "Page marked as reviewed" });
      await fetchPages();
    } catch {
      toast({ title: "Failed to mark reviewed", variant: "destructive" });
    } finally {
      setMarkingId(null);
    }
  };

  const markAllReviewed = async () => {
    setMarkingAll(true);
    try {
      const { error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, action: "mark_all_reviewed", table: "page_reviews" },
      });
      if (error) throw error;
      toast({ title: "All pages marked as reviewed" });
      await fetchPages();
    } catch {
      toast({ title: "Failed to mark all reviewed", variant: "destructive" });
    } finally {
      setMarkingAll(false);
    }
  };

  const now = new Date();
  const staleThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days

  const getStatus = (page: PageReview) => {
    if (!page.last_reviewed_at) return "never";
    const diff = now.getTime() - new Date(page.last_reviewed_at).getTime();
    if (diff > staleThreshold) return "overdue";
    return "current";
  };

  const neverReviewed = pages.filter((p) => getStatus(p) === "never");
  const overdue = pages.filter((p) => getStatus(p) === "overdue");
  const current = pages.filter((p) => getStatus(p) === "current");

  const renderGroup = (title: string, items: PageReview[], color: string) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">
        <h4 className={`text-sm font-semibold ${color}`}>
          {title} ({items.length})
        </h4>
        {items.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between gap-3 bg-card border border-border rounded-lg px-4 py-2.5"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{page.page_name}</p>
              <p className="text-xs text-muted-foreground font-mono">{page.page_path}</p>
              {page.last_reviewed_at && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Last reviewed: {new Date(page.last_reviewed_at).toLocaleDateString()} by {page.reviewed_by || "Admin"}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant={getStatus(page) === "current" ? "ghost" : "outline"}
              onClick={() => markReviewed(page.id)}
              disabled={markingId === page.id}
              className="rounded-full gap-1.5 shrink-0"
            >
              {markingId === page.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CheckCircle className="h-3.5 w-3.5" />
              )}
              Reviewed
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          Page Review Checklist
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllReviewed}
            disabled={markingAll}
            className="rounded-full gap-1.5"
          >
            {markingAll ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5" />}
            Mark All Reviewed
          </Button>
          <Button variant="ghost" size="sm" onClick={fetchPages} disabled={loading} className="gap-1.5">
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Refresh
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Every page on the site is listed below. Pages not reviewed in the last 7 days are flagged. Tick through after major updates.
      </p>

      {loading && pages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
          <p>Loading checklist...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {renderGroup("⚠️ Never Reviewed", neverReviewed, "text-destructive")}
          {renderGroup("🕐 Overdue (>7 days)", overdue, "text-status-discussed")}
          {renderGroup("✅ Current", current, "text-status-confirmed")}
        </div>
      )}
    </div>
  );
}
