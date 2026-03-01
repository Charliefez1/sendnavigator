import { useState } from "react";
import { PageOrientation } from "@/components/templates";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ArrowRight, CheckCircle2, HelpCircle, BookOpen, AlertTriangle, Clock, FileText, Download, Search, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import docThumbGovInfo from "@/assets/doc-thumb-gov-info.jpg";
import docThumbParentLeaflet from "@/assets/doc-thumb-parent-leaflet.jpg";
import docThumbImpactAssessment from "@/assets/doc-thumb-impact-assessment.jpg";
import docThumbResearch from "@/assets/doc-thumb-research.jpg";
import docThumbWhitePaper from "@/assets/doc-thumb-white-paper.jpg";

const reportSections = [
  {
    path: "/state-of-send-2026/where-we-are-now",
    title: "What we know right now",
    summary: "The current state of the SEND system, existing legal protections, and how the system is performing right now. The factual baseline.",
    color: "confirmed",
    number: 1,
  },
  {
    path: "/state-of-send-2026/what-is-changing",
    title: "What is now in motion",
    summary: "Confirmed reforms already underway, direction of travel set by the Schools White Paper, and operational instructions already issued.",
    color: "confirmed",
    number: 2,
  },
  {
    path: "/state-of-send-2026/what-has-not-changed",
    title: "What remains protected",
    summary: "Legal rights still in force, EHCP protections, tribunal and appeal routes, and what cannot change without legislation.",
    color: "confirmed",
    number: 3,
  },
  {
    path: "/state-of-send-2026/what-is-being-discussed",
    title: "What is actively being shaped",
    summary: "Areas where policy design is still open, consultation themes, trade-offs being debated, and where influence still matters.",
    color: "discussed",
    number: 4,
  },
  {
    path: "/state-of-send-2026/what-we-do-not-know",
    title: "What is genuinely unknown",
    summary: "Unanswered questions with no published answers yet: thresholds, enforcement mechanisms, and transition detail.",
    color: "discussed",
    number: 5,
  },
  {
    path: "/state-of-send-2026/what-the-leaks-are-saying",
    title: "What has been reported",
    summary: "What major media outlets have reported, what those reports are actually based on, and how reporting has evolved over time.",
    color: "unconfirmed",
    number: 6,
  },
  {
    path: "/state-of-send-2026/what-the-leaks-do-not-mean",
    title: "What is often misunderstood",
    summary: "Common misinterpretations addressed. Where fear runs ahead of evidence. What reports do not imply legally or operationally.",
    color: "unconfirmed",
    number: 7,
  },
  {
    path: "/state-of-send-2026/timeline",
    title: "What happens next",
    summary: "Key milestones, consultation windows, decision points, and what to watch for. Grounded and date-stamped.",
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

/** Tiny inline doc link */
function DocLink({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[11px] text-primary/80 hover:text-primary hover:underline transition-colors"
    >
      <FileText className="w-3 h-3 flex-shrink-0" />
      <span className="truncate max-w-[200px]">{label}</span>
    </a>
  );
}

function QuickSummary() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
        <CollapsibleTrigger className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-primary/10 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-display font-semibold text-foreground">Quick Summary: What the documents say</p>
              <p className="text-xs text-muted-foreground mt-0.5">Key changes parents and settings should understand first</p>
            </div>
          </div>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-5 space-y-6 text-sm text-foreground/90 leading-relaxed border-t border-primary/10 pt-4">

            {/* 1. ISP */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">1. A new planning document for most children with SEND</h3>
              <p>All children and young people with identified SEND are proposed to have an <strong>Individual Support Plan</strong>, created by schools and colleges, developed with parents and the young person, and standardised to support transitions.</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                <DocLink url="/documents/send-reform-equalities-impact-assessment.pdf" label="Equalities Impact Assessment" />
                <DocLink url="/documents/info-sheet-parents-mainstream.pdf" label="Info Sheet – Parents Mainstream" />
                <DocLink url="/documents/parent-leaflet-what-parents-need-to-know.pdf" label="Parent Leaflet – Need to Know" />
              </div>

              <div className="mt-3 pl-3 border-l-2 border-primary/20 space-y-1.5">
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">What it is supposed to contain</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc pl-4">
                  <li>Identified needs</li>
                  <li>Strategies and support being used</li>
                  <li>Expected outcomes from that support</li>
                </ul>
                <DocLink url="/documents/send-reform-equalities-impact-assessment.pdf" label="Equalities Impact Assessment" />
              </div>

              <div className="mt-3 pl-3 border-l-2 border-primary/20">
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">Why it matters for parents</p>
                <p className="text-xs text-muted-foreground">It is meant to tighten communication about what is happening day to day, and make it easier to challenge gaps because "what is agreed" is written down.</p>
                <div className="mt-1">
                  <DocLink url="/documents/info-sheet-parents-mainstream.pdf" label="Info Sheet – Parents Mainstream" />
                </div>
              </div>
            </div>

            {/* 2. Three layers */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">2. Three non-sequential layers of support on top of a universal offer</h3>
              <p>The proposal describes a universal offer in mainstream, plus three flexible layers: <strong>Targeted</strong>, <strong>Targeted Plus</strong>, <strong>Specialist</strong>. Children can move between layers and they are not meant to be sequential.</p>
              <div className="mt-2">
                <DocLink url="/documents/parent-leaflet-what-parents-need-to-know.pdf" label="Parent Leaflet – Need to Know" />
              </div>
            </div>

            {/* 3. EHCPs */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">3. EHCPs retained, but increasingly tied to new Specialist Provision Packages</h3>
              <p>The proposal says EHCPs remain, but future EHCP entitlement is intended to be underpinned by nationally defined <strong>Specialist Provision Packages</strong> for the most complex needs, to reduce postcode variation and improve clarity and consistency.</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                <DocLink url="/documents/send-reform-equalities-impact-assessment.pdf" label="Equalities Impact Assessment" />
                <DocLink url="/documents/send-reform-childs-rights-impact-assessment.pdf" label="Child's Rights Impact Assessment" />
                <DocLink url="/documents/parent-leaflet-what-parents-need-to-know.pdf" label="Parent Leaflet – Need to Know" />
              </div>
              <div className="mt-3 pl-3 border-l-2 border-status-discussed/30 bg-status-discussed/5 p-3 rounded-r-lg">
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">A key policy claim</p>
                <p className="text-xs text-muted-foreground">Only children and young people who need a Specialist Provision Package would have an EHCP in future.</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  <DocLink url="/documents/send-reform-equalities-impact-assessment.pdf" label="Equalities Impact Assessment" />
                  <DocLink url="/documents/send-reform-childs-rights-impact-assessment.pdf" label="Child's Rights Impact Assessment" />
                </div>
              </div>
            </div>

            {/* 4. Experts at Hand */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">4. More in-school specialist input via "Experts at Hand"</h3>
              <p>The proposal includes an <strong>Experts at Hand</strong> offer into mainstream settings, explicitly naming educational psychologists, speech and language therapists, and occupational therapists.</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                <DocLink url="/documents/eruk-send-reforms-consultation.pdf" label="ERUK Consultation Analysis" />
                <DocLink url="/documents/send-reform-equalities-impact-assessment.pdf" label="Equalities Impact Assessment" />
                <DocLink url="/documents/info-sheet-parents-mainstream.pdf" label="Info Sheet – Parents Mainstream" />
              </div>
            </div>

            {/* 5. Inclusion bases */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">5. Inclusion bases in mainstream schools</h3>
              <p>The parent leaflet proposes <strong>inclusion bases</strong>: a space in a mainstream school for targeted interventions, support, or regulation, while remaining part of the local school.</p>
              <div className="mt-2">
                <DocLink url="/documents/parent-leaflet-what-parents-need-to-know.pdf" label="Parent Leaflet – Need to Know" />
              </div>
            </div>

            {/* Funding data */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-display font-semibold text-foreground mb-2">Funding and capacity commitments parents, SENCos, and school leaders can quote</h3>
              <div className="space-y-2.5">
                {[
                  { text: "Early investments: £3.7bn for tens of thousands more SEND places, plus £4bn in earlier identification, needs and support, over the period now to 2030.", source: "Parent Leaflet – Need to Know", url: "/documents/parent-leaflet-what-parents-need-to-know.pdf" },
                  { text: "National SEND training programme: £200m over 3 years from September 2026.", source: "Equalities Impact Assessment", url: "/documents/send-reform-equalities-impact-assessment.pdf" },
                  { text: "Extra for mainstream inclusion: £1.6bn for mainstream nurseries, schools and colleges to include children with SEND.", source: "ERUK Consultation Analysis", url: "/documents/eruk-send-reforms-consultation.pdf" },
                  { text: "60,000 new places for children with SEND in special schools and inclusion bases.", source: "Info Sheet – Parents Mainstream", url: "/documents/info-sheet-parents-mainstream.pdf" },
                  { text: "Educational psychology training expansion: investment over £40m, with two cohorts of over 200 trainees starting in 2026 and 2027, then further cohorts 2028 to 2030.", source: "Equalities Impact Assessment", url: "/documents/send-reform-equalities-impact-assessment.pdf" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-primary font-bold text-xs mt-0.5">•</span>
                    <div>
                      <p className="text-xs text-foreground/80">{item.text}</p>
                      <DocLink url={item.url} label={item.source} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process commitments */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-display font-semibold text-foreground mb-2">Process and accountability commitments</h3>
              <div className="space-y-2.5">
                {[
                  { text: "Individual Support Plans proposed as a legal obligation for schools and colleges.", sources: [{ label: "Parent Leaflet – Need to Know", url: "/documents/parent-leaflet-what-parents-need-to-know.pdf" }, { label: "Equalities Impact Assessment", url: "/documents/send-reform-equalities-impact-assessment.pdf" }] },
                  { text: "Ofsted to inspect settings on how well they support children with SEND, including whether support is in place and high expectations are met.", sources: [{ label: "Parent Leaflet – Need to Know", url: "/documents/parent-leaflet-what-parents-need-to-know.pdf" }] },
                  { text: "Complaints about SEND proposed to be heard by a panel including an independent SEND expert, plus improved mediation and dispute resolution, with tribunal remaining a backstop for EHCP related routes.", sources: [{ label: "Parent Leaflet – Need to Know", url: "/documents/parent-leaflet-what-parents-need-to-know.pdf" }, { label: "Child's Rights Impact Assessment", url: "/documents/send-reform-childs-rights-impact-assessment.pdf" }] },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-primary font-bold text-xs mt-0.5">•</span>
                    <div>
                      <p className="text-xs text-foreground/80">{item.text}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                        {item.sources.map((s) => <DocLink key={s.url} url={s.url} label={s.label} />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-2">Timeline that parents will ask about</h3>
              <p className="text-xs text-muted-foreground mb-3">The parent leaflet and information sheets describe a phased approach, with major change points later in the decade.</p>
              <div className="space-y-3">
                {[
                  { date: "2026–2027", text: "National SEND training begins, Best Start Family Hubs rollout, draft Specialist Provision Packages expected Autumn 2026." },
                  { date: "2027–2028", text: "Final Specialist Provision Packages published and a new needs assessment process designed. Parents should not feel pressured to pay for extra assessments or costly diagnoses." },
                  { date: "From Sept 2029", text: "New needs assessments begin for children assessed for the first time." },
                  { date: "From 2030", text: "Transition for children and young people with existing EHCPs begins, once the new inclusive mainstream system is 'fully built'. Transitions intended only at natural phase transfer points, not mid-phase." },
                ].map((item) => (
                  <div key={item.date} className="flex gap-3">
                    <span className="text-xs font-mono font-bold text-primary whitespace-nowrap mt-0.5 w-24 flex-shrink-0">{item.date}</span>
                    <p className="text-xs text-foreground/80">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                <DocLink url="/documents/parent-leaflet-what-parents-need-to-know.pdf" label="Parent Leaflet – Need to Know" />
                <DocLink url="/documents/info-sheet-parents-mainstream.pdf" label="Info Sheet – Parents Mainstream" />
              </div>
            </div>

            {/* Special school protection */}
            <div className="pl-3 border-l-2 border-status-confirmed/30 bg-status-confirmed/5 p-3 rounded-r-lg">
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">Protection for families using special schools</p>
              <p className="text-xs text-foreground/80">Every child with a special school place in September 2029 can stay in special school until they finish education, unless they choose to move.</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                <DocLink url="/documents/info-sheet-parents-special-schools.pdf" label="Info Sheet – Parents Special Schools" />
                <DocLink url="/documents/send-reform-equalities-impact-assessment.pdf" label="Equalities Impact Assessment" />
              </div>
            </div>

            {/* Rights */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-2">Rights and routes to challenge</h3>

              <div className="space-y-3">
                <div className="pl-3 border-l-2 border-status-confirmed/30">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">What stays</p>
                  <p className="text-xs text-foreground/80">The right to appeal to the SEND Tribunal remains for core EHCP and package decisions, and disability discrimination routes under Equality Act 2010 remain where reasonable adjustments are not made.</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    <DocLink url="/documents/info-sheet-parents-mainstream.pdf" label="Info Sheet – Parents Mainstream" />
                    <DocLink url="/documents/send-reform-childs-rights-impact-assessment.pdf" label="Child's Rights Impact Assessment" />
                  </div>
                </div>

                <div className="pl-3 border-l-2 border-status-discussed/30">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">What shifts in emphasis</p>
                  <p className="text-xs text-foreground/80">The documents aim to move more disputes into earlier resolution routes, with greater use of mediation, disagreement resolution services, and strengthened school level complaints with independent SEND expertise.</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    <DocLink url="/documents/send-reform-childs-rights-impact-assessment.pdf" label="Child's Rights Impact Assessment" />
                    <DocLink url="/documents/send-reform-equalities-impact-assessment.pdf" label="Equalities Impact Assessment" />
                  </div>
                </div>

                <div className="pl-3 border-l-2 border-primary/20">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">Tribunal appeal types explicitly listed</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 list-disc pl-4">
                    <li>Decision not to assess for access to Specialist Provision Packages</li>
                    <li>Threshold decision about whether a child meets the new package threshold and therefore has an EHCP</li>
                    <li>Which package a child is matched to</li>
                    <li>Decision that a child no longer needs the package and EHCP should cease</li>
                    <li>Placement decisions</li>
                  </ul>
                  <div className="mt-1">
                    <DocLink url="/documents/send-reform-childs-rights-impact-assessment.pdf" label="Child's Rights Impact Assessment" />
                  </div>
                </div>
              </div>
            </div>

            {/* EEF guidance */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-display font-semibold text-foreground mb-2">What teachers and SENCos can lift directly into practice</h3>
              <p className="text-xs text-muted-foreground mb-2">Evidence-led classroom and school approach from the EEF guidance – five core recommendations:</p>
              <ol className="text-xs text-foreground/80 space-y-1 list-decimal pl-4 mb-3">
                <li>Create a positive and supportive environment for all pupils, without exception</li>
                <li>Build an ongoing, holistic understanding of pupils and needs</li>
                <li>Ensure all pupils have access to high quality teaching</li>
                <li>Use carefully selected small group and one-to-one interventions to complement high quality teaching</li>
                <li>Work effectively with teaching assistants</li>
              </ol>
              <DocLink url="/documents/eef-sen-mainstream-guidance-2025.pdf" label="EEF SEN Mainstream Guidance 2025" />

              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Important implementation points</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Responsibility for SEND is shared, not owned by the SENCo alone, to avoid deskilling teachers and leaders</li>
                  <li>Use the graduated approach (assess, plan, do, review) with regular, purposeful assessment and input from parents, carers, pupils, and specialists</li>
                  <li>Avoid separating pupils with EHCPs from teachers and peers as a default, because it risks lower quality teaching and streaming effects</li>
                  <li>Teaching assistants should supplement, not replace, teacher instruction</li>
                </ul>
              </div>

              <div className="mt-3 pl-3 border-l-2 border-primary/20">
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">Practical micro-adjustment example</p>
                <p className="text-xs text-muted-foreground">Seating considerations to reduce interference, ensure line of sight, manage glare and reflections, and support hearing and attention.</p>
                <div className="mt-1">
                  <DocLink url="/documents/eef-sen-mainstream-guidance-2025.pdf" label="EEF SEN Mainstream Guidance 2025" />
                </div>
              </div>
            </div>

          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export default function StateOfSend2026() {
  const [docSearch, setDocSearch] = useState("");
  const query = docSearch.toLowerCase().trim();

  const filteredDocuments = officialDocuments
    .map((group) => ({
      ...group,
      docs: group.docs.filter(
        (d) =>
          !query ||
          d.name.toLowerCase().includes(query) ||
          d.desc.toLowerCase().includes(query) ||
          group.category.toLowerCase().includes(query)
      ),
    }))
    .filter((group) => group.docs.length > 0);

  const totalResults = filteredDocuments.reduce((sum, g) => sum + g.docs.length, 0);

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

      <PageOrientation
        icon={BookOpen}
        sectionLabel="SEND Reform Report"
        title="The State of SEND 2026"
        description="A structured, evidence-based report tracking SEND reform in England. Eight sections move from what is confirmed through what is actively being shaped to what is genuinely unknown. Read in order, or jump to what matters most to you."
        accentColor="hsl(175 65% 45%)"
        lastUpdated="27th February 2026"
      >
        <div className="inline-flex items-center gap-2 rounded-lg bg-foreground/5 border border-foreground/10 px-3 py-1">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-foreground/70">8-Part Report</span>
        </div>
      </PageOrientation>

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

        {/* Quick summary collapsible */}
        <div className="mb-4">
          <QuickSummary />
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents… e.g. EHCP, parents, mainstream, early years"
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
          {query && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {totalResults} result{totalResults !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="space-y-5">
          {filteredDocuments.map((group) => (
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
          {filteredDocuments.length === 0 && query && (
            <p className="text-sm text-muted-foreground text-center py-6">No documents match "{docSearch}"</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
