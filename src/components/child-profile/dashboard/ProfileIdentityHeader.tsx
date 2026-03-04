import { extractChildOverview, extractProfileDepth } from "@/lib/profile-dashboard-utils";
import { ChildProfileState } from "@/contexts/ChildProfileContext";
import { ReportMode } from "@/config/mini-profile-sections";
import { User, FileText } from "lucide-react";

interface Props {
  state: ChildProfileState;
}

export function ProfileIdentityHeader({ state }: Props) {
  const overview = extractChildOverview(state);
  const depth = extractProfileDepth(state);
  const childName = overview.childName || "Your child";
  const mode = state.reportMode === "mini" ? "Mini" : "Full";

  // SVG ring parameters
  const size = 72;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (depth / 100) * circumference;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/60 dark:border-amber-800/40 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Depth ring */}
        <div className="relative flex-shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">{depth}%</span>
          </div>
        </div>

        {/* Identity info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
            {overview.childName ? `${childName}'s Profile` : "Your Child's Profile"}
          </h1>
          {overview.reason && (
            <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
              {overview.reason}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {overview.filledBy && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-background/60 rounded-full px-3 py-1">
                <User className="w-3 h-3" />
                {overview.filledBy}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-background/60 rounded-full px-3 py-1">
              <FileText className="w-3 h-3" />
              {mode} report
            </span>
            <span className="text-xs text-muted-foreground">
              Profile depth — not just completion, but quality of detail
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
