import { useState } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { latestUpdates } from "@/config/latest-updates";

const DEFAULT_VISIBLE = 3;

export function LatestUpdatesStream() {
  const [expanded, setExpanded] = useState(false);

  if (latestUpdates.length === 0) return null;

  const visible = expanded ? latestUpdates : latestUpdates.slice(0, DEFAULT_VISIBLE);
  const hasMore = latestUpdates.length > DEFAULT_VISIBLE;

  return (
    <section className="content-section py-4">
      <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-display font-semibold text-foreground">
            Latest Updates
          </h2>
        </div>

        <div className="space-y-4">
          {visible.map((entry, i) => (
            <div
              key={`${entry.date}-${i}`}
              className="border-l-2 border-primary/30 pl-4"
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                {entry.date}
              </p>
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
                Show {latestUpdates.length - DEFAULT_VISIBLE} more updates <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
