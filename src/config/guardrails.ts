/**
 * SEND Reform Navigator - Guardrails and Grounding Rules
 * 
 * Core Principle: Accuracy, clarity, and honesty over completeness or speed.
 * If something cannot be stated with confidence, uncertainty must be explicit.
 */

// =============================================================================
// CONFIDENCE LEVELS
// =============================================================================

export type ConfidenceLevel = "confirmed" | "discussed" | "unconfirmed" | "unknown";

export const confidenceLevelDefinitions: Record<ConfidenceLevel, {
  label: string;
  description: string;
  sourceRequirement: string;
}> = {
  confirmed: {
    label: "Confirmed",
    description: "Official policy, law, or statistics that have been formally announced or legislated.",
    sourceRequirement: "Primary government sources, legislation, or official announcements required.",
  },
  discussed: {
    label: "Being discussed or reported",
    description: "Proposals being considered, reported in credible sources, or under consultation.",
    sourceRequirement: "Established media, parliamentary sources, or official sector briefings required.",
  },
  unconfirmed: {
    label: "Unconfirmed or leaked",
    description: "Leaked information or speculation. Not decided policy. May never happen.",
    sourceRequirement: "Must meet leak handling criteria. Always include context about what would need to happen.",
  },
  unknown: {
    label: "Unknown",
    description: "Information is incomplete or decisions have not yet been made.",
    sourceRequirement: "Must explicitly state what is not known rather than omitting.",
  },
};

// =============================================================================
// SOURCE TYPES AND VALIDATION
// =============================================================================

export type AcceptedSourceType =
  | "government_primary"      // Legislation, statutory guidance, GOV.UK, DfE data
  | "parliamentary"           // Select committees, Hansard, official briefings
  | "public_body"             // LGA, Ofsted, NHS England
  | "established_media"       // National media with education reporting track record
  | "sector_briefing";        // Reputable legal or education sector briefings

export type DisallowedSourceType =
  | "anonymous_social"        // Anonymous social media posts
  | "opinion_blog"            // Opinion blogs without evidence
  | "single_source_rumour"    // Single source rumours
  | "advocacy_as_fact";       // Advocacy content presented as fact

export interface SourceReference {
  type: AcceptedSourceType;
  name: string;
  url?: string;
  dateAccessed: string;
  datePublished?: string;
  notes?: string;
}

export const acceptedSourceDescriptions: Record<AcceptedSourceType, {
  description: string;
  examples: string[];
}> = {
  government_primary: {
    description: "Primary government sources including legislation and official publications",
    examples: [
      "Children and Families Act 2014",
      "SEND Code of Practice 2015",
      "GOV.UK policy announcements",
      "Department for Education data and statistics",
    ],
  },
  parliamentary: {
    description: "Parliamentary sources and official records",
    examples: [
      "Education Select Committee reports",
      "Hansard records",
      "Official parliamentary briefings",
      "House of Commons Library research",
    ],
  },
  public_body: {
    description: "Recognised public bodies with statutory roles",
    examples: [
      "Local Government Association",
      "Ofsted",
      "NHS England",
      "Children's Commissioner",
    ],
  },
  established_media: {
    description: "National media with a track record of education reporting",
    examples: [
      "BBC News",
      "The Guardian (Education)",
      "Schools Week",
      "TES (Times Educational Supplement)",
    ],
  },
  sector_briefing: {
    description: "Reputable legal or education sector briefings",
    examples: [
      "IPSEA guidance",
      "Council for Disabled Children",
      "National Network of Parent Carer Forums",
      "Education law firm briefings",
    ],
  },
};

// =============================================================================
// ADHDi GROUNDING RULES
// =============================================================================

