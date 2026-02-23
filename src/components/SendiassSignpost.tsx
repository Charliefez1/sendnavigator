import { Link } from "react-router-dom";
import { MapPin, ExternalLink, ArrowRight } from "lucide-react";

/**
 * Short signpost banner for SENDIASS — drop into any page.
 * Uses DEEP BLUE accent (rights/guidance family).
 */
export function SendiassSignpost() {
  return (
    <div className="rounded-xl border-l-4 border-l-[hsl(var(--accent-deep-blue))] border border-[hsl(var(--accent-deep-blue)/0.2)] bg-[hsl(var(--accent-deep-blue-bg))] p-5">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--accent-deep-blue)/0.12)] flex-shrink-0 mt-0.5">
          <MapPin className="w-5 h-5 text-[hsl(var(--accent-deep-blue))]" />
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
              href="https://councilfordisabledchildren.org.uk/about-us-0/networks/information-advice-and-support-services-network/find-your-local-ias-service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--accent-deep-blue))] hover:underline"
            >
              → Find your local SENDIASS
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              to="/sendiass"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[hsl(var(--accent-deep-blue))] transition-colors"
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
