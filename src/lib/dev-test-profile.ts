/**
 * Dev Test Profile — pre-filled profile data for scoring verification.
 *
 * Covers mini-report sections (0, 3, 5, 6, 9, 10, 11, 13) with varied
 * signal intensities to produce a non-uniform radar shape.
 * - Nervous System (3) and Masking (9): HIGH
 * - Sensory (5) and Executive Function (6): MODERATE
 * - Environment (0) and Behaviour (11): LOW-MODERATE
 * - Communication (10) and Strengths (13): LOW
 */

import type { ChildProfileState, SectionSourceTypes } from "@/contexts/ChildProfileContext";

export function createDevTestProfile(): ChildProfileState {
  const sections: Record<number, { answers: Record<string, string | string[]>; reflection: string }> = {};

  // Initialise all 22 sections empty
  for (let i = 0; i < 22; i++) {
    sections[i] = { answers: {}, reflection: "" };
  }

  // ── Section 0: Environment (low-moderate) ──
  sections[0].answers = {
    transitions: "Sometimes difficult",
    home_predictability: "Generally predictable and calm",
    classroom_description: "Open plan classroom, about 30 children. He sits near the door which helps.",
    cv_classroom_feel: "It is really loud sometimes.",
    cv_calm_place: "The library.",
  };

  // ── Section 3: Nervous System (high) ──
  sections[3].answers = {
    recovery_time: "Several hours",
    dysregulation_description: "When overwhelmed he shuts down completely — goes nonverbal, hides under furniture, covers ears. Can last 20 minutes to 2 hours. Afterwards he is exhausted and often tearful.",
    early_warning_signs: "Starts humming loudly, pacing, picking at skin on fingers. Gets very rigid about small things.",
    dysregulation_patterns: "Worse on Mondays and after PE. Much worse when routine changes without warning.",
    helps_or_worsens: "Pressure (weighted blanket), dim lights, and being left alone help. Talking to him or asking questions makes it worse.",
    shame_response: "He apologises repeatedly afterwards, says he is broken.",
    cv_upset_body: "My chest gets really tight and my hands go tingly.",
    cv_calmer: "Being under my blanket with my cat. Nobody talking to me.",
  };
  sections[3].reflection = "His nervous system is clearly under significant strain. The school day depletes him.";

  // ── Section 5: Sensory (moderate) ──
  sections[5].answers = {
    pain_temperature: "Sometimes",
    movement_seeking: "Both at different times",
    interoception: "Sometimes",
    noise_sensitivity: "Assembly is uncomfortable. Hand dryers bother him.",
    texture_distress: "Prefers soft fabrics. Tags need to be removed.",
    cv_bothering_sound: "The hand dryer in the toilets.",
  };

  // ── Section 6: Executive Function (moderate) ──
  sections[6].answers = {
    knowing_doing_gap: "Sometimes",
    multi_step_instructions: "Struggles with more than two steps",
    time_blindness: "Sometimes",
    task_initiation: "He struggles to start tasks independently, especially boring ones.",
    cv_lots_instructions: "I forget what I am supposed to do.",
    cv_cannot_start: "I want to do it but nothing happens.",
  };

  // ── Section 9: Masking (very high) ──
  sections[9].answers = {
    school_home_difference: "Yes, significantly different",
    post_school_exhaustion: "Yes, they need significant time to recover",
    teacher_discrepancy: "Yes, regularly",
    compliance_avoidance: "Yes, frequently",
    after_school_collapse: "Complete meltdown within 10 minutes of getting home. This is the real him — school gets the performance.",
    suppressed_distress: "He holds everything in all day. Teachers say he is fine. He is not fine.",
    cv_act_differently: "I pretend to be normal at school. It is really tiring.",
    cv_tiring_school: "By the end of the day I feel like I have run a marathon but nobody can tell.",
  };

  // ── Section 10: Communication (low) ──
  sections[10].answers = {
    response_time: "Sometimes",
    reading_emotions: "Sometimes",
    literal_language: "Takes things quite literally sometimes.",
    cv_extra_time: "Sometimes I need to think for a long time before I can answer.",
  };

  // ── Section 11: Behaviour (low-moderate) ──
  sections[11].answers = {
    recent_incident: "Threw a chair in class last week after being told to redo his work.",
    before_incident: "It was after lunch. He had already been told off twice for fidgeting.",
    child_intent: "He was not trying to hurt anyone. He was overwhelmed.",
    cv_what_starts_it: "When people keep telling me to do things and I cannot do any more.",
  };

  // ── Section 13: Strengths (low — positive content, few signals) ──
  sections[13].answers = {
    genuine_strengths: "Kind and empathetic. Notices when other children are upset.",
    deep_focus: "Can spend a couple of hours building Lego sets.",
    cv_really_good_at: "I am really good at knowing about sharks.",
  };

  // Set multi-source types for high-signal sections to test confidence
  const sectionSourceTypes: SectionSourceTypes = {
    3: ["parent", "school"],  // NS has parent + school input
    9: ["parent", "school"],  // Masking has both perspectives
  };

  return {
    setup: {
      childName: "Dev Test Child",
      filledBy: "Dev Parent",
      sharedWith: ["School SENCO"],
      reason: "Testing scoring model",
    },
    sections,
    finalStatement: "He is so much more than his difficulties.",
    reportMode: "mini",
    sectionSourceTypes,
  } as ChildProfileState;
}
