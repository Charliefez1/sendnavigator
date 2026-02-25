import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { WordFromRich } from "@/components/WordFromRich";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-display font-semibold text-foreground mt-10 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
      <h3 className="text-base font-display font-semibold text-foreground mb-3">{title}</h3>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function ResourceLink({ label, url, note }: { label: string; url: string; note?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-primary hover:underline font-medium text-sm"
    >
      → {label}
      {note && <span className="text-muted-foreground font-normal"> - {note}</span>}
      <ExternalLink className="w-3 h-3 flex-shrink-0" />
    </a>
  );
}

export default function WhatWeOweOurChildren() {
  return (
    <Layout>
      <SEOHead
        title="What We Owe Our Children: Reality Bites"
        description="An honest look at what parents can do for their neurodivergent children, regardless of what the system does next. Direct, practical, uncomfortable."
        path="/what-we-owe-our-children"
      />

      {/* Series label */}
      <div className="content-section pt-6 pb-2">
        <div className="inline-flex items-center gap-2 rounded-lg bg-foreground/5 border border-foreground/10 px-4 py-2">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-foreground/70">Reality Bites</span>
          <span className="text-xs text-muted-foreground"> - honest perspectives for neurodivergent families</span>
        </div>
      </div>

      {/* Page header */}
      <header className="content-section py-6 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          What We Owe Our Children
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          This is the first in a series called <strong>Reality Bites</strong>. These pieces do not tell you what the system owes you. They tell you what we owe our children, regardless of what the system does next.
        </p>
      </header>

      <WordFromRich>
        <p>I built this section because I think parents deserve honesty. The system is under real pressure. EHC plan numbers have more than doubled since 2015. Local authority high needs funding has not kept pace. The professionals trying to help your child are often working in conditions that make doing the job well very hard. None of that changes your child's rights. None of it is a reason to accept less than what your child is entitled to. But understanding why the system behaves the way it does helps you navigate it without taking it personally, and without assuming that every delay or refusal is bad faith. Some of it is. Most of it is a system that is broken and under-resourced, not a conspiracy against your family.</p>
      </WordFromRich>

      {/* Opening */}
      <section className="content-section py-6">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          <p>The system is broken. That is true and it matters.</p>
          <p>But this page is not about the system.</p>
          <p>It is about us. What we can do. What we owe our children whether or not the local authority delivers, whether or not the EHCP comes through, whether or not the school gets it.</p>
          <p><strong>Some of this is uncomfortable. It is meant to be.</strong></p>
        </div>
      </section>

      {/* The people trying to help */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>The people trying to help your child are not your enemies</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>Teachers, SENCos, local authority staff. The vast majority are doing their jobs. Most are doing <strong>considerably more than their job descriptions require</strong>.</p>
            <p>They are working inside a system with shrinking budgets, growing caseloads, and not enough of anything. That does not excuse failure when it happens. When the system fails your child, you have every right to challenge it and this site will help you do that.</p>
            <p>But walking in assuming everyone is your adversary makes things harder. For your child, and for you.</p>
            <p><strong>This should never be a battle.</strong></p>
            <p>Your child is on a long list. Every parent on that list is calling, emailing, sometimes standing outside offices until someone sees them. I know. I was one of them.</p>
            <p>The difference between being heard and being managed is usually <strong>preparation</strong>. Not volume. Not aggression. Preparation.</p>
            <p>Be assertive when you need to be. Push back when the system fails. But build relationships where you can. The parent who is known, trusted, and clear gets further than the parent who is feared or avoided.</p>
          </div>
        </div>
      </section>

      {/* Prepare before you ask */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>Prepare before you ask</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>Before you contact the school. Before you write to the LA. Before any meeting.</p>
            <p>Know what you believe your child needs. Not just that something is wrong, but <strong>what specifically is happening, when, and what you think is driving it</strong>.</p>
            <p>This means doing your research. Understanding your child's profile. Their strengths, their flash points, the settings and situations that push them past what they can manage. And writing it down.</p>
          </div>
        </div>
      </section>

      {/* Evidence jacket */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>Build an evidence jacket</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>An evidence jacket is a running record of your child's experience. It does not need to be formal. It needs to be <strong>honest, specific, and consistent</strong>.</p>
            <p>Date. Situation. What happened. What came before it. How your child described it. How they recovered.</p>
            <p>Words work. So do photos where relevant, video where your child is comfortable with it, drawings from younger children, your child's own account in their own words.</p>
            <p>Over time a pattern becomes visible. A pattern is evidence. <strong>Evidence is what moves things forward</strong> in reviews, assessments, and meetings.</p>
            <p>When you can say "here are twelve documented incidents over six weeks, all during unstructured transition times, all involving the same trigger": that changes the conversation.</p>
          </div>
        </div>
      </section>

      {/* Masking */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>Understand what is happening at home</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>Your child is almost certainly <strong>masking</strong> at school.</p>
            <p>Masking is the effort of suppressing natural neurological responses: the stims, the shutdowns, the distress signals. All in order to appear to cope in an environment that does not accommodate how their nervous system works. It is exhausting work. And it tends to collapse the moment they reach somewhere they feel safe.</p>
            <p>Which is home.</p>
            <p>The explosion at the school gate, the meltdown after what looked like a normal day, the refusal to do anything by early evening. This is usually the <strong>accumulated cost of hours spent masking</strong>. It is not bad behaviour. It is a child running on empty, finally in a place where they do not have to pretend.</p>
            <p>Understanding this changes how you respond to it at home. It also changes how you describe your child's needs to the school.</p>
          </div>
        </div>
      </section>

      {/* Stimming */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>Stimming - what it is and why it matters</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>Stimming is self-stimulatory behaviour. Repetitive movements, sounds, or actions that <strong>regulate the nervous system</strong>.</p>
            <p>Rocking. Flapping. Tapping. Humming. Pacing. Picking. Spinning.</p>
            <p>Stimming is not a problem to be stopped. It is a regulatory tool. When a child stims they are actively managing their internal state: processing sensory input, managing anxiety, maintaining enough focus to stay in the room.</p>
            <p>When stimming is suppressed, when a child is told to sit still, stop tapping, stop making that noise, the regulatory need does not disappear. <strong>It accumulates.</strong> It finds another outlet, usually a louder and less manageable one.</p>
            <p>Ask the school what their approach is to stimming. If your child is being routinely stopped from regulating themselves, that is worth raising — not as a confrontation, but as a direct and reasonable question. <strong>"What are they allowed to do when they feel overwhelmed?"</strong> is a question every school should be able to answer.</p>
          </div>
        </div>
      </section>

      {/* Screens, sleep, dopamine */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>Screens, sleep, and dopamine</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p><strong>This part is harder to hear.</strong></p>
            <p>Many of the behaviours that look like SEND in the classroom — poor concentration, impulsivity, difficulty regulating, emotional volatility — are significantly worsened by sleep deprivation and dopamine dysregulation driven by screens.</p>
            <p>This is not about blame. It is about cause and effect.</p>
            <p>Neurodivergent children are particularly vulnerable to the dopamine reward loops built into gaming, social media, and smartphones. The ADHD brain is specifically built to seek novelty and immediate reward. The platforms our children use are <strong>engineered to deliver exactly that, endlessly, without pause</strong>.</p>
            <p>A child who has spent hours on a device before school arrives with their dopamine system already spiked and crashing, their sleep debt carried from the night before, their capacity for sustained attention depleted before the day starts.</p>
            <p><strong>We cannot put all of that on the school to manage.</strong></p>
            <p>Sleep is not optional. It is nervous system care. Screens before bed disrupt melatonin and fragment rest. A child who consistently sleeps poorly will struggle to learn, regulate, and cope with the ordinary demands of a school day. That is not an opinion — it is well-documented neuroscience.</p>
            <p>This is one of the most difficult conversations to have with yourself as a parent. It is also one of the most important.</p>
            <p>The question is not whether to remove screens. The question is whether your child can sleep without them nearby, can stop with support, can return to calm after use, and whether real life can still compete with what the screen offers. <strong>If the answer to those questions is no — something needs adjusting.</strong></p>
            <p>Not punishing. Adjusting.</p>
            <div className="pt-2">
              <ResourceLink label="The Day We Gave Children Dopamine on Demand" url="https://smartphonefree.neurodiversityglobal.com/" note="written by Rich Ferriman" />
            </div>
          </div>
        </div>
      </section>

      {/* Profiles section */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg mb-4">
          <SectionHeading>Understanding your child's profile</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>A diagnosis tells you something. It rarely tells you everything.</p>
            <p>The profiles below are not boxes to squeeze your child into. They are tools — patterns that appear again and again in neurodivergent children, that can help you <strong>understand what your child is experiencing and describe it clearly</strong> to the people trying to support them.</p>
            <p>Use what helps. Leave the rest.</p>
          </div>
        </div>

        <div className="space-y-4">
          <ProfileSection title="Rejection Sensitive Dysphoria (RSD)">
            <p>RSD is not a formal diagnosis. It is a pattern — intense, often overwhelming emotional pain triggered by real or perceived rejection, criticism, or failure. It appears frequently in ADHD and autism, and it is widely recognised by clinicians and researchers even without a diagnostic category of its own.</p>
            <p>By the age of ten, a neurodivergent child has typically received around <strong>20,000 more negative comments</strong> than their neurotypical peers. Every correction. Every sigh. Every red pen. Every moment of being told to sit down, slow down, stop, try harder, pay attention, behave.</p>
            <p>Those comments land as meaning. To the child they translate as: you are wrong, you have failed, you are the problem.</p>
            <p>RSD grows in that soil. It is not fragility. It is a nervous system that has spent years braced for criticism, building a <strong>hair-trigger response to anything that feels like rejection</strong>.</p>
            <p>At home and at school this can look like extreme reactions to minor feedback, sudden withdrawal, rage at perceived unfairness, or intense avoidance of anything they might fail at. It can look like a child who refuses to try rather than risk getting it wrong.</p>
            <p>Understanding RSD changes how you give feedback and how you describe correction to the school. <strong>"My child experiences perceived criticism as physical distress"</strong> is a specific, useful thing to put in writing.</p>
          </ProfileSection>

          <ProfileSection title="Pathological Demand Avoidance (PDA)">
            <p>PDA describes a profile, most commonly within autism, where everyday demands — including ordinary, low-stakes requests — <strong>trigger extreme anxiety</strong> and a need to avoid or control them.</p>
            <p>The term is debated clinically. The lived experience is not.</p>
            <p>On the surface this looks like refusal, negotiation, distraction, deflection, sudden shutdown or meltdown. To people who do not understand it, it looks like deliberate manipulation or defiance.</p>
            <p>What is actually happening is simpler. The child's nervous system reads demands as threat. Not minor inconvenience — <strong>threat</strong>. And their whole body responds accordingly before they have any ability to respond calmly.</p>
            <p>Standard behaviour management strategies — consequences, reward charts, escalating pressure — usually make things significantly worse for a child with a PDA profile. The approaches that help are <strong>low demand, high autonomy, and predictability</strong>. Offering choice rather than instruction. Framing requests as options. Reducing the number of direct demands in a day.</p>
            <p>If this sounds like your child, the PDA Society has detailed guidance. Sharing it with the school is a reasonable starting point.</p>
            <div className="pt-1">
              <ResourceLink label="PDA Society — guidance for families and schools" url="https://www.pdasociety.org.uk" />
            </div>
          </ProfileSection>

          <ProfileSection title="Sensory Processing Differences (SPD)">
            <p>Many neurodivergent children experience the world through a sensory system that <strong>works at a different volume</strong> from the people around them. Sounds that feel like pain. Fabric that feels unbearable. Light that is blinding. Food textures that trigger a gag reflex. Rooms full of people that feel like information overload.</p>
            <p>SPD sits within autism and ADHD for many children, and sometimes appears without a broader diagnosis.</p>
            <p>It is not drama. It is a nervous system tuned differently. And in a school environment full of unpredictable noise, fluorescent lighting, close physical contact, and constant sensory input, a child with significant sensory differences is <strong>managing an exhausting amount of additional load</strong> before they have even opened a textbook.</p>
            <p>Reasonable adjustments for sensory needs do not require a diagnosis. They require a conversation. What are the specific triggers? What helps? Where in the school day does it become most difficult? An occupational therapist's assessment can be enormously useful here if you can access one.</p>
          </ProfileSection>

          <ProfileSection title="Oppositional Defiant Disorder (ODD)">
            <p>ODD is a clinical term used when children show persistent patterns of arguing, refusing, losing their temper, and challenging authority.</p>
            <p>That is the surface view.</p>
            <p>Many children who receive an ODD label have spent years being corrected, managed, controlled, and misunderstood. They have learned, the hard way, that when they express how they actually feel the answer is usually no, stop, or behave. At some point the nervous system decides that <strong>resistance is the only place that feels even slightly safe</strong>.</p>
            <p>From the outside it looks like a child who refuses for the sake of refusing.</p>
            <p>What you do not see is the child who feels unheard, overwhelmed, and trapped by demands they cannot process, reacting in the only way that gives them any sense of control.</p>
            <p>This does not mean there are no consequences. It means that <strong>consequences alone, without understanding what is driving the behaviour, change nothing</strong>.</p>
          </ProfileSection>
        </div>
      </section>

      {/* What we can do */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What we can do, regardless of the system</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>The system will help, eventually. But we do not have to wait for it.</p>
            <p><strong>Understanding your child's sensory profile</strong> and sharing it clearly with school. Reducing friction at home around transitions, demands, and unexpected change. Not because we are being permissive but because we understand the nervous system our child is living in.</p>
            <p><strong>Giving children language for their own experience.</strong> A child who can say "I feel overwhelmed when the room is too loud and I need to move" is better equipped than one who can only express it by shutting down or lashing out.</p>
            <p>Protecting sleep. Adjusting screen use. Building routines that provide predictability without rigidity.</p>
            <p><strong>These are not small things. They are the foundation everything else sits on.</strong></p>
            <div className="pt-2">
              <ResourceLink label="Are We Bad Parents? An Open Letter" url="https://awbp.neuro.support/" note="written by Rich Ferriman" />
            </div>
          </div>
        </div>
      </section>

      {/* The last word */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6">
          <SectionHeading>The last word</SectionHeading>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>Demand support when it is owed. Challenge the system when it fails your child.</p>
            <p><strong>But do not put everything on the system.</strong> It was never going to be enough on its own.</p>
            <p>The parents who get the best outcomes are not always the loudest. They are the most prepared. They understand their child. They build relationships with the people trying to help. They bring specific evidence. They ask clearly for specific things.</p>
            <p><strong>That is within your reach. Today.</strong> Regardless of what the LA does next.</p>
          </div>
        </div>
      </section>

      {/* Navigation links */}
      <section className="content-section py-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/what-to-do-right-now"
            className="text-sm text-primary hover:underline font-medium"
          >
            ← What to do right now - your legal rights
          </Link>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
