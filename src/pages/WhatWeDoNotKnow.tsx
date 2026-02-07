import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  StatusSection,
} from "@/components/templates";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UnknownDetail {
  question: string;
  research: string[];
  families: string[];
}

const unknowns: UnknownDetail[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    question: "Whether reforms would affect existing plans",
    research: [
      "Large scale reforms in the past have usually protected existing plans during transition.",
      "No confirmed proposal has said existing plans would be removed or rewritten.",
    ],
    families: [
      "Families with current plans need stability.",
      "Changes are more likely to affect new cases first, but this is not confirmed.",
    ],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
        <Accordion type="multiple" className="space-y-3">
          {unknowns.map((item, index) => (
            <AccordionItem
              key={index}
              value={`unknown-${index}`}
              className="bg-card border border-border rounded-xl px-5 py-1"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline gap-3">
                <span className="flex items-center gap-3">
                  <span className="text-muted-foreground flex-shrink-0">?</span>
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
