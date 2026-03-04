import { useState } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { DomainScores, ExplainableSignal } from "@/lib/scoring-engine";
import { DOMAIN_KEYS, DomainKey, INTENSITY_LABELS, SCORE_SCALE_MAX, DOMAIN_SECTION_MAP, ContextCategory } from "@/config/signal-library";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Compass, Info, ChevronDown, ArrowRight, Lightbulb } from "lucide-react";

type ViewMode = "evidence" | "intensity" | "confidence";

const VIEW_CONFIG: Record<ViewMode, { label: string; description: string }> = {
  evidence: { label: "Information", description: "Volume and breadth of information in each domain" },
  intensity: { label: "Impact", description: "Weighted profile impact based on severity signals" },
  confidence: { label: "Confidence", description: "Reliability based on source diversity and consistency" },
};

interface Props {
  state: ChildProfileState;
  onNavigateToSection?: (index: number) => void;
}

const CHIP_COLORS: Record<ContextCategory, string> = {
  theme: "bg-[hsl(var(--accent-violet-bg))] text-[hsl(var(--accent-violet))] border-[hsl(var(--accent-violet)/0.3)]",
  mechanism: "bg-[hsl(var(--accent-teal-bg))] text-[hsl(var(--accent-teal))] border-[hsl(var(--accent-teal)/0.3)]",
  context: "bg-[hsl(var(--accent-amber-bg))] text-[hsl(var(--accent-amber))] border-[hsl(var(--accent-amber)/0.3)]",
  source: "bg-[hsl(var(--accent-deep-blue-bg))] text-[hsl(var(--accent-deep-blue))] border-[hsl(var(--accent-deep-blue)/0.3)]",
};

const CHIP_LABELS: Record<ContextCategory, string> = {
  theme: "Theme",
  mechanism: "Mechanism",
  context: "Context",
  source: "Source",
};

