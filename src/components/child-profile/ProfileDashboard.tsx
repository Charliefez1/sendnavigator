import { useChildProfile, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import {
  extractChildOverview,
  extractKeyStrengths,
  extractKeyNeeds,
  extractCommunicationSnapshot,
  extractWhatHelps,
  extractSectionCompletion,
  hasAnyContent,
} from "@/lib/profile-dashboard-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Star, AlertTriangle, MessageCircle, Heart, CheckCircle2, Circle } from "lucide-react";

interface ProfileDashboardProps {
  onBack: () => void;
  onNavigateToSection?: (index: number) => void;
}

export function ProfileDashboard({ onBack, onNavigateToSection }: ProfileDashboardProps) {
  const { state, getSectionStatus } = useChildProfile();

  const overview = extractChildOverview(state);
  const strengths = extractKeyStrengths(state);
  const needs = extractKeyNeeds(state);
  const communication = extractCommunicationSnapshot(state);
  const helps = extractWhatHelps(state);
  const completion = extractSectionCompletion(state, getSectionStatus);
  const hasContent = hasAnyContent(state);

  const childName = overview.childName || "your child";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-semibold text-foreground">
            {overview.childName ? `${overview.childName}'s Profile` : "Profile Dashboard"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            At a glance summary of everything in this profile
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to profile
        </Button>
      </div>

      {!hasContent && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No sections have been completed yet. Go back to the profile builder to start filling in sections.
            </p>
          </CardContent>
        </Card>
      )}

      {hasContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Child Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4 text-primary" />
                Child overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm text-foreground">{overview.childName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reason for profile</p>
                <p className="text-sm text-foreground">{overview.reason || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed by</p>
                <p className="text-sm text-foreground">{overview.filledBy || "Not provided"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Section Completion */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Section completion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {completion.completedCount} of {completion.totalCount} sections
                </span>
                <span className="font-medium text-foreground">{completion.percentage}%</span>
              </div>
              <Progress value={completion.percentage} className="h-2" />
              <div className="max-h-40 overflow-y-auto space-y-0.5 pt-1">
                {completion.sections.map((s) => (
                  <button
                    key={s.index}
                    onClick={() => onNavigateToSection?.(s.index)}
                    className="w-full flex items-center gap-2 px-2 py-1 rounded text-left text-xs hover:bg-muted transition-colors"
                  >
                    {s.status !== "empty" ? (
                      <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                    ) : (
                      <Circle className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                    )}
                    <span className="truncate text-foreground">
                      {s.index + 1}. {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Strengths */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Star className="w-4 h-4 text-amber-500" />
                Key strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {strengths.items.length > 0 ? (
                <ul className="space-y-1.5">
                  {strengths.items.map((item, i) => (
                    <li key={i} className="text-sm text-foreground flex gap-2">
                      <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Not added yet</p>
              )}
            </CardContent>
          </Card>

          {/* Key Needs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Key needs and sensitivities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {needs.items.length > 0 ? (
                <ul className="space-y-1.5">
                  {needs.items.map((item, i) => (
                    <li key={i} className="text-sm text-foreground flex gap-2">
                      <span className="text-orange-500 flex-shrink-0 mt-0.5">•</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Not added yet</p>
              )}
            </CardContent>
          </Card>

          {/* Communication Snapshot */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                Communication snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {communication.preferredStyle || communication.underStress || communication.nonVerbal ? (
                <>
                  {communication.preferredStyle && (
                    <div>
                      <p className="text-xs text-muted-foreground">Communication style</p>
                      <p className="text-sm text-foreground line-clamp-2">{communication.preferredStyle}</p>
                    </div>
                  )}
                  {communication.underStress && (
                    <div>
                      <p className="text-xs text-muted-foreground">Under stress</p>
                      <p className="text-sm text-foreground line-clamp-2">{communication.underStress}</p>
                    </div>
                  )}
                  {communication.nonVerbal && (
                    <div>
                      <p className="text-xs text-muted-foreground">Social cues</p>
                      <p className="text-sm text-foreground line-clamp-2">{communication.nonVerbal}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Not added yet</p>
              )}
            </CardContent>
          </Card>

          {/* What Helps Most */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Heart className="w-4 h-4 text-rose-500" />
                What helps most
              </CardTitle>
            </CardHeader>
            <CardContent>
              {helps.items.length > 0 ? (
                <ul className="space-y-1.5">
                  {helps.items.map((item, i) => (
                    <li key={i} className="text-sm text-foreground flex gap-2">
                      <span className="text-rose-500 flex-shrink-0 mt-0.5">•</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Not added yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
