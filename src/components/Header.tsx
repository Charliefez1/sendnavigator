import { useState, useRef, useEffect } from "react";
import { Heart, Sparkles, Menu, X, ChevronDown } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import neurodiversityLogo from "@/assets/neurodiversity-global-education-logo.png";

const siteLinks = [
  { path: "/how-to-use", label: "How to use" },
  { path: "/questions-and-answers", label: "Ask ADHDi" },
  { path: "/community-questions", label: "Lived experience" },
  { path: "/sources", label: "Data & Sources" },
  { path: "/feedback", label: "Feedback" },
  { path: "/about", label: "About" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close on navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-navy text-navy-foreground sticky top-0 z-50">
      <div className="content-wide py-3 sm:py-4">
        {/* Top row: logo + links/hamburger */}
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-display font-bold text-white tracking-tight leading-tight group-hover:opacity-90 transition-opacity">
                SEND Reform Navigator
              </h1>
              <p className="text-xs text-navy-muted font-medium hidden sm:block">
                A friendly guide for families
              </p>
            </div>
          </Link>

          {/* Desktop site links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Site pages">
            {siteLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="ml-2 border-l border-white/10 pl-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Tablet: compact links */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            {siteLinks.slice(0, 4).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "px-2 py-1.5 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <MoreDropdown links={siteLinks.slice(4)} />
            <div className="ml-1 border-l border-white/10 pl-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: hamburger + theme */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-white/10 animate-fade-in" aria-label="Site pages">
            <div className="grid grid-cols-2 gap-1">
              {siteLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
                      isActive
                        ? "bg-white/20 text-white font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function MoreDropdown({ links }: { links: typeof siteLinks }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 px-2 py-1.5 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap",
          open ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
        )}
      >
        More
        <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-card text-card-foreground border border-border rounded-xl shadow-lg py-1 min-w-[160px] z-50 animate-fade-in">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
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
  );
}
