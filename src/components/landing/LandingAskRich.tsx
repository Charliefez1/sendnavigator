import { useState, useRef } from "react";
import { Search, Sparkles, Lock } from "lucide-react";
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
    <section className="content-section py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-1.5">
            Try Ask Rich
          </h2>
          <p className="text-sm text-muted-foreground">
            Ask a question about SEND reform and get a grounded, honest answer.
          </p>
        </div>

        {/* Question input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(question);
          }}
          className="flex flex-col sm:flex-row gap-3 mb-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about SEND reform..."
              className="w-full pl-11 pr-4 py-3.5 min-h-[48px] bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              disabled={isLoading}
              maxLength={500}
            />
          </div>
          <Button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="px-6 min-h-[48px] text-sm w-full sm:w-auto"
          >
            {isLoading ? "..." : "Ask"}
          </Button>
        </form>

        {/* Example questions */}
        {!answer && !isLoading && (
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mr-1">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Try:
            </p>
            {exampleQuestions.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setQuestion(ex);
                  handleSubmit(ex);
                }}
                className="text-sm px-4 py-2.5 min-h-[44px] bg-secondary text-secondary-foreground rounded-lg sm:rounded-full hover:bg-secondary/80 transition-colors text-left sm:text-center"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="bg-card border border-border rounded-xl p-6 mt-4 animate-pulse">
            <div className="h-3 bg-muted rounded w-3/4 mb-3" />
            <div className="h-3 bg-muted rounded w-full mb-3" />
            <div className="h-3 bg-muted rounded w-5/6" />
          </div>
        )}

        {/* Frosted answer */}
        {answer && (
          <div ref={answerRef} className="relative mt-4">
            <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
              <div className="space-y-3 text-sm text-foreground leading-relaxed">
                {answer.plainAnswer.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Frost overlay covering bottom 70% */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 25%, hsl(var(--background) / 0.6) 40%, hsl(var(--background) / 0.95) 60%)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* CTA overlay */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-6 px-4">
              <Lock className="w-5 h-5 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground mb-3 text-center">
                Sign up or sign in to read the full answer
              </p>
              <Button onClick={onSignUpClick} className="gap-2">
                Continue reading
              </Button>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-3">
          Ask short, simple questions. This is a general explainer, not legal advice.
        </p>
      </div>
    </section>
  );
}
