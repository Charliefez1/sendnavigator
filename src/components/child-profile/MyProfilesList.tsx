import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, ArrowRight, UserRound, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SavedProfileSummary {
  access_code: string;
  child_name: string;
  stage: string;
  report_mode: string;
  created_at: string;
  last_active_at: string;
  expires_at: string;
}

interface MyProfilesListProps {
  onLoadProfile: (accessCode: string) => void;
  onCreateNew: () => void;
}

export function MyProfilesList({ onLoadProfile, onCreateNew }: MyProfilesListProps) {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<SavedProfileSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProfiles = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke("save-profile", {
        body: { action: "list" },
      });
      if (error) throw error;
      setProfiles(data?.profiles || []);
    } catch {
      // Silently fail, user can still create new
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (accessCode: string) => {
    setDeleting(accessCode);
    try {
      const { error } = await supabase.functions.invoke("save-profile", {
        body: { action: "delete", access_code: accessCode },
      });
      if (error) throw error;
      setProfiles((prev) => prev.filter((p) => p.access_code !== accessCode));
      toast({ title: "Profile deleted" });
    } catch {
      toast({ title: "Could not delete profile", variant: "destructive" });
    } finally {
      setDeleting(null);
    }
  };

  const daysUntilExpiry = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading your profiles...
      </div>
    );
  }

  if (profiles.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Your saved profiles ({profiles.length}/3)
      </h2>
      <div className="space-y-3">
        {profiles.map((profile) => (
          <Card key={profile.access_code} className="border-border">
            <CardContent className="py-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <UserRound className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-sm font-medium text-foreground truncate">
                    {profile.child_name || "Unnamed profile"}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="capitalize">{profile.report_mode} mode</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {daysUntilExpiry(profile.expires_at)} days left
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(profile.access_code)}
                  disabled={deleting === profile.access_code}
                  className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10 h-8"
                >
                  {deleting === profile.access_code ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onLoadProfile(profile.access_code)}
                  className="gap-1.5 h-8"
                >
                  Continue
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {profiles.length >= 3 && (
        <p className="text-xs text-muted-foreground">
          You have reached the maximum of 3 profiles. Delete an existing profile to create a new one.
        </p>
      )}
    </div>
  );
}
