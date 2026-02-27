import { useState, useEffect } from "react";
import { FileText, Brain, Sparkles, CheckCircle, Loader2 } from "lucide-react";

const STEPS = [
  { icon: FileText, label: "Reading your answers", duration: 8000 },
  { icon: Brain, label: "Building personalised insights", duration: 25000 },
  { icon: Sparkles, label: "Writing your report", duration: 40000 },
  { icon: CheckCircle, label: "Preparing your download", duration: 15000 },
];

export function ReportLoadingScreen() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((step, i) => {
      if (i === 0) return; // first step is immediate
      elapsed += STEPS[i - 1].duration;
      timers.push(setTimeout(() => setActiveStep(i), elapsed));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            Building your report
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            This can take up to 2 minutes. Your report will automatically download to your device.
          </p>
        </div>

        <div className="space-y-3 text-left">
          {STEPS.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = i === activeStep;
            const isComplete = i < activeStep;

            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-500 ${
                  isActive
                    ? "bg-primary/10 border border-primary/20"
                    : isComplete
                    ? "bg-muted/50 border border-transparent"
                    : "border border-transparent opacity-40"
                }`}
              >
                <div className="flex-shrink-0">
                  {isActive ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : isComplete ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  ) : (
                    <StepIcon className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : isComplete
                      ? "text-muted-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                  {isComplete && (
                    <span className="text-xs text-primary ml-2">Done</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Please don't close this page.
        </p>
      </div>
    </div>
  );
}
