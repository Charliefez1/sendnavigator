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
import { RightsChecklist, PercentageRing } from "@/components/templates/DataVisuals";
import { Users, BarChart3, Scale, Shield, Gavel, AlertTriangle, Clock, ShieldCheck, MessageCircle } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "law", icon: Scale, title: "The law has not changed" },
  { id: "ehcps", icon: Shield, title: "EHCPs are still enforceable" },
  { id: "appeals", icon: Gavel, title: "Appeal rights remain" },
  { id: "sen-support", icon: AlertTriangle, title: "SEN Support remains variable" },
  { id: "timescales", icon: Clock, title: "Timescales remain, even if they are not met" },
  { id: "no-reclassification", icon: ShieldCheck, title: "No child is being moved or reclassified" },
  { id: "noisy", icon: MessageCircle, title: "Why this matters in a noisy environment" },
];

export default function WhatHasNotChanged() {
  return (
    <Layout>
      <SEOHead title="What has not changed in the SEND system" description="Legal rights and protections that remain in place as of February 2026." path="/what-has-not-changed" />
      <PageOrientation
        title="What has not changed: what remains the same in the SEND system as of 15 February 2026"
        description="Legal rights and protections that remain in place."
        lastUpdated="15th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Despite the volume of discussion about reform, <strong>the core legal structure of SEND in England has not changed</strong>.
            </p>
            <p>
              Education, Health and Care Plans still exist. <strong>The Children and Families Act 2014 is still the law.</strong> Local authorities are still legally responsible for securing the provision written into an EHCP. Parents still have the right to appeal decisions and to challenge failures. In February 2026, <strong>Education Minister Georgia Gould publicly confirmed that children with special needs will keep their current support and placements</strong>.
            </p>
            <p>
              <strong>No child has lost their legal protections because of reform discussions.</strong> No existing EHCP has been removed or downgraded because of proposed changes. Current processes, however imperfect, remain in force.
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            For families right now, this means <strong>certainty in a period of noise</strong>.
          </p>
          <p>
            If your child has an EHCP, <strong>it is still legally binding</strong>. If you are applying for one, the same legal tests apply. If provision is not delivered, you still have routes to challenge.
          </p>
          <p>
            At the same time, the pressures you experience have not disappeared. Delays, inconsistency, and conflict remain part of many families' lived experience. <strong>Reform discussions do not fix today's problems overnight, but they also do not take away today's rights.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <p>These facts reflect what has remained unchanged.</p>

          {/* Rights checklist visual */}
          <RightsChecklist
            title="Rights still in force as of 15 February 2026"
            items={[
              "Children and Families Act 2014 remains the legal framework",
              "EHCPs remain statutory and legally enforceable",
              "Right to request an EHCP assessment at any time",
              "Right to appeal to the SEND Tribunal",
              "Right to choose a school and have it named in the EHCP",
              "Local authorities remain legally responsible for EHCP provision",
              "SEND Code of Practice remains in force",
              "20-week statutory timescale unchanged",
            ]}
          />

          {/* Percentage rings for key unchanged stats */}
          <div className="flex flex-wrap justify-center gap-8 py-4">
            <PercentageRing percentage={60} label="EHCPs issued on time" sublabel="Unchanged from 2023" color="discussed" />
            <PercentageRing percentage={90} label="Parent tribunal win rate" sublabel="Of decided cases" color="confirmed" />
            <PercentageRing percentage={22} label="Support not delivered" sublabel="Parents reporting gaps" color="unconfirmed" />
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>No confirmed legislative changes have been enacted</strong> as of 15 February 2026. The problems persist, but the rights persist too.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="law" icon={Scale} title="The law has not changed">
        <div className="space-y-3">
          <p>
            The most important point for parents to understand is this. <strong>The law has not moved.</strong>
          </p>
          <p>
            The Children and Families Act 2014 still governs SEND in England. <strong>Any major change to EHCP eligibility, appeal rights, or legal duties would require new primary legislation.</strong> That has not happened.
          </p>
          <p>
            This means the legal tests for an EHCP are unchanged. If a child has or may have special educational needs, and may require special educational provision beyond what is ordinarily available, <strong>the local authority still has a duty to assess</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="ehcps" icon={Shield} title="EHCPs are still enforceable">
        <div className="space-y-3">
          <p>
            <strong>An EHCP is still a legal document.</strong> The provision written into it must be delivered. Section F remains enforceable.
          </p>
          <p>
            If provision is missing, delayed, or reduced without agreement, <strong>families still have the right to challenge</strong> through complaints, mediation, or tribunal.
          </p>
          <p>
            Nothing in the confirmed reform activity removes that protection.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="appeals" icon={Gavel} title="Appeal rights remain">
        <div className="space-y-3">
          <p><strong>Parents still have the right to appeal:</strong></p>
          <ul className="space-y-2">
            <li>Refusals to assess.</li>
            <li>Refusals to issue an EHCP.</li>
            <li>The content of an EHCP.</li>
            <li>The named placement.</li>
          </ul>
          <p>
            The SEND Tribunal continues to operate under the same powers. <strong>High parent success rates in tribunal cases reflect system behaviour, not a change in legal thresholds.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="sen-support" icon={AlertTriangle} title="SEN Support remains variable">
        <div className="space-y-3">
          <p>
            <strong>SEN Support remains non-statutory and locally variable.</strong> There is still no single national definition of what must be provided at this level.
          </p>
          <p>
            This is one of the drivers behind reform, but as of February 2026, this inconsistency remains.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="timescales" icon={Clock} title="Timescales remain, even if they are not met">
        <div className="space-y-3">
          <p>
            <strong>The legal 20 week deadline still exists.</strong> Enforcement has not changed. Families still experience delays, but the law itself has not been amended.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="no-reclassification" icon={ShieldCheck} title="No child is being moved or reclassified because of reform talk">
        <div className="space-y-3">
          <p>
            <strong>There is no confirmed policy that removes EHCPs from children already holding them.</strong> There is no confirmed policy that forces children out of specialist provision or into mainstream.
          </p>
          <p>
            Any claims suggesting that rights have already been taken away are <strong>not supported by the evidence</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="noisy" icon={MessageCircle} title="Why this matters in a noisy environment">
        <div className="space-y-3">
          <p>
            When there is a lot of discussion, leaks, and commentary, it is easy for families to feel that the ground is shifting under their feet.
          </p>
          <p>
            The reality, as of 15 February 2026, is more stable than the headlines suggest. The system is under pressure. Reform is coming. But <strong>the legal foundations remain in place</strong>.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
