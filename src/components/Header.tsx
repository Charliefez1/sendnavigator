import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SiteLink {
  path: string;
  label: string;
  children?: { path: string; label: string }[];
}

const siteLinks: SiteLink[] = [
  { path: "/", label: "Home" },
  { path: "/how-to-use", label: "How to use" },
  { path: "/ehcps", label: "EHCPs" },
  { path: "/post-16-and-transition", label: "Post-16 & Transition" },
  { path: "/what-to-do-right-now", label: "What to do right now" },
  { path: "/sendiass", label: "SENDIASS" },
  { path: "/questions-and-answers", label: "Ask SEND" },
  { path: "/community-questions", label: "Lived experience" },
  { path: "/about", label: "About", children: [
    { path: "/about", label: "About" },
    { path: "/sources", label: "Data & Sources" },
    { path: "/feedback", label: "Feedback & Issues" },
  ]},
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-navy text-navy-foreground sticky top-0 z-50">
      <div className="content-wide py-px">
        <div className="flex items-center justify-center">

          {/* Desktop site links */}
          <nav className="hidden lg:flex items-center justify-center gap-1" aria-label="Site pages">
            {siteLinks.map((link) =>
              link.children ? (
                <MoreDropdown key={link.path} label={link.label} links={link.children} />
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
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
              )
            )}
          </nav>

          {/* Tablet: compact links */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            {siteLinks.slice(0, 4).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
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
            <MoreDropdown label="More" links={siteLinks.slice(4).flatMap(l => l.children ?? [l])} />
          </div>

          {/* Mobile: hamburger */}
          <div className="flex md:hidden items-center gap-1">
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
              {siteLinks.flatMap(link =>
                link.children
                  ? link.children.map(child => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
                            isActive
                              ? "bg-white/20 text-white font-semibold"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          )
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))
                  : [(
                      <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === "/"}
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
                    )]
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function MoreDropdown({ label, links }: { label: string; links: { path: string; label: string }[] }) {
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
          "flex items-center gap-1 px-2 py-1.5 text-[11px] lg:text-xs font-medium rounded-lg transition-colors whitespace-nowrap",
          open ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
        )}
      >
        {label}
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
