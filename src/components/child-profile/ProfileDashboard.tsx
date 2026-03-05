import { useState, useMemo } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { hasAnyContent } from "@/lib/profile-dashboard-utils";
import { analyseThemes, ThemeAnalysisResult } from "@/lib/theme-engine";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Bug, Copy, Check, Activity, FlaskConical, Upload } from "lucide-react";
import { analyseEpisodePatterns } from "@/lib/episode-pattern-engine";
import { createDevTestProfile } from "@/lib/dev-test-profile";
import {
  getTopWeightedSignals,
  getCrossDomainSignals,
  getExplainabilitySamples,
  generateSimulatedRadars,
  getDomainDistribution,
} from "@/lib/scoring-diagnostics";
import { EpisodePhase } from "@/config/signal-library";
import { ProfileIdentityHeader } from "./dashboard/ProfileIdentityHeader";
import { ProfileWheel } from "./dashboard/ProfileWheel";
import { ChildVoicePanel } from "./dashboard/ChildVoicePanel";
import { EmergingThemes } from "./dashboard/EmergingThemes";
import { ReadinessPanel } from "./dashboard/ReadinessPanel";
import { StatCards } from "./dashboard/StatCards";
import { DomainBars } from "./dashboard/DomainBars";
import { PatternPreview } from "./dashboard/PatternPreview";

interface ProfileDashboardProps {
  onBack: () => void;
  onNavigateToSection?: (index: number) => void;
  onGenerateReport?: () => void;
}

