import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { ExternalLink, FileText, Phone, MapPin, Scale, AlertTriangle, Clock, CheckCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SendiassSignpost } from "@/components/SendiassSignpost";
import { WordFromRich } from "@/components/WordFromRich";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function HelpCard({ name, description, url, icon: Icon }: {
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
    </a>
  );
}

function ResourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-sm"
    >
      → {label}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

const situations = [
  {
    id: "provision-not-delivered",
    title: "Situation 1: Provision in the EHCP is not being delivered",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          Your child has an EHCP. Section F sets out what support must be provided. That support is a <strong>legal duty</strong>. The LA cannot use budget pressure, staff shortages, or practical difficulties as a reason not to deliver it.
        </p>
        <ol className="list-decimal list-inside space-y-3 pl-1">
          <li><strong>Speak to the SENCo and headteacher.</strong> Keep a written record of the conversation, including the date.</li>
          <li><strong>If nothing changes within one to two weeks,</strong> write formally to the LA. IPSEA has a model letter specifically for this situation.</li>
          <li><strong>If the LA does not resolve it,</strong> escalate to the Local Government and Social Care Ombudsman (LGSCO). The LGSCO can investigate and require the LA to act.</li>
          <li><strong>If the EHCP itself is not specific enough to enforce,</strong> request an early annual review. Use the review to strengthen the wording in Section F.</li>
        </ol>
        <div className="space-y-2 pt-2">
          <ResourceLink label="IPSEA Model Letter 6: provision not being made" url="https://www.ipsea.org.uk/complaining-when-the-provision-in-an-ehc-plan-is-not-being-made-model-letter-6" />
          <br />
          <ResourceLink label="LGSCO SEND fact sheet" url="https://www.lgo.org.uk/make-a-complaint/fact-sheets/education/special-educational-needs" />
        </div>
      </div>
    ),
  },
  {
    id: "refused-assessment",
    title: "Situation 2: The LA has refused to assess your child for an EHCP",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>You requested an EHC needs assessment. The LA said no.</p>
        <p>You have the <strong>right to appeal</strong> that decision to the SEND Tribunal.</p>
        <p>
          Before you can appeal, you must contact a mediation adviser and get a mediation certificate. You do not have to go to mediation, but you must contact the adviser and obtain the certificate first. This does not affect your right to appeal.
        </p>
        <p>You have <strong>two months</strong> from the date of the LA's decision to appeal.</p>
        <div className="space-y-2 pt-2">
          <ResourceLink label="How to appeal to the SEND Tribunal (GOV.UK)" url="https://www.gov.uk/appeal-ehc-plan-decision" />
          <br />
          <ResourceLink label="IPSEA guidance on appealing a refusal to assess" url="https://www.ipsea.org.uk/appeal-refusal-to-assess" />
        </div>
      </div>
    ),
  },
  {
    id: "taking-too-long",
    title: "Situation 3: The LA is taking too long",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>The law sets clear timescales.</p>
        <p>
          From the date the LA agrees to assess, the entire process (assessment, draft plan, final plan) must be completed within <strong>20 weeks</strong>.
        </p>
        <p>If deadlines are being missed, write to the LA formally. IPSEA has a model letter for this too.</p>
        <p>If the complaint to the LA is not resolved, escalate to the LGSCO.</p>
        <div className="space-y-2 pt-2">
          <ResourceLink label="IPSEA Model Letter 10: LA not sending draft or final plan on time" url="https://www.ipsea.org.uk/complaining-when-a-local-authority-does-not-send-a-draft-or-final-education-health-and-care-plan-on-time-model-letter-10" />
        </div>
      </div>
    ),
  },
  {
    id: "disagree-with-ehcp",
    title: "Situation 4: You disagree with what is in the EHCP",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          If you disagree with the description of your child's needs (Section B), the provision set out (Section F), or the school named, you can <strong>appeal to the SEND Tribunal</strong>.
        </p>
        <p>
          You must contact a mediation adviser first and obtain a certificate before lodging an appeal. Mediation itself is optional and free. It does not affect your right to appeal.
        </p>
        <div className="space-y-2 pt-2">
          <ResourceLink label="GOV.UK: appeal an EHCP decision" url="https://www.gov.uk/appeal-ehc-plan-decision" />
          <br />
          <ResourceLink label="IPSEA: disagreeing with the contents of an EHCP" url="https://www.ipsea.org.uk/disagreeing-with-the-contents-of-an-ehcp" />
        </div>
      </div>
    ),
  },
  {
    id: "annual-review-missing",
    title: "Situation 5: Annual review has not happened",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>The LA must review your child's EHCP <strong>at least once every 12 months</strong>.</p>
        <p>If a review has not taken place, write to the LA asking them to schedule one within a reasonable timeframe.</p>
        <p>
          If you have concerns about your child's needs changing significantly, you can request an early review at any point. You do not have to wait for the annual cycle.
        </p>
        <div className="space-y-2 pt-2">
          <ResourceLink label="IPSEA: annual reviews" url="https://www.ipsea.org.uk/annual-reviews" />
        </div>
      </div>
    ),
  },
];

