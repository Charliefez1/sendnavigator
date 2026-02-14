import { useState, useEffect } from "react";
import { BookOpen, ScanLine, Headphones, Sun, Moon, Type } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useExperienceMode, ExperienceMode } from "@/contexts/ExperienceModeContext";
import { usePageSections } from "@/contexts/PageSectionsContext";
import neurodiversityLogo from "@/assets/neurodiversity-global-logo.jpeg";

const experienceModes: { mode: ExperienceMode; label: string; icon: typeof BookOpen }[] = [
  { mode: "read", label: "Read", icon: BookOpen },
  { mode: "scan", label: "Scan", icon: ScanLine },
  { mode: "listen", label: "Listen", icon: Headphones },
];

export function ExperienceSelector() {
  const { mode, setMode } = useExperienceMode();
  const { sections } = usePageSections();
  const { theme, setTheme } = useTheme();
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? "112.5%" : "";
  }, [largeText]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-navy text-navy-foreground border-b border-white/10">
      <div className="content-wide flex items-center gap-3 py-1.5 overflow-x-auto scrollbar-hide">
        {/* Spacer to push logo right */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Jump to sections */}
        {sections.length > 0 && (
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mr-1.5">Jump to</span>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors group"
                aria-label={`Jump to ${section.label}`}
                title={section.label}
              >
                <section.icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
              </button>
            ))}
            <div className="w-px h-4 bg-white/10 mx-1.5" />
          </div>
        )}

        {/* Experience mode */}
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mr-1.5">Experience</span>
          {experienceModes.map(({ mode: m, label, icon: Icon }) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
                mode === m
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              )}
              aria-pressed={mode === m}
              aria-label={`${label} mode`}
            >
              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
          <div className="w-px h-4 bg-white/10 mx-1.5" />
        </div>

        {/* Accessibility */}
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mr-1.5">Accessibility</span>
          <button
            onClick={() => setLargeText(!largeText)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
              largeText
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white hover:bg-white/10"
            )}
            aria-pressed={largeText}
            aria-label={largeText ? "Normal text size" : "Large text size"}
          >
            <Type className="w-3 h-3" />
            <span className="hidden sm:inline">{largeText ? "A+" : "A"}</span>
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
        </div>

        {/* Neurodiversity Global logo */}
        <a
          href="https://neurodiversityglobal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 ml-auto"
          aria-label="Neurodiversity Global"
          title="Neurodiversity Global"
        >
          <img
            src={neurodiversityLogo}
            alt="Neurodiversity Global"
            className="h-6 w-6 rounded-full object-cover"
          />
        </a>
      </div>
    </div>
  );
}
