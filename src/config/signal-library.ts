/**
 * Signal Library — Phase 1: 8 core domains (mini sections)
 *
 * Maps structured questionnaire answer options → signals with weight & domain.
 * Free-text answers are scored by presence + length (no AI tagging yet).
 *
 * To add a new domain later, add entries here and the scoring engine picks them up.
 */

export type SourceType = "parent" | "child" | "school" | "clinician" | "ai-suggested" | "other";
export type SourceReliability = "low" | "medium" | "high";
export type ContextCategory = "theme" | "mechanism" | "context" | "source";
export type EpisodePhase = "early_warning" | "trigger" | "escalation" | "shutdown" | "recovery";

export type SignalType = "evidence_only" | "trait_confirmed";

export interface Signal {
  id: string;
  domain: string;
  sectionIndex: number;
  questionId: string;
  label: string;
  weight: 1 | 2 | 3;
  sourceType: SourceType;
  sourceReliability: SourceReliability;
  confirmed: boolean;
  setting?: string;
  contextCategory?: ContextCategory;
  contextTags?: Record<string, string>;
  /** Optional: maps this signal to an episode cycle phase for future episode detection */
  episodePhase?: EpisodePhase;
  /** Whether this signal contributes to intensity or evidence only */
  signalType?: SignalType;
}

export interface SignalMapping {
  questionId: string;
  sectionIndex: number;
  domain: string;
  sourceType: SourceType;
  contextCategory?: ContextCategory;
  /** Optional: default episode phase for signals from this mapping */
  episodePhase?: EpisodePhase;
  /** For single-select: map option text → signal(s) */
  optionSignals?: Record<string, { label: string; weight: 1 | 2 | 3; contextCategory?: ContextCategory; episodePhase?: EpisodePhase }[]>;
  /** For free-text: a base signal emitted when answer exists */
  freeTextSignal?: { label: string; baseWeight: 1 | 2 | 3; contextCategory?: ContextCategory; episodePhase?: EpisodePhase };
  /** Optional cross-domain tagging */
  crossDomains?: string[];
}

// ───────────────────────────────────────────────────
// Domain key constants
// ───────────────────────────────────────────────────
export const DOMAIN_KEYS = [
  "Environment",
  "Nervous System",
  "Sensory",
  "Executive Function",
  "Masking",
  "Communication",
  "Behaviour",
  "Strengths",
  "Energy and Recovery",
] as const;

export type DomainKey = (typeof DOMAIN_KEYS)[number];

export const DOMAIN_SECTION_MAP: Record<DomainKey, number> = {
  Environment: 0,
  "Nervous System": 3,
  Sensory: 5,
  "Executive Function": 6,
  Masking: 9,
  Communication: 10,
  Behaviour: 11,
  Strengths: 13,
  "Energy and Recovery": 3, // Primary section: Nervous System (shares with NS, also pulls from Environment & Masking)
};

/** Hints for improving confidence per domain */
export const CONFIDENCE_HINTS: Record<DomainKey, string> = {
  Environment: "Ask a teacher to describe how your child responds to the classroom environment.",
  "Nervous System": "Include observations from a different setting — e.g. after-school club or grandparent's house.",
  Sensory: "A clinical observation or OT assessment would strengthen this domain significantly.",
  "Executive Function": "Teacher feedback on task initiation and following instructions would add a second perspective.",
  Masking: "Ask school to compare end-of-day behaviour with start-of-day — or share after-school observations.",
  Communication: "Speech and language input or a teacher's view on social interactions would increase reliability.",
  Behaviour: "Include an account from someone who sees the child in a different context (club, family member).",
  Strengths: "Ask someone outside the family who knows the child well to describe what they notice.",
  "Energy and Recovery": "Compare energy patterns across different days — school days vs weekends, or mornings vs evenings.",
};

// ───────────────────────────────────────────────────
// Signal mappings for the 8 mini-section domains
// ───────────────────────────────────────────────────

