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
      <div className="p-4 bg-muted/30">
        <p className="text-sm text-muted-foreground">Your question:</p>
        <p className="font-medium text-foreground">{question}</p>
      </div>

      {/* 1. Plain English answer */}
      <div className="p-5 space-y-3">
        <h3 className="font-medium text-foreground flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          Answer
        </h3>
        <div className="prose-calm text-sm space-y-2">
          {answer.plainAnswer.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Leaks warning if applicable */}
      {isLeaksRelated && (
        <div className="p-4 bg-status-unconfirmed-bg">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-status-unconfirmed flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">This relates to unconfirmed information</p>
              <p className="text-muted-foreground mt-1">
                Leaks are not policy. Any changes would require consultation and legislation. 
                Current legal protections remain in place.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Confidence label */}
      <div className="p-4">
        <ConfidenceBadge confidence={answer.confidence} />
      </div>

      {/* 3. What we know */}
      <div className="p-5 space-y-3">
        <h3 className="font-medium text-foreground flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-status-confirmed" />
          What we know
        </h3>
        <ul className="space-y-2 text-sm">
          {answer.whatWeKnow.map((point, i) => (
            <li key={i} className="flex gap-2 text-foreground">
              <span className="text-status-confirmed flex-shrink-0">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 4. What we do not know yet */}
      <div className="p-5 space-y-3">
        <h3 className="font-medium text-foreground flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
          What we do not know yet
        </h3>
        <ul className="space-y-2 text-sm">
          {answer.whatWeDoNotKnow.map((point, i) => (
            <li key={i} className="flex gap-2 text-muted-foreground">
              <span className="flex-shrink-0">?</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. What this does and does not mean */}
      <div className="p-5 space-y-4">
        <h3 className="font-medium text-foreground">What this does and does not mean</h3>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium text-status-confirmed flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              This means:
            </p>
            <ul className="space-y-1.5 text-sm">
              {answer.clarifications.doesMean.map((point, i) => (
                <li key={i} className="text-foreground">{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              This does not mean:
            </p>
            <ul className="space-y-1.5 text-sm">
              {answer.clarifications.doesNotMean.map((point, i) => (
                <li key={i} className="text-muted-foreground">{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 6. Where to read more */}
      <div className="p-5 space-y-3">
        <h3 className="font-medium text-foreground">Where to read more</h3>
        <div className="flex flex-wrap gap-2">
          {answer.readMore.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              {link.label}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Last updated */}
      <div className="p-4 bg-muted/30">
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
