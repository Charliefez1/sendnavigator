import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { ShieldAlert } from "lucide-react";
import { QandAComponent } from "@/components/qanda";
import { useSearchParams } from "react-router-dom";
import { WordFromRich } from "@/components/WordFromRich";

export default function QuestionsAndAnswers() {
  const [searchParams] = useSearchParams();
  const initialQuestion = searchParams.get("q") || undefined;

  return (
    <Layout>
      <SEOHead title="Ask Rich - SEND Reform Q&A" description="Ask Rich a question about SEND reform and get a grounded, plain English answer based on confirmed information." path="/questions-and-answers" />
      <PageOrientation
        title="Ask Rich"
        description="Ask me anything about SEND reform. I'll give you a straight answer based on what we actually know."
      />
      
      <WordFromRich>
        <p>I set this up because the most useful thing I can do is answer the actual question someone has right now. Not the theoretical question. Not the one that fits neatly into a category. The one that is keeping them awake at three in the morning wondering what they are supposed to do next. I cannot give legal advice and I will say so if that is what you need. But I can often point you in the right direction, tell you what I would do, and let you know if your situation sounds familiar. Ask the real question. I will give you an honest answer.</p>
      </WordFromRich>

      <section className="content-section pb-8">
        <QandAComponent initialQuestion={initialQuestion} />

        <div className="bg-card border border-border rounded-xl p-4 mt-8 shadow-lg">
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

      <div className="content-section pb-16" />
    </Layout>
  );
}
