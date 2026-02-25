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
import { TierDiagram, StatCard } from "@/components/templates/DataVisuals";
import { Users, BarChart3, Layers, TrendingDown, PoundSterling, Gavel, School, Clock, MessageCircle } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "tiered", icon: Layers, title: "Tiered models of support" },
  { id: "reliance", icon: TrendingDown, title: "Reducing over-reliance on EHCPs" },
  { id: "funding", icon: PoundSterling, title: "Funding models and incentives" },
  { id: "appeals", icon: Gavel, title: "Appeals and adversarial processes" },
  { id: "inclusion", icon: School, title: "Mainstream inclusion and specialist provision" },
  { id: "pace", icon: Clock, title: "The pace and shape of reform" },
  { id: "meaning", icon: MessageCircle, title: "What this discussion phase really means" },
];

export default function WhatIsBeingDiscussed() {
  return (
    <Layout>
      <SEOHead title="Under discussion: SEND reform debates in 2026" description="What is being debated publicly right now about SEND reform in England." path="/what-is-being-discussed" />
      <PageOrientation
        title="Under discussion: what is being debated publicly right now"
        description="Ideas, proposals, and areas of debate that may shape future policy but are not settled."
        lastUpdated="23rd February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Alongside confirmed changes, there is active public discussion about deeper reform of SEND in England. These discussions are happening in Parliament, in select committees, across the sector, and in the media.
            </p>
            <p>
              The Schools White Paper, <em>Every Child Achieving and Thriving</em>, was published on 23 February 2026. A formal consultation is now open. <strong>Individual Support Plans are a formal consultation proposal, not a confirmed policy. Nothing in this section has legal force yet.</strong>
            </p>
            <p>
              The common thread is this. The government is trying to reduce delay, conflict, and unsustainable cost, while families and professionals are trying to protect children's rights and access to real support. <strong>The tension sits between system efficiency and individual safeguards.</strong>
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />
      

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            Right now, <strong>the impact is uncertainty rather than change</strong>.
          </p>
          <p>
            Parents may feel anxious because discussions are often reported without context. <strong>It can sound as if decisions have already been made, when they have not.</strong>
          </p>
          <p>
            For children, nothing changes today because of these debates. For families, the risk is emotional and cognitive load. Trying to plan for a future that is still being argued over can be exhausting, especially when you are already stretched.
          </p>
          <p>
            <strong>Understanding what is under discussion, and what is not yet decided, helps reduce that uncertainty.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <p>These points reflect themes and issues being raised publicly, not enacted policy.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard value="100+" label="DfE engagement events" sublabel="Consultation work" icon={MessageCircle} accentColor="discussed" />
            <StatCard value="130,000+" label="Petition signatures" sublabel="Save Our Children's Rights" icon={Users} accentColor="unconfirmed" />
            <StatCard value="90%" label="Parent tribunal win rate" sublabel="Prompting system design debate" icon={Gavel} accentColor="confirmed" />
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>The <strong>Schools White Paper was published 23 February 2026</strong>. Formal consultation now open.</li>
            <li>A national SEND reform consultation ran from December 2025 to January 2026.</li>
            <li>Parliamentary committees are <strong>actively scrutinising reform proposals</strong>.</li>
            <li>The Education and Health and Social Care committees have launched a <strong>new joint inquiry into children and young people's mental health</strong>, with explicit interest in education system support including SEND.</li>
            <li>The NEU has formally urged the government to <strong>maintain legal thresholds for EHCPs</strong>.</li>
            <li>Local authority deficits and workforce shortages are cited repeatedly as <strong>drivers of reform discussion</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="tiered" icon={Layers} title="Tiered models of support">
        <div className="space-y-6">
          <p>
            One of the most discussed ideas is whether <strong>SEND support should be more clearly tiered</strong>.
          </p>

          <p>
            The Schools White Paper proposes <strong>Individual Support Plans (ISPs)</strong> as a formal consultation proposal to replace SEN Support with statutory school-led plans from 2030. EHCPs are confirmed to remain alongside them.
          </p>

          <TierDiagram
            title="Proposed tiered model (subject to consultation)"
            tiers={[
              { tier: "Tier 4", title: "EHCP", description: "Full legal plan for children with the most severe and complex needs. Enforceable provision. Confirmed to remain.", color: "confirmed" },
              { tier: "Tier 3", title: "ISP / Specialist", description: "Proposed statutory school-led plan (Individual Support Plan). Subject to consultation. Enforceability to be determined.", color: "discussed" },
              { tier: "Tier 2", title: "Targeted", description: "Small group interventions and additional support, coordinated by the school.", color: "discussed" },
              { tier: "Tier 1", title: "Universal", description: "Teacher-led accommodations available to all pupils as standard classroom practice.", color: "confirmed" },
            ]}
            note="ISPs are a formal consultation proposal from the Schools White Paper, not confirmed policy. The four-tier structure is subject to consultation."
          />

          <p>
            Supporters argue this could reduce delay and conflict by making early help reliable and consistent. Critics argue that <strong>tiering risks recreating older systems where children had to fail before qualifying for help</strong>. A key concern is what happens at Tier 3: if that support is not legally enforceable, families lose their ability to challenge when it is not delivered.
          </p>
          <p>
            This debate is ongoing. <strong>No tiered model has been confirmed.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="reliance" icon={TrendingDown} title="Reducing over-reliance on EHCPs">
        <div className="space-y-3">
          <p>
            There is broad agreement that <strong>too many families feel forced to seek EHCPs just to secure basic support</strong>.
          </p>
          <p>
            The discussion is about how to strengthen support earlier, not whether EHCPs should exist. However, families are understandably concerned that <strong>reducing reliance could become reducing access if not done carefully</strong>.
          </p>
          <p>
            The question being debated is not whether EHCPs matter, but how to ensure they are used appropriately without leaving children unsupported.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="Funding models and incentives">
        <div className="space-y-3">
          <p>
            Another area under discussion is how SEND funding flows through the system.
          </p>
          <p>
            At present, <strong>funding is strongly tied to EHCPs</strong>. This creates incentives for escalation and defensiveness. One idea being discussed is <strong>giving groups of schools pooled budgets to commission services like speech therapy or educational psychology collectively</strong>, rather than each family fighting for services through separate EHCPs.
          </p>
          <p>
            Parents are rightly asking <strong>how accountability would work if funding is less individualised</strong>. As Special Needs Jungle has pointed out, removing individual funding and giving it to schools essentially removes the child's legal entitlement. That question is central to the debate and remains unanswered.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="appeals" icon={Gavel} title="Appeals and adversarial processes">
        <div className="space-y-3">
          <p>
            The volume of tribunal appeals has prompted debate about whether the system has become too legalistic.
          </p>
          <p>
            One proposal under discussion is <strong>making mediation a compulsory step before tribunal appeal</strong>. Currently parents must consider mediation but can opt out. Under the proposed change, parents would have to go through mediation first.
          </p>
          <p>
            Some argue the appeal system shows failure earlier in the process. Others worry that <strong>attempts to reduce appeals could weaken safeguards</strong>, especially given that parents win 90% of decided cases, which suggests the problem is poor decision making, not excessive appealing.
          </p>
          <p>
            <strong>There is no confirmed proposal to remove appeal rights.</strong> The discussion centres on whether better early decisions could reduce the need for appeals at all.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="inclusion" icon={School} title="Mainstream inclusion and specialist provision">
        <div className="space-y-3">
          <p>
            There is active debate about how far a mainstream first approach should go.
          </p>
          <p>
            Most agree mainstream should be better supported. Families are concerned about <strong>children being kept in unsuitable settings for cost or policy reasons</strong>.
          </p>
          <p>
            The discussion is about balance, not absolutes. <strong>No policy currently forces children into mainstream against their needs.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="pace" icon={Clock} title="The pace and shape of reform">
        <div className="space-y-3">
          <p>
            Finally, there is debate about timing. Some want rapid change because the system is failing now. Others warn that <strong>rushed reform risks unintended harm</strong>.
          </p>
          <p>
            This is why consultation, piloting, and phased implementation feature so heavily in the current approach.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="meaning" icon={MessageCircle} title="What this discussion phase really means">
        <div className="space-y-3">
          <p>
            <strong>Discussion does not equal decision.</strong> Public debate is part of how policy is tested, challenged, and improved.
          </p>
          <p>
            For parents, the most important thing to know is that <strong>voices are being heard</strong>. Many of the concerns raised by families are the same concerns shaping the debate.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
