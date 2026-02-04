import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  LeaksBanner,
  ReadingDepthControl,
  InformationLayers,
  BecomeRealSection,
  ProtectionsSection,
  UnknownSection,
  WatchNextSection,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatTheLeaksAreSaying() {
  const summaryPoints = [
    "Media reports have suggested possible changes to the SEND system are being considered.",
    "None of these reports represent decided government policy.",
    "Any significant changes would require consultation and likely new legislation.",
    "Current legal protections remain in place until any law is changed.",
    "It is important to distinguish between speculation and confirmed plans.",
    "This page will be updated as new credible reporting emerges.",
  ];

  const unknownQuestions = [
    "What specific changes, if any, is the government actually considering?",
    "What is the timeline for any potential consultation?",
    "How would any changes interact with existing legal frameworks?",
    "What transitional arrangements might be considered for current EHCP holders?",
  ];

  const watchItems = [
    {
      title: "Official government announcements on SEND policy",
      description: "Any formal statement would clarify what is actually being considered",
      type: "decision" as const,
    },
    {
      title: "Publication of any consultation documents",
      type: "consultation" as const,
    },
  ];

  return (
    <Layout>
      <PageOrientation
        title="What the leaks are saying"
        description="Unconfirmed proposals and reported briefings. These are not government policy."
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <LeaksBanner />

      <SixtySecondSummary points={summaryPoints} />

      <ReadingDepthControl
        keyPoints={
          <>
            <p>
              Various media outlets have reported on possible changes to SEND policy. 
              These reports are based on sources, briefings, or leaked documents rather 
              than official announcements.
            </p>
            <p>
              It is essential to understand that reporting about potential changes is 
              not the same as those changes being decided or implemented.
            </p>
            <p>
              The current legal framework continues to apply in full until and unless 
              Parliament passes new legislation.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>How to read these reports</h3>
            <p>
              When media reports mention "government considering" or "ministers planning", 
              this typically means officials are discussing options internally. Many ideas 
              discussed at this stage never become policy.
            </p>
            <p>
              Terms like "leaked documents" or "sources say" indicate the information has 
              not been officially confirmed. Such reports may be accurate, partially accurate, 
              or reflect early thinking that later changes.
            </p>

            <h3>Why leaks happen</h3>
            <p>
              Information may be leaked for various reasons: to test public reaction, to 
              influence internal debates, or simply because someone shared information 
              they should not have.
            </p>
            <p>
              The existence of a leak does not indicate the likelihood of a policy being 
              implemented.
            </p>
          </>
        }
      />

      <InformationLayers
        confirmedEmpty="This page covers unconfirmed information only. See 'What is changing' for confirmed policy."
        discussed={
          <>
            <p>
              Content about specific credible reporting will be added here as developments 
              occur. Each item will include the source and date of reporting.
            </p>
          </>
        }
        unconfirmed={
          <>
            <p>
              Specific leaked proposals will be documented here with appropriate context 
              about their reliability and what would need to happen for them to become reality.
            </p>
          </>
        }
      />

      <BecomeRealSection
        consultation={
          <p>
            Major policy changes typically require formal public consultation. This gives 
            families, professionals, and organisations the opportunity to respond before 
            decisions are made.
          </p>
        }
        legislation={
          <p>
            Changes to the legal framework governing SEND would require primary legislation 
            (an Act of Parliament) or secondary legislation (regulations). This is a 
            lengthy process with multiple stages.
          </p>
        }
        parliamentaryApproval={
          <p>
            Bills must pass through the House of Commons and House of Lords, with opportunities 
            for amendment at each stage. This can take many months or longer.
          </p>
        }
        commencement={
          <p>
            Even after a law is passed, it does not take effect immediately. Commencement 
            dates are set separately, and transitional arrangements are usually put in place.
          </p>
        }
      />

      <ProtectionsSection>
        <p>
          <strong>Today, the following protections remain in place:</strong>
        </p>
        <ul>
          <li>The Children and Families Act 2014 is current law</li>
          <li>EHCPs are legally binding documents</li>
          <li>Local authorities must provide what is specified in an EHCP</li>
          <li>Parents have the right to request assessments and appeal decisions</li>
          <li>The SEND Tribunal continues to operate</li>
        </ul>
        <p>
          These protections will remain until and unless Parliament changes the law.
        </p>
      </ProtectionsSection>

      <UnknownSection questions={unknownQuestions} />

      <WatchNextSection items={watchItems} />

      <div className="content-section pb-16" />
    </Layout>
  );
}
