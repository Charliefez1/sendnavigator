// ───────────────────────────────────────────────────
// Content lint — pre-PDF quality gate
// ───────────────────────────────────────────────────

export type LintSeverity = "error" | "warning";

export interface LintIssue {
  severity: LintSeverity;
  category: string;
  message: string;
  match: string;
  location?: string; // e.g. "sectionInsights[3].reflection"
}

// ── US spellings that should have been caught by normaliser ──
const US_SPELLING_PATTERNS: Array<[RegExp, string]> = [
  [/\bbehavior\b/gi, "behaviour"],
  [/\borganize[ds]?\b/gi, "organise"],
  [/\brecognize[ds]?\b/gi, "recognise"],
  [/\banalyze[ds]?\b/gi, "analyse"],
  [/\bcenter[s]?\b/gi, "centre"],
  [/\bcolor(?:s|ed|ful)?\b/gi, "colour"],
  [/\bfavorite[s]?\b/gi, "favourite"],
  [/\bcounsel(?:ing|or)\b/gi, "counselling/counsellor"],
  [/\bpediatric(?:ian|s)?\b/gi, "paediatric"],
  [/\bspecialize[ds]?\b/gi, "specialised"],
  [/\butilize[ds]?\b/gi, "utilise"],
  [/\bprioritize[ds]?\b/gi, "prioritise"],
  [/\bemphasize[ds]?\b/gi, "emphasise"],
  [/\bmodeling\b/gi, "modelling"],
  [/\bcanceled\b/gi, "cancelled"],
  [/\benrollment\b/gi, "enrolment"],
  [/\bvacation[s]?\b/gi, "holiday"],
  [/\bmom[s]?\b/gi, "mum"],
  [/\bgray\b/gi, "grey"],
];

// ── US education terms ──
const US_EDUCATION_PATTERNS: Array<[RegExp, string]> = [
  [/\bIEP\b/g, "Should be EHCP"],
  [/\b504\s*plan\b/gi, "Should be SEN Support"],
  [/\b504\b/g, "Should be SEN Support (if referring to US 504 plan)"],
  [/\bspecial education\b/gi, "Should be SEND"],
  [/\bkindergarten\b/gi, "Should be reception"],
  [/\bgrade school\b/gi, "Should be primary school"],
  [/\belementary school\b/gi, "Should be primary school"],
  [/\bmiddle school\b/gi, "Should be secondary school"],
  [/\bhigh school\b/gi, "Should be secondary school"],
  [/\bschool district\b/gi, "Should be local authority"],
  [/\bschool board\b/gi, "Should be local authority"],
  [/\bSLP\b/g, "Should be SALT"],
  [/\bphysical therapist\b/gi, "Should be physiotherapist"],
  [/\bspeech pathologist\b/gi, "Should be speech and language therapist"],
  [/\bschool psychologist\b/gi, "Should be educational psychologist"],
  [/\bguidance counselor\b/gi, "Should be school counsellor"],
  [/\bgrade\s+\d/gi, "UK uses Year groups, not grades"],
  [/\bfirst grade\b/gi, "UK uses Year 1/Year 2 etc."],
  [/\baccommodations?\b/gi, "Should be adjustments"],
];

// ── Adversarial / combative phrases (severity: error) ──
const ADVERSARIAL_PATTERNS: Array<[RegExp, string]> = [
  [/read it as such/gi, "Adversarial tone, removed in new opening statement"],
  [/better than any system/gi, "Adversarial tone, removed in new opening statement"],
  [/knows this child better than/gi, "Adversarial tone, removed in new opening statement"],
  [/the system has failed/gi, "Too combative for a collaborative document"],
  [/fight for your child/gi, "Adversarial framing, use supportive language"],
  [/demand your rights/gi, "Adversarial framing, use collaborative language"],
  [/they don't care/gi, "Adversarial assumption about professionals"],
  [/incompetent/gi, "Adversarial language about professionals"],
  [/broken system/gi, "Too combative, describe specific gaps instead"],
  [/weaponi[sz]ed/gi, "Adversarial framing"],
];

// ── Generic medical role wording ──
const MEDICAL_ROLE_PATTERNS: Array<[RegExp, string]> = [
  [/\bPaediatrician\b(?!\s+services)(?!\s+team)/g, "Prefer 'community paediatrician', 'paediatric services', or 'child development team'"],
  [/\bPediatrician\b/gi, "US spelling. Use 'community paediatrician' or 'paediatric services'"],
  [/\bthe doctor\b/gi, "Too generic. Specify: GP, community paediatrician, or specialist clinician"],
  [/\byour doctor\b/gi, "Too generic. Specify: GP, community paediatrician, or specialist clinician"],
  [/\bmental health professional\b/gi, "Prefer specific role: CAMHS, clinical psychologist, or therapeutic support"],
  [/\btherapist\b(?!\s)/gi, "Consider specifying: occupational therapist, speech and language therapist, or play therapist"],
];

// ── Clinical / diagnostic language that should not appear in reports ──
const CLINICAL_PATTERNS: Array<[RegExp, string]> = [
  [/\bindicates autism\b/gi, "Should not imply diagnosis"],
  [/\bsuggests ADHD\b/gi, "Should not imply diagnosis"],
  [/\bdemonstrates trauma\b/gi, "Should not imply diagnosis"],
  [/\bdiagnosed with\b/gi, "Report should describe observations, not state diagnoses"],
  [/\bsuffers from\b/gi, "Deficit language, describe the experience instead"],
  [/\bdeficit\b/gi, "Avoid deficit framing"],
];

function scanText(text: string, patterns: Array<[RegExp, string]>, category: string, severity: LintSeverity, location?: string): LintIssue[] {
  const issues: LintIssue[] = [];
  for (const [pattern, suggestion] of patterns) {
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      issues.push({
        severity,
        category,
        message: suggestion,
        match: match[0],
        location,
      });
      // Prevent infinite loops on zero-length matches
      if (!pattern.global) break;
    }
  }
  return issues;
}

