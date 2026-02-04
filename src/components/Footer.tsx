export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-auto">
      <div className="content-wide py-8 sm:py-10">
        {/* Stack on mobile, grid on larger screens */}
        <div className="grid gap-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-medium text-base text-foreground mb-3">About this resource</h3>
            <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
              SEND Reform Navigator is an independent public resource. It is not legal advice 
              and does not replace specialist support.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-base text-foreground mb-3">Scope</h3>
            <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
              This resource covers SEND policy in England only. Scotland, Wales, and 
              Northern Ireland have separate systems.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-base text-foreground mb-3">Transparency</h3>
            <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
              All information is clearly labelled as confirmed, being discussed, or unconfirmed. 
              We state what is unknown.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            This is a public resource designed to reduce confusion and anxiety, not to persuade or campaign.
          </p>
        </div>
      </div>
    </footer>
  );
}
