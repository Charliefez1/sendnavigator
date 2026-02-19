import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function AskAICompact() {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    navigate(`/questions-and-answers?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="border-2 border-primary rounded-2xl p-4 hover:border-primary transition-all duration-200 shadow-lg bg-card">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold text-sm">Ask Rich about SEND reform</span>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="pl-9"
              maxLength={500}
              aria-label="Ask a question about SEND reform"
            />
          </div>
          <Button
            type="submit"
            disabled={!question.trim()}
            size="sm"
            className="rounded-full px-4 min-h-[44px]"
          >
            Ask
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          I'll give you a straight answer based on what we actually know.
        </p>
      </form>
    </div>
  );
}
