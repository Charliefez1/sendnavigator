import { useState, useRef } from "react";
import { Search, Sparkles, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const exampleQuestions = [
  "Has the law on EHCPs changed?",
  "What is the SEND reform about?",
  "What should I do right now?",
];

interface AnswerData {
  plainAnswer: string[];
  confidence: string;
}

interface LandingAskRichProps {
  onSignUpClick: () => void;
}

export function LandingAskRich({ onSignUpClick }: LandingAskRichProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AnswerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const answerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (q: string) => {
    if (!q.trim() || isLoading) return;
    setIsLoading(true);
    setError("");
    setAnswer(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("qanda", {
        body: { question: q.trim() },
      });

      if (fnError) throw fnError;
      if (data?.type === "answer" && data?.data) {
        setAnswer(data.data);
        setTimeout(() => {
          answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      } else if (data?.error) {
        setError(data.error);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(question);
        }}
        className="flex flex-col sm:flex-row gap-2.5"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about SEND reform..."
            className="w-full pl-11 pr-4 py-3.5 min-h-[48px] bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
            disabled={isLoading}
            maxLength={500}
          />
        </div>
        <Button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="px-6 min-h-[48px] text-sm w-full sm:w-auto rounded-xl"
        >
          {isLoading ? "Thinking..." : "Ask Rich"}
        </Button>
      </form>

      {/* Examples */}
      {!answer && !isLoading && (
        <div className="flex flex-wrap gap-2 mt-3">
          <Sparkles className="w-3.5 h-3.5 text-muted-foreground mt-2.5" aria-hidden="true" />
          {exampleQuestions.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setQuestion(ex);
                handleSubmit(ex);
              }}
              className="text-xs px-3.5 py-2 min-h-[36px] bg-card/60 text-muted-foreground border border-border/50 rounded-full hover:bg-card hover:border-border transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-sm text-destructive mt-3">{error}</p>}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="bg-card border border-border rounded-xl p-5 mt-4 space-y-3 animate-pulse">
          <div className="h-3 bg-muted rounded w-4/5" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-3/5" />
        </div>
      )}

      {/* Frosted answer */}
      {answer && (
        <div ref={answerRef} className="relative mt-4 rounded-xl overflow-hidden">
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
            <div className="space-y-2.5 text-sm text-foreground leading-relaxed">
              {answer.plainAnswer.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Frost */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(to bottom, transparent 20%, hsl(var(--background) / 0.5) 35%, hsl(var(--background) / 0.97) 55%)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />

          {/* CTA */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-8 px-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Lock className="w-4.5 h-4.5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1 text-center">
              Sign in to read the full answer
            </p>
            <p className="text-xs text-muted-foreground mb-4 text-center">
              Free account, takes 30 seconds
            </p>
            <Button onClick={onSignUpClick} className="gap-2 rounded-full px-6">
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
