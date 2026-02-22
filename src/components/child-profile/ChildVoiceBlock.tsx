import { useState } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { childVoiceQuestions } from "@/config/child-voice-questions";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ChildVoiceBlockProps {
  sectionIndex: number;
}

export function ChildVoiceBlock({ sectionIndex }: ChildVoiceBlockProps) {
  const { state, updateSectionAnswer } = useChildProfile();
  const childName = state.setup.childName || "your child";
  const sectionData = state.sections[sectionIndex];
  const questions = childVoiceQuestions[sectionIndex];

  const [enabled, setEnabled] = useState(() => {
    if (!questions) return false;
    return questions.some((q) => {
      const val = sectionData?.answers?.[q.id];
      return val && (Array.isArray(val) ? val.length > 0 : val.trim().length > 0);
    });
  });

  if (!questions) return null;

  return (
    <div className="pt-6 border-t border-border space-y-4">
      <div className="flex items-center gap-3">
        <Switch
          id={`child-voice-${sectionIndex}`}
          checked={enabled}
          onCheckedChange={setEnabled}
        />
        <label
          htmlFor={`child-voice-${sectionIndex}`}
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          Would you like to ask {childName} these questions directly?
        </label>
      </div>

      {enabled && (
        <div className="rounded-xl bg-[hsl(var(--accent)/0.15)] border border-[hsl(var(--accent)/0.3)] p-5 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/70">
            In {childName}'s own words
          </p>
          {questions.map((q) => {
            const val = sectionData?.answers?.[q.id];
            const strVal = Array.isArray(val) ? val.join(", ") : val || "";
            return (
              <div key={q.id} className="space-y-2">
                <label className="text-[0.935rem] font-medium text-foreground block leading-relaxed">
                  {q.label}
                </label>
                <Textarea
                  value={strVal}
                  onChange={(e) => updateSectionAnswer(sectionIndex, q.id, e.target.value)}
                  rows={3}
                  className="resize-y bg-background/80 text-[0.935rem]"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
