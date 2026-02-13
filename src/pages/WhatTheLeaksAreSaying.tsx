import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
  LeaksBanner,
  StatusSection,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatTheLeaksAreSaying() {
  return (
    <Layout>
      <SEOHead title="What the leaks are saying" description="Unconfirmed reports and leaked documents about possible SEND reforms, clearly labelled and contextualised." path="/what-the-leaks-are-saying" />
      <PageOrientation
        title="What the leaks are saying"
        description="Unconfirmed proposals and reported briefings. These are not government policy."
        lastUpdated="7th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <LeaksBanner />

      <SixtySecondSummary
        prose={
          <p>
            Leaked reports describe more radical ideas, including tiered support systems, fewer full legal plans, school level funding, and limits on appeals. These reports are not policy, but they reflect real debates about cost, accountability, and pressure on the system. Research into similar models shows they only work when early support is strong and properly resourced. Parent groups and legal experts have raised concerns because poorly designed tiered systems can leave families stuck without meaningful help.
          </p>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Reported leaks
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>A tiered support model.</li>
            <li>Digital passports.</li>
            <li>Fewer full statutory plans.</li>
            <li>Education only plans for some children.</li>
            <li>Step by step progression through support levels.</li>
            <li>School level funding instead of individual plans.</li>
            <li>Reduced appeal access.</li>
          </ul>
        </div>
      </section>

      <StatusSection type="unconfirmed">
        <ul className="space-y-2">
          <li>All items on this page are unconfirmed by nature.</li>
          <li>They do not represent agreed policy.</li>
        </ul>
      </StatusSection>

      <StatusSection type="leaked">
        <ul className="space-y-2">
          <li>This entire page is based on leaked and unofficial reporting.</li>
          <li>None of the proposals listed are confirmed government decisions.</li>
        </ul>
      </StatusSection>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            Research into previous systems shows tiered models can work only when lower tiers are properly resourced. Parents and legal experts warn that if enforceable rights are removed before support quality improves, families may be left without effective routes to challenge decisions. This is why leaked proposals have caused concern, even though they are not confirmed.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Why governments leak or kite fly ideas
        </h2>
        <div className="prose-calm space-y-4">
          <p>
            Governments rarely leak information by accident. This is not about conspiracy. It is about managing risk, reaction, and politics in complex systems.
          </p>
          <p>Here are the main reasons it happens.</p>

          <h3 className="text-lg font-medium text-foreground mt-6">1. To test public reaction without commitment</h3>
          <p>
            Leaking allows government to see how parents, professionals, media, and opposition respond before anything is formally proposed.
          </p>
          <p>
            If the reaction is strong and negative, the idea can be quietly dropped without the cost of a public U-turn.
          </p>
          <p>
            For SEND, this is especially likely because reforms affect children's rights and carry high political risk.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-6">2. To soften the ground for change</h3>
          <p>
            Sometimes leaks are used to make later proposals feel less shocking.
          </p>
          <p>
            When people have already seen a worse version in the media, a more moderate official proposal can appear reasonable by comparison, even if it still represents a significant change.
          </p>
          <p>
            This does not mean the leaked version was ever intended to happen exactly as described.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-6">3. To surface problems early</h3>
          <p>
            In some cases, officials leak incomplete ideas precisely to expose flaws.
          </p>
          <p>
            Feedback from parents, charities, lawyers, and professionals highlights where an idea would fail in the real world. That information feeds back into policy design.
          </p>
          <p>
            This is more common in areas like SEND where lived experience matters.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-6">4. To manage internal disagreement</h3>
          <p>
            Government is not one voice.
          </p>
          <p>
            Departments, advisers, and ministers often disagree. Leaks can reflect internal tensions, with one group signalling concern about the direction of travel or trying to influence the final outcome.
          </p>
          <p>
            In SEND reform, this is likely given the competing pressures of rights, cost, workforce capacity, and outcomes.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-6">5. To change the narrative</h3>
          <p>
            When a system is described as "in crisis", leaks can shift the conversation towards inevitability.
          </p>
          <p>
            The message becomes: something must change, even if we do not yet agree how. That framing makes reform politically easier later.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-6">What this means for parents</h3>
          <p>
            Leaks are not messages aimed at families. They are tools aimed at policy shaping.
          </p>
          <p>
            Parents are not meant to act on them. Parents are meant to react to them, so government can observe the response.
          </p>
          <p>
            Knowing this does not remove anxiety. But it does help explain why leaked ideas often feel extreme, incomplete, and emotionally destabilising.
          </p>
          <p>
            They are not written for care. They are written for impact.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
