import {
  FileText, Shield, User, CheckSquare, MessageCircle, BookOpen,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    label: "SEND Reform Report",
    headline: "Track every aspect of SEND reform",
    description:
      "Eight detailed sections covering what's confirmed, what's being discussed, and what hasn't changed.",
    accentVar: "--accent-teal",
    accentBgVar: "--accent-teal-bg",
  },
  {
    icon: Shield,
    label: "EHCP Guide",
    headline: "Understand your rights and the process",
    description:
      "A plain-English guide to Education, Health and Care Plans. What they are, how they work, and what to do when things go wrong.",
    accentVar: "--accent-deep-blue",
    accentBgVar: "--accent-deep-blue-bg",
  },
  {
    icon: User,
    label: "My Child: A Profile",
    headline: "Build a profile to share with schools",
    description:
      "Create a professional, structured document about your child that you can share with schools and professionals.",
    accentVar: "--accent-amber",
    accentBgVar: "--accent-amber-bg",
  },
  {
    icon: CheckSquare,
    label: "What to do now",
    headline: "Practical steps based on current law",
    description:
      "Clear, practical actions you can take right now based on what the law actually says today.",
    accentVar: "--accent-coral",
    accentBgVar: "--accent-coral-bg",
  },
  {
    icon: MessageCircle,
    label: "Ask Rich",
    headline: "Get plain-English answers",
    description:
      "Ask any question about SEND reform and get a grounded, honest answer drawn from confirmed sources.",
    accentVar: "--accent-violet",
    accentBgVar: "--accent-violet-bg",
  },
  {
    icon: BookOpen,
    label: "Sources & Evidence",
    headline: "Every claim traced to its source",
    description:
      "Legislation, government research, DfE data, and expert reviews, all in one place so you can verify everything yourself.",
    accentVar: "--accent-teal",
    accentBgVar: "--accent-teal-bg",
  },
];

export function AnimatedFeatureShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.label}
            className="rounded-xl border p-5 transition-shadow duration-300 hover:shadow-lg"
            style={{
              borderColor: `hsl(var(${feature.accentVar}) / 0.25)`,
              backgroundColor: `hsl(var(${feature.accentBgVar}))`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `hsl(var(${feature.accentVar}) / 0.12)` }}
              >
                <Icon
                  className="w-4.5 h-4.5"
                  style={{ color: `hsl(var(${feature.accentVar}))` }}
                />
              </div>
              <h3
                className="text-sm font-semibold leading-tight"
                style={{ color: `hsl(var(${feature.accentVar}))` }}
              >
                {feature.label}
              </h3>
            </div>
            <p className="text-sm font-semibold text-foreground leading-snug mb-1.5">
              {feature.headline}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
