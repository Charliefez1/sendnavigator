import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  UnknownSection,
} from "@/components/templates";
import { HelpCircle } from "lucide-react";

export default function WhatWeDoNotKnow() {
  const unknownQuestions = [
    "Whether the legal threshold for plans will change.",
    "Whether a tiered system will be introduced.",
    "Whether lower tier plans would be enforceable.",
    "Whether appeal rights will change.",
    "Whether reforms would affect existing plans.",
    "Whether national standards would be law or guidance.",
    "How funding changes would affect school responsibilities.",
    "What protections would apply if support is agreed but not delivered.",
    "How quickly major reforms would take effect.",
  ];

  return (
    <Layout>
      <PageOrientation
        title="What we do not know yet"
        description="Key decisions about rights, thresholds, and protections that have not been made."
        lastUpdated="4th February 2026"
      />

      <SixtySecondSummary
        prose={
          <p>
            Key decisions about rights, thresholds, and protections have not been made.
          </p>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">
            Unknowns
          </h2>
        </div>
        <ul className="space-y-2">
          {unknownQuestions.map((question, index) => (
            <li key={index} className="flex gap-3 text-foreground">
              <span className="text-muted-foreground flex-shrink-0">?</span>
              <span className="leading-relaxed">{question}</span>
            </li>
          ))}
        </ul>
      </section>

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
