import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { ExternalLink } from "lucide-react";

export default function NeurodiversityGlobal() {
  return (
    <Layout>
      <PageOrientation
        title="About Neurodiversity Global"
        description="The organisation behind SEND Reform Navigator."
        lastUpdated="7th February 2026"
      />

      <section className="content-section py-8 border-t border-border">
        <div className="prose-calm space-y-6">
          <p className="text-lg leading-relaxed">
            Neurodiversity Global is a UK based, neurodivergent led consultancy that helps organisations redesign how work, leadership, and systems operate so neurodivergent people can succeed.
          </p>

          <p>
            We work with employers, education providers, and public bodies to move beyond awareness and into practical change. Our focus is performance, retention, psychological safety, and reducing risk through better system design.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What we deliver
        </h2>
        <ul className="space-y-3 text-foreground/90">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Neurodiversity and neuroinclusion workshops for awareness, champions, managers, and leaders</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Leadership and management development focused on real workplace behaviour</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Strategic advisory support for embedding neuroinclusion into culture, policy, and practice</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Coaching and support for neurodivergent employees and leaders</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Reviews of systems, processes, and environments that affect performance and wellbeing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Evidence informed resources grounded in lived experience and operational delivery</span>
          </li>
        </ul>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          How we work
        </h2>
        <ul className="space-y-3 text-foreground/90">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Practical and evidence informed, not theoretical</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Designed for complex, regulated, and high pressure environments</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Focused on changing daily decisions, not just intent or policy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Led by people with lived experience and senior leadership backgrounds</span>
          </li>
        </ul>
      </section>

      <ContactDetails />

      <section className="content-section py-8 border-t border-border">
        <ContactForm />
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Learn more
        </h2>
        <div className="space-y-3">
          <a 
            href="https://www.neurodiversityglobal.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Main website
            <ExternalLink className="w-4 h-4" />
          </a>
          <a 
            href="https://www.neurodiversityglobal.com/all-services" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Workshops and services
            <ExternalLink className="w-4 h-4" />
          </a>
          <a 
            href="https://www.neurodiversityglobal.com/resources" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Resource hub
            <ExternalLink className="w-4 h-4" />
          </a>
          <a 
            href="https://www.neurodiversityglobal.com/contact" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Contact and enquiries
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
