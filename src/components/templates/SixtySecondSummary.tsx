interface SixtySecondSummaryProps {
  points: string[];
}

export function SixtySecondSummary({ points }: SixtySecondSummaryProps) {
  if (points.length === 0) return null;
  
  // Enforce maximum 6 points
  const displayPoints = points.slice(0, 6);

  return (
    <section className="content-section py-8" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="text-lg font-medium text-foreground mb-4">
        60 second summary
      </h2>
      <div className="bg-card border border-border rounded-lg p-5">
        <ul className="space-y-3">
          {displayPoints.map((point, index) => (
            <li key={index} className="flex gap-3 text-foreground">
              <span className="text-primary font-medium flex-shrink-0">•</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
