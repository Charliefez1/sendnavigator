import { Link } from "react-router-dom";

interface WordFromRichProps {
  children: React.ReactNode;
}

export function WordFromRich({ children }: WordFromRichProps) {
  return (
    <div className="content-section py-4">
      <div className="rounded-xl border-l-4 border-l-[hsl(var(--accent-violet))] bg-[hsl(var(--accent-violet-bg))] border border-[hsl(var(--accent-violet)/0.2)] p-5 sm:p-6 space-y-3">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">A word from Rich</p>
        <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
          {children}
        </div>
        <p className="text-sm text-muted-foreground pt-1">
          Got a question?{" "}
          <Link to="/questions-and-answers" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">
            Ask Rich
          </Link>
          . Or{" "}
          <Link to="/feedback" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">
            leave a comment or feedback
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
