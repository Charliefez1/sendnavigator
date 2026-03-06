import { useMemo } from "react";
import { ThemeAnalysisResult } from "@/lib/theme-engine";
import { CONTEXT_TAGS, type ContextTag, type ThemeConfidence } from "@/config/theme-ontology";
import { BarChart3, Layers, MapPin, Activity } from "lucide-react";

interface Props {
  analysis: ThemeAnalysisResult;
}

/* Confidence → bar fill colour using design tokens */
const BAR_COLORS: Record<ThemeConfidence, string> = {
  emerging: "bg-muted-foreground/40",
  developing: "bg-[hsl(var(--accent-amber))]",
  established: "bg-[hsl(var(--accent-teal))]",
};

const CONFIDENCE_DOT: Record<ThemeConfidence, string> = {
  emerging: "bg-muted-foreground/50",
  developing: "bg-[hsl(var(--accent-amber))]",
  established: "bg-[hsl(var(--accent-teal))]",
};

/* Multi-colour palette for mechanism treemap blocks */
const MECHANISM_COLORS = [
  "hsl(var(--accent-teal))",
  "hsl(var(--accent-coral))",
  "hsl(var(--accent-violet))",
  "hsl(var(--accent-amber))",
  "hsl(var(--accent-deep-blue))",
  "hsl(var(--accent-sage))",
  "hsl(var(--primary))",
];

export function ThemesSummaryHeader({ analysis }: Props) {
  const { themes, patterns, contradictions } = analysis;

  const maxSignals = useMemo(
    () => Math.max(...themes.map((t) => t.totalSignalCount), 1),
    [themes]
  );

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
    () => Math.max(mechanisms.reduce((s, m) => s + m.count, 0), 1),
    [mechanisms]
  );

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

  const totalSignals = useMemo(
    () => themes.reduce((s, t) => s + t.totalSignalCount, 0),
    [themes]
  );

  if (themes.length === 0) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      {/* ── Stat strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatPill icon={<Layers className="w-3.5 h-3.5" />} value={themes.length} label="Patterns" color="text-[hsl(var(--accent-teal))]" />
        <StatPill icon={<Activity className="w-3.5 h-3.5" />} value={patterns.length} label="Sequences" color="text-[hsl(var(--accent-amber))]" />
        <StatPill icon={<MapPin className="w-3.5 h-3.5" />} value={contradictions.length} label={contradictions.length === 1 ? "Env. sensitivity" : "Env. sensitivities"} color="text-[hsl(var(--accent-coral))]" />
        <StatPill icon={<BarChart3 className="w-3.5 h-3.5" />} value={totalSignals} label="Signals mapped" color="text-[hsl(var(--accent-violet))]" />
      </div>

      {/* ── 3-panel visualisations ── */}
      <div className="grid gap-3 lg:grid-cols-3">

        {/* 1 ─ Pattern Strength */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card space-y-3">
          <SectionLabel>Pattern strength</SectionLabel>
          <div className="space-y-2.5">
            {themes.map((t) => {
              const pct = Math.round((t.totalSignalCount / maxSignals) * 100);
              return (
                <div key={t.theme} className="group space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-card ${
                      t.confidence === "established" ? "bg-[hsl(var(--accent-teal))] ring-[hsl(var(--accent-teal)/0.3)]"
                      : t.confidence === "developing" ? "bg-[hsl(var(--accent-amber))] ring-[hsl(var(--accent-amber)/0.3)]"
                      : "bg-muted-foreground/50 ring-muted-foreground/20"
                    }`} />
                    <span className="text-[11px] font-medium text-foreground truncate flex-1">
                      {t.theme}
                    </span>
                    <span className="text-[10px] tabular-nums text-muted-foreground font-medium">
                      {t.totalSignalCount}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden ml-3.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${BAR_COLORS[t.confidence]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Confidence legend */}
          <div className="flex gap-3 pt-1 border-t border-border">
            {(["emerging", "developing", "established"] as ThemeConfidence[]).map((c) => (
              <div key={c} className="flex items-center gap-1">
                <span className={`w-2.5 h-2.5 rounded-full ${CONFIDENCE_DOT[c]}`} />
                <span className="text-[9px] text-muted-foreground capitalize">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2 ─ Mechanism Treemap */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card space-y-3">
          <SectionLabel>What's driving the patterns</SectionLabel>
          {mechanisms.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {mechanisms.map((m, i) => {
                const fraction = m.count / totalMechanismSignals;
                const color = MECHANISM_COLORS[i % MECHANISM_COLORS.length];
                const widthPct = Math.max(30, Math.round(fraction * 100));
                return (
                  <div
                    key={m.name}
                    className="rounded-lg flex items-center justify-center text-center px-3 py-3 transition-shadow hover:shadow-card-hover"
                    style={{
                      backgroundColor: color,
                      flexBasis: `calc(${widthPct}% - 4px)`,
                      flexGrow: 1,
                      minHeight: "52px",
                    }}
                  >
                    <div>
                      <p className="text-[10px] font-semibold text-white leading-tight drop-shadow-sm">
                        {m.name}
                      </p>
                      <p className="text-[9px] text-white/70 mt-0.5">
                        {m.count} signal{m.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3 ─ Context Heatmap */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card space-y-3">
          <SectionLabel>Where challenges appear</SectionLabel>
          <div className="grid grid-cols-3 gap-1.5">
            {CONTEXT_TAGS.map((tag) => {
              const count = contextCounts.get(tag) || 0;
              const intensity = count / maxContextCount;
              const isHot = intensity > 0.5;
              const isWarm = intensity > 0.25;
              return (
                <div
                  key={tag}
                  className={`
                    rounded-lg px-2 py-2.5 text-center transition-all duration-300
                    ${isHot
                      ? "bg-[hsl(var(--accent-coral))] text-white shadow-sm"
                      : isWarm
                        ? "bg-[hsl(var(--accent-amber-bg))] text-[hsl(var(--accent-amber))]"
                        : count > 0
                          ? "bg-[hsl(var(--accent-teal-bg))] text-[hsl(var(--accent-teal))]"
                          : "bg-secondary text-muted-foreground/60"
                    }
                  `}
                >
                  <p className="text-[10px] font-semibold leading-tight">{tag}</p>
                  {count > 0 && (
                    <p className={`text-[9px] mt-0.5 tabular-nums ${isHot ? "text-white/80" : ""}`}>
                      {count} pattern{count !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small helpers ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
      {children}
    </p>
  );
}

function StatPill({ icon, value, label, color }: { icon: React.ReactNode; value: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
      <div className={color}>{icon}</div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground tabular-nums leading-none">{value}</p>
        <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">{label}</p>
      </div>
    </div>
  );
}