export default function WhatToDoRightNow() {
  return (
    <Layout>
      <SEOHead
        title="What To Do Right Now"
        description="Practical steps if your child is not getting the SEND support they need today. Based on current law and established process."
        path="/what-to-do-right-now"
      />
      <PageOrientation
        title="What to do right now"
        description="This page is for parents whose child is not getting the support they need today. Not next year. Now."
      />

      {/* Consultation note */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-status-confirmed/30 bg-status-confirmed/5 p-5">
          <h2 className="text-sm font-semibold text-foreground mb-2">The consultation is now open</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>The Schools White Paper was published on 23 February 2026. A formal 12-week public consultation is now open.</p>
            <p>
              If you want to respond, go to the{" "}
              <Link to="/have-your-say" className="text-primary hover:underline font-medium">Have Your Say</Link>{" "}
              page for guidance on how to write a response that carries weight.
            </p>
            <p><strong>Your existing rights have not changed. Everything on this page still applies.</strong></p>
          </div>
        </div>
      </section>

      <LatestUpdatesStream />

      {/* Reality Bites callout */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-foreground/15 bg-foreground/5 p-5">
          <p className="text-sm font-semibold text-foreground mb-2">Before you make the call or write the letter.</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Knowing your rights matters. So does <strong>knowing your child</strong>. The parents who get the best outcomes are prepared, specific, and evidence-led. Not just legally informed.
          </p>
          <Link to="/what-we-owe-our-children" className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-sm">
            → What we owe our children
          </Link>
        </div>
      </section>

      {/* Confidence banner */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">CONFIRMED: current law, established process</p>
              <p className="text-xs text-muted-foreground mt-0.5">The law has not changed. Your rights are enforceable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is responsible */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold text-foreground">First: know who is responsible</h2>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>The <strong>local authority (LA)</strong> is legally responsible for your child's EHCP.</p>
            <p>Not the school. Not the SENCo. <strong>The LA.</strong></p>
            <p>If provision is not being delivered, the complaint goes to the LA, not the school. You can raise it with the school first, but do not stop there if nothing changes.</p>
          </div>
        </div>
      </section>

      <WordFromRich>
        <p>I want to say something about how to approach this, because it matters as much as any legal right.</p>
        <p>The local authorities, schools, and teachers navigating SEND are under enormous pressure. Most of them are doing their jobs and more. They are not the enemy. But they are stretched. Your child is one name on a very long list. I know this because I was the parent standing outside offices, writing letters at midnight, calling and emailing until I was seen.</p>
        <p>The families who get the best outcomes are not always the ones who push hardest. They are the ones who are most prepared. Who know their child. Who bring clear evidence into conversations rather than frustration. Be assertive where you need to be. Put things in writing. Know your rights. But bring the school and the LA with you if you possibly can, rather than setting yourself against them. That approach will get your child further.</p>
      </WordFromRich>

      {/* Situations accordion */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">What is going wrong?</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {situations.map((s) => (
              <AccordionItem key={s.id} value={s.id} className="border border-border rounded-xl px-4 data-[state=open]:bg-muted/30">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                  {s.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  {s.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Paper trail */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold text-foreground">Keep a paper trail</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p className="mb-3">Whatever situation you are in, keep written records.</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Date every phone call and note what was said</li>
              <li>Follow up verbal conversations with a brief email confirming what was agreed</li>
              <li>Keep copies of all letters and emails sent and received</li>
              <li>Note dates when deadlines were missed</li>
            </ul>
            <p className="mt-3 font-medium text-foreground">This record matters if you go to tribunal or the ombudsman.</p>
          </div>
        </div>
      </section>

      {/* Where to get help */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">Where to get help right now</h2>
          <p className="text-sm text-muted-foreground mb-4">These organisations provide free advice and support.</p>
          <div className="space-y-3">
            <HelpCard
              name="IPSEA (Independent Provider of Special Education Advice)"
              description="Free legally based advice. Model letters. Tribunal support."
              url="https://www.ipsea.org.uk"
              icon={Scale}
            />
            <HelpCard
              name="SOS!SEN"
              description="Free telephone helpline. Tribunal support."
              url="https://www.sossen.org.uk"
              icon={Phone}
            />
            <HelpCard
              name="Your local SENDIASS"
              description="Every local authority is legally required to fund a free, impartial Information, Advice and Support Service. Most parents have never heard of it."
              url="https://councilfordisabledchildren.org.uk/iassnetwork/find-your-local-iass"
              icon={MapPin}
            />
          </div>
        </div>
      </section>

      {/* SENDIASS signpost */}
      <section className="content-section py-4">
        <SendiassSignpost />
      </section>

      {/* Reform note */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-1">A note on reform</p>
              <p>Everything on this page is based on the law as it stands today. The Children and Families Act 2014 has not been amended. EHCPs remain legally enforceable. Your right to appeal to the SEND Tribunal has not changed.</p>
              <p className="mt-2">If the law changes, this page will be updated and the change will be clearly labelled.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
