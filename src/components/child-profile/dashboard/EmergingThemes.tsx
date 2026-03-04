import { extractEmergingThemes } from "@/lib/profile-dashboard-utils";
import { ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface Props {
  state: ChildProfileState;
  onNavigateToSection?: (index: number) => void;
}

export function EmergingThemes({ state, onNavigateToSection }: Props) {
  const themes = extractEmergingThemes(state);

  if (themes.length === 0) return null;

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Emerging themes
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Patterns detected across what you have shared so far
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {themes.map((theme, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-muted/30 p-4"
            >
              <p className="text-sm font-medium text-foreground">{theme.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{theme.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {theme.linkedSections.map((idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigateToSection?.(idx)}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {SECTION_TITLES[idx]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
