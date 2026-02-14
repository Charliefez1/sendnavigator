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
import { Users, BarChart3, ClipboardList, Monitor, GraduationCap, Building2, MapPin, PoundSterling, ShieldCheck } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "standards", icon: ClipboardList, title: "National SEND standards" },
  { id: "digital", icon: Monitor, title: "Digital first and standardised EHCP processes" },
  { id: "workforce", icon: GraduationCap, title: "Workforce training and capacity building" },
  { id: "specialist", icon: Building2, title: "Expansion of specialist provision" },
  { id: "inclusion", icon: MapPin, title: "Local inclusion planning and accountability" },
  { id: "funding", icon: PoundSterling, title: "Funding direction and deficit absorption" },
  { id: "unchanged", icon: ShieldCheck, title: "What has not changed yet" },
];

export default function WhatIsChanging() {
  return (
    <Layout>
      <SEOHead title="Confirmed changes to SEND provision in 2026" description="What changes to SEND in England have been confirmed, funded, or formally announced." path="/what-is-changing" />
      <PageOrientation
        title="Confirmed changes: what changes are coming to SEND provision in 2026 and have been confirmed"
        description="Changes that have been publicly set out, funded, or formally announced."
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
              Some changes to SEND in England are no longer speculative. <strong>They have been publicly set out, funded, or formally announced</strong>, even if not fully delivered yet.
            </p>
            <p>
              <strong>These confirmed changes do not remove current legal rights.</strong> Education, Health and Care Plans still exist. Tribunal rights still exist. The Children and Families Act 2014 is still in force.
            </p>
            <p>
              What is changing is how the system is being prepared to work differently. The focus is on <strong>clearer national expectations, earlier support, less bureaucracy, better workforce capacity, and reducing the extreme pressure points</strong> that currently force families into crisis routes.
            </p>
            <p>
              Most of these changes are being <strong>phased in through guidance, programmes, pilots, and capital investment</strong>, with legislation expected later.
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            In the short term, <strong>most families will not see an overnight difference</strong>. Rights and processes remain the same today.
          </p>
          <p>
            Over time, if these changes work as intended, families should experience <strong>clearer expectations, fewer delays, and less need to fight for basic support</strong>. Schools should be better equipped to respond earlier. Local authorities should be more consistent and more accountable.
          </p>
          <p>
            However, <strong>impact will depend on delivery</strong>. Training takes time. Capacity takes time. Digital systems take time. Until those changes bed in, families may still experience the same pressures they face now.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-3">
          <p>These are the confirmed facts.</p>
          <ul className="space-y-2">
            <li>The government confirmed it will <strong>write off 90% of council SEND deficits up to 2025 to 2026</strong>, a rescue package worth over £5 billion. Councils must submit local SEND reform plans by autumn 2026 to qualify.</li>
            <li>From <strong>2028 to 2029, central government will cover SEND spending in full</strong>, relieving councils of these costs going forward.</li>
            <li>A <strong>£3.7 billion capital investment</strong> is creating 60,000 new SEND places, including new special schools and specialist units in mainstream schools, roughly a 30 to 40% increase in specialist places nationally.</li>
            <li>Every secondary school is expected to have an <strong>"inclusion base"</strong>, a dedicated space for SEND students to receive targeted support while staying included in school life.</li>
            <li>Workforce investment includes a <strong>£200 million SEND training programme</strong>, new qualifications for SENCOs, and training for around 400 additional educational psychologists.</li>
            <li>Ofsted has introduced a new <strong>"Inclusion" judgement in school inspections</strong>, meaning schools are now formally evaluated on how well they include and support children with SEND.</li>
            <li>National SEND standards are confirmed as policy direction, with <strong>consultation and phased introduction planned for 2026 to 2027</strong>. The government has said it will legislate so these standards have legal force.</li>
            <li>Nine Regional Expert Partnerships are testing new approaches, and a <strong>digital EHCP template is being piloted</strong> in several areas.</li>
            <li><strong>Safety Valve agreements (£300 million)</strong> and the Delivering Better Value in SEND programme (£85 million for 55 councils) continue alongside the broader reforms.</li>
            <li>All local areas will be inspected under the new <strong>Ofsted and CQC area SEND framework by 2027</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="standards" icon={ClipboardList} title="National SEND standards">
        <div className="space-y-3">
          <p>
            The government has confirmed that <strong>national SEND standards will be introduced</strong>. These standards are intended to set out what support should ordinarily be available for children and young people with SEND, regardless of where they live.
          </p>
          <p>
            The purpose is to <strong>reduce postcode variation</strong> and to make it clearer what should happen at SEN Support level, before families are pushed towards an EHCP. The standards are being co-produced and consulted on. They are not yet in force, but their introduction is confirmed.
          </p>
          <p>
            For parents, this matters because it should eventually mean <strong>clearer expectations and fewer arguments about what support a setting should already be providing</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="digital" icon={Monitor} title="Digital first and standardised EHCP processes">
        <div className="space-y-3">
          <p>
            The move towards digital EHCP processes is confirmed. The aim is to <strong>reduce paperwork, improve transparency, and make it easier for families to see what is happening and when</strong>.
          </p>
          <p>
            Pilots are already running in some areas. These allow families to track progress, reuse information, and reduce duplication of reports. Standard templates are also part of this work, so that EHCPs look and read more consistently across England.
          </p>
          <p>
            <strong>This is not a new legal process. It is a different way of running the same legal process.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="workforce" icon={GraduationCap} title="Workforce training and capacity building">
        <div className="space-y-3">
          <p>
            The government has confirmed <strong>significant investment in SEND workforce development</strong>.
          </p>
          <p>This includes:</p>
          <ul className="space-y-2">
            <li>Mandatory SEND training for teachers.</li>
            <li>Expanded SENCO training, especially in early years.</li>
            <li>Increased training routes for educational psychologists.</li>
            <li>Development of specialist SEND qualifications.</li>
          </ul>
          <p>
            The intention is to <strong>improve early identification and day to day support</strong>, so that fewer children reach crisis point before help arrives.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="specialist" icon={Building2} title="Expansion of specialist provision">
        <div className="space-y-3">
          <p>
            <strong>New special schools are being built and funded.</strong> This is a confirmed capital programme.
          </p>
          <p>
            The aim is to reduce waiting lists, reduce out of area placements, and reduce reliance on expensive independent provision. <strong>This does not remove the presumption of mainstream education</strong>, but it acknowledges that some children need specialist environments.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="inclusion" icon={MapPin} title="Local inclusion planning and accountability">
        <div className="space-y-3">
          <p>
            Local areas are being required to <strong>plan SEND provision across education, health and care more jointly</strong>. This is being reinforced through Ofsted and CQC area inspections.
          </p>
          <p>
            Where areas repeatedly fail, the Department for Education now has <strong>clearer intervention powers</strong>. This is intended to shift the system from reactive firefighting to planned provision.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="funding" icon={PoundSterling} title="Funding direction and deficit absorption">
        <div className="space-y-3">
          <p>
            In February 2026, the government confirmed it will <strong>write off 90% of council SEND deficits</strong>, a rescue package worth over £5 billion. Previously, 95% of councils were running SEND budget deficits, and 79% risked insolvency by 2028.
          </p>
          <p>
            From 2028 to 2029, <strong>central government will take full responsibility for SEND spending growth</strong>. This is a fundamental shift. Councils will no longer carry the financial risk of rising demand on their own.
          </p>
          <p>
            For parents, this matters because <strong>the council deficit bailout removes the most dire financial excuses for denying support</strong>. Councils can no longer point to near-bankruptcy as a reason to ration. However, future budgets will still be cash limited, which is why the government is also focusing on earlier support and system redesign.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="unchanged" icon={ShieldCheck} title="What has not changed yet">
        <div className="space-y-3">
          <p>
            It is important to be clear. <strong>None of these confirmed changes remove existing rights.</strong> EHCPs remain legally enforceable. Appeal routes remain. Timescales remain.
          </p>
          <p>
            The confirmed changes are about <strong>preparation, capacity, and consistency, not about removing protections</strong>.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
