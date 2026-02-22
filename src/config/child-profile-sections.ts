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
};
