import { useState } from "react";
import { Send } from "lucide-react";
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
    <div className="content-section py-6">
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center flex-shrink-0">
            <img
              src={ndgLogo}
              alt="Neurodiversity Global"
              className="w-40 h-auto object-contain rounded"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Looking for greater 'Neurodiversity' awareness at work, school, or club?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Book some time with Rich or Charlie from Neurodiversity Global the Father and Son team behind the SEND Navigator.
            </p>
          </div>
        </div>

        {submitted ? (
          <p className="text-sm text-status-confirmed font-medium">
            Thanks! Your email client should open shortly. We look forward to hearing from you.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Get in touch
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
