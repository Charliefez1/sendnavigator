import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  SixtySecondSummary,
  StatusSection,
  PageOrientation,
  OnThisPage,
  ContentBox,
} from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";

import { StatusBadge } from "@/components/StatusBadge";
import { VisualTimeline } from "@/components/templates/VisualTimeline";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";
import { History, CalendarClock, Users, AlertTriangle, FileQuestion, ShieldCheck, GitBranch } from "lucide-react";

const timelineMilestones = [
  {
    date: "March 2023",
    title: "SEND Improvement Plan published",
    description: "The government published its SEND and Alternative Provision Improvement Plan, setting out reform intentions including national standards and a tiered support model.",
    type: "confirmed" as const,
  },
  {
    date: "2023–present",
    title: "Change Programme pilot testing",
    description: "Nine Regional Expert Partnerships began testing new ways of working, including trialling proposed National Standards and a standard digital EHCP template.",
    type: "confirmed" as const,
  },
  {
    date: "Dec 2025 – Jan 2026",
    title: "National conversation on SEND",
    description: "A national conversation ran from December 2025 to January 2026, gathering views from parents, professionals, and young people on the future of SEND.",
    type: "confirmed" as const,
  },
  {
    date: "16 January 2026",
    title: "£200m teacher training announced",
    description: "Government announced a £200 million SEND teacher training programme so every teacher can support children with SEND.",
    type: "confirmed" as const,
  },
  {
    date: "10 February 2026",
    title: "10-year schools and colleges plan",
    description: "The 10 year schools and colleges plan was published, linking mainstream inclusion to forthcoming SEND reform. Council SEND deficit bailout confirmed (over £5 billion).",
    type: "confirmed" as const,
  },
  {
    date: "23 February 2026",
    title: "Schools White Paper published",
    description: "Every Child Achieving and Thriving published. Confirms ISPs, four-level support model, Experts at Hand (£1.8bn), £7bn total additional SEND funding, and EHCPs retained. Formal consultation opened.",
    type: "confirmed" as const,
  },
  {
    date: "18 May 2026",
    title: "Consultation closes",
    description: "The formal consultation 'SEND Reform: Putting Children and Young People First' closes at 11:59pm. Parents can respond online, by email, or by post. Partial responses carry weight.",
    type: "upcoming" as const,
  },
  {
    date: "Summer 2026",
    title: "Disadvantage funding consultation",
    description: "A separate consultation on replacing free school meals eligibility with an income-based model for targeting disadvantage funding. Directly affects SEND families on low incomes.",
    type: "upcoming" as const,
  },
  {
    date: "Autumn 2026",
    title: "Council local SEND reform plans due",
    description: "Local authorities must submit local SEND reform plans to qualify for the debt bailout package. Councils are already self-assessing across seven system pillars.",
    type: "upcoming" as const,
  },
  {
    date: "2027",
    title: "New Ofsted inclusion judgement",
    description: "Ofsted's new 'Inclusion' judgement in school inspections being rolled out, evaluating how well schools include and support children with SEND.",
    type: "upcoming" as const,
  },
  {
    date: "2028–2029",
    title: "Central government takes over SEND spending",
    description: "From 2028-29, central government planned to cover SEND spending in full, relieving councils of these costs.",
    type: "upcoming" as const,
  },
  {
    date: "2029–2030",
    title: "Inclusion bases in two thirds of secondaries",
    description: "Two thirds of secondary schools expected to have an inclusion base. Equivalent primary places also planned.",
    type: "upcoming" as const,
  },
  {
    date: "September 2030",
    title: "ISPs come into force",
    description: "Individual Support Plans expected to become a statutory duty from September 2030. No changes to EHCP support before this date. Only children aged seven or younger today will be assessed for ISP transition.",
    type: "uncertain" as const,
  },
  {
    date: "2030–2035",
    title: "Phased EHCP to ISP transition",
    description: "Around 1 in 8 pupils expected to transition from an EHCP to an ISP. EHCPs expected to fall from 5.3% to 4.7% of pupils. Children over seven keep EHCPs until at least age 16.",
    type: "uncertain" as const,
  },
  {
    date: "2034–2035",
    title: "Reform transition completes",
    description: "The full transition period is expected to end around 2034-35. By this point, an estimated 15-20% of pupils will have an ISP.",
    type: "uncertain" as const,
  },
  {
    date: "TBC",
    title: "Primary legislation",
    description: "If legal changes are proposed following consultation, they must pass through Parliament. No draft legislation has been published.",
    type: "uncertain" as const,
  },
];

