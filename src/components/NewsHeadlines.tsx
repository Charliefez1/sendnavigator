import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source_name: string;
  discovered_at: string;
  published_at: string | null;
}

function getUniqueBySource(items: NewsItem[], count: number): NewsItem[] {
  const seen = new Set<string>();
  const result: NewsItem[] = [];
  for (const item of items) {
    if (!seen.has(item.source_name)) {
      seen.add(item.source_name);
      result.push(item);
      if (result.length >= count) break;
    }
  }
  return result;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

export function NewsHeadlines() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await (supabase as any)
        .from("news_items")
        .select("id, title, url, source_name, discovered_at, published_at")
        .eq("status", "published")
        .order("discovered_at", { ascending: false })
        .limit(20);
      if (data) setItems(getUniqueBySource(data, 3));
    };
    fetch();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-lg">
      {/* Red breaking news banner */}
      <div className="bg-destructive px-4 py-1.5 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-destructive-foreground text-xs font-bold uppercase tracking-widest">
          Breaking News
        </span>
      </div>

      {/* Headlines */}
      <div className="bg-card divide-y divide-border">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 px-4 py-3 group hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-medium text-primary">{item.source_name}</span>
                <span className="text-[11px] text-muted-foreground">·</span>
                <span className="text-[11px] text-muted-foreground">{timeAgo(item.published_at || item.discovered_at)}</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}
