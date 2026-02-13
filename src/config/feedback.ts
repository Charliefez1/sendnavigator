/**
 * SEND Reform Navigator - Feedback and Moderation Configuration
 * 
 * Defines feedback collection, moderation rules, and trust signals.
 */

// =============================================================================
// FEEDBACK TYPES
// =============================================================================

export type PassiveFeedbackType = "clear" | "unclear";

export type ActiveFeedbackCategory = 
  | "error"           // Flag potential errors
  | "clarification"   // Request clarification
  | "source"          // Suggest additional sources
  | "missing";        // Something important is missing

export interface PassiveFeedback {
  type: PassiveFeedbackType;
  comment?: string; // Optional short text
  pageUrl: string;
  timestamp: string;
}

export interface ActiveFeedback {
  category: ActiveFeedbackCategory;
  description: string; // Structured, not long narratives
  pageUrl: string;
  timestamp: string;
  status: "pending" | "reviewed" | "actioned" | "declined";
}

// =============================================================================
// FEEDBACK CATEGORY DEFINITIONS
// =============================================================================

export const feedbackCategories: Record<ActiveFeedbackCategory, {
  label: string;
  description: string;
  placeholder: string;
  maxLength: number;
}> = {
  error: {
    label: "Flag a potential error",
    description: "Information that may be incorrect or outdated",
    placeholder: "Briefly describe what appears to be incorrect and why (e.g., 'The date mentioned is wrong - the announcement was March 2023, not 2022')",
    maxLength: 500,
  },
  clarification: {
    label: "Request clarification",
    description: "Something is unclear or could be explained better",
    placeholder: "Briefly describe what is unclear (e.g., 'The section about timelines doesn't explain what happens next')",
    maxLength: 500,
  },
  source: {
    label: "Suggest a source",
    description: "A credible source that should be considered",
    placeholder: "Describe the source and why it's relevant (e.g., 'The DfE published new guidance on X date at X link')",
    maxLength: 500,
  },
  missing: {
    label: "Something is missing",
    description: "Important information or context that should be included",
    placeholder: "Briefly describe what is missing (e.g., 'There is no mention of how this affects post-16 provision')",
    maxLength: 500,
  },
};

// =============================================================================
// MODERATION RULES
// =============================================================================

export const moderationRules = {
  reviewedBy: "Editorial owner",
  autoPublish: false, // Never auto-publish
  
  priorities: [
    "Factual accuracy",
    "Clarity",
    "Tone and accessibility",
    "Balance",
  ],
  
  noResponseRequired: [
    "Abusive content",
    "Repetitive submissions",
    "Clearly agenda-driven content",
    "Personal case details",
  ],
  
  responseExpectations: {
    acknowledge: true,
    explainReview: true,
    updateOnlyAfterVerification: true,
    neverPromiseOutcomes: true,
  },
};

// =============================================================================
// TRUST SIGNALS
// =============================================================================

export const trustSignals = {
  currency: {
    showLastUpdated: true,
    showRecentActivity: true,
  },
  
  transparency: {
    howInformationChosen: "Information is selected from government sources, legislation, parliamentary records, and established media. We verify sources and cross-reference claims before publication.",
    howDisagreementHandled: "When credible sources disagree, we present both positions and explain the disagreement. We do not resolve disagreement by omission.",
    howCorrectionsWork: "Errors are corrected promptly, with the date updated and reason stated. Prior information is not silently removed.",
  },
  
  limits: {
    notLegalAdvice: "This resource does not provide legal advice",
    notIndividualAdvice: "This resource cannot comment on individual cases",
    notCampaigning: "This resource does not campaign or advocate",
    notReplacementForProfessional: "This resource does not replace professional support",
  },
};

// =============================================================================
// SEND AI TRUST SIGNALS
// =============================================================================

export const aiTrustSignals = {
  labelling: "Answers are generated using SEND AI.",
  grounding: "Answers are based on the content of this resource only.",
  uncertaintyHandling: "If information is incomplete or uncertain, the answer will say so clearly.",
  refusalExplanation: "SEND AI will not answer questions about individual cases, give legal advice, or make predictions.",
  noTechnicalJargon: true,
};

// =============================================================================
// ESCALATION TRIGGERS
// =============================================================================

export const escalationTriggers = [
  "Widespread misunderstanding indicated by multiple similar feedback",
  "Repeated confusion about the same topic",
  "Emotional distress triggered by content framing",
];

export const escalationActions = [
  "Review tone and framing",
  "Consider additional clarification",
  "Adjust summaries without changing facts",
  "Prioritise clarity over avoidance",
];

// =============================================================================
// VALIDATION
// =============================================================================

export function validateFeedback(description: string, category: ActiveFeedbackCategory): {
  valid: boolean;
  error?: string;
} {
  const config = feedbackCategories[category];
  
  if (!description.trim()) {
    return { valid: false, error: "Please provide a description" };
  }
  
  if (description.length > config.maxLength) {
    return { valid: false, error: `Description must be under ${config.maxLength} characters` };
  }
  
  // Check for personal case details
  const personalIndicators = [
    "my child", "my son", "my daughter", "our school", "my local authority",
    "my ehcp", "our case", "my situation", "in my area", "our family"
  ];
  
  if (personalIndicators.some(term => description.toLowerCase().includes(term))) {
    return { 
      valid: false, 
      error: "Please do not include personal case details. This feedback form is for general improvements only." 
    };
  }
  
  return { valid: true };
}
