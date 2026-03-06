import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { User, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureMyChildProfile = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="My Child: This is me | SEND Navigator" description="Build a professional, structured profile about your child to share with schools and professionals." path="/feature/my-child-profile" />

    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(42 87% 48% / 0.15), transparent 70%)" }} />
      <div className="relative content-section text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(42 87% 48% / 0.15)" }}>
          <User className="w-7 h-7" style={{ color: "hsl(42 87% 48%)" }} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
          My Child: This is me
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(222 20% 60%)" }}>
          Build a professional, structured profile about your child to share with schools and professionals.
        </p>
      </div>
    </section>

    <section className="content-section py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">What you will find</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            When you meet a new school, SENCO, or professional, you need a clear, concise way to explain who your child is. Not just their diagnosis, but their strengths, challenges, what helps, and what does not. Our profile builder walks you through 22 sections covering everything from sensory needs to communication style, then gives you an at-a-glance dashboard and a structured AI-generated report you can preview, refine, and download.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "22 guided sections covering every aspect of your child",
            "Your child's voice included with age-appropriate questions",
            "Structured AI-generated report with professional insights",
            "Preview your report in-browser before downloading",
            "At-a-glance dashboard showing strengths, needs, and progress",
            "Download as a formatted PDF to share",
            "Regenerate your report after making edits",
            "Save and resume using Quick mode restore",
            "Built from real SEND parent experience",
            "Sections on strengths, not just difficulties",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 87% 48%)" }} />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">How it works</h2>
          <ol className="space-y-4">
            {[
              { step: "1", title: "Start the profile", desc: "Give consent, then begin answering guided questions about your child." },
              { step: "2", title: "Answer at your own pace", desc: "Work through 22 sections. Skip anything that does not apply. Save your progress and return any time." },
              { step: "3", title: "Review your dashboard", desc: "See an at-a-glance summary of strengths, needs, communication style, and section progress." },
              { step: "4", title: "Generate your report", desc: "AI creates a structured, professional summary with insights for each section, ways of working, and practical suggestions." },
              { step: "5", title: "Preview and download", desc: "Read the full report in your browser first, then download as a formatted PDF to share." },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: "hsl(42 87% 48% / 0.15)", color: "hsl(42 87% 48%)" }}>
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Why it matters</h2>
          <p className="text-muted-foreground leading-relaxed">
            Too often, children with SEND are reduced to a label or a set of difficulties. A well-written profile helps professionals see the whole child, understand what works, and build on strengths. The dashboard gives you a clear picture at a glance, and the in-browser preview means you can check every detail before sharing. It can transform the conversation at meetings and reviews.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/landing"><ArrowLeft className="w-4 h-4" /> Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/landing">Sign up to build a profile <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default FeatureMyChildProfile;
