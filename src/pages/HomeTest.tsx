import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { ArrowRight, Heart, BookOpen, Shield, Sparkles, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-children-reimagined.png";

const HomeTest = () => {
  return (
    <>
      <SEOHead
        title="SEND Navigator | Every child deserves to be seen, understood, and supported"
        description="Navigate SEND with clarity. Understand your child. Know your rights. Take action with confidence."
        path="/home-test"
      />

      <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* ─── HERO: FULL VIEWPORT ─── */}
        <section className="relative min-h-screen flex flex-col">
          {/* BG image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
            }}
          />
          {/* Overlays */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 80%, #080808 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(158,217,211,0.08) 0%, transparent 60%)" }} />

          {/* Nav */}
          <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full grid place-items-center" style={{ background: "linear-gradient(135deg, #f5db9a, #9ed9d3)", boxShadow: "0 0 30px rgba(158,217,211,0.3)" }}>
                <Heart className="w-5 h-5 text-[#1a1a1a]" fill="#1a1a1a" />
              </div>
              <span className="text-xl font-bold tracking-tight">SEND Navigator</span>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              {["Home", "About", "Support", "Resources", "Ask Rich"].map((item) => (
                <Link key={item} to="/" className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5">{item}</Link>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/landing" className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors">Sign in</Link>
              <Link to="/landing" className="px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(20px)" }}>
                Create account
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="relative z-10 flex-1 flex items-end px-6 md:px-12 pb-32 md:pb-40">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full max-w-[1400px] mx-auto items-end">
              {/* Left: Big statement */}
              <div className="lg:col-span-3">
                <h1 className="font-extrabold leading-[0.92] tracking-[-0.06em] mb-6" style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}>
                  Every child
                  <br />deserves to be
                  <br /><span className="bg-gradient-to-r from-[#9ed9d3] to-[#7bc4bd] bg-clip-text text-transparent">seen</span>, <span className="bg-gradient-to-r from-[#f5db9a] to-[#e8c97a] bg-clip-text text-transparent">understood</span>,
                  <br />and <span className="bg-gradient-to-r from-[#f6b28b] to-[#e8a07a] bg-clip-text text-transparent">supported</span>.
                </h1>
                <p className="text-lg md:text-xl text-white/60 max-w-xl mb-8 leading-relaxed">
                  Navigate SEND with clarity. Understand your child.
                  Know your rights. Take action with confidence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/my-child-profile"
                    className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold text-[#0a0a0a] transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #f5db9a, #e8c97a)", boxShadow: "0 0 40px rgba(245,219,154,0.25)" }}
                  >
                    Start My Child Profile
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/ehcps"
                    className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold text-white transition-all hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)" }}
                  >
                    Explore Support
                  </Link>
                </div>
              </div>

              {/* Right: Frosted progress card */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-3xl p-6 md:p-7"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(40px) saturate(1.2)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#progressGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${58 * 2.64} ${100 * 2.64}`} />
                        <defs>
                          <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f5db9a" />
                            <stop offset="60%" stopColor="#9ed9d3" />
                            <stop offset="100%" stopColor="#7bc4bd" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute inset-0 grid place-items-center text-2xl font-bold">58%</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">Child Profile</h3>
                      <p className="text-sm text-white/40 mt-1">In progress</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    {[
                      { label: "Emotional Regulation", status: "Needs support", color: "#f6b28b" },
                      { label: "School Environment", status: "Mixed", color: "#f5db9a" },
                      { label: "Sensory Profile", status: "Identified", color: "#9ed9d3" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 12px ${item.color}40` }} />
                          <span className="text-sm font-medium text-white/80">{item.label}</span>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}20` }}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/my-child-profile"
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-sm transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Continue Profile <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── QUICK LINKS ─── */}
        <section className="px-6 md:px-12 -mt-16 relative z-20">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen className="w-5 h-5" />, title: "My Child Profile", desc: "Build a full understanding of your child's needs", to: "/my-child-profile", glow: "#f5db9a" },
              { icon: <Sparkles className="w-5 h-5" />, title: "Ask Rich", desc: "Straight-talking guidance from lived experience", to: "/questions-and-answers", glow: "#9ed9d3" },
              { icon: <Shield className="w-5 h-5" />, title: "Know Your Rights", desc: "EHCPs, legal routes, and the system explained", to: "/ehcps", glow: "#f6b28b" },
              { icon: <Heart className="w-5 h-5" />, title: "Find Support", desc: "Services, tools, and next steps near you", to: "/what-to-do-right-now", glow: "#c4a8e0" },
            ].map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group relative rounded-2xl p-6 flex flex-col justify-between min-h-[200px] transition-all hover:scale-[1.03] hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at 50% 100%, ${card.glow}08, transparent 70%)` }} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center mb-4" style={{ background: `${card.glow}15`, border: `1px solid ${card.glow}20` }}>
                    <div style={{ color: card.glow }}>{card.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-1.5" style={{ color: card.glow }}>{card.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
                </div>
                <div className="relative self-end mt-4 w-8 h-8 rounded-full grid place-items-center transition-all group-hover:bg-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── BEHAVIOUR IS COMMUNICATION ─── */}
        <section className="px-6 md:px-12 py-28">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6" style={{ background: "rgba(245,219,154,0.1)", color: "#f5db9a", border: "1px solid rgba(245,219,154,0.15)" }}>
                What's really going on?
              </div>
              <h2 className="font-extrabold tracking-[-0.05em] mb-4" style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", lineHeight: 1 }}>
                Behaviour is
                <br />communication.
              </h2>
              <p className="text-lg text-white/50 mb-10 max-w-lg leading-relaxed">
                We help you understand what sits underneath.
              </p>
              <div className="space-y-3 max-w-md">
                {[
                  { icon: "⌾", label: "Sensory", color: "#9ed9d3" },
                  { icon: "▣", label: "Environment", color: "#f5db9a" },
                  { icon: "◌", label: "People & Relationships", color: "#f6b28b" },
                  { icon: "✳", label: "Nervous System", color: "#c4a8e0" },
                  { icon: "◍", label: "Demand & Pressure", color: "#e88b8b" },
                ].map((topic) => (
                  <div
                    key={topic.label}
                    className="flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all hover:scale-[1.02] cursor-default"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ color: topic.color, fontSize: "1.2rem" }}>{topic.icon}</span>
                    <span className="text-white/80">{topic.label}</span>
                    <div className="ml-auto w-full max-w-[120px] h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="h-full rounded-full" style={{ width: `${60 + Math.random() * 35}%`, background: `linear-gradient(90deg, ${topic.color}60, ${topic.color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Insight card */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-8 rounded-[48px] opacity-40" style={{ background: "radial-gradient(ellipse at center, rgba(158,217,211,0.08), transparent 70%)" }} />
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
                }}
              >
                {/* Art panel */}
                <div className="relative h-48 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2e2c, #1e3530, #2a3020)" }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" fill="none" preserveAspectRatio="none">
                    <path d="M0 120 Q150 60 300 120 T600 120" stroke="rgba(158,217,211,0.15)" strokeWidth="2" fill="none" />
                    <path d="M0 140 Q150 80 300 140 T600 140" stroke="rgba(158,217,211,0.08)" strokeWidth="2" fill="none" />
                    <path d="M0 100 Q150 160 300 100 T600 100" stroke="rgba(245,219,154,0.08)" strokeWidth="1.5" fill="none" />
                    <circle cx="300" cy="100" r="6" fill="rgba(158,217,211,0.4)">
                      <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="300" cy="100" r="20" fill="none" stroke="rgba(158,217,211,0.1)" strokeWidth="1">
                      <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03))" }} />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "rgba(158,217,211,0.1)", color: "#9ed9d3", border: "1px solid rgba(158,217,211,0.15)" }}>
                    Personalised insight
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-3 leading-snug">
                    Your child may be experiencing overload in busy environments
                  </h3>
                  <p className="text-sm text-white/40 mb-6 leading-relaxed">
                    Transitions appear to be a pressure point, especially in unstructured settings.
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Observed Strengths</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Focus", "Pattern recognition", "Creativity"].map((tag) => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/my-child-profile"
                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, rgba(158,217,211,0.15), rgba(158,217,211,0.08))", border: "1px solid rgba(158,217,211,0.2)", color: "#9ed9d3" }}
                  >
                    View Full Report <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── YOUR JOURNEY ─── */}
        <section className="px-6 md:px-12 pb-28">
          <div className="max-w-[1100px] mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "rgba(245,219,154,0.1)", color: "#f5db9a", border: "1px solid rgba(245,219,154,0.15)" }}>
              How it works
            </div>
            <h2 className="font-extrabold tracking-[-0.05em]" style={{ fontSize: "clamp(2rem, 3vw, 3.2rem)", lineHeight: 1.05 }}>
              Your journey, simplified
            </h2>
          </div>

          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(255,255,255,0.06), transparent)" }} />

            {[
              { num: "1", title: "Build your child profile", desc: "Answer guided questions at your pace", color: "#f5db9a" },
              { num: "2", title: "Understand patterns & needs", desc: "Get clear, personalised insights", color: "#9ed9d3" },
              { num: "3", title: "Take action with confidence", desc: "Access tools, scripts, and support", color: "#f6b28b" },
            ].map((step) => (
              <div
                key={step.num}
                className="relative rounded-2xl p-7 text-left transition-all hover:scale-[1.03]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="w-10 h-10 rounded-full grid place-items-center font-extrabold text-sm mb-5" style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}25`, boxShadow: `0 0 20px ${step.color}10` }}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TRUST FOOTER ─── */}
        <section className="px-6 md:px-12 pb-12">
          <div
            className="max-w-[1400px] mx-auto rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 p-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            {[
              { icon: <Heart className="w-5 h-5" />, title: "Built for UK families", desc: "Grounded in real SEND experience", color: "#f6b28b" },
              { icon: <BookOpen className="w-5 h-5" />, title: "Clear, practical guidance", desc: "No jargon. No overwhelm.", color: "#9ed9d3" },
              { icon: <Shield className="w-5 h-5" />, title: "Your data, your control", desc: "Private, secure, GDPR-aligned", color: "#f5db9a" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-2xl grid place-items-center flex-shrink-0" style={{ background: `${item.color}10`, border: `1px solid ${item.color}15` }}>
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeTest;
