import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureSources = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="Sources & Evidence | SEND Navigator" description="Every claim traced to its source. Legislation, government research, DfE data, and expert reviews, all in one place." path="/feature/sources" />

    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(175 60% 40% / 0.15), transparent 70%)" }} />
      <div className="relative content-section text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(175 60% 40% / 0.15)" }}>
          <BookOpen className="w-7 h-7" style={{ color: "hsl(175 60% 40%)" }} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
          Sources & Evidence
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(222 20% 60%)" }}>
          Every claim traced to its source. Legislation, government research, DfE data, and expert reviews, all in one place.
        </p>
      </div>
    </section>

    <section className="content-section py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">What you will find</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We believe parents deserve to verify everything they read. Our sources page catalogues every document, dataset, and publication used across this site, from the Children and Families Act 2014 to the latest DfE statistical releases.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Primary legislation and statutory guidance",
            "Government consultation documents",
            "DfE statistical first releases and datasets",
            "Research reports from charities and think tanks",
            "Ofsted and CQC inspection frameworks",
            "Local authority SEND inspection outcomes",
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
            Trust is everything. In a space full of opinion and hearsay, we want you to be able to check every claim we make. If we have got something wrong, we want to know so we can correct it. Transparency is not optional, it is foundational.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/landing"><ArrowLeft className="w-4 h-4" /> Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/landing">Sign up to explore all sources <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default FeatureSources;
