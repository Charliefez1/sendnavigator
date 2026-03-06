import { ReactNode } from "react";
import { LucideIcon, Info } from "lucide-react";
import { usePageAccent } from "@/contexts/PageAccentContext";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function hslWithAlpha(hsl: string, alpha: number) {
  const match = hsl.match(/hsl\(([^)]+)\)/);
  if (!match) return hsl;
  return `hsla(${match[1]} / ${alpha})`;
}

interface ContentBoxProps {
  id?: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  accentColor?: string;
  tooltip?: string;
}

export function ContentBox({ id, icon: Icon, title, children, accentColor: accentColorProp, tooltip }: ContentBoxProps) {
  const pageAccent = usePageAccent();
  const accentColor = accentColorProp || pageAccent;

  return (
    <section id={id} className="content-section scroll-mt-24 py-2">
      <div className={cn(
        "rounded-2xl border border-border/50 bg-card transition-shadow duration-200 p-5 shadow-card hover:shadow-card-hover",
        accentColor && "border-l-4"
      )}
        style={accentColor ? { borderLeftColor: accentColor } : undefined}
      >
        <div className="flex items-center gap-3 w-full text-left mb-3">
          <div
            className={cn(
              "flex items-center justify-center rounded-lg flex-shrink-0 w-8 h-8",
              !accentColor && "bg-primary/10"
            )}
            style={accentColor ? { backgroundColor: hslWithAlpha(accentColor, 0.12) } : undefined}
          >
            <Icon
              className={cn("w-4 h-4", !accentColor && "text-primary")}
              style={accentColor ? { color: accentColor } : undefined}
            />
          </div>
          <h2 className="font-display font-semibold text-foreground flex-1 leading-tight text-base">{title}</h2>
          {tooltip && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex-shrink-0">
                    <Info className="w-4 h-4 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="prose-calm text-sm text-muted-foreground leading-relaxed mt-2">
          {children}
        </div>
      </div>
    </section>
  );
}
