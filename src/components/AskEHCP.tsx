import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { usePageAccent } from "@/contexts/PageAccentContext";

function hslAlpha(hsl: string, alpha: number): string {
  return hsl.replace(")", ` / ${alpha})`);
}

export function AskEHCP() {
  const accent = usePageAccent() || "hsl(220 70% 45%)";
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    navigate(`/questions-and-answers?q=${encodeURIComponent("EHCP: " + trimmed)}`);
  };

  const suggestions = [
    "Who can request an EHCP assessment?",
    "How long does the EHCP process take?",
    "What happens if the LA refuses to assess?",
    "What sections does an EHCP contain?",
    "Can I choose my child's school?",
    "What are my rights at annual review?",
  ];

  return (
    <div
      className="rounded-2xl border-2 p-5 shadow-lg bg-card"
      style={{
        borderColor: hslAlpha(accent, 0.3),
        boxShadow: `0 8px 32px -8px ${hslAlpha(accent, 0.1)}, 0 4px 16px -4px rgba(0,0,0,0.06)`,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2" style={{ color: accent }}>
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold text-sm">Ask a question about EHCPs</span>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Can my child's EHCP name a specialist school?"
              className="pl-9"
              maxLength={500}
              aria-label="Ask a question about EHCPs"
            />
          </div>
          <Button
            type="submit"
            disabled={!question.trim()}
            size="sm"
            className="rounded-full px-4 min-h-[44px]"
            style={{ backgroundColor: accent }}
          >
            Ask
          </Button>
        </div>
      </form>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuestion(s)}
            className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Get a plain English answer focused on the EHCP process, your rights, and what to expect.
      </p>
    </div>
  );
}
