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
  const unknownQuestions = [
    "We do not yet know the final content of any national SEND standards.",
    "We do not yet know which proposals will require changes to legislation.",
    "We do not yet know when any national changes would take effect.",
    "We do not yet know how tested approaches would be rolled out across all areas.",
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

      <SixtySecondSummary
        prose={
          <>
            <p>
              The government has published a formal programme to reform SEND in England, but most changes are not yet in place. Work so far has focused on testing ideas, gathering views, and increasing capacity rather than changing legal rights. Some funding and training commitments have been announced and are beginning to roll out. Larger structural changes are still being developed and have not been finalised.
            </p>
            <p>
              This page explains what has been officially published or announced, what activity is underway, and where decisions have not yet been made.
            </p>
          </>
        }
      />

      <ReadingDepthControl
        keyPoints={
          <>
            <p>
              In 2023, the government published the SEND and Alternative Provision Improvement Plan, establishing a programme of work to test and develop possible improvements.
            </p>
            <p>
              A national conversation on SEND reform ran from December 2025 to January 2026. The government has stated that any major changes will be subject to formal consultation.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>What is being tested</h3>
            <p>
              Selected local areas are involved in a Change Programme, testing elements such as clearer descriptions of support and improved coordination between education, health and care services.
            </p>

            <h3>Important context</h3>
            <p>
              The Improvement Plan did not amend existing law or alter current entitlements. Testing is designed to inform future proposals rather than replace current arrangements.
            </p>
          </>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <p>
              In 2023, the government published the SEND and Alternative Provision Improvement Plan. This document set out a direction for reform and confirmed that the SEND system would change over time. It did not amend existing law or alter current entitlements. Instead, it established a programme of work to test and develop possible improvements.
            </p>
            <p>
              As part of this programme, selected local areas have been involved in a Change Programme. These areas are testing elements such as clearer descriptions of support, improved coordination between education, health and care services, and new approaches to managing information about support. This testing phase is designed to inform future proposals rather than replace current arrangements.
            </p>
            <p>
              The government has also carried out a national conversation on SEND reform. This ran from December 2025 to January 2026 and invited views from parents, carers, professionals, and young people. The purpose was to gather evidence and perspectives before publishing formal proposals. Participation in the conversation does not affect access to support or legal rights.
            </p>
            <p>
              Several investment commitments have been formally announced. These include funding to increase specialist school and alternative provision places, and a national programme to expand SEND training for teachers. These measures are intended to address capacity and workforce skills within the existing system.
            </p>
            <p>
              The government has stated that any major changes will be subject to formal consultation. This consultation is expected to sit alongside a Schools White Paper and would be the point at which detailed proposals are set out publicly.
            </p>
          </>
        }
        discussed={
          <>
            <p>
              It is being reported that national SEND standards are being developed and tested. These are described as a way to bring greater consistency to SEND support across England. At this stage, standards are not final and have not been published for implementation.
            </p>
            <p>
              There is also reporting on the use of digital tools to support EHC plan processes. Some areas are testing new systems to manage information and reduce duplication. These are pilots and do not replace existing legal processes.
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
