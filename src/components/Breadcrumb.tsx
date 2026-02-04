import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { navItems } from "./Navigation";

export function Breadcrumb() {
  const location = useLocation();
  
  if (location.pathname === "/") {
    return null;
  }

  const currentPage = navItems.find((item) => item.path === location.pathname);

  return (
    <nav aria-label="Breadcrumb" className="content-wide py-3">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          <span className="text-foreground font-medium" aria-current="page">
            {currentPage?.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}
