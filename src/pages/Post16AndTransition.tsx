import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation, OnThisPage } from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";

import { StatusBadge } from "@/components/StatusBadge";
import { ExternalLink, GraduationCap, Scale, Users, Briefcase, CalendarDays, AlertTriangle, ShieldCheck, Shield } from "lucide-react";
import { WordFromRich } from "@/components/WordFromRich";

const pageSections: PageSectionDef[] = [
  { id: "law", icon: Scale, title: "What the law says" },
  { id: "transitions", icon: GraduationCap, title: "Key transition points" },
  { id: "end-ehcp", icon: AlertTriangle, title: "If the LA tries to end the EHCP" },
  { id: "no-ehcp", icon: Users, title: "Without an EHCP" },
  { id: "care-act", icon: ShieldCheck, title: "Care Act & adult social care" },
  { id: "access-work", icon: Briefcase, title: "Access to Work" },
  { id: "age-timeline", icon: CalendarDays, title: "Age timeline" },
];
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ResourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-sm"
    >
      → {label}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

// ─── Age Timeline Data ───

const ageTimeline = [
  { age: "Year 9 (age 13–14)", event: "Transition focus must start at annual review", colour: "bg-status-confirmed" },
  { age: "Year 10", event: "Post-16 options discussed; adult health and social care should attend review", colour: "bg-status-discussed" },
  { age: "Year 11 (by 31 March)", event: "LA must issue amended plan naming post-16 setting", colour: "bg-status-confirmed" },
  { age: "Age 16", event: "Decision-making rights transfer to young person", colour: "bg-status-confirmed" },
  { age: "Age 18", event: "Parental responsibility ends; Care Act assessment should be in place", colour: "bg-status-confirmed" },
  { age: "Age 19", event: "LA may consider ceasing EHCP. Must assess outcomes, not just age.", colour: "bg-destructive" },
  { age: "Age 25", event: "EHCP ends at the conclusion of the academic year", colour: "bg-status-confirmed" },
];

