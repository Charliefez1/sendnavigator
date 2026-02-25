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
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "hsl(222 20% 45%)" }} />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about SEND reform..."
            className="w-full pl-12 pr-4 py-4 min-h-[52px] rounded-xl text-sm transition-all duration-300"
            style={{
              backgroundColor: "hsl(222 28% 14%)",
              border: "1px solid hsl(222 20% 22%)",
              color: "hsl(0 0% 90%)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "hsl(175 60% 40% / 0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 3px hsl(175 60% 40% / 0.15), 0 0 20px hsl(175 60% 40% / 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "hsl(222 20% 22%)";
              e.currentTarget.style.boxShadow = "none";
            }}
            disabled={isLoading}
            maxLength={500}
          />
        </div>
        <Button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="px-7 min-h-[52px] text-sm w-full sm:w-auto rounded-xl"
        >
          {isLoading ? "Thinking..." : "Ask Rich"}
        </Button>
      </form>

      {/* Examples */}
      {!answer && !isLoading && (
        <div className="flex flex-wrap gap-2 mt-4">
          <Sparkles className="w-3.5 h-3.5 mt-3" style={{ color: "hsl(222 20% 45%)" }} aria-hidden="true" />
          {exampleQuestions.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setQuestion(ex);
                handleSubmit(ex);
              }}
              className="text-xs px-4 py-2.5 min-h-[40px] rounded-full transition-all duration-200"
              style={{
                backgroundColor: "hsl(222 28% 14% / 0.8)",
                color: "hsl(222 20% 60%)",
                border: "1px solid hsl(222 20% 22%)",
                borderLeft: "3px solid hsl(175 60% 40% / 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(175 60% 40% / 0.3)";
                e.currentTarget.style.color = "hsl(0 0% 85%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "hsl(222 20% 22%)";
                e.currentTarget.style.borderLeft = "3px solid hsl(175 60% 40% / 0.4)";
                e.currentTarget.style.color = "hsl(222 20% 60%)";
              }}
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
        <div
          className="rounded-xl p-6 mt-5 space-y-3 animate-pulse"
          style={{ backgroundColor: "hsl(222 28% 14%)", border: "1px solid hsl(222 20% 22%)" }}
        >
          <div className="h-3 rounded w-4/5" style={{ backgroundColor: "hsl(222 25% 22%)" }} />
          <div className="h-3 rounded w-full" style={{ backgroundColor: "hsl(222 25% 22%)" }} />
          <div className="h-3 rounded w-3/5" style={{ backgroundColor: "hsl(222 25% 22%)" }} />
        </div>
      )}

      {/* Frosted answer */}
      {answer && (
        <div ref={answerRef} className="relative mt-5 rounded-xl overflow-hidden">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: "hsl(222 28% 14%)", border: "1px solid hsl(222 20% 22%)" }}
          >
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "hsl(0 0% 85%)" }}>
              {answer.plainAnswer.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Frost */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(to bottom, transparent 15%, hsl(222 35% 8% / 0.6) 30%, hsl(222 35% 8% / 0.98) 50%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* CTA */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-10 px-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "hsl(175 60% 40% / 0.12)" }}
            >
              <Lock className="w-5 h-5" style={{ color: "hsl(175 60% 52%)" }} />
            </div>
            <p className="text-sm font-medium mb-1 text-center" style={{ color: "hsl(0 0% 92%)" }}>
              Sign in to read the full answer
            </p>
            <p className="text-xs mb-5 text-center" style={{ color: "hsl(222 20% 50%)" }}>
              Free account, takes 30 seconds
            </p>
            <Button
              onClick={onSignUpClick}
              className="gap-2 rounded-full px-7"
              style={{
                boxShadow: "0 0 25px hsl(175 60% 40% / 0.2)",
              }}
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
