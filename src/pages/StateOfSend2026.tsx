import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ArrowRight, CheckCircle2, HelpCircle, BookOpen, AlertTriangle, Clock } from "lucide-react";

const reportSections = [
  {
    path: "/state-of-send-2026/where-we-are-now",
    title: "What we know so far",
    summary: "The current state of the SEND system, existing legal protections, and how the system is performing right now.",
    color: "confirmed",
    number: 1,
  },
  {
    path: "/state-of-send-2026/what-is-changing",
    title: "What is changing",
    summary: "Confirmed reforms, the 10 year schools plan, operational direction to councils, and the three tier model being embedded.",
    color: "confirmed",
    number: 2,
  },
  {
    path: "/state-of-send-2026/what-has-not-changed",
    title: "What has not changed",
    summary: "Your legal rights under the Children and Families Act 2014, EHCP protections, and tribunal appeal routes that remain in force.",
    color: "confirmed",
    number: 3,
  },
  {
    path: "/state-of-send-2026/what-is-being-discussed",
    title: "What is being discussed",
    summary: "Proposals under consideration including tiered support models, mainstream inclusion expansion, and funding mechanism changes.",
    color: "discussed",
    number: 4,
  },
  {
    path: "/state-of-send-2026/what-we-do-not-know",
    title: "What we do not know yet",
    summary: "Unanswered questions about the White Paper content, assessment thresholds, appeal rights, and implementation timelines.",
    color: "discussed",
    number: 5,
  },
  {
    path: "/state-of-send-2026/what-the-leaks-are-saying",
    title: "What the leaks are saying",
    summary: "BBC and media reports on potential EHCP redesign, the three tier ladder, and ministerial concern about political backlash.",
    color: "unconfirmed",
    number: 6,
  },
  {
    path: "/state-of-send-2026/what-the-leaks-do-not-mean",
    title: "What the leaks do not mean",
    summary: "Common misinterpretations of leaked proposals addressed. What the reports actually say versus what people fear.",
    color: "unconfirmed",
    number: 7,
  },
  {
    path: "/state-of-send-2026/timeline",
    title: "Timeline and next steps",
    summary: "Key dates, decision points and milestones from the national conversation to the expected White Paper and beyond.",
    color: "next",
    number: 8,
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; icon: React.ElementType }> = {
  confirmed: {
    bg: "bg-status-confirmed/15",
    border: "border-status-confirmed/30",
    text: "text-status-confirmed",
    icon: CheckCircle2,
  },
  discussed: {
    bg: "bg-status-discussed/15",
    border: "border-status-discussed/30",
    text: "text-status-discussed",
    icon: HelpCircle,
  },
  unconfirmed: {
    bg: "bg-status-unconfirmed/15",
    border: "border-status-unconfirmed/30",
    text: "text-status-unconfirmed",
    icon: AlertTriangle,
  },
  next: {
    bg: "bg-[hsl(var(--timeline-upcoming)/0.15)]",
    border: "border-[hsl(var(--timeline-upcoming)/0.3)]",
    text: "text-[hsl(var(--timeline-upcoming))]",
    icon: Clock,
  },
};

export default function StateOfSend2026() {
  return (
    <Layout>
      <SEOHead
        title="The State of SEND 2026 - Report"
        description="An 8-part report tracking SEND reform in England. From confirmed changes to unanswered questions. Everything families need to know."
        path="/state-of-send-2026"
        article
        datePublished="2025-09-01"
        dateModified="2026-02-23"
        keywords="SEND reform 2026, state of SEND, Schools White Paper 2026, Individual Support Plans, ISP SEND, SEND England, EHCP changes, SEND funding reform, mainstream inclusion, SEND review, special educational needs reform"
      />

      <header className="content-section py-6 sm:py-8 border-b border-border" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, hsl(175 65% 41% / 0.06), transparent 70%)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(175 65% 41% / 0.12)" }}>
            <BookOpen className="w-4 h-4" style={{ color: "hsl(175 65% 41%)" }} />
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-foreground/5 border border-foreground/10 px-3 py-1">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-foreground/70">8-Part Report</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          The State of SEND 2026
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          A structured, evidence-based report tracking SEND reform in England. Eight sections move from <strong>what is confirmed</strong> through <strong>what is being discussed</strong> to <strong>what remains unknown</strong>. Read in order, or jump to what matters most to you.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span>Last updated: 26th February 2026</span>
        </div>
      </header>

      {/* Confidence key */}
      <section className="content-section py-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "Confirmed", color: "confirmed", desc: "Official and verified" },
            { label: "Discussed", color: "discussed", desc: "Under consideration" },
            { label: "Unconfirmed", color: "unconfirmed", desc: "Reported, not verified" },
            { label: "Next steps", color: "next", desc: "Upcoming milestones" },
          ].map((item) => {
            const colors = colorMap[item.color];
            const Icon = colors.icon;
            return (
              <div key={item.color} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                <Icon className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                <div>
                  <p className={`text-xs font-semibold ${colors.text}`}>{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Report sections */}
      <section className="content-section py-3 pb-8">
        <div className="space-y-3">
          {reportSections.map((section) => {
            const colors = colorMap[section.color];
            return (
              <Link
                key={section.path}
                to={section.path}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 border ${colors.border}`}>
                  <span className={`text-xs font-bold ${colors.text}`}>{section.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">{section.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{section.summary}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
