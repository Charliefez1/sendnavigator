import { LucideIcon } from "lucide-react";

export interface PageSectionDef {
  id: string;
  icon: LucideIcon;
  title: string;
}

interface OnThisPageProps {
  sections: PageSectionDef[];
}

export function OnThisPage({ sections }: OnThisPageProps) {
  return (
    <nav className="content-section py-2" aria-label="Page sections">
      <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">On this page</p>
      <div className="flex flex-wrap gap-1.5">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-colors"
          >
            <s.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            {s.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
