import { SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, Zap, ChevronRight } from "lucide-react";
import { StructuredTheme, DetectedPattern, ContradictionFlag, ThemeAnalysisResult } from "@/lib/theme-engine";
import type { ThemeConfidence } from "@/config/theme-ontology";
import { ThemesSummaryHeader } from "./ThemesSummaryHeader";

interface Props {
  analysis: ThemeAnalysisResult;
  onNavigateToSection?: (index: number) => void;
}

const CONFIDENCE_STYLES: Record<ThemeConfidence, { dot: string; label: string; badge: string }> = {
  emerging: { dot: "bg-muted-foreground/50", label: "Emerging", badge: "bg-secondary text-muted-foreground" },
  developing: { dot: "bg-status-discussed", label: "Developing", badge: "bg-status-discussed-bg text-foreground" },
  established: { dot: "bg-primary", label: "Established", badge: "bg-primary/10 text-primary" },
};

/* ── Theme Card ── */
function ThemeCard({
  theme,
  onNavigateToSection,
}: {
  theme: StructuredTheme;
  onNavigateToSection?: (index: number) => void;
}) {
  const conf = CONFIDENCE_STYLES[theme.confidence];

  return (
    <div className="group rounded-xl border border-border bg-card p-4 space-y-3 shadow-card hover:shadow-card-hover transition-shadow duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full shrink-0 ${conf.dot}`} />
          <p className="text-sm font-semibold text-foreground truncate">{theme.theme}</p>
        </div>
        <Badge className={`${conf.badge} text-[10px] border-0 shrink-0 font-medium`}>
          {conf.label}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">{theme.description}</p>

      {/* Mechanisms */}
      {theme.mechanisms.length > 0 && (
        <ChipRow label="Mechanisms">
          {theme.mechanisms.map((m) => (
            <Chip key={m.mechanism} variant="warm">
              {m.mechanism} ({m.signalCount})
            </Chip>
          ))}
        </ChipRow>
      )}

      {/* Contexts */}
      {theme.contexts.length > 0 && (
        <ChipRow label="Contexts">
          {theme.contexts.map((c) => (
            <Chip key={c} variant="muted">{c}</Chip>
          ))}
        </ChipRow>
      )}

      {/* Evidence */}
      {theme.topSignals.length > 0 && (
        <ChipRow label="Evidence">
          {theme.topSignals.slice(0, 3).map((s) => (
            <Chip key={s.id} variant="accent">{s.label}</Chip>
          ))}
        </ChipRow>
      )}

      {/* Linked sections */}
      {theme.linkedSections.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-2 border-t border-border">
          {theme.linkedSections.map((idx) => (
            <button
              key={idx}
              onClick={() => onNavigateToSection?.(idx)}
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-0.5"
            >
              {SECTION_TITLES[idx]}
              <ChevronRight className="w-2.5 h-2.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Pattern Card ── */
function PatternCard({ detected }: { detected: DetectedPattern }) {
  return (
    <div className="rounded-xl border border-status-discussed-bg bg-status-discussed-bg/30 p-3 flex items-start gap-2.5 shadow-sm">
      <div className="rounded-full bg-status-discussed/15 p-1.5 shrink-0 mt-0.5">
        <Zap className="w-3.5 h-3.5 text-status-discussed" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-foreground">{detected.pattern.label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
          {detected.pattern.description}
        </p>
        {detected.matchingContexts.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {detected.matchingContexts.map((c) => (
              <Chip key={c} variant="muted">{c}</Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Contradiction Card ── */
function ContradictionCard({ flag }: { flag: ContradictionFlag }) {
  return (
    <div className="rounded-xl border border-accent bg-accent/30 p-3 flex items-start gap-2.5 shadow-sm">
      <div className="rounded-full bg-accent-foreground/10 p-1.5 shrink-0 mt-0.5">
        <AlertTriangle className="w-3.5 h-3.5 text-accent-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-foreground">
          Environment sensitivity — {flag.domain}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
          {flag.message}
        </p>
        <div className="flex gap-1 mt-1.5">
          {flag.contexts.map((c) => (
            <Chip key={c} variant="muted">{c}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export function EmergingThemes({ analysis, onNavigateToSection }: Props) {
  const { themes, patterns, contradictions } = analysis;

  if (themes.length === 0 && patterns.length === 0 && contradictions.length === 0) return null;

  return (
    <Card className="col-span-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <div className="rounded-full bg-status-discussed/15 p-1">
            <Lightbulb className="w-4 h-4 text-status-discussed" />
          </div>
          Emerging themes
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Structured patterns detected across what you have shared so far
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Dashboard summary */}
        <ThemesSummaryHeader analysis={analysis} />

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Theme cards */}
        {themes.length > 0 && (
          <div className="space-y-2">
            <SectionHeading>Theme details</SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2">
              {themes.map((t) => (
                <ThemeCard key={t.theme} theme={t} onNavigateToSection={onNavigateToSection} />
              ))}
            </div>
          </div>
        )}

        {/* Patterns */}
        {patterns.length > 0 && (
          <div className="space-y-2">
            <SectionHeading>Detected patterns</SectionHeading>
            <div className="space-y-2">
              {patterns.map((p) => (
                <PatternCard key={p.pattern.id} detected={p} />
              ))}
            </div>
          </div>
        )}

        {/* Contradictions */}
        {contradictions.length > 0 && (
          <div className="space-y-2">
            <SectionHeading>Environment sensitivity</SectionHeading>
            <div className="space-y-2">
              {contradictions.map((c, i) => (
                <ContradictionCard key={i} flag={c} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ── Shared UI primitives ── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
      {children}
    </p>
  );
}

function ChipRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}

function Chip({ children, variant }: { children: React.ReactNode; variant: "warm" | "muted" | "accent" }) {
  const styles = {
    warm: "bg-primary/10 text-primary",
    muted: "bg-secondary text-muted-foreground",
    accent: "bg-accent text-accent-foreground",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}
