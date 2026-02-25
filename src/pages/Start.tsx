import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { QandAComponent } from "@/components/qanda";
import { NewsHeadlines } from "@/components/NewsHeadlines";
import { GuideMe } from "@/components/GuideMe";
import {
  ArrowRight,
  BookOpen,
  Shield,
  Scale,
  MessageCircleQuestion,
  ClipboardList,
  ChevronDown,
  FileText,
  Heart,
  Megaphone,
  Brain,
  GraduationCap,
  AlertTriangle,
  Building2,
  MapPin,
  Globe,
  MessageSquare,
  HelpCircle,
  HandHeart,
  Users,
  Lightbulb,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import richFamilyPhoto from "@/assets/rich-ferriman-family.jpeg";

/* ── Content link types ── */

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
  { path: "/state-of-send-2026/what-we-do-not-know", title: "What we do not know", summary: "Unanswered questions", icon: HelpCircle },
  { path: "/state-of-send-2026/what-the-leaks-are-saying", title: "What the leaks say", summary: "Leaked documents analysed", icon: AlertTriangle },
  { path: "/state-of-send-2026/what-the-leaks-do-not-mean", title: "What the leaks do not mean", summary: "Avoiding misinterpretation", icon: Scale },
  { path: "/state-of-send-2026/timeline", title: "Timeline and next steps", summary: "Key dates and milestones", icon: ClipboardList },
];

const parentGuides: ContentLink[] = [
  { path: "/ehcps", title: "The EHCP Guide", summary: "Rights, process, and what to do when things go wrong", icon: Shield },
  { path: "/ehcp-health", title: "Health in EHCPs", summary: "NHS responsibilities and therapy provision", icon: Stethoscope },
  { path: "/understanding-your-child", title: "Understanding your child", summary: "Neurodivergence explained for families", icon: Brain },
  { path: "/understanding-your-child/autism", title: "Understanding Autism", summary: "What autism means in the SEND system", icon: Brain },
  { path: "/understanding-your-child/adhd", title: "Understanding ADHD", summary: "ADHD rights and school support", icon: Lightbulb },
  { path: "/exclusions", title: "Exclusions and rights", summary: "School exclusions and SEND protections", icon: AlertTriangle },
  { path: "/alternative-provision", title: "Alternative Provision", summary: "When mainstream does not work", icon: Building2 },
  { path: "/post-16-and-transition", title: "Post-16 and Transition", summary: "Moving into adulthood", icon: GraduationCap },
  { path: "/what-to-do-right-now", title: "What to do right now", summary: "Practical steps based on current law", icon: Scale },
  { path: "/sendiass", title: "Free help: SENDIASS", summary: "Free independent advice near you", icon: HandHeart },
  { path: "/my-child-profile", title: "My Child: A Profile", summary: "Build a document about your child to share with professionals", icon: ClipboardList },
];

const systemPages: ContentLink[] = [
  { path: "/local-variation", title: "Why where you live matters", summary: "Local authority variation in SEND", icon: MapPin },
  { path: "/devolved-nations", title: "Wales, Scotland and NI", summary: "If you are not in England", icon: Globe },
];

const takeAction: ContentLink[] = [
  { path: "/have-your-say", title: "Have your say on reform", summary: "Respond to the consultation and contact your MP", icon: Megaphone },
  { path: "/questions-and-answers", title: "Ask Rich", summary: "Ask a question and get a plain-English answer", icon: MessageCircleQuestion },
  { path: "/community-questions", title: "Lived experience", summary: "Real stories from families navigating SEND", icon: MessageSquare },
  { path: "/for-parents", title: "You are carrying a lot", summary: "Support and wellbeing for parents and carers", icon: Heart },
  { path: "/what-we-owe-our-children", title: "Reality Bites", summary: "What the system really looks like", icon: Users },
];

const aboutLinks: ContentLink[] = [
  { path: "/about", title: "About this resource", summary: "What this site is and is not", icon: HelpCircle },
  { path: "/sources", title: "Sources and evidence", summary: "Every claim traced to its source", icon: FileText },
  { path: "/how-to-use", title: "How to use this site", summary: "Getting the most from the Navigator", icon: BookOpen },
  { path: "/feedback", title: "Feedback", summary: "Tell us what is working and what is not", icon: MessageSquare },
];

