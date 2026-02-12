import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatHasNotChanged() {
  return (
    <Layout>
      <PageOrientation
        title="What has not changed"
        description="Legal rights and protections that remain in place."
        lastUpdated="7th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            Your legal rights have not changed. Education, Health and Care Plans still carry the same legal weight. Local authorities still have the same duties to assess needs and secure provision. Schools still have duties to support children with SEN. If support is written into a plan, it must still be delivered. Appeals still exist and are still lawful. This matters because a lot of fear has come from rumours, not reality. Until Parliament changes the law, the protections created in 2014 remain in place. Research shows families continue to rely on these protections, and they are still enforceable.
          </p>
        }
      />

      {/* Legal framework still in place */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          The legal framework still in place
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>The Children and Families Act 2014 still governs SEND.</li>
            <li>The SEND Code of Practice 0 to 25 still applies.</li>
            <li>Education, Health and Care Plans remain legally binding once issued.</li>
            <li>Local authorities remain legally responsible for securing provision written into plans.</li>
            <li>Parents and young people still have the right to request an assessment.</li>
            <li>Parents and young people still have the right to appeal decisions to the SEND Tribunal.</li>
            <li>The 20 week legal timescale for issuing new plans remains in law.</li>
            <li>Nothing in legislation has been amended.</li>
          </ul>
        </div>
      </section>

      {/* The state of play today */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          The state of play today
        </h2>
        <div className="prose-calm">
          <p>
            While the law has not changed, the system operating under that law is under significant strain.
          </p>
          <p>Research and official reporting consistently show:</p>
          <ul className="space-y-2">
            <li>Record numbers of children now have Education, Health and Care Plans.</li>
            <li>Over one million additional children receive SEN Support without a plan.</li>
            <li>Local authorities are carrying large SEND funding deficits.</li>
            <li>Only around half of new plans are issued within the legal 20 week timeframe.</li>
            <li>Many families wait much longer.</li>
            <li>Tribunal appeals have increased sharply.</li>
            <li>Parents succeed in the vast majority of appeals that reach a decision.</li>
            <li>Mainstream schools report rising complexity of need.</li>
            <li>Special school demand continues to grow.</li>
          </ul>
          <div className="reassurance-banner mt-6">
            <p className="font-semibold text-foreground mb-1">The law has not weakened.</p>
            <p>But delivery under the law is inconsistent and often delayed.</p>
          </div>
        </div>
      </section>

      {/* What the research tells us */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What the research tells us about current problems
        </h2>
        <div className="prose-calm">
          <p>
            Independent reviews, parliamentary committees, and local government reports all describe similar issues:
          </p>
          <ul className="space-y-2">
            <li>Support is often reactive rather than early.</li>
            <li>Families feel they must escalate to secure provision.</li>
            <li>Decisions are frequently overturned at tribunal.</li>
            <li>Mainstream schools vary widely in capacity and expertise.</li>
            <li>Funding pressures influence local authority decision making.</li>
            <li>There is significant variation between areas.</li>
          </ul>
          <p>This is why the system is often described as adversarial.</p>
          <div className="reassurance-banner mt-6">
            <p className="font-semibold text-foreground mb-1">The legal framework remains strong on paper.</p>
            <p>The operational system underneath it is struggling.</p>
          </div>
        </div>
      </section>

      {/* What this means for parents today */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents today
        </h2>
        <div className="prose-calm">
          <p className="font-medium text-foreground">Right now:</p>
          <ul className="space-y-2 mb-6">
            <li>Your legal rights still apply.</li>
            <li>Plans are still enforceable.</li>
            <li>Appeals are still lawful.</li>
            <li>Schools and local authorities still have statutory duties.</li>
          </ul>

          <p className="font-medium text-foreground">However:</p>
          <ul className="space-y-2 mb-6">
            <li>Delays remain common.</li>
            <li>Capacity varies by area.</li>
            <li>You may experience resistance linked to funding pressure.</li>
          </ul>

          <div className="reassurance-banner">
            <p className="font-semibold text-foreground mb-1">The key distinction is this:</p>
            <p>The law has not changed. The pressure within the system has increased.</p>
            <p className="mt-2">Understanding that difference is important when reading about reform.</p>
          </div>
        </div>
      </section>

      {/* The bigger picture */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          The bigger picture
        </h2>
        <div className="prose-calm">
          <p>
            SEND provision in England is not being reformed because rights are considered too strong.
          </p>
          <p>It is being reformed because:</p>
          <ul className="space-y-2">
            <li>Demand has increased rapidly.</li>
            <li>Early support has not kept pace.</li>
            <li>Councils face financial instability.</li>
            <li>Schools report rising complexity.</li>
            <li>Outcomes for children have not improved in line with spending.</li>
          </ul>
          <p>All major stakeholders agree the system needs change.</p>
          <div className="reassurance-banner mt-6">
            <p className="font-semibold text-foreground mb-1">What has not changed is the legal foundation.</p>
            <p>What is under pressure is how that foundation is delivered in practice.</p>
          </div>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
