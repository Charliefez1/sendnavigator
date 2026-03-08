import { useState } from "react";
import { Link } from "react-router-dom";
import creatorsDuo from "@/assets/creators-duo.png";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { HomeAskRich } from "@/components/landing/HomeAskRich";
import { AnimatedFeatureShowcase } from "@/components/landing/AnimatedFeatureShowcase";
import { GuideMe } from "@/components/GuideMe";
import { AskQuestionCompact } from "@/components/AskQuestionCompact";

import {
  ArrowRight,
  BookOpen,
  Heart,
  Shield,
  Scale,
  Megaphone,
  FileText,
  Users,
  Brain,
  GraduationCap,
  AlertTriangle,
  Building2,
  MapPin,
  Globe,
  MessageCircleQuestion,
  MessageSquare,
  Lightbulb,
  HandHeart,
  HelpCircle,
  ClipboardList,
  Stethoscope,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import askRichCharacter from "@/assets/ask-rich-character.png";

import beaconLogo from "@/assets/neurodiversity-global-logo-trimmed.png";
import ngEducationLogo from "@/assets/neurodiversity-global-education-logo-full.png";

interface ContentLink {
  path: string;
  title: string;
  summary: string;
  icon: React.ElementType;
}

const reportSections: ContentLink[] = [
  { path: "/state-of-send-2026", title: "Report Overview", summary: "The full 8-part report hub", icon: BookOpen },
  { path: "/state-of-send-2026/where-we-are-now", title: "What we know right now", summary: "The factual baseline", icon: MapPin },
  { path: "/state-of-send-2026/what-is-changing", title: "What is now in motion", summary: "Confirmed reforms", icon: FileText },
  { path: "/state-of-send-2026/what-has-not-changed", title: "What remains protected", summary: "Your existing rights", icon: Shield },
  { path: "/state-of-send-2026/what-is-being-discussed", title: "What is actively being shaped", summary: "Consultation and debate", icon: Megaphone },
  { path: "/state-of-send-2026/what-we-do-not-know", title: "What is genuinely unknown", summary: "Unanswered questions", icon: HelpCircle },
  { path: "/state-of-send-2026/what-the-leaks-are-saying", title: "What has been reported", summary: "Media coverage analysed", icon: AlertTriangle },
  { path: "/state-of-send-2026/what-the-leaks-do-not-mean", title: "What is often misunderstood", summary: "Avoiding misinterpretation", icon: Scale },
  { path: "/state-of-send-2026/timeline", title: "What happens next", summary: "Key dates and milestones", icon: ClipboardList },
];

const parentGuides: ContentLink[] = [
  { path: "/ehcps", title: "The EHCP Guide", summary: "Rights, process, and what to do when things go wrong", icon: Shield },
  { path: "/ehcp-health", title: "Health in EHCPs", summary: "NHS responsibilities and therapy provision", icon: Stethoscope },
  { path: "/understanding-your-child", title: "Understanding your child", summary: "Neurodivergence explained for families", icon: Brain },
  { path: "/understanding-your-child/autism", title: "Understanding Autism", summary: "What autism means in the SEND system", icon: Brain },
  { path: "/understanding-your-child/adhd", title: "Understanding ADHD", summary: "ADHD rights and school support", icon: Lightbulb },
  { path: "/exclusions", title: "Exclusions & rights", summary: "School exclusions and SEND protections", icon: AlertTriangle },
  { path: "/alternative-provision", title: "Alternative Provision", summary: "When mainstream doesn't work", icon: Building2 },
  { path: "/post-16-and-transition", title: "Post-16 & Transition", summary: "Moving into adulthood", icon: GraduationCap },
  { path: "/what-to-do-right-now", title: "What to do right now", summary: "Practical steps based on current law", icon: Scale },
  { path: "/sendiass", title: "Free help - SENDIASS", summary: "Free independent advice near you", icon: HandHeart },
  { path: "/my-child-profile", title: "This is me", summary: "Build a document about your child to share with professionals", icon: ClipboardList },
];

const systemPages: ContentLink[] = [
  { path: "/local-variation", title: "Why where you live matters", summary: "Local authority variation in SEND", icon: MapPin },
  { path: "/devolved-nations", title: "Wales, Scotland & NI", summary: "If you're not in England", icon: Globe },
];

const takeAction: ContentLink[] = [
  { path: "/have-your-say", title: "Have your say on reform", summary: "Respond to the consultation and contact your MP", icon: Megaphone },
  { path: "/questions-and-answers", title: "Ask Rich", summary: "Ask a question and get a plain-English answer", icon: MessageCircleQuestion },
  { path: "/community-questions", title: "Lived experience", summary: "Real stories from families navigating SEND", icon: MessageSquare },
  { path: "/for-parents", title: "You are carrying a lot", summary: "Support and wellbeing for parents and carers", icon: Heart },
  { path: "/what-we-owe-our-children", title: "Reality Bites", summary: "What the system really looks like", icon: Users },
];

const aboutLinks: ContentLink[] = [
  { path: "/about", title: "About this resource", summary: "What this site is and isn't", icon: HelpCircle },
  { path: "/sources", title: "Sources & evidence", summary: "Every claim traced to its source", icon: FileText },
  { path: "/how-to-use", title: "How to use this site", summary: "Getting the most from the Navigator", icon: BookOpen },
  { path: "/feedback", title: "Feedback", summary: "Tell us what's working and what isn't", icon: MessageSquare },
];

const SECTION_COLORS = {
  teal: {
    border: "border-l-[hsl(var(--accent-teal))]",
    bg: "bg-[hsl(var(--accent-teal-bg))]",
    icon: "bg-[hsl(var(--accent-teal)/0.12)] text-[hsl(var(--accent-teal))]",
    iconSolid: "text-[hsl(var(--accent-teal))]",
  },
  deepBlue: {
    border: "border-l-[hsl(var(--accent-deep-blue))]",
    bg: "bg-[hsl(var(--accent-deep-blue-bg))]",
    icon: "bg-[hsl(var(--accent-deep-blue)/0.12)] text-[hsl(var(--accent-deep-blue))]",
    iconSolid: "text-[hsl(var(--accent-deep-blue))]",
  },
  amber: {
    border: "border-l-[hsl(var(--accent-amber))]",
    bg: "bg-[hsl(var(--accent-amber-bg))]",
    icon: "bg-[hsl(var(--accent-amber)/0.12)] text-[hsl(var(--accent-amber))]",
    iconSolid: "text-[hsl(var(--accent-amber))]",
  },
  coral: {
    border: "border-l-[hsl(var(--accent-coral))]",
    bg: "bg-[hsl(var(--accent-coral-bg))]",
    icon: "bg-[hsl(var(--accent-coral)/0.12)] text-[hsl(var(--accent-coral))]",
    iconSolid: "text-[hsl(var(--accent-coral))]",
  },
  violet: {
    border: "border-l-[hsl(var(--accent-violet))]",
    bg: "bg-[hsl(var(--accent-violet-bg))]",
    icon: "bg-[hsl(var(--accent-violet)/0.12)] text-[hsl(var(--accent-violet))]",
    iconSolid: "text-[hsl(var(--accent-violet))]",
  },
} as const;

function ContentSection({ title, description, links, color }: { title: string; description: string; links: ContentLink[]; color: keyof typeof SECTION_COLORS }) {
  const c = SECTION_COLORS[color];
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-display font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-start gap-3 p-3.5 bg-card border border-border rounded-lg shadow-card hover:shadow-card-hover transition-all group"
          >
            <div className={`w-8 h-8 rounded-md ${c.icon} flex items-center justify-center flex-shrink-0`}>
              <link.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors leading-tight">{link.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{link.summary}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}

const Index = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Layout>
      <SEOHead
        title="SEND Navigator | Free SEND Reform Guide for Parents 2026"
        description="A calm, independent guide helping parents and professionals understand SEND reform in England. EHCPs, the Schools White Paper, and your rights, explained clearly."
        path="/"
        dateModified="2026-02-23"
        keywords="SEND Navigator, SEND reform guide, EHCP guide parents, Schools White Paper 2026, SEND parents England, special educational needs help, neurodiversity, SEND rights, Individual Support Plans, SENDIASS"
      />

      {/* ─── SECTION 1: HERO — Tell us why you're here ─── */}
      <section className="relative overflow-hidden bg-background">
        <div className="content-wide relative py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left column: Guide Me */}
            <div className="w-full order-2 lg:order-1">
              <GuideMe />

              {/* Last updated */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-6">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Last updated:</strong> 1st March 2026
                </p>
              </div>
            </div>

            {/* Right column: Image with bottom fade */}
            <div className="relative order-1 lg:order-2 overflow-hidden">
              <div className="relative w-full flex justify-center">
                <img
                  src={creatorsDuo}
                  alt="Charlie and Rich, the team behind SEND Navigator"
                  className="w-full h-auto"
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
              </div>
              <div className="mt-4 space-y-2 text-center lg:text-left px-2">
                <p className="text-xs leading-relaxed text-foreground">
                  <strong>Charlie Ferriman</strong> and <strong>Richard Ferriman</strong> are the co founders of Neurodiversity Global. A father and son team ensuring neuroinclusion across work, education, the public sector and sport is strategic, not sentimental. We help organisations move beyond intent to build workplaces where neurodivergent people thrive. We advise and are trusted by organisations including the NHS, ACAS, Fareshare, NASA, TransPennine Express and Kyndryl. <a href="/neurodiversity-global" className="text-primary hover:underline font-medium">Find out more here.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FEATURE NAVIGATION (6 boxes from landing) ─── */}
      <section className="bg-muted/60">
        <div className="content-wide py-10 sm:py-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(175 65% 41%)" }} />
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              What's inside
            </p>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-8 text-center">
            Everything you need in one place
          </h2>
          <div className="max-w-4xl mx-auto">
            <AnimatedFeatureShowcase />
          </div>
        </div>
      </section>


      {/* ─── SECTIONS 3-5: Shared dark backdrop ─── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "hsl(222 35% 8%)" }}>

        {/* ─── SECTION 3: ASK RICH ─── */}
        <section className="relative">
          <div className="content-section py-10 sm:py-14">
            <div className="max-w-2xl mx-auto">
              {/* Character + intro */}
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

              {/* Q&A component */}
              <HomeAskRich />
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Info cards ─── */}
        <section className="relative">
          <div className="content-section py-10 sm:py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {/* Card 1: Word from Rich */}
              <div className="rounded-xl border border-[hsl(222_20%_20%)] p-6 flex flex-col shadow-elevated transition-shadow duration-200" style={{ backgroundColor: "hsl(222 35% 12% / 0.85)", backdropFilter: "blur(8px)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(175 60% 50%)" }}>A word from Rich</p>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(222 20% 75%)" }}>
                  Your child is not broken. They may see the world differently, process it differently, move through it differently. That is not a fault. This site exists to help you get them what they need from a world that was not designed with them in mind.
                </p>
                <div className="mt-4 pt-3" style={{ borderTop: "1px solid hsl(222 20% 20%)" }}>
                  <Link to="/richs-take" className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline" style={{ color: "hsl(175 60% 55%)" }}>
                    Read my take on the white paper <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 2: SENDIASS */}
              <div className="rounded-xl border border-[hsl(222_20%_20%)] p-6 flex flex-col shadow-elevated transition-shadow duration-200" style={{ backgroundColor: "hsl(222 35% 12% / 0.85)", backdropFilter: "blur(8px)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "hsl(220 70% 45% / 0.15)" }}>
                  <MapPin className="w-4.5 h-4.5" style={{ color: "hsl(220 70% 55%)" }} />
                </div>
                <h3 className="text-sm font-display font-bold mb-2" style={{ color: "hsl(0 0% 92%)" }}>Did you know you have a free local advice service?</h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "hsl(222 20% 60%)" }}>
                  Every local authority in England funds a free, impartial service called <strong style={{ color: "hsl(0 0% 85%)" }}>SENDIASS</strong> for parents navigating SEND.
                </p>
                <div className="mt-4 pt-3 space-y-2" style={{ borderTop: "1px solid hsl(222 20% 20%)" }}>
                  <a
                    href="https://councilfordisabledchildren.org.uk/about-us-0/networks/information-advice-and-support-services-network/find-your-local-ias-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: "hsl(220 70% 60%)" }}
                  >
                    Find your local SENDIASS <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link to="/sendiass" className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:brightness-125" style={{ color: "hsl(222 20% 50%)" }}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Made for families */}
              <div className="rounded-xl border border-[hsl(222_20%_20%)] p-6 flex flex-col shadow-elevated transition-shadow duration-200" style={{ backgroundColor: "hsl(222 35% 12% / 0.85)", backdropFilter: "blur(8px)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "hsl(8 75% 55% / 0.12)" }}>
                  <Heart className="w-4.5 h-4.5" style={{ color: "hsl(8 75% 60%)" }} />
                </div>
                <h3 className="text-sm font-display font-bold mb-2" style={{ color: "hsl(0 0% 92%)" }}>Made for families like yours</h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "hsl(222 20% 60%)" }}>
                  This is an independent resource, not government, not a campaign. We just help you understand what's happening.
                </p>
                <div className="mt-4 pt-3 space-y-2" style={{ borderTop: "1px solid hsl(222 20% 20%)" }}>
                  <Link to="/about" className="flex items-center gap-1.5 text-sm font-medium hover:underline" style={{ color: "hsl(175 60% 55%)" }}>
                    About this resource <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/feedback" className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:brightness-125" style={{ color: "hsl(222 20% 50%)" }}>
                    Give feedback <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/community-questions" className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:brightness-125" style={{ color: "hsl(222 20% 50%)" }}>
                    Lived experience <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Browse everything toggle */}
        <section className="relative">
          <div className="content-section py-4" style={{ borderTop: "1px solid hsl(222 20% 18%)" }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-sm transition-colors mx-auto"
              style={{ color: "hsl(222 20% 55%)" }}
            >
              <span>{showAll ? "Hide full site map" : "Browse everything"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showAll && (
            <div className="content-section pb-8 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <ContentSection title="The State of SEND 2026" description="Our 8-part report tracking every aspect of SEND reform" links={reportSections} color="teal" />
              <ContentSection title="Parent Guides" description="Practical guides for navigating the SEND system right now" links={parentGuides} color="deepBlue" />
              <ContentSection title="Understanding the System" description="How the system works, and why it works differently depending on where you are" links={systemPages} color="amber" />
              <ContentSection title="Take Action and Community" description="Make your voice heard, ask questions, and connect with other families" links={takeAction} color="coral" />
              <ContentSection title="About and Resources" description="How we work, our sources, and how to give feedback" links={aboutLinks} color="violet" />
            </div>
          )}
        </section>

      </div>


    </Layout>
  );
};

export default Index;
