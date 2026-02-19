import { Link, Navigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { NewsTicker } from "@/components/NewsTicker";
import { useAuth } from "@/contexts/AuthContext";
import { Compass, Shield, BookOpen, Heart } from "lucide-react";
import neurodiversityLanding from "@/assets/neurodiversity-global-landing.png";

const Landing = () => {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'hsl(220, 14%, 93%)' }}>
      <SEOHead
        title="SEND Reform Navigator — Independent SEND reform guide for parents"
        description="A calm, independent guide helping parents and professionals understand SEND reform in England. Clear facts, no spin."
        path="/landing"
      />

      {/* Navy header */}
      <header className="bg-navy text-navy-foreground py-3">
        <div className="content-wide flex items-center justify-center">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white tracking-tight">SEND Reform Navigator</span>
          </div>
        </div>
      </header>

      {/* News ticker */}
      <NewsTicker />

      {/* Main content */}
      <main className="flex-1">
        <section className="content-section py-8 sm:py-12">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* LEFT: Welcome — 3 cols */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2.5 mb-3">
                <Compass className="w-6 h-6 text-primary flex-shrink-0" />
                <h1 className="text-lg sm:text-xl font-display font-semibold text-foreground">
                  Welcome to SEND Reform Navigator
                </h1>
              </div>
              <div className="space-y-2.5 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Despite what you may have heard, <strong className="text-foreground">your child's legal protections are still in place</strong>.
                </p>
                <p>
                  <strong className="text-foreground">EHCPs remain legally binding.</strong>{" "}
                  <strong className="text-foreground">The law has not changed.</strong>
                </p>
                <p>
                  What has changed is the <strong className="text-foreground">volume of discussion</strong> about SEND provision in 2026 and 2027 — debate across politics, education and local authorities, alongside early signals, <strong className="text-foreground">leaks and speculation</strong> about possible future reforms.
                </p>
                <p>
                  That uncertainty creates anxiety for parents. The <strong className="text-foreground">SEND Navigator is designed to help make sense of this</strong>.
                </p>
                <p className="font-medium text-foreground">It includes:</p>
                <ul className="space-y-0.5 list-disc list-inside text-sm">
                  <li><strong className="text-foreground">Confirmed information</strong> based on current law and statutory guidance</li>
                  <li><strong className="text-foreground">Clearly labelled sections</strong> on speculation and leaks, where relevant</li>
                  <li><strong className="text-foreground">Clear separation</strong> between what is confirmed, what is being discussed, and what has not changed</li>
                </ul>
                <p>
                  <strong className="text-foreground">Nothing is presented without context.</strong>{" "}
                  <strong className="text-foreground">Nothing speculative is presented as fact.</strong>
                </p>
                <p>
                  For more context, see the{" "}
                  <Link to="/about" className="text-primary hover:underline">About</Link> section and{" "}
                  <Link to="/why-i-built-this" className="text-primary hover:underline">Why I Built This</Link>.
                </p>
                <p className="font-medium text-foreground">Rich Ferriman</p>
              </div>

              {/* Trust signals */}
              <div className="flex items-center gap-5 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5 text-status-confirmed flex-shrink-0" />
                  <span>Independent</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BookOpen className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>Fact-based</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Heart className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                  <span>For families</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Auth form + image — 2 cols */}
            <div className="lg:col-span-2 flex flex-col items-center gap-5">
              <AuthForm />
              <img
                src={neurodiversityLanding}
                alt="Neurodiversity Global — The SEND Navigator is an independent Neurodiversityglobal.com free parents & carers resource"
                className="w-full max-w-xs rounded-lg"
              />
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-3">
        <div className="content-section text-center text-xs text-muted-foreground">
          <p>© 2026 SEND Reform Navigator. Independent resource — not government affiliated.</p>
          <div className="flex items-center justify-center gap-4 mt-1.5">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/sources" className="hover:text-primary transition-colors">Sources</Link>
            <Link to="/how-to-use" className="hover:text-primary transition-colors">How to use</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
