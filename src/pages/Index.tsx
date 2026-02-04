import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StatusExplainer } from "@/components/StatusExplainer";
import { InfoCard } from "@/components/InfoCard";
import { QandAComponent } from "@/components/qanda";
import { TrustSignals } from "@/components/feedback";
import { Users, BookOpen, ShieldAlert, Clock, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="content-section py-12 sm:py-16 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-6">
          Guide to SEND reform in England
        </h2>
        <div className="prose-calm max-w-2xl">
          <p>
            SEND Reform Navigator helps you understand what is happening with Special Educational 
            Needs and Disabilities policy. We explain what is confirmed, what is being discussed, 
            and what remains unknown.
          </p>
          <p>
            This is a neutral resource designed to reduce confusion and anxiety. We do not campaign, 
            persuade, or provide legal advice.
          </p>
        </div>
      </section>

      {/* Q&A Component */}
      <section className="content-section pb-12">
        <QandAComponent />
      </section>

      {/* Status explainer */}
      <section className="content-section pb-12">
        <StatusExplainer />
      </section>

      {/* Quick navigation */}
      <section className="content-section pb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          Explore the guide
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link 
            to="/where-we-are-now" 
            className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <span className="font-medium text-foreground">Where we are now</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link 
            to="/what-is-changing" 
            className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <span className="font-medium text-foreground">What is changing</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link 
            to="/what-the-leaks-are-saying" 
            className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <span className="font-medium text-foreground">What the leaks are saying</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link 
            to="/what-this-could-mean" 
            className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <span className="font-medium text-foreground">What this could mean</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link 
            to="/timeline" 
            className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <span className="font-medium text-foreground">Timeline and next steps</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link 
            to="/questions-and-answers" 
            className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <span className="font-medium text-foreground">Questions and answers</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </section>

      {/* Who this is for */}
      <section className="content-section pb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          Who this resource is for
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard title="Parents and carers" icon={<Users className="w-5 h-5 text-primary" />}>
            <p>
              If your child has SEND, you may be trying to understand how reforms could affect 
              their education and support. We present the facts clearly.
            </p>
          </InfoCard>
          
          <InfoCard title="Education professionals" icon={<BookOpen className="w-5 h-5 text-primary" />}>
            <p>
              Teachers, SENCOs, school leaders, and support staff can use this resource to 
              understand policy changes and what they mean in practice.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* What this is not */}
      <section className="content-section pb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          What this resource is not
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard title="Not legal advice" icon={<ShieldAlert className="w-5 h-5 text-muted-foreground" />}>
            <p>
              This resource explains policy, not law. For legal advice about your specific 
              situation, please consult a qualified professional.
            </p>
          </InfoCard>
          
          <InfoCard title="Not a campaign" icon={<Clock className="w-5 h-5 text-muted-foreground" />}>
            <p>
              We do not advocate for particular positions. We present information as clearly 
              as possible and respect that people may disagree on solutions.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* Trust signals */}
      <section className="content-section pb-12">
        <TrustSignals />
      </section>

      {/* Update notice */}
      <section className="content-section pb-16">
        <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>
              <strong className="text-foreground">Last updated:</strong> 4th February 2026 · 
              This page will be updated as new information becomes available.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
