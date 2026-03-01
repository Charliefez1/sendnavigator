import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import beaconLogo from "@/assets/neurodiversity-global-education-logo-full.png";

interface NavItem {
  path: string;
  label: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: (NavGroup & { color: string })[] = [
  {
    label: "SEND Reform Report",
    color: "hsl(175 65% 45%)",
    items: [
      { path: "/state-of-send-2026", label: "Report Overview" },
      { path: "/state-of-send-2026/where-we-are-now", label: "What we know right now" },
      { path: "/state-of-send-2026/what-is-changing", label: "What is now in motion" },
      { path: "/state-of-send-2026/what-has-not-changed", label: "What remains protected" },
      { path: "/state-of-send-2026/what-is-being-discussed", label: "What is actively being shaped" },
      { path: "/state-of-send-2026/what-we-do-not-know", label: "What is genuinely unknown" },
      { path: "/state-of-send-2026/what-the-leaks-are-saying", label: "What has been reported" },
      { path: "/state-of-send-2026/what-the-leaks-do-not-mean", label: "What is often misunderstood" },
      { path: "/state-of-send-2026/timeline", label: "What happens next" },
    ],
  },
  {
    label: "Parent Guides",
    color: "hsl(220 70% 55%)",
    items: [
      { path: "/ehcps", label: "The EHCP Guide" },
      { path: "/ehcp-health", label: "Health in EHCPs" },
      { path: "/understanding-your-child", label: "Understanding your child" },
      { path: "/understanding-your-child/autism", label: "Understanding Autism" },
      { path: "/understanding-your-child/adhd", label: "Understanding ADHD" },
      { path: "/exclusions", label: "Exclusions & rights" },
      { path: "/alternative-provision", label: "Alternative Provision" },
      { path: "/post-16-and-transition", label: "Post-16 & Transition" },
      { path: "/what-to-do-right-now", label: "What to do right now" },
      { path: "/sendiass", label: "Free help - SENDIASS" },
      { path: "/my-child-profile", label: "My Child: A Profile" },
    ],
  },
  {
    label: "Take Action",
    color: "hsl(262 60% 55%)",
    items: [
      { path: "/have-your-say", label: "Have your say" },
      { path: "/questions-and-answers", label: "Ask Rich" },
      { path: "/community-questions", label: "Lived experience" },
      { path: "/for-parents", label: "You are carrying a lot" },
      { path: "/what-we-owe-our-children", label: "Reality Bites" },
    ],
  },
  {
    label: "The System",
    color: "hsl(195 70% 45%)",
    items: [
      { path: "/local-variation", label: "Why where you live matters" },
      { path: "/devolved-nations", label: "Wales, Scotland & NI" },
    ],
  },
  {
    label: "About",
    color: "hsl(150 50% 42%)",
    items: [
      { path: "/about", label: "About this resource" },
      { path: "/sources", label: "Sources & evidence" },
      { path: "/how-to-use", label: "How to use this site" },
      { path: "/feedback", label: "Feedback" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  // Close mega menu on click outside
  useEffect(() => {
    if (!megaMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mega-menu]')) setMegaMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaMenuOpen]);

  return (
    <header className="bg-navy text-navy-foreground sticky top-0 z-50">
      <div className="content-wide pt-1 pb-3">
        <div className="hidden lg:grid lg:grid-cols-[auto_1fr_auto] items-center gap-2">
          {/* Left: Logo */}
          <NavLink to="/" end className="flex-shrink-0">
            <img src={beaconLogo} alt="Neurodiversity Global SEND Navigator - Home" className="h-[52px]" />
          </NavLink>

          {/* Center: Key direct links (desktop) — justified to centre of the row */}
          <nav className="flex items-center justify-center gap-1" aria-label="Site pages">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive ? "text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/state-of-send-2026"
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive || location.pathname.startsWith("/state-of-send-2026")
                    ? "text-white"
                    : "hover:text-white hover:bg-white/10"
                )
              }
              style={({ isActive }) => ({ color: isActive || location.pathname.startsWith("/state-of-send-2026") ? undefined : "hsl(175 65% 55%)" })}
            >
              SEND Reform Report
            </NavLink>
            <NavLink
              to="/ehcps"
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive ? "text-white" : "hover:text-white hover:bg-white/10"
                )
              }
              style={({ isActive }) => ({ color: isActive ? undefined : "hsl(220 70% 60%)" })}
            >
              EHCP Guide
            </NavLink>
            <NavLink
              to="/my-child-profile"
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive ? "text-white" : "hover:text-white hover:bg-white/10"
                )
              }
              style={({ isActive }) => ({ color: isActive ? undefined : "hsl(42 87% 58%)" })}
            >
              My Child: A Profile
            </NavLink>
            <NavLink
              to="/what-to-do-right-now"
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive ? "text-white" : "hover:text-white hover:bg-white/10"
                )
              }
              style={({ isActive }) => ({ color: isActive ? undefined : "hsl(8 75% 62%)" })}
            >
              What to do now
            </NavLink>
            <NavLink
              to="/questions-and-answers"
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive ? "text-white" : "hover:text-white hover:bg-white/10"
                )
              }
              style={({ isActive }) => ({ color: isActive ? undefined : "hsl(262 60% 65%)" })}
            >
              Ask Rich
            </NavLink>
          </nav>

          {/* Right: Explore All (desktop) */}
          <div className="flex items-center justify-end">
            <div data-mega-menu className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  megaMenuOpen ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                Explore all
                <ChevronDown className={cn("w-3 h-3 transition-transform", megaMenuOpen && "rotate-180")} />
              </button>

              {megaMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-card text-card-foreground border border-border rounded-xl shadow-2xl py-5 px-6 z-50 animate-fade-in w-[640px]">
                  <div className="grid grid-cols-3 gap-6">
                    {navGroups.map((group) => (
                      <div key={group.label}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: group.color }} />
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: group.color }}>{group.label}</p>
                        </div>
                        <ul className="space-y-0.5">
                          {group.items.map((item) => (
                            <li key={item.path}>
                              <NavLink
                                to={item.path}
                                onClick={() => setMegaMenuOpen(false)}
                                className={({ isActive }) =>
                                  cn(
                                    "block px-2 py-1.5 text-sm rounded-md transition-colors",
                                    isActive ? "font-medium" : "text-foreground hover:bg-muted"
                                  )
                                }
                                style={({ isActive }) => isActive ? { backgroundColor: `${group.color}15`, color: group.color } : undefined}
                              >
                                {item.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Link
                      to="/"
                      onClick={() => setMegaMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                    >
                      View full site map on Home
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile header row */}
        <div className="flex lg:hidden items-center justify-between gap-2">
          <NavLink to="/" end className="flex-shrink-0">
            <img src={beaconLogo} alt="Neurodiversity Global SEND Navigator - Home" className="h-[52px]" />
          </NavLink>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-2 pt-3 border-t border-white/10 animate-fade-in pb-4 max-h-[70vh] overflow-y-auto" aria-label="Site pages">
            {navGroups.map((group) => (
              <div key={group.label} className="mt-3 first:mt-0">
                <div className="flex items-center gap-2 px-3 py-1">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: group.color }} />
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: group.color }}>{group.label}</p>
                </div>
                <div className="space-y-0.5 mt-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
                          isActive ? "bg-white/20 text-white font-semibold" : "text-white/70 hover:text-white hover:bg-white/10"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
