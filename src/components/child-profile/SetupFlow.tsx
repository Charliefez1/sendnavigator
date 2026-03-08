import { useState } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SetupFlowProps {
  onComplete: () => void;
}

const FILLED_BY_OPTIONS = [
  "A parent or carer",
  "A parent or carer with the child involved",
  "A professional supporting the family",
  "Someone else",
];

const SHARED_WITH_OPTIONS = [
  "Class teacher",
  "SENCO or SEN Teacher",
  "Headteacher",
  "Educational psychologist",
  "GP or community paediatrician",
  "CAMHS",
  "Speech and language therapist",
  "Occupational therapist",
  "Social worker",
  "Family members",
  "The child themselves",
  "Other",
];

const REASON_OPTIONS = [
  "School has raised concerns",
  "Preparing for an EHCP assessment or review",
  "My child has recently received a diagnosis",
  "Something has changed and I am not sure why",
  "I want school to understand my child better",
  "Other",
];

export function SetupFlow({ onComplete }: SetupFlowProps) {
  const { state, updateSetup } = useChildProfile();
  const [step, setStep] = useState(0);

  const canProceed = () => {
    switch (step) {
      case 0: return state.setup.childName.trim().length > 0;
      case 1: return state.setup.filledBy.length > 0;
      case 2: return state.setup.sharedWith.length > 0;
      case 3: return state.setup.reason.length > 0;
      default: return false;
    }
  };

  const next = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  const toggleSharedWith = (option: string) => {
    const current = state.setup.sharedWith;
    if (current.includes(option)) {
      updateSetup({ sharedWith: current.filter((o) => o !== option) });
    } else {
      updateSetup({ sharedWith: [...current, option] });
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <p className="text-xs text-muted-foreground mb-2">Question {step + 1} of 4</p>

      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-semibold text-foreground">
            What is your child's first name?
          </h2>
          <p className="text-xs text-muted-foreground">Used to personalise the tool throughout. Never stored or sent anywhere.</p>
          <Input
            value={state.setup.childName}
            onChange={(e) => updateSetup({ childName: e.target.value })}
            placeholder="First name"
            className="max-w-xs"
            autoFocus
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-semibold text-foreground">
            Who is filling this in today?
          </h2>
          <div className="space-y-2">
            {FILLED_BY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => updateSetup({ filledBy: option })}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors",
                  state.setup.filledBy === option
                    ? "border-primary bg-primary/10 text-foreground font-medium"
                    : "border-border bg-card text-foreground hover:bg-muted"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-semibold text-foreground">
            Who will this document be shared with?
          </h2>
          <p className="text-xs text-muted-foreground">Select all that apply. This helps frame the downloaded PDF.</p>
          <div className="space-y-2">
            {SHARED_WITH_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => toggleSharedWith(option)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors",
                  state.setup.sharedWith.includes(option)
                    ? "border-primary bg-primary/10 text-foreground font-medium"
                    : "border-border bg-card text-foreground hover:bg-muted"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-semibold text-foreground">
            Is there a specific reason you are building this profile today?
          </h2>
          <div className="space-y-2">
            {REASON_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => updateSetup({ reason: option })}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors",
                  state.setup.reason === option
                    ? "border-primary bg-primary/10 text-foreground font-medium"
                    : "border-border bg-card text-foreground hover:bg-muted"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button onClick={next} disabled={!canProceed()} className="gap-2">
          {step < 3 ? "Next" : "Let's build the profile"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
