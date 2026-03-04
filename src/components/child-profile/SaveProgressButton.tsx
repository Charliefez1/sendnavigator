import { useState } from "react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Check, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SaveProgressButtonProps {
  activeSection: number;
}

export function SaveProgressButton({ activeSection }: SaveProgressButtonProps) {
  const { state, accessCode, setAccessCode, markClean } = useChildProfile();
  const [saving, setSaving] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("save-profile", {
        body: {
          action: "save",
          access_code: accessCode,
          profile_data: state,
          stage: "builder",
          active_section: activeSection,
          report_mode: state.reportMode,
        },
      });
      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.error);
        return;
      }
      if (data?.access_code) {
        setAccessCode(data.access_code);
        setShowCode(true);
      }
      markClean();
    } catch {
      setError("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!accessCode) return;
    await navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (accessCode && showCode) {
    return (
      <div className="bg-muted/40 border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Check className="w-4 h-4 text-primary" />
          Progress saved
        </div>
        <p className="text-xs text-muted-foreground">
          Your access code is:
        </p>
        <div className="flex items-center gap-2">
          <code className="text-2xl font-mono font-bold tracking-[0.3em] text-foreground bg-background px-4 py-2 rounded border border-border">
            {accessCode}
          </code>
          <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Write this down. It is the only way back in. Your data will be kept for 14 days.
        </p>
        <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
        Save my progress
      </Button>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
