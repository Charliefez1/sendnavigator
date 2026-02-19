import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { CheckCircle2, HelpCircle, ExternalLink, AlertTriangle, ArrowRight } from "lucide-react";
import { WordFromRich } from "@/components/WordFromRich";

const anchors = [
  { id: "numbers", label: "The numbers" },
  { id: "what-exclusion-is", label: "What an exclusion is" },
  { id: "what-the-law-says", label: "What the law says" },
  { id: "suspended", label: "If your child is suspended" },
  { id: "permanently-excluded", label: "If permanently excluded" },
  { id: "informal", label: "Informal exclusions" },
  { id: "what-to-do", label: "What to do right now" },
  { id: "reform", label: "Reform debate" },
  { id: "language", label: "A note on language" },
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

export default function Exclusions() {
  return (
    <Layout>
      <SEOHead
        title="Exclusions and Your Child's Rights — SEND Navigator"
        description="Your rights when your SEND child is excluded from school. Suspension, permanent exclusion, informal exclusion, and what to do right now."
        path="/exclusions"
      />

      <header className="content-section py-8 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          Exclusions and Your Child's Rights
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Children with SEND are excluded from school at <strong>significantly higher rates</strong> than their peers. That is not a coincidence. It is a failure of the system to provide the support those children need.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mt-3">
          This page explains what exclusions are, <strong>what your rights are</strong>, and what you can do if your child is excluded or is at risk of being excluded.
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

      {/* The numbers */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="numbers">The numbers</SectionHeading>

          {/* Stat callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">5×</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">more likely to be <strong>permanently excluded</strong> if identified SEN</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">11.09</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">suspensions per 100 pupils on <strong>SEN Support</strong></p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">2.46</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">suspensions per 100 pupils <strong>without SEN</strong></p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Children with EHC plans are suspended at a rate of <strong>10.31 per 100 pupils</strong>.</p>
            <p>These figures are from DfE official statistics published November 2025, covering the autumn term 2024/25.</p>
            <p>The most common stated reason for exclusion is <strong>persistent disruptive behaviour</strong>. In many cases involving SEND children, that behaviour is a direct consequence of unmet need. The school's failure to meet the need precedes the behaviour. The behaviour is then used to justify exclusion.</p>
            <p><strong>That is the pattern. It is well documented.</strong> It matters because it shapes your rights.</p>
          </div>

          <ConfidenceConfirmed>DfE autumn term 2024/25 exclusion statistics, published 20 November 2025.</ConfidenceConfirmed>
        </div>
      </section>

      <WordFromRich>
        <p>Schools are under enormous pressure around SEND. Most teachers are doing more than their job description asks. I want to say that clearly, because this is not about blame and it is not about battle.</p>
        <p>But when behaviour keeps happening in the same setting, at the same time, in the same lesson, that pattern is information. It is your child telling you something. Your job is to become the expert on what that pattern means. What is happening just before things go wrong? What does the environment feel like for them at that point? Write it down. Dates, times, what came before. That evidence is not for a fight. It is for a conversation. It gives the teacher something real to work with. The more clearly you can describe your child's experience, the more you give the people around them the chance to make the adjustments that actually help.</p>
      </WordFromRich>

      {/* What an exclusion is */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="what-exclusion-is">What an exclusion is</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>There are two types.</p>
            <p><strong>Suspension</strong> (previously called fixed-term exclusion): the child is sent home for a set number of days. The maximum in a single year is <strong>45 days</strong>.</p>
            <p><strong>Permanent exclusion</strong>: the child is removed from the school roll entirely. They will not return to that school unless the exclusion is successfully challenged.</p>
            <p>There is also a category that does not appear in official statistics: <strong>illegal exclusions</strong>, sometimes called off-rolling or informal exclusions. These include:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being sent home informally <strong>without a formal exclusion being issued</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being told not to come in on certain days without a formal letter</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being placed in isolation <strong>repeatedly and without educational justification</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being put on a reduced timetable without your agreement</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being encouraged to leave or move to a different setting, or to home educate</span></li>
            </ul>
            <p><strong>None of these are lawful</strong> as substitutes for a formal exclusion process. If they are happening, you have the right to challenge them.</p>
          </div>
        </div>
      </section>

      {/* What the law says */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="what-the-law-says">What the law says</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The legal framework is clear. If your child has an <strong>EHC plan</strong>, the school must provide the support specified in that plan. Failure to do so, which then results in behaviour that leads to exclusion, is a <strong>failure of the school's legal duty</strong>, not a justification for exclusion.</p>
            <p>If your child does not have an EHC plan but has identified SEN, the school must still make <strong>reasonable adjustments</strong> and provide appropriate support under the Equality Act 2010. A disability-related behaviour cannot lawfully be treated as a disciplinary matter without reasonable adjustments first having been made.</p>
            <p>Schools also have duties under the <strong>Children and Families Act 2014</strong>. A child cannot be excluded simply because supporting them is difficult or costly.</p>
          </div>
          <ConfidenceConfirmed>Equality Act 2010, Children and Families Act 2014, DfE Suspension and Permanent Exclusion guidance (updated 2023).</ConfidenceConfirmed>
        </div>
      </section>

      {/* If suspended */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="suspended">If your child is suspended</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The school must tell you <strong>in writing on the day</strong> of the suspension. The letter must state:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>the reason for the suspension</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>the length of the suspension</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>your right to make representations to the governing body</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>where to get free, impartial advice</span></li>
            </ul>
            <p>For suspensions of <strong>five school days or fewer</strong> in a term, you can make representations to the governing body but they are not required to meet with you.</p>
            <p>For suspensions of <strong>more than five days</strong> in a term, the governing body must consider your representations before the pupil returns.</p>
            <p>For suspensions that would take your child <strong>over 15 days</strong> excluded in a term, the governing body must meet and consider reinstatement.</p>
            <p><strong>Your child must continue to receive full-time education from the sixth school day</strong> of any exclusion. The school is responsible for arranging this. If they fail to arrange it, they are breaking the law.</p>
          </div>
          <ConfidenceConfirmed>DfE Suspension and Permanent Exclusion guidance, September 2023.</ConfidenceConfirmed>
        </div>
      </section>

      {/* If permanently excluded */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="permanently-excluded">If your child is permanently excluded</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The headteacher must notify you <strong>in writing on the day</strong>. You have the right to make representations to the governing body. The governing body must meet within <strong>15 school days</strong> of receiving your representations.</p>
            <p>If the governing body upholds the exclusion, you have the right to request an <strong>Independent Review Panel (IRP)</strong>. You must do this within 15 school days of being notified of the governing body's decision.</p>
            <p className="font-medium text-foreground">The IRP can:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>uphold the exclusion</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>recommend the governing body reconsiders</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>direct the governing body to reconsider</span></li>
            </ul>
            <p>The IRP cannot reinstate your child directly. But if the governing body refuses to follow a direction to reconsider, the school can be required to make a payment to a ring-fenced fund.</p>
            <p><strong>If your child has SEND, you can request that a SEND expert sits on the IRP. This is your right. Use it.</strong></p>
          </div>
          <ConfidenceConfirmed>DfE Suspension and Permanent Exclusion guidance, September 2023.</ConfidenceConfirmed>
        </div>
      </section>

      {/* Informal exclusions — highlighted */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SectionHeading id="informal">The informal exclusion problem</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The most common form of exclusion for SEND children <strong>does not appear in any official data</strong>.</p>
            <p className="font-medium text-foreground">Informal exclusions include:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being sent home early <strong>"to avoid an incident"</strong> on a regular basis</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being asked not to come in on certain days without a formal letter</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being placed in isolation <strong>without educational justification</strong></span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being put on a <strong>reduced timetable without your agreement</strong> and a formal legal basis</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>being encouraged to leave or move to a different setting, or to home educate</span></li>
            </ul>
            <p><strong>None of these are lawful</strong> as substitutes for a formal exclusion process. If they are happening, you have the right to challenge them.</p>
            <p>Keep a <strong>dated record</strong> of every instance. Note who said what, when, and by what method. This is evidence. You will need it.</p>

            {/* Reduced timetable highlight */}
            <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-4 mt-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <p>A reduced timetable can only be in place legally if it has <strong>your written agreement</strong> and is subject to regular review. Even with your agreement, it cannot be indefinite. If your child's timetable has been reduced without your explicit written consent, <strong>that is unlawful</strong>.</p>
                </div>
              </div>
            </div>
          </div>
          <ConfidenceConfirmed>DfE Suspension and Permanent Exclusion guidance, September 2023; Equality Act 2010.</ConfidenceConfirmed>
        </div>
      </section>

      {/* What to do right now */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="what-to-do">What to do right now</SectionHeading>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">If your child has been excluded or is at risk of exclusion, <strong>in this order</strong>:</p>
          <div className="space-y-4">
            {[
              { num: "1", title: "Get the paperwork", text: "Ask for the formal exclusion letter in writing. Do not accept a phone call as the only notification." },
              { num: "2", title: "Note everything", text: "Date and time of the call or letter. What was said. Any previous incidents, particularly any pattern of informal exclusions or early collection requests." },
              { num: "3", title: "Contact IPSEA or SOS!SEN today", text: "Both provide free legal advice to parents of children with SEND. IPSEA has model letters you can download and adapt." },
              { num: "4", title: "Contact your local SENDIASS service", text: "Your local Information, Advice and Support Service is free, independent, and can help you navigate the process." },
              { num: "5", title: "Request an emergency annual review", text: "If your child has an EHC plan, an exclusion or pattern of behaviour risking exclusion is grounds for requesting a review of whether the current plan is meeting your child's needs." },
              { num: "6", title: "If informal exclusions are happening, write to the headteacher", text: "State the dates, what happened, and that you regard each instance as an unlawful exclusion. Keep a copy. Send by email so you have a record." },
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

          {/* Resource links */}
          <div className="mt-5 space-y-2">
            <a href="https://www.ipsea.org.uk/exclusions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">→ IPSEA — free independent legally-based advice</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            </a>
            <a href="https://sossen.org.uk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">→ SOS!SEN — free helpline, independent advice</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            </a>
            <Link to="/sendiass" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">→ Find your local SENDIASS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reform debate */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="reform">SEND, exclusion, and the reform debate</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The SEND and AP Improvement Plan explicitly connects the two. Children in Alternative Provision, including Pupil Referral Units, are <strong>disproportionately children with unidentified or unmet SEND</strong>. The system routes children with SEND out of mainstream education rather than investing in their support within it.</p>
            <p><strong>This is a design problem, not a behaviour problem.</strong></p>
            <p>The current reform debate includes proposals around mainstream inclusion, stronger duties on schools, and changes to the role of Alternative Provision. None of these are confirmed. The White Paper will address behaviour and inclusion alongside SEND.</p>
            <Link to="/state-of-send-2026" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm mt-2">
              → Track the reform progress <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <ConfidenceDiscussed>Inclusion in mainstream schools and the role of AP are active topics in reform discussions, but specific policy proposals are not yet confirmed.</ConfidenceDiscussed>
        </div>
      </section>

      {/* A note on language */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading id="language">A note on the language</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Schools often use the word "behaviour" in ways that <strong>obscure what is actually happening</strong>.</p>
            <p>"Persistent disruptive behaviour" is the most common reason given for exclusion. In many cases involving neurodivergent children, that behaviour is a direct communication of <strong>distress, dysregulation, or unmet need</strong>.</p>
            <p className="font-medium text-foreground">The child is not the problem. The gap between the child's needs and the support being provided is the problem.</p>
            <p>That distinction matters. It matters for how you approach meetings with the school. It matters for what you put in writing. It matters for any challenge you make to an exclusion.</p>
            <p>If the school is describing your child's SEND-related behaviour as a disciplinary matter without reference to their needs, <strong>that framing can be challenged</strong>. It is worth doing so, calmly and in writing.</p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="content-section py-6 pb-8">
        <div className="space-y-2">
          <Link to="/what-to-do-right-now" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ What to do right now — the full escalation guide</p>
          </Link>
          <Link to="/understanding-your-child/autism" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Understanding autism — behaviour patterns explained</p>
          </Link>
          <Link to="/understanding-your-child/adhd" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Understanding ADHD — regulation and the output gap</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
