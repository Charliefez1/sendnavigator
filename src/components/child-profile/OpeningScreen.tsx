import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, KeyRound, Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";

interface OpeningScreenProps {
  onStart: () => void;
  onRestore?: (data: { profile_data: any; stage: string; active_section: number }) => void;
}

export function OpeningScreen({ onStart, onRestore }: OpeningScreenProps) {
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoadProfile = async () => {
    if (code.length !== 6) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("save-profile", {
        body: { action: "load", access_code: code },
      });
      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.error);
        return;
      }
      onRestore?.(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-display font-semibold text-foreground mb-8">
        My Child: A Profile
      </h1>

      <div className="space-y-5 text-sm text-foreground leading-relaxed">
        <p className="font-medium text-base text-foreground">Before we start, I want to say something.</p>

        <p>
          You know your child better than any professional ever will. The problem is that the system does not always make space for that knowledge.
        </p>

        <p>
          This tool will help you put into words what you already know. At the end, it will give you a document you can bring into any room and say: this is my child. All of it.
        </p>

        <p>
          Take your time. Skip anything that does not apply. There is no right answer. There is only what is true for your child.
        </p>

        <p>
          One important thing to know before you begin. Nothing you write here is stored anywhere unless you choose to save your progress. If you do not save, it lives only in your browser. When you close this page, it is gone.
        </p>

        <p>
          If you need more than one session to complete this profile that is completely fine. You can save your progress and return using a simple access code. Your answers will be stored securely for up to 14 days. After 14 days they are deleted automatically. By choosing to save your progress you are giving consent for your answers to be held temporarily for this purpose only.
        </p>

        <p>If you are ready, let's begin.</p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button onClick={onStart} size="lg" className="gap-2">
          Continue without saving
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Return with access code */}
      <div className="mt-6">
        {!showCodeEntry ? (
          <button
            type="button"
            onClick={() => setShowCodeEntry(true)}
            className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            Returning? Enter your access code here
          </button>
        ) : (
          <div className="bg-muted/40 border border-border rounded-lg p-5 space-y-4 max-w-sm">
            <p className="text-sm font-medium text-foreground">Enter your 6-digit access code</p>
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button
              onClick={handleLoadProfile}
              disabled={code.length !== 6 || loading}
              size="sm"
              className="gap-2"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Load my profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
