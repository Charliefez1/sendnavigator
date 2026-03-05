import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { countTotalAnswers, extractSectionCompletion, extractChildVoiceEntries } from "@/lib/profile-dashboard-utils";
import { SectionStatus } from "@/contexts/ChildProfileContext";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareHeart, ListChecks, HelpCircle, Sparkles } from "lucide-react";
import type { StructuredTheme } from "@/lib/theme-engine";

interface Props {
  state: ChildProfileState;
  getSectionStatus: (index: number) => SectionStatus;
  topTheme?: StructuredTheme | null;
}

/** SVG arc gauge (semi-circle) */
function ArcGauge({ value, max, size = 64 }: { value: number; max: number; size?: number }) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // half-circle
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circumference - pct * circumference;

  return (
    <svg width={size} height={size / 2 + strokeWidth} className="mx-auto" viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
      <path
        d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

/** SVG ring (full circle) */
function Ring({ value, max, size = 48 }: { value: number; max: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circumference - pct * circumference;

  return (
    <svg width={size} height={size} className="mx-auto transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--accent-teal))"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

const CONFIDENCE_COLORS: Record<string, string> = {
  emerging: "bg-muted text-muted-foreground",
  developing: "bg-accent text-accent-foreground",
  established: "bg-primary/10 text-primary",
};

export function StatCards({ state, getSectionStatus, topTheme }: Props) {
  const { answered, total } = countTotalAnswers(state);
  const completion = extractSectionCompletion(state, getSectionStatus);
  const childVoiceCount = extractChildVoiceEntries(state).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Questions answered */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 text-center space-y-1">
          <ArcGauge value={answered} max={total} />
          <p className="text-lg font-bold text-foreground">{answered}<span className="text-sm font-normal text-muted-foreground">/{total}</span></p>
          <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            <HelpCircle className="w-3 h-3" />
            Questions answered
          </p>
        </CardContent>
      </Card>

      {/* Sections completed */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 text-center space-y-1">
          <div className="relative w-12 h-12 mx-auto">
            <Ring value={completion.completedCount} max={completion.totalCount} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-foreground">{completion.percentage}%</span>
            </div>
          </div>
          <p className="text-lg font-bold text-foreground">{completion.completedCount}<span className="text-sm font-normal text-muted-foreground">/{completion.totalCount}</span></p>
          <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            <ListChecks className="w-3 h-3" />
            Sections started
          </p>
        </CardContent>
      </Card>

      {/* Child voice */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 text-center space-y-1">
          <MessageSquareHeart className="w-8 h-8 text-amber-500 mx-auto" />
          <p className="text-lg font-bold text-foreground">{childVoiceCount}</p>
          <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            <MessageSquareHeart className="w-3 h-3" />
            Child voice quotes
          </p>
        </CardContent>
      </Card>

      {/* Top theme */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 text-center space-y-1">
          <Sparkles className="w-8 h-8 text-primary mx-auto" />
          {topTheme ? (
            <>
              <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{topTheme.theme}</p>
              <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full ${CONFIDENCE_COLORS[topTheme.confidence] || CONFIDENCE_COLORS.emerging}`}>
                {topTheme.confidence}
              </span>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">No themes detected yet</p>
          )}
          <p className="text-[11px] text-muted-foreground">Top theme</p>
        </CardContent>
      </Card>
    </div>
  );
}
