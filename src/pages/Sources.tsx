import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { ExternalLink } from "lucide-react";

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
    title: "Government policy and reform documents",
    sources: [
      {
        name: "SEND and Alternative Provision Improvement Plan March 2023",
        url: "https://www.gov.uk/government/publications/send-and-alternative-provision-improvement-plan",
      },
      {
        name: "Department for Education SEND Reform National Conversation",
        url: "https://consult.education.gov.uk/digital-communication-team/send-reform-national-conversation/",
      },
      {
        name: "Department for Education announcements on SEND reform and training",
        url: "https://www.gov.uk/government/organisations/department-for-education",
      },
    ],
  },
  {
    title: "Education Committee and Parliamentary material",
    sources: [
      {
        name: "House of Commons Education Committee reports on SEND",
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
    title: "Local government and funding data",
    sources: [
      {
        name: "Local Government Association SEND reports and briefings",
        url: "https://www.local.gov.uk/topics/education-and-schools/send",
      },
      {
        name: "National Audit Office reports on SEND funding and sustainability",
        url: "https://www.nao.org.uk/",
      },
      {
        name: "Public Accounts Committee findings on SEND",
        url: "https://committees.parliament.uk/committee/127/public-accounts-committee/",
      },
    ],
  },
  {
    title: "SEND statistics and system data",
    sources: [
      {
        name: "Department for Education SEND statistics England",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england",
      },
      {
        name: "Education, Health and Care Plan data tables",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans",
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
    title: "Legal and professional commentary",
    sources: [
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
        lastUpdated="6th February 2026"
      />

      <section className="content-section py-8">
        <div className="space-y-8">
          {sourceCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {category.title}
              </h2>
              <ul className="space-y-2">
                {category.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span className="group-hover:underline">{source.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
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
