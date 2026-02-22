export interface SectionQuestion {
  id: string;
  label: string;
  type: "text" | "text-large" | "single-select";
  options?: string[];
}

export interface SectionContent {
  framing: string;
  note?: string;
  questions: SectionQuestion[];
}

/** Keyed by section index (0-based). Sections without content use the placeholder template. */
export const sectionContent: Record<number, SectionContent> = {
  // Section 1: Environment
  0: {
    framing:
      "The environment your child is in, at school, at home, in between, may be doing more work than anyone has noticed. By the time difficulty shows up as behaviour, the environment has usually already done its damage.",
    questions: [
      {
        id: "classroom_description",
        label:
          "Describe your child's classroom as best you can. What is the noise level like? The lighting? How busy does it feel?",
        type: "text-large",
      },
      {
        id: "after_school",
        label: "How does your child seem when they arrive home from school?",
        type: "text",
      },
      {
        id: "transitions",
        label:
          "How do they manage transitions, moving between lessons, places, or activities?",
        type: "single-select",
        options: [
          "Usually fine",
          "Sometimes difficult",
          "Almost always difficult",
          "It depends on the transition",
        ],
      },
      {
        id: "settled_environment",
        label:
          "Is there a particular environment where your child seems most settled? Describe it.",
        type: "text",
      },
      {
        id: "home_predictability",
        label:
          "Is the home environment generally predictable and calm, or is there frequent change and unpredictability?",
        type: "single-select",
        options: [
          "Generally predictable and calm",
          "Mixed, some routine, some unpredictability",
          "Frequently unpredictable or changeable",
        ],
      },
    ],
  },

  // Section 2: People
  1: {
    framing:
      "Neurodivergent children are often acutely sensitive to the emotional tone of the adults around them. A calm teacher and a stressed teacher can produce completely different behaviour from the same child, in the same room, on the same day. This is not manipulation. It is nervous system response.",
    questions: [
      {
        id: "safe_person",
        label:
          "Who does your child feel safe with at school? What is it about that person?",
        type: "text",
      },
      {
        id: "trigger_adult",
        label:
          "Is there an adult at school who seems to trigger difficulty? What do you notice?",
        type: "text",
      },
      {
        id: "friendships",
        label:
          "Describe your child's friendships. Are they close, complicated, one-sided, or largely absent?",
        type: "text",
      },
      {
        id: "age_preference",
        label:
          "Do they tend to connect better with younger children, older children, or adults rather than peers their own age?",
        type: "single-select",
        options: [
          "Peers their own age",
          "Younger children",
          "Older children or adults",
          "It varies",
        ],
      },
      {
        id: "friendship_breakdown",
        label:
          "Have friendships broken down suddenly or significantly? How did your child respond?",
        type: "text",
      },
      {
        id: "compliance_in_friendships",
        label:
          "Do they go along with things they do not want to do in friendships because saying no feels too difficult?",
        type: "single-select",
        options: [
          "Yes, often",
          "Sometimes",
          "Rarely",
          "Not that I have noticed",
        ],
      },
    ],
  },

  // Section 3: Settings
  2: {
    framing:
      "Not every school is the right school for every child. Structure, culture, and approach vary enormously, and some children thrive in environments that would flatten others. This is not a criticism of schools. It is a recognition of fit.",
    questions: [
      {
        id: "school_match",
        label:
          "Does the school's approach feel like a match for your child's learning style? Where does it work and where does it not?",
        type: "text",
      },
      {
        id: "structure_preference",
        label:
          "How does your child manage in structured versus less structured parts of the day?",
        type: "single-select",
        options: [
          "Better in structured time",
          "Better in unstructured time",
          "About the same",
          "Struggles in both",
        ],
      },
      {
        id: "academic_pace",
        label: "Does the academic pace feel right, too fast, or too slow?",
        type: "single-select",
        options: [
          "About right",
          "Too fast",
          "Too slow",
          "Varies significantly",
        ],
      },
      {
        id: "outside_activities",
        label:
          "How many activities or commitments does your child have outside school? How do they seem after them?",
        type: "text",
      },
      {
        id: "home_school_consistency",
        label:
          "Is there consistency between how things are handled at home and at school? Where are the gaps?",
        type: "text",
      },
    ],
  },

  // Section 4: Nervous System and Dysregulation
  3: {
    framing:
      "Dysregulation is not a behaviour. It is a state. When a child's nervous system is overwhelmed, the thinking brain goes offline. What you see after that point is not a choice. It is a physiological response. Understanding what dysregulation looks like in your specific child, and what the early warning signs are, is one of the most useful things you can bring into any professional conversation.",
    questions: [
      {
        id: "dysregulation_description",
        label:
          'What does dysregulation look like in your child? Describe it specifically, not just "meltdown" but what actually happens.',
        type: "text-large",
      },
      {
        id: "early_warning_signs",
        label:
          "What are the early warning signs before full dysregulation? What do you notice in the ten minutes before?",
        type: "text",
      },
      {
        id: "recovery_time",
        label: "How long does full recovery take after an episode?",
        type: "single-select",
        options: [
          "Under 30 minutes",
          "30 minutes to an hour",
          "Several hours",
          "The rest of the day or longer",
          "It varies significantly",
        ],
      },
      {
        id: "dysregulation_patterns",
        label:
          "Are there patterns, times of day, settings, or situations where dysregulation is more likely?",
        type: "text",
      },
      {
        id: "helps_or_worsens",
        label: "What helps during an episode? What makes it worse?",
        type: "text",
      },
      {
        id: "shame_response",
        label:
          "Does your child feel shame or distress about losing control? How do they talk about it afterwards?",
        type: "text",
      },
    ],
  },

  // Section 5: Trauma
  4: {
    framing:
      "Trauma does not always look like trauma. It can look like behaviour, learning difficulty, anxiety, aggression, or withdrawal. Many children who are flagged for SEND assessment have experiences in their history that have shaped how they respond to the world. That does not mean SEND is not also present. Both can be true.",
    note:
      "This section is sensitive. Answer only what feels relevant and right for your child. You can skip any question or the whole section.",
    questions: [
      {
        id: "medical_experiences",
        label:
          "Has your child had any significant medical experiences, hospital stays, painful procedures, or serious illness?",
        type: "text",
      },
      {
        id: "school_trauma",
        label:
          "Has anything happened at school that felt frightening or humiliating for your child, a teacher incident, a public failure, an exclusion, or a friendship breakdown?",
        type: "text",
      },
      {
        id: "bullying",
        label:
          "Has your child experienced bullying? How was it handled?",
        type: "text",
      },
      {
        id: "family_change",
        label:
          "Has there been significant change or instability in family life, bereavement, separation, house moves, or a new sibling?",
        type: "text",
      },
      {
        id: "hypervigilance",
        label:
          "Does your child show signs of hypervigilance, always watching for what might go wrong, struggling to trust, expecting the worst?",
        type: "single-select",
        options: [
          "Yes, clearly",
          "Sometimes",
          "Rarely",
          "Not that I have noticed",
        ],
      },
    ],
  },

  // Section 6: Sensory Processing
  5: {
    framing:
      "The sensory system processes everything the body experiences. Sound, light, touch, movement, temperature, and the signals from inside the body itself. For many neurodivergent children it is dysregulated in one direction or both. Over-sensitive means the input is too loud. Under-sensitive means the signal is too quiet. Many children are both, in different channels, on different days. Fidgeting is almost always sensory. It is the body seeking the input it needs to stay regulated, not a behaviour problem.",
    questions: [
      { id: "noise_sensitivity", label: "Is your child sensitive to noise? Which kinds, sudden sounds, background noise, specific voices, crowds?", type: "text" },
      { id: "texture_distress", label: "Are there textures, clothing, food, or surfaces that cause genuine distress?", type: "text" },
      { id: "pain_temperature", label: "Does your child seem under-sensitive to pain or temperature, not noticing injury or cold?", type: "single-select", options: ["Yes, clearly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "fidgeting", label: "Does your child fidget? What does it look like and when does it happen most?", type: "text" },
      { id: "movement_seeking", label: "Does your child seek movement, spinning, rocking, bouncing, climbing, or avoid it?", type: "single-select", options: ["Seeks movement actively", "Avoids movement", "Both at different times", "Neither particularly"] },
      { id: "interoception", label: "Do they struggle to know when they are hungry, full, tired, or need the toilet until it becomes urgent?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "sensory_seeking", label: "Are there sensory inputs they actively seek, strong flavours, tight clothing, weighted blankets, loud music, intense physical activity?", type: "text" },
    ],
  },

  // Section 7: Executive Function and the Knowing-Doing Gap
  6: {
    framing:
      "Executive function is the set of mental skills that organise thought and action. Starting tasks. Switching between them. Holding information in mind while doing something else. Planning. Managing time. For many neurodivergent children these skills work differently. The most important thing to understand is this. Knowing what to do and being able to do it are completely separate things. A child can tell you exactly what they should be doing and still be completely unable to start. That is not defiance. That is executive function. It gets misread as laziness more than almost any other neurodivergent trait.",
    questions: [
      { id: "task_initiation", label: "Can your child start tasks independently or do they need a prompt, a person, or a specific condition to get going?", type: "text" },
      { id: "knowing_doing_gap", label: "Is there a gap between what they say they will do and what they actually do, not because they are being dishonest but because the intention and the action are not connecting?", type: "single-select", options: ["Yes, frequently", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "multi_step_instructions", label: "How do they manage with multi-step instructions?", type: "single-select", options: ["Manages well", "Struggles with more than two steps", "Struggles with any sequence", "It depends on the task"] },
      { id: "time_blindness", label: "Do they lose track of time, starting something and being genuinely surprised when they have run out of it?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "variable_ability", label: "Does their ability to do things vary significantly day to day, capable one day and seemingly unable the next?", type: "text" },
      { id: "procrastination", label: "Do they leave things to the last minute or not start at all, even for things they want to do?", type: "text" },
    ],
  },

  // Section 8: Sleep
  7: {
    framing:
      "Poor sleep does not just make children tired. It mimics ADHD. It mimics anxiety. It mimics emotional dysregulation and behaviour difficulty. A child who is chronically sleep-deprived is being assessed and judged on a version of themselves that is not their baseline. For neurodivergent children especially, sleep is not a lifestyle factor. It is a clinical variable.",
    questions: [
      { id: "sleep_onset", label: "How long does it take your child to fall asleep after going to bed?", type: "single-select", options: ["Under 15 minutes", "15 to 30 minutes", "30 minutes to an hour", "Over an hour", "It varies significantly"] },
      { id: "night_waking", label: "Do they wake in the night? How often and for how long?", type: "text" },
      { id: "bedtime_anxiety", label: "Do they seem anxious about going to bed or being in their room at night?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "sleep_hours", label: "How many hours of sleep are they actually getting on an average school night?", type: "text" },
      { id: "sleep_impact", label: "How do they seem on mornings after a good night compared to a bad one?", type: "text" },
      { id: "busy_mind", label: "Do they have a busy or active mind at bedtime, finding it hard to switch off?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
    ],
  },

  // Section 9: Dopamine Regulation
  8: {
    framing:
      "The neurodivergent brain is often running low on dopamine, the chemical that makes effort feel worthwhile, that makes time feel manageable, that connects action to reward. When that system is not working typically, children seek stimulation wherever they can find it. Screens. Risk. Movement. Conflict. Not because they are badly behaved. Because their brain is trying to regulate itself with whatever tools are available.",
    questions: [
      { id: "novelty_seeking", label: "Does your child seek novelty constantly, struggling to settle into routine activities?", type: "single-select", options: ["Yes, frequently", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "screen_removal", label: "How do they respond when screens or devices are taken away?", type: "text" },
      { id: "effortful_tasks", label: "Do they find it hard to start tasks that feel effortful or boring, even ones they are capable of?", type: "single-select", options: ["Yes, frequently", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "risk_taking", label: "Do they take physical risks that worry you?", type: "text" },
      { id: "stimulation_need", label: "Do they seem to need external excitement to function, constant stimulation, movement, or noise?", type: "text" },
    ],
  },

  // Section 10: Masking and the Cost of Compliance
  9: {
    framing:
      "Masking is performing neurotypicality in a world that expects it. It is learned, often very young, because being visibly different has consequences. The child who is fine at school and falls apart at home is not being manipulative. They are showing you the cost of the performance. The compliance you see in school is effort. The collapse you see at home is the bill. Both are real. The performance does not mean the need is not there. It means your child has learned to hide it, and that hiding is exhausting them.",
    questions: [
      { id: "school_home_difference", label: "Does your child behave very differently at school compared to at home?", type: "single-select", options: ["Yes, significantly different", "Somewhat different", "About the same", "School is harder than home"] },
      { id: "after_school_collapse", label: "Do they hold it together all day and fall apart when they are with you, crying, raging, or withdrawing?", type: "text" },
      { id: "post_school_exhaustion", label: "Does the exhaustion after school go beyond physical tiredness?", type: "single-select", options: ["Yes, they need significant time to recover", "Sometimes", "Rarely", "They seem fine after school"] },
      { id: "teacher_discrepancy", label: "Have teachers described your child as fine or no problem while your experience at home is significantly different?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Teachers reflect what we see at home"] },
      { id: "suppressed_distress", label: "Do they suppress signs of distress in public and express them intensely at home?", type: "text" },
      { id: "compliance_avoidance", label: "Do they agree to things they do not want to do because saying no feels too risky?", type: "single-select", options: ["Yes, frequently", "Sometimes", "Rarely", "Not that I have noticed"] },
    ],
  },
};
