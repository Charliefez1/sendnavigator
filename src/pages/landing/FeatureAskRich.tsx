import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { MessageCircle, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureAskRich = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="Ask Rich | SEND Navigator" description="Ask any question about SEND reform and get a grounded, honest answer drawn from confirmed sources." path="/feature/ask-rich" />

    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(262 50% 50% / 0.15), transparent 70%)" }} />
      <div className="relative content-section text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(262 50% 50% / 0.15)" }}>
          <MessageCircle className="w-7 h-7" style={{ color: "hsl(262 50% 50%)" }} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
          Ask Rich
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(222 20% 60%)" }}>
          Ask any question about SEND reform and get a grounded, honest answer drawn from confirmed sources.
        </p>
      </div>
    </section>

    <section className="content-section py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">What you will find</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ask Rich is our AI-powered question and answer tool. It is trained on confirmed SEND reform sources, government publications, and legal frameworks. Unlike generic AI, it will tell you when it does not know something, and it always explains where its answer comes from.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Answers grounded in confirmed government sources",
            "Clear distinction between fact and speculation",
            "Source references included with every answer",
            "Written in plain English, not legal jargon",
            "Honest about what is not yet known",
            "Covers EHCPs, ISPs, mainstream support, and more",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(262 50% 50%)" }} />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Why it matters</h2>
          <p className="text-muted-foreground leading-relaxed">
            Parents are drowning in misinformation about SEND reform. Social media is full of panic and half-truths. Ask Rich gives you a calm, grounded place to ask your questions and get an honest answer, even if that answer is "we don't know yet."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/landing"><ArrowLeft className="w-4 h-4" /> Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/landing">Sign up to ask your question <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default FeatureAskRich;
