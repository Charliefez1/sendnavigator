import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const journeySteps = [
  { path: "/where-we-are-now", label: "What we know so far", shortLabel: "Known", group: "confirmed" },
  { path: "/what-is-changing", label: "What is changing", shortLabel: "Changing", group: "confirmed" },
  { path: "/what-has-not-changed", label: "What has not changed", shortLabel: "Unchanged", group: "confirmed" },
  { path: "/what-is-being-discussed", label: "What is being discussed", shortLabel: "Discussed", group: "discussed" },
  { path: "/what-we-do-not-know", label: "What we do not know yet", shortLabel: "Unknown", group: "discussed" },
  { path: "/what-the-leaks-are-saying", label: "What the leaks are saying", shortLabel: "Leaks", group: "unconfirmed" },
  { path: "/what-the-leaks-do-not-mean", label: "What the leaks do not mean", shortLabel: "Context", group: "unconfirmed" },
  { path: "/timeline", label: "Timeline and next steps", shortLabel: "Timeline", group: "next" },
];

const siteLinks = [
  
  { path: "/how-to-use", label: "How to use" },
  { path: "/questions-and-answers", label: "Ask SEND" },
  { path: "/community-questions", label: "Lived experience" },
  { path: "/sources", label: "Data & Sources" },
  { path: "/feedback", label: "Feedback & Issues" },
  { path: "/about", label: "About" },
];

const groupColours: Record<string, { bg: string; text: string; activeBg: string }> = {
  confirmed: { bg: "bg-journey-confirmed/10", text: "text-journey-confirmed", activeBg: "bg-journey-confirmed" },
  discussed: { bg: "bg-journey-discussed/10", text: "text-journey-discussed", activeBg: "bg-journey-discussed" },
  unconfirmed: { bg: "bg-journey-unconfirmed/10", text: "text-journey-unconfirmed", activeBg: "bg-journey-unconfirmed" },
  next: { bg: "bg-journey-next/10", text: "text-journey-next", activeBg: "bg-journey-next" },
};

export function SiteNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentJourney = journeySteps.find((s) => s.path === location.pathname);
  const currentSite = siteLinks.find((s) => s.path === location.pathname);
  const currentLabel = currentJourney?.label || currentSite?.label || "Menu";

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm" aria-label="Main navigation">
      <div className="content-wide">
        {/* === DESKTOP === */}
        <div className="hidden lg:block">
          {/* Journey row */}
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            {journeySteps.map((step, i) => {
              const colours = groupColours[step.group];
              return (
                <div key={step.path} className="flex items-center shrink-0">
                  <NavLink
                    to={step.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                        isActive
                          ? `${colours.activeBg} text-white shadow-sm`
                          : `${colours.bg} ${colours.text} hover:opacity-80`
                      )
                    }
                  >
                    <span className={cn(
                      "w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center shrink-0",
                      step.path === location.pathname ? "bg-white/20" : "bg-black/5 dark:bg-white/10"
                    )}>
                      {i + 1}
                    </span>
                    {step.shortLabel}
                  </NavLink>
                  {i < journeySteps.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-border mx-0.5 shrink-0" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Site links row */}
          <div className="flex items-center justify-between border-t border-border/60 py-1.5">
            <div className="flex items-center gap-1">
              {siteLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* === TABLET (md but not lg) === */}
        <div className="hidden md:block lg:hidden">
          {/* Journey row - scrollable */}
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            {journeySteps.map((step, i) => {
              const colours = groupColours[step.group];
              return (
                <NavLink
                  key={step.path}
                  to={step.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap shrink-0",
                      isActive
                        ? `${colours.activeBg} text-white shadow-sm`
                        : `${colours.bg} ${colours.text} hover:opacity-80`
                    )
                  }
                >
                  <span className={cn(
                    "w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center shrink-0",
                    step.path === location.pathname ? "bg-white/20" : "bg-black/5 dark:bg-white/10"
                  )}>
                    {i + 1}
                  </span>
                  {step.shortLabel}
                </NavLink>
              );
            })}
          </div>

          {/* Site links row */}
          <div className="flex items-center justify-between border-t border-border/60 py-1.5">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {siteLinks.slice(0, 4).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "px-2.5 py-1.5 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap shrink-0",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {/* More dropdown */}
              <div ref={moreRef} className="relative shrink-0">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap",
                    moreOpen ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  More
                  <ChevronDown className={cn("w-3 h-3 transition-transform", moreOpen && "rotate-180")} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-50 animate-fade-in">
                    {siteLinks.slice(4).map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                          cn(
                            "block px-4 py-2.5 text-sm font-medium transition-colors",
                            isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* === MOBILE === */}
        <div className="md:hidden flex items-center justify-between py-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2.5 py-2 text-foreground min-h-[44px]"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-sm font-semibold">{currentLabel}</span>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile expanded menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {/* Journey steps */}
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 pt-2 pb-1">Navigator journey</p>
            <div className="space-y-0.5 mb-3">
              {journeySteps.map((step, i) => {
                const colours = groupColours[step.group];
                return (
                  <NavLink
                    key={step.path}
                    to={step.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all min-h-[44px]",
                        isActive
                          ? `${colours.activeBg} text-white font-semibold shadow-sm`
                          : "text-foreground hover:bg-muted"
                      )
                    }
                  >
                    <span className={cn(
                      "w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0",
                      step.path === location.pathname
                        ? "bg-white/20"
                        : `${colours.bg} ${colours.text}`
                    )}>
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-sm font-medium block leading-tight">{step.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>

            {/* Site links */}
            <div className="border-t border-border/60 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 pb-1">Site pages</p>
              <div className="space-y-0.5">
                {siteLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center",
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-foreground hover:bg-muted"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export { journeySteps };
