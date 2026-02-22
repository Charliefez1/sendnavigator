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
  "I just found out my child might need an EHCP",
  "I've heard about SEND reform and I'm worried",
  "My child is struggling at school and I don't know where to start",
  "I want to understand what's changing with SEND",
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
      <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-lg space-y-5">
        <div className="flex items-start gap-3">
          <Compass className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">{result.message}</p>
        </div>

        <div className="space-y-2">
          {result.recommendations.map((rec) => (
            <Link
              key={rec.path}
              to={rec.path}
              className="flex items-start gap-3 p-3.5 bg-background border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors leading-tight">
                  {rec.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{rec.reason}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
            </Link>
          ))}
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
      <div className="bg-navy text-white rounded-xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-center justify-center gap-3 py-6">
          <Loader2 className="w-4 h-4 text-white/70 animate-spin" />
          <p className="text-sm text-white/70">Finding the right pages for you...</p>
        </div>
      </div>
    );
  }

  // === INPUT VIEW ===
  return (
    <div className="bg-navy text-white rounded-xl p-6 sm:p-8 shadow-lg space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-display font-semibold text-white">
            Tell us why you are here today
          </h1>
          <p className="text-sm text-white/70 mt-0.5">
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
            className="text-xs px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 hover:bg-white/20 hover:border-white/30 transition-all text-left"
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
          className="resize-none text-sm bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
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
          variant="secondary"
          className="flex-shrink-0 self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <p className="text-xs text-red-300">{error}</p>
      )}
    </div>
  );
}
