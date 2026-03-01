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
import { TierDiagram, RightsChecklist } from "@/components/templates/DataVisuals";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";
import { Users, BarChart3, Wind, AlertTriangle, List, EyeOff, Megaphone, Filter, Shield, CheckCircle2, FileText } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "resolved", icon: CheckCircle2, title: "Leaks that are now resolved" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "kite-flying", icon: Wind, title: "What kite flying is" },
  { id: "sensitive", icon: AlertTriangle, title: "Why SEND is particularly sensitive" },
  { id: "themes", icon: List, title: "Remaining unconfirmed themes" },
  { id: "missing", icon: EyeOff, title: "What unconfirmed reports do not tell you" },
  { id: "reactions", icon: Megaphone, title: "Why strong reactions still matter" },
  { id: "filter", icon: Filter, title: "How to read unconfirmed reports safely" },
  { id: "grounding", icon: Shield, title: "A grounding reminder" },
];

export default function WhatTheLeaksAreSaying() {
  return (
    <Layout>
      <SEOHead title="What has been reported about SEND reform" description="What major media outlets have reported about SEND reform, what those reports are based on, and how reporting has evolved." path="/what-the-leaks-are-saying" />
      <PageOrientation icon={FileText}
        sectionLabel="SEND Reform Report"
        title="What has been reported: media coverage and its basis"
        description="What major outlets have reported, what those reports are actually based on, and how reporting has evolved over time."
        lastUpdated="26th February 2026"
        accentColor="hsl(175 65% 41%)"
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <section className="content-section py-6">
        <div className="rounded-xl border border-status-confirmed/30 bg-status-confirmed/5 p-5">
          <p className="text-sm font-semibold text-foreground mb-2">Update: 26 February 2026</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Schools White Paper was published on 23 February 2026. Many proposals previously reported as leaks are now confirmed as formal consultation proposals. This page has been updated to distinguish between resolved leaks (now in the White Paper) and themes that remain unconfirmed or where detail is still missing.
          </p>
        </div>
      </section>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Before the White Paper, there was a steady flow of unconfirmed reports about SEND reform. <strong>Several of those leaked proposals are now confirmed as formal consultation proposals.</strong> Others remain unverified or only partially addressed.
            </p>
            <p>
              This page tracks which leaks have been resolved and which remain open. Understanding the difference helps parents focus their energy and their consultation responses on what genuinely matters.
            </p>
          </div>
        }
      />

      <LatestUpdatesStream />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            Now that the White Paper is published, <strong>the main impact shifts from anxiety about leaks to engagement with the consultation</strong>. Parents can now see what is actually proposed rather than relying on anonymous briefings.
          </p>
          <p>
            The consultation closes at 11:59pm on 18 May 2026. <strong>Focus your energy on responding to the proposals, not on rumours about what might come next.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="resolved" icon={CheckCircle2} title="Leaks that are now resolved">
        <div className="space-y-6">
          <p>These previously leaked ideas are now confirmed as formal consultation proposals in the White Paper:</p>

          <RightsChecklist
            title="Leaks now confirmed in the White Paper"
            items={[
              "Individual Support Plans: confirmed as a proposed statutory school-led duty from September 2030",
              "Tiered support model: confirmed as a four-level framework (Universal, Targeted, Targeted Plus, Specialist)",
              "Mainstream inclusion push: confirmed via Inclusive Mainstream Fund (£1.6bn) and inclusion bases in every secondary school",
              "Experts at Hand programme: confirmed at £1.8bn over three years",
              "EHCPs retained: explicitly confirmed for children with the most complex needs",
              "EHCP trajectory targets: 5.3% falling to 4.7% by 2034-35, confirmed in the White Paper",
              "School choice changes: confirmed as a managed list system replacing free choice",
              "Executive function as a named policy area: confirmed in the refreshed SEND Code of Practice",
              "ADHD reclassification out of SEMH: confirmed",
            ]}
          />

          <p className="text-sm text-muted-foreground">
            <strong>These are consultation proposals, not enacted law.</strong> The consultation closes 18 May 2026.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li><strong>No unconfirmed report has been adopted into law.</strong></li>
            <li>Several leaked proposals are now formal consultation proposals in the White Paper.</li>
            <li>All major changes to SEND would require <strong>primary legislation, which has not been introduced</strong>.</li>
            <li>The formal consultation provides a structured route for parent input.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="kite-flying" icon={Wind} title="What kite flying is">
        <div className="space-y-3">
          <p>
            Kite flying is a common policy practice. <strong>Ideas are discussed privately, then selectively shared to test reaction.</strong> In the case of SEND reform, much of the kite flying has now been superseded by the formal consultation.
          </p>
          <p>
            This does not mean there will be no further leaks. As legislation is drafted, new ideas may be floated. But families now have the White Paper as a reference point.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="sensitive" icon={AlertTriangle} title="Why SEND is particularly sensitive">
        <div className="space-y-3">
          <p>
            SEND affects children, families, and legal rights. <strong>Any suggestion of reduced support understandably triggers strong reactions.</strong> Because the system is already under strain, rumours land harder. Trust is already fragile.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="themes" icon={List} title="Remaining unconfirmed themes">
        <div className="space-y-3">
          <p>These areas remain unresolved or only partially addressed in the White Paper:</p>
          <ul className="space-y-2">
            <li><strong>ISP complaints route:</strong> no independent complaints or appeal mechanism confirmed for ISP failures.</li>
            <li><strong>Mandatory mediation:</strong> proposed but detail on implementation is missing.</li>
            <li><strong>Practical thresholds:</strong> whether EHCPs will narrow in practice even if the legal test is unchanged.</li>
            <li><strong>Health workforce capacity:</strong> whether Experts at Hand funding is sufficient for the scale of need.</li>
            <li><strong>Race and ethnicity disparities:</strong> no detail on how identification gaps will be addressed.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="missing" icon={EyeOff} title="What unconfirmed reports do not tell you">
        <div className="space-y-3">
          <p>Even with the White Paper published, future reports may still omit:</p>
          <ul className="space-y-2">
            <li>What safeguards would be in place.</li>
            <li>How existing children would be protected.</li>
            <li>What funding would accompany changes.</li>
            <li>Whether ideas would survive parliamentary scrutiny.</li>
          </ul>
          <p>
            <strong>The White Paper is now the reference point.</strong> Anything reported beyond it should be treated with the same caution as before.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="reactions" icon={Megaphone} title="Why strong reactions still matter">
        <div className="space-y-3">
          <p>
            <strong>Public reaction matters.</strong> The Save Our Children's Rights campaign gathered <strong>over 130,000 petition signatures</strong>. The National Education Union formally urged the government to maintain legal thresholds for EHCPs. Labour MPs warned internally they would not back cost-saving measures that weaken rights.
          </p>
          <p>
            That visibility of concern has already <strong>influenced the White Paper's emphasis on retaining EHCPs and phasing changes slowly</strong>. The consultation is the next opportunity to shape the detail.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="filter" icon={Filter} title="How to read unconfirmed reports safely">
        <div className="space-y-3">
          <p><strong>Ask three questions:</strong></p>
          <ul className="space-y-2">
            <li>Is this in the White Paper, or is it speculation.</li>
            <li>Has anything actually changed today because of this.</li>
            <li>What protections still exist right now.</li>
          </ul>
          <p>
            <strong>In almost all cases, the answer to the second question is no.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="grounding" icon={Shield} title="A grounding reminder">
        <div className="space-y-3">
          <p>
            <strong>Your child's rights today are real. They are enforceable. They do not disappear because of a headline.</strong>
          </p>
          <p>
            The White Paper is a consultation document, not enacted law. The consultation closes 18 May 2026. Make your voice heard.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
