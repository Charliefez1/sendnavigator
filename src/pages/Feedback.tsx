import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { PageAccentProvider } from "@/contexts/PageAccentContext";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, CheckCircle, Reply } from "lucide-react";

interface FeedbackItem {
  id: string;
  name: string | null;
  feedback: string;
  feedback_type: string;
  admin_response: string | null;
  created_at: string;
}

export default function Feedback() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("comment");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const formLoadedAt = useRef(Date.now());
  const { toast } = useToast();

  const { data: feedbackItems, isLoading } = useQuery({
    queryKey: ["approved-feedback"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_feedback")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as FeedbackItem[];
    },
  });

  const handleSubmit = async () => {
    const trimmed = feedback.trim();
    if (!trimmed || trimmed.length < 10) {
      toast({ title: "Please write at least 10 characters", variant: "destructive" });
      return;
    }
    if (trimmed.length > 2000) {
      toast({ title: "Feedback is too long (max 2000 characters)", variant: "destructive" });
      return;
    }

    // Anti-spam: honeypot check
    if (honeypot) return;

    // Anti-spam: timing check (must take at least 3 seconds)
    if (Date.now() - formLoadedAt.current < 3000) {
      toast({ title: "Please take a moment before submitting.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("user_feedback").insert({
        name: name.trim() || null,
        feedback: trimmed,
        feedback_type: feedbackType,
      });
      if (error) throw error;
      setSubmitted(true);
      setFeedback("");
      setName("");
      formLoadedAt.current = Date.now();
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      toast({ title: "Failed to submit. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeLabels: Record<string, string> = {
    comment: "Feedback",
    suggestion: "Suggestion",
    issue: "Issue",
  };

  const comments = feedbackItems?.filter((f) => f.feedback_type === "comment") || [];
  const suggestions = feedbackItems?.filter((f) => f.feedback_type === "suggestion") || [];
  const issues = feedbackItems?.filter((f) => f.feedback_type === "issue") || [];

  const renderFeedbackItem = (item: FeedbackItem) => (
    <div key={item.id} className="bg-card border border-border rounded-xl p-4 space-y-2 shadow-lg">
      <div className="flex items-center gap-2">
        {item.name && <span className="text-sm font-semibold text-foreground">{item.name}</span>}
      </div>
      <p className="text-sm text-foreground leading-relaxed">{item.feedback}</p>
      {item.admin_response && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <Reply className="h-3 w-3" />
            SEND Reform Navigator response
          </div>
          <p className="text-sm text-foreground leading-relaxed">{item.admin_response}</p>
        </div>
      )}
    </div>
  );

  const renderSection = (title: string, items: FeedbackItem[]) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-4">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {items.map(renderFeedbackItem)}
      </div>
    );
  };

  return (
    <PageAccentProvider color="hsl(220 70% 45%)">
    <Layout>
      <SEOHead title="Feedback, Suggestions and Issues" description="Share your thoughts, suggest improvements, or report issues. All submissions are reviewed." path="/feedback" />
      <div className="content-section py-8 space-y-8">
        <PageOrientation icon={MessageSquare}
          sectionLabel="About"
          title="Feedback, Suggestions and Issues"
          description="Share your thoughts, suggest improvements, or report issues. Let us know if we have made a mistake or you want to challenge the information on the site. All submissions are reviewed before publishing."
        />

        {/* Submission form */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-lg">
          <h2 className="text-lg font-semibold text-foreground">Leave Feedback</h2>

          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle className="h-8 w-8 text-status-confirmed mx-auto mb-2" />
              <p className="font-semibold">Thank you for your feedback.</p>
              <p className="text-sm text-muted-foreground">It will appear here once reviewed.</p>
            </div>
          ) : (
            <>
              <Input
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
              {/* Honeypot field — hidden from real users */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute opacity-0 h-0 w-0 pointer-events-none"
              />
              <div className="flex gap-2">
                {(["comment", "suggestion", "issue"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFeedbackType(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      feedbackType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {typeLabels[type]}
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Share your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={2000}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">Feedback is moderated before publishing.</p>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || feedback.trim().length < 10}
                  className="rounded-full gap-1.5"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Published feedback grouped by type */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : feedbackItems && feedbackItems.length > 0 ? (
          <div className="space-y-8">
            {renderSection("Feedback", comments)}
            {renderSection("Suggestions", suggestions)}
            {renderSection("Issues Reported", issues)}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No feedback yet.</p>
            <p className="text-sm mt-1">Be the first to share your thoughts.</p>
          </div>
        )}
      </div>
    </Layout>
    </PageAccentProvider>
  );
}
