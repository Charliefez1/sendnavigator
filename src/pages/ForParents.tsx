import { Layout } from "@/components/Layout";
import { PageAccentProvider } from "@/contexts/PageAccentContext";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation, OnThisPage } from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";

import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, Phone, Heart, Users, Scale, Shield, AlertTriangle, HelpCircle } from "lucide-react";
import { ConfidenceLabel } from "@/components/ConfidenceLabel";
import { WordFromRich } from "@/components/WordFromRich";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";

const sections: PageSectionDef[] = [
  { id: "cost", icon: Heart, title: "What this experience costs" },
  { id: "alone", icon: Users, title: "You cannot sustain this alone" },
  { id: "forums", icon: Users, title: "Parent Carer Forums" },
  { id: "orgs", icon: Shield, title: "National organisations" },
  { id: "carer-rights", icon: Scale, title: "Your rights as a carer" },
  { id: "more-support", icon: HelpCircle, title: "When you need more" },
  { id: "darkest", icon: Phone, title: "For the darkest moments" },
];
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-display font-semibold text-foreground mt-10 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

function ResourceLink({ label, url, description }: { label: string; url: string; description?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
          {label}
          <ExternalLink className="w-3 h-3 flex-shrink-0 text-muted-foreground" />
        </p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
        )}
      </div>
    </a>
  );
}

