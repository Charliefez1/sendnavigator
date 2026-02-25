import { CheckCircle, Clock, HelpCircle, Calendar } from "lucide-react";
import type { 
  CurrentPosition, 
  TimelineMilestone, 
  UpcomingDecisionPoint, 
  LongerTermPossibility,
  WhatChangedEntry 
} from "@/config/timeline";

// =============================================================================
// CURRENT POSITION SECTION
// =============================================================================

interface CurrentPositionSectionProps {
  data: CurrentPosition;
}

export function CurrentPositionSection({ data }: CurrentPositionSectionProps) {
  return (
    <section className="content-section py-8 border-b border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-display font-semibold text-foreground">
          Current position
        </h2>
      </div>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {data.summary}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <CheckCircle 
              className="w-4 h-4" 
              style={{ color: "hsl(var(--timeline-completed))" }}
              aria-hidden="true" 
            />
            In force today
          </h3>
          <ul className="space-y-2">
            {data.inForceToday.map((item, index) => (
              <li 
                key={index} 
                className="text-sm text-muted-foreground pl-4"
                style={{ borderLeft: "2px solid hsl(var(--status-confirmed-border))" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            Not changing yet
          </h3>
          <ul className="space-y-2">
            {data.notChangingYet.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-border">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// COMPLETED MILESTONES SECTION
// =============================================================================

interface CompletedMilestonesSectionProps {
  milestones: TimelineMilestone[];
}

export function CompletedMilestonesSection({ milestones }: CompletedMilestonesSectionProps) {
  if (milestones.length === 0) return null;

  return (
    <section className="content-section py-8 border-b border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(var(--timeline-completed-bg))" }}>
          <CheckCircle 
            className="w-4 h-4" 
            style={{ color: "hsl(var(--timeline-completed))" }}
            aria-hidden="true" 
          />
        </div>
        <h2 className="text-base font-display font-semibold text-foreground">
          Completed milestones
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Past consultations, published plans, and announced decisions.
      </p>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div 
            key={milestone.id}
            className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-4"
          >
            <div className="sm:w-32 flex-shrink-0">
              <span className="text-sm font-medium text-primary">
                {milestone.monthYear}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">
                {milestone.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {milestone.explanation}
              </p>
              {milestone.source && (
                <p className="text-xs text-muted-foreground mt-2">
                  Source: {milestone.source}
                </p>
              )}
            </div>
            <div className="sm:w-24 flex-shrink-0 flex sm:justify-end">
              <span 
                className="text-xs font-medium px-2 py-1 rounded h-fit"
                style={{ 
                  color: "hsl(var(--timeline-completed))",
                  backgroundColor: "hsl(var(--timeline-completed-bg))"
                }}
              >
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// UPCOMING DECISION POINTS SECTION
// =============================================================================

interface UpcomingDecisionPointsSectionProps {
  decisionPoints: UpcomingDecisionPoint[];
}

export function UpcomingDecisionPointsSection({ decisionPoints }: UpcomingDecisionPointsSectionProps) {
  if (decisionPoints.length === 0) return null;

  return (
    <section className="content-section py-8 border-b border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(var(--timeline-upcoming-bg))" }}>
          <Clock 
            className="w-4 h-4" 
            style={{ color: "hsl(var(--timeline-upcoming))" }}
            aria-hidden="true" 
          />
        </div>
        <h2 className="text-base font-display font-semibold text-foreground">
          Upcoming decision points
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Confirmed consultations, announced plans, and known parliamentary stages. 
        We avoid speculative dates and use ranges where appropriate.
      </p>

      <div className="space-y-6">
        {decisionPoints.map((point) => (
          <div 
            key={point.id}
            className="bg-card border border-border rounded-lg p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
              <h3 className="font-medium text-foreground">
                {point.title}
              </h3>
              {point.estimatedTiming && (
                <span 
                  className="text-xs font-medium px-2 py-1 rounded h-fit w-fit"
                  style={{ 
                    color: "hsl(var(--timeline-upcoming))",
                    backgroundColor: "hsl(var(--timeline-upcoming-bg))"
                  }}
                >
                  {point.estimatedTiming}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              <strong>Why it matters:</strong> {point.whyItMatters}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  What could change
                </h4>
                <ul className="space-y-1">
                  {point.whatCouldChange.map((item, index) => (
                    <li 
                      key={index} 
                      className="text-sm text-muted-foreground pl-3"
                      style={{ borderLeft: "2px solid hsl(var(--status-discussed-border))" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  What could stay the same
                </h4>
                <ul className="space-y-1">
                  {point.whatCouldStaySame.map((item, index) => (
                    <li 
                      key={index} 
                      className="text-sm text-muted-foreground pl-3"
                      style={{ borderLeft: "2px solid hsl(var(--status-confirmed-border))" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// LONGER TERM POSSIBILITIES SECTION
// =============================================================================

interface LongerTermPossibilitiesSectionProps {
  possibilities: LongerTermPossibility[];
}

export function LongerTermPossibilitiesSection({ possibilities }: LongerTermPossibilitiesSectionProps) {
  if (possibilities.length === 0) return null;

  return (
    <section className="content-section py-8 border-b border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-base font-display font-semibold text-foreground">
          Longer term possibilities
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        Areas under review, proposals under discussion, and potential reform directions.
      </p>
      <p 
        className="text-sm rounded-lg px-3 py-2 mb-6 border"
        style={{ 
          color: "hsl(var(--timeline-upcoming))",
          backgroundColor: "hsl(var(--timeline-upcoming-bg))",
          borderColor: "hsl(var(--status-discussed-border))"
        }}
      >
        These are possibilities, not predictions. No decisions have been made on these items.
      </p>

      <div className="space-y-4">
        {possibilities.map((possibility) => (
          <div 
            key={possibility.id}
            className="bg-muted/30 border border-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-foreground">
                {possibility.title}
              </h3>
              <span 
                className="text-xs font-medium px-2 py-1 rounded h-fit"
                style={{ 
                  color: "hsl(var(--timeline-uncertain))",
                  backgroundColor: "hsl(var(--timeline-uncertain-bg))"
                }}
              >
                Uncertain
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {possibility.description}
            </p>
            <p className="text-sm text-muted-foreground italic border-l-2 border-muted pl-3">
              {possibility.uncertaintyNote}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// WHAT CHANGED SECTION
// =============================================================================

interface WhatChangedSectionProps {
  changes: WhatChangedEntry[];
  lastUpdated: string;
  nothingChanged?: boolean;
}

export function WhatChangedSection({ changes, lastUpdated, nothingChanged }: WhatChangedSectionProps) {
  return (
    <section className="content-section py-8 border-b border-border bg-muted/20">
      <h2 className="text-base font-display font-semibold text-foreground mb-3">
        What has changed since the last update
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Last updated: {lastUpdated}
      </p>

      {nothingChanged ? (
        <p className="text-sm text-muted-foreground italic">
          No substantive changes have been made since the previous update. 
          This page has been reviewed and remains accurate.
        </p>
      ) : (
        <ul className="space-y-2">
          {changes.map((change, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                {change.description}
                {change.isNew && (
                  <span 
                    className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded"
                    style={{ 
                      color: "hsl(var(--timeline-new))",
                      backgroundColor: "hsl(var(--timeline-new-bg))"
                    }}
                  >
                    New
                  </span>
                )}
                {change.replacesPrevious && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (replaces: {change.replacesPrevious})
                  </span>
                )}
                {change.clarifiesExisting && (
                  <span 
                    className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded"
                    style={{ 
                      color: "hsl(var(--timeline-clarification))",
                      backgroundColor: "hsl(var(--timeline-clarification-bg))"
                    }}
                  >
                    Clarification
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
