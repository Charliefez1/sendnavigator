import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  InformationLayers,
  StatusSection,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatWeKnowSoFar() {
  return (
    <Layout>
      <PageOrientation
        title="What we know so far"
        description="The current state of the SEND system based on confirmed facts and data."
        lastUpdated="4th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            The evidence shows the SEND system is overwhelmed. Many more children need support than a decade ago, but support quality and outcomes have not improved. Families wait too long, councils overspend, schools struggle, and too many parents are pushed into legal action just to get help. Research across government, councils, and Parliament agrees this is a system problem, not a parenting problem. The growth in plans and appeals reflects unmet need earlier on. This context is essential because it explains why reform is being discussed at all.
          </p>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <ul className="space-y-2">
              <li>Over 500,000 children and young people in England have an Education, Health and Care Plan.</li>
              <li>Education, Health and Care Plan numbers have increased sharply since 2014.</li>
              <li>About 1.2 million pupils receive SEN Support without an Education, Health and Care Plan.</li>
              <li>High needs funding increased to £9.4 billion by 2024 to 25.</li>
              <li>Local authorities have accumulated over £3 billion of SEND funding deficits.</li>
              <li>Only about half of new Education, Health and Care Plans are issued within the 20 week legal deadline.</li>
              <li>Many families wait far longer, sometimes over a year.</li>
              <li>Tribunal appeals have increased significantly, with families winning most decided cases.</li>
              <li>Mainstream schools report increasing complexity of need and pressure on staff.</li>
              <li>Demand for specialist school places has continued to rise.</li>
            </ul>
          </>
        }
        discussedEmpty="This page focuses on confirmed data only."
        unconfirmedEmpty="This page focuses on confirmed data only."
      />

      <StatusSection type="unconfirmed">
        <ul className="space-y-2">
          <li>No unconfirmed data applies to the current system pressures described here.</li>
          <li>These figures and issues are widely acknowledged across government and sector reports.</li>
        </ul>
      </StatusSection>

      <StatusSection type="leaked">
        <ul className="space-y-2">
          <li>No leaks dispute the scale of demand, delays, or financial pressure described here.</li>
          <li>Leaks focus on responses to these pressures, not the facts themselves.</li>
        </ul>
      </StatusSection>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            Research across government, councils, and Parliament agrees on one thing: the system is not failing because parents are asking for too much. It is failing because needs are identified late, support is inconsistent, and families often have to escalate to get help. The data shows more children are entering the system, but support quality and outcomes have not kept pace. This is why reform is being discussed. It is not about reducing need. It is about the system struggling to respond to it.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
