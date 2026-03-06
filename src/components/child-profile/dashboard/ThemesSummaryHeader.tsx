import { useMemo } from "react";
import { ThemeAnalysisResult } from "@/lib/theme-engine";
import { CONTEXT_TAGS, type ContextTag, type ThemeConfidence } from "@/config/theme-ontology";

interface Props {
  analysis: ThemeAnalysisResult;
}

const CONFIDENCE_COLORS: Record<ThemeConfidence, string> = {
  emerging: "bg-muted",
  developing: "bg-amber-400 dark:bg-amber-500",
  established: "bg-primary",
};

const CONFIDENCE_TEXT: Record<ThemeConfidence, string> = {
  emerging: "text-muted-foreground",
  developing: "text-amber-700 dark:text-amber-300",
  established: "text-primary",
};

export function ThemesSummaryHeader({ analysis }: Props) {
  const { themes, patterns, contradictions } = analysis;

  const maxSignals = useMemo(
    () => Math.max(...themes.map((t) => t.totalSignalCount), 1),
    [themes]
  );

  // Deduplicated mechanism counts
  const mechanisms = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of themes) {
      for (const m of t.mechanisms) {
        map.set(m.mechanism, (map.get(m.mechanism) || 0) + m.signalCount);
      }
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [themes]);

  const totalMechanismSignals = useMemo(
    () => mechanisms.reduce((s, m) => s + m.count, 0),
    [mechanisms]
  );

  // Context occurrence counts
  const contextCounts = useMemo(() => {
    const map = new Map<ContextTag, number>();
    for (const tag of CONTEXT_TAGS) map.set(tag, 0);
    for (const t of themes) {
      for (const c of t.contexts) {
        map.set(c, (map.get(c) || 0) + 1);
      }
    }
    return map;
  }, [themes]);

  const maxContextCount = useMemo(
    () => Math.max(...Array.from(contextCounts.values()), 1),
    [contextCounts]
  );

  const totalSignals = useMemo(() => {
    const ids = new Set<string>();
    for (const t of themes) {
      for (const s of t.topSignals) ids.add(s.id);
    }
    // Use the sum of totalSignalCount as a better approximation
    return themes.reduce((s, t) => s + t.totalSignalCount, 0);
  }, [themes]);

  if (themes.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* 3-panel grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* 1. Theme Strength Bars */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Theme strength
          </p>
          <div className="space-y-2">
            {themes.map((t) => {
              const pct = Math.round((t.totalSignalCount / maxSignals) * 100);
              return (
                <div key={t.theme} className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-medium ${CONFIDENCE_TEXT[t.confidence]}`}>
                      {t.theme}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {t.totalSignalCount}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${CONFIDENCE_COLORS[t.confidence]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Mechanism Treemap */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            What's driving the themes
          </p>
          {mechanisms.length > 0 && (
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(0, 1fr))`,
                gridAutoRows: "1fr",
              }}
            >
              {mechanisms.map((m) => {
                const fraction = m.count / totalMechanismSignals;
                // min 1 col span, proportional sizing via flex
                const intensity = Math.round(fraction * 100);
                return (
                  <div
                    key={m.name}
                    className="rounded-md flex items-center justify-center text-center p-2 min-h-[48px]"
                    style={{
                      gridColumn: `span ${Math.max(1, Math.round(fraction * mechanisms.length * 1.5))}`,
                      backgroundColor: `hsl(25 80% 55% / ${Math.max(0.15, fraction * 1.2)})`,
                    }}
                  >
                    <div>
                      <p className="text-[10px] font-medium text-orange-900 dark:text-orange-100 leading-tight">
                        {m.name}
                      </p>
                      <p className="text-[9px] text-orange-700/70 dark:text-orange-200/70">
                        {m.count} signals
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Context Heatmap */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Where challenges appear
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {CONTEXT_TAGS.map((tag) => {
              const count = contextCounts.get(tag) || 0;
              const intensity = count / maxContextCount;
              return (
                <div
                  key={tag}
                  className="rounded-md px-2 py-2 text-center transition-colors"
                  style={{
                    backgroundColor: `hsl(var(--primary) / ${Math.max(0.05, intensity * 0.6)})`,
                  }}
                >
                  <p
                    className="text-[10px] font-medium leading-tight"
                    style={{
                      color: intensity > 0.4
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {tag}
                  </p>
                  {count > 0 && (
                    <p className="text-[9px] text-muted-foreground mt-0.5">{count}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="rounded-lg border border-border bg-muted/30 px-4 py-2.5 flex items-center gap-1.5 flex-wrap text-xs text-muted-foreground">
        <span className="font-medium text-foreground">At a glance</span>
        <span>·</span>
        <span>{themes.length} theme{themes.length !== 1 ? "s" : ""}</span>
        <span>·</span>
        <span>{patterns.length} pattern{patterns.length !== 1 ? "s" : ""}</span>
        {contradictions.length > 0 && (
          <>
            <span>·</span>
            <span>
              {contradictions.length} environment{" "}
              {contradictions.length !== 1 ? "sensitivities" : "sensitivity"}
            </span>
          </>
        )}
        <span>·</span>
        <span>{totalSignals} signals mapped</span>
      </div>
    </div>
  );
}
