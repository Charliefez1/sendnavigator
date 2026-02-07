import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  StatusSection,
} from "@/components/templates";
import {
  HelpCircle,
  SlidersHorizontal,
  Layers,
  Shield,
  Scale,
  FileText,
  BookOpen,
  Coins,
  ShieldAlert,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UnknownDetail {
  question: string;
  icon: LucideIcon;
  research: string[];
  families: string[];
  leaked: string[];
  leakedRelation: string[];
}

const unknowns: UnknownDetail[] = [
  {
    icon: SlidersHorizontal,
    question: "Whether the legal threshold for plans will change",
    research: [
      "There is strong agreement across government and local authorities that Education, Health and Care Plan numbers have grown faster than the system can manage.",
      "Some reform discussions focus on reducing reliance on plans by improving earlier support.",
      "No confirmed proposal has been published to change the legal test for plans.",
    ],
    families: [
      "If thresholds changed in the future, some children who currently qualify might be supported in different ways.",
      "Until the law changes, the current legal test still applies.",
    ],
    leaked: [
      "Reports suggest the government is exploring limiting full Education, Health and Care Plans to children with the most complex needs.",
      "Some leaks describe narrowing eligibility so fewer children qualify for a statutory plan.",
    ],
    leakedRelation: [
      "These leaks directly link to concerns about thresholds changing.",
      "No decision has been made, but the idea of fewer plans being issued is part of leaked discussions.",
    ],
  },
  {
    icon: Layers,
    question: "Whether a tiered system will be introduced",
    research: [
      "Tiered models have been discussed as a way to organise support before a full plan is needed.",
      "Similar systems existed before 2014 and were removed because support was inconsistent and hard to enforce.",
      "No confirmed decision has been made to reintroduce a tiered system.",
    ],
    families: [
      "A tiered system could mean support starts earlier.",
      "It could also mean fewer automatic legal protections if lower tiers are not enforceable.",
    ],
    leaked: [
      "Multiple reports describe a tiered SEND system replacing the current single route to a plan.",
      "This includes lower levels of support below a full statutory plan.",
    ],
    leakedRelation: [
      "This question sits at the centre of leaked proposals.",
      "A tiered system is one of the most consistently reported leaked ideas, but remains unconfirmed.",
    ],
  },
  {
    icon: Shield,
    question: "Whether lower tier plans would be enforceable",
    research: [
      "Current enforceability only applies to Education, Health and Care Plans.",
      "There is no confirmed proposal that new lower tier plans would carry legal force.",
      "Legal and parent groups consistently raise enforceability as a key risk.",
    ],
    families: [
      "Enforceability is what allows parents to challenge when support is not delivered.",
      "Without it, families may have fewer ways to resolve problems.",
    ],
    leaked: [
      "Leaked models suggest lower tiers would not carry the same legal force as a full plan.",
      "Some reports describe education only plans or support passports without statutory backing.",
    ],
    leakedRelation: [
      "This is a key gap in leaked proposals.",
      "Leaks describe new support levels but do not confirm enforceability, raising concerns about accountability.",
    ],
  },
  {
    icon: Scale,
    question: "Whether appeal rights will change",
    research: [
      "Tribunal appeals have increased sharply, with families winning most cases.",
      "Government reports describe the system as adversarial and costly.",
      "No confirmed change to appeal rights has been published.",
    ],
    families: [
      "Appeals are often used when early decisions fail.",
      "Any change could affect how families challenge delays or refusals.",
    ],
    leaked: [
      "Leaks suggest the government wants to reduce the number of tribunal appeals.",
      "Some reports mention restricting appeal routes or adding barriers before tribunal access.",
    ],
    leakedRelation: [
      "These leaks directly relate to uncertainty about future appeal rights.",
      "No confirmed change exists, but appeals are clearly part of internal discussions.",
    ],
  },
  {
    icon: FileText,
    question: "Whether reforms would affect existing plans",
    research: [
      "Large scale reforms in the past have usually protected existing plans during transition.",
      "No confirmed proposal has said existing plans would be removed or rewritten.",
    ],
    families: [
      "Families with current plans need stability.",
      "Changes are more likely to affect new cases first, but this is not confirmed.",
    ],
    leaked: [
      "Leaks generally focus on future cases rather than existing plans.",
      "There has been no leaked proposal explicitly stating current plans would be removed.",
    ],
    leakedRelation: [
      "While not confirmed, leaks suggest reforms are aimed at new entrants to the system.",
      "This leaves uncertainty about how transitions would be managed.",
    ],
  },
  {
    icon: BookOpen,
    question: "Whether national standards would be law or guidance",
    research: [
      "National standards are widely discussed as a way to reduce postcode differences.",
      "It is not confirmed whether these would be statutory or advisory.",
      "Guidance without legal force has historically led to uneven delivery.",
    ],
    families: [
      "Legal standards are harder to ignore.",
      "Guidance relies more on local interpretation and capacity.",
    ],
    leaked: [
      "Leaked commentary suggests national standards may be used to define what schools must provide before a plan is considered.",
      "It is unclear from leaks whether these standards would be legally enforceable.",
    ],
    leakedRelation: [
      "Leaks reinforce uncertainty about the legal strength of future standards.",
      "This matters because standards without legal force may be applied inconsistently.",
    ],
  },
  {
    icon: Coins,
    question: "How funding changes would affect school responsibilities",
    research: [
      "There is concern that funding is too tightly linked to plans.",
      "Some discussions suggest more funding held by schools or local partnerships.",
      "No confirmed funding model has been published.",
    ],
    families: [
      "If schools hold more responsibility, support quality may vary.",
      "Clear accountability would be essential to avoid gaps.",
    ],
    leaked: [
      "Leaks suggest funding could move away from individual plans towards school level or pooled budgets.",
      "Schools may be expected to manage more support directly.",
    ],
    leakedRelation: [
      "This directly affects how responsibility and accountability could shift.",
      "Leaks raise concerns about variation between schools if funding is not tightly protected.",
    ],
  },
  {
    icon: ShieldAlert,
    question: "What protections would apply if support is agreed but not delivered",
    research: [
      "Currently, legal protection comes from plans, not informal agreements.",
      "There is no confirmed alternative enforcement mechanism outside plans.",
      "This is a major concern raised by parents and legal experts.",
    ],
    families: [
      "Without enforceable protection, families may struggle to challenge failures.",
      "This issue is central to trust in any reform.",
    ],
    leaked: [
      "Leaked models describe support agreements that sit outside a statutory plan.",
      "No clear enforcement mechanism is described in leaked information.",
    ],
    leakedRelation: [
      "This is one of the most significant gaps in leaked proposals.",
      "The lack of clarity about protection if support fails is a major concern raised by parents and legal experts.",
    ],
  },
  {
    icon: Clock,
    question: "How quickly major reforms would take effect",
    research: [
      "Major SEND reforms historically take several years to implement.",
      "Any legal change would require consultation and parliamentary approval.",
      "No confirmed implementation timetable exists.",
    ],
    families: [
      "Current rights and processes remain in place for now.",
      "Families should plan based on what exists today, not future proposals.",
    ],
    leaked: [
      "Media reporting suggests pressure to act quickly due to financial strain.",
      "No leaked timelines or confirmed implementation dates exist.",
    ],
    leakedRelation: [
      "Leaks suggest urgency, but not speed.",
      "Major legal reform would still require consultation and legislation.",
    ],
  },
];

export default function WhatWeDoNotKnow() {
  return (
    <Layout>
      <PageOrientation
        title="What we do not know yet"
        description="Key decisions about rights, thresholds, and protections that have not been made."
        lastUpdated="7th February 2026"
      />

      <SixtySecondSummary
        prose={
          <p>
            There are still major unanswered questions. We do not know whether the legal threshold for plans will change, whether any new support levels would be enforceable, or whether appeal rights would be altered. We do not know how funding changes would affect schools or how protections would work outside a plan. Research shows uncertainty itself causes anxiety and drives families to act early out of fear. The key point is that none of these decisions have been made yet, and nothing changes until law and guidance change.
          </p>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">
            Unknowns
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Each question below includes three layers of information: <strong className="text-foreground">what the research tells us so far</strong> based on published evidence, <strong className="text-foreground">why this matters for families</strong> in practical terms, and <strong className="text-foreground">what has been leaked</strong>, clearly marked as unconfirmed. This structure helps you see what is known, what is uncertain, and where speculation exists.
        </p>
        <Accordion type="multiple" className="space-y-3">
          {unknowns.map((item, index) => (
            <AccordionItem
              key={index}
              value={`unknown-${index}`}
              className="bg-card border border-border rounded-xl px-5 py-1"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline gap-3">
                <span className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">What the research tells us so far</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {item.research.map((point, i) => (
                      <li key={i} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Why this matters for families</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {item.families.map((point, i) => (
                      <li key={i} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-2 border-status-leaked bg-status-leaked/5 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-status-leaked bg-status-leaked/15 px-2 py-0.5 rounded">
                      Leaked
                    </span>
                    <span className="text-xs text-muted-foreground">Unconfirmed, treat with caution</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">What has been leaked</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                    {item.leaked.map((point, i) => (
                      <li key={i} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                  <h4 className="text-sm font-semibold text-foreground mb-2">How this relates to the question</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {item.leakedRelation.map((point, i) => (
                      <li key={i} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <StatusSection type="unconfirmed">
        <ul className="space-y-2">
          <li>All items on this page remain unconfirmed by definition.</li>
          <li>No official decisions have been published on these points.</li>
        </ul>
      </StatusSection>

      <StatusSection type="leaked">
        <ul className="space-y-2">
          <li>Leaks speculate on answers to some of these unknowns.</li>
          <li>These speculations are not confirmed and should not be treated as decisions.</li>
        </ul>
      </StatusSection>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            Research shows uncertainty itself causes anxiety and can drive families to seek plans earlier than needed. It is important to be clear that none of these questions have answers yet. Any change that affects rights would require consultation and legislation. Until then, decisions should still be made under current law, even if future reform is being discussed.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
