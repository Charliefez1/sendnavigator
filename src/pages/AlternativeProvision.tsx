import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { CheckCircle2, HelpCircle, ExternalLink, AlertTriangle, ArrowRight } from "lucide-react";
import { WordFromRich } from "@/components/WordFromRich";

const anchors = [
  { id: "what-ap-is", label: "What AP is" },
  { id: "who-is-in-ap", label: "Who is in AP" },
  { id: "outcomes", label: "The outcomes picture" },
  { id: "rights-ehcp", label: "Rights with an EHCP" },
  { id: "quality", label: "Quality & registration" },
  { id: "off-site", label: "Directed off-site provision" },
  { id: "reform", label: "What reform proposes" },
  { id: "concerned", label: "If you are concerned" },
];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-lg font-display font-semibold text-foreground mt-10 mb-4 first:mt-0 scroll-mt-20">
      {children}
    </h2>
  );
}

function ConfidenceConfirmed({ children }: { children: React.ReactNode }) {
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

function ConfidenceDiscussed({ children }: { children: React.ReactNode }) {
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

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{children}</span>
      <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
    </a>
  );
}

export default function AlternativeProvision() {
  return (
    <Layout>
      <SEOHead
        title="Alternative Provision: What It Is and What Your Rights Are - SEND Navigator"
        description="What Alternative Provision means, who ends up there, your rights if your child is placed in AP, and what SEND reform proposes."
        path="/alternative-provision"
      />

      <header className="content-section py-8 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          Alternative Provision: What It Is and What Your Rights Are
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Alternative Provision, AP, is the part of the education system that sits outside mainstream and special schools. It includes Pupil Referral Units, AP academies and free schools, hospital schools, and a large and <strong>largely unregulated sector</strong> of private and voluntary providers.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mt-3">
          Around <strong>43,000 children</strong> are in some form of AP at any given time in England. The majority have SEND. Many have EHC plans. Most arrived there through a route that involved unmet need, exclusion, or both.
        </p>
      </header>

      {/* Anchor nav */}
      <nav className="content-section py-4 border-b border-border" aria-label="Page sections">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">Jump to</p>
        <div className="flex flex-wrap gap-1.5">
          {anchors.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      <WordFromRich>
        <p>Alternative Provision is where the system sends children it has not found a way to include. Some of it is excellent. Some of it is a holding space that changes very little. If your child is moving towards AP, or is already in it, the questions to ask are the same as for any setting: what does my child need, is this place able to meet it, and what is the plan from here? AP is not the end of the road. But it needs scrutiny, and you are entitled to apply it.</p>
      </WordFromRich>

      {/* What AP is */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="what-ap-is">What Alternative Provision is</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>AP is defined in statutory guidance as education arranged:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>by local authorities for pupils who, because of <strong>exclusion, illness or other reasons</strong>, would not otherwise receive suitable education</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>by schools for pupils who are <strong>suspended</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>by schools for pupils who are <strong>directed to off-site provision</strong> to improve behaviour</span></li>
            </ul>
            <p className="font-medium text-foreground mt-4">In practice, AP covers a broad and uneven landscape:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Pupil Referral Units (PRUs)</strong> are local authority-maintained schools. Inspected by Ofsted and subject to standard school legislation.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>AP academies and free schools</strong> are independently run but state-funded. Also inspected by Ofsted.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>School-arranged AP</strong> is off-site provision commissioned by a school, often at a private or voluntary provider. Quality varies significantly. Many are <strong>not registered</strong> with any official body and are not subject to Ofsted inspection.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>LA-funded placements</strong> in non-state provision covers a range of settings including independent schools and providers not registered as schools.</span></li>
            </ul>
          </div>
          <ConfidenceConfirmed>DfE statutory guidance on Alternative Provision; DfE school and pupils characteristics statistics 2024/25.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Who is in AP - prominent stats */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SectionHeading id="who-is-in-ap">Who is in Alternative Provision</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">16,600</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">pupils in state-funded AP schools<br /><strong>Jan 2025</strong></p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">26,400</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">in school-arranged AP<br /><strong>Jan 2024</strong></p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">80%</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">of LA AP pupils have an <strong>EHC plan or SEN statement</strong></p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">55%</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">eligible for <strong>free school meals</strong> vs 25% nationally</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The data is clear and it matters. <strong>80% of pupils in local authority-funded AP have an EHC plan or SEN statement.</strong> This is not a coincidence. It is the result of a system that, when mainstream provision fails to meet a child's needs, routes them out rather than investing in their support within it.</p>
            <p>Children in AP are disproportionately:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>eligible for free school meals (<strong>55%</strong> compared to 25% for all pupils)</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>from specific ethnic minority backgrounds including <strong>Gypsy, Roma, Traveller of Irish Heritage, and Black Caribbean</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>children who have experienced <strong>exclusion</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>children with <strong>unmet or unidentified SEND</strong></span></li>
            </ul>
            <p>The most common stated reason for school-arranged AP placements is off-site placement for behavioural support. In many cases, the behaviour that precedes AP placement is a <strong>direct consequence of unmet SEND need</strong>. The placement addresses the symptom. The underlying need often goes unmet in AP too.</p>
          </div>
          <ConfidenceConfirmed>DfE alternative provision census data; DfE schools, pupils and their characteristics 2023/24 and 2024/25.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Outcomes */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="outcomes">The outcomes picture</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p><strong>Outcomes for pupils in AP are significantly worse</strong> than for pupils in mainstream and special schools.</p>
            <p>At key stage 4, the average attainment score for pupils in AP is far below the national average. Pass rates for five or more GCSEs at grade C and above are <strong>in the low single figures in percentage terms</strong> for AP pupils, compared to over 50% nationally.</p>
            <p>These are not outcomes that reflect the ability of the children in AP. They reflect the quality and consistency of the provision, and the <strong>cumulative impact of disrupted education, unmet need, and low expectations</strong>.</p>
          </div>
          <ConfidenceConfirmed>Parliamentary evidence to the Alternative Provision inquiry; DfE attainment data.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Rights - EHCP and without */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="rights-ehcp">Your rights if your child is placed in Alternative Provision</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">If your child has an EHC plan</p>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>The EHC plan <strong>continues to apply</strong>. The provision specified in the plan must be delivered, regardless of the setting.</p>
                <p>You retain all the rights that come with that plan, including the right to <strong>annual review</strong>, the right to challenge the contents, and the right to <strong>appeal to the SEND Tribunal</strong>.</p>
                <p>The AP setting must make provision consistent with the EHC plan. If it is not doing so, that is a failure of the plan and the process for challenging it is the same as in any other setting.</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Without an EHC plan but with identified SEND</p>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>The <strong>Equality Act 2010 still applies</strong>. The AP setting must make reasonable adjustments for a disabled child. SEND Support duties apply.</p>
                <p>Placement in AP, particularly longer-term, is evidence of significant need that mainstream provision has not been able to meet. This may be the point to <strong>request an EHC needs assessment</strong>.</p>
              </div>
            </div>
          </div>

          <ConfidenceConfirmed>Children and Families Act 2014; Equality Act 2010; DfE AP statutory guidance.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Quality and registration */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="quality">The quality and registration question</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Not all AP settings are registered as schools. Not all are inspected by Ofsted. If your child is placed in an unregistered setting, <strong>you should ask</strong>:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Is this setting <strong>registered</strong> with any official body?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Has it been <strong>inspected</strong>? If so, when and with what outcome?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>What is the <strong>curriculum offer</strong>?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>How long is the placement <strong>intended to last</strong>?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>What is the <strong>plan for return</strong> to mainstream or transition to another setting?</span></li>
            </ul>
            <p>You are entitled to ask these questions. The LA or school commissioning the placement should be able to answer them.</p>
          </div>
        </div>
      </section>

      {/* Directed off-site - highlighted */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SectionHeading id="off-site">Directed off-site provision by schools</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Schools can direct pupils to off-site provision <strong>without formally excluding them</strong>. This is legal in specific, limited circumstances.</p>
            <p className="font-medium text-foreground">The school must:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>be satisfied the alternative provision is <strong>suitable</strong> for the pupil's age, ability, aptitude, and any SEN</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>ensure the pupil's <strong>health and safety</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>ensure the <strong>quality of provision</strong> is appropriate</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>keep the pupil <strong>on the school roll</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>ensure the pupil's <strong>attendance is monitored</strong></span></li>
            </ul>

            <div className="rounded-lg bg-card border border-border p-4 mt-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <p>A school <strong>cannot</strong> use off-site direction as a substitute for exclusion, as an alternative to providing appropriate SEND support, or to manage a child with challenging needs without proper process.</p>
                  <p className="mt-2">If your child has been directed to off-site provision and you were <strong>not properly informed</strong>, or if the arrangement has been in place for an extended period without review, that is worth examining carefully.</p>
                  <p className="mt-2"><strong>Keep a written record</strong> of when the arrangement started, what you were told, and what reviews have taken place.</p>
                </div>
              </div>
            </div>
          </div>
          <ConfidenceConfirmed>DfE Alternative Provision statutory guidance (2013, updated); Education Act 1996, Section 29A.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Reform proposals */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="reform">What reform is proposing for Alternative Provision</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>AP is named in the title of the <strong>SEND and AP Improvement Plan</strong>. It is not an afterthought.</p>
            <p>The current government's reform proposals include:</p>

            <div className="rounded-xl border border-border bg-muted/30 p-5 mt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Proposed three-tier AP system</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-status-confirmed/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-status-confirmed">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Targeted early support</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Within mainstream school, before AP placement is needed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-status-discussed/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-status-discussed">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Time-limited intensive placements</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">In an AP setting, with a clear return plan.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-muted-foreground">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Longer-term placements</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">With a route to mainstream or a sustainable post-16 destination.</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3">The intention is to move away from AP as a <strong>long-term default</strong> for children the mainstream system cannot manage, and towards AP as a planned, time-limited, purposeful intervention.</p>
            <p><strong>New local SEND and AP partnerships</strong> are proposed to plan provision across education, health, and care.</p>
            <p><strong>Inclusion dashboards</strong> are intended to give parents and the public visibility of how local areas are performing on inclusion and AP use.</p>
            <p>The White Paper, expected in 2026, is expected to include further detail on AP reform.</p>

            <Link to="/state-of-send-2026" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm mt-2">
              → Track reform progress <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <ConfidenceDiscussed>Three-tier AP system, local partnerships, and inclusion dashboards are proposals from the Improvement Plan. Implementation status and White Paper commitments are unconfirmed.</ConfidenceDiscussed>
        </div>
      </section>

      {/* If you are concerned */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="concerned">If your child is at risk of AP placement and you are concerned</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>AP is not inherently the wrong place for every child. For some children, at some points, a well-run AP setting is the right provision.</p>
            <p>But for a child with SEND, placement in AP should trigger <strong>specific questions</strong>:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Is the EHC plan being <strong>implemented in the current setting</strong>? If not, has that failure been addressed?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Has an <strong>EHC needs assessment</strong> been requested or completed?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Is the AP placement <strong>time-limited</strong> with a clear review point and a plan for what comes next?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Has the AP setting confirmed it can <strong>meet the needs in the EHC plan</strong>?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Is there a <strong>written transition plan</strong>?</span></li>
            </ul>
            <p>If you are not satisfied with the answers, the same escalation routes apply as for any other SEND matter.</p>
          </div>

          <div className="mt-5 space-y-2">
            <Link to="/what-to-do-right-now" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">→ What to do right now if things are going wrong</span>
            </Link>
            <Link to="/exclusions" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">→ Exclusions and your child's rights</span>
            </Link>
            <ExtLink href="https://www.ipsea.org.uk">→ IPSEA - free independent legally-based advice</ExtLink>
            <Link to="/sendiass" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">→ Find your local SENDIASS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="content-section py-6 pb-8">
        <div className="space-y-2">
          <Link to="/ehcps" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
             <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ The EHCP Guide - understanding every section of the plan</p>
           </Link>
           <Link to="/post-16-and-transition" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
             <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Post-16 and Transition - what happens next</p>
           </Link>
           <Link to="/state-of-send-2026" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
             <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ State of SEND 2026 - track reform progress</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
