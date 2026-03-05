import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import type { DomainScores } from "@/lib/scoring-engine";
import { DOMAIN_KEYS } from "@/config/signal-library";

interface Props {
  domainScores: Record<string, DomainScores>;
}

/** Aggregate source breakdown across all domains. */
function aggregateSources(domainScores: Record<string, DomainScores>): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const domain of DOMAIN_KEYS) {
    const scores = domainScores[domain];
    if (!scores) continue;
    for (const [type, count] of Object.entries(scores.sourceBreakdown)) {
      totals[type] = (totals[type] || 0) + count;
    }
  }
  return totals;
}

const SOURCE_COLORS: Record<string, string> = {
  parent: "hsl(var(--primary))",
  child: "hsl(var(--accent-amber))",
  school: "hsl(var(--accent-teal))",
  clinician: "hsl(var(--accent-violet))",
  "ai-suggested": "hsl(var(--accent-deep-blue))",
  other: "hsl(var(--muted-foreground))",
};

const SOURCE_LABELS: Record<string, string> = {
  parent: "Parent",
  child: "Child",
  school: "School",
  clinician: "Clinician",
  "ai-suggested": "AI-suggested",
  other: "Other",
};

export function SourceDiversity({ domainScores }: Props) {
  const sources = aggregateSources(domainScores);
  const entries = Object.entries(sources).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, c]) => sum + c, 0);

  if (total === 0) return null;

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Users className="w-4 h-4 text-[hsl(var(--accent-violet))]" />
          Source diversity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Stacked bar */}
        <div className="flex h-3 rounded-full overflow-hidden bg-muted">
          {entries.map(([type, count]) => (
            <div
              key={type}
              className="h-full transition-all duration-700"
              style={{
                width: `${(count / total) * 100}%`,
                backgroundColor: SOURCE_COLORS[type] || SOURCE_COLORS.other,
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {entries.map(([type, count]) => (
            <div key={type} className="flex items-center gap-1.5 text-xs">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: SOURCE_COLORS[type] || SOURCE_COLORS.other }}
              />
              <span className="text-foreground font-medium">{count}</span>
              <span className="text-muted-foreground">{SOURCE_LABELS[type] || type}</span>
            </div>
          ))}
        </div>

        {/* Hint */}
        {entries.length <= 1 && (
          <p className="text-[10px] text-muted-foreground italic">
            Adding perspectives from school or your child strengthens the profile's reliability
          </p>
        )}
      </CardContent>
    </Card>
  );
}
