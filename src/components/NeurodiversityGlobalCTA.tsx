import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ndgLogo from "@/assets/neurodiversity-global-education-logo.png";

export function NeurodiversityGlobalCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSending(true);

    const subject = encodeURIComponent(`Neurodiversity awareness enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nThis person is interested in booking a neurodiversity awareness session.`);
    window.open(`mailto:rich@neurodiversityglobal.com?subject=${subject}&body=${body}`, "_self");

    setSubmitted(true);
    setSending(false);
  };

  return (
    <div className="content-section py-3 pb-1">
      <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
        {/* Navy header strip */}
        <div className="px-5 py-3" style={{ backgroundColor: 'hsl(var(--navy))' }}>
          <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'hsl(var(--navy-muted))' }}>
            From the team behind SEND Navigator
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Logo */}
            <div className="flex-shrink-0 rounded-lg border border-border bg-background p-3 shadow-md">
              <img
                src={ndgLogo}
                alt="Neurodiversity Global"
                className="w-28 sm:w-36 h-auto object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                Looking for greater neurodiversity awareness?
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Book a session with Rich and Charlie from Neurodiversity Global — the father and son team behind this site. Available for workplaces, schools, and clubs.
              </p>

              {submitted ? (
                <div className="rounded-lg border border-border bg-accent/50 p-4">
                  <p className="text-sm font-medium text-accent-foreground flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Thanks — your email client should open shortly. We look forward to hearing from you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" disabled={sending} className="gap-2">
                    <Send className="w-4 h-4" />
                    Get in touch
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
