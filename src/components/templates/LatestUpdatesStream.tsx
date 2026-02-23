import { useState, useEffect } from "react";
import { Clock, ChevronDown, ChevronUp, Pin } from "lucide-react";
import { latestUpdates } from "@/config/latest-updates";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const DEFAULT_VISIBLE = 3;

interface DbNewsItem {
  id: string;
  title: string;
  summary: string | null;
  source_name: string;
  discovered_at: string;
  published_at: string | null;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function LatestUpdatesStream() {
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dbItems, setDbItems] = useState<DbNewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await (supabase as any)
        .from("news_items")
        .select("id, title, summary, source_name, discovered_at, published_at")
        .eq("status", "published")
        .order("discovered_at", { ascending: false })
        .limit(20);
      if (data) setDbItems(data);
    };
    fetchNews();
  }, []);

  // Build combined list: pinned first, then DB items
  const pinnedEntries = latestUpdates.map((entry, i) => ({
    key: `pinned-${i}`,
    isPinned: true,
    date: entry.date,
    headline: entry.headline,
    body: entry.body,
    source: null as string | null,
  }));

  const autoEntries = dbItems.map((item) => ({
    key: `db-${item.id}`,
    isPinned: false,
    date: formatDate(item.published_at || item.discovered_at),
    headline: item.title,
    body: item.summary || "",
    source: item.source_name,
  }));

  const allEntries = [...pinnedEntries, ...autoEntries];

  if (allEntries.length === 0) return null;

  const visible = expanded ? allEntries : allEntries.slice(0, DEFAULT_VISIBLE);
  const hasMore = allEntries.length > DEFAULT_VISIBLE;

  return (
    <section className="content-section py-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-base font-display font-semibold text-foreground">
                  Latest Updates
                </h2>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="space-y-4 mt-5">
              {visible.map((entry) => (
                <div
                  key={entry.key}
                  className="border-l-2 border-primary/30 pl-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      {entry.date}
                    </p>
                    {entry.isPinned && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        <Pin className="w-2.5 h-2.5" /> Pinned
                      </span>
                    )}
                    {entry.source && (
                      <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {entry.source}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug mb-1">
                    {entry.headline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.body}
                  </p>
                </div>
              ))}
            </div>

            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {expanded ? (
                  <>
                    Show fewer updates <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Show {allEntries.length - DEFAULT_VISIBLE} more updates <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </section>
  );
}
