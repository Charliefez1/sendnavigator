import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { SourceCard } from "@/components/SourceCard";

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
      {
        name: "Children and Families Act 2014",
        url: "https://www.legislation.gov.uk/ukpga/2014/6/contents/enacted",
      },
      {
        name: "SEND Code of Practice 0 to 25",
        url: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
      },
    ],
  },
  {
    title: "Government and official statistics",
    sources: [
      {
        name: "SEND and Alternative Provision Improvement Plan",
        url: "https://www.gov.uk/government/publications/send-and-alternative-provision-improvement-plan",
      },
      {
        name: "Transformational reform begins for children and young people with SEND",
        url: "https://www.gov.uk/government/news/transformational-reform-begins-for-children-and-young-people-with-send",
      },
      {
        name: "£3bn investment to end postcode lottery for children with SEND",
        url: "https://www.gov.uk/government/news/3bn-investment-to-end-postcode-lottery-for-children-with-send",
      },
      {
        name: "Government launches national conversation on SEND",
        url: "https://www.gov.uk/government/news/government-launches-national-conversation-on-send",
      },
      {
        name: "£200 million landmark SEND teacher training programme",
        url: "https://www.gov.uk/government/news/200-million-landmark-send-teacher-training-programme",
      },
      {
        name: "Special educational needs in England statistics",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england",
      },
      {
        name: "Education, Health and Care Plan data tables",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans",
      },
      {
        name: "Tribunals statistics quarterly",
        url: "https://www.gov.uk/government/statistics/tribunals-statistics-quarterly",
      },
    ],
  },
  {
    title: "Parliamentary reports and briefings",
    sources: [
      {
        name: "House of Commons Library briefing on SEND",
        url: "https://researchbriefings.files.parliament.uk/documents/SN07020/SN07020.pdf",
      },
      {
        name: "Public Accounts Committee report on SEND",
        url: "https://publications.parliament.uk/pa/cm5901/cmselect/cmpubacc/353/report.html",
      },
      {
        name: "Education Committee report on SEND",
        url: "https://publications.parliament.uk/pa/cm5901/cmselect/cmeduc/492/report.html",
      },
      {
        name: "House of Lords debate on SEND budget funding",
        url: "https://hansard.parliament.uk/Lords/2025-12-03/debates/46811928-0773-4D27-984F-5802CBBF5824/SENDBudgetFunding",
      },
      {
        name: "House of Commons Education Committee",
        url: "https://committees.parliament.uk/committee/203/education-committee/",
      },
      {
        name: "Commons Library briefing on SEND in England",
        url: "https://commonslibrary.parliament.uk/research-briefings/sn07020/",
      },
      {
        name: "Westminster Hall debates on SEND and EHCPs",
        url: "https://hansard.parliament.uk/",
      },
    ],
  },
  {
    title: "Audit and fiscal bodies",
    sources: [
      {
        name: "NAO report on support for children with special educational needs",
        url: "https://www.nao.org.uk/reports/support-for-children-and-young-people-with-special-educational-needs",
      },
      {
        name: "NAO press release on SEND system financial sustainability",
        url: "https://www.nao.org.uk/press-releases/special-educational-needs-system-is-financially-unsustainable",
      },
      {
        name: "IFS analysis on SEND and childcare spending",
        url: "https://ifs.org.uk/news/rapid-rises-send-and-childcare-spending-are-reshaping-education-spending-england",
      },
      {
        name: "Public Accounts Committee findings on SEND",
        url: "https://committees.parliament.uk/committee/127/public-accounts-committee/",
      },
    ],
  },
  {
    title: "Local government",
    sources: [
      {
        name: "LGA briefing on SEND reform",
        url: "https://www.local.gov.uk/parliament/briefings-and-responses/special-educational-needs-and-disabilities-send-reform",
      },
      {
        name: "LGA briefing on Westminster Hall debate on DSG",
        url: "https://www.local.gov.uk/parliament/briefings-and-responses/westminster-hall-debate-dedicated-schools-grant-23-april-2025",
      },
      {
        name: "LGA SEND reports and briefings",
        url: "https://www.local.gov.uk/topics/education-and-schools/send",
      },
    ],
  },
  {
    title: "Consultation and engagement material",
    sources: [
      {
        name: "SEND Reform National Conversation",
        url: "https://consult.education.gov.uk/digital-communication-team/send-reform-national-conversation",
      },
    ],
  },
  {
    title: "Ofsted and inspection information",
    sources: [
      {
        name: "Ofsted and CQC area SEND inspections",
        url: "https://www.gov.uk/government/collections/local-area-send-inspections",
      },
      {
        name: "Ofsted reports on inclusion and SEND",
        url: "https://www.gov.uk/government/organisations/ofsted",
      },
    ],
  },
  {
    title: "Tribunal and appeals information",
    sources: [
      {
        name: "SEND Tribunal guidance",
        url: "https://www.gov.uk/courts-tribunals/first-tier-tribunal-special-educational-needs-and-disability",
      },
      {
        name: "Ministry of Justice tribunal statistics",
        url: "https://www.gov.uk/government/collections/tribunals-statistics",
      },
    ],
  },
  {
    title: "Legal and sector analysis",
    sources: [
      {
        name: "Farrer and Co on proposed reforms to SEN support",
        url: "https://www.farrer.co.uk/news-and-insights/proposed-reforms-to-sen-support-in-england-what-schools-need-to-know",
      },
      {
        name: "Lexology SEND legal analysis",
        url: "https://www.lexology.com/library/detail.aspx?g=de0f0d8c-a678-47b3-8d25-e448f90a7d2e",
      },
      {
        name: "Russell Cooke SEND law briefings",
        url: "https://www.russell-cooke.co.uk/insights/send/",
      },
      {
        name: "Farrer and Co SEND legal updates",
        url: "https://www.farrer.co.uk/insights/schools/",
      },
    ],
  },
  {
    title: "Parent led and sector analysis",
    sources: [
      {
        name: "Special Needs Jungle",
        url: "https://www.specialneedsjungle.com/",
      },
      {
        name: "Contact charity SEND policy and analysis",
        url: "https://contact.org.uk/",
      },
      {
        name: "Disability Rights UK policy briefings",
        url: "https://www.disabilityrightsuk.org/",
      },
    ],
  },
  {
    title: "Media reporting referenced",
    sources: [
      {
        name: "The Guardian: Campaign urges Starmer not to diminish SEND rights",
        url: "https://www.theguardian.com/education/2026/jan/12/new-campaign-urges-starmer-not-to-diminish-legal-rights-of-send-children",
      },
      {
        name: "The Guardian: Parents fear losing support due to SEND reforms",
        url: "https://www.theguardian.com/education/2026/jan/29/parents-in-england-fear-losing-support-for-disabled-children-due-to-special-needs-reforms-send",
      },
      {
        name: "The Guardian: Disabled children legal rights and SEND ministers",
        url: "https://www.theguardian.com/education/2026/feb/02/disabled-children-legal-rights-send-ministers-special-needs-education-england",
      },
      {
        name: "The Guardian: Ministers lobbying blitz to avoid Labour rebellion",
        url: "https://www.theguardian.com/politics/2026/feb/01/ministers-lobbying-blitz-avoid-labour-rebellion-send-changes",
      },
      {
        name: "The Guardian: One in six autistic pupils have not attended school",
        url: "https://www.theguardian.com/education/2026/feb/04/one-in-six-autistic-pupils-in-uk-have-not-attended-school-at-all-since-september",
      },
      {
        name: "The Guardian education and SEND reporting",
        url: "https://www.theguardian.com/education/send",
      },
      {
        name: "Financial Times reporting on SEND reform",
        url: "https://www.ft.com/education",
      },
    ],
  },
];

export default function Sources() {
  return (
    <Layout>
      <PageOrientation
        title="Data and sources used"
        description="The sources we use across this resource. All factual claims are traceable to these materials."
        lastUpdated="7th February 2026"
      />

      <section className="content-section py-8">
        <div className="space-y-10">
          {sourceCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.sources.map((source) => (
                  <SourceCard key={source.url} name={source.name} url={source.url} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          How we use sources
        </h2>
        <div className="prose-calm space-y-3">
          <p>
            Government announcements, legislation, and official consultations form our primary sources. These are always marked as confirmed.
          </p>
          <p>
            We reference established news outlets and specialist education media when reporting on developments being discussed or leaked.
          </p>
          <p>
            Where sources disagree or information is contested, we note this clearly. We do not present contested information as fact.
          </p>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
