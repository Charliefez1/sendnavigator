import { ReactNode } from "react";
import { CheckCircle, MessageCircle, HelpCircle } from "lucide-react";

type ConfidenceStatus = "confirmed" | "discussed" | "unconfirmed";

interface ConfidenceLabelProps {
  status: ConfidenceStatus;
  children: ReactNode;
  className?: string;
}

const config = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    bg: "bg-status-confirmed/10",
    border: "border-status-confirmed/30",
    text: "text-status-confirmed",
  },
  discussed: {
    label: "Being discussed",
    icon: MessageCircle,
    bg: "bg-status-discussed/10",
    border: "border-status-discussed/30",
    text: "text-status-discussed",
  },
  unconfirmed: {
    label: "Unconfirmed",
    icon: HelpCircle,
    bg: "bg-status-unconfirmed/10",
    border: "border-status-unconfirmed/30",
    text: "text-status-unconfirmed",
  },
};

export function ConfidenceLabel({ status, children, className = "" }: ConfidenceLabelProps) {
  const { label, icon: Icon, bg, border, text } = config[status];

  return (
    <div className={`rounded-lg ${bg} border ${border} p-4 flex items-start gap-3 mt-5 ${className}`}>
      <Icon className={`w-5 h-5 ${text} flex-shrink-0 mt-0.5`} />
      <div>
        <p className={`text-xs font-semibold ${text} uppercase tracking-wider mb-1`}>{label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
