import { ReactNode, useState } from "react";
import { LucideIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useExperienceMode } from "@/contexts/ExperienceModeContext";
import { cn } from "@/lib/utils";

interface ContentBoxProps {
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function ContentBox({ id, icon: Icon, title, children }: ContentBoxProps) {
  const { mode } = useExperienceMode();
  const isScan = mode === "scan";
  const [expanded, setExpanded] = useState(false);
  const showBody = !isScan || expanded;

  return (
    <section id={id} className="content-section py-4 scroll-mt-24">
      <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
        <button
          onClick={() => isScan && setExpanded(!expanded)}
          className={cn(
            "flex items-start gap-4 mb-4 w-full text-left",
            isScan && "cursor-pointer hover:opacity-80 transition-opacity"
          )}
          aria-expanded={showBody}
          disabled={!isScan}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground flex-1">{title}</h2>
          {isScan && (
            expanded
              ? <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-2.5" />
              : <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-2.5" />
          )}
        </button>
        {showBody && (
          <div className="prose-calm text-sm text-muted-foreground leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
