import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

interface AuthFormProps {
  variant?: "default" | "glass";
}

export function AuthForm({ variant = "default" }: AuthFormProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();

  const isGlass = variant === "glass";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (mode === "reset") {
      const { error } = await resetPassword(email);
      if (error) {
        toast({ title: "Reset failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We've sent you a password reset link." });
        setMode("signin");
      }
    } else if (mode === "signup") {
      const { error } = await signUp(email, password, name);
      if (error) {
        const msg = error.message?.includes("already registered")
          ? "An account with this email already exists. Try signing in instead."
          : error.message;
        toast({ title: "Sign up failed", description: msg, variant: "destructive" });
        if (error.message?.includes("already registered")) setMode("signin");
      } else {
        toast({ title: "Account created", description: "You're now signed in." });
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        const msg = error.message?.includes("Invalid login credentials")
          ? "Incorrect email or password. Please try again."
          : error.message;
        toast({ title: "Sign in failed", description: msg, variant: "destructive" });
      }
    }

    setSubmitting(false);
  };

  const inputClass = isGlass
    ? "w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/30 transition-colors"
    : "w-full px-4 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 border-border transition-colors";

  const inputStyle = isGlass
    ? { backgroundColor: "rgba(255,255,255,0.15)", borderWidth: "1px", borderColor: "rgba(255,255,255,0.20)" }
    : {};

  return (
    <div className="w-full">
      <h2 className={`text-lg font-semibold mb-1 ${isGlass ? "text-white" : "text-foreground"}`}>
        {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Reset password"}
      </h2>
      <p className={`text-xs mb-5 ${isGlass ? "text-white/60" : "text-muted-foreground"}`}>
        {mode === "signin"
          ? "Access the full SEND Reform Navigator."
          : mode === "signup"
          ? "Free account. Come back anytime."
          : "We'll send you a reset link by email."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <Label className={`text-xs font-medium mb-1.5 block ${isGlass ? "text-white/80" : "text-foreground"}`}>
              Your name
            </Label>
            <input
              type="text"
              placeholder="First and last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
              style={inputStyle}
            />
          </div>
        )}

        <div>
          <Label className={`text-xs font-medium mb-1.5 block ${isGlass ? "text-white/80" : "text-foreground"}`}>
            Email
          </Label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {mode !== "reset" && (
          <div>
            <Label className={`text-xs font-medium mb-1.5 block ${isGlass ? "text-white/80" : "text-foreground"}`}>
              Password
            </Label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full gap-2"
          style={isGlass ? { backgroundColor: "hsl(175 60% 40%)", color: "white" } : {}}
        >
          {submitting
            ? "Please wait..."
            : mode === "signin"
            ? "Sign in"
            : mode === "signup"
            ? "Create account"
            : "Send reset link"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className={`text-xs mt-4 text-center space-y-1 ${isGlass ? "text-white/60" : "text-muted-foreground"}`}>
        {mode === "signin" && (
          <>
            <p>
              <button type="button" onClick={() => setMode("reset")} className={`font-medium hover:underline ${isGlass ? "text-white/80" : "text-primary"}`}>
                Forgot password?
              </button>
            </p>
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={() => setMode("signup")} className={`font-medium hover:underline ${isGlass ? "text-white/80" : "text-primary"}`}>
                Create one
              </button>
            </p>
          </>
        )}
        {mode === "signup" && (
          <p>
            Already have an account?{" "}
            <button type="button" onClick={() => setMode("signin")} className={`font-medium hover:underline ${isGlass ? "text-white/80" : "text-primary"}`}>
              Sign in
            </button>
          </p>
        )}
        {mode === "reset" && (
          <p>
            Back to{" "}
            <button type="button" onClick={() => setMode("signin")} className={`font-medium hover:underline ${isGlass ? "text-white/80" : "text-primary"}`}>
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
