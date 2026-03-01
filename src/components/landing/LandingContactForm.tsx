import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

interface LandingContactFormProps {
  variant?: "light" | "dark";
}

export function LandingContactForm({ variant = "light" }: LandingContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loadedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    if (honeypot) return;
    if (Date.now() - loadedAt < 3000) {
      setError("Please wait a moment before submitting.");
      return;
    }

    setSending(true);
    try {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      });
      if (dbError) throw dbError;
      setSent(true);
    } catch {
      setError("Something went wrong. Please email rich@neurodiversityglobal.com directly.");
    } finally {
      setSending(false);
    }
  };

  const isDark = variant === "dark";

  const inputStyle: React.CSSProperties = isDark
    ? {
        backgroundColor: "hsl(222 28% 14%)",
        border: "1px solid hsl(222 20% 22%)",
        color: "hsl(0 0% 90%)",
      }
    : {};

  const inputFocus = isDark
    ? {
        onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          e.currentTarget.style.borderColor = "hsl(175 60% 40% / 0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px hsl(175 60% 40% / 0.15)";
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          e.currentTarget.style.borderColor = "hsl(222 20% 22%)";
          e.currentTarget.style.boxShadow = "none";
        },
      }
    : {};

  const labelColor = isDark ? "hsl(222 15% 72%)" : undefined;

  if (sent) {
    return (
      <div className="text-center py-8">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "hsl(175 60% 40% / 0.15)" }}
        >
          <Check className="w-6 h-6" style={{ color: "hsl(175 60% 52%)" }} />
        </div>
        <p className="text-lg font-display font-medium mb-1" style={{ color: isDark ? "hsl(0 0% 96%)" : undefined }}>
          Message sent
        </p>
        <p className="text-sm" style={{ color: isDark ? "hsl(222 20% 60%)" : undefined }}>
          Rich will get back to you as soon as he can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 ${!isDark ? "border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" : "outline-none"}`}
            style={inputStyle}
            placeholder="Your name"
            maxLength={100}
            required
            {...inputFocus}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 ${!isDark ? "border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" : "outline-none"}`}
            style={inputStyle}
            placeholder="you@example.com"
            maxLength={255}
            required
            {...inputFocus}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 resize-none ${!isDark ? "border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" : "outline-none"}`}
          style={inputStyle}
          placeholder="How can we help?"
          maxLength={2000}
          required
          {...inputFocus}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={sending} className="gap-2 w-full sm:w-auto rounded-xl min-h-[48px] px-7">
        {sending ? "Sending…" : "Send message"}
        <Send className="w-4 h-4" />
      </Button>
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
    </form>
  );
}
