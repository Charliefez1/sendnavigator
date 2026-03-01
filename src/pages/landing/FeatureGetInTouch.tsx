import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureGetInTouch = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="Get in Touch | SEND Navigator" description="Contact Rich Ferriman directly. Whether you have a question, suggestion, or just want to say hello — we'd love to hear from you." path="/feature/get-in-touch" />

    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(175 60% 40% / 0.15), transparent 70%)" }} />
      <div className="relative content-section text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(175 60% 40% / 0.15)" }}>
          <Mail className="w-7 h-7" style={{ color: "hsl(175 60% 40%)" }} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
          Get in Touch
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(222 20% 60%)" }}>
          Contact Rich Ferriman directly. Whether you have a question, suggestion, or just want to say hello — we'd love to hear from you.
        </p>
      </div>
    </section>

    <section className="content-section py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Why get in touch?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This site is built by a parent, for parents. If something doesn't make sense, or you think we've missed something, or you just want to share your experience — we want to hear from you. Every message is read personally by Rich Ferriman.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Suggest a topic or question we should cover",
            "Report something that's unclear or incorrect",
            "Share your experience of SEND reform",
            "Ask about partnerships or collaboration",
            "Offer feedback on how we can improve",
            "Just say hello — it means a lot",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(175 60% 40%)" }} />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">What happens next</h2>
          <p className="text-muted-foreground leading-relaxed">
            Rich reads every message personally. If your question needs a detailed response, he will reply directly. If your feedback helps improve the site, you'll see the changes reflected here. This is a community effort and your input shapes what we build next.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/landing"><ArrowLeft className="w-4 h-4" /> Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/landing">Sign up to get in touch <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default FeatureGetInTouch;
