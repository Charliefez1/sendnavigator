import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  const currentStep = journeySteps.find((s) => s.path === location.pathname);
  const currentIndex = journeySteps.findIndex((s) => s.path === location.pathname);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-navy/90 border-b border-white/10 relative" aria-label="Journey steps" ref={ref}>
      <div className="content-wide">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full py-2.5 text-white"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            {currentStep && (
              <>
                <span className={cn("w-2 h-2 rounded-full flex-shrink-0", dotColors[currentStep.color])} />
                <span className="text-white/60 mr-1">{currentIndex + 1}.</span>
                {currentStep.label}
              </>
            )}
            {!currentStep && "Journey steps"}
          </span>
          <ChevronDown className={cn("w-4 h-4 text-white/60 transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full bg-card text-card-foreground border border-border rounded-b-xl shadow-lg z-50 animate-fade-in">
            <div className="py-1">
              {journeySteps.map((step, i) => (
                <NavLink
                  key={step.path}
                  to={step.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    )
                  }
                >
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0", dotColors[step.color])} />
                  <span className="text-muted-foreground mr-0.5">{i + 1}.</span>
                  {step.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export { journeySteps, dotColors };
