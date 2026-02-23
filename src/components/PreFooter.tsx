import { useState, useRef } from "react";
import { Link } from "react-router-dom";
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
  BookOpen,
} from "lucide-react";

/* ── Newsletter inline ─────────────────────────────── */

const signupSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
});
type SignupValues = z.infer<typeof signupSchema>;

function NewsletterInline() {
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

  if (done) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle className="w-4 h-4 text-primary" />
        <span>Check your email client to send the signup message.</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem className="flex-1"><FormControl><Input placeholder="Your name" className="h-9 text-sm" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem className="flex-1"><FormControl><Input type="email" placeholder="Your email" className="h-9 text-sm" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" size="sm" className="h-9 px-4 whitespace-nowrap">Sign up</Button>
      </form>
    </Form>
  );
}

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
          <DialogDescription className="text-sm text-muted-foreground">Send us a message and we'll get back to you.</DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Thank you</p>
            <p className="text-xs text-muted-foreground mt-1">We'll be in touch soon.</p>
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
                {submitting ? "Sending…" : <><Send className="w-3.5 h-3.5 mr-1.5" />Send message</>}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ── Main PreFooter ────────────────────────────────── */

const externalResources = [
  {
    href: "https://smartphonefree.neurodiversityglobal.com/",
    title: "The Day We Gave Children Dopamine on Demand",
    tag: "Smartphone Free",
  },
  {
    href: "https://awbp.neuro.support/",
    title: "It's Time to Be Educated by a Clown",
    tag: "Open Letter",
  },
];

export function PreFooter() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <section className="bg-navy/[0.03] border-t border-border">
        <div className="content-wide py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Column 1: More from NG */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <h3 className="font-display font-bold text-foreground text-sm">More from Neurodiversity Global</h3>
              </div>
              <ul className="space-y-2.5">
                {externalResources.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                      <span>
                        <span className="text-xs font-medium text-primary">{r.tag}</span>
                        <br />
                        {r.title}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.neurodiversityglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Visit neurodiversityglobal.com
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Stay updated */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <h3 className="font-display font-bold text-foreground text-sm">Stay updated</h3>
              </div>
              <p className="text-sm text-muted-foreground">Sign up and we'll keep you informed on SEND reform and neurodivergence.</p>
              <NewsletterInline />
            </div>

            {/* Column 3: Get in touch */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="font-display font-bold text-foreground text-sm">Get in touch</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Rich Ferriman</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    <a href="mailto:rich@neurodiversityglobal.com" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                      <Mail className="w-3 h-3" /> Email
                    </a>
                    <a href="tel:+447508242212" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                      <Phone className="w-3 h-3" /> Call
                    </a>
                    <a href="https://www.linkedin.com/in/richferriman" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                      <Linkedin className="w-3 h-3" /> LinkedIn
                    </a>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Charlie Ferriman</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    <a href="mailto:charlie@neurodiversityglobal.com" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                      <Mail className="w-3 h-3" /> Email
                    </a>
                    <a href="tel:+447535696880" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                      <Phone className="w-3 h-3" /> Call
                    </a>
                    <a href="https://www.linkedin.com/in/charlieferriman" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                      <Linkedin className="w-3 h-3" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <Send className="w-3.5 h-3.5" />
                Send us a message
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
