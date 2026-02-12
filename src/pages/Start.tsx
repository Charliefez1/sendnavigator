import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { QandAComponent } from "@/components/qanda";
import { MoreResources } from "@/components/MoreResources";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Compass,
  Heart,
  BookOpen,
  HelpCircle
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="SEND Reform Navigator"
        description="A calm, independent guide helping parents and professionals understand SEND reform in England. Clear facts, no spin."
        path="/"
      />
      {/* Hero - Reassurance first */}
      <section className="content-section py-10 sm:py-14 animate-fade-in">
        {/* Welcome message */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="w-8 h-8 text-primary flex-shrink-0" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Welcome to SEND Reform Navigator
            </h1>
          </div>
          <div className="prose-calm space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Despite what you may have heard, <strong className="text-foreground">your child's legal protections are still in place</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              <strong className="text-foreground">EHCPs remain legally binding.</strong><br />
              <strong className="text-foreground">The law has not changed.</strong>
            </p>
            <p className="text-base leading-relaxed">
              What has changed is the <strong className="text-foreground">volume of discussion</strong> about SEND provision in 2026 and 2027. There is increasing debate across politics, education and local authorities, alongside early signals, <strong className="text-foreground">leaks and speculation</strong> about possible future reforms.
            </p>
            <p className="text-base leading-relaxed">
              That uncertainty creates anxiety for parents.
            </p>
            <p className="text-base leading-relaxed">
              The <strong className="text-foreground">SEND Navigator is designed to help make sense of this</strong>.
            </p>
            <p className="text-base leading-relaxed font-medium text-foreground">It includes:</p>
            <ul className="space-y-2 text-base list-disc list-inside">
              <li><strong className="text-foreground">Confirmed information</strong> based on current law and statutory guidance</li>
              <li><strong className="text-foreground">Clearly labelled sections</strong> on speculation and leaks, where relevant</li>
              <li><strong className="text-foreground">Clear separation</strong> between what is confirmed, what is being discussed, and what has not changed</li>
            </ul>
            <p className="text-base leading-relaxed">
              <strong className="text-foreground">Nothing is presented without context.</strong><br />
              <strong className="text-foreground">Nothing speculative is presented as fact.</strong>
            </p>
            <p className="text-base leading-relaxed">
              The information currently available as of February 2026 is contained within this navigator. As further details are formally released, the navigator will be <strong className="text-foreground">updated so parents can see what has changed, and what has not</strong>.
            </p>
            <p className="text-base leading-relaxed">
              The aim is not to remove uncertainty where it genuinely exists, but to make it <strong className="text-foreground">visible, understandable and manageable</strong>.
            </p>
            <p className="text-base leading-relaxed">
              For more context, please see the{" "}
              <Link to="/about" className="text-primary hover:underline">About</Link> section and{" "}
              <Link to="/why-i-built-this" className="text-primary hover:underline">Why I Built This</Link>.
            </p>
            <p className="text-base font-medium text-foreground">Rich Ferriman</p>
          </div>
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

      {/* More resources */}
      <MoreResources />

      {/* Start your journey */}
      <section className="content-section pb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
          Where would you like to start?
        </h2>
        
        <div className="space-y-3">
          <Link to="/where-we-are-now" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-status-confirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-confirmed/30">
              <span className="text-sm font-semibold text-status-confirmed">1</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Understand the current situation</h3>
              <p className="text-sm text-muted-foreground">What we know about the SEND system today</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link to="/what-is-changing" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-status-confirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-confirmed/30">
              <span className="text-sm font-semibold text-status-confirmed">2</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">See what's actually changing</h3>
              <p className="text-sm text-muted-foreground">Confirmed reforms and official plans</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link to="/what-has-not-changed" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-status-confirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-confirmed/30">
              <span className="text-sm font-semibold text-status-confirmed">3</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Know what has not changed</h3>
              <p className="text-sm text-muted-foreground">Legal protections still in place today</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link to="/what-is-being-discussed" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-status-discussed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-discussed/30">
              <span className="text-sm font-semibold text-status-discussed">4</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Learn what's being discussed</h3>
              <p className="text-sm text-muted-foreground">Proposals under consideration</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link to="/what-we-do-not-know" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-status-discussed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-discussed/30">
              <span className="text-sm font-semibold text-status-discussed">5</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Explore what we don't know</h3>
              <p className="text-sm text-muted-foreground">Gaps in current information</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link to="/what-the-leaks-are-saying" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-status-unconfirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-unconfirmed/30">
              <span className="text-sm font-semibold text-status-unconfirmed">6</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">Understand the rumours</h3>
              <p className="text-sm text-muted-foreground">Leaked reports and what they mean</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link to="/what-the-leaks-do-not-mean" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-status-unconfirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-unconfirmed/30">
              <span className="text-sm font-semibold text-status-unconfirmed">7</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">What the leaks do not mean</h3>
              <p className="text-sm text-muted-foreground">Common misinterpretations addressed</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>

          <Link to="/timeline" className="journey-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--timeline-upcoming)/0.15)] flex items-center justify-center flex-shrink-0 border-2 border-[hsl(var(--timeline-upcoming)/0.3)]">
              <span className="text-sm font-semibold text-[hsl(var(--timeline-upcoming))]">8</span>
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
            <strong className="text-foreground">Last updated:</strong> 7th February 2026
          </span>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
