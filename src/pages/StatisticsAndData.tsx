import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { Card, CardContent } from "@/components/ui/card";
import { SourceCard } from "@/components/SourceCard";
import { AlertCircle, TrendingUp, Users, BarChart3, PoundSterling, Gavel } from "lucide-react";
import { StatCard, PercentageRing, HorizontalBarChart } from "@/components/templates/DataVisuals";
import { LatestUpdatePanel } from "@/components/templates/LatestUpdatePanel";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";

interface StatItem {
  label: string;
  value: string;
}

interface SourceLink {
  name: string;
  url: string;
}

const summaryFacts: string[] = [
  "SEND demand in England continues to rise, with over 1.7 million pupils identified with SEND.",
  "The number of children and young people with EHC plans increased by over 10 percent in one year.",
  "Fewer than half of new EHC plans are completed within the legal 20 week timescale.",
  "Tribunal activity remains high, with 25,000 appeals registered in the last academic year.",
  "SEND spending has increased significantly, but local authorities still report large funding gaps.",
  "Future projections show continued financial pressure without structural change.",
];

const sourceLinks: { category: string; sources: SourceLink[] }[] = [
  {
    category: "Government and official statistics",
    sources: [
      {
        name: "Special educational needs in England 2024/25",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england/2024-25",
      },
      {
        name: "Education, Health and Care Plans 2025",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans/2025",
      },
      {
        name: "Tribunals statistics quarterly July to September 2025",
        url: "https://www.gov.uk/government/statistics/tribunals-statistics-quarterly-july-to-september-2025",
      },
    ],
  },
  {
    category: "Audit and parliamentary",
    sources: [
      {
        name: "NAO report on support for children with special educational needs",
        url: "https://www.nao.org.uk/reports/support-for-children-and-young-people-with-special-educational-needs",
      },
      {
        name: "Public Accounts Committee report on SEND",
        url: "https://publications.parliament.uk/pa/cm5901/cmselect/cmpubacc/353/report.html",
      },
      {
        name: "House of Lords debate on SEND budget funding",
        url: "https://hansard.parliament.uk/Lords/2025-12-03/debates/46811928-0773-4D27-984F-5802CBBF5824/SENDBudgetFunding",
      },
    ],
  },
  {
    category: "Local government",
    sources: [
      {
        name: "LGA briefing on Westminster Hall debate on DSG",
        url: "https://www.local.gov.uk/parliament/briefings-and-responses/westminster-hall-debate-dedicated-schools-grant-23-april-2025",
      },
    ],
  },
  {
    category: "Government announcements",
    sources: [
      {
        name: "£200 million landmark SEND teacher training programme",
        url: "https://www.gov.uk/government/news/200-million-landmark-send-teacher-training-programme",
      },
      {
        name: "SEND Reform National Conversation",
        url: "https://consult.education.gov.uk/digital-communication-team/send-reform-national-conversation",
      },
    ],
  },
];

