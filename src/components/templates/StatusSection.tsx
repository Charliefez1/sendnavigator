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
    accent: "text-status-unconfirmed",
    accentBg: "bg-status-unconfirmed/10",
    bg: "bg-status-unconfirmed-bg",
    border: "border-status-unconfirmed/20",
  },
  leaked: {
    icon: Newspaper,
    title: "Leaked",
    accent: "text-status-leaked",
    accentBg: "bg-status-leaked/10",
    bg: "bg-status-leaked-bg",
    border: "border-status-leaked/20",
  },
};

export function StatusSection({ type, children }: StatusSectionProps) {
  const { icon: Icon, title, accent, accentBg, bg, border } = config[type];

  return (
    <section className="content-section py-3">
      <div className={`rounded-xl border p-5 sm:p-6 ${bg} ${border} shadow-sm`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accentBg}`}>
            <Icon className={`w-4 h-4 ${accent}`} />
          </div>
          <h2 className="text-base font-display font-semibold text-foreground">{title}</h2>
        </div>
        <div className="prose-calm">{children}</div>
      </div>
    </section>
  );
}
