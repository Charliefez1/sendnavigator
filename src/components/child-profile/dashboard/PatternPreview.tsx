import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertTriangle, ArrowRight, Lightbulb } from "lucide-react";
import type { ThemeAnalysisResult } from "@/lib/theme-engine";
import type { ThemeConfidence } from "@/config/theme-ontology";

interface Props {
  analysis: ThemeAnalysisResult;
  onViewAll: () => void;
}

const CONFIDENCE_STYLES: Record<ThemeConfidence, string> = {
  emerging: "bg-muted text-muted-foreground",
  developing: "bg-accent text-accent-foreground",
  established: "bg-primary/10 text-primary",
};

export function PatternPreview({ analysis, onViewAll }: Props) {
  const { themes, patterns, contradictions } = analysis;
  const totalItems = themes.length + patterns.length + contradictions.length;

  if (totalItems === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Detected patterns
          <Badge variant="secondary" className="text-[10px] ml-auto">{totalItems}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {/* Top themes (max 2) */}
        {themes.slice(0, 2).map((t) => (
          <div key={t.theme} className="flex items-start gap-2 text-xs">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="font-medium text-foreground">{t.theme}</span>
              <span className={`ml-1.5 inline-flex text-[9px] px-1.5 py-0 rounded-full ${CONFIDENCE_STYLES[t.confidence]}`}>
                {t.confidence}
              </span>
            </div>
          </div>
        ))}

        {/* Top patterns (max 2) */}
        {patterns.slice(0, 2).map((p) => (
          <div key={p.pattern.id} className="flex items-start gap-2 text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span className="font-medium text-foreground">{p.pattern.label}</span>
          </div>
        ))}

        {/* Contradictions (max 1) */}
        {contradictions.slice(0, 1).map((c, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
            <span className="text-foreground">Environment sensitivity — {c.domain}</span>
          </div>
        ))}

        <Button variant="ghost" size="sm" className="w-full gap-1.5 text-xs mt-1" onClick={onViewAll}>
          View all themes
          <ArrowRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
}
