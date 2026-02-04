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
  summary: "SEND reform discussions are ongoing. The current legal framework under the Children and Families Act 2014 remains in force.",
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
  ],
  lastUpdated: "4th February 2026",
};

export const completedMilestones: TimelineMilestone[] = [
  {
    id: "send-review-2022",
    title: "SEND Review published",
    monthYear: "March 2022",
    explanation: "The government published the SEND and Alternative Provision Green Paper following the SEND Review.",
    status: "completed",
    source: "GOV.UK",
  },
  {
    id: "improvement-plan-2023",
    title: "SEND and AP Improvement Plan published",
    monthYear: "March 2023",
    explanation: "The government response to the Green Paper consultation, setting out planned reforms.",
    status: "completed",
    source: "GOV.UK",
  },
];

export const upcomingDecisionPoints: UpcomingDecisionPoint[] = [
  {
    id: "implementation-review",
    title: "Review of improvement plan implementation",
    estimatedTiming: "2026",
    whyItMatters: "Will determine whether current reform approach continues or changes direction.",
    whatCouldChange: [
      "Pace of reform implementation",
      "Focus areas for next phase",
      "Funding allocations",
    ],
    whatCouldStaySame: [
      "Core legal framework",
      "EHCP as statutory mechanism",
      "Tribunal rights",
    ],
    status: "upcoming",
  },
];

export const longerTermPossibilities: LongerTermPossibility[] = [
  {
    id: "funding-model-review",
    title: "High needs funding model changes",
    description: "Discussions about reforming how high needs funding is allocated to local authorities.",
    uncertaintyNote: "No decisions have been made. Any changes would require consultation and potentially legislation. Current funding arrangements remain in place.",
    status: "uncertain",
  },
];

export const recentChanges: WhatChangedEntry[] = [
  {
    description: "Initial timeline structure established",
    isNew: true,
  },
  {
    description: "Content being developed based on confirmed sources",
    clarifiesExisting: true,
  },
];
