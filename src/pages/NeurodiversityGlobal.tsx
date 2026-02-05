import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { ExternalLink } from "lucide-react";

export default function NeurodiversityGlobal() {
  return (
    <Layout>
      <PageOrientation
        title="About Neurodiversity Global"
        description="The organisation behind SEND Reform Navigator."
        lastUpdated="5th February 2026"
      />

      <section className="content-section py-8 border-t border-border">
        <div className="prose-calm space-y-6">
          <p className="text-lg leading-relaxed">
            Neurodiversity Global is a UK based, neurodivergent led consultancy working with 
            organisations, education providers, and public bodies to redesign systems so people can succeed.
          </p>

          <p>
            We work beyond awareness. Our focus is practical change that improves performance, 
            reduces risk, and supports real people in real environments. That means leadership 
            behaviour, communication, workload design, psychological safety, and how success is 
            defined and measured.
          </p>

          <p>
            Our work is grounded in lived experience and delivery at scale. We have led over 
            1,000 projects globally across complex and regulated environments, including large 
            corporates, public services, and education. We bring board level strategy together 
            with day to day operational reality.
          </p>

          <p>
            We do not treat neurodivergence as a problem to fix. We help organisations see where 
            outdated systems create friction, underuse talent, and increase cost. Then we help 
            redesign those systems in ways that work for everyone.
          </p>

          <p>
            Neurodiversity Global delivers live workshops, leadership programmes, strategic advisory, 
            and practical tools that embed neuroinclusion into how work actually happens.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Learn more
        </h2>
        <a 
          href="https://neurodiversityglobal.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          Visit Neurodiversity Global
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
