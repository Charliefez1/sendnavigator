import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="content-wide py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">SEND Reform Navigator</p>
              <p className="text-xs text-muted-foreground">A guide for families</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link 
              to="/about" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link 
              to="/sources" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sources
            </Link>
            <Link 
              to="/questions-and-answers" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Questions
            </Link>
            <Link 
              to="/neurodiversity-global" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Neurodiversity Global
            </Link>
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground max-w-2xl">
            This is an independent public resource. It does not provide legal, medical, or 
            professional advice. Information applies to England only.
          </p>
        </div>
      </div>
    </footer>
  );
}
