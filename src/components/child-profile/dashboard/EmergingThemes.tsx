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

const CONFIDENCE_STYLES: Record<ThemeConfidence, { dot: string; label: string; badge: string; border: string }> = {
  emerging: { dot: "bg-muted-foreground/50", label: "Emerging", badge: "bg-secondary text-muted-foreground", border: "border-l-muted-foreground/40" },
  developing: { dot: "bg-[hsl(var(--accent-amber))]", label: "Developing", badge: "bg-[hsl(var(--accent-amber-bg))] text-[hsl(var(--accent-amber))]", border: "border-l-[hsl(var(--accent-amber))]" },
  established: { dot: "bg-[hsl(var(--accent-teal))]", label: "Established", badge: "bg-[hsl(var(--accent-teal-bg))] text-[hsl(var(--accent-teal))]", border: "border-l-[hsl(var(--accent-teal))]" },
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
    <div className={`group rounded-xl border border-border border-l-4 ${conf.border} bg-card p-4 space-y-3 shadow-card hover:shadow-card-hover transition-shadow duration-200`}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-card ${
            theme.confidence === "established" ? "bg-[hsl(var(--accent-teal))] ring-[hsl(var(--accent-teal)/0.3)]"
            : theme.confidence === "developing" ? "bg-[hsl(var(--accent-amber))] ring-[hsl(var(--accent-amber)/0.3)]"
            : "bg-muted-foreground/50 ring-muted-foreground/20"
          }`} />
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
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground hover:bg-[hsl(var(--accent-teal-bg))] hover:text-[hsl(var(--accent-teal))] transition-colors flex items-center gap-0.5"
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

/* ── Sequence Card (formerly Pattern Card) ── */
function SequenceCard({ detected }: { detected: DetectedPattern }) {
  return (
    <div className="rounded-xl border border-[hsl(var(--accent-amber)/0.3)] border-l-4 border-l-[hsl(var(--accent-amber))] bg-[hsl(var(--accent-amber-bg))] p-3 flex items-start gap-2.5 shadow-sm">
      <div className="rounded-full bg-[hsl(var(--accent-amber)/0.2)] p-1.5 shrink-0 mt-0.5">
        <Zap className="w-3.5 h-3.5 text-[hsl(var(--accent-amber))]" />
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
    <div className="rounded-xl border border-[hsl(var(--accent-coral)/0.3)] border-l-4 border-l-[hsl(var(--accent-coral))] bg-[hsl(var(--accent-coral-bg))] p-3 flex items-start gap-2.5 shadow-sm">
      <div className="rounded-full bg-[hsl(var(--accent-coral)/0.2)] p-1.5 shrink-0 mt-0.5">
        <AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--accent-coral))]" />
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
          <div className="rounded-full bg-[hsl(var(--accent-violet-bg))] p-1">
            <Lightbulb className="w-4 h-4 text-[hsl(var(--accent-violet))]" />
          </div>
          Emerging patterns
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

        {/* Pattern cards (formerly Theme cards) */}
        {themes.length > 0 && (
          <div className="space-y-2">
            <SectionHeading>Pattern details</SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2">
              {themes.map((t) => (
                <ThemeCard key={t.theme} theme={t} onNavigateToSection={onNavigateToSection} />
              ))}
            </div>
          </div>
        )}

        {/* Recognised sequences (formerly Detected patterns) */}
        {patterns.length > 0 && (
          <div className="space-y-2">
            <SectionHeading>Recognised sequences</SectionHeading>
            <div className="space-y-2">
              {patterns.map((p) => (
                <SequenceCard key={p.pattern.id} detected={p} />
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
    warm: "bg-[hsl(var(--accent-coral-bg))] text-[hsl(var(--accent-coral))]",
    muted: "bg-[hsl(var(--accent-deep-blue-bg))] text-[hsl(var(--accent-deep-blue))]",
    accent: "bg-[hsl(var(--accent-teal-bg))] text-[hsl(var(--accent-teal))]",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}
