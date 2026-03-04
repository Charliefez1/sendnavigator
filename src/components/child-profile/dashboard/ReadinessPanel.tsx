import { extractReadiness, extractReadinessSuggestions, extractSectionCompletion } from "@/lib/profile-dashboard-utils";
import { ChildProfileState, SECTION_TITLES, SectionStatus } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sparkles, ArrowRight, ChevronDown, CheckCircle2, Circle, Lightbulb } from "lucide-react";
import { useState } from "react";

interface Props {
  state: ChildProfileState;
  getSectionStatus: (index: number) => SectionStatus;
  onNavigateToSection?: (index: number) => void;
  onGenerateReport?: () => void;
}

export function ReadinessPanel({ state, getSectionStatus, onNavigateToSection, onGenerateReport }: Props) {
  const [checklistOpen, setChecklistOpen] = useState(false);
  const readiness = extractReadiness(state, getSectionStatus);
  const suggestions = extractReadinessSuggestions(state, getSectionStatus);
  const completion = extractSectionCompletion(state, getSectionStatus);

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
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="w-4 h-4 text-primary" />
          Next steps and readiness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Readiness label */}
        <div className={`rounded-lg p-4 ${ringColors[readiness.level]}`}>
          <p className={`text-sm font-semibold ${levelColors[readiness.level]}`}>
            {readiness.label}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{readiness.description}</p>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onNavigateToSection?.(s.sectionIndex)}
                className="w-full flex items-start gap-2.5 text-left text-xs p-2.5 rounded-lg hover:bg-muted transition-colors group"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {s.text}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Generate report CTA */}
        <Button
          onClick={onGenerateReport}
          disabled={!readiness.canGenerate}
          className="w-full gap-2"
          size="lg"
        >
          <Sparkles className="w-4 h-4" />
          Generate report
          <ArrowRight className="w-4 h-4" />
        </Button>

        {/* Section checklist (collapsible) */}
        <Collapsible open={checklistOpen} onOpenChange={setChecklistOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
            <span>{completion.completedCount} of {completion.totalCount} sections started</span>
            <div className="flex items-center gap-2">
              <Progress value={completion.percentage} className="h-1.5 w-16" />
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${checklistOpen ? "rotate-180" : ""}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="max-h-48 overflow-y-auto space-y-0.5 pt-2">
              {completion.sections.map((s) => (
                <button
                  key={s.index}
                  onClick={() => onNavigateToSection?.(s.index)}
                  className="w-full flex items-center gap-2 px-2 py-1 rounded text-left text-xs hover:bg-muted transition-colors"
                >
                  {s.status !== "empty" ? (
                    <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                  ) : (
                    <Circle className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                  )}
                  <span className="truncate text-foreground">
                    {s.index + 1}. {s.title}
                  </span>
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
