import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { SourceCard } from "@/components/SourceCard";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, TrendingUp, ShieldAlert, Users, BarChart3, BookOpen, FileCheck, ChevronDown, ChevronRight, Newspaper } from "lucide-react";
import { communitySourceCategories } from "@/config/community-sources";
import { NewsTracker } from "@/components/NewsTracker";

// ─── Statistics data ───

const summaryFacts: string[] = [
  "SEND demand in England continues to rise, with over 1.7 million pupils identified with SEND.",
  "The number of children and young people with EHC plans increased by over 10 percent in one year.",
  "Fewer than half of new EHC plans are completed within the legal 20 week timescale.",
  "Tribunal activity remains high, with 25,000 appeals registered in the last academic year.",
  "SEND spending has increased significantly, but local authorities still report large funding gaps.",
  "Future projections show continued financial pressure without structural change.",
];

interface StatSection {
  title: string;
  items: string[];
}

const statSections: StatSection[] = [
  {
    title: "Children and young people with SEND",
    items: [
      "638,700 children and young people aged 0 to 25 in England had an active EHC plan in January 2025.",
      "This was an increase from 576,500 in January 2024, a rise of 10.8 percent in one year.",
      "482,640 pupils in schools had an EHC plan in the 2024/25 academic year.",
      "1,284,284 pupils received SEN support without an EHC plan in 2024/25.",
      "In total, just over 1.7 million pupils in England were identified as having SEN in 2024/25.",
    ],
  },
  {
    title: "Placement types",
    items: [
      "278,200 children and young people with EHC plans attended mainstream schools in January 2025, representing 43.6 percent of all EHC plans.",
      "24,500 attended SEN units or resourced provision within mainstream schools.",
      "7,200 attended independent mainstream schools.",
    ],
  },
  {
    title: "EHC plan timeliness",
    items: [
      "46.4 percent of decisions on whether to issue an EHC plan were made within the 20 week timescale in 2024.",
      "This was down from 50.3 percent in 2023.",
      "7.3 percent of EHC plans in 2024 took longer than 52 weeks to complete.",
    ],
  },
  {
    title: "Tribunal activity",
    items: [
      "25,000 SEND tribunal appeals were registered in the 2024/25 academic year.",
      "20,000 SEND tribunal appeals were disposed of in the same year.",
    ],
  },
  {
    title: "Funding",
    items: [
      "High needs funding increased from £5.3 billion in 2014/15 to £9.4 billion in 2024/25.",
      "Local authorities reported spending an additional £950 million on SEND in 2023/24 beyond allocated national funding.",
    ],
  },
  {
    title: "Reform activity",
    items: [
      "A £200 million national SEND teacher training programme was announced in January 2026.",
      "The SEND reform national conversation ran from 02 December 2025 to 14 January 2026.",
    ],
  },
];

// ─── Sources data ───

interface SourceLink {
  name: string;
  url: string;
}

interface SourceCategory {
  title: string;
  sources: SourceLink[];
}

