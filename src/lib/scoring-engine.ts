/**
 * Scoring Engine — Phase 1
 *
 * Derives signals from answers, computes intensity / evidence / confidence
 * per domain. Stores everything as a derived object in profile state.
 *
 * Recompute on every answer change; overwrite the derived store.
 */

import { ChildProfileState } from "@/contexts/ChildProfileContext";
import {
  Signal,
  SIGNAL_MAPPINGS,
  DOMAIN_KEYS,
  DOMAIN_SECTION_MAP,
  DomainKey,
  SCORE_SCALE_MAX,
  INTENSITY_LABELS,
  SCORING_VERSION,
  ContextCategory,
  CONFIDENCE_HINTS,
  SourceType,
} from "@/config/signal-library";

// ───────────────────────────────────────────────────
// Derived types (stored in profile_data.derived)
// ───────────────────────────────────────────────────

export interface ExplainableSignal {
  id: string;
  label: string;
  weight: 1 | 2 | 3;
  sourceType: string;
  confirmed: boolean;
  contextCategory?: ContextCategory;
  contextTags?: Record<string, string>;
}

export interface DomainScores {
  intensity: number | null; // 0–4 or null (unknown)
  evidence: number;         // 0–4
  confidence: number;       // 0–4
  intensityLabel: string;
  evidenceLabel: string;
  confidenceLabel: string;
  rawTotals: {
    weightedSum: number;
    signalCount: number;
    confirmedCount: number;
  };
  topSignals: ExplainableSignal[];
  sourceBreakdown: Record<string, number>;
  lastUpdated: string;
}

export interface DomainExplainability {
  topSignals: ExplainableSignal[];
  sourceBreakdown: Record<string, number>;
  confidenceHint: string;
}

export interface DerivedProfileData {
  scoring_version: string;
  last_computed_at: string;
  domain_scores: Record<string, DomainScores>;
  explainability: Record<string, DomainExplainability>;
  signals: Signal[];
}

// ───────────────────────────────────────────────────
// Signal extraction from answers
// ───────────────────────────────────────────────────

function extractSignalsFromAnswers(state: ChildProfileState): Signal[] {
  const signals: Signal[] = [];

  for (const mapping of SIGNAL_MAPPINGS) {
    const section = state.sections[mapping.sectionIndex];
    if (!section) continue;

    const rawVal = section.answers?.[mapping.questionId];
    if (!rawVal) continue;

    const strVal = Array.isArray(rawVal) ? rawVal.join(", ") : rawVal;
    if (!strVal.trim()) continue;

    // Single-select option mapping
    if (mapping.optionSignals && mapping.optionSignals[strVal]) {
      for (const sig of mapping.optionSignals[strVal]) {
        signals.push({
          id: `${mapping.questionId}_${sig.label.substring(0, 20).replace(/\s/g, "_")}`,
          domain: mapping.domain,
          sectionIndex: mapping.sectionIndex,
          questionId: mapping.questionId,
          label: sig.label,
          weight: sig.weight,
          sourceType: mapping.sourceType,
          sourceReliability: mapping.sourceType === "child" ? "medium" : "high",
          confirmed: true,
          contextCategory: sig.contextCategory || mapping.contextCategory,
        });
      }
    }

    // Free-text signal
    if (mapping.freeTextSignal) {
      const len = strVal.trim().length;
      if (len > 0) {
        let weight = mapping.freeTextSignal.baseWeight;
        if (len > 100) weight = Math.min(3, weight + 1) as 1 | 2 | 3;

        signals.push({
          id: `${mapping.questionId}_freetext`,
          domain: mapping.domain,
          sectionIndex: mapping.sectionIndex,
          questionId: mapping.questionId,
          label: mapping.freeTextSignal.label,
          weight,
          sourceType: mapping.sourceType,
          sourceReliability: mapping.sourceType === "child" ? "medium" : "high",
          confirmed: true,
          contextCategory: mapping.freeTextSignal.contextCategory || mapping.contextCategory,
        });

        // Cross-domain signals
        if (mapping.crossDomains) {
          for (const crossDomain of mapping.crossDomains) {
            signals.push({
              id: `${mapping.questionId}_cross_${crossDomain.replace(/\s/g, "_")}`,
              domain: crossDomain,
              sectionIndex: mapping.sectionIndex,
              questionId: mapping.questionId,
              label: `${mapping.freeTextSignal.label} (cross-domain)`,
              weight: 1,
              sourceType: mapping.sourceType,
              sourceReliability: "medium",
              confirmed: true,
              contextCategory: "context",
            });
          }
        }
      }
    }
  }

  // Reflections as evidence signals
  for (const domain of DOMAIN_KEYS) {
    const sIdx = DOMAIN_SECTION_MAP[domain];
    const section = state.sections[sIdx];
    if (section?.reflection?.trim()) {
      signals.push({
        id: `reflection_${sIdx}`,
        domain,
        sectionIndex: sIdx,
        questionId: "__reflection",
        label: "Parent reflection provided",
        weight: 1,
        sourceType: "parent",
        sourceReliability: "high",
        confirmed: true,
        contextCategory: "source",
      });
    }
  }

  return signals;
}

