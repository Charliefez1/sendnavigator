import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, User, FileText, HelpCircle, Building2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const siteLinks = [
  { path: "/about", label: "About", icon: BookOpen },
  { path: "/why-i-built-this", label: "Why I built this", icon: Heart },
  { path: "/rich-ferriman", label: "Rich Ferriman", icon: User },
  { path: "/neurodiversity-global", label: "Neurodiversity Global", icon: Building2 },
  { path: "/sources", label: "Sources", icon: FileText },
  { path: "/questions-and-answers", label: "Q&A", icon: HelpCircle },
];

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPage = siteLinks.find((l) => l.path === location.pathname);

  return (
    <nav className="bg-card/80 border-b border-border/40" aria-label="Site navigation">
      <div className="content-wide flex items-center justify-between">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 py-1.5">
          {siteLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )
              }
            >
              <link.icon className="w-3.5 h-3.5" aria-hidden="true" />
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center gap-2 py-3 text-sm font-medium text-muted-foreground min-h-[48px]"
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? "Close site menu" : "Open site menu"}
        >
          {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          <span>{currentPage?.label || "Site menu"}</span>
        </button>

        {/* Theme toggle always visible */}
        <div className="py-1.5">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div id="site-menu" className="md:hidden content-wide pb-3 space-y-1 animate-fade-in" role="navigation">
          {siteLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-colors min-h-[48px]",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                )
              }
            >
              <link.icon className="w-4 h-4" aria-hidden="true" />
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
