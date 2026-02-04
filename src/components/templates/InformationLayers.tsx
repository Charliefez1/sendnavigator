import { ReactNode } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle } from "lucide-react";

interface InformationLayerProps {
  children: ReactNode;
  emptyMessage?: string;
}

function ConfirmedLayer({ children, emptyMessage }: InformationLayerProps) {
  const isEmpty = !children;
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-medium text-foreground">What is confirmed</h3>
        <StatusBadge status="confirmed" />
      </div>
      {isEmpty ? (
        <p className="text-muted-foreground italic">
          {emptyMessage || "No confirmed information available for this topic yet."}
        </p>
      ) : (
        <div className="prose-calm">{children}</div>
      )}
    </div>
  );
}

function DiscussedLayer({ children, emptyMessage }: InformationLayerProps) {
  const isEmpty = !children;
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-medium text-foreground">What is being discussed or reported</h3>
        <StatusBadge status="discussed" />
      </div>
      {isEmpty ? (
        <p className="text-muted-foreground italic">
          {emptyMessage || "No credible reporting on this topic at present."}
        </p>
      ) : (
        <div className="prose-calm">{children}</div>
      )}
    </div>
  );
}

function UnconfirmedLayer({ children, emptyMessage }: InformationLayerProps) {
  const isEmpty = !children;
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-medium text-foreground">What is unconfirmed or leaked</h3>
        <StatusBadge status="unconfirmed" />
      </div>
      
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
    </div>
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
