import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ArrowRight, CheckCircle2, HelpCircle, BookOpen, AlertTriangle, Clock, FileText, Download } from "lucide-react";
import docThumbGovInfo from "@/assets/doc-thumb-gov-info.jpg";
import docThumbParentLeaflet from "@/assets/doc-thumb-parent-leaflet.jpg";
import docThumbImpactAssessment from "@/assets/doc-thumb-impact-assessment.jpg";
import docThumbResearch from "@/assets/doc-thumb-research.jpg";
import docThumbWhitePaper from "@/assets/doc-thumb-white-paper.jpg";

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

const officialDocuments = [
  {
    category: "White Paper Overview",
    thumb: docThumbWhitePaper,
    docs: [
      { name: "SEND Reform White Paper – Accessible Overview", url: "/documents/white-paper-overview-accessible.pdf", desc: "Full accessible overview including glossary, ISPs, EHCPs, and layers of support" },
    ],
  },
  {
    category: "Information Sheets for Parents",
    thumb: docThumbParentLeaflet,
    docs: [
      { name: "Parents of Children with EHCPs", url: "/documents/info-sheet-parents-ehcps.pdf", desc: "EHCPs retained, Specialist Provision Packages, ISPs, transition 2029–2030" },
      { name: "Parents of SEND CYP in Mainstream", url: "/documents/info-sheet-parents-mainstream.pdf", desc: "Inclusive mainstream offer, ISPs, how support changes" },
      { name: "Parents of Children in Special Schools", url: "/documents/info-sheet-parents-special-schools.pdf", desc: "What reforms mean for specialist settings" },
    ],
  },
  {
    category: "Parent Leaflets",
    thumb: docThumbParentLeaflet,
    docs: [
      { name: "What Every Parent Can Expect", url: "/documents/parent-leaflet-what-every-parent-can-expect.pdf", desc: "Curriculum reforms, enrichment, mental health teams, calm safe schools" },
      { name: "Your Child's Journey Through Education", url: "/documents/parent-leaflet-childs-journey-through-education.pdf", desc: "Reforms at every stage: early years, primary, secondary, post-16" },
      { name: "What Parents of CYP with SEND Need to Know", url: "/documents/parent-leaflet-what-parents-need-to-know.pdf", desc: "Five reform principles, ISPs, retained EHCPs, 12-week consultation" },
    ],
  },
  {
    category: "Information Sheets for Settings",
    thumb: docThumbGovInfo,
    docs: [
      { name: "Mainstream Settings Staff", url: "/documents/info-sheet-mainstream-settings.pdf", desc: "Inclusive mainstream offer, National Inclusion Standards, ISPs" },
      { name: "Mainstream Schools (Updated)", url: "/documents/info-sheet-mainstream-settings-updated.pdf", desc: "Three layers of support, Inclusive Mainstream Fund (£1.6bn), Experts at Hand" },
      { name: "Specialist Setting Staff", url: "/documents/info-sheet-specialist-setting-staff.pdf", desc: "How reforms affect special schools, AP, and specialist placements" },
      { name: "Early Years Settings", url: "/documents/info-sheet-early-years-settings.pdf", desc: "Fast-track EHCPs for under-5s, £47m early years inclusion funding" },
      { name: "Post-16 SEND", url: "/documents/info-sheet-post-16.pdf", desc: "Transition planning, supported internships, post-school support" },
    ],
  },
  {
    category: "Impact Assessments",
    thumb: docThumbImpactAssessment,
    docs: [
      { name: "Child's Rights Impact Assessment", url: "/documents/send-reform-childs-rights-impact-assessment.pdf", desc: "Alignment with UN Convention on the Rights of the Child" },
      { name: "Equalities Impact Assessment", url: "/documents/send-reform-equalities-impact-assessment.pdf", desc: "Effects across disability, race, sex, and socioeconomic disadvantage" },
    ],
  },
  {
    category: "Research & Analysis",
    thumb: docThumbResearch,
    docs: [
      { name: "EEF – SEN in Mainstream Schools Guidance", url: "/documents/eef-sen-mainstream-guidance-2025.pdf", desc: "Evidence-based guidance for supporting SEN pupils in mainstream settings" },
      { name: "Equality and Rights UK – Consultation Analysis", url: "/documents/eruk-send-reforms-consultation.pdf", desc: "Independent analysis of reform proposals and equalities legislation alignment" },
    ],
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

      {/* Official documents */}
      <section className="content-section py-4 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">Official Documents</h2>
            <p className="text-xs text-muted-foreground">16 government information sheets, parent leaflets, and assessments</p>
          </div>
        </div>

        <div className="space-y-5">
          {officialDocuments.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-2">
                <img src={group.thumb} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.docs.map((doc) => (
                  <a
                    key={doc.url}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">{doc.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{doc.desc}</p>
                      <span className="text-[10px] text-muted-foreground/70 mt-1 inline-block">PDF · GOV.UK</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
