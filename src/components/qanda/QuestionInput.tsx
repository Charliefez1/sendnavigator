import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exampleQuestions } from "./types";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export function QuestionInput({ onSubmit, isLoading }: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setQuestion(example);
    onSubmit(example);
  };

  return (
    <div className="space-y-4">
      {/* Stack on mobile, row on larger screens */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about SEND reform..."
            className="w-full pl-11 pr-4 py-3.5 min-h-[48px] bg-card border border-border rounded-lg text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            disabled={isLoading}
            maxLength={500}
            aria-label="Ask a question about SEND reform"
          />
        </div>
        <Button 
          type="submit" 
          disabled={!question.trim() || isLoading}
          className="px-6 min-h-[48px] text-base w-full sm:w-auto"
        >
          {isLoading ? "..." : "Ask"}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          Try an example question:
        </p>
        {/* Stack on mobile for easier tapping */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
          {exampleQuestions.map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              className="text-sm sm:text-base px-4 py-2.5 min-h-[44px] bg-secondary text-secondary-foreground rounded-lg sm:rounded-full hover:bg-secondary/80 active:bg-secondary/70 transition-colors disabled:opacity-50 text-left sm:text-center"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Ask short, simple questions. This is a general explainer, not legal advice.
      </p>
    </div>
  );
}
