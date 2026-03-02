import { createContext, useContext, useState, ReactNode } from "react";
import { StructuredAIReport } from "@/types/ai-report";

export const SECTION_TITLES = [
  "Environment",
  "People",
  "Settings",
  "Nervous System and Dysregulation",
  "Trauma",
  "Sensory Processing",
  "Executive Function and the Knowing-Doing Gap",
  "Sleep",
  "Dopamine Regulation",
  "Masking and the Cost of Compliance",
  "Communication and Social Understanding",
  "Behaviour",
  "Identity and Self Concept",
  "Strength Profile",
  "Developmental History",
  "Family System",
  "Physical Health",
  "School Fit vs Child Deficit",
  "Time, Transitions, and Future Blindness",
  "Demand Avoidance, Autonomy, and Reactions to Authority",
  "Hyperfocus, Interest-Based Motivation, and Zoning Out",
  "Emotional Intensity, Anger, and Rejection Sensitivity",
] as const;

export type SectionStatus = "empty" | "in-progress" | "complete";

export interface SetupData {
  childName: string;
  filledBy: string;
  sharedWith: string[];
  reason: string;
}

export interface SectionData {
  /** Answers keyed by question id */
  answers: Record<string, string | string[]>;
  /** The closing reflection */
  reflection: string;
}

export interface CachedAIReport {
  generatedAt: string;
  model: string;
  report: string;
  structured?: StructuredAIReport;
}

export interface ChildProfileState {
  setup: SetupData;
  sections: Record<number, SectionData>;
  finalStatement: string;
  aiReport?: CachedAIReport;
}

interface ChildProfileContextType {
  state: ChildProfileState;
  updateSetup: (data: Partial<SetupData>) => void;
  updateSectionAnswer: (sectionIndex: number, questionId: string, value: string | string[]) => void;
  updateSectionReflection: (sectionIndex: number, value: string) => void;
  updateFinalStatement: (value: string) => void;
  getSectionStatus: (sectionIndex: number) => SectionStatus;
  updateAiReport: (report: CachedAIReport) => void;
  clearAiReport: () => void;
  loadState: (data: ChildProfileState) => void;
  reset: () => void;
}

const defaultSetup: SetupData = {
  childName: "",
  filledBy: "",
  sharedWith: [],
  reason: "",
};

const defaultState: ChildProfileState = {
  setup: { ...defaultSetup },
  sections: {},
  finalStatement: "",
};

const ChildProfileContext = createContext<ChildProfileContextType | null>(null);

export function ChildProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ChildProfileState>({ ...defaultState });

  const updateSetup = (data: Partial<SetupData>) => {
    setState((prev) => ({ ...prev, setup: { ...prev.setup, ...data } }));
  };

  const updateSectionAnswer = (sectionIndex: number, questionId: string, value: string | string[]) => {
    setState((prev) => {
      const existing = prev.sections[sectionIndex] || { answers: {}, reflection: "" };
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionIndex]: {
            ...existing,
            answers: { ...existing.answers, [questionId]: value },
          },
        },
      };
    });
  };

  const updateSectionReflection = (sectionIndex: number, value: string) => {
    setState((prev) => {
      const existing = prev.sections[sectionIndex] || { answers: {}, reflection: "" };
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionIndex]: { ...existing, reflection: value },
        },
      };
    });
  };

  const updateFinalStatement = (value: string) => {
    setState((prev) => ({ ...prev, finalStatement: value }));
  };

  const getSectionStatus = (sectionIndex: number): SectionStatus => {
    const section = state.sections[sectionIndex];
    if (!section) return "empty";
    const hasAnswers = Object.values(section.answers).some(
      (v) => (Array.isArray(v) ? v.length > 0 : v.trim().length > 0)
    );
    const hasReflection = section.reflection.trim().length > 0;
    if (!hasAnswers && !hasReflection) return "empty";
    return "complete";
  };

  const updateAiReport = (report: CachedAIReport) => {
    setState((prev) => ({ ...prev, aiReport: report }));
  };

  const clearAiReport = () => {
    setState((prev) => {
      if (!prev.aiReport) return prev;
      const { aiReport: _, ...rest } = prev;
      return rest as ChildProfileState;
    });
  };

  const loadState = (data: ChildProfileState) => setState(data);

  const reset = () => setState({ ...defaultState, setup: { ...defaultSetup } });

  return (
    <ChildProfileContext.Provider
      value={{ state, updateSetup, updateSectionAnswer, updateSectionReflection, updateFinalStatement, getSectionStatus, updateAiReport, clearAiReport, loadState, reset }}
    >
      {children}
    </ChildProfileContext.Provider>
  );
}

export function useChildProfile() {
  const ctx = useContext(ChildProfileContext);
  if (!ctx) throw new Error("useChildProfile must be used within ChildProfileProvider");
  return ctx;
}