/**
 * Extract all text strings from a report object for linting.
 */
function extractTextFields(report: unknown, path = ""): Array<{ text: string; location: string }> {
  const fields: Array<{ text: string; location: string }> = [];
  if (typeof report === "string") {
    fields.push({ text: report, location: path || "root" });
  } else if (Array.isArray(report)) {
    report.forEach((item, i) => {
      fields.push(...extractTextFields(item, `${path}[${i}]`));
    });
  } else if (report && typeof report === "object") {
    for (const [key, value] of Object.entries(report as Record<string, unknown>)) {
      // Skip non-content keys
      if (key === "version" || key === "generatedAt" || key === "model" || key === "sectionIndex") continue;
      fields.push(...extractTextFields(value, path ? `${path}.${key}` : key));
    }
  }
  return fields;
}

export interface ContentLintResult {
  passed: boolean;         // true if no errors (warnings allowed)
  errors: LintIssue[];     // severity: error — blocks PDF in dev mode
  warnings: LintIssue[];   // severity: warning — logged but allowed
  totalIssues: number;
}

/**
 * Run content lint on a report object before PDF generation.
 * Returns a result with errors (block) and warnings (log).
 */
export function lintReportContent(report: unknown): ContentLintResult {
  const fields = extractTextFields(report);
  const allIssues: LintIssue[] = [];

  for (const { text, location } of fields) {
    // Errors — these block PDF in dev mode
    allIssues.push(...scanText(text, ADVERSARIAL_PATTERNS, "Adversarial tone", "error", location));
    allIssues.push(...scanText(text, CLINICAL_PATTERNS, "Clinical language", "error", location));

    // Warnings — logged but PDF still generates
    allIssues.push(...scanText(text, US_SPELLING_PATTERNS, "US spelling", "warning", location));
    allIssues.push(...scanText(text, US_EDUCATION_PATTERNS, "US education term", "warning", location));
    allIssues.push(...scanText(text, MEDICAL_ROLE_PATTERNS, "Generic medical role", "warning", location));
  }

  // Deduplicate by match + location
  const seen = new Set<string>();
  const deduped = allIssues.filter((issue) => {
    const key = `${issue.match}|${issue.location}|${issue.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const errors = deduped.filter((i) => i.severity === "error");
  const warnings = deduped.filter((i) => i.severity === "warning");

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    totalIssues: deduped.length,
  };
}

/**
 * Log lint results to console in dev mode.
 */
export function logLintResults(result: ContentLintResult): void {
  if (result.totalIssues === 0) {
    console.log("[Content Lint] ✓ Report passed all checks");
    return;
  }

  if (result.errors.length > 0) {
    console.error(`[Content Lint] ✗ ${result.errors.length} error(s) found — PDF blocked in dev mode:`);
    for (const issue of result.errors) {
      console.error(`  ✗ [${issue.category}] "${issue.match}" at ${issue.location}: ${issue.message}`);
    }
  }

  if (result.warnings.length > 0) {
    console.warn(`[Content Lint] ⚠ ${result.warnings.length} warning(s):`);
    for (const issue of result.warnings) {
      console.warn(`  ⚠ [${issue.category}] "${issue.match}" at ${issue.location}: ${issue.message}`);
    }
  }
}
