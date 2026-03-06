import { Link } from "react-router-dom";
import { Scale, ShieldCheck, Heart, ListChecks, MessageSquareText, Library } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const features: {
  icon: LucideIcon;
  label: string;
  headline: string;
  description: string;
  accentVar: string;
  accentBgVar: string;
  href: string;
  authHref: string;
}[] = [
  {
    icon: Scale,
    label: "SEND Reform Report",
    headline: "Track every aspect of SEND reform",
    description:
      "Eight detailed sections covering what's confirmed, what's being discussed, and what hasn't changed.",
    accentVar: "--accent-teal",
    accentBgVar: "--accent-teal-bg",
    href: "/feature/send-reform",
    authHref: "/what-is-changing",
  },
  {
    icon: ShieldCheck,
    label: "EHCP Guide",
    headline: "Understand your rights and the process",
    description:
      "A plain-English guide to Education, Health and Care Plans. What they are, how they work, and what to do when things go wrong.",
    accentVar: "--accent-deep-blue",
    accentBgVar: "--accent-deep-blue-bg",
    href: "/feature/ehcp-guide",
    authHref: "/ehcps",
  },
  {
    icon: Heart,
    label: "This is me",
    headline: "Build a profile to share with schools",
    description:
      "Create a professional, structured document about your child that you can share with schools and professionals.",
    accentVar: "--accent-amber",
    accentBgVar: "--accent-amber-bg",
    href: "/feature/my-child-profile",
    authHref: "/my-child-profile",
  },
  {
    icon: ListChecks,
    label: "What to do now",
    headline: "Practical steps based on current law",
    description:
      "Clear, practical actions you can take right now based on what the law actually says today.",
    accentVar: "--accent-coral",
    accentBgVar: "--accent-coral-bg",
    href: "/feature/what-to-do-now",
    authHref: "/what-to-do-right-now",
  },
  {
    icon: MessageSquareText,
    label: "Ask Rich",
    headline: "Get plain-English answers",
    description:
      "Ask any question about SEND reform and get a grounded, honest answer drawn from confirmed sources.",
    accentVar: "--accent-violet",
    accentBgVar: "--accent-violet-bg",
    href: "/feature/ask-rich",
    authHref: "/questions-and-answers",
  },
  {
    icon: Library,
    label: "Sources & Evidence",
    headline: "Every claim traced to its source",
    description:
      "Legislation, government research, DfE data, and expert reviews, all in one place so you can verify everything yourself.",
    accentVar: "--accent-teal",
    accentBgVar: "--accent-teal-bg",
    href: "/feature/sources",
    authHref: "/sources",
  },
];

export function AnimatedFeatureShowcase() {
  const { user } = useAuth();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon;
        const destination = user ? feature.authHref : feature.href;
        return (
          <Link
            key={feature.label}
            to={destination}
            className="group relative rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 block overflow-hidden"
          >
            {/* Accent top border */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-[4px]"
              style={{ backgroundColor: `hsl(var(${feature.accentVar}))` }}
            />

            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mb-4"
              style={{ backgroundColor: `hsl(var(${feature.accentVar}) / 0.1)` }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: `hsl(var(${feature.accentVar}))` }}
              />
            </div>

            {/* Eyebrow label */}
            <p
              className="text-[11px] font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: `hsl(var(${feature.accentVar}))` }}
            >
              {feature.label}
            </p>

            {/* Headline */}
            <p className="text-[15px] font-bold text-foreground leading-snug mb-2">
              {feature.headline}
            </p>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-5">
              {feature.description}
            </p>

            {/* Button */}
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 group-hover:brightness-110 group-hover:shadow-sm"
              style={{
                backgroundColor: `hsl(var(${feature.accentVar}) / 0.1)`,
                color: `hsl(var(${feature.accentVar}))`,
                border: `1px solid hsl(var(${feature.accentVar}) / 0.2)`,
              }}
            >
              {feature.label}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
