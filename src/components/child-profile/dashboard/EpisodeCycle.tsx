import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import type { Signal, EpisodePhase } from "@/config/signal-library";

interface Props {
  signals: Signal[];
}

const PHASES: { phase: EpisodePhase; label: string; color: string; bgColor: string }[] = [
  { phase: "early_warning", label: "Warning", color: "hsl(var(--accent-amber))", bgColor: "hsl(var(--accent-amber-bg))" },
  { phase: "trigger", label: "Trigger", color: "hsl(var(--accent-coral))", bgColor: "hsl(var(--accent-coral-bg))" },
  { phase: "escalation", label: "Escalation", color: "hsl(var(--destructive))", bgColor: "hsl(var(--destructive) / 0.1)" },
  { phase: "shutdown", label: "Shutdown", color: "hsl(var(--accent-deep-blue))", bgColor: "hsl(var(--accent-deep-blue-bg))" },
  { phase: "recovery", label: "Recovery", color: "hsl(var(--accent-teal))", bgColor: "hsl(var(--accent-teal-bg))" },
];

export function EpisodeCycle({ signals }: Props) {
  const phaseCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const sig of signals) {
      if (sig.episodePhase && sig.confirmed) {
        counts[sig.episodePhase] = (counts[sig.episodePhase] || 0) + 1;
      }
    }
    return counts;
  }, [signals]);

  const totalMapped = Object.values(phaseCounts).reduce((s, c) => s + c, 0);
  if (totalMapped === 0) return null;

  const maxCount = Math.max(...Object.values(phaseCounts), 1);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Activity className="w-4 h-4 text-[hsl(var(--accent-coral))]" />
          Episode cycle
        </CardTitle>
        <p className="text-[10px] text-muted-foreground">Signals mapped to the dysregulation cycle</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1 h-20">
          {PHASES.map(({ phase, label, color, bgColor }) => {
            const count = phaseCounts[phase] || 0;
            const heightPct = count > 0 ? Math.max((count / maxCount) * 100, 12) : 4;
            return (
              <div key={phase} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-foreground">{count || ""}</span>
                <div
                  className="w-full rounded-t-md transition-all duration-700"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: count > 0 ? color : bgColor,
                    opacity: count > 0 ? 1 : 0.3,
                  }}
                />
                <span className="text-[9px] text-muted-foreground text-center leading-tight">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Flow arrows */}
        <div className="flex items-center justify-between mt-2 px-1">
          {PHASES.map(({ phase, color }, i) => (
            <div key={phase} className="flex items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: phaseCounts[phase] ? color : "hsl(var(--border))" }}
              />
              {i < PHASES.length - 1 && (
                <div className="w-4 h-px mx-0.5" style={{ backgroundColor: "hsl(var(--border))" }} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
