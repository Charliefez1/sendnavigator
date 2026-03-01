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
import { StatCard, TierDiagram } from "@/components/templates/DataVisuals";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";
import { Users, BarChart3, ClipboardList, Monitor, GraduationCap, Building2, MapPin, PoundSterling, ShieldCheck, Layers, Brain, Baby, School, ArrowRightLeft, FileText } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "four-levels", icon: Layers, title: "The four-level support model" },
  { id: "isps", icon: ClipboardList, title: "Individual Support Plans" },
  { id: "experts", icon: GraduationCap, title: "Experts at Hand programme" },
  { id: "specialist", icon: Building2, title: "Expansion of specialist provision" },
  { id: "executive-function", icon: Brain, title: "Executive function and ADHD reclassification" },
  { id: "early-years", icon: Baby, title: "Early years provisions" },
  { id: "school-choice", icon: School, title: "Changes to school choice" },
  { id: "funding", icon: PoundSterling, title: "Funding and deficit absorption" },
  { id: "disadvantage", icon: ArrowRightLeft, title: "Disadvantage funding reform" },
  { id: "workforce", icon: GraduationCap, title: "Workforce training" },
  { id: "inclusion", icon: MapPin, title: "Local inclusion and accountability" },
  { id: "digital", icon: Monitor, title: "Digital processes and standardisation" },
  { id: "unchanged", icon: ShieldCheck, title: "What remains protected" },
];

