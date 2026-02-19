import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { SourceCard } from "@/components/SourceCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ExternalLink } from "lucide-react";

// ─── Source categories with descriptions and entries ───

interface SourceEntry {
  name: string;
  url: string;
  description: string;
}

interface SourceCategory {
  id: string;
  title: string;
  description: string;
  sources: SourceEntry[];
}

const sourceCategories: SourceCategory[] = [
  {
    id: "primary-legislation",
    title: "Primary legislation",
    description:
      "The law itself. These are the legal instruments that create duties and rights. Nothing on this site about what the law says or requires is based on commentary alone — it traces back to these documents.",
    sources: [
      {
        name: "Children and Families Act 2014",
        url: "https://www.legislation.gov.uk/ukpga/2014/6/contents/enacted",
        description:
          "The primary legislation governing SEND in England. Establishes EHCPs, the 0–25 age range, local authority duties, tribunal rights, and the preparing for adulthood framework.",
      },
      {
        name: "Equality Act 2010",
        url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
        description:
          "Establishes the protected characteristic of disability. Creates duties on schools and other bodies not to discriminate. Relevant to reasonable adjustments and exclusions.",
      },
      {
        name: "Care Act 2014",
        url: "https://www.legislation.gov.uk/ukpga/2014/23/contents/enacted",
        description:
          "Governs adult social care. Relevant to young people aged 18 and over and the transition from children's to adult services.",
      },
    ],
  },
  {
    id: "statutory-guidance",
    title: "Statutory guidance",
    description:
      "Guidance that public bodies are legally required to have regard to. Not law, but carries significant legal weight. LAs and schools cannot simply ignore it.",
    sources: [
      {
        name: "SEND Code of Practice 2015",
        url: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
        description:
          "Statutory guidance accompanying the Children and Families Act 2014. Sets out how the law should be applied in practice. Covers assessment, EHCPs, annual reviews, transition, and the roles of schools, LAs, health, and social care.",
      },
      {
        name: "Keeping Children Safe in Education 2024",
        url: "https://www.gov.uk/government/publications/keeping-children-safe-in-education--2",
        description:
          "Statutory guidance on safeguarding in schools. Relevant to the intersection of SEND and safeguarding duties.",
      },
    ],
  },
  {
    id: "government-policy",
    title: "Government policy documents and official data",
    description:
      "Published by the Department for Education or other government bodies. Not legally binding but establishes stated government direction and provides official data.",
    sources: [
      {
        name: "SEND and AP Improvement Plan 2023",
        url: "https://www.gov.uk/government/publications/send-and-alternative-provision-improvement-plan",
        description:
          "The previous government's reform plan. Sets out the framework this government inherited and is now revising.",
      },
      {
        name: "Special Educational Needs in England: January 2025",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england",
        description:
          "Annual DfE statistical release. Primary source for EHCP numbers, LA-level data, trends over time.",
      },
      {
        name: "DfE Schools Plan — February 2026",
        url: "https://www.gov.uk/government/publications/10-year-plan-to-revitalise-schools-and-colleges",
        description:
          "The government's plan for mainstream schools reform, including the commitment to inclusion bases in every secondary school and the Ofsted inclusion judgement.",
      },
      {
        name: "SEND: 19 to 25 Year Olds' Entitlement to EHC Plans",
        url: "https://www.gov.uk/government/publications/send-19-to-25-year-olds-entitlement-to-ehc-plans",
        description:
          "Official DfE guidance on post-19 EHCP rights and cease to maintain decisions.",
      },
      {
        name: "High Needs Funding: 2025 to 2026 Operational Guide",
        url: "https://www.gov.uk/government/publications/high-needs-funding-arrangements-2025-to-2026",
        description:
          "DfE funding guidance. Primary source for how high needs spending is structured and allocated.",
      },
    ],
  },
  {
    id: "parliamentary-sources",
    title: "Parliamentary sources",
    description:
      "Debates, committee reports, and research briefings from Parliament. Useful for tracking political direction, official statements, and independent analysis commissioned by Parliament.",
    sources: [
      {
        name: "House of Commons Library: SEND Briefings",
        url: "https://commonslibrary.parliament.uk/research-briefings/sn07020/",
        description:
          "The Commons Library produces research briefings on SEND reform, funding, and legislation. Reliable, balanced, and updated regularly.",
      },
      {
        name: "SEND All-Party Parliamentary Group",
        url: "https://www.appg-send.org.uk/",
        description:
          "Cross-party group of MPs and peers focused on SEND. Publishes reports and statements that signal parliamentary direction.",
      },
      {
        name: "Hansard",
        url: "https://hansard.parliament.uk/",
        description:
          "Official record of parliamentary debates. Used to track ministerial statements and commitments on SEND reform.",
      },
    ],
  },
  {
    id: "regulatory-oversight",
    title: "Regulatory and oversight bodies",
    description: "",
    sources: [
      {
        name: "Ofsted",
        url: "https://www.gov.uk/government/organisations/ofsted",
        description:
          "School inspection body. Relevant to the new inclusion judgement introduced in 2025 and area SEND inspection outcomes.",
      },
      {
        name: "Local Government and Social Care Ombudsman (LGSCO)",
        url: "https://www.lgo.org.uk/",
        description:
          "Investigates complaints about local authority conduct including SEND. Publishes decision summaries and annual reports that document systemic failures.",
      },
      {
        name: "Care Quality Commission (CQC)",
        url: "https://www.cqc.org.uk/",
        description:
          "Regulates health and social care. Involved in joint area SEND inspections alongside Ofsted.",
      },
    ],
  },
  {
    id: "legal-advice",
    title: "Legal and advice organisations",
    description: "",
    sources: [
      {
        name: "IPSEA — Independent Provider of Special Education Advice",
        url: "https://www.ipsea.org.uk/",
        description:
          "Free legally-based advice charity. Primary source for practical guidance on EHCP processes, model letters, and tribunal preparation. Legally rigorous and regularly updated.",
      },
      {
        name: "SOS!SEN",
        url: "https://www.sossen.org.uk/",
        description:
          "Charity providing free advice and tribunal support. Practical source for enforcement and appeal guidance.",
      },
      {
        name: "Council for Disabled Children",
        url: "https://councilfordisabledchildren.org.uk/",
        description:
          "National body for the disabled children's sector. Hosts the IASS Network and produces policy analysis and practice guidance.",
      },
    ],
  },
  {
    id: "sector-media",
    title: "Established sector and investigative media",
    description:
      "Used for tracking policy developments, leaked proposals, and political context. We distinguish between reported facts and editorial analysis when drawing on these sources.",
    sources: [
      {
        name: "Schools Week",
        url: "https://schoolsweek.co.uk/",
        description:
          "Specialist education journalism. Primary source for policy developments, DfE announcements, and leaked proposals. Bylines tracked include Pippa Allen-Kinross and John Dickens.",
      },
      {
        name: "Special Needs Jungle",
        url: "https://www.specialneedsjungle.com/",
        description:
          "Parent-facing SEND news and analysis. Editorially independent. Strong on legal detail and lived experience. Campaigning stance noted and accounted for when assessing content.",
      },
      {
        name: "BBC News Education",
        url: "https://www.bbc.co.uk/news/education",
        description:
          "Used for major announcements and confirmed government statements. The 18 February 2026 report on SEND reform is referenced on this site.",
      },
    ],
  },
  {
    id: "research-analysis",
    title: "Research and analysis",
    description: "",
    sources: [
      {
        name: "Institute for Fiscal Studies — SEND Research",
        url: "https://ifs.org.uk/news/rapid-rises-send-and-childcare-spending-are-reshaping-education-spending-england",
        description:
          "Independent economic analysis of SEND funding, cost pressures, and reform options. Used for financial data and system-level analysis.",
      },
      {
        name: "National Audit Office",
        url: "https://www.nao.org.uk/reports/support-for-children-and-young-people-with-special-educational-needs",
        description:
          "Scrutinises public spending. Has published analysis of SEND system costs and local authority financial pressures.",
      },
    ],
  },
];

