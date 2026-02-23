import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  OnThisPage,
  ContentBox,
} from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";
import { BookOpen, Shield, TrendingUp, AlertTriangle, HelpCircle, Newspaper, Filter, ArrowRight, Heart } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "now", icon: Shield, title: "Where things stand right now" },
  { id: "changing", icon: TrendingUp, title: "What is actually changing" },
  { id: "unchanged", icon: Shield, title: "What has not changed" },
  { id: "discussed", icon: HelpCircle, title: "What is being discussed" },
  { id: "unknown", icon: AlertTriangle, title: "What we do not know yet" },
  { id: "leaks", icon: Newspaper, title: "What the leaks are and are not" },
  { id: "next", icon: ArrowRight, title: "What happens next" },
  { id: "parents", icon: Heart, title: "What this means for you right now" },
];

export default function QuickRead() {
  return (
    <Layout>
      <SEOHead
        title="SEND today: quick read summary for parents"
        description="A short summary of where SEND provision stands in England, what is changing, and what to expect over the next 6 to 12 months."
        path="/quick-read"
      />
      <PageOrientation
        title="SEND today: a quick read for parents"
        description="Everything across this site, brought together in one page. Where things stand, what is confirmed, what is not, and what the next 6 to 12 months are likely to look like."
        lastUpdated="23rd February 2026"
      />

      <section className="content-section py-8" aria-labelledby="quickread-heading">
        <h2 id="quickread-heading" className="text-lg font-medium text-foreground mb-4">
          Why this page exists
        </h2>
        <div className="bg-card border border-border rounded-lg p-5 shadow-lg text-sm">
          <div className="prose-calm space-y-4">
            <p>
              The SEND Navigator covers a lot of ground across eight detailed pages. This page brings all of that together into <strong>one short, grounded summary</strong> you can read in a few minutes.
            </p>
            <p>
              If you want to go deeper on any section, each one links to the full page.
            </p>
          </div>
        </div>
      </section>

      <OnThisPage sections={sections} />

      <ContentBox id="now" icon={Shield} title="Where things stand right now">
        <div className="space-y-3">
          <p>
            The SEND system in England is under severe strain. <strong>Around 576,000 children have an Education, Health and Care Plan</strong>, a 140% increase since 2015. Nearly 1.9 million young people are identified with SEND overall.
          </p>
          <p>
            The law is clear. The problem is delivery. <strong>Only around 60% of EHCPs are issued within the 20-week legal timescale.</strong> Many families wait six to twelve months. Nearly 50% of parents describe securing support as stressful. 22% say their child's school is not delivering what is written in the plan.
          </p>
          <p>
            Councils are in financial crisis. <strong>95% are running SEND budget deficits.</strong> Spending on high needs has risen from £7.8 billion to £13.1 billion in under a decade. The system is widely described as unsustainable.
          </p>
          <p className="text-xs text-muted-foreground/80">
            <a href="/where-we-are-now" className="underline hover:text-primary transition-colors">Read the full page →</a>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="changing" icon={TrendingUp} title="What is actually changing">
        <div className="space-y-3">
          <p>
            Some changes are no longer speculative. They have been publicly confirmed and funded.
          </p>
          <ul className="space-y-2">
            <li>The government will <strong>write off 90% of council SEND deficits</strong>, a rescue package worth over £5 billion. From 2028 to 2029, central government takes full responsibility for SEND spending growth.</li>
            <li><strong>£3.7 billion is creating 60,000 new SEND places</strong>, including new specialist schools and specialist units in mainstream.</li>
            <li>Every secondary school is expected to have an <strong>inclusion base</strong>.</li>
            <li><strong>£200 million is going into SEND teacher training.</strong> Ofsted now has an "Inclusion" judgement in school inspections.</li>
            <li>National SEND standards are being developed, with the government saying <strong>it will legislate to give them legal force</strong>.</li>
          </ul>
          <p>
            <strong>None of these confirmed changes remove existing legal rights.</strong>
          </p>
          <p className="text-xs text-muted-foreground/80">
            <a href="/what-is-changing" className="underline hover:text-primary transition-colors">Read the full page →</a>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="unchanged" icon={Shield} title="What has not changed">
        <div className="space-y-3">
          <p>
            <strong>The Children and Families Act 2014 is still the law.</strong> EHCPs are still legally enforceable. The 20-week timescale still applies. Parents still have the right to request assessment, choose a school, and appeal decisions.
          </p>
          <p>
            Tribunal outcomes still heavily favour parents, with <strong>around 90% of decided cases won</strong>. No child has lost their EHCP because of reform discussions. No existing plan has been removed or downgraded.
          </p>
          <p className="text-xs text-muted-foreground/80">
            <a href="/what-has-not-changed" className="underline hover:text-primary transition-colors">Read the full page →</a>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="discussed" icon={HelpCircle} title="What is being discussed">
        <div className="space-y-3">
          <p>
            Alongside confirmed changes, there is active public debate about deeper reform. <strong>Nothing in this area is law. Nothing has been enacted.</strong>
          </p>
          <ul className="space-y-2">
            <li>A <strong>four-tier model of support</strong> has been discussed, with EHCPs reserved for the most severe and complex needs.</li>
            <li><strong>Individual Support Plans:</strong> a formal consultation proposal to introduce statutory school-led plans from 2030. EHCPs confirmed to remain alongside them.</li>
            <li>There is debate about <strong>mandatory mediation before tribunal</strong> and shifting funding to school clusters rather than individual plans.</li>
            <li>The National Education Union has urged the government to maintain legal thresholds. The <strong>Save Our Children's Rights campaign gathered over 130,000 signatures</strong>.</li>
          </ul>
          <p>
            The tension sits between system efficiency and individual safeguards. <strong>These debates are shaping policy, but they are not policy yet.</strong>
          </p>
          <p className="text-xs text-muted-foreground/80">
            <a href="/what-is-being-discussed" className="underline hover:text-primary transition-colors">Read the full page →</a>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="unknown" icon={AlertTriangle} title="What we do not know yet">
        <div className="space-y-3">
          <p>
            Key questions remain unanswered. <strong>No draft legislation has been published</strong> setting out changes to EHCP eligibility. No final national standards have been published. No confirmed funding model replacing EHCP-linked funding has been agreed.
          </p>
          <p>
            Parents want to know whether existing EHCPs will be grandfathered, what happens to post-16 support, how neurodivergent conditions will be treated, and whether lower-tier support will be legally enforceable. <strong>These questions do not have answers yet.</strong>
          </p>
          <p className="text-xs text-muted-foreground/80">
            <a href="/what-we-do-not-know" className="underline hover:text-primary transition-colors">Read the full page →</a>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="leaks" icon={Newspaper} title="What the leaks are and are not">
        <div className="space-y-3">
          <p>
            There has been a steady flow of unconfirmed reports from outlets including The Guardian, iNews, and the Financial Times. They describe proposals like a four-tier system, digital passports for SEND, and possible implementation delays to 2029.
          </p>
          <p>
            <strong>None of these are government policy. None have legal force.</strong> Leaks are how ideas get tested. Strong public reaction, including the 130,000-signature petition and Labour MP pushback, has already slowed timelines and increased emphasis on co-production.
          </p>
          <p>
            <strong>A leak does not mean a decision has been made. A headline does not override legislation.</strong>
          </p>
          <p className="text-xs text-muted-foreground/80">
            <a href="/what-the-leaks-are-saying" className="underline hover:text-primary transition-colors">Read the full pages →</a>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="next" icon={ArrowRight} title="What happens next">
        <div className="space-y-3">
          <p>
            <strong>The next six to twelve months look like this:</strong>
          </p>
          <h3 className="text-sm font-semibold text-foreground mt-2">What has now happened</h3>
          <ul className="space-y-2">
            <li><strong>23 February 2026:</strong> the Schools White Paper, <em>Every Child Achieving and Thriving</em>, was published. A formal 12-week public consultation is now open following the white paper publication.</li>
          </ul>

          <h3 className="text-sm font-semibold text-foreground mt-4">What comes next</h3>
          <ul className="space-y-2">
            <li><strong>Autumn 2026:</strong> councils must submit local SEND reform plans to qualify for the deficit bailout.</li>
            <li><strong>By 2027:</strong> all local areas inspected under the new Ofsted and CQC SEND framework.</li>
            <li><strong>2028 to 2029:</strong> central government takes full responsibility for SEND spending growth.</li>
            <li><strong>2029 to 2030 (unconfirmed):</strong> leaked reports suggest full implementation of major reforms might not happen until then.</li>
          </ul>
          <p>
            Any change to rights requires consultation, legislation, and parliamentary scrutiny. <strong>The formal consultation process has now begun.</strong>
          </p>
          <p className="text-xs text-muted-foreground/80">
            <a href="/what-happens-next" className="underline hover:text-primary transition-colors">Read the full page →</a>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="parents" icon={Heart} title="What this means for you right now">
        <div className="space-y-3">
          <p>
            <strong>Your child's rights today are real. They are enforceable. They do not disappear because of a headline.</strong>
          </p>
          <ul className="space-y-2">
            <li>If your child needs an EHCP, the legal route to get one has not changed.</li>
            <li>If you are in the middle of an assessment, keep going. The same law applies.</li>
            <li>If provision is not being delivered, you still have routes to challenge.</li>
            <li>Stay informed, not consumed. Engage with consultations when they open.</li>
          </ul>
          <p>
            Reform is coming because the current system is failing too many families. That does not mean the solution will automatically be better. It does mean <strong>there is space for challenge, shaping, and accountability</strong>.
          </p>
          <p>
            <strong>You are not behind. You are not too late. Your child's rights do not expire while policy is being discussed.</strong>
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
