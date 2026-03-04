import { ChildProfileState, SECTION_TITLES, SectionStatus } from "@/contexts/ChildProfileContext";
import { childVoiceQuestions } from "@/config/child-voice-questions";
import { MINI_SECTIONS } from "@/config/mini-profile-sections";

// Section index constants (0-based)
const NERVOUS_SYSTEM = 3;
const SENSORY = 5;
const COMMUNICATION = 10;
const BEHAVIOUR = 11;
const STRENGTHS = 13;

/** Extract first sentence from a text block. */
function firstSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : trimmed;
}

/** Get a string answer safely, returning empty string if absent. */
function getAnswer(state: ChildProfileState, sectionIndex: number, questionId: string): string {
  const section = state.sections[sectionIndex];
  if (!section) return "";
  const val = section.answers?.[questionId];
  if (!val) return "";
  return Array.isArray(val) ? val.join(", ") : val.trim();
}

/** Get reflection text for a section. */
function getReflection(state: ChildProfileState, sectionIndex: number): string {
  return state.sections[sectionIndex]?.reflection?.trim() || "";
}

// --- Child Overview ---

export interface ChildOverview {
  childName: string;
  reason: string;
  filledBy: string;
}

export function extractChildOverview(state: ChildProfileState): ChildOverview {
  return {
    childName: state.setup.childName || "",
    reason: state.setup.reason || "",
    filledBy: state.setup.filledBy || "",
  };
}

// --- Key Strengths ---

export interface KeyStrengths {
  items: string[];
}

export function extractKeyStrengths(state: ChildProfileState): KeyStrengths {
  const items: string[] = [];
  const fields = ["genuine_strengths", "deep_focus", "lights_them_up", "others_notice", "unrecognised_strength"];

  for (const field of fields) {
    const val = getAnswer(state, STRENGTHS, field);
    if (val) items.push(firstSentence(val));
    if (items.length >= 5) break;
  }

  if (items.length < 5) {
    const cv = getAnswer(state, STRENGTHS, "cv_really_good_at");
    if (cv) items.push(firstSentence(cv));
  }

  return { items };
}

// --- Key Needs ---

export interface KeyNeeds {
  items: string[];
}

export function extractKeyNeeds(state: ChildProfileState): KeyNeeds {
  const items: string[] = [];

  const sources: [number, string][] = [
    [NERVOUS_SYSTEM, "dysregulation_description"],
    [NERVOUS_SYSTEM, "early_warning_signs"],
    [SENSORY, "noise_sensitivity"],
    [SENSORY, "texture_distress"],
    [BEHAVIOUR, "behaviour_patterns"],
    [BEHAVIOUR, "child_intent"],
  ];

  for (const [sectionIdx, field] of sources) {
    const val = getAnswer(state, sectionIdx, field);
    if (val) items.push(firstSentence(val));
    if (items.length >= 5) break;
  }

  return { items };
}

// --- Communication Snapshot ---

export interface CommunicationSnapshot {
  preferredStyle: string;
  underStress: string;
  nonVerbal: string;
}

export function extractCommunicationSnapshot(state: ChildProfileState): CommunicationSnapshot {
  return {
    preferredStyle: firstSentence(getAnswer(state, COMMUNICATION, "literal_language")) || "",
    underStress: firstSentence(getAnswer(state, COMMUNICATION, "expressing_feelings")) || "",
    nonVerbal: firstSentence(getAnswer(state, COMMUNICATION, "social_cues")) || "",
  };
}

// --- What Helps Most ---

export interface WhatHelps {
  items: string[];
}

export function extractWhatHelps(state: ChildProfileState): WhatHelps {
  const items: string[] = [];

  const helpsAnswer = getAnswer(state, NERVOUS_SYSTEM, "helps_or_worsens");
  if (helpsAnswer) items.push(firstSentence(helpsAnswer));

  const sensorySeek = getAnswer(state, SENSORY, "sensory_seeking");
  if (sensorySeek) items.push(firstSentence(sensorySeek));

  const reflectionSections = [NERVOUS_SYSTEM, SENSORY, 7, BEHAVIOUR];
  for (const idx of reflectionSections) {
    if (items.length >= 5) break;
    const refl = getReflection(state, idx);
    if (refl) items.push(firstSentence(refl));
  }

  return { items: items.slice(0, 5) };
}

