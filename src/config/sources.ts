/**
 * SEND Reform Navigator - Content Sources Registry
 * 
 * This file tracks the sources used for all content in the resource.
 * Every factual claim must have a traceable source.
 */

import { SourceReference, AcceptedSourceType } from "./guardrails";

// =============================================================================
// SOURCE REGISTRY
// =============================================================================

export interface ContentSource extends SourceReference {
  id: string;
  usedIn: string[]; // Page paths where this source is referenced
}

/**
 * Registry of all sources used in SEND Reform Navigator
 * This will be populated as content is added
 */
export const sourceRegistry: ContentSource[] = [
  // Example structure - to be populated with actual sources
  {
    id: "cfa-2014",
    type: "government_primary",
    name: "Children and Families Act 2014",
    url: "https://www.legislation.gov.uk/ukpga/2014/6/contents/enacted",
    dateAccessed: "2026-02-04",
    datePublished: "2014-03-13",
    usedIn: ["/where-we-are-now", "/about"],
    notes: "Primary legislation governing SEND in England",
  },
  {
    id: "send-cop-2015",
    type: "government_primary",
    name: "SEND Code of Practice: 0 to 25 years",
    url: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
    dateAccessed: "2026-02-04",
    datePublished: "2015-01-01",
    usedIn: ["/where-we-are-now"],
    notes: "Statutory guidance for organisations working with children with SEND",
  },
];

// =============================================================================
// SOURCE LOOKUP FUNCTIONS
// =============================================================================

/**
 * Get all sources used on a specific page
 */
export function getSourcesForPage(pagePath: string): ContentSource[] {
  return sourceRegistry.filter(source => source.usedIn.includes(pagePath));
}

/**
 * Get a source by its ID
 */
export function getSourceById(id: string): ContentSource | undefined {
  return sourceRegistry.find(source => source.id === id);
}

/**
 * Get sources by type
 */
export function getSourcesByType(type: AcceptedSourceType): ContentSource[] {
  return sourceRegistry.filter(source => source.type === type);
}

// =============================================================================
// SOURCE DISPLAY HELPERS
// =============================================================================

export const sourceTypeLabels: Record<AcceptedSourceType, string> = {
  government_primary: "Government source",
  parliamentary: "Parliamentary source",
  public_body: "Public body",
  established_media: "Media report",
  sector_briefing: "Sector briefing",
};

/**
 * Format a source for display
 */
export function formatSourceForDisplay(source: ContentSource): {
  label: string;
  typeLabel: string;
  date: string;
} {
  return {
    label: source.name,
    typeLabel: sourceTypeLabels[source.type],
    date: source.datePublished || source.dateAccessed,
  };
}