function AgeTimeline() {
  return (
    <div className="relative pl-6 space-y-0">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-border" />
      {ageTimeline.map((item, i) => (
        <div key={i} className="relative flex items-start gap-4 py-3">
          <div className={`absolute left-[-13px] top-[18px] w-3 h-3 rounded-full ${item.colour} ring-2 ring-background z-10`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{item.age}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{item.event}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ───

export default function Post16AndTransition() {
  return (
    <Layout>
      <SEOHead
        title="Young People Aged 16 to 25 | SEND Reform Navigator"
        description="EHCP rights beyond school age. What changes at 16, 18, and 19, transition planning, and what to do if the LA tries to end the plan."
      />

      <PageOrientation icon={Shield}
        title="Young People Aged 16 to 25"
        description="The SEND system does not end at 16. It does change. And the changes catch a lot of families off guard."
        lastUpdated="19th February 2026"
      />

      {/* ═══ INTRO ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            This page explains <strong>what the law says about EHCP rights beyond school age</strong>, what happens at each key transition point, and what to watch out for.
          </p>
        </div>
      </section>

      <OnThisPage sections={pageSections} />
      

      <WordFromRich>
        <p>The transition to adulthood is where the system most often loses the thread. I have seen young people reach 18 or 25 and fall off a cliff that was entirely predictable and entirely avoidable. Not because of anyone's bad intentions. Because planning started too late, conversations did not happen early enough, and nobody joined the dots between education and what comes after.</p>
        <p>Start earlier than feels necessary. The year 9 review is the legal starting point for transition planning. Use it. Push for it to be real, not a box-ticking exercise. Your young person deserves a plan for their life, not just their next school year.</p>
      </WordFromRich>

      {/* ═══ BANNER ═══ */}
      <section className="content-section py-2">
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 max-w-3xl">
          <p className="text-sm font-semibold text-foreground">
            The law has not changed. <strong>Your rights are enforceable.</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Everything on this page is based on the Children and Families Act 2014 and the SEND Code of Practice as they stand today.
          </p>
        </div>
      </section>

      {/* ═══ WHAT THE LAW SAYS ═══ */}
      <section id="law" className="content-section py-6 scroll-mt-20">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            What the law says
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              An EHCP can remain in force <strong>until the end of the academic year in which a young person turns 25</strong>.
            </p>
            <p>
              This is not automatic. The plan continues as long as the young person is in education or training and still needs the provision specified in it. The law is clear: <strong>a local authority cannot cease an EHCP simply because a young person has reached 19</strong>. It must assess whether the outcomes in the plan have been achieved.
            </p>
            <p>
              The legal basis is <strong>Section 46 of the Children and Families Act 2014</strong>.
            </p>
            <p>
              EHCPs do not extend to higher education. University is not covered. The plan ends when a young person starts a degree course.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ KEY TRANSITION POINTS (ACCORDION) ═══ */}
      <section id="transitions" className="content-section py-6 scroll-mt-20">
        <div className="max-w-3xl">
          <h2 className="text-base font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Key transition points
          </h2>

          <Accordion type="multiple" defaultValue={["at-16"]} className="space-y-3">
            <AccordionItem value="at-16" className="border rounded-xl px-5 bg-card shadow-sm">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                What changes at 16
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pb-2">
                  <p>
                    At 16, <strong>decision-making rights shift from parent to young person</strong>.
                  </p>
                  <p>
                    The young person, not the parent, becomes the primary decision-maker in EHCP processes. This includes the right to request assessments, comment on the plan, request a specific school or college is named, and appeal to the SEND Tribunal.
                  </p>
                  <p>
                    A parent can still be involved and can act as a representative if the young person chooses. But the Tribunal will expect evidence the young person has been part of the decision-making.
                  </p>
                  <p>
                    This shift can come as a surprise. <strong>It is worth preparing for it well before year 11.</strong>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="at-18" className="border rounded-xl px-5 bg-card shadow-sm">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                What changes at 18
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pb-2">
                  <p>
                    <strong>Parental responsibility ends at 18.</strong>
                  </p>
                  <p>
                    Local authorities should not assume parents are making decisions on behalf of a young person over 18, even where there are questions about mental capacity. The law requires them to support the young person's participation in decisions about their own plan.
                  </p>
                  <p>
                    <strong>Adult social care also becomes relevant.</strong> If your young person has social care needs that will continue into adulthood, a Care Act assessment should be requested before they turn 18. This is separate from the EHCP process and is run by adult social care, not the LA's SEND team.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="year-9" className="border rounded-xl px-5 bg-card shadow-sm">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                The year 9 review and transition planning
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pb-2">
                  <p>
                    <strong>Transition planning must start at the year 9 annual review</strong>, at the latest.
                  </p>
                  <p>
                    From that point, every annual review must include a focus on preparing for adulthood. This is a legal requirement under the SEND Code of Practice.
                  </p>
                  <p>The four areas the Code requires to be addressed are:</p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>Employment</li>
                    <li>Independent living</li>
                    <li>Community participation</li>
                    <li>Health</li>
                  </ul>
                  <p>
                    If your child's year 9 review did not include this focus, or if it is happening in a cursory way, <strong>raise it in writing</strong> with the SEND officer. Ask specifically what transition planning is in place and what is being recorded in the EHCP.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fe" className="border rounded-xl px-5 bg-card shadow-sm">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                Moving to further education
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pb-2">
                  <p>
                    If your young person has an EHCP and is moving to a further education college, the LA must issue an <strong>amended final plan naming the college by 31 March</strong> of the year of transfer.
                  </p>
                  <p>
                    This is a legal deadline. If it is missed, follow the same process as any missed deadline: write formally to the LA, use IPSEA's model letter, and escalate to the LGSCO if nothing changes.
                  </p>
                  <p>
                    The young person (or parent, if under 18) can express a preference for a specific college. The LA must consult that college and consider the preference.
                  </p>
                  <ResourceLink label="IPSEA Model Letter 10: LA not issuing amended plan on time" url="https://www.ipsea.org.uk/complaining-when-a-local-authority-does-not-send-a-draft-or-final-education-health-and-care-plan-on-time-model-letter-10" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ═══ IF THE LA TRIES TO END THE EHCP ═══ */}
      <section id="end-ehcp" className="content-section py-6 scroll-mt-20">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            If the LA tries to end the EHCP at 16 or 19
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              This is <strong>happening more frequently</strong>. Local authorities are under severe financial pressure and some are attempting to cease EHCPs at post-16 transition without lawful grounds.
            </p>
            <p>
              The law is clear. An LA <strong>cannot cease an EHCP simply because a young person has turned 16, 18, or 19</strong>. It can only cease the plan if:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>the LA is no longer responsible for the young person, or</li>
              <li>it determines the plan is no longer necessary</li>
            </ul>
            <p>
              When assessing whether the plan is still necessary for a young person aged 19 or over, the LA must consider whether <strong>the outcomes in the plan have actually been achieved</strong>. The test is outcomes achieved, not age reached.
            </p>
            <p>
              If the LA sends a cease to maintain notice, the plan does not end immediately. The young person has <strong>the right to appeal to the SEND Tribunal</strong>. While the appeal is live, the LA must continue to maintain the plan.
            </p>
            <div className="space-y-2 pt-2">
              <ResourceLink label="IPSEA guidance on cease to maintain decisions" url="https://www.ipsea.org.uk/appeals-against-decisions-to-cease-to-maintain-an-ehc-plan" />
              <br />
              <ResourceLink label="Special Needs Jungle: what to do if the LA tries to end the EHCP post-16" url="https://www.specialneedsjungle.com/ceasing-maintain-ehc-plan/" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ YOUNG PEOPLE WITHOUT EHCP ═══ */}
      <section id="no-ehcp" className="content-section py-6 scroll-mt-20">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Young people who do not yet have an EHCP
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              A young person can request an EHC needs assessment <strong>for the first time up to their 25th birthday</strong>.
            </p>
            <p>
              They do not have to have had an EHCP during school. If a young person is in further education or training and their needs are not being met, they can request an assessment directly. The same 20-week timescale applies.
            </p>
            <p>
              Mainstream colleges have a duty to provide SEN support for students who do not have an EHCP. They must have a named person with responsibility for SEND. If the college's support is not sufficient, an EHCP assessment can be requested.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CARE ACT ═══ */}
      <section id="care-act" className="content-section py-6 scroll-mt-20">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            The Care Act and adult social care
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              When your young person turns 18, responsibility for social care provision moves to adult services under the Care Act 2014.
            </p>
            <p>
              If your young person has care needs, <strong>request a Care Act assessment before they turn 18</strong>. This is not automatic. You have to ask.
            </p>
            <p>
              The assessment informs what support is available in adulthood, including personal budgets. It is separate from and runs alongside the EHCP process.
            </p>
            <ResourceLink label="Disability Rights UK: Care Act guide" url="https://www.disabilityrightsuk.org/how-we-can-help/benefits-information/factsheets/adult-social-care" />
          </div>
        </div>
      </section>

      {/* ═══ ACCESS TO WORK ═══ */}
      <section id="access-work" className="content-section py-6 scroll-mt-20">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Access to Work
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              From the age of 16, young people may be eligible for <strong>Access to Work funding</strong> from the Department for Work and Pensions. This can fund workplace support, specialist equipment, travel to work, and mental health support.
            </p>
            <p>
              It is not widely known. <strong>It is not means tested.</strong> It runs alongside employment, not education.
            </p>
            <p>
              If your young person is moving into employment or a supported internship, find out about Access to Work early. The application process takes time.
            </p>
            <ResourceLink label="Access to Work (GOV.UK)" url="https://www.gov.uk/access-to-work" />
          </div>
        </div>
      </section>

      {/* ═══ AGE TIMELINE ═══ */}
      <section id="age-timeline" className="content-section py-6 scroll-mt-20">
        <div className="max-w-3xl">
          <h2 className="text-base font-display font-bold text-foreground mb-5 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Key dates to track
          </h2>
          <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
            <AgeTimeline />
          </div>
        </div>
      </section>

      {/* ═══ NOTE ON REFORM ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl rounded-xl border border-border bg-muted/30 p-5">
          <h2 className="text-sm font-display font-bold text-foreground mb-2">A note on reform</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              The Schools White Paper, published 23 February 2026, includes proposals affecting post-16 SEND support, including supported internships and transition planning. A formal consultation is open until 18 May 2026.
            </p>
            <p>
              The <strong>current law has not changed</strong>. The rights described on this page are in force now.
            </p>
            <p>
              If the law changes, this page will be updated and the change will be clearly labelled.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONFIDENCE LABEL ═══ */}
      <section className="content-section py-4 pb-8">
        <StatusBadge status="confirmed" />
        <p className="text-xs text-muted-foreground mt-2">
          All content based on current law.
        </p>
      </section>
    </Layout>
  );
}
