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
import { History, CalendarClock, Users, AlertTriangle, FileQuestion, ShieldCheck } from "lucide-react";

const sections: PageSectionDef[] = [
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
        lastUpdated="7th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <p>
            SEND reform is moving slowly because <strong>large system changes take time</strong>. Pilot programmes and training are already happening, but major decisions still sit ahead. A Schools White Paper and public consultation are expected next. If legal changes are proposed, they must go through Parliament before taking effect. Research from previous reforms shows <strong>implementation is usually phased over several years</strong>. For parents, this means current support and rights continue while reform is debated. There is time to understand proposals properly before anything changes.
          </p>
        }
      />

      <OnThisPage sections={sections} />

      <ContentBox id="already-happened" icon={History} title="What has already happened">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li>The SEND and Alternative Provision Improvement Plan was published in <strong>March 2023</strong>.</li>
            <li>Pilot programmes began testing reform ideas.</li>
            <li>A national SEND conversation took place in <strong>late 2025 and early 2026</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="expected-next" icon={CalendarClock} title="What is expected next">
        <div className="space-y-3">
          <ul className="space-y-2">
            <li>A <strong>Schools White Paper</strong> including SEND proposals.</li>
            <li>A <strong>public consultation</strong>.</li>
            <li>Parliamentary scrutiny if legal change is proposed.</li>
            <li>Phased implementation if reforms are approved.</li>
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
