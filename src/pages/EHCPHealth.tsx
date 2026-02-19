import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { CheckCircle2, HelpCircle, ExternalLink, AlertTriangle, ArrowRight, Clock } from "lucide-react";

const anchors = [
  { id: "sections-c-g", label: "Sections C & G" },
  { id: "why-it-matters", label: "Why this matters" },
  { id: "nhs-duties", label: "NHS legal duties" },
  { id: "not-delivered", label: "What to do if not delivered" },
  { id: "getting-g-right", label: "Getting Section G right" },
  { id: "camhs", label: "CAMHS and thresholds" },
  { id: "nhs-restructure", label: "NHS restructure" },
  { id: "extended-appeals", label: "Extended appeals" },
  { id: "find-icb", label: "Find your ICB" },
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

function ConfidenceUnknown({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-muted/50 border border-border p-4 flex items-start gap-3 mt-5">
      <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Unknown</p>
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

export default function EHCPHealth() {
  return (
    <Layout>
      <SEOHead
        title="The Health Side of Your Child's EHCP — SEND Navigator"
        description="NHS duties in EHC plans. What Sections C and G mean, what happens when health provision isn't delivered, and how to challenge it."
        path="/ehcp-health"
      />

      <header className="content-section py-8 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          The Health Side of Your Child's EHCP
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Most parents focus on the education sections of an EHC plan. That is understandable. Sections F and I — what support the school provides and which school is named — are where the most visible battles happen.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mt-3">
          But <strong>Sections C and G</strong> are where a significant amount of provision falls through the gaps, and where many families find that what the plan says and what actually happens are two different things.
        </p>
      </header>

      {/* Anchor navigation */}
      <nav className="content-section py-4 border-b border-border" aria-label="Page sections">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">Jump to</p>
        <div className="flex flex-wrap gap-1.5">
          {anchors.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections C and G — two-panel layout */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="sections-c-g">What Sections C and G actually are</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Section C — Health Needs</p>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>Describes your child's <strong>health needs that relate to their SEND</strong>. Not a diagnosis list. A description of the health needs that have a direct bearing on their education, health, and wellbeing.</p>
                <p>Should include things like the impact of a condition on your child's ability to <strong>process information, regulate themselves, manage sensory environments, or access learning</strong>. Should be specific and detailed.</p>
                <p>In practice, Section C is <strong>frequently thin, vague, or incomplete</strong>. This is partly because health professionals contributing to assessments are often cautious about their language. It is also because there is no strong system-level accountability for the quality of Section C content.</p>
              </div>
            </div>
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Section G — Health Provision</p>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>Sets out the <strong>health care provision your child needs</strong> as a result of the needs described in Section C. Therapy input, specialist assessments, mental health support — where it is linked to SEND, it belongs in Section G.</p>
                <p>This is where it gets <strong>legally significant</strong>.</p>
              </div>

              {/* Key legal duty callout */}
              <div className="rounded-lg bg-card border border-primary/40 p-4 mt-3">
                <p className="text-sm font-semibold text-foreground leading-snug">
                  If provision is written into Section G, the NHS is <strong>legally required to provide it</strong>.
                </p>
                <p className="text-xs text-muted-foreground mt-1">That is not a target. It is not guidance. It is a statutory duty.</p>
              </div>
            </div>
          </div>

          <ConfidenceConfirmed>Children and Families Act 2014, Section 42. The health commissioning body (in most cases the local ICB) has a legal duty to provide health care provision specified in Section G of an EHC plan.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Why this matters */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="why-it-matters">Why this matters in practice</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p><strong>Health provision is the most commonly undelivered part of an EHC plan.</strong></p>
            <p>Therapy waiting lists can run to years. CAMHS thresholds have risen to the point where many children with SEND do not meet criteria for support, even where the clinical need is documented. Speech and language therapy, occupational therapy, physiotherapy — provision that is legally required is routinely not delivered.</p>
            <p>There are two patterns here.</p>
            <p>The first is provision that is <strong>written into Section G but never delivered</strong>, or delivered far below the level specified. This is a breach of the NHS's legal duty. It is enforceable.</p>
            <p>The second is provision that <strong>never makes it into Section G in the first place</strong>, often because the health contribution to the EHCP assessment was inadequate, or because the LA and the NHS each assumed the other would take responsibility.</p>
            <p>Both patterns are common. Both have solutions, though they require effort to pursue.</p>
          </div>
        </div>
      </section>

      {/* NHS legal duties */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="nhs-duties">The NHS's legal duties in the EHCP process</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>When a local authority carries out an EHCP needs assessment, NHS bodies — in practice, the local ICB and its commissioned services — have a legal duty to respond.</p>
            <p className="font-medium text-foreground">Specifically:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>The NHS must provide advice to the LA <strong>within six weeks</strong> of a request as part of an EHCP needs assessment. This is a legal requirement.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Once a plan is finalised, the relevant health commissioning body has a <strong>legal duty to provide what is specified in Section G</strong>.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Health professionals involved with the child may be asked to contribute advice. If asked, they have a <strong>legal responsibility to respond</strong>.</span></li>
            </ul>
            <p>If a health body fails to respond to an assessment request, the LA is not excused from completing the assessment. And if health provision is not being delivered as specified in Section G, <strong>the NHS body responsible is in breach of its statutory duty</strong>.</p>
          </div>
          <ConfidenceConfirmed>Children and Families Act 2014; Special Educational Needs and Disability Regulations 2014.</ConfidenceConfirmed>
        </div>
      </section>

      {/* What to do if not delivered */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="not-delivered">What to do if health provision is not being delivered</SectionHeading>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">If provision is specified in Section G and is not being provided, <strong>in this order</strong>:</p>
          <div className="space-y-4">
            {[
              { num: "1", title: "Put it in writing to the ICB", text: "Contact your local ICB's SEND team or complaints department. State specifically what provision is in Section G, what is not being delivered, and since when. Use the language of statutory duty, not simply a complaint about waiting times." },
              { num: "2", title: "Contact the LA as well", text: "The LA owns the EHC plan. While it cannot force the NHS to act, it has a duty to ensure the plan is being implemented. Put the LA on notice in writing that health provision is not being delivered." },
              { num: "3", title: "Request an urgent annual review", text: "If health provision is significantly failing, an annual review can result in the plan being amended. A review is also an opportunity to get the failure formally documented." },
              { num: "4", title: "Raise a formal complaint with the ICB", text: "Follow the ICB's complaints process. If you are not satisfied with the outcome, escalate to the Parliamentary and Health Service Ombudsman." },
              { num: "5", title: "Seek legal advice", text: "IPSEA can advise on whether the failure to deliver Section G provision is actionable. In some cases, judicial review has been used to challenge systemic failure to deliver health provision in EHC plans." },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{step.num}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            <ExtLink href="https://www.ipsea.org.uk">→ IPSEA — free independent legally-based advice</ExtLink>
            <ExtLink href="https://www.nhs.uk/using-the-nhs/about-the-nhs/how-to-complain-about-nhs-services/">→ NHS Complaints Procedure — how to complain about NHS services</ExtLink>
          </div>
        </div>
      </section>

      {/* Getting Section G right */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="getting-g-right">Getting Section G right in the first place</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p><strong>The most effective intervention is at the assessment stage</strong>, before the plan is finalised.</p>
            <p>When the LA requests health advice as part of the needs assessment, you can also request that specific health professionals are asked to contribute. If your child is under CAMHS, a paediatrician, a speech and language therapist, or any other health service, those services should be providing evidence to the assessment.</p>
            <p>If they have not been contacted, you can ask the LA directly why not and request that they are.</p>
            <p>When you receive the draft plan for comment, Section C and Section G deserve close scrutiny. Ask yourself:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Does Section C accurately describe my child's health needs as they affect their <strong>daily life and learning</strong>?</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Does Section G specify provision with <strong>enough detail to be enforceable</strong>? Vague commitments to "regular therapy input" are not enforceable. A named number of sessions per term, delivered by a named type of professional, is.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">?</span><span>Is there health provision my child needs that <strong>has not been included</strong>?</span></li>
            </ul>
            <p>You have the right to request amendments before the plan is finalised. <strong>Use it.</strong></p>
          </div>
          <ConfidenceConfirmed>Right to request amendments to a draft EHC plan under the Special Educational Needs and Disability Regulations 2014.</ConfidenceConfirmed>
        </div>
      </section>

      {/* CAMHS */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="camhs">CAMHS, thresholds, and the gap that harms most families</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>CAMHS — Child and Adolescent Mental Health Services — is where the gap between what the law provides and what families experience is <strong>at its widest</strong>.</p>
            <p>Thresholds for CAMHS referral have risen significantly over the past decade. Many children with SEND whose mental health is affected by their neurodivergence, by unmet need, by the pressure of masking, or by school-related anxiety <strong>will not meet current CAMHS criteria</strong>.</p>
            <p>This is a systemic problem, not an individual one. It has been documented repeatedly by parliamentary committees, inspectorates, and health charities.</p>
            <p>If your child has been refused CAMHS referral or has been waiting for over a year, <strong>you are not alone and you are not wrong to be concerned</strong>. Some options:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Ask the GP for a <strong>written record</strong> of the referral decision and the threshold applied.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Ask for a review of the referral decision if the child's presentation has changed or deteriorated.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Consider whether mental health needs should be documented in <strong>Section C and G</strong> of an EHC plan, regardless of CAMHS involvement.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Look at what your local ICB funds as <strong>alternatives to direct CAMHS provision</strong> — some areas fund voluntary sector services, emotional wellbeing services, or school-based mental health support.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Contact <strong>Young Minds</strong> or the <strong>Anna Freud Centre</strong> for guidance on navigating CAMHS referrals.</span></li>
            </ul>
          </div>

          <div className="mt-5 space-y-2">
            <ExtLink href="https://www.youngminds.org.uk">→ Young Minds — mental health support for young people and parents</ExtLink>
            <ExtLink href="https://www.annafreud.org">→ Anna Freud Centre — resources for families</ExtLink>
          </div>

          <ConfidenceUnknown>CAMHS thresholds are set locally and vary significantly by ICB. There is no national threshold standard.</ConfidenceUnknown>
        </div>
      </section>

      {/* NHS restructure */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SectionHeading id="nhs-restructure">NHS restructure and what it means for SEND families right now</SectionHeading>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>This section reflects the position as of February 2026. It will be updated as the restructure progresses.</span>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The NHS is in the middle of <strong>significant structural change</strong>.</p>
            <p>NHS England is being dissolved, with direct ministerial control returning to the Department of Health and Social Care. ICBs are being required to <strong>cut their running costs by 50%</strong>. The 10 Year Health Plan, published July 2025, sets out a long-term shift of NHS services towards neighbourhood and community settings.</p>
            <p><strong>None of this directly removes the legal duties that ICBs currently hold in relation to SEND and EHC plans.</strong> Those duties are set in the Children and Families Act 2014 and cannot be removed by an internal NHS restructure.</p>
            <p className="font-medium text-foreground">What it does mean in practice:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>ICBs are under <strong>significant financial pressure</strong>. Decisions about commissioning and service provision are being made in a context of cost reduction.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Staffing reductions within ICBs may affect the <strong>dedicated SEND functions</strong> some ICBs currently have.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>The shift to neighbourhood-based services may eventually change <strong>how health provision for children with SEND is commissioned</strong> and delivered — but this is not confirmed.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>The boundary between what ICBs retain and what is transferred elsewhere is <strong>still being worked out</strong>.</span></li>
            </ul>
            <p>If you are currently in the middle of an EHCP assessment or annual review, <strong>the restructure does not change your rights</strong>. The statutory duties remain. What may be less certain is who within the NHS is responsible for fulfilling them in your area over the coming year.</p>
          </div>

          <div className="rounded-lg bg-card border border-border p-4 flex items-start gap-3 mt-5">
            <CheckCircle2 className="w-5 h-5 text-status-confirmed flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-status-confirmed uppercase tracking-wider mb-1">Confirmed</p>
              <p className="text-sm text-muted-foreground leading-relaxed">NHS restructure is underway as described. Legal duties under the Children and Families Act 2014 remain in force.</p>
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 border border-border p-4 flex items-start gap-3 mt-2">
            <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Unconfirmed</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Impact on SEND statutory duties and commissioning arrangements is not yet clear.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended appeals */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SectionHeading id="extended-appeals">Extended appeals: taking health provision to tribunal</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>If you appeal to the SEND Tribunal over your child's EHC plan, you can — and in many cases should — <strong>include an extended appeal covering Sections C and G</strong>.</p>
            <p>An extended appeal allows the Tribunal to consider health and social care provision, not just educational provision. This is <strong>relatively underused by families</strong> but can be the most effective route where health provision has not been delivered or where Section G is inadequate.</p>
            <p>If you are considering an appeal and health provision is an issue, <strong>raise this with IPSEA or your legal representative at the earliest stage</strong>.</p>
          </div>
          <ConfidenceConfirmed>Children and Families Act 2014, Section 55; SEND Tribunal jurisdiction over extended appeals.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Find your ICB */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="find-icb">Finding your ICB and its SEND team</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>There are currently <strong>36 ICBs</strong> in England. Your ICB is the body responsible for NHS commissioning in your area, including health provision in EHC plans.</p>
            <p>Most ICBs have a dedicated SEND team or SEND lead. If yours does not list one publicly, contact the ICB's main enquiries line and ask who holds responsibility for <strong>SEND commissioning and EHC plan health provision</strong>.</p>
          </div>
          <div className="mt-4">
            <ExtLink href="https://www.nhs.uk/nhs-services/find-your-local-integrated-care-board/">→ Find your local ICB — NHS website</ExtLink>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="content-section py-6 pb-8">
        <div className="space-y-2">
          <Link to="/ehcps" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ The EHCP Guide — understanding every section of the plan</p>
          </Link>
          <Link to="/what-to-do-right-now" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ What to do right now — the full escalation guide</p>
          </Link>
          <Link to="/understanding-your-child/autism" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Understanding autism — sensory and therapy needs</p>
          </Link>
          <Link to="/understanding-your-child/adhd" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Understanding ADHD — medication, support, and what the system owes</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
