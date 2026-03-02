import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, KeyRound, Loader2, Save, FlaskConical } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

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
  const [consentGiven, setConsentGiven] = useState(false);

  const handleLoadProfile = async () => {
    if (code.length !== 8) return;
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
    <div className="relative max-w-2xl mx-auto py-12 px-4">
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, hsl(42 87% 48% / 0.06), transparent 70%)" }}
      />
      <h1 className="text-2xl font-display font-semibold text-foreground mb-8">
        My Child: A Profile
      </h1>

      {!showLongVersion ? (
        <div className="space-y-5 text-sm text-foreground leading-relaxed">
          <p className="font-medium text-base text-foreground">Before we start.</p>
          <p>You know your child <strong>better than any professional ever will</strong>. The system does not always make space for that knowledge.</p>
          <p>This tool helps you put it into words. When you are ready, you can view a dashboard of your child's profile, preview an AI-generated summary, and download everything as a PDF. The document you build is yours. Share it, copy it, or keep it for yourself.</p>
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

      {/* Beta disclaimer */}
      <div className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-xs font-semibold text-foreground">Beta phase</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This tool is currently in beta, which means we are actively developing and improving it on a daily basis. New content, questions, and insights are being added all the time. By choosing to use this tool, you accept that the information and guidance it provides is a starting point, not a finished product. Everything here is a guide only and should not be treated as medical advice, a formal diagnosis, or a legal document. We recommend you always seek professional guidance where needed.
        </p>
      </div>

      {/* GDPR consent notice */}
      <div className="mt-4 bg-muted/40 border border-border rounded-lg p-4 space-y-3">
        <p className="text-xs font-semibold text-foreground">Data privacy notice</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The answers you provide will be stored securely and encrypted for up to 14 days, then automatically deleted. If you generate a report, your answers are processed by an AI service (Anthropic Claude) to create personalised insights. All answers use the SEND Navigator knowledge base that has been built by the team behind the tool. Your data is not used to train AI models and is not shared with third parties. You can read our full{" "}
          <Link to="/privacy-policy" className="text-primary underline underline-offset-2">privacy policy</Link>.
        </p>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <Checkbox
            checked={consentGiven}
            onCheckedChange={(checked) => setConsentGiven(checked === true)}
            className="mt-0.5"
          />
          <span className="text-xs text-foreground leading-relaxed">
            I understand this tool is in beta, that the information provided is a guide only, and I consent to my data being stored temporarily as described above.
          </span>
        </label>
      </div>

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
          <Button onClick={onStart} size="lg" className="gap-2" disabled={!consentGiven}>
            Start the profile
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button onClick={handleSaveAndGetCode} variant="outline" size="lg" className="gap-2" disabled={saving || !consentGiven}>
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
            <p className="text-sm font-medium text-foreground">Enter your 8-character access code</p>
            <InputOTP maxLength={8} value={code} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button
              onClick={handleLoadProfile}
              disabled={code.length !== 8 || loading}
              size="sm"
              className="gap-2"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Load my profile
            </Button>
          </div>
        )}
      </div>

      {/* Dev/test button */}
      {onLoadTestData && (
        <div className="mt-10 pt-6 border-t border-border">
          <Button
            onClick={onLoadTestData}
            variant="outline"
            size="sm"
            className="gap-2 text-muted-foreground"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Load test data (all sections filled)
          </Button>
          <p className="text-xs text-muted-foreground mt-1.5">For testing only. Populates every field with sample data.</p>
        </div>
      )}
    </div>
  );
}
