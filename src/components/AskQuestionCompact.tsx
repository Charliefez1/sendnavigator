import { useState } from "react";
import { MessageCircleQuestion, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

export function AskQuestionCompact() {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const handleSubmit = async () => {
    const trimmed = question.trim();
    if (!trimmed || trimmed.length < 10) {
      toast({ title: "Please enter a longer comment", variant: "destructive" });
      return;
    }
    if (trimmed.length > 1000) {
      toast({ title: "Comment is too long (max 1000 characters)", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("user_questions").insert({
        question: trimmed,
        page_submitted_from: location.pathname,
      });
      if (error) throw error;
      setSubmitted(true);
      setQuestion("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      toast({ title: "Failed to submit. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border p-5 bg-card text-center shadow-card">
        <CheckCircle className="h-6 w-6 mx-auto mb-2" style={{ color: "hsl(175 65% 41%)" }} />
        <p className="text-sm font-semibold text-foreground">Thank you.</p>
        <p className="text-xs text-muted-foreground">Your comment has been submitted for review.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-5 bg-card space-y-3"
      style={{
        borderColor: "hsl(8 75% 55% / 0.2)",
        boxShadow: "0 8px 32px -8px hsl(8 75% 55% / 0.08), 0 4px 16px -4px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(8 75% 55% / 0.1)" }}>
          <MessageCircleQuestion className="h-4 w-4" style={{ color: "hsl(8 75% 55%)" }} />
        </div>
        <span className="font-display font-semibold text-base text-foreground">Share a comment or lived experience</span>
      </div>
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Share your experience, observation, or comment..."
        className="min-h-[80px] text-sm resize-none shadow-sm"
        maxLength={1000}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Comments are reviewed before being published.</p>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || question.trim().length < 10}
          size="sm"
          className="rounded-full gap-1.5 shadow-md hover:shadow-lg transition-shadow"
        >
          <Send className="h-3.5 w-3.5" />
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
