import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const journeySteps = [
  { path: "/", label: "Start here", color: "confirmed" },
  { path: "/where-we-are-now", label: "Current situation", color: "confirmed" },
  { path: "/what-is-changing", label: "Confirmed changes", color: "confirmed" },
  { path: "/what-has-not-changed", label: "What has not changed", color: "confirmed" },
  { path: "/what-is-being-discussed", label: "Under discussion", color: "discussed" },
  { path: "/what-we-do-not-know", label: "What we do not know", color: "discussed" },
  { path: "/what-the-leaks-are-saying", label: "Unconfirmed reports", color: "unconfirmed" },
  { path: "/what-the-leaks-do-not-mean", label: "What leaks do not mean", color: "unconfirmed" },
  { path: "/timeline", label: "What is next", color: "next" },
];

const dotColors: Record<string, string> = {
  confirmed: "bg-status-confirmed",
  discussed: "bg-status-discussed",
  unconfirmed: "bg-status-unconfirmed",
  next: "bg-[hsl(var(--timeline-upcoming))]",
};

export function JourneyNavBar() {
  return (
    <nav className="bg-navy/90 border-b border-white/10" aria-label="Journey steps">
      <div className="content-wide">
        <div className="flex items-center gap-0.5 py-1.5 overflow-x-auto scrollbar-hide">
          {journeySteps.map((step, i) => (
            <NavLink
              key={step.path}
              to={step.path}
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5",
                  isActive
                    ? "bg-white/20 text-white font-semibold"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )
              }
            >
              <span className={cn("w-2 h-2 rounded-full flex-shrink-0", dotColors[step.color])} />
              {i + 1}. {step.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export { journeySteps, dotColors };
