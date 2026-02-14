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
import { Users, BarChart3, Wind, AlertTriangle, List, EyeOff, Megaphone, Filter, Shield } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "kite-flying", icon: Wind, title: "What kite flying is" },
  { id: "sensitive", icon: AlertTriangle, title: "Why SEND is particularly sensitive" },
  { id: "themes", icon: List, title: "Common themes in unconfirmed reports" },
  { id: "missing", icon: EyeOff, title: "What unconfirmed reports do not tell you" },
  { id: "reactions", icon: Megaphone, title: "Why strong reactions still matter" },
  { id: "filter", icon: Filter, title: "How to read unconfirmed reports safely as a parent" },
  { id: "grounding", icon: Shield, title: "A grounding reminder" },
];

export default function WhatTheLeaksAreSaying() {
  return (
    <Layout>
      <SEOHead title="Unconfirmed reports about SEND reform" description="Government kite flying and what may or may not happen to SEND provision in England." path="/what-the-leaks-are-saying" />
      <PageOrientation
        title="Unconfirmed reports: government kite flying and what may or may not happen"
        description="Unconfirmed proposals and reported briefings. These are not government policy."
        lastUpdated="14th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="unconfirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Alongside formal consultation and public debate, there has been a steady flow of unconfirmed reports about SEND reform. These often come from anonymous briefings, sector gossip, selective leaks, or early media coverage.
            </p>
            <p>
              This is sometimes called kite flying. <strong>Ideas are floated to see how people react.</strong> Strong reactions shape what moves forward and what gets dropped.
            </p>
            <p>
              <strong>These reports are not policy.</strong> They are signals about the direction of thinking, not decisions. Treating them as facts creates unnecessary fear and confusion for families.
            </p>
          </div>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            <strong>The main impact is psychological, not practical.</strong>
          </p>
          <p>
            Parents read headlines and worry that support is about to disappear. Some feel pressured to <strong>rush into applications or legal action out of fear of losing future access</strong>.
          </p>
          <p>
            For children, the risk is indirect. Anxiety in adults affects decision making, relationships with schools, and emotional safety at home. <strong>Understanding what is unconfirmed helps parents stay grounded</strong> and focused on what actually protects their child right now.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-3">
          <p>These points describe the nature of the reporting, not enacted change.</p>
          <ul className="space-y-2">
            <li><strong>No unconfirmed report has been adopted into law.</strong></li>
            <li><strong>No leaked proposal has been formally published as government policy.</strong></li>
            <li>All major changes to SEND would require <strong>primary legislation, which has not been introduced</strong>.</li>
            <li>Media reports are attributed to anonymous sources, not formal announcements.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="kite-flying" icon={Wind} title="What kite flying is">
        <div className="space-y-3">
          <p>
            Kite flying is a common policy practice. <strong>Ideas are discussed privately, then selectively shared to test reaction.</strong>
          </p>
          <p>
            If the response is hostile, the idea may be dropped or reshaped. If the response is muted or supportive, it may progress to consultation.
          </p>
          <p>
            This does not mean families are being tricked. It means the system is trying to avoid making changes that cause harm or backlash.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="sensitive" icon={AlertTriangle} title="Why SEND is particularly sensitive">
        <div className="space-y-3">
          <p>
            SEND affects children, families, and legal rights. <strong>Any suggestion of reduced support understandably triggers strong reactions.</strong>
          </p>
          <p>
            Because the system is already under strain, rumours land harder. Families are already exhausted. <strong>Trust is already fragile.</strong>
          </p>
          <p>
            This makes SEND especially vulnerable to anxiety driven narratives.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="themes" icon={List} title="Common themes in unconfirmed reports">
        <div className="space-y-3">
          <p>The unconfirmed reports tend to cluster around a few ideas:</p>
          <ul className="space-y-2">
            <li><strong>A four-tier system</strong> where EHCPs are reserved for the most severe and complex needs, with "digital passports" for SEND children at lower tiers (iNews, Financial Times, January 2026).</li>
            <li><strong>Higher thresholds for EHCPs.</strong> The Guardian (February 2026) reported that reforms "will raise the bar" for EHCPs, with plans for only the most severe cases to qualify.</li>
            <li><strong>Implementation possibly delayed to 2029 to 2030.</strong> Both iNews and the Financial Times reportedly suggested full implementation might not happen until the 2029 to 2030 academic year.</li>
            <li><strong>Schools taking on more responsibility</strong> for SEND decision making, with funding shifted to school clusters rather than tied to individual plans.</li>
            <li><strong>Mandatory mediation</strong> before tribunal appeal in all cases.</li>
          </ul>
          <p>
            What matters is this. <strong>None of these ideas are confirmed in their leaked form.</strong> They are areas of exploration, not settled decisions.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="missing" icon={EyeOff} title="What unconfirmed reports do not tell you">
        <div className="space-y-3">
          <p>They do not tell you:</p>
          <ul className="space-y-2">
            <li>What safeguards would be in place.</li>
            <li>How existing children would be protected.</li>
            <li>What funding would accompany changes.</li>
            <li>How accountability would work.</li>
            <li>Whether ideas would survive consultation.</li>
          </ul>
          <p>
            <strong>Leaked summaries rarely include detail, nuance, or impact assessment.</strong> That is why they are dangerous if treated as certainty.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="reactions" icon={Megaphone} title="Why strong reactions still matter">
        <div className="space-y-3">
          <p>
            <strong>Public reaction matters.</strong> Parent groups, professionals, and charities have influenced SEND policy before.
          </p>
          <p>
            The Save Our Children's Rights campaign launched in January 2026, gathered <strong>over 130,000 petition signatures</strong>, and was backed by actress Sally Phillips and cross-party MPs. The National Education Union formally urged the government to maintain legal thresholds for EHCPs. Special Needs Jungle published detailed analysis warning against restricting appeals and individual entitlements.
          </p>
          <p>
            That visibility of concern has already <strong>slowed reform timelines and increased emphasis on co-production</strong>. Labour MPs warned internally they would not back cost-saving measures that weaken rights. That shows the system is responsive, even if imperfectly.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="filter" icon={Filter} title="How to read unconfirmed reports safely as a parent">
        <div className="space-y-3">
          <p><strong>Ask three questions:</strong></p>
          <ul className="space-y-2">
            <li>Is this a law, a consultation, or a comment.</li>
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
            Unconfirmed reports are part of a noisy policy environment, not a countdown clock.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
