import { CheckCircle, Clock, HelpCircle } from "lucide-react";

type MilestoneType = "confirmed" | "upcoming" | "uncertain";

interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  type: MilestoneType;
}

interface VisualTimelineProps {
  milestones: TimelineMilestone[];
}

const dotStyles: Record<MilestoneType, string> = {
  confirmed: "bg-[hsl(var(--timeline-completed))]",
  upcoming: "bg-[hsl(var(--timeline-upcoming))]",
  uncertain: "bg-[hsl(var(--timeline-uncertain))]",
};

const cardStyles: Record<MilestoneType, string> = {
  confirmed: "border-l-[3px] border-l-[hsl(var(--timeline-completed))]",
  upcoming: "border-l-[3px] border-l-[hsl(var(--timeline-upcoming))]",
  uncertain: "border-l-[3px] border-l-[hsl(var(--timeline-uncertain))]",
};

const labelStyles: Record<MilestoneType, { text: string; bg: string }> = {
  confirmed: {
    text: "text-[hsl(var(--timeline-completed))]",
    bg: "bg-[hsl(var(--timeline-completed-bg))]",
  },
  upcoming: {
    text: "text-[hsl(var(--timeline-upcoming))]",
    bg: "bg-[hsl(var(--timeline-upcoming-bg))]",
  },
  uncertain: {
    text: "text-[hsl(var(--timeline-uncertain))]",
    bg: "bg-[hsl(var(--timeline-uncertain-bg))]",
  },
};

const icons: Record<MilestoneType, typeof CheckCircle> = {
  confirmed: CheckCircle,
  upcoming: Clock,
  uncertain: HelpCircle,
};

const labels: Record<MilestoneType, string> = {
  confirmed: "Confirmed",
  upcoming: "Expected",
  uncertain: "Uncertain",
};

export function VisualTimeline({ milestones }: VisualTimelineProps) {
  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        {(["confirmed", "upcoming", "uncertain"] as MilestoneType[]).map((type) => (
          <div key={type} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${dotStyles[type]}`} />
            <span className="text-muted-foreground">{labels[type]}</span>
          </div>
        ))}
      </div>

      {/* "Now" marker calculation — find the index where upcoming starts */}
      {(() => {
        const nowIndex = milestones.findIndex((m) => m.type !== "confirmed");
        return (
          <div className="relative ml-4 sm:ml-6">
            {/* Vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-border"
              aria-hidden="true"
            />

            {milestones.map((milestone, index) => {
              const Icon = icons[milestone.type];
              const isNowMarker = index === nowIndex;

              return (
                <div key={index}>
                  {/* "Now" marker */}
                  {isNowMarker && (
                    <div className="relative flex items-center gap-3 py-3">
                      <div className="absolute left-0 -translate-x-1/2 w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10">
                        <span className="block w-2 h-2 rounded-full bg-primary-foreground" />
                      </div>
                      <div className="ml-8 sm:ml-10">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                          We are here. February 2026
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Milestone */}
                  <div className="relative flex items-start gap-3 pb-6 last:pb-0">
                    {/* Dot */}
                    <div
                      className={`absolute left-0 -translate-x-1/2 mt-1.5 w-3.5 h-3.5 rounded-full ${dotStyles[milestone.type]} ring-[3px] ring-background z-10`}
                      aria-hidden="true"
                    />

                    {/* Card */}
                    <div
                      className={`ml-8 sm:ml-10 flex-1 bg-card border border-border rounded-lg p-4 ${cardStyles[milestone.type]}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          {milestone.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground font-medium">
                            {milestone.date}
                          </span>
                          <span
                            className={`text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-1 ${labelStyles[milestone.type].text} ${labelStyles[milestone.type].bg}`}
                          >
                            <Icon className="w-3 h-3" aria-hidden="true" />
                            {labels[milestone.type]}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}
