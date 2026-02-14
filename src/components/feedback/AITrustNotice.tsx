import { Bot, Database, HelpCircle, ShieldX } from "lucide-react";
import { aiTrustSignals } from "@/config/feedback";

export function AITrustNotice() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
      <div className="flex items-start gap-2 mb-3">
        <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-foreground">
          Ask SEND uses AI technology to produce the answers it gives, however all research has been fully researched by the human team behind the SEND Reform Navigator.
        </p>
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
