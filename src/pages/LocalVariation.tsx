import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { OnThisPage } from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";
import { PageSearch } from "@/components/PageSearch";
import { Link } from "react-router-dom";
import { CheckCircle2, HelpCircle, ExternalLink, AlertTriangle, ArrowRight, Clock, Search, Scale, Users, MapPin, FileText, Shield } from "lucide-react";
import { WordFromRich } from "@/components/WordFromRich";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";
const pageSections: PageSectionDef[] = [
  { id: "inspection-evidence", icon: Search, title: "Inspection evidence" },
  { id: "what-drives-it", icon: HelpCircle, title: "What drives variation" },
  { id: "safety-valve", icon: Scale, title: "Safety Valve agreements" },
  { id: "workforce", icon: Users, title: "Workforce & geography" },
  { id: "what-it-means", icon: FileText, title: "What it means for you" },
  { id: "legal-rights", icon: Shield, title: "Your legal rights" },
  { id: "reform", icon: HelpCircle, title: "What reform intends" },
  { id: "moving", icon: MapPin, title: "Considering moving" },
];

function SH({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-lg font-display font-semibold text-foreground mt-10 mb-4 first:mt-0 scroll-mt-20">{children}</h2>;
}

function CC({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-status-confirmed/10 border border-status-confirmed/30 p-4 flex items-start gap-3 mt-5">
      <CheckCircle2 className="w-5 h-5 text-status-confirmed flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-status-confirmed uppercase tracking-wider mb-1">Confirmed</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function CD({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-status-discussed/10 border border-status-discussed/30 p-4 flex items-start gap-3 mt-5">
      <HelpCircle className="w-5 h-5 text-status-discussed flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-status-discussed uppercase tracking-wider mb-1">Discussed</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function EL({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{children}</span>
      <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
    </a>
  );
}

export default function LocalVariation() {
  return (
    <Layout>
      <SEOHead
        title="Why Where You Live Matters: Local Authority Variation in SEND - SEND Navigator"
        description="SEND provision varies dramatically by area. Inspection evidence, financial pressure, Safety Valve agreements, and what it means for your child's rights."
        path="/local-variation"
      />

      <header className="content-section py-8 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          Why Where You Live Matters
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl font-medium">Local Authority Variation in SEND</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mt-3">
          The support a child with SEND receives in England depends substantially on <strong>where they live</strong>. Two children with identical needs, living in different local authority areas, may receive entirely different levels of support, face entirely different waiting times, and have entirely different outcomes.
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Last reviewed: February 2026. Financial picture updated following November 2025 Budget.</span>
        </div>
      </header>

      <LatestUpdatesStream />

      <OnThisPage sections={pageSections} />
      <PageSearch />

      <WordFromRich>
        <p>One of the harder things to accept is that your child's experience of this system depends significantly on where you live. Not on their needs. Not on their rights. On geography. The law is the same everywhere. The practice is not. Knowing your local context changes how you prepare and what you ask for. This page helps you understand your local picture. Knowledge is not everything. But it is a start.</p>
      </WordFromRich>

      {/* Inspection evidence — with visual graphic */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="inspection-evidence">What the inspection evidence says</SH>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Between January 2023 and December 2024, Ofsted and the CQC completed <strong>54 full area SEND inspections</strong>. Three possible outcomes:</p>

          {/* Visual inspection results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl border border-status-confirmed/30 bg-status-confirmed/10 p-5 text-center">
              <p className="text-3xl font-display font-bold text-status-confirmed">14</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug font-medium">Positive experiences and outcomes</p>
              <p className="text-[10px] text-muted-foreground mt-1">Just over 1 in 4</p>
            </div>
            <div className="rounded-xl border border-status-discussed/30 bg-status-discussed/10 p-5 text-center">
              <p className="text-3xl font-display font-bold text-status-discussed">26</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug font-medium">Inconsistent experiences and outcomes</p>
              <p className="text-[10px] text-muted-foreground mt-1">Nearly half</p>
            </div>
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-5 text-center">
              <p className="text-3xl font-display font-bold text-destructive">14</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug font-medium">Widespread or systemic failings</p>
              <p className="text-[10px] text-muted-foreground mt-1">1 in 4</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Fewer than one in four areas inspected received the top outcome. In six of the 28 inspections conducted in 2024 alone, inspectors found <strong>widespread and systemic failings</strong>.</p>
            <p>Under the previous inspection framework (2016–2022), <strong>over half of all areas inspected</strong> were required to produce a written statement of action addressing significant weaknesses.</p>
            <p>The system as a whole is not failing uniformly. <strong>The pattern is uneven.</strong> Some areas are delivering well. Many are not.</p>
          </div>

          <CC>Ofsted and CQC Area SEND inspections and outcomes in England, as at 31 December 2024 (published June 2025).</CC>
        </div>
      </section>

      {/* What drives variation */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="what-drives-it">What drives the variation</SH>

          <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">Financial pressure</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Local authorities fund SEND provision through the <strong>high needs block</strong> of the Dedicated Schools Grant. Demand for EHC plans has more than doubled since 2015, from around 240,000 to <strong>638,700 by January 2025</strong>.</p>
            <p>Funding has not kept pace with demand. By 2024/25, the gap between what local authorities were spending on SEND and what they received was around <strong>£700 million nationally per year</strong>. Accumulated deficits reached at least <strong>£3.3 billion</strong> by 2024/25.</p>
          </div>

          {/* Deficit stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
             <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
               <p className="text-xl font-display font-bold text-foreground">638.7k</p>
               <p className="text-xs text-muted-foreground mt-1">EHC plans by Jan 2025</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xl font-display font-bold text-foreground">£700m</p>
              <p className="text-xs text-muted-foreground mt-1">annual funding gap</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xl font-display font-bold text-foreground">£3.3bn</p>
              <p className="text-xs text-muted-foreground mt-1">accumulated deficits</p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-6 mb-2">The statutory override and November 2025 Budget</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Since 2018, local authorities have been allowed to keep high needs deficits off their main balance sheets through the <strong>statutory override</strong>. Without it, the majority of upper-tier councils in England would already be technically insolvent.</p>
          </div>

          {/* Budget announcement callout */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 mt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>November 2025 Budget</span>
            </div>
            <p className="text-sm text-foreground font-semibold leading-snug mb-2">The government announced it would cover 90% of historic SEND deficits nationally, and that from 2028/29, all future high needs deficits would fall to central government rather than local authorities.</p>
            <p className="text-sm text-muted-foreground leading-relaxed">This is a <strong>significant structural shift</strong>. It removes some of the immediate financial threat to councils. It does not, on its own, fix the quality of provision or reduce waiting times.</p>
          </div>

          <CC>Deficit figures: Institute for Fiscal Studies (December 2025); County Councils Network survey data; DfE high needs funding operational guidance 2025/26. Government announcement: HM Treasury Budget 2025 (November 2025); IFS analysis December 2025.</CC>
        </div>
      </section>

      {/* Safety Valve */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SH id="safety-valve">Safety Valve agreements</SH>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The DfE has operated a programme of <strong>Safety Valve agreements</strong> with local authorities carrying very high deficits. Under these agreements, the DfE provides additional funding in exchange for the local authority making structural reforms to reduce SEND spending over time.</p>
            <p>By 2024, <strong>around 40 such agreements</strong> were in place.</p>
            <p>They have been controversial. Critics, including IPSEA and parent campaign groups, have raised concerns that the reforms required put <strong>downward pressure on EHC plan issuing, special school placements, and the level of provision</strong> specified in plans.</p>
            <p>The DfE has contested some of these characterisations. But the pattern is observable: local authorities in Safety Valve agreements have, in some cases, seen <strong>falling rates of EHC plan issuance</strong> at the same time as national rates continue to rise.</p>
          </div>

          <div className="rounded-lg bg-card border border-border p-4 mt-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed"><strong>If your LA is in a Safety Valve agreement</strong>, that context is relevant when your child's needs are being assessed. It does not change your legal rights, but it provides context for patterns you may be experiencing.</p>
            </div>
          </div>

          <CC>Safety Valve agreements exist and their general terms. DfE Dedicated Schools Grant very high deficit intervention guidance.</CC>
          <CD>Concerns about downward pressure on provision; contested by DfE. Not independently confirmed.</CD>
        </div>
      </section>

      {/* Workforce */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="workforce">Workforce and geography</SH>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Access to educational psychologists, speech and language therapists, specialist teachers, and CAMHS <strong>varies significantly by region</strong>. Rural areas typically face longer waits and greater distances. Urban areas with high deprivation face high demand on a constrained workforce.</p>
            <p>Workforce shortages are a <strong>systemic issue across SEND provision</strong>. The DfE has funded two additional cohorts of educational psychologist training (2024 and 2025) as part of the Improvement Plan. Whether this translates into reduced waiting times is not yet established.</p>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-6 mb-2">Accountability gaps</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>When significant failings are found in area inspections, the specific accountabilities are not always clear. A school may be delivering well in an area where the system around it is failing.</p>
            <p>Ofsted updated its Area SEND inspection framework in <strong>June 2025</strong> specifically to make accountability clearer, naming which partner needs to act when failings are identified.</p>
          </div>
          <CC>Ofsted Area SEND inspection framework and handbook, updated June 2025.</CC>
        </div>
      </section>

      {/* What it means for parents */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="what-it-means">What this means for parents</SH>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">You are not imagining the inconsistency</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">If your experience of the SEND system feels arbitrary, inconsistent, or dependent on who you speak to, that is often because <strong>it is</strong>. The variation is real and documented.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Your LA's inspection outcome is public</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Ofsted publishes the outcome of every area SEND inspection. <strong>You can look up your local area.</strong> Knowing whether your LA has been found to have systemic failings gives you context for what you are navigating.</p>
              <div className="mt-2">
                <EL href="https://reports.ofsted.gov.uk/search?q=&level_1_types=10">→ Find your area's Ofsted SEND inspection report</EL>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Knowing your LA's Safety Valve status matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">If your LA is operating under a Safety Valve agreement, it is worth being aware of this when your child's needs are being assessed. It does not change your legal rights. But it provides context.</p>
              <div className="mt-2">
                <EL href="https://www.gov.uk/government/publications/dedicated-schools-grant-very-high-deficit-intervention">→ DfE Safety Valve and Delivering Better Value authorities</EL>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal rights — Tandy callout */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SH id="legal-rights">Local authority financial pressure does not reduce your legal rights</SH>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p><strong>This is important.</strong> A local authority cannot lawfully refuse to issue an EHC plan, reduce the provision specified in a plan, or fail to carry out a statutory assessment on the grounds of cost or budget pressure alone.</p>
            <p>Cost is a relevant factor in choosing between equally appropriate options. It is <strong>not a lawful basis for denying necessary provision</strong>.</p>
            <p>If you are told that support cannot be provided because the LA does not have the budget, <strong>that is not a legally sound basis for refusal</strong>. The rights under the Children and Families Act 2014 are not qualified by local authority financial circumstances.</p>
          </div>

          <div className="rounded-lg bg-card border border-primary/30 p-4 mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Key legal principle</p>
            <p className="text-sm text-foreground font-semibold leading-snug">R v East Sussex County Council ex parte Tandy [1998]</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">Established that local authorities cannot reduce provision to a level below what is needed to meet statutory duty purely on cost grounds. <strong>This remains good law.</strong></p>
          </div>

          <CC>R v East Sussex County Council ex parte Tandy [1998] AC 714. This principle is confirmed and remains applicable to EHC plan provision under the Children and Families Act 2014.</CC>
        </div>
      </section>

      {/* Reform */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="reform">What reform is intended to change</SH>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>One of the stated aims of the SEND and AP Improvement Plan is <strong>national consistency</strong>. The proposed three elements are:</p>
            <div className="space-y-3 mt-3">
              {[
                { num: "1", title: "National standards", text: "Clear standards for what universal provision and SEN Support should look like in every area." },
                { num: "2", title: "Local inclusion plans", text: "Map the needs of children with SEND against available provision in each area." },
                { num: "3", title: "Inclusion dashboards", text: "Give parents and the public visibility of how their area is performing." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{item.num}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3">The government's decision to <strong>centralise high needs funding from 2028/29</strong> is a structural change that may reduce the extent to which financial variation drives variation in provision.</p>
            <p>None of these changes are yet in force. The Schools White Paper — Every Child Achieving and Thriving — was <strong>published on 23 February 2026</strong> and sets out the legislative framework.</p>
            <Link to="/state-of-send-2026" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm mt-2">
              → Track reform progress <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <CD>National standards, local inclusion plans, and dashboards are proposals from the Improvement Plan. Legislative status is unconfirmed. White Paper timing as stated by ministers but not guaranteed.</CD>
        </div>
      </section>

      {/* Considering moving */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="moving">If you are considering moving to improve provision</SH>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Some families move area specifically to access better SEND provision. This is an understandable response to a broken system. It is also a response that is <strong>only available to families with the resources to move</strong>, which deepens inequality.</p>
            <p>If you are considering a move, useful sources of information include:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Your local <strong>SENDIASS</strong> for an honest view of local provision before you move</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>IPSEA</strong> and <strong>SOS!SEN</strong> for cases where provision has continued to fail after a move</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Other parents in <strong>local parent carer forums</strong> for ground-level intelligence that inspection reports do not always reflect</span></li>
            </ul>
            <p>Be cautious about decisions based solely on Ofsted inspection outcomes. An area with a positive inspection outcome still has families in crisis. An area with a poor outcome <strong>still has individual schools and teams doing good work</strong>.</p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="content-section py-6 pb-8">
        <div className="space-y-2">
          <Link to="/ehcps" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ The EHCP Guide: understanding every section of the plan</p>
          </Link>
          <Link to="/what-to-do-right-now" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ What to do right now: the full escalation guide</p>
          </Link>
          <Link to="/sendiass" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Find your local SENDIASS</p>
          </Link>
          <Link to="/what-we-owe-our-children" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Reality Bites: what the system actually owes your child</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
