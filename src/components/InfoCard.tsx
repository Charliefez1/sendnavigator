import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function InfoCard({ title, children, icon }: InfoCardProps) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-foreground">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground leading-relaxed">
        {children}
      </CardContent>
    </Card>
  );
}
