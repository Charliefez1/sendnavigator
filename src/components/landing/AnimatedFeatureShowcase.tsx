import { useState, useEffect, useRef } from "react";
import { FileText, Shield, User, CheckSquare, MessageCircle } from "lucide-react";

const features = [
  {
    icon: FileText,
    label: "SEND Reform Report",
    headline: "Track every aspect of SEND reform",
    description:
      "Eight detailed sections covering what's confirmed, what's being discussed, and what hasn't changed. All clearly labelled so you always know where you stand.",
    accent: "var(--accent-teal)",
    accentBg: "var(--accent-teal-bg)",
  },
  {
    icon: Shield,
    label: "EHCP Guide",
    headline: "Understand your rights and the process",
    description:
      "A plain-English guide to Education, Health and Care Plans. What they are, how they work, and what to do when things go wrong.",
    accent: "var(--accent-deep-blue)",
    accentBg: "var(--accent-deep-blue-bg)",
  },
  {
    icon: User,
    label: "My Child: A Profile",
    headline: "Build a profile to share with schools",
    description:
      "Create a professional, structured document about your child that you can share with schools, professionals, and anyone involved in their support.",
    accent: "var(--accent-amber)",
    accentBg: "var(--accent-amber-bg)",
  },
  {
    icon: CheckSquare,
    label: "What to do now",
    headline: "Practical steps based on current law",
    description:
      "No speculation, no panic. Just clear, practical actions you can take right now based on what the law actually says today.",
    accent: "var(--accent-coral)",
    accentBg: "var(--accent-coral-bg)",
  },
  {
    icon: MessageCircle,
    label: "Ask Rich",
    headline: "Get plain-English answers",
    description:
      "Ask any question about SEND reform and get a grounded, honest answer drawn from confirmed sources. No jargon, no spin.",
    accent: "var(--accent-violet)",
    accentBg: "var(--accent-violet-bg)",
  },
];

export function AnimatedFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startCycling = () => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
        setIsTransitioning(false);
      }, 200);
    }, 4000);
  };

  const stopCycling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startCycling();
    return () => stopCycling();
  }, []);

  const handleSelect = (index: number) => {
    stopCycling();
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
      startCycling();
    }, 200);
  };

  const active = features[activeIndex];

  return (
    <section
      className="content-wide py-10 sm:py-14"
      onMouseEnter={stopCycling}
      onMouseLeave={() => {
        stopCycling();
        startCycling();
      }}
    >
      <h2 className="text-center text-lg sm:text-xl font-display font-semibold text-foreground mb-8">
        What's inside the Navigator
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
        {/* Left: description area */}
        <div className="flex flex-col justify-center min-h-[200px]">
          <div
            className="transition-opacity duration-300"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `hsl(${active.accentBg})` }}
            >
              <active.icon
                className="w-5 h-5"
                style={{ color: `hsl(${active.accent})` }}
              />
            </div>
            <h3 className="text-base sm:text-lg font-display font-semibold text-foreground mb-2">
              {active.headline}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {active.description}
            </p>
          </div>
        </div>

        {/* Right: feature cards */}
        <div className="flex flex-col gap-2.5">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={feature.label}
                onClick={() => handleSelect(index)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-500 min-h-[52px]"
                style={{
                  borderColor: isActive
                    ? `hsl(${feature.accent})`
                    : "hsl(var(--border))",
                  backgroundColor: isActive
                    ? `hsl(${feature.accentBg})`
                    : "hsl(var(--card))",
                  transform: isActive ? "scale(1.03)" : "scale(1)",
                  boxShadow: isActive
                    ? `0 4px 16px -4px hsl(${feature.accent} / 0.2)`
                    : "none",
                }}
              >
                <feature.icon
                  className="w-5 h-5 flex-shrink-0 transition-colors duration-500"
                  style={{
                    color: isActive
                      ? `hsl(${feature.accent})`
                      : "hsl(var(--muted-foreground))",
                  }}
                />
                <span
                  className="text-sm font-medium transition-colors duration-500"
                  style={{
                    color: isActive
                      ? `hsl(${feature.accent})`
                      : "hsl(var(--foreground))",
                  }}
                >
                  {feature.label}
                </span>

                {/* Progress bar */}
                {isActive && (
                  <div className="ml-auto w-16 h-1 rounded-full overflow-hidden bg-border">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: `hsl(${feature.accent})`,
                        animation: "progress-fill 4s linear",
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
