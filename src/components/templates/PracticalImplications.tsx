import { ReactNode } from "react";

interface PracticalImplicationsProps {
  children: ReactNode;
}

export function PracticalImplications({ children }: PracticalImplicationsProps) {
  return (
    <section className="content-section py-8 border-t border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        What this could mean in practice
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        These are possible implications, not predictions or advice. Individual circumstances vary.
      </p>
      <div className="prose-calm">{children}</div>
    </section>
  );
}
