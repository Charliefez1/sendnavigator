import { useChildProfile, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { Textarea } from "@/components/ui/textarea";
import { sectionContent, SectionQuestion } from "@/config/child-profile-sections";
import { ChildVoiceBlock } from "./ChildVoiceBlock";
import { cn } from "@/lib/utils";
import { AlertTriangle, Users } from "lucide-react";
import { DOMAIN_SECTION_MAP, type SourceType } from "@/config/signal-library";

// Which section indices are core domains (have scoring)
const CORE_SECTION_INDICES = new Set(Object.values(DOMAIN_SECTION_MAP));

const SOURCE_TYPE_OPTIONS: { value: SourceType; label: string }[] = [
  { value: "parent", label: "Parent" },
  { value: "school", label: "School" },
  { value: "clinician", label: "Report" },
  { value: "other", label: "Other" },
];

interface SectionTemplateProps {
  sectionIndex: number;
}

function TextQuestion({ question, value, onChange }: { question: SectionQuestion; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground block">{question.label}</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={question.type === "text-large" ? 6 : 3}
        className="resize-y"
      />
    </div>
  );
}

function SingleSelectQuestion({ question, value, onChange }: { question: SectionQuestion; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground block">{question.label}</label>
      <div className="space-y-1.5">
        {question.options?.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors",
              value === option
                ? "border-primary bg-primary/10 text-foreground font-medium"
                : "border-border bg-card text-foreground hover:bg-muted"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function SourceTypeSelector({ sectionIndex }: { sectionIndex: number }) {
  const { state, setSectionSourceTypes } = useChildProfile();
  const currentSources = state.sectionSourceTypes?.[sectionIndex] || [];

  const toggle = (src: SourceType) => {
    const next = currentSources.includes(src)
      ? currentSources.filter((s) => s !== src)
      : [...currentSources, src];
    setSectionSourceTypes(sectionIndex, next);
  };

  return (
    <div className="bg-muted/30 border border-border rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Users className="w-3.5 h-3.5" />
        Who contributed to this section?
      </div>
      <p className="text-[11px] text-muted-foreground">
        Select all sources. Adding a second source type increases the confidence score for this domain.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {SOURCE_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
              currentSources.includes(opt.value)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SectionTemplate({ sectionIndex }: SectionTemplateProps) {
  const { state, updateSectionAnswer, updateSectionReflection } = useChildProfile();
  const title = SECTION_TITLES[sectionIndex];
  const sectionData = state.sections[sectionIndex];
  const childName = state.setup.childName || "your child";
  const content = sectionContent[sectionIndex];
  const isCoreSection = CORE_SECTION_INDICES.has(sectionIndex);

  const getAnswer = (questionId: string): string => {
    const val = sectionData?.answers?.[questionId];
    if (Array.isArray(val)) return val.join(", ");
    return val || "";
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Section {sectionIndex + 1} of 22</p>
        <h2 className="text-lg font-display font-semibold text-foreground">{title}</h2>
      </div>

      {/* Framing paragraph */}
      {content ? (
        <div className="bg-muted/40 border border-border rounded-lg p-4">
          <p className="text-sm text-foreground leading-relaxed">{content.framing}</p>
        </div>
      ) : (
        <div className="bg-muted/40 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground italic">
            Section content will be added here. This is the template layout for "{title}".
          </p>
        </div>
      )}

      {/* Sensitivity note if present */}
      {content?.note && (
        <div className="flex items-start gap-3 bg-muted/60 border border-border rounded-lg p-4">
          <AlertTriangle className="w-4 h-4 text-status-unconfirmed flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">{content.note}</p>
        </div>
      )}

      {/* Questions */}
      {content ? (
        <div className="space-y-6 py-4 border-t border-border">
          {content.questions.map((question) => {
            if (question.type === "single-select") {
              return (
                <SingleSelectQuestion
                  key={question.id}
                  question={question}
                  value={getAnswer(question.id)}
                  onChange={(v) => updateSectionAnswer(sectionIndex, question.id, v)}
                />
              );
            }
            return (
              <TextQuestion
                key={question.id}
                question={question}
                value={getAnswer(question.id)}
                onChange={(v) => updateSectionAnswer(sectionIndex, question.id, v)}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-4 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Questions for this section will appear here once content is provided.
          </p>
        </div>
      )}

      {/* Child voice toggle */}
      <ChildVoiceBlock sectionIndex={sectionIndex} />

      {/* Source type selector — only for core scored domains */}
      {isCoreSection && <SourceTypeSelector sectionIndex={sectionIndex} />}

      {/* Closing reflection */}
      <div className="pt-6 border-t border-border space-y-2">
        <label className="text-sm font-medium text-foreground block">
          This is a space for you to add anything else about this section. Your own thoughts, other observations, or anything we have not covered.
        </label>
        <Textarea
          value={sectionData?.reflection || ""}
          onChange={(e) => updateSectionReflection(sectionIndex, e.target.value)}
          placeholder={`Anything else about ${childName} that matters here...`}
          rows={4}
          className="resize-y"
        />
      </div>
    </div>
  );
}
