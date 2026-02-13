import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatHappensNext() {
  return (
    <Layout>
      <SEOHead title="What happens next and when for SEND reform" description="The path from now to change in SEND provision in England." path="/what-happens-next" />
      <PageOrientation
        title="What happens next and when: the path from now to change"
        description="Understanding the stages between discussion and implementation."
        lastUpdated="14th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Nothing changes suddenly.
            </p>
            <p>
              SEND reform moves slowly because it has to. Any change that affects children's rights must pass through consultation, public scrutiny, Parliament, and then a transition period.
            </p>
            <p>
              Between now and any new system taking effect, current law stays in place. EHCPs remain valid. Rights remain enforceable. Local authorities must still follow existing duties.
            </p>
            <p>
              The next stage is not implementation. It is formal proposals, consultation, and challenge. Parents are not behind. This is not the moment where you have missed your chance.
            </p>
          </div>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          How will this impact children and parents
        </h2>
        <div className="prose-calm space-y-3">
          <p>
            For most families, the next phase changes very little day to day.
          </p>
          <p>
            Your child's support should continue as it is now. Schools and local authorities are still bound by the same rules. Appeals still exist. Assessments still follow current law.
          </p>
          <p>
            The impact at this stage is informational and emotional rather than practical. There will be more discussion, more media coverage, and more opinion. That can be tiring, but it also creates space for parent voices to influence what comes next.
          </p>
          <p>
            This is a period for awareness, not alarm.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Statistics and facts
        </h2>
        <div className="prose-calm space-y-3">
          <p>From the checked research set:</p>
          <ul className="space-y-2">
            <li>No SEND reform legislation has been introduced as of mid-February 2026.</li>
            <li>A SEND focused White Paper is expected later in 2026, not yet published.</li>
            <li>Any legislative change would take at least one Parliamentary session to pass.</li>
            <li>Implementation would require phased transition, likely extending into 2027 or beyond.</li>
            <li>Existing EHCPs cannot be withdrawn without lawful process.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What the next stages actually look like
        </h2>
        <div className="prose-calm space-y-6">

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Stage 1: formal proposals</h3>
            <p>
              The next concrete step is a published White Paper or equivalent policy document.
            </p>
            <p>This matters because it:</p>
            <ul className="space-y-2">
              <li>Sets out what government is actually proposing.</li>
              <li>Explains the rationale, not just the headline.</li>
              <li>Includes options, not final decisions.</li>
              <li>Signals which ideas have been dropped.</li>
            </ul>
            <p>
              Until this exists, everything else remains discussion.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Stage 2: consultation</h3>
            <p>
              Once proposals are published, consultation follows.
            </p>
            <p>This is where:</p>
            <ul className="space-y-2">
              <li>Parents, carers, young people, schools, councils, and charities respond.</li>
              <li>Legal and practical flaws are challenged.</li>
              <li>Equality and rights impacts are examined.</li>
              <li>Pressure is applied where proposals risk harm.</li>
            </ul>
            <p>
              Consultation responses have already influenced SEND policy in the past. This stage is where parent voice carries weight.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Stage 3: legislation</h3>
            <p>
              If government proceeds, changes affecting rights require legislation.
            </p>
            <p>This involves:</p>
            <ul className="space-y-2">
              <li>Parliamentary debate.</li>
              <li>Committee scrutiny.</li>
              <li>Amendments.</li>
              <li>Voting.</li>
            </ul>
            <p>
              This stage takes time. It is public. It is contested. Nothing happens quietly here.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Stage 4: transition planning</h3>
            <p>
              Even once legislation passes, systems do not flip overnight.
            </p>
            <p>Transition planning typically includes:</p>
            <ul className="space-y-2">
              <li>Protection for children with existing EHCPs.</li>
              <li>Phased introduction for new applicants.</li>
              <li>Training and system changes for schools and councils.</li>
              <li>Guidance and timelines.</li>
            </ul>
            <p>
              This is where safeguards usually appear.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">What this means practically for parents now</h3>
            <p>Right now, the most important things are:</p>
            <ul className="space-y-2">
              <li>Focus on your child's needs as they are today.</li>
              <li>Use existing rights and processes when support is not in place.</li>
              <li>Stay informed, not consumed.</li>
              <li>Choose when and how to engage with the wider debate.</li>
            </ul>
            <p>
              You are not expected to prepare for a system that does not yet exist.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">A grounded closing note</h3>
            <p>
              SEND reform is happening because the current system is failing too many families. That does not mean the solution will automatically be better. It does mean there is space for challenge, shaping, and accountability.
            </p>
            <p>
              Parents are not an afterthought in this process. They are central to it.
            </p>
            <p>
              The most important truth to hold is this: your child's rights do not expire while policy is being discussed.
            </p>
          </div>

        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
