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
  { path: "/state-of-send-2026", label: "State of SEND 2026" },
  { path: "#guides", label: "Parent Guides", children: [
    { path: "/understanding-your-child", label: "Understanding your child" },
    { path: "/ehcps", label: "The EHCP Guide" },
    { path: "/exclusions", label: "Exclusions & rights" },
    { path: "/post-16-and-transition", label: "Post-16 & Transition" },
    { path: "/what-to-do-right-now", label: "What to do right now" },
    { path: "/sendiass", label: "Free help — SENDIASS" },
  ]},
  { path: "#action", label: "Take Action", children: [
    { path: "/have-your-say", label: "Have your say" },
    { path: "/for-parents", label: "You are carrying a lot" },
    { path: "/questions-and-answers", label: "Ask SEND" },
    { path: "/community-questions", label: "Lived experience" },
    { path: "/what-we-owe-our-children", label: "Reality Bites" },
  ]},
  { path: "#about", label: "About", children: [
    { path: "/about", label: "About this resource" },
    { path: "/sources", label: "Sources & Evidence" },
    { path: "/how-to-use", label: "How to use this site" },
    { path: "/feedback", label: "Feedback" },
  ]},
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if any child route is active for a dropdown
  const isChildActive = (link: SiteLink) => {
    return link.children?.some(child => location.pathname === child.path || location.pathname.startsWith(child.path + "/"));
  };

  return (
    <header className="bg-navy text-navy-foreground sticky top-0 z-50">
      <div className="content-wide py-px">
        <div className="flex items-center justify-center">

          {/* Desktop site links */}
          <nav className="hidden lg:flex items-center justify-center gap-1" aria-label="Site pages">
            {siteLinks.map((link) =>
              link.children ? (
                <MoreDropdown key={link.path} label={link.label} links={link.children} isActive={isChildActive(link)} />
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap",
                      isActive || (link.path === "/state-of-send-2026" && location.pathname.startsWith("/state-of-send-2026"))
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
            {siteLinks.filter(l => !l.children).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-2 py-1.5 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap",
                    isActive || (link.path === "/state-of-send-2026" && location.pathname.startsWith("/state-of-send-2026"))
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <MoreDropdown label="More" links={siteLinks.filter(l => l.children).flatMap(l => l.children ?? [])} />
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
          <nav className="md:hidden mt-3 pt-3 border-t border-white/10 animate-fade-in pb-4" aria-label="Site pages">
            {siteLinks.map((link) => (
              <div key={link.path}>
                {link.children ? (
                  <MobileSection label={link.label} links={link.children} onNavigate={() => setMobileMenuOpen(false)} />
                ) : (
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
                        isActive || (link.path === "/state-of-send-2026" && location.pathname.startsWith("/state-of-send-2026"))
                          ? "bg-white/20 text-white font-semibold"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

function MobileSection({ label, links, onNavigate }: { label: string; links: { path: string; label: string }[]; onNavigate: () => void }) {
  return (
    <div className="mt-2">
      <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">{label}</p>
      <div className="grid grid-cols-2 gap-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onNavigate}
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
    </div>
  );
}

function MoreDropdown({ label, links, isActive }: { label: string; links: { path: string; label: string }[]; isActive?: boolean }) {
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
          open || isActive ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
        )}
      >
        {label}
        <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-card text-card-foreground border border-border rounded-xl shadow-lg py-1 min-w-[180px] z-50 animate-fade-in">
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
