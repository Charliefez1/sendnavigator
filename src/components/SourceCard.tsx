import { ExternalLink } from "lucide-react";

interface SourceCardProps {
  name: string;
  url: string;
}

// Map known domains to high-quality logo URLs
const domainLogos: Record<string, string> = {
  "www.gov.uk": "https://www.gov.uk/assets/static/govuk-opengraph-image-dade4d4e2800c8ce7d10fa3feba928b096f49f5a3518e703e3687e1e.png",
  "gov.uk": "https://www.gov.uk/assets/static/govuk-opengraph-image-dade4d4e2800c8ce7d10fa3feba928b096f49f5a3518e703e3687e1e.png",
  "explore-education-statistics.service.gov.uk": "https://www.gov.uk/assets/static/govuk-opengraph-image-dade4d4e2800c8ce7d10fa3feba928b096f49f5a3518e703e3687e1e.png",
  "consult.education.gov.uk": "https://www.gov.uk/assets/static/govuk-opengraph-image-dade4d4e2800c8ce7d10fa3feba928b096f49f5a3518e703e3687e1e.png",
  "www.legislation.gov.uk": "https://www.gov.uk/assets/static/govuk-opengraph-image-dade4d4e2800c8ce7d10fa3feba928b096f49f5a3518e703e3687e1e.png",
  "committees.parliament.uk": "https://www.parliament.uk/globalassets/assets/artwork/parliament-og-image.png",
  "publications.parliament.uk": "https://www.parliament.uk/globalassets/assets/artwork/parliament-og-image.png",
  "hansard.parliament.uk": "https://www.parliament.uk/globalassets/assets/artwork/parliament-og-image.png",
  "researchbriefings.files.parliament.uk": "https://www.parliament.uk/globalassets/assets/artwork/parliament-og-image.png",
  "commonslibrary.parliament.uk": "https://www.parliament.uk/globalassets/assets/artwork/parliament-og-image.png",
  "www.parliament.uk": "https://www.parliament.uk/globalassets/assets/artwork/parliament-og-image.png",
};

// Friendly domain labels
const domainLabels: Record<string, string> = {
  "www.gov.uk": "GOV.UK",
  "gov.uk": "GOV.UK",
  "explore-education-statistics.service.gov.uk": "GOV.UK Statistics",
  "consult.education.gov.uk": "GOV.UK Consultation",
  "www.legislation.gov.uk": "UK Legislation",
  "committees.parliament.uk": "UK Parliament",
  "publications.parliament.uk": "UK Parliament",
  "hansard.parliament.uk": "Hansard",
  "researchbriefings.files.parliament.uk": "UK Parliament",
  "commonslibrary.parliament.uk": "Commons Library",
  "www.nao.org.uk": "National Audit Office",
  "ifs.org.uk": "Institute for Fiscal Studies",
  "www.local.gov.uk": "Local Government Association",
  "www.theguardian.com": "The Guardian",
  "www.ft.com": "Financial Times",
  "www.specialneedsjungle.com": "Special Needs Jungle",
  "contact.org.uk": "Contact",
  "www.disabilityrightsuk.org": "Disability Rights UK",
};

export function SourceCard({ name, url }: SourceCardProps) {
  const domain = new URL(url).hostname;
  const logoUrl = domainLogos[domain];
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  const label = domainLabels[domain] || domain.replace(/^www\./, "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 p-3 rounded-xl border border-border bg-card shadow-md hover:border-primary/30 hover:shadow-lg transition-all duration-200"
    >
      {/* Logo / favicon */}
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={logoUrl || faviconUrl}
          alt=""
          loading="lazy"
          className={logoUrl ? "w-full h-full object-cover" : "w-6 h-6"}
          onError={(e) => {
            (e.target as HTMLImageElement).src = faviconUrl;
            (e.target as HTMLImageElement).className = "w-6 h-6";
          }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {name}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-xs text-muted-foreground truncate">{label}</span>
          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
      </div>
    </a>
  );
}
