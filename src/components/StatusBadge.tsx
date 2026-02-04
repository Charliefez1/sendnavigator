import { CheckCircle, MessageCircle, HelpCircle } from "lucide-react";

type StatusType = "confirmed" | "discussed" | "unconfirmed";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    className: "status-confirmed",
  },
  discussed: {
    label: "Being discussed",
    icon: MessageCircle,
    className: "status-discussed",
  },
  unconfirmed: {
    label: "Unconfirmed",
    icon: HelpCircle,
    className: "status-unconfirmed",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`status-badge ${config.className} ${className}`}>
      <Icon className="w-4 h-4" aria-hidden="true" />
      {config.label}
    </span>
  );
}
