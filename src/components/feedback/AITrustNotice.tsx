import { Bot, Database, HelpCircle, ShieldX } from "lucide-react";
import { aiTrustSignals } from "@/config/feedback";

export function AITrustNotice() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
      <div className="flex items-start gap-2 mb-3">
        <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-foreground space-y-2">
          <p className="font-medium">Ask Rich uses AI to help us get answers to you quickly, but every piece of information it draws on has been researched and written by Charlie and I personally.</p>
          <p>Everything we tell you comes from the content we have researched and published on this site. Nothing else.</p>
          <p>If we do not know something or the picture is incomplete, we will tell you that straight.</p>
          <p>We cannot comment on individual cases, give legal advice, or predict what is going to happen. But we can help you understand what we know right now.</p>
          <p>We have used AI tools to help us build this site and conduct the research of over 1,000 separate information sources. We are trying our very best to make sure everything is up to date in a period where a lot is happening in SEND. If you feel we have something wrong, go to <a href="/feedback" className="underline text-primary hover:text-primary/80">feedback</a> and submit it there, or contact us directly on LinkedIn.</p>
        </div>
      </div>
      
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <Database className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
          <span>{aiTrustSignals.grounding}</span>
        </li>
        <li className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
          <span>{aiTrustSignals.uncertaintyHandling}</span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldX className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
          <span>{aiTrustSignals.refusalExplanation}</span>
        </li>
      </ul>
    </div>
  );
}
