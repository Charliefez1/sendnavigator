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

export function LandingContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      setError(result.error.errors[0].message);
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

  if (sent) {
    return (
      <div className="text-center py-8">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "hsl(175 60% 40% / 0.15)" }}
        >
          <Check className="w-6 h-6" style={{ color: "hsl(175 60% 52%)" }} />
        </div>
        <p className="text-lg font-display font-medium text-foreground mb-1">Message sent</p>
        <p className="text-sm text-muted-foreground">
          Rich will get back to you as soon as he can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="Your name"
            maxLength={100}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="you@example.com"
            maxLength={255}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
          placeholder="How can we help?"
          maxLength={2000}
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={sending} className="gap-2 w-full sm:w-auto">
        {sending ? "Sending…" : "Send message"}
        <Send className="w-4 h-4" />
      </Button>
      <p className="text-xs text-muted-foreground">
        Or email directly:{" "}
        <a href="mailto:rich@neurodiversityglobal.com" className="text-primary hover:underline">
          rich@neurodiversityglobal.com
        </a>
      </p>
    </form>
  );
}
