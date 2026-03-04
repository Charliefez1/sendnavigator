import { extractChildVoiceEntries } from "@/lib/profile-dashboard-utils";
import { ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote, MessageSquareHeart } from "lucide-react";

interface Props {
  state: ChildProfileState;
  onNavigateToSection?: (index: number) => void;
}

export function ChildVoicePanel({ state, onNavigateToSection }: Props) {
  const entries = extractChildVoiceEntries(state);
  const childName = state.setup.childName || "your child";

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <MessageSquareHeart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          In their own words
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {entries.slice(0, 6).map((entry, i) => (
              <button
                key={i}
                onClick={() => onNavigateToSection?.(entry.sectionIndex)}
                className="text-left rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors group"
              >
                <Quote className="w-4 h-4 text-amber-400 dark:text-amber-500 mb-2 opacity-60" />
                <p className="text-sm text-foreground leading-relaxed line-clamp-3 italic">
                  "{entry.quote}"
                </p>
                <p className="text-[11px] text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                  {entry.sectionTitle}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/40 dark:border-amber-800/20 p-6 text-center">
            <MessageSquareHeart className="w-8 h-8 text-amber-400/60 mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium mb-1">
              {childName}'s voice brings this profile to life
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Even one or two answers in their own words can change how a school sees them. Look for the "child voice" questions in each section.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
