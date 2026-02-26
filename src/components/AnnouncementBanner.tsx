import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Lightbulb, MessageCircleQuestion, Shield } from "lucide-react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-navy text-navy-foreground relative border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-2 pr-10">
        {/* Single compact line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="font-semibold text-white">23 Feb 2026</span>
          </span>
          <span className="text-white/70">
            Schools White Paper published — content updating throughout the day.
          </span>

          <span className="hidden sm:inline text-white/30">·</span>

          <Link
            to="/richs-take"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <Lightbulb className="w-3 h-3" />
            Rich's Take
          </Link>
          <Link
            to="/questions-and-answers"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <MessageCircleQuestion className="w-3 h-3" />
            Ask Rich
          </Link>
          <Link
            to="/ehcps"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <Shield className="w-3 h-3" />
            EHCP Guide
          </Link>

          <span className="ml-auto text-white/40 hidden sm:inline">
            Last updated: 23rd February 2026
          </span>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-1/2 -translate-y-1/2 right-2 p-1 rounded-md hover:bg-white/10 transition-colors text-white/40 hover:text-white/70"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
