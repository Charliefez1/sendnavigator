import { Layout } from "@/components/Layout";
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
      <PageOrientation
        title="What the leaks are saying"
        description="Unconfirmed proposals and reported briefings. These are not government policy."
        lastUpdated="4th February 2026"
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

      <div className="content-section pb-16" />
    </Layout>
  );
}
