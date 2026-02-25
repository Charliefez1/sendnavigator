import { Link } from "react-router-dom";
import { MessageCircleQuestion } from "lucide-react";

interface WordFromRichProps {
  children: React.ReactNode;
}

export function WordFromRich({ children }: WordFromRichProps) {
  return (
    <div className="content-section py-2">
      <div
        className="rounded-xl border-l-4 border border-border p-5 sm:p-6 space-y-3"
        style={{
          borderLeftColor: "hsl(262 50% 50%)",
          boxShadow: "0 8px 32px -8px hsl(262 50% 50% / 0.08), 0 4px 16px -4px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(262 50% 50% / 0.1)" }}>
            <MessageCircleQuestion className="w-4 h-4" style={{ color: "hsl(262 60% 55%)" }} />
          </div>
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">A word from Rich</p>
        </div>
        <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
          {children}
        </div>
        <p className="text-sm text-muted-foreground pt-1">
          Got a question?{" "}
          <Link to="/questions-and-answers" className="font-medium hover:underline" style={{ color: "hsl(262 60% 55%)" }}>
            Ask Rich
          </Link>
          . Or{" "}
          <Link to="/feedback" className="font-medium hover:underline" style={{ color: "hsl(262 60% 55%)" }}>
            leave a comment or feedback
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
