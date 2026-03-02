import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SECTION_TITLES, useChildProfile } from "@/contexts/ChildProfileContext";
import { ProfileSidebar } from "./ProfileSidebar";
import { SectionTemplate } from "./SectionTemplate";
import { FinalScreen } from "./FinalScreen";
import { SaveProgressButton } from "./SaveProgressButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, Menu, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileBuilderProps {
  initialSection?: number;
  onViewDashboard?: () => void;
}

export function ProfileBuilder({ initialSection = 0, onViewDashboard }: ProfileBuilderProps) {
  const { state } = useChildProfile();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [showFinal, setShowFinal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editedSinceReport, setEditedSinceReport] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSection, showFinal]);

  // Track edits after report generation
  useEffect(() => {
    if (state.aiReport) {
      setEditedSinceReport(true);
    }
  // Only trigger when sections or finalStatement change while aiReport exists
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sections, state.finalStatement]);

  if (showFinal) {
    return <FinalScreen onViewDashboard={onViewDashboard} />;
  }

  const isLast = activeSection === SECTION_TITLES.length - 1;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center"
        aria-label={sidebarOpen ? "Close sections menu" : "Open sections menu"}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border overflow-y-auto p-4 pt-20 transition-transform lg:relative lg:translate-x-0 lg:pt-4 lg:inset-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 mb-4"
        >
          <Home className="w-3.5 h-3.5" />
          Back to home
        </Link>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-3">
          Sections
        </p>
        <ProfileSidebar
          activeSection={activeSection}
          onSelectSection={(i) => {
            setActiveSection(i);
            setSidebarOpen(false);
          }}
          onViewDashboard={onViewDashboard ? () => {
            onViewDashboard();
            setSidebarOpen(false);
          } : undefined}
        />
        <div className="mt-4 px-3">
          <SaveProgressButton activeSection={activeSection} />
        </div>
        <div className="mt-3 px-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              setShowFinal(true);
              setSidebarOpen(false);
            }}
          >
            Skip to final statement
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-3xl">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4 lg:hidden"
        >
          <Home className="w-3.5 h-3.5" />
          Back to home
        </Link>
        {state.aiReport && editedSinceReport && (
          <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 mb-4 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">
              You have changed the profile since the last report. Regenerate to update the report.
            </p>
          </div>
        )}
        <SectionTemplate sectionIndex={activeSection} />

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </Button>

          {isLast ? (
            <Button size="sm" onClick={() => setShowFinal(true)} className="gap-1.5">
              Final statement
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => setActiveSection(activeSection + 1)}
              className="gap-1.5"
            >
              Next section
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
