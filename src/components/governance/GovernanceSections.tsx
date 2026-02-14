import { 
  editorialOwnership, 
  currentDisclosures, 
  representedPerspectives,
  feedbackTypes,
  reviewSchedule,
  reviewTypeLabels,
  type FeedbackType 
} from "@/config/governance";
import { Shield, Users, MessageSquare, Calendar, AlertCircle } from "lucide-react";
import { useState } from "react";

// =============================================================================
// EDITORIAL OWNERSHIP SECTION
// =============================================================================

export function EditorialOwnershipSection() {
  return (
    <section className="py-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-foreground">
          Editorial responsibility
        </h2>
      </div>
      
      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
        <h3 className="font-medium text-foreground mb-3">
          {editorialOwnership.owner.role}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          The editorial lead is responsible for:
        </p>
        <ul className="space-y-2">
          {editorialOwnership.owner.responsibilities.map((responsibility, index) => (
            <li key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/30">
              {responsibility}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-4">
          Last governance review: {editorialOwnership.lastReviewDate}
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// INDEPENDENCE DISCLOSURE SECTION
// =============================================================================

export function IndependenceDisclosureSection() {
  return (
    <section className="py-6 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-foreground">
          Independence and disclosures
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Funding</h3>
          <p className="text-sm text-muted-foreground">{currentDisclosures.funding}</p>
        </div>
        
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Affiliations</h3>
          <p className="text-sm text-muted-foreground">{currentDisclosures.affiliations}</p>
        </div>
        
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Partnerships</h3>
          <p className="text-sm text-muted-foreground">{currentDisclosures.partnerships}</p>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// PERSPECTIVES REPRESENTED SECTION
// =============================================================================

export function PerspectivesSection() {
  return (
    <section className="py-6 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-foreground">
          Perspectives represented
        </h2>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        We aim to reflect the perspectives of all groups affected by SEND policy:
      </p>
      
      <ul className="grid gap-2 sm:grid-cols-2">
        {representedPerspectives.map((perspective, index) => (
          <li 
            key={index}
            className="text-sm text-muted-foreground bg-muted/50 border border-border rounded-lg px-3 py-2"
          >
            {perspective}
          </li>
        ))}
      </ul>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        No single perspective is privileged. We distinguish lived experience from policy fact.
      </p>
    </section>
  );
}

// =============================================================================
// FEEDBACK SECTION
// =============================================================================

export function FeedbackSection() {
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);

  return (
    <section className="py-6 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-foreground">
          Feedback and corrections
        </h2>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        We welcome feedback to help improve this resource. You can:
      </p>
      
      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        {(Object.entries(feedbackTypes) as [FeedbackType, { label: string; description: string }][]).map(([type, config]) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`text-left p-4 rounded-lg border transition-colors ${
              selectedType === type 
                ? "border-primary bg-accent" 
                : "border-border bg-muted/50 hover:bg-accent/50"
            }`}
          >
            <span className="font-medium text-foreground block mb-1">
              {config.label}
            </span>
            <span className="text-sm text-muted-foreground">
              {config.description}
            </span>
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-3">
            <strong>How we handle feedback:</strong>
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="pl-4 border-l-2 border-primary/30">
              All feedback is reviewed by the editorial lead
            </li>
            <li className="pl-4 border-l-2 border-primary/30">
              Changes require verification before implementation
            </li>
            <li className="pl-4 border-l-2 border-primary/30">
              Significant corrections are noted publicly with the reason
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4 italic">
            Feedback functionality coming soon. For now, please note your feedback 
            and we will provide a submission mechanism in a future update.
          </p>
        </div>
      )}
    </section>
  );
}

// =============================================================================
// REVIEW SCHEDULE SECTION
// =============================================================================

export function ReviewScheduleSection() {
  return (
    <section className="py-6 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-foreground">
          Review schedule
        </h2>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        We conduct regular reviews to maintain accuracy and quality:
      </p>
      
      <div className="space-y-3">
        {reviewSchedule.map((review, index) => (
          <div 
            key={index}
            className="bg-muted/50 border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div>
              <span className="font-medium text-foreground block">
                {reviewTypeLabels[review.type]}
              </span>
              <span className="text-sm text-muted-foreground">
                {review.frequency}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {review.lastCompleted && (
                <span>Last: {review.lastCompleted}</span>
              )}
              {review.nextDue && (
                <span className="ml-3">Next: {review.nextDue}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
