import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Heart, ArrowRight, Shield, BookOpen, Search, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-children-reimagined.png";
import beaconLogo from "@/assets/neurodiversity-global-education-logo-full.png";

const HomeTest = () => {
  return (
    <>
      <SEOHead
        title="SEND Navigator | Every child deserves to be seen, understood, and supported"
        description="Navigate SEND with clarity. Understand your child. Know your rights. Take action with confidence."
        path="/home-test"
      />

      <div className="min-h-screen" style={{ background: "#f6f1e8" }}>
        <div style={{ padding: "24px", maxWidth: "1320px", margin: "0 auto" }}>

          {/* ─── HERO ─── */}
          <section
            className="relative overflow-hidden"
            style={{
              borderRadius: "32px 32px 0 0",
              minHeight: "760px",
              background: `
                linear-gradient(180deg, rgba(7,7,7,0.35) 0%, rgba(7,7,7,0.58) 45%, rgba(7,7,7,0.74) 100%),
                url(${heroImage}) center top / cover no-repeat
              `,
            }}
          >
            {/* Bottom fade to bg */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: "120px",
                background: "linear-gradient(to bottom, rgba(246,241,232,0) 0%, #f6f1e8 100%)",
              }}
            />

            {/* Nav */}
            <nav className="relative z-10 flex items-center justify-between text-white" style={{ padding: "28px 34px 0" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full grid place-items-center font-extrabold text-base"
                  style={{
                    background: "linear-gradient(135deg, #f5db9a, #a8ded8)",
                    color: "#1d1d1d",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
                  }}
                >
                  ♡
                </div>
                <span className="font-bold text-2xl tracking-tight">SEND Navigator</span>
              </div>

              <div className="hidden lg:flex items-center gap-8 text-base font-medium opacity-95">
                <Link to="/" className="hover:opacity-75 transition-opacity">Home</Link>
                <Link to="/about" className="hover:opacity-75 transition-opacity">About</Link>
                <Link to="/ehcps" className="hover:opacity-75 transition-opacity">Support</Link>
                <Link to="/sources" className="hover:opacity-75 transition-opacity">Resources</Link>
                <Link to="/questions-and-answers" className="hover:opacity-75 transition-opacity">Ask Rich</Link>
                <Link to="/about" className="hover:opacity-75 transition-opacity">Contact</Link>
              </div>

              <div className="hidden lg:flex items-center gap-3.5">
                <Link
                  to="/landing"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold text-white transition-transform hover:-translate-y-px"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  Sign in
                </Link>
                <Link
                  to="/landing"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold transition-transform hover:-translate-y-px"
                  style={{
                    background: "#f8f1e4",
                    color: "#1a1a1a",
                    boxShadow: "0 10px 24px rgba(29,24,16,0.08)",
                  }}
                >
                  Create account
                </Link>
              </div>
            </nav>

            {/* Hero Grid */}
            <div
              className="relative z-10 grid gap-7 items-end"
              style={{
                gridTemplateColumns: "1.15fr 0.85fr",
                padding: "92px 34px 80px",
              }}
            >
              {/* Left: Copy */}
              <div className="text-white" style={{ maxWidth: "760px", paddingBottom: "84px" }}>
                <h1
                  className="font-extrabold"
                  style={{
                    fontSize: "clamp(3rem, 5vw, 5.4rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.055em",
                    marginBottom: "22px",
                  }}
                >
                  Every child deserves to be{" "}
                  <span style={{ color: "#9ed9d3" }}>seen</span>, <span style={{ color: "#9ed9d3" }}>understood</span>,
                  <br />and <span style={{ color: "#9ed9d3" }}>supported</span>.
                </h1>
                <p
                  style={{
                    fontSize: "1.6rem",
                    lineHeight: 1.35,
                    maxWidth: "720px",
                    color: "rgba(255,255,255,0.92)",
                    marginBottom: "34px",
                  }}
                >
                  Navigate SEND with clarity. Understand your child.
                  <br />Know your rights. Take action with confidence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/my-child-profile"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold transition-transform hover:-translate-y-px"
                    style={{
                      background: "#f7f1e3",
                      color: "#181818",
                      boxShadow: "0 14px 28px rgba(0,0,0,0.18)",
                    }}
                  >
                    Start My Child Profile
                  </Link>
                  <Link
                    to="/ehcps"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold text-white transition-transform hover:-translate-y-px"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Explore Support
                  </Link>
                </div>
              </div>

              {/* Right: Progress Card */}
              <div
                className="w-full text-white"
                style={{
                  maxWidth: "470px",
                  justifySelf: "end",
                  background: "rgba(35,35,35,0.55)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(22px)",
                  borderRadius: "28px",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.25)",
                  padding: "28px",
                  marginTop: "40px",
                }}
              >
                {/* Ring + title */}
                <div className="grid items-center gap-4 mb-6" style={{ gridTemplateColumns: "110px 1fr" }}>
                  <div
                    className="w-[110px] h-[110px] rounded-full grid place-items-center relative"
                    style={{
                      background: "conic-gradient(#f4c661 0 210deg, #9cd6d1 210deg 285deg, rgba(255,255,255,0.12) 285deg 360deg)",
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        inset: "10px",
                        background: "rgba(36,36,36,0.92)",
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                      }}
                    />
                    <span className="relative z-10 text-3xl font-bold">58%</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight" style={{ lineHeight: 1.1 }}>Child Profile Progress</h3>
                    <p className="text-white/70 mt-1">Progress count</p>
                  </div>
                </div>

                {/* Status items */}
                <div className="flex flex-col gap-3.5 mb-5">
                  {[
                    { label: "Emotional Regulation", badge: "Needs support", dotClass: "bg-[#f6b28b]", badgeStyle: { color: "#b96b34", background: "rgba(244,195,141,0.16)", border: "1px solid rgba(244,195,141,0.18)" } },
                    { label: "School Environment", badge: "Mixed", dotClass: "bg-[#f4df9f]", badgeStyle: { color: "#c0a252", background: "rgba(231,211,141,0.14)", border: "1px solid rgba(231,211,141,0.15)" } },
                    { label: "Sensory Profile", badge: "Identified", dotClass: "bg-[#9bd7c9]", badgeStyle: { color: "#74c2b3", background: "rgba(124,214,194,0.14)", border: "1px solid rgba(124,214,194,0.16)" } },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4"
                      style={{
                        padding: "15px 16px",
                        borderRadius: "18px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div className="flex items-center gap-3 font-medium">
                        <div className={`w-3.5 h-3.5 rounded-full ${item.dotClass}`} />
                        {item.label}
                      </div>
                      <span
                        className="rounded-full font-semibold whitespace-nowrap"
                        style={{ padding: "7px 12px", fontSize: "0.92rem", ...item.badgeStyle }}
                      >
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/my-child-profile"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full font-bold text-center transition-transform hover:-translate-y-px"
                  style={{
                    background: "#f6efe2",
                    color: "#1b1b1b",
                    padding: "16px 22px",
                    fontSize: "1.05rem",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  Continue Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* ─── CONTENT (overlaps hero bottom) ─── */}
          <div className="relative z-10" style={{ marginTop: "-40px" }}>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              {[
                { icon: <BookOpen className="w-6 h-6" />, title: "My Child Profile", desc: "Build a full understanding of your child's needs", to: "/my-child-profile", bg: "#f8e8de" },
                { icon: <Search className="w-6 h-6" />, title: "Ask Rich", desc: "Straight-talking guidance from lived experience", to: "/questions-and-answers", bg: "#f8efd8" },
                { icon: <Shield className="w-6 h-6" />, title: "Know Your Rights", desc: "EHCPs, legal routes, and the system explained", to: "/ehcps", bg: "#f8e7e0" },
                { icon: <Sparkles className="w-6 h-6" />, title: "Find Support", desc: "Services, tools, and next steps near you", to: "/what-to-do-right-now", bg: "#f2e6cb" },
              ].map((card) => (
                <Link
                  key={card.title}
                  to={card.to}
                  className="flex flex-col justify-between transition-all hover:-translate-y-1.5"
                  style={{
                    background: "rgba(255,255,255,0.78)",
                    border: "1px solid rgba(34,34,34,0.06)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 18px 40px rgba(29,24,16,0.10)",
                    borderRadius: "28px",
                    padding: "28px",
                    minHeight: "190px",
                  }}
                >
                  <div>
                    <div
                      className="w-14 h-14 rounded-full grid place-items-center mb-4"
                      style={{ background: card.bg, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)" }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "#1f1f1f" }}>{card.title}</h3>
                    <p style={{ color: "#6e6a63", fontSize: "1.05rem", maxWidth: "280px" }}>{card.desc}</p>
                  </div>
                  <div
                    className="self-end w-9 h-9 rounded-full grid place-items-center mt-4"
                    style={{ background: "rgba(0,0,0,0.04)", color: "#2a2a2a" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>

            {/* ─── Insight Section ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
              {/* Left */}
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full font-bold uppercase text-sm tracking-wide mb-4"
                  style={{ padding: "6px 12px", background: "#f2e6cf", color: "#a47742", fontSize: "0.84rem" }}
                >
                  What's really going on?
                </div>
                <h2 className="font-extrabold mb-3" style={{ fontSize: "clamp(2.4rem, 4vw, 4rem)", lineHeight: 1.03, letterSpacing: "-0.045em", color: "#1f1f1f" }}>
                  Behaviour is communication.
                </h2>
                <p className="mb-6" style={{ color: "#343434", fontSize: "1.55rem", maxWidth: "620px" }}>
                  We help you understand what sits underneath.
                </p>
                <div className="flex flex-col gap-3.5" style={{ maxWidth: "520px" }}>
                  {["Sensory", "Environment", "People & Relationships", "Nervous System", "Demand & Pressure"].map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-4 font-semibold"
                      style={{
                        padding: "16px 18px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(30,30,30,0.06)",
                        boxShadow: "0 10px 24px rgba(29,24,16,0.08)",
                        fontSize: "1.1rem",
                      }}
                    >
                      <span className="opacity-75">⌾</span>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Report Preview Card */}
              <div
                className="overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(30,30,30,0.06)",
                  boxShadow: "0 18px 40px rgba(29,24,16,0.10)",
                  borderRadius: "32px",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "430px" }}>
                  {/* Art panel */}
                  <div
                    className="relative min-h-[220px]"
                    style={{
                      background: "radial-gradient(circle at 70% 22%, #f6d67d 0 10px, transparent 11px), linear-gradient(180deg, #dcefee 0%, #d8ece8 48%, #f7d8b5 100%)",
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                      <path d="M0 200 Q100 120 200 200 T400 200" stroke="rgba(0,0,0,0.06)" strokeWidth="2" fill="none" />
                      <path d="M0 240 Q100 160 200 240 T400 240" stroke="rgba(0,0,0,0.04)" strokeWidth="2" fill="none" />
                      <circle cx="200" cy="180" r="8" fill="rgba(80,160,140,0.3)" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col justify-between">
                    <div>
                      <div
                        className="inline-flex rounded-full font-extrabold uppercase text-xs tracking-wide mb-4"
                        style={{ padding: "6px 12px", background: "#edf1eb", color: "#80917f" }}
                      >
                        Personalised insight
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight mb-3" style={{ lineHeight: 1.12, maxWidth: "460px" }}>
                        Your child may be experiencing overload in busy environments
                      </h3>
                      <p style={{ color: "#6e6a63", fontSize: "1.06rem", maxWidth: "470px", marginBottom: "22px" }}>
                        Transitions appear to be a pressure point, especially in unstructured settings.
                      </p>
                      <p className="font-bold mb-3">Observed Strengths</p>
                      <div className="flex flex-wrap gap-2.5 mb-6">
                        {["Focus", "Pattern recognition", "Creativity"].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full font-semibold"
                            style={{
                              padding: "10px 14px",
                              background: "#f5efe3",
                              color: "#5e574e",
                              border: "1px solid rgba(0,0,0,0.04)",
                              fontSize: "0.95rem",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to="/my-child-profile"
                      className="self-start inline-flex items-center gap-2 rounded-full font-bold text-white transition-transform hover:-translate-y-px"
                      style={{
                        background: "#202020",
                        padding: "16px 24px",
                        boxShadow: "0 10px 24px rgba(29,24,16,0.08)",
                      }}
                    >
                      View Full Report
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Journey Steps ─── */}
            <div className="text-center mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full font-bold uppercase text-sm tracking-wide mb-3"
                style={{ padding: "6px 12px", background: "#f2e6cf", color: "#a47742", fontSize: "0.84rem" }}
              >
                How it works
              </div>
              <h2 className="font-extrabold mb-7" style={{ fontSize: "clamp(2.2rem, 3vw, 3.3rem)", lineHeight: 1.08, letterSpacing: "-0.04em", color: "#1f1f1f" }}>
                Your journey, simplified
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mx-auto" style={{ maxWidth: "1100px" }}>
                {[
                  { num: "1", title: "Build your child profile", desc: "Answer guided questions at your pace" },
                  null,
                  { num: "2", title: "Understand patterns & needs", desc: "Get clear, personalised insights" },
                  null,
                  { num: "3", title: "Take action with confidence", desc: "Access tools, scripts, and support" },
                ].map((step, i) =>
                  step === null ? (
                    <div key={`arrow-${i}`} className="hidden md:grid place-items-center text-3xl font-light" style={{ color: "#8e877f" }}>→</div>
                  ) : (
                    <div
                      key={step.num}
                      className="text-left"
                      style={{
                        background: "rgba(255,255,255,0.78)",
                        border: "1px solid rgba(30,30,30,0.06)",
                        boxShadow: "0 10px 24px rgba(29,24,16,0.08)",
                        borderRadius: "24px",
                        padding: "26px 24px",
                        minHeight: "152px",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-full grid place-items-center font-extrabold mb-4"
                        style={{ background: "#efe0bb", color: "#7f6532" }}
                      >
                        {step.num}
                      </div>
                      <h3 className="text-xl font-bold tracking-tight mb-2">{step.title}</h3>
                      <p style={{ color: "#6e6a63" }}>{step.desc}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ─── Footer Bar ─── */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white mb-6"
              style={{
                background: "linear-gradient(180deg, #31484c 0%, #203336 100%)",
                borderRadius: "32px",
                padding: "22px 30px",
                boxShadow: "0 24px 54px rgba(23,33,35,0.18)",
              }}
            >
              {[
                { icon: <Heart className="w-5 h-5" />, title: "Built for UK families", desc: "Grounded in real SEND experience" },
                { icon: <BookOpen className="w-5 h-5" />, title: "Clear, practical guidance", desc: "No jargon. No overwhelm." },
                { icon: <Shield className="w-5 h-5" />, title: "Your data, your control", desc: "Private, secure, GDPR-aligned" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4" style={{ minHeight: "72px" }}>
                  <div
                    className="w-14 h-14 rounded-full grid place-items-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg tracking-tight">{item.title}</h4>
                    <p className="text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTest;
