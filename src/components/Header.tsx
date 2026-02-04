import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="content-wide py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link to="/" className="group">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
                  SEND Reform Navigator
                </h1>
                <p className="text-sm text-muted-foreground">
                  A guide for families
                </p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-3 py-1.5 rounded-full w-fit">
            <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>England</span>
          </div>
        </div>
      </div>
    </header>
  );
}
