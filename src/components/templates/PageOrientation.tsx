import { ReactNode, ElementType } from "react";
import { Clock } from "lucide-react";
import { PageSearch } from "@/components/PageSearch";

interface PageOrientationProps {
  title: string;
  description?: string;
  lastUpdated?: string;
  children?: ReactNode;
  accentColor?: string;
  showSearch?: boolean;
  icon?: ElementType;
}

export function PageOrientation({ 
  title, 
  description, 
  lastUpdated = "20th February 2026",
  children,
  accentColor,
  showSearch = true,
  icon: Icon,
}: PageOrientationProps) {
  const accentHsl = accentColor || "hsl(175 60% 40%)";

  return (
    <header className="relative overflow-hidden">
      {/* Subtle accent-tinted background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            `linear-gradient(to bottom, hsl(222 35% 10%), hsl(222 35% 12%))`,
            `radial-gradient(ellipse 80% 60% at 50% 30%, ${accentHsl.replace(")", " / 0.12)")}, transparent 70%)`,
          ].join(", "),
        }}
      />
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="content-section relative py-10 sm:py-14 text-center">
        {/* Icon */}
        {Icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: `${accentHsl.replace(")", " / 0.15)")}` }}
          >
            <Icon className="w-6 h-6" style={{ color: accentHsl }} />
          </div>
        )}

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold mb-3"
          style={{ color: "hsl(0 0% 96%)" }}
        >
          {title}
        </h1>

        {description && (
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(222 20% 62%)" }}
          >
            {description}
          </p>
        )}

        {children && <div className="mt-3 flex justify-center">{children}</div>}

        <div
          className="flex items-center justify-center gap-2 text-sm mt-4"
          style={{ color: "hsl(222 20% 50%)" }}
        >
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span>Last updated: {lastUpdated}</span>
        </div>

        {showSearch && (
          <div className="mt-5 max-w-md mx-auto">
            <PageSearch />
          </div>
        )}
      </div>

      {/* Fade line */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${accentHsl.replace(")", " / 0.2)")}, transparent)`,
        }}
      />
    </header>
  );
}
