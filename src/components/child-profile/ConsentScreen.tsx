import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Trash2, Download, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ConsentScreenProps {
  accessCode: string | null;
  onConsentGiven: () => void;
  onDeleteComplete: () => void;
}

export function ConsentScreen({ accessCode, onConsentGiven, onDeleteComplete }: ConsentScreenProps) {
  const [consentChecked, setConsentChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleConsent = async () => {
    if (!accessCode || !consentChecked) return;
    setSaving(true);
    try {
      const { error } = await supabase.functions.invoke("save-profile", {
        body: {
          action: "save",
          access_code: accessCode,
          consent_given_at: new Date().toISOString(),
          profile_data: {},
        },
      });
      if (error) throw error;
      toast({ title: "Consent recorded", description: "Your data will be stored securely for 14 days." });
      onConsentGiven();
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!accessCode) return;
    setDeleting(true);
    try {
      const { error } = await supabase.functions.invoke("save-profile", {
        body: { action: "delete", access_code: accessCode },
      });
      if (error) throw error;
      toast({ title: "Data deleted", description: "All your profile data has been removed." });
      onDeleteComplete();
    } catch {
      toast({ title: "Could not delete data", variant: "destructive" });
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleExport = async () => {
    if (!accessCode) return;
    setExporting(true);
    try {
      const { data, error } = await supabase.functions.invoke("save-profile", {
        body: { action: "export", access_code: accessCode },
      });
      if (error) throw error;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-child-profile-export.json";
      a.click();
      URL.revokeObjectURL(url);

      toast({ title: "Export downloaded" });
    } catch {
      toast({ title: "Could not export data", variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Your data, your control
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          By default, your profile is stored temporarily for 14 days and then deleted automatically.
          If you want to return and access your data later, we need your explicit consent.
        </p>
      </div>

      {/* Consent card */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={consentChecked}
              onCheckedChange={(checked) => setConsentChecked(checked === true)}
              className="mt-0.5"
            />
            <span className="text-sm text-foreground leading-relaxed">
              I consent to my data being stored securely for up to 14 days so I can return and continue working on my child's profile. I understand I can delete or export my data at any time.
            </span>
          </label>

          <Button
            onClick={handleConsent}
            disabled={!consentChecked || saving || !accessCode}
            className="gap-1.5"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Confirm and save
          </Button>

          {!accessCode && (
            <p className="text-xs text-muted-foreground">
              You need to save your progress first to get an access code.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Data actions */}
      {accessCode && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm font-medium text-foreground">Data management</p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={exporting}
                className="gap-1.5"
              >
                {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                Export my data
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete my data
              </Button>
            </div>

            {showDeleteConfirm && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
                <p className="text-sm text-foreground">
                  This will permanently delete all your profile data. This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="gap-1.5"
                  >
                    {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    Yes, delete everything
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
