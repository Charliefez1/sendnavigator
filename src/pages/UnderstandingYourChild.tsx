import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Zap, CheckCircle2, Clock, Heart } from "lucide-react";
import { ConfidenceLabel } from "@/components/ConfidenceLabel";

export default function UnderstandingYourChild() {
  return (
    <Layout>
      <SEOHead
        title="Understanding Your Child - SEND Navigator"
        description="You do not need a diagnosis to start understanding your child. Practical guides to autism and ADHD for parents navigating the SEND system."
        path="/understanding-your-child"
      />

      <PageOrientation
        icon={Heart}
        sectionLabel="Understanding Your Child"
        title="Understanding Your Child"
        description="You do not need a diagnosis to start understanding your child. A diagnosis can open doors — but understanding what is happening right now is both possible and useful, regardless of where you are in that process."
        accentColor="hsl(330 60% 52%)"
      />

      {/* Intro */}
      <section className="content-section py-6">
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          <p>
            This section covers two of the most common neurodivergent profiles in school-age children: <strong>autism</strong> and <strong>ADHD</strong>. Both are frequently misunderstood. Both often look different from the textbook descriptions. And both interact with school, home, and development in ways that are specific enough to be worth understanding in detail.
          </p>
          <p>
            These pages will help you understand what the condition actually is, what it tends to look like in practice at home and at school, what <strong>reasonable adjustments</strong> you can ask for, and how to describe your child's experience clearly in the meetings and written processes that matter.
          </p>
        </div>
      </section>

      {/* Choose where to start */}
      <section className="content-section py-4">
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">Choose where to start</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/understanding-your-child/autism"
            className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">Autism</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                What autism is, how it presents across different children, what school can feel like from the inside, and what helps.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
          </Link>

          <Link
            to="/understanding-your-child/adhd"
            className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-status-discussed/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-status-discussed" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">ADHD</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                What ADHD is and is not, how the dopamine and attention system works differently, what the real challenges are in a school setting, and what changes make a practical difference.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </section>

      {/* Co-occurrence */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <h2 className="text-base font-display font-semibold text-foreground mb-3">What if my child has both?</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              A significant number of neurodivergent children are <strong>autistic and have ADHD</strong>. The two conditions frequently co-occur, and they interact with each other in ways that can make both harder to identify and support.
            </p>
            <p>
              If your child has a profile that does not fit neatly into one description, that is <strong>common and normal</strong>. Read both pages. The overlap is as important as the distinction.
            </p>
          </div>
        </div>
      </section>

      {/* No diagnosis */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <h2 className="text-base font-display font-semibold text-foreground mb-3">What if there is no diagnosis yet?</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The waiting lists for assessment in England are long. For many families, a formal diagnosis is <strong>years away</strong>.
            </p>
            <p>
              You do not have to wait for a diagnosis before asking for support. Schools have a <strong>legal duty to make reasonable adjustments</strong> for children with SEND, with or without a formal diagnosis. What matters is evidence of need, and that is something you can start building now.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/what-to-do-right-now" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                → What to do right now if things are going wrong
              </Link>
              <Link to="/what-we-owe-our-children" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                → What we owe our children, including how to build an evidence jacket
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Confidence label */}
      <section className="content-section py-6">
        <ConfidenceLabel status="confirmed">
          The duty to make reasonable adjustments under the <strong>Equality Act 2010</strong> applies regardless of whether a child has a formal diagnosis.
        </ConfidenceLabel>
      </section>
    </Layout>
  );
}
