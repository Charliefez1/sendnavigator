import { Link } from "react-router-dom";
import { MapPin, ExternalLink, ArrowRight } from "lucide-react";

/**
 * Short signpost banner for SENDIASS — drop into any page.
 * Shows on homepage, What To Do Right Now, and footer area.
 */
export function SendiassSignpost() {
  return (
    <div className="rounded-xl border border-[hsl(var(--accent-sage)/0.3)] bg-[hsl(var(--accent-sage-bg))] p-5">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--accent-sage)/0.15)] flex-shrink-0 mt-0.5">
          <MapPin className="w-5 h-5 text-[hsl(var(--accent-sage))]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-display font-bold text-foreground">
            Did you know you have a free local advice service?
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Every local authority in England funds a free, impartial service called <strong>SENDIASS</strong>, for parents and young people navigating SEND. Most families never hear about it.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <a
              href="https://councilfordisabledchildren.org.uk/iassnetwork/find-your-local-iass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              → Find your local SENDIASS
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              to="/sendiass"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Learn more
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
