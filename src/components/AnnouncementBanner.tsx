import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-amber-500 text-amber-950 px-4 py-3 text-sm font-medium relative">
      <div className="max-w-5xl mx-auto pr-8 space-y-2">
        <p>
          <strong>23 February 2026</strong>. The government published its Schools White Paper today. This is the biggest change to SEND in a generation. We are reviewing all pages and updating content throughout the day. Information on this site is being updated in real time. Check back regularly.
        </p>
        <p className="text-amber-950/90">Three things that will help you right now:</p>
        <div className="flex flex-wrap gap-2">
          <Link to="/richs-take" className="inline-block px-3 py-1 rounded-full bg-amber-950 text-amber-100 text-xs font-semibold hover:bg-amber-900 transition-colors">
            Understand it: Rich's Take
          </Link>
          <Link to="/questions-and-answers" className="inline-block px-3 py-1 rounded-full bg-amber-950 text-amber-100 text-xs font-semibold hover:bg-amber-900 transition-colors">
            Ask a question: Ask Rich
          </Link>
          <Link to="/ehcps" className="inline-block px-3 py-1 rounded-full bg-amber-950 text-amber-100 text-xs font-semibold hover:bg-amber-900 transition-colors">
            Know your child's rights: EHCP Guide
          </Link>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 p-1 rounded hover:bg-amber-600/30 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
