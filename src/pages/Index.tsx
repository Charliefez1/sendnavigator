import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shield, MessageCircle, Users, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { QandAComponent } from "@/components/qanda";

export default function Index() {
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="blob-decoration w-72 h-72 bg-primary -top-20 -right-20" style={{ position: 'absolute' }} />
        <div className="blob-decoration w-56 h-56 bg-accent -bottom-10 -left-16" style={{ position: 'absolute', borderRadius: '40% 60% 50% 50%' }} />

        <div className="content-section py-14 sm:py-20 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Independent & regularly updated
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-5 leading-tight">
              Understanding<br />
              <span className="text-primary">SEND Reform</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              A friendly guide to help you understand what is happening with SEND reform in England, without the jargon.
            </p>
          </div>

          {/* Quick action cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12">
            <Link
              to="/start"
              className="group bg-primary text-primary-foreground rounded-2xl p-5 transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
            >
              <BookOpen className="w-6 h-6 mb-3 opacity-80" />
              <h3 className="font-display font-bold text-lg mb-1">Start reading</h3>
              <p className="text-sm opacity-85">Begin with reassurance and an overview</p>
              <ArrowRight className="w-5 h-5 mt-3 opacity-60 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/questions-and-answers"
              className="group bg-card border-2 border-border rounded-2xl p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-warm hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6 mb-3 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground mb-1">Ask a question</h3>
              <p className="text-sm text-muted-foreground">Get a plain English answer</p>
              <ArrowRight className="w-5 h-5 mt-3 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* What & Who section */}
      <section className="bg-secondary/30">
        <div className="content-section py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-lg font-bold text-foreground mb-3">What this site is</h2>
              <div className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                <p>An independent public resource explaining what is confirmed, discussed, and unknown about SEND reform.</p>
                <p>We do not give advice. We help you understand what is actually happening.</p>
              </div>
            </div>
            <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Who this is for</h2>
              <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Parents and carers of children with SEND
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Teachers, SENCOs, and school leaders
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Professionals working with children
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Anyone trying to understand SEND reform
                </li>
              </ul>
            </div>
          </div>

          {/* Q&A Component */}
          <div className="max-w-2xl mx-auto mb-10">
            <QandAComponent />
          </div>

          {/* Journey links */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-5 text-center">
              Where would you like to go?
            </h2>
            <div className="space-y-3">
              {[
                { to: "/what-is-changing", icon: Shield, title: "What is actually changing", desc: "Confirmed reforms and official plans" },
                { to: "/what-has-not-changed", icon: Shield, title: "What has not changed", desc: "Your rights and protections today" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="journey-card flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
