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
import { Users, BarChart3, Layers, TrendingDown, PoundSterling, Gavel, School, Clock, MessageCircle, AlertTriangle, FileText } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "consultation", icon: MessageCircle, title: "The consultation: what it means and how to respond" },
  { id: "tiered", icon: Layers, title: "The four-level model: what is settled and what is not" },
  { id: "isp-gaps", icon: AlertTriangle, title: "ISP complaints and the tribunal gap" },
  { id: "school-choice", icon: School, title: "School choice removal" },
  { id: "reliance", icon: TrendingDown, title: "Reducing over-reliance on EHCPs" },
  { id: "funding", icon: PoundSterling, title: "Funding models and accountability" },
  { id: "appeals", icon: Gavel, title: "Appeals and adversarial processes" },
  { id: "pace", icon: Clock, title: "The pace and shape of reform" },
  { id: "meaning", icon: MessageCircle, title: "What this discussion phase really means" },
];

export default function WhatIsBeingDiscussed() {
  return (
    <Layout>
      <SEOHead title="What is actively being shaped: SEND reform consultation 2026" description="Areas where SEND policy design is still open, consultation themes, and where influence and challenge still matter." path="/what-is-being-discussed" />
      <PageOrientation icon={FileText}
        sectionLabel="SEND Reform Report"
        title="What is actively being shaped: live policy design and consultation"
        description="Areas where policy design is still open. Consultation themes, trade-offs being debated, and where influence still matters."
        lastUpdated="26th February 2026"
        accentColor="hsl(175 65% 41%)"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              The Schools White Paper, <em>Every Child Achieving and Thriving</em>, was published on 23 February 2026. A formal consultation titled <strong>"SEND Reform: Putting Children and Young People First"</strong> is now open and closes at 11:59pm on 18 May 2026.
            </p>
            <p>
              The White Paper sets out a clear direction, but many critical details remain subject to consultation. <strong>Individual Support Plans, the four-level model, changes to school choice, and the ISP complaints route are all consultation proposals, not settled policy.</strong>
            </p>
            <p>
              The tension sits between system efficiency and individual safeguards. Parents have a direct opportunity to shape how these proposals are implemented. <strong>Your response matters. Partial responses carry weight.</strong>
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            Right now, <strong>the impact is a consultation window, not a policy change</strong>. Nothing in the White Paper changes existing law until legislation passes Parliament.
          </p>
          <p>
            For children, nothing changes today. For families, the opportunity is to <strong>respond to the consultation before 18 May 2026</strong>. The questions you raise now will shape whether key safeguards are built into the final legislation.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard value="18 May" label="Consultation deadline" sublabel="11:59pm closing time" icon={Clock} accentColor="confirmed" />
            <StatCard value="130,000+" label="Petition signatures" sublabel="Save Our Children's Rights" icon={Users} accentColor="unconfirmed" />
            <StatCard value="90%" label="Parent tribunal win rate" sublabel="Prompting system design debate" icon={Gavel} accentColor="confirmed" />
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Parents can respond <strong>online via the Citizen Space portal</strong> on the DfE consultation page.</li>
            <li>Parents can respond by email to <strong>send.reform@education.gov.uk</strong>.</li>
            <li>Parents can respond by post to: SEND Reform Consultation Team, Department for Education, Sanctuary Buildings, Great Smith Street, London, SW1P 3BT.</li>
            <li>You do not need to answer every question. <strong>Partial responses carry weight.</strong></li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="consultation" icon={MessageCircle} title="The consultation: what it means and how to respond">
        <div className="space-y-3">
          <p>
            This is a <strong>formal 12-week public consultation</strong>. It is the key opportunity for parents, professionals, and organisations to shape the detail of reform before legislation is drafted.
          </p>
          <p>
            The five core principles of the White Paper are: <strong>early, local, fair, effective, and shared</strong>. These are the government's own tests for the reforms. Parents can use them to hold proposals to account in their responses.
          </p>
          <p>
            <strong>Focus your response on what matters most to your child.</strong> You do not need to be an expert. Lived experience is evidence.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="tiered" icon={Layers} title="The four-level model: what is settled and what is not">
        <div className="space-y-6">
          <p>
            The White Paper proposes a <strong>four-level model</strong> (Universal, Targeted, Targeted Plus, Specialist). The structure is set out, but critical details are subject to consultation:
          </p>

          <TierDiagram
            title="Four-level model (consultation proposal)"
            tiers={[
              { tier: "Level 4", title: "Specialist (EHCP)", description: "Full legal plan for children with the most complex needs. Enforceable provision. Confirmed to remain.", color: "confirmed" },
              { tier: "Level 3", title: "Targeted Plus (ISP)", description: "Specialist support via Experts at Hand. Recorded in an ISP. Enforceability and complaints route under consultation.", color: "discussed" },
              { tier: "Level 2", title: "Targeted (ISP)", description: "Structured school-led support recorded in an ISP. No tribunal route for ISP complaints.", color: "discussed" },
              { tier: "Level 1", title: "Universal", description: "Adaptive teaching and early help for all children.", color: "confirmed" },
            ]}
            note="EHCPs are confirmed to remain. ISPs and the four-level structure are formal consultation proposals, not yet enacted."
          />

          <p>
            The key question for parents: <strong>what happens when ISP support is not delivered?</strong> If there is no tribunal route, what accountability exists? This is the single most important question to raise in the consultation.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="isp-gaps" icon={AlertTriangle} title="ISP complaints and the tribunal gap">
        <div className="space-y-3">
          <p>
            <strong>ISPs are school-led duties, not statutory plans under the Children and Families Act 2014.</strong> This means:
          </p>
          <ul className="space-y-2">
            <li>ISP complaints <strong>cannot be appealed to the SEND Tribunal</strong>.</li>
            <li>There is no confirmed independent complaints route for ISP failures.</li>
            <li>Parents would need to use school complaints procedures or the Local Government Ombudsman.</li>
          </ul>
          <p>
            This is a fundamental gap. For children at Levels 2 and 3, <strong>the removal of tribunal access means the loss of the single most effective accountability mechanism parents currently have</strong>. This should be a priority issue in consultation responses.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="school-choice" icon={School} title="School choice removal">
        <div className="space-y-3">
          <p>
            The White Paper proposes replacing the <strong>free choice of school with a managed list system</strong>. Families would be given a list of possible placements and asked to express a preference. The local authority would have greater control over the final decision.
          </p>
          <p>
            <strong>This is a direct change to an existing right.</strong> Parents currently have the right to request any school and have it named in the EHCP. Under the proposals, that right would be narrowed. This is subject to consultation and is likely to be one of the most contested elements.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="reliance" icon={TrendingDown} title="Reducing over-reliance on EHCPs">
        <div className="space-y-3">
          <p>
            The White Paper projects EHCPs falling from 5.3% to 4.7% of pupils by 2034-35. Around <strong>1 in 8 pupils are expected to transition from an EHCP to an ISP</strong> between 2030 and 2035.
          </p>
          <p>
            The discussion is about how to strengthen support earlier so fewer families need to escalate. Families are understandably concerned that <strong>reducing reliance could become reducing access if ISPs lack enforceable accountability</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="Funding models and accountability">
        <div className="space-y-3">
          <p>
            The White Paper commits £7 billion in additional funding but the question of <strong>how accountability works when funding is less individualised</strong> remains open.
          </p>
          <p>
            If funding is pooled through the Inclusive Mainstream Fund rather than attached to individual EHCPs, parents need to know: <strong>how will they challenge decisions if support is not delivered?</strong> This is an area where consultation responses can push for stronger safeguards.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="appeals" icon={Gavel} title="Appeals and adversarial processes">
        <div className="space-y-3">
          <p>
            <strong>There is no confirmed proposal to remove EHCP appeal rights.</strong> The SEND Tribunal continues to operate.
          </p>
          <p>
            However, the White Paper proposes mandatory mediation before tribunal appeal. Given that parents win 90% of decided cases, the question is whether <strong>better early decisions could reduce the need for appeals</strong>, or whether mandatory mediation becomes an additional barrier.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="pace" icon={Clock} title="The pace and shape of reform">
        <div className="space-y-3">
          <p>
            The transition is planned over a decade, with ISPs from September 2030 and completion around 2034-35. <strong>This is a consultation proposal, not a fixed timetable.</strong>
          </p>
          <p>
            The pace will be shaped by consultation responses, parliamentary scrutiny, and practical readiness. Parents can influence this through their responses.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="meaning" icon={MessageCircle} title="What this discussion phase really means">
        <div className="space-y-3">
          <p>
            <strong>This is a formal consultation, not a done deal.</strong> The government is required to consider responses before drafting legislation. Parent voices have already influenced the pace and emphasis of reform.
          </p>
          <p>
            <strong>The consultation closes at 11:59pm on 18 May 2026.</strong> Respond online, by email, or by post. Focus on what matters most to your child. Your response is evidence.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