export function ProfileWheel({ state, onNavigateToSection }: Props) {
  const { derived } = useChildProfile();
  const [viewMode, setViewMode] = useState<ViewMode>("evidence");
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const hasAnyScore = Object.values(derived.domain_scores).some(
    (d) => d.evidence > 0 || (d.intensity !== null && d.intensity > 0)
  );

  const data = DOMAIN_KEYS.map((domain) => {
    const scores = derived.domain_scores[domain];
    if (!scores) return { domain, score: 0, fullMark: SCORE_SCALE_MAX, isUnknown: false };
    let value: number;
    const isUnknown = (viewMode === "intensity" && scores.intensity === null);
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
      isUnknown,
    };
  });

  const hasUnknowns = data.some((d) => d.isUnknown);

  function getScoreColor(score: number, isUnknown?: boolean): string {
    if (isUnknown) return "hsl(var(--muted-foreground) / 0.2)";
    if (score === 0) return "hsl(var(--muted-foreground) / 0.3)";
    if (score === 1) return "hsl(var(--accent-teal))";
    if (score === 2) return "hsl(var(--accent-amber))";
    if (score === 3) return "hsl(var(--primary))";
    return "hsl(var(--destructive))";
  }

  function getLabelForScore(score: number | null, isUnknown?: boolean): string {
    if (isUnknown || score === null) return "Unknown";
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
          <div className="w-full aspect-square max-w-[320px] mx-auto relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="domain"
                  tick={({ x, y, payload }: any) => {
                    const entry = data.find((d) => d.domain === payload.value);
                    const isUnknown = entry?.isUnknown;
                    return (
                      <text
                        x={x}
                        y={y}
                        fill={isUnknown ? "hsl(var(--muted-foreground) / 0.4)" : "hsl(var(--muted-foreground))"}
                        fontSize={9}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontStyle={isUnknown ? "italic" : "normal"}
                      >
                        {payload.value}
                      </text>
                    );
                  }}
                />
                <Radar
                  name={VIEW_CONFIG[viewMode].label}
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  strokeDasharray={hasUnknowns ? "4 4" : undefined}
                />
              </RadarChart>
            </ResponsiveContainer>
            {hasUnknowns && viewMode === "intensity" && (
              <p className="text-[10px] text-muted-foreground text-center mt-1 italic">
                Dashed segments indicate domains with insufficient data
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
            Start filling in sections to see your profile shape emerge
          </div>
        )}

        {/* Domain legend + scores */}
        <div className="space-y-0.5">
          {DOMAIN_KEYS.map((domain) => {
            const scores = derived.domain_scores[domain];
            if (!scores) return null;
            const sectionIndex = DOMAIN_SECTION_MAP[domain];
            const isExpanded = expandedDomain === domain;
            const isUnknown = viewMode === "intensity" && scores.intensity === null;
            const displayScore = viewMode === "intensity" ? scores.intensity : viewMode === "confidence" ? scores.confidence : scores.evidence;

            return (
              <div key={domain} className="rounded-md">
                <button
                  onClick={() => setExpandedDomain(isExpanded ? null : domain)}
                  className={`w-full flex items-center gap-2 text-xs text-left px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${isUnknown ? "opacity-60" : ""}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${isUnknown ? "border border-dashed border-muted-foreground bg-transparent" : ""}`}
                    style={!isUnknown ? { backgroundColor: getScoreColor(displayScore ?? 0) } : undefined}
                  />
                  <span className={`truncate flex-1 ${isUnknown ? "text-muted-foreground italic" : "text-foreground"}`}>{domain}</span>
                  <span className="text-muted-foreground text-[10px]">
                    {isUnknown ? "Unknown" : getLabelForScore(displayScore)}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <DomainExplainer
                    domain={domain as DomainKey}
                    scores={scores}
                    sectionIndex={sectionIndex}
                    onNavigateToSection={onNavigateToSection}
                    confidenceHint={derived.explainability?.[domain]?.confidenceHint}
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
  confidenceHint,
}: {
  domain: DomainKey;
  scores: DomainScores;
  sectionIndex: number;
  onNavigateToSection?: (index: number) => void;
  confidenceHint?: string;
}) {
  const isUnknown = scores.intensity === null;

  return (
    <div className="ml-4 mr-2 mb-2 p-3 bg-muted/50 rounded-lg space-y-2.5 text-xs border border-border/50">
      {/* Unknown banner */}
      {isUnknown && (
        <div className="flex items-center gap-2 bg-muted/80 border border-border rounded p-2 text-muted-foreground">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <p className="text-[11px]">Not enough information yet. Add more detail to this section to generate a score.</p>
        </div>
      )}

      {/* Score summary */}
      <div className="grid grid-cols-3 gap-2">
        <ScorePill label="Impact" value={scores.intensityLabel} muted={isUnknown} />
        <ScorePill label="Information" value={scores.evidenceLabel} />
        <ScorePill label="Confidence" value={scores.confidenceLabel} />
      </div>

      {/* Why this score */}
      {scores.topSignals.length > 0 && (
        <div>
          <p className="text-muted-foreground font-medium mb-1.5 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Why this score
          </p>
          <ul className="space-y-1.5">
            {scores.topSignals.map((sig, i) => (
              <li key={i} className="flex items-start gap-1.5 text-foreground">
                <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="flex-1">{sig.label}</span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {sig.contextCategory && (
                    <SignalChip category={sig.contextCategory} />
                  )}
                  <span className="text-muted-foreground text-[10px]">
                    {sig.sourceType}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source breakdown chips */}
      {Object.keys(scores.sourceBreakdown).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(scores.sourceBreakdown).map(([type, count]) => (
            <span
              key={type}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] border ${CHIP_COLORS.source}`}
            >
              {type}: {count}
            </span>
          ))}
        </div>
      )}

      {/* What would increase confidence */}
      {confidenceHint && scores.confidence < 3 && (
        <div className="flex items-start gap-1.5 text-muted-foreground bg-background/80 rounded p-2 border border-border/30">
          <Lightbulb className="w-3 h-3 mt-0.5 text-[hsl(var(--accent-amber))] flex-shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider font-medium text-[hsl(var(--accent-amber))] mb-0.5">Increase confidence</p>
            <p className="text-foreground/80">{confidenceHint}</p>
          </div>
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

function SignalChip({ category }: { category: ContextCategory }) {
  return (
    <span
      className={`inline-flex px-1 py-0 rounded text-[9px] font-medium border ${CHIP_COLORS[category]}`}
    >
      {CHIP_LABELS[category]}
    </span>
  );
}

function ScorePill({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{label}</p>
      <p className={`font-semibold text-[11px] mt-0.5 ${muted ? "text-muted-foreground italic" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
