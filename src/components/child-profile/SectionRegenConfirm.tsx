import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Loader2 } from "lucide-react";

interface SectionRegenConfirmProps {
  sectionTitle: string;
  oldReflection: string;
  newReflection: string;
  loading?: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export function SectionRegenConfirm({
  sectionTitle,
  oldReflection,
  newReflection,
  loading,
  onAccept,
  onReject,
}: SectionRegenConfirmProps) {
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="py-8 text-center space-y-3">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
            <p className="text-sm text-foreground">Regenerating {sectionTitle}...</p>
            <p className="text-xs text-muted-foreground">This usually takes 10 to 15 seconds.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="max-w-2xl w-full my-8">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{sectionTitle}: compare versions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Previous</p>
              <div className="text-xs text-foreground leading-relaxed bg-muted/50 rounded-lg p-3 space-y-2 max-h-60 overflow-y-auto">
                {oldReflection.split(/\n\n+/).filter(p => p.trim()).map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-primary uppercase tracking-wide">New</p>
              <div className="text-xs text-foreground leading-relaxed bg-primary/5 rounded-lg p-3 space-y-2 max-h-60 overflow-y-auto border border-primary/20">
                {newReflection.split(/\n\n+/).filter(p => p.trim()).map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button size="sm" className="gap-1.5" onClick={onAccept}>
              <Check className="w-3.5 h-3.5" />
              Use new version
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={onReject}>
              <X className="w-3.5 h-3.5" />
              Keep previous
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
