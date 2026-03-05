import { extractReadiness, extractReadinessSuggestions } from "@/lib/profile-dashboard-utils";
import { ChildProfileState, SectionStatus } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";

interface Props {
  state: ChildProfileState;
  getSectionStatus: (index: number) => SectionStatus;
  onNavigateToSection?: (index: number) => void;
  onGenerateReport?: () => void;
}

export function ReadinessPanel({ state, getSectionStatus, onNavigateToSection, onGenerateReport }: Props) {
  const readiness = extractReadiness(state, getSectionStatus);
  const suggestions = extractReadinessSuggestions(state, getSectionStatus);

  const levelColors: Record<string, string> = {
    "not-ready": "text-muted-foreground",
    minimal: "text-status-discussed",
    good: "text-status-confirmed",
    strong: "text-primary",
  };

  const ringColors: Record<string, string> = {
    "not-ready": "bg-muted",
    minimal: "bg-amber-100 dark:bg-amber-900/30",
    good: "bg-emerald-50 dark:bg-emerald-900/20",
    strong: "bg-orange-50 dark:bg-orange-900/20",
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="w-4 h-4 text-primary" />
          Next steps
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Readiness label */}
        <div className={`rounded-lg p-3 ${ringColors[readiness.level]}`}>
          <p className={`text-sm font-semibold ${levelColors[readiness.level]}`}>{readiness.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{readiness.description}</p>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-1.5">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onNavigateToSection?.(s.sectionIndex)}
                className="w-full flex items-start gap-2 text-left text-xs p-2 rounded-lg hover:bg-muted transition-colors group"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground group-hover:text-primary transition-colors">{s.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Generate report CTA */}
        <Button onClick={onGenerateReport} disabled={!readiness.canGenerate} className="w-full gap-2" size="lg">
          <Sparkles className="w-4 h-4" />
          Generate report
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
