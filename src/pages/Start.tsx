import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { QandAComponent } from "@/components/qanda";
import { NewsHeadlines } from "@/components/NewsHeadlines";

import { SendiassSignpost } from "@/components/SendiassSignpost";
import { WordFromRich } from "@/components/WordFromRich";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

/* Section accent color config — maps to the 5 quick-link colors */
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

      {/* Quick links bar — the 5 definitive colours */}
      <section className="content-section pt-4 pb-1">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Link to="/state-of-send-2026">
            <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap bg-[hsl(var(--accent-teal))] text-white hover:opacity-90">
              <BookOpen className="w-3.5 h-3.5" />
              SEND Reform Report
            </Button>
          </Link>
          <Link to="/ehcps">
            <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap bg-[hsl(var(--accent-deep-blue))] text-white hover:opacity-90">
              <Shield className="w-3.5 h-3.5" />
              EHCP Guide
            </Button>
          </Link>
          <Link to="/my-child-profile">
            <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap bg-[hsl(var(--accent-amber))] text-white hover:opacity-90">
              <ClipboardList className="w-3.5 h-3.5" />
              My Child: A Profile
            </Button>
          </Link>
          <Link to="/what-to-do-right-now">
            <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap bg-[hsl(var(--accent-coral))] text-white hover:opacity-90">
              <Scale className="w-3.5 h-3.5" />
              What to do now
            </Button>
          </Link>
          <Link to="/questions-and-answers">
            <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap bg-[hsl(var(--accent-violet))] text-white hover:opacity-90">
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              Ask Rich
            </Button>
          </Link>
        </div>
      </section>

      {/* GUIDE ME — hero, top of page */}
      <section className="content-section py-4">
        <GuideMe />
      </section>

      {/* Browse everything toggle */}
      <section className="content-section py-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
        >
          <span>{showAll ? "Hide full site map" : "Or browse everything"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
      </section>

      {/* Breaking News — TEAL accent (reform news) */}
      <section className="content-section py-3">
        <div className={`border-l-4 ${SECTION_COLORS.teal.border} rounded-r-xl`}>
          <NewsHeadlines />
        </div>
      </section>

      {/* Full content sections — hidden by default */}
      {showAll && (
        <div className="content-section py-4 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <ContentSection
            title="The State of SEND 2026"
            description="Our 8-part report tracking every aspect of SEND reform"
            links={reportSections}
            color="teal"
          />
          <ContentSection
            title="Parent Guides"
            description="Practical guides for navigating the SEND system right now"
            links={parentGuides}
            color="deepBlue"
          />
          <ContentSection
            title="Understanding the System"
            description="How the system works, and why it works differently depending on where you are"
            links={systemPages}
            color="amber"
          />
          <ContentSection
            title="Take Action and Community"
            description="Make your voice heard, ask questions, and connect with other families"
            links={takeAction}
            color="coral"
          />
          <ContentSection
            title="About and Resources"
            description="How we work, our sources, and how to give feedback"
            links={aboutLinks}
            color="violet"
          />
        </div>
      )}

      {/* Word from Rich — VIOLET accent (Ask Rich family) */}
      <WordFromRich>
        <p>Your child is not broken. I need you to hear that before anything else on this site. They may see the world differently, process it differently, move through it differently. That is not a fault. It is not something to fix. The system around them may be struggling. The waiting lists may be shameful. But your child? They are exactly who they are supposed to be. This site exists to help you get them what they need from a world that was not designed with them in mind.</p>
        <p className="mt-2">
          <Link to="/richs-take" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">
            Read my take on the white paper
          </Link>
        </p>
      </WordFromRich>

      {/* SENDIASS signpost — DEEP BLUE accent (rights/guidance) */}
      <section className="content-section py-4">
        <SendiassSignpost />
      </section>

      {/* Q&A — VIOLET accent (Ask Rich) */}
      <section className="content-section py-8">
        <QandAComponent />
      </section>

      {/* About this resource — CORAL accent (action/practical) */}
      <section className="content-section py-8">
        <div className={`border-l-4 ${SECTION_COLORS.coral.border} rounded-xl ${SECTION_COLORS.coral.bg} border border-[hsl(var(--accent-coral)/0.2)] p-5 shadow-lg`}>
          <div className="flex items-start gap-4">
            <Heart className={`w-6 h-6 ${SECTION_COLORS.coral.iconSolid} flex-shrink-0 mt-1`} />
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-3">
                Made for families like yours
              </h2>
              <div className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                <p>
                  This is an independent resource, not government, not a campaign. We don't give advice
                  or tell you what to do. We just help you understand what's happening.
                </p>
              </div>
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:underline"
              >
                Learn more about this resource
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
