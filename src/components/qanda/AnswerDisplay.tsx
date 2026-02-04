import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  QandAAnswer, 
  QandARefusal, 
  QandAResponse, 
  confidenceLabels 
} from "./types";
import { 
  CheckCircle, 
  HelpCircle, 
  AlertTriangle, 
  Clock,
  ArrowRight,
  ShieldAlert,
  Shield
} from "lucide-react";

interface AnswerDisplayProps {
  response: QandAResponse;
  question: string;
}

function ConfidenceBadge({ confidence }: { confidence: QandAAnswer["confidence"] }) {
  const statusMap = {
    confirmed: "confirmed" as const,
    discussed: "discussed" as const,
    unconfirmed: "unconfirmed" as const,
    unknown: "unconfirmed" as const,
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Confidence:</span>
      <StatusBadge status={statusMap[confidence]} />
    </div>
  );
}

function RefusalDisplay({ refusal, question }: { refusal: QandARefusal; question: string }) {
  return (
    <div className="bg-muted/50 border border-border rounded-lg p-5 space-y-4">
      <div className="flex gap-3">
        <ShieldAlert className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="space-y-3">
          <p className="font-medium text-foreground">
            We cannot answer this question directly
          </p>
          <p className="text-muted-foreground">{refusal.reason}</p>
          <p className="text-muted-foreground">{refusal.suggestion}</p>
        </div>
      </div>

      {refusal.readMore.length > 0 && (
        <div className="pt-3 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-2">
            You may find these pages helpful:
          </p>
          <div className="flex flex-wrap gap-2">
            {refusal.readMore.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                {link.label}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnswerContent({ answer, question }: { answer: QandAAnswer; question: string }) {
  const isLeaksRelated = answer.confidence === "unconfirmed";

  return (
    <div className="bg-card border border-border rounded-lg divide-y divide-border">
      {/* Question echo */}
      <div className="p-4 sm:p-5 bg-muted/30">
        <p className="text-sm text-muted-foreground">Your question:</p>
        <p className="font-medium text-foreground">{question}</p>
      </div>

      {/* 1. Plain English answer */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-medium text-base sm:text-lg text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
          Answer
        </h3>
        <div className="prose-calm space-y-3">
          {answer.plainAnswer.map((para, i) => (
            <p key={i} className="text-base leading-relaxed">{para}</p>
          ))}
        </div>
      </div>

      {/* Leaks warning if applicable */}
      {isLeaksRelated && (
        <div className="p-4 sm:p-5 bg-status-unconfirmed-bg">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-status-unconfirmed flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium text-base text-foreground">This relates to unconfirmed information</p>
              <p className="text-muted-foreground mt-1 text-base leading-relaxed">
                Leaks are not policy. Any changes would require consultation and legislation. 
                Current legal protections remain in place.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Confidence label */}
      <div className="p-4 sm:p-5">
        <ConfidenceBadge confidence={answer.confidence} />
      </div>

      {/* 3. What we know */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-medium text-base sm:text-lg text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-status-confirmed flex-shrink-0" aria-hidden="true" />
          What we know
        </h3>
        <ul className="space-y-3">
          {answer.whatWeKnow.map((point, i) => (
            <li key={i} className="flex gap-3 text-foreground text-base leading-relaxed">
              <span className="text-status-confirmed flex-shrink-0 mt-1">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 4. What we do not know yet */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-medium text-base sm:text-lg text-foreground flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
          What we do not know yet
        </h3>
        <ul className="space-y-3">
          {answer.whatWeDoNotKnow.map((point, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground text-base leading-relaxed">
              <span className="flex-shrink-0 mt-1">?</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. What this does and does not mean */}
      <div className="p-4 sm:p-5 space-y-4">
        <h3 className="font-medium text-base sm:text-lg text-foreground">What this does and does not mean</h3>
        
        {/* Stack on mobile, side by side on larger screens */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 p-3 bg-status-confirmed-bg rounded-lg">
            <p className="text-base font-medium text-status-confirmed flex items-center gap-2">
              <Shield className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              This means:
            </p>
            <ul className="space-y-2">
              {answer.clarifications.doesMean.map((point, i) => (
                <li key={i} className="text-foreground text-base leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-base font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              This does not mean:
            </p>
            <ul className="space-y-2">
              {answer.clarifications.doesNotMean.map((point, i) => (
                <li key={i} className="text-muted-foreground text-base leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 6. Where to read more */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-medium text-base sm:text-lg text-foreground">Where to read more</h3>
        {/* Stack on mobile for easier tapping */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
          {answer.readMore.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="inline-flex items-center justify-between sm:justify-start gap-2 px-4 py-3 min-h-[48px] text-base bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 active:bg-secondary/70 transition-colors"
            >
              {link.label}
              <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Last updated */}
      <div className="p-4 sm:p-5 bg-muted/30">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          Answer based on information last updated: {answer.lastUpdated}
        </p>
      </div>
    </div>
  );
}

export function AnswerDisplay({ response, question }: AnswerDisplayProps) {
  if (response.type === "refusal") {
    return <RefusalDisplay refusal={response} question={question} />;
  }

  return <AnswerContent answer={response.data} question={question} />;
}