// ───────────────────────────────────────────────────
// Collect section-level source types for confidence
// ───────────────────────────────────────────────────

function collectSectionSourceTypes(state: ChildProfileState, domain: DomainKey): Set<string> {
  const sectionIndex = DOMAIN_SECTION_MAP[domain];
  const sources = new Set<string>();

  // Always "parent" if there's data
  const section = state.sections[sectionIndex];
  if (section) {
    const hasContent = Object.values(section.answers).some((v) =>
      Array.isArray(v) ? v.length > 0 : (v || "").trim().length > 0
    );
    if (hasContent) sources.add("parent");
  }

  // Check user-set section source types
  const sectionSources = state.sectionSourceTypes?.[sectionIndex];
  if (sectionSources) {
    for (const src of sectionSources) {
      sources.add(src);
    }
  }

  return sources;
}

// ───────────────────────────────────────────────────
// Scoring per domain
// ───────────────────────────────────────────────────

function normalise(rawSum: number, thresholds: number[]): number {
  let score = 0;
  for (const t of thresholds) {
    if (rawSum >= t) score++;
    else break;
  }
  return Math.min(score, SCORE_SCALE_MAX);
}

/** Minimum confirmed signals required before intensity can be computed */
const MIN_CONFIRMED_FOR_INTENSITY = 2;

