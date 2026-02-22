import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, BookOpen, FileText, MessageCircleQuestion, MessageSquare, HelpCircle, ExternalLink, MapPin, Info } from "lucide-react";

export function Footer() {
  const [showAboutTool, setShowAboutTool] = useState(false);
  return (
    <footer className="bg-navy text-navy-foreground mt-auto">
      {/* Main footer content */}
      <div className="content-wide py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">SEND Reform Navigator</p>
                <p className="text-sm text-navy-muted">A friendly guide for families</p>
              </div>
            </div>
            <p className="text-sm text-navy-muted leading-relaxed max-w-xs">
              Helping parents, carers, and professionals understand what is happening with SEND reform in England, clearly, calmly, and honestly.
            </p>
          </div>

          {/* Navigate column */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Navigate</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/state-of-send-2026", label: "State of SEND 2026", icon: BookOpen },
                { to: "/state-of-send-2026/what-is-changing", label: "What is changing", icon: FileText },
                { to: "/state-of-send-2026/what-the-leaks-are-saying", label: "What the leaks say", icon: ExternalLink },
                { to: "/state-of-send-2026/what-is-being-discussed", label: "What is discussed", icon: HelpCircle },
                { to: "/state-of-send-2026/timeline", label: "Timeline", icon: FileText },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2.5 text-sm text-navy-muted hover:text-white transition-colors"
                  >
                    <link.icon className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/questions-and-answers", label: "Ask Rich", icon: MessageCircleQuestion },
                { to: "/community-questions", label: "Lived Experience", icon: MessageSquare },
                { to: "/sources", label: "Sources", icon: FileText },
                { to: "/how-to-use", label: "How to use this site", icon: HelpCircle },
                { to: "/statistics-and-data", label: "Statistics and Data", icon: BookOpen },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2.5 text-sm text-navy-muted hover:text-white transition-colors"
                  >
                    <link.icon className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About column */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">About</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/about", label: "About this resource" },
                { to: "/why-i-built-this", label: "Why I built this" },
                { to: "/rich-ferriman", label: "Rich Ferriman" },
                { to: "/neurodiversity-global", label: "Neurodiversity Global" },
                { to: "/sendiass", label: "Free help - SENDIASS" },
                { to: "/what-we-owe-our-children", label: "Reality Bites series" },
                { to: "/feedback", label: "Give feedback" },
                { to: "/admin", label: "Admin" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-navy-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setShowAboutTool(!showAboutTool)}
                  className="text-sm text-navy-muted hover:text-white transition-colors"
                >
                  About this tool
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* About this tool expandable */}
      {showAboutTool && (
        <div className="border-t border-white/10">
          <div className="content-wide py-6 space-y-4 text-sm text-navy-muted leading-relaxed max-w-3xl">
            <p>We are a father and son team working in the world of neurodiversity. Between us we have lived experience that no textbook can replicate. This tool, and this site, is our attempt to cut through the noise for families who are exhausted by a system that was not built for their children.</p>
            <p>Anything you read here, anything the AI generates, any strategy or suggestion offered, may be useful. It may not. We will sometimes get things wrong. Nothing you receive from this tool is legally binding. It does not constitute a medical opinion, a clinical assessment, or a formally endorsed recommendation. It has not been signed off by a government body, a medical authority, or any regulatory institution. It is the honest, experience-led thinking of two people who know this world from the inside and want to make it easier for the families living it.</p>
            <p>Use it as a starting point. Question it. Adapt it. Share what helps and leave what does not.</p>
            <p className="font-medium text-white/70">This tool is a guide. It is not a diagnosis.</p>
          </div>
        </div>
      )}

      {/* Disclaimer bar */}
      <div className="border-t border-white/10">
        <div className="content-wide py-4 text-center">
          <p className="text-xs text-navy-muted leading-relaxed">
            Neurodiversity Global Ltd is not responsible for any data published on this site. All data comes from relevant and trusted sources.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="content-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-muted leading-relaxed text-center sm:text-left">
            This is an independent public resource. It does not provide legal, medical, or professional advice. Information applies to England only.
          </p>
          <p className="text-xs text-white/30 whitespace-nowrap">
            © {new Date().getFullYear()} SEND Reform Navigator
          </p>
        </div>
      </div>
    </footer>
  );
}
