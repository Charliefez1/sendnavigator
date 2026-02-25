import { useRef, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { AnimatedFeatureShowcase } from "@/components/landing/AnimatedFeatureShowcase";
import { LandingAskRich } from "@/components/landing/LandingAskRich";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import beaconLogo from "@/assets/beacon-logo.png";

/* ── Fade-in on scroll ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, className: visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6", style: { transition: "opacity 0.7s ease-out, transform 0.7s ease-out" } };
}

const Landing = () => {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const authRef = useRef<HTMLDivElement>(null);
  const isPreview = searchParams.get("preview") === "true";

  const fade2 = useFadeIn();
  const fade3 = useFadeIn();
  const fade4 = useFadeIn();
  const fade5 = useFadeIn();

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

      {/* ────────────────────────────────────────────────
          SECTION 1 — HERO (full viewport, dark navy)
      ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col bg-navy text-navy-foreground overflow-hidden">
        {/* Animated gradient backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 120% 60% at 50% 0%, hsl(175 60% 40% / 0.12), transparent 70%), radial-gradient(ellipse 80% 50% at 80% 100%, hsl(262 50% 50% / 0.08), transparent 60%)",
            animation: "hero-drift 12s ease-in-out infinite alternate",
          }}
        />

        {/* Header bar */}
        <div className="relative content-wide flex items-center justify-between py-5">
          <img src={beaconLogo} alt="Beacon SEND Navigator" className="h-8" />
          <button
            onClick={scrollToAuth}
            className="text-sm text-navy-muted hover:text-navy-foreground transition-colors"
          >
            Sign in
          </button>
        </div>

        {/* Hero content — vertically centered */}
        <div className="relative flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold leading-[1.15] mb-6">
              Your child's SEND rights.
              <br />
              <span style={{ color: "hsl(var(--accent-teal))" }}>
                Explained by someone who gets it.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-navy-muted leading-relaxed max-w-md mx-auto mb-10">
              Independent. Fact-based. Built by a parent, for parents.
            </p>
            <Button
              onClick={scrollToAuth}
              size="lg"
              className="rounded-full px-8 py-3 text-base gap-2"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-16" />
      </section>

      {/* ────────────────────────────────────────────────
          SECTION 2 — PROBLEM STATEMENT (emotional hook)
      ──────────────────────────────────────────────── */}
      <section className="bg-background">
        <div
          ref={fade2.ref}
          className={`content-section py-20 sm:py-28 ${fade2.className}`}
          style={fade2.style}
        >
          <div className="max-w-xl mx-auto text-center space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-foreground leading-relaxed">
              SEND reform is coming. The government won't tell you what it means. The media gets it wrong. And the jargon makes it impossible to know what's real.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I spent months researching every angle so you don't have to.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          SECTION 3 — ANIMATED FEATURE SHOWCASE
      ──────────────────────────────────────────────── */}
      <section
        className="border-y border-border"
        style={{ backgroundColor: "hsl(var(--navy) / 0.03)" }}
      >
        <div
          ref={fade3.ref}
          className={`content-wide py-16 sm:py-24 ${fade3.className}`}
          style={fade3.style}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 text-center">
            What's inside
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-10 text-center">
            Everything you need in one place
          </h2>
          <div className="max-w-3xl mx-auto">
            <AnimatedFeatureShowcase />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          SECTION 4 — ASK RICH (dark, dramatic)
      ──────────────────────────────────────────────── */}
      <section className="bg-navy text-navy-foreground">
        <div
          ref={fade4.ref}
          className={`content-section py-16 sm:py-24 ${fade4.className}`}
          style={fade4.style}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-navy-foreground mb-2">
              Try it. Ask me anything.
            </h2>
            <p className="text-sm text-navy-muted mb-8">
              Get a real answer grounded in confirmed facts, not generic AI output.
            </p>
            <LandingAskRich onSignUpClick={scrollToAuth} />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          SECTION 5 — AUTH + CLOSE (conversion)
      ──────────────────────────────────────────────── */}
      <section className="bg-background">
        <div
          ref={fade5.ref}
          className={`content-section py-16 sm:py-24 ${fade5.className}`}
          style={fade5.style}
        >
          <div ref={authRef} className="max-w-sm mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Join thousands of parents staying informed
            </p>
            <AuthForm />
            <p className="text-xs text-muted-foreground mt-4">
              Free. No spam. Built by{" "}
              <Link to="/rich-ferriman" className="text-primary hover:underline">
                Rich Ferriman
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          SECTION 6 — FOOTER (minimal)
      ──────────────────────────────────────────────── */}
      <footer className="border-t border-border py-4">
        <div className="content-section flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>&copy; 2026 Beacon SEND Navigator</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/how-to-use" className="hover:text-primary transition-colors">How to use</Link>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/sources" className="hover:text-primary transition-colors">Sources</Link>
          </div>
        </div>
      </footer>

      {/* Hero gradient animation */}
      <style>{`
        @keyframes hero-drift {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Landing;
