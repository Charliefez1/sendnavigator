import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, User, FileText, HelpCircle, Building2, Heart, MessageCircleQuestion, MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const siteLinks: NavItem[] = [
  { path: "/how-to-use", label: "How to use", icon: HelpCircle },
  {
    path: "/about", label: "About", icon: BookOpen,
    children: [
      { path: "/why-i-built-this", label: "Why I built this", icon: Heart },
      { path: "/rich-ferriman", label: "Rich Ferriman", icon: User },
      { path: "/neurodiversity-global", label: "Neurodiversity Global", icon: Building2 },
    ],
  },
  { path: "/community-questions", label: "Lived Experience", icon: MessageCircleQuestion },
  { path: "/feedback", label: "Feedback", icon: MessageSquare },
  { path: "/sources", label: "Sources", icon: FileText },
];

const allPaths = siteLinks.flatMap((l) => [l.path, ...(l.children?.map((c) => c.path) || [])]);

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isChildActive = item.children?.some((c) => c.path === location.pathname);

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
          "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200",
          isChildActive || location.pathname === item.path
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/80 hover:text-foreground hover:bg-primary/8"
        )}
      >
        <item.icon className="w-4 h-4" aria-hidden="true" />
        {item.label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-lg py-1.5 min-w-[220px] z-50 animate-fade-in">
          <NavLink
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted"
              )
            }
          >
            <item.icon className="w-4 h-4" aria-hidden="true" />
            {item.label}
          </NavLink>
          <div className="border-t border-border/50 my-1" />
          {item.children!.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted"
                )
              }
            >
              <child.icon className="w-4 h-4" aria-hidden="true" />
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPage = allPaths.includes(location.pathname)
    ? siteLinks.flatMap((l) => [l, ...(l.children || [])]).find((l) => l.path === location.pathname)
    : undefined;

  return (
    <nav className="bg-secondary/60 dark:bg-secondary/30 border-b border-border/50" aria-label="Site navigation">
      <div className="content-wide flex items-center justify-between">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center gap-1.5 py-2.5 flex-1">
          {siteLinks.map((link) =>
            link.children ? (
              <DesktopDropdown key={link.path} item={link} />
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/80 hover:text-foreground hover:bg-primary/8"
                  )
                }
              >
                <link.icon className="w-4 h-4" aria-hidden="true" />
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center gap-2.5 py-3.5 text-sm font-semibold text-foreground/80 min-h-[48px]"
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? "Close site menu" : "Open site menu"}
        >
          {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          <span>{currentPage?.label || "Site menu"}</span>
        </button>

        <div className="py-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div id="site-menu" className="md:hidden content-wide pb-4 space-y-1 animate-fade-in" role="navigation">
          {siteLinks.map((link) => (
            <div key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 min-h-[48px]",
                    isActive ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "text-foreground hover:bg-primary/8"
                  )
                }
              >
                <link.icon className="w-4.5 h-4.5" aria-hidden="true" />
                {link.label}
              </NavLink>
              {link.children?.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[48px]",
                      isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted"
                    )
                  }
                >
                  <child.icon className="w-4 h-4" aria-hidden="true" />
                  {child.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
