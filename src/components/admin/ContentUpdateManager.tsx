import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, CheckCircle, XCircle, Clock, RefreshCw, AlertTriangle } from "lucide-react";

interface ContentUpdate {
  id: string;
  source: string;
  source_name: string | null;
  raw_content: string;
  status: string;
  submitted_at: string;
  processed_at: string | null;
  result_summary: string | null;
}

export function ContentUpdateManager({ pin }: { pin: string }) {
  const [updates, setUpdates] = useState<ContentUpdate[]>([]);
  const [sourceName, setSourceName] = useState("");
  const [rawContent, setRawContent] = useState("");
  const [breakingNews, setBreakingNews] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUpdates = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke("admin-moderate", {
      body: { pin, action: "list", table: "content_updates" },
    });
    if (!error && data?.data) {
      setUpdates(data.data);
    }
  }, [pin]);

  useEffect(() => {
    fetchUpdates();
  }, [fetchUpdates]);

  const handleSubmit = async () => {
    if (!rawContent.trim()) return;
    setSubmitting(true);
    try {
      // Insert via admin-moderate
      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: {
          pin,
          action: "insert_content_update",
          id: { source_name: sourceName.trim() || "Manual submission", raw_content: rawContent.trim() },
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: "Content submitted for processing" });

      // If breaking news, flag all pages
      if (breakingNews) {
        await supabase.functions.invoke("admin-moderate", {
          body: {
            pin,
            action: "flag_all_pages",
            id: { reason: `Breaking news: ${sourceName.trim() || "Manual submission"}`, content_update_id: data?.data?.id },
          },
        });
        toast({ title: "All pages flagged for review" });
      }

      setSourceName("");
      setRawContent("");
      setBreakingNews(false);
      await fetchUpdates();
    } catch (err: any) {
      toast({ title: "Failed to submit", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleProcess = async (updateId: string) => {
    setProcessingId(updateId);
    try {
      const { data, error } = await supabase.functions.invoke("process-update", {
        body: { content_update_id: updateId, pin },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: "Processing complete", description: data.summary });
      await fetchUpdates();
    } catch (err: any) {
      toast({ title: "Processing failed", description: err.message, variant: "destructive" });
    } finally {
      setProcessingId(null);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "processed": return <CheckCircle className="h-4 w-4 text-status-confirmed" />;
      case "failed": return <XCircle className="h-4 w-4 text-destructive" />;
      case "processing": return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Submit new content */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="font-display text-lg font-bold">Submit New Information</h3>
        <p className="text-sm text-muted-foreground">
          Paste raw text from articles, government announcements, or briefings. The AI will extract facts, update the knowledge base, and flag affected pages.
        </p>
        <Input
          placeholder="Source name (e.g. 'GOV.UK announcement 23 Feb 2026')"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
        />
        <Textarea
          placeholder="Paste the raw content here..."
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          className="min-h-[200px]"
        />
        <div className="flex items-center gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
          <Checkbox
            id="breaking-news"
            checked={breakingNews}
            onCheckedChange={(checked) => setBreakingNews(checked === true)}
          />
          <label htmlFor="breaking-news" className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Breaking news: flag all pages for review
          </label>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={submitting || !rawContent.trim()}
          className="rounded-full gap-2"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Submit for Processing
        </Button>
      </div>

      {/* Recent updates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Recent Updates</h3>
          <Button variant="ghost" size="sm" onClick={fetchUpdates} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>

        {updates.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No content updates yet.</p>
        ) : (
          updates.map((u) => (
            <div key={u.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {statusIcon(u.status)}
                    <span className="text-sm font-semibold">{u.source_name || u.source}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(u.submitted_at).toLocaleDateString()} {new Date(u.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {u.raw_content.substring(0, 200)}{u.raw_content.length > 200 ? "..." : ""}
                  </p>
                  {u.result_summary && (
                    <p className="text-xs bg-status-confirmed-bg text-status-confirmed rounded-lg px-3 py-1.5 mt-1">
                      {u.result_summary}
                    </p>
                  )}
                </div>
                {u.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleProcess(u.id)}
                    disabled={processingId === u.id}
                    className="rounded-full gap-1.5 shrink-0"
                  >
                    {processingId === u.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    Process
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
