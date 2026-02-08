import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-auto">
      <div className="content-wide py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">SEND Reform Navigator</p>
              <p className="text-sm text-muted-foreground">A friendly guide for families</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-3">
            {[
              { to: "/about", label: "About" },
              { to: "/why-i-built-this", label: "Why I built this" },
              { to: "/sources", label: "Sources" },
              { to: "/questions-and-answers", label: "Questions" },
              { to: "/neurodiversity-global", label: "Neurodiversity Global" },
              { to: "/rich-ferriman", label: "Rich Ferriman" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-border/60 flex items-end justify-between">
          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
            This is an independent public resource. It does not provide legal, medical, or
            professional advice. Information applies to England only.
          </p>
          <Link
            to="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
