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

  // Section 11: Communication and Social Understanding
  10: {
    framing:
      "Communication is not just language. It includes reading a room, understanding what is meant rather than what is said, navigating the unspoken rules of social situations, and knowing when a joke has gone too far. Many neurodivergent children have strong language skills but find the social communication layer a separate challenge entirely. The child who speaks fluently but cannot read the social situation is frequently misread as rude or deliberately awkward. They are neither. They are navigating a set of unwritten rules nobody ever explained to them.",
    questions: [
      { id: "response_time", label: "Does your child take longer than expected to respond to questions or instructions?", type: "single-select", options: ["Yes, noticeably", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "literal_language", label: "Do they take language very literally, missing sarcasm, figures of speech, or implied meaning?", type: "text" },
      { id: "expressing_feelings", label: "Can they tell you how they are feeling, or do feelings come out in ways other than words?", type: "text" },
      { id: "reading_emotions", label: "Do they struggle to read other people's emotional states from their face, tone, or body language?", type: "single-select", options: ["Yes, clearly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "social_cues", label: "Do they sometimes miss social cues, not realising a conversation has ended, not noticing someone is bored or uncomfortable?", type: "text" },
      { id: "social_misunderstanding", label: "Have they been in social situations that went wrong and they genuinely did not understand why?", type: "text" },
    ],
  },

  // Section 12: Behaviour
  11: {
    framing:
      "Behaviour is always communication. Always. The question is never just what happened. It is what was happening before it, what the child was trying to achieve or avoid, and what the adult response communicated back. Understanding the pattern is more useful than managing the incident.",
    questions: [
      { id: "recent_incident", label: "Describe a recent difficult behaviour incident. What happened?", type: "text-large" },
      { id: "before_incident", label: "What was happening in the hour before it?", type: "text" },
      { id: "child_intent", label: "What do you think your child was trying to communicate or achieve?", type: "text" },
      { id: "behaviour_patterns", label: "Does the same behaviour happen at the same times of day, in the same lessons, or with the same people?", type: "text" },
      { id: "adult_response", label: "How do adults around your child typically respond when behaviour is difficult? Does it help?", type: "text" },
      { id: "makes_sense_to_you", label: "Is there a behaviour that school finds difficult but that makes complete sense to you as a parent? Describe it.", type: "text" },
    ],
  },

  // Section 13: Identity and Self Concept
  12: {
    framing:
      "How a child understands themselves, whether they feel different, whether they know why, whether they carry shame about it, is one of the strongest predictors of long term wellbeing. A child who understands their own brain is in a fundamentally different position to one who has simply been told they are difficult.",
    questions: [
      { id: "awareness_of_difference", label: "Does your child seem aware that they experience things differently to other children?", type: "single-select", options: ["Yes, clearly aware", "Vaguely aware", "Does not seem aware", "Aware but does not have language for it"] },
      { id: "shame_frustration", label: "Do they express shame, embarrassment, or frustration about who they are?", type: "text" },
      { id: "strengths_belief", label: "Do they know what they are good at? Do they believe it?", type: "text" },
      { id: "belonging", label: "Do they feel like they belong, in their class, their friendship group, their family?", type: "text" },
      { id: "self_talk", label: "How do they talk about themselves? What words do they use?", type: "text" },
    ],
  },

  // Section 14: Strength Profile
  13: {
    framing:
      "Every assessment, every referral, every meeting tends to focus on what is not working. This section is different. A profile without strengths is an incomplete picture. A child whose strengths are named and known has something to build from. This section matters as much as any other in this document.",
    questions: [
      { id: "genuine_strengths", label: "What is your child genuinely good at? Not what they should be good at. What do they actually do well?", type: "text-large" },
      { id: "deep_focus", label: "Where do they show deep focus or unusual ability?", type: "text" },
      { id: "lights_them_up", label: "What lights them up? What do they return to again and again?", type: "text" },
      { id: "others_notice", label: "What do other people, teachers, family, friends, say they notice about your child's abilities?", type: "text" },
      { id: "unrecognised_strength", label: "What strength do you think goes most unrecognised in the school context?", type: "text" },
    ],
  },

  // Section 15: Developmental History
  14: {
    framing:
      "Context prevents misinterpretation. A child's early history, how they developed, what their first years looked like, what was straightforward and what was not, gives professionals the frame they need to understand what they are seeing now. Without it they are guessing. You do not need to have all the answers here. Write down what you know.",
    questions: [
      { id: "early_concerns", label: "Were there any concerns in the early years, speech, movement, feeding, sleep, or social development?", type: "text" },
      { id: "language_development", label: "When did your child start talking? Was language development straightforward?", type: "text" },
      { id: "early_play", label: "How did they play as a young child, independently, with others, in structured or imaginative ways?", type: "text" },
      { id: "early_medical", label: "Were there any significant medical events in the early years?", type: "text" },
      { id: "early_concerns_raised", label: "Were any early concerns raised by health visitors, nursery staff, or a GP?", type: "text" },
    ],
  },

  // Section 16: Family System
  15: {
    framing:
      "Children regulate through the adults around them. That is not a judgement of parents. It is neuroscience. A family under significant stress, dealing with its own neurodivergence, financial pressure, or relational difficulty, is doing something extraordinary just by holding together. Understanding the wider system a child is living in helps professionals see the full picture rather than a fragment of it.",
    questions: [
      { id: "stress_level", label: "What is the stress level in your household at the moment, honestly?", type: "single-select", options: ["Generally manageable", "Elevated but coping", "Significantly high", "Crisis point"] },
      { id: "family_neurodivergence", label: "Is there neurodivergence in the family, diagnosed or undiagnosed, in parents, siblings, or wider family?", type: "text" },
      { id: "child_awareness_pressures", label: "Is your child aware of pressures in the family? How do they respond to them?", type: "text" },
      { id: "support_network", label: "What does your support network look like? Who helps?", type: "text" },
      { id: "family_context", label: "Is there anything about the family context you would want a professional to understand before meeting your child?", type: "text" },
    ],
  },

  // Section 17: Physical Health
  16: {
    framing:
      "Several common and easily treatable physical conditions can produce symptoms that look like ADHD, anxiety, emotional dysregulation, or behaviour difficulty. Before drawing conclusions about a child's needs it is worth knowing whether the physical picture has been looked at carefully.",
    questions: [
      { id: "blood_tests", label: "Has your child had recent blood tests? Have iron, vitamin D, or thyroid levels been checked?", type: "single-select", options: ["Yes, recently checked", "Not recently", "Never checked", "Not sure"] },
      { id: "chronic_conditions", label: "Do they have any chronic health conditions that affect their daily functioning?", type: "text" },
      { id: "puberty_hormones", label: "Are they going through puberty? Have hormonal changes coincided with any change in behaviour or mood?", type: "text" },
      { id: "ongoing_pain", label: "Do they have any ongoing pain, discomfort, or health issues that are not fully managed?", type: "text" },
      { id: "vision_hearing", label: "When did they last have a vision and hearing check?", type: "single-select", options: ["Within the last year", "One to two years ago", "More than two years ago", "Never had one", "Not sure"] },
    ],
  },

  // Section 18: School Fit vs Child Deficit
  17: {
    framing:
      "Sometimes a child is referred for assessment because the school has not found a way to include them. That is a system problem, not a child problem. It does not mean the child does not have needs. But it changes the question from what is wrong with my child to what has not been tried yet. Both questions matter.",
    questions: [
      { id: "adjustments_tried", label: "Has the school tried specific adjustments for your child? What were they and did they make a difference?", type: "text" },
      { id: "adjustments_followed_through", label: "Have adjustments been properly followed through, or suggested once and not seen again?", type: "single-select", options: ["Properly implemented and followed through", "Suggested but inconsistently applied", "Suggested once and not followed up", "No adjustments have been tried"] },
      { id: "school_clarity", label: "Has the school been clear about what they can and cannot offer your child?", type: "single-select", options: ["Yes, clearly", "Vaguely", "No, not at all", "The conversation has not happened"] },
      { id: "assessment_motivation", label: "Does it feel like the school wants an assessment to help your child or to access additional resource to manage them?", type: "single-select", options: ["To genuinely help my child", "Mainly to access resource", "Both", "Not sure"] },
      { id: "child_voice", label: "Has your child been given the opportunity to say what would help them?", type: "single-select", options: ["Yes, and it was listened to", "Yes, but it did not change anything", "No"] },
    ],
  },

  // Section 19: Time, Transitions, and Future Blindness
  18: {
    framing:
      "Time blindness is not a metaphor. For many neurodivergent children time does not feel the way it does for others. There is now, and there is not now. The future is abstract, not because the child is immature, but because the brain does not automatically project forward in time the way others do. This makes transitions, deadlines, and preparation genuinely difficult in ways that look like laziness or not caring. They are neither.",
    questions: [
      { id: "time_management", label: "Does your child struggle to manage time, consistently late, always surprised when something ends?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "transition_difficulty", label: "Do transitions, ending one thing and starting another, cause significant difficulty?", type: "single-select", options: ["Yes, almost always", "Sometimes", "Rarely", "It depends on what they are transitioning from"] },
      { id: "change_warning", label: "Do they need significant warning and preparation before a change happens, even a small one?", type: "single-select", options: ["Yes, always", "Usually", "Sometimes", "Rarely"] },
      { id: "school_day_rhythm", label: "Does the school day rhythm, bells, lesson changes, lunch, assembly, seem to dysregulate them at predictable points?", type: "text" },
      { id: "future_preparation", label: "Do they find it hard to prepare for something coming up, even something they are looking forward to?", type: "text" },
    ],
  },

  // Section 20: Demand Avoidance, Autonomy, and Reactions to Authority
  19: {
    framing:
      "Demand avoidance is not defiance. It is an anxiety response. For some neurodivergent children demands, including gentle ones and well intentioned ones, trigger an overwhelming sense of threat. The avoidance that follows is not a choice. It is the nervous system responding to perceived loss of control. Increasing pressure typically increases avoidance. Reducing demand and increasing autonomy typically reduces it.",
    questions: [
      { id: "demand_avoidance", label: "Does your child avoid or resist demands that other children their age manage without difficulty?", type: "single-select", options: ["Yes, frequently", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "resistance_to_wanted", label: "Does the resistance apply to things they want to do as well as things they do not, suggesting it is the demand itself rather than the task?", type: "single-select", options: ["Yes, frequently", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "choices_vs_instructions", label: "Do they respond better to requests framed as choices or invitations than to direct instructions?", type: "single-select", options: ["Yes, significantly better", "Slightly better", "About the same", "Not sure"] },
      { id: "reaction_to_authority", label: "Do they react intensely to being told what to do, corrected, or redirected by adults?", type: "text" },
      { id: "control_environment", label: "Is there a difference between how they respond to high control and low control environments?", type: "text" },
    ],
  },

  // Section 21: Hyperfocus, Interest-Based Motivation, and Zoning Out
  20: {
    framing:
      "The neurodivergent brain is often described as having an attention problem. That is only half the picture. The same brain that cannot sustain attention on low interest tasks can hyperfocus on high interest ones with extraordinary intensity, losing track of time, physical needs, and everything else around them. Zoning out is the other side. Not daydreaming in a casual sense. A genuine departure from the present where the child has left the room in every sense except physically.",
    questions: [
      { id: "hyperfocus_subject", label: "Is there a subject, topic, game, or activity your child can focus on for hours without any difficulty?", type: "text" },
      { id: "hyperfocus_problems", label: "Does hyperfocus cause practical problems, losing track of time, missing meals, not hearing when spoken to?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "interest_driven_focus", label: "Does the level of focus available to them vary dramatically depending on interest level?", type: "single-select", options: ["Yes, dramatically", "Somewhat", "Not particularly"] },
      { id: "zoning_out", label: "Do they zone out, switch off, go absent, in certain environments or at certain times?", type: "text" },
      { id: "interrupted_hyperfocus", label: "How do they respond when interrupted during hyperfocus?", type: "single-select", options: ["Very distressed, significant reaction", "Frustrated but manageable", "Generally fine", "It depends"] },
    ],
  },

  // Section 22: Emotional Intensity, Anger, and Rejection Sensitivity
  21: {
    framing:
      "Many neurodivergent children experience emotions at a higher intensity than the people around them. Not because they are immature or dramatic. Because the emotional system is calibrated differently. Rejection sensitivity is one of the most significant and least recognised neurodivergent experiences. It is an intense emotional response to perceived criticism, failure, or rejection. The word perceived matters. The rejection does not have to be real. A teacher's neutral tone can land as disapproval. A friend not replying quickly can land as abandonment. From the outside the response looks disproportionate. From the inside it does not feel disproportionate at all.",
    questions: [
      { id: "emotional_intensity", label: "Does your child experience emotions intensely, feeling things more strongly or for longer than seems typical?", type: "single-select", options: ["Yes, clearly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "anger_speed", label: "Does their anger arrive very quickly with little apparent warning?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "reaction_to_criticism", label: "Do they react intensely to criticism, correction, or perceived failure, even mild well intentioned feedback?", type: "text" },
      { id: "perceived_rejection", label: "Do they interpret neutral or ambiguous situations as rejection or disapproval?", type: "text" },
      { id: "emotional_carrying", label: "Do they carry emotional events for a long time, replaying them, staying hurt, bringing them back up days or weeks later?", type: "single-select", options: ["Yes, regularly", "Sometimes", "Rarely", "Not that I have noticed"] },
      { id: "anger_preceded_by", label: "Is their anger almost always preceded by something that felt like rejection, shame, or loss of control?", type: "text" },
    ],
  },
};
