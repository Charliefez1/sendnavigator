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
    bgClass: "bg-muted/30",
    iconClass: "text-muted-foreground",
  },
  leaked: {
    icon: Newspaper,
    title: "Leaked",
    bgClass: "bg-accent/30",
    iconClass: "text-accent-foreground/70",
  },
};

export function StatusSection({ type, children }: StatusSectionProps) {
  const { icon: Icon, title, bgClass, iconClass } = config[type];

  return (
    <section className="content-section py-8 border-t border-border">
      <div className={`${bgClass} rounded-lg p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <Icon className={`w-5 h-5 ${iconClass}`} />
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <div className="prose-calm">{children}</div>
      </div>
    </section>
  );
}
