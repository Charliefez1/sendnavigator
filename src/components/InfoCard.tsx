import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageAccent } from "@/contexts/PageAccentContext";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

function hslWithAlpha(hsl: string, alpha: number): string {
  const match = hsl.match(/hsl\(([^)]+)\)/);
  if (!match) return hsl;
  const parts = match[1].trim().split(/[\s,/]+/);
  return `hsla(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
}

export function InfoCard({ title, children, icon }: InfoCardProps) {
  const accent = usePageAccent();

  return (
    <Card className="bg-card border-border/50 shadow-card hover:shadow-card-hover transition-all duration-200 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base font-display font-semibold text-foreground">
          {icon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={accent
                ? { backgroundColor: hslWithAlpha(accent, 0.12) }
                : { backgroundColor: 'hsl(var(--primary) / 0.1)' }
              }
            >
              {icon}
            </div>
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground leading-relaxed text-sm">
        {children}
      </CardContent>
    </Card>
  );
}
