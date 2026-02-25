import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

interface PracticalImplicationsProps {
  children: ReactNode;
}

export function PracticalImplications({ children }: PracticalImplicationsProps) {
  return (
    <section className="content-section py-8">
      <div
        className="rounded-xl border bg-card p-5 sm:p-6"
        style={{
          borderColor: "hsl(42 87% 48% / 0.2)",
          boxShadow: "0 8px 32px -8px hsl(42 87% 48% / 0.08), 0 4px 16px -4px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: "hsl(42 87% 48% / 0.1)" }}>
            <Lightbulb className="w-4 h-4" style={{ color: "hsl(42 87% 48%)" }} />
          </div>
          <h2 className="text-base font-display font-semibold text-foreground">
            What this could mean in practice
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-5">
          These are possible implications, not predictions or advice. Individual circumstances vary.
        </p>
        <div className="prose-calm">{children}</div>
      </div>
    </section>
  );
}
