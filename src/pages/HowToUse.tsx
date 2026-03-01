import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { 
  Navigation2, 
  Palette, 
  BookOpen, 
  HelpCircle, 
  Sun, 
  Moon, 
  ArrowRight,
  Shield,
  MessageCircle,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HowToUse() {
  return (
    <Layout>
      <PageOrientation icon={BookOpen}
        sectionLabel="About"
        title="How to use this guide"
        description="Everything you need to know to get the most from this resource"
        lastUpdated="7th February 2026"
      />

      {/* Overview */}
      <section className="content-section py-8">
        <div className="prose-calm">
          <p className="text-lg text-muted-foreground leading-relaxed">
            This site is designed to be as straightforward as possible. Whether you're a parent, 
            carer, teacher or professional, here's how to find what you need.
          </p>
        </div>
      </section>

      {/* Navigation explained */}
      <section className="content-section py-8 border-t border-border">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Navigation2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Two navigation bars</h2>
            <p className="text-muted-foreground leading-relaxed">
              You'll see two navigation areas on every page:
            </p>
          </div>
        </div>

        <div className="space-y-4 ml-14">
          <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
            <h3 className="font-display font-medium text-foreground mb-2">Top bar - Site links</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Links to general pages like <strong>About, Sources, Q&A</strong>, and this guide. 
              On mobile, tap the menu icon to open these.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
            <h3 className="font-display font-medium text-foreground mb-2">Journey tabs - The Navigator</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The <strong>colour-coded tabs</strong> below the header take you through the SEND reform story 
              step by step. You can <strong>follow them in order or jump to any section</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Colour coding */}
      <section className="content-section py-8 border-t border-border">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">What the colours mean</h2>
            <p className="text-muted-foreground leading-relaxed">
              The journey tabs and content sections use colours to show how certain information is:
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 ml-14">
          <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 shadow-lg">
            <div className="w-4 h-4 rounded-full bg-journey-confirmed flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-medium text-foreground text-sm">Teal - Confirmed</h3>
              <p className="text-xs text-muted-foreground">Official facts and what hasn't changed</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 shadow-lg">
            <div className="w-4 h-4 rounded-full bg-journey-discussed flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-medium text-foreground text-sm">Amber - Under discussion</h3>
              <p className="text-xs text-muted-foreground">Proposals being debated or considered</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 shadow-lg">
            <div className="w-4 h-4 rounded-full bg-journey-unconfirmed flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-medium text-foreground text-sm">Orange - Unconfirmed / Leaked</h3>
              <p className="text-xs text-muted-foreground">Rumours, leaks and unverified reports</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 shadow-lg">
            <div className="w-4 h-4 rounded-full bg-journey-next flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-medium text-foreground text-sm">Rose - What's next</h3>
              <p className="text-xs text-muted-foreground">Timeline and upcoming milestones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Page structure */}
      <section className="content-section py-8 border-t border-border">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">How each page is structured</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every information page follows the same pattern so you always know where to look:
            </p>
          </div>
        </div>

        <div className="space-y-3 ml-14">
          {[
            { step: "1", title: "60-second summary", desc: "A quick overview you can read in under a minute" },
            { step: "2", title: "Reading depth control", desc: "Choose how much detail you want, quick, standard, or detailed." },
            { step: "3", title: "Information layers", desc: "Content is split into confirmed, discussed, and unconfirmed sections" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">{item.step}</span>
              </div>
              <div>
                <h3 className="font-display font-medium text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="content-section py-8 border-t border-border">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Helpful features</h2>
          </div>
        </div>

        <div className="space-y-4 ml-14">
          <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-primary" />
              <Moon className="w-4 h-4 text-primary" />
              <h3 className="font-display font-medium text-foreground">Dark & light mode</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the toggle in the top navigation to <strong>switch between light and dark themes</strong>. 
              The site will remember your preference.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <h3 className="font-display font-medium text-foreground">Ask a question</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              On many pages you'll find a Q&A section where you can <strong>ask questions in plain English</strong> 
              and get answers based on what we know.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="font-display font-medium text-foreground">Reassurance first</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We always <strong>lead with what hasn't changed</strong> and what your current rights are, 
              before explaining what might be changing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section py-8 border-t border-border">
        <div className="reassurance-banner shadow-lg">
          <div className="flex items-start gap-4">
            <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-2">Ready to start?</h2>
              <p className="text-muted-foreground mb-4">
                Head back to the home page and follow the journey steps, or jump straight to 
                any topic that interests you.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Go to the home page
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
