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
  SignalMapping,
  SIGNAL_MAPPINGS,
  DOMAIN_KEYS,
  DOMAIN_SECTION_MAP,
  DomainKey,
  SCORE_SCALE_MAX,
  INTENSITY_LABELS,
} from "@/config/signal-library";

// ───────────────────────────────────────────────────
// Derived types (stored in profile_data)
// ───────────────────────────────────────────────────

export interface DomainScores {
  intensity: number | null; // 0–4 or null (unknown)
  evidence: number;         // 0–4
  confidence: number;       // 0–4
  intensityLabel: string;
  evidenceLabel: string;
  confidenceLabel: string;
  topSignals: Signal[];
  sourceBreakdown: Record<string, number>;
  lastUpdated: string;
}

export interface DerivedProfileData {
  version: number;
  computedAt: string;
  domains: Record<string, DomainScores>;
  signals: Signal[];
}

const CURRENT_VERSION = 1;

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
        });
      }
    }

    // Free-text signal
    if (mapping.freeTextSignal) {
      const len = strVal.trim().length;
      if (len > 0) {
        // Boost weight for detailed answers
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
        });

        // Cross-domain signals (lighter weight)
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
            });
          }
        }
      }
    }
  }

  // Also count reflections as evidence signals
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
      });
    }
  }

  return signals;
}

// ───────────────────────────────────────────────────
// Scoring per domain
// ───────────────────────────────────────────────────

/** Normalise a raw weighted sum into 0–4 using thresholds */
function normalise(rawSum: number, thresholds: number[]): number {
  // thresholds = [t1, t2, t3, t4] → score 1 if >= t1, 2 if >= t2, etc.
  let score = 0;
  for (const t of thresholds) {
    if (rawSum >= t) score++;
    else break;
  }
  return Math.min(score, SCORE_SCALE_MAX);
}

function scoreDomain(signals: Signal[], domain: string): DomainScores {
  const domainSignals = signals.filter((s) => s.domain === domain);
  const now = new Date().toISOString();

  if (domainSignals.length < 2) {
    return {
      intensity: domainSignals.length === 0 ? null : null,
      evidence: domainSignals.length === 0 ? 0 : 1,
      confidence: domainSignals.length === 0 ? 0 : 1,
      intensityLabel: "Unknown",
      evidenceLabel: domainSignals.length === 0 ? INTENSITY_LABELS[0] : INTENSITY_LABELS[1],
      confidenceLabel: domainSignals.length === 0 ? INTENSITY_LABELS[0] : INTENSITY_LABELS[1],
      topSignals: domainSignals.slice(0, 3),
      sourceBreakdown: buildSourceBreakdown(domainSignals),
      lastUpdated: now,
    };
  }

  const confirmedSignals = domainSignals.filter((s) => s.confirmed);
  const weightedSum = confirmedSignals.reduce((sum, s) => sum + s.weight, 0);

  // Evidence: how much data do we have?
  const evidenceRaw = domainSignals.length;
  const evidence = normalise(evidenceRaw, [2, 4, 6, 8]);

  // Intensity: how strong are the signals? (weighted sum)
  let intensity = normalise(weightedSum, [3, 6, 10, 15]);

  // Confidence gating rules
  const sourceTypes = new Set(confirmedSignals.map((s) => s.sourceType));
  const hasConfirmedStructured = confirmedSignals.some(
    (s) => s.confirmed && s.sourceReliability !== "low"
  );

  let confidence = normalise(confirmedSignals.length, [2, 4, 6, 8]);

  // Gate: intensity > 2 requires at least one confirmed structured signal
  if (!hasConfirmedStructured && intensity > 2) {
    intensity = 2;
  }

  // Gate: confidence > 2 requires 2+ independent source types
  if (sourceTypes.size < 2 && confidence > 2) {
    confidence = 2;
  }

  // Sort signals by weight desc for top 3
  const sorted = [...confirmedSignals].sort((a, b) => b.weight - a.weight);

  return {
    intensity,
    evidence,
    confidence,
    intensityLabel: intensity === null ? "Unknown" : INTENSITY_LABELS[intensity] || "Unknown",
    evidenceLabel: INTENSITY_LABELS[evidence] || INTENSITY_LABELS[0],
    confidenceLabel: INTENSITY_LABELS[confidence] || INTENSITY_LABELS[0],
    topSignals: sorted.slice(0, 3),
    sourceBreakdown: buildSourceBreakdown(domainSignals),
    lastUpdated: now,
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
  const domains: Record<string, DomainScores> = {};

  for (const domain of DOMAIN_KEYS) {
    domains[domain] = scoreDomain(signals, domain);
  }

  return {
    version: CURRENT_VERSION,
    computedAt: new Date().toISOString(),
    domains,
    signals,
  };
}

/** Check if derived data needs recomputing (version mismatch or missing) */
export function needsRecompute(derived: DerivedProfileData | undefined): boolean {
  if (!derived) return true;
  if (derived.version !== CURRENT_VERSION) return true;
  return false;
}
