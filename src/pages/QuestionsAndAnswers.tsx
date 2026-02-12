import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageHeader } from "@/components/PageHeader";
import { ShieldAlert } from "lucide-react";
import { QandAComponent } from "@/components/qanda";
import { useSearchParams } from "react-router-dom";

export default function QuestionsAndAnswers() {
  const [searchParams] = useSearchParams();
  const initialQuestion = searchParams.get("q") || undefined;

  return (
    <Layout>
      <SEOHead title="Questions and Answers" description="Ask questions about SEND reform and get grounded answers based on confirmed information." path="/questions-and-answers" />
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

        <QandAComponent initialQuestion={initialQuestion} />
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
