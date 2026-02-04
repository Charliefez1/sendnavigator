import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatIsChanging() {
  return (
    <Layout>
      <PageHeader
        title="What is changing"
        description="Confirmed reforms and official plans from government. Everything on this page has been formally announced or legislated."
      >
        <StatusBadge status="confirmed" />
      </PageHeader>
      <section className="content-section pb-16 prose-calm">
        <p>
          This section will cover confirmed changes to SEND policy, including government improvement 
          plans, confirmed funding changes, and workforce or system reforms that have been officially 
          announced.
        </p>
        <p>
          Every item on this page will be clearly labelled as confirmed policy. Content is being developed.
        </p>
      </section>
    </Layout>
  );
}
