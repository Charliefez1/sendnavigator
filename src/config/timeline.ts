/**
 * SEND Reform Navigator - Timeline and Versioning Configuration
 * 
 * Defines timeline structures, update triggers, and versioning rules.
 * Prioritises clarity, calm, and trust.
 */

// =============================================================================
// TIMELINE TYPES
// =============================================================================

export type MilestoneStatus = "completed" | "upcoming" | "uncertain";

export interface TimelineMilestone {
  id: string;
  title: string;
  monthYear: string; // e.g., "January 2026" or "Q2 2026" for ranges
  explanation: string;
  status: MilestoneStatus;
  source?: string;
  sourceUrl?: string;
}

export interface UpcomingDecisionPoint {
  id: string;
  title: string;
  estimatedTiming?: string; // Range where appropriate, avoid speculative dates
  whyItMatters: string;
  whatCouldChange: string[];
  whatCouldStaySame: string[];
  status: "upcoming";
  source?: string;
}

export interface LongerTermPossibility {
  id: string;
  title: string;
  description: string;
  uncertaintyNote: string; // Required - must explain uncertainty
  status: "uncertain";
}

export interface CurrentPosition {
  summary: string;
  inForceToday: string[];
  notChangingYet: string[];
  lastUpdated: string;
}

// =============================================================================
// UPDATE AND VERSIONING TYPES
// =============================================================================

export type UpdateTrigger = 
  | "new_policy"
  | "consultation_opened"
  | "consultation_closed"
  | "ministerial_statement"
  | "legislation_introduced"
  | "legislation_amended"
  | "scheduled_review"
  | "correction";

export interface ChangeLogEntry {
  date: string;
  trigger: UpdateTrigger;
  description: string;
  pagesAffected: string[];
  isSubstantive: boolean;
}

export interface WhatChangedEntry {
  description: string;
  isNew?: boolean;
  replacesPrevious?: string;
  clarifiesExisting?: boolean;
}

// =============================================================================
// UPDATE TRIGGER RULES
// =============================================================================

export const updateTriggerDefinitions: Record<UpdateTrigger, {
  label: string;
  description: string;
  requiresUpdate: boolean;
}> = {
  new_policy: {
    label: "New policy published",
    description: "Official policy document or guidance has been published",
    requiresUpdate: true,
  },
  consultation_opened: {
    label: "Consultation opened",
    description: "A formal consultation period has begun",
    requiresUpdate: true,
  },
  consultation_closed: {
    label: "Consultation closed",
    description: "A formal consultation period has ended",
    requiresUpdate: true,
  },
  ministerial_statement: {
    label: "Ministerial statement",
    description: "A significant statement from a government minister",
    requiresUpdate: true,
  },
  legislation_introduced: {
    label: "Legislation introduced",
    description: "New legislation has been introduced to Parliament",
    requiresUpdate: true,
  },
  legislation_amended: {
    label: "Legislation amended",
    description: "Existing legislation has been amended",
    requiresUpdate: true,
  },
  scheduled_review: {
    label: "Scheduled review",
    description: "Regular update cycle review",
    requiresUpdate: true,
  },
  correction: {
    label: "Correction",
    description: "Error corrected or information clarified",
    requiresUpdate: true,
  },
};

// =============================================================================
// VERSIONING RULES
// =============================================================================

export const versioningRules = {
  displayLastUpdated: true,
  retainChangeLog: true,
  explainRemovals: true,
  explainCorrections: true,
  neverEraseWithoutExplanation: true,
  updateCadence: "monthly", // Even if nothing changed, state explicitly
};

// =============================================================================
// TIMELINE DISPLAY RULES
// =============================================================================

export const timelineDisplayRules = {
  focusOnDecisionPoints: true,
  avoidDenseLists: true,
  prioritiseMeaning: true,
  scannable: true,
  mobileReadable: true,
  leaksNeverAsCommitments: true,
  leaksOnlyInUncertainSection: true,
};

