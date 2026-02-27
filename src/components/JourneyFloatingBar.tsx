import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Map, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const journeySteps = [
  { path: "/state-of-send-2026/where-we-are-now", label: "What we know right now", description: "The factual baseline", group: "confirmed" },
  { path: "/state-of-send-2026/what-is-changing", label: "What is now in motion", description: "Confirmed reforms underway", group: "confirmed" },
  { path: "/state-of-send-2026/what-has-not-changed", label: "What remains protected", description: "Rights still in force", group: "confirmed" },
  { path: "/state-of-send-2026/what-is-being-discussed", label: "What is actively being shaped", description: "Live consultation and debate", group: "discussed" },
  { path: "/state-of-send-2026/what-we-do-not-know", label: "What is genuinely unknown", description: "No published answers yet", group: "discussed" },
  { path: "/state-of-send-2026/what-the-leaks-are-saying", label: "What has been reported", description: "Media coverage and basis", group: "unconfirmed" },
  { path: "/state-of-send-2026/what-the-leaks-do-not-mean", label: "What is often misunderstood", description: "Where fear runs ahead of evidence", group: "unconfirmed" },
  { path: "/state-of-send-2026/timeline", label: "What happens next", description: "Key dates and milestones", group: "next" },
];

const groupMeta: Record<string, { label: string; colour: string; bgColour: string; dotColour: string }> = {
  confirmed: { label: "Confirmed", colour: "text-journey-confirmed", bgColour: "bg-journey-confirmed/10", dotColour: "bg-journey-confirmed" },
  discussed: { label: "Under discussion", colour: "text-journey-discussed", bgColour: "bg-journey-discussed/10", dotColour: "bg-journey-discussed" },
  unconfirmed: { label: "Unconfirmed", colour: "text-journey-unconfirmed", bgColour: "bg-journey-unconfirmed/10", dotColour: "bg-journey-unconfirmed" },
  next: { label: "Next steps", colour: "text-journey-next", bgColour: "bg-journey-next/10", dotColour: "bg-journey-next" },
};

export function JourneyFloatingBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const currentIndex = journeySteps.findIndex((s) => s.path === location.pathname);

  // Only show on report sub-pages
  if (currentIndex === -1) return null;

  const prevStep = currentIndex > 0 ? journeySteps[currentIndex - 1] : null;
  const nextStep = currentIndex < journeySteps.length - 1 ? journeySteps[currentIndex + 1] : null;
  const currentStep = journeySteps[currentIndex];
  const currentGroup = groupMeta[currentStep.group];

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 pointer-events-none">
      <div className="content-wide flex justify-between items-end gap-4 px-4">
        {/* Prev */}
        {prevStep ? (
          <Link
            to={prevStep.path}
            className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-elevated text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            <span className="hidden sm:inline">{prevStep.label}</span>
            <span className="sm:hidden">Prev</span>
          </Link>
        ) : (
          <div />
        )}

        {/* Progress indicator */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-elevated text-xs text-muted-foreground hover:bg-muted transition-colors"
        >
          <Map className="w-3.5 h-3.5" />
          <span>{currentIndex + 1}/{journeySteps.length}</span>
          <span className={cn("w-2 h-2 rounded-full", currentGroup.dotColour)} />
        </button>

        {/* Next */}
        {nextStep ? (
          <Link
            to={nextStep.path}
            className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-elevated text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span className="hidden sm:inline">{nextStep.label}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ) : (
          <Link
            to="/state-of-send-2026"
            className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-elevated text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-journey-confirmed" />
            <span>Report hub</span>
          </Link>
        )}
      </div>

      {/* Expanded mini-map */}
      {expanded && (
        <div className="content-wide px-4 mt-2">
          <div className="pointer-events-auto bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-elevated p-4 relative">
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {journeySteps.map((step, idx) => {
                const group = groupMeta[step.group];
                const isActive = idx === currentIndex;
                return (
                  <Link
                    key={step.path}
                    to={step.path}
                    onClick={() => setExpanded(false)}
                    className={cn(
                      "flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors",
                      isActive
                        ? `${group.bgColour} ${group.colour} font-semibold`
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <span className={cn("w-2 h-2 rounded-full shrink-0", group.dotColour)} />
                    <span className="truncate">{step.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { journeySteps };
