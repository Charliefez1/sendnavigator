import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function LivedExperienceCTA() {
  return (
    <div className="content-section py-4">
      <Link
        to="/community-questions"
        className="block rounded-xl border border-border bg-card p-5 shadow-lg hover:border-primary/50 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Have a comment or want to tell us your lived experience?
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your voice matters. Share what life is really like navigating the SEND system.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
