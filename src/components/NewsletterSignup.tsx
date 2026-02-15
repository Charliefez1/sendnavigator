import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Mail, CheckCircle } from "lucide-react";

const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

type SignupValues = z.infer<typeof signupSchema>;

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "" },
  });

  function onSubmit(values: SignupValues) {
    const subject = encodeURIComponent("SEND Newsletter sign up");
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nPlease add me to the SEND Newsletter mailing list.`
    );
    window.open(
      `mailto:rich@neurodiversityglobal.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-5 text-center shadow-lg">
        <CheckCircle className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
        <p className="font-semibold text-foreground text-sm">Thank you for signing up!</p>
        <p className="text-xs text-muted-foreground mt-1">Your email client should have opened. Please send the message to complete your signup.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-primary" />
        <h3 className="font-display font-bold text-foreground text-sm sm:text-base">
          Keep up to date with the world of Neurodivergence
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Enter your details and we will keep you informed.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Your name" {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" className="h-10 px-5 whitespace-nowrap">
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
}
