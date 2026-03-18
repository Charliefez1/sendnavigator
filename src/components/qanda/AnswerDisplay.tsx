import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";
import {
  QandAAnswer,
  QandARefusal,
  QandAResponse,
  confidenceLabels
} from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Shield,
  Heart,
  Lightbulb,
  XCircle
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
    <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-lg">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(262 50% 50% / 0.1)" }}>
          <ShieldAlert className="w-4 h-4" style={{ color: "hsl(262 60% 55%)" }} />
        </div>
        <div className="space-y-3">
          <p className="font-medium text-foreground">
            We cannot answer this question directly
          </p>
          <p className="text-muted-foreground text-sm">{refusal.reason}</p>
          <p className="text-muted-foreground text-sm">{refusal.suggestion}</p>
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

function ParentGuideContent({ guide }: { guide: NonNullable<QandAAnswer["parentGuide"]> }) {
  return (
    <div className="bg-card border border-border rounded-xl divide-y divide-border shadow-lg overflow-hidden">
      {/* Title */}
      <div className="p-4 sm:p-5" style={{ backgroundColor: "hsl(175 30% 96%)" }}>
        <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(175 65% 41%)" }} />
          {guide.title}
        </h3>
      </div>

      {/* Overview */}
      <div className="p-4 sm:p-5 space-y-3">
        {guide.overview.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-foreground">{para}</p>
        ))}
      </div>

      {/* What helps */}
      {guide.whatHelps.length > 0 && (
        <div className="p-4 sm:p-5 space-y-3">
          <h4 className="font-medium text-sm sm:text-base text-foreground flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(175 65% 41% / 0.1)" }}>
              <Lightbulb className="w-3.5 h-3.5" style={{ color: "hsl(175 65% 41%)" }} />
            </div>
            What helps
          </h4>
          <ul className="space-y-2">
            {guide.whatHelps.map((point, i) => (
              <li key={i} className="flex gap-3 text-foreground text-sm leading-relaxed">
                <span className="flex-shrink-0 mt-1" style={{ color: "hsl(175 65% 41%)" }}>&#x2022;</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What to avoid */}
      {guide.whatToAvoid.length > 0 && (
        <div className="p-4 sm:p-5 space-y-3">
          <h4 className="font-medium text-sm sm:text-base text-foreground flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-muted">
              <XCircle className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            What to avoid
          </h4>
          <ul className="space-y-2">
            {guide.whatToAvoid.map((point, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                <span className="flex-shrink-0 mt-1">✕</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Encouragement */}
      {guide.encouragement && (
        <div className="p-4 sm:p-5" style={{ backgroundColor: "hsl(175 30% 96%)" }}>
          <p className="text-sm leading-relaxed text-foreground italic">
            {guide.encouragement}
          </p>
        </div>
      )}
    </div>
  );
}

function PolicyContent({ answer, question }: { answer: QandAAnswer; question: string }) {
  const isLeaksRelated = answer.confidence === "unconfirmed";

  return (
    <div className="bg-card border border-border rounded-xl divide-y divide-border shadow-lg overflow-hidden">
      {/* Question echo */}
      <div className="p-4 sm:p-5" style={{ backgroundColor: "hsl(262 30% 97% / 0.5)" }}>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Your question</p>
        <p className="font-medium text-foreground text-sm">{question}</p>
      </div>

      {/* 1. Plain English answer */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-medium text-sm sm:text-base text-foreground flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(175 65% 41% / 0.1)" }}>
            <CheckCircle className="w-3.5 h-3.5" style={{ color: "hsl(175 65% 41%)" }} />
          </div>
          Answer
        </h3>
        <div className="prose-calm space-y-3">
          {answer.plainAnswer.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed">{para}</p>
          ))}
        </div>
      </div>

      {/* Leaks warning if applicable */}
      {isLeaksRelated && (
        <div className="p-4 sm:p-5" style={{ backgroundColor: "hsl(25 55% 92%)" }}>
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(25 85% 52%)" }} />
            <div>
              <p className="font-medium text-sm text-foreground">This relates to unconfirmed information</p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
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
        <h3 className="font-medium text-sm sm:text-base text-foreground flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(175 65% 41% / 0.1)" }}>
            <CheckCircle className="w-3.5 h-3.5" style={{ color: "hsl(175 65% 41%)" }} />
          </div>
          What we know
        </h3>
        <ul className="space-y-3">
          {answer.whatWeKnow.map((point, i) => (
            <li key={i} className="flex gap-3 text-foreground text-sm leading-relaxed">
              <span className="flex-shrink-0 mt-1" style={{ color: "hsl(175 65% 41%)" }}>&#x2022;</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 4. What we do not know yet */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-medium text-sm sm:text-base text-foreground flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-muted">
            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          What is genuinely unknown
        </h3>
        <ul className="space-y-3">
          {answer.whatWeDoNotKnow.map((point, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
              <span className="flex-shrink-0 mt-1">?</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. What this does and does not mean */}
      <div className="p-4 sm:p-5 space-y-4">
        <h3 className="font-medium text-sm sm:text-base text-foreground">What this does and does not mean</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 p-4 rounded-lg border shadow-sm" style={{ backgroundColor: "hsl(175 35% 96%)", borderColor: "hsl(175 30% 88%)" }}>
            <p className="text-sm font-medium flex items-center gap-2" style={{ color: "hsl(175 65% 35%)" }}>
              <Shield className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              This means:
            </p>
            <ul className="space-y-2">
              {answer.clarifications.doesMean.map((point, i) => (
                <li key={i} className="text-foreground text-sm leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/30 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              This does not mean:
            </p>
            <ul className="space-y-2">
              {answer.clarifications.doesNotMean.map((point, i) => (
                <li key={i} className="text-muted-foreground text-sm leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 6. Where to read more */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-medium text-sm sm:text-base text-foreground">Where to read more</h3>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
          {answer.readMore.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="inline-flex items-center justify-between sm:justify-start gap-2 px-4 py-3 min-h-[48px] text-sm bg-card border border-border text-foreground rounded-lg hover:bg-muted active:bg-muted/70 transition-all shadow-sm hover:shadow-md"
            >
              {link.label}
              <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Last updated */}
      <div className="p-4 sm:p-5" style={{ backgroundColor: "hsl(262 30% 97% / 0.5)" }}>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          Answer based on information last updated: {answer.lastUpdated}
        </p>
      </div>
    </div>
  );
}

function AnswerContent({ answer, question }: { answer: QandAAnswer; question: string }) {
  const hasParentGuide = answer.parentGuide && answer.parentGuide.title;

  if (!hasParentGuide) {
    return <PolicyContent answer={answer} question={question} />;
  }

  return (
    <div className="space-y-4">
      {/* Question echo above tabs */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-lg" style={{ backgroundColor: "hsl(262 30% 97% / 0.5)" }}>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Your question</p>
        <p className="font-medium text-foreground text-sm">{question}</p>
      </div>

      <Tabs defaultValue="understanding" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-auto p-1">
          <TabsTrigger value="understanding" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background">
            <Heart className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
            Understanding this
          </TabsTrigger>
          <TabsTrigger value="reforms" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background">
            <Shield className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
            What the reforms say
          </TabsTrigger>
        </TabsList>

        <TabsContent value="understanding" className="mt-3">
          <ParentGuideContent guide={answer.parentGuide!} />
        </TabsContent>

        <TabsContent value="reforms" className="mt-3">
          <PolicyContent answer={answer} question={question} />
        </TabsContent>
      </Tabs>

      {/* Last updated below tabs */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-lg" style={{ backgroundColor: "hsl(262 30% 97% / 0.5)" }}>
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
