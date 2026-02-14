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
      {/* Two-column hero layout */}
      <section className="content-section py-10 sm:py-14 animate-fade-in">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: Welcome message */}
          <div>
            <div className="bg-card border border-border rounded-xl p-5 sm:p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-2.5 mb-3">
                <Compass className="w-6 h-6 text-primary flex-shrink-0" />
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                  Welcome to SEND Reform Navigator
                </h1>
              </div>
              <div className="space-y-2.5 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Despite what you may have heard, <strong className="text-foreground">your child's legal protections are still in place</strong>.
                </p>
                <p>
                  <strong className="text-foreground">EHCPs remain legally binding.</strong><br />
                  <strong className="text-foreground">The law has not changed.</strong>
                </p>
                <p>
                  What has changed is the <strong className="text-foreground">volume of discussion</strong> about SEND provision in 2026 and 2027. There is increasing debate across politics, education and local authorities, alongside early signals, <strong className="text-foreground">leaks and speculation</strong> about possible future reforms.
                </p>
                <p>
                  That uncertainty creates anxiety for parents.
                </p>
                <p>
                  The <strong className="text-foreground">SEND Navigator is designed to help make sense of this</strong>.
                </p>
                <p className="font-medium text-foreground">It includes:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong className="text-foreground">Confirmed information</strong> based on current law and statutory guidance</li>
                  <li><strong className="text-foreground">Clearly labelled sections</strong> on speculation and leaks, where relevant</li>
                  <li><strong className="text-foreground">Clear separation</strong> between what is confirmed, what is being discussed, and what has not changed</li>
                </ul>
                <p>
                  <strong className="text-foreground">Nothing is presented without context.</strong><br />
                  <strong className="text-foreground">Nothing speculative is presented as fact.</strong>
                </p>
                <p>
                  The information currently available as of February 2026 is contained within this navigator. As further details are formally released, the navigator will be <strong className="text-foreground">updated so parents can see what has changed, and what has not</strong>.
                </p>
                <p>
                  The aim is not to remove uncertainty where it genuinely exists, but to make it <strong className="text-foreground">visible, understandable and manageable</strong>.
                </p>
                <p>
                  For more context, please see the{" "}
                  <Link to="/about" className="text-primary hover:underline">About</Link> section and{" "}
                  <Link to="/why-i-built-this" className="text-primary hover:underline">Why I Built This</Link>.
                </p>
                <p className="font-medium text-foreground">Rich Ferriman</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Journey links */}
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-5">
              Where would you like to start?
            </h2>
            <div className="space-y-2.5">
              <Link to="/where-we-are-now" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-status-confirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-confirmed/30">
                  <span className="text-xs font-semibold text-status-confirmed">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">What we know so far</h3>
                  <p className="text-xs text-muted-foreground">The current state of the SEND system</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link to="/what-is-changing" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-status-confirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-confirmed/30">
                  <span className="text-xs font-semibold text-status-confirmed">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">What is changing</h3>
                  <p className="text-xs text-muted-foreground">Confirmed reforms and official plans</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link to="/what-has-not-changed" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-status-confirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-confirmed/30">
                  <span className="text-xs font-semibold text-status-confirmed">3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">What has not changed</h3>
                  <p className="text-xs text-muted-foreground">Legal protections still in place today</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link to="/what-is-being-discussed" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-status-discussed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-discussed/30">
                  <span className="text-xs font-semibold text-status-discussed">4</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">What is being discussed</h3>
                  <p className="text-xs text-muted-foreground">Proposals under consideration</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link to="/what-we-do-not-know" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-status-discussed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-discussed/30">
                  <span className="text-xs font-semibold text-status-discussed">5</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">What we do not know yet</h3>
                  <p className="text-xs text-muted-foreground">Gaps in current information</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link to="/what-the-leaks-are-saying" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-status-unconfirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-unconfirmed/30">
                  <span className="text-xs font-semibold text-status-unconfirmed">6</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">What the leaks are saying</h3>
                  <p className="text-xs text-muted-foreground">Unconfirmed reports and what they mean</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link to="/what-the-leaks-do-not-mean" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-status-unconfirmed/15 flex items-center justify-center flex-shrink-0 border-2 border-status-unconfirmed/30">
                  <span className="text-xs font-semibold text-status-unconfirmed">7</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">What the leaks do not mean</h3>
                  <p className="text-xs text-muted-foreground">Common misinterpretations addressed</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link to="/timeline" className="journey-card flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[hsl(var(--timeline-upcoming)/0.15)] flex items-center justify-center flex-shrink-0 border-2 border-[hsl(var(--timeline-upcoming)/0.3)]">
                  <span className="text-xs font-semibold text-[hsl(var(--timeline-upcoming))]">8</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">Timeline and next steps</h3>
                  <p className="text-xs text-muted-foreground">Key dates, decisions and milestones</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>
            </div>

            {/* What we help with */}
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mt-6">
              <div className="bg-card border border-border rounded-xl p-4">
                <CheckCircle2 className="w-6 h-6 text-status-confirmed mb-2" />
                <h3 className="font-medium text-foreground text-sm mb-1">What's confirmed</h3>
                <p className="text-xs text-muted-foreground">
                  Official announcements and decisions that have actually been made
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <HelpCircle className="w-6 h-6 text-status-discussed mb-2" />
                <h3 className="font-medium text-foreground text-sm mb-1">What's being discussed</h3>
                <p className="text-xs text-muted-foreground">
                  Proposals and ideas being debated by government and others
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <BookOpen className="w-6 h-6 text-status-unconfirmed mb-2" />
                <h3 className="font-medium text-foreground text-sm mb-1">What's unknown</h3>
                <p className="text-xs text-muted-foreground">
                  Questions that haven't been answered and decisions not yet made
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section className="content-section py-8 border-t border-border">
        <QandAComponent />
      </section>

      {/* About this resource */}
      <section className="content-section py-8 border-t border-border">
        <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 shadow-lg">
          <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-3">
              Made for families like yours
            </h2>
            <div className="space-y-2 text-muted-foreground text-sm leading-relaxed">
              <p>
                This is an independent resource, not government, not a campaign. We don't give advice
                or tell you what to do. We just help you understand what's happening.
              </p>
              <p>
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
            <strong className="text-foreground">Last updated:</strong> 14th February 2026
          </span>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
