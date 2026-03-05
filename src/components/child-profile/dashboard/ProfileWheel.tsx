import { useState } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { DOMAIN_KEYS, INTENSITY_LABELS, SCORE_SCALE_MAX } from "@/config/signal-library";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Compass } from "lucide-react";

type ViewMode = "evidence" | "intensity" | "confidence";

const VIEW_CONFIG: Record<ViewMode, { label: string; description: string }> = {
  evidence: { label: "Detail", description: "How much information has been provided in each area" },
  intensity: { label: "Impact", description: "How strongly each area appears to affect your child" },
  confidence: { label: "Reliability", description: "How reliable each area's score is, based on the range of sources" },
};

interface Props {
  state: ChildProfileState;
  onNavigateToSection?: (index: number) => void;
}

export function ProfileWheel({ state, onNavigateToSection }: Props) {
  const { derived } = useChildProfile();
  const [viewMode, setViewMode] = useState<ViewMode>("evidence");

  const hasAnyScore = Object.values(derived.domain_scores).some(
    (d) => d.evidence > 0 || (d.intensity !== null && d.intensity > 0)
  );

  const data = DOMAIN_KEYS.map((domain) => {
    const scores = derived.domain_scores[domain];
    if (!scores) return { domain, score: 0, fullMark: SCORE_SCALE_MAX, isUnknown: false, lowConfidence: false };
    const isUnknown = viewMode === "intensity" && scores.intensity === null;
    let value: number;
    if (viewMode === "intensity") value = scores.intensity ?? 0;
    else if (viewMode === "confidence") value = scores.confidence;
    else value = scores.evidence;
    return { domain, score: value, fullMark: SCORE_SCALE_MAX, isUnknown, lowConfidence: scores.confidence < 2 && scores.evidence > 0 };
  });

  const hasUnknowns = data.some((d) => d.isUnknown);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Compass className="w-4 h-4 text-primary" />
          Profile shape
        </CardTitle>
        <p className="text-xs text-muted-foreground">{VIEW_CONFIG[viewMode].description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* View mode toggle */}
        <div className="flex gap-1 bg-muted rounded-lg p-0.5 max-w-xs">
          {(Object.keys(VIEW_CONFIG) as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 text-xs py-1.5 px-2 rounded-md transition-colors font-medium ${
                viewMode === mode ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {VIEW_CONFIG[mode].label}
            </button>
          ))}
        </div>

        {hasAnyScore ? (
          <div className="w-full aspect-square max-w-[260px] mx-auto relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="domain"
                  tick={({ x, y, payload }: any) => {
                    const entry = data.find((d) => d.domain === payload.value);
                    return (
                      <text
                        x={x} y={y}
                        fill={entry?.isUnknown ? "hsl(var(--muted-foreground) / 0.4)" : entry?.lowConfidence ? "hsl(var(--muted-foreground) / 0.6)" : "hsl(var(--muted-foreground))"}
                        fontSize={8} textAnchor="middle" dominantBaseline="central"
                        fontStyle={entry?.isUnknown ? "italic" : "normal"}
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
              <p className="text-[10px] text-muted-foreground text-center mt-1 italic">Dashed areas need more information</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
            Start filling in sections to see your profile shape
          </div>
        )}
      </CardContent>
    </Card>
  );
}
