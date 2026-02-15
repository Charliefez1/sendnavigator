import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SourceCard } from "@/components/SourceCard";
import { Newspaper, RefreshCw, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  url: string;
  source_name: string;
  source_domain: string | null;
  topic: string;
  discovered_at: string;
  published_at: string | null;
}

const topicLabels: Record<string, string> = {
  send_reform: "SEND Reform",
  ehcp: "EHCPs",
  funding: "Funding",
  tribunal: "Tribunals",
};

export function NewsTracker() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchNews = async () => {
    setLoading(true);
    // Use type assertion since table was just created
    const { data, error } = await (supabase as any)
      .from("news_items")
      .select("*")
      .eq("status", "published")
      .order("discovered_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredItems = filter === "all" ? items : items.filter((i) => i.topic === filter);
  const topics = [...new Set(items.map((i) => i.topic))];

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="rounded-full text-xs h-7"
        >
          All ({items.length})
        </Button>
        {topics.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={filter === t ? "default" : "outline"}
            onClick={() => setFilter(t)}
            className="rounded-full text-xs h-7"
          >
            {topicLabels[t] || t} ({items.filter((i) => i.topic === t).length})
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <Newspaper className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No news items yet. The tracker runs daily to find the latest SEND news.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Group by date */}
          {Object.entries(
            filteredItems.reduce<Record<string, NewsItem[]>>((acc, item) => {
              const date = new Date(item.discovered_at).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              if (!acc[date]) acc[date] = [];
              acc[date].push(item);
              return acc;
            }, {})
          ).map(([date, dateItems]) => (
            <div key={date}>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {date}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dateItems.map((item) => (
                  <div key={item.id} className="relative">
                    <SourceCard name={item.title} url={item.url} />
                    {item.summary && (
                      <p className="text-xs text-muted-foreground mt-1 px-3 line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-1 px-3">
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                        {topicLabels[item.topic] || item.topic}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
