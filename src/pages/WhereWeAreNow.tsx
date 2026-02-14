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
import { Users, BarChart3, MapPin, TrendingUp, PoundSterling, Globe, AlertTriangle, Scale } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "structure", icon: MapPin, title: "The structure of support in England" },
  { id: "fight", icon: AlertTriangle, title: "Why the system feels like a fight" },
  { id: "inconsistency", icon: Scale, title: "The inconsistency problem" },
  { id: "demand", icon: TrendingUp, title: "Why EHCP demand keeps rising" },
  { id: "funding", icon: PoundSterling, title: "The financial pressure underneath everything" },
  { id: "uk-note", icon: Globe, title: "A note on the rest of the UK" },
];

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
              In the UK, SEND support is not one single system. Each nation runs its own framework. <strong>This page focuses on England</strong> because the legal duties, the plan process, and the rights attached to an Education, Health and Care Plan are specific to England.
            </p>
            <p>
              In England, SEND support mainly sits in two routes. SEN Support is the help a nursery, school or college provides without a legal plan. <strong>Education, Health and Care Plans are legal plans that set out a child or young person's needs, outcomes and the provision that must be put in place.</strong>
            </p>
            <p>
              The core problem is not that the law is unclear. The law exists. The problem is that <strong>the system is overloaded, inconsistent by area, and too often slow and adversarial</strong>. Families end up having to push hard for what should be straightforward early help.
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>If you are a parent or carer, the lived reality can feel like this.</p>
          <p>
            You may be told support is available, but <strong>it is not consistent or timely</strong>. You may be asked to wait, repeat your story, or prove the impact again and again. You may feel you have to become the project manager, advocate, and legal researcher, while also parenting.
          </p>
          <p>
            For children, delays matter. <strong>Support that arrives late can mean missed learning, rising anxiety, school refusal, exclusions, or behaviour that gets labelled as the problem instead of the signal.</strong> For families, the pressure is cumulative. It affects work, finances, mental health, and trust in services.
          </p>
          <p>
            None of this means good support is impossible. Many settings and professionals work extremely hard. <strong>The issue is the system design, the capacity, and the variation.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-3">
          <p>These figures relate to England.</p>
          <ul className="space-y-2">
            <li>Legal framework: the Children and Families Act 2014 introduced Education, Health and Care Plans. It remains in force today.</li>
            <li>EHCP volume: <strong>around 576,000 children and young people have an EHCP</strong>, a 140% increase since 2015. Over 5% of all pupils now have one, up from 3% in 2018.</li>
            <li>Total SEND population: <strong>nearly 1.9 million young people are identified with SEND in England</strong>, about 11% of the 0 to 25 age group. A further 1.1 million pupils receive SEN Support in schools without an EHCP.</li>
            <li>Timeliness: the legal timescale for an EHCP process is 20 weeks, but <strong>only around 60% of new EHCPs are issued on time</strong>. Many families wait six to twelve months or longer.</li>
            <li>Tribunal pressure: appeals have surged, and <strong>parents win around 90% of cases that reach a decision</strong>, which points to systemic problems in how councils are making decisions, not parent overreach.</li>
            <li>Parent experience: <strong>nearly 50% of parents describe securing SEND support as stressful</strong>. 22% say their child's school is not delivering the support written into the EHCP.</li>
            <li>Council finances: <strong>95% of local authorities are running SEND budget deficits</strong>. Council spending on high needs rose from £7.8 billion in 2015 to 2016 to £13.1 billion in 2024 to 2025. Cumulative deficits are projected to reach £4.3 to £4.9 billion by 2026.</li>
            <li>Independent provision: the cost of independent special school places has risen <strong>206% since 2015 to £1.7 billion a year</strong>, driven by a shortage of state capacity.</li>
            <li>The National Audit Office calls the system "not delivering value for money". The Institute for Fiscal Studies warns SEND cost pressures are <strong>"crowding out" funds for mainstream education</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="structure" icon={MapPin} title="The structure of support in England">
        <div className="space-y-3">
          <p>In England, SEND support has two main layers.</p>
          <p>
            SEN Support is the day to day support a setting provides without an EHCP. It might include adjustments in the classroom, targeted interventions, small group work, or additional adult support. In theory, this is where most needs should be met early.
          </p>
          <p>
            <strong>Education, Health and Care Plans are different. They are legal documents.</strong> They set out needs, provision, and outcomes, and they name a placement. The local authority is responsible for making sure the provision in the plan is delivered. This legal enforceability is why EHCPs matter so much to families.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="fight" icon={AlertTriangle} title="Why the system feels like a fight">
        <div className="space-y-3">
          <p>There is a consistent pattern.</p>
          <p>
            The EHCP route is slow. It is also paperwork heavy. Even though there is a 20 week legal deadline, <strong>only around half of new plans are completed on time</strong>. Many families wait far longer.
          </p>
          <p>
            When families are refused, delayed, or offered too little, many escalate. The tribunal numbers and parent success rates show this is not rare. <strong>When parents win 95% of cases that reach judgement, it suggests that a lot of children were initially refused support they were entitled to.</strong>
          </p>
          <p>This creates a loop:</p>
          <ul className="space-y-2">
            <li>Families push harder because they feel they have to.</li>
            <li>Local authorities feel overwhelmed and financially trapped.</li>
            <li>Schools feel caught in the middle, trying to cope while waiting for decisions and funding.</li>
            <li><strong>Trust falls, conflict rises, and children wait.</strong></li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="inconsistency" icon={Scale} title="The inconsistency problem">
        <div className="space-y-3">
          <p>
            Postcode variation is one of the biggest recurring problems. <strong>Thresholds and practice can differ across areas</strong>, which means what works in one place can fail completely in another. That uncertainty drives anxiety and escalation, because families cannot rely on a clear baseline offer.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="demand" icon={TrendingUp} title="Why EHCP demand keeps rising">
        <div className="space-y-3">
          <p>
            There is <strong>an over-reliance on EHCPs for support that should sit earlier</strong>. When SEN Support is not strong enough, an EHCP starts to feel like the only reliable mechanism to secure provision and accountability. That drives demand upwards, which then increases system load and cost, which then drives more rationing behaviour.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="The financial pressure underneath everything">
        <div className="space-y-3">
          <p>
            The financial picture is severe. Council spending on high needs has risen from £7.8 billion to £13.1 billion in under a decade. <strong>95% of councils are running SEND deficits</strong>, and by March 2026, 43% are forecast to have deficits so large they equal or exceed their available reserves.
          </p>
          <p>
            Without intervention, <strong>79% of councils risked insolvency by 2028</strong> due to SEND debts alone. That financial stress is not separate from the family experience. It shapes behaviour, delays, gatekeeping, and disputes.
          </p>
          <p>
            There are also perverse incentives baked in. Schools do not get extra funding per child unless there is an EHCP, so there is a financial disincentive to take high needs pupils without one. <strong>Councils are financially liable for EHCPs but not for early intervention</strong>, so money gets spent reactively on crisis placements and legal battles rather than early support.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="uk-note" icon={Globe} title="A note on the rest of the UK">
        <div className="space-y-3">
          <p>
            <strong>Scotland, Wales and Northern Ireland have different systems and legal routes.</strong> This section covers England only.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
