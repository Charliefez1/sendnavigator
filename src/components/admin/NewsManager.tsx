import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EyeOff, Eye, Trash2, RefreshCw, ExternalLink, Play } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  url: string;
  source_name: string;
  topic: string;
  status: string;
  discovered_at: string;
}

interface NewsManagerProps {
  pin: string;
}

export function NewsManager({ pin }: NewsManagerProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const { toast } = useToast();

  const callAdmin = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("admin-moderate", {
      body: { pin, ...body },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const fetchItems = async () => {
    try {
      const result = await callAdmin({ action: "news_list", table: "news_items" });
      setItems(result.data || []);
    } catch {
      toast({ title: "Failed to load news items", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "hidden" : "published";
    try {
      await callAdmin({ action: "news_update_status", table: "news_items", id: { itemId: id, status: newStatus } });
      toast({ title: `Item ${newStatus}` });
      await fetchItems();
    } catch {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await callAdmin({ action: "delete", table: "news_items", id });
      toast({ title: "Deleted" });
      await fetchItems();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const handleRunTracker = async () => {
    setRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke("news-tracker");
      if (error) throw error;
      toast({ title: `Tracker complete: ${data?.found || 0} found, ${data?.inserted || 0} new` });
      await fetchItems();
    } catch {
      toast({ title: "Tracker failed", variant: "destructive" });
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return <p className="text-muted-foreground text-center py-8">Loading news items...</p>;
  }

  const publishedCount = items.filter((i) => i.status === "published").length;
  const hiddenCount = items.filter((i) => i.status === "hidden").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          {items.length} items ({publishedCount} published, {hiddenCount} hidden)
        </p>
        <Button
          size="sm"
          onClick={handleRunTracker}
          disabled={running}
          className="rounded-full gap-1.5"
        >
          {running ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {running ? "Running..." : "Run Tracker Now"}
        </Button>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className={`bg-card border rounded-xl p-4 space-y-1 ${
            item.status === "hidden" ? "border-destructive/30 opacity-60" : "border-border"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  item.status === "published"
                    ? "bg-status-confirmed-bg text-status-confirmed border border-status-confirmed/30"
                    : "bg-destructive/10 text-destructive border border-destructive/30"
                }`}>
                  {item.status}
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.topic}</span>
                <span className="text-xs text-muted-foreground">{item.source_name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.discovered_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              {item.summary && <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>}
            </div>
            <div className="flex gap-1 shrink-0">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="View">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleToggle(item.id, item.status)}
                className="h-8 w-8 p-0"
                title={item.status === "published" ? "Hide" : "Show"}
              >
                {item.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(item.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
