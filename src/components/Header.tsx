import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import neurodiversityLogo from "@/assets/neurodiversity-global-education-logo.png";

export function Header() {
  return (
    <header className="bg-navy text-navy-foreground">
      <div className="content-wide py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
              <Heart className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight leading-tight group-hover:opacity-90 transition-opacity flex items-center gap-2">
                SEND Reform Navigator
                <Sparkles className="w-4 h-4 text-white/50 hidden sm:block" />
              </h1>
              <p className="text-sm text-navy-muted font-medium">
                A friendly guide for families
              </p>
            </div>
          </Link>

          <Link to="/neurodiversity-global" className="hover:opacity-80 transition-opacity">
            <img
              src={neurodiversityLogo}
              alt="Neurodiversity Global Education"
              className="h-20 sm:h-28 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
