import { createContext, useContext, ReactNode } from "react";

const PageAccentContext = createContext<string | undefined>(undefined);

export function PageAccentProvider({ color, children }: { color?: string; children: ReactNode }) {
  return (
    <PageAccentContext.Provider value={color}>
      {children}
    </PageAccentContext.Provider>
  );
}

export function usePageAccent() {
  return useContext(PageAccentContext);
}
