import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { FileText, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureSendReform = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="SEND Reform Report | SEND Navigator" description="Track every aspect of SEND reform with eight detailed sections covering what's confirmed, what's being discussed, and what hasn't changed." path="/feature/send-reform" />

    {/* Hero */}
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(175 60% 40% / 0.15), transparent 70%)" }} />
      <div className="relative content-section text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(175 60% 40% / 0.15)" }}>
          <FileText className="w-7 h-7" style={{ color: "hsl(175 60% 40%)" }} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
          SEND Reform Report
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(222 20% 60%)" }}>
          Track every aspect of SEND reform with eight detailed sections covering what's confirmed, what's being discussed, and what hasn't changed.
        </p>
      </div>
    </section>

    {/* Content */}
    <section className="content-section py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">What you will find</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The Government published its SEND reform White Paper in February 2026. This is a huge document, and most parents do not have the time or energy to read it cover to cover. We have done that for you.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our report breaks everything down into clear, themed sections so you can find the information that matters to your family, quickly.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Where we are now: the current state of play",
            "What is changing: confirmed reforms from the White Paper",
            "What has not changed: your existing legal rights",
            "What is being discussed: proposals in the consultation",
            "What we do not know: gaps and unanswered questions",
            "What the leaks are saying: early signals from insiders",
            "What the leaks do not mean: separating fact from speculation",
            "Timeline: key dates and milestones ahead",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(175 60% 40%)" }} />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Why it matters</h2>
          <p className="text-muted-foreground leading-relaxed">
            Understanding what is happening with SEND reform is not optional for families who rely on EHCPs, mainstream support, or specialist provision. This report gives you the facts so you can plan ahead, respond to consultations, and protect your child's rights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/landing">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/landing">
              Sign up to read the full report <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default FeatureSendReform;
