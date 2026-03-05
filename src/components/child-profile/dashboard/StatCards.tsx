import { ChildProfileState, SectionStatus } from "@/contexts/ChildProfileContext";
import { countTotalAnswers, extractSectionCompletion, extractChildVoiceEntries, extractProfileDepth } from "@/lib/profile-dashboard-utils";
import { Card, CardContent } from "@/components/ui/card";
import type { StructuredTheme } from "@/lib/theme-engine";

interface Props {
  state: ChildProfileState;
  getSectionStatus: (index: number) => SectionStatus;
  topTheme?: StructuredTheme | null;
  totalSignals: number;
}

/** SVG semi-circle gauge */
function Gauge({ value, max, color = "hsl(var(--primary))" }: { value: number; max: number; color?: string }) {
  const size = 80;
  const sw = 6;
  const r = (size - sw) / 2;
  const circ = Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circ - pct * circ;

  return (
    <svg width={size} height={size / 2 + sw + 2} viewBox={`0 0 ${size} ${size / 2 + sw + 2}`} className="mx-auto">
      <path
        d={`M ${sw / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - sw / 2} ${size / 2}`}
        fill="none" stroke="hsl(var(--border))" strokeWidth={sw} strokeLinecap="round"
      />
      <path
        d={`M ${sw / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - sw / 2} ${size / 2}`}
        fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

/** SVG full ring */
function Ring({ value, max, size = 56, color = "hsl(var(--accent-teal))" }: { value: number; max: number; size?: number; color?: string }) {
  const sw = 5;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circ - pct * circ;

  return (
    <svg width={size} height={size} className="mx-auto transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

const CONFIDENCE_COLORS: Record<string, string> = {
  emerging: "bg-muted text-muted-foreground",
  developing: "bg-[hsl(var(--accent-amber-bg))] text-[hsl(var(--accent-amber))]",
  established: "bg-primary/15 text-primary",
};

export function StatCards({ state, getSectionStatus, topTheme, totalSignals }: Props) {
  const { answered, total } = countTotalAnswers(state);
  const completion = extractSectionCompletion(state, getSectionStatus);
  const childVoiceCount = extractChildVoiceEntries(state).length;
  const depth = extractProfileDepth(state);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Questions answered — big gauge */}
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-card to-card">
        <CardContent className="p-5 text-center space-y-0">
          <Gauge value={answered} max={total} />
          <p className="text-3xl font-bold text-foreground -mt-3 tracking-tight">
            {answered}
          </p>
          <p className="text-[11px] text-muted-foreground">
            of {total} questions answered
          </p>
        </CardContent>
      </Card>

      {/* Profile depth — ring with bold number */}
      <Card className="overflow-hidden border-0 shadow-md">
        <CardContent className="p-5 text-center space-y-0">
          <div className="relative w-14 h-14 mx-auto">
            <Ring value={depth} max={100} color="hsl(var(--primary))" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">{depth}%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mt-1 tracking-tight">
            {completion.completedCount}<span className="text-lg text-muted-foreground font-normal">/{completion.totalCount}</span>
          </p>
          <p className="text-[11px] text-muted-foreground">sections started</p>
        </CardContent>
      </Card>

      {/* Signals confirmed — bold count */}
      <Card className="overflow-hidden border-0 shadow-md">
        <CardContent className="p-5 text-center flex flex-col items-center justify-center h-full">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent-teal-bg))] flex items-center justify-center mb-1">
            <span className="text-lg font-bold text-[hsl(var(--accent-teal))]">{totalSignals}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">signals confirmed</p>
          {childVoiceCount > 0 && (
            <p className="text-[10px] text-[hsl(var(--accent-amber))] font-medium mt-1.5">
              {childVoiceCount} in child's voice
            </p>
          )}
        </CardContent>
      </Card>

      {/* Top theme */}
      <Card className="overflow-hidden border-0 shadow-md">
        <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
          {topTheme ? (
            <>
              <span className={`inline-flex text-[10px] px-2.5 py-0.5 rounded-full font-medium mb-1.5 ${CONFIDENCE_COLORS[topTheme.confidence] || CONFIDENCE_COLORS.emerging}`}>
                {topTheme.confidence}
              </span>
              <p className="text-sm font-bold text-foreground leading-tight line-clamp-2">{topTheme.theme}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{topTheme.totalSignalCount} signals</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-1.5">
                <span className="text-muted-foreground text-lg">?</span>
              </div>
              <p className="text-xs text-muted-foreground">No themes yet</p>
            </>
          )}
          <p className="text-[11px] text-muted-foreground mt-1">strongest theme</p>
        </CardContent>
      </Card>
    </div>
  );
}
