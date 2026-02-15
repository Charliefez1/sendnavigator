import { ReactNode, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { useExperienceMode } from "@/contexts/ExperienceModeContext";

interface InformationLayerProps {
  children: ReactNode;
  emptyMessage?: string;
  layerTitle: string;
}

function ScanCollapseWrapper({ title, children, statusBadge }: { title: string; children: ReactNode; statusBadge: ReactNode }) {
  const { mode } = useExperienceMode();
  const [expanded, setExpanded] = useState(false);
  const isScan = mode === "scan";
  const showBody = !isScan || expanded;

  return (
    <div className="mb-8">
      <button
        onClick={() => isScan && setExpanded(!expanded)}
        className={`flex items-center gap-3 mb-4 w-full text-left ${isScan ? "cursor-pointer hover:opacity-80" : ""}`}
        disabled={!isScan}
      >
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {statusBadge}
        {isScan && (expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" /> : <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />)}
      </button>
      {showBody && children}
    </div>
  );
}

function ConfirmedLayer({ children, emptyMessage }: Omit<InformationLayerProps, 'layerTitle'>) {
  const isEmpty = !children;
  
  return (
    <ScanCollapseWrapper title="What is confirmed" statusBadge={<StatusBadge status="confirmed" />}>
      {isEmpty ? (
        <p className="text-muted-foreground italic">
          {emptyMessage || "No confirmed information available for this topic yet."}
        </p>
      ) : (
        <div className="prose-calm">{children}</div>
      )}
    </ScanCollapseWrapper>
  );
}

function DiscussedLayer({ children, emptyMessage }: Omit<InformationLayerProps, 'layerTitle'>) {
  const isEmpty = !children;
  
  return (
    <ScanCollapseWrapper title="What is being discussed or reported" statusBadge={<StatusBadge status="discussed" />}>
      {isEmpty ? (
        <p className="text-muted-foreground italic">
          {emptyMessage || "No credible reporting on this topic at present."}
        </p>
      ) : (
        <div className="prose-calm">{children}</div>
      )}
    </ScanCollapseWrapper>
  );
}

function UnconfirmedLayer({ children, emptyMessage }: Omit<InformationLayerProps, 'layerTitle'>) {
  const isEmpty = !children;
  
  return (
    <ScanCollapseWrapper title="What is unconfirmed or leaked" statusBadge={<StatusBadge status="unconfirmed" />}>
      {!isEmpty && (
        <div className="bg-status-unconfirmed-bg border border-[hsl(var(--status-unconfirmed-border))] rounded-md p-3 mb-4 flex gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-status-unconfirmed flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            This information is not confirmed policy. It may never happen.
          </span>
        </div>
      )}
      
      {isEmpty ? (
        <p className="text-muted-foreground italic">
          {emptyMessage || "No unconfirmed information relevant to this topic."}
        </p>
      ) : (
        <div className="prose-calm">{children}</div>
      )}
    </ScanCollapseWrapper>
  );
}

interface InformationLayersProps {
  confirmed?: ReactNode;
  discussed?: ReactNode;
  unconfirmed?: ReactNode;
  confirmedEmpty?: string;
  discussedEmpty?: string;
  unconfirmedEmpty?: string;
}

export function InformationLayers({
  confirmed,
  discussed,
  unconfirmed,
  confirmedEmpty,
  discussedEmpty,
  unconfirmedEmpty,
}: InformationLayersProps) {
  return (
    <section className="content-section py-8 border-t border-border">
      <h2 className="text-xl font-semibold text-foreground mb-6">Information by certainty</h2>
      <ConfirmedLayer emptyMessage={confirmedEmpty}>{confirmed}</ConfirmedLayer>
      <DiscussedLayer emptyMessage={discussedEmpty}>{discussed}</DiscussedLayer>
      <UnconfirmedLayer emptyMessage={unconfirmedEmpty}>{unconfirmed}</UnconfirmedLayer>
    </section>
  );
}

export { ConfirmedLayer, DiscussedLayer, UnconfirmedLayer };
