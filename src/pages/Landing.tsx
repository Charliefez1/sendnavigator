import { useRef } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { NewsTicker } from "@/components/NewsTicker";
import { AnimatedFeatureShowcase } from "@/components/landing/AnimatedFeatureShowcase";
import { LandingAskRich } from "@/components/landing/LandingAskRich";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, BookOpen, Heart } from "lucide-react";
import beaconLogo from "@/assets/beacon-logo.png";

const Landing = () => {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const authRef = useRef<HTMLDivElement>(null);
  const isPreview = searchParams.get("preview") === "true";

  if (!loading && user && !isPreview) {
    return <Navigate to="/" replace />;
  }

  const scrollToAuth = () => {
    authRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Beacon SEND Navigator | Independent SEND reform guide for parents"
        description="Clear facts, practical tools, and honest answers for parents navigating the SEND system in England."
        path="/landing"
      />

      {/* Navy header */}
      <header className="bg-navy text-navy-foreground py-3">
        <div className="content-wide flex items-center justify-center">
          <img src={beaconLogo} alt="Beacon SEND Navigator" className="h-10" />
        </div>
      </header>

      {/* News ticker */}
      <NewsTicker />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero: centred, text-led */}
        <section className="content-section py-10 sm:py-14">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-foreground mb-3 leading-tight">
              The independent guide to SEND reform in England
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Clear facts, practical tools, and honest answers for parents navigating the SEND system.
            </p>
          </div>
          <div ref={authRef} className="flex justify-center">
            <AuthForm />
          </div>
        </section>

        {/* Animated feature showcase */}
        <AnimatedFeatureShowcase />

        {/* Ask Rich preview with frost */}
        <LandingAskRich onSignUpClick={scrollToAuth} />

        {/* Trust / about card */}
        <section className="content-section pb-10 sm:pb-14">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-lg">
              <div className="flex items-center gap-2.5 mb-3">
                <img src={beaconLogo} alt="" className="h-8" />
                <h2 className="text-base sm:text-lg font-display font-semibold text-foreground">
                  About the Navigator
                </h2>
              </div>
              <div className="space-y-2.5 text-muted-foreground text-sm leading-relaxed">
                <p>
                  The SEND Navigator is a free, independent resource built by{" "}
                  <Link to="/rich-ferriman" className="text-primary hover:underline">Rich Ferriman</Link>{" "}
                  to help parents and professionals make sense of SEND reform.
                </p>
                <p>
                  Nothing is presented without context. Nothing speculative is presented as fact. Every section is clearly labelled with its confidence level.
                </p>
                <p>
                  For more context, see{" "}
                  <Link to="/about" className="text-primary hover:underline">About</Link> and{" "}
                  <Link to="/why-i-built-this" className="text-primary hover:underline">Why I Built This</Link>.
                </p>
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-3">
        <div className="content-section text-center text-xs text-muted-foreground">
          <p>&copy; 2026 SEND Reform Navigator. Independent resource, not government affiliated.</p>
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
