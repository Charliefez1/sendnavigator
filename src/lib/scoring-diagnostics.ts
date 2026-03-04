/**
 * Scoring Model Diagnostics — Developer verification tool
 *
 * Generates structural reports on signal distribution, weighting,
 * cross-domain routing, explainability, and radar shape variance.
 */

import {
  SIGNAL_MAPPINGS,
  DOMAIN_KEYS,
  DomainKey,
  INTENSITY_LABELS,
  SignalMapping,
} from "@/config/signal-library";
import { computeDerivedProfile, DomainScores } from "@/lib/scoring-engine";
import { ChildProfileState } from "@/contexts/ChildProfileContext";

// ───────────────────────────────────────────────────
// 1. Signal Weighting Report
// ───────────────────────────────────────────────────

export interface WeightedSignalEntry {
  questionId: string;
  domain: string;
  label: string;
  weight: number;
  isFreetext: boolean;
  sourceType: string;
}

export function getTopWeightedSignals(limit = 20): WeightedSignalEntry[] {
  const entries: WeightedSignalEntry[] = [];

  for (const mapping of SIGNAL_MAPPINGS) {
    if (mapping.optionSignals) {
      for (const [, sigs] of Object.entries(mapping.optionSignals)) {
        for (const sig of sigs) {
          entries.push({
            questionId: mapping.questionId,
            domain: mapping.domain,
            label: sig.label,
            weight: sig.weight,
            isFreetext: false,
            sourceType: mapping.sourceType,
          });
        }
      }
    }
    if (mapping.freeTextSignal) {
      entries.push({
        questionId: mapping.questionId,
        domain: mapping.domain,
        label: mapping.freeTextSignal.label,
        weight: 1, // freetext always 1 at runtime
        isFreetext: true,
        sourceType: mapping.sourceType,
      });
    }
  }

  return entries.sort((a, b) => b.weight - a.weight).slice(0, limit);
}

// ───────────────────────────────────────────────────
// 2. Cross-domain Signal Report
// ───────────────────────────────────────────────────

export interface CrossDomainEntry {
  questionId: string;
  primaryDomain: string;
  crossDomains: string[];
  label: string;
}

export function getCrossDomainSignals(): CrossDomainEntry[] {
  const entries: CrossDomainEntry[] = [];

  // Signals with explicit crossDomains
  for (const mapping of SIGNAL_MAPPINGS) {
    if (mapping.crossDomains && mapping.crossDomains.length > 0) {
      entries.push({
        questionId: mapping.questionId,
        primaryDomain: mapping.domain,
        crossDomains: mapping.crossDomains,
        label: mapping.freeTextSignal?.label || mapping.questionId,
      });
    }
  }

  // Questions mapped to multiple domains directly
  const byQuestion = new Map<string, Set<string>>();
  for (const mapping of SIGNAL_MAPPINGS) {
    if (!byQuestion.has(mapping.questionId)) byQuestion.set(mapping.questionId, new Set());
    byQuestion.get(mapping.questionId)!.add(mapping.domain);
  }
  for (const [questionId, domains] of byQuestion) {
    if (domains.size > 1) {
      const existing = entries.find((e) => e.questionId === questionId);
      if (!existing) {
        entries.push({
          questionId,
          primaryDomain: [...domains][0],
          crossDomains: [...domains].slice(1),
          label: questionId,
        });
      }
    }
  }

  return entries;
}

// ───────────────────────────────────────────────────
// 3. Explainability Sample
// ───────────────────────────────────────────────────

export function getExplainabilitySamples(
  domainScores: Record<string, DomainScores>
): { domain: string; sentence: string }[] {
  return DOMAIN_KEYS.map((domain) => {
    const scores = domainScores[domain];
    if (!scores || scores.topSignals.length === 0) {
      return { domain, sentence: "Not enough information to describe this area yet." };
    }
    const topLabels = scores.topSignals.slice(0, 2).map((s) => s.label.toLowerCase());
    const intensityWord = scores.intensityLabel?.toLowerCase() || "unknown";
    const sentence =
      intensityWord === "unknown"
        ? `We don't have enough detail about ${domain.toLowerCase()} yet. The signals we have include: ${topLabels.join(" and ")}.`
        : `Based on what you've shared, ${domain.toLowerCase()} shows ${intensityWord} impact. Key signals include: ${topLabels.join(" and ")}.`;
    return { domain, sentence };
  });
}

// ───────────────────────────────────────────────────
// 4. Simulated Radar Shapes
// ───────────────────────────────────────────────────

