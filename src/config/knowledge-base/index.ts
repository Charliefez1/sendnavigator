/**
 * SEND Reform Navigator - Curated Knowledge Base
 * 
 * This is the ONLY source of information Ask Rich may use.
 * Ask Rich must NOT introduce external knowledge.
 * 
 * Last updated: 2nd March 2026
 * Refactored into modular files for maintainability.
 */

import { currentLegalPosition } from "./current-legal-position";
import { confirmedChanges } from "./confirmed-changes";
import { ehcpsAndRights } from "./ehcps-and-rights";
import { leaksAndReports } from "./leaks-and-reports";
import { unknownAreas } from "./unknown-areas";
import { practicalImplications } from "./practical-implications";
import { timelineInformation } from "./timeline-information";
import { operationalReformArchitecture } from "./operational-reform";
import { raceEthnicitySend } from "./race-ethnicity-send";

// Deep research: Neurodivergent children evidence base
import { neurodivergentChildrenOverview } from "./neurodivergent-children-overview";
import { behaviourAsCommunication } from "./behaviour-as-communication";
import { schoolExperience } from "./school-experience";
import { familyExperience } from "./family-experience";
import { coOccurringProfiles } from "./co-occurring-profiles";
import { whatWorksWhatDoesnt } from "./what-works-what-doesnt";
import { lifeOutcomesAndModels } from "./life-outcomes-and-models";

export const KNOWLEDGE_BASE = {
  lastUpdated: "16th March 2026",
  
  currentLegalPosition,
  confirmedChanges,
  ehcpsAndRights,
  leaksAndReports,
  unknownAreas,
  practicalImplications,
  timelineInformation,
  operationalReformArchitecture,
  raceEthnicitySend,

  // Deep research: Neurodivergent children evidence base
  neurodivergentChildrenOverview,
  behaviourAsCommunication,
  schoolExperience,
  familyExperience,
  coOccurringProfiles,
  whatWorksWhatDoesnt,
  lifeOutcomesAndModels,

  // Internal navigation
  internalPages: [
    { path: "/where-we-are-now", label: "What we know right now", description: "Current SEND system and law" },
    { path: "/what-is-changing", label: "What is now in motion", description: "Confirmed reforms and plans" },
    { path: "/what-the-leaks-are-saying", label: "What has been reported", description: "Media reports and their basis" },
    { path: "/what-this-could-mean", label: "What this could mean", description: "Practical implications" },
    { path: "/timeline", label: "What happens next", description: "Key dates and milestones" },
    { path: "/questions-and-answers", label: "Questions and answers", description: "Common questions" },
    { path: "/sources", label: "Sources", description: "How we verify information" },
    { path: "/about", label: "About this resource", description: "Independence and scope" },
  ],
};

export type KnowledgeSection = keyof Omit<typeof KNOWLEDGE_BASE, 'lastUpdated' | 'internalPages'>;
