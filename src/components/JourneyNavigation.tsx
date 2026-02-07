import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronRight, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const journeySteps = [
  {
    path: "/",
    label: "Start here",
    shortLabel: "Home",
    description: "Your rights haven't changed",
  },
  {
    path: "/where-we-are-now",
    label: "Current situation",
    shortLabel: "Now",
    description: "What we know today",
  },
  {
    path: "/what-is-changing",
    label: "Confirmed changes",
    shortLabel: "Changes",
    description: "What's actually happening",
  },
  {
    path: "/what-is-being-discussed",
    label: "Under discussion",
    shortLabel: "Discussed",
    description: "What's being considered",
  },
  {
    path: "/what-the-leaks-are-saying",
    label: "Unconfirmed reports",
    shortLabel: "Leaks",
    description: "Rumours and briefings",
  },
  {
    path: "/timeline",
    label: "What's next",
    shortLabel: "Timeline",
    description: "Timeline and decisions",
  },
];

const additionalPages = [
  { path: "/what-has-not-changed", label: "What hasn't changed" },
  { path: "/what-we-do-not-know", label: "What we don't know yet" },
  { path: "/what-the-leaks-do-not-mean", label: "What leaks don't mean" },
  { path: "/questions-and-answers", label: "Questions & answers" },
  { path: "/sources", label: "Sources" },
  { path: "/about", label: "About this resource" },
];

export function JourneyNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentStepIndex = journeySteps.findIndex(
    (step) => step.path === location.pathname
  );
  const currentPage =
    journeySteps.find((step) => step.path === location.pathname) ||
    additionalPages.find((page) => page.path === location.pathname);

  return (
    <nav
      className="border-b border-border/60 bg-card/90 backdrop-blur-md sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <div className="content-wide">
        {/* Desktop */}
        <div className="hidden lg:block py-2.5">
          <div className="flex items-center gap-1">
            {journeySteps.map((step, index) => (
              <div key={step.path} className="flex items-center">
                <NavLink
                  to={step.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-warm"
                        : index < currentStepIndex
                        ? "text-journey-complete hover:bg-secondary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )
                  }
                >
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : index === currentStepIndex ? (
                    <Circle className="w-4 h-4 fill-current" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                  <span>{step.shortLabel}</span>
                </NavLink>
                {index < journeySteps.length - 1 && (
                  <ChevronRight
                    className="w-4 h-4 text-border mx-0.5"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}

            <div className="relative ml-auto group">
              <button className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
                More pages
              </button>
              <div className="absolute right-0 top-full mt-1 bg-card border border-border/60 rounded-2xl shadow-warm py-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {additionalPages.map((page) => (
                  <NavLink
                    key={page.path}
                    to={page.path}
                    className={({ isActive }) =>
                      cn(
                        "block px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      )
                    }
                  >
                    {page.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full min-h-[56px] py-4 text-foreground"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex items-center gap-3">
              {currentStepIndex >= 0 && (
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {currentStepIndex + 1}
                </span>
              )}
              <span className="font-bold">
                {currentPage?.label || "Menu"}
              </span>
            </div>
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>

          {isOpen && (
            <div id="mobile-menu" className="pb-4 space-y-1 animate-fade-in">
              <p className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Your journey
              </p>
              {journeySteps.map((step, index) => (
                <NavLink
                  key={step.path}
                  to={step.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    )
                  }
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                      index < currentStepIndex
                        ? "bg-journey-complete/20 text-journey-complete"
                        : index === currentStepIndex
                        ? "bg-primary-foreground text-primary"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <div>
                    <div className="font-bold">{step.label}</div>
                    <div className="text-sm opacity-80">{step.description}</div>
                  </div>
                </NavLink>
              ))}

              <div className="border-t border-border/60 mt-4 pt-4">
                <p className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  More pages
                </p>
                {additionalPages.map((page) => (
                  <NavLink
                    key={page.path}
                    to={page.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-foreground hover:bg-secondary"
                      )
                    }
                  >
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    {page.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export { journeySteps, additionalPages };