const sourceCategories: SourceCategory[] = [
  {
    title: "SEND law and legal framework",
    sources: [
      { name: "Children and Families Act 2014", url: "https://www.legislation.gov.uk/ukpga/2014/6/contents/enacted" },
      { name: "SEND Code of Practice 0 to 25", url: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25" },
    ],
  },
  {
    title: "Government and official statistics",
    sources: [
      { name: "SEND and Alternative Provision Improvement Plan", url: "https://www.gov.uk/government/publications/send-and-alternative-provision-improvement-plan" },
      { name: "Transformational reform begins for children and young people with SEND", url: "https://www.gov.uk/government/news/transformational-reform-begins-for-children-and-young-people-with-send" },
      { name: "£3bn investment to end postcode lottery for children with SEND", url: "https://www.gov.uk/government/news/3bn-investment-to-end-postcode-lottery-for-children-with-send" },
      { name: "Government launches national conversation on SEND", url: "https://www.gov.uk/government/news/government-launches-national-conversation-on-send" },
      { name: "£200 million landmark SEND teacher training programme", url: "https://www.gov.uk/government/news/200-million-landmark-send-teacher-training-programme" },
      { name: "10 Year Plan to Revitalise Schools and Colleges for Every Child", url: "https://www.gov.uk/government/publications/10-year-plan-to-revitalise-schools-and-colleges" },
      { name: "DfE Update to the Further Education Sector (February 2026)", url: "https://www.gov.uk/government/publications/dfe-update-further-education-sector" },
      { name: "Keeping Children Safe in Education consultation statement (Hansard, 12 Feb 2026)", url: "https://hansard.parliament.uk/" },
      { name: "Special educational needs in England statistics", url: "https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england" },
      { name: "Education, Health and Care Plan data tables", url: "https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans" },
      { name: "Tribunals statistics quarterly", url: "https://www.gov.uk/government/statistics/tribunals-statistics-quarterly" },
    ],
  },
  {
    title: "Parliamentary reports and briefings",
    sources: [
      { name: "House of Commons Library briefing on SEND", url: "https://researchbriefings.files.parliament.uk/documents/SN07020/SN07020.pdf" },
      { name: "Public Accounts Committee report on SEND", url: "https://publications.parliament.uk/pa/cm5901/cmselect/cmpubacc/353/report.html" },
      { name: "Education Committee report on SEND", url: "https://publications.parliament.uk/pa/cm5901/cmselect/cmeduc/492/report.html" },
      { name: "House of Lords debate on SEND budget funding", url: "https://hansard.parliament.uk/Lords/2025-12-03/debates/46811928-0773-4D27-984F-5802CBBF5824/SENDBudgetFunding" },
      { name: "House of Commons Education Committee", url: "https://committees.parliament.uk/committee/203/education-committee/" },
      { name: "Health and Social Care and Education Committees inquiry into children and young people's mental health (13 Feb 2026)", url: "https://committees.parliament.uk/" },
      { name: "Commons Library briefing on SEND in England", url: "https://commonslibrary.parliament.uk/research-briefings/sn07020/" },
      { name: "Westminster Hall debates on SEND and EHCPs", url: "https://hansard.parliament.uk/" },
    ],
  },
  {
    title: "Audit and fiscal bodies",
    sources: [
      { name: "NAO report on support for children with special educational needs", url: "https://www.nao.org.uk/reports/support-for-children-and-young-people-with-special-educational-needs" },
      { name: "NAO press release on SEND system financial sustainability", url: "https://www.nao.org.uk/press-releases/special-educational-needs-system-is-financially-unsustainable" },
      { name: "IFS analysis on SEND and childcare spending", url: "https://ifs.org.uk/news/rapid-rises-send-and-childcare-spending-are-reshaping-education-spending-england" },
      { name: "Public Accounts Committee findings on SEND", url: "https://committees.parliament.uk/committee/127/public-accounts-committee/" },
    ],
  },
  {
    title: "Local government",
    sources: [
      { name: "LGA briefing on SEND reform", url: "https://www.local.gov.uk/parliament/briefings-and-responses/special-educational-needs-and-disabilities-send-reform" },
      { name: "LGA briefing on Westminster Hall debate on DSG", url: "https://www.local.gov.uk/parliament/briefings-and-responses/westminster-hall-debate-dedicated-schools-grant-23-april-2025" },
      { name: "LGA SEND reports and briefings", url: "https://www.local.gov.uk/topics/education-and-schools/send" },
      { name: "LGA: SEND deficits and insolvency risk for councils (February 2026)", url: "https://www.local.gov.uk/topics/education-and-schools/send" },
      { name: "County Councils Network: Government commits to covering 90% of SEND deficits (12 Feb 2026)", url: "https://www.countycouncilsnetwork.org.uk/" },
    ],
  },
  {
    title: "Consultation and engagement material",
    sources: [
      { name: "SEND Reform National Conversation", url: "https://consult.education.gov.uk/digital-communication-team/send-reform-national-conversation" },
    ],
  },
  {
    title: "Ofsted and inspection information",
    sources: [
      { name: "Ofsted and CQC area SEND inspections", url: "https://www.gov.uk/government/collections/local-area-send-inspections" },
      { name: "Ofsted reports on inclusion and SEND", url: "https://www.gov.uk/government/organisations/ofsted" },
    ],
  },
  {
    title: "Tribunal and appeals information",
    sources: [
      { name: "SEND Tribunal guidance", url: "https://www.gov.uk/courts-tribunals/first-tier-tribunal-special-educational-needs-and-disability" },
      { name: "Ministry of Justice tribunal statistics", url: "https://www.gov.uk/government/collections/tribunals-statistics" },
    ],
  },
  {
    title: "Education sector press",
    sources: [
      { name: "Schools Week: DfE orders councils to begin SEND reform planning (6 Feb 2026)", url: "https://schoolsweek.co.uk/" },
      { name: "Schools Week: DfE expects all secondary schools to have inclusion bases (11 Feb 2026)", url: "https://schoolsweek.co.uk/" },
      { name: "TES: Nearly a fifth of KS4 pupils now recorded with SEND (10 Feb 2026)", url: "https://www.tes.com/" },
      { name: "TES: DfE estates strategy signals inclusion bases in every secondary (11 Feb 2026)", url: "https://www.tes.com/" },
      { name: "UnHerd: Who will defend SEND children (February 2026)", url: "https://unherd.com/" },
    ],
  },
  {
    title: "Legal and sector analysis",
    sources: [
      { name: "Farrer and Co on proposed reforms to SEN support", url: "https://www.farrer.co.uk/news-and-insights/proposed-reforms-to-sen-support-in-england-what-schools-need-to-know" },
      { name: "Lexology SEND legal analysis", url: "https://www.lexology.com/library/detail.aspx?g=de0f0d8c-a678-47b3-8d25-e448f90a7d2e" },
      { name: "Russell Cooke SEND law briefings", url: "https://www.russell-cooke.co.uk/insights/send/" },
      { name: "Farrer and Co SEND legal updates", url: "https://www.farrer.co.uk/insights/schools/" },
    ],
  },
  {
    title: "Parent led and sector analysis",
    sources: [
      { name: "Special Needs Jungle", url: "https://www.specialneedsjungle.com/" },
      { name: "Contact charity SEND policy and analysis", url: "https://contact.org.uk/" },
      { name: "Contact: Inclusion bases in mainstream secondary schools explained (Feb 2026)", url: "https://contact.org.uk/" },
      { name: "Contact: EHCP transition deadline reminders for parents (Feb 2026)", url: "https://contact.org.uk/" },
      { name: "Disability Rights UK policy briefings", url: "https://www.disabilityrightsuk.org/" },
    ],
  },
  {
    title: "Media reporting referenced",
    sources: [
      { name: "The Guardian: Campaign urges Starmer not to diminish SEND rights", url: "https://www.theguardian.com/education/2026/jan/12/new-campaign-urges-starmer-not-to-diminish-legal-rights-of-send-children" },
      { name: "The Guardian: Parents fear losing support due to SEND reforms", url: "https://www.theguardian.com/education/2026/jan/29/parents-in-england-fear-losing-support-for-disabled-children-due-to-special-needs-reforms-send" },
      { name: "The Guardian: Disabled children legal rights and SEND ministers", url: "https://www.theguardian.com/education/2026/feb/02/disabled-children-legal-rights-send-ministers-special-needs-education-england" },
      { name: "The Guardian: Ministers lobbying blitz to avoid Labour rebellion", url: "https://www.theguardian.com/politics/2026/feb/01/ministers-lobbying-blitz-avoid-labour-rebellion-send-changes" },
      { name: "The Guardian: One in six autistic pupils have not attended school", url: "https://www.theguardian.com/education/2026/feb/04/one-in-six-autistic-pupils-in-uk-have-not-attended-school-at-all-since-september" },
      { name: "The Guardian: Children with special needs will keep current support (9 Feb 2026)", url: "https://www.theguardian.com/education/2026/feb/09/children-special-needs-keep-current-support" },
      { name: "The Guardian: SEND provision leaving deprived areas behind (11 Feb 2026)", url: "https://www.theguardian.com/education/2026/feb/11/send-provision-deprived-areas" },
      { name: "The Guardian: Treasury pressure over £6bn SEND costs (13 Feb 2026)", url: "https://www.theguardian.com/education/2026/feb/13/treasury-pressure-send-costs" },
      { name: "The Guardian education and SEND reporting", url: "https://www.theguardian.com/education/send" },
      { name: "The Times: Schools to get list of changes for special needs (14 Feb 2026)", url: "https://www.thetimes.com/education" },
      { name: "Financial Times reporting on SEND reform", url: "https://www.ft.com/education" },
    ],
  },
];

// ─── Bullet list helper ───

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Section navigation data ───

const sections = [
  { id: "news-tracker", icon: Newspaper, title: "Latest SEND news", summary: "Automatically tracked news from government, parliamentary, and sector sources about SEND and EHCPs." },
  { id: "statistics", icon: BarChart3, title: "Statistics and data", summary: "Official SEND figures for England covering EHC plans, timeliness, tribunals, funding, and reform activity." },
  { id: "projections", icon: TrendingUp, title: "Projected and forecast figures", summary: "Published projections about future SEND demand and funding gaps. These are not current facts." },
  { id: "clarifications", icon: AlertCircle, title: "Important clarifications", summary: "How to interpret the statistics and why some published figures may appear to conflict." },
  { id: "sources", icon: BookOpen, title: "Sources used", summary: "Government, parliamentary, legal, and media sources traceable to every factual claim in this resource." },
  { id: "community", icon: Users, title: "SEND Community articles", summary: "Lived experience articles, parent stories, and community voices referenced by the knowledge base." },
  { id: "how-we-use", icon: FileCheck, title: "How we use sources", summary: "Our approach to verifying and presenting information across the resource." },
  { id: "disclaimer", icon: ShieldAlert, title: "External content disclaimer", summary: "Important information about linked third-party content and how it should be used." },
];

// ─── Collapsible section wrapper ───

function CollapsibleSection({ id, icon: Icon, title, summary, defaultOpen = false, children }: {
  id: string;
  icon: React.ElementType;
  title: string;
  summary: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section id={id} className="content-section py-4 scroll-mt-24">
      <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-start gap-4 w-full text-left group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{summary}</p>
          </div>
          <div className="flex-shrink-0 mt-1">
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="mt-6 pt-6 border-t border-border">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

// Non-collapsible version for short sections
function StaticSection({ id, icon: Icon, title, summary, children }: {
  id: string;
  icon: React.ElementType;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="content-section py-4 scroll-mt-24">
      <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{summary}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

// ─── Page ───

export default function Sources() {
  return (
    <Layout>
      <PageOrientation
        title="Data and sources"
        description="Key SEND statistics for England and the sources used across this resource. All factual claims are traceable to these materials."
        lastUpdated="15th February 2026"
      />

      {/* ═══ PAGE INTRODUCTION ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-3 text-muted-foreground">
          <p>
            This page brings together the data, evidence, and source materials used across the SEND Navigator. It is designed to give parents, professionals, and anyone following SEND reform in England a single place to check the facts, trace the sources, and understand how we present information.
          </p>
          <p>
            The statistics section uses the most recent official data available as of February 2026, covering EHC plan numbers, system timeliness, tribunal activity, funding, and reform progress. Projected figures are clearly separated from confirmed facts. The sources section lists every government document, parliamentary report, legal analysis, media article, and community resource referenced across the site.
          </p>
          <p>
            We also include a growing collection of articles and stories from the SEND community, covering lived experience, parent advocacy, and practical guidance written by families navigating the system.
          </p>
        </div>
      </section>

      {/* ═══ TABLE OF CONTENTS ═══ */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-lg">
          <h2 className="text-base font-semibold text-foreground mb-4">On this page</h2>
          <nav aria-label="Page sections">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <s.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ═══ NEWS TRACKER ═══ */}
      <CollapsibleSection
        id="news-tracker"
        icon={Newspaper}
        title="Latest SEND news"
        summary="Automatically tracked news from government, parliamentary, and sector sources about SEND and EHCPs."
        defaultOpen
      >
        <NewsTracker />
      </CollapsibleSection>

      {/* ═══ STATISTICS (collapsible - large) ═══ */}
      <CollapsibleSection
        id="statistics"
        icon={BarChart3}
        title="Statistics and data"
        summary="Official SEND figures for England covering EHC plans, timeliness, tribunals, funding, and reform activity."
      >
        <h3 className="text-base font-semibold text-foreground mb-4">Summary facts</h3>
        <BulletList items={summaryFacts} />

        <div className="mt-8">
          <h3 className="text-base font-semibold text-foreground mb-6">Confirmed position as of 15 February 2026</h3>
          <p className="text-muted-foreground mb-6">
            The statutory timescale for an EHC needs assessment to a final EHC plan is 20 weeks.
          </p>
          <div className="space-y-8">
            {statSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-base font-medium text-foreground mb-3">{section.title}</h4>
                <BulletList items={section.items} />
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* ═══ PROJECTED FIGURES (short - static) ═══ */}
      <StaticSection
        id="projections"
        icon={TrendingUp}
        title="Projected and forecast figures"
        summary="Published projections about future SEND demand and funding gaps. These are not current facts."
      >
        <Card className="bg-muted/30 border-border shadow-none">
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                <span>The annual Dedicated Schools Grant deficit is projected to exceed £6 billion in 2028/29.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                <span>Parliamentary debate has referenced a projected annual deficit of £6.3 billion in 2028/29, with a larger cumulative deficit across the spending review period.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                <span>Local Government Association analysis projects a SEND funding gap of £2.3 billion in 2025/26, rising to £3.9 billion in 2026/27.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </StaticSection>

      {/* ═══ CLARIFICATIONS (short - static) ═══ */}
      <StaticSection
        id="clarifications"
        icon={AlertCircle}
        title="Important clarifications for readers"
        summary="How to interpret the statistics and why some published figures may appear to conflict."
      >
        <div className="space-y-4 text-muted-foreground">
          <div>
            <p className="mb-2">EHC plan numbers are published using two different measures:</p>
            <ul className="ml-6 space-y-1">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                <span>Pupil counts in school census data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                <span>Children and young people aged 0 to 25 with active plans.</span>
              </li>
            </ul>
            <p className="mt-2">These figures describe different populations and will not match.</p>
          </div>
          <p>Tribunal outcome percentages are not included here because published sources use different methods and definitions.</p>
        </div>
      </StaticSection>

      {/* ═══ SOURCES (collapsible - large) ═══ */}
      <CollapsibleSection
        id="sources"
        icon={BookOpen}
        title="Sources used"
        summary="Government, parliamentary, legal, and media sources traceable to every factual claim in this resource."
      >
        <div className="space-y-10">
          {sourceCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-base font-semibold text-foreground mb-4">{category.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.sources.map((source) => (
                  <SourceCard key={source.url} name={source.name} url={source.url} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ═══ COMMUNITY SOURCES (collapsible - large) ═══ */}
      <CollapsibleSection
        id="community"
        icon={Users}
        title="Articles and information from the SEND Community"
        summary="Lived experience articles, parent stories, and community voices referenced by the knowledge base."
      >
        <div className="space-y-10">
          {communitySourceCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-base font-semibold text-foreground mb-4">{category.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.sources.map((source) => (
                  <SourceCard key={source.url} name={source.name} url={source.url} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ═══ HOW WE USE SOURCES (short - static) ═══ */}
      <StaticSection
        id="how-we-use"
        icon={FileCheck}
        title="How we use sources"
        summary="Our approach to verifying and presenting information across the resource."
      >
        <div className="space-y-3 text-muted-foreground">
          <p>Government announcements, legislation, and official consultations form our primary sources. These are always marked as confirmed.</p>
          <p>We reference established news outlets and specialist education media when reporting on developments being discussed or leaked.</p>
          <p>Where sources disagree or information is contested, we note this clearly. We do not present contested information as fact.</p>
        </div>
      </StaticSection>

      {/* ═══ EXTERNAL CONTENT DISCLAIMER (short - static) ═══ */}
      <StaticSection
        id="disclaimer"
        icon={ShieldAlert}
        title="External content disclaimer"
        summary="Important information about linked third-party content and how it should be used."
      >
        <div className="space-y-3 text-muted-foreground">
          <p>This website includes links to external articles, blogs, forums, and third-party resources.</p>
          <p>These links are provided for information and context only. The views, opinions, experiences, and accuracy of the content belong entirely to the original authors or publishers.</p>
          <p>We do not control, endorse, verify, or take responsibility for the content of external websites, including any advice, claims, or conclusions they present.</p>
          <p>Information shared in linked resources should not be treated as professional, medical, legal, or educational advice. Readers should use their own judgement and, where appropriate, seek independent professional guidance.</p>
          <p>External content may change or be removed without notice.</p>
        </div>
      </StaticSection>

      <div className="content-section pb-16" />
    </Layout>
  );
}
