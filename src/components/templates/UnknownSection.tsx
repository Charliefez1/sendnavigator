import { HelpCircle } from "lucide-react";

interface UnknownSectionProps {
  questions: string[];
}

export function UnknownSection({ questions }: UnknownSectionProps) {
  if (questions.length === 0) return null;

  return (
    <section className="content-section py-3 border-t border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
        </div>
        <h2 className="text-base font-display font-semibold text-foreground">
          What is unknown or undecided
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        These questions remain unanswered or decisions have not yet been made.
      </p>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="flex gap-3 text-foreground">
            <span className="text-muted-foreground flex-shrink-0">?</span>
            <span className="leading-relaxed">{question}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
