import { useState, useEffect } from "react";
import { useChildProfile, SECTION_TITLES, ChildProfileState } from "@/contexts/ChildProfileContext";
import { sectionContent } from "@/config/child-profile-sections";
import { childVoiceQuestions } from "@/config/child-voice-questions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, ArrowLeft } from "lucide-react";
import { isStructuredReport } from "@/types/ai-report";
import { supabase } from "@/integrations/supabase/client";

interface FinalScreenProps {
  onViewDashboard?: () => void;
  onReportLoading?: () => void;
  onReportReady?: () => void;
  onBackToBuilder?: () => void;
}

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

    if (content) {
      content.questions.forEach((q) => {
        const val = section.answers?.[q.id];
        const displayValue = Array.isArray(val) ? val.join(", ") : val;
        if (displayValue && displayValue.trim()) {
          parentAnswers.push(`${q.label}\n${displayValue.trim()}`);
        }
      });
    }

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

export function FinalScreen({ onViewDashboard, onReportLoading, onReportReady, onBackToBuilder }: FinalScreenProps) {
  const { state, updateFinalStatement, updateAiReport } = useChildProfile();
  const childName = state.setup.childName || "your child";

  const [consentDecided, setConsentDecided] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emptySectionsWarning, setEmptySectionsWarning] = useState(false);

  // If we already have a cached report, go straight to preview
  useEffect(() => {
    if (state.aiReport && onReportReady) {
      onReportReady();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.aiReport && onReportReady) {
    return null;
  }

  const canGenerate = consentDecided;

  const handleGenerateReport = async () => {
    setError(null);
    setEmptySectionsWarning(false);

    // Transition parent to loading stage
    onReportLoading?.();

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

      const structured = data.structured && isStructuredReport(data.structured)
        ? data.structured
        : undefined;

      updateAiReport({
        generatedAt: new Date().toISOString(),
        model: "claude-sonnet-4-20250514",
        report: data.report,
        structured,
      });

      // Transition parent to report preview
      onReportReady?.();
    } catch (e) {
      console.error("Report generation failed:", e);
      if (e instanceof Error && e.message === "NO_SECTIONS_COMPLETED") {
        setEmptySectionsWarning(true);
        return;
      }
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
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

      {onBackToBuilder && (
        <Button variant="outline" size="sm" onClick={onBackToBuilder} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sections
        </Button>
      )}

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
