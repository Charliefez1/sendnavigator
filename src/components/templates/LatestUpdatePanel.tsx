import { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface LatestUpdatePanelProps {
  children: ReactNode;
}

export function LatestUpdatePanel({ children }: LatestUpdatePanelProps) {
  return (
    <section className="content-section py-4">
      <div className="rounded-xl border-2 border-amber-500/40 bg-amber-500/5 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-base font-display font-semibold text-foreground">Latest Update: 23 February 2026</h2>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-0.5">Schools White Paper published today</p>
          </div>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
