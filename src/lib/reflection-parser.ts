// ───────────────────────────────────────────────────
// Section reflection parser — enforces required headings
// ───────────────────────────────────────────────────

export const REQUIRED_SECTION_HEADINGS = [
  "What you told us",
  "What this tells us",
  "What could help",
] as const;

export type SectionHeading = (typeof REQUIRED_SECTION_HEADINGS)[number];

export interface ParsedReflectionBlock {
  heading: SectionHeading;
  content: string;
}

const FALLBACK_CONTENT = "Not enough information captured yet. You can add notes to improve this section.";

/**
 * Parse a reflection string into its three required blocks.
 * If the AI omitted headings (legacy format), maps paragraphs positionally.
 * Always returns exactly three blocks with content or fallback text.
 */
export function parseReflectionBlocks(reflection: string): ParsedReflectionBlock[] {
  if (!reflection?.trim()) {
    return REQUIRED_SECTION_HEADINGS.map((heading) => ({
      heading,
      content: FALLBACK_CONTENT,
    }));
  }

  // Try to split by heading markers
  const blocks: Partial<Record<SectionHeading, string>> = {};
  let matched = false;

  for (const heading of REQUIRED_SECTION_HEADINGS) {
    // Match heading at start of line (case-insensitive)
    const pattern = new RegExp(`(?:^|\\n)\\s*${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n`, "i");
    const match = reflection.match(pattern);
    if (match && match.index !== undefined) {
      matched = true;
    }
  }

  if (matched) {
    // Split by any of the three headings
    const headingPattern = new RegExp(
      `(?:^|\\n)\\s*(${REQUIRED_SECTION_HEADINGS.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})\\s*\\n`,
      "gi"
    );

    const parts: { heading: string; startIndex: number }[] = [];
    let m: RegExpExecArray | null;
    while ((m = headingPattern.exec(reflection)) !== null) {
      parts.push({
        heading: m[1].trim(),
        startIndex: m.index + m[0].length,
      });
    }

    for (let i = 0; i < parts.length; i++) {
      const end = i + 1 < parts.length ? parts[i + 1].startIndex - parts[i + 1].heading.length - 2 : reflection.length;
      const content = reflection.slice(parts[i].startIndex, end).trim();
      const normalised = REQUIRED_SECTION_HEADINGS.find(
        (h) => h.toLowerCase() === parts[i].heading.toLowerCase()
      );
      if (normalised) {
        blocks[normalised] = content;
      }
    }
  } else {
    // Legacy: no headings found — split by double newlines and map positionally
    const paragraphs = reflection.split(/\n\n+/).filter((p) => p.trim());
    REQUIRED_SECTION_HEADINGS.forEach((heading, i) => {
      if (paragraphs[i]) {
        blocks[heading] = paragraphs[i].trim();
      }
    });
  }

  return REQUIRED_SECTION_HEADINGS.map((heading) => ({
    heading,
    content: blocks[heading]?.trim() || FALLBACK_CONTENT,
  }));
}

/**
 * Dev-mode integrity check. Logs warnings for any section missing required headings.
 * Call after report generation to flag issues during development.
 */
export function checkReflectionIntegrity(
  sectionInsights: Array<{ sectionIndex: number; sectionTitle: string; reflection: string }>
): string[] {
  const warnings: string[] = [];

  for (const insight of sectionInsights) {
    const blocks = parseReflectionBlocks(insight.reflection);
    for (const block of blocks) {
      if (block.content === FALLBACK_CONTENT) {
        warnings.push(
          `Section ${insight.sectionIndex + 1} "${insight.sectionTitle}" is missing "${block.heading}"`
        );
      }
    }

    // Check if raw text contained the headings
    for (const heading of REQUIRED_SECTION_HEADINGS) {
      if (!insight.reflection.toLowerCase().includes(heading.toLowerCase())) {
        warnings.push(
          `Section ${insight.sectionIndex + 1} "${insight.sectionTitle}" reflection text does not contain heading "${heading}"`
        );
      }
    }
  }

  return warnings;
}
