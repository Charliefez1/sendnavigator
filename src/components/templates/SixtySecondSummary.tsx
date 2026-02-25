import { ReactNode } from "react";
import { Zap } from "lucide-react";

interface SixtySecondSummaryProps {
  points?: string[];
  prose?: ReactNode;
}

export function SixtySecondSummary({ points, prose }: SixtySecondSummaryProps) {
  if (!points?.length && !prose) return null;
  
  const displayPoints = points?.slice(0, 6);

  return (
    <section className="content-section py-8" aria-labelledby="summary-heading">
      <div
        className="rounded-xl border bg-card p-5 sm:p-6"
        style={{
          borderColor: "hsl(175 65% 41% / 0.2)",
          boxShadow: "0 8px 32px -8px hsl(175 65% 41% / 0.08), 0 4px 16px -4px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: "hsl(175 65% 41% / 0.1)" }}>
            <Zap className="w-4 h-4" style={{ color: "hsl(175 65% 41%)" }} />
          </div>
          <h2 id="summary-heading" className="text-base font-display font-semibold text-foreground">
            60 second summary
          </h2>
        </div>
        {prose ? (
          <div className="prose-calm space-y-4 text-sm">{prose}</div>
        ) : (
          <ul className="space-y-3">
            {displayPoints?.map((point, index) => (
              <li key={index} className="flex gap-3 text-foreground text-sm">
                <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: "hsl(175 65% 41%)" }}>&#x2022;</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
