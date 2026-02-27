import { useState, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Send,
  CheckCircle,
  Globe,
} from "lucide-react";

/* ── Contact dialog ────────────────────────────────── */

const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  organisation: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Required").max(2000),
});
type ContactValues = z.infer<typeof contactSchema>;

function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const loadTimeRef = useRef(Date.now());
  const { toast } = useToast();

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", organisation: "", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    if (honeypotRef.current?.value) return;
    if (Date.now() - loadTimeRef.current < 2000) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name,
        email: values.email,
        organisation: values.organisation || null,
        message: values.message,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try emailing rich@neurodiversityglobal.com directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setSubmitted(false); form.reset(); loadTimeRef.current = Date.now(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Get in touch</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">Send us a message and we will get back to you.</DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Thank you</p>
            <p className="text-xs text-muted-foreground mt-1">We will be in touch soon.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="Your name" className="h-9 text-sm" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormControl><Input type="email" placeholder="your@email.com" className="h-9 text-sm" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="organisation" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="Organisation (optional)" className="h-9 text-sm" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormControl><Textarea placeholder="How can we help?" rows={3} className="text-sm" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" disabled={submitting} size="sm" className="w-full">
                {submitting ? "Sending..." : <><Send className="w-3.5 h-3.5 mr-1.5" />Send message</>}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ── Newsletter sign-up dialog ─────────────────────── */

const signupSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
});
type SignupValues = z.infer<typeof signupSchema>;

function NewsletterDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [done, setDone] = useState(false);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "" },
  });

  function onSubmit(values: SignupValues) {
    const subject = encodeURIComponent("SEND Newsletter sign up");
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nPlease add me to the SEND Newsletter mailing list.`
    );
    window.open(`mailto:rich@neurodiversityglobal.com?subject=${subject}&body=${body}`, "_blank");
    setDone(true);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setDone(false); form.reset(); } }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Stay updated</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">Sign up and we will keep you informed.</DialogDescription>
        </DialogHeader>
        {done ? (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Thank you for signing up</p>
            <p className="text-xs text-muted-foreground mt-1">Your email client should have opened. Please send the message to complete your signup.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="Your name" className="h-9 text-sm" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormControl><Input type="email" placeholder="Your email" className="h-9 text-sm" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" size="sm" className="w-full">Sign up</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ── Main PreFooter ────────────────────────────────── */

export function PreFooter() {
  const [contactOpen, setContactOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  return (
    <>
      <section className="bg-[hsl(222_47%_11%)] text-[hsl(0_0%_92%)] prefooter-section">
        <div className="content-wide py-14 sm:py-20">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(0_0%_96%)]">
              Built by parents
            </h2>
            <p className="mt-2 text-[hsl(222_20%_60%)] text-sm sm:text-base">
              Still working at making this work.
            </p>
          </div>

          {/* Three action cards in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Card 1: More from NG */}
            <button
              onClick={() => window.open("https://www.neurodiversityglobal.com", "_blank")}
              className="group flex items-start gap-3 rounded-xl border border-[hsl(222_20%_20%)] bg-[hsl(222_35%_12%/0.85)] backdrop-blur-sm p-5 shadow-lg hover:shadow-xl hover:border-[hsl(222_20%_30%)] transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[hsl(var(--accent-teal)/0.12)] flex items-center justify-center flex-shrink-0">
                <Globe className="w-4.5 h-4.5 text-[hsl(var(--accent-teal))]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[hsl(0_0%_92%)] group-hover:text-primary transition-colors">
                  More from Neurodiversity Global
                </h3>
                <p className="text-xs text-[hsl(222_20%_60%)] mt-1 leading-relaxed">
                  Neuroinclusion training, workshops, consultancy, and resources.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2">
                  Visit website <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>

            {/* Card 2: Stay updated */}
            <button
              onClick={() => setNewsletterOpen(true)}
              className="group flex items-start gap-3 rounded-xl border border-[hsl(222_20%_20%)] bg-[hsl(222_35%_12%/0.85)] backdrop-blur-sm p-5 shadow-lg hover:shadow-xl hover:border-[hsl(222_20%_30%)] transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[hsl(var(--accent-amber)/0.12)] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4.5 h-4.5 text-[hsl(var(--accent-amber))]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[hsl(0_0%_92%)] group-hover:text-primary transition-colors">
                  Stay updated
                </h3>
                <p className="text-xs text-[hsl(222_20%_60%)] mt-1 leading-relaxed">
                  Sign up and we will keep you informed on SEND reform and neurodivergence.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2">
                  Sign up <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>

            {/* Card 3: Get in touch */}
            <button
              onClick={() => setContactOpen(true)}
              className="group flex items-start gap-3 rounded-xl border border-[hsl(222_20%_20%)] bg-[hsl(222_35%_12%/0.85)] backdrop-blur-sm p-5 shadow-lg hover:shadow-xl hover:border-[hsl(222_20%_30%)] transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[hsl(var(--accent-coral)/0.12)] flex items-center justify-center flex-shrink-0">
                <Send className="w-4.5 h-4.5 text-[hsl(var(--accent-coral))]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[hsl(0_0%_92%)] group-hover:text-primary transition-colors">
                  Get in touch
                </h3>
                <p className="text-xs text-[hsl(222_20%_60%)] mt-1 leading-relaxed">
                  Reach Rich or Charlie Ferriman directly.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2">
                  Send a message <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          </div>

          {/* Compact contact details row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-[hsl(222_20%_50%)]">
            <a href="mailto:rich@neurodiversityglobal.com" className="inline-flex items-center gap-1.5 hover:text-[hsl(0_0%_85%)] transition-colors">
              <Mail className="w-3 h-3" /> rich@neurodiversityglobal.com
            </a>
            <a href="tel:+447508242212" className="inline-flex items-center gap-1.5 hover:text-[hsl(0_0%_85%)] transition-colors">
              <Phone className="w-3 h-3" /> +44 (0) 7508 242212
            </a>
            <a href="https://www.linkedin.com/in/richferriman" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[hsl(0_0%_85%)] transition-colors">
              <Linkedin className="w-3 h-3" /> Rich on LinkedIn
            </a>
            <a href="https://www.linkedin.com/in/charlieferriman" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[hsl(0_0%_85%)] transition-colors">
              <Linkedin className="w-3 h-3" /> Charlie on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <NewsletterDialog open={newsletterOpen} onOpenChange={setNewsletterOpen} />
    </>
  );
}