// --- Section Completion ---

export interface SectionCompletion {
  sections: Array<{
    index: number;
    title: string;
    status: SectionStatus;
  }>;
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export function extractSectionCompletion(
  state: ChildProfileState,
  getSectionStatus: (index: number) => SectionStatus
): SectionCompletion {
  const sections = SECTION_TITLES.map((title, index) => ({
    index,
    title,
    status: getSectionStatus(index),
  }));

  const completedCount = sections.filter((s) => s.status !== "empty").length;
  const totalCount = SECTION_TITLES.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { sections, completedCount, totalCount, percentage };
}

/** Check whether any section has content at all. */
export function hasAnyContent(state: ChildProfileState): boolean {
  return Object.keys(state.sections).some((key) => {
    const section = state.sections[Number(key)];
    if (!section) return false;
    const hasAnswers = Object.values(section.answers).some((v) =>
      Array.isArray(v) ? v.length > 0 : v.trim().length > 0
    );
    return hasAnswers || section.reflection.trim().length > 0;
  });
}

// =====================================================
// NEW: Profile Depth Scoring
// =====================================================

export interface DomainScore {
  domain: string;
  sectionIndex: number;
  score: number; // 0–3
  label: string;
}

const RADAR_DOMAINS: { domain: string; sectionIndex: number }[] = [
  { domain: "Environment", sectionIndex: 0 },
  { domain: "Nervous System", sectionIndex: 3 },
  { domain: "Sensory", sectionIndex: 5 },
  { domain: "Exec. Function", sectionIndex: 6 },
  { domain: "Masking", sectionIndex: 9 },
  { domain: "Communication", sectionIndex: 10 },
  { domain: "Behaviour", sectionIndex: 11 },
  { domain: "Strengths", sectionIndex: 13 },
];

function scoreDomain(state: ChildProfileState, sectionIndex: number): number {
  const section = state.sections[sectionIndex];
  if (!section) return 0;

  const answers = Object.entries(section.answers).filter(([, v]) =>
    Array.isArray(v) ? v.length > 0 : (v || "").trim().length > 0
  );
  if (answers.length === 0 && !section.reflection?.trim()) return 0;

  // Count rich answers (>50 chars)
  const richCount = answers.filter(([, v]) => {
    const text = Array.isArray(v) ? v.join(", ") : v;
    return text.length > 50;
  }).length;

  const hasReflection = (section.reflection || "").trim().length > 0;

  // Check child voice
  const cvQuestions = childVoiceQuestions[sectionIndex] || [];
  const hasChildVoice = cvQuestions.some((q) => {
    const val = section.answers?.[q.id];
    return val && (Array.isArray(val) ? val.length > 0 : val.trim().length > 0);
  });

  // Scoring: 1 = started, 2 = detailed, 3 = rich
  if (richCount >= 2 && (hasReflection || hasChildVoice)) return 3;
  if (answers.length >= 2 || richCount >= 1) return 2;
  return 1;
}

const SCORE_LABELS = ["Empty", "Started", "Detailed", "Rich"];

export function extractDomainScores(state: ChildProfileState): DomainScore[] {
  return RADAR_DOMAINS.map(({ domain, sectionIndex }) => {
    const score = scoreDomain(state, sectionIndex);
    return { domain, sectionIndex, score, label: SCORE_LABELS[score] };
  });
}

/** Overall profile depth as a 0–100 value, weighted by answer quality. */
export function extractProfileDepth(state: ChildProfileState): number {
  const scores = extractDomainScores(state);
  const maxPossible = scores.length * 3;
  const total = scores.reduce((sum, s) => sum + s.score, 0);
  return maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0;
}

// =====================================================
// NEW: Child Voice Collection
// =====================================================

export interface ChildVoiceEntry {
  quote: string;
  questionLabel: string;
  sectionIndex: number;
  sectionTitle: string;
}

export function extractChildVoiceEntries(state: ChildProfileState): ChildVoiceEntry[] {
  const entries: ChildVoiceEntry[] = [];

  for (const [sectionIndexStr, questions] of Object.entries(childVoiceQuestions)) {
    const sectionIndex = Number(sectionIndexStr);
    const section = state.sections[sectionIndex];
    if (!section) continue;

    for (const q of questions) {
      const val = section.answers?.[q.id];
      const text = val ? (Array.isArray(val) ? val.join(", ") : val.trim()) : "";
      if (text) {
        entries.push({
          quote: text,
          questionLabel: q.label,
          sectionIndex,
          sectionTitle: SECTION_TITLES[sectionIndex] || `Section ${sectionIndex + 1}`,
        });
      }
    }
  }

  return entries;
}

// Emerging Themes — moved to src/lib/theme-engine.ts (structured ontology model)

// =====================================================
// NEW: Readiness & Next Steps
// =====================================================

export interface ReadinessSuggestion {
  text: string;
  sectionIndex: number;
  priority: number; // lower = more important
}

export function extractReadinessSuggestions(
  state: ChildProfileState,
  getSectionStatus: (index: number) => SectionStatus
): ReadinessSuggestion[] {
  const suggestions: ReadinessSuggestion[] = [];
  const activeSections = state.reportMode === "mini" ? [...MINI_SECTIONS] : SECTION_TITLES.map((_, i) => i);

  for (const idx of activeSections) {
    const status = getSectionStatus(idx);
    const title = SECTION_TITLES[idx];
    const section = state.sections[idx];

    if (status === "empty") {
      suggestions.push({
        text: `Start the "${title}" section to build a fuller picture.`,
        sectionIndex: idx,
        priority: 10,
      });
      continue;
    }

    // Check if thin (few answers, short)
    const answers = section ? Object.entries(section.answers).filter(([, v]) =>
      Array.isArray(v) ? v.length > 0 : (v || "").trim().length > 0
    ) : [];

    const richCount = answers.filter(([, v]) => {
      const text = Array.isArray(v) ? v.join(", ") : v;
      return text.length > 50;
    }).length;

    if (richCount === 0 && answers.length > 0) {
      suggestions.push({
        text: `Add more detail to "${title}" — longer answers create a stronger report.`,
        sectionIndex: idx,
        priority: 5,
      });
    }

    // Check reflection
    const hasReflection = (section?.reflection || "").trim().length > 0;
    if (!hasReflection && answers.length > 0) {
      suggestions.push({
        text: `Add a reflection to "${title}" to deepen this section.`,
        sectionIndex: idx,
        priority: 7,
      });
    }

    // Check child voice
    const cvQuestions = childVoiceQuestions[idx] || [];
    if (cvQuestions.length > 0) {
      const hasCV = cvQuestions.some((q) => {
        const val = section?.answers?.[q.id];
        return val && (Array.isArray(val) ? val.length > 0 : val.trim().length > 0);
      });
      if (!hasCV && answers.length > 0) {
        suggestions.push({
          text: `"${title}" would benefit from your child's voice.`,
          sectionIndex: idx,
          priority: 6,
        });
      }
    }
  }

  return suggestions.sort((a, b) => a.priority - b.priority).slice(0, 3);
}

export type ReadinessLevel = "not-ready" | "minimal" | "good" | "strong";

export interface ReadinessInfo {
  level: ReadinessLevel;
  label: string;
  description: string;
  canGenerate: boolean;
}

export function extractReadiness(state: ChildProfileState, getSectionStatus: (index: number) => SectionStatus): ReadinessInfo {
  const activeSections = state.reportMode === "mini" ? [...MINI_SECTIONS] : SECTION_TITLES.map((_, i) => i);
  const filledCount = activeSections.filter((idx) => getSectionStatus(idx) !== "empty").length;
  const ratio = filledCount / activeSections.length;
  const depth = extractProfileDepth(state);

  if (ratio === 0) {
    return { level: "not-ready", label: "Not started", description: "Start filling in sections to build your child's profile.", canGenerate: false };
  }
  if (ratio < 0.3 || depth < 15) {
    return { level: "minimal", label: "Just getting started", description: "A few more sections will make the report much stronger.", canGenerate: false };
  }
  if (ratio < 0.6 || depth < 40) {
    return { level: "good", label: "Getting there", description: "Your profile has enough for a meaningful report. More detail will make it even better.", canGenerate: true };
  }
  return { level: "strong", label: "Ready to generate", description: "Your profile has plenty of detail. This will help create something truly useful.", canGenerate: true };
}
