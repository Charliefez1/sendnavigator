import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Zap, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source_name: string;
  discovered_at: string;
}

export function NewsHeadlines() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await (supabase as any)
        .from("news_items")
        .select("id, title, url, source_name, discovered_at")
        .eq("status", "published")
        .order("discovered_at", { ascending: false })
        .limit(3);
      if (data) setItems(data);
    };
    fetch();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-card p-5 shadow-lg space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Breaking headlines</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group rounded-lg p-2 -mx-2 hover:bg-accent/50 transition-colors"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                {item.title}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{item.source_name}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}
