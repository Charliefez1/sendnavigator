import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertTriangle, ArrowRight, Lightbulb, Network } from "lucide-react";
import type { ThemeAnalysisResult } from "@/lib/theme-engine";
import type { ThemeConfidence } from "@/config/theme-ontology";

interface Props {
  analysis: ThemeAnalysisResult;
  onViewAll: () => void;
}

const CONFIDENCE_STYLES: Record<ThemeConfidence, string> = {
  emerging: "bg-secondary text-muted-foreground",
  developing: "bg-[hsl(var(--accent-amber-bg))] text-[hsl(var(--accent-amber))]",
  established: "bg-[hsl(var(--accent-teal-bg))] text-[hsl(var(--accent-teal))]",
};

const CONFIDENCE_BAR: Record<ThemeConfidence, string> = {
  emerging: "hsl(var(--muted-foreground))",
  developing: "hsl(var(--accent-amber))",
  established: "hsl(var(--accent-teal))",
};

export function PatternPreview({ analysis, onViewAll }: Props) {
  const { themes, patterns, contradictions } = analysis;
  const totalItems = themes.length + patterns.length + contradictions.length;

  if (totalItems === 0) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-6 text-center">
          <Network className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Patterns emerge as you add more detail across sections</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="w-4 h-4 text-[hsl(var(--accent-violet))]" />
          Recognised sequences
          <Badge variant="secondary" className="text-[10px] ml-auto border-0">{totalItems}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Top patterns */}
        {themes.slice(0, 3).map((t) => (
          <div key={t.theme} className="flex items-center gap-2 text-xs rounded-lg p-2 bg-muted/50">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: CONFIDENCE_BAR[t.confidence] }} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{t.theme}</p>
              <p className="text-[10px] text-muted-foreground">{t.totalSignalCount} signals · {t.mechanisms.length} mechanism{t.mechanisms.length !== 1 ? "s" : ""}</p>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${CONFIDENCE_STYLES[t.confidence]}`}>
              {t.confidence}
            </span>
          </div>
        ))}

        {/* Sequences */}
        {patterns.slice(0, 2).map((p) => (
          <div key={p.pattern.id} className="flex items-center gap-2 text-xs rounded-lg p-2 border-l-4 border-l-[hsl(var(--accent-amber))] bg-[hsl(var(--accent-amber-bg))]">
            <Zap className="w-3.5 h-3.5 text-[hsl(var(--accent-amber))] shrink-0" />
            <span className="font-medium text-foreground">{p.pattern.label}</span>
          </div>
        ))}

        {/* Contradictions */}
        {contradictions.slice(0, 1).map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-xs rounded-lg p-2 border-l-4 border-l-[hsl(var(--accent-coral))] bg-[hsl(var(--accent-coral-bg))]">
            <AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--accent-coral))] shrink-0" />
            <span className="text-foreground">Environment sensitivity — {c.domain}</span>
          </div>
        ))}

        <Button variant="ghost" size="sm" className="w-full gap-1.5 text-xs" onClick={onViewAll}>
          Explore all patterns <ArrowRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
}
