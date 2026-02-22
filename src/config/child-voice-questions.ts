/** Child voice questions keyed by section index (0-based). */
export interface ChildVoiceQuestion {
  id: string;
  label: string;
}

export const childVoiceQuestions: Record<number, ChildVoiceQuestion[]> = {
  // Section 1: Environment
  0: [
    { id: "cv_classroom_feel", label: "What does your classroom feel like when it is really loud?" },
    { id: "cv_calm_place", label: "Is there a place at school where you feel calm?" },
    { id: "cv_hardest_moving", label: "What is the hardest bit about moving from one place to another at school?" },
  ],
  // Section 2: People
  1: [
    { id: "cv_comfortable_person", label: "Who at school do you feel most comfortable around? What is it about them?" },
    { id: "cv_nervous_person", label: "Is there anyone at school who makes you feel nervous? You do not have to say who." },
  ],
  // Section 3: Settings
  2: [
    { id: "cv_favourite_part", label: "What is your favourite part of the school day?" },
    { id: "cv_change_one_thing", label: "If you could change one thing about school what would it be?" },
  ],
  // Section 4: Nervous System and Dysregulation
  3: [
    { id: "cv_upset_body", label: "When you feel really upset or overwhelmed what happens in your body?" },
    { id: "cv_calmer", label: "What helps you feel calmer when things feel too much?" },
  ],
  // Section 6: Sensory Processing
  5: [
    { id: "cv_bothering_sound", label: "Is there a sound that really bothers you that other people do not seem to notice?" },
    { id: "cv_hate_wearing", label: "Are there clothes or fabrics you hate wearing?" },
    { id: "cv_fidget", label: "Do you fidget? What does it feel like when you cannot?" },
  ],
  // Section 7: Executive Function
  6: [
    { id: "cv_lots_instructions", label: "When someone gives you lots of instructions at once what happens?" },
    { id: "cv_cannot_start", label: "Do you ever know exactly what you need to do but cannot seem to start it?" },
  ],
  // Section 9: Dopamine Regulation
  8: [
    { id: "cv_bored_quickly", label: "Do you get bored really quickly? What happens when you do?" },
    { id: "cv_hard_to_stop", label: "Are there things that are really hard to stop doing once you have started?" },
  ],
  // Section 10: Masking
  9: [
    { id: "cv_act_differently", label: "Do you feel like you act differently at school than you do at home?" },
    { id: "cv_tiring_school", label: "Does it feel tiring being at school in a way that is hard to explain?" },
  ],
  // Section 11: Communication
  10: [
    { id: "cv_extra_time", label: "Do you sometimes need extra time to work out what someone means?" },
    { id: "cv_right_words", label: "Do you find it hard to find the right words for how you are feeling?" },
  ],
  // Section 12: Behaviour
  11: [
    { id: "cv_what_starts_it", label: "When things go wrong at school what usually starts it? What were you feeling just before?" },
    { id: "cv_adults_better_worse", label: "Is there anything adults do that makes things better or worse?" },
  ],
  // Section 13: Identity and Self Concept
  12: [
    { id: "cv_brain_different", label: "Do you ever feel like your brain works differently to other people's?" },
    { id: "cv_good_at", label: "What are you good at? What makes you feel proud?" },
  ],
  // Section 14: Strength Profile
  13: [
    { id: "cv_really_good_at", label: "What are you really good at?" },
    { id: "cv_lose_track_time", label: "What do you love doing so much that you lose track of time?" },
    { id: "cv_teachers_knew", label: "What do you wish your teachers knew about what you are good at?" },
  ],
  // Section 21: Hyperfocus
  20: [
    { id: "cv_hours_not_bored", label: "Is there something you can do for hours and hours and not get bored?" },
    { id: "cv_zone_out", label: "Do you ever zone out, go somewhere else in your head, without meaning to?" },
  ],
  // Section 22: Emotional Intensity
  21: [
    { id: "cv_anger_nowhere", label: "When you get angry or really upset does it feel like it comes out of nowhere?" },
    { id: "cv_feel_better", label: "How long does it take you to feel better after something has really upset you?" },
  ],
};
