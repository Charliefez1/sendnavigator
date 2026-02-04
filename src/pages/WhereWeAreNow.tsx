import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  ReadingDepthControl,
  InformationLayers,
  PracticalImplications,
  UnknownSection,
  WatchNextSection,
} from "@/components/templates";
import { PassiveFeedback, ActiveFeedbackForm } from "@/components/feedback";
import { useLocation } from "react-router-dom";

export default function WhereWeAreNow() {
  const unknownQuestions = [
    "It is not yet clear how quickly delays in EHC plan processes will reduce.",
    "It is not clear whether rising funding will stabilise demand under the current system.",
    "It is not known how outcomes beyond academic attainment will change without wider reform.",
  ];

  const watchItems = [
    {
      title: "Government response to SEND system pressures",
      description: "Expected updates on funding and capacity",
      type: "decision" as const,
    },
  ];

  const location = useLocation();

  return (
    <Layout>
      <PageOrientation
        title="Where we are now"
        description="The current SEND system in England as it operates today."
        lastUpdated="4th February 2026"
      />

      <SixtySecondSummary
        prose={
          <>
            <p>
              The SEND system in England is under sustained pressure. More children and young people are being identified as needing support, and the number with Education, Health and Care plans has risen sharply over the past decade. While funding has increased, many families still experience long waits, uneven provision, and disagreement about what support should be provided. Government bodies, councils, schools, and families broadly agree that the system is struggling to deliver consistent, timely support in its current form.
            </p>
            <p>
              This page explains what is true about SEND provision in England today. It focuses on how the system works now, where the pressures sit, and what is firmly established as fact, before any future changes are considered.
            </p>
          </>
        }
      />

      <ReadingDepthControl
        keyPoints={
          <>
            <p>
              SEND provision in England is governed by the Children and Families Act 2014.
              This legislation established Education, Health and Care Plans (EHCPs) as the 
              main mechanism for legally binding support for children and young people with 
              more complex needs.
            </p>
            <p>
              In 2024 to 2025, around 482,000 pupils in England had an EHC plan, while 
              around 1.28 million pupils received SEN support without an EHC plan.
            </p>
            <p>
              The SEND system has been described as financially unsustainable by the 
              National Audit Office. High needs funding increased to around £9.4 billion 
              in 2024 to 2025.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>EHC plan timeliness</h3>
            <p>
              Only around half of EHC plans were issued within the 20 week legal timescale, 
              according to the Public Accounts Committee (January 2025).
            </p>

            <h3>Tribunal activity</h3>
            <p>
              Reports state that most SEND tribunal cases are decided in favour of families, 
              depending on how outcomes are counted.
            </p>

            <h3>Local variation</h3>
            <p>
              Reports describe wide variation in SEND provision between local areas.
            </p>
          </>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <p>
              SEND support in England is set out in law through the Children and Families Act 2014. Children and young people with special educational needs may receive help in two main ways. Many receive SEN support, which is extra help provided by schools without a legal plan. Others have an Education, Health and Care plan, often called an EHC plan. An EHC plan is a legally binding document that describes a child's needs, the support they must receive, and the educational setting they should attend. Local authorities are responsible for making sure the support written into a plan is provided.
            </p>
            <p>
              The number of children and young people with EHC plans has increased significantly over time. As of the most recent national data, just under half a million pupils in England have an EHC plan, and well over a million receive SEN support without one. This growth has been steady year on year and shows no sign of reversing in the short term.
            </p>
            <p>
              There is a legal time limit of 20 weeks to complete an EHC needs assessment and issue a final plan. In practice, this deadline is often missed. National oversight bodies report that only around half of plans are completed on time. Some families wait much longer, which can leave children without agreed support for extended periods.
            </p>
            <p>
              Disagreement is a common feature of the current system. When families believe a decision is wrong, they can appeal to the SEND Tribunal. The number of appeals has risen sharply over recent years. Oversight bodies report that tribunals frequently find in favour of families, either in full or in part. This pattern is widely seen as a sign that decisions are often being challenged because support is not being agreed early or clearly enough.
            </p>
            <p>
              Funding for SEND has increased substantially. High needs funding is now significantly higher than it was a decade ago. Despite this, many local authorities are overspending their SEND budgets. National audit bodies have concluded that the current system is financially unsustainable without change. This financial pressure affects councils' ability to plan services and contributes to delays and disputes.
            </p>
            <p>
              Outcomes for children and young people with SEND have not improved in line with rising identification and spending. Attainment gaps between pupils with SEND and their peers remain wide, and progress has been uneven. This has raised concerns that the system is focusing heavily on processes and plans, without consistently delivering better day to day support.
            </p>
          </>
        }
        discussed={
          <>
            <p>
              There is widespread discussion about uneven provision across the country. Families and professionals often describe a "postcode lottery", where the level and type of support available depends on where a child lives. This variation is acknowledged in parliamentary and sector reporting and is a key driver behind calls for clearer national standards.
            </p>
            <p>
              There is also ongoing public discussion about the high level of conflict in the system. Reports frequently point to the volume of appeals and complaints as evidence that the current approach encourages disagreement rather than early resolution. This is not disputed in principle, although views differ on how it should be addressed.
            </p>
          </>
        }
        unconfirmedEmpty="This section focuses on current confirmed arrangements only."
      />

      <PracticalImplications>
        <p>
          For families navigating the current system, this could mean:
        </p>
        <ul>
          <li>Wait times for EHC plan assessments may be longer than the legal timeframe in some areas</li>
          <li>Schools may have varying levels of capacity to provide SEN Support</li>
          <li>Families may need to understand their legal rights to navigate the process effectively</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Notes for careful handling:</strong> Legal rights linked to EHC plans must be described precisely. 
          Statistics vary depending on age range and dataset used.
        </p>
      </PracticalImplications>

      <UnknownSection questions={unknownQuestions} />

      <WatchNextSection items={watchItems} />

      <div className="content-section py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          This page describes the position as it stands today. No rights or processes have changed at this stage.
        </p>
      </div>

      {/* Feedback section */}
      <div className="content-section pb-8">
        <PassiveFeedback pageUrl={location.pathname} />
      </div>

      <div className="content-section pb-16">
        <ActiveFeedbackForm pageUrl={location.pathname} />
      </div>
    </Layout>
  );
}
