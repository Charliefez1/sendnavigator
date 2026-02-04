import { ReactNode } from "react";
import { Users, GraduationCap, School, Building2, LucideIcon } from "lucide-react";

type AudienceType = "parents" | "children" | "schools" | "authorities";

interface AudienceSubsectionProps {
  audience: AudienceType;
  children: ReactNode;
}

const audienceConfig: Record<AudienceType, { icon: LucideIcon; title: string }> = {
  parents: { icon: Users, title: "For parents and carers" },
  children: { icon: GraduationCap, title: "For children and young people" },
  schools: { icon: School, title: "For schools and teachers" },
  authorities: { icon: Building2, title: "For local authorities and services" },
};

export function AudienceSubsection({ audience, children }: AudienceSubsectionProps) {
  const config = audienceConfig[audience];
  const Icon = config.icon;

  return (
    <div className="border border-border rounded-lg p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-medium text-foreground">{config.title}</h3>
      </div>
      <div className="prose-calm text-sm">{children}</div>
    </div>
  );
}

interface AudienceSectionsProps {
  parents?: ReactNode;
  children?: ReactNode;
  schools?: ReactNode;
  authorities?: ReactNode;
}

export function AudienceSections({ parents, children, schools, authorities }: AudienceSectionsProps) {
  return (
    <section className="content-section py-8 border-t border-border">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        What this could mean for different groups
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        These are possible implications, not predictions. Individual circumstances vary significantly.
      </p>
      
      {parents && <AudienceSubsection audience="parents">{parents}</AudienceSubsection>}
      {children && <AudienceSubsection audience="children">{children}</AudienceSubsection>}
      {schools && <AudienceSubsection audience="schools">{schools}</AudienceSubsection>}
      {authorities && <AudienceSubsection audience="authorities">{authorities}</AudienceSubsection>}
    </section>
  );
}
