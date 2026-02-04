import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import {
  SixtySecondSummary,
  InformationLayers,
} from "@/components/templates";

export default function Timeline() {
  return (
    <Layout>
      <PageHeader
        title="Timeline and next steps"
        description="Key decision points and milestones. We show only confirmed dates and likely windows, avoiding speculation."
        lastUpdated="4th February 2026"
      />

      <SixtySecondSummary
        prose={
          <p>
            Reform is being prepared, but significant change would take time.
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
