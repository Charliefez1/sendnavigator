import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle } from "lucide-react";

export default function WhatTheLeaksAreSaying() {
  return (
    <Layout>
      <PageHeader
        title="What the leaks are saying"
        description="Unconfirmed proposals and reported briefings. This is not policy. These proposals may never happen."
      >
        <StatusBadge status="unconfirmed" />
      </PageHeader>
      
      <section className="content-section pb-8">
        <div className="bg-status-unconfirmed-bg border border-[hsl(var(--status-unconfirmed-border))] rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-status-unconfirmed flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Important context</p>
              <p className="text-muted-foreground">
                The information on this page comes from media reports, leaked documents, or unofficial 
                briefings. None of this is decided policy. For any proposal to become real, it would 
                typically need consultation, primary legislation, and parliamentary approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section pb-16 prose-calm">
        <p>
          This section will explain what has been reported or leaked, with clear context about 
          the source, reliability, and what would need to happen for any proposal to become reality.
        </p>
        <p>
          We always explain the current legal position alongside any unconfirmed proposals. 
          Content is being developed.
        </p>
      </section>
    </Layout>
  );
}
