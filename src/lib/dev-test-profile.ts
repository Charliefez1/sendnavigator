/**
 * Dev Test Profile — pre-filled profile data for scoring verification.
 *
 * Covers all 9 domains with varied signal intensities to produce
 * a non-uniform radar shape. Includes both structured answers and
 * free-text reflections to test weighting and cross-domain routing.
 */

import type { ChildProfileState, SectionSourceTypes } from "@/contexts/ChildProfileContext";

export function createDevTestProfile(): ChildProfileState {
  const sections: Record<number, { answers: Record<string, string | string[]>; reflection: string }> = {};

  // Initialise all 22 sections empty
  for (let i = 0; i < 22; i++) {
    sections[i] = { answers: {}, reflection: "" };
  }

  // ── Section 0: Environment (moderate) ──
  sections[0].answers = {
    transitions: "Sometimes difficult",
    home_predictability: "Mixed, some routine, some unpredictability",
    classroom_description: "Busy classroom, 30 children, open plan. He sits near the door which helps.",
    after_school: "Usually quiet and withdrawn for about an hour after school. Needs snacks and screen time before he can talk about his day.",
    settled_environment: "Grandma's house — quiet, predictable, one-to-one attention.",
    cv_classroom_feel: "It's really loud and I can't think sometimes.",
    cv_calm_place: "My bedroom with the door closed.",
  };
  sections[0].reflection = "School environment clearly affects him but he's found some coping strategies. Home is generally predictable.";

  // ── Section 3: Nervous System (high) ──
  sections[3].answers = {
    recovery_time: "Several hours",
    dysregulation_description: "When overwhelmed he shuts down completely — goes nonverbal, hides under furniture, covers ears. Can last 20 minutes to 2 hours. Afterwards he's exhausted and often tearful.",
    early_warning_signs: "Starts humming loudly, pacing, picking at skin on fingers. Gets very rigid about small things.",
    dysregulation_patterns: "Worse on Mondays and after PE. Better on days with art or music. Much worse when routine changes without warning.",
    helps_or_worsens: "Pressure (weighted blanket), dim lights, and being left alone help. Talking to him, touching him, or asking questions makes it worse.",
    shame_response: "He apologises repeatedly afterwards, says he's broken, asks if we still love him. This is heartbreaking.",
    cv_upset_body: "My chest gets really tight and my hands go tingly. Sometimes I can't see properly.",
    cv_calmer: "Being under my blanket with my cat. Nobody talking to me.",
  };
  sections[3].reflection = "His nervous system is clearly under significant strain. The school day depletes him and recovery takes the whole evening.";

  // ── Section 5: Sensory (moderate-high) ──
  sections[5].answers = {
    pain_temperature: "Sometimes",
    movement_seeking: "Both at different times",
    interoception: "Yes, regularly",
    noise_sensitivity: "Assembly is unbearable. Hand dryers in toilets. Other children screaming in the playground.",
    texture_distress: "Won't wear anything with seams, tags, or certain fabrics. School uniform is a daily battle.",
    fidgeting: "Constantly moving — rocking on chair, clicking pens, chewing sleeves. Teachers see it as disruptive but it helps him concentrate.",
    cv_bothering_sound: "The fire alarm. And when loads of people talk at the same time in the dinner hall.",
    cv_hate_wearing: "My school trousers. They're scratchy and horrible.",
  };

  // ── Section 6: Executive Function (high) ──
  sections[6].answers = {
    knowing_doing_gap: "Yes, frequently",
    multi_step_instructions: "Struggles with more than two steps",
    time_blindness: "Yes, regularly",
    task_initiation: "He knows what he needs to do but literally cannot start. He describes it as his brain being stuck. Gets worse with tasks he finds boring.",
    variable_ability: "Some days he can write a whole page easily. Other days he can barely write his name. Teachers think he's choosing not to work.",
    cv_lots_instructions: "I forget what I'm supposed to do and then I get in trouble.",
    cv_cannot_start: "I just sit there and stare at the paper. I want to do it but nothing happens.",
  };
  sections[6].reflection = "The gap between what he knows and what he can do is enormous. School interprets this as laziness.";

  // ── Section 9: Masking (very high) ──
  sections[9].answers = {
    school_home_difference: "Yes, significantly different",
    post_school_exhaustion: "Yes, they need significant time to recover",
    teacher_discrepancy: "Yes, regularly",
    compliance_avoidance: "Yes, frequently",
    after_school_collapse: "Complete meltdown within 10 minutes of getting home. Throws bag, screams, sometimes hits. This is the real him — school gets the performance.",
    suppressed_distress: "He holds everything in all day. Teachers say he's fine. He's not fine.",
    cv_act_differently: "I pretend to be normal at school. It's really tiring.",
    cv_tiring_school: "By the end of the day I feel like I've run a marathon but nobody can tell.",
  };

  // ── Section 10: Communication (low-moderate) ──
  sections[10].answers = {
    response_time: "Sometimes",
    reading_emotions: "Sometimes",
    literal_language: "Takes things very literally sometimes — idioms confuse him.",
    expressing_feelings: "Struggles to name emotions. Uses physical descriptions instead — 'my head is buzzy' rather than 'I'm anxious'.",
    cv_extra_time: "Sometimes I need to think for a long time before I can answer.",
  };

  // ── Section 11: Behaviour (moderate) ──
  sections[11].answers = {
    recent_incident: "Threw a chair in class last week after being told to redo his work. Teacher saw defiance. I saw a child who had been masking all day and reached his limit.",
    before_incident: "It was after lunch (always harder). He'd already been told off twice for fidgeting. The work redo was the final straw.",
    child_intent: "He wasn't trying to hurt anyone. He was overwhelmed and had no capacity left to regulate.",
    behaviour_patterns: "Almost always happens in the afternoon, almost always on days with changes to routine or after PE.",
    cv_what_starts_it: "When people keep telling me to do things and I can't do any more.",
  };

  // ── Section 13: Strengths (moderate) ──
  sections[13].answers = {
    genuine_strengths: "Incredibly kind and empathetic. Notices when other children are upset before anyone else does.",
    deep_focus: "Can spend 3 hours building complex Lego sets without a break. Knows everything about marine biology.",
    lights_them_up: "The ocean. Sharks. David Attenborough. Building things with his hands.",
    others_notice: "His swimming teacher says he's the most determined child she's ever taught.",
    cv_really_good_at: "I'm really good at knowing about sharks and I can build anything with Lego.",
    cv_lose_track_time: "When I'm reading about the ocean I forget about everything else.",
  };

  // Set multi-source types for a couple of sections to test confidence
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
    finalStatement: "He is so much more than his difficulties. I need the people around him to see that.",
    reportMode: "mini",
    sectionSourceTypes,
  } as ChildProfileState;
}
