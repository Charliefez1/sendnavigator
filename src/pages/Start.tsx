import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { QandAComponent } from "@/components/qanda";
import { NewsHeadlines } from "@/components/NewsHeadlines";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Heart,
  BookOpen,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const journeyCards = [
  {
    path: "/where-we-are-now",
    title: "What we know so far",
    summary: "The current state of the SEND system, existing legal protections, and how the system is performing right now.",
    color: "confirmed",
    number: 1,
  },
  {
    path: "/what-is-changing",
    title: "What is changing",
    summary: "Confirmed reforms, the 10 year schools plan, operational direction to councils, and the three tier model being embedded.",
    color: "confirmed",
    number: 2,
  },
  {
    path: "/what-has-not-changed",
    title: "What has not changed",
    summary: "Your legal rights under the Children and Families Act 2014, EHCP protections, and tribunal appeal routes that remain in force.",
    color: "confirmed",
    number: 3,
  },
  {
    path: "/what-is-being-discussed",
    title: "What is being discussed",
    summary: "Proposals under consideration including tiered support models, mainstream inclusion expansion, and funding mechanism changes.",
    color: "discussed",
    number: 4,
  },
  {
    path: "/what-we-do-not-know",
    title: "What we do not know yet",
    summary: "Unanswered questions about the White Paper content, assessment thresholds, appeal rights, and implementation timelines.",
    color: "discussed",
    number: 5,
  },
  {
    path: "/what-the-leaks-are-saying",
    title: "What the leaks are saying",
    summary: "BBC and media reports on potential EHCP redesign, the three tier ladder, and ministerial concern about political backlash.",
    color: "unconfirmed",
    number: 6,
  },
  {
    path: "/what-the-leaks-do-not-mean",
    title: "What the leaks do not mean",
    summary: "Common misinterpretations of leaked proposals addressed — what the reports actually say versus what people fear.",
    color: "unconfirmed",
    number: 7,
  },
  {
    path: "/timeline",
    title: "Timeline and next steps",
    summary: "Key dates, decision points and milestones from the national conversation to the expected White Paper and beyond.",
    color: "next",
    number: 8,
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  confirmed: {
    bg: "bg-status-confirmed/15",
    border: "border-status-confirmed/30",
    text: "text-status-confirmed",
  },
  discussed: {
    bg: "bg-status-discussed/15",
    border: "border-status-discussed/30",
    text: "text-status-discussed",
  },
  unconfirmed: {
    bg: "bg-status-unconfirmed/15",
    border: "border-status-unconfirmed/30",
    text: "text-status-unconfirmed",
  },
  next: {
    bg: "bg-[hsl(var(--timeline-upcoming)/0.15)]",
    border: "border-[hsl(var(--timeline-upcoming)/0.3)]",
    text: "text-[hsl(var(--timeline-upcoming))]",
  },
};

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <Layout>
      <SEOHead
        title="SEND Reform Navigator"
        description="A calm, independent guide helping parents and professionals understand SEND reform in England. Clear facts, no spin."
        path="/"
      />

      {/* Header with sign out */}
      <section className="content-section pt-6 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-display font-semibold text-foreground">
            Where would you like to start?
          </h1>
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
              className="gap-1.5 text-xs text-muted-foreground"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a starting point below. Each section builds on the last, or explore in any order.
        </p>
      </section>

      {/* Journey cards - expanded with summaries */}
      <section className="content-section py-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {journeyCards.map((card) => {
            const colors = colorMap[card.color];
            return (
              <Link
                key={card.path}
                to={card.path}
                className="journey-card flex items-start gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-9 h-9 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 border-2 ${colors.border} mt-0.5`}>
                  <span className={`text-xs font-semibold ${colors.text}`}>{card.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{card.summary}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Status cards */}
      <section className="content-section py-4">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
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
      </section>

      {/* Breaking News */}
      <section className="content-section py-6">
        <NewsHeadlines />
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

    </Layout>
  );
};

export default Index;
