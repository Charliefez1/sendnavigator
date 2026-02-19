import { ReactNode } from "react";
import { Clock } from "lucide-react";

interface PageOrientationProps {
  title: string;
  description?: string;
  lastUpdated?: string;
  children?: ReactNode;
}

export function PageOrientation({ 
  title, 
  description, 
  lastUpdated = "20th February 2026",
  children 
}: PageOrientationProps) {
  return (
    <header className="content-section py-8 sm:py-10 border-b border-border">
      <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
      {children}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Clock className="w-4 h-4" aria-hidden="true" />
        <span>Last updated: {lastUpdated}</span>
      </div>
    </header>
  );
}
