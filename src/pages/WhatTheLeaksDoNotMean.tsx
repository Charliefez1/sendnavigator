import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  ProtectionsSection,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatTheLeaksDoNotMean() {
  return (
    <Layout>
      <PageOrientation
        title="What the leaks do not mean"
        description="Clarifications about what leaked information does not change."
        lastUpdated="4th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            Leaked information does not change the current system.
          </p>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Clarifications
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>Leaks are not decisions.</li>
            <li>Current law still applies.</li>
            <li>Existing plans remain enforceable.</li>
            <li>Assessment and appeal rights still exist.</li>
            <li>Improving mainstream support does not remove specialist provision.</li>
            <li>Expanding special schools does not weaken inclusion.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            Research shows that past reform debates often create fear before details are known. The most important point is this: nothing has changed yet. Decisions about your child must still be made using current law, not future proposals. Staying grounded in what is legally in place now is the safest position while reforms are debated.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
