import { ScanLine } from "lucide-react";
import { useExperienceMode } from "@/contexts/ExperienceModeContext";

export function ScanModeBanner() {
  const { mode, setMode } = useExperienceMode();

  if (mode !== "scan") return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20">
      <div className="content-wide flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <ScanLine className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">
            Scan mode — showing headings only. Tap any section to expand.
          </span>
        </div>
        <button
          onClick={() => setMode("read")}
          className="text-xs text-primary hover:underline font-medium"
        >
          Exit scan mode
        </button>
      </div>
    </div>
  );
}
