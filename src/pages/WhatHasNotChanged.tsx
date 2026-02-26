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
  { id: "ehcps", icon: Shield, title: "EHCPs are explicitly retained" },
  { id: "appeals", icon: Gavel, title: "Appeal rights remain" },
  { id: "sen-support", icon: AlertTriangle, title: "SEN Support remains variable" },
  { id: "timescales", icon: Clock, title: "Timescales remain" },
  { id: "no-reclassification", icon: ShieldCheck, title: "No child is being moved or reclassified" },
  { id: "noisy", icon: MessageCircle, title: "Why this matters in a noisy environment" },
];

export default function WhatHasNotChanged() {
  return (
    <Layout>
      <SEOHead title="What has not changed in the SEND system" description="Legal rights and protections that remain in place as of 26 February 2026, including after the Schools White Paper." path="/what-has-not-changed" />
      <PageOrientation
        title="What has not changed: your legal rights remain in force"
        description="Legal rights and protections that remain in place, including after the Schools White Paper."
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
              Despite the volume of discussion about reform and the publication of the Schools White Paper on 23 February 2026, <strong>the core legal structure of SEND in England has not changed</strong>.
            </p>
            <p>
              Education, Health and Care Plans still exist. <strong>The Children and Families Act 2014 is still the law.</strong> The White Paper explicitly confirms that EHCPs are retained for children with complex needs. No changes to EHCP support will begin before September 2030.
            </p>
            <p>
              <strong>No child has lost their legal protections because of reform discussions or the White Paper.</strong> No existing EHCP has been removed or downgraded. Nothing in the White Paper changes existing law until the consultation closes on 18 May 2026 and legislation passes Parliament.
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
            The White Paper adds important protections: no child will lose support they currently receive. Assessment of whether needs can be better met via an ISP will only apply to <strong>children aged seven or younger today</strong>. All other children keep existing EHCPs until at least age 16. Children in special schools are not affected by any reassessment.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-6">
          <p>These facts reflect what has remained unchanged.</p>

          <RightsChecklist
            title="Rights still in force as of 26 February 2026"
            items={[
              "Children and Families Act 2014 remains the legal framework",
              "EHCPs remain statutory and legally enforceable",
              "The White Paper explicitly confirms EHCPs are retained",
              "Right to request an EHCP assessment at any time",
              "Right to appeal to the SEND Tribunal",
              "Right to choose a school and have it named in the EHCP",
              "Local authorities remain legally responsible for EHCP provision",
              "SEND Code of Practice remains in force",
              "20-week statutory timescale unchanged",
              "No changes to EHCP support before September 2030",
              "Children aged over seven keep EHCPs until at least age 16",
              "Children in special schools are not affected by any reassessment",
            ]}
          />

          <div className="flex flex-wrap justify-center gap-8 py-4">
            <PercentageRing percentage={60} label="EHCPs issued on time" sublabel="Unchanged from 2023" color="discussed" />
            <PercentageRing percentage={90} label="Parent tribunal win rate" sublabel="Of decided cases" color="confirmed" />
            <PercentageRing percentage={22} label="Support not delivered" sublabel="Parents reporting gaps" color="unconfirmed" />
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>No legislative changes have been enacted.</strong> The White Paper is a consultation document, not legislation. The problems persist, but the rights persist too.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="law" icon={Scale} title="The law has not changed">
        <div className="space-y-3">
          <p>
            The most important point for parents to understand is this. <strong>The law has not moved.</strong>
          </p>
          <p>
            The Children and Families Act 2014 still governs SEND in England. <strong>Any major change to EHCP eligibility, appeal rights, or legal duties would require new primary legislation.</strong> That has not happened. The White Paper confirms EHCPs are retained. Any changes remain subject to consultation (closing 18 May 2026) and subsequent legislation.
          </p>
          <p>
            This means the legal tests for an EHCP are unchanged. If a child has or may have special educational needs, and may require special educational provision beyond what is ordinarily available, <strong>the local authority still has a duty to assess</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="ehcps" icon={Shield} title="EHCPs are explicitly retained">
        <div className="space-y-3">
          <p>
            <strong>The White Paper explicitly states that EHCPs are retained</strong> for children with the most complex needs. An EHCP is still a legal document. The provision written into it must be delivered. Section F remains enforceable.
          </p>
          <p>
            Every child with an EHCP will also have an ISP for day-to-day support, but <strong>the EHCP remains the legally binding document</strong>. If provision is missing, delayed, or reduced without agreement, families still have the right to challenge through complaints, mediation, or tribunal.
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
          <p>
            <strong>Important:</strong> ISP complaints cannot be appealed to the SEND Tribunal. ISPs are school-led duties, not statutory plans under the Children and Families Act 2014. This is a significant gap that parents should raise during the consultation.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="sen-support" icon={AlertTriangle} title="SEN Support remains variable">
        <div className="space-y-3">
          <p>
            <strong>SEN Support remains non-statutory and locally variable.</strong> The White Paper proposes to address this through ISPs and the four-level support model, but until legislation is enacted, the current inconsistency remains.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="timescales" icon={Clock} title="Timescales remain">
        <div className="space-y-3">
          <p>
            <strong>The legal 20 week deadline still exists.</strong> Enforcement has not changed. Families still experience delays, but the law itself has not been amended.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="no-reclassification" icon={ShieldCheck} title="No child is being moved or reclassified">
        <div className="space-y-3">
          <p>
            <strong>There is no policy that removes EHCPs from children already holding them.</strong> The White Paper explicitly states no child will lose support they currently receive. No changes before September 2030. Children in special schools are not affected.
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
            The reality, as of 26 February 2026, is more stable than the headlines suggest. The White Paper is a consultation document, not enacted law. The system is under pressure. Reform is being consulted on. But <strong>the legal foundations remain in place</strong>. The consultation closes on 18 May 2026. Make your voice heard.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
