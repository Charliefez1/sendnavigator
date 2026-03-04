import { useState, useMemo } from "react";
import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { computeDerivedProfile, DomainScores } from "@/lib/scoring-engine";
import { DOMAIN_KEYS, DomainKey, INTENSITY_LABELS, SCORE_SCALE_MAX } from "@/config/signal-library";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Compass, Info, ChevronDown, ArrowRight } from "lucide-react";

type ViewMode = "evidence" | "intensity" | "confidence";

const VIEW_CONFIG: Record<ViewMode, { label: string; description: string }> = {
  evidence: { label: "Evidence", description: "How much data exists in each domain" },
  intensity: { label: "Intensity", description: "How strong the signals are in each domain" },
  confidence: { label: "Confidence", description: "How reliable the scoring is based on sources" },
};

interface Props {
  state: ChildProfileState;
  onNavigateToSection?: (index: number) => void;
}

const DOMAIN_SECTION_MAP: Record<string, number> = {
  Environment: 0,
  "Nervous System": 3,
  Sensory: 5,
  "Executive Function": 6,
  Masking: 9,
  Communication: 10,
  Behaviour: 11,
  Strengths: 13,
};

export function ProfileWheel({ state, onNavigateToSection }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("evidence");
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const derived = useMemo(() => computeDerivedProfile(state), [state]);

  const hasAnyScore = Object.values(derived.domains).some(
    (d) => d.evidence > 0 || (d.intensity !== null && d.intensity > 0)
  );

  const data = DOMAIN_KEYS.map((domain) => {
    const scores = derived.domains[domain];
    let value: number;
    if (viewMode === "intensity") {
      value = scores.intensity ?? 0;
    } else if (viewMode === "confidence") {
      value = scores.confidence;
    } else {
      value = scores.evidence;
    }
    return {
      domain,
      score: value,
      fullMark: SCORE_SCALE_MAX,
      isUnknown: viewMode === "intensity" && scores.intensity === null,
    };
  });

  function getScoreColor(score: number): string {
    if (score === 0) return "hsl(var(--muted-foreground) / 0.3)";
    if (score === 1) return "hsl(var(--status-discussed))";
    if (score === 2) return "hsl(var(--status-confirmed))";
    if (score === 3) return "hsl(var(--chart-4))";
    return "hsl(var(--primary))";
  }

  function getLabelForScore(score: number | null): string {
    if (score === null) return "Unknown";
    return INTENSITY_LABELS[score] || "None";
  }

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Compass className="w-4 h-4 text-primary" />
          Profile shape
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {VIEW_CONFIG[viewMode].description}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* View mode toggle */}
        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          {(Object.keys(VIEW_CONFIG) as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 text-xs py-1.5 px-2 rounded-md transition-colors font-medium ${
                viewMode === mode
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {VIEW_CONFIG[mode].label}
            </button>
          ))}
        </div>

        {/* Radar chart */}
        {hasAnyScore ? (
          <div className="w-full aspect-square max-w-[320px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="domain"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                />
                <Radar
                  name={VIEW_CONFIG[viewMode].label}
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  strokeDasharray={data.some((d) => d.isUnknown) ? "4 4" : undefined}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
            Start filling in sections to see your profile shape emerge
          </div>
        )}

        {/* Domain legend + scores */}
        <div className="space-y-0.5">
          {DOMAIN_KEYS.map((domain) => {
            const scores = derived.domains[domain];
            const sectionIndex = DOMAIN_SECTION_MAP[domain];
            const isExpanded = expandedDomain === domain;
            const displayScore = viewMode === "intensity" ? scores.intensity : viewMode === "confidence" ? scores.confidence : scores.evidence;

            return (
              <div key={domain} className="rounded-md">
                <button
                  onClick={() => setExpandedDomain(isExpanded ? null : domain)}
                  className="w-full flex items-center gap-2 text-xs text-left px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getScoreColor(displayScore ?? 0) }}
                  />
                  <span className="truncate text-foreground flex-1">{domain}</span>
                  <span className="text-muted-foreground text-[10px]">
                    {displayScore === null ? "Unknown" : getLabelForScore(displayScore)}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Explainability panel */}
                {isExpanded && (
                  <DomainExplainer
                    domain={domain}
                    scores={scores}
                    sectionIndex={sectionIndex}
                    onNavigateToSection={onNavigateToSection}
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ───────────────────────────────────────────────────
// Explainability sub-component
// ───────────────────────────────────────────────────

function DomainExplainer({
  domain,
  scores,
  sectionIndex,
  onNavigateToSection,
}: {
  domain: string;
  scores: DomainScores;
  sectionIndex: number;
  onNavigateToSection?: (index: number) => void;
}) {
  return (
    <div className="ml-4 mr-2 mb-2 p-3 bg-muted/50 rounded-lg space-y-2.5 text-xs border border-border/50">
      {/* Score summary */}
      <div className="grid grid-cols-3 gap-2">
        <ScorePill label="Intensity" value={scores.intensityLabel} />
        <ScorePill label="Evidence" value={scores.evidenceLabel} />
        <ScorePill label="Confidence" value={scores.confidenceLabel} />
      </div>

      {/* Why this score */}
      {scores.topSignals.length > 0 && (
        <div>
          <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Why this score
          </p>
          <ul className="space-y-1">
            {scores.topSignals.map((sig, i) => (
              <li key={i} className="flex items-start gap-1.5 text-foreground">
                <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="flex-1">{sig.label}</span>
                <span className="text-muted-foreground text-[10px] flex-shrink-0">
                  {sig.sourceType}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source breakdown */}
      {Object.keys(scores.sourceBreakdown).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(scores.sourceBreakdown).map(([type, count]) => (
            <span
              key={type}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-background text-muted-foreground border border-border text-[10px]"
            >
              {type}: {count}
            </span>
          ))}
        </div>
      )}

      {/* Improve this domain */}
      <button
        onClick={() => onNavigateToSection?.(sectionIndex)}
        className="flex items-center gap-1.5 text-primary hover:underline font-medium"
      >
        Improve this domain
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

function ScorePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{label}</p>
      <p className="text-foreground font-semibold text-[11px] mt-0.5">{value}</p>
    </div>
  );
}
