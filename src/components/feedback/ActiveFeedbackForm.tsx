import { useState } from "react";
import { MessageSquarePlus, X, AlertCircle } from "lucide-react";
import { feedbackCategories, validateFeedback, type ActiveFeedbackCategory } from "@/config/feedback";
import { toast } from "sonner";

interface ActiveFeedbackFormProps {
  pageUrl: string;
}

export function ActiveFeedbackForm({ pageUrl }: ActiveFeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<ActiveFeedbackCategory | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!category) {
      setError("Please select a category");
      return;
    }

    const validation = validateFeedback(description, category);
    if (!validation.valid) {
      setError(validation.error || "Invalid feedback");
      return;
    }

    // Log feedback (in production, this would be stored)
    console.log("Active feedback:", {
      category,
      description,
      pageUrl,
      timestamp: new Date().toISOString(),
      status: "pending",
    });

    setSubmitted(true);
    toast.success("Thank you. Your feedback will be reviewed.");
  };

  const handleReset = () => {
    setCategory(null);
    setDescription("");
    setError(null);
    setSubmitted(false);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageSquarePlus className="w-4 h-4" />
        Suggest an improvement
      </button>
    );
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-foreground mb-2">Thank you for your feedback.</p>
        <p className="text-sm text-muted-foreground mb-4">
          Your feedback will be reviewed by the editorial team. Changes are only made 
          after verification against sources.
        </p>
        <button
          onClick={handleReset}
          className="text-sm text-primary hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-medium text-foreground">Suggest an improvement</h3>
        <button
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close feedback form"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Category selection */}
      <div className="space-y-2 mb-4">
        <p className="text-sm text-muted-foreground">What type of feedback?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.entries(feedbackCategories) as [ActiveFeedbackCategory, typeof feedbackCategories[ActiveFeedbackCategory]][]).map(([key, config]) => (
            <button
              key={key}
              onClick={() => {
                setCategory(key);
                setError(null);
              }}
              className={`text-left p-3 rounded-lg border transition-colors ${
                category === key
                  ? "border-primary bg-accent"
                  : "border-border hover:bg-accent/50"
              }`}
            >
              <span className="text-sm font-medium text-foreground block">
                {config.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {config.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Description input */}
      {category && (
        <div className="space-y-2 mb-4">
          <label className="text-sm text-muted-foreground block">
            Brief description
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError(null);
            }}
            placeholder={feedbackCategories[category].placeholder}
            className="w-full p-3 text-sm border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
            maxLength={feedbackCategories[category].maxLength}
          />
          <p className="text-xs text-muted-foreground">
            {description.length}/{feedbackCategories[category].maxLength} characters
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 text-sm text-destructive mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Important notice */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        <p className="text-xs text-muted-foreground">
          <strong>Please note:</strong> This is for general improvements only. 
          Do not include personal case details. Feedback is reviewed but responses 
          are not guaranteed. Changes are made only after verification.
        </p>
      </div>

      {/* Submit button */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={!category || !description.trim()}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit feedback
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
