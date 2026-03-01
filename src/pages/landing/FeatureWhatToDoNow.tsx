import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { CheckSquare, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureWhatToDoNow = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="What To Do Right Now | SEND Navigator" description="Clear, practical actions you can take right now based on what the law actually says today." path="/feature/what-to-do-now" />

    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(16 65% 52% / 0.15), transparent 70%)" }} />
      <div className="relative content-section text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(16 65% 52% / 0.15)" }}>
          <CheckSquare className="w-7 h-7" style={{ color: "hsl(16 65% 52%)" }} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
          What To Do Right Now
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(222 20% 60%)" }}>
          Clear, practical actions you can take right now based on what the law actually says today.
        </p>
      </div>
    </section>

    <section className="content-section py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">What you will find</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            With so much changing, it can feel paralysing. This section cuts through the noise and gives you a practical checklist of things you can do today, based on the law as it stands right now, not speculation about what might happen next.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Immediate actions you can take today",
            "How to respond to the consultation",
            "Steps to protect your child's current provision",
            "What to say if your school mentions reforms early",
            "How to prepare for annual reviews during transition",
            "Organisations and services that can help right now",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(16 65% 52%)" }} />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Why it matters</h2>
          <p className="text-muted-foreground leading-relaxed">
            Reform does not change the law overnight. Your child still has legal rights today, and there are concrete steps you can take right now to strengthen their position. Do not wait for the government to act. Act now.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/landing"><ArrowLeft className="w-4 h-4" /> Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/landing">Sign up for your action plan <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default FeatureWhatToDoNow;
