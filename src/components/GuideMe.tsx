import { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowRight, Send, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  path: string;
  title: string;
  reason: string;
}

interface GuideResult {
  message: string;
  recommendations: Recommendation[];
}

const QUICK_OPTIONS = [
  "What are Individual Support Plans and will they replace EHCPs?",
  "What does the white paper mean for my child today?",
  "Is my child's EHCP safe?",
  "What is the Experts at Hand programme?",
  "Have I missed something important?",
  "What is the long term outlook as my daughter is 3?",
  "The school says they cannot meet my child's need. What does that mean?",
  "My child is melting down every day after school. Why?",
];

export function GuideMe() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GuideResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (message: string) => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("guide-me", {
        body: { message: message.trim() },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      setResult(data as GuideResult);
    } catch (e) {
      console.error("Guide me error:", e);
      setError("Something went wrong. Try browsing the full site instead.");
    } finally {
      setLoading(false);
    }
  };

  // === RESULT VIEW ===
  if (result) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex items-start gap-3">
          <Compass className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">{result.message}</p>
        </div>

        <div className="space-y-2">
          {result.recommendations.map((rec) => (
            <Link
              key={rec.path}
              to={rec.path}
              className="block px-3 py-1.5 bg-background border border-border rounded-lg hover:shadow-md hover:border-primary/40 hover:bg-accent/50 transition-all group"
            >
              <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors leading-tight">
                {rec.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{rec.reason} — Click for more.</p>
            </Link>
          ))}

          {/* Ask Rich option */}
          <Link
            to="/questions-and-answers"
            className="block px-3 py-1.5 bg-background border border-border rounded-lg hover:shadow-md hover:border-primary/40 hover:bg-accent/50 transition-all group"
          >
            <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors leading-tight">
              Ask Rich
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Ask a question and get a plain-English answer. — Click for more.</p>
          </Link>
        </div>

        <button
          onClick={() => {
            setResult(null);
            setInput("");
          }}
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Ask something else
        </button>
      </div>
    );
  }

  // === LOADING VIEW ===
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-center gap-3 py-6">
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Finding the right pages for you...</p>
        </div>
      </div>
    );
  }

  // === INPUT VIEW ===
  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Compass className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-display font-semibold text-foreground">
            Tell us why you are here today
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            We will point you to the right part of the site.
          </p>
        </div>
      </div>

      {/* Quick options */}
      <div className="flex flex-wrap gap-2">
        {QUICK_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSubmit(opt)}
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted text-foreground hover:bg-accent hover:border-primary/30 transition-all text-left"
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Free text input */}
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Or type your own..."
          rows={2}
          className="resize-none text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(input);
            }
          }}
        />
        <Button
          onClick={() => handleSubmit(input)}
          disabled={!input.trim()}
          size="icon"
          className="flex-shrink-0 self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
