import { MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="content-wide py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              SEND Reform Navigator
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Understanding what is changing in SEND
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>England only</span>
          </div>
        </div>
      </div>
    </header>
  );
}