const SAMPLE_OPTION_POOLS: Record<string, string[]> = {
  transitions: ["Almost always difficult", "Sometimes difficult", "It depends on the transition", "Usually fine"],
  home_predictability: ["Frequently unpredictable or changeable", "Mixed, some routine, some unpredictability", ""],
  recovery_time: ["The rest of the day or longer", "Several hours", "30 minutes to an hour", "Under 30 minutes", "It varies significantly"],
  pain_temperature: ["Yes, clearly", "Sometimes", ""],
  movement_seeking: ["Seeks movement actively", "Avoids movement", "Both at different times", ""],
  interoception: ["Yes, regularly", "Sometimes", ""],
  knowing_doing_gap: ["Yes, frequently", "Sometimes", ""],
  multi_step_instructions: ["Struggles with any sequence", "Struggles with more than two steps", "It depends on the task", ""],
  time_blindness: ["Yes, regularly", "Sometimes", ""],
  school_home_difference: ["Yes, significantly different", "Somewhat different", "School is harder than home", ""],
  post_school_exhaustion: ["Yes, they need significant time to recover", "Sometimes", ""],
  teacher_discrepancy: ["Yes, regularly", "Sometimes", ""],
  compliance_avoidance: ["Yes, frequently", "Sometimes", ""],
  response_time: ["Yes, noticeably", "Sometimes", ""],
  reading_emotions: ["Yes, clearly", "Sometimes", ""],
};

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomProfile(): ChildProfileState {
  const sections: any[] = [];
  for (let i = 0; i < 22; i++) {
    sections.push({ answers: {}, reflection: "" });
  }

  // Randomly fill structured questions with varying density
  for (const [qId, options] of Object.entries(SAMPLE_OPTION_POOLS)) {
    // Find which section this question belongs to
    const mapping = SIGNAL_MAPPINGS.find((m) => m.questionId === qId);
    if (!mapping) continue;
    // 60% chance of answering any question
    if (Math.random() < 0.4) continue;
    sections[mapping.sectionIndex].answers[qId] = randomChoice(options);
  }

  // Randomly add some freetext answers (30% chance per freetext mapping)
  for (const mapping of SIGNAL_MAPPINGS) {
    if (!mapping.freeTextSignal) continue;
    if (Math.random() < 0.7) continue;
    const existing = sections[mapping.sectionIndex].answers[mapping.questionId];
    if (!existing) {
      sections[mapping.sectionIndex].answers[mapping.questionId] = "Some detail provided by parent about this area.";
    }
  }

  return {
    sections,
    activeSection: 0,
    reportMode: "mini",
    stage: "building",
  } as any;
}

export interface SimulatedRadar {
  id: number;
  scores: Record<string, { intensity: number | null; evidence: number; confidence: number }>;
}

export function generateSimulatedRadars(count = 10): SimulatedRadar[] {
  const results: SimulatedRadar[] = [];
  for (let i = 0; i < count; i++) {
    const profile = generateRandomProfile();
    const derived = computeDerivedProfile(profile);
    const scores: Record<string, { intensity: number | null; evidence: number; confidence: number }> = {};
    for (const domain of DOMAIN_KEYS) {
      const ds = derived.domain_scores[domain];
      scores[domain] = {
        intensity: ds?.intensity ?? null,
        evidence: ds?.evidence ?? 0,
        confidence: ds?.confidence ?? 0,
      };
    }
    results.push({ id: i + 1, scores });
  }
  return results;
}

// ───────────────────────────────────────────────────
// 5. Domain Distribution (from simulated profiles)
// ───────────────────────────────────────────────────

export interface DomainDistribution {
  domain: string;
  distribution: Record<string, number>; // "0"|"1"|"2"|"3"|"4"|"Unknown" → count
}

export function getDomainDistribution(sampleSize = 50): DomainDistribution[] {
  const counts: Record<string, Record<string, number>> = {};
  for (const domain of DOMAIN_KEYS) {
    counts[domain] = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, Unknown: 0 };
  }

  for (let i = 0; i < sampleSize; i++) {
    const profile = generateRandomProfile();
    const derived = computeDerivedProfile(profile);
    for (const domain of DOMAIN_KEYS) {
      const intensity = derived.domain_scores[domain]?.intensity;
      const key = intensity === null ? "Unknown" : String(intensity);
      counts[domain][key]++;
    }
  }

  return DOMAIN_KEYS.map((domain) => ({
    domain,
    distribution: counts[domain],
  }));
}
