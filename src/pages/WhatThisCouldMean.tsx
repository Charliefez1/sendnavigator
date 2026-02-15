import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  ReadingDepthControl,
  AudienceSections,
  UnknownSection,
  WatchNextSection,
} from "@/components/templates";
import { ComparisonColumns } from "@/components/templates/DataVisuals";

export default function WhatThisCouldMean() {
  const summaryPoints = [
    "This section translates policy information into possible practical implications.",
    "We focus on what changes could mean, not predictions about what will happen.",
    "Implications vary significantly depending on individual circumstances.",
    "We cover perspectives for parents, children, schools, and local authorities.",
    "Where uncertainty exists, we state it clearly.",
    "This is not advice. Seek specialist support for individual situations.",
  ];

  const unknownQuestions = [
    "How will any confirmed changes be implemented in practice?",
    "What support will be available during any transition periods?",
    "How will variations between local authorities be addressed?",
  ];

  const watchItems = [
    {
      title: "Implementation guidance for confirmed changes",
      description: "Official guidance typically clarifies practical implications",
      type: "publication" as const,
    },
  ];

  return (
    <Layout>
      <PageOrientation
        title="What this could mean"
        description="Practical implications of confirmed and proposed changes for different groups."
      />

      <SixtySecondSummary points={summaryPoints} />

      <ReadingDepthControl
        keyPoints={
          <>
            <p>
              Changes to SEND policy may affect different groups in different ways. 
              <strong>A change that simplifies processes for local authorities might create 
              uncertainty for families</strong>, or vice versa.
            </p>
            <p>
              We present possible implications without making predictions. <strong>The actual 
              impact of any change depends on how it is implemented</strong> and individual 
              circumstances.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>Why we focus on possibilities</h3>
            <p>
              Policy changes often <strong>work differently in practice than expected</strong>. Local 
              implementation varies. Individual circumstances matter. For these reasons, 
              we describe what could happen rather than what will happen.
            </p>
            
            <h3>Limitations of this section</h3>
            <p>
              This section <strong>cannot replace specialist advice</strong> about your specific situation. 
              If you need guidance about your child's education or your school's obligations, 
              please seek appropriate professional support.
            </p>
          </>
        }
      />

      {/* Before/after comparison */}
      <section className="content-section py-8">
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">Current system vs proposed direction</h2>
        <ComparisonColumns
          leftTitle="Current system"
          rightTitle="Proposed direction"
          leftItems={[
            { label: "EHCP is the main route to enforceable support" },
            { label: "Each council sets its own thresholds" },
            { label: "Schools funded per EHCP, not per need" },
            { label: "Councils carry full financial risk" },
            { label: "Mediation optional before tribunal" },
          ]}
          rightItems={[
            { label: "Tiered support: universal, targeted, specialist, then EHCP" },
            { label: "National standards define what every school must offer" },
            { label: "School clusters pool budgets for specialists" },
            { label: "Central government takes over SEND spending from 2028" },
            { label: "Possible mandatory mediation before appeal" },
          ]}
          leftColor="confirmed"
          rightColor="discussed"
        />
      </section>

      <AudienceSections
        parents={
          <>
            <p>
              This section will explain what confirmed and proposed changes could mean 
              for <strong>families navigating SEND support</strong>. Content is being developed based on 
              the latest confirmed information.
            </p>
            <p>
              We will cover topics such as <strong>assessment processes, plan content, review 
              arrangements, and routes for resolving disagreements</strong>.
            </p>
          </>
        }
        children={
          <>
            <p>
              This section will explain what changes could mean for the <strong>day-to-day 
              experience of children and young people</strong> with SEND.
            </p>
            <p>
              We will focus on <strong>educational support, transitions between settings</strong>, and 
              preparation for adulthood where relevant.
            </p>
          </>
        }
        schools={
          <>
            <p>
              This section will cover implications for <strong>SENCOs, class teachers, school 
              leaders, and support staff</strong>.
            </p>
            <p>
              Topics may include <strong>identification responsibilities, provision mapping</strong>, 
              working with external agencies, and managing resources.
            </p>
          </>
        }
        authorities={
          <>
            <p>
              This section will address implications for <strong>local authority SEND services, 
              commissioning, and partnership working</strong>.
            </p>
            <p>
              We will consider <strong>assessment duties, provision sufficiency</strong>, and 
              accountability arrangements.
            </p>
          </>
        }
      />

      <UnknownSection questions={unknownQuestions} />

      <WatchNextSection items={watchItems} />

      <div className="content-section pb-16" />
    </Layout>
  );
}
