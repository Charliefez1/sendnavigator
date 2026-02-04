import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

export default function Timeline() {
  return (
    <Layout>
      <PageHeader
        title="Timeline and next steps"
        description="Key decision points and milestones. We show only confirmed dates and likely windows, avoiding speculation."
      />
      <section className="content-section pb-16 prose-calm">
        <p>
          This section will show key milestones including consultations, white papers, 
          legislation stages, and likely implementation windows.
        </p>
        <p>
          Dates will be clearly labelled as confirmed or estimated. We avoid speculative timelines. 
          Content is being developed.
        </p>
      </section>
    </Layout>
  );
}
