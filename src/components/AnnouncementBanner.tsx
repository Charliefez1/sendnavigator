import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Lightbulb, MessageCircleQuestion, Shield } from "lucide-react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-[hsl(var(--banner-breaking))] text-[hsl(var(--banner-breaking-foreground))] relative">
      {/* Top line: breaking announcement */}
      <div className="max-w-5xl mx-auto px-4 py-2.5 pr-10">
        <p className="text-sm leading-relaxed">
          <span className="inline-flex items-center gap-1.5 mr-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="font-semibold">23 Feb 2026</span>
          </span>
          <span className="opacity-90">
            Schools White Paper published. Biggest change to SEND in a generation. Content updating throughout the day.
          </span>
        </p>

        {/* Action links row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
          <span className="text-xs font-medium opacity-80">Act now:</span>
          <Link
            to="/richs-take"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Rich's Take
          </Link>
          <span className="opacity-40 hidden sm:inline">|</span>
          <Link
            to="/questions-and-answers"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Ask Rich
          </Link>
          <span className="opacity-40 hidden sm:inline">|</span>
          <Link
            to="/ehcps"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            <Shield className="w-3.5 h-3.5" />
            EHCP Guide
          </Link>
          <span className="ml-auto text-xs opacity-70 hidden sm:inline-flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
            Last updated: 23rd February 2026
          </span>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2.5 right-3 p-1 rounded-md hover:bg-white/20 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
