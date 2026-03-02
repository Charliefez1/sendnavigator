import { Save, LayoutDashboard, UserRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useChildProfile, SECTION_TITLES } from "@/contexts/ChildProfileContext";

interface ProfileCompactHeaderProps {
  onViewDashboard?: () => void;
  onSave?: () => void;
  childName?: string;
  showDashboard?: boolean;
}

export function ProfileCompactHeader({ onViewDashboard, onSave, childName, showDashboard = true }: ProfileCompactHeaderProps) {
  const { getSectionStatus } = useChildProfile();

  const completedCount = SECTION_TITLES.reduce(
    (count, _, i) => count + (getSectionStatus(i) === "complete" ? 1 : 0),
    0
  );
  const percentage = Math.round((completedCount / SECTION_TITLES.length) * 100);

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30">
      <div className="content-section py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: title + progress */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "hsl(42 87% 50% / 0.12)" }}
            >
              <UserRound className="w-4 h-4" style={{ color: "hsl(42 87% 50%)" }} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {childName ? `${childName}'s Profile` : "My Child: A Profile"}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <Progress value={percentage} className="h-1.5 w-24" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {completedCount}/{SECTION_TITLES.length} sections
                </span>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {showDashboard && onViewDashboard && (
              <Button variant="outline" size="sm" onClick={onViewDashboard} className="gap-1.5 hidden sm:inline-flex">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Button>
            )}
            {showDashboard && onViewDashboard && (
              <Button variant="outline" size="icon" onClick={onViewDashboard} className="sm:hidden h-8 w-8">
                <LayoutDashboard className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
