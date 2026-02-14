import { NavLink, useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const journeySteps = [
  { path: "/where-we-are-now", label: "What we know so far", shortLabel: "Known", color: "confirmed" },
  { path: "/what-is-changing", label: "What is changing", shortLabel: "Changing", color: "confirmed" },
  { path: "/what-has-not-changed", label: "What has not changed", shortLabel: "Unchanged", color: "confirmed" },
  { path: "/what-is-being-discussed", label: "What is being discussed", shortLabel: "Discussed", color: "discussed" },
  { path: "/what-we-do-not-know", label: "What we do not know yet", shortLabel: "Unknown", color: "discussed" },
  { path: "/what-the-leaks-are-saying", label: "What the leaks are saying", shortLabel: "Leaks", color: "unconfirmed" },
  { path: "/what-the-leaks-do-not-mean", label: "What the leaks do not mean", shortLabel: "Context", color: "unconfirmed" },
  { path: "/timeline", label: "Timeline and next steps", shortLabel: "Timeline", color: "next" },
];

const dotColors: Record<string, string> = {
  confirmed: "bg-status-confirmed",
  discussed: "bg-status-discussed",
  unconfirmed: "bg-status-unconfirmed",
  next: "bg-[hsl(var(--timeline-upcoming))]",
};

const activeDotColors: Record<string, string> = {
  confirmed: "ring-status-confirmed",
  discussed: "ring-status-discussed",
  unconfirmed: "ring-status-unconfirmed",
  next: "ring-[hsl(var(--timeline-upcoming))]",
};

export function JourneyNavBar() {
  const location = useLocation();
  const currentIndex = journeySteps.findIndex((s) => s.path === location.pathname);
  const prevStep = currentIndex > 0 ? journeySteps[currentIndex - 1] : null;
  const nextStep = currentIndex < journeySteps.length - 1 ? journeySteps[currentIndex + 1] : null;

  return (
    <nav className="bg-navy/90 border-b border-white/10" aria-label="Journey progress">
      <div className="content-wide py-1.5">
        {/* Logo + dots + toggle row */}
        <div className="flex items-center justify-between gap-3 mb-0.5">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
              <Heart className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
            </div>
            <span className="text-sm font-display font-bold text-white tracking-tight leading-tight group-hover:opacity-90 transition-opacity hidden sm:inline">
              SEND Reform Navigator
            </span>
          </Link>

          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {journeySteps.map((step, i) => (
              <NavLink
                key={step.path}
                to={step.path}
                title={`${i + 1}. ${step.label}`}
                className="group relative p-0.5"
              >
                <span
                  className={cn(
                    "block w-2.5 h-2.5 rounded-full transition-all",
                    dotColors[step.color],
                    i === currentIndex
                      ? "ring-2 ring-offset-1 ring-offset-navy/90 scale-125 " + activeDotColors[step.color]
                      : "opacity-40 group-hover:opacity-80 group-hover:scale-110"
                  )}
                />
              </NavLink>
            ))}
          </div>

          {/* Theme toggle */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Current step + prev/next */}
        <div className="flex items-center justify-between">
          {prevStep ? (
            <NavLink
              to={prevStep.path}
              className="flex items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors text-xs max-w-[40%]"
            >
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{prevStep.label}</span>
            </NavLink>
          ) : (
            <div className="max-w-[40%]" />
          )}

          <div className="text-center flex-shrink-0 px-2">
            <span className="text-white/50 text-xs">
              {currentIndex >= 0 ? `Step ${currentIndex + 1} of ${journeySteps.length}` : "Guide"}
            </span>
          </div>

          {nextStep ? (
            <NavLink
              to={nextStep.path}
              className="flex items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors text-xs max-w-[40%] text-right justify-end"
            >
              <span className="truncate">{nextStep.label}</span>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </NavLink>
          ) : (
            <div className="max-w-[40%]" />
          )}
        </div>
      </div>
    </nav>
  );
}

export { journeySteps, dotColors };
