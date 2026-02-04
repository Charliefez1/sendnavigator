import { MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="content-wide py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight leading-tight">
              SEND Reform Navigator
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Understanding what is changing in SEND
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full w-fit">
            <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>England only</span>
          </div>
        </div>
      </div>
    </header>
  );
}
