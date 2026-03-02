import { ChildProfileState, SECTION_TITLES, SectionStatus } from "@/contexts/ChildProfileContext";

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

  // Add child voice if we still have room
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

  // Pull from specific answer fields known to contain "what helps"
  const helpsAnswer = getAnswer(state, NERVOUS_SYSTEM, "helps_or_worsens");
  if (helpsAnswer) items.push(firstSentence(helpsAnswer));

  const sensorySeek = getAnswer(state, SENSORY, "sensory_seeking");
  if (sensorySeek) items.push(firstSentence(sensorySeek));

  // Scan key reflections
  const reflectionSections = [NERVOUS_SYSTEM, SENSORY, 7, BEHAVIOUR]; // 7 = Sleep
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
