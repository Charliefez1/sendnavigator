import { useRef } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { NewsTicker } from "@/components/NewsTicker";
import { AnimatedFeatureShowcase } from "@/components/landing/AnimatedFeatureShowcase";
import { LandingAskRich } from "@/components/landing/LandingAskRich";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, BookOpen, Heart, ArrowDown } from "lucide-react";
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

      {/* ── HERO ── dark navy, immersive */}
      <section className="relative bg-navy text-navy-foreground overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(175 60% 40% / 0.15), transparent)",
          }}
        />

        {/* Header bar */}
        <div className="relative content-wide flex items-center justify-between py-4">
          <img src={beaconLogo} alt="Beacon SEND Navigator" className="h-9" />
          <button
            onClick={scrollToAuth}
            className="text-sm text-navy-muted hover:text-white transition-colors"
          >
            Sign in
          </button>
        </div>

        {/* News ticker */}
        <NewsTicker />

        {/* Hero content */}
        <div className="relative content-section py-16 sm:py-24 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold leading-tight mb-4 max-w-2xl mx-auto">
            The independent guide to
            <br />
            <span style={{ color: "hsl(var(--accent-teal))" }}>SEND reform</span> in England
          </h1>
          <p className="text-base sm:text-lg text-navy-muted leading-relaxed max-w-lg mx-auto mb-8">
            Clear facts, practical tools, and honest answers for parents navigating the SEND system.
          </p>

          {/* Trust pills */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10">
            {[
              { icon: Shield, label: "Independent", color: "--accent-teal" },
              { icon: BookOpen, label: "Fact-based", color: "--accent-deep-blue" },
              { icon: Heart, label: "For families", color: "--accent-coral" },
            ].map(({ icon: I, label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <I className="w-3.5 h-3.5" style={{ color: `hsl(var(${color}))` }} />
                <span className="text-xs text-navy-muted">{label}</span>
              </div>
            ))}
          </div>

          <ArrowDown className="w-5 h-5 text-navy-muted mx-auto animate-bounce" />
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1">

        {/* ── AUTH + WHAT'S INSIDE ── side by side on desktop */}
        <section className="content-wide py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* Left: Auth */}
            <div ref={authRef} className="flex flex-col items-center lg:items-start">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                Get started
              </p>
              <AuthForm />
              <p className="text-xs text-muted-foreground mt-3 text-center lg:text-left max-w-sm">
                Built by{" "}
                <Link to="/rich-ferriman" className="text-primary hover:underline">Rich Ferriman</Link>.
                Free, independent, and not government affiliated.
              </p>
            </div>

            {/* Right: What's inside */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                What's inside
              </p>
              <AnimatedFeatureShowcase />
            </div>
          </div>
        </section>

        {/* ── ASK RICH PREVIEW ── */}
        <section className="bg-navy/[0.03] dark:bg-card/30 border-y border-border">
          <div className="content-section py-12 sm:py-16">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--accent-violet))" }} />
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Try it now
                </p>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-2">
                Ask Rich anything about SEND reform
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Get a real answer grounded in confirmed facts, not generic AI output.
              </p>
              <LandingAskRich onSignUpClick={scrollToAuth} />
            </div>
          </div>
        </section>

        {/* ── ABOUT CARD ── minimal */}
        <section className="content-section py-12 sm:py-16">
          <div className="max-w-xl mx-auto text-center">
            <img src={beaconLogo} alt="" className="h-10 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Nothing is presented without context. Nothing speculative is presented as fact. Every section is clearly labelled with its confidence level.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <Link to="/about" className="text-primary hover:underline">About</Link>
              <span className="text-border">|</span>
              <Link to="/why-i-built-this" className="text-primary hover:underline">Why I Built This</Link>
              <span className="text-border">|</span>
              <Link to="/sources" className="text-primary hover:underline">Sources</Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-4">
        <div className="content-section flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>&copy; 2026 Beacon SEND Navigator</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/how-to-use" className="hover:text-primary transition-colors">How to use</Link>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
