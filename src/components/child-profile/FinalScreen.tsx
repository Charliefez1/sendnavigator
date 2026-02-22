import { useState } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";

export function FinalScreen() {
  const { state, updateFinalStatement } = useChildProfile();
  const childName = state.setup.childName || "your child";

  const [consentDecided, setConsentDecided] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const canGenerate = consentDecided;

  const handleGenerateReport = () => {
    // PDF/AI generation will be wired up separately
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">
          One last thing.
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          What do you most want anyone reading this document to understand about {childName}? This is your space. No prompts. No structure. Just say what matters most.
        </p>
      </div>

      <div>
        <Textarea
          value={state.finalStatement}
          onChange={(e) => updateFinalStatement(e.target.value)}
          placeholder={`The most important thing about ${childName} is...`}
          rows={8}
          className="resize-y"
        />
      </div>

      {/* Consent + generate */}
      <div className="space-y-5 pt-4 border-t border-border">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent-share"
            checked={consentGiven}
            onCheckedChange={(checked) => {
              setConsentGiven(!!checked);
              if (checked) setConsentDecided(true);
            }}
            className="mt-0.5"
          />
          <label htmlFor="consent-share" className="text-sm text-foreground leading-relaxed cursor-pointer">
            I am happy to share an anonymised summary of this profile to help build a public picture of what neurodivergent children are experiencing in schools across the UK. No names, no school, no identifying information of any kind.
          </label>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button
            onClick={handleGenerateReport}
            size="lg"
            className="gap-2"
            disabled={!canGenerate}
          >
            <Download className="w-4 h-4" />
            Generate my report
          </Button>

          {!consentDecided && (
            <button
              type="button"
              onClick={() => {
                setConsentDecided(true);
                setConsentGiven(false);
              }}
              className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              No thanks, just generate my report
            </button>
          )}
        </div>

        {!canGenerate && (
          <p className="text-xs text-muted-foreground">
            Please respond to the data sharing option above before generating your report.
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Nothing is sent anywhere. The report is created in your browser and downloaded directly to your device.
        </p>
      </div>
    </div>
  );
}
