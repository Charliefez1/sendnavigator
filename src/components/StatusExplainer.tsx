import { StatusBadge } from "./StatusBadge";

export function StatusExplainer() {
  return (
    <section className="bg-secondary/30 border border-border rounded-lg p-6">
      <h2 className="text-lg font-medium text-foreground mb-4">
        How we label information
      </h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        All information on this site is clearly categorised. We never blur these categories. 
        If something is unknown, we say it is unknown.
      </p>
      
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <StatusBadge status="confirmed" />
          <p className="text-sm text-muted-foreground">
            Official policy that has been announced, legislated, or formally confirmed by government.
          </p>
        </div>
        
        <div className="space-y-2">
          <StatusBadge status="discussed" />
          <p className="text-sm text-muted-foreground">
            Proposals being considered, reported in credible sources, or under consultation.
          </p>
        </div>
        
        <div className="space-y-2">
          <StatusBadge status="unconfirmed" />
          <p className="text-sm text-muted-foreground">
            Leaked information or speculation. Not decided policy. May never happen.
          </p>
        </div>
      </div>
    </section>
  );
}