function scoreDomain(signals: Signal[], domain: string, sectionSourceTypes: Set<string>): DomainScores {
  const domainSignals = signals.filter((s) => s.domain === domain);
  const confirmedSignals = domainSignals.filter((s) => s.confirmed);
  const now = new Date().toISOString();

  // Unknown state: fewer than 2 confirmed signals → intensity = null
  if (confirmedSignals.length < MIN_CONFIRMED_FOR_INTENSITY) {
    const topSigs = domainSignals.slice(0, 3).map(toExplainable);
    const evidence = domainSignals.length === 0 ? 0 : 1;
    return {
      intensity: null,
      evidence,
      confidence: domainSignals.length === 0 ? 0 : 1,
      intensityLabel: "Unknown",
      evidenceLabel: evidence === 0 ? INTENSITY_LABELS[0] : INTENSITY_LABELS[1],
      confidenceLabel: domainSignals.length === 0 ? INTENSITY_LABELS[0] : INTENSITY_LABELS[1],
      rawTotals: {
        weightedSum: confirmedSignals.reduce((s, sig) => s + sig.weight, 0),
        signalCount: domainSignals.length,
        confirmedCount: confirmedSignals.length,
      },
      topSignals: topSigs,
      sourceBreakdown: buildSourceBreakdown(domainSignals),
      lastUpdated: now,
    };
  }

  const weightedSum = confirmedSignals.reduce((sum, s) => sum + s.weight, 0);

  // Evidence: volume and breadth
  const evidenceRaw = domainSignals.length;
  const evidence = normalise(evidenceRaw, [2, 4, 6, 8]);

  // Also check: if evidence < 2, intensity stays unknown
  if (evidence < 2) {
    return {
      intensity: null,
      evidence,
      confidence: 1,
      intensityLabel: "Unknown",
      evidenceLabel: INTENSITY_LABELS[evidence] || INTENSITY_LABELS[0],
      confidenceLabel: INTENSITY_LABELS[1],
      rawTotals: { weightedSum, signalCount: domainSignals.length, confirmedCount: confirmedSignals.length },
      topSignals: confirmedSignals.slice(0, 3).map(toExplainable),
      sourceBreakdown: buildSourceBreakdown(domainSignals),
      lastUpdated: now,
    };
  }

  // Intensity: weighted impact from confirmed signals only
  let intensity: number | null = normalise(weightedSum, [3, 6, 10, 15]);

  // Confidence: reliability based on source diversity
  // Combine signal source types + section-level source markers
  const allSourceTypes = new Set<string>([
    ...confirmedSignals.map((s) => s.sourceType),
    ...sectionSourceTypes,
  ]);
  const hasConfirmedStructured = confirmedSignals.some(
    (s) => s.confirmed && s.sourceReliability !== "low"
  );

  let confidence = normalise(confirmedSignals.length, [2, 4, 6, 8]);

  // Gate: intensity > 2 requires at least one confirmed structured signal
  if (!hasConfirmedStructured && intensity !== null && intensity > 2) {
    intensity = 2;
  }

  // Gate: confidence > 2 requires 2+ independent source types (signal + section level)
  if (allSourceTypes.size < 2 && confidence > 2) {
    confidence = 2;
  }

  const sorted = [...confirmedSignals].sort((a, b) => b.weight - a.weight);

  return {
    intensity,
    evidence,
    confidence,
    intensityLabel: intensity === null ? "Unknown" : INTENSITY_LABELS[intensity] || "Unknown",
    evidenceLabel: INTENSITY_LABELS[evidence] || INTENSITY_LABELS[0],
    confidenceLabel: INTENSITY_LABELS[confidence] || INTENSITY_LABELS[0],
    rawTotals: { weightedSum, signalCount: domainSignals.length, confirmedCount: confirmedSignals.length },
    topSignals: sorted.slice(0, 3).map(toExplainable),
    sourceBreakdown: buildSourceBreakdown(domainSignals),
    lastUpdated: now,
  };
}

function toExplainable(sig: Signal): ExplainableSignal {
  return {
    id: sig.id,
    label: sig.label,
    weight: sig.weight,
    sourceType: sig.sourceType,
    confirmed: sig.confirmed,
    contextCategory: sig.contextCategory,
    contextTags: sig.contextTags,
  };
}

function buildSourceBreakdown(signals: Signal[]): Record<string, number> {
  const breakdown: Record<string, number> = {};
  for (const s of signals) {
    breakdown[s.sourceType] = (breakdown[s.sourceType] || 0) + 1;
  }
  return breakdown;
}

// ───────────────────────────────────────────────────
// Main compute function
// ───────────────────────────────────────────────────

export function computeDerivedProfile(state: ChildProfileState): DerivedProfileData {
  const signals = extractSignalsFromAnswers(state);
  const domain_scores: Record<string, DomainScores> = {};
  const explainability: Record<string, DomainExplainability> = {};

  for (const domain of DOMAIN_KEYS) {
    const sectionSources = collectSectionSourceTypes(state, domain);
    const scores = scoreDomain(signals, domain, sectionSources);
    domain_scores[domain] = scores;
    explainability[domain] = {
      topSignals: scores.topSignals,
      sourceBreakdown: scores.sourceBreakdown,
      confidenceHint: CONFIDENCE_HINTS[domain] || "Add information from a second source to increase confidence.",
    };
  }

  return {
    scoring_version: SCORING_VERSION,
    last_computed_at: new Date().toISOString(),
    domain_scores,
    explainability,
    signals,
  };
}

/** Check if derived data needs recomputing (version mismatch or missing) */
export function needsRecompute(derived: DerivedProfileData | undefined): boolean {
  if (!derived) return true;
  if (derived.scoring_version !== SCORING_VERSION) return true;
  return false;
}
