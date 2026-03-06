import { ReactNode } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle, CheckCircle, HelpCircle, Newspaper } from "lucide-react";

interface InformationLayerProps {
  children: ReactNode;
  emptyMessage?: string;
  layerTitle: string;
}

function ScanCollapseWrapper({ title, children, statusBadge, icon }: { title: string; children: ReactNode; statusBadge: ReactNode; icon: ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4 w-full text-left">
        {icon}
        <h3 className="text-sm font-display font-semibold text-foreground">{title}</h3>
        {statusBadge}
      </div>
      {children}
    </div>
  );
}

function ConfirmedLayer({ children, emptyMessage }: Omit<InformationLayerProps, 'layerTitle'>) {
  const isEmpty = !children;

  return (
    <ScanCollapseWrapper
      title="What is confirmed"
      statusBadge={<StatusBadge status="confirmed" />}
      icon={<div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-status-confirmed/10"><CheckCircle className="w-3.5 h-3.5 text-status-confirmed" /></div>}
    >
      {isEmpty ? (
        <p className="text-muted-foreground italic text-sm">
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
    <ScanCollapseWrapper
      title="What is actively being shaped or reported"
      statusBadge={<StatusBadge status="discussed" />}
      icon={<div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-status-discussed/10"><Newspaper className="w-3.5 h-3.5 text-status-discussed" /></div>}
    >
      {isEmpty ? (
        <p className="text-muted-foreground italic text-sm">
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
    <ScanCollapseWrapper
      title="What is unconfirmed or leaked"
      statusBadge={<StatusBadge status="unconfirmed" />}
      icon={<div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-status-unconfirmed/10"><AlertTriangle className="w-3.5 h-3.5 text-status-unconfirmed" /></div>}
    >
      {!isEmpty && (
        <div className="rounded-lg border p-3 mb-4 flex gap-3 text-sm shadow-sm bg-status-unconfirmed-bg border-status-unconfirmed/20">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-status-unconfirmed" />
          <span className="text-muted-foreground">
            This information is not confirmed policy. It may never happen.
          </span>
        </div>
      )}

      {isEmpty ? (
        <p className="text-muted-foreground italic text-sm">
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
    <section className="content-section py-3">
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-display font-semibold text-foreground">Information by certainty</h2>
        </div>
        <ConfirmedLayer emptyMessage={confirmedEmpty}>{confirmed}</ConfirmedLayer>
        <DiscussedLayer emptyMessage={discussedEmpty}>{discussed}</DiscussedLayer>
        <UnconfirmedLayer emptyMessage={unconfirmedEmpty}>{unconfirmed}</UnconfirmedLayer>
      </div>
    </section>
  );
}

export { ConfirmedLayer, DiscussedLayer, UnconfirmedLayer };
