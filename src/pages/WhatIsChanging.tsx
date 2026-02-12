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
      <SEOHead title="What is changing" description="Confirmed SEND reforms and official government plans for education in England." path="/what-is-changing" />
      <PageOrientation
        title="What is actually changing in SEND"
        description="Confirmed reforms and official plans from government."
        lastUpdated="7th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            Right now, very little has changed in law, but a lot is happening behind the scenes. The government has accepted that the SEND system is under serious financial and capacity pressure. That is why it has agreed to take on council SEND debts in the future, is building more special schools, and is funding large scale training for staff. These actions tell us the system is being stabilised while larger reforms are worked through. What matters for parents is this: your child's rights, plans, and support processes are still the same today. The changes so far are about preparation, not removal of support.
          </p>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Confirmed changes already in motion
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>The government has committed to absorbing local authority SEND related deficits from 2028 to 29.</li>
            <li>National high needs funding has increased in recent years.</li>
            <li>New special free schools have been approved and are being built.</li>
            <li>A national SEND training programme for school staff has been announced.</li>
            <li>Educational Psychologist training places are being expanded.</li>
            <li>Pilot programmes are testing new approaches to SEND delivery.</li>
            <li>Digital development work for Education, Health and Care Plan systems is underway in some areas.</li>
            <li>A national SEND reform conversation ran in late 2025 and early 2026.</li>
            <li>A Schools White Paper including SEND proposals is expected.</li>
          </ul>
          <p className="mt-4 font-medium text-foreground">These actions are confirmed.</p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this tells us about direction of travel
        </h2>
        <div className="prose-calm">
          <p className="mb-4">Government has acknowledged that:</p>
          <ul className="space-y-2 mb-6">
            <li>The system is financially unstable.</li>
            <li>Demand for plans is rising.</li>
            <li>Delays are too long.</li>
            <li>Outcomes are not improving sufficiently.</li>
            <li>The process has become adversarial.</li>
          </ul>
          <p className="mb-4">Current confirmed activity focuses on:</p>
          <ul className="space-y-2 mb-6">
            <li>Financial stabilisation</li>
            <li>Workforce and capacity expansion</li>
            <li>Preparation for wider system reform</li>
          </ul>
          <div className="bg-status-confirmed-bg border border-[hsl(var(--status-confirmed-border))] rounded-lg p-4 mt-4">
            <p className="font-medium text-foreground">No confirmed action reduces legal rights or removes statutory duties.</p>
          </div>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What has not changed within these developments
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>The legal test for an Education, Health and Care Plan remains the same.</li>
            <li>Appeal rights remain the same.</li>
            <li>Plans remain legally enforceable.</li>
            <li>The 20 week legal timeframe remains in force.</li>
          </ul>
          <div className="bg-status-confirmed-bg border border-[hsl(var(--status-confirmed-border))] rounded-lg p-4 mt-4">
            <p className="text-foreground">Operational pressure has increased.</p>
            <p className="font-medium text-foreground">The legal framework has not changed.</p>
          </div>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What this means for parents right now
        </h2>
        <div className="prose-calm">
          <ul className="space-y-2 mb-6">
            <li>Decisions must still follow current law.</li>
            <li>Existing plans remain enforceable.</li>
            <li>New assessments must meet the existing legal test.</li>
            <li>Appeals remain available.</li>
          </ul>
          <p className="mb-4">At the same time:</p>
          <ul className="space-y-2 mb-6">
            <li>Local authorities are under financial pressure.</li>
            <li>Schools are managing rising complexity of need.</li>
            <li>Reform proposals are being developed.</li>
          </ul>
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <p className="font-medium text-foreground">This creates uncertainty, but not immediate legal change.</p>
          </div>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-foreground">Unconfirmed</h2>
          <StatusBadge status="unconfirmed" />
        </div>
        <div className="prose-calm">
          <ul className="space-y-2">
            <li>No confirmed changes to the legal threshold for plans.</li>
            <li>No confirmed changes to appeal rights.</li>
            <li>No confirmed removal of existing plans.</li>
            <li>No confirmed introduction of a tiered system.</li>
            <li>No confirmed change to enforceability of support.</li>
          </ul>
          <p className="mt-4 text-muted-foreground italic">These areas remain under discussion.</p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-foreground">Leaked</h2>
          <StatusBadge status="unconfirmed" />
        </div>
        <div className="bg-status-unconfirmed-bg border border-[hsl(var(--status-unconfirmed-border))] rounded-lg p-5">
          <div className="prose-calm">
            <p className="mb-4">Media reporting has suggested possible future changes, including:</p>
            <ul className="space-y-2 mb-6">
              <li>Limiting full statutory plans to children with the most complex needs.</li>
              <li>Introducing tiered support below a full plan.</li>
              <li>Moving funding from individual plans to school level budgets.</li>
              <li>Reducing tribunal volumes by altering appeal processes.</li>
            </ul>
            <p className="font-medium text-foreground mb-4">These proposals are not confirmed government policy. They relate to potential future reform.</p>
            <p className="mb-4">If introduced, they could:</p>
            <ul className="space-y-2 mb-4">
              <li>Reduce the number of children qualifying for statutory plans.</li>
              <li>Shift accountability towards schools.</li>
              <li>Change how appeals operate.</li>
            </ul>
            <p className="font-medium text-foreground">No such changes have been legislated.</p>
          </div>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          The position today
        </h2>
        <div className="prose-calm">
          <p className="mb-4">Confirmed change is focused on:</p>
          <ul className="space-y-2 mb-6">
            <li>Funding stability</li>
            <li>Workforce expansion</li>
            <li>Capacity building</li>
            <li>Reform preparation</li>
          </ul>
          <div className="bg-status-confirmed-bg border border-[hsl(var(--status-confirmed-border))] rounded-lg p-4">
            <p className="text-foreground mb-2">Structural legal change has not occurred.</p>
            <p className="font-medium text-foreground">Parents should continue to rely on current law when seeking support or challenging decisions.</p>
          </div>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
