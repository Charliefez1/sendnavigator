import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, School, Building2 } from "lucide-react";

export default function WhatThisCouldMean() {
  return (
    <Layout>
      <PageHeader
        title="What this could mean"
        description="Practical implications of confirmed and proposed changes. We focus on possibilities and uncertainty, not predictions."
      />
      
      <section className="content-section pb-16">
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <Users className="w-5 h-5 text-primary" />
                For parents and carers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>What changes might mean for families navigating SEND support.</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <GraduationCap className="w-5 h-5 text-primary" />
                For children and young people
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>How reforms could affect education and support experiences.</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <School className="w-5 h-5 text-primary" />
                For schools and teachers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>Implications for SENCOs, teachers, and school practice.</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <Building2 className="w-5 h-5 text-primary" />
                For local authorities and services
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>What changes could mean for service delivery and commissioning.</p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-calm">
          <p>
            This section will be structured by audience, translating policy information into 
            practical considerations. We avoid predictions and focus on explaining uncertainty clearly.
          </p>
        </div>
      </section>
    </Layout>
  );
}
