import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

interface PassiveFeedbackProps {
  pageUrl: string;
}

export function PassiveFeedback({ pageUrl }: PassiveFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedType, setSelectedType] = useState<"clear" | "unclear" | null>(null);

  const handleFeedback = (type: "clear" | "unclear") => {
    setSelectedType(type);
    if (type === "unclear") {
      setShowComment(true);
    } else {
      submitFeedback(type, "");
    }
  };

  const submitFeedback = (type: "clear" | "unclear", commentText: string) => {
    // Log feedback (in production, this would be stored)
    console.log("Passive feedback:", {
      type,
      comment: commentText,
      pageUrl,
      timestamp: new Date().toISOString(),
    });
    
    setSubmitted(true);
    toast.success("Thank you for your feedback");
  };

  const handleCommentSubmit = () => {
    if (selectedType) {
      submitFeedback(selectedType, comment);
      setShowComment(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-sm text-muted-foreground py-2">
        Thank you for your feedback.
      </div>
    );
  }

  return (
    <div className="border-t border-border pt-4 mt-8">
      <p className="text-sm text-muted-foreground mb-3">Was this page clear?</p>
      
      {!showComment ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleFeedback("clear")}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
            aria-label="Yes, this page was clear"
          >
            <ThumbsUp className="w-4 h-4" />
            Yes
          </button>
          <button
            onClick={() => handleFeedback("unclear")}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
            aria-label="No, something was unclear"
          >
            <ThumbsDown className="w-4 h-4" />
            Not quite
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What could be clearer? (optional)"
            className="w-full p-3 text-sm border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={2}
            maxLength={300}
          />
          <div className="flex gap-2">
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
            <button
              onClick={() => {
                if (selectedType) submitFeedback(selectedType, "");
              }}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
