import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ContentBoxProps {
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function ContentBox({ id, icon: Icon, title, children }: ContentBoxProps) {
  return (
    <section id={id} className="content-section py-4 scroll-mt-24">
      <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">{title}</h2>
        </div>
        <div className="prose-calm text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
