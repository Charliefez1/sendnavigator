import { useChildProfile } from "@/contexts/ChildProfileContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateProfilePDF } from "@/lib/generate-profile-pdf";

export function FinalScreen() {
  const { state, updateFinalStatement } = useChildProfile();
  const childName = state.setup.childName || "your child";

  const handleGeneratePDF = () => {
    generateProfilePDF(state);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">
          One last thing
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          You have been through a lot to get here. Before we put the document together, there is one more question.
        </p>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground block">
          What do you most want anyone reading this document to understand about {childName}?
        </label>
        <Textarea
          value={state.finalStatement}
          onChange={(e) => updateFinalStatement(e.target.value)}
          placeholder={`The most important thing about ${childName} is...`}
          rows={6}
          className="resize-y"
        />
      </div>

      <div className="pt-4">
        <Button onClick={handleGeneratePDF} size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Generate my PDF
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Nothing is sent anywhere. The PDF is created in your browser and downloaded directly to your device.
        </p>
      </div>
    </div>
  );
}
