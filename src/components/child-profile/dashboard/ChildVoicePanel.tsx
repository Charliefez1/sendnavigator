import { extractChildVoiceEntries } from "@/lib/profile-dashboard-utils";
import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, MessageSquareHeart, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Props {
  state: ChildProfileState;
  onNavigateToSection?: (index: number) => void;
}

export function ChildVoicePanel({ state, onNavigateToSection }: Props) {
  const entries = extractChildVoiceEntries(state);
  const childName = state.setup.childName || "your child";
  const [showAll, setShowAll] = useState(false);
  const displayEntries = showAll ? entries : entries.slice(0, 3);

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <MessageSquareHeart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          In their own words
          {entries.length > 0 && (
            <span className="text-[10px] text-muted-foreground font-normal ml-auto">{entries.length} quote{entries.length !== 1 ? "s" : ""}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {displayEntries.map((entry, i) => (
                <button
                  key={i}
                  onClick={() => onNavigateToSection?.(entry.sectionIndex)}
                  className="text-left rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 p-3 hover:border-amber-300 dark:hover:border-amber-700 transition-colors group"
                >
                  <Quote className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500 mb-1.5 opacity-60" />
                  <p className="text-xs text-foreground leading-relaxed line-clamp-2 italic">
                    "{entry.quote}"
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 group-hover:text-foreground transition-colors">
                    {entry.sectionTitle}
                  </p>
                </button>
              ))}
            </div>
            {entries.length > 3 && !showAll && (
              <Button variant="ghost" size="sm" className="w-full mt-2 gap-1 text-xs" onClick={() => setShowAll(true)}>
                See all {entries.length} quotes <ArrowRight className="w-3 h-3" />
              </Button>
            )}
          </>
        ) : (
          <div className="rounded-xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/40 dark:border-amber-800/20 p-5 text-center">
            <MessageSquareHeart className="w-7 h-7 text-amber-400/60 mx-auto mb-2" />
            <p className="text-xs text-foreground font-medium mb-0.5">
              {childName}'s voice brings this profile to life
            </p>
            <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
              Look for the "child voice" questions in each section.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
