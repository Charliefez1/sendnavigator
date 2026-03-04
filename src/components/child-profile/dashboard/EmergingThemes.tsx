import { ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, Zap } from "lucide-react";
import { StructuredTheme, DetectedPattern, ContradictionFlag, ThemeAnalysisResult } from "@/lib/theme-engine";
import type { ThemeConfidence } from "@/config/theme-ontology";

interface Props {
  analysis: ThemeAnalysisResult;
  onNavigateToSection?: (index: number) => void;
}

const CONFIDENCE_STYLES: Record<ThemeConfidence, { bg: string; text: string; label: string }> = {
  emerging: { bg: "bg-muted", text: "text-muted-foreground", label: "Emerging" },
  developing: { bg: "bg-accent", text: "text-accent-foreground", label: "Developing" },
  established: { bg: "bg-primary/10", text: "text-primary", label: "Established" },
};

function ThemeCard({
  theme,
  onNavigateToSection,
}: {
  theme: StructuredTheme;
  onNavigateToSection?: (index: number) => void;
}) {
  const conf = CONFIDENCE_STYLES[theme.confidence];

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">{theme.theme}</p>
        <Badge className={`${conf.bg} ${conf.text} text-[10px] border-0 shrink-0`}>
          {conf.label}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">{theme.description}</p>

      {/* Mechanisms — orange chips */}
      {theme.mechanisms.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Mechanisms
          </p>
          <div className="flex flex-wrap gap-1">
            {theme.mechanisms.map((m) => (
              <span
                key={m.mechanism}
                className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
              >
                {m.mechanism} ({m.signalCount})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contexts — grey chips */}
      {theme.contexts.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Contexts
          </p>
          <div className="flex flex-wrap gap-1">
            {theme.contexts.map((c) => (
              <span
                key={c}
                className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top signals — blue chips */}
      {theme.topSignals.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Evidence
          </p>
          <div className="flex flex-wrap gap-1">
            {theme.topSignals.slice(0, 3).map((s) => (
              <span
                key={s.id}
                className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Linked sections */}
      <div className="flex flex-wrap gap-1 pt-1 border-t border-border">
        {theme.linkedSections.map((idx) => (
          <button
            key={idx}
            onClick={() => onNavigateToSection?.(idx)}
            className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-colors"
          >
            {SECTION_TITLES[idx]}
          </button>
        ))}
      </div>
    </div>
  );
}

function PatternCard({ detected }: { detected: DetectedPattern }) {
  return (
    <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-3 flex items-start gap-2">
      <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-foreground">{detected.pattern.label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
          {detected.pattern.description}
        </p>
        {detected.matchingContexts.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {detected.matchingContexts.map((c) => (
              <span
                key={c}
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContradictionCard({ flag }: { flag: ContradictionFlag }) {
  return (
    <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 p-3 flex items-start gap-2">
      <AlertTriangle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-foreground">
          Environment sensitivity — {flag.domain}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
          {flag.message}
        </p>
        <div className="flex gap-1 mt-1.5">
          {flag.contexts.map((c) => (
            <span
              key={c}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EmergingThemes({ analysis, onNavigateToSection }: Props) {
  const { themes, patterns, contradictions } = analysis;

  if (themes.length === 0 && patterns.length === 0 && contradictions.length === 0) return null;

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Emerging themes
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Structured patterns detected across what you have shared so far
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Themes */}
        {themes.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {themes.map((t) => (
              <ThemeCard key={t.theme} theme={t} onNavigateToSection={onNavigateToSection} />
            ))}
          </div>
        )}

        {/* Detected patterns */}
        {patterns.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Detected patterns
            </p>
            {patterns.map((p) => (
              <PatternCard key={p.pattern.id} detected={p} />
            ))}
          </div>
        )}

        {/* Contradictions */}
        {contradictions.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Environment sensitivity
            </p>
            {contradictions.map((c, i) => (
              <ContradictionCard key={i} flag={c} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