// ─── Page ───

export default function Sources() {
  return (
    <Layout>
      <PageOrientation
        title="Sources and Evidence Base"
        description="Every source this site draws on, grouped by type. You should be able to check anything we say."
        lastUpdated="19th February 2026"
      />

      {/* ═══ INTRODUCTION ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            This page lists the <strong>sources this site draws on</strong>.
          </p>
          <p>
            It exists for one reason: <strong>you should be able to check anything we say</strong>.
          </p>
          <p>
            Every page on this site uses a confidence label — Confirmed, Discussed, Unconfirmed, or Unknown. Those labels are only meaningful if you can see where the information comes from.
          </p>
          <p>
            Sources are grouped by type. Where a source is directly available online, a link is provided.
          </p>
        </div>
      </section>

      {/* ═══ SOURCE CATEGORIES ═══ */}
      {sourceCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="content-section py-6 scroll-mt-24"
        >
          <h2 className="text-lg font-display font-bold text-foreground mb-2">
            {category.title}
          </h2>
          {category.description && (
            <p className="text-sm text-muted-foreground mb-5 max-w-3xl leading-relaxed">
              {category.description}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.sources.map((source) => (
              <SourceCard
                key={source.url}
                name={source.name}
                url={source.url}
                description={source.description}
              />
            ))}
          </div>
        </section>
      ))}

      {/* ═══ HOW WE USE SOURCES ═══ */}
      <section className="content-section py-8 scroll-mt-24" id="how-we-use-sources">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg max-w-3xl">
          <h2 className="text-lg font-display font-bold text-foreground mb-4">How we use sources</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Every claim on this site that is presented as fact <strong>traces back to at least one of the sources listed here</strong>, or to a source of equivalent standing.
            </p>
            <p>
              Where information comes from a single source, or where a source has a stated position or interest, we note this in the relevant page.
            </p>
            <p>
              Where information is unconfirmed — for example, leaked proposals or reports that have not been officially acknowledged — we <strong>label it clearly and do not present it as fact</strong>.
            </p>
            <p>
              If you believe something on this site is inaccurate or poorly sourced, <a href="/feedback" className="text-primary hover:underline">contact us</a>. We will check it and correct it if needed.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONFIDENCE LABEL ═══ */}
      <section className="content-section py-4 pb-16">
        <StatusBadge status="confirmed" />
        <p className="text-xs text-muted-foreground mt-2 max-w-2xl">
          This page describes our editorial approach and lists our sources. It does not make claims about policy.
        </p>
      </section>
    </Layout>
  );
}
