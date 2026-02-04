import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

export default function About() {
  return (
    <Layout>
      <PageHeader
        title="About this resource"
        description="Independence, scope, and limits of SEND Reform Navigator."
      />
      <section className="content-section pb-16 prose-calm">
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

        <h2>Update approach</h2>
        <p>
          All pages show a last updated date. When information changes, we note what has changed. 
          We aim to update promptly when new confirmed information becomes available.
        </p>

        <h2>Error correction</h2>
        <p>
          If we make an error, we will correct it and note the correction. Transparency is 
          central to this resource.
        </p>

        <h2>Independence</h2>
        <p>
          SEND Reform Navigator is an independent public resource. It exists to reduce confusion 
          and anxiety, not to persuade or campaign. We respect that people may disagree on 
          solutions while needing the same factual information.
        </p>
      </section>
    </Layout>
  );
}
