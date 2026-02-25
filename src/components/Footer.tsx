import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen, FileText, MessageCircleQuestion, MessageSquare,
  HelpCircle, ExternalLink, Shield, Brain, Scale, Megaphone,
  ClipboardList, LogOut, Stethoscope, GraduationCap, AlertTriangle,
  Building2, MapPin, Globe, Heart, HandHeart, Users,
} from "lucide-react";
import beaconLogo from "@/assets/beacon-logo.png";
import ngEducationLogo from "@/assets/neurodiversity-global-education-logo-full.png";

export function Footer() {
  const [showAboutTool, setShowAboutTool] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <footer className="bg-navy text-navy-foreground mt-auto">
      <div className="content-wide py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img src={beaconLogo} alt="Beacon SEND Navigator" className="h-12" />
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
                { to: "/ehcps", label: "EHCP Guide", icon: Shield },
                { to: "/ehcp-health", label: "Health in EHCPs", icon: Stethoscope },
                { to: "/what-to-do-right-now", label: "What to do now", icon: Scale },
                { to: "/my-child-profile", label: "My Child: A Profile", icon: ClipboardList },
                { to: "/exclusions", label: "Exclusions and rights", icon: AlertTriangle },
                { to: "/alternative-provision", label: "Alternative Provision", icon: Building2 },
                { to: "/post-16-and-transition", label: "Post-16 and Transition", icon: GraduationCap },
                { to: "/have-your-say", label: "Have your say", icon: Megaphone },
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
              {user && (
                <li>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="group flex items-center gap-2.5 text-sm text-navy-muted hover:text-white transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
                    Sign out
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Resources column */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/questions-and-answers", label: "Ask Rich", icon: MessageCircleQuestion },
                { to: "/community-questions", label: "Lived Experience", icon: MessageSquare },
                { to: "/understanding-your-child", label: "Understanding your child", icon: Brain },
                { to: "/understanding-your-child/autism", label: "Understanding Autism", icon: Brain },
                { to: "/understanding-your-child/adhd", label: "Understanding ADHD", icon: Brain },
                { to: "/for-parents", label: "Support for parents", icon: Heart },
                { to: "/local-variation", label: "Why where you live matters", icon: MapPin },
                { to: "/devolved-nations", label: "Wales, Scotland and NI", icon: Globe },
                { to: "/sources", label: "Sources", icon: FileText },
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
                { to: "/how-to-use", label: "How to use this site" },
                { to: "/why-i-built-this", label: "Why I built this" },
                { to: "/rich-ferriman", label: "Rich Ferriman" },
                { to: "/richs-take", label: "Rich's Take" },
                { to: "/neurodiversity-global", label: "Neurodiversity Global" },
                { to: "/sendiass", label: "Free help - SENDIASS" },
                { to: "/what-we-owe-our-children", label: "Reality Bites series" },
                { to: "/feedback", label: "Give feedback" },
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/admin", label: "Admin" },
                { to: "/landing", label: "Landing page" },
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

      {/* Neurodiversity Global branding */}
      <div className="border-t border-white/10">
        <div className="content-wide py-6 flex flex-col items-center gap-3 text-center">
          <img src={ngEducationLogo} alt="Neurodiversity Global Education" className="h-44" />
          <p className="text-sm text-navy-muted">
            This is a resource from Neurodiversity Global.{" "}
            <a
              href="https://www.neurodiversityglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline underline-offset-2 transition-colors"
            >
              For more information click here
            </a>
            .
          </p>
        </div>
      </div>

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
            © {new Date().getFullYear()} Beacon SEND Navigator
          </p>
        </div>
      </div>
    </footer>
  );
}
