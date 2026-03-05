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

  // Ring
  const size = 48;
  const sw = 5;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (depth / 100) * circ;

  return (
    <div className="flex items-center gap-4 py-2">
      {/* Depth ring */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={sw} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="hsl(var(--primary))" strokeWidth={sw}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-bold text-foreground">{depth}%</span>
        </div>
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-display font-bold text-foreground leading-tight truncate">
          {overview.childName ? `${childName}'s Profile` : "Your Child's Profile"}
        </h1>
        {overview.reason && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{overview.reason}</p>
        )}
      </div>

      {/* Pills */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {overview.filledBy && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted rounded-full px-2.5 py-1">
            <User className="w-3 h-3" />
            {overview.filledBy}
          </span>
        )}
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted rounded-full px-2.5 py-1">
          <FileText className="w-3 h-3" />
          {mode}
        </span>
      </div>
    </div>
  );
}
