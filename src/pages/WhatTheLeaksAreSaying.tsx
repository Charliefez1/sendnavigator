import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatTheLeaksAreSaying() {
  return (
    <Layout>
      <SEOHead title="Unconfirmed reports about SEND reform" description="Government kite flying and what may or may not happen to SEND provision in England." path="/what-the-leaks-are-saying" />
      <PageOrientation
        title="Unconfirmed reports: government kite flying and what may or may not happen"
        description="Unconfirmed proposals and reported briefings. These are not government policy."
        lastUpdated="14th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Alongside formal consultation and public debate, there has been a steady flow of unconfirmed reports about SEND reform. These often come from anonymous briefings, sector gossip, selective leaks, or early media coverage.
            </p>
            <p>
              This is sometimes called kite flying. Ideas are floated to see how people react. Strong reactions shape what moves forward and what gets dropped.
            </p>
            <p>
              These reports are not policy. They are signals about the direction of thinking, not decisions. Treating them as facts creates unnecessary fear and confusion for families.
            </p>
          </div>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          How will this impact children and parents
        </h2>
        <div className="prose-calm space-y-3">
          <p>
            The main impact is psychological, not practical.
          </p>
          <p>
            Parents read headlines and worry that support is about to disappear. Some feel pressured to rush into applications or legal action out of fear of losing future access.
          </p>
          <p>
            For children, the risk is indirect. Anxiety in adults affects decision making, relationships with schools, and emotional safety at home. Understanding what is unconfirmed helps parents stay grounded and focused on what actually protects their child right now.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Statistics and facts
        </h2>
        <div className="prose-calm space-y-3">
          <p>These points describe the nature of reporting, not enacted change.</p>
          <ul className="space-y-2">
            <li>No unconfirmed report has been adopted into law.</li>
            <li>No leaked proposal has been formally published as government policy.</li>
            <li>All major changes to SEND would require primary legislation, which has not been introduced.</li>
            <li>Media reports referenced in the checked research set are attributed to anonymous sources, not formal announcements.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Understanding unconfirmed reports without panic
        </h2>
        <div className="prose-calm space-y-6">

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">What kite flying is</h3>
            <p>
              Kite flying is a common policy practice. Ideas are discussed privately, then selectively shared to test reaction.
            </p>
            <p>
              If the response is hostile, the idea may be dropped or reshaped. If the response is muted or supportive, it may progress to consultation.
            </p>
            <p>
              This does not mean families are being tricked. It means the system is trying to avoid making changes that cause harm or backlash.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Why SEND is particularly sensitive</h3>
            <p>
              SEND affects children, families, and legal rights. Any suggestion of reduced support understandably triggers strong reactions.
            </p>
            <p>
              Because the system is already under strain, rumours land harder. Families are already exhausted. Trust is already fragile.
            </p>
            <p>
              This makes SEND especially vulnerable to anxiety driven narratives.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Common themes in unconfirmed reports</h3>
            <p>The unconfirmed reports tend to cluster around a few ideas:</p>
            <ul className="space-y-2">
              <li>Reducing reliance on EHCPs.</li>
              <li>Introducing clearer tiers of support.</li>
              <li>Changing how funding is allocated.</li>
              <li>Reducing adversarial processes.</li>
            </ul>
            <p>
              What matters is this. None of these ideas are confirmed in their leaked form. They are areas of exploration, not settled decisions.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">What unconfirmed reports do not tell you</h3>
            <p>They do not tell you:</p>
            <ul className="space-y-2">
              <li>What safeguards would be in place.</li>
              <li>How existing children would be protected.</li>
              <li>What funding would accompany changes.</li>
              <li>How accountability would work.</li>
              <li>Whether ideas would survive consultation.</li>
            </ul>
            <p>
              Leaked summaries rarely include detail, nuance, or impact assessment. That is why they are dangerous if treated as certainty.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Why strong reactions still matter</h3>
            <p>
              Public reaction matters. Parent groups, professionals, and charities have influenced SEND policy before.
            </p>
            <p>
              The visibility of concern has already slowed reform timelines and increased emphasis on co-production. That shows the system is responsive, even if imperfectly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">How to read unconfirmed reports safely as a parent</h3>
            <p>Ask three questions:</p>
            <ul className="space-y-2">
              <li>Is this a law, a consultation, or a comment.</li>
              <li>Has anything actually changed today because of this.</li>
              <li>What protections still exist right now.</li>
            </ul>
            <p>
              In almost all cases, the answer to the second question is no.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">A grounding reminder</h3>
            <p>
              Your child's rights today are real. They are enforceable. They do not disappear because of a headline.
            </p>
            <p>
              Unconfirmed reports are part of a noisy policy environment, not a countdown clock.
            </p>
          </div>

        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
