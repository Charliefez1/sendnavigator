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
import { StatCard, PercentageRing, HorizontalBarChart } from "@/components/templates/DataVisuals";
import { Users, BarChart3, TrendingUp, AlertTriangle, PoundSterling, Scale, Heart } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "demand", icon: TrendingUp, title: "Why demand keeps rising" },
  { id: "pressure", icon: AlertTriangle, title: "Where the pressure shows" },
  { id: "funding", icon: PoundSterling, title: "The funding picture" },
  { id: "inconsistency", icon: Scale, title: "The consistency problem" },
  { id: "parents", icon: Heart, title: "What this means for parents" },
];

export default function WhatWeKnowSoFar() {
  return (
    <Layout>
      <SEOHead
        title="What we know so far about SEND in England"
        description="The current state of the SEND system based on confirmed facts and data."
        path="/what-we-know-so-far"
      />
      <PageOrientation
        title="What we know so far: the current state of SEND in England"
        description="The current state of the SEND system based on confirmed facts and data."
        lastUpdated="15th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            The evidence shows the SEND system is overwhelmed. Many more children need support than a decade ago, but <strong>support quality and outcomes have not improved</strong>. Families wait too long, councils overspend, schools struggle, and too many parents are pushed into legal action just to get help. Research across government, councils, and Parliament agrees <strong>this is a system problem, not a parenting problem</strong>. The growth in plans and appeals reflects unmet need earlier on. This context is essential because it explains why reform is being discussed at all.
          </p>
        }
      />

      <OnThisPage sections={sections} />
      <PageSearch />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            Research across government, councils, and Parliament agrees on one thing: the system is not failing because parents are asking for too much. <strong>It is failing because needs are identified late, support is inconsistent, and families often have to escalate to get help.</strong>
          </p>
          <p>
            The data shows more children are entering the system, but support quality and outcomes have not kept pace. This is why reform is being discussed. <strong>It is not about reducing need. It is about the system struggling to respond to it.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard value="576,000+" label="Children with EHCPs" sublabel="140% increase since 2015" icon={Users} accentColor="confirmed" />
            <StatCard value="1.2m" label="Pupils on SEN Support" sublabel="Without an EHCP" icon={Users} accentColor="discussed" />
            <StatCard value="£9.4bn" label="High needs funding" sublabel="2024/25" icon={PoundSterling} accentColor="confirmed" />
          </div>

          <div className="flex flex-wrap justify-center gap-8 py-4">
            <PercentageRing percentage={50} label="EHCPs issued on time" sublabel="Approx. within 20 weeks" color="unconfirmed" />
            <PercentageRing percentage={90} label="Parent tribunal wins" sublabel="Of decided cases" color="confirmed" />
          </div>

          <HorizontalBarChart
            title="EHCP growth and system strain"
            items={[
              { label: "EHCP holders (2015)", value: 240, displayValue: "~240,000", color: "confirmed" },
              { label: "EHCP holders (2024)", value: 576, displayValue: "576,000+", color: "unconfirmed" },
              { label: "LA deficit accumulation", value: 300, displayValue: "£3bn+", color: "unconfirmed" },
            ]}
          />
        </div>
      </ContentBox>

      <ContentBox id="demand" icon={TrendingUp} title="Why demand keeps rising">
        <div className="space-y-3">
          <p>
            EHCP numbers have increased sharply since 2014. <strong>This is not because parents are gaming the system.</strong> It reflects better identification, rising complexity, and the fact that an EHCP is often the only route to enforceable, funded support.
          </p>
          <p>
            When SEN Support is inconsistent or insufficient, families are pushed towards EHCPs as the <strong>only reliable mechanism to secure provision</strong>. That drives demand upwards, which increases system load and cost, which then drives more rationing behaviour.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="pressure" icon={AlertTriangle} title="Where the pressure shows">
        <div className="space-y-3">
          <p>
            <strong>Mainstream schools report increasing complexity of need</strong> and pressure on staff. Many feel under-resourced and unsupported.
          </p>
          <p>
            Demand for specialist school places has continued to rise. The share of pupils in specialist schools has grown from <strong>1.6% in 2019 to 2.2% in 2025</strong>, with more children placed in expensive independent specialist provision due to state capacity shortfalls.
          </p>
          <p>
            Independent specialist school costs have risen <strong>206% since 2015 to £1.7 billion a year</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="The funding picture">
        <div className="space-y-3">
          <p>
            Council spending on high needs rose from <strong>£7.8 billion in 2015 to £13.1 billion in 2024</strong>. Despite this, 95% of local authorities are running SEND budget deficits.
          </p>
          <p>
            Local authorities have accumulated <strong>over £3 billion of SEND funding deficits</strong>. By March 2026, 43% of councils forecast deficits that equal or exceed their available reserves.
          </p>
          <p>
            The National Audit Office calls the system <strong>"not delivering value for money"</strong>. The Institute for Fiscal Studies warns SEND cost pressures are "crowding out" mainstream education funds.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="inconsistency" icon={Scale} title="The consistency problem">
        <div className="space-y-3">
          <p>
            There is a <strong>"postcode lottery" in SEND provision</strong>. Some councils issue fewer than 1.5% of children with EHCPs, others over 4%. Thresholds, waiting times, and support quality vary dramatically by area.
          </p>
          <p>
            This inconsistency is one of the <strong>strongest drivers behind calls for national standards</strong>. Families in one area can have a completely different experience from families in another, even when children have similar needs.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="parents" icon={Heart} title="What this means for parents">
        <div className="space-y-3">
          <p>
            <strong>Nearly 50% of parents describe securing SEND support as stressful.</strong> 22% say their child's school is not delivering the support written into the EHCP.
          </p>
          <p>
            The current situation requires parents to be well-informed, resilient, and proactive. The system's shortcomings mean that <strong>many families have to fight hard for their children</strong>. That is not a reflection of parent behaviour. It is a reflection of system design.
          </p>
          <p>
            <strong>The rights and routes available to you today still work.</strong> Use them.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
