import { useState } from "react";
import { QuestionInput } from "./QuestionInput";
import { AnswerDisplay } from "./AnswerDisplay";
import { QandAResponse, checkForRefusal, isLeaksRelated } from "./types";
import { MessageCircle, Info } from "lucide-react";

// Placeholder response generator - will be replaced with AI integration
function generatePlaceholderResponse(question: string): QandAResponse {
  // Check for refusal conditions first
  const refusal = checkForRefusal(question);
  if (refusal) {
    return refusal;
  }

  // Check if leaks-related to set appropriate confidence
  const leaksRelated = isLeaksRelated(question);

  // Placeholder structured response
  return {
    type: "answer",
    data: {
      plainAnswer: [
        "This is a placeholder response. The Q&A component is ready to be connected to an AI system.",
        "Once connected, answers will be generated based on the content within SEND Reform Navigator.",
        "All answers will follow this exact structure, with clear confidence labels and links to relevant pages.",
      ],
      confidence: leaksRelated ? "unconfirmed" : "unknown",
      whatWeKnow: [
        "The Q&A component structure is complete",
        "Answers will follow a consistent format",
        "Confidence levels will be clearly labelled",
      ],
      whatWeDoNotKnow: [
        "Specific answers depend on AI integration",
        "Content will be drawn from SEND Reform Navigator pages",
      ],
      clarifications: {
        doesMean: [
          "You can ask questions about SEND reform",
          "Answers will be clearly structured",
        ],
        doesNotMean: [
          "This is not legal advice",
          "This cannot comment on individual cases",
        ],
      },
      readMore: [
        { label: "Where we are now", path: "/where-we-are-now" },
        { label: "What is changing", path: "/what-is-changing" },
        { label: "What the leaks are saying", path: "/what-the-leaks-are-saying" },
      ],
      lastUpdated: "4th February 2026",
    },
  };
}

export function QandAComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [response, setResponse] = useState<QandAResponse | null>(null);

  const handleSubmit = async (question: string) => {
    setIsLoading(true);
    setCurrentQuestion(question);
    setResponse(null);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate placeholder response (will be replaced with AI call)
    const result = generatePlaceholderResponse(question);
    setResponse(result);
    setIsLoading(false);
  };

  const handleClear = () => {
    setCurrentQuestion(null);
    setResponse(null);
  };

  return (
    <section className="bg-secondary/30 border border-border rounded-lg p-6">
      <div className="flex items-start gap-3 mb-5">
        <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-medium text-foreground">
            Ask a question about SEND reform
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Get a plain English explanation based on what we know, what is being discussed, 
            and what remains uncertain.
          </p>
        </div>
      </div>

      <QuestionInput onSubmit={handleSubmit} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-6 p-8 bg-card border border-border rounded-lg text-center">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
          </div>
          <p className="text-sm text-muted-foreground mt-4">Finding an answer...</p>
        </div>
      )}

      {response && currentQuestion && !isLoading && (
        <div className="mt-6 space-y-4">
          <AnswerDisplay response={response} question={currentQuestion} />
          
          <button
            onClick={handleClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ask another question
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex gap-2 text-xs text-muted-foreground">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <p>
            This is a general explainer, not legal advice. It cannot comment on individual 
            cases or tell you what to do. For specialist support, please seek appropriate 
            professional guidance.
          </p>
        </div>
      </div>
    </section>
  );
}
