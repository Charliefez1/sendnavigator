import { useState } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { hasAnyContent } from "@/lib/profile-dashboard-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Bug, Copy, Check } from "lucide-react";
import { ProfileIdentityHeader } from "./dashboard/ProfileIdentityHeader";
import { ProfileWheel } from "./dashboard/ProfileWheel";
import { ChildVoicePanel } from "./dashboard/ChildVoicePanel";
import { EmergingThemes } from "./dashboard/EmergingThemes";
import { ReadinessPanel } from "./dashboard/ReadinessPanel";

interface ProfileDashboardProps {
  onBack: () => void;
  onNavigateToSection?: (index: number) => void;
  onGenerateReport?: () => void;
}

export function ProfileDashboard({ onBack, onNavigateToSection, onGenerateReport }: ProfileDashboardProps) {
  const { state, getSectionStatus, derived } = useChildProfile();
  const hasContent = hasAnyContent(state);
  const [devMode, setDevMode] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [copied, setCopied] = useState(false);

  const scoringPayload = JSON.stringify(
    {
      domain_scores: derived.domain_scores,
      explainability: derived.explainability,
      section_sources: (state as any).section_sources ?? {},
    },
    null,
    2
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scoringPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Back button + Dev toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setDevMode((d) => !d)}
          className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
            devMode
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-muted text-muted-foreground border-border opacity-40 hover:opacity-100"
          }`}
        >
          Dev
        </button>
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to profile
        </Button>
      </div>

      {/* Dev: Export Scoring Payload */}
      {devMode && (
        <div className="flex justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPayload(true)}
            className="gap-1.5 text-xs border-dashed"
          >
            <Bug className="w-3.5 h-3.5" />
            Export Scoring Payload
          </Button>
        </div>
      )}

      <Dialog open={showPayload} onOpenChange={setShowPayload}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-sm">Scoring Payload</DialogTitle>
            <DialogDescription className="text-xs">
              Developer-only export — no personal data included.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <pre className="flex-1 overflow-auto text-[11px] bg-muted p-3 rounded-md border border-border font-mono whitespace-pre-wrap break-words">
            {scoringPayload}
          </pre>
        </DialogContent>
      </Dialog>

      {/* 1. Identity Header */}
      <ProfileIdentityHeader state={state} />

      {!hasContent ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Start filling in sections to see your child's profile come to life here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileWheel state={state} onNavigateToSection={onNavigateToSection} />
            <ReadinessPanel
              state={state}
              getSectionStatus={getSectionStatus}
              onNavigateToSection={onNavigateToSection}
              onGenerateReport={onGenerateReport}
            />
          </div>
          <ChildVoicePanel state={state} onNavigateToSection={onNavigateToSection} />
          <EmergingThemes state={state} onNavigateToSection={onNavigateToSection} />
        </>
      )}
    </div>
  );
}