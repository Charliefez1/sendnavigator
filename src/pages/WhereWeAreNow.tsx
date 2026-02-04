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
  const summaryPoints = [
    "SEND support in England is set out in law through EHC plans and SEN support.",
    "Demand has grown quickly over the last decade.",
    "Many plans are late and families often use tribunals to resolve disputes.",
    "Spending has increased but outcomes have not improved at the same pace.",
    "Local authorities face serious financial pressure.",
    "Government bodies agree the system is under strain.",
  ];

  const unknownQuestions = [
    "How quickly performance on EHC plan timescales will improve.",
    "Whether current spending levels will stabilise demand.",
    "How outcomes beyond attainment will change.",
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

      <SixtySecondSummary points={summaryPoints} />

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
              <strong>SEND provision in England is governed by the Children and Families Act 2014.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: UK Parliament (legislation) · 13 March 2014</span>
            </p>
            <p>
              <strong>In 2024 to 2025, around 482,000 pupils in England had an EHC plan.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (official statistics) · 26 June 2025</span>
            </p>
            <p>
              <strong>In 2024 to 2025, around 1.28 million pupils received SEN support without an EHC plan.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (official statistics) · 26 June 2025</span>
            </p>
            <p>
              <strong>Only around half of EHC plans were issued within the 20 week legal timescale.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Public Accounts Committee (parliamentary report) · 15 January 2025</span>
            </p>
            <p>
              <strong>The SEND system has been described as financially unsustainable.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: National Audit Office (audit report) · 24 October 2024</span>
            </p>
            <p>
              <strong>High needs funding increased to around £9.4 billion in 2024 to 2025.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Local Government Association (government funding data) · 23 April 2025</span>
            </p>
          </>
        }
        discussed={
          <>
            <p>
              <strong>Reports describe wide variation in SEND provision between local areas.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Local Government Association (parliamentary and sector reporting) · December 2025</span>
            </p>
            <p>
              <strong>Reports state that most SEND tribunal cases are decided in favour of families, depending on how outcomes are counted.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Public Accounts Committee (parliamentary evidence) · 15 January 2025</span>
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
