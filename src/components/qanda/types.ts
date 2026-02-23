import { 
  ConfidenceLevel, 
  checkRefusalRequired, 
  checkSensitiveTopic,
} from "@/config/guardrails";

// Re-export the centralized confidence type
export type { ConfidenceLevel };

// Structured answer format - every answer must follow this structure
export interface QandAAnswer {
  // 1. Plain English answer (max 6 short paragraphs or bullet points)
  plainAnswer: string[];
  
  // 2. Confidence label
  confidence: ConfidenceLevel;
  
  // 3. What we know (bullet points, fact-based only)
  whatWeKnow: string[];
  
  // 4. What we do not know yet (explicit uncertainty)
  whatWeDoNotKnow: string[];
  
  // 5. What this does and does not mean
  clarifications: {
    doesMean: string[];
    doesNotMean: string[];
  };
  
  // 6. Where to read more (internal links only)
  readMore: Array<{
    label: string;
    path: string;
  }>;
  
  // 7. Last updated
  lastUpdated: string;
}

// Refusal response for questions that cannot be answered safely
export interface QandARefusal {
  type: "refusal";
  reason: string;
  suggestion: string;
  category?: string;
  readMore: Array<{
    label: string;
    path: string;
  }>;
}

// Combined response type
export type QandAResponse = 
  | { type: "answer"; data: QandAAnswer }
  | QandARefusal;

// Example questions to help users
export const exampleQuestions = [
  "What are Individual Support Plans and will they replace EHCPs?",
  "What does the white paper mean for my child today?",
  "Is my child's EHCP safe?",
  "What is the Experts at Hand programme?",
];

// Check if a question requires refusal - now uses centralized guardrails
export function checkForRefusal(question: string): QandARefusal | null {
  const { shouldRefuse, reason, category } = checkRefusalRequired(question);
  
  if (shouldRefuse && reason) {
    // Map refusal category to appropriate redirect pages
    const redirectPages: Record<string, Array<{ label: string; path: string }>> = {
      legalAdvice: [
        { label: "About this resource", path: "/about" },
        { label: "Sources and how to read them", path: "/sources" },
      ],
      individualCases: [
        { label: "Where we are now", path: "/where-we-are-now" },
        { label: "What this could mean", path: "/what-this-could-mean" },
      ],
      speculation: [
        { label: "What is changing", path: "/what-is-changing" },
        { label: "What the leaks are saying", path: "/what-the-leaks-are-saying" },
      ],
      predictions: [
        { label: "Timeline and next steps", path: "/timeline" },
        { label: "What is changing", path: "/what-is-changing" },
      ],
    };

    return {
      type: "refusal",
      reason,
      category,
      suggestion: category === "legalAdvice" 
        ? "For legal advice about your specific circumstances, please consult a qualified professional such as a solicitor specialising in education law, or contact a SEND advice service."
        : "For support with your specific situation, please seek advice from a SEND information service or specialist professional.",
      readMore: redirectPages[category || "legalAdvice"] || redirectPages.legalAdvice,
    };
  }
  
  return null;
}

// Check if question relates to leaks/unconfirmed information
export function isLeaksRelated(question: string): boolean {
  const leakTerms = [
    "leak", "rumour", "rumor", "heard that", "is it true", 
    "media report", "newspaper", "briefing", "sources say",
    "unconfirmed", "proposed", "might", "could they"
  ];
  return leakTerms.some(term => question.toLowerCase().includes(term));
}

// Check if question relates to sensitive topics
export function isSensitiveTopic(question: string): {
  isSensitive: boolean;
  requirements: string[];
} {
  return checkSensitiveTopic(question);
}

// Confidence label display text
export const confidenceLabels: Record<ConfidenceLevel, string> = {
  confirmed: "Confirmed",
  discussed: "Being discussed or reported",
  unconfirmed: "Unconfirmed or leaked",
  unknown: "Unknown",
};
