import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { SourceCard } from "@/components/SourceCard";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, TrendingUp, ShieldAlert, Users, BarChart3, BookOpen, FileCheck, ChevronDown, ChevronRight, Newspaper } from "lucide-react";
import { communitySourceCategories } from "@/config/community-sources";
import { NewsTracker } from "@/components/NewsTracker";
import { NewsHeadlines } from "@/components/NewsHeadlines";
import { getSourcesByCategory } from "@/config/sources";

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

// sourceCategories now comes from the central registry via getSourcesByCategory()

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

      {/* ═══ BREAKING HEADLINES ═══ */}
      <section className="content-section py-4">
        <NewsHeadlines />
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
          {getSourcesByCategory().map((group) => (
            <div key={group.category}>
              <h3 className="text-base font-semibold text-foreground mb-4">{group.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.sources.map((source) => (
                  <SourceCard key={source.id} name={source.name} url={source.url} description={source.description} />
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
                  <SourceCard key={source.url} name={source.name} url={source.url} description={source.summary} />
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
