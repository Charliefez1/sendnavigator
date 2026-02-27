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
        title="What we know right now about SEND in England"
        description="The current state of the SEND system based on confirmed facts, data, and the Schools White Paper published 23 February 2026."
        path="/what-we-know-so-far"
      />
      <PageOrientation
        title="What we know right now: the current state of SEND in England"
        description="The current state of the SEND system based on confirmed facts, data, and the Schools White Paper."
        lastUpdated="26th February 2026"
        accentColor="hsl(175 65% 41%)"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              The evidence shows the SEND system is overwhelmed. Many more children need support than a decade ago, but <strong>support quality and outcomes have not improved</strong>. Families wait too long, councils overspend, schools struggle, and too many parents are pushed into legal action just to get help.
            </p>
            <p>
              The Schools White Paper, published 23 February 2026, confirms the scale of the problem: <strong>5.3% of England's pupils currently have an EHCP</strong>, expected to rise to 7.7% by 2029. The government has committed <strong>£7 billion more in SEND funding by 2028-29</strong> than in 2025-26. This context explains why reform is being pursued, and why it matters to every family.
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />
      

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            Research across government, councils, and Parliament agrees on one thing: the system is not failing because parents are asking for too much. <strong>It is failing because needs are identified late, support is inconsistent, and families often have to escalate to get help.</strong>
          </p>
          <p>
            The White Paper acknowledges this directly. Around <strong>1 in 8 pupils are expected to transition from an EHCP to an Individual Support Plan between 2030 and 2035</strong>. By 2030, an estimated 15 to 20% of pupils will have an ISP. The government's own trajectory expects EHCPs to fall from 5.3% to 4.7% by 2034-35, not by removing support, but by strengthening earlier provision.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard value="5.3%" label="Pupils with EHCPs" sublabel="Current England average" icon={Users} accentColor="confirmed" />
            <StatCard value="7.7%" label="Projected by 2029" sublabel="Before reforms take effect" icon={TrendingUp} accentColor="discussed" />
            <StatCard value="4.7%" label="Target by 2034-35" sublabel="After reform transition" icon={TrendingUp} accentColor="discussed" />
            <StatCard value="£7bn" label="Additional SEND funding" sublabel="By 2028-29 vs 2025-26" icon={PoundSterling} accentColor="confirmed" />
            <StatCard value="60,000" label="New specialist places" sublabel="£3.7bn capital investment" icon={Users} accentColor="confirmed" />
            <StatCard value="£1.8bn" label="Experts at Hand" sublabel="OT, EP, SaLT in mainstream" icon={Users} accentColor="confirmed" />
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
            The White Paper confirms this trajectory: EHCPs are expected to rise to 7.7% by 2029 before reforms begin to take effect. When SEN Support is inconsistent or insufficient, families are pushed towards EHCPs as the <strong>only reliable mechanism to secure provision</strong>. That drives demand upwards.
          </p>
          <p>
            The government's response is to strengthen earlier support through <strong>Individual Support Plans and the Experts at Hand programme</strong>, so that fewer families need to escalate to an EHCP to get help. Whether this works depends entirely on delivery.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="pressure" icon={AlertTriangle} title="Where the pressure shows">
        <div className="space-y-3">
          <p>
            <strong>Mainstream schools report increasing complexity of need</strong> and pressure on staff. Many feel under-resourced and unsupported.
          </p>
          <p>
            The White Paper responds with inclusion bases expected in every secondary school, plus equivalent primary places. Two thirds of secondary schools are expected to have an inclusion base by 2029-30. The <strong>Inclusive Mainstream Fund (£1.6 billion)</strong> aims to build capacity in mainstream settings.
          </p>
          <p>
            Independent specialist school costs have risen <strong>206% since 2015 to £1.7 billion a year</strong>. The 60,000 new specialist places are intended to reduce reliance on expensive independent provision.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="The funding picture">
        <div className="space-y-3">
          <p>
            The White Paper commits to <strong>£7 billion more in SEND funding by 2028-29</strong> compared to 2025-26. This includes:
          </p>
          <ul className="space-y-2">
            <li><strong>£3.7 billion</strong> for 60,000 new specialist places in nurseries, schools, and colleges.</li>
            <li><strong>£1.8 billion</strong> over three years for the Experts at Hand programme (occupational therapy, educational psychology, speech and language therapy in mainstream).</li>
            <li><strong>£1.6 billion</strong> for the Inclusive Mainstream Fund.</li>
            <li><strong>£200 million</strong> for teacher training so every teacher can support children with SEND.</li>
          </ul>
          <p>
            Council SEND deficits of over £3 billion have been written off. From 2028-29, <strong>central government will take full responsibility for SEND spending growth</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="inconsistency" icon={Scale} title="The consistency problem">
        <div className="space-y-3">
          <p>
            There is a <strong>"postcode lottery" in SEND provision</strong>. Some councils issue fewer than 1.5% of children with EHCPs, others over 4%. Thresholds, waiting times, and support quality vary dramatically by area.
          </p>
          <p>
            The White Paper addresses this with a proposed four-level support model (Universal, Targeted, Targeted Plus, Specialist) and <strong>national SEND standards</strong>. The five core principles, early, local, fair, effective, and shared, are the government's own tests. Parents can use them to hold schools and councils to account.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="parents" icon={Heart} title="What this means for parents">
        <div className="space-y-3">
          <p>
            <strong>Nearly 50% of parents describe securing SEND support as stressful.</strong> 22% say their child's school is not delivering the support written into the EHCP.
          </p>
          <p>
            The White Paper explicitly states that <strong>no child will lose support they currently receive</strong>. No changes to EHCP support will begin before September 2030. Assessment of whether needs can be better met via an ISP will only apply to children aged seven or younger today. All other children keep existing EHCPs until at least age 16.
          </p>
          <p>
            A formal consultation is open until <strong>11:59pm on 18 May 2026</strong>. Parents can respond online, by email, or by post. You do not need to answer every question. <strong>The rights and routes available to you today still work. Use them.</strong>
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
