import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Journey steps with cool-to-warm colour coding:
 * - Confirmed/current = cool teal/blue
 * - Under discussion = warm amber
 * - Unconfirmed/leaked = hot orange-red
 * - Timeline/next = warm terracotta
 */
const journeySteps = [
  {
    path: "/",
    label: "Start here",
    shortLabel: "Start",
    description: "Your rights have not changed",
    colorClass: "journey-step-confirmed",
  },
  {
    path: "/where-we-are-now",
    label: "Current situation",
    shortLabel: "Now",
    description: "What we know today",
    colorClass: "journey-step-confirmed",
  },
  {
    path: "/what-is-changing",
    label: "Confirmed changes",
    shortLabel: "Changes",
    description: "What is actually happening",
    colorClass: "journey-step-confirmed",
  },
  {
    path: "/what-has-not-changed",
    label: "What has not changed",
    shortLabel: "Unchanged",
    description: "Still in place",
    colorClass: "journey-step-confirmed",
  },
  {
    path: "/what-is-being-discussed",
    label: "Under discussion",
    shortLabel: "Discussed",
    description: "What is being considered",
    colorClass: "journey-step-discussed",
  },
  {
    path: "/what-we-do-not-know",
    label: "What we do not know",
    shortLabel: "Unknown",
    description: "Gaps in information",
    colorClass: "journey-step-discussed",
  },
  {
    path: "/what-the-leaks-are-saying",
    label: "Unconfirmed reports",
    shortLabel: "Leaks",
    description: "Rumours and briefings",
    colorClass: "journey-step-unconfirmed",
  },
  {
    path: "/what-the-leaks-do-not-mean",
    label: "What leaks do not mean",
    shortLabel: "Context",
    description: "Avoid misreading",
    colorClass: "journey-step-unconfirmed",
  },
  {
    path: "/timeline",
    label: "What is next",
    shortLabel: "Timeline",
    description: "Timeline and decisions",
    colorClass: "journey-step-next",
  },
];

export function JourneyNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentStepIndex = journeySteps.findIndex(
    (step) => step.path === location.pathname
  );
  const currentStep = journeySteps[currentStepIndex];

  return (
    <nav
      className="border-b border-border/60 bg-card/95 backdrop-blur-md sticky top-0 z-50"
      aria-label="SEND Navigator journey"
      role="navigation"
    >
      <div className="content-wide">
        {/* Desktop: horizontal scrollable tabs */}
        <div className="hidden md:block py-2">
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Journey steps">
            {journeySteps.map((step, index) => (
              <div key={step.path} className="flex items-center shrink-0">
                <NavLink
                  to={step.path}
                  role="tab"
                  aria-selected={step.path === location.pathname}
                  aria-label={`${step.label} - ${step.description}`}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                      isActive
                        ? `${step.colorClass}-active`
                        : `${step.colorClass} hover:opacity-90`
                    )
                  }
                >
                  <span className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                    step.path === location.pathname ? "bg-white/30" : "bg-black/10 dark:bg-white/10"
                  )}>
                    {index + 1}
                  </span>
                  <span>{step.shortLabel}</span>
                </NavLink>
                {index < journeySteps.length - 1 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-border mx-0.5 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: collapsible */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full min-h-[56px] py-3 text-foreground"
            aria-expanded={isOpen}
            aria-controls="journey-menu"
            aria-label={isOpen ? "Close journey navigation" : "Open journey navigation"}
          >
            <div className="flex items-center gap-3">
              {currentStepIndex >= 0 && (
                <span className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white",
                  currentStep?.colorClass === "journey-step-confirmed" && "bg-journey-confirmed",
                  currentStep?.colorClass === "journey-step-discussed" && "bg-journey-discussed",
                  currentStep?.colorClass === "journey-step-unconfirmed" && "bg-journey-unconfirmed",
                  currentStep?.colorClass === "journey-step-next" && "bg-journey-next",
                )}>
                  {currentStepIndex + 1}
                </span>
              )}
              <div className="text-left">
                <span className="font-bold block leading-tight">
                  {currentStep?.label || "Navigator"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Step {currentStepIndex + 1} of {journeySteps.length}
                </span>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          {isOpen && (
            <div id="journey-menu" className="pb-4 space-y-1 animate-fade-in">
              {journeySteps.map((step, index) => (
                <NavLink
                  key={step.path}
                  to={step.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors min-h-[48px]",
                      isActive
                        ? `${step.colorClass}-active`
                        : "text-foreground hover:bg-muted"
                    )
                  }
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0",
                      step.colorClass === "journey-step-confirmed" && "bg-journey-confirmed/15 text-journey-confirmed",
                      step.colorClass === "journey-step-discussed" && "bg-journey-discussed/15 text-journey-discussed",
                      step.colorClass === "journey-step-unconfirmed" && "bg-journey-unconfirmed/15 text-journey-unconfirmed",
                      step.colorClass === "journey-step-next" && "bg-journey-next/15 text-journey-next",
                    )}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-bold leading-tight">{step.label}</div>
                    <div className="text-sm text-muted-foreground">{step.description}</div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export { journeySteps };
