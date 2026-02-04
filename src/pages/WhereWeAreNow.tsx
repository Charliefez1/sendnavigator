import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

export default function WhereWeAreNow() {
  return (
    <Layout>
      <PageHeader
        title="Where we are now"
        description="The current SEND system in England as it operates today. This section covers EHCPs, SEN support, legal position, and current realities."
      />
      <section className="content-section pb-16 prose-calm">
        <p>
          This section will explain the current SEND system in England, including Education, Health 
          and Care Plans (EHCPs), SEN support in schools, the current legal framework, and the 
          pressures facing the system today.
        </p>
        <p>
          Content for this page is being developed. It will focus only on confirmed, current 
          information—no future proposals or speculation.
        </p>
      </section>
    </Layout>
  );
}
