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
    <section id={id} className={cn("content-section scroll-mt-24", isScan ? "py-1" : "py-4")}>
      <div className={cn(
        "rounded-xl border border-border bg-card transition-shadow duration-200",
        isScan && !expanded ? "p-3 shadow-sm" : "p-6 shadow-card hover:shadow-card-hover"
      )}>
        <button
          onClick={() => isScan && setExpanded(!expanded)}
          className={cn(
            "flex items-center gap-3 w-full text-left",
            !isScan && "mb-4",
            isScan && "cursor-pointer hover:opacity-80 transition-opacity"
          )}
          aria-expanded={showBody}
          disabled={!isScan}
        >
          <div className={cn(
            "flex items-center justify-center rounded-lg bg-primary/10 flex-shrink-0",
            isScan && !expanded ? "w-7 h-7" : "w-10 h-10"
          )}>
            <Icon className={cn(isScan && !expanded ? "w-3.5 h-3.5" : "w-5 h-5", "text-primary")} />
          </div>
          <h2 className={cn(
            "font-display font-semibold text-foreground flex-1",
            isScan && !expanded ? "text-sm" : "text-lg"
          )}>{title}</h2>
          {isScan && (
            expanded
              ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          )}
        </button>
        {showBody && (
          <div className="prose-calm text-sm text-muted-foreground leading-relaxed mt-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