// =============================================================================
// PLACEHOLDER DATA (to be replaced with real data)
// =============================================================================

export const currentPositionData: CurrentPosition = {
  summary: "Reform activity has been staged over several years. Testing began in 2023. A national conversation closed in early 2026. Formal consultation is planned. Any legal changes would require Parliament. Timings remain indicative.",
  inForceToday: [
    "Children and Families Act 2014 remains the primary legislation",
    "SEND Code of Practice 2015 remains statutory guidance",
    "EHCPs continue to be the mechanism for legally binding support",
    "Tribunal rights remain unchanged",
  ],
  notChangingYet: [
    "No legislation has been introduced to change the EHCP system",
    "No confirmed timeline for removing or replacing current protections",
    "Local authority duties under current law remain in effect",
    "No changes apply until legislation is passed",
  ],
  lastUpdated: "7th February 2026",
};

export const completedMilestones: TimelineMilestone[] = [
  {
    id: "improvement-plan-2023",
    title: "SEND Improvement Plan launched",
    monthYear: "March 2023",
    explanation: "The SEND and Alternative Provision Improvement Plan was published, setting out government intentions for reform.",
    status: "completed",
    source: "Department for Education (government policy)",
  },
  {
    id: "change-programme-2023",
    title: "Change Programme testing began",
    monthYear: "2023 to present",
    explanation: "SEND Change Programme testing has run from 2023 onwards with selected local areas.",
    status: "completed",
    source: "Department for Education (government programme)",
  },
  {
    id: "national-conversation-closed",
    title: "National conversation closed",
    monthYear: "14 January 2026",
    explanation: "The national conversation on SEND reform ran from December 2025 to January 2026.",
    status: "completed",
    source: "Department for Education (government consultation)",
  },
];

export const upcomingDecisionPoints: UpcomingDecisionPoint[] = [
  {
    id: "formal-consultation-2026",
    title: "Formal consultation on SEND reform",
    estimatedTiming: "2026",
    whyItMatters: "Government has stated a formal consultation will take place in 2026. This will be the opportunity for detailed input on proposed changes.",
    whatCouldChange: [
      "Content of proposed reforms",
      "Implementation approach",
      "Scope of changes to current system",
    ],
    whatCouldStaySame: [
      "Core legal framework until legislation passes",
      "EHCP as statutory mechanism",
      "Tribunal rights",
    ],
    status: "upcoming",
    source: "Department for Education (government statement) · December 2025",
  },
];

export const longerTermPossibilities: LongerTermPossibility[] = [
  {
    id: "schools-white-paper",
    title: "Schools White Paper with SEND reform proposals",
    description: "A Schools White Paper is expected to include SEND reform proposals.",
    uncertaintyNote: "No decisions have been made. This is based on sector reporting (December 2025). Any changes would require consultation, legislation, and parliamentary approval. Future dates are subject to parliamentary process.",
    status: "uncertain",
  },
  {
    id: "draft-legislation",
    title: "Draft legislation content",
    description: "Content of any draft legislation relating to SEND reform.",
    uncertaintyNote: "No draft legislation has been published. We do not know what it might contain or when it might be introduced.",
    status: "uncertain",
  },
  {
    id: "implementation-dates",
    title: "Implementation dates for any legal changes",
    description: "Specific dates when any new legal requirements would come into force.",
    uncertaintyNote: "No implementation dates have been confirmed. Any changes would need to complete the full parliamentary process first.",
    status: "uncertain",
  },
];

export const recentChanges: WhatChangedEntry[] = [
  {
    description: "Timeline updated with confirmed milestones from SEND Improvement Plan, Change Programme, and National Conversation",
    isNew: true,
  },
  {
    description: "Added formal consultation 2026 as upcoming decision point based on government statement",
    isNew: true,
  },
  {
    description: "Added longer-term possibilities section with Schools White Paper and legislation uncertainty",
    clarifiesExisting: true,
  },
];
