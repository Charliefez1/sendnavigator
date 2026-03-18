import { useState, useEffect, useRef } from "react";
import { QuestionInput } from "./QuestionInput";
import { AnswerDisplay } from "./AnswerDisplay";
import { QandAResponse, checkForRefusal } from "./types";
import { Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AITrustNotice } from "@/components/feedback";

interface QandAComponentProps {
  initialQuestion?: string;
}

export function QandAComponent({ initialQuestion }: QandAComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [response, setResponse] = useState<QandAResponse | null>(null);
  const hasAutoSubmitted = useRef(false);

  useEffect(() => {
    if (initialQuestion && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      handleSubmit(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSubmit = async (question: string) => {
    setIsLoading(true);
    setCurrentQuestion(question);
    setResponse(null);

    const refusal = checkForRefusal(question);
    if (refusal) {
      setResponse(refusal);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("qanda", {
        body: { question },
      });

      if (error) {
        console.error("Q&A error:", error);
        if (error.message?.includes("429") || error.message?.includes("rate")) {
          toast.error("Service is busy. Please try again in a moment.");
        } else {
          toast.error("Unable to get an answer. Please try again.");
        }
        setResponse({
          type: "answer",
          data: {
            plainAnswer: [
              "We were unable to generate an answer at this time.",
              "Please try again, or explore the pages below for relevant information.",
            ],
            confidence: "unknown",
            whatWeKnow: ["Your question has been received"],
            whatWeDoNotKnow: ["Unable to retrieve specific information at this time"],
            clarifications: {
              doesMean: ["You can try asking again or explore the resource directly"],
              doesNotMean: ["This does not mean the information is unavailable"],
            },
            readMore: [
              { label: "What we know right now", path: "/where-we-are-now" },
              { label: "What is now in motion", path: "/what-is-changing" },
            ],
            lastUpdated: "1st March 2026",
          },
        });
        setIsLoading(false);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        setResponse({
          type: "answer",
          data: {
            plainAnswer: [data.error],
            confidence: "unknown",
            whatWeKnow: [],
            whatWeDoNotKnow: [],
            clarifications: { doesMean: [], doesNotMean: [] },
            readMore: [{ label: "What we know right now", path: "/where-we-are-now" }],
            lastUpdated: "1st March 2026",
          },
        });
        setIsLoading(false);
        return;
      }

      setResponse(data as QandAResponse);
    } catch (err) {
      console.error("Q&A request failed:", err);
      toast.error("Unable to connect to the Q&A service.");
      setResponse({
        type: "answer",
        data: {
          plainAnswer: ["We were unable to connect to the Q&A service. Please try again later."],
          confidence: "unknown",
          whatWeKnow: [],
          whatWeDoNotKnow: [],
          clarifications: { doesMean: [], doesNotMean: [] },
          readMore: [
            { label: "What we know right now", path: "/where-we-are-now" },
            { label: "About this resource", path: "/about" },
          ],
          lastUpdated: "1st March 2026",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCurrentQuestion(null);
    setResponse(null);
  };

  return (
    <div
      className="rounded-xl border p-5 sm:p-6 shadow-lg"
      style={{
        borderColor: "hsl(262 50% 50% / 0.15)",
        backgroundColor: "hsl(262 30% 97% / 0.6)",
        boxShadow: "0 8px 32px -8px hsl(262 50% 50% / 0.1), 0 4px 16px -4px rgba(0,0,0,0.06)",
      }}
    >
      <QuestionInput onSubmit={handleSubmit} isLoading={isLoading} initialValue={initialQuestion} />

      {isLoading && (
        <div className="mt-6 p-8 bg-card border border-border rounded-lg text-center shadow-card">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
          </div>
          <p className="text-sm text-muted-foreground mt-4">Finding an answer...</p>
        </div>
      )}

      {response && currentQuestion && !isLoading && (
        <div className="mt-6 space-y-4">
          <AnswerDisplay response={response} question={currentQuestion} onFollowUp={handleSubmit} />
          
          <button
            onClick={handleClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ask another question
          </button>
        </div>
      )}

      {/* Trust notice */}
      <div className="mt-5 pt-4 border-t" style={{ borderColor: "hsl(262 50% 50% / 0.1)" }}>
        <AITrustNotice />
        <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            I can explain the big picture but I can't comment on your individual situation or give legal advice. 
            If you need that kind of support, please speak to a specialist.
          </span>
        </p>
      </div>
    </div>
  );
}
