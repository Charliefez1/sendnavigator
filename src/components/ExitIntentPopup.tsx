import { useState, useEffect, useCallback, useRef } from "react";
import { X, ExternalLink, Mail, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import smartphoneFreeImg from "@/assets/resource-smartphone-free.png";
import awbpImg from "@/assets/resource-awbp.png";

const linkedSites = [
  {
    href: "https://smartphonefree.neurodiversityglobal.com/",
    title: "The Day We Gave Children Dopamine on Demand",
    tag: "Smartphone Free",
    image: smartphoneFreeImg,
  },
  {
    href: "https://awbp.neuro.support/",
    title: "It's Time to Be Educated by a Clown",
    tag: "Open Letter",
    image: awbpImg,
  },
];

const furtherReading = [
  { label: "Rich's Take", path: "/richs-take" },
  { label: "My Child Profile", path: "/my-child-profile" },
  { label: "SEND Report 2026", path: "/state-of-send-2026" },
  { label: "The EHCP Guide", path: "/ehcps" },
];

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const armedRef = useRef(false);
  const lastScrollY = useRef(0);
  const scrollingUp = useRef(0);
  const cooldownRef = useRef(false);

  const triggerPopup = useCallback(() => {
    if (!armedRef.current || cooldownRef.current || sessionStorage.getItem("exitIntentDismissed")) return;
    setShow(true);
  }, []);

  const startCooldown = useCallback(() => {
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 5000);
  }, []);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when mouse leaves via the very top of the viewport
      // and with clear upward intent (not just brushing the toolbar)
      if (e.clientY <= 0 && e.relatedTarget === null) {
        triggerPopup();
        startCooldown();
      }
    },
    [triggerPopup, startCooldown]
  );

  // Mobile: detect rapid scroll-to-top (user pulling up to leave)
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    if (currentY < lastScrollY.current && currentY < 100) {
      scrollingUp.current++;
      if (scrollingUp.current >= 3) {
        triggerPopup();
        scrollingUp.current = 0;
      }
    } else {
      scrollingUp.current = 0;
    }
    lastScrollY.current = currentY;
  }, [triggerPopup]);

  // Mobile: detect back button / popstate
  const handlePopState = useCallback(() => {
    // Push state back so user stays, then show popup
    window.history.pushState(null, "", window.location.href);
    triggerPopup();
  }, [triggerPopup]);

  useEffect(() => {
    if (sessionStorage.getItem("exitIntentDismissed")) {
      setDismissed(true);
      return;
    }

    // Arm after 10 seconds
    const timer = setTimeout(() => {
      armedRef.current = true;

      // Desktop: mouse leave
      document.addEventListener("mouseleave", handleMouseLeave);

      // Mobile: scroll-to-top detection
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Mobile: back button interception
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleMouseLeave, handleScroll, handlePopState]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    armedRef.current = false;
    sessionStorage.setItem("exitIntentDismissed", "true");
    document.removeEventListener("mouseleave", handleMouseLeave);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("popstate", handlePopState);
  };

  const [nlName, setNlName] = useState("");
  const [nlEmail, setNlEmail] = useState("");
  const [nlSent, setNlSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlName.trim() || !nlEmail.trim()) return;
    const subject = encodeURIComponent("SEND Newsletter sign up");
    const body = encodeURIComponent(
      `Name: ${nlName}\nEmail: ${nlEmail}\n\nPlease add me to the SEND Newsletter mailing list.`
    );
    window.open(
      `mailto:rich@neurodiversityglobal.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setNlSent(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Before you go">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-display font-bold text-foreground">Before you go...</h2>
            <p className="text-sm text-muted-foreground mt-1">
              There is more to explore. Here are some places to continue reading.
            </p>
          </div>

          {/* Further reading */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Further reading
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {furtherReading.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={dismiss}
                  className="text-sm px-3 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Linked sites */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              More from Neurodiversity Global
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {linkedSites.map((site) => (
                <a
                  key={site.href}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-all"
                >
                  <div className="h-20 overflow-hidden">
                    <img
                      src={site.image}
                      alt={site.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5">
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {site.tag}
                    </span>
                    <p className="text-xs font-medium text-foreground mt-1 leading-snug group-hover:text-primary transition-colors">
                      {site.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">SEND Newsletter</h3>
            </div>
            {nlSent ? (
              <p className="text-xs text-primary font-medium">Thank you! Please send the email that opened to complete your sign up.</p>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-3">
                  Stay informed on SEND reform updates delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <Input
                    placeholder="Your name"
                    value={nlName}
                    onChange={(e) => setNlName(e.target.value)}
                    className="h-9 text-sm"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    className="h-9 text-sm"
                    required
                  />
                  <Button type="submit" size="sm" className="w-full">
                    Sign up for the newsletter
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
