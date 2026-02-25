import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { QandAComponent } from "@/components/qanda";
import { AnimatedFeatureShowcase } from "@/components/landing/AnimatedFeatureShowcase";
import { GuideMe } from "@/components/GuideMe";
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
import creatorsDuo from "@/assets/creators-duo.png";

interface ContentLink {
  path: string;
  title: string;
  summary: string;
  icon: React.ElementType;
}

const reportSections: ContentLink[] = [
  { path: "/state-of-send-2026", title: "Report Overview", summary: "The full 8-part report hub", icon: BookOpen },
  { path: "/state-of-send-2026/where-we-are-now", title: "Where we are now", summary: "The current state of SEND", icon: MapPin },
  { path: "/state-of-send-2026/what-is-changing", title: "What is changing", summary: "Confirmed reforms", icon: FileText },
  { path: "/state-of-send-2026/what-has-not-changed", title: "What has not changed", summary: "Your existing rights", icon: Shield },
  { path: "/state-of-send-2026/what-is-being-discussed", title: "What is being discussed", summary: "Proposals and consultations", icon: Megaphone },
  { path: "/state-of-send-2026/what-we-do-not-know", title: "What we don't know", summary: "Unanswered questions", icon: HelpCircle },
  { path: "/state-of-send-2026/what-the-leaks-are-saying", title: "What the leaks say", summary: "Leaked documents analysed", icon: AlertTriangle },
  { path: "/state-of-send-2026/what-the-leaks-do-not-mean", title: "What the leaks don't mean", summary: "Avoiding misinterpretation", icon: Scale },
  { path: "/state-of-send-2026/timeline", title: "Timeline & next steps", summary: "Key dates and milestones", icon: ClipboardList },
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
  { path: "/my-child-profile", title: "My Child: A Profile", summary: "Build a document about your child to share with professionals", icon: ClipboardList },
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
            className="flex items-start gap-3 p-3.5 bg-card border border-border rounded-lg hover:shadow-md transition-all group"
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
        title="SEND Reform Navigator"
        description="A calm, independent guide helping parents and professionals understand SEND reform in England. Clear facts, no spin."
        path="/"
      />

      {/* ─── SECTION 1: NAVY HERO — Tell us why you're here ─── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "hsl(222 35% 10%)" }}>
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(175 60% 40% / 0.12), transparent 60%)",
          }}
        />
        <div className="content-section relative py-10 sm:py-14">
          {/* Quick links bar - the 5 colour buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <Link to="/state-of-send-2026">
              <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap rounded-full" style={{ backgroundColor: "hsl(175 65% 41%)", color: "white" }}>
                <BookOpen className="w-3.5 h-3.5" />
                SEND Reform Report
              </Button>
            </Link>
            <Link to="/ehcps">
              <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap rounded-full" style={{ backgroundColor: "hsl(220 70% 45%)", color: "white" }}>
                <Shield className="w-3.5 h-3.5" />
                EHCP Guide
              </Button>
            </Link>
            <Link to="/my-child-profile">
              <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap rounded-full" style={{ backgroundColor: "hsl(42 87% 48%)", color: "hsl(30 40% 20%)" }}>
                <ClipboardList className="w-3.5 h-3.5" />
                My Child: A Profile
              </Button>
            </Link>
            <Link to="/what-to-do-right-now">
              <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap rounded-full" style={{ backgroundColor: "hsl(8 75% 55%)", color: "white" }}>
                <Scale className="w-3.5 h-3.5" />
                What to do now
              </Button>
            </Link>
            <Link to="/questions-and-answers">
              <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap rounded-full" style={{ backgroundColor: "hsl(262 60% 55%)", color: "white" }}>
                <MessageCircleQuestion className="w-3.5 h-3.5" />
                Ask Rich
              </Button>
            </Link>
          </div>

          {/* Guide Me */}
          <div className="max-w-2xl mx-auto">
            <GuideMe />
          </div>

          {/* Last updated */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(175 60% 50%)" }} />
            <p className="text-xs" style={{ color: "hsl(222 20% 55%)" }}>
              <strong style={{ color: "hsl(0 0% 80%)" }}>Last updated:</strong> 23rd February 2026
            </p>
          </div>
        </div>

        {/* Bottom gradient transition */}
        <div
          className="h-px"
          style={{ background: "linear-gradient(to right, transparent, hsl(175 60% 40% / 0.25), transparent)" }}
        />
      </section>

      {/* ─── SECTION 2: FEATURE NAVIGATION (6 boxes from landing) ─── */}
      <section className="bg-background">
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

      {/* ─── SECTION 3: ASK RICH (reimagined) ─── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "hsl(222 35% 8%)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, transparent 30%, hsl(262 50% 50% / 0.05) 50%, transparent 70%)" }}
        />
        <div className="content-section relative py-10 sm:py-14">
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
                  className="text-2xl sm:text-3xl font-display font-semibold mb-2"
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
            <QandAComponent />
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Consolidated info (Word from Rich + SENDIASS + About) ─── */}
      <section className="bg-background">
        <div className="content-section py-10 sm:py-14">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Compact strip: Word from Rich */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">A word from Rich</p>
              <p className="text-sm text-foreground leading-relaxed">
                Your child is not broken. They may see the world differently, process it differently, move through it differently. That is not a fault. This site exists to help you get them what they need from a world that was not designed with them in mind.
              </p>
              <Link to="/richs-take" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-3 hover:underline">
                Read my take on the white paper <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Compact strip: SENDIASS */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(220 70% 45% / 0.12)" }}>
                <MapPin className="w-4 h-4" style={{ color: "hsl(220 70% 45%)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-display font-bold text-foreground">Did you know you have a free local advice service?</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Every local authority in England funds a free, impartial service called <strong>SENDIASS</strong> for parents navigating SEND.
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <a
                    href="https://councilfordisabledchildren.org.uk/about-us-0/networks/information-advice-and-support-services-network/find-your-local-ias-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
                    style={{ color: "hsl(220 70% 45%)" }}
                  >
                    Find your local SENDIASS <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link to="/sendiass" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Compact strip: About + Feedback */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(8 75% 55% / 0.12)" }}>
                <Heart className="w-4 h-4" style={{ color: "hsl(8 75% 55%)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-display font-bold text-foreground">Made for families like yours</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  This is an independent resource, not government, not a campaign. We just help you understand what's happening.
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Link to="/about" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    About this resource <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link to="/feedback" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Give feedback <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link to="/community-questions" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Lived experience <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse everything toggle */}
      <section className="bg-background border-t border-border">
        <div className="content-section py-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
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

      {/* ─── SECTION 5: CREATORS — full-width image with navy fade ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <img
            src={creatorsDuo}
            alt="Rich and Charlie Ferriman, creators of Beacon SEND Navigator"
            className="w-full h-full object-cover object-top"
            style={{ opacity: 0.35 }}
          />
          {/* Navy gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to bottom, hsl(222 35% 10% / 0.7), hsl(222 35% 10% / 0.85) 60%, hsl(222 35% 10%) 100%)",
                "linear-gradient(to top, hsl(222 35% 10%), transparent 40%)",
              ].join(", "),
            }}
          />
        </div>

        {/* Content */}
        <div className="relative content-section py-16 sm:py-20 flex flex-col items-center text-center">
          <p
            className="text-lg sm:text-xl font-display font-medium mb-2"
            style={{ color: "hsl(0 0% 90%)" }}
          >
            Built by parents.
          </p>
          <p
            className="text-sm max-w-md leading-relaxed"
            style={{ color: "hsl(222 20% 55%)" }}
          >
            Still working at making this work.
          </p>
          <div
            className="mt-6 h-px w-32"
            style={{ background: "linear-gradient(to right, transparent, hsl(175 60% 40% / 0.4), transparent)" }}
          />
        </div>
      </section>

      {/* Bottom padding for persistent ticker */}
      <div className="h-8" />
    </Layout>
  );
};

export default Index;
