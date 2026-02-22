import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

export function NeurodivergenceUpdatesCTA() {
  return (
    <div className="content-section py-4">
      <Link
        to="/neurodiversity-global"
        className="block rounded-xl border border-border bg-card p-5 shadow-lg hover:border-primary/50 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Keep up to date with the world of neurodivergence
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Neurodiversity Global: neuroinclusion consulting, training, and strategy.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
