import { Link, Navigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { NewsTicker } from "@/components/NewsTicker";
import { useAuth } from "@/contexts/AuthContext";
import { Compass, Shield, BookOpen, Heart } from "lucide-react";

const Landing = () => {
  const { user, loading } = useAuth();

  // If already logged in, go to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="SEND Reform Navigator — Independent SEND reform guide for parents"
        description="A calm, independent guide helping parents and professionals understand SEND reform in England. Clear facts, no spin."
        path="/landing"
      />

      {/* Compact header */}
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
        <section className="content-section py-10 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* LEFT: Welcome message */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Compass className="w-7 h-7 text-primary flex-shrink-0" />
                <h1 className="text-xl sm:text-2xl font-display font-semibold text-foreground">
                  Welcome to SEND Reform Navigator
                </h1>
              </div>
              <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Despite what you may have heard, <strong className="text-foreground">your child's legal protections are still in place</strong>.
                </p>
                <p>
                  <strong className="text-foreground">EHCPs remain legally binding.</strong><br />
                  <strong className="text-foreground">The law has not changed.</strong>
                </p>
                <p>
                  What has changed is the <strong className="text-foreground">volume of discussion</strong> about SEND provision in 2026 and 2027. There is increasing debate across politics, education and local authorities, alongside early signals, <strong className="text-foreground">leaks and speculation</strong> about possible future reforms.
                </p>
                <p>
                  That uncertainty creates anxiety for parents.
                </p>
                <p>
                  The <strong className="text-foreground">SEND Navigator is designed to help make sense of this</strong>.
                </p>
                <p className="font-medium text-foreground">It includes:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong className="text-foreground">Confirmed information</strong> based on current law and statutory guidance</li>
                  <li><strong className="text-foreground">Clearly labelled sections</strong> on speculation and leaks, where relevant</li>
                  <li><strong className="text-foreground">Clear separation</strong> between what is confirmed, what is being discussed, and what has not changed</li>
                </ul>
                <p>
                  <strong className="text-foreground">Nothing is presented without context.</strong><br />
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
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-status-confirmed flex-shrink-0" />
                  <span>Independent</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Fact-based</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Heart className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span>For families</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Auth form */}
            <div className="flex justify-center lg:justify-end lg:pt-8">
              <AuthForm />
            </div>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border py-4">
        <div className="content-section text-center text-xs text-muted-foreground">
          <p>© 2026 SEND Reform Navigator. Independent resource — not government affiliated.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
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
