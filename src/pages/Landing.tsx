import { useRef, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { AnimatedFeatureShowcase } from "@/components/landing/AnimatedFeatureShowcase";
import { LandingAskRich } from "@/components/landing/LandingAskRich";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import beaconLogo from "@/assets/neurodiversity-global-logo-trimmed.png";
import ndgLogo from "@/assets/neurodiversity-global-education-logo-full.png";

/* ── Fade-in on scroll ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return {
    ref,
    className: visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    style: { transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)" },
  };
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
    // If they asked a question before signing up, take them straight to the full answer
    const savedQuestion = localStorage.getItem("landing_question");
    if (savedQuestion) {
      localStorage.removeItem("landing_question");
      return <Navigate to={`/questions-and-answers?q=${encodeURIComponent(savedQuestion)}`} replace />;
    }
    return <Navigate to="/" replace />;
  }

  const scrollToAuth = () => {
    authRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Beacon SEND Navigator | Independent SEND reform guide for parents"
        description="Free independent guide helping parents understand SEND reform in England. EHCPs, the Schools White Paper, Individual Support Plans — explained clearly by a SEND parent."
        path="/landing"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Beacon SEND Navigator",
          "description": "Independent SEND reform guide for parents in England",
          "url": "https://sendnavigator.lovable.app",
          "founder": { "@type": "Person", "name": "Rich Ferriman" },
          "areaServed": { "@type": "Country", "name": "United Kingdom" },
          "audience": { "@type": "EducationalAudience", "educationalRole": "parent" },
        }}
      />

      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
        {/* Layered gradient backdrop - cranked up */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 90% 50% at 50% -10%, hsl(175 60% 40% / 0.25), transparent 65%)",
              "radial-gradient(ellipse 70% 60% at 85% 90%, hsl(262 50% 50% / 0.15), transparent 55%)",
              "radial-gradient(ellipse 50% 40% at 10% 70%, hsl(175 60% 40% / 0.08), transparent 50%)",
            ].join(", "),
          }}
        />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        {/* Animated glow pulse */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle 600px at 50% 40%, hsl(175 60% 40% / 0.1), transparent 70%)",
            animation: "hero-glow 8s ease-in-out infinite alternate",
          }}
        />

        {/* Header bar */}
        <div className="relative content-wide flex items-center justify-end py-6">
          <button
            onClick={scrollToAuth}
            className="absolute right-4 top-6 text-sm tracking-wide min-h-[44px] px-4"
            style={{ color: "hsl(222 20% 55%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(0 0% 95%)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(222 20% 55%)")}
          >
            Sign in
          </button>
        </div>

        {/* Hero content */}
        <div className="relative flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-7"
              style={{ color: "hsl(0 0% 96%)", lineHeight: "1.08" }}
            >
              Your child's SEND rights.
              <br />
              <span
                className="relative inline-block mt-2"
                style={{
                  color: "hsl(175 60% 52%)",
                  textShadow: "0 0 40px hsl(175 60% 40% / 0.35)",
                }}
              >
                Explained by someone who gets it.
              </span>
            </h1>
            <p
              className="text-base sm:text-lg tracking-wide max-w-md mx-auto mb-12"
              style={{ color: "hsl(222 20% 55%)", fontFamily: "Inter, system-ui, sans-serif", lineHeight: "1.7" }}
            >
              Independent. Fact-based. Built by a parent, for parents.
            </p>
            <Button
              onClick={scrollToAuth}
              size="lg"
              className="rounded-full px-10 py-4 text-base gap-2 transition-all duration-300"
              style={{
                boxShadow: "0 0 30px hsl(175 60% 40% / 0.25), 0 4px 20px hsl(0 0% 0% / 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 50px hsl(175 60% 40% / 0.4), 0 4px 30px hsl(0 0% 0% / 0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px hsl(175 60% 40% / 0.25), 0 4px 20px hsl(0 0% 0% / 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Teal fading divider below CTA */}
            <div
              className="mt-14 mx-auto h-px w-48"
              style={{
                background: "linear-gradient(to right, transparent, hsl(175 60% 40% / 0.4), transparent)",
              }}
            />
          </div>
        </div>

        {/* Neurodiversity Global branding at bottom of hero */}
        <div className="relative flex flex-col items-center gap-1 pb-4">
          <img src={ndgLogo} alt="Neurodiversity Global" className="h-32 opacity-80" />
          <p className="text-xs tracking-wide" style={{ color: "hsl(222 20% 50%)" }}>
            A free resource site by Neurodiversity Global
          </p>
        </div>
      </section>

      {/* ─── SECTION 2: PROBLEM STATEMENT ─── */}
      <section className="bg-background relative">
        {/* Gradient threshold border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, hsl(175 60% 40% / 0.25), transparent)",
          }}
        />
        <div
          ref={fade2.ref}
          className={`content-section py-16 sm:py-20 ${fade2.className}`}
          style={fade2.style}
        >
          <div className="max-w-2xl mx-auto text-center relative">
            {/* Decorative quotation mark */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 font-display select-none pointer-events-none"
              style={{
                fontSize: "10rem",
                lineHeight: "1",
                color: "hsl(175 60% 40% / 0.07)",
              }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <p
              className="text-2xl sm:text-3xl md:text-4xl font-display leading-snug text-foreground mb-8"
              style={{ fontStyle: "italic" }}
            >
              SEND reform is here. The White Paper is published. The consultation is open. And most parents still don't know what it means for their child.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-px" style={{ backgroundColor: "hsl(175 60% 40% / 0.5)" }} />
              <p className="text-base sm:text-lg text-muted-foreground">
                This site breaks down every detail so you can act with clarity, not fear.
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-2 tracking-wide">
              Rich Ferriman
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: FEATURE SHOWCASE ─── */}
      <section
        className="relative"
        style={{ backgroundColor: "hsl(222 35% 18% / 0.04)" }}
      >
        <div
          ref={fade3.ref}
          className={`content-wide py-16 sm:py-20 ${fade3.className}`}
          style={fade3.style}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(175 60% 40%)" }} />
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              What's inside
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-12 text-center">
            Everything you need in one place
          </h2>
          <div className="max-w-4xl mx-auto">
            <AnimatedFeatureShowcase />
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: ASK RICH ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "hsl(222 35% 8%)",
        }}
      >
        {/* Diagonal teal stripe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 30%, hsl(175 60% 40% / 0.06) 50%, transparent 70%)",
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div
          ref={fade4.ref}
          className={`content-section relative py-12 sm:py-15 ${fade4.className}`}
          style={fade4.style}
        >
          <div className="max-w-2xl mx-auto rounded-2xl border p-6 sm:p-8" style={{ borderColor: "hsl(222 20% 22%)", backgroundColor: "hsl(222 30% 12% / 0.5)" }}>
            <h2
              className="text-2xl sm:text-3xl font-display font-semibold mb-2"
              style={{ color: "hsl(0 0% 96%)" }}
            >
              Ask Rich anything.
            </h2>
            <p className="text-sm mb-10" style={{ color: "hsl(222 20% 55%)" }}>
              Get a real answer grounded in confirmed facts, not generic AI output.
            </p>
            <LandingAskRich onSignUpClick={scrollToAuth} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: AUTH + CLOSE ─── */}
      <section
        className="relative"
        style={{
          background: "linear-gradient(180deg, hsl(30 15% 96%), hsl(20 12% 95%))",
        }}
      >
        <div
          ref={fade5.ref}
          className={`content-section py-16 sm:py-20 ${fade5.className}`}
          style={fade5.style}
        >
          <div ref={authRef} className="max-w-sm mx-auto text-center">
            <p
              className="text-4xl sm:text-5xl font-display font-semibold mb-3"
              style={{ color: "hsl(175 60% 40%)" }}
            >
              2,400+
            </p>
            <p className="text-lg font-display font-medium text-foreground mb-8">
              parents staying informed
            </p>
            <div className="shadow-xl rounded-xl">
              <AuthForm />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(175 60% 40%)" }} />
                Free
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(175 60% 40%)" }} />
                No spam
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(175 60% 40%)" }} />
                No ads
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(175 60% 40%)" }} />
                Built by SEND Parents
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FOOTER ─── */}
      <footer className="relative py-5">
        {/* Teal gradient top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, hsl(175 60% 40% / 0.2), transparent)",
          }}
        />
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

      {/* Animations */}
      <style>{`
        @keyframes hero-glow {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default Landing;
