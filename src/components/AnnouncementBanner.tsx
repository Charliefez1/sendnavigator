import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-amber-500 text-amber-950 px-4 py-3 text-sm font-medium relative">
      <div className="max-w-5xl mx-auto pr-8">
        <strong>23 February 2026</strong>. The government published its Schools White Paper today. This is the biggest change to SEND in a generation. We are reviewing all pages and updating content throughout the day. Information on this site is being updated in real time. Check back regularly.
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded hover:bg-amber-600/30 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