const sections: PageSectionDef[] = [
  { id: "visual-timeline", icon: GitBranch, title: "Visual timeline" },
  { id: "already-happened", icon: History, title: "What has already happened" },
  { id: "expected-next", icon: CalendarClock, title: "What is expected next" },
  { id: "unconfirmed", icon: AlertTriangle, title: "Unconfirmed timelines" },
  { id: "parents", icon: Users, title: "What this means for parents" },
  { id: "current-rights", icon: ShieldCheck, title: "Current rights" },
];

export default function Timeline() {
  return (
    <Layout>
      <SEOHead title="What happens next: SEND reform timeline" description="Key milestones, consultation windows, and decision points in SEND reform. Grounded and date-stamped." path="/timeline" />
      <PageOrientation
        title="What happens next: milestones, decisions, and what to watch for"
        description="Key milestones, consultation windows, and decision points. Grounded and date-stamped."
        lastUpdated="26th February 2026"
        accentColor="hsl(175 65% 41%)"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              The Schools White Paper was published on 23 February 2026 and a formal consultation is open until <strong>11:59pm on 18 May 2026</strong>. ISPs are proposed from September 2030. The full transition is planned over a decade, completing around 2034-35.
            </p>
            <p>
              <strong>No changes to EHCP support before September 2030.</strong> Only children aged seven or younger today will be assessed for ISP transition. All other children keep existing EHCPs until at least age 16. For parents, this means current support and rights continue while reform is consulted on and legislated. <strong>There is time to understand proposals properly and respond.</strong>
            </p>
          </div>
        }
      />

      <LatestUpdatesStream />

      <OnThisPage sections={sections} />

      <ContentBox id="visual-timeline" icon={GitBranch} title="Visual timeline">
        <VisualTimeline milestones={timelineMilestones} />
      </ContentBox>

      <ContentBox id="already-happened" icon={History} title="What has already happened">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li>The SEND and Alternative Provision Improvement Plan was published in <strong>March 2023</strong>.</li>
            <li>Pilot programmes began testing reform ideas across nine Regional Expert Partnerships.</li>
            <li>A national SEND conversation took place in <strong>late 2025 and early 2026</strong>.</li>
            <li>£200 million teacher training programme announced <strong>16 January 2026</strong>.</li>
            <li>The 10 year schools and colleges plan published <strong>10 February 2026</strong>. Council debt bailout confirmed.</li>
            <li>The Schools White Paper published <strong>23 February 2026</strong>. Formal consultation opened.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="expected-next" icon={CalendarClock} title="What is expected next">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li><strong>18 May 2026:</strong> consultation closes. Parents can respond online, by email, or by post.</li>
            <li><strong>Summer 2026:</strong> disadvantage funding consultation.</li>
            <li><strong>Autumn 2026:</strong> council local SEND reform plans due.</li>
            <li><strong>2027:</strong> Ofsted inclusion judgement rollout.</li>
            <li><strong>2028-29:</strong> central government takes over SEND spending.</li>
            <li><strong>2029-30:</strong> inclusion bases in two thirds of secondaries.</li>
            <li><strong>September 2030:</strong> ISPs expected to come into force.</li>
            <li><strong>2030-2035:</strong> phased EHCP to ISP transition for eligible children.</li>
            <li><strong>2034-35:</strong> reform transition expected to complete.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="unconfirmed" icon={AlertTriangle} title="Unconfirmed timelines">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li><strong>No draft legislation has been published.</strong> The timeline for primary legislation is unknown.</li>
            <li>The pace of reform will depend on consultation responses, parliamentary scrutiny, and practical readiness.</li>
            <li>The government's own trajectory numbers (4.7% by 2034-35) are projections, not guarantees.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="parents" icon={Users} title="What this means for parents">
        <div className="space-y-3">
          <p>
            The most important date is <strong>18 May 2026</strong>. That is when the consultation closes. Everything after that depends on what the government hears.
          </p>
          <p>
            Research into previous SEND reforms shows <strong>large system changes take years, not months</strong>. The decade-long transition confirms this. Existing support, duties, and rights remain in place until new law comes into force.
          </p>
          <p>
            <strong>You are not too late. You have time to respond. Your response matters.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="current-rights" icon={ShieldCheck} title="Current rights">
        <div className="space-y-3">
          <p>
            <strong>Current SEND rights and statutory processes remain in place</strong> unless and until formal changes are made through consultation and law. Nothing in the White Paper changes existing law until legislation passes Parliament.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
