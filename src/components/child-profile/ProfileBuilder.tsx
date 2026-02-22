import { useState } from "react";
import { SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { ProfileSidebar } from "./ProfileSidebar";
import { SectionTemplate } from "./SectionTemplate";
import { FinalScreen } from "./FinalScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfileBuilder() {
  const [activeSection, setActiveSection] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (showFinal) {
    return <FinalScreen />;
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
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-3">
          Sections
        </p>
        <ProfileSidebar
          activeSection={activeSection}
          onSelectSection={(i) => {
            setActiveSection(i);
            setSidebarOpen(false);
          }}
        />
        <div className="mt-6 px-3">
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
