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
    <nav className="content-section py-4" aria-label="Page sections">
      <div className="rounded-xl border border-border bg-card p-5 shadow-lg">
        <h2 className="text-base font-semibold text-foreground mb-4">On this page</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <s.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {s.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