export default function ForParents() {
  return (
    <PageAccentProvider color="hsl(8 75% 55%)">
    <Layout>
      <SEOHead
        title="You Are Carrying a Lot | SEND Navigator"
        description="An honest acknowledgement of what parenting a neurodivergent child through a broken system actually costs. Practical support, carer rights, and where to find people who understand."
        path="/for-parents"
      />

      <PageOrientation icon={Heart}
        sectionLabel="What To Do Now"
        title="You Are Carrying a Lot"
        description="This page is not about your child. It is about you. Parenting a neurodivergent child through a broken system is exhausting. This page explains what is actually available and how to know when you need more support."
        accentColor="hsl(8 75% 55%)"
        showSearch={false}
      />

      <LatestUpdatesStream />

      <OnThisPage sections={sections} />
      

      <WordFromRich>
        <p>Nobody tells you this part. The forms at midnight. The meetings where you feel like you are fighting for something that should just be given. The school gate where you are watching other children while yours is at home again. The grief that is not for your child but for the version of this you thought it would be. And underneath all of it, still the love. Still showing up. Still pushing.</p>
        <p>I have been in that place. I know what it takes. You are not failing. And in most cases, neither are the people trying to help you. The system around all of you is under enormous strain. That distinction matters more than you might realise right now.</p>
      </WordFromRich>

      {/* What this experience actually costs */}
      <section id="cost" className="content-section py-6 scroll-mt-20">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What this experience actually costs</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The forms. The waiting. The meetings where you feel dismissed. The school gate dread. The nights writing letters you are not sure anyone will read. The meltdowns you managed in public while <strong>someone nearby muttered something you cannot forget</strong>.
            </p>
            <p>
              The anticipatory anxiety before every annual review, every transition, every new year. The hypervigilance that does not switch off because <strong>experience has taught you that if you stop pushing, things slip</strong>.
            </p>
            <p>
              The grief, sometimes. Not for your child. For the version of parenthood you expected, and the <strong>gap between that and this</strong>.
            </p>
            <p>
              And underneath all of it, the love. The specific, complex, sometimes overwhelming love for a child whose brain works differently and who needs you to understand things most of the world does not bother to learn.
            </p>
            <p className="font-medium text-foreground mt-4">This is not bad parenting. It is not weakness.</p>
            <p><strong>It is the cost of caring deeply inside a system that does not care enough.</strong></p>
          </div>
        </div>
      </section>

      {/* You cannot sustain this alone */}
      <section id="alone" className="content-section py-4 scroll-mt-20">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>You cannot sustain this alone</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The parents who last longest in this fight, who get the best outcomes for their children, and who do not burn out completely are not the parents who push hardest without support.
            </p>
            <p>
              They are the parents who <strong>found other people who understood</strong>.
            </p>
            <p>
              Parent carer forums, local SEND parent groups, online communities. These are not soft options. They are <strong>survival infrastructure</strong>. Other parents who have been through the tribunal process, who know which LA officer actually responds, who have already made the mistakes you are about to make.
            </p>
            <p>This knowledge does not sit in official documents. It sits in those communities.</p>
          </div>
        </div>
      </section>

      {/* Parent Carer Forums */}
      <section id="forums" className="content-section py-4 scroll-mt-20">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>Parent Carer Forums</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Every local authority area in England has a <strong>Parent Carer Forum</strong>. These are independent groups, largely run by parent carers, that have a formal role in the local SEND system. They are consulted by the LA and by health services. They have access to information about <strong>local provision, planned changes, and how the system is operating in your area</strong>.
            </p>
            <p>They are also, in practice, communities of people who understand what you are going through.</p>
            <p>Find your local forum via the NNPCF, the National Network of Parent Carer Forums.</p>
          </div>
          <div className="mt-4">
            <ResourceLink
              label="NNPCF: find your local forum"
              url="https://nnpcf.org.uk"
              description="National Network of Parent Carer Forums. Searchable directory of local parent carer forums across England."
            />
          </div>
        </div>
      </section>

      {/* National organisations */}
      <section id="orgs" className="content-section py-4 scroll-mt-20">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>National organisations that support parents</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>These are not just SEND legal services. They are organisations that <strong>recognise the impact on families</strong>.</p>
            <p>
              <strong>Contact</strong> is a national charity for families with disabled children. They run a helpline, provide practical guides, and have a strong parent-to-parent network. Their resources on the emotional impact of caring and on navigating systems are among the best available.
            </p>
            <p>
              <strong>Carers UK</strong> covers the broader experience of caring, including mental health support, financial rights, and carer's assessments. If you are providing significant care for your child, you have <strong>rights as a carer</strong> that many parents are unaware of.
            </p>
            <p>
              <strong>Scope</strong> operates an online community and helpline with specific support for parents of disabled children.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <ResourceLink
              label="Contact: for families with disabled children"
              url="https://contact.org.uk"
              description="Helpline, practical guides, and parent-to-parent support for families with disabled children."
            />
            <ResourceLink
              label="Carers UK"
              url="https://www.carersuk.org"
              description="Carer rights, financial guidance, mental health support, and carer's assessment information."
            />
            <ResourceLink
              label="Scope helpline and community"
              url="https://www.scope.org.uk"
              description="Online community and helpline with specific support for parents of disabled children."
            />
          </div>
        </div>
      </section>

      {/* Carer's assessment */}
      <section id="carer-rights" className="content-section py-4 scroll-mt-20">
        <div className="rounded-2xl border border-border/50 border-l-4 border-l-[hsl(8_75%_55%)] bg-card p-6 shadow-card">
          <SectionHeading>Your rights as a carer</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Under the <strong>Care Act 2014</strong>, if you provide or intend to provide care for a disabled person, you have the right to a <strong>carer's assessment</strong> from your local authority. This is separate from any assessment your child receives.
            </p>
            <p>
              A carer's assessment looks at your wellbeing, your ability to sustain your caring role, and what support might help you. It can result in <strong>practical support, respite, or access to services</strong> you are currently managing without.
            </p>
            <p>
              <strong>Many parent carers do not know this right exists.</strong> Many who do know do not use it because they do not feel they have the time or energy.
            </p>
            <p>
              If you are at the point where your own health is suffering, requesting a carer's assessment is a <strong>legitimate and practical step</strong>.
            </p>
          </div>
          <div className="mt-4">
            <ResourceLink
              label="Carers UK: your right to a carer's assessment"
              url="https://www.carersuk.org"
              description="Detailed guidance on what a carer's assessment is, how to request one, and what it can lead to."
            />
          </div>

          <ConfidenceLabel status="confirmed">
              The right to a carer's assessment under the <strong>Care Act 2014</strong> applies to adult carers who provide or intend to provide care for a disabled person.
          </ConfidenceLabel>
        </div>
      </section>

      {/* When you need more */}
      <section id="more-support" className="content-section py-4 scroll-mt-20">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>When you need more than a forum or a helpline</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              There is a point some parents reach where the cumulative impact of this experience becomes something that needs <strong>professional support</strong>, not just peer connection.
            </p>
            <p>
              Anxiety that does not lift. Sleep that does not recover. A persistent sense of dread or hopelessness that is <strong>affecting your ability to function</strong>.
            </p>
            <p>If that is where you are, that is worth taking seriously.</p>
            <p>
              <strong>Your GP is the first route.</strong> The impact of caring is a legitimate presenting concern. You do not need to minimise it or frame it as something else.
            </p>
            <p>
              The SEND system does not run better when the parents navigating it are running on empty. Your health matters in its own right. <strong>It also matters for your child.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Samaritans */}
      <section id="darkest" className="content-section py-4 scroll-mt-20">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>For the moments that feel darkest</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              If you are at a point where you are struggling to cope and need to talk to someone, the <strong>Samaritans</strong> are available around the clock.
            </p>
          </div>
          <div className="mt-4 rounded-xl border-2 border-foreground/10 bg-foreground/5 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-lg font-display font-bold text-foreground">116 123</p>
                <p className="text-xs text-muted-foreground">Free · 24 hours · No referral needed</p>
              </div>
            </div>
            <a
              href="https://www.samaritans.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-sm mt-3"
            >
              samaritans.org <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            This is not a crisis-only service. It is available for anyone who needs to talk, including parents who are <strong>exhausted and overwhelmed</strong> and need to speak to someone who will listen without judgement.
          </p>
        </div>
      </section>

      {/* Personal note */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4.5 h-4.5 text-primary" />
            </div>
            <h2 className="text-base font-display font-semibold text-foreground">A note from the person who built this site</h2>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>I built SEND Navigator because <strong>I have lived this</strong>.</p>
            <p>
              Neurodivergent children. A system that required constant pressure to deliver what it was legally required to provide. The school gate dread. Standing outside offices. Writing letters at midnight.
            </p>
            <p>
              I also know what it is to find other parents who understood. To realise that what felt like a <strong>personal failure was a systemic one</strong>.
            </p>
            <p className="font-medium text-foreground">You are not failing.</p>
            <p><strong>The system is failing.</strong></p>
            <p>
              Understanding that distinction does not fix anything on its own. But it matters. It changes the question from "what am I doing wrong" to <strong>"what does this system owe my child, and how do I get it."</strong>
            </p>
            <p>That is a better question. And this site exists to help you answer it.</p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="content-section py-4 pb-8">
        <div className="space-y-2">
          <Link
            to="/what-has-not-changed"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                → What the system owes your child. Legal rights, plainly explained.
              </p>
            </div>
          </Link>
          <Link
            to="/what-to-do-right-now"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                → What to do right now. The full escalation guide.
              </p>
            </div>
          </Link>
          <Link
            to="/what-we-owe-our-children"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                → What we owe our children. A reality check for parents.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
    </PageAccentProvider>
  );
}
