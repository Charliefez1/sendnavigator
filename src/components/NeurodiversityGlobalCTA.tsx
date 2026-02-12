import { ExternalLink } from "lucide-react";
import ndgLogo from "@/assets/neurodiversity-global-logo.jpeg";

export function NeurodiversityGlobalCTA() {
  return (
    <div className="content-section py-6">
      <a
        href="https://neurodiversityglobal.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
      >
        <img
          src={ndgLogo}
          alt="Neurodiversity Global"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            Looking for greater awareness at work, school, or club?
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Book some time with Rich or Charlie from Neurodiversity Global
          </p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </a>
    </div>
  );
}
