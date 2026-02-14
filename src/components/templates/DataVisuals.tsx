/**
 * Reusable data visualisation components for the SEND Navigator.
 * All use semantic design tokens from index.css.
 */

import { type LucideIcon } from "lucide-react";

// =============================================================================
// STAT CARD - Big number with label
// =============================================================================

interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
  accentColor?: "primary" | "confirmed" | "discussed" | "unconfirmed";
}

const accentMap = {
  primary: "border-t-primary",
  confirmed: "border-t-[hsl(var(--status-confirmed))]",
  discussed: "border-t-[hsl(var(--status-discussed))]",
  unconfirmed: "border-t-[hsl(var(--status-unconfirmed))]",
};

export function StatCard({ value, label, sublabel, icon: Icon, accentColor = "primary" }: StatCardProps) {
  return (
    <div className={`bg-card border border-border rounded-lg p-4 sm:p-5 border-t-[3px] ${accentMap[accentColor]} shadow-lg`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-muted flex-shrink-0">
            <Icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          </div>
        )}
        <div>
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight">
            {value}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{label}</p>
          {sublabel && (
            <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// PERCENTAGE RING - Circular progress indicator
// =============================================================================

interface PercentageRingProps {
  percentage: number;
  label: string;
  sublabel?: string;
  size?: number;
  color?: "primary" | "confirmed" | "discussed" | "unconfirmed";
}

const ringColorMap = {
  primary: "hsl(var(--primary))",
  confirmed: "hsl(var(--status-confirmed))",
  discussed: "hsl(var(--status-discussed))",
  unconfirmed: "hsl(var(--status-unconfirmed))",
};

const trackColor = "hsl(var(--border))";

export function PercentageRing({ percentage, label, sublabel, size = 100, color = "primary" }: PercentageRingProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColorMap[color]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-display font-bold text-foreground">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  );
}

// =============================================================================
// HORIZONTAL BAR CHART - Simple labelled bars
// =============================================================================

interface BarItem {
  label: string;
  value: number;
  displayValue: string;
  color?: "primary" | "confirmed" | "discussed" | "unconfirmed";
}

interface HorizontalBarChartProps {
  items: BarItem[];
  title?: string;
}

const barColorMap = {
  primary: "bg-primary",
  confirmed: "bg-[hsl(var(--status-confirmed))]",
  discussed: "bg-[hsl(var(--status-discussed))]",
  unconfirmed: "bg-[hsl(var(--status-unconfirmed))]",
};

export function HorizontalBarChart({ items, title }: HorizontalBarChartProps) {
  const maxValue = Math.max(...items.map((i) => i.value));

  return (
    <div className="space-y-3">
      {title && <p className="text-sm font-medium text-foreground">{title}</p>}
      {items.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-foreground">{item.displayValue}</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${barColorMap[item.color || "primary"]}`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// TIER DIAGRAM - Vertical tier/pyramid visualisation
// =============================================================================

interface TierItem {
  tier: string;
  title: string;
  description: string;
  color: "confirmed" | "discussed" | "unconfirmed" | "primary";
}

interface TierDiagramProps {
  tiers: TierItem[];
  title?: string;
  note?: string;
}

const tierBgMap = {
  primary: "bg-primary/10 border-primary/30",
  confirmed: "bg-[hsl(var(--status-confirmed-bg))] border-[hsl(var(--status-confirmed-border))]",
  discussed: "bg-[hsl(var(--status-discussed-bg))] border-[hsl(var(--status-discussed-border))]",
  unconfirmed: "bg-[hsl(var(--status-unconfirmed-bg))] border-[hsl(var(--status-unconfirmed-border))]",
};

const tierTextMap = {
  primary: "text-primary",
  confirmed: "text-[hsl(var(--status-confirmed))]",
  discussed: "text-[hsl(var(--status-discussed))]",
  unconfirmed: "text-[hsl(var(--status-unconfirmed))]",
};

export function TierDiagram({ tiers, title, note }: TierDiagramProps) {
  return (
    <div className="space-y-3">
      {title && <p className="text-sm font-medium text-foreground mb-2">{title}</p>}
      <div className="space-y-2">
        {tiers.map((tier, index) => {
          // Progressively wider to create a funnel/pyramid effect
          const widthPercent = 50 + ((index / (tiers.length - 1)) * 50);
          return (
            <div
              key={index}
              className="mx-auto"
              style={{ width: `${widthPercent}%`, minWidth: "200px", maxWidth: "100%" }}
            >
              <div className={`border rounded-lg p-3 sm:p-4 ${tierBgMap[tier.color]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold uppercase tracking-wide ${tierTextMap[tier.color]}`}>
                    {tier.tier}
                  </span>
                  <span className="text-sm font-medium text-foreground">{tier.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {note && (
        <p className="text-xs text-muted-foreground italic text-center mt-3">{note}</p>
      )}
    </div>
  );
}

// =============================================================================
// COMPARISON COLUMNS - Side-by-side before/after
// =============================================================================

interface ComparisonItem {
  label: string;
}

interface ComparisonColumnsProps {
  leftTitle: string;
  rightTitle: string;
  leftItems: ComparisonItem[];
  rightItems: ComparisonItem[];
  leftColor?: "confirmed" | "discussed";
  rightColor?: "discussed" | "unconfirmed";
}

export function ComparisonColumns({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  leftColor = "confirmed",
  rightColor = "discussed",
}: ComparisonColumnsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className={`border rounded-lg p-4 ${tierBgMap[leftColor]}`}>
        <h4 className={`text-sm font-semibold mb-3 ${tierTextMap[leftColor]}`}>{leftTitle}</h4>
        <ul className="space-y-2">
          {leftItems.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={`border rounded-lg p-4 ${tierBgMap[rightColor]}`}>
        <h4 className={`text-sm font-semibold mb-3 ${tierTextMap[rightColor]}`}>{rightTitle}</h4>
        <ul className="space-y-2">
          {rightItems.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-muted-foreground mt-1">•</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// =============================================================================
// RIGHTS CHECKLIST - Visual checklist with status icons
// =============================================================================

import { CheckCircle } from "lucide-react";

interface RightsChecklistProps {
  items: string[];
  title?: string;
}

export function RightsChecklist({ items, title }: RightsChecklistProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-5 shadow-lg">
      {title && <p className="text-sm font-medium text-foreground mb-3">{title}</p>}
      <div className="space-y-2.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color: "hsl(var(--status-confirmed))" }}
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
