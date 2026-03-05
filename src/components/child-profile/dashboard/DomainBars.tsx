import { useChildProfile } from "@/contexts/ChildProfileContext";
import { DOMAIN_KEYS, DOMAIN_SECTION_MAP, SCORE_SCALE_MAX } from "@/config/signal-library";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowRight } from "lucide-react";

interface Props {
  onNavigateToSection?: (index: number) => void;
}

export function DomainBars({ onNavigateToSection }: Props) {
  const { derived } = useChildProfile();

  const domains = DOMAIN_KEYS.map((domain) => {
    const scores = derived.domain_scores[domain];
    return {
      domain,
      evidence: scores?.evidence ?? 0,
      sectionIndex: DOMAIN_SECTION_MAP[domain],
    };
  }).filter((d) => d.evidence > 0);

  const sorted = [...domains].sort((a, b) => b.evidence - a.evidence);
  const strong = sorted.filter((d) => d.evidence >= 2);
  const needsAttention = sorted.filter((d) => d.evidence < 2);

  const barWidth = (score: number) => `${Math.max((score / SCORE_SCALE_MAX) * 100, 8)}%`;

  const renderRow = (d: typeof sorted[0]) => (
    <button
      key={d.domain}
      onClick={() => onNavigateToSection?.(d.sectionIndex)}
      className="flex items-center gap-2 text-xs group hover:bg-muted/50 rounded px-1 py-1 transition-colors"
    >
      <span className="w-28 truncate text-left text-foreground group-hover:text-primary transition-colors">{d.domain}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: barWidth(d.evidence) }}
        />
      </div>
      <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );

  if (domains.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <BarChart3 className="w-4 h-4 text-primary" />
          Domain detail
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {strong.length > 0 && (
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Strongest areas</p>
            <div className="space-y-0.5">{strong.map(renderRow)}</div>
          </div>
        )}
        {needsAttention.length > 0 && (
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Needs more detail</p>
            <div className="space-y-0.5">{needsAttention.map(renderRow)}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
