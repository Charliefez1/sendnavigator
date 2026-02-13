import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

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
              Some changes to SEND in England are no longer speculative. They have been publicly set out, funded, or formally announced, even if not fully delivered yet.
            </p>
            <p>
              These confirmed changes do not remove current legal rights. Education, Health and Care Plans still exist. Tribunal rights still exist. The Children and Families Act 2014 is still in force.
            </p>
            <p>
              What is changing is how the system is being prepared to work differently. The focus is on clearer national expectations, earlier support, less bureaucracy, better workforce capacity, and reducing the extreme pressure points that currently force families into crisis routes.
            </p>
            <p>
              Most of these changes are being phased in through guidance, programmes, pilots, and capital investment, with legislation expected later.
            </p>
          </div>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          How will this impact children and parents
        </h2>
        <div className="prose-calm space-y-3">
          <p>
            In the short term, most families will not see an overnight difference. Rights and processes remain the same today.
          </p>
          <p>
            Over time, if these changes work as intended, families should experience clearer expectations, fewer delays, and less need to fight for basic support. Schools should be better equipped to respond earlier. Local authorities should be more consistent and more accountable.
          </p>
          <p>
            However, impact will depend on delivery. Training takes time. Capacity takes time. Digital systems take time. Until those changes bed in, families may still experience the same pressures they face now.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Statistics and facts
        </h2>
        <div className="prose-calm space-y-3">
          <p>These points are drawn directly from the checked research set.</p>
          <ul className="space-y-2">
            <li>National SEND standards are confirmed as government policy direction, with consultation and phased introduction planned for 2026 to 2027.</li>
            <li>A digital first, standardised approach to EHCP processes is confirmed, with pilots already running in selected areas.</li>
            <li>Workforce investment is confirmed, including a £200 million SEND training programme announced in late 2025.</li>
            <li>Plans include training up to 5,000 early years staff as SENCOs.</li>
            <li>Funding for training of around 400 additional educational psychologists has been announced.</li>
            <li>Over 80 new special free schools are in the pipeline, supported by £2.6 billion capital investment between 2022 and 2025.</li>
            <li>A £70 million Change Programme is underway with selected local authorities testing new approaches.</li>
            <li>The government has committed to absorbing historic local authority SEND deficits from 2028 to 2029.</li>
            <li>Ofsted and CQC area SEND inspections are now established as a core accountability mechanism.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What has actually been confirmed, in plain language
        </h2>
        <div className="prose-calm space-y-6">

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">National SEND standards</h3>
            <p>
              The government has confirmed that national SEND standards will be introduced. These standards are intended to set out what support should ordinarily be available for children and young people with SEND, regardless of where they live.
            </p>
            <p>
              The purpose is to reduce postcode variation and to make it clearer what should happen at SEN Support level, before families are pushed towards an EHCP. The standards are being co-produced and consulted on. They are not yet in force, but their introduction is confirmed.
            </p>
            <p>
              For parents, this matters because it should eventually mean clearer expectations and fewer arguments about what support a setting should already be providing.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Digital first and standardised EHCP processes</h3>
            <p>
              The move towards digital EHCP processes is confirmed. The aim is to reduce paperwork, improve transparency, and make it easier for families to see what is happening and when.
            </p>
            <p>
              Pilots are already running in some areas. These allow families to track progress, reuse information, and reduce duplication of reports. Standard templates are also part of this work, so that EHCPs look and read more consistently across England.
            </p>
            <p>
              This is not a new legal process. It is a different way of running the same legal process.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Workforce training and capacity building</h3>
            <p>
              The government has confirmed significant investment in SEND workforce development.
            </p>
            <p>This includes:</p>
            <ul className="space-y-2">
              <li>Mandatory SEND training for teachers.</li>
              <li>Expanded SENCO training, especially in early years.</li>
              <li>Increased training routes for educational psychologists.</li>
              <li>Development of specialist SEND qualifications.</li>
            </ul>
            <p>
              The intention is to improve early identification and day to day support, so that fewer children reach crisis point before help arrives.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Expansion of specialist provision</h3>
            <p>
              New special schools are being built and funded. This is a confirmed capital programme.
            </p>
            <p>
              The aim is to reduce waiting lists, reduce out of area placements, and reduce reliance on expensive independent provision. This does not remove the presumption of mainstream education, but it acknowledges that some children need specialist environments.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Local inclusion planning and accountability</h3>
            <p>
              Local areas are being required to plan SEND provision across education, health and care more jointly. This is being reinforced through Ofsted and CQC area inspections.
            </p>
            <p>
              Where areas repeatedly fail, the Department for Education now has clearer intervention powers. This is intended to shift the system from reactive firefighting to planned provision.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Funding direction and deficit absorption</h3>
            <p>
              The commitment to absorb historic SEND deficits from 2028 to 2029 is confirmed. This removes a major financial pressure from local authorities.
            </p>
            <p>
              However, future budgets will still be cash limited. This is why the government is focusing on earlier support and system redesign. This funding commitment does not remove the need for reform, but it creates space to implement it.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">What has not changed yet</h3>
            <p>
              It is important to be clear. None of these confirmed changes remove existing rights. EHCPs remain legally enforceable. Appeal routes remain. Timescales remain.
            </p>
            <p>
              The confirmed changes are about preparation, capacity, and consistency, not about removing protections.
            </p>
          </div>

        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
