import { useState, useEffect } from "react";
import { useChildProfile, SECTION_TITLES, ChildProfileState } from "@/contexts/ChildProfileContext";
import { sectionContent } from "@/config/child-profile-sections";
import { childVoiceQuestions } from "@/config/child-voice-questions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { generateProfilePDF } from "@/lib/generate-profile-pdf";
import { supabase } from "@/integrations/supabase/client";
import { ReportLoadingScreen } from "./ReportLoadingScreen";

type Stage = "input" | "loading" | "complete";

function buildProfileText(state: ChildProfileState): string {
  const lines: string[] = [];

  lines.push(`Child's name: ${state.setup.childName || "Not provided"}`);
  lines.push(`Reason for building this profile: ${state.setup.reason || "Not provided"}`);
  lines.push(`Who this will be shared with: ${state.setup.sharedWith.length > 0 ? state.setup.sharedWith.join(", ") : "Not specified"}`);
  lines.push("");

  SECTION_TITLES.forEach((title, index) => {
    const section = state.sections[index];
    if (!section) return;

    const content = sectionContent[index];
    const parentAnswers: string[] = [];
    const childAnswers: string[] = [];

    // Parent answers
    if (content) {
      content.questions.forEach((q) => {
        const val = section.answers?.[q.id];
        const displayValue = Array.isArray(val) ? val.join(", ") : val;
        if (displayValue && displayValue.trim()) {
          parentAnswers.push(`${q.label}\n${displayValue.trim()}`);
        }
      });
    }

    // Child voice answers
    const cvQuestions = childVoiceQuestions[index];
    if (cvQuestions) {
      cvQuestions.forEach((q) => {
        const val = section.answers?.[q.id];
        const strVal = Array.isArray(val) ? val.join(", ") : val;
        if (strVal && strVal.toString().trim()) {
          childAnswers.push(`${q.label}\n${strVal.toString().trim()}`);
        }
      });
    }

    const hasContent = parentAnswers.length > 0 || childAnswers.length > 0 || section.reflection.trim().length > 0;
    if (!hasContent) return;

    lines.push(`Section ${index + 1}: ${title}`);

    if (parentAnswers.length > 0) {
      lines.push("Parent answers:");
      lines.push(parentAnswers.join("\n\n"));
    }

    if (childAnswers.length > 0) {
      lines.push("Child answers (in the child's own words):");
      lines.push(childAnswers.join("\n\n"));
    }

    if (section.reflection.trim()) {
      lines.push(`Closing reflection: ${section.reflection.trim()}`);
    }

    lines.push("");
  });

  if (state.finalStatement.trim()) {
    lines.push(`Final closing statement from the parent: ${state.finalStatement.trim()}`);
  }

  return lines.join("\n");
}

export function FinalScreen() {
  const { state, updateFinalStatement } = useChildProfile();
  const childName = state.setup.childName || "your child";

  const [stage, setStage] = useState<Stage>("input");
  const [consentDecided, setConsentDecided] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emptySectionsWarning, setEmptySectionsWarning] = useState(false);

  const canGenerate = consentDecided;

  const handleGenerateReport = async () => {
    setError(null);
    setEmptySectionsWarning(false);
    setStage("loading");

    try {
      const profileText = buildProfileText(state);

      const { data, error: fnError } = await supabase.functions.invoke(
        "generate-profile-report",
        { body: { profileText } }
      );

      if (fnError) {
        throw new Error(fnError.message || "Failed to generate report");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const aiReport = data.report;

      await generateProfilePDF({ state, aiReport });

      setStage("complete");
    } catch (e) {
      console.error("Report generation failed:", e);
      if (e instanceof Error && e.message === "NO_SECTIONS_COMPLETED") {
        setEmptySectionsWarning(true);
        setStage("input");
        return;
      }
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStage("input");
    }
  };

  // === LOADING SCREEN ===
  if (stage === "loading") {
    return <ReportLoadingScreen />;
  }

  // === COMPLETE SCREEN ===
  if (stage === "complete") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            Your report is ready.
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your answers have not been stored. This is the only copy. Keep it safe.
          </p>
        </div>

        <div className="space-y-5 pt-4 border-t border-border">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent-anon"
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(!!checked)}
              className="mt-0.5"
            />
            <label htmlFor="consent-anon" className="text-sm text-foreground leading-relaxed cursor-pointer">
              I am happy to share an anonymised summary to help build a public picture of what neurodivergent children are experiencing in schools. No names. No school. Nothing that identifies your child.
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                // Future: submit anonymised data
              }}
              size="sm"
              disabled={!consentGiven}
            >
              Share anonymised summary
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Do nothing, just acknowledge
              }}
            >
              No thanks
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // === INPUT SCREEN (default) ===
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

      {emptySectionsWarning && (
        <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
          <p className="text-sm text-foreground font-medium">You have not completed any sections yet. Complete at least one section before generating your report.</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
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
          Nothing is sent anywhere except to generate your report. The report is created in your browser and downloaded directly to your device.
        </p>
      </div>
    </div>
  );
}
