import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  organisation: z.string().trim().max(200, "Organisation must be less than 200 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const loadTimeRef = useRef(Date.now());
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    // Anti-spam: honeypot check
    if (honeypotRef.current?.value) return;
    // Anti-spam: must take at least 2 seconds to fill form
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
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try emailing us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 text-center shadow-lg">
        <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Message sent</h3>
        <p className="text-muted-foreground">
          Thank you for getting in touch. We will respond as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-lg">
      <h2 className="text-lg font-semibold text-foreground mb-2">Get in touch</h2>
      <p className="text-muted-foreground mb-6">
        Send us a message and we will get back to you.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot — hidden from humans */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your organisation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="How can we help?" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Sending…" : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send message
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
