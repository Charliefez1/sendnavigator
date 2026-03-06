import { ReactNode, useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ReadingDepthSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function ReadingDepthSection({ title, children, defaultOpen = false }: ReadingDepthSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full p-4 min-h-[56px] text-left transition-colors",
          "hover:bg-muted/50 active:bg-muted/70",
          isOpen && "border-b border-border bg-muted/30"
        )}
        aria-expanded={isOpen}
        aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="font-medium text-base sm:text-lg text-foreground pr-4">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-6 h-6 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <div 
          id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="p-4 sm:p-5 prose-calm"
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface ReadingDepthControlProps {
  keyPoints: ReactNode;
  moreDetail: ReactNode;
}

export function ReadingDepthControl({ keyPoints, moreDetail }: ReadingDepthControlProps) {
  return (
    <section className="content-section py-6" aria-label="Reading depth options">
      <p className="text-sm text-muted-foreground mb-4">
        Choose how much detail you want to read:
      </p>
      <div className="space-y-3">
        <ReadingDepthSection title="Read the key points" defaultOpen={true}>
          {keyPoints}
        </ReadingDepthSection>
        <ReadingDepthSection title="Read more detail">
          {moreDetail}
        </ReadingDepthSection>
      </div>
    </section>
  );
}

export { ReadingDepthSection };
