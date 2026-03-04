import { useState, useMemo } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { hasAnyContent } from "@/lib/profile-dashboard-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Bug, Copy, Check, Activity } from "lucide-react";
import { analyseEpisodePatterns } from "@/lib/episode-pattern-engine";
import { EpisodePhase } from "@/config/signal-library";
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
  const [showEpisodeDebug, setShowEpisodeDebug] = useState(false);
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
        <div className="flex gap-2 justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPayload(true)}
            className="gap-1.5 text-xs border-dashed"
          >
            <Bug className="w-3.5 h-3.5" />
            Export Scoring Payload
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEpisodeDebug(true)}
            className="gap-1.5 text-xs border-dashed"
          >
            <Activity className="w-3.5 h-3.5" />
            Episode Signal Debug
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

      <EpisodeDebugDialog
        open={showEpisodeDebug}
        onOpenChange={setShowEpisodeDebug}
        signals={derived.signals}
      />

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

// ───────────────────────────────────────────────────
// Episode Debug Dialog (dev only)
// ───────────────────────────────────────────────────

const PHASE_ORDER: EpisodePhase[] = ["early_warning", "trigger", "escalation", "shutdown", "recovery"];
const PHASE_LABELS: Record<EpisodePhase, string> = {
  early_warning: "Early Warning",
  trigger: "Trigger",
  escalation: "Escalation",
  shutdown: "Shutdown",
  recovery: "Recovery",
};
const PHASE_COLORS: Record<EpisodePhase, string> = {
  early_warning: "bg-[hsl(var(--accent-amber-bg))] text-[hsl(var(--accent-amber))] border-[hsl(var(--accent-amber)/0.3)]",
  trigger: "bg-destructive/10 text-destructive border-destructive/30",
  escalation: "bg-destructive/20 text-destructive border-destructive/40",
  shutdown: "bg-[hsl(var(--accent-deep-blue-bg))] text-[hsl(var(--accent-deep-blue))] border-[hsl(var(--accent-deep-blue)/0.3)]",
  recovery: "bg-[hsl(var(--accent-teal-bg))] text-[hsl(var(--accent-teal))] border-[hsl(var(--accent-teal)/0.3)]",
};

interface EpisodeDebugDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signals: { id: string; label: string; domain: string; sourceType: string; confirmed: boolean; episodePhase?: EpisodePhase }[];
}

function EpisodeDebugDialog({ open, onOpenChange, signals }: EpisodeDebugDialogProps) {
  const analysis = useMemo(() => analyseEpisodePatterns(signals as any), [signals]);

  const byPhase = useMemo(() => {
    const map = new Map<EpisodePhase, typeof signals>();
    for (const sig of signals) {
      if (!sig.episodePhase) continue;
      if (!map.has(sig.episodePhase)) map.set(sig.episodePhase, []);
      map.get(sig.episodePhase)!.push(sig);
    }
    return map;
  }, [signals]);

  const unmapped = signals.filter((s) => !s.episodePhase);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Episode Signal Debug
          </DialogTitle>
          <DialogDescription className="text-xs">
            Signals grouped by episode phase — developer view only.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-4">
          {/* Analysis summary */}
          <div className="text-xs bg-muted p-2 rounded-md border border-border space-y-1">
            <p><span className="font-medium">Detected patterns:</span> {analysis.detectedPatterns.length}</p>
            <p><span className="font-medium">Weak signals:</span> {analysis.weakSignals.length}</p>
            {analysis.weakSignals.map((ws, i) => (
              <p key={i} className="text-muted-foreground pl-2">
                → {PHASE_LABELS[ws.phase]}: {ws.reason} ({ws.signalCount} signal{ws.signalCount !== 1 ? "s" : ""})
              </p>
            ))}
          </div>

          {/* Signals by phase */}
          {PHASE_ORDER.map((phase) => {
            const sigs = byPhase.get(phase) || [];
            if (sigs.length === 0) return (
              <div key={phase} className="text-xs">
                <span className={`inline-flex px-1.5 py-0.5 rounded border text-[10px] font-medium ${PHASE_COLORS[phase]}`}>
                  {PHASE_LABELS[phase]}
                </span>
                <span className="text-muted-foreground ml-2 italic">No signals mapped</span>
              </div>
            );

            return (
              <div key={phase} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-1.5 py-0.5 rounded border text-[10px] font-medium ${PHASE_COLORS[phase]}`}>
                    {PHASE_LABELS[phase]}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{sigs.length} signal{sigs.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="ml-4 space-y-0.5">
                  {sigs.map((sig) => (
                    <div key={sig.id} className="flex items-center gap-2 text-[11px]">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sig.confirmed ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      <span className="flex-1 truncate">{sig.label}</span>
                      <span className="text-muted-foreground text-[10px]">{sig.domain}</span>
                      <span className="text-muted-foreground text-[10px]">{sig.sourceType}</span>
                      <span className={`text-[9px] px-1 rounded ${sig.confirmed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {sig.confirmed ? "✓" : "?"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Unmapped signals */}
          {unmapped.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex px-1.5 py-0.5 rounded border text-[10px] font-medium bg-muted text-muted-foreground border-border">
                  No phase
                </span>
                <span className="text-[10px] text-muted-foreground">{unmapped.length} signal{unmapped.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="ml-4 space-y-0.5">
                {unmapped.map((sig) => (
                  <div key={sig.id} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 flex-shrink-0" />
                    <span className="flex-1 truncate">{sig.label}</span>
                    <span className="text-[10px]">{sig.domain}</span>
                    <span className="text-[10px]">{sig.sourceType}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}