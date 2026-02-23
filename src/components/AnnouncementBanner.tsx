import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Lightbulb, MessageCircleQuestion, Shield } from "lucide-react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full border-b border-amber-600/20 bg-gradient-to-r from-amber-50 via-amber-50 to-orange-50 dark:from-amber-950/40 dark:via-amber-950/30 dark:to-orange-950/30 text-foreground relative">
      {/* Top line: breaking announcement */}
      <div className="max-w-5xl mx-auto px-4 py-2.5 pr-10">
        <p className="text-sm leading-relaxed">
          <span className="inline-flex items-center gap-1.5 mr-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span className="font-semibold text-foreground">23 Feb 2026</span>
          </span>
          <span className="text-muted-foreground">
            Schools White Paper published. Biggest change to SEND in a generation. Content updating throughout the day.
          </span>
        </p>

        {/* Action links row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
          <span className="text-xs font-medium text-muted-foreground">Act now:</span>
          <Link
            to="/richs-take"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Rich's Take
          </Link>
          <span className="text-border hidden sm:inline">|</span>
          <Link
            to="/questions-and-answers"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Ask Rich
          </Link>
          <span className="text-border hidden sm:inline">|</span>
          <Link
            to="/ehcps"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            EHCP Guide
          </Link>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2.5 right-3 p-1 rounded-md hover:bg-foreground/5 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}
