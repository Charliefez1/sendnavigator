import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  ProtectionsSection,
  StatusSection,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatHasNotChanged() {
  return (
    <Layout>
      <PageOrientation
        title="What has not changed"
        description="Legal rights and protections that remain in place."
        lastUpdated="4th February 2026"
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

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Legal rights
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>The Children and Families Act 2014 still governs SEND in England.</li>
            <li>Education, Health and Care Plans remain legally binding once issued.</li>
            <li>Parents and young people still have rights to appeal SEND decisions through the tribunal system.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Duties
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>Local authorities still have duties to assess needs when requested and when legal tests are met.</li>
            <li>Local authorities still have the duty to secure the provision in an Education, Health and Care Plan.</li>
            <li>Schools still have duties to identify needs and provide SEN Support.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Protections
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>The legal enforceability of provision written into an Education, Health and Care Plan remains.</li>
            <li>The 20 week legal timescale for new Education, Health and Care Plans remains.</li>
          </ul>
        </div>
      </section>

      <StatusSection type="unconfirmed">
        <ul className="space-y-2">
          <li>There is no confirmation that any existing legal rights or duties will change.</li>
          <li>No confirmed proposals to remove current protections.</li>
        </ul>
      </StatusSection>

      <StatusSection type="leaked">
        <ul className="space-y-2">
          <li>Leaked discussions suggest future changes could affect rights, thresholds, or appeals.</li>
          <li>None of these are confirmed.</li>
          <li>Current rights remain unchanged unless the law is amended.</li>
        </ul>
      </StatusSection>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            Despite headlines and rumours, nothing about your legal rights has been removed. Research shows families continue to win the vast majority of tribunal cases, which confirms these rights are real and enforceable. If a plan says support must be provided, the law still requires it to happen. This matters because many reform discussions talk about reducing conflict, but the evidence shows appeals rise when early decisions are poor or support is missing. Until the law changes, the current protections still apply in full.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
