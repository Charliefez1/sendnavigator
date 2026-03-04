import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  KeyRound,
  Loader2,
  Save,
  FlaskConical,
  ClipboardList,
  Lightbulb,
  BarChart3,
  FileText,
  CheckCircle,
} from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface OpeningScreenProps {
  onStart: () => void;
  onRestore?: (data: { profile_data: any; stage: string; active_section: number }) => void;
  onLoadTestData?: () => void;
}

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: "Tell us about your child",
    description: "Name, age, and who this profile is for.",
  },
  {
    icon: Lightbulb,
    title: "Answer guided questions",
    description: "22 sections covering sensory, communication, behaviour, strengths, and more. Skip any that do not apply.",
  },
  {
    icon: BarChart3,
    title: "View your dashboard",
    description: "See everything you have told us, summarised at a glance.",
  },
  {
    icon: FileText,
    title: "Download your report",
    description: "An AI-generated PDF you can share with schools, SENCOs, or GPs.",
  },
];

function AccessCodeEntry({
  onRestore,
}: {
  onRestore?: OpeningScreenProps["onRestore"];
}) {
  const [showEntry, setShowEntry] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoad = async () => {
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

  if (!showEntry) {
    return (
      <button
        type="button"
        onClick={() => setShowEntry(true)}
        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
      >
        <KeyRound className="w-3.5 h-3.5" />
        Returning? Enter your access code
      </button>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-4 max-w-sm">
      <p className="text-sm font-medium text-foreground">Enter your 8-character access code</p>
      <InputOTP maxLength={8} value={code} onChange={setCode}>
        <InputOTPGroup>
          {Array.from({ length: 8 }, (_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <Button onClick={handleLoad} disabled={code.length !== 8 || loading} size="sm" className="gap-2">
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        Load my profile
      </Button>
    </div>
  );
}

export function OpeningScreen({ onStart, onRestore, onLoadTestData }: OpeningScreenProps) {
  const [consentGiven, setConsentGiven] = useState(false);
  const [saving, setSaving] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleSaveAndGetCode = async () => {
    setSaving(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("save-profile", {
        body: { action: "save", profile_data: {}, stage: "opening", active_section: 0 },
      });
      if (fnError) throw fnError;
      if (data?.access_code) setAccessCode(data.access_code);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto py-12 px-4">
      {/* Subtle accent glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, hsl(42 87% 48% / 0.06), transparent 70%)" }}
      />

      {/* ── What it is ── */}
      <h1 className="text-2xl font-display font-semibold text-foreground mb-3">
        My Child: A Profile
      </h1>
      <p className="text-base text-foreground leading-relaxed">
        A structured document about your child that you build, you own, and you share on your terms.
      </p>

      {/* ── What it does ── */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          What this tool does
        </h2>
        <p className="text-sm text-foreground leading-relaxed">
          It walks you through guided questions covering the areas that matter most when understanding a neurodivergent child: environment, sensory processing, executive function, masking, communication, identity, strengths, and more. At the end, you get a professional-looking profile and an AI-generated report you can download as a PDF.
        </p>
      </div>

      {/* ── Why ── */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Why it exists
        </h2>
        <p className="text-sm text-foreground leading-relaxed">
          You know your child better than any professional ever will. The system does not always make space for that knowledge. This tool helps you put it into words so that when you walk into a meeting, you have something real to hand over.
        </p>
      </div>

      {/* ── Visual process ── */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-5">
          How it works
        </h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-border" aria-hidden="true" />

          <div className="space-y-0">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Step number circle */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  {/* Content */}
                  <div className="pt-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Final outcome */}
            <div className="relative flex gap-4">
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="pt-1.5">
                <h3 className="text-sm font-semibold text-foreground">Done</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A document you can bring into any room and say: this is my child.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Beta + GDPR ── */}
      <div className="mt-10 space-y-4">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-xs font-semibold text-foreground">Beta</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This tool is in active development. Content and questions are being refined daily. Everything here is a guide only and should not be treated as medical advice, a diagnosis, or a legal document.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <p className="text-xs font-semibold text-foreground">Data and privacy</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your answers are encrypted and stored for up to 14 days, then automatically deleted. If you generate a report, your answers are processed by AI to create personalised insights. Your data is not used to train AI models and is not shared with third parties.{" "}
            <Link to="/privacy-policy" className="text-primary underline underline-offset-2">Privacy policy</Link>.
          </p>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <Checkbox
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(checked === true)}
              className="mt-0.5"
            />
            <span className="text-xs text-foreground leading-relaxed">
              I understand this is a guide only and consent to my data being stored temporarily as described above.
            </span>
          </label>
        </div>
      </div>

      {/* ── Actions ── */}
      {accessCode ? (
        <div className="mt-8 bg-card border border-border rounded-lg p-5 space-y-3 max-w-sm">
          <p className="text-sm font-medium text-foreground">Your access code</p>
          <p className="text-3xl font-mono font-bold tracking-widest text-primary">{accessCode}</p>
          <p className="text-xs text-muted-foreground">Write this down. It is the only way to return to your profile.</p>
          <Button onClick={onStart} size="sm" className="gap-2 mt-2">
            Continue to the profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button onClick={onStart} size="lg" className="gap-2" disabled={!consentGiven}>
            Start the profile
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button onClick={handleSaveAndGetCode} variant="outline" size="lg" className="gap-2" disabled={saving || !consentGiven}>
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            Save and get an access code
          </Button>
        </div>
      )}

      {error && <p className="text-xs text-destructive mt-2">{error}</p>}

      {/* ── Return with code ── */}
      <div className="mt-6">
        <AccessCodeEntry onRestore={onRestore} />
      </div>

      {/* ── Dev test button ── */}
      {onLoadTestData && (
        <div className="mt-10 pt-6 border-t border-border">
          <Button onClick={onLoadTestData} variant="outline" size="sm" className="gap-2 text-muted-foreground">
            <FlaskConical className="w-3.5 h-3.5" />
            Load test data
          </Button>
          <p className="text-xs text-muted-foreground mt-1.5">For testing only.</p>
        </div>
      )}
    </div>
  );
}
