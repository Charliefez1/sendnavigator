import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function AITrustNotice() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
      <div className="flex items-start gap-2 mb-2">
        <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-foreground space-y-2">
          <p className="font-medium">Every answer comes from content Charlie and I have personally researched. Nothing else.</p>
          <p>If we do not know something, we will tell you straight. We cannot comment on individual cases or give legal advice.</p>
        </div>
      </div>
      <Link
        to="/how-this-site-works"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors ml-7"
      >
        How this site works — AI, data and security <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
