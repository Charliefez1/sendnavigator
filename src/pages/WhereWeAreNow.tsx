import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  ReadingDepthControl,
  InformationLayers,
  PracticalImplications,
  UnknownSection,
  WatchNextSection,
} from "@/components/templates";

export default function WhereWeAreNow() {
  const summaryPoints = [
    "The current SEND system in England is based on the Children and Families Act 2014.",
    "Education, Health and Care Plans (EHCPs) are the main legal document for children with more complex needs.",
    "SEN Support is the first level of help available in schools without an EHCP.",
    "Local authorities have a legal duty to identify and assess children with SEND.",
    "The system is under significant pressure, with rising demand and stretched resources.",
    "Waiting times for assessments and provision vary widely across the country.",
  ];

  const unknownQuestions = [
    "How will current pressures on the system be addressed in the short term?",
    "What will happen to children currently awaiting assessment?",
  ];

  const watchItems = [
    {
      title: "Government response to SEND system pressures",
      description: "Expected updates on funding and capacity",
      type: "decision" as const,
    },
  ];

  return (
    <Layout>
      <PageOrientation
        title="Where we are now"
        description="The current SEND system in England as it operates today."
      />

      <SixtySecondSummary points={summaryPoints} />

      <ReadingDepthControl
        keyPoints={
          <>
            <p>
              The SEND system in England is built on the Children and Families Act 2014. 
              This law created Education, Health and Care Plans (EHCPs) as the main way to 
              set out support for children and young people with more complex needs.
            </p>
            <p>
              Before an EHCP, schools provide SEN Support. This is help within the classroom 
              and school, without needing a formal plan.
            </p>
            <p>
              Local authorities must identify children who may have SEND and assess their needs 
              when asked. However, the system is under pressure, with long waits in many areas.
            </p>
          </>
        }
        moreDetail={
          <>
            <h3>EHCPs explained</h3>
            <p>
              An Education, Health and Care Plan is a legal document. It describes a child's 
              needs and the support they should receive. Local authorities must provide what 
              is written in an EHCP.
            </p>
            <p>
              EHCPs cover education, health, and social care needs. They are reviewed annually 
              and can continue until age 25 if the young person remains in education or training.
            </p>
            
            <h3>SEN Support in schools</h3>
            <p>
              SEN Support is the first stage of help. Schools use their own resources to provide 
              extra support. This might include small group work, different teaching approaches, 
              or equipment.
            </p>
            <p>
              Schools should follow a cycle called Assess, Plan, Do, Review. They work with 
              parents and may involve outside specialists.
            </p>

            <h3>Current pressures</h3>
            <p>
              Demand for EHCPs has risen significantly since 2014. Many local authorities 
              struggle to complete assessments within the 20-week legal timeframe. 
            </p>
            <p>
              SEND Tribunal appeals have increased, suggesting disagreements between families 
              and local authorities are common.
            </p>
          </>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <p>
              The Children and Families Act 2014 remains the primary legislation governing SEND 
              in England. The SEND Code of Practice (2015) provides statutory guidance.
            </p>
            <p>
              Local authorities must complete EHCP assessments within 20 weeks. Parents have 
              the right to request an assessment and to appeal decisions to the SEND Tribunal.
            </p>
          </>
        }
        discussed={
          <>
            <p>
              There is ongoing discussion about the sustainability of the current system. 
              Reports from various bodies have highlighted funding pressures and capacity issues.
            </p>
          </>
        }
        unconfirmedEmpty="This section focuses on current confirmed arrangements only."
      />

      <PracticalImplications>
        <p>
          For families navigating the current system, this could mean:
        </p>
        <ul>
          <li>Wait times for EHCP assessments may be longer than the legal timeframe in some areas</li>
          <li>Schools may have varying levels of capacity to provide SEN Support</li>
          <li>Families may need to understand their legal rights to navigate the process effectively</li>
        </ul>
      </PracticalImplications>

      <UnknownSection questions={unknownQuestions} />

      <WatchNextSection items={watchItems} />

      <div className="content-section pb-16" />
    </Layout>
  );
}
