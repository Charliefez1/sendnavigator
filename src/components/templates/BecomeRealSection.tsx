import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface BecomeRealSectionProps {
  consultation?: ReactNode;
  legislation?: ReactNode;
  parliamentaryApproval?: ReactNode;
  commencement?: ReactNode;
}

export function BecomeRealSection({
  consultation,
  legislation,
  parliamentaryApproval,
  commencement,
}: BecomeRealSectionProps) {
  const steps = [
    { title: "Consultation", content: consultation },
    { title: "Legislation", content: legislation },
    { title: "Parliamentary approval", content: parliamentaryApproval },
    { title: "Commencement", content: commencement },
  ].filter(step => step.content);

  return (
    <section className="content-section py-8 border-t border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        What would need to happen for this to become real
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        For any proposal to become policy, it would typically need to pass through these stages:
      </p>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <h3 className="font-medium text-foreground mb-2">{step.title}</h3>
              <div className="prose-calm text-sm">{step.content}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
