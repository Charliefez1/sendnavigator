import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
import adLogo from "@/assets/neurodiversity-global-ad-logo.png";

const ads = [
  {
    headline: "We do the hard, human work of making neuroinclusion real",
    body: "Live, engaging, lived experience training that changes behaviour, builds trust, and keeps delivering long after the session ends.",
    cta: "Start a conversation",
  },
  {
    headline: "Neuroinclusion that actually changes how work feels",
    body: "Rated Excellent with a 9.7 out of 10 average because it is an experience that stays with people.",
    cta: "Talk to us",
  },
  {
    headline: "This is not awareness training. This is change",
    body: "We work alongside leaders and teams to turn intention into action and conversations into lasting shift.",
    cta: "Find out how",
  },
  {
    headline: "Neurodiversity at work. Real. Human. Effective",
    body: "Practical sessions grounded in lived experience that translate directly into better decisions and better work.",
    cta: "Get in touch",
  },
  {
    headline: "Where inclusion stops being performative and starts working",
    body: "Managers leave with language, confidence, and clarity they can use immediately.",
    cta: "Book a conversation",
  },
  {
    headline: "We do the hard work most inclusion programmes avoid",
    body: "We create the space and structure for honest conversations that actually move things forward.",
    cta: "Speak with us",
  },
  {
    headline: "Be seen. Be valued. Be supported.",
    body: "Workshops designed to support neurodivergent people and the people carrying responsibility around them.",
    cta: "Contact us",
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  organisation: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactValues = z.infer<typeof contactSchema>;

function ContactDialog({ open, onOpenChange, adCta }: { open: boolean; onOpenChange: (v: boolean) => void; adCta: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const loadTimeRef = useRef(Date.now());
  const { toast } = useToast();

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", organisation: "", message: "" },
  });

  useEffect(() => {
    if (open) {
      loadTimeRef.current = Date.now();
      setSubmitted(false);
      form.reset();
    }
  }, [open, form]);

  async function onSubmit(values: ContactValues) {
    // Honeypot check
    if (honeypotRef.current?.value) return;
    // Time check — must take at least 2 seconds
    if (Date.now() - loadTimeRef.current < 2000) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name,
        email: values.email,
        organisation: values.organisation || null,
        message: `[${adCta}] ${values.message}`,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Start a conversation</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Neurodiversity in work training, workshops, and consultancy.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Thank you for reaching out</p>
            <p className="text-xs text-muted-foreground mt-1">We'll be in touch soon.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* Honeypot — hidden from humans */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Name</FormLabel>
                  <FormControl><Input placeholder="Your name" className="h-9 text-sm" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Email</FormLabel>
                  <FormControl><Input type="email" placeholder="your@email.com" className="h-9 text-sm" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="organisation" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Organisation (optional)</FormLabel>
                  <FormControl><Input placeholder="Your organisation" className="h-9 text-sm" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Message</FormLabel>
                  <FormControl><Textarea placeholder="How can we help?" rows={3} className="text-sm" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
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

export function NeurodiversityGlobalAd() {
  const [adIndex, setAdIndex] = useState(() => Math.floor(Math.random() * ads.length));
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setAdIndex(Math.floor(Math.random() * ads.length));
  }, []);

  const ad = ads[adIndex];

  return (
    <>
      <div className="content-section py-4">
        <button
          onClick={() => setDialogOpen(true)}
          className="w-full rounded-xl overflow-hidden border-2 border-navy shadow-lg hover:shadow-xl transition-all group"
        >
          <div className="bg-navy px-5 py-4 flex items-center gap-4">
            <img src={adLogo} alt="Neurodiversity Global" className="w-14 h-14 rounded-lg object-contain bg-white/10 p-1" />
            <div className="text-left flex-1">
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-medium">Neurodiversity Global</p>
              <p className="text-white font-display font-semibold text-base leading-tight mt-0.5">{ad.headline}</p>
            </div>
          </div>
          <div className="bg-card px-5 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed text-left flex-1">{ad.body}</p>
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-navy bg-navy/10 rounded-full px-3 py-1.5 group-hover:bg-navy group-hover:text-white transition-colors">
              {ad.cta} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </button>
      </div>
      <ContactDialog open={dialogOpen} onOpenChange={setDialogOpen} adCta={ad.cta} />
    </>
  );
}
