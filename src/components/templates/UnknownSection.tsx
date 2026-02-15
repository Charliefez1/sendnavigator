import { HelpCircle } from "lucide-react";

interface UnknownSectionProps {
  questions: string[];
}

export function UnknownSection({ questions }: UnknownSectionProps) {
  if (questions.length === 0) return null;

  return (
    <section className="content-section py-8 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">
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
