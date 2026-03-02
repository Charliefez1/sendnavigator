import { SECTION_TITLES, useChildProfile, SectionStatus } from "@/contexts/ChildProfileContext";
import { cn } from "@/lib/utils";
import { Circle, CheckCircle2, Pencil, LayoutDashboard } from "lucide-react";

interface ProfileSidebarProps {
  activeSection: number;
  onSelectSection: (index: number) => void;
  onViewDashboard?: () => void;
}

function StatusIcon({ status }: { status: SectionStatus }) {
  switch (status) {
    case "complete":
      return <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />;
    case "in-progress":
      return <Pencil className="w-3.5 h-3.5 text-status-discussed flex-shrink-0" />;
    default:
      return <Circle className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />;
  }
}

export function ProfileSidebar({ activeSection, onSelectSection, onViewDashboard }: ProfileSidebarProps) {
  const { getSectionStatus } = useChildProfile();

  return (
    <nav className="space-y-0.5" aria-label="Profile sections">
      {onViewDashboard && (
        <button
          onClick={onViewDashboard}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs text-foreground hover:bg-muted transition-colors mb-1"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="font-medium">View dashboard</span>
        </button>
      )}
      {SECTION_TITLES.map((title, index) => {
        const status = getSectionStatus(index);
        const isActive = activeSection === index;

        return (
          <button
            key={index}
            onClick={() => onSelectSection(index)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs transition-colors",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted"
            )}
          >
            <StatusIcon status={status} />
            <span className="truncate">
              {index + 1}. {title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
