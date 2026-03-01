import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronRight, ArrowUp } from "lucide-react";
import { useExperienceMode } from "@/contexts/ExperienceModeContext";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Route metadata for orientation bar display.
 * Maps paths to section names, page titles, and optional hub breadcrumbs.
 */
const routeMeta: Record<string, { section?: string; sectionColor?: string; title: string; hub?: string }> = {
  "/": { title: "Home" },
  "/start": { title: "Home" },

  // State of SEND hub
  "/state-of-send-2026": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "Report Overview", hub: "State of SEND 2026" },
  "/state-of-send-2026/where-we-are-now": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What we know right now", hub: "State of SEND 2026" },
  "/state-of-send-2026/what-is-changing": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What is now in motion", hub: "State of SEND 2026" },
  "/state-of-send-2026/what-has-not-changed": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What remains protected", hub: "State of SEND 2026" },
  "/state-of-send-2026/what-is-being-discussed": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What is actively being shaped", hub: "State of SEND 2026" },
  "/state-of-send-2026/what-we-do-not-know": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What is genuinely unknown", hub: "State of SEND 2026" },
  "/state-of-send-2026/what-the-leaks-are-saying": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What has been reported", hub: "State of SEND 2026" },
  "/state-of-send-2026/what-the-leaks-do-not-mean": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What is often misunderstood", hub: "State of SEND 2026" },
  "/state-of-send-2026/timeline": { section: "SEND Reform Report", sectionColor: "var(--accent-teal)", title: "What happens next", hub: "State of SEND 2026" },

  // EHCP Guide
  "/ehcps": { section: "EHCP Guide", sectionColor: "var(--accent-deep-blue)", title: "The EHCP Guide" },
  "/ehcp-health": { section: "EHCP Guide", sectionColor: "var(--accent-deep-blue)", title: "Health in EHCPs" },
  "/post-16-and-transition": { section: "EHCP Guide", sectionColor: "var(--accent-deep-blue)", title: "Post-16 & Transition" },

  // My Child: A Profile
  "/my-child-profile": { section: "My Child: A Profile", sectionColor: "var(--accent-amber)", title: "My Child: A Profile" },
  "/understanding-your-child": { section: "Understanding Your Child", sectionColor: "var(--accent-amber)", title: "Understanding Your Child" },
  "/understanding-your-child/autism": { section: "Understanding Your Child", sectionColor: "var(--accent-amber)", title: "Understanding Autism", hub: "Understanding Your Child" },
  "/understanding-your-child/adhd": { section: "Understanding Your Child", sectionColor: "var(--accent-amber)", title: "Understanding ADHD", hub: "Understanding Your Child" },

  // What to do now
  "/what-to-do-right-now": { section: "What To Do Now", sectionColor: "var(--accent-coral)", title: "What to do right now" },
  "/exclusions": { section: "What To Do Now", sectionColor: "var(--accent-coral)", title: "Exclusions & Rights" },
  "/alternative-provision": { section: "What To Do Now", sectionColor: "var(--accent-coral)", title: "Alternative Provision" },
  "/for-parents": { section: "What To Do Now", sectionColor: "var(--accent-coral)", title: "For Parents" },
  "/sendiass": { section: "What To Do Now", sectionColor: "var(--accent-coral)", title: "Free Help – SENDIASS" },
  "/local-variation": { section: "What To Do Now", sectionColor: "var(--accent-coral)", title: "Local Variation" },
  "/devolved-nations": { section: "What To Do Now", sectionColor: "var(--accent-coral)", title: "Devolved Nations" },

  // Ask Rich
  "/questions-and-answers": { section: "Ask Rich", sectionColor: "var(--accent-violet)", title: "Questions & Answers" },
  "/community-questions": { section: "Ask Rich", sectionColor: "var(--accent-violet)", title: "Community Questions" },
  "/richs-take": { section: "Ask Rich", sectionColor: "var(--accent-violet)", title: "Rich's Take" },

  // Sources & info
  "/sources": { title: "Sources" },
  "/statistics-and-data": { title: "Statistics & Data" },
  "/about": { title: "About" },
  "/how-to-use": { title: "How to Use" },
  "/quick-read": { title: "Quick Read" },
  "/have-your-say": { title: "Have Your Say" },
  "/feedback": { title: "Feedback" },
  "/privacy-policy": { title: "Privacy Policy" },
};

export function OrientationBar() {
  const { orientationOn } = useExperienceMode();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [showTopLink, setShowTopLink] = useState(false);

  const meta = routeMeta[location.pathname];

  useEffect(() => {
    const onScroll = () => setShowTopLink(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset expansion on route change
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  if (!orientationOn || !meta) return null;

  const sectionColorHsl = meta.sectionColor ? `hsl(${meta.sectionColor})` : undefined;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const hubPath = meta.hub && meta.section === "SEND Reform Report" ? "/state-of-send-2026" : undefined;

  // Mobile: collapsed single line
  if (isMobile) {
    return (
      <div
        className="fixed top-[60px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-3 py-1.5"
        role="navigation"
        aria-label="Page orientation"
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 w-full text-left min-h-[28px]"
        >
          {meta.section && (
            <>
              <span className="text-[11px] font-semibold truncate" style={{ color: sectionColorHsl }}>
                {meta.section}
              </span>
              <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            </>
          )}
          <span className="text-[11px] text-foreground font-medium truncate">{meta.title}</span>
          {showTopLink && (
            <button
              onClick={(e) => { e.stopPropagation(); scrollToTop(); }}
              className="ml-auto text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 flex-shrink-0"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
          )}
        </button>
        {expanded && (
          <div className="pt-1 pb-0.5 flex items-center gap-2 text-[10px] text-muted-foreground">
            {hubPath && (
              <a href={hubPath} className="hover:text-foreground transition-colors">
                Back to section
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop
  return (
    <div
      className="fixed top-[60px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border"
      role="navigation"
      aria-label="Page orientation"
    >
      <div className="content-wide flex items-center gap-2 py-1.5 text-xs">
        {meta.section && (
          <>
            <span className="font-semibold" style={{ color: sectionColorHsl }}>
              {meta.section}
            </span>
            {meta.hub && (
              <>
                <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{meta.hub}</span>
              </>
            )}
            <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          </>
        )}
        <span className="text-foreground font-medium">{meta.title}</span>

        <div className="ml-auto flex items-center gap-3">
          {hubPath && (
            <a href={hubPath} className="text-muted-foreground hover:text-foreground transition-colors">
              Back to section
            </a>
          )}
          {showTopLink && (
            <button
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3 h-3" />
              Top
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
