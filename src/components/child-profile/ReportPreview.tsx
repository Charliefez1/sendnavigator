import { useChildProfile } from "@/contexts/ChildProfileContext";
import { isStructuredReport, StructuredAIReport } from "@/types/ai-report";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Download, ArrowLeft, RefreshCw, ChevronDown, Eye, Lightbulb, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";

interface ReportPreviewProps {
  onDownloadPDF: () => void;
  onBackToEdit: () => void;
  onRegenerate: () => void;
}

export function ReportPreview({ onDownloadPDF, onBackToEdit, onRegenerate }: ReportPreviewProps) {
  const { state } = useChildProfile();
  const aiReport = state.aiReport;

  if (!aiReport) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <p className="text-sm text-muted-foreground">No report has been generated yet.</p>
      </div>
    );
  }

  const structured: StructuredAIReport | null =
    aiReport.structured && isStructuredReport(aiReport.structured)
      ? aiReport.structured
      : null;

  // For legacy text reports, show a simpler preview
  if (!structured) {
    return (
      <LegacyPreview
        reportText={aiReport.report}
        generatedAt={aiReport.generatedAt}
        onDownloadPDF={onDownloadPDF}
        onBackToEdit={onBackToEdit}
        onRegenerate={onRegenerate}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">
          Report preview
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review the AI-generated report before downloading your PDF.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Generated {new Date(aiReport.generatedAt).toLocaleString("en-GB")}
        </p>
      </div>

      {/* At a Glance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Eye className="w-4 h-4 text-primary" />
            At a glance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {structured.topSummary.headline && (
            <p className="text-sm font-medium text-foreground">
              {structured.topSummary.headline}
            </p>
          )}
          {structured.topSummary.bullets.length > 0 && (
            <ul className="space-y-1.5">
              {structured.topSummary.bullets.map((bullet, i) => (
                <li key={i} className="text-sm text-foreground flex gap-2">
                  <span className="text-primary flex-shrink-0 mt-0.5">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Ways of Working */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            Ways of working
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-foreground leading-relaxed space-y-3">
            {structured.waysOfWorking.split(/\n\n+/).filter(p => p.trim()).map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Some Things That May Help */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Some things that may help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-foreground leading-relaxed space-y-3">
            {structured.someThingsThatMayHelp.split(/\n+/).filter(l => l.trim()).map((line, i) => (
              <p key={i}>{line.trim()}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <FileText className="w-4 h-4 text-green-600" />
            Conclusion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-foreground leading-relaxed space-y-3">
            {structured.conclusion.split(/\n\n+/).filter(p => p.trim()).map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Insights (collapsed) */}
      {structured.sectionInsights.length > 0 && (
        <SectionInsightsAccordion insights={structured.sectionInsights} />
      )}

      {/* Action buttons */}
      <ActionButtons
        onDownloadPDF={onDownloadPDF}
        onBackToEdit={onBackToEdit}
        onRegenerate={onRegenerate}
        generatedAt={aiReport.generatedAt}
      />
    </div>
  );
}

function SectionInsightsAccordion({ insights }: { insights: StructuredAIReport["sectionInsights"] }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors rounded-lg">
            <span className="text-sm font-medium text-foreground">
              Section-by-section insights ({insights.length} sections)
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                <p className="text-xs font-medium text-primary mb-1.5">
                  {insight.sectionIndex + 1}. {insight.sectionTitle}
                </p>
                <div className="text-sm text-foreground leading-relaxed space-y-2">
                  {insight.reflection.split(/\n\n+/).filter(p => p.trim()).map((para, j) => (
                    <p key={j}>{para.trim()}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function ActionButtons({
  onDownloadPDF,
  onBackToEdit,
  onRegenerate,
  generatedAt,
}: {
  onDownloadPDF: () => void;
  onBackToEdit: () => void;
  onRegenerate: () => void;
  generatedAt: string;
}) {
  const [showCostWarning, setShowCostWarning] = useState(false);

  const handleRegenerate = () => {
    const elapsed = Date.now() - new Date(generatedAt).getTime();
    if (elapsed < 60_000) {
      setShowCostWarning(true);
      return;
    }
    onRegenerate();
  };

  return (
    <div className="space-y-3 pt-4 border-t border-border">
      <div className="flex flex-wrap gap-3">
        <Button onClick={onDownloadPDF} className="gap-1.5">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" onClick={onBackToEdit} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to edit
        </Button>
        <Button variant="outline" size="sm" onClick={handleRegenerate} className="gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" />
          Regenerate report
        </Button>
      </div>

      {showCostWarning && (
        <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4 space-y-3">
          <p className="text-sm text-foreground">
            You generated a report less than a minute ago. Regenerating will call AI again.
          </p>
          <div className="flex gap-3">
            <Button
              size="sm"
              onClick={() => {
                setShowCostWarning(false);
                onRegenerate();
              }}
            >
              Continue anyway
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowCostWarning(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function LegacyPreview({
  reportText,
  generatedAt,
  onDownloadPDF,
  onBackToEdit,
  onRegenerate,
}: {
  reportText: string;
  generatedAt: string;
  onDownloadPDF: () => void;
  onBackToEdit: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">
          Report preview
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Generated {new Date(generatedAt).toLocaleString("en-GB")}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
            {reportText.slice(0, 2000)}
            {reportText.length > 2000 && (
              <p className="text-muted-foreground mt-2 italic">
                Showing first 2000 characters. Download the PDF for the full report.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <ActionButtons
        onDownloadPDF={onDownloadPDF}
        onBackToEdit={onBackToEdit}
        onRegenerate={onRegenerate}
        generatedAt={generatedAt}
      />
    </div>
  );
}
