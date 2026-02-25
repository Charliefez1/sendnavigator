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
import { PageSearch } from "@/components/PageSearch";
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
    date: "February 2026",
    title: "Debt bailout and 10-year renewal plan",
    description: "Government confirmed a write-off of 90% of council SEND deficits (over £5 billion), launched a 10-year education renewal plan with inclusion units in all secondary schools, and committed £3.7 billion for 60,000 new SEND places.",
    type: "confirmed" as const,
  },
  {
    date: "23 February 2026",
    title: "Schools White Paper published",
    description: "Every Child Achieving and Thriving published. Confirms £4bn SEND package, Individual Support Plans, Experts at Hand programme, and a decade-long transition.",
    type: "confirmed" as const,
  },
  {
    date: "Autumn 2026",
    title: "Council local SEND reform plans due",
    description: "Local authorities must submit local SEND reform plans by autumn 2026 to qualify for the debt bailout package.",
    type: "upcoming" as const,
  },
  {
    date: "2026",
    title: "Formal public consultation",
    description: "Government has stated a formal consultation on SEND reform proposals will take place in 2026. This will be the key opportunity for detailed input on proposed changes.",
    type: "upcoming" as const,
  },
  {
    date: "2027",
    title: "New Ofsted inclusion judgement",
    description: "Ofsted's new 'Inclusion' judgement in school inspections is being rolled out, evaluating how well schools include and support children with SEND.",
    type: "upcoming" as const,
  },
  {
    date: "2028–2029",
    title: "Central government takes over SEND spending",
    description: "From 2028-29, central government is planned to cover SEND spending in full, relieving councils of these costs. This would be a fundamental shift in responsibility.",
    type: "uncertain" as const,
  },
  {
    date: "2030",
    title: "Individual Support Plans come into force",
    description: "ISPs are expected to become statutory from 2030, creating a new school-led plan for every child with identified SEND.",
    type: "uncertain" as const,
  },
  {
    date: "TBC",
    title: "Possible legislation",
    description: "If legal changes are proposed, they must pass through Parliament. No draft legislation has been published and no timeline for this has been confirmed.",
    type: "uncertain" as const,
  },
];

const sections: PageSectionDef[] = [
  { id: "visual-timeline", icon: GitBranch, title: "Visual timeline" },
  { id: "already-happened", icon: History, title: "What has already happened" },
  { id: "expected-next", icon: CalendarClock, title: "What is expected next" },
  { id: "unconfirmed", icon: AlertTriangle, title: "Unconfirmed timelines" },
  { id: "leaked", icon: FileQuestion, title: "What leaks say" },
  { id: "parents", icon: Users, title: "What this means for parents" },
  { id: "current-rights", icon: ShieldCheck, title: "Current rights" },
];

export default function Timeline() {
  return (
    <Layout>
      <SEOHead title="Timeline" description="Key dates, decisions, and milestones in SEND reform, past, present, and upcoming." path="/timeline" />
      <PageOrientation
        title="Timeline and next steps"
        description="Key decision points and milestones. We show only confirmed dates and likely windows, avoiding speculation."
        lastUpdated="23rd February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            SEND reform is moving slowly because <strong>large system changes take time</strong>. Pilot programmes and training are already happening, but major decisions still sit ahead. The Schools White Paper, Every Child Achieving and Thriving, was published on 23 February 2026 and a public consultation is expected next. If legal changes are proposed, they must go through Parliament before taking effect. Research from previous reforms shows <strong>implementation is usually phased over several years</strong>. For parents, this means current support and rights continue while reform is debated. There is time to understand proposals properly before anything changes.
          </p>
        }
      />

      <LatestUpdatesStream />

      <OnThisPage sections={sections} />
      <PageSearch />

      <ContentBox id="visual-timeline" icon={GitBranch} title="Visual timeline">
        <VisualTimeline milestones={timelineMilestones} />
      </ContentBox>

      <ContentBox id="already-happened" icon={History} title="What has already happened">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li>The SEND and Alternative Provision Improvement Plan was published in <strong>March 2023</strong>.</li>
            <li>Pilot programmes began testing reform ideas.</li>
            <li>A national SEND conversation took place in <strong>late 2025 and early 2026</strong>.</li>
            <li>The Schools White Paper, Every Child Achieving and Thriving, was <strong>published on 23 February 2026</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="expected-next" icon={CalendarClock} title="What is expected next">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li>A <strong>public consultation</strong> on SEND reform proposals.</li>
            <li>Parliamentary scrutiny if legal change is proposed.</li>
            <li>Phased implementation if reforms are approved, <strong>from 2030</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="unconfirmed" icon={AlertTriangle} title="Unconfirmed timelines">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li><strong>Exact dates</strong> for publications, consultations, and legislation are not confirmed.</li>
            <li>The <strong>pace of reform</strong> implementation is not confirmed.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="leaked" icon={FileQuestion} title="What leaks say">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li>No leaked timelines have been confirmed.</li>
            <li>Media reports have suggested urgency but <strong>without dates or formal commitments</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="parents" icon={Users} title="What this means for parents">
        <div className="space-y-3">
          <p>
            Research into previous SEND reforms shows <strong>large system changes take years, not months</strong>. Even if proposals are published, nothing changes overnight. Existing support, duties, and rights remain in place until new law comes into force. This timeline matters because it allows families to <strong>plan based on what exists now</strong>, not on rumours about the future.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="current-rights" icon={ShieldCheck} title="Current rights">
        <div className="space-y-3">
          <p>
            <strong>Current SEND rights and statutory processes remain in place</strong> unless and until formal changes are made through consultation and law.
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
