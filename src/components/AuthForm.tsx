import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link. Please verify your email to sign in.",
        });
        setMode("signin");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-lg w-full max-w-sm">
      <h2 className="text-base font-semibold text-foreground mb-1">
        {mode === "signin" ? "Sign in to continue" : "Create your account"}
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        {mode === "signin"
          ? "Access the full SEND Reform Navigator."
          : "Free account. Come back anytime."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-9"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="pl-9"
          />
        </div>
        <Button type="submit" disabled={submitting} className="w-full gap-2">
          {submitting ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        {mode === "signin" ? (
          <>
            No account?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-primary font-medium hover:underline"
            >
              Sign up free
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
