import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
  OnThisPage,
  ContentBox,
} from "@/components/templates";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { PageSectionDef } from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard, PercentageRing, HorizontalBarChart, RightsChecklist } from "@/components/templates/DataVisuals";
import { EHCPProcessDiagram } from "@/components/templates/EHCPProcessDiagram";
import { AskEHCP } from "@/components/AskEHCP";
import {
  FileText, BarChart3, Users, ClipboardList, Scale, School,
  RefreshCw, AlertTriangle, Gavel, Search, PoundSterling, Clock, ShieldCheck, ChevronDown
} from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "what-is-ehcp", icon: FileText, title: "What is an EHCP" },
  { id: "who-qualifies", icon: Users, title: "Who qualifies" },
  { id: "statistics", icon: BarChart3, title: "Statistics dashboard" },
  { id: "process", icon: ClipboardList, title: "The EHCP process" },
  { id: "sections", icon: FileText, title: "What an EHCP contains" },
  { id: "rights", icon: Scale, title: "Your rights" },
  { id: "placement", icon: School, title: "School placement" },
  { id: "annual-review", icon: RefreshCw, title: "Annual reviews" },
  { id: "challenges", icon: AlertTriangle, title: "Common challenges" },
  { id: "tribunals", icon: Gavel, title: "Tribunals and appeals" },
  { id: "ask-ehcp", icon: Search, title: "Ask about EHCPs" },
];

