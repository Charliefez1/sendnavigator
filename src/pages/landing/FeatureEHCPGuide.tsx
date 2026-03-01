import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Shield, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureEHCPGuide = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="EHCP Guide | SEND Navigator" description="A plain-English guide to Education, Health and Care Plans. What they are, how they work, and what to do when things go wrong." path="/feature/ehcp-guide" />

    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(220 60% 50% / 0.15), transparent 70%)" }} />
      <div className="relative content-section text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(220 60% 50% / 0.15)" }}>
          <Shield className="w-7 h-7" style={{ color: "hsl(220 60% 50%)" }} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
          EHCP Guide
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(222 20% 60%)" }}>
          A plain-English guide to Education, Health and Care Plans. What they are, how they work, and what to do when things go wrong.
        </p>
      </div>
    </section>

    <section className="content-section py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">What you will find</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            EHCPs are the legal documents that set out the support your child is entitled to receive. They are powerful, but the process can be overwhelming. Our guide walks you through every stage in language that makes sense.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "What an EHCP actually is and what it covers",
            "How to request an EHC needs assessment",
            "What happens during the 20-week process",
            "Your right to appeal and how tribunals work",
            "Annual reviews: what to expect and how to prepare",
            "Health and social care sections explained",
            "What the proposed reforms mean for EHCPs",
            "Common problems and how to resolve them",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(220 60% 50%)" }} />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Why it matters</h2>
          <p className="text-muted-foreground leading-relaxed">
            An EHCP is the single most important document for a child with SEND in England. Knowing how the system works, and knowing your rights within it, can make the difference between your child getting the support they need and falling through the gaps.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/landing"><ArrowLeft className="w-4 h-4" /> Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/landing">Sign up to access the guide <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default FeatureEHCPGuide;
