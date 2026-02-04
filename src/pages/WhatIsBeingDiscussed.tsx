import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  InformationLayers,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatIsBeingDiscussed() {
  return (
    <Layout>
      <PageOrientation
        title="What is being discussed"
        description="Proposals and ideas being publicly debated by recognised bodies and in mainstream reporting."
        lastUpdated="4th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            Most reform discussions focus on one issue: too many children only get help once families fight for a legal plan. The ideas being talked about aim to improve early support in schools, reduce variation between areas, and make the system less dependent on legal escalation. That includes national standards, better trained staff, specialist teams working with schools, and digital systems to reduce delays. At the same time, there is active debate about how to do this without weakening rights. Research and parent feedback consistently show that early support only works if it is reliable, funded, and accountable.
          </p>
        }
      />

      <InformationLayers
        confirmedEmpty="See 'What is actually changing' for confirmed reforms."
        discussed={
          <>
            <ul className="space-y-2">
              <li>A national set of SEND standards to reduce variation between areas.</li>
              <li>Clearer expectations for support in mainstream schools.</li>
              <li>Digital first Education, Health and Care Plans.</li>
              <li>Standardised plan templates and online tracking.</li>
              <li>Funding changes so support is less tied to individual plans.</li>
              <li>Stronger early support in mainstream settings.</li>
              <li>More specialist teams working directly with schools.</li>
              <li>A tiered support system below a full plan.</li>
              <li>Digital passports to record needs and support.</li>
              <li>Possible changes to appeal routes or extra steps before tribunal.</li>
              <li>Higher thresholds for who qualifies for a full plan.</li>
              <li>A stronger mainstream first approach with debate about parental choice.</li>
            </ul>
          </>
        }
        unconfirmedEmpty="See 'What the leaks are saying' for unconfirmed reports."
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            The research shows a major problem: many children only get help once their situation has escalated far enough to justify a legal plan. The proposals aim to fix that by improving what happens earlier. However, the concern raised by parent groups and legal experts is that early support only works if it is properly funded, delivered, and accountable. Without that, reducing reliance on plans risks leaving families with fewer routes to challenge poor decisions. This tension sits at the centre of the reform debate.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
