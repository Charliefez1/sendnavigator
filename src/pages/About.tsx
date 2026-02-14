import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
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
      <SEOHead title="About" description="Independence, governance, scope, and accountability of SEND Reform Navigator." path="/about" />
      <PageOrientation
        title="About this resource"
        description="Independence, governance, scope, and accountability of SEND Reform Navigator."
      />

      {/* Why this resource exists */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">Why this resource exists</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            SEND Reform Navigator exists to help people make sense of SEND reform in England at a time when information can feel fragmented and hard to follow. Changes are being discussed across government, education, health, and local services, often using complex language and published in stages. This resource was created to bring that information together in a clear, calm way, without adding interpretation or pressure.
          </p>
          <p>
            Its aim is to support understanding. It explains what is known, what is being discussed, and what is not yet decided, so readers can orient themselves without needing to track multiple sources or interpret technical documents.
          </p>
        </div>
      </section>

      {/* Who this resource is for */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">Who this resource is for</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            This resource is for parents and carers of children and young people with SEND, for teachers and school leaders, and for professionals working across education, health, and care. It is also relevant to anyone seeking a grounded overview of SEND reform in England.
          </p>
          <p>
            It is written for people who may be feeling overloaded by information and want clarity rather than commentary.
          </p>
        </div>
      </section>

      {/* Independence and neutrality */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">Independence and neutrality</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            SEND Reform Navigator is independent. It does not represent government, local authorities, schools, or advocacy groups. It does not promote particular outcomes or positions on SEND reform.
          </p>
          <p>
            The content is written to be neutral and factual. Where there are different views or areas of uncertainty, these are stated openly rather than resolved or argued. The resource is designed to inform, not to persuade.
          </p>
        </div>
      </section>

      {/* How information is updated and corrected */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">How information is updated and corrected</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            Information on this site is reviewed and updated as new, confirmed details are published. When official plans change or new decisions are formally announced, the content is revised to reflect that.
          </p>
          <p>
            If errors or inaccuracies are identified, they are corrected. Where information is incomplete or uncertain, this is made clear rather than filled in with assumptions.
          </p>
        </div>
      </section>

      {/* Limits of this resource */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">Limits of this resource</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            This resource does not provide legal advice, medical guidance, or professional recommendations. It cannot advise on individual circumstances or decisions.
          </p>
          <p>
            It focuses only on SEND provision and reform in England. It does not cover arrangements in Scotland, Wales, or Northern Ireland.
          </p>
          <p>
            It explains the system at a high level and does not replace support from professionals or statutory services.
          </p>
        </div>
      </section>

      {/* Closing statement */}
      <section className="content-section py-8 border-t border-border">
        <p className="text-muted-foreground max-w-2xl mb-6">
          SEND Reform Navigator is committed to transparency, independence, and clarity, offering information without noise so readers can understand what is happening and where uncertainty remains.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to="/neurodiversity-global" className="text-primary hover:underline font-medium">
            About Neurodiversity Global
          </Link>
          <Link to="/rich-ferriman" className="text-primary hover:underline font-medium">
            About Rich Ferriman
          </Link>
        </div>
      </section>

      {/* Governance sections */}
      <div className="content-section">
        <EditorialOwnershipSection />
        <PerspectivesSection />
        <IndependenceDisclosureSection />
        <FeedbackSection />
        <ReviewScheduleSection />
      </div>

      <div className="content-section pb-16" />
    </Layout>
  );
}