/* Section accent colours */
const SECTION_COLORS = {
  teal: { icon: "bg-[hsl(var(--accent-teal)/0.12)] text-[hsl(var(--accent-teal))]" },
  deepBlue: { icon: "bg-[hsl(var(--accent-deep-blue)/0.12)] text-[hsl(var(--accent-deep-blue))]" },
  amber: { icon: "bg-[hsl(var(--accent-amber)/0.12)] text-[hsl(var(--accent-amber))]" },
  coral: { icon: "bg-[hsl(var(--accent-coral)/0.12)] text-[hsl(var(--accent-coral))]" },
  violet: { icon: "bg-[hsl(var(--accent-violet)/0.12)] text-[hsl(var(--accent-violet))]" },
} as const;

function ContentSection({ title, description, links, color }: { title: string; description: string; links: ContentLink[]; color: keyof typeof SECTION_COLORS }) {
  const c = SECTION_COLORS[color];
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
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

      {/* ═══════════════════════════════════════════
          ACT 1: ORIENTATION
          One sentence. Grounding. Nothing else.
          ═══════════════════════════════════════════ */}
      <section className="content-section pt-10 pb-6">
        <p className="text-xl sm:text-2xl font-semibold text-foreground leading-snug max-w-xl">
          Everything you need to understand SEND reform in England, in one place.
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          ACT 2: CHOICE REDUCTION
          One primary path. One secondary. All else deferred.
          ═══════════════════════════════════════════ */}
      <section className="content-section pb-6 space-y-4">
        {/* Primary path: Guide Me */}
        <GuideMe />

        {/* Secondary path: direct links */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Or go straight to:</span>
          <Link to="/state-of-send-2026">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              SEND Reform Report
            </Button>
          </Link>
          <Link to="/ehcps">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Shield className="w-3.5 h-3.5" />
              EHCP Guide
            </Button>
          </Link>
          <Link to="/what-to-do-right-now">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Scale className="w-3.5 h-3.5" />
              What to do now
            </Button>
          </Link>
        </div>

        {/* Browse everything toggle */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>{showAll ? "Hide full site map" : "Browse everything"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>

        {/* Full content sections, hidden by default */}
        {showAll && (
          <div className="pt-4 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <ContentSection title="The State of SEND 2026" description="Our 8-part report tracking every aspect of SEND reform" links={reportSections} color="teal" />
            <ContentSection title="Parent Guides" description="Practical guides for navigating the SEND system right now" links={parentGuides} color="deepBlue" />
            <ContentSection title="Understanding the System" description="How the system works, and why it works differently depending on where you are" links={systemPages} color="amber" />
            <ContentSection title="Take Action and Community" description="Make your voice heard, ask questions, and connect with other families" links={takeAction} color="coral" />
            <ContentSection title="About and Resources" description="How we work, our sources, and how to give feedback" links={aboutLinks} color="violet" />
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          ACT 3: DEPTH AND CREDIBILITY
          Signal seriousness. Use contrast and spacing.
          ═══════════════════════════════════════════ */}
      <section className="bg-[hsl(var(--navy))] text-[hsl(var(--navy-foreground))]">
        <div className="content-section py-12 sm:py-16">
          <div className="max-w-2xl space-y-6">
            <p className="text-lg sm:text-xl font-semibold leading-snug" style={{ color: "hsl(0 0% 96%)" }}>
              Independent. Fact-based. Updated as things change.
            </p>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "hsl(222 20% 72%)" }}>
              <p>
                This site tracks every confirmed detail of SEND reform, separates it from speculation, and explains what it means in plain language. It is not government. It is not a campaign. It does not give legal advice.
              </p>
              <p>
                Every claim is sourced. Every page tells you what is confirmed, what is being discussed, and what we do not yet know.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: "hsl(222 20% 58%)" }}>
              <span>90+ knowledge base entries</span>
              <span>8-part reform report</span>
              <span>Updated 23 February 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* News headlines */}
      <section className="content-section py-6">
        <NewsHeadlines />
      </section>

      {/* ═══════════════════════════════════════════
          ACT 4: HUMAN PRESENCE
          Ask Rich as a person. Space and calm.
          ═══════════════════════════════════════════ */}
      <section className="bg-[hsl(var(--accent-violet-bg))]">
        <div className="content-section py-12 sm:py-16 space-y-10">
          {/* Rich as a person */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-3xl">
            <img
              src={richFamilyPhoto}
              alt="Rich Ferriman with his children"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover flex-shrink-0"
            />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                Ask Rich
              </h2>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Your child is not broken. The system around them may be struggling, but your child is exactly who they are supposed to be. This site exists to help you get them what they need.
              </p>
              <p className="text-xs text-muted-foreground">
                Rich Ferriman, parent and neuroinclusion consultant
              </p>
            </div>
          </div>

          {/* Ask Rich, full width */}
          <QandAComponent />
        </div>
      </section>

    </Layout>
  );
};

export default Index;
