import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatTheLeaksDoNotMean() {
  return (
    <Layout>
      <SEOHead
        title="What leaks do not mean"
        description="Understanding what leaked SEND reform proposals do and do not mean for parents and children."
        path="/what-the-leaks-do-not-mean"
      />
      <PageOrientation
        title="What leaks do not mean, and why they happen at all"
        description="Understanding leaked proposals without being pulled into panic or rushed decisions."
        lastUpdated="13th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Leaks are not designed to help parents. They are designed to test ideas, manage risk, and shape reaction.
            </p>
            <p>
              They arrive without safeguards, without timelines, and without explanation. In a system where many parents already feel unsafe, they land hard.
            </p>
            <p>
              A leak does not mean a decision has been made. It does not mean your child is about to lose support. It does not change the law.
            </p>
            <p>
              This section exists to help you read leaks without being pulled into panic or forced into rushed decisions that may not serve your child.
            </p>
          </div>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          How will this impact children and parents
        </h2>
        <div className="prose-calm space-y-3">
          <p>
            Leaks affect parents first. They heighten fear, urgency, and exhaustion. They can push families into action before they are ready or before it is actually needed.
          </p>
          <p>
            Children then feel the impact indirectly. Adults under threat behave differently. Home becomes more tense. School decisions feel heavier. Trust feels fragile.
          </p>
          <p>
            The real risk is not the leak itself. It is the pressure it puts on families to act from fear rather than need.
          </p>
          <p>
            Understanding what leaks are, and what they are not, helps protect both you and your child.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Statistics and facts
        </h2>
        <div className="prose-calm space-y-3">
          <p>This section is about interpretation, not new policy data.</p>
          <p>From the checked research set:</p>
          <ul className="space-y-2">
            <li>No leaked SEND reform proposal has been published as a White Paper.</li>
            <li>No leaked proposal has been introduced to Parliament.</li>
            <li>No leaked idea has legal force.</li>
            <li>Any change to EHCP rights, thresholds, or appeals would require primary legislation.</li>
            <li>Existing statutory SEND rights remain in place as of mid-February 2026.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Reading leaks as a parent, not a policymaker
        </h2>
        <div className="prose-calm space-y-6">

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">Start with what cannot change overnight</h3>
            <p>Until the law changes, these facts hold:</p>
            <ul className="space-y-2">
              <li>EHCPs remain statutory and enforceable.</li>
              <li>Local authorities remain responsible for securing provision in EHCPs.</li>
              <li>Parents retain the right to request assessment.</li>
              <li>Parents retain the right to appeal decisions.</li>
            </ul>
            <p>
              A leak cannot switch these off. A headline does not override legislation.
            </p>
            <p>
              This is the ground you stand on, even when everything feels uncertain.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">Why governments leak or kite fly ideas</h3>
            <p>Governments rarely leak by accident. This is about process, not malice.</p>
            <p>Common reasons include:</p>
            <ul className="space-y-2">
              <li>Testing reaction without commitment.</li>
              <li>Softening the ground for later proposals.</li>
              <li>Surfacing problems in early thinking.</li>
              <li>Managing disagreement inside government.</li>
              <li>Shifting the narrative towards change being inevitable.</li>
            </ul>
            <p>
              SEND reform is politically sensitive, legally complex, and expensive. Leaks allow ideas to be floated without owning them.
            </p>
            <p>
              These messages are not written for parents. They are written for policy shaping.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">What leaks usually leave out</h3>
            <p>Leaks strip away the parts that matter most to families:</p>
            <ul className="space-y-2">
              <li>Who would be protected.</li>
              <li>What happens to children who already have EHCPs.</li>
              <li>How transitions would work.</li>
              <li>What funding would sit behind any new model.</li>
              <li>What challenge or appeal routes would exist.</li>
            </ul>
            <p>
              Without these details, any idea will sound harsher and more threatening than it would be in practice.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">The fear underneath the headline</h3>
            <p>Most parents are not afraid of reform in theory. They are afraid of loss.</p>
            <p>Common fears include:</p>
            <ul className="space-y-2">
              <li>My child will lose the support that is keeping them safe.</li>
              <li>I will not be believed again.</li>
              <li>We will be forced to start from scratch.</li>
              <li>School will stop trying once the paperwork changes.</li>
              <li>I do not have the strength for another fight.</li>
            </ul>
            <p>
              These fears are rational. They come from lived experience, not overreaction.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">A simple way to filter leaks</h3>
            <p>When you see a leak, ask three questions:</p>
            <ul className="space-y-2">
              <li>What exactly is this source.</li>
              <li>What would have to happen for this to become real.</li>
              <li>What does my child need this month.</li>
            </ul>
            <p>
              The third question matters most. It protects your child now, not an imagined future system.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">Acting versus reacting</h3>
            <p>
              Some families will choose to push for statutory protection because support is not in place now. That can be the right decision.
            </p>
            <p>The difference is motive.</p>
            <p>
              Acting because your child needs protection is grounded.
            </p>
            <p>
              Acting only because of a headline often leads to burnout.
            </p>
            <p>
              Fear-driven urgency drains energy that children need from you.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">What leaks are actually useful for</h3>
            <p>Leaks do have value when used properly. They show:</p>
            <ul className="space-y-2">
              <li>Where government pressure points are.</li>
              <li>Which rights may be under threat.</li>
              <li>Where parent voices will matter most.</li>
            </ul>
            <p>They are signals, not instructions.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">The bottom line, without false reassurance</h3>
            <p>You are allowed to feel scared and still think clearly.</p>
            <p>Right now:</p>
            <ul className="space-y-2">
              <li>Reform is being discussed.</li>
              <li>Some improvements are confirmed and underway.</li>
              <li>Major rights changes are not confirmed.</li>
              <li>The law protecting your child has not changed.</li>
            </ul>
            <p>
              If a change would seriously affect your child's rights, it would not arrive quietly. It would come with consultation, scrutiny, and time.
            </p>
            <p>
              You are not missing a secret deadline. You are not already too late.
            </p>
          </div>

        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
