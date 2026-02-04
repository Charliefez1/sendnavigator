import { Layout } from "@/components/Layout";
import {
  PageOrientation,
  SixtySecondSummary,
  InformationLayers,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatIsChanging() {
  return (
    <Layout>
      <PageOrientation
        title="What is actually changing in SEND"
        description="Confirmed reforms and official plans from government."
        lastUpdated="4th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            Changes so far focus on funding pressure, workforce capacity, and preparation for reform. The legal system itself has not yet changed.
          </p>
        }
      />

      <InformationLayers
        confirmed={
          <>
            <ul className="space-y-2">
              <li>No SEND law changes have been made yet as of 04 February 2026.</li>
              <li>The government has said it will absorb local authority SEND related deficits from 2028 to 29.</li>
              <li>New special free schools are approved and being built.</li>
              <li>A national SEND training programme for schools has been announced.</li>
              <li>Reform work is underway through pilot programmes and implementation activity already in progress.</li>
            </ul>
          </>
        }
        discussedEmpty="See 'What is being discussed' for proposals under consideration."
        unconfirmedEmpty="See 'What the leaks are saying' for unconfirmed reports."
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents
        </h2>
        <div className="prose-calm">
          <p>
            Right now, your child's legal position has not changed. Education, Health and Care Plans still work the same way and local authorities still have the same duties. What has changed is the background pressure the system is under. Research shows councils are carrying very large SEND deficits and are struggling to meet demand. The decision to absorb these deficits tells us the government accepts the system is financially broken and needs redesign. At the same time, training and new specialist schools suggest recognition that capacity and skills are part of the problem, not families. These changes are about stabilising the system while larger reforms are prepared.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
