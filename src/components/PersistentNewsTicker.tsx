import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Radio } from "lucide-react";

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
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

function decodeEntities(str: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

export function PersistentNewsTicker() {
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
    <div className="fixed bottom-0 left-0 right-0 z-40" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="flex items-stretch h-16">
        {/* LIVE badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3" style={{ backgroundColor: "hsl(0 75% 38%)" }}>
          <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">
            Live
          </span>
        </div>

        {/* Scrolling ticker tape */}
        <div className="overflow-hidden flex-1 relative">
          <div
            className="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(222 35% 10%), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(222 35% 10%), transparent)" }}
          />
          <div className="animate-ticker flex items-center gap-8 whitespace-nowrap h-full px-4">
            {[...items, ...items].map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                style={{ color: "hsl(0 0% 70%)" }}
              >
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(175 60% 50%)" }} />
                <span className="font-medium" style={{ color: "hsl(0 0% 90%)" }}>{decodeEntities(item.title)}</span>
                <span style={{ color: "hsl(222 20% 50%)" }}>{item.source_name} · {timeAgo(item.published_at || item.discovered_at)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
