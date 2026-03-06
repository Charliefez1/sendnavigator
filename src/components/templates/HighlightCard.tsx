import { ReactNode } from "react";
import { usePageAccent } from "@/contexts/PageAccentContext";
import { cn } from "@/lib/utils";

interface HighlightCardProps {
  children: ReactNode;
  className?: string;
  /** Override the page accent with a custom HSL colour */
  accentColor?: string;
}

function hslWithAlpha(hsl: string, alpha: number): string {
  const match = hsl.match(/hsl\(([^)]+)\)/);
  if (!match) return hsl;
  const parts = match[1].trim().split(/[\s,/]+/);
  return `hsla(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
}

/**
 * A highlighted content card with a bold left-edge accent stripe.
 * Automatically reads the page accent colour from PageAccentProvider,
 * or falls back to the primary colour.
 */
export function HighlightCard({ children, className, accentColor: accentProp }: HighlightCardProps) {
  const pageAccent = usePageAccent();
  const accent = accentProp || pageAccent;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200 border-l-4",
        !accent && "border-l-primary bg-primary/5",
        className
      )}
      style={accent ? {
        borderLeftColor: accent,
        backgroundColor: hslWithAlpha(accent, 0.05),
      } : undefined}
    >
      {children}
    </div>
  );
}