export const aiGroundingRules = {
  // Rule 1: Source Bound
  sourceBound: {
    rule: "ADHDi may only answer using information contained within SEND Reform Navigator's curated content.",
    enforcement: "No external knowledge may be introduced.",
  },

  // Rule 2: Respect Confidence Labels
  respectConfidence: {
    rule: "ADHDi must preserve and surface the correct confidence category for all information.",
    enforcement: "Every factual claim must include its confidence level.",
  },

  // Rule 3: Refusal Requirements
  refusalTopics: {
    legalAdvice: {
      description: "Requests for legal advice about specific situations",
      triggerTerms: [
        "should i", "can i sue", "my rights", "legal action", "tribunal",
        "appeal", "complaint", "lawyer", "solicitor", "judicial review",
        "do i have a case", "what are my options"
      ],
      response: "This resource cannot provide legal advice. For advice about your specific situation, please consult a qualified professional.",
    },
    individualCases: {
      description: "Comments on individual circumstances",
      triggerTerms: [
        "my child", "my son", "my daughter", "our school", "my local authority",
        "my ehcp", "our case", "my situation", "in my area", "our family"
      ],
      response: "This resource provides general information about SEND policy. It cannot comment on individual cases.",
    },
    speculation: {
      description: "Speculation beyond available information",
      triggerTerms: [
        "will definitely", "guarantee", "promise", "certain to",
        "predict", "forecast", "when exactly"
      ],
      response: "This resource does not speculate or make predictions. We can only explain what is currently known.",
    },
    predictions: {
      description: "Predictions about outcomes or timelines",
      triggerTerms: [
        "how long", "when will", "by when", "deadline", "exact date",
        "definitely happen", "will they", "are they going to"
      ],
      response: "We cannot predict timelines or outcomes. We can explain confirmed milestones and what is currently unknown.",
    },
  },

  // Rule 4: Uncertainty Handling
  uncertaintyHandling: {
    incomplete: "If information is incomplete, this must be stated explicitly.",
    disagreement: "If multiple credible views exist, ADHDi must explain that disagreement exists.",
    unknown: "If something is unknown, say 'This is not yet known' rather than omitting.",
  },

  // Rule 5: Language Rules
  languageRules: {
    noReassurance: "No reassurance without evidence",
    noFear: "No fear-based framing",
    noAction: "No encouragement to take action beyond learning and understanding",
    neutralTone: "Calm, measured, factual at all times",
  },
};

// =============================================================================
// SENSITIVE QUESTION HANDLING
// =============================================================================

export const sensitiveTopics = {
  lossOfRights: {
    triggerTerms: ["losing rights", "remove rights", "take away", "no longer entitled"],
    responseRequirements: [
      "State the current legal position clearly",
      "Distinguish between confirmed changes and proposals",
      "Explain what would need to happen for change to occur",
      "Avoid implying inevitability",
    ],
  },
  removalOfSupport: {
    triggerTerms: ["remove ehcp", "end support", "stop funding", "cut provision", "take away support"],
    responseRequirements: [
      "State current legal protections",
      "Distinguish confirmed from unconfirmed",
      "Explain consultation and legislation requirements",
      "State what protections remain in place today",
    ],
  },
  eligibilityThresholds: {
    triggerTerms: ["eligibility", "threshold", "qualify", "criteria", "who can get"],
    responseRequirements: [
      "State current eligibility rules clearly",
      "Distinguish any proposed changes from current rules",
      "Explain any confirmed changes with implementation dates",
      "State what is unknown about future thresholds",
    ],
  },
};

// =============================================================================
// CONTENT SEPARATION RULES
// =============================================================================

export type ContentType = "fact" | "interpretation" | "unknown";

export const contentTypeDefinitions: Record<ContentType, {
  description: string;
  languagePatterns: string[];
}> = {
  fact: {
    description: "Verifiable information from accepted sources",
    languagePatterns: [
      "The law states...",
      "According to [source]...",
      "The government has confirmed...",
      "Data shows...",
    ],
  },
  interpretation: {
    description: "Analysis or explanation that goes beyond direct facts",
    languagePatterns: [
      "This could mean...",
      "This may affect...",
      "Some interpret this as...",
      "One possible implication is...",
    ],
  },
  unknown: {
    description: "Information that is incomplete or not yet available",
    languagePatterns: [
      "This is not yet known",
      "No decision has been made on...",
      "This remains unclear",
      "We do not yet have information about...",
    ],
  },
};

