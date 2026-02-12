import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Map, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const journeySteps = [
  { path: "/", label: "Start here", description: "Begin your journey through SEND reform", group: "confirmed" },
  { path: "/where-we-are-now", label: "Current situation", description: "What the system looks like today", group: "confirmed" },
  { path: "/what-is-changing", label: "Confirmed changes", description: "Changes that have been announced", group: "confirmed" },
  { path: "/what-has-not-changed", label: "What has not changed", description: "Parts of the system that remain the same", group: "confirmed" },
  { path: "/what-is-being-discussed", label: "Under discussion", description: "Proposals still being debated", group: "discussed" },
  { path: "/what-we-do-not-know", label: "What we do not know", description: "Questions without clear answers yet", group: "discussed" },
  { path: "/what-the-leaks-are-saying", label: "Unconfirmed reports", description: "Leaked information not yet verified", group: "unconfirmed" },
  { path: "/what-the-leaks-do-not-mean", label: "What leaks do not mean", description: "Context and common misunderstandings", group: "unconfirmed" },
  { path: "/timeline", label: "What is next", description: "Key dates and upcoming milestones", group: "next" },
];

const groupMeta: Record<string, { label: string; colour: string; bgColour: string; dotColour: string }> = {
  confirmed: { label: "Confirmed", colour: "text-journey-confirmed", bgColour: "bg-journey-confirmed/10", dotColour: "bg-journey-confirmed" },
  discussed: { label: "Under discussion", colour: "text-journey-discussed", bgColour: "bg-journey-discussed/10", dotColour: "bg-journey-discussed" },
  unconfirmed: { label: "Unconfirmed", colour: "text-journey-unconfirmed", bgColour: "bg-journey-unconfirmed/10", dotColour: "bg-journey-unconfirmed" },
  next: { label: "Next steps", colour: "text-journey-next", bgColour: "bg-journey-next/10", dotColour: "bg-journey-next" },
};

export function JourneyFloatingBar() {
  const [mapOpen, setMapOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = journeySteps.findIndex((s) => s.path === location.pathname);
  const isOnJourney = currentIndex !== -1;

  if (!isOnJourney && !mapOpen) return null;

  const current = journeySteps[currentIndex] || journeySteps[0];
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < journeySteps.length - 1;

  const goPrev = () => {
    if (canPrev) navigate(journeySteps[currentIndex - 1].path);
  };
  const goNext = () => {
    if (canNext) navigate(journeySteps[currentIndex + 1].path);
  };

  return (
    <>
      {/* Floating bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 pointer-events-none">
        <div className="content-wide mx-auto pointer-events-auto">
          <div className="bg-navy text-navy-foreground rounded-2xl shadow-2xl border border-white/10 flex items-center gap-1 px-2 py-2 sm:px-4 sm:py-3">
            {/* Prev button */}
            <button
              onClick={goPrev}
              disabled={!canPrev}
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Progress dots + label (centre) */}
            <button
              onClick={() => setMapOpen(true)}
              className="flex-1 flex flex-col items-center gap-1.5 py-1 hover:bg-white/5 rounded-xl transition-colors min-h-[44px] justify-center"
              aria-label="Open journey map"
            >
              {/* Progress dots */}
              <div className="flex items-center gap-1">
                {journeySteps.map((step, i) => {
                  const gm = groupMeta[step.group];
                  return (
                    <div
                      key={step.path}
                      className={cn(
                        "rounded-full transition-all",
                        i === currentIndex
                          ? `w-6 h-2 ${gm.dotColour}`
                          : i < currentIndex
                          ? `w-2 h-2 ${gm.dotColour} opacity-40`
                          : "w-2 h-2 bg-white/20"
                      )}
                    />
                  );
                })}
              </div>
              {/* Current step label */}
              <span className="text-xs sm:text-sm font-semibold text-white/90 leading-tight text-center">
                Step {currentIndex + 1}: {current.label}
              </span>
            </button>

            {/* Next button */}
            <button
              onClick={goNext}
              disabled={!canNext}
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Map toggle */}
            <button
              onClick={() => setMapOpen(!mapOpen)}
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors ml-1"
              aria-label={mapOpen ? "Close journey map" : "Open journey map"}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full journey map overlay */}
      {mapOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMapOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg mx-3 mb-20 sm:mb-0 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">Your Journey</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Step {currentIndex + 1} of {journeySteps.length}
                </p>
              </div>
              <button
                onClick={() => setMapOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Close journey map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps list */}
            <div className="overflow-y-auto flex-1 p-3">
              {journeySteps.map((step, i) => {
                const gm = groupMeta[step.group];
                const isActive = i === currentIndex;
                const isVisited = i < currentIndex;

                return (
                  <Link
                    key={step.path}
                    to={step.path}
                    onClick={() => setMapOpen(false)}
                    className={cn(
                      "flex items-start gap-3 px-3 py-3 rounded-xl transition-all min-h-[56px] group",
                      isActive
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted border border-transparent"
                    )}
                  >
                    {/* Step number / check */}
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold mt-0.5",
                      isActive
                        ? `${gm.dotColour} text-white`
                        : isVisited
                        ? `${gm.bgColour} ${gm.colour}`
                        : "bg-muted text-muted-foreground"
                    )}>
                      {isVisited ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>

                    {/* Label + description */}
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm font-semibold leading-tight",
                        isActive ? "text-foreground" : isVisited ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                        {step.description}
                      </p>
                    </div>

                    {/* Group badge */}
                    {isActive && (
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider shrink-0 mt-1", gm.colour)}>
                        {gm.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { journeySteps };
