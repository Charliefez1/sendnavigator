import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import {
  EditorialOwnershipSection,
  IndependenceDisclosureSection,
  PerspectivesSection,
  FeedbackSection,
  ReviewScheduleSection,
} from "@/components/governance";

export default function About() {
  return (
    <Layout>
      <PageHeader
        title="About this resource"
        description="Independence, governance, scope, and accountability of SEND Reform Navigator."
      />
      
      <section className="content-section prose-calm">
        <h2>Who this resource is for</h2>
        <ul>
          <li>Parents and carers of children and young people with SEND</li>
          <li>Teachers, SENCOs, and school leaders</li>
          <li>Support staff and professionals</li>
          <li>Governors and interested members of the public</li>
        </ul>

        <h2>What this resource does not do</h2>
        <ul>
          <li>It is not legal advice</li>
          <li>It is not a lobbying platform</li>
          <li>It is not a political statement</li>
          <li>It does not replace specialist support</li>
        </ul>

        <h2>Geographic scope</h2>
        <p>
          This resource covers SEND policy in England only. Scotland, Wales, and Northern Ireland 
          have separate education systems and are not covered here unless explicitly stated as comparison.
        </p>
      </section>

      {/* Governance sections */}
      <div className="content-section">
        <EditorialOwnershipSection />
        <PerspectivesSection />
        <IndependenceDisclosureSection />
        <FeedbackSection />
        <ReviewScheduleSection />
      </div>

      <section className="content-section prose-calm pb-16">
        <h2>Update approach</h2>
        <p>
          All pages show a last updated date. When information changes, we note what has changed. 
          We aim to update promptly when new confirmed information becomes available.
        </p>

        <h2>Error correction</h2>
        <p>
          If we make an error, we will correct it and note the correction. The date will be updated 
          and the reason for correction will be stated. Prior information is not silently removed. 
          Transparency takes priority over reputation.
        </p>

        <h2>Decision making</h2>
        <p>
          When new information appears, accuracy takes priority over speed. Confirmation must come 
          before publication. Interpretation is always labelled as such.
        </p>
        <p>
          When sources conflict, both credible positions are represented and the disagreement is 
          explained in plain English. We do not resolve disagreement by omission.
        </p>
      </section>
    </Layout>
  );
}
