import { CheckCircle, MessageCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

type StatusType = "confirmed" | "discussed" | "unconfirmed";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showSourceLink?: boolean;
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

export function StatusBadge({ status, className = "", showSourceLink = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5`}>
      <span className={`status-badge ${config.className} ${className}`}>
        <Icon className="w-4 h-4" aria-hidden="true" />
        {config.label}
      </span>
      {showSourceLink && (
        <Link
          to="/sources#how-we-use-sources"
          className="text-muted-foreground hover:text-primary transition-colors"
          title="What does this mean?"
          aria-label="What does this confidence label mean?"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </Link>
      )}
    </span>
  );
}
