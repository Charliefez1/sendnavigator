export interface StructuredTopSummary {
  headline: string;
  bullets: string[];
}

export interface StructuredSectionInsight {
  sectionIndex: number;
  sectionTitle: string;
  reflection: string;
}

export interface StructuredAIReport {
  version: 2;
  openingLine: string;
  topSummary: StructuredTopSummary;
  sectionInsights: StructuredSectionInsight[];
  waysOfWorking: string;
  someThingsThatMayHelp: string;
  conclusion: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isStructuredReport(r: any): r is StructuredAIReport {
  return (
    r != null &&
    typeof r === "object" &&
    r.version === 2 &&
    typeof r.openingLine === "string" &&
    r.topSummary != null &&
    Array.isArray(r.topSummary?.bullets) &&
    Array.isArray(r.sectionInsights)
  );
}
