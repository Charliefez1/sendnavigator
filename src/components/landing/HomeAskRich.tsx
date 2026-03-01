import { useState, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { AnswerDisplay } from "@/components/qanda/AnswerDisplay";
import { QandAResponse, checkForRefusal } from "@/components/qanda/types";
import { useNavigate } from "react-router-dom";

const exampleQuestions = [
  "I need to know what to say to school about my child's needs",
  "The school have contacted us about our child, what do we do now?",
  "I just want to find out more about ADHD",
  "What is RSD, ODD or PDA?",
  "Is my child's EHCP safe under the new reforms?",
  "What does the white paper mean for my child today?",
];

export function HomeAskRich() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<QandAResponse | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const startTimer = () => {
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };
  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSubmit = async (q: string) => {
    if (!q.trim() || isLoading) return;
    setIsLoading(true);
    setResponse(null);
    setCurrentQuestion(q.trim());
    startTimer();

    const refusal = checkForRefusal(q);
    if (refusal) {
      setResponse(refusal);
      setIsLoading(false);
      stopTimer();
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("qanda", {
        body: { question: q.trim() },
      });
      if (error) throw error;
      if (data?.error) {
        setResponse(null);
      } else {
        setResponse(data as QandAResponse);
        setTimeout(() => {
          answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    } catch {
      setResponse(null);
    } finally {
      setIsLoading(false);
      stopTimer();
    }
  };

  const handleClear = () => {
    setResponse(null);
    setCurrentQuestion(null);
    setQuestion("");
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSubmit(question); }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "hsl(222 20% 45%)" }} />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about SEND reform..."
            className="w-full pl-12 pr-4 py-4 min-h-[52px] rounded-xl text-sm transition-all duration-200 focus:outline-none"
            style={{
              backgroundColor: "hsl(222 28% 14%)",
              border: "1px solid hsl(222 20% 22%)",
              color: "hsl(0 0% 90%)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "hsl(262 50% 50% / 0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 3px hsl(262 50% 50% / 0.15)";
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
          {isLoading ? "Thinking…" : "Ask"}
        </Button>
      </form>

      {/* Example questions */}
      {!response && !isLoading && (
        <div className="space-y-2.5">
          <p className="text-xs" style={{ color: "hsl(222 20% 45%)" }}>
            Try an example question:
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((ex) => (
              <button
                key={ex}
                onClick={() => { setQuestion(ex); handleSubmit(ex); }}
                className="text-xs px-4 py-2.5 rounded-full transition-all duration-200 hover:brightness-110"
                style={{
                  backgroundColor: "hsl(222 28% 14% / 0.8)",
                  color: "hsl(222 20% 60%)",
                  border: "1px solid hsl(222 20% 22%)",
                  borderLeft: "3px solid hsl(262 50% 50% / 0.4)",
                }}
              >
                {ex}
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: "hsl(222 20% 40%)" }}>
            Ask short, simple questions. This is a general explainer, not legal advice.
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div
          className="rounded-xl p-5 flex items-center gap-3"
          style={{ backgroundColor: "hsl(222 28% 14%)", border: "1px solid hsl(222 20% 22%)" }}
        >
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: "hsl(262 50% 60%)" }} />
          <span className="text-sm" style={{ color: "hsl(222 20% 55%)" }}>
            Thinking… {seconds}s
          </span>
        </div>
      )}

      {/* Answer */}
      {response && currentQuestion && !isLoading && (
        <div ref={answerRef} className="space-y-3">
          <AnswerDisplay response={response} question={currentQuestion} />
          <div className="flex items-center gap-4">
            <button
              onClick={handleClear}
              className="text-xs transition-colors"
              style={{ color: "hsl(222 20% 55%)" }}
            >
              Ask another question
            </button>
            <button
              onClick={() => navigate(`/questions-and-answers?q=${encodeURIComponent(currentQuestion)}`)}
              className="text-xs transition-colors"
              style={{ color: "hsl(262 50% 65%)" }}
            >
              View full answer page →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
