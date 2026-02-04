import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import {
  CurrentPositionSection,
  CompletedMilestonesSection,
  UpcomingDecisionPointsSection,
  LongerTermPossibilitiesSection,
  WhatChangedSection,
} from "@/components/templates/TimelineSection";
import {
  currentPositionData,
  completedMilestones,
  upcomingDecisionPoints,
  longerTermPossibilities,
  recentChanges,
} from "@/config/timeline";

export default function Timeline() {
  return (
    <Layout>
      <PageHeader
        title="Timeline and next steps"
        description="Key decision points and milestones. We show only confirmed dates and likely windows, avoiding speculation."
      />

      {/* What Changed - appears first for transparency */}
      <WhatChangedSection 
        changes={recentChanges}
        lastUpdated={currentPositionData.lastUpdated}
      />

      {/* Current Position */}
      <CurrentPositionSection data={currentPositionData} />

      {/* Completed Milestones */}
      <CompletedMilestonesSection milestones={completedMilestones} />

      {/* Upcoming Decision Points */}
      <UpcomingDecisionPointsSection decisionPoints={upcomingDecisionPoints} />

      {/* Longer Term Possibilities */}
      <LongerTermPossibilitiesSection possibilities={longerTermPossibilities} />

      <div className="content-section pb-16" />
    </Layout>
  );
}
