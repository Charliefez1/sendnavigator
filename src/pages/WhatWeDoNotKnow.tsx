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
import { RightsChecklist } from "@/components/templates/DataVisuals";
import { Users, BarChart3, HelpCircle, ClipboardList, PoundSterling, ArrowRightLeft, Heart, Target, Shield, Gavel, FileText } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "now-known", icon: BarChart3, title: "What the White Paper now answers" },
  { id: "still-unknown", icon: HelpCircle, title: "What remains genuinely unknown" },
  { id: "isp-complaints", icon: Gavel, title: "How will ISP complaints work" },
  { id: "eligibility", icon: HelpCircle, title: "Will EHCP eligibility narrow in practice" },
  { id: "standards", icon: ClipboardList, title: "What will national SEND standards actually include" },
  { id: "funding", icon: PoundSterling, title: "How funding changes affect individual children" },
  { id: "transition", icon: ArrowRightLeft, title: "What happens during transition" },
  { id: "health", icon: Heart, title: "How health and care will realistically be involved" },
  { id: "outcomes", icon: Target, title: "What outcomes will judge success" },
  { id: "why-naming", icon: Shield, title: "Why naming the unknowns matters" },
];

export default function WhatWeDoNotKnow() {
  return (
    <Layout>
      <SEOHead title="What is genuinely unknown about SEND reform" description="Unanswered questions with no published answers yet about SEND reform thresholds, enforcement, and transition." path="/what-we-do-not-know" />
      <PageOrientation icon={FileText}
        sectionLabel="SEND Reform Report"
        title="What is genuinely unknown: questions that still have no published answers"
        description="What has not been decided or written yet. Thresholds, enforcement mechanisms, and transition detail."
        lastUpdated="26th February 2026"
        accentColor="hsl(175 65% 41%)"
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <section className="content-section py-6">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-5 text-sm">
          <p className="text-foreground">
            The Schools White Paper was published on 23 February 2026. Some questions are now answered. Others remain open. The formal consultation closes at <strong>11:59pm on 18 May 2026</strong>. The questions that remain unanswered are the ones parents should prioritise in their responses.
          </p>
        </div>
      </section>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              The White Paper has answered several major questions: EHCPs are retained, ISPs are proposed from September 2030, and £7 billion in additional funding is committed. <strong>But critical gaps remain.</strong>
            </p>
            <p>
              The biggest unknowns are practical: <strong>what happens when ISP support is not delivered? How will school choice work in practice? What accountability exists at Levels 2 and 3?</strong> These gaps are not accidental. They are the areas where the consultation can make the most difference.
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            <strong>The main impact is the consultation window.</strong> The unknowns listed here are the questions parents should raise in their responses before 18 May 2026.
          </p>
          <p>
            For children, nothing changes today. For families, the risk is that gaps in the proposals become gaps in the legislation. <strong>What you raise now shapes what gets built.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="now-known" icon={BarChart3} title="What the White Paper now answers">
        <div className="space-y-6">
          <p>These questions are now at least partially answered.</p>

          <RightsChecklist
            title="Questions the White Paper addresses"
            items={[
              "EHCPs are explicitly retained for children with complex needs",
              "ISPs are proposed as a new statutory school-led duty from September 2030",
              "No child will lose support they currently receive",
              "No changes to EHCP support before September 2030",
              "Children aged over seven keep EHCPs until at least age 16",
              "Children in special schools are not affected by reassessment",
              "£7 billion additional SEND funding committed by 2028-29",
              "Four-level support model proposed (Universal, Targeted, Targeted Plus, Specialist)",
              "Experts at Hand programme: £1.8 billion for specialist support in mainstream",
              "Executive function named as a specific policy area in the refreshed SEND Code of Practice",
            ]}
          />
        </div>
      </ContentBox>

      <ContentBox id="still-unknown" icon={HelpCircle} title="What remains genuinely unknown">
        <div className="space-y-6">
          <RightsChecklist
            title="Key unanswered questions"
            items={[
              "No independent complaints route confirmed for ISP failures",
              "No detail on how the managed school choice list will work in practice",
              "No confirmed funding model for how ISP support will be resourced at school level",
              "No confirmed changes to tribunal appeal rights, but ISPs have no tribunal access",
              "No detail on what happens if Experts at Hand capacity is insufficient",
              "No confirmed transitional arrangements for children currently on SEN Support",
              "No detail on how the disadvantage funding reform will interact with SEND",
              "No confirmed workforce numbers for the scale of training required",
              "No detail on how race and ethnicity disparities in SEND identification will be addressed",
            ]}
          />
        </div>
      </ContentBox>

      <ContentBox id="isp-complaints" icon={Gavel} title="How will ISP complaints work">
        <div className="space-y-3">
          <p>
            <strong>This is the single biggest unanswered question.</strong>
          </p>
          <p>
            ISPs are school-led duties, not statutory plans under the Children and Families Act 2014. ISP complaints cannot be appealed to the SEND Tribunal. <strong>There is no confirmed independent complaints route.</strong>
          </p>
          <p>
            Parents would need to use school complaints procedures or the Local Government Ombudsman. Neither has the speed, specificity, or enforcement power of the tribunal. For children at Levels 2 and 3, <strong>this means the loss of the single most effective accountability mechanism parents currently have</strong>.
          </p>
          <p>
            <strong>This should be a priority issue in every parent's consultation response.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="eligibility" icon={HelpCircle} title="Will EHCP eligibility narrow in practice">
        <div className="space-y-3">
          <p>
            The legal test for an EHCP is unchanged. The White Paper says EHCPs are retained. But the trajectory numbers tell a story: <strong>EHCPs are expected to fall from 5.3% to 4.7% by 2034-35</strong>, with around 1 in 8 pupils transitioning from an EHCP to an ISP.
          </p>
          <p>
            The question is whether this happens because earlier support genuinely meets needs, or because <strong>thresholds tighten in practice even if the law does not change</strong>. Parents want to know: what about an autistic child with high anxiety but average cognitive ability? Will certain profiles automatically qualify? These questions do not have answers yet.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="standards" icon={ClipboardList} title="What will national SEND standards actually include">
        <div className="space-y-3">
          <p>The White Paper references national standards, but key questions remain:</p>
          <ul className="space-y-2">
            <li>What support will schools be required to provide at each level.</li>
            <li>How differences between need types will be handled.</li>
            <li><strong>Whether standards will be enforceable or advisory.</strong></li>
            <li>Who will monitor compliance and what happens when standards are not met.</li>
          </ul>
          <p>
            <strong>Without this detail, parents cannot yet rely on standards as a safeguard.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="How funding changes affect individual children">
        <div className="space-y-3">
          <p>
            The White Paper commits significant funding, but the question of <strong>individual accountability</strong> remains:
          </p>
          <ul className="space-y-2">
            <li>How will schools be prevented from rationing ISP support.</li>
            <li>How will families challenge decisions if funding is pooled through the Inclusive Mainstream Fund.</li>
            <li><strong>What happens if Experts at Hand capacity does not meet demand.</strong></li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="transition" icon={ArrowRightLeft} title="What happens during transition">
        <div className="space-y-3">
          <p>
            The White Paper gives some transition protections: no changes before September 2030, age seven threshold, special schools unaffected. But questions remain:
          </p>
          <ul className="space-y-2">
            <li>What happens to children newly identified during the transition period.</li>
            <li>Whether different rules will apply in different areas at different times.</li>
            <li><strong>What happens to children who are currently seven and will be assessed under the new system.</strong></li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="health" icon={Heart} title="How health and care will realistically be involved">
        <div className="space-y-3">
          <p>
            The White Paper emphasises multi-agency working, but parents are asking:
          </p>
          <ul className="space-y-2">
            <li>Where the therapists will come from given existing NHS shortages.</li>
            <li>Whether NHS waiting lists will reduce.</li>
            <li><strong>How health provision will be accessed for children with ISPs rather than EHCPs.</strong></li>
          </ul>
          <p>
            The Experts at Hand programme addresses this partially, but <strong>£1.8 billion over three years may not be sufficient for the scale of need</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="outcomes" icon={Target} title="What outcomes will judge success">
        <div className="space-y-3">
          <p>
            <strong>Is success fewer EHCPs, fewer appeals, lower costs, or better lives for children?</strong> The White Paper does not clearly define success metrics. NEET rates for young people with EHCPs remain significantly higher than average. Academic outcomes for SEND children are essentially unchanged.
          </p>
          <p>
            There are also questions nobody is talking about enough. <strong>What happens to post-16 support?</strong> Will the right to an EHCP up to age 25 remain? What about children who do not fit a neat category?
          </p>
        </div>
      </ContentBox>

      <ContentBox id="why-naming" icon={Shield} title="Why naming the unknowns matters">
        <div className="space-y-3">
          <p>
            The unknowns listed here are not gaps that will be filled automatically. <strong>They are the questions that need to be raised in the consultation.</strong>
          </p>
          <p>
            Respond before 18 May 2026. Focus on the questions that matter most to your child. <strong>The most protective position right now is to work within the system that exists today</strong>, while making your voice heard about what comes next.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
