import { ReactNode } from "react";
import { HelpCircle, Newspaper } from "lucide-react";

type StatusType = "unconfirmed" | "leaked";

interface StatusSectionProps {
  type: StatusType;
  children: ReactNode;
}

const config = {
  unconfirmed: {
    icon: HelpCircle,
    title: "Unconfirmed",
    accentColor: "hsl(25 85% 52%)",
    bgColor: "hsl(25 55% 97%)",
    borderColor: "hsl(25 50% 88%)",
  },
  leaked: {
    icon: Newspaper,
    title: "Leaked",
    accentColor: "hsl(0 75% 50%)",
    bgColor: "hsl(0 55% 97%)",
    borderColor: "hsl(0 50% 88%)",
  },
};

export function StatusSection({ type, children }: StatusSectionProps) {
  const { icon: Icon, title, accentColor, bgColor, borderColor } = config[type];

  return (
    <section className="content-section py-3">
      <div
        className="rounded-xl border p-5 sm:p-6"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          boxShadow: `0 4px 16px -4px rgba(0,0,0,0.05)`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}15` }}>
            <Icon className="w-4 h-4" style={{ color: accentColor }} />
          </div>
          <h2 className="text-base font-display font-semibold text-foreground">{title}</h2>
        </div>
        <div className="prose-calm">{children}</div>
      </div>
    </section>
  );
}
