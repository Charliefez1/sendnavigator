import { useState, useEffect, useRef } from "react";
import {
  FileText, Shield, User, CheckSquare, MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    label: "SEND Reform Report",
    headline: "Track every aspect of SEND reform",
    description:
      "Eight detailed sections covering what's confirmed, what's being discussed, and what hasn't changed. All clearly labelled so you always know where you stand.",
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
      "Create a professional, structured document about your child that you can share with schools, professionals, and anyone involved in their support.",
    accentVar: "--accent-amber",
    accentBgVar: "--accent-amber-bg",
  },
  {
    icon: CheckSquare,
    label: "What to do now",
    headline: "Practical steps based on current law",
    description:
      "No speculation, no panic. Clear, practical actions you can take right now based on what the law actually says today.",
    accentVar: "--accent-coral",
    accentBgVar: "--accent-coral-bg",
  },
  {
    icon: MessageCircle,
    label: "Ask Rich",
    headline: "Get plain-English answers",
    description:
      "Ask any question about SEND reform and get a grounded, honest answer drawn from confirmed sources. No jargon, no spin.",
    accentVar: "--accent-violet",
    accentBgVar: "--accent-violet-bg",
  },
];

export function AnimatedFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = () => {
    stopCycling();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startCycling();
    return stopCycling;
  }, []);

  const handleSelect = (index: number) => {
    stopCycling();
    setActiveIndex(index);
    startCycling();
  };

  const active = features[activeIndex];
  const Icon = active.icon;

  return (
    <div
      onMouseEnter={stopCycling}
      onMouseLeave={startCycling}
    >
      <div className="grid md:grid-cols-5 gap-6 items-start">
        {/* Left: description (3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-center py-2">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-500"
            style={{ backgroundColor: `hsl(var(${active.accentBgVar}))` }}
          >
            <Icon
              className="w-6 h-6 transition-colors duration-500"
              style={{ color: `hsl(var(${active.accentVar}))` }}
            />
          </div>
          <h3
            className="text-lg sm:text-xl font-display font-semibold mb-3 transition-colors duration-500"
            style={{ color: `hsl(var(${active.accentVar}))` }}
          >
            {active.headline}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            {active.description}
          </p>
        </div>

        {/* Right: feature list (2 cols) */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={feature.label}
                onClick={() => handleSelect(index)}
                className="relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 min-h-[52px] overflow-hidden"
                style={{
                  backgroundColor: isActive
                    ? `hsl(var(${feature.accentBgVar}))`
                    : "transparent",
                  borderLeft: isActive
                    ? `3px solid hsl(var(${feature.accentVar}))`
                    : "3px solid transparent",
                }}
              >
                <feature.icon
                  className="w-4.5 h-4.5 flex-shrink-0 transition-colors duration-300"
                  style={{
                    color: isActive
                      ? `hsl(var(${feature.accentVar}))`
                      : "hsl(var(--muted-foreground))",
                  }}
                />
                <span
                  className="text-sm font-medium transition-colors duration-300"
                  style={{
                    color: isActive
                      ? `hsl(var(${feature.accentVar}))`
                      : "hsl(var(--foreground))",
                  }}
                >
                  {feature.label}
                </span>

                {/* Timer bar at bottom */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: `hsl(var(${feature.accentVar}))`,
                        animation: "progress-fill 4s linear forwards",
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
