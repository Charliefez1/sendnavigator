import { ReactNode, useState } from "react";
import { LucideIcon, ChevronDown, ChevronRight, Info } from "lucide-react";
import { useExperienceMode } from "@/contexts/ExperienceModeContext";
import { usePageAccent } from "@/contexts/PageAccentContext";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContentBoxProps {
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  accentColor?: string;
  tooltip?: string;
}

/** Convert "hsl(220 70% 45%)" → "hsla(220, 70%, 45%, 0.1)" */
function hslWithAlpha(hsl: string, alpha: number): string {
  const match = hsl.match(/hsl\(([^)]+)\)/);
  if (!match) return hsl;
  const parts = match[1].trim().split(/[\s,/]+/);
  return `hsla(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
}

export function ContentBox({ id, icon: Icon, title, children, accentColor: accentColorProp, tooltip }: ContentBoxProps) {
  const pageAccent = usePageAccent();
  const accentColor = accentColorProp || pageAccent;
  const { mode } = useExperienceMode();
  const isScan = mode === "scan";
  const [expanded, setExpanded] = useState(false);
  const showBody = !isScan || expanded;

  return (
    <section id={id} className={cn("content-section scroll-mt-24", isScan ? "py-1" : "py-2")}>
      <div className={cn(
        "rounded-xl border bg-card transition-shadow duration-200",
        isScan && !expanded ? "p-3 shadow-sm" : "p-5 shadow-card hover:shadow-card-hover"
      )}
        style={accentColor ? { borderColor: hslWithAlpha(accentColor, 0.15) } : undefined}
      >
        <button
          onClick={() => isScan && setExpanded(!expanded)}
          className={cn(
            "flex items-center gap-3 w-full text-left",
            !isScan && "mb-3",
            isScan && "cursor-pointer hover:opacity-80 transition-opacity"
          )}
          aria-expanded={showBody}
          disabled={!isScan}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-lg flex-shrink-0",
              isScan && !expanded ? "w-6 h-6" : "w-8 h-8",
              !accentColor && "bg-primary/10"
            )}
            style={accentColor ? { backgroundColor: hslWithAlpha(accentColor, 0.12) } : undefined}
          >
            <Icon
              className={cn(isScan && !expanded ? "w-3 h-3" : "w-4 h-4", !accentColor && "text-primary")}
              style={accentColor ? { color: accentColor } : undefined}
            />
          </div>
          <h2 className={cn(
            "font-display font-semibold text-foreground flex-1 leading-tight",
            isScan && !expanded ? "text-sm" : "text-base"
          )}>{title}</h2>
          {tooltip && !isScan && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Info className="w-4 h-4 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {isScan && (
            expanded
              ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          )}
        </button>
        {!showBody && isScan && (
          <p className="text-xs text-muted-foreground/60 mt-1 ml-9">Tap to expand</p>
        )}
        {showBody && (
          <div className="prose-calm text-sm text-muted-foreground leading-relaxed mt-2">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
