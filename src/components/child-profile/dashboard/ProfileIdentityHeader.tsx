import { extractChildOverview, extractProfileDepth } from "@/lib/profile-dashboard-utils";
import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { User, FileText } from "lucide-react";

interface Props {
  state: ChildProfileState;
}

export function ProfileIdentityHeader({ state }: Props) {
  const overview = extractChildOverview(state);
  const depth = extractProfileDepth(state);
  const childName = overview.childName || "Your child";
  const mode = state.reportMode === "mini" ? "Mini" : "Full";

  // Compact inline ring
  const size = 40;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (depth / 100) * circumference;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Depth ring */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke="hsl(var(--primary))" strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-foreground">{depth}%</span>
        </div>
      </div>

      {/* Name + pills */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-display font-bold text-foreground leading-tight truncate">
          {overview.childName ? `${childName}'s Profile` : "Your Child's Profile"}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {overview.filledBy && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">
            <User className="w-3 h-3" />
            {overview.filledBy}
          </span>
        )}
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">
          <FileText className="w-3 h-3" />
          {mode} report
        </span>
      </div>
    </div>
  );
}
