import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { QandAComponent } from "@/components/qanda";
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Heart,
  BookOpen,
  HelpCircle
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero - Reassurance first */}
      <section className="content-section py-10 sm:py-14 animate-fade-in">
        {/* Primary reassurance message */}
        <div className="reassurance-banner mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                Your rights haven't changed
              </h2>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Despite what you may have heard, your child's legal protections are still in place. 
                EHCPs are still legally binding. The law hasn't changed yet.
              </p>
            </div>
          </div>
        </div>

        {/* Welcome message */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Welcome to SEND Reform Navigator
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            We know SEND reform can feel overwhelming. There's a lot of noise, and it's hard to know 
            what's actually happening. This site is here to help you understand, calmly and clearly.
          </p>
        </div>

        {/* What we help with */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="bg-card border border-border rounded-xl p-5">
            <CheckCircle2 className="w-8 h-8 text-status-confirmed mb-3" />
            <h3 className="font-medium text-foreground mb-1">What's confirmed</h3>
            <p className="text-sm text-muted-foreground">
              Official announcements and decisions that have actually been made
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <HelpCircle className="w-8 h-8 text-status-discussed mb-3" />
            <h3 className="font-medium text-foreground mb-1">What's being discussed</h3>
            <p className="text-sm text-muted-foreground">
              Proposals and ideas being debated by government and others
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <BookOpen className="w-8 h-8 text-status-unconfirmed mb-3" />
            <h3 className="font-medium text-foreground mb-1">What's unknown</h3>
            <p className="text-sm text-muted-foreground">
              Questions that haven't been answered and decisions not yet made
            </p>
          </div>
        </div>
      </section>

      {/* Start your journey */}
      <section className="content-section pb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          Where would you like to start?
        </h2>
        
        <div className="space-y-3">
          <Link 
            to="/where-we-are-now" 
            className="journey-card flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-primary">1</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Understand the current situation</h3>
              <p className="text-sm text-muted-foreground">What we know about the SEND system today</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link 
            to="/what-is-changing" 
            className="journey-card flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-primary">2</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">See what's actually changing</h3>
              <p className="text-sm text-muted-foreground">Confirmed reforms and official plans</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link 
            to="/what-is-being-discussed" 
            className="journey-card flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-primary">3</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Learn what's being discussed</h3>
              <p className="text-sm text-muted-foreground">Proposals under consideration</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link 
            to="/what-the-leaks-are-saying" 
            className="journey-card flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-muted-foreground">4</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Understand the rumours</h3>
              <p className="text-sm text-muted-foreground">Leaked reports and what they mean (and don't mean)</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link 
            to="/timeline" 
            className="journey-card flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-muted-foreground">5</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">See what's next</h3>
              <p className="text-sm text-muted-foreground">Timeline of decisions and milestones</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* Q&A */}
      <section className="content-section pb-12 border-t border-border pt-10">
        <QandAComponent />
      </section>

      {/* About this resource */}
      <section className="content-section pb-12 border-t border-border pt-10">
        <div className="flex items-start gap-4">
          <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Made for families like yours
            </h2>
            <div className="prose-calm space-y-3 text-muted-foreground">
              <p className="text-base leading-relaxed !mb-3">
                This is an independent resource, not government, not a campaign. We don't give advice
                or tell you what to do. We just help you understand what's happening.
              </p>
              <p className="text-base leading-relaxed !mb-0">
                We know you're busy and may be feeling anxious. That's why we've made everything 
                as clear and straightforward as possible.
              </p>
            </div>
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:underline"
            >
              Learn more about this resource
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Last updated */}
      <section className="content-section pb-16">
        <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground flex items-center gap-3">
          <Clock className="w-5 h-5 flex-shrink-0" />
          <span>
            <strong className="text-foreground">Last updated:</strong> 4th February 2026
          </span>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
