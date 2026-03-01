import { useState, useEffect } from "react";
import { BookOpen, ScanLine, Headphones, Sun, Moon, Type, Heart, Zap, Compass } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useExperienceMode, ExperienceMode } from "@/contexts/ExperienceModeContext";
import { usePageSections } from "@/contexts/PageSectionsContext";


const experienceModes: {mode: ExperienceMode;label: string;icon: typeof BookOpen;}[] = [
{ mode: "read", label: "Read", icon: BookOpen },
{ mode: "scan", label: "Scan", icon: ScanLine },
{ mode: "listen", label: "Listen", icon: Headphones }];


export function ExperienceSelector() {
  const { mode, setMode, orientationOn, setOrientationOn } = useExperienceMode();
  const { sections } = usePageSections();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [largeText, setLargeText] = useState(false);
  const isQuickRead = location.pathname === "/quick-read";

  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? "112.5%" : "";
  }, [largeText]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Hide on landing page
  if (location.pathname === "/landing") return null;

  return (
    <div className="bg-navy text-navy-foreground border-b border-white/10">
      <div className="content-wide flex items-center gap-3 py-1.5 overflow-x-auto scrollbar-hide">
        {/* Spacer to push logo right */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Jump to sections */}
        {sections.length > 0 &&
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mr-1.5">Jump to</span>
            {sections.map((section) =>
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors group"
              aria-label={`Jump to ${section.label}`}
              title={section.label}>

                <section.icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
              </button>
            )}
            <div className="w-px h-4 bg-white/10 mx-1.5" />
          </div>
          }

        {/* Experience mode */}
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mr-1.5">Experience</span>
          {experienceModes.map(({ mode: m, label, icon: Icon }) =>
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
                mode === m && !isQuickRead ?
                "bg-white/20 text-white" :
                "text-white/50 hover:text-white hover:bg-white/10"
              )}
              aria-pressed={mode === m && !isQuickRead}
              aria-label={`${label} mode`}>

              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{label}</span>
            </button>
            )}
          <button
              onClick={() => navigate("/quick-read")}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
                isQuickRead ?
                "bg-white/20 text-white" :
                "text-white/50 hover:text-white hover:bg-white/10"
              )}
              aria-pressed={isQuickRead}
              aria-label="Quick Read mode">

            <Zap className="w-3 h-3" />
            <span className="hidden sm:inline">Quick Read</span>
          </button>
          <div className="w-px h-4 bg-white/10 mx-1.5" />
        </div>

        {/* Orientation toggle */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => setOrientationOn(!orientationOn)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
              orientationOn
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white hover:bg-white/10"
            )}
            aria-pressed={orientationOn}
            aria-label="Toggle orientation bar"
            title="Shows where you are on the site and helps you keep your place on long pages."
          >
            <Compass className="w-3 h-3" />
            <span className="hidden sm:inline">Orientation</span>
          </button>
          <div className="w-px h-4 bg-white/10 mx-1.5" />
        </div>

        {/* Accessibility */}
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mr-1.5">Accessibility</span>
          <button
              onClick={() => setLargeText(!largeText)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
                largeText ?
                "bg-white/20 text-white" :
                "text-white/50 hover:text-white hover:bg-white/10"
              )}
              aria-pressed={largeText}
              aria-label={largeText ? "Normal text size" : "Large text size"}>

            <Type className="w-3 h-3" />
            <span className="hidden sm:inline">{largeText ? "A+" : "A"}</span>
          </button>
          <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>

            {theme === "dark" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
        </div>

        {/* Site identity */}
        <Link to="/feedback" className="group flex items-center gap-2 shrink-0 ml-auto">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
            <Heart className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
          </div>
          <div>
            


            


          </div>
        </Link>
      </div>
    </div>);

}