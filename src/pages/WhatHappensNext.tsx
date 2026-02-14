import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
  OnThisPage,
  ContentBox,
} from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";
import { Users, BarChart3, FileText, MessageSquare, Landmark, ArrowRightLeft, CheckCircle, Anchor } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "stage1", icon: FileText, title: "Stage 1: formal proposals" },
  { id: "stage2", icon: MessageSquare, title: "Stage 2: consultation" },
  { id: "stage3", icon: Landmark, title: "Stage 3: legislation" },
  { id: "stage4", icon: ArrowRightLeft, title: "Stage 4: transition planning" },
  { id: "practical", icon: CheckCircle, title: "What this means practically for parents now" },
  { id: "closing", icon: Anchor, title: "A grounded closing note" },
];

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
              <strong>Nothing changes suddenly.</strong>
            </p>
            <p>
              SEND reform moves slowly because it has to. <strong>Any change that affects children's rights must pass through consultation, public scrutiny, Parliament, and then a transition period.</strong>
            </p>
            <p>
              Between now and any new system taking effect, <strong>current law stays in place</strong>. EHCPs remain valid. Rights remain enforceable. Local authorities must still follow existing duties.
            </p>
            <p>
              The next stage is not implementation. It is formal proposals, consultation, and challenge. <strong>Parents are not behind. This is not the moment where you have missed your chance.</strong>
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            For most families, <strong>the next phase changes very little day to day</strong>.
          </p>
          <p>
            Your child's support should continue as it is now. <strong>Schools and local authorities are still bound by the same rules.</strong> Appeals still exist. Assessments still follow current law.
          </p>
          <p>
            The impact at this stage is informational and emotional rather than practical. There will be more discussion, more media coverage, and more opinion. That can be tiring, but <strong>it also creates space for parent voices to influence what comes next</strong>.
          </p>
          <p>
            <strong>This is a period for awareness, not alarm.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-3">
          <p>Here is what we know about the timeline:</p>
          <ul className="space-y-2">
            <li><strong>No SEND reform legislation has been introduced</strong> as of mid-February 2026.</li>
            <li>A SEND focused <strong>White Paper is expected in early 2026</strong>, not yet published. It was originally expected in autumn 2025 but was delayed for further consultation.</li>
            <li>Councils must submit <strong>local SEND reform plans by autumn 2026</strong> to qualify for the deficit bailout.</li>
            <li>All local areas will be inspected under the <strong>new Ofsted and CQC SEND framework by 2027</strong>.</li>
            <li>From <strong>2028 to 2029, central government takes full responsibility</strong> for SEND spending growth.</li>
            <li>Leaked reports (unconfirmed) suggest <strong>full implementation of major reforms might not happen until 2029 to 2030</strong>.</li>
            <li>Any legislative change would take <strong>at least one Parliamentary session to pass</strong>.</li>
            <li><strong>Existing EHCPs cannot be withdrawn without lawful process.</strong> Any transition is expected to be phased gradually.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="stage1" icon={FileText} title="Stage 1: formal proposals">
        <div className="space-y-3">
          <p>
            The next concrete step is <strong>a published White Paper or equivalent policy document</strong>.
          </p>
          <p>This matters because it:</p>
          <ul className="space-y-2">
            <li>Sets out what government is actually proposing.</li>
            <li>Explains the rationale, not just the headline.</li>
            <li>Includes options, not final decisions.</li>
            <li>Signals which ideas have been dropped.</li>
          </ul>
          <p>
            <strong>Until this exists, everything else remains discussion.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="stage2" icon={MessageSquare} title="Stage 2: consultation">
        <div className="space-y-3">
          <p>
            Once proposals are published, <strong>consultation follows</strong>.
          </p>
          <p>This is where:</p>
          <ul className="space-y-2">
            <li>Parents, carers, young people, schools, councils, and charities respond.</li>
            <li>Legal and practical flaws are challenged.</li>
            <li>Equality and rights impacts are examined.</li>
            <li>Pressure is applied where proposals risk harm.</li>
          </ul>
          <p>
            Consultation responses have already influenced SEND policy in the past. <strong>This stage is where parent voice carries weight.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="stage3" icon={Landmark} title="Stage 3: legislation">
        <div className="space-y-3">
          <p>
            If government proceeds, <strong>changes affecting rights require legislation</strong>.
          </p>
          <p>This involves:</p>
          <ul className="space-y-2">
            <li>Parliamentary debate.</li>
            <li>Committee scrutiny.</li>
            <li>Amendments.</li>
            <li>Voting.</li>
          </ul>
          <p>
            This stage takes time. It is public. It is contested. <strong>Nothing happens quietly here.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="stage4" icon={ArrowRightLeft} title="Stage 4: transition planning">
        <div className="space-y-3">
          <p>
            Even once legislation passes, <strong>systems do not flip overnight</strong>.
          </p>
          <p>Transition planning typically includes:</p>
          <ul className="space-y-2">
            <li><strong>Protection for children with existing EHCPs.</strong></li>
            <li>Phased introduction for new applicants.</li>
            <li>Training and system changes for schools and councils.</li>
            <li>Guidance and timelines.</li>
          </ul>
          <p>
            <strong>This is where safeguards usually appear.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="practical" icon={CheckCircle} title="What this means practically for parents now">
        <div className="space-y-3">
          <p><strong>Right now, the most important things are:</strong></p>
          <ul className="space-y-2">
            <li><strong>Focus on your child's needs as they are today.</strong></li>
            <li>Use existing rights and processes when support is not in place.</li>
            <li>Stay informed, not consumed.</li>
            <li>Choose when and how to engage with the wider debate.</li>
          </ul>
          <p>
            <strong>You are not expected to prepare for a system that does not yet exist.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="closing" icon={Anchor} title="A grounded closing note">
        <div className="space-y-3">
          <p>
            SEND reform is happening because the current system is failing too many families. That does not mean the solution will automatically be better. It does mean <strong>there is space for challenge, shaping, and accountability</strong>.
          </p>
          <p>
            <strong>Parents are not an afterthought in this process. They are central to it.</strong>
          </p>
          <p>
            The most important truth to hold is this: <strong>your child's rights do not expire while policy is being discussed</strong>.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
