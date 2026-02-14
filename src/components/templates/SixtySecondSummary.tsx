import { ReactNode } from "react";

interface SixtySecondSummaryProps {
  points?: string[];
  prose?: ReactNode;
}

export function SixtySecondSummary({ points, prose }: SixtySecondSummaryProps) {
  if (!points?.length && !prose) return null;
  
  // Enforce maximum 6 points when using bullet format
  const displayPoints = points?.slice(0, 6);

  return (
    <section className="content-section py-8" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="text-lg font-medium text-foreground mb-4">
        60 second summary
      </h2>
      <div className="bg-card border border-border rounded-lg p-5 shadow-lg">
        {prose ? (
          <div className="prose-calm space-y-4">{prose}</div>
        ) : (
          <ul className="space-y-3">
            {displayPoints?.map((point, index) => (
              <li key={index} className="flex gap-3 text-foreground">
                <span className="text-primary font-medium flex-shrink-0">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
