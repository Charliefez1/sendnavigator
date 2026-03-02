import { useState, useEffect } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, ArrowLeft, Mail } from "lucide-react";

interface FinalScreenProps {
  onGenerate: (email?: string) => void;
  onViewDashboard?: () => void;
  onBackToBuilder?: () => void;
}

export function FinalScreen({ onGenerate, onViewDashboard, onBackToBuilder }: FinalScreenProps) {
  const { state, updateFinalStatement } = useChildProfile();
  const childName = state.setup.childName || "your child";

  const [consentDecided, setConsentDecided] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [parentEmail, setParentEmail] = useState("");

  // If we already have a cached report, trigger generation flow immediately (parent will handle redirect)
  useEffect(() => {
    if (state.aiReport) {
      onGenerate();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.aiReport) {
    return null;
  }

  const canGenerate = consentDecided;

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

      {/* Optional email input */}
      <div className="space-y-2">
        <Label htmlFor="parent-email" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Mail className="w-3.5 h-3.5" />
          Email me a copy of the report (optional)
        </Label>
        <Input
          id="parent-email"
          type="email"
          value={parentEmail}
          onChange={(e) => setParentEmail(e.target.value)}
          placeholder="your@email.com"
          className="max-w-sm"
        />
        <p className="text-xs text-muted-foreground">
          If provided, we'll email you a formatted copy of the report from Rich Ferriman. Your email is not stored.
        </p>
      </div>

      {onBackToBuilder && (
        <Button variant="outline" size="sm" onClick={onBackToBuilder} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sections
        </Button>
      )}

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
            onClick={() => onGenerate(parentEmail.trim() || undefined)}
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
          Nothing is sent anywhere except to generate your report. The report is created in your browser and downloaded directly to your device.
        </p>
      </div>
    </div>
  );
}
