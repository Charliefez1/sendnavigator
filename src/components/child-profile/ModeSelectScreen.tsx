import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MINI_SECTIONS } from "@/config/mini-profile-sections";
import { SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { ArrowRight, Zap, BookOpen } from "lucide-react";
import type { ReportMode } from "@/config/mini-profile-sections";

interface ModeSelectScreenProps {
  onSelect: (mode: ReportMode) => void;
}

export function ModeSelectScreen({ onSelect }: ModeSelectScreenProps) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">
          How much detail do you want to include?
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          You can start with the core sections and upgrade to the full profile at any time.
          All your answers are kept if you upgrade later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mini */}
        <Card
          className="cursor-pointer border-2 border-border hover:border-primary/50 transition-colors"
          onClick={() => onSelect("mini")}
        >
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Mini profile</p>
                <p className="text-xs text-muted-foreground">{MINI_SECTIONS.length} core sections</p>
              </div>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 pl-1">
              {MINI_SECTIONS.map((i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-primary">•</span>
                  {SECTION_TITLES[i]}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Best if you are short on time or want to focus on the essentials first.
            </p>
            <Button className="w-full gap-2" variant="outline" onClick={() => onSelect("mini")}>
              Start mini profile
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </CardContent>
        </Card>

        {/* Full */}
        <Card
          className="cursor-pointer border-2 border-border hover:border-primary/50 transition-colors"
          onClick={() => onSelect("full")}
        >
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Full profile</p>
                <p className="text-xs text-muted-foreground">All {SECTION_TITLES.length} sections</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Covers everything: environment, sensory processing, executive function, masking,
              behaviour, communication, identity, strengths, developmental history, family,
              physical health, transitions, and more.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Best for EHCP assessments, professional meetings, or building the fullest picture.
              You can still skip any section that does not apply.
            </p>
            <Button className="w-full gap-2" onClick={() => onSelect("full")}>
              Start full profile
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
