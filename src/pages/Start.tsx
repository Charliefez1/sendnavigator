import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { QandAComponent } from "@/components/qanda";
import { NewsHeadlines } from "@/components/NewsHeadlines";
import { useAuth } from "@/contexts/AuthContext";
import { SendiassSignpost } from "@/components/SendiassSignpost";
import { 
  ArrowRight, 
  BookOpen,
  Heart,
  Shield,
  Scale,
  Megaphone,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    path: "/state-of-send-2026",
    title: "The State of SEND 2026",
    summary: "Our 8-part report tracking SEND reform — from confirmed changes to unanswered questions.",
    icon: BookOpen,
    accent: "bg-primary/10 text-primary",
  },
  {
    path: "/ehcps",
    title: "The EHCP Guide",
    summary: "Everything you need to know about Education, Health and Care Plans — your rights, the process, and what to do when things go wrong.",
    icon: Shield,
    accent: "bg-status-confirmed/10 text-status-confirmed",
  },
  {
    path: "/what-to-do-right-now",
    title: "What to do right now",
    summary: "Practical steps if your child is not getting the support they need today. Based on current law.",
    icon: Scale,
    accent: "bg-status-discussed/10 text-status-discussed",
  },
  {
    path: "/have-your-say",
    title: "Have your say on reform",
    summary: "How to respond to the consultation, contact your MP, and make your voice count.",
    icon: Megaphone,
    accent: "bg-status-unconfirmed/10 text-status-unconfirmed",
  },
];

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
          Choose a section below to get started, or explore in any order.
        </p>
      </section>

      {/* Main navigation cards */}
      <section className="content-section py-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg ${card.accent} flex items-center justify-center flex-shrink-0`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{card.title}</h2>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{card.summary}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Breaking News */}
      <section className="content-section py-6">
        <NewsHeadlines />
      </section>

      {/* SENDIASS signpost */}
      <section className="content-section py-4">
        <SendiassSignpost />
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
