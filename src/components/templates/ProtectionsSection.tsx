import { ReactNode } from "react";
import { Shield } from "lucide-react";

interface ProtectionsSectionProps {
  children: ReactNode;
}

export function ProtectionsSection({ children }: ProtectionsSectionProps) {
  return (
    <section className="content-section py-3">
      <div
        className="rounded-xl border bg-card p-5 sm:p-6"
        style={{
          borderColor: "hsl(175 65% 41% / 0.2)",
          boxShadow: "0 8px 32px -8px hsl(175 65% 41% / 0.08), 0 4px 16px -4px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(175 65% 41% / 0.1)" }}>
            <Shield className="w-4 h-4" style={{ color: "hsl(175 65% 41%)" }} />
          </div>
          <h2 className="text-base font-display font-semibold text-foreground">
            What protections still apply today
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Regardless of what may be proposed, these are the current legal protections in place.
        </p>
        <div className="rounded-lg p-4 prose-calm" style={{ backgroundColor: "hsl(175 35% 96%)", border: "1px solid hsl(175 30% 88%)" }}>
          {children}
        </div>
      </div>
    </section>
  );
}
