import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function InfoCard({ title, children, icon }: InfoCardProps) {
  return (
    <Card className="bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-200 rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base font-display font-semibold text-foreground">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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
