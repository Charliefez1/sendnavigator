export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-auto">
      <div className="content-wide py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-medium text-foreground mb-2">About this resource</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SEND Reform Navigator is an independent public resource. It is not legal advice 
              and does not replace specialist support.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Scope</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This resource covers SEND policy in England only. Scotland, Wales, and 
              Northern Ireland have separate systems.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Transparency</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All information is clearly labelled as confirmed, being discussed, or unconfirmed. 
              We state what is unknown.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            This is a public resource designed to reduce confusion and anxiety, not to persuade or campaign.
          </p>
        </div>
      </div>
    </footer>
  );
}
