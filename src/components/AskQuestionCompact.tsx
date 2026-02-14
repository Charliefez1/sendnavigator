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
      <div className="border border-border rounded-2xl p-4 bg-accent/30 text-center">
        <CheckCircle className="h-6 w-6 text-status-confirmed mx-auto mb-2" />
        <p className="text-sm font-semibold text-foreground">Thank you.</p>
        <p className="text-xs text-muted-foreground">Your comment has been submitted for review.</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-solid border-primary/30 rounded-2xl p-4 bg-card space-y-3 shadow-lg">
      <div className="flex items-center gap-2 text-primary">
        <MessageCircleQuestion className="h-5 w-5" />
        <span className="font-semibold text-sm">Share a comment or lived experience</span>
      </div>
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Share your experience, observation, or comment..."
        className="min-h-[80px] text-sm resize-none"
        maxLength={1000}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Comments are reviewed before being published.</p>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || question.trim().length < 10}
          size="sm"
          className="rounded-full gap-1.5"
        >
          <Send className="h-3.5 w-3.5" />
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
