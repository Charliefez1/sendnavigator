import { Eye } from "lucide-react";

interface WatchItem {
  title: string;
  description?: string;
  type: "consultation" | "publication" | "legislation" | "decision" | "other";
}

interface WatchNextSectionProps {
  items: WatchItem[];
}

const typeLabels: Record<WatchItem["type"], string> = {
  consultation: "Consultation",
  publication: "Publication",
  legislation: "Legislation",
  decision: "Decision point",
  other: "Milestone",
};

export function WatchNextSection({ items }: WatchNextSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="content-section py-3 border-t border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Eye className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-base font-display font-semibold text-foreground">
          What to watch next
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Key upcoming decision points and milestones. No speculative dates included.
      </p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex gap-4 p-4 bg-card border border-border rounded-lg"
          >
            <span className="text-xs font-medium text-primary bg-accent px-2 py-1 rounded h-fit">
              {typeLabels[item.type]}
            </span>
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
