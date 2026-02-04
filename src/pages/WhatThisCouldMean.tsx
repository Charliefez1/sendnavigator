import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  ReadingDepthControl,
  AudienceSections,
  UnknownSection,
  WatchNextSection,
} from "@/components/templates";

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
              A change that simplifies processes for local authorities might create 
              uncertainty for families, or vice versa.
            </p>
            <p>
              We present possible implications without making predictions. The actual 
              impact of any change depends on how it is implemented and individual 
              circumstances.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>Why we focus on possibilities</h3>
            <p>
              Policy changes often work differently in practice than expected. Local 
              implementation varies. Individual circumstances matter. For these reasons, 
              we describe what could happen rather than what will happen.
            </p>
            
            <h3>Limitations of this section</h3>
            <p>
              This section cannot replace specialist advice about your specific situation. 
              If you need guidance about your child's education or your school's obligations, 
              please seek appropriate professional support.
            </p>
          </>
        }
      />

      <AudienceSections
        parents={
          <>
            <p>
              This section will explain what confirmed and proposed changes could mean 
              for families navigating SEND support. Content is being developed based on 
              the latest confirmed information.
            </p>
            <p>
              We will cover topics such as assessment processes, plan content, review 
              arrangements, and routes for resolving disagreements.
            </p>
          </>
        }
        children={
          <>
            <p>
              This section will explain what changes could mean for the day-to-day 
              experience of children and young people with SEND.
            </p>
            <p>
              We will focus on educational support, transitions between settings, and 
              preparation for adulthood where relevant.
            </p>
          </>
        }
        schools={
          <>
            <p>
              This section will cover implications for SENCOs, class teachers, school 
              leaders, and support staff.
            </p>
            <p>
              Topics may include identification responsibilities, provision mapping, 
              working with external agencies, and managing resources.
            </p>
          </>
        }
        authorities={
          <>
            <p>
              This section will address implications for local authority SEND services, 
              commissioning, and partnership working.
            </p>
            <p>
              We will consider assessment duties, provision sufficiency, and 
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
