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
    "This page covers confirmed reforms and official government plans.",
    "Everything listed here has been formally announced or legislated.",
    "We distinguish between changes that are in effect now and those planned for the future.",
    "Each item includes the source and date of confirmation.",
    "Proposed or leaked changes are covered separately in 'What the leaks are saying'.",
  ];

  const unknownQuestions = [
    "What is the full implementation timeline for announced changes?",
    "How will announced funding be allocated across local authorities?",
    "What guidance will accompany confirmed policy changes?",
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
              This section documents changes to SEND policy that have been officially 
              confirmed by government. This includes announcements, published plans, 
              and changes to legislation or statutory guidance.
            </p>
            <p>
              We only include information here once it has been formally confirmed. 
              Proposals that are still being discussed or leaked information appear 
              in other sections.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>How we verify confirmation</h3>
            <p>
              Information is marked as confirmed when it appears in official government 
              publications, ministerial statements, or enacted legislation.
            </p>
            <p>
              We include the date and source for each confirmed item so you can verify 
              the information yourself.
            </p>

            <h3>Types of confirmed changes</h3>
            <p>
              Confirmed changes may include: new legislation, amendments to existing law, 
              changes to statutory guidance, funding announcements, and implementation of 
              previously announced plans.
            </p>
          </>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <p>
              Specific confirmed changes will be documented here as they are announced. 
              Each entry will include the source, date, and current implementation status.
            </p>
            <p>
              Content is being developed to reflect the latest confirmed policy position.
            </p>
          </>
        }
        discussedEmpty="This page focuses on confirmed information only."
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
      </PracticalImplications>

      <UnknownSection questions={unknownQuestions} />

      <WatchNextSection items={watchItems} />

      <div className="content-section pb-16" />
    </Layout>
  );
}