export const SIGNAL_MAPPINGS: SignalMapping[] = [
  // ── Environment (section 0) ──
  {
    questionId: "transitions", sectionIndex: 0, domain: "Environment", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Almost always difficult": [{ label: "Transitions almost always difficult", weight: 3, contextCategory: "mechanism" }],
      "Sometimes difficult": [{ label: "Transitions sometimes difficult", weight: 2, contextCategory: "mechanism" }],
      "It depends on the transition": [{ label: "Transition difficulty is context-dependent", weight: 2, contextCategory: "context" }],
      "Usually fine": [{ label: "Transitions generally managed", weight: 1, contextCategory: "mechanism" }],
    },
  },
  {
    questionId: "home_predictability", sectionIndex: 0, domain: "Environment", sourceType: "parent",
    contextCategory: "context",
    optionSignals: {
      "Frequently unpredictable or changeable": [{ label: "Home environment frequently unpredictable", weight: 2, contextCategory: "context" }],
      "Mixed, some routine, some unpredictability": [{ label: "Mixed home predictability", weight: 1, contextCategory: "context" }],
    },
  },
  { questionId: "classroom_description", sectionIndex: 0, domain: "Environment", sourceType: "parent", freeTextSignal: { label: "Classroom environment described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "after_school", sectionIndex: 0, domain: "Environment", sourceType: "parent", freeTextSignal: { label: "After-school state described", baseWeight: 2, contextCategory: "context" }, crossDomains: ["Masking", "Nervous System", "Energy and Recovery"] },
  { questionId: "settled_environment", sectionIndex: 0, domain: "Environment", sourceType: "parent", freeTextSignal: { label: "Settled environment identified", baseWeight: 1, contextCategory: "context" } },
  { questionId: "cv_classroom_feel", sectionIndex: 0, domain: "Environment", sourceType: "child", freeTextSignal: { label: "Child describes classroom experience", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_calm_place", sectionIndex: 0, domain: "Environment", sourceType: "child", freeTextSignal: { label: "Child identifies calm place", baseWeight: 1, contextCategory: "context" } },
  { questionId: "cv_hardest_moving", sectionIndex: 0, domain: "Environment", sourceType: "child", freeTextSignal: { label: "Child describes transition difficulty", baseWeight: 2, contextCategory: "context" } },

  // ── Nervous System (section 3) ──
  {
    questionId: "recovery_time", sectionIndex: 3, domain: "Nervous System", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "The rest of the day or longer": [{ label: "Recovery takes rest of day or longer", weight: 3, contextCategory: "mechanism" }],
      "Several hours": [{ label: "Recovery takes several hours", weight: 3, contextCategory: "mechanism" }],
      "30 minutes to an hour": [{ label: "Recovery takes 30–60 minutes", weight: 2, contextCategory: "mechanism" }],
      "Under 30 minutes": [{ label: "Recovery under 30 minutes", weight: 1, contextCategory: "mechanism" }],
      "It varies significantly": [{ label: "Recovery time varies significantly", weight: 2, contextCategory: "context" }],
    },
  },
  { questionId: "dysregulation_description", sectionIndex: 3, domain: "Nervous System", sourceType: "parent", freeTextSignal: { label: "Dysregulation described in detail", baseWeight: 3, contextCategory: "context" } },
  { questionId: "early_warning_signs", sectionIndex: 3, domain: "Nervous System", sourceType: "parent", freeTextSignal: { label: "Early warning signs identified", baseWeight: 2, contextCategory: "context" } },
  { questionId: "dysregulation_patterns", sectionIndex: 3, domain: "Nervous System", sourceType: "parent", freeTextSignal: { label: "Dysregulation patterns identified", baseWeight: 2, contextCategory: "context" } },
  { questionId: "helps_or_worsens", sectionIndex: 3, domain: "Nervous System", sourceType: "parent", freeTextSignal: { label: "Helps/worsens strategies described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "shame_response", sectionIndex: 3, domain: "Nervous System", sourceType: "parent", freeTextSignal: { label: "Shame response after episodes described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_upset_body", sectionIndex: 3, domain: "Nervous System", sourceType: "child", freeTextSignal: { label: "Child describes body sensations during overwhelm", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_calmer", sectionIndex: 3, domain: "Nervous System", sourceType: "child", freeTextSignal: { label: "Child identifies calming strategies", baseWeight: 2, contextCategory: "context" } },

  // ── Sensory (section 5) ──
  {
    questionId: "pain_temperature", sectionIndex: 5, domain: "Sensory", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, clearly": [{ label: "Clearly under-sensitive to pain/temperature", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Sometimes under-sensitive to pain/temperature", weight: 2, contextCategory: "mechanism" }],
    },
  },
  {
    questionId: "movement_seeking", sectionIndex: 5, domain: "Sensory", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Seeks movement actively": [{ label: "Actively seeks vestibular input", weight: 2, contextCategory: "mechanism" }],
      "Avoids movement": [{ label: "Avoids vestibular input", weight: 2, contextCategory: "mechanism" }],
      "Both at different times": [{ label: "Mixed vestibular seeking/avoidance", weight: 2, contextCategory: "context" }],
    },
  },
  {
    questionId: "interoception", sectionIndex: 5, domain: "Sensory", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, regularly": [{ label: "Interoception difficulties — regular", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Interoception difficulties — sometimes", weight: 2, contextCategory: "mechanism" }],
    },
  },
  { questionId: "noise_sensitivity", sectionIndex: 5, domain: "Sensory", sourceType: "parent", freeTextSignal: { label: "Noise sensitivity described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "texture_distress", sectionIndex: 5, domain: "Sensory", sourceType: "parent", freeTextSignal: { label: "Texture distress described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "fidgeting", sectionIndex: 5, domain: "Sensory", sourceType: "parent", freeTextSignal: { label: "Fidgeting patterns described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "sensory_seeking", sectionIndex: 5, domain: "Sensory", sourceType: "parent", freeTextSignal: { label: "Sensory seeking behaviours identified", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_bothering_sound", sectionIndex: 5, domain: "Sensory", sourceType: "child", freeTextSignal: { label: "Child identifies bothersome sounds", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_hate_wearing", sectionIndex: 5, domain: "Sensory", sourceType: "child", freeTextSignal: { label: "Child describes clothing sensitivities", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_fidget", sectionIndex: 5, domain: "Sensory", sourceType: "child", freeTextSignal: { label: "Child describes fidgeting experience", baseWeight: 2, contextCategory: "context" } },

  // ── Executive Function (section 6) ──
  {
    questionId: "knowing_doing_gap", sectionIndex: 6, domain: "Executive Function", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, frequently": [{ label: "Knowing-doing gap — frequent", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Knowing-doing gap — sometimes", weight: 2, contextCategory: "mechanism" }],
    },
  },
  {
    questionId: "multi_step_instructions", sectionIndex: 6, domain: "Executive Function", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Struggles with any sequence": [{ label: "Cannot follow sequenced instructions", weight: 3, contextCategory: "mechanism" }],
      "Struggles with more than two steps": [{ label: "Struggles with multi-step instructions", weight: 2, contextCategory: "mechanism" }],
      "It depends on the task": [{ label: "Instruction-following is task-dependent", weight: 1, contextCategory: "context" }],
    },
  },
  {
    questionId: "time_blindness", sectionIndex: 6, domain: "Executive Function", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, regularly": [{ label: "Time blindness — regular", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Time blindness — sometimes", weight: 2, contextCategory: "mechanism" }],
    },
  },
  { questionId: "task_initiation", sectionIndex: 6, domain: "Executive Function", sourceType: "parent", freeTextSignal: { label: "Task initiation difficulties described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "variable_ability", sectionIndex: 6, domain: "Executive Function", sourceType: "parent", freeTextSignal: { label: "Variable ability described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "procrastination", sectionIndex: 6, domain: "Executive Function", sourceType: "parent", freeTextSignal: { label: "Procrastination pattern described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_lots_instructions", sectionIndex: 6, domain: "Executive Function", sourceType: "child", freeTextSignal: { label: "Child describes instruction overload", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_cannot_start", sectionIndex: 6, domain: "Executive Function", sourceType: "child", freeTextSignal: { label: "Child describes inability to start", baseWeight: 2, contextCategory: "context" } },

  // ── Masking (section 9) ──
  {
    questionId: "school_home_difference", sectionIndex: 9, domain: "Masking", sourceType: "parent",
    contextCategory: "theme",
    optionSignals: {
      "Yes, significantly different": [{ label: "Significant school-home behaviour difference", weight: 3, contextCategory: "theme" }],
      "Somewhat different": [{ label: "Some school-home behaviour difference", weight: 2, contextCategory: "theme" }],
      "School is harder than home": [{ label: "School harder than home", weight: 2, contextCategory: "context" }],
    },
  },
  {
    questionId: "post_school_exhaustion", sectionIndex: 9, domain: "Masking", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, they need significant time to recover": [{ label: "Significant post-school recovery needed", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Sometimes needs post-school recovery", weight: 2, contextCategory: "mechanism" }],
    },
  },
  {
    questionId: "teacher_discrepancy", sectionIndex: 9, domain: "Masking", sourceType: "parent",
    contextCategory: "source",
    optionSignals: {
      "Yes, regularly": [{ label: "Regular teacher-parent discrepancy", weight: 3, contextCategory: "source" }],
      "Sometimes": [{ label: "Occasional teacher-parent discrepancy", weight: 2, contextCategory: "source" }],
    },
  },
  {
    questionId: "compliance_avoidance", sectionIndex: 9, domain: "Masking", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, frequently": [{ label: "Frequently complies to avoid conflict", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Sometimes complies to avoid conflict", weight: 2, contextCategory: "mechanism" }],
    },
  },
  { questionId: "after_school_collapse", sectionIndex: 9, domain: "Masking", sourceType: "parent", freeTextSignal: { label: "After-school collapse described", baseWeight: 3, contextCategory: "context" }, crossDomains: ["Energy and Recovery"] },
  { questionId: "suppressed_distress", sectionIndex: 9, domain: "Masking", sourceType: "parent", freeTextSignal: { label: "Suppressed distress described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_act_differently", sectionIndex: 9, domain: "Masking", sourceType: "child", freeTextSignal: { label: "Child describes acting differently", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_tiring_school", sectionIndex: 9, domain: "Masking", sourceType: "child", freeTextSignal: { label: "Child describes school as tiring", baseWeight: 2, contextCategory: "context" } },

  // ── Communication (section 10) ──
  {
    questionId: "response_time", sectionIndex: 10, domain: "Communication", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, noticeably": [{ label: "Noticeably slow response time", weight: 2, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Sometimes slow to respond", weight: 1, contextCategory: "mechanism" }],
    },
  },
  {
    questionId: "reading_emotions", sectionIndex: 10, domain: "Communication", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, clearly": [{ label: "Clearly struggles to read emotions", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Sometimes struggles with emotion reading", weight: 2, contextCategory: "mechanism" }],
    },
  },
  { questionId: "literal_language", sectionIndex: 10, domain: "Communication", sourceType: "parent", freeTextSignal: { label: "Literal language processing described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "expressing_feelings", sectionIndex: 10, domain: "Communication", sourceType: "parent", freeTextSignal: { label: "Feeling expression difficulties described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "social_cues", sectionIndex: 10, domain: "Communication", sourceType: "parent", freeTextSignal: { label: "Social cue difficulties described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "social_misunderstanding", sectionIndex: 10, domain: "Communication", sourceType: "parent", freeTextSignal: { label: "Social misunderstanding incident described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_extra_time", sectionIndex: 10, domain: "Communication", sourceType: "child", freeTextSignal: { label: "Child needs extra processing time", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_right_words", sectionIndex: 10, domain: "Communication", sourceType: "child", freeTextSignal: { label: "Child struggles to find words for feelings", baseWeight: 2, contextCategory: "context" } },

  // ── Behaviour (section 11) ──
  { questionId: "recent_incident", sectionIndex: 11, domain: "Behaviour", sourceType: "parent", freeTextSignal: { label: "Recent incident described in detail", baseWeight: 3, contextCategory: "context" } },
  { questionId: "before_incident", sectionIndex: 11, domain: "Behaviour", sourceType: "parent", freeTextSignal: { label: "Pre-incident context provided", baseWeight: 2, contextCategory: "context" } },
  { questionId: "child_intent", sectionIndex: 11, domain: "Behaviour", sourceType: "parent", freeTextSignal: { label: "Parent interprets child's intent", baseWeight: 2, contextCategory: "source" } },
  { questionId: "behaviour_patterns", sectionIndex: 11, domain: "Behaviour", sourceType: "parent", freeTextSignal: { label: "Behaviour patterns identified", baseWeight: 2, contextCategory: "context" } },
  { questionId: "adult_response", sectionIndex: 11, domain: "Behaviour", sourceType: "parent", freeTextSignal: { label: "Adult response patterns described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "makes_sense_to_you", sectionIndex: 11, domain: "Behaviour", sourceType: "parent", freeTextSignal: { label: "Parent provides behaviour interpretation", baseWeight: 2, contextCategory: "source" } },
  { questionId: "cv_what_starts_it", sectionIndex: 11, domain: "Behaviour", sourceType: "child", freeTextSignal: { label: "Child identifies behaviour triggers", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_adults_better_worse", sectionIndex: 11, domain: "Behaviour", sourceType: "child", freeTextSignal: { label: "Child describes helpful/unhelpful adult responses", baseWeight: 2, contextCategory: "context" } },

  // ── Strengths (section 13) ──
  { questionId: "genuine_strengths", sectionIndex: 13, domain: "Strengths", sourceType: "parent", freeTextSignal: { label: "Genuine strengths described", baseWeight: 2, contextCategory: "context" } },
  { questionId: "deep_focus", sectionIndex: 13, domain: "Strengths", sourceType: "parent", freeTextSignal: { label: "Deep focus areas identified", baseWeight: 2, contextCategory: "context" } },
  { questionId: "lights_them_up", sectionIndex: 13, domain: "Strengths", sourceType: "parent", freeTextSignal: { label: "Motivating interests identified", baseWeight: 2, contextCategory: "context" } },
  { questionId: "others_notice", sectionIndex: 13, domain: "Strengths", sourceType: "parent", freeTextSignal: { label: "External strength recognition described", baseWeight: 2, contextCategory: "source" } },
  { questionId: "unrecognised_strength", sectionIndex: 13, domain: "Strengths", sourceType: "parent", freeTextSignal: { label: "Unrecognised strength identified", baseWeight: 1, contextCategory: "context" } },
  { questionId: "cv_really_good_at", sectionIndex: 13, domain: "Strengths", sourceType: "child", freeTextSignal: { label: "Child identifies own strengths", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_lose_track_time", sectionIndex: 13, domain: "Strengths", sourceType: "child", freeTextSignal: { label: "Child identifies flow activities", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_teachers_knew", sectionIndex: 13, domain: "Strengths", sourceType: "child", freeTextSignal: { label: "Child wishes teachers knew strengths", baseWeight: 1, contextCategory: "context" } },

  // ── Energy and Recovery (cross-domain — pulls from sections 0, 3, 9) ──
  // Dedicated signals mapped to existing questions via cross-domain routing
  {
    questionId: "recovery_time", sectionIndex: 3, domain: "Energy and Recovery", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "The rest of the day or longer": [{ label: "Recovery takes rest of day or longer", weight: 3, contextCategory: "mechanism" }],
      "Several hours": [{ label: "Recovery takes several hours", weight: 3, contextCategory: "mechanism" }],
      "30 minutes to an hour": [{ label: "Recovery takes 30–60 minutes", weight: 2, contextCategory: "mechanism" }],
      "It varies significantly": [{ label: "Recovery time varies significantly", weight: 2, contextCategory: "context" }],
    },
  },
  {
    questionId: "post_school_exhaustion", sectionIndex: 9, domain: "Energy and Recovery", sourceType: "parent",
    contextCategory: "mechanism",
    optionSignals: {
      "Yes, they need significant time to recover": [{ label: "Post-school exhaustion — significant recovery needed", weight: 3, contextCategory: "mechanism" }],
      "Sometimes": [{ label: "Post-school exhaustion — sometimes", weight: 2, contextCategory: "mechanism" }],
    },
  },
  { questionId: "shame_response", sectionIndex: 3, domain: "Energy and Recovery", sourceType: "parent", freeTextSignal: { label: "Post-episode shame depletes energy further", baseWeight: 2, contextCategory: "context" } },
  { questionId: "cv_tiring_school", sectionIndex: 9, domain: "Energy and Recovery", sourceType: "child", freeTextSignal: { label: "Child reports school as energy-draining", baseWeight: 2, contextCategory: "context" } },
  { questionId: "dysregulation_patterns", sectionIndex: 3, domain: "Energy and Recovery", sourceType: "parent", freeTextSignal: { label: "Dysregulation patterns suggest energy depletion cycle", baseWeight: 2, contextCategory: "context" } },
  { questionId: "helps_or_worsens", sectionIndex: 3, domain: "Energy and Recovery", sourceType: "parent", freeTextSignal: { label: "Recovery strategies indicate energy management needs", baseWeight: 2, contextCategory: "context" } },
];

// ───────────────────────────────────────────────────
// Score labels (0–4 scale)
// ───────────────────────────────────────────────────
export const INTENSITY_LABELS: Record<number, string> = {
  0: "None",
  1: "Light",
  2: "Moderate",
  3: "High",
  4: "Very high",
};

export const SCORE_SCALE_MAX = 4;

export const SCORING_VERSION = "v1.3";
