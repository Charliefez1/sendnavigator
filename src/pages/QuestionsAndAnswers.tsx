import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ShieldAlert } from "lucide-react";
import { QandAComponent } from "@/components/qanda";
import { useSearchParams } from "react-router-dom";
import askRichCharacter from "@/assets/ask-rich-character.png";

export default function QuestionsAndAnswers() {
  const [searchParams] = useSearchParams();
  const initialQuestion = searchParams.get("q") || undefined;

  return (
    <Layout>
      <SEOHead title="Ask Rich - SEND Reform Q&A" description="Ask Rich a question about SEND reform and get a grounded, plain English answer based on confirmed information." path="/questions-and-answers" />
      
      {/* Reimagined hero header */}
      <section className="content-section py-8">
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
          <img
            src={askRichCharacter}
            alt="Ask Rich"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0"
            style={{ border: "2px solid hsl(262 50% 50% / 0.2)" }}
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-2">
              Got a question? Just ask.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              I set this up because the most useful thing I can do is answer the actual question someone has right now. Not the theoretical question. The one that is keeping them awake at three in the morning. I cannot give legal advice, but I can often point you in the right direction.
            </p>
          </div>
        </div>
      </section>

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
