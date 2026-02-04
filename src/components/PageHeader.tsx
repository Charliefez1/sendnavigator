import { ReactNode } from "react";
import { Clock } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  lastUpdated?: string;
}

export function PageHeader({ title, description, children, lastUpdated = "4th February 2026" }: PageHeaderProps) {
  return (
    <header className="content-section py-8 sm:py-12 border-b border-border mb-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-4">
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
