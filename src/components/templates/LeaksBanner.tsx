import { AlertTriangle } from "lucide-react";

export function LeaksBanner() {
  return (
    <div className="content-section pt-6">
      <div className="bg-status-unconfirmed-bg border-2 border-[hsl(var(--status-unconfirmed-border))] rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-6 h-6 text-status-unconfirmed flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">
              This page covers unconfirmed reports and briefings
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              These are not government policy. They may never become real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
