import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const siteLinks = [
  { path: "/", label: "Home" },
  { path: "/quick-read", label: "Quick Read" },
  { path: "/how-to-use", label: "How to use" },
  { path: "/questions-and-answers", label: "Ask SEND" },
  { path: "/community-questions", label: "Lived experience" },
  { path: "/sources", label: "Data & Sources" },
  { path: "/feedback", label: "Feedback & Issues" },
  { path: "/about", label: "About" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-navy text-navy-foreground">
      <div className="content-wide py-1.5">
        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center justify-center gap-1" aria-label="Site pages">
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
        </nav>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center justify-end">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-2 pb-3 border-t border-white/10 animate-fade-in" aria-label="Site pages">
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

