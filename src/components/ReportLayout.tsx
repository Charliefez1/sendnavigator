import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const reportSteps = [
  { path: "/state-of-send-2026/where-we-are-now", label: "What we know so far", shortLabel: "Known", color: "confirmed" },
  { path: "/state-of-send-2026/what-is-changing", label: "What is changing", shortLabel: "Changing", color: "confirmed" },
  { path: "/state-of-send-2026/what-has-not-changed", label: "What has not changed", shortLabel: "Unchanged", color: "confirmed" },
  { path: "/state-of-send-2026/what-is-being-discussed", label: "What is being discussed", shortLabel: "Discussed", color: "discussed" },
  { path: "/state-of-send-2026/what-we-do-not-know", label: "What we do not know yet", shortLabel: "Unknown", color: "discussed" },
  { path: "/state-of-send-2026/what-the-leaks-are-saying", label: "What the leaks are saying", shortLabel: "Leaks", color: "unconfirmed" },
  { path: "/state-of-send-2026/what-the-leaks-do-not-mean", label: "What the leaks do not mean", shortLabel: "Context", color: "unconfirmed" },
  { path: "/state-of-send-2026/timeline", label: "Timeline and next steps", shortLabel: "Timeline", color: "next" },
];

const dotColors: Record<string, string> = {
  confirmed: "bg-journey-confirmed",
  discussed: "bg-journey-discussed",
  unconfirmed: "bg-journey-unconfirmed",
  next: "bg-journey-next",
};

const textColors: Record<string, string> = {
  confirmed: "text-journey-confirmed",
  discussed: "text-journey-discussed",
  unconfirmed: "text-journey-unconfirmed",
  next: "text-journey-next",
};

interface ReportLayoutProps {
  children: ReactNode;
}

export function ReportLayout({ children }: ReportLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentIndex = reportSteps.findIndex((s) => s.path === location.pathname);
  const prevStep = currentIndex > 0 ? reportSteps[currentIndex - 1] : null;
  const nextStep = currentIndex < reportSteps.length - 1 ? reportSteps[currentIndex + 1] : null;

  return (
    <div className="flex min-h-0 flex-1">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-72 xl:w-80 border-r border-border bg-card flex-shrink-0 sticky top-[42px] h-[calc(100vh-42px)] overflow-y-auto">
        <div className="p-5 border-b border-border">
          <Link to="/state-of-send-2026" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors">The State of SEND</p>
              <p className="text-[11px] text-muted-foreground">Report 2026</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1" aria-label="Report sections">
          {reportSteps.map((step, i) => {
            const isActive = i === currentIndex;
            return (
              <NavLink
                key={step.path}
                to={step.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group",
                  isActive
                    ? "bg-primary/10 font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                  isActive ? `${dotColors[step.color]} text-white` : "bg-muted text-muted-foreground group-hover:bg-muted"
                )}>
                  {i + 1}
                </div>
                <span className="leading-tight">{step.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Progress summary */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-1">
            {reportSteps.map((step, i) => (
              <div
                key={step.path}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-all",
                  i <= currentIndex ? dotColors[step.color] : "bg-muted"
                )}
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 text-center">
            {currentIndex >= 0 ? `Section ${currentIndex + 1} of ${reportSteps.length}` : "Select a section"}
          </p>
        </div>
      </aside>

      {/* Mobile sidebar toggle + overlay */}
      <div className="lg:hidden">
        {/* Floating toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-20 left-3 z-40 bg-navy text-white rounded-xl shadow-lg px-3 py-2.5 flex items-center gap-2 text-xs font-medium"
          aria-label="Open report navigation"
        >
          <BookOpen className="w-4 h-4" />
          <span>{currentIndex >= 0 ? `${currentIndex + 1}/${reportSteps.length}` : "Report"}</span>
        </button>

        {/* Overlay sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card border-r border-border flex flex-col animate-fade-in overflow-y-auto">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <Link to="/state-of-send-2026" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-display font-bold text-foreground">The State of SEND 2026</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {reportSteps.map((step, i) => {
                  const isActive = i === currentIndex;
                  return (
                    <NavLink
                      key={step.path}
                      to={step.path}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all min-h-[44px]",
                        isActive
                          ? "bg-primary/10 font-semibold text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                        isActive ? `${dotColors[step.color]} text-white` : "bg-muted text-muted-foreground"
                      )}>
                        {i + 1}
                      </div>
                      <span className="leading-tight">{step.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {children}

        {/* Bottom prev/next navigation */}
        {currentIndex >= 0 && (
          <div className="content-section py-6 border-t border-border">
            <div className="flex items-center justify-between gap-4">
              {prevStep ? (
                <Link to={prevStep.path} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Previous</p>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{prevStep.label}</p>
                  </div>
                </Link>
              ) : <div />}
              {nextStep ? (
                <Link to={nextStep.path} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right group">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Next</p>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{nextStep.label}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              ) : (
                <Link to="/state-of-send-2026" className="flex items-center gap-2 text-sm text-primary hover:underline font-medium">
                  Back to report overview
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { reportSteps };
