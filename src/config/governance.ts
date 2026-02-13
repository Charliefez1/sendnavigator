/**
 * SEND Reform Navigator - Governance and Editorial Accountability
 * 
 * Core Principle: Independent, transparent, accountable, consistent.
 * No single voice, opinion, or source should dominate.
 */

// =============================================================================
// EDITORIAL OWNERSHIP
// =============================================================================

export interface EditorialOwner {
  role: string;
  responsibilities: string[];
}

export interface EditorialTeam {
  owner: EditorialOwner;
  reviewers?: EditorialOwner[];
  lastReviewDate: string;
}

export const editorialOwnership: EditorialTeam = {
  owner: {
    role: "Editorial Lead",
    responsibilities: [
      "Verifying sources before publication",
      "Categorising information correctly (confirmed, discussed, unconfirmed)",
      "Ensuring balance across perspectives",
      "Maintaining tone and accessibility standards",
      "Approving corrections and updates",
    ],
  },
  lastReviewDate: "7th February 2026",
};

// =============================================================================
// DECISION MAKING RULES
// =============================================================================

export const decisionMakingRules = {
  newInformation: {
    priority: "Accuracy over speed",
    requirement: "Confirmation must come before publication",
    interpretationRule: "Interpretation must be labelled as such",
  },
  conflictingSources: {
    approach: "Both credible positions should be represented",
    explanation: "Disagreement should be explained in plain English",
    reasoning: "Reason for disagreement should be stated where known",
    prohibition: "Do not resolve disagreement by omission",
  },
};

// =============================================================================
// BALANCE AND REPRESENTATION
// =============================================================================

export const representedPerspectives = [
  "Parents and carers",
  "Schools and teachers",
  "Local authorities",
  "Health and therapy professionals",
  "Young people with SEND",
];

export const balanceRules = {
  noPerspectivePrivileged: "Avoid privileging one group's interpretation as default",
  distinguishExperience: "Clearly distinguish lived experience from policy fact",
  accuracyOverNeutrality: "Balance does not mean neutrality on accuracy",
  noFalseEquivalence: "Incorrect information must not be presented as a valid alternative view",
};

// =============================================================================
// SENSITIVE TOPICS HANDLING
// =============================================================================

export const sensitiveTopicCategories = [
  "Removal or restriction of rights",
  "Eligibility thresholds",
  "Funding reductions",
  "Access to specialist provision",
];

export const sensitiveTopicRules = {
  prioritiseClarity: true,
  avoidEmotiveFraming: true,
  stateCurrentLegalPositionFirst: true,
  clearlyLabelProposalsOrSpeculation: true,
};

// =============================================================================
// FEEDBACK AND CHALLENGE
// =============================================================================

export type FeedbackType = "error" | "clarification" | "missing_context" | "other";

export interface FeedbackSubmission {
  type: FeedbackType;
  description: string;
  pageUrl?: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "actioned" | "declined";
}

export const feedbackRules = {
  reviewedBy: "Editorial owner",
  noImmediateChanges: "Changes require verification before implementation",
  acknowledgement: "Feedback acknowledged where appropriate",
  transparency: "Significant feedback may be referenced in corrections",
};

export const feedbackTypes: Record<FeedbackType, { label: string; description: string }> = {
  error: {
    label: "Potential error",
    description: "Information that may be incorrect or outdated",
  },
  clarification: {
    label: "Request clarification",
    description: "Something is unclear or could be explained better",
  },
  missing_context: {
    label: "Missing context",
    description: "Important information or perspective that should be included",
  },
  other: {
    label: "Other feedback",
    description: "General feedback about the resource",
  },
};

// =============================================================================
// CORRECTIONS AND ACCOUNTABILITY
// =============================================================================

export interface CorrectionRecord {
  date: string;
  description: string;
  reason: string;
  pagesAffected: string[];
  priorInformationRetained: boolean;
}

export const correctionRules = {
  mustBeVisible: true,
  dateMustUpdate: true,
  reasonMustBeStated: true,
  noSilentRemoval: true,
  transparencyOverReputation: true,
};

// =============================================================================
// INDEPENDENCE SAFEGUARDS
// =============================================================================

export const independenceSafeguards = {
  discloseFunding: "Funding or organisational relationships disclosed if relevant",
  noPoliticalAlignment: "Avoid alignment with political campaigns",
  noInfluencingSponsorship: "Avoid sponsorship that could influence content",
  partnershipPrinciples: "Any partnerships must respect founding principles",
};

export const currentDisclosures = {
  funding: "This resource is independently maintained with no external funding.",
  affiliations: "SEND Reform Navigator is not affiliated with any political party, campaign group, or commercial organisation.",
  partnerships: "No partnerships are currently in place.",
};

// =============================================================================
// SEND AI GOVERNANCE (FORWARD COMPATIBILITY)
// =============================================================================

export const aiGovernanceRules = {
  subjectToEditorialGovernance: true,
  doesNotReplaceEditorialJudgement: true,
  aiErrorsTreatedAsEditorialErrors: true,
  responsibilityRemainsHuman: true,
};

// =============================================================================
// REVIEW AND AUDIT
// =============================================================================

export type ReviewType = "accuracy" | "tone_accessibility" | "balance_representation" | "governance";

export interface ReviewSchedule {
  type: ReviewType;
  frequency: string;
  lastCompleted?: string;
  nextDue?: string;
}

export const reviewSchedule: ReviewSchedule[] = [
  {
    type: "accuracy",
    frequency: "Monthly",
    lastCompleted: "February 2026",
    nextDue: "March 2026",
  },
  {
    type: "tone_accessibility",
    frequency: "Quarterly",
    lastCompleted: "January 2026",
    nextDue: "April 2026",
  },
  {
    type: "balance_representation",
    frequency: "Quarterly",
    lastCompleted: "January 2026",
    nextDue: "April 2026",
  },
  {
    type: "governance",
    frequency: "When policy landscape materially changes",
    lastCompleted: "February 2026",
  },
];

export const reviewTypeLabels: Record<ReviewType, string> = {
  accuracy: "Content accuracy review",
  tone_accessibility: "Tone and accessibility review",
  balance_representation: "Balance and representation review",
  governance: "Governance rules review",
};
