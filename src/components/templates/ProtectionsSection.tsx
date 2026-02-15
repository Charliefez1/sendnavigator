import { ReactNode } from "react";
import { Shield } from "lucide-react";

interface ProtectionsSectionProps {
  children: ReactNode;
}

export function ProtectionsSection({ children }: ProtectionsSectionProps) {
  return (
    <section className="content-section py-8 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-status-confirmed" />
        <h2 className="text-lg font-semibold text-foreground">
          What protections still apply today
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Regardless of what may be proposed, these are the current legal protections in place.
      </p>
      <div className="bg-status-confirmed-bg border border-[hsl(var(--status-confirmed-border))] rounded-lg p-5 prose-calm">
        {children}
      </div>
    </section>
  );
}
