import { LucideIcon } from "lucide-react";
import { usePageAccent } from "@/contexts/PageAccentContext";

export interface PageSectionDef {
  id: string;
  icon: LucideIcon;
  title: string;
}

interface OnThisPageProps {
  sections: PageSectionDef[];
}

function hslAlpha(hsl: string, alpha: number): string {
  return hsl.replace(")", ` / ${alpha})`);
}

export function OnThisPage({ sections }: OnThisPageProps) {
  const accent = usePageAccent() || "hsl(175 65% 41%)";

  return (
    <nav className="content-section py-2" aria-label="Page sections">
      <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">On this page</p>
      <div className="flex flex-wrap gap-1.5">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-card text-sm font-medium text-foreground hover:-translate-y-0.5 transition-all duration-150"
            style={{
              borderColor: hslAlpha(accent, 0.15),
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = hslAlpha(accent, 0.35);
              (e.currentTarget as HTMLElement).style.backgroundColor = hslAlpha(accent, 0.05);
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = hslAlpha(accent, 0.15);
              (e.currentTarget as HTMLElement).style.backgroundColor = "";
            }}
          >
            <s.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />
            {s.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
