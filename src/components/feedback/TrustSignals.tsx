import { Shield, RefreshCw, AlertTriangle, Scale } from "lucide-react";
import { trustSignals } from "@/config/feedback";

export function TrustSignals() {
  return (
    <section className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-medium text-foreground mb-4">
        How we maintain trust
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {/* How information is chosen */}
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground text-sm mb-1">
              How we choose information
            </h3>
            <p className="text-sm text-muted-foreground">
              {trustSignals.transparency.howInformationChosen}
            </p>
          </div>
        </div>

        {/* How disagreement is handled */}
        <div className="flex gap-3">
          <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground text-sm mb-1">
              When sources disagree
            </h3>
            <p className="text-sm text-muted-foreground">
              {trustSignals.transparency.howDisagreementHandled}
            </p>
          </div>
        </div>

        {/* How corrections work */}
        <div className="flex gap-3">
          <RefreshCw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground text-sm mb-1">
              How we handle corrections
            </h3>
            <p className="text-sm text-muted-foreground">
              {trustSignals.transparency.howCorrectionsWork}
            </p>
          </div>
        </div>

        {/* What we don't do */}
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground text-sm mb-1">
              What this resource does not do
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {trustSignals.limits.notLegalAdvice}</li>
              <li>• {trustSignals.limits.notIndividualAdvice}</li>
              <li>• {trustSignals.limits.notCampaigning}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
