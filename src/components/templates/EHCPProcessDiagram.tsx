import { cn } from "@/lib/utils";
import { CheckCircle, Clock, FileText, Users, Search, ClipboardCheck, School, RefreshCw } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Identification at school",
    description: "SENCO identifies needs and provides SEN Support using the graduated approach: Assess, Plan, Do, Review.",
    icon: Search,
    timing: "Ongoing",
    color: "confirmed" as const,
  },
  {
    number: 2,
    title: "Request for assessment",
    description: "Parent, school, or young person (16+) requests an EHC needs assessment from the local authority in writing.",
    icon: FileText,
    timing: "LA has 6 weeks to decide",
    color: "confirmed" as const,
  },
  {
    number: 3,
    title: "Decision to assess",
    description: "The LA decides whether the legal test is met: the child may have SEN and may need an EHCP. About 24% of requests are refused at this stage.",
    icon: ClipboardCheck,
    timing: "Within 6 weeks of request",
    color: "discussed" as const,
  },
  {
    number: 4,
    title: "Multi-agency assessment",
    description: "Educational psychologist, medical, social care, and specialist reports are gathered. Parents provide their views and evidence.",
    icon: Users,
    timing: "Advice within ~6 weeks",
    color: "discussed" as const,
  },
  {
    number: 5,
    title: "Decision to issue",
    description: "LA decides whether to issue an EHCP. About 95% of completed assessments result in a plan being issued.",
    icon: CheckCircle,
    timing: "Around week 16",
    color: "discussed" as const,
  },
  {
    number: 6,
    title: "Draft EHCP issued",
    description: "Parents receive a draft plan with sections A-K. They have at least 15 days to comment, request changes, and name a preferred school.",
    icon: FileText,
    timing: "15+ days consultation",
    color: "unconfirmed" as const,
  },
  {
    number: 7,
    title: "Final EHCP issued",
    description: "The final plan is issued, naming the school and all provision. Section F is legally binding. The named school must admit the child.",
    icon: School,
    timing: "Within 20 weeks total",
    color: "confirmed" as const,
  },
  {
    number: 8,
    title: "Annual review",
    description: "The EHCP is reviewed at least every 12 months. The LA must decide within 4 weeks whether to keep, amend, or cease the plan.",
    icon: RefreshCw,
    timing: "Every 12 months",
    color: "confirmed" as const,
  },
];

const colorMap = {
  confirmed: {
    bg: "bg-[hsl(var(--status-confirmed-bg))]",
    border: "border-[hsl(var(--status-confirmed-border))]",
    text: "text-[hsl(var(--status-confirmed))]",
    dot: "bg-[hsl(var(--status-confirmed))]",
  },
  discussed: {
    bg: "bg-[hsl(var(--status-discussed-bg))]",
    border: "border-[hsl(var(--status-discussed-border))]",
    text: "text-[hsl(var(--status-discussed))]",
    dot: "bg-[hsl(var(--status-discussed))]",
  },
  unconfirmed: {
    bg: "bg-[hsl(var(--status-unconfirmed-bg))]",
    border: "border-[hsl(var(--status-unconfirmed-border))]",
    text: "text-[hsl(var(--status-unconfirmed))]",
    dot: "bg-[hsl(var(--status-unconfirmed))]",
  },
};

export function EHCPProcessDiagram() {
  return (
    <div className="space-y-1" role="list" aria-label="EHCP process steps">
      {steps.map((step, i) => {
        const colors = colorMap[step.color];
        const Icon = step.icon;
        return (
          <div key={step.number} className="relative flex gap-4" role="listitem">
            {/* Vertical connector line */}
            <div className="flex flex-col items-center shrink-0">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-card", colors.border)}>
                <span className={cn("text-sm font-bold", colors.text)}>{step.number}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 min-h-[16px] bg-border" />
              )}
            </div>

            {/* Content card */}
            <div className={cn("flex-1 rounded-lg border p-4 mb-2", colors.bg, colors.border)}>
              <div className="flex items-start gap-3">
                <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", colors.text)} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Clock className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">{step.timing}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
