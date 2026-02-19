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

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

export function NewsTicker() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await (supabase as any)
        .from("news_items")
        .select("id, title, url, source_name, discovered_at, published_at")
        .eq("status", "published")
        .order("discovered_at", { ascending: false })
        .limit(10);
      if (data) setItems(data);
    };
    fetchNews();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-destructive/10 border-y border-destructive/20">
      <div className="flex items-center">
        {/* Fixed label */}
        <div className="flex-shrink-0 bg-destructive px-3 py-2 flex items-center gap-2 z-10">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-destructive-foreground text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            Breaking
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex items-center gap-8 whitespace-nowrap py-2 px-4">
            {/* Duplicate items for seamless loop */}
            {[...items, ...items].map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
              >
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.source_name} · {timeAgo(item.published_at || item.discovered_at)}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-muted-foreground/30 mx-2">|</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