// =============================================================================
// EDITORIAL CONSISTENCY RULES
// =============================================================================

export const editorialRules = {
  templates: "All content must follow the same templates defined in Prompt 3",
  languagePatterns: "Use consistent language patterns across all pages",
  terminology: "Do not introduce new terminology without definition",
  guardrails: "All contributors and ADHDi outputs must respect the same guardrails",
  predictability: "Users should experience consistency across all pages",
};

// =============================================================================
// ERROR HANDLING AND CORRECTION
// =============================================================================

export interface CorrectionRecord {
  date: string;
  previousContent: string;
  correctedContent: string;
  reason: string;
  discoveredBy: string;
}

export const errorHandlingRules = {
  promptCorrection: "Errors must be corrected as soon as identified",
  logCorrection: "All corrections must be logged with date and reason",
  updateDate: "The page update date must change when corrections are made",
  transparency: "Corrections must not be hidden - transparency over appearing perfect",
};

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Check if a question triggers refusal rules
 */
export function checkRefusalRequired(question: string): {
  shouldRefuse: boolean;
  reason?: string;
  category?: keyof typeof aiGroundingRules.refusalTopics;
} {
  const lowerQuestion = question.toLowerCase();
  
  for (const [category, config] of Object.entries(aiGroundingRules.refusalTopics)) {
    if (config.triggerTerms.some(term => lowerQuestion.includes(term))) {
      return {
        shouldRefuse: true,
        reason: config.response,
        category: category as keyof typeof aiGroundingRules.refusalTopics,
      };
    }
  }
  
  return { shouldRefuse: false };
}

/**
 * Check if a question relates to sensitive topics
 */
export function checkSensitiveTopic(question: string): {
  isSensitive: boolean;
  topics: Array<keyof typeof sensitiveTopics>;
  requirements: string[];
} {
  const lowerQuestion = question.toLowerCase();
  const matchedTopics: Array<keyof typeof sensitiveTopics> = [];
  const requirements: string[] = [];
  
  for (const [topic, config] of Object.entries(sensitiveTopics)) {
    if (config.triggerTerms.some(term => lowerQuestion.includes(term))) {
      matchedTopics.push(topic as keyof typeof sensitiveTopics);
      requirements.push(...config.responseRequirements);
    }
  }
  
  return {
    isSensitive: matchedTopics.length > 0,
    topics: matchedTopics,
    requirements: [...new Set(requirements)], // Deduplicate
  };
}

/**
 * Validate that a source meets accepted criteria
 */
export function validateSource(source: SourceReference): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  if (!source.type) {
    issues.push("Source type is required");
  }
  
  if (!source.name) {
    issues.push("Source name is required");
  }
  
  if (!source.dateAccessed) {
    issues.push("Date accessed is required for transparency");
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Check if content includes leaks and ensure proper handling
 */
export function checkLeaksHandling(content: string, confidence: ConfidenceLevel): {
  isCompliant: boolean;
  missingElements: string[];
} {
  if (confidence !== "unconfirmed") {
    return { isCompliant: true, missingElements: [] };
  }
  
  const requiredElements = [
    { check: /not.*policy|not.*confirmed|unconfirmed/i, label: "Statement that this is not policy" },
    { check: /would need|require.*consultation|require.*legislation/i, label: "Explanation of what would need to happen" },
    { check: /current.*protection|today|still.*apply|current.*law/i, label: "Statement of current protections" },
  ];
  
  const missingElements: string[] = [];
  
  for (const element of requiredElements) {
    if (!element.check.test(content)) {
      missingElements.push(element.label);
    }
  }
  
  return {
    isCompliant: missingElements.length === 0,
    missingElements,
  };
}
