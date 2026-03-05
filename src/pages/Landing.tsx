import { useRef, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AuthForm } from "@/components/AuthForm";
import { PersistentNewsTicker } from "@/components/PersistentNewsTicker";
import { useAuth } from "@/contexts/AuthContext";
import heroChildren from "@/assets/landing-hero-children.png";
import ndgLogo from "@/assets/neurodiversity-global-education-logo-full.png";
import beaconLogo from "@/assets/beacon-logo.png";

const Landing = () => {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  if (!loading && user && !isPreview) {
    const savedQuestion = localStorage.getItem("landing_question");
    if (savedQuestion) {
      localStorage.removeItem("landing_question");
      return <Navigate to={`/questions-and-answers?q=${encodeURIComponent(savedQuestion)}`} replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <SEOHead
        title="Neurodiversity Global SEND Navigator | Independent SEND reform guide for parents"
        description="Free independent guide helping parents understand SEND reform in England. EHCPs, the Schools White Paper, Individual Support Plans — explained clearly by a SEND parent."
        path="/landing"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Neurodiversity Global SEND Navigator",
          "description": "Independent SEND reform guide for parents in England",
          "url": "https://send.neurodiversityglobal.com",
          "founder": { "@type": "Person", "name": "Rich Ferriman" },
          "areaServed": { "@type": "Country", "name": "United Kingdom" },
          "audience": { "@type": "EducationalAudience", "educationalRole": "parent" },
        }}
      />

      {/* ─── FULL-BLEED BACKGROUND ─── */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroChildren})` }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40" />

      {/* ─── CONTENT LAYER ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ─── LOGO BAR ─── */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5">
          <img
            src={ndgLogo}
            alt="Neurodiversity Global"
            className="h-10 sm:h-12 brightness-0 invert opacity-90"
          />
          <img
            src={beaconLogo}
            alt="Beacon"
            className="h-8 sm:h-10 brightness-0 invert opacity-90"
          />
        </div>

        {/* ─── CENTER CARD ─── */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8">
          <div
            className="w-full max-w-5xl rounded-xl border shadow-2xl overflow-hidden"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              backgroundColor: "rgba(0, 0, 0, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.15)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* LEFT: Hero text */}
              <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  SEND Navigator
                </h1>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-5">
                  A calm, independent place to understand SEND, use practical tools, and work out what to do next.
                </p>

                <ul className="space-y-2.5 mb-5">
                  {[
                    "Clear explanations of the system.",
                    "Practical tools to communicate needs and take action.",
                    "Plain English answers to real questions, based on evidence and lived experience.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "hsl(175 60% 52%)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {["Always free", "No ads", "A safe space", "Independent & fact-based", "Built by parents"].map((badge) => (
                    <span key={badge} className="flex items-center gap-1.5 text-xs text-white/50">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(175 60% 40%)" }} />
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-white/40 leading-relaxed mb-5">
                  Parent focused. Open and useful to teachers, SENCOs, professionals, and anyone supporting a child.
                </p>

                <div className="flex flex-col items-start gap-1">
                  <img src={ndgLogo} alt="Neurodiversity Global" className="h-16 brightness-0 invert opacity-70" />
                  <p className="text-xs text-white/40">
                    A free resource site by Neurodiversity Global
                  </p>
                </div>
              </div>

              {/* RIGHT: Login form card */}
              <div className="p-6 sm:p-8 md:p-10 flex items-center justify-center">
                <div
                  className="w-full max-w-sm rounded-xl border p-6 sm:p-8"
                  style={{
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255, 255, 255, 0.10)",
                    borderColor: "rgba(255, 255, 255, 0.20)",
                  }}
                >
                  <AuthForm variant="glass" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <div className="text-center py-4 pb-16">
          <p className="text-sm text-white/70">
            Need help?{" "}
            <Link to="/about" className="underline hover:text-white transition-colors">
              Contact us
            </Link>
          </p>
        </div>
      </div>

      {/* News ticker */}
      <PersistentNewsTicker />
    </div>
  );
};

export default Landing;
