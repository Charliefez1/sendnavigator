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
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatIsChanging() {
  const summaryPoints = [
    "Government has an active SEND reform programme.",
    "Testing of reforms has been underway since 2023.",
    "A national conversation has completed.",
    "Investment in training and specialist places has been announced.",
    "Structural changes are not yet in force.",
    "Existing legal rights remain in place.",
  ];

  const unknownQuestions = [
    "Final content of national SEND standards.",
    "Which elements will require changes to law.",
    "How reforms will be implemented nationally.",
  ];

  const watchItems = [
    {
      title: "Implementation of confirmed improvement plan commitments",
      type: "decision" as const,
    },
    {
      title: "Statutory guidance updates",
      type: "publication" as const,
    },
  ];

  return (
    <Layout>
      <PageOrientation
        title="What is changing"
        description="Confirmed reforms and official plans from government."
        lastUpdated="4th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary points={summaryPoints} />

      <ReadingDepthControl
        keyPoints={
          <>
            <p>
              The SEND and Alternative Provision Improvement Plan was published on 
              2 March 2023. A SEND Change Programme is testing reforms with selected 
              local areas.
            </p>
            <p>
              A national conversation on SEND reform ran from December 2025 to 
              January 2026. Government announced £3 billion capital funding to expand 
              specialist places and a £200 million SEND teacher training programme.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>What is being tested</h3>
            <p>
              National SEND standards are being developed and tested. Digital approaches 
              to EHC plans are being piloted in some areas.
            </p>

            <h3>Important context</h3>
            <p>
              Pilots are not national policy. No confirmed changes to EHC plan eligibility 
              have been made.
            </p>
          </>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <p>
              <strong>The SEND and Alternative Provision Improvement Plan was published.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (government policy) · 02 March 2023</span>
            </p>
            <p>
              <strong>A SEND Change Programme is testing reforms with selected local areas.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (government programme) · 02 March 2023</span>
            </p>
            <p>
              <strong>A national conversation on SEND reform ran from December 2025 to January 2026.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (government consultation) · 14 January 2026</span>
            </p>
            <p>
              <strong>Government announced £3 billion capital funding to expand specialist places.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (government announcement) · 02 March 2023</span>
            </p>
            <p>
              <strong>Government announced a £200 million SEND teacher training programme.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (government announcement) · 16 January 2026</span>
            </p>
          </>
        }
        discussed={
          <>
            <p>
              <strong>National SEND standards are being developed and tested.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (government reporting) · ongoing since 2023</span>
            </p>
            <p>
              <strong>Digital approaches to EHC plans are being piloted in some areas.</strong>
              <br />
              <span className="text-sm text-muted-foreground">Source: Department for Education (government reporting) · ongoing since 2023</span>
            </p>
          </>
        }
        unconfirmedEmpty="This page focuses on confirmed information only. See 'What the leaks are saying' for unconfirmed reports."
      />

      <PracticalImplications>
        <p>
          This section will explain what confirmed changes could mean in practice 
          once specific policies are documented above.
        </p>
        <p>
          We will use language like "this could mean" and "some families may notice" 
          rather than making predictions about individual circumstances.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Notes for careful handling:</strong> No confirmed changes to EHC plan eligibility. 
          Pilots are not national policy.
        </p>
      </PracticalImplications>

      <UnknownSection questions={unknownQuestions} />

      <WatchNextSection items={watchItems} />

      <div className="content-section pb-16" />
    </Layout>
  );
}
