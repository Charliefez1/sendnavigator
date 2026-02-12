import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface SourceCardProps {
  name: string;
  url: string;
}

export function SourceCard({ name, url }: SourceCardProps) {
  const [imgError, setImgError] = useState(false);
  const domain = new URL(url).hostname;
  const thumbnailUrl = `https://image.thum.io/get/width/600/crop/400/${url}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="aspect-[3/2] bg-muted overflow-hidden relative">
        {!imgError ? (
          <img
            src={thumbnailUrl}
            alt={`Preview of ${name}`}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center p-4">
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                alt=""
                className="w-10 h-10 mx-auto mb-2 opacity-60"
              />
              <p className="text-xs text-muted-foreground">{domain}</p>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
          {name}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
            alt=""
            className="w-3.5 h-3.5"
          />
          <span className="truncate">{domain}</span>
          <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  );
}
