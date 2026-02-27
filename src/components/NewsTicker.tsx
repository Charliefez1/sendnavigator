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

export function NewsTicker() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Cycle through headlines
  const cycleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % Math.max(items.length, 1));
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(cycleNext, 5000);
    return () => clearInterval(interval);
  }, [cycleNext, items.length]);

  if (items.length === 0) return null;

  const current = items[activeIndex];

  return (
    <div className="w-full bg-[hsl(220,20%,12%)] text-white overflow-hidden">
      <div className="flex items-stretch">
        {/* LIVE badge */}
        <div className="flex-shrink-0 bg-destructive flex items-center gap-1.5 px-3 py-1.5">
          <Radio className="w-3 h-3 text-white animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
            Live
          </span>
        </div>

        {/* Featured headline - cycles */}
        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 border-r border-white/10 hover:bg-white/5 transition-colors max-w-[420px] group"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
              {decodeEntities(current.title)}
            </p>
            <p className="text-xs text-white/50">
              {current.source_name} · {timeAgo(current.published_at || current.discovered_at)}
            </p>
          </div>
          <ExternalLink className="w-3 h-3 text-white/30 flex-shrink-0 group-hover:text-primary transition-colors" />
        </a>

        {/* Scrolling ticker tape */}
        <div className="overflow-hidden flex-1 relative">
          <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[hsl(220,20%,12%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[hsl(220,20%,12%)] to-transparent z-10 pointer-events-none" />
          <div className="animate-ticker flex items-center gap-6 whitespace-nowrap py-1.5 px-4">
            {[...items, ...items].map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-destructive flex-shrink-0" />
                <span>{decodeEntities(item.title)}</span>
                <span className="text-white/30 text-[11px]">{item.source_name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Headline count / dots */}
        <div className="flex-shrink-0 flex items-center gap-1 px-3 border-l border-white/10">
          {items.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === activeIndex ? "bg-destructive" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Headline ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
