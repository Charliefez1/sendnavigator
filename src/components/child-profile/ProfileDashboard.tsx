import { useChildProfile } from "@/contexts/ChildProfileContext";
import { hasAnyContent } from "@/lib/profile-dashboard-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { ProfileIdentityHeader } from "./dashboard/ProfileIdentityHeader";
import { ProfileWheel } from "./dashboard/ProfileWheel";
import { ChildVoicePanel } from "./dashboard/ChildVoicePanel";
import { EmergingThemes } from "./dashboard/EmergingThemes";
import { ReadinessPanel } from "./dashboard/ReadinessPanel";

interface ProfileDashboardProps {
  onBack: () => void;
  onNavigateToSection?: (index: number) => void;
  onGenerateReport?: () => void;
}

export function ProfileDashboard({ onBack, onNavigateToSection, onGenerateReport }: ProfileDashboardProps) {
  const { state, getSectionStatus } = useChildProfile();
  const hasContent = hasAnyContent(state);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Back button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to profile
        </Button>
      </div>

      {/* 1. Identity Header */}
      <ProfileIdentityHeader state={state} />

      {!hasContent ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Start filling in sections to see your child's profile come to life here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* 2 + 5: Wheel and Readiness side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileWheel state={state} onNavigateToSection={onNavigateToSection} />
            <ReadinessPanel
              state={state}
              getSectionStatus={getSectionStatus}
              onNavigateToSection={onNavigateToSection}
              onGenerateReport={onGenerateReport}
            />
          </div>

          {/* 3. Child Voice */}
          <ChildVoicePanel state={state} onNavigateToSection={onNavigateToSection} />

          {/* 4. Emerging Themes */}
          <EmergingThemes state={state} onNavigateToSection={onNavigateToSection} />
        </>
      )}
    </div>
  );
}