export default function StatisticsAndData() {
  return (
    <Layout>
      <PageOrientation
        title="Statistics and data"
        description="Key SEND statistics for England, using the most recent official data available. These figures show the current scale and pressures in the system."
        lastUpdated="23rd February 2026"
      />

      <LatestUpdatePanel>
        <p>
          The Schools White Paper — <strong>Every Child Achieving and Thriving (published 23 February 2026)</strong> — confirms the £4bn SEND package.
        </p>
        <p>
          Updated EHCP figures: <strong>638,700 children with EHCPs in England</strong> (January 2025); 43.6% in mainstream schools; 30.4% in special schools; over 1.7 million pupils with identified SEND.
        </p>
        <p>
          Updated tribunal figures: <strong>21,000 appeals in 2023/24</strong>, up 55% on the previous year. Parents win approximately 95% of cases. 5,569 cases were conceded before the hearing.
        </p>
        <p>
          Two fifths of local authorities are at risk of issuing a Section 114 notice by March 2026. The Inclusive Mainstream Fund works out at roughly <strong>£26,000 per school per year</strong> if split evenly.
        </p>
      </LatestUpdatePanel>

      <LatestUpdatesStream />

      {/* Introduction */}
      <section className="content-section py-8">
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          This page brings together the key SEND statistics for England, using the most recent official data available as of 07 February 2026. It shows how many children and young people are receiving support, how the system is performing against legal timescales, how often disputes reach tribunal, and how funding is changing. The figures are presented to give a clear picture of the current scale and pressures in the system, and to distinguish between what is happening now and what has been projected for the future.
        </p>
      </section>

      {/* Summary facts */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">Summary facts</h2>
        <ul className="space-y-2">
          {summaryFacts.map((fact, index) => (
            <li key={index} className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Confirmed position */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-lg font-display font-semibold text-foreground mb-6">Confirmed position as of 23 February 2026</h2>

        <div className="space-y-8">
          {/* Legal framework */}
          <div>
            <h3 className="text-lg font-display font-medium text-foreground mb-3">Legal framework</h3>
            <p className="text-muted-foreground">
              The statutory timescale for an EHC needs assessment to a final EHC plan is 20 weeks.
            </p>
          </div>

          {/* Children and young people with SEND - visual */}
          <div>
            <h3 className="text-lg font-display font-medium text-foreground mb-3">Children and young people with SEND</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <StatCard value="638,700" label="Active EHC plans" sublabel="January 2025" icon={Users} accentColor="confirmed" />
              <StatCard value="10.8%" label="Annual increase" sublabel="From 576,500 in 2024" icon={TrendingUp} accentColor="discussed" />
              <StatCard value="1.7m+" label="Total pupils with SEN" sublabel="2024/25 academic year" icon={Users} accentColor="confirmed" />
            </div>
            <HorizontalBarChart
              title="EHCP vs SEN Support"
              items={[
                { label: "EHC plans in schools", value: 482640, displayValue: "482,640", color: "confirmed" },
                { label: "SEN Support (no EHCP)", value: 1284284, displayValue: "1,284,284", color: "discussed" },
              ]}
            />
          </div>

          {/* Placement types */}
          <div>
            <h3 className="text-lg font-display font-medium text-foreground mb-3">Placement types</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>278,200 children and young people with EHC plans attended mainstream schools in January 2025, representing 43.6 percent of all EHC plans.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>24,500 attended SEN units or resourced provision within mainstream schools.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>7,200 attended independent mainstream schools.</span>
              </li>
            </ul>
          </div>

          {/* EHC plan timeliness - visual */}
          <div>
            <h3 className="text-lg font-display font-medium text-foreground mb-3">EHC plan timeliness</h3>
            <div className="flex flex-wrap justify-center gap-8 py-4">
              <PercentageRing percentage={46} label="Issued within 20 weeks" sublabel="2024 (down from 50.3% in 2023)" color="unconfirmed" />
              <PercentageRing percentage={7} label="Took over 52 weeks" sublabel="2024" color="unconfirmed" size={100} />
            </div>
          </div>

          {/* Tribunal activity */}
          <div>
            <h3 className="text-lg font-display font-medium text-foreground mb-3">Tribunal activity</h3>
            <div className="grid grid-cols-2 gap-3">
              <StatCard value="25,000" label="Appeals registered" sublabel="2024/25 academic year" icon={Gavel} accentColor="unconfirmed" />
              <StatCard value="20,000" label="Appeals disposed of" sublabel="Same period" icon={Gavel} accentColor="discussed" />
            </div>
          </div>

          {/* Funding - visual */}
          <div>
            <h3 className="text-lg font-display font-medium text-foreground mb-3">Funding</h3>
            <HorizontalBarChart
              title="High needs funding growth"
              items={[
                { label: "2014/15", value: 5.3, displayValue: "£5.3bn", color: "confirmed" },
                { label: "2024/25", value: 9.4, displayValue: "£9.4bn", color: "discussed" },
              ]}
            />
            <p className="text-sm text-muted-foreground mt-3">
              Local authorities reported spending an additional <strong>£950 million</strong> on SEND in 2023/24 beyond allocated national funding.
            </p>
          </div>

          {/* Reform activity */}
          <div>
            <h3 className="text-lg font-display font-medium text-foreground mb-3">Reform activity</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>A £200 million national SEND teacher training programme was announced in January 2026.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>The SEND reform national conversation ran from 02 December 2025 to 14 January 2026.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projected figures */}
      <section className="content-section py-8 border-t border-border">
        <div className="flex items-start gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">Projected and forecast figures</h2>
            <p className="text-sm text-muted-foreground mt-1">These are not current facts. They are published projections.</p>
          </div>
        </div>

        <Card className="bg-muted/30 border-border">
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
      </section>

      {/* Important clarifications */}
      <section className="content-section py-8 border-t border-border">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
          <h2 className="text-lg font-display font-semibold text-foreground">Important clarifications for readers</h2>
        </div>

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
          <p>
            Tribunal outcome percentages are not included here because published sources use different methods and definitions.
          </p>
        </div>
      </section>

      {/* Source links */}
      <section className="content-section py-8 border-t border-border">
        <h2 className="text-lg font-display font-semibold text-foreground mb-6">Source links</h2>

        <div className="space-y-8">
          {sourceLinks.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-medium text-foreground mb-3">{category.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.sources.map((source) => (
                  <SourceCard key={source.url} name={source.name} url={source.url} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
