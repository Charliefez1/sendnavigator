import { ReactNode, useState } from "react";
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
          "flex items-center justify-between w-full p-4 text-left transition-colors",
          "hover:bg-muted/50",
          isOpen && "border-b border-border bg-muted/30"
        )}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-foreground">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="p-5 prose-calm">
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
