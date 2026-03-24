import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-children-reimagined.png";

export default function ComingSoon() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    const { error } = await (supabase as any).from("waitlist_signups").insert({ name: name.trim(), email: email.trim().toLowerCase() });
    if (error) {
      if (error.code === "23505") {
        setStatus("success"); // already signed up
      } else {
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
      }
    } else {
      setStatus("success");
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "#080808" }}>
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.25,
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.85) 60%, #080808 100%)" }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
            style={{ background: "linear-gradient(135deg, #f5db9a, #9ed9d3)", color: "#1a1a1a" }}
          >
            ♡
          </div>
          <span className="text-white/90 text-xl font-bold tracking-tight">SEND Navigator</span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6"
          style={{
            background: "linear-gradient(180deg, #ffffff 30%, #9ed9d3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Something new
          <br />
          is coming.
        </h1>

        <p className="text-white/60 text-base sm:text-lg max-w-lg mb-3 leading-relaxed">
          We're rebuilding SEND Navigator from the ground up — clearer, calmer, and more useful than ever.
        </p>
        <p className="text-white/40 text-sm max-w-md mb-10">
          Join the waitlist and be the first to know when we relaunch.
        </p>

        {/* Form */}
        {status === "success" ? (
          <div
            className="rounded-2xl border px-8 py-6 max-w-md w-full"
            style={{
              background: "rgba(158, 217, 211, 0.08)",
              borderColor: "rgba(158, 217, 211, 0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="text-2xl mb-2">✓</div>
            <p className="text-white font-semibold text-lg">You're on the list!</p>
            <p className="text-white/50 text-sm mt-1">We'll email you as soon as we're ready.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl border p-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
            }}
          >
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/30 mb-3 outline-none focus:border-[#9ed9d3]/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/30 mb-4 outline-none focus:border-[#9ed9d3]/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl py-3.5 text-sm font-bold tracking-tight transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #f5db9a, #9ed9d3)", color: "#1a1a1a" }}
            >
              {status === "loading" ? "Joining..." : "Join the waitlist"}
            </button>
            {status === "error" && <p className="text-red-400 text-xs mt-3">{errorMsg}</p>}
          </form>
        )}

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {["Always free", "No ads", "Built by parents", "Independent"].map((t) => (
            <span key={t} className="text-white/25 text-xs flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full" style={{ background: "#9ed9d3" }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6">
        <p className="text-white/20 text-xs">
          A free resource by Neurodiversity Global
        </p>
      </div>
    </div>
  );
}
