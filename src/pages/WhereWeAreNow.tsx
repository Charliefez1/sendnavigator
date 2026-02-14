import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhereWeAreNow() {
  return (
    <Layout>
      <SEOHead title="Current situation: where is SEND provision today" description="The current state of SEND provision in England, confirmed facts, funding data, and system pressures." path="/where-we-are-now" />
      <PageOrientation
        title="Current situation: where is SEND provision in the UK today"
        description="Understanding the current state of SEND support in England."
        lastUpdated="13th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              In the UK, SEND support is not one single system. Each nation runs its own framework. This page focuses on England because the legal duties, the plan process, and the rights attached to an Education, Health and Care Plan are specific to England.
            </p>
            <p>
              In England, SEND support mainly sits in two routes. SEN Support is the help a nursery, school or college provides without a legal plan. Education, Health and Care Plans are legal plans that set out a child or young person's needs, outcomes and the provision that must be put in place.
            </p>
            <p>
              The core problem is not that the law is unclear. The law exists. The problem is that the system is overloaded, inconsistent by area, and too often slow and adversarial. Families end up having to push hard for what should be straightforward early help.
            </p>
          </div>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          How will this impact children and parents
        </h2>
        <div className="prose-calm space-y-3">
          <p>If you are a parent or carer, the lived reality can feel like this.</p>
          <p>
            You may be told support is available, but it is not consistent or timely. You may be asked to wait, repeat your story, or prove the impact again and again. You may feel you have to become the project manager, advocate, and legal researcher, while also parenting.
          </p>
          <p>
            For children, delays matter. Support that arrives late can mean missed learning, rising anxiety, school refusal, exclusions, or behaviour that gets labelled as the problem instead of the signal. For families, the pressure is cumulative. It affects work, finances, mental health, and trust in services.
          </p>
          <p>
            None of this means good support is impossible. Many settings and professionals work extremely hard. The issue is the system design, the capacity, and the variation.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Statistics and facts
        </h2>
        <div className="prose-calm space-y-3">
          <p>These figures are from the checked research set and relate to England.</p>
          <ul className="space-y-2">
            <li>Legal framework: Children and Families Act 2014 introduced Education, Health and Care Plans.</li>
            <li>EHCP volume: over 500,000 children and young people have an EHCP.</li>
            <li>SEN Support volume: around 1.2 million pupils receive SEN Support without an EHCP.</li>
            <li>Timeliness: the legal timescale for an EHCP process is 20 weeks, but only about 50% of new EHCPs are issued on time.</li>
            <li>Tribunal pressure: families filed over 21,000 SEND Tribunal appeals in a recent year, and parents won 95% of cases that went to judgement.</li>
            <li>Funding pressure: the high needs budget grew to £9.4 billion by 2024 to 2025, and councils accumulated over £3 billion in SEND related deficits.</li>
            <li>System characterisation in the dataset: widely described as bureaucratic, inconsistent and inequitable, with broad consensus it is in crisis.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          What is happening now, in plain English
        </h2>
        <div className="prose-calm space-y-6">

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">The structure of support in England</h3>
            <p>In England, SEND support has two main layers.</p>
            <p>
              SEN Support is the day to day support a setting provides without an EHCP. It might include adjustments in the classroom, targeted interventions, small group work, or additional adult support. In theory, this is where most needs should be met early.
            </p>
            <p>
              Education, Health and Care Plans are different. They are legal documents. They set out needs, provision, and outcomes, and they name a placement. The local authority is responsible for making sure the provision in the plan is delivered. This legal enforceability is why EHCPs matter so much to families.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">Why the system feels like a fight</h3>
            <p>Your dataset describes a consistent pattern.</p>
            <p>
              The EHCP route is slow. It is also paperwork heavy. Even though there is a 20 week legal deadline, only around half of new plans are completed on time. Many families wait far longer.
            </p>
            <p>
              When families are refused, delayed, or offered too little, many escalate. The tribunal numbers and parent success rates in the dataset show this is not rare. When parents win 95% of cases that reach judgement, it suggests that a lot of children were initially refused support they were entitled to.
            </p>
            <p>This creates a loop:</p>
            <ul className="space-y-2">
              <li>Families push harder because they feel they have to.</li>
              <li>Local authorities feel overwhelmed and financially trapped.</li>
              <li>Schools feel caught in the middle, trying to cope while waiting for decisions and funding.</li>
              <li>Trust falls, conflict rises, and children wait.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">The inconsistency problem</h3>
            <p>
              The dataset repeatedly points to postcode variation. Thresholds and practice can differ across areas, which means what works in one place can fail completely in another. That uncertainty drives anxiety and escalation, because families cannot rely on a clear baseline offer.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">Why EHCP demand keeps rising</h3>
            <p>
              The research set describes an over-reliance on EHCPs for support that should sit earlier. When SEN Support is not strong enough, an EHCP starts to feel like the only reliable mechanism to secure provision and accountability. That drives demand upwards, which then increases system load and cost, which then drives more rationing behaviour.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">The financial pressure underneath everything</h3>
            <p>
              The dataset frames the financial picture as severe. High needs spend has risen, councils have significant deficits, and the system is described as financially unsustainable. That financial stress is not separate from the family experience. It shapes behaviour, delays, and disputes.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-display font-medium text-foreground">A note on the rest of the UK</h3>
            <p>
              Because this resource is for parents, it is important to be clear. Scotland, Wales and Northern Ireland have different systems and legal routes. This section is England only, because that is what the checked dataset covers.
            </p>
          </div>

        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
