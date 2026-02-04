import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import {
  SixtySecondSummary,
  InformationLayers,
  UnknownSection,
} from "@/components/templates";
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
  const unknownQuestions = [
    "We do not yet know the exact date the formal consultation will open.",
    "We do not yet know what proposals will be included in the consultation.",
    "We do not yet know whether legislation will be introduced or when.",
    "We do not yet know the timetable for any national implementation.",
  ];

  return (
    <Layout>
      <PageHeader
        title="Timeline and next steps"
        description="Key decision points and milestones. We show only confirmed dates and likely windows, avoiding speculation."
        lastUpdated="4th February 2026"
      />

      <SixtySecondSummary
        prose={
          <>
            <p>
              SEND reform in England is being taken forward in stages rather than through immediate change. The work so far has focused on review, testing, and engagement rather than new law. A national conversation has recently closed, and the government has said there will be a formal consultation next. Any legal changes would need to go through Parliament before taking effect.
            </p>
            <p>
              This page explains the confirmed sequence of activity and where the process currently sits.
            </p>
          </>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <p>
              In 2023, the government published the SEND and Alternative Provision Improvement Plan. This marked the formal start of the current reform programme and set out that changes would be developed over time rather than introduced all at once.
            </p>
            <p>
              Following this, a Change Programme began in selected local areas. This programme is testing parts of the proposed approach, such as new ways of describing support and improving coordination across services. These tests are intended to inform future proposals and do not replace existing SEND processes.
            </p>
            <p>
              Between December 2025 and January 2026, the government ran a national conversation on SEND reform. This invited views from families, professionals, and young people and was positioned as an early engagement step, not a consultation on draft policy.
            </p>
            <p>
              The government has stated that a formal consultation on SEND reform will take place in 2026. This consultation is expected to sit alongside a Schools White Paper and would be the stage at which detailed proposals are set out for public comment.
            </p>
            <p>
              If changes to law are proposed, they would need to be introduced through legislation and debated in Parliament. No legal changes can take effect without this process being completed.
            </p>
          </>
        }
        discussed={
          <>
            <p>
              It is being reported that the outcomes of the national conversation will inform the content of the planned consultation. It is also being reported that testing from the Change Programme will feed into future proposals. These points describe process, not final decisions.
            </p>
          </>
        }
        unconfirmedEmpty="This page focuses on confirmed timeline information only. See 'What the leaks are saying' for unconfirmed reports."
      />

      {/* What Changed - appears for transparency */}
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

      <UnknownSection questions={unknownQuestions} />

      <section className="content-section py-8 border-t border-border">
        <p className="text-muted-foreground">
          Current SEND rights and statutory processes remain in place unless and until formal changes are made through consultation and law.
        </p>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
