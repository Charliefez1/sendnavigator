import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { SourceCard } from "@/components/SourceCard";
import { StatusBadge } from "@/components/StatusBadge";
import { WordFromRich } from "@/components/WordFromRich";
import { getSourcesByCategory } from "@/config/sources";

// Auto-generate from the source registry
const groupedSources = getSourcesByCategory();

export default function Sources() {
  return (
    <Layout>
      <PageOrientation
        title="Sources and Evidence Base"
        description="Every source this site draws on, grouped by type. You should be able to check anything we say."
        lastUpdated="23rd February 2026"
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
            Every page on this site uses a confidence label: Confirmed, Discussed, Unconfirmed, or Unknown. Those labels are only meaningful if you can see where the information comes from.
          </p>
          <p>
            Sources are grouped by type. Where a source is directly available online, a link is provided.
          </p>
        </div>
      </section>

      <WordFromRich>
        <p>Everything on this site should be checkable. That matters to me. I have been in meetings where someone quoted something confidently and it was wrong, and the person across the table did not have the information to push back. This page is here so you do. If you ever read something on this site and want to know where it comes from, start here.</p>
      </WordFromRich>

      {/* ═══ SOURCE CATEGORIES — auto-generated from registry ═══ */}
      {groupedSources.map((group) => (
        <section
          key={group.category}
          id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="content-section py-6 scroll-mt-24"
        >
          <h2 className="text-lg font-display font-bold text-foreground mb-2">
            {group.category}
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            {group.sources.length} source{group.sources.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {group.sources.map((source) => (
              <SourceCard
                key={source.id}
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
              Where information is unconfirmed, for example leaked proposals or reports that have not been officially acknowledged, we <strong>label it clearly and do not present it as fact</strong>.
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
