import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import {
  EditorialOwnershipSection,
  IndependenceDisclosureSection,
  PerspectivesSection,
  FeedbackSection,
  ReviewScheduleSection,
} from "@/components/governance";
import { BookOpen, Users, Shield, RefreshCw, AlertTriangle, Scale, Eye, MessageSquare, Calendar, User } from "lucide-react";
import richBio from "@/assets/rich-ferriman-bio.png";

const sections = [
  { id: "why", icon: BookOpen, title: "Why this resource exists" },
  { id: "who", icon: Users, title: "Who this resource is for" },
  { id: "independence", icon: Shield, title: "Independence and neutrality" },
  { id: "updates", icon: RefreshCw, title: "How information is updated and corrected" },
  { id: "limits", icon: AlertTriangle, title: "Limits of this resource" },
  { id: "author", icon: User, title: "About the author" },
  { id: "governance", icon: Scale, title: "Governance and accountability" },
];

function SectionBox({ id, icon: Icon, title, children }: {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="content-section py-4 scroll-mt-24">
      <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-display font-semibold text-foreground">{title}</h2>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <Layout>
      <SEOHead title="About" description="Independence, governance, scope, and accountability of SEND Reform Navigator." path="/about" />
      <PageOrientation
        title="About this resource"
        description="Independence, governance, scope, and accountability of SEND Reform Navigator."
      />

      {/* On this page */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-lg">
          <h2 className="text-base font-semibold text-foreground mb-4">On this page</h2>
          <nav aria-label="Page sections">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <s.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <SectionBox id="why" icon={BookOpen} title="Why this resource exists">
        <p>
          SEND Reform Navigator exists to help people <strong>make sense of SEND reform in England</strong> at a time when information can feel fragmented and hard to follow. Changes are being discussed across government, education, health, and local services, often using complex language and published in stages. This resource was created to <strong>bring that information together in a clear, calm way</strong>, without adding interpretation or pressure.
        </p>
        <p>
          Its aim is to support understanding. It explains <strong>what is known, what is being discussed, and what is not yet decided</strong>, so readers can orient themselves without needing to track multiple sources or interpret technical documents.
        </p>
      </SectionBox>

      <SectionBox id="who" icon={Users} title="Who this resource is for">
        <p>
          This resource is for <strong>parents and carers</strong> of children and young people with SEND, for <strong>teachers and school leaders</strong>, and for professionals working across education, health, and care. It is also relevant to anyone seeking a grounded overview of SEND reform in England.
        </p>
        <p>
          It is written for people who may be feeling overloaded by information and want <strong>clarity rather than commentary</strong>.
        </p>
      </SectionBox>

      <SectionBox id="independence" icon={Shield} title="Independence and neutrality">
        <p>
          SEND Reform Navigator is <strong>independent</strong>. It does not represent government, local authorities, schools, or advocacy groups. It does not promote particular outcomes or positions on SEND reform.
        </p>
        <p>
          The content is written to be <strong>neutral and factual</strong>. Where there are different views or areas of uncertainty, these are stated openly rather than resolved or argued. The resource is designed to <strong>inform, not to persuade</strong>.
        </p>
      </SectionBox>

      <SectionBox id="updates" icon={RefreshCw} title="How information is updated and corrected">
        <p>
          Information on this site is <strong>reviewed and updated as new, confirmed details are published</strong>. When official plans change or new decisions are formally announced, the content is revised to reflect that.
        </p>
        <p>
          If errors or inaccuracies are identified, <strong>they are corrected</strong>. Where information is incomplete or uncertain, this is made clear rather than filled in with assumptions.
        </p>
      </SectionBox>

      <SectionBox id="limits" icon={AlertTriangle} title="Limits of this resource">
        <p>
          This resource <strong>does not provide legal advice, medical guidance, or professional recommendations</strong>. It cannot advise on individual circumstances or decisions.
        </p>
        <p>
          It focuses only on <strong>SEND provision and reform in England</strong>. It does not cover arrangements in Scotland, Wales, or Northern Ireland.
        </p>
        <p>
          It explains the system at a high level and <strong>does not replace support from professionals or statutory services</strong>.
        </p>
      </SectionBox>

      {/* Author section */}
      <section id="author" className="content-section py-4 scroll-mt-24">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold text-foreground">About the author</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src={richBio}
              alt="Rich Ferriman"
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                <strong>Rich Ferriman</strong> is the creator and editorial lead of SEND Reform Navigator. He is an award-winning neuroinclusion consultant, co-founder of Neurodiversity Global, and a father of four neurodivergent children.
              </p>
              <p>
                With over 30 years in senior executive roles and lived experience of late diagnosis, Rich brings both strategic insight and personal understanding to this resource. His work sits at the intersection of inclusion and business strategy.
              </p>
              <p>
                He has advised organisations including the NHS, NASA, University of Oxford, the London School of Economics, and the Foreign Commonwealth and Development Office.
              </p>
              <Link to="/rich-ferriman" className="inline-block text-primary hover:underline font-medium">
                Read more about Rich →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Governance section */}
      <section id="governance" className="content-section py-4 scroll-mt-24">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold text-foreground">Governance and accountability</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
            <p>
              SEND Reform Navigator is committed to transparency, independence, and clarity, offering information without noise so readers can understand what is happening and where uncertainty remains.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
            <Link to="/neurodiversity-global" className="text-primary hover:underline font-medium">
              About Neurodiversity Global
            </Link>
          </div>
          <div className="space-y-6 border-t border-border pt-6 text-sm">
            <EditorialOwnershipSection />
            <PerspectivesSection />
            <IndependenceDisclosureSection />
            <FeedbackSection />
            <ReviewScheduleSection />
          </div>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
