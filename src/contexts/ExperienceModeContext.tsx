import { createContext, useContext, useState, ReactNode } from "react";

export type ExperienceMode = "read" | "scan" | "listen";

interface ExperienceModeContextType {
  mode: ExperienceMode;
  setMode: (mode: ExperienceMode) => void;
  orientationOn: boolean;
  setOrientationOn: (on: boolean) => void;
}

const ExperienceModeContext = createContext<ExperienceModeContextType>({
  mode: "read",
  setMode: () => {},
  orientationOn: false,
  setOrientationOn: () => {},
});

export function ExperienceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ExperienceMode>("read");
  const [orientationOn, setOrientationOn] = useState(true);

  return (
    <ExperienceModeContext.Provider value={{ mode, setMode, orientationOn, setOrientationOn }}>
      {children}
    </ExperienceModeContext.Provider>
  );
}

export function useExperienceMode() {
  return useContext(ExperienceModeContext);
}