export default function WhatIsChanging() {
  return (
    <Layout>
      <SEOHead title="What is now in motion: confirmed SEND reforms 2026" description="Confirmed reforms already underway in SEND, including ISPs, Experts at Hand, and the four-level support model." path="/what-is-changing" />
      <PageOrientation icon={FileText}
        sectionLabel="SEND Reform Report"
        title="What is now in motion: confirmed reforms following the Schools White Paper"
        description="Reforms already underway, funded, or formally announced. This section describes momentum, not speculation."
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
              The Schools White Paper, <em>Every Child Achieving and Thriving</em>, was published on 23 February 2026 alongside a formal consultation. <strong>These are the most significant confirmed changes to SEND since the Children and Families Act 2014.</strong>
            </p>
            <p>
              The White Paper creates a four-level support model, introduces Individual Support Plans as a new statutory duty on schools, commits £7 billion in additional SEND funding, and explicitly retains EHCPs for children with the most complex needs. <strong>No changes to EHCP support will begin before September 2030.</strong>
            </p>
            <p>
              A formal consultation is open until <strong>11:59pm on 18 May 2026</strong>. Parents can respond online, by email to send.reform@education.gov.uk, or by post. You do not need to answer every question. Partial responses carry weight.
            </p>
          </div>
        }
      />

      <LatestUpdatesStream />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            In the short term, <strong>most families will not see an overnight difference</strong>. Rights and processes remain the same today. The White Paper explicitly states no child will lose support they currently receive.
          </p>
          <p>
            Over time, if these changes work as intended, families should experience <strong>clearer expectations, fewer delays, and less need to fight for basic support</strong>. Schools should be better equipped to respond earlier through ISPs and the Experts at Hand programme.
          </p>
          <p>
            However, <strong>impact will depend on delivery</strong>. Training takes time. Capacity takes time. The transition is planned over a decade, with ISPs starting from September 2030 and the full transition not completing until 2034-35.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <p>These are the confirmed investment figures from the White Paper.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard value="£7bn" label="Additional SEND funding" sublabel="By 2028-29 vs 2025-26" icon={PoundSterling} accentColor="confirmed" />
            <StatCard value="£3.7bn" label="Capital investment" sublabel="60,000 new SEND places" icon={Building2} accentColor="confirmed" />
            <StatCard value="£1.8bn" label="Experts at Hand" sublabel="OT, EP, SaLT over 3 years" icon={GraduationCap} accentColor="confirmed" />
            <StatCard value="£1.6bn" label="Inclusive Mainstream Fund" sublabel="Mainstream capacity building" icon={School} accentColor="confirmed" />
            <StatCard value="£200m" label="Teacher training" sublabel="SEND specialist programme" icon={GraduationCap} accentColor="confirmed" />
            <StatCard value="60,000" label="New SEND places" sublabel="Nurseries, schools, colleges" icon={MapPin} accentColor="confirmed" />
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>ISPs will be a <strong>legal duty on every school, nursery, and college</strong>.</li>
            <li>Two thirds of secondary schools expected to have an <strong>inclusion base by 2029-30</strong>.</li>
            <li>By 2030, an estimated <strong>15 to 20% of pupils will have an ISP</strong>.</li>
            <li>Around 1 in 8 pupils expected to transition from an EHCP to an ISP between 2030 and 2035.</li>
            <li>EHCPs expected to fall from <strong>5.3% to 4.7% by 2034-35</strong>.</li>
            <li>From <strong>2028-29, central government covers SEND spending in full</strong>.</li>
            <li>Consultation closes <strong>11:59pm on 18 May 2026</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="four-levels" icon={Layers} title="The four-level support model">
        <div className="space-y-6">
          <p>
            The White Paper introduces a <strong>four-level model of support</strong>. This replaces the previous informal tiers with a structured framework.
          </p>

          <TierDiagram
            title="Confirmed four-level support model"
            tiers={[
              { tier: "Level 4", title: "Specialist", description: "Comprehensive support through a Specialist Provision Package and EHCP in mainstream or specialist settings. Day-to-day support also recorded in an ISP.", color: "confirmed" },
              { tier: "Level 3", title: "Targeted Plus", description: "More specialist support from educational psychologists, speech and language therapists via the new Experts at Hand programme. Recorded in an ISP.", color: "confirmed" },
              { tier: "Level 2", title: "Targeted", description: "Structured support such as speech and language in small groups or sensory support. Recorded in a digital Individual Support Plan.", color: "confirmed" },
              { tier: "Level 1", title: "Universal", description: "High-quality adaptive teaching, calm environments, early help for all children.", color: "confirmed" },
            ]}
            note="This four-level model is from the Schools White Paper (23 February 2026). It is a formal consultation proposal, not yet enacted in law."
          />
        </div>
      </ContentBox>

      <ContentBox id="isps" icon={ClipboardList} title="Individual Support Plans">
        <div className="space-y-3">
          <p>
            <strong>Individual Support Plans (ISPs) are the most significant new element.</strong> They will be a legal duty on every school, nursery, and college.
          </p>
          <ul className="space-y-2">
            <li>ISPs are digital records of needs, support, and delivery, accessible to teachers and parents.</li>
            <li>Every child with an EHCP will also have an ISP for day-to-day support.</li>
            <li>No changes to EHCP support will begin before <strong>September 2030</strong>.</li>
            <li>Assessment of whether needs can be better met via ISP will only apply to <strong>children aged seven or younger today</strong>.</li>
            <li>All other children keep existing EHCPs until at least age 16.</li>
            <li>Children in special schools are <strong>not affected by any reassessment</strong>.</li>
          </ul>
          <p>
            <strong>ISPs are school-led duties. They are not statutory plans under the Children and Families Act 2014.</strong> This means ISP complaints cannot be appealed to the SEND Tribunal. This is a significant gap that parents should be aware of and raise during consultation.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="experts" icon={GraduationCap} title="Experts at Hand programme">
        <div className="space-y-3">
          <p>
            The <strong>Experts at Hand</strong> programme commits around £1.8 billion over three years. It deploys specialist professionals directly into schools and local areas:
          </p>
          <ul className="space-y-2">
            <li>Occupational therapists.</li>
            <li>Educational psychologists.</li>
            <li>Speech and language therapists.</li>
          </ul>
          <p>
            The aim is for families to access specialist advice and assessment <strong>without navigating referral routes independently</strong>. This is one of the strongest practical commitments in the White Paper.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="specialist" icon={Building2} title="Expansion of specialist provision">
        <div className="space-y-3">
          <p>
            <strong>Over £3.7 billion is committed to creating 60,000 specialist places</strong> in nurseries, schools, and colleges.
          </p>
          <p>
            Special schools and alternative provision settings are given a <strong>stronger outreach role</strong>. A child does not need to attend a special school to potentially benefit from its expertise. AP is being repositioned as part of the support ecosystem, not just a last resort for excluded children.
          </p>
          <p>
            Inclusion bases are expected in every secondary school, plus equivalent primary places. <strong>Two thirds of secondary schools will have an inclusion base by 2029-30.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="executive-function" icon={Brain} title="Executive function and ADHD reclassification">
        <div className="space-y-3">
          <p>
            The refreshed SEND Code of Practice proposes new areas of development including <strong>executive function</strong> as a named policy area. This determines what statutory provision a child receives.
          </p>
          <p>
            <strong>ADHD is being reclassified out of SEMH</strong> (Social, Emotional and Mental Health). This is a meaningful shift in how the system categorises and responds to ADHD children. Specialist provision packages include categories for profound learning difficulties, significant executive function, complex executive function and communication, social and emotional development, sensory impairment, and physical disability.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="early-years" icon={Baby} title="Early years provisions">
        <div className="space-y-3">
          <p>The White Paper includes specific early years commitments:</p>
          <ul className="space-y-2">
            <li>Early years settings will receive a share of the <strong>Inclusive Mainstream Fund</strong>.</li>
            <li>Early years settings carry the <strong>same new duty to produce ISPs</strong>.</li>
            <li>Funded partnerships between early years providers and primary schools are planned to support transitions.</li>
            <li>A <strong>fast-track route to specialist provision</strong> is being developed for children under five with the most complex needs, alongside the NHS.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="school-choice" icon={School} title="Changes to school choice">
        <div className="space-y-3">
          <p>
            <strong>Parents will face a direct change to school choice.</strong> The free choice of school will be replaced by a system in which families are given a list of possible placements.
          </p>
          <p>
            Families will be asked to express a preference from that list. The local authority will have greater control over the final decision. <strong>This is a direct change to an existing right</strong> and is likely to be one of the most contested elements of the consultation.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="Funding and deficit absorption">
        <div className="space-y-3">
          <p>
            The government has confirmed it will <strong>write off 90% of council SEND deficits</strong>, a rescue package worth over £5 billion.
          </p>
          <p>
            From 2028-29, <strong>central government will take full responsibility for SEND spending growth</strong>. Total additional SEND funding is £7 billion more in 2028-29 than 2025-26.
          </p>
          <p>
            For parents, this matters because <strong>the council deficit bailout removes the most dire financial excuses for denying support</strong>. Councils can no longer point to near-bankruptcy as a reason to ration.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="disadvantage" icon={ArrowRightLeft} title="Disadvantage funding reform">
        <div className="space-y-3">
          <p>
            The government is developing a <strong>new model for targeting disadvantage funding</strong> using income data rather than the binary metric of free school meals eligibility.
          </p>
          <p>
            A stepped model could take into account how low family income is and for how long. A consultation will be held in <strong>summer 2026</strong>. This directly affects SEND families on low incomes.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="workforce" icon={GraduationCap} title="Workforce training">
        <div className="space-y-3">
          <p>
            The <strong>£200 million SEND teacher training programme</strong> aims to ensure every teacher can support children with SEND. This includes:
          </p>
          <ul className="space-y-2">
            <li>Mandatory SEND training for teachers.</li>
            <li>Expanded SENCO training, especially in early years.</li>
            <li>Increased training routes for educational psychologists.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="inclusion" icon={MapPin} title="Local inclusion and accountability">
        <div className="space-y-3">
          <p>
            Councils and Integrated Care Boards have been <strong>instructed to begin drafting local SEND reform plans now</strong>. A local partnership maturity assessment tool is being used, with local areas self-assessing across seven system pillars.
          </p>
          <p>
            This operational preparation is not legislative change. <strong>Pilots are not national policy.</strong> But it signals the direction of travel clearly.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="digital" icon={Monitor} title="Digital processes and standardisation">
        <div className="space-y-3">
          <p>
            ISPs are designed as <strong>digital records accessible to teachers and parents</strong>. Councils are continuing work on standardised EHCP templates. The move towards digital-first processes aims to reduce paperwork, improve transparency, and make it easier for families to see what is happening.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="unchanged" icon={ShieldCheck} title="What remains protected">
        <div className="space-y-3">
          <p>
            <strong>Nothing in the White Paper changes existing law until the consultation closes and legislation passes Parliament.</strong> EHCPs remain legally enforceable. Appeal routes remain. Timescales remain.
          </p>
          <p>
            The consultation closes on 18 May 2026. <strong>These are consultation proposals. None have legal force yet.</strong>
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
