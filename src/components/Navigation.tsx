import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/where-we-are-now", label: "Where we are now" },
  { path: "/what-is-changing", label: "What is changing" },
  { path: "/what-the-leaks-are-saying", label: "What the leaks are saying" },
  { path: "/what-this-could-mean", label: "What this could mean" },
  { path: "/timeline", label: "Timeline and next steps" },
  { path: "/questions-and-answers", label: "Questions and answers" },
  { path: "/sources", label: "Sources and how to read them" },
  { path: "/about", label: "About this resource" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find((item) => item.path === location.pathname);

  return (
    <nav className="border-b border-border bg-card" aria-label="Main navigation">
      <div className="content-wide">
        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-wrap gap-1 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile navigation - touch-friendly */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full min-h-[48px] py-3 text-foreground touch-target"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="flex items-center gap-2 text-base font-medium">
              {currentPage?.label || "Menu"}
              {location.pathname !== "/" && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              )}
            </span>
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>

          {isOpen && (
            <div id="mobile-menu" className="pb-4 space-y-1" role="navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-3 text-base rounded-md transition-colors min-h-[48px] flex items-center",
                      isActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export { navItems };
