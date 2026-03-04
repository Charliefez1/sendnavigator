import { useState } from "react";
import { useChildProfile, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { isStructuredReport, StructuredAIReport, StructuredSectionInsight } from "@/types/ai-report";
import { parseReflectionBlocks } from "@/lib/reflection-parser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ArrowLeft,
  RefreshCw,
  Eye,
  Lightbulb,
  FileText,
  MessageSquare,
  Check,
  X,
  Pencil,
  Mail,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { InfoTip } from "./InfoTip";

interface ReportDashboardProps {
  onDownloadPDF: () => void;
  onBackToEdit: () => void;
  onRegenerate: () => void;
  onEditSection?: (sectionIndex: number) => void;
  onRegenerateSection?: (sectionIndex: number) => void;
  onEmailReport?: () => void;
}

export function ReportDashboard({
  onDownloadPDF,
  onBackToEdit,
  onRegenerate,
  onEditSection,
  onRegenerateSection,
  onEmailReport,
}: ReportDashboardProps) {
  const { state } = useChildProfile();
  const aiReport = state.aiReport;

  // Track accepted/rejected sections
  const [sectionStatus, setSectionStatus] = useState<Record<number, "accepted" | "rejected" | "pending">>({});

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

  if (!structured) {
    return <LegacyDashboard aiReport={aiReport} onDownloadPDF={onDownloadPDF} onBackToEdit={onBackToEdit} onRegenerate={onRegenerate} />;
  }

  const childName = state.setup.childName || "your child";

  const getStatus = (sectionIndex: number) => sectionStatus[sectionIndex] || "pending";

  const setStatus = (sectionIndex: number, status: "accepted" | "rejected" | "pending") => {
    setSectionStatus((prev) => ({ ...prev, [sectionIndex]: status }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            {childName}'s report
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Review each section, then download or share when you are ready.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Generated {new Date(aiReport.generatedAt).toLocaleString("en-GB")}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onBackToEdit} className="gap-1.5 self-start">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to edit
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* At a Glance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Eye className="w-4 h-4 text-primary" />
              At a glance
              <InfoTip content="A short summary of the key themes from your child's profile. This is the overview that appears at the top of the PDF." />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {structured.openingLine && (
              <div className="text-xs text-muted-foreground space-y-1.5">
                {structured.openingLine.split(/\n+/).filter(p => p.trim()).map((para, i) => (
                  <p key={i} className={i === 0 ? "font-medium text-foreground text-sm" : ""}>{para.trim()}</p>
                ))}
              </div>
            )}
            {structured.topSummary.headline && (
              <p className="text-sm font-medium text-foreground">{structured.topSummary.headline}</p>
            )}
            {structured.topSummary.bullets.length > 0 && (
              <ul className="space-y-1">
                {structured.topSummary.bullets.map((bullet, i) => (
                  <li key={i} className="text-xs text-foreground flex gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
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
              <InfoTip content="Practical strategies for the adults around your child. Written based on what you told us across all sections." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-foreground leading-relaxed space-y-2">
              {structured.waysOfWorking.split(/\n\n+/).filter(p => p.trim()).slice(0, 3).map((para, i) => (
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
              <InfoTip content="Suggested approaches and adjustments. These are not prescriptions. Use what feels right for your child." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-foreground leading-relaxed space-y-2">
              {structured.someThingsThatMayHelp.split(/\n+/).filter(l => l.trim()).slice(0, 5).map((line, i) => (
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
              <InfoTip content="A closing reflection drawing together what the profile tells us about your child as a whole person." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-foreground leading-relaxed space-y-2">
              {structured.conclusion.split(/\n\n+/).filter(p => p.trim()).slice(0, 3).map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section-by-section insights */}
      {structured.sectionInsights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            Section insights ({structured.sectionInsights.length})
            <InfoTip content="Each section you completed has its own AI-written reflection. You can review them one by one. Accept the ones that feel right, exclude any that do not, or regenerate for a fresh version. Regenerating re-reads your answers and writes a new reflection. Your answers stay the same. Only the wording changes." />
          </h3>
          <div className="space-y-3">
            {structured.sectionInsights.map((insight) => (
              <SectionInsightCard
                key={insight.sectionIndex}
                insight={insight}
                status={getStatus(insight.sectionIndex)}
                onAccept={() => setStatus(insight.sectionIndex, "accepted")}
                onReject={() => setStatus(insight.sectionIndex, "rejected")}
                onReset={() => setStatus(insight.sectionIndex, "pending")}
                onEdit={() => onEditSection?.(insight.sectionIndex)}
                onRegenerate={() => onRegenerateSection?.(insight.sectionIndex)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Export bar */}
      <ExportBar
        onDownloadPDF={onDownloadPDF}
        onRegenerate={onRegenerate}
        onEmailReport={onEmailReport}
        generatedAt={aiReport.generatedAt}
      />
    </div>
  );
}

function SectionInsightCard({
  insight,
  status,
  onAccept,
  onReject,
  onReset,
  onEdit,
  onRegenerate,
}: {
  insight: StructuredSectionInsight;
  status: "accepted" | "rejected" | "pending";
  onAccept: () => void;
  onReject: () => void;
  onReset: () => void;
  onEdit?: () => void;
  onRegenerate?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={status === "rejected" ? "opacity-60" : ""}>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <div className="flex items-center justify-between p-3 gap-2">
          <CollapsibleTrigger asChild>
            <button className="flex items-center gap-2 text-left flex-1 min-w-0">
              <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform flex-shrink-0 ${expanded ? "rotate-180" : ""}`} />
              <span className="text-xs font-medium text-foreground truncate">
                {insight.sectionIndex + 1}. {insight.sectionTitle}
              </span>
            </button>
          </CollapsibleTrigger>
          <div className="flex items-center gap-1 flex-shrink-0">
            {status === "accepted" && (
              <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-700 dark:text-green-400 gap-1">
                <Check className="w-2.5 h-2.5" /> Accepted
              </Badge>
            )}
            {status === "rejected" && (
              <Badge variant="outline" className="text-[10px] border-red-500/30 text-red-700 dark:text-red-400 gap-1">
                <X className="w-2.5 h-2.5" /> Excluded
              </Badge>
            )}
            {status !== "pending" && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onReset} title="Reset">
                <RefreshCw className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-3 space-y-4">
              {parseReflectionBlocks(insight.reflection).map((block, j) => (
                <div key={j}>
                  <p className="text-[11px] font-semibold text-primary mb-1">{block.heading}</p>
                  <div className="text-xs text-foreground leading-relaxed space-y-1.5">
                    {block.content.split(/\n+/).filter(p => p.trim()).map((para, k) => (
                      <p key={k}>{para.trim()}</p>
                    ))}
                  </div>
                </div>
              ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {status !== "accepted" && (
                <span className="inline-flex items-center gap-1">
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1" onClick={onAccept}>
                    <Check className="w-3 h-3" /> Accept
                  </Button>
                  <InfoTip content="Include this reflection in your final report." side="bottom" />
                </span>
              )}
              {status !== "rejected" && (
                <span className="inline-flex items-center gap-1">
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1" onClick={onReject}>
                    <X className="w-3 h-3" /> Exclude
                  </Button>
                  <InfoTip content="Remove this reflection from your final report." side="bottom" />
                </span>
              )}
              {onEdit && (
                <span className="inline-flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-[11px] gap-1" onClick={onEdit}>
                    <Pencil className="w-3 h-3" /> Edit section
                  </Button>
                  <InfoTip content="Go back to this section to change your answers. You can regenerate the report afterwards." side="bottom" />
                </span>
              )}
              {onRegenerate && (
                <span className="inline-flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-[11px] gap-1" onClick={onRegenerate}>
                    <RefreshCw className="w-3 h-3" /> Regenerate
                  </Button>
                  <InfoTip content="Ask the AI to write a fresh reflection for this section using your current answers. You will see both versions side by side and can choose which to keep." side="bottom" />
                </span>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function ExportBar({
  onDownloadPDF,
  onRegenerate,
  onEmailReport,
  generatedAt,
}: {
  onDownloadPDF: () => void;
  onRegenerate: () => void;
  onEmailReport?: () => void;
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
        {onEmailReport && (
          <Button variant="outline" onClick={onEmailReport} className="gap-1.5">
            <Mail className="w-4 h-4" />
            Email me a copy
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={handleRegenerate} className="gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" />
          Regenerate entire report
        </Button>
      </div>

      {showCostWarning && (
        <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4 space-y-3">
          <p className="text-sm text-foreground">
            You generated a report less than a minute ago. Regenerating will call AI again.
          </p>
          <div className="flex gap-3">
            <Button size="sm" onClick={() => { setShowCostWarning(false); onRegenerate(); }}>
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

function LegacyDashboard({
  aiReport,
  onDownloadPDF,
  onBackToEdit,
  onRegenerate,
}: {
  aiReport: { report: string; generatedAt: string };
  onDownloadPDF: () => void;
  onBackToEdit: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">Report dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Generated {new Date(aiReport.generatedAt).toLocaleString("en-GB")}
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
            {aiReport.report.slice(0, 2000)}
            {aiReport.report.length > 2000 && (
              <p className="text-muted-foreground mt-2 italic">
                Showing first 2000 characters. Download the PDF for the full report.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <ExportBar onDownloadPDF={onDownloadPDF} onRegenerate={onRegenerate} generatedAt={aiReport.generatedAt} />
    </div>
  );
}
