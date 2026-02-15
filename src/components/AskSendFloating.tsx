import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function AskSendFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    navigate(`/questions-and-answers?q=${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
    setQuestion("");
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="w-72 rounded-xl border border-border bg-card shadow-xl p-4 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">Ask SEND</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Ask a plain English question about SEND reform.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="text-sm"
              maxLength={500}
              aria-label="Ask a question about SEND reform"
            />
            <Button
              type="submit"
              disabled={!question.trim()}
              size="icon"
              className="shrink-0 rounded-full h-9 w-9"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Ask SEND a question"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
