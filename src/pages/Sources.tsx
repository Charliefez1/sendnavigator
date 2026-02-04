import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

export default function Sources() {
  return (
    <Layout>
      <PageHeader
        title="Sources and how to read them"
        description="Building trust through transparency. We explain where our information comes from and how we handle disagreement."
      />
      <section className="content-section pb-16 prose-calm">
        <h2>Primary sources</h2>
        <p>
          Government announcements, legislation, and official consultations form our primary sources. 
          These are always marked as confirmed.
        </p>

        <h2>Credible reporting</h2>
        <p>
          We reference established news outlets and specialist education media when reporting on 
          developments being discussed or leaked.
        </p>

        <h2>How we select sources</h2>
        <p>
          We prioritise official sources. Media reports are included when they come from outlets 
          with established track records in education reporting.
        </p>

        <h2>Handling disagreement</h2>
        <p>
          Where sources disagree or information is contested, we note this clearly. We do not 
          present contested information as fact.
        </p>

        <p className="text-muted-foreground mt-8">
          A detailed source list will be added as content is developed.
        </p>
      </section>
    </Layout>
  );
}
