import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StatusExplainer } from "@/components/StatusExplainer";
import { QandAComponent } from "@/components/qanda";
import { TrustSignals } from "@/components/feedback";
import { Clock, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="content-section py-12 sm:py-16 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-6">
          Guide to SEND reform in England
        </h2>
        
        {/* 60 second overview */}
        <div className="bg-card border border-border rounded-lg p-5 mb-8">
          <h3 className="text-lg font-medium text-foreground mb-4">60 second overview</h3>
          <div className="prose-calm space-y-4">
            <p>
              SEND reform can feel confusing and overwhelming. There are many reports, headlines, and opinions, often saying different things at the same time. Families, teachers, and professionals may be hearing about change without being clear on what is actually happening now, what has been formally agreed, and what is still uncertain.
            </p>
            <p>
              SEND Reform Navigator exists to provide calm, clear information about SEND reform in England. It focuses on what is known, what is being talked about, and what has not yet been decided, without adding noise or interpretation.
            </p>
          </div>
        </div>
      </section>

      {/* What this site is for */}
      <section className="content-section pb-12 border-t border-border pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          What this site is for
        </h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            This site is a public information resource. Its purpose is to explain the current position on SEND reform in England in plain English. It brings together confirmed information and clearly separates it from discussion or uncertainty, so readers can understand where things stand today.
          </p>
          <p>
            The site is designed to support orientation. It helps readers make sense of the landscape without needing to follow every update or policy announcement themselves. It is written for parents, carers, teachers, and professionals who want clarity rather than commentary.
          </p>
        </div>
      </section>

      {/* What this site is not */}
      <section className="content-section pb-12 border-t border-border pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          What this site is not
        </h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            This site is not a campaigning platform. It does not argue for or against reform, and it does not promote particular views or outcomes.
          </p>
          <p>
            It does not provide legal, medical, or professional advice. It cannot tell you what should happen in an individual case, or how the system should work for a specific child or family.
          </p>
          <p>
            It also does not report rumours, anonymous briefings, or unconfirmed claims. Where uncertainty exists, that uncertainty is stated plainly.
          </p>
        </div>
      </section>

      {/* How to use this site */}
      <section className="content-section pb-12 border-t border-border pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          How to use this site
        </h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            Each page is structured to help you quickly understand what matters most. You can start with the summaries to get an overview, then read further if you want more detail.
          </p>
          <p>
            The pages explain what is true now before discussing what may change. They are designed to be read in any order, depending on what you need to understand.
          </p>
          <p>
            All content focuses on SEND provision in England only.
          </p>
        </div>
      </section>

      {/* How information is categorised */}
      <section className="content-section pb-12 border-t border-border pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          How information is categorised
        </h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            Information on this site is grouped into clear categories. Confirmed information reflects what has been formally published or announced. Reported information reflects what is being publicly discussed by recognised bodies or in mainstream reporting. Unknowns are included where decisions have not yet been made.
          </p>
          <p>
            This separation is deliberate. It helps readers see the difference between fact, discussion, and uncertainty without needing to interpret it themselves.
          </p>
        </div>
      </section>

      {/* Closing statement */}
      <section className="content-section pb-12 border-t border-border pt-8">
        <p className="text-muted-foreground">
          Understanding what is happening is the first step, and reading this information does not change any SEND rights or processes.
        </p>
      </section>

      {/* Q&A Component */}
      <section className="content-section pb-12 border-t border-border pt-8">
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
