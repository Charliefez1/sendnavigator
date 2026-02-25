import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ShieldAlert, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { QandAComponent } from "@/components/qanda";
import { useSearchParams, Link } from "react-router-dom";
import askRichCharacter from "@/assets/ask-rich-character.png";

export default function QuestionsAndAnswers() {
  const [searchParams] = useSearchParams();
  const initialQuestion = searchParams.get("q") || undefined;

  return (
    <Layout>
      <SEOHead title="Ask Rich - SEND Reform Q&A" description="Ask Rich a question about SEND reform and get a grounded, plain English answer based on confirmed information." path="/questions-and-answers" />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-background">
        {/* Subtle violet radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 100%, hsl(262 50% 50% / 0.06), transparent 70%)",
          }}
        />
        <div className="content-section relative py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center gap-6 max-w-2xl mx-auto">
            <img
              src={askRichCharacter}
              alt="Ask Rich"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0 shadow-lg"
              style={{ border: "2px solid hsl(262 50% 50% / 0.2)" }}
            />
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: "hsl(262 50% 50% / 0.12)" }}>
                  <MessageCircleQuestion className="w-4 h-4" style={{ color: "hsl(262 60% 55%)" }} />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Ask Rich</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-2">
                Got a question? Just ask.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                I set this up because the most useful thing I can do is answer the actual question someone has right now. Not the theoretical question. The one that is keeping them awake at three in the morning.
              </p>
            </div>
          </div>
        </div>
        {/* Fade line */}
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, hsl(262 50% 50% / 0.15), transparent)" }} />
      </section>

      {/* ─── Q&A section ─── */}
      <section className="bg-background">
        <div className="content-section py-8 sm:py-10">
          <div className="max-w-2xl mx-auto">
            <QandAComponent initialQuestion={initialQuestion} />
          </div>
        </div>
      </section>

      {/* ─── Info cards ─── */}
      <section className="bg-background">
        <div className="content-section pb-10">
          <div className="max-w-2xl mx-auto grid gap-4 sm:grid-cols-2">
            {/* Disclaimer card */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(262 50% 50% / 0.1)" }}>
                  <ShieldAlert className="w-4 h-4" style={{ color: "hsl(262 60% 55%)" }} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">What this section is not</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This is not a chat forum and does not provide legal advice. Answers are based on publicly available information and clearly labelled by certainty level.
                  </p>
                </div>
              </div>
            </div>

            {/* SENDIASS signpost card */}
            <Link
              to="/sendiass"
              className="group rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(220 70% 45% / 0.1)" }}>
                  <ShieldAlert className="w-4 h-4" style={{ color: "hsl(220 70% 55%)" }} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-colors">Need proper advice?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your local SENDIASS service offers free, impartial support. They can help with your specific situation.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2">
                    Find your SENDIASS <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
