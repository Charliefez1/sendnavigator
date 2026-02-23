import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, KeyRound, Loader2, Save } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";

interface OpeningScreenProps {
  onStart: () => void;
  onRestore?: (data: { profile_data: any; stage: string; active_section: number }) => void;
  onLoadTestData?: () => void;
}

export function OpeningScreen({ onStart, onRestore, onLoadTestData }: OpeningScreenProps) {
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [showLongVersion, setShowLongVersion] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [accessCode, setAccessCode] = useState("");

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

  const handleSaveAndGetCode = async () => {
    setSaving(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("save-profile", {
        body: { action: "save", profile_data: {}, stage: "opening", active_section: 0 },
      });
      if (fnError) throw fnError;
      if (data?.access_code) {
        setAccessCode(data.access_code);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-display font-semibold text-foreground mb-8">
        My Child: A Profile
      </h1>

      {!showLongVersion ? (
        <div className="space-y-5 text-sm text-foreground leading-relaxed">
          <p className="font-medium text-base text-foreground">Before we start.</p>
          <p>You know your child <strong>better than any professional ever will</strong>. The system does not always make space for that knowledge.</p>
          <p>This tool helps you put it into words. The document you build is yours. Share it, copy it, or keep it for yourself.</p>
          <p>Take your time. Skip anything that does not apply. There is no right answer. There is only <strong>what is true for your child</strong>.</p>
          <p className="font-medium">This is a guide. It is not a diagnosis.</p>
          <p>You can complete this in one session or save your progress and return. Saved answers are <strong>stored securely for 14 days</strong> then deleted automatically.</p>
          <button
            type="button"
            onClick={() => setShowLongVersion(true)}
            className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            Read more
          </button>
        </div>
      ) : (
        <div className="space-y-5 text-sm text-foreground leading-relaxed">
          <p className="font-medium text-base text-foreground">Before we start, I want to say something.</p>
          <p>You know your child <strong>better than any professional ever will</strong>. The problem is that the system does not always make space for that knowledge.</p>
          <p>This tool will help you put into words what you already know. At the end it will give you a document you can bring into any room and say: <strong>this is my child. All of it.</strong> Not just the bit that happened on Tuesday.</p>
          <p>You can share it in full with a teacher, a SENCO, a GP, or a coach. You can copy sections. You can keep it just for yourself. It is yours.</p>
          <p>Take your time. Skip anything that does not apply. There is no right answer. There is only <strong>what is true for your child</strong>.</p>
          <p className="font-medium">This tool is a guide. It is not a diagnosis.</p>
          <p>If you need more than one session to complete this profile that is completely fine. You can save your progress and return using a simple access code. Your answers will be <strong>stored securely for up to 14 days</strong>. After 14 days they are deleted automatically. By choosing to save your progress you are giving consent for your answers to be held temporarily for this purpose only.</p>
          <button
            type="button"
            onClick={() => setShowLongVersion(false)}
            className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            Show less
          </button>
        </div>
      )}

      {/* Access code display after save */}
      {accessCode && (
        <div className="mt-6 bg-muted/40 border border-border rounded-lg p-5 space-y-3 max-w-sm">
          <p className="text-sm font-medium text-foreground">Your access code</p>
          <p className="text-3xl font-mono font-bold tracking-widest text-primary">{accessCode}</p>
          <p className="text-xs text-muted-foreground">Write this down. It is the only way to return to your profile. No emails will be sent.</p>
          <Button onClick={onStart} size="sm" className="gap-2 mt-2">
            Continue to the profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Buttons */}
      {!accessCode && (
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button onClick={onStart} size="lg" className="gap-2">
            Start the profile
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button onClick={handleSaveAndGetCode} variant="outline" size="lg" className="gap-2" disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            Save my progress and get an access code
          </Button>
        </div>
      )}

      {/* Return with access code */}
      <div className="mt-6 space-y-3">
        {!showCodeEntry ? (
          <button
            type="button"
            onClick={() => setShowCodeEntry(true)}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
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
