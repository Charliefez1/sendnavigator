import { useChildProfile } from "@/contexts/ChildProfileContext";
import { DOMAIN_KEYS, DOMAIN_SECTION_MAP, SCORE_SCALE_MAX } from "@/config/signal-library";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowRight } from "lucide-react";

interface Props {
  onNavigateToSection?: (index: number) => void;
}

function scoreColor(score: number): string {
  if (score >= 3) return "hsl(var(--primary))";
  if (score >= 2) return "hsl(var(--accent-amber))";
  if (score >= 1) return "hsl(var(--accent-teal))";
  return "hsl(var(--muted-foreground) / 0.3)";
}

export function DomainBars({ onNavigateToSection }: Props) {
  const { derived } = useChildProfile();

  const domains = DOMAIN_KEYS.map((domain) => {
    const scores = derived.domain_scores[domain];
    return {
      domain,
      evidence: scores?.evidence ?? 0,
      intensity: scores?.intensity,
      confidence: scores?.confidence ?? 0,
      sectionIndex: DOMAIN_SECTION_MAP[domain],
      intensityLabel: scores?.intensityLabel ?? "Unknown",
    };
  });

  const sorted = [...domains].sort((a, b) => b.evidence - a.evidence);
  const withData = sorted.filter((d) => d.evidence > 0);
  const empty = sorted.filter((d) => d.evidence === 0);

  if (withData.length === 0) return null;

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <BarChart3 className="w-4 h-4 text-primary" />
          Domain breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {withData.map((d) => {
          const barWidth = Math.max((d.evidence / SCORE_SCALE_MAX) * 100, 8);
          return (
            <button
              key={d.domain}
              onClick={() => onNavigateToSection?.(d.sectionIndex)}
              className="w-full flex items-center gap-2 text-xs group hover:bg-muted/50 rounded-md px-1.5 py-1.5 transition-colors"
            >
              <span className="w-24 sm:w-28 truncate text-left text-foreground group-hover:text-primary transition-colors font-medium">
                {d.domain}
              </span>
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${barWidth}%`, backgroundColor: scoreColor(d.evidence) }}
                />
              </div>
              {d.intensity !== null && (
                <span className="text-[10px] text-muted-foreground w-14 text-right hidden sm:block">{d.intensityLabel}</span>
              )}
              <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </button>
          );
        })}

        {empty.length > 0 && (
          <div className="pt-2 border-t border-border mt-2">
            <p className="text-[10px] text-muted-foreground mb-1">Not started</p>
            {empty.map((d) => (
              <button
                key={d.domain}
                onClick={() => onNavigateToSection?.(d.sectionIndex)}
                className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground px-1.5 py-1 rounded transition-colors"
              >
                <span className="w-24 sm:w-28 truncate text-left">{d.domain}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full" />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
