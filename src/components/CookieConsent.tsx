import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6" role="dialog" aria-label="Cookie consent">
      <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-2xl p-5">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">This site uses cookies</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                We use essential cookies to remember your preferences (such as theme and text size) and anonymous analytics to understand how people use this resource. We do not use advertising or tracking cookies. Read our{" "}
                <Link to="/privacy-policy" className="text-primary underline underline-offset-2">privacy policy</Link>.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={accept} size="sm" className="text-xs px-4">
                Accept all
              </Button>
              <Button onClick={decline} variant="outline" size="sm" className="text-xs px-4">
                Essential only
              </Button>
            </div>
          </div>
          <button onClick={decline} className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="Dismiss">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
