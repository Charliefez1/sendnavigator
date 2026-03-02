import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { SourceCard } from "@/components/SourceCard";
import { StatusBadge } from "@/components/StatusBadge";
import { WordFromRich } from "@/components/WordFromRich";
import { getSourcesByCategory } from "@/config/sources";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

// Auto-generate from the source registry
const groupedSources = getSourcesByCategory();

export default function Sources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (category: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  // Filter sources based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groupedSources;

    const q = searchQuery.toLowerCase();
    return groupedSources
      .map((group) => ({
        ...group,
        sources: group.sources.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            (s.url && s.url.toLowerCase().includes(q))
        ),
      }))
      .filter((group) => group.sources.length > 0);
  }, [searchQuery]);

  // When searching, auto-open all matching sections
  const isSearching = searchQuery.trim().length > 0;

  const totalResults = filteredGroups.reduce((sum, g) => sum + g.sources.length, 0);

  return (
    <Layout>
      <PageOrientation icon={BookOpen}
        sectionLabel="About"
        title="Sources and Evidence Base"
        description="Every source this site draws on, grouped by type. You should be able to check anything we say."
        lastUpdated="1st March 2026"
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

      {/* ═══ SEARCH ═══ */}
      <section className="content-section py-4">
        <div className="max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search sources — e.g. 'EHCP', 'tribunal', 'Schools White Paper', 'EEF'…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-sm"
              aria-label="Search sources"
            />
          </div>
          {isSearching && (
            <p className="text-xs text-muted-foreground mt-2">
              {totalResults} source{totalResults !== 1 ? "s" : ""} found across {filteredGroups.length} categor{filteredGroups.length !== 1 ? "ies" : "y"}
            </p>
          )}
        </div>
      </section>

      {/* ═══ SOURCE CATEGORIES — auto-generated from registry ═══ */}
      {filteredGroups.map((group) => {
        const sectionId = group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const isOpen = isSearching || openSections.has(group.category);

        return (
          <section
            key={group.category}
            id={sectionId}
            className="content-section py-2 scroll-mt-24"
          >
            <Collapsible open={isOpen} onOpenChange={() => !isSearching && toggleSection(group.category)}>
              <CollapsibleTrigger
                className="flex items-center justify-between w-full py-3 text-left group"
                disabled={isSearching}
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-display font-bold text-foreground">
                    {group.category}
                  </h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {group.sources.length}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  } ${isSearching ? "opacity-30" : "group-hover:text-foreground"}`}
                  aria-hidden="true"
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4 pt-1">
                  {group.sources.map((source) => (
                    <SourceCard
                      key={source.id}
                      name={source.name}
                      url={source.url}
                      description={source.description}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>
        );
      })}

      {isSearching && filteredGroups.length === 0 && (
        <section className="content-section py-8">
          <p className="text-sm text-muted-foreground">
            No sources found for "<strong>{searchQuery}</strong>". Try a different term — for example "tribunal", "EHCP", or "White Paper".
          </p>
        </section>
      )}

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
