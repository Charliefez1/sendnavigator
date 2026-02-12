import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const journeySteps = [
  { path: "/", label: "Start here" },
  { path: "/where-we-are-now", label: "Current situation" },
  { path: "/what-is-changing", label: "Confirmed changes" },
  { path: "/what-has-not-changed", label: "What has not changed" },
  { path: "/what-is-being-discussed", label: "Under discussion" },
  { path: "/what-we-do-not-know", label: "What we do not know" },
  { path: "/what-the-leaks-are-saying", label: "Unconfirmed reports" },
  { path: "/what-the-leaks-do-not-mean", label: "What leaks do not mean" },
  { path: "/timeline", label: "What is next" },
];

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
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0",
                  isActive
                    ? "bg-white/20 text-white font-semibold"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )
              }
            >
              {i + 1}. {step.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
