/**
 * Theme Engine — Structured neurodevelopmental modelling
 *
 * Pipeline: Signals → Mechanisms → Themes → Contexts → Patterns → Contradictions
 */

import { Signal } from "@/config/signal-library";
import { ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import {
  ThemeKey,
  MechanismKey,
  ContextTag,
  THEMES,
  THEME_DESCRIPTIONS,
  DOMAIN_MECHANISM_MAP,
  MECHANISM_THEME_MAP,
  CONTEXT_KEYWORDS,
  KNOWN_PATTERNS,
  KnownPattern,
  ThemeConfidence,
  getThemeConfidence,
} from "@/config/theme-ontology";

// ───────────────────────────────────────────────────
// Output types
// ───────────────────────────────────────────────────

export interface MechanismEvidence {
  mechanism: MechanismKey;
  signalCount: number;
  signals: { id: string; label: string; weight: number }[];
}

export interface StructuredTheme {
  theme: ThemeKey;
  description: string;
  confidence: ThemeConfidence;
  mechanisms: MechanismEvidence[];
  contexts: ContextTag[];
  linkedSections: number[];
  topSignals: { id: string; label: string; weight: number; sourceType: string }[];
  totalSignalCount: number;
}

export interface DetectedPattern {
  pattern: KnownPattern;
  matchingSignalCount: number;
  matchingContexts: ContextTag[];
}

export interface ContradictionFlag {
  domain: string;
  message: string;
  contexts: [ContextTag, ContextTag];
}

export interface ThemeAnalysisResult {
  themes: StructuredTheme[];
  patterns: DetectedPattern[];
  contradictions: ContradictionFlag[];
}

// ───────────────────────────────────────────────────
// Context extraction from text
// ───────────────────────────────────────────────────

function extractContextsFromText(text: string): ContextTag[] {
  const lower = text.toLowerCase();
  const found: ContextTag[] = [];
  for (const [tag, keywords] of Object.entries(CONTEXT_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      found.push(tag as ContextTag);
    }
  }
  return found;
}

function extractContextsFromSignals(
  signals: Signal[],
  state: ChildProfileState
): Map<string, ContextTag[]> {
  const map = new Map<string, ContextTag[]>();

  for (const sig of signals) {
    const contexts: ContextTag[] = [];

    // From signal label
    contexts.push(...extractContextsFromText(sig.label));

    // From the answer text that produced this signal
    const section = state.sections[sig.sectionIndex];
    if (section) {
      const answer = section.answers[sig.questionId];
      if (answer) {
        const text = Array.isArray(answer) ? answer.join(" ") : answer;
        contexts.push(...extractContextsFromText(text));
      }
    }

    // From setting field
    if (sig.setting) {
      contexts.push(...extractContextsFromText(sig.setting));
    }

    map.set(sig.id, [...new Set(contexts)]);
  }

  return map;
}

// ───────────────────────────────────────────────────
// Pipeline
// ───────────────────────────────────────────────────

export function analyseThemes(
  confirmedSignals: Signal[],
  state: ChildProfileState
): ThemeAnalysisResult {
  if (confirmedSignals.length === 0) {
    return { themes: [], patterns: [], contradictions: [] };
  }

  // Step 1: Extract contexts per signal
  const signalContexts = extractContextsFromSignals(confirmedSignals, state);

  // Step 2: Map signals → mechanisms
  const mechanismSignals = new Map<MechanismKey, Signal[]>();

  for (const sig of confirmedSignals) {
    const mechanisms = DOMAIN_MECHANISM_MAP[sig.domain] || [];
    for (const mech of mechanisms) {
      if (!mechanismSignals.has(mech)) mechanismSignals.set(mech, []);
      mechanismSignals.get(mech)!.push(sig);
    }
  }

  // Step 3: Map mechanisms → themes
  const themeData = new Map<
    ThemeKey,
    {
      mechanisms: Map<MechanismKey, Signal[]>;
      allSignals: Signal[];
      contexts: Set<ContextTag>;
      sections: Set<number>;
    }
  >();

  for (const [mech, signals] of mechanismSignals) {
    const themes = MECHANISM_THEME_MAP[mech] || [];
    for (const theme of themes) {
      if (!themeData.has(theme)) {
        themeData.set(theme, {
          mechanisms: new Map(),
          allSignals: [],
          contexts: new Set(),
          sections: new Set(),
        });
      }
      const td = themeData.get(theme)!;
      td.mechanisms.set(mech, signals);
      for (const sig of signals) {
        td.allSignals.push(sig);
        td.sections.add(sig.sectionIndex);
        const ctxs = signalContexts.get(sig.id) || [];
        for (const c of ctxs) td.contexts.add(c);
      }
    }
  }

  // Step 4: Build structured themes (require ≥2 signals)
  const structuredThemes: StructuredTheme[] = [];

  for (const themeKey of THEMES) {
    const data = themeData.get(themeKey);
    if (!data) continue;

    // Deduplicate signals
    const uniqueSignals = new Map<string, Signal>();
    for (const s of data.allSignals) uniqueSignals.set(s.id, s);
    const deduped = Array.from(uniqueSignals.values());

    if (deduped.length < 2) continue;

    const mechanisms: MechanismEvidence[] = [];
    for (const [mech, sigs] of data.mechanisms) {
      const uniqueMechSigs = new Map<string, Signal>();
      for (const s of sigs) uniqueMechSigs.set(s.id, s);
      mechanisms.push({
        mechanism: mech,
        signalCount: uniqueMechSigs.size,
        signals: Array.from(uniqueMechSigs.values()).map((s) => ({
          id: s.id,
          label: s.label,
          weight: s.weight,
        })),
      });
    }

    structuredThemes.push({
      theme: themeKey,
      description: THEME_DESCRIPTIONS[themeKey],
      confidence: getThemeConfidence(deduped.length),
      mechanisms: mechanisms.sort((a, b) => b.signalCount - a.signalCount),
      contexts: Array.from(data.contexts),
      linkedSections: Array.from(data.sections).sort((a, b) => a - b),
      topSignals: deduped
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 5)
        .map((s) => ({ id: s.id, label: s.label, weight: s.weight, sourceType: s.sourceType })),
      totalSignalCount: deduped.length,
    });
  }

  // Sort by signal count descending, cap at 6
  structuredThemes.sort((a, b) => b.totalSignalCount - a.totalSignalCount);
  const visibleThemes = structuredThemes.slice(0, 6);

  // Step 5: Pattern detection
  const patterns: DetectedPattern[] = [];
  const allContexts = new Set<ContextTag>();
  for (const ctxs of signalContexts.values()) {
    for (const c of ctxs) allContexts.add(c);
  }

  for (const pattern of KNOWN_PATTERNS) {
    const hasAllMechanisms = pattern.requiredMechanisms.every((m) => mechanismSignals.has(m));
    if (!hasAllMechanisms) continue;

    let matchingSignalCount = 0;
    for (const m of pattern.requiredMechanisms) {
      matchingSignalCount += (mechanismSignals.get(m) || []).length;
    }

    if (matchingSignalCount < pattern.minSignals) continue;

    const matchingContexts = pattern.boostContexts.filter((c) => allContexts.has(c));

    patterns.push({ pattern, matchingSignalCount, matchingContexts });
  }

  // Step 6: Contradiction detection (environment sensitivity)
  const contradictions: ContradictionFlag[] = [];
  const domainContextSignals = new Map<string, Map<ContextTag, number>>();

  for (const sig of confirmedSignals) {
    const ctxs = signalContexts.get(sig.id) || [];
    if (!domainContextSignals.has(sig.domain)) {
      domainContextSignals.set(sig.domain, new Map());
    }
    const dcs = domainContextSignals.get(sig.domain)!;
    for (const c of ctxs) {
      dcs.set(c, (dcs.get(c) || 0) + sig.weight);
    }
  }

  // Check for significant differences between Home and School
  for (const [domain, contextMap] of domainContextSignals) {
    const homeWeight = contextMap.get("Home") || 0;
    const schoolWeight = contextMap.get("School") || 0;

    if (homeWeight > 0 && schoolWeight > 0 && Math.abs(homeWeight - schoolWeight) >= 3) {
      contradictions.push({
        domain,
        message: `Behaviour appears environment-dependent rather than constant across settings.`,
        contexts: ["Home", "School"],
      });
    }
  }

  return { themes: visibleThemes, patterns, contradictions };
}