export function ProfileDashboard({ onBack, onNavigateToSection, onGenerateReport }: ProfileDashboardProps) {
  const { state, getSectionStatus, derived, loadState } = useChildProfile();
  const hasContent = hasAnyContent(state);
  const [showThemes, setShowThemes] = useState(false);

  const themeAnalysis = useMemo<ThemeAnalysisResult>(() => {
    const confirmed = (derived.signals || []).filter((s) => s.confirmed);
    return analyseThemes(confirmed, state);
  }, [derived, state]);

  const [devMode, setDevMode] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [showEpisodeDebug, setShowEpisodeDebug] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [copied, setCopied] = useState(false);

  const scoringPayload = JSON.stringify(
    { domain_scores: derived.domain_scores, explainability: derived.explainability, section_sources: (state as any).section_sources ?? {} },
    null, 2
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scoringPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const topTheme = themeAnalysis.themes[0] ?? null;

  // ─── Themes sub-view ───
  if (showThemes) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-4">
        <Button variant="outline" size="sm" onClick={() => setShowThemes(false)} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to dashboard
        </Button>
        <EmergingThemes analysis={themeAnalysis} onNavigateToSection={onNavigateToSection} />
      </div>
    );
  }

  // ─── Main dashboard ───
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setDevMode((d) => !d)}
          className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
            devMode ? "bg-primary/10 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border opacity-40 hover:opacity-100"
          }`}
        >Dev</button>
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to profile
        </Button>
      </div>

      {/* Dev tools */}
      {devMode && (
        <div className="flex gap-2 justify-start flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setShowPayload(true)} className="gap-1.5 text-xs border-dashed">
            <Bug className="w-3.5 h-3.5" /> Export Scoring Payload
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowEpisodeDebug(true)} className="gap-1.5 text-xs border-dashed">
            <Activity className="w-3.5 h-3.5" /> Episode Signal Debug
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowDiagnostics(true)} className="gap-1.5 text-xs border-dashed">
            <FlaskConical className="w-3.5 h-3.5" /> Scoring Diagnostics
          </Button>
          <Button variant="outline" size="sm" onClick={() => { loadState(createDevTestProfile()); }} className="gap-1.5 text-xs border-dashed">
            <Upload className="w-3.5 h-3.5" /> Load Test Profile
          </Button>
        </div>
      )}

      {/* Dev dialogs */}
      <Dialog open={showPayload} onOpenChange={setShowPayload}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-sm">Scoring Payload</DialogTitle>
            <DialogDescription className="text-xs">Developer-only export — no personal data included.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <pre className="flex-1 overflow-auto text-[11px] bg-muted p-3 rounded-md border border-border font-mono whitespace-pre-wrap break-words">{scoringPayload}</pre>
        </DialogContent>
      </Dialog>

      <EpisodeDebugDialog open={showEpisodeDebug} onOpenChange={setShowEpisodeDebug} signals={derived.signals} />
      <ScoringDiagnosticsDialog open={showDiagnostics} onOpenChange={setShowDiagnostics} domainScores={derived.domain_scores} />

      {/* 1. Identity Header — compact */}
      <ProfileIdentityHeader state={state} />

      {!hasContent ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">Start filling in sections to see your child's profile come to life here.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* 2. Stat cards row */}
          <StatCards state={state} getSectionStatus={getSectionStatus} topTheme={topTheme} />

          {/* 3. Profile Shape + Domain Bars — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileWheel state={state} onNavigateToSection={onNavigateToSection} />
            <DomainBars onNavigateToSection={onNavigateToSection} />
          </div>

          {/* 4. Detected Patterns + Next Steps — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PatternPreview analysis={themeAnalysis} onViewAll={() => setShowThemes(true)} />
            <ReadinessPanel
              state={state}
              getSectionStatus={getSectionStatus}
              onNavigateToSection={onNavigateToSection}
              onGenerateReport={onGenerateReport}
            />
          </div>

          {/* 5. Child Voice — compact strip */}
          <ChildVoicePanel state={state} onNavigateToSection={onNavigateToSection} />
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
  early_warning: "Early Warning", trigger: "Trigger", escalation: "Escalation", shutdown: "Shutdown", recovery: "Recovery",
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
          <DialogTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4" /> Episode Signal Debug</DialogTitle>
          <DialogDescription className="text-xs">Signals grouped by episode phase — developer view only.</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto space-y-4">
          <div className="text-xs bg-muted p-2 rounded-md border border-border space-y-1">
            <p><span className="font-medium">Detected patterns:</span> {analysis.detectedPatterns.length}</p>
            <p><span className="font-medium">Weak signals:</span> {analysis.weakSignals.length}</p>
            {analysis.weakSignals.map((ws, i) => (
              <p key={i} className="text-muted-foreground pl-2">→ {PHASE_LABELS[ws.phase]}: {ws.reason} ({ws.signalCount} signal{ws.signalCount !== 1 ? "s" : ""})</p>
            ))}
          </div>
          {PHASE_ORDER.map((phase) => {
            const sigs = byPhase.get(phase) || [];
            if (sigs.length === 0) return (
              <div key={phase} className="text-xs">
                <span className={`inline-flex px-1.5 py-0.5 rounded border text-[10px] font-medium ${PHASE_COLORS[phase]}`}>{PHASE_LABELS[phase]}</span>
                <span className="text-muted-foreground ml-2 italic">No signals mapped</span>
              </div>
            );
            return (
              <div key={phase} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-1.5 py-0.5 rounded border text-[10px] font-medium ${PHASE_COLORS[phase]}`}>{PHASE_LABELS[phase]}</span>
                  <span className="text-[10px] text-muted-foreground">{sigs.length} signal{sigs.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="ml-4 space-y-0.5">
                  {sigs.map((sig) => (
                    <div key={sig.id} className="flex items-center gap-2 text-[11px]">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sig.confirmed ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      <span className="flex-1 truncate">{sig.label}</span>
                      <span className="text-muted-foreground text-[10px]">{sig.domain}</span>
                      <span className="text-muted-foreground text-[10px]">{sig.sourceType}</span>
                      <span className={`text-[9px] px-1 rounded ${sig.confirmed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{sig.confirmed ? "✓" : "?"}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {unmapped.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex px-1.5 py-0.5 rounded border text-[10px] font-medium bg-muted text-muted-foreground border-border">No phase</span>
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

// ───────────────────────────────────────────────────
// Scoring Diagnostics Dialog (dev only)
// ───────────────────────────────────────────────────

import { DomainScores } from "@/lib/scoring-engine";
import { DOMAIN_KEYS as DIAG_DOMAIN_KEYS } from "@/config/signal-library";

interface ScoringDiagnosticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domainScores: Record<string, DomainScores>;
}

function ScoringDiagnosticsDialog({ open, onOpenChange, domainScores }: ScoringDiagnosticsDialogProps) {
  const report = useMemo(() => {
    if (!open) return null;
    return {
      distribution: getDomainDistribution(50),
      topSignals: getTopWeightedSignals(20),
      crossDomain: getCrossDomainSignals(),
      explainability: getExplainabilitySamples(domainScores),
      radars: generateSimulatedRadars(10),
    };
  }, [open, domainScores]);

  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-sm flex items-center gap-2"><FlaskConical className="w-4 h-4" /> Scoring Model Diagnostics</DialogTitle>
          <DialogDescription className="text-xs">Structural verification of scoring calibration, signal weights, and distribution.</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto space-y-6 text-xs">
          <section>
            <h3 className="font-semibold text-sm mb-2">1. Domain Distribution (50 simulated profiles)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1 px-2 font-medium">Domain</th>
                    <th className="text-center py-1 px-1 font-medium">Unk</th>
                    {[0,1,2,3,4].map((n) => <th key={n} className="text-center py-1 px-1 font-medium">{n}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {report.distribution.map((d) => (
                    <tr key={d.domain} className="border-b border-border/50">
                      <td className="py-1 px-2 truncate max-w-[120px]">{d.domain}</td>
                      <td className="text-center py-1 px-1 text-muted-foreground">{d.distribution.Unknown}</td>
                      {[0,1,2,3,4].map((n) => {
                        const count = d.distribution[String(n)];
                        const pct = count / 50;
                        return <td key={n} className="text-center py-1 px-1"><span className={pct > 0.5 ? "text-destructive font-semibold" : ""}>{count}</span></td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Red = more than 50% of profiles at that level (possible saturation).</p>
          </section>

          <section>
            <h3 className="font-semibold text-sm mb-2">2. Top 20 Weighted Signals</h3>
            <div className="space-y-0.5">
              {report.topSignals.map((sig, i) => (
                <div key={i} className="flex items-center gap-2 py-0.5">
                  <span className="text-muted-foreground w-4 text-right">{i + 1}.</span>
                  <span className={`px-1 rounded text-[9px] font-medium ${sig.isFreetext ? "bg-[hsl(var(--accent-amber-bg))] text-[hsl(var(--accent-amber))]" : "bg-[hsl(var(--accent-teal-bg))] text-[hsl(var(--accent-teal))]"}`}>
                    {sig.isFreetext ? "free" : "opt"} w{sig.weight}
                  </span>
                  <span className="flex-1 truncate">{sig.label}</span>
                  <span className="text-muted-foreground">{sig.domain}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-sm mb-2">3. Cross-Domain Signals</h3>
            {report.crossDomain.length === 0 ? (
              <p className="text-muted-foreground">No cross-domain signals defined.</p>
            ) : (
              <div className="space-y-0.5">
                {report.crossDomain.map((sig, i) => (
                  <div key={i} className="flex items-center gap-2 py-0.5">
                    <span className="flex-1 truncate">{sig.questionId}</span>
                    <span className="text-muted-foreground">{sig.primaryDomain} → {sig.crossDomains.join(", ")}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h3 className="font-semibold text-sm mb-2">4. Explainability Samples</h3>
            {report.explainability.map((sample) => (
              <div key={sample.domain} className="mb-3 border border-border rounded p-2">
                <p className="font-medium">{sample.domain}: {sample.sentence}</p>
              </div>
            ))}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
