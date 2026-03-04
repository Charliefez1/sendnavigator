import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { StructuredAIReport } from "@/types/ai-report";
import type { ReportMode } from "@/config/mini-profile-sections";

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
  answers: Record<string, string | string[]>;
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
  reportMode: ReportMode;
}

interface ChildProfileContextType {
  state: ChildProfileState;
  accessCode: string | null;
  setAccessCode: (code: string | null) => void;
  isDirty: boolean;
  updateSetup: (data: Partial<SetupData>) => void;
  updateSectionAnswer: (sectionIndex: number, questionId: string, value: string | string[]) => void;
  updateSectionReflection: (sectionIndex: number, value: string) => void;
  updateFinalStatement: (value: string) => void;
  getSectionStatus: (sectionIndex: number) => SectionStatus;
  updateAiReport: (report: CachedAIReport) => void;
  clearAiReport: () => void;
  setReportMode: (mode: ReportMode) => void;
  loadState: (data: ChildProfileState) => void;
  reset: () => void;
  markClean: () => void;
}

const LOCAL_STORAGE_KEY = "my-child-profile-draft";

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
  reportMode: "full",
};

function loadFromLocalStorage(): ChildProfileState | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.setup) return parsed;
  } catch {
    // Corrupted data, ignore
  }
  return null;
}

function saveToLocalStorage(state: ChildProfileState) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable, ignore
  }
}

function clearLocalStorage() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

const ChildProfileContext = createContext<ChildProfileContextType | null>(null);

export function ChildProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ChildProfileState>(() => {
    return loadFromLocalStorage() || { ...defaultState };
  });
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Auto-save to localStorage on state change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [state]);

  // Warn on page close if dirty
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const markDirty = useCallback(() => setIsDirty(true), []);
  const markClean = useCallback(() => setIsDirty(false), []);

  const updateSetup = (data: Partial<SetupData>) => {
    setState((prev) => ({ ...prev, setup: { ...prev.setup, ...data } }));
    markDirty();
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
    markDirty();
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
    markDirty();
  };

  const updateFinalStatement = (value: string) => {
    setState((prev) => ({ ...prev, finalStatement: value }));
    markDirty();
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

  const setReportMode = (mode: ReportMode) => {
    setState((prev) => ({ ...prev, reportMode: mode }));
  };

  const loadState = (data: ChildProfileState) => {
    const newState = { ...defaultState, ...data, reportMode: data.reportMode || "full" };
    setState(newState);
    setIsDirty(false);
  };

  const reset = () => {
    setState({ ...defaultState, setup: { ...defaultSetup } });
    setAccessCode(null);
    setIsDirty(false);
    clearLocalStorage();
  };

  return (
    <ChildProfileContext.Provider
      value={{
        state,
        accessCode,
        setAccessCode,
        isDirty,
        updateSetup,
        updateSectionAnswer,
        updateSectionReflection,
        updateFinalStatement,
        getSectionStatus,
        updateAiReport,
        clearAiReport,
        setReportMode,
        loadState,
        reset,
        markClean,
      }}
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
