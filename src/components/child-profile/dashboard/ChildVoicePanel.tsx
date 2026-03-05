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

  if (entries.length === 0) {
    return (
      <Card className="col-span-full border-0 shadow-md bg-gradient-to-r from-[hsl(var(--accent-amber-bg))] to-card">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent-amber))] / 0.15 flex items-center justify-center flex-shrink-0">
            <MessageSquareHeart className="w-6 h-6 text-[hsl(var(--accent-amber))]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{childName}'s voice brings this profile to life</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Look for the "child voice" questions in each section — even one answer changes how a school reads the profile.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <MessageSquareHeart className="w-4 h-4 text-[hsl(var(--accent-amber))]" />
          In their own words
          <span className="text-[10px] text-muted-foreground font-normal ml-auto">{entries.length} quote{entries.length !== 1 ? "s" : ""}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {displayEntries.map((entry, i) => (
            <button
              key={i}
              onClick={() => onNavigateToSection?.(entry.sectionIndex)}
              className="text-left rounded-xl bg-gradient-to-br from-[hsl(var(--accent-amber-bg))] to-card border border-[hsl(var(--accent-amber)/0.2)] p-4 hover:border-[hsl(var(--accent-amber)/0.4)] transition-all group hover:shadow-sm"
            >
              <Quote className="w-4 h-4 text-[hsl(var(--accent-amber))] mb-2 opacity-60" />
              <p className="text-sm text-foreground leading-relaxed line-clamp-3 italic">
                "{entry.quote}"
              </p>
              <p className="text-[10px] text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                {entry.sectionTitle}
              </p>
            </button>
          ))}
        </div>
        {entries.length > 3 && !showAll && (
          <Button variant="ghost" size="sm" className="w-full mt-3 gap-1 text-xs" onClick={() => setShowAll(true)}>
            See all {entries.length} quotes <ArrowRight className="w-3 h-3" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
