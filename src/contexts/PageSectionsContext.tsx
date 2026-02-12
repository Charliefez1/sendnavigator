import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface PageSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface PageSectionsContextType {
  sections: PageSection[];
  setSections: (sections: PageSection[]) => void;
}

const PageSectionsContext = createContext<PageSectionsContextType>({
  sections: [],
  setSections: () => {},
});

export function PageSectionsProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<PageSection[]>([]);

  return (
    <PageSectionsContext.Provider value={{ sections, setSections }}>
      {children}
    </PageSectionsContext.Provider>
  );
}

export function usePageSections() {
  return useContext(PageSectionsContext);
}

export function RegisterSections({ sections }: { sections: PageSection[] }) {
  const { setSections } = usePageSections();

  useEffect(() => {
    setSections(sections);
    return () => setSections([]);
  }, [sections, setSections]);

  return null;
}
