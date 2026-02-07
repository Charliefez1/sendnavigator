import { Heart, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import neurodiversityLogo from "@/assets/neurodiversity-global-education-logo.png";

export function Header() {
  return (
    <header className="bg-card border-b border-border/60">
      <div className="content-wide py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* SEND Reform Navigator */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Heart className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors flex items-center gap-2">
                SEND Reform Navigator
                <Sparkles className="w-4 h-4 text-primary/60 hidden sm:block" />
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                A friendly guide for families
              </p>
            </div>
          </Link>

          {/* Neurodiversity Global logo - opposite side */}
          <Link to="/neurodiversity-global" className="hover:opacity-80 transition-opacity">
            <img
              src={neurodiversityLogo}
              alt="Neurodiversity Global Education - Neuroinclusive Performance"
              className="h-24 sm:h-32 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
