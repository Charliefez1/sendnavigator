import { extractDomainScores } from "@/lib/profile-dashboard-utils";
import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Compass } from "lucide-react";

interface Props {
  state: ChildProfileState;
  onNavigateToSection?: (index: number) => void;
}

export function ProfileWheel({ state, onNavigateToSection }: Props) {
  const scores = extractDomainScores(state);

  const data = scores.map((s) => ({
    domain: s.domain,
    score: s.score,
    fullMark: 3,
    sectionIndex: s.sectionIndex,
  }));

  const hasAnyScore = scores.some((s) => s.score > 0);

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Compass className="w-4 h-4 text-primary" />
          Profile shape
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          See where you have gone deep and where gaps remain
        </p>
      </CardHeader>
      <CardContent>
        {hasAnyScore ? (
          <div className="w-full aspect-square max-w-[320px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="domain"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <Radar
                  name="Depth"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
            Start filling in sections to see your profile shape emerge
          </div>
        )}

        {/* Legend / clickable domains */}
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {scores.map((s) => (
            <button
              key={s.sectionIndex}
              onClick={() => onNavigateToSection?.(s.sectionIndex)}
              className="flex items-center gap-2 text-xs text-left px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    s.score === 0
                      ? "hsl(var(--muted-foreground) / 0.3)"
                      : s.score === 1
                      ? "hsl(var(--status-discussed))"
                      : s.score === 2
                      ? "hsl(var(--status-confirmed))"
                      : "hsl(var(--primary))",
                }}
              />
              <span className="truncate text-foreground">{s.domain}</span>
              <span className="ml-auto text-muted-foreground">{s.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
