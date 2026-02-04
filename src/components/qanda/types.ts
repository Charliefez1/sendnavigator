import { Link } from "react-router-dom";

// Confidence levels for answers
export type ConfidenceLevel = "confirmed" | "discussed" | "unconfirmed" | "unknown";

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
  "Are EHCPs being removed?",
  "What do the SEND reform leaks mean?",
  "What is confirmed and what is not?",
  "When will changes actually happen?",
];

// Topics that require refusal
export const refusalTopics = {
  legalAdvice: [
    "should i", "can i sue", "my rights", "legal action", "tribunal", 
    "appeal", "complaint", "lawyer", "solicitor"
  ],
  individualCases: [
    "my child", "my son", "my daughter", "our school", "my local authority",
    "my ehcp", "our case", "my situation"
  ],
  predictions: [
    "will definitely", "guarantee", "promise", "certain to"
  ],
};

// Check if a question requires refusal
export function checkForRefusal(question: string): QandARefusal | null {
  const lowerQuestion = question.toLowerCase();
  
  // Check for legal advice requests
  if (refusalTopics.legalAdvice.some(term => lowerQuestion.includes(term))) {
    return {
      type: "refusal",
      reason: "This resource cannot provide legal advice about individual situations.",
      suggestion: "For legal advice about your specific circumstances, please consult a qualified professional such as a solicitor specialising in education law, or contact a SEND advice service.",
      readMore: [
        { label: "About this resource", path: "/about" },
        { label: "Sources and how to read them", path: "/sources" },
      ],
    };
  }
  
  // Check for individual case details
  if (refusalTopics.individualCases.some(term => lowerQuestion.includes(term))) {
    return {
      type: "refusal",
      reason: "This resource provides general information about SEND policy. It cannot comment on individual cases or provide personalised guidance.",
      suggestion: "For support with your specific situation, please seek advice from a SEND information service or specialist professional.",
      readMore: [
        { label: "Where we are now", path: "/where-we-are-now" },
        { label: "What this could mean", path: "/what-this-could-mean" },
      ],
    };
  }
  
  return null;
}

// Check if question relates to leaks/unconfirmed information
export function isLeaksRelated(question: string): boolean {
  const leakTerms = [
    "leak", "rumour", "rumor", "heard that", "is it true", 
    "media report", "newspaper", "briefing", "sources say"
  ];
  return leakTerms.some(term => question.toLowerCase().includes(term));
}

// Confidence label display text
export const confidenceLabels: Record<ConfidenceLevel, string> = {
  confirmed: "Confirmed",
  discussed: "Being discussed or reported",
  unconfirmed: "Unconfirmed or leaked",
  unknown: "Unknown",
};
