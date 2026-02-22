import { useChildProfile, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { Textarea } from "@/components/ui/textarea";

interface SectionTemplateProps {
  sectionIndex: number;
}

export function SectionTemplate({ sectionIndex }: SectionTemplateProps) {
  const { state, updateSectionReflection } = useChildProfile();
  const title = SECTION_TITLES[sectionIndex];
  const sectionData = state.sections[sectionIndex];
  const childName = state.setup.childName || "your child";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Section {sectionIndex + 1} of 22</p>
        <h2 className="text-lg font-display font-semibold text-foreground">{title}</h2>
      </div>

      {/* Framing paragraph placeholder - to be populated per section */}
      <div className="bg-muted/40 border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground italic">
          Section content will be added here. This is the template layout for "{title}".
        </p>
      </div>

      {/* Question placeholders - to be populated per section */}
      <div className="space-y-4 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Questions for this section will appear here once content is provided.
        </p>
      </div>

      {/* Closing reflection - present on every section */}
      <div className="pt-6 border-t border-border space-y-2">
        <label className="text-sm font-medium text-foreground block">
          Looking at what you have written, what do you want to make sure is in the document?
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
