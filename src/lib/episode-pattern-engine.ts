/**
 * Episode Pattern Engine — Analysis Mode
 *
 * Groups confirmed signals by episodePhase and detects potential episode cycles.
 * Does NOT write to episode_model — returns analysis results only.
 */

import { Signal, EpisodePhase } from "@/config/signal-library";

// ───────────────────────────────────────────────────
// Constants
// ───────────────────────────────────────────────────

/** Canonical phase order — patterns must follow this sequence */
const PHASE_ORDER: EpisodePhase[] = [
  "early_warning",
  "trigger",
  "escalation",
  "shutdown",
  "recovery",
];

const PHASE_INDEX: Record<EpisodePhase, number> = {
  early_warning: 0,
  trigger: 1,
  escalation: 2,
  shutdown: 3,
  recovery: 4,
};

/** Minimum signals per phase before it counts as present */
const MIN_SIGNALS_PER_PHASE = 2;

// ───────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────

export interface PhaseEvidence {
  phase: EpisodePhase;
  signals: { id: string; label: string; weight: number; sourceType: string; domain: string }[];
}

export interface DetectedPattern {
  /** Phases present in sequential order */
  phases: PhaseEvidence[];
  /** Total confirmed signals across all phases */
  totalSignals: number;
  /** Unique source types contributing */
  sourceTypes: string[];
  /** Domains involved */
  domains: string[];
}

export interface WeakSignal {
  phase: EpisodePhase;
  reason: "insufficient_evidence" | "out_of_sequence";
  signalCount: number;
  signals: { id: string; label: string }[];
}

export interface EpisodeAnalysisResult {
  detectedPatterns: DetectedPattern[];
  weakSignals: WeakSignal[];
}

// ───────────────────────────────────────────────────
// Engine
// ───────────────────────────────────────────────────

export function analyseEpisodePatterns(allSignals: Signal[]): EpisodeAnalysisResult {
  // 1. Filter to confirmed signals with an episodePhase
  const phased = allSignals.filter((s) => s.confirmed && s.episodePhase);

  // 2. Group by phase
  const byPhase = new Map<EpisodePhase, Signal[]>();
  for (const sig of phased) {
    const phase = sig.episodePhase!;
    if (!byPhase.has(phase)) byPhase.set(phase, []);
    byPhase.get(phase)!.push(sig);
  }

  // 3. Classify each phase as strong (≥ MIN) or weak
  const strongPhases: PhaseEvidence[] = [];
  const weakSignals: WeakSignal[] = [];

  for (const phase of PHASE_ORDER) {
    const signals = byPhase.get(phase) || [];

    if (signals.length >= MIN_SIGNALS_PER_PHASE) {
      strongPhases.push({
        phase,
        signals: signals.map((s) => ({
          id: s.id,
          label: s.label,
          weight: s.weight,
          sourceType: s.sourceType,
          domain: s.domain,
        })),
      });
    } else if (signals.length > 0) {
      weakSignals.push({
        phase,
        reason: "insufficient_evidence",
        signalCount: signals.length,
        signals: signals.map((s) => ({ id: s.id, label: s.label })),
      });
    }
  }

  // 4. Check sequence integrity — phases must appear in order
  const detectedPatterns: DetectedPattern[] = [];

  if (strongPhases.length >= 2) {
    const inOrder = isSequential(strongPhases);

    if (inOrder) {
      const allSigs = strongPhases.flatMap((p) => p.signals);
      detectedPatterns.push({
        phases: strongPhases,
        totalSignals: allSigs.length,
        sourceTypes: [...new Set(allSigs.map((s) => s.sourceType))],
        domains: [...new Set(allSigs.map((s) => s.domain))],
      });
    } else {
      // Out of sequence — demote all to weak
      for (const pe of strongPhases) {
        weakSignals.push({
          phase: pe.phase,
          reason: "out_of_sequence",
          signalCount: pe.signals.length,
          signals: pe.signals.map((s) => ({ id: s.id, label: s.label })),
        });
      }
    }
  }

  return { detectedPatterns, weakSignals };
}

/** Check that phases appear in canonical order (gaps are allowed) */
function isSequential(phases: PhaseEvidence[]): boolean {
  let lastIndex = -1;
  for (const pe of phases) {
    const idx = PHASE_INDEX[pe.phase];
    if (idx <= lastIndex) return false;
    lastIndex = idx;
  }
  return true;
}
