import { useRef, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { AnimatedFeatureShowcase } from "@/components/landing/AnimatedFeatureShowcase";
import { LandingAskRich } from "@/components/landing/LandingAskRich";
import askRichCharacter from "@/assets/ask-rich-character.png";
import { LandingContactForm } from "@/components/landing/LandingContactForm";
import { PersistentNewsTicker } from "@/components/PersistentNewsTicker";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Check, AlertCircle, Mail } from "lucide-react";
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
  const isPreview = searchParams.get("preview") === "true";

  const fade2 = useFadeIn();
  const fade3 = useFadeIn();
  const fade4 = useFadeIn();

  if (!loading && user && !isPreview) {
    const savedQuestion = localStorage.getItem("landing_question");
    if (savedQuestion) {
      localStorage.removeItem("landing_question");
      return <Navigate to={`/questions-and-answers?q=${encodeURIComponent(savedQuestion)}`} replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Neurodiversity Global SEND Navigator | Independent SEND reform guide for parents"
        description="Free independent guide helping parents understand SEND reform in England. EHCPs, the Schools White Paper, Individual Support Plans — explained clearly by a SEND parent."
        path="/landing"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Neurodiversity Global SEND Navigator",
          "description": "Independent SEND reform guide for parents in England",
          "url": "https://sendnavigator.lovable.app",
          "founder": { "@type": "Person", "name": "Rich Ferriman" },
          "areaServed": { "@type": "Country", "name": "United Kingdom" },
          "audience": { "@type": "EducationalAudience", "educationalRole": "parent" },
        }}
      />

      {/* ─── BETA DISCLAIMER ─── */}
      <div
        className="w-full py-2.5 px-4 text-center text-xs sm:text-sm"
        style={{
          backgroundColor: "hsl(222 30% 14%)",
          borderBottom: "1px solid hsl(222 20% 22%)",
          color: "hsl(222 15% 65%)",
        }}
      >
        <span className="inline-flex items-center gap-1.5 flex-wrap justify-center">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(175 60% 52%)" }} />
          This site is in beta. We are actively testing and improving, and your feedback helps us get it right.
        </span>
      </div>

      {/* ─── SECTION 1: SPLIT HERO ─── */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
        {/* Layered gradient backdrop */}
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

        {/* Split hero content */}
        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-8 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT: Title & message */}
            <div className="text-center lg:text-left">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-semibold mb-6"
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
                className="text-base sm:text-lg tracking-wide max-w-md mx-auto lg:mx-0 mb-8"
                style={{ color: "hsl(222 20% 55%)", fontFamily: "Inter, system-ui, sans-serif", lineHeight: "1.7" }}
              >
                Always Free. Independent. Fact-based. Built by a parent, for parents.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                {["Free", "No spam", "No ads", "Built by SEND Parents"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(222 20% 60%)" }}>
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(175 60% 40%)" }} />
                    {badge}
                  </span>
                ))}
              </div>

              {/* NDG logo */}
              <div className="flex flex-col items-center lg:items-start gap-1">
                <img src={ndgLogo} alt="Neurodiversity Global" className="h-20 opacity-80" />
                <p className="text-xs tracking-wide" style={{ color: "hsl(222 20% 50%)" }}>
                  A free resource site by Neurodiversity Global
                </p>
              </div>
            </div>

            {/* RIGHT: Auth form */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <p
                  className="text-center text-lg font-display font-semibold mb-1"
                  style={{ color: "hsl(0 0% 96%)" }}
                >
                  2,400+
                </p>
                <p className="text-center text-sm mb-4" style={{ color: "hsl(222 20% 60%)" }}>
                  parents staying informed
                </p>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 40px hsl(175 60% 40% / 0.15), 0 8px 32px hsl(0 0% 0% / 0.4)",
                  }}
                >
                  <AuthForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FEATURE SHOWCASE ─── */}
      <section
        className="relative"
        style={{ backgroundColor: "hsl(222 35% 18% / 0.04)" }}
      >
        <div
          ref={fade2.ref}
          className={`content-wide py-16 sm:py-20 ${fade2.className}`}
          style={fade2.style}
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

      {/* ─── SECTION 3: ASK RICH + CONTACT ─── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "hsl(222 35% 8%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 30%, hsl(175 60% 40% / 0.06) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div
          ref={fade3.ref}
          className={`content-wide relative py-12 sm:py-16 ${fade3.className}`}
          style={fade3.style}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT: Ask Rich */}
            <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: "hsl(222 20% 22%)", backgroundColor: "hsl(222 30% 12% / 0.5)" }}>
              {/* Character + intro - matching site-wide style */}
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                <img
                  src={askRichCharacter}
                  alt="Ask Rich"
                  className="w-24 sm:w-28 rounded-2xl flex-shrink-0"
                  style={{ border: "2px solid hsl(262 50% 50% / 0.3)" }}
                />
                <div className="text-center sm:text-left">
                  <h2
                    className="text-2xl sm:text-3xl font-display font-normal mb-2"
                    style={{ color: "hsl(0 0% 96%)" }}
                  >
                    Got a question? Just ask.
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(222 20% 55%)" }}>
                    I'm Rich, a SEND parent. Ask me anything about the reforms, EHCPs, or what to do right now. I'll give you a straight answer based on what we actually know.
                  </p>
                </div>
              </div>
              <LandingAskRich />
            </div>

            {/* RIGHT: Contact Us */}
            <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: "hsl(222 20% 22%)", backgroundColor: "hsl(222 30% 12% / 0.5)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(175 60% 40% / 0.12)" }}>
                  <Mail className="w-4 h-4" style={{ color: "hsl(175 60% 52%)" }} />
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-semibold" style={{ color: "hsl(0 0% 96%)" }}>
                  Contact us
                </h2>
              </div>
              <p className="text-sm mb-6" style={{ color: "hsl(222 15% 70%)" }}>
                Get in touch — we'd love to hear from you.
              </p>
              <LandingContactForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: RICH QUOTE (NAVY) ─── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "hsl(222 35% 10%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div
          ref={fade4.ref}
          className={`content-section py-16 sm:py-20 ${fade4.className}`}
          style={fade4.style}
        >
          <div className="max-w-2xl mx-auto text-center relative">
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 font-display select-none pointer-events-none"
              style={{ fontSize: "10rem", lineHeight: "1", color: "hsl(175 60% 40% / 0.07)" }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <p
              className="text-xl sm:text-2xl md:text-3xl font-display leading-snug mb-8"
              style={{ fontStyle: "italic", color: "hsl(0 0% 90%)" }}
            >
              SEND reform is here. The White Paper is published. The consultation is open. And most parents still don't know what it means for their child.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-px" style={{ backgroundColor: "hsl(175 60% 40% / 0.5)" }} />
              <p className="text-base sm:text-lg" style={{ color: "hsl(222 20% 65%)" }}>
                This site breaks down every detail so you can act with clarity, not fear.
              </p>
            </div>
            <p className="text-sm mt-2 tracking-wide" style={{ color: "hsl(222 20% 50%)" }}>
              Rich Ferriman
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative py-5 pb-20" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, hsl(175 60% 40% / 0.2), transparent)",
          }}
        />
        <div className="content-section flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: "hsl(222 20% 50%)" }}>
          <p>&copy; 2026 Neurodiversity Global SEND Navigator</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/how-to-use" className="hover:text-white transition-colors">How to use</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/sources" className="hover:text-white transition-colors">Sources</Link>
          </div>
        </div>
      </footer>

      {/* News ticker */}
      <PersistentNewsTicker />

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
