import { ReactNode, ElementType } from "react";
import { Clock } from "lucide-react";
import { SafeRender } from "@/components/SafeRender";
import { PageSearch } from "@/components/PageSearch";

interface PageOrientationProps {
  title: string;
  description?: string;
  /** Additional description content rendered below the main description */
  descriptionExtra?: ReactNode;
  lastUpdated?: string;
  children?: ReactNode;
  accentColor?: string;
  showSearch?: boolean;
  icon?: ElementType;
  /** Small uppercase section label above the title (e.g. "EHCP Guide", "Ask Rich") */
  sectionLabel?: string;
}

function hslAlpha(hsl: string, alpha: number): string {
  return hsl.replace(")", ` / ${alpha})`);
}

export function PageOrientation({
  title,
  description,
  descriptionExtra,
  lastUpdated = "1st March 2026",
  children,
  accentColor,
  showSearch = true,
  icon: Icon,
  sectionLabel,
}: PageOrientationProps) {
  const accent = accentColor || "hsl(175 60% 40%)";

  return (
    <header className="relative overflow-hidden bg-background">
      {/* Thin accent bar at very top */}
      <div className="h-1 w-full" style={{ backgroundColor: accent }} />

      {/* Subtle accent radial glow from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${hslAlpha(accent, 0.08)}, transparent 70%)`,
        }}
      />

      <div className="content-section relative py-10 sm:py-14 text-center">
        {/* Section label with icon */}
        {(Icon || sectionLabel) && (
          <div className="flex items-center justify-center gap-2 mb-3">
            {Icon && (
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{ backgroundColor: hslAlpha(accent, 0.12) }}
              >
                <Icon className="w-4 h-4" style={{ color: accent }} />
              </div>
            )}
            {sectionLabel && (
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {sectionLabel}
              </span>
            )}
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-foreground mb-3 max-w-3xl mx-auto">
          {title}
        </h1>

        {description && (
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {descriptionExtra && (
          <div className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-3">
            {descriptionExtra}
          </div>
        )}

        {children && <div className="mt-3 flex justify-center">{children}</div>}

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span>Last updated: {lastUpdated}</span>
        </div>

        {showSearch && (
          <div className="mt-5 max-w-md mx-auto">
            <SafeRender><PageSearch /></SafeRender>
          </div>
        )}
      </div>

      {/* Accent fade line */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${hslAlpha(accent, 0.2)}, transparent)`,
        }}
      />
    </header>
  );
}
