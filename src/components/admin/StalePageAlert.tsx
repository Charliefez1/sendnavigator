import { AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface StaleFlag {
  id: string;
  page_path: string;
  flag_reason: string;
  status: string;
}

interface StalePageAlertProps {
  flags: StaleFlag[];
  onMarkAllReviewed: () => void;
  onViewFlags: () => void;
  loading?: boolean;
}

export function StalePageAlert({ flags, onMarkAllReviewed, onViewFlags, loading }: StalePageAlertProps) {
  const staleFlags = flags.filter((f) => f.status === "stale");

  if (staleFlags.length === 0) return null;

  // Group by page
  const grouped = staleFlags.reduce<Record<string, StaleFlag[]>>((acc, f) => {
    if (!acc[f.page_path]) acc[f.page_path] = [];
    acc[f.page_path].push(f);
    return acc;
  }, {});

  const pageCount = Object.keys(grouped).length;

  return (
    <Alert variant="destructive" className="border-destructive bg-destructive/5">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="text-base font-bold">
        {staleFlags.length} stale page flag{staleFlags.length > 1 ? "s" : ""} across {pageCount} page{pageCount > 1 ? "s" : ""}
      </AlertTitle>
      <AlertDescription className="mt-3 space-y-3">
        <div className="grid gap-2">
          {Object.entries(grouped).map(([path, pageFlags]) => (
            <div key={path} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-destructive" />
              <div>
                <span className="font-mono font-semibold text-foreground">{path}</span>
                <span className="text-muted-foreground ml-2">
                  — {pageFlags.map((f) => f.flag_reason).join("; ")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant="destructive"
            onClick={onViewFlags}
            className="rounded-full gap-1.5"
          >
            <AlertTriangle className="h-3.5 w-3.5" /> Review Flags
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onMarkAllReviewed}
            disabled={loading}
            className="rounded-full gap-1.5"
          >
            <CheckCircle className="h-3.5 w-3.5" /> Mark All Reviewed
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
