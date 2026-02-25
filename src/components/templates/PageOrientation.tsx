import { ReactNode } from "react";
import { Clock } from "lucide-react";
import { PageSearch } from "@/components/PageSearch";

interface PageOrientationProps {
  title: string;
  description?: string;
  lastUpdated?: string;
  children?: ReactNode;
  accentColor?: string;
  showSearch?: boolean;
}

export function PageOrientation({ 
  title, 
  description, 
  lastUpdated = "20th February 2026",
  children,
  accentColor,
  showSearch = true,
}: PageOrientationProps) {
  return (
    <header className="relative overflow-hidden bg-background">
      {/* Subtle radial glow at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${accentColor ? `${accentColor}08` : "hsl(175 60% 40% / 0.04)"}, transparent 70%)`,
        }}
      />
      <div className="content-section relative py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        {children}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span>Last updated: {lastUpdated}</span>
        </div>
        {showSearch && (
          <div className="mt-4">
            <PageSearch />
          </div>
        )}
      </div>
      {/* Fade line */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor ? `${accentColor}20` : "hsl(175 60% 40% / 0.12)"}, transparent)`,
        }}
      />
    </header>
  );
}
