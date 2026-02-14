import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatWeDoNotKnow() {
  return (
    <Layout>
      <SEOHead title="What we do not know about SEND reform" description="Questions parents are asking about SEND reform and why they matter." path="/what-we-do-not-know" />
      <PageOrientation
        title="What we do not know: questions parents are asking and why they matter"
        description="Key decisions about rights, thresholds, and protections that have not been made."
        lastUpdated="14th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              There is a lot we still do not know about the future of SEND in England. That uncertainty is not accidental. Many decisions have been deliberately delayed while consultation, piloting, and debate take place.
            </p>
            <p>
              For parents, this lack of clarity can be harder than bad news. It makes planning difficult. It keeps families in a constant state of watchfulness. It adds cognitive load to lives that are already full.
            </p>
            <p>
              The key point is this. Uncertainty does not mean decisions have been secretly made. It means the shape of reform is still being argued over.
            </p>
          </div>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          How will this impact children and parents
        </h2>
        <div className="prose-calm space-y-3">
          <p>
            The main impact right now is emotional and practical.
          </p>
          <p>
            Parents are asking whether to push for an EHCP now or wait. They are wondering whether thresholds will change, whether support will shift, and whether their child will still qualify in future.
          </p>
          <p>
            For children, uncertainty can mean delay. Families may hold back or rush forward based on fear rather than need. That is not because parents are overreacting. It is because the system gives them no clear forward map yet.
          </p>
          <p>
            Understanding what is genuinely unknown helps parents make decisions based on the present law, not imagined futures.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Statistics and facts
        </h2>
        <div className="prose-calm space-y-3">
          <p>This section focuses on known unknowns. The checked research set confirms these areas are unresolved.</p>
          <ul className="space-y-2">
            <li>No draft legislation has been published setting out changes to EHCP eligibility.</li>
            <li>No final national SEND standards have been published.</li>
            <li>No confirmed funding model replacing EHCP linked funding has been agreed.</li>
            <li>No confirmed changes to tribunal appeal rights have been announced.</li>
            <li>No confirmed implementation dates beyond broad 2026 to 2028 windows exist for major reforms.</li>
            <li>No confirmed transitional arrangements for new entrants versus existing EHCP holders have been published.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          The unanswered questions parents are rightly asking
        </h2>
        <div className="prose-calm space-y-6">

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">Will EHCP eligibility change</h3>
            <p>
              This is the biggest question for families.
            </p>
            <p>
              Right now, the legal test for an EHCP is unchanged. What is unknown is whether future legislation will narrow eligibility, keep it the same, or restructure it through tiers.
            </p>
            <p>
              Until legislation is published, no one can say with certainty how eligibility might change or when.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">What will national SEND standards actually include</h3>
            <p>
              Parents are being told standards are coming, but the detail matters.
            </p>
            <p>Key unanswered questions include:</p>
            <ul className="space-y-2">
              <li>What support will schools be required to provide without an EHCP.</li>
              <li>How differences between need types will be handled.</li>
              <li>Whether standards will be enforceable or advisory.</li>
              <li>Who will monitor compliance and what happens when standards are not met.</li>
            </ul>
            <p>
              Without this detail, parents cannot yet rely on standards as a safeguard.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">How funding changes would affect individual children</h3>
            <p>
              There is discussion about shifting funding earlier or making it less plan dependent.
            </p>
            <p>What we do not know is:</p>
            <ul className="space-y-2">
              <li>Whether individual accountability will remain.</li>
              <li>How schools will be prevented from rationing support.</li>
              <li>How families will challenge decisions if funding is pooled.</li>
            </ul>
            <p>
              Until this is clear, parents are right to be cautious.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">What happens during transition</h3>
            <p>
              Another major unknown is how change will be phased.
            </p>
            <p>Parents want to know:</p>
            <ul className="space-y-2">
              <li>Whether children with existing EHCPs are fully protected.</li>
              <li>How children newly identified during reform will be treated.</li>
              <li>Whether different rules will apply in different areas at different times.</li>
            </ul>
            <p>
              The lack of a published transition plan adds to anxiety.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">How health and care will realistically be involved</h3>
            <p>
              Reform relies heavily on multi-agency working.
            </p>
            <p>Parents are asking:</p>
            <ul className="space-y-2">
              <li>Where the therapists will come from.</li>
              <li>Whether NHS waiting lists will reduce.</li>
              <li>How health provision will be accessed without an EHCP.</li>
            </ul>
            <p>
              These questions matter because education alone cannot meet many children's needs.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">What outcomes will be used to judge success</h3>
            <p>
              Families also want to know how success will be measured.
            </p>
            <p>
              Is success fewer EHCPs, fewer appeals, lower costs, or better lives for children.
            </p>
            <p>
              Until outcomes are clearly defined, parents will remain sceptical.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">Why naming the unknowns matters</h3>
            <p>
              Uncertainty does not mean families should panic. It does mean families should make decisions based on current rights and current needs, not rumours.
            </p>
            <p>
              The most protective position right now is to work within the system that exists today, while staying informed about what may change tomorrow.
            </p>
          </div>

        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