export default function EHCPs() {
  return (
    <Layout>
      <SEOHead
        title="EHCPs explained: a complete guide for parents in England"
        description="Everything you need to know about Education, Health and Care Plans. What they are, who qualifies, the process, your rights, and how to navigate the system."
        path="/ehcps"
      />
      <PageOrientation
        title="EHCPs: a complete guide for parents"
        description="Everything you need to know about Education, Health and Care Plans in England. What they are, who qualifies, the process step by step, your rights at every stage, and what to do when things go wrong."
        lastUpdated="15th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <div className="content-section py-4">
        <AskEHCP />
      </div>

      <SixtySecondSummary
        prose={
          <p>
            An Education, Health and Care Plan (EHCP) is a <strong>legally binding document</strong> for children and young people aged 0 to 25 with significant special educational needs. It coordinates support across education, health, and social care. Since 2014, the number of children with EHCPs has <strong>more than doubled to over 576,000</strong>. The process should take 20 weeks but only about half are issued on time. Parents have strong legal rights at every stage, including the right to appeal, and <strong>win 99% of tribunal cases that reach a hearing</strong>. Understanding the process is the single most powerful thing you can do for your child.
          </p>
        }
      />

      <OnThisPage sections={sections} />

      {/* ── What is an EHCP ── */}
      <ContentBox id="what-is-ehcp" icon={FileText} title="What is an EHCP">
        <div className="space-y-3">
          <p>
            An Education, Health and Care Plan (EHCP) is a statutory document introduced by the <strong>Children and Families Act 2014</strong>, replacing the older Statement of SEN system. It is the only legal mechanism in England that guarantees coordinated, funded support across education, health, and social care for a child or young person with significant special educational needs.
          </p>
          <p>
            Unlike the previous system, EHCPs cover a <strong>broader age range from birth to 25</strong>, including further education, and require multiple agencies to work together by law. The goal was a more family-centred, outcomes-focused approach. The education provisions in an EHCP are <strong>legally enforceable</strong> — the local authority must deliver them.
          </p>
          <p>
            The EHCP replaced not just Statements of SEN but also Learning Difficulty Assessments (LDAs) for post-16 students, creating a <strong>single, continuous plan</strong> that follows the child from early years through to adulthood.
          </p>
        </div>
      </ContentBox>

      {/* ── Who qualifies ── */}
      <ContentBox id="who-qualifies" icon={Users} title="Who qualifies for an EHCP">
        <div className="space-y-3">
          <p>
            A child or young person may qualify for an EHCP if they have <strong>special educational needs that cannot be met through the support ordinarily available at their school</strong>. The legal test is deliberately broad.
          </p>
          <p>
            The local authority must assess if the child <strong>has or may have SEN</strong> and it <strong>may be necessary</strong> for special educational provision to be made through an EHCP. Tribunal case law confirms this is a "provisional and predictive" test — certainty is not required upfront.
          </p>
          <p>
            In practice, children who qualify typically have needs across one or more of these areas:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Communication and interaction</strong> — including autism spectrum conditions and speech and language difficulties</li>
            <li><strong>Cognition and learning</strong> — including dyslexia, dyscalculia, and moderate to severe learning difficulties</li>
            <li><strong>Social, emotional and mental health</strong> — including anxiety, ADHD, and attachment difficulties</li>
            <li><strong>Sensory and physical</strong> — including hearing or visual impairment, and physical disabilities</li>
          </ul>
          <p>
            Schools receive a notional SEN budget of around <strong>£6,000 per pupil</strong> for SEN Support. An EHCP is typically considered when needs exceed what this budget and ordinary school resources can provide. However, <strong>there is no legal requirement to exhaust school support first</strong> — if needs are severe, assessment should not be delayed.
          </p>
        </div>
      </ContentBox>

      {/* ── Statistics dashboard ── */}
      <ContentBox id="statistics" icon={BarChart3} title="EHCP statistics dashboard">
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard value="576,000+" label="Children with EHCPs" sublabel="January 2024" icon={Users} accentColor="confirmed" />
            <StatCard value="138,242" label="Assessment requests" sublabel="In 2023 alone" icon={FileText} accentColor="discussed" />
            <StatCard value="140%" label="Growth since 2015" sublabel="From 240,000 EHCPs" icon={BarChart3} accentColor="unconfirmed" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 py-4">
            <PercentageRing percentage={50} label="Issued on time" sublabel="Within 20 weeks" color="unconfirmed" />
            <PercentageRing percentage={95} label="Assessments lead to plan" sublabel="Once LA agrees to assess" color="confirmed" />
            <PercentageRing percentage={99} label="Parents win at tribunal" sublabel="Of decided cases" color="confirmed" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <StatCard value="24%" label="Requests refused" sublabel="~33,000 children turned away in 2023" icon={AlertTriangle} accentColor="unconfirmed" />
            <StatCard value="25,000" label="Tribunal appeals" sublabel="Registered in 2024/25" icon={Gavel} accentColor="unconfirmed" />
            <StatCard value="£153m" label="LAs spent on appeals" sublabel="In 2023-24 alone" icon={PoundSterling} accentColor="unconfirmed" />
            <StatCard value="1.3%" label="LA win rate at tribunal" sublabel="Of cases that go to hearing" icon={Scale} accentColor="confirmed" />
          </div>

          <HorizontalBarChart
            title="EHCP growth over time"
            items={[
              { label: "EHCPs in 2015", value: 240, displayValue: "~240,000", color: "confirmed" },
              { label: "EHCPs in 2020", value: 390, displayValue: "~390,000", color: "discussed" },
              { label: "EHCPs in 2024", value: 576, displayValue: "576,000+", color: "unconfirmed" },
            ]}
          />

          <HorizontalBarChart
            title="Timeliness of the EHCP process"
            items={[
              { label: "Issued within 20 weeks (2020)", value: 60, displayValue: "~60%", color: "discussed" },
              { label: "Issued within 20 weeks (2024)", value: 46, displayValue: "46.4%", color: "unconfirmed" },
            ]}
          />
        </div>
      </ContentBox>

      {/* ── The EHCP process ── */}
      <ContentBox id="process" icon={ClipboardList} title="The EHCP process: step by step">
        <div className="space-y-4">
          <p>
            The EHCP process runs from initial identification of needs through to the final plan and annual reviews. The entire process from request to final plan <strong>should take no more than 20 weeks</strong>, though in practice over half of families wait longer.
          </p>
          <EHCPProcessDiagram />
          <div className="bg-muted/50 border border-border rounded-lg p-4 mt-4">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Key timing:</strong> The full process from request to final plan should complete within 20 weeks. In 2024, only 46.4% met this deadline. Some families wait 6 to 9 months, and in extreme cases over a year.
              </p>
            </div>
          </div>
        </div>
      </ContentBox>

      {/* ── What an EHCP contains ── */}
      <ContentBox id="sections" icon={FileText} title="What an EHCP contains">
        <div className="space-y-3">
          <p>
            An EHCP is a comprehensive document with <strong>prescribed sections labelled A through K</strong>. Each section serves a specific legal purpose:
          </p>
          <div className="space-y-2">
            {[
              { section: "A", title: "Views and aspirations", desc: "The child's and family's views, interests, and hopes for the future. Not legally enforceable but sets context.", explainer: "This section captures your child's personality, interests, and what matters to them. It also includes your views as parents and the child's own voice where possible. While Section A is not legally enforceable, it sets the tone for the entire plan. A well-written Section A helps professionals understand your child as a person, not just a set of needs. If this section feels generic or impersonal, ask for it to be rewritten. It should sound like your child." },
              { section: "B", title: "Special educational needs", desc: "All identified SEN across cognition, communication, social-emotional, and sensory-physical domains. Every need here must have matching provision in Section F.", explainer: "This is where every special educational need must be identified and described clearly. Each need listed here must have a corresponding provision in Section F. If a need appears in Section B but has no matching support in Section F, that is a drafting failure you can challenge. Be specific: 'difficulty with reading' is weaker than 'specific learning difficulty affecting phonological processing and reading fluency'. The more precisely needs are described, the harder it is for provision to be vague." },
              { section: "C", title: "Health needs", desc: "Health care needs related to SEN or disability that impact education.", explainer: "This covers health needs that relate to the child's SEN or disability — for example, epilepsy management in school, continence support, or mental health needs that affect learning. Health provision linked to SEN can sometimes be treated as educational provision (and therefore legally enforceable). Speech and language therapy is a common example. If your child has health needs that affect their education, make sure they appear here and are not omitted because 'health will deal with it separately'." },
              { section: "D", title: "Social care needs", desc: "Social care needs related to SEN. Often left blank, which is a common criticism.", explainer: "Section D covers social care needs arising from the child's SEN or disability. In practice, this section is frequently left blank or contains minimal information, even when children clearly have social care needs. If your child needs short breaks, support with daily living, or social skills development outside school, this should be recorded here. An empty Section D does not necessarily mean there are no needs — it may mean no one has properly assessed them." },
              { section: "E", title: "Outcomes", desc: "Goals for the next 2–3 years including preparing for adulthood from Year 9.", explainer: "Outcomes should be specific, measurable goals that the provision in the plan is designed to achieve. Good outcomes describe where the child should be in 2–3 years, not vague aspirations. From Year 9 onwards, outcomes must include Preparing for Adulthood goals covering employment, independent living, community participation, and health. If outcomes are too vague to measure ('will make progress in literacy'), push back. You should be able to tell at annual review whether the outcome has been met." },
              { section: "F", title: "Special educational provision", desc: "The most important section. All support the child must receive, detailed, specific, and quantified. Legally binding on the LA.", explainer: "Section F is the most legally significant part of the EHCP. Everything written here must be delivered — it is legally binding on the local authority. Provision should be specific and quantified: '3 x 30-minute sessions per week of 1:1 speech and language therapy delivered by a qualified speech and language therapist' is enforceable. 'Access to speech therapy as needed' is not. If you see words like 'access to', 'opportunities for', or 'as appropriate', challenge them. Vague provision is unenforceable provision." },
              { section: "G", title: "Health provision", desc: "NHS services: speech therapy, OT, CAMHS, physiotherapy. The NHS should deliver these.", explainer: "Section G sets out health provision that must be made for the child. This typically includes therapies like speech and language therapy, occupational therapy, physiotherapy, or CAMHS input. The NHS is responsible for delivering what is written here. However, if health provision is 'educational' in nature (speech therapy often is), it can be written into Section F instead, making the local authority responsible. This distinction matters because NHS provision in Section G has weaker enforcement routes than educational provision in Section F." },
              { section: "H1/H2", title: "Social care provision", desc: "Services under the Chronically Sick & Disabled Persons Act 1970 (H1) and other social care (H2).", explainer: "H1 covers social care provision under the Chronically Sick and Disabled Persons Act 1970, such as home adaptations, travel assistance, or recreational facilities. H1 provision is legally enforceable. H2 covers any other social care provision reasonably required, which may include short breaks, after-school clubs, or family support services. H2 provision is not directly enforceable in the same way. If your child receives social care support, check whether it is recorded under H1 or H2, as this affects your ability to challenge if it is not delivered." },
              { section: "I", title: "School placement", desc: "Names the school. Once named, the school must admit the child.", explainer: "Section I names the school or setting your child will attend. Once a school is named in the final EHCP, that school has a legal duty to admit your child. You have the right to request a particular school, and the local authority must name it unless it would be unsuitable for the child, incompatible with the efficient education of other children, or an inefficient use of resources. 'The school is full' is not a lawful standalone reason to refuse. Disputes over Section I are one of the most common reasons families go to tribunal." },
              { section: "J", title: "Personal budget", desc: "Optional funding for families to arrange some services themselves. Only about 3% of plans include one.", explainer: "A personal budget allows families to receive funding directly to arrange some of the provision in the EHCP themselves. This can give families more control and flexibility. However, only about 3% of EHCPs include a personal budget, and many local authorities are reluctant to offer them. You have the right to request a personal budget. It can cover education, health, or social care provision. The local authority must consider your request, though they do not have to agree." },
              { section: "K", title: "Appendices", desc: "All assessment reports and evidence.", explainer: "Section K contains all the professional reports, assessments, and evidence that informed the EHCP. This includes educational psychology reports, speech and language assessments, medical reports, and any private assessments you have submitted. Check that all reports you provided are included. If a report recommends specific provision that does not appear in Section F, raise this — the local authority should explain why a professional recommendation has not been followed." },
            ].map((s) => (
              <Collapsible key={s.section}>
                <div className="rounded-lg bg-muted/30 border border-border/50 overflow-hidden">
                  <CollapsibleTrigger className="flex items-center gap-3 p-3 w-full text-left hover:bg-muted/50 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{s.section}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{s.title}</p>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-3 pb-3 pt-0">
                      <div className="border-t border-border/50 pt-3 ml-11">
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.explainer}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Quality matters:</strong> Provision in Section F should be specific and quantified, for example "3 x 30-minute sessions per week of 1:1 literacy intervention with a specialist teacher." Vague wording like "access to" or "as needed" makes provision unenforceable. If you see vague language in a draft, push for clarity.
            </p>
          </div>
        </div>
      </ContentBox>

      {/* ── Your rights ── */}
      <ContentBox id="rights" icon={Scale} title="Your rights at every stage">
        <div className="space-y-4">
          <RightsChecklist
            title="Rights you have right now"
            items={[
              "You can request an EHC needs assessment at any time, in writing, without the school's permission",
              "The LA must respond to your request within 6 weeks",
              "You have the right to submit any evidence including private reports",
              "You have at least 15 days to comment on a draft EHCP",
              "You can request a specific school to be named in Section I",
              "You can appeal any refusal to assess, refusal to issue, plan contents, or ceasing of the plan",
              "The LA must deliver every provision specified in Section F — it is legally binding",
              "You can request an emergency review if circumstances change significantly",
              "Your child must be admitted to any school named in the final EHCP",
              "You can request a personal budget to arrange some services yourself",
            ]}
          />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important:</strong> The LA cannot refuse to assess solely because the child has not been on SEN Support for a certain time, or because they believe the school can cope. The only lawful question is whether the child may have SEN and may need an EHCP.
          </p>
        </div>
      </ContentBox>

      {/* ── School placement ── */}
      <ContentBox id="placement" icon={School} title="School placement and Section I">
        <div className="space-y-3">
          <p>
            Parents have a <strong>right to request a particular school</strong> to be named in Section I of the EHCP. This includes mainstream schools, special schools, academies, and certain approved independent special schools.
          </p>
          <p>
            The LA must consult the school and <strong>must name it</strong> unless one of the legal exceptions applies: the placement would be unsuitable for the child, incompatible with efficient education of other children, or incompatible with efficient use of resources. <strong>"The school is full" is not by itself a lawful reason to refuse.</strong>
          </p>
          <p>
            Once a school is named in the final EHCP, <strong>that school is under a legal duty to admit the child</strong> (Children and Families Act 2014, section 43). This gives parents strong leverage. Disagreements over school choice are one of the most common reasons for tribunal appeals.
          </p>
        </div>
      </ContentBox>

      {/* ── Annual reviews ── */}
      <ContentBox id="annual-review" icon={RefreshCw} title="Annual reviews">
        <div className="space-y-3">
          <p>
            EHCPs must be reviewed <strong>at least every 12 months</strong> (every 3 to 6 months for under-5s). The review involves gathering progress updates, a meeting hosted by the school (usually chaired by the SENCO), and recommendations on whether to keep, amend, or cease the plan.
          </p>
          <p>
            After the meeting, the <strong>LA must decide within 4 weeks</strong> whether to keep the plan as is, amend it, or cease it. If amending, the final amended plan must be issued <strong>within 12 weeks of the review meeting</strong>, as confirmed in the High Court case R (L, M & P) v Devon CC (2022).
          </p>
          <p>
            <strong>Year 9 reviews</strong> should focus on Preparing for Adulthood outcomes (employment, independent living, community participation, health). Transition reviews for secondary or post-16 must be completed by statutory deadlines: <strong>15 February for secondary, 31 March for post-16</strong>.
          </p>
          <p>
            An EHCP can only be ceased if the LA is no longer responsible or the plan is genuinely no longer necessary. Case law (AB v East Sussex, 2024) holds that <strong>if a person still meets the test for an EHCP, it is hard to justify ceasing it</strong>.
          </p>
        </div>
      </ContentBox>

      {/* ── Common challenges ── */}
      <ContentBox id="challenges" icon={AlertTriangle} title="Common challenges and what to watch for">
        <div className="space-y-3">
          <p>
            The EHCP system faces significant pressures. Understanding where things commonly go wrong helps you <strong>prepare and respond effectively</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong>Threshold disputes:</strong> LAs frequently refuse initial assessments. About 24% of requests are refused, yet 95% of those assessed get a plan — suggesting many refusals are inappropriate.</li>
            <li><strong>Delays at every stage:</strong> Only half of plans are issued within 20 weeks. Some children wait over a year. Statutory timeframes are routinely missed.</li>
            <li><strong>Vague provision:</strong> Many EHCPs lack specific, quantified provision. Phrases like "access to" or "as needed" make support unenforceable.</li>
            <li><strong>Missing health and social care:</strong> Sections C, D, G, H are often blank. The system remains education-dominated despite being designed as multi-agency.</li>
            <li><strong>Private reports excluded:</strong> Some LAs refuse to consider independently obtained assessments, which is unlawful — any relevant evidence must inform the plan.</li>
            <li><strong>Poor communication:</strong> High staff turnover, unanswered messages, and lack of updates are commonly reported by families.</li>
            <li><strong>Resource-driven decisions:</strong> Financial pressures lead some LAs to ration support based on budget rather than need, which the law does not permit.</li>
            <li><strong>Children out of school:</strong> Thousands of children with EHCPs are recorded as "awaiting provision." If your child has an EHCP but no school place, the LA must arrange suitable education.</li>
          </ul>
          <p>
            The Local Government Ombudsman finds about <strong>91% of complaints about EHCP processes are upheld against councils</strong>.
          </p>
        </div>
      </ContentBox>

      {/* ── Tribunals ── */}
      <ContentBox id="tribunals" icon={Gavel} title="Tribunals and appeals">
        <div className="space-y-3">
          <p>
            When disagreements cannot be resolved, families can appeal to the <strong>First-tier Tribunal (SEND Tribunal)</strong>. You can appeal if the LA refuses to assess, refuses to issue, if you dispute the contents (Sections B, F, or I), or if the LA decides to cease your child's plan.
          </p>
          <p>
            Before appealing, you must obtain a <strong>mediation certificate</strong> (by contacting a mediation adviser). Mediation itself is voluntary — you can proceed directly to appeal after getting the certificate.
          </p>
          <p>
            The statistics are striking. In 2023/24, only <strong>1.3% of cases that went to a full hearing were decided in the LA's favour</strong>. Parents prevail in 99% of decided cases. By 2024/25, 25,000 appeals were registered — nearly double the number two years earlier and six times more than when EHCPs were introduced in 2014.
          </p>
          <p>
            LAs spent an estimated <strong>£153 million in 2023-24 on defending SEND appeals</strong>, and cumulatively over £580 million since 2014. Many LAs settle or concede before the hearing — about a third of appeals are resolved without a full hearing, usually because the LA agrees to what was sought.
          </p>
          <p>
            Since 2018, the tribunal can also make <strong>recommendations about health and social care</strong> aspects of EHCPs. These are not legally binding but are expected to be followed. The tribunal process, while stressful, is <strong>relatively parent-friendly</strong> — most parents self-represent and still prevail overwhelmingly.
          </p>
        </div>
      </ContentBox>

      {/* ── Ask about EHCPs ── */}
      <ContentBox id="ask-ehcp" icon={Search} title="Ask a question about EHCPs">
        <div className="space-y-3">
          <p>
            Have a specific question about EHCPs? Ask below and get a <strong>plain English answer</strong> based on law, guidance, and what we know works.
          </p>
          <AskEHCP />
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
