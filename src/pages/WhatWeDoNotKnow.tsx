import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
  OnThisPage,
  ContentBox,
} from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";
import { PageSearch } from "@/components/PageSearch";
import { StatusBadge } from "@/components/StatusBadge";
import { RightsChecklist } from "@/components/templates/DataVisuals";
import { Users, BarChart3, HelpCircle, ClipboardList, PoundSterling, ArrowRightLeft, Heart, Target, Shield } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "eligibility", icon: HelpCircle, title: "Will EHCP eligibility change" },
  { id: "standards", icon: ClipboardList, title: "What will national SEND standards actually include" },
  { id: "funding", icon: PoundSterling, title: "How funding changes would affect individual children" },
  { id: "transition", icon: ArrowRightLeft, title: "What happens during transition" },
  { id: "health", icon: Heart, title: "How health and care will realistically be involved" },
  { id: "outcomes", icon: Target, title: "What outcomes will be used to judge success" },
  { id: "why-naming", icon: Shield, title: "Why naming the unknowns matters" },
];

export default function WhatWeDoNotKnow() {
  return (
    <Layout>
      <SEOHead title="What we do not know about SEND reform" description="Questions parents are asking about SEND reform and why they matter." path="/what-we-do-not-know" />
      <PageOrientation
        title="What we do not know: questions parents are asking and why they matter"
        description="Key decisions about rights, thresholds, and protections that have not been made."
        lastUpdated="23rd February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <section className="content-section py-6">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-5 text-sm">
          <p className="text-foreground">
            The Schools White Paper was published on 23 February 2026. Some questions are now partially answered. Others remain open. This page has been updated to reflect what the white paper confirms and what it does not.
          </p>
        </div>
      </section>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              There is a lot we still do not know about the future of SEND in England. That uncertainty is not accidental. <strong>Many decisions have been deliberately delayed</strong> while consultation, piloting, and debate take place.
            </p>
            <p>
              For parents, this lack of clarity can be harder than bad news. It makes planning difficult. It keeps families in a constant state of watchfulness. <strong>It adds cognitive load to lives that are already full.</strong>
            </p>
            <p>
              The key point is this. <strong>Uncertainty does not mean decisions have been secretly made.</strong> It means the shape of reform is still being argued over.
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />
      <PageSearch />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            <strong>The main impact right now is emotional and practical.</strong>
          </p>
          <p>
            Parents are asking whether to push for an EHCP now or wait. They are wondering whether thresholds will change, whether support will shift, and whether their child will still qualify in future.
          </p>
          <p>
            For children, uncertainty can mean delay. <strong>Families may hold back or rush forward based on fear rather than need.</strong> That is not because parents are overreacting. It is because the system gives them no clear forward map yet.
          </p>
          <p>
            <strong>Understanding what is genuinely unknown helps parents make decisions based on the present law, not imagined futures.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <p>These areas remain genuinely unresolved.</p>

          <RightsChecklist
            title="Key unanswered questions"
            items={[
              "The white paper proposes Individual Support Plans from 2030 as a new school-led statutory tier. EHCPs are confirmed to remain. No legislation has been introduced yet.",
              "No final national SEND standards have been published",
              "No confirmed funding model replacing EHCP-linked funding has been agreed",
              "No confirmed changes to tribunal appeal rights have been announced",
              "No confirmed implementation dates beyond broad 2026–2028 windows",
              "No confirmed transitional arrangements for existing vs new EHCP holders",
            ]}
          />
        </div>
      </ContentBox>

      <ContentBox id="eligibility" icon={HelpCircle} title="Will EHCP eligibility change">
        <div className="space-y-3">
          <p>
            <strong>This is the biggest question for families.</strong>
          </p>
          <p>
            Right now, <strong>the legal test for an EHCP is unchanged</strong>. What is unknown is whether future legislation will narrow eligibility, keep it the same, or restructure it through tiers. The phrase "most severe and complex" has been used in leaked reports, but it is vague. <strong>What about an autistic child with high anxiety but a normal IQ? Will certain diagnoses automatically qualify?</strong> These questions do not have answers yet.
          </p>
          <p>
            Parents also want to know whether existing EHCPs will be honoured under any new system. The government has signalled they will be retained, but <strong>the exact treatment, whether there will be a "grandfathering" clause, is unknown</strong>.
          </p>
          <p>
            Until legislation is published, no one can say with certainty how eligibility might change or when.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="standards" icon={ClipboardList} title="What will national SEND standards actually include">
        <div className="space-y-3">
          <p>
            Parents are being told standards are coming, but <strong>the detail matters</strong>.
          </p>
          <p>Key unanswered questions include:</p>
          <ul className="space-y-2">
            <li>What support will schools be required to provide without an EHCP.</li>
            <li>How differences between need types will be handled.</li>
            <li><strong>Whether standards will be enforceable or advisory.</strong></li>
            <li>Who will monitor compliance and what happens when standards are not met.</li>
          </ul>
          <p>
            <strong>Without this detail, parents cannot yet rely on standards as a safeguard.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="How funding changes would affect individual children">
        <div className="space-y-3">
          <p>
            There is discussion about shifting funding earlier or making it less plan dependent.
          </p>
          <p>What we do not know is:</p>
          <ul className="space-y-2">
            <li><strong>Whether individual accountability will remain.</strong></li>
            <li>How schools will be prevented from rationing support.</li>
            <li>How families will challenge decisions if funding is pooled.</li>
          </ul>
          <p>
            <strong>Until this is clear, parents are right to be cautious.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="transition" icon={ArrowRightLeft} title="What happens during transition">
        <div className="space-y-3">
          <p>
            Another major unknown is how change will be phased.
          </p>
          <p>Parents want to know:</p>
          <ul className="space-y-2">
            <li><strong>Whether children with existing EHCPs are fully protected.</strong></li>
            <li>How children newly identified during reform will be treated.</li>
            <li>Whether different rules will apply in different areas at different times.</li>
          </ul>
          <p>
            <strong>The lack of a published transition plan adds to anxiety.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="health" icon={Heart} title="How health and care will realistically be involved">
        <div className="space-y-3">
          <p>
            Reform relies heavily on multi-agency working.
          </p>
          <p>Parents are asking:</p>
          <ul className="space-y-2">
            <li>Where the therapists will come from.</li>
            <li>Whether NHS waiting lists will reduce.</li>
            <li><strong>How health provision will be accessed without an EHCP.</strong></li>
          </ul>
          <p>
            These questions matter because <strong>education alone cannot meet many children's needs</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="outcomes" icon={Target} title="What outcomes will be used to judge success">
        <div className="space-y-3">
          <p>
            Families also want to know how success will be measured.
          </p>
          <p>
            <strong>Is success fewer EHCPs, fewer appeals, lower costs, or better lives for children?</strong> Right now, there is no clear evidence of improved outcomes despite higher spending. NEET rates for young people with EHCPs remain significantly higher than average. Academic outcomes for SEND children are essentially unchanged.
          </p>
          <p>
            There are also questions nobody is talking about enough. <strong>What happens to post-16 support?</strong> Will the right to an EHCP up to age 25 remain? What about children who do not fit a neat category? And what if the reforms do not work? Is there a plan B?
          </p>
          <p>
            Until outcomes are clearly defined, parents will remain sceptical.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="why-naming" icon={Shield} title="Why naming the unknowns matters">
        <div className="space-y-3">
          <p>
            Uncertainty does not mean families should panic. It does mean <strong>families should make decisions based on current rights and current needs, not rumours</strong>.
          </p>
          <p>
            <strong>The most protective position right now is to work within the system that exists today</strong>, while staying informed about what may change tomorrow.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
