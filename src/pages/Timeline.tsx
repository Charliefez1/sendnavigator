import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  SixtySecondSummary,
  InformationLayers,
  StatusSection,
  PageOrientation,
} from "@/components/templates";

export default function Timeline() {
  return (
    <Layout>
      <SEOHead title="Timeline" description="Key dates, decisions, and milestones in SEND reform, past, present, and upcoming." path="/timeline" />
      <PageOrientation
        title="Timeline and next steps"
        description="Key decision points and milestones. We show only confirmed dates and likely windows, avoiding speculation."
        lastUpdated="7th February 2026"
      />

      <SixtySecondSummary
        prose={
          <p>
            SEND reform is moving slowly because large system changes take time. Pilot programmes and training are already happening, but major decisions still sit ahead. A Schools White Paper and public consultation are expected next. If legal changes are proposed, they must go through Parliament before taking effect. Research from previous reforms shows implementation is usually phased over several years. For parents, this means current support and rights continue while reform is debated. There is time to understand proposals properly before anything changes.
          </p>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What has already happened
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>The SEND and Alternative Provision Improvement Plan was published in March 2023.</li>
            <li>Pilot programmes began testing reform ideas.</li>
            <li>A national SEND conversation took place in late 2025 and early 2026.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What is expected next
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>A Schools White Paper including SEND proposals.</li>
            <li>A public consultation.</li>
            <li>Parliamentary scrutiny if legal change is proposed.</li>
            <li>Phased implementation if reforms are approved.</li>
          </ul>
        </div>
      </section>

      <StatusSection type="unconfirmed">
        <ul className="space-y-2">
          <li>Exact dates for publications, consultations, and legislation are not confirmed.</li>
          <li>The pace of reform implementation is not confirmed.</li>
        </ul>
      </StatusSection>

      <StatusSection type="leaked">
        <ul className="space-y-2">
          <li>No leaked timelines have been confirmed.</li>
          <li>Media reports have suggested urgency but without dates or formal commitments.</li>
        </ul>
      </StatusSection>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            Research into previous SEND reforms shows large system changes take years, not months. Even if proposals are published, nothing changes overnight. Existing support, duties, and rights remain in place until new law comes into force. This timeline matters because it allows families to plan based on what exists now, not on rumours about the future.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <p className="text-muted-foreground">
          Current SEND rights and statutory processes remain in place unless and until formal changes are made through consultation and law.
        </p>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
