import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ShieldAlert } from "lucide-react";

export default function QuestionsAndAnswers() {
  return (
    <Layout>
      <PageHeader
        title="Questions and answers"
        description="A front door to understanding SEND reform. Ask simple questions, receive grounded answers."
      />
      
      <section className="content-section pb-8">
        <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <ShieldAlert className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">What this section is not</p>
              <p className="text-muted-foreground">
                This is not a chat forum and does not provide legal advice. Answers are based on 
                publicly available information and clearly labelled by certainty level.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section pb-16 prose-calm">
        <p>
          This section will include common questions about SEND reform, with clear answers that 
          distinguish between confirmed facts, ongoing discussions, and things that remain unknown.
        </p>
        <p>
          A dynamic Q&A component will be added in a future update. Content is being developed.
        </p>
      </section>
    </Layout>
  );
}
