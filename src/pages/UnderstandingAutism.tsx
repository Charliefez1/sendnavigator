import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, ArrowLeft, Brain } from "lucide-react";
import { ConfidenceLabel } from "@/components/ConfidenceLabel";
import { WordFromRich } from "@/components/WordFromRich";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-display font-semibold text-foreground mt-10 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

export default function UnderstandingAutism() {
  return (
    <Layout>
      <SEOHead
        title="Autism - Understanding Your Child"
        description="What autism actually is, how it presents at school and home, what reasonable adjustments to ask for, and how to describe your child's needs clearly in meetings."
        path="/understanding-your-child/autism"
      />

      <PageOrientation
        icon={Brain}
        sectionLabel="Understanding Your Child"
        title="Autism"
        description="Autism is a lifelong neurological difference. It affects how a person processes sensory information, communicates, builds social understanding, and experiences the world around them. It is not a mental health condition. It is not caused by parenting. It is not something to grow out of."
        accentColor="hsl(330 60% 52%)"
      />

      <WordFromRich>
        <p>I am autistic. I have ADHD. I am dyslexic. For a long time I thought those things were problems to manage. They are not. They are a different operating system. One that most schools and systems were not designed around.</p>
        <p>What I know from the inside is this. Your child is probably working very hard to hold it together in school. Masking takes real effort. And when they get home, all of that effort collapses. That is not them being difficult at home. That is the cost of the day.</p>
        <p>Understanding what your child is experiencing means understanding the detail. Not just the label. When do they feel dysregulated? What are the flash points? Do they stim, and if so, is anyone stopping them when they should not be? Stimming (rocking, tapping, humming, flapping) is a regulation strategy, not a problem. If your child is stimming and being told to stop, that needs a conversation. The more you understand your child's specific experience, the more useful you are to everyone trying to help them.</p>
      </WordFromRich>

      {/* What autism actually is */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What autism actually is</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The core of autism is a <strong>different way of processing</strong>.</p>
            <p>Sensory input arrives differently. Social information is processed differently. Patterns and routines carry more weight. Unexpected change costs more. Communication, particularly the unspoken social kind, requires <strong>more conscious effort</strong>.</p>
            <p>None of this is visible from the outside. Which is part of the problem.</p>
            <p>An autistic child in a mainstream classroom is often doing an <strong>enormous amount of invisible work</strong> just to stay in the room. Managing sensory input that feels amplified. Decoding social cues that most children absorb automatically. Following routines that keep shifting without warning. Holding together a presentation of coping that does not reflect what is actually happening internally.</p>
            <p>That work is exhausting. And it tends to <strong>collapse the moment the child reaches somewhere they feel safe</strong>, which is usually home.</p>
          </div>
        </div>
      </section>

      {/* At school */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What it looks like at school</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Autism presents differently across children. There is <strong>no single profile</strong>.</p>
            <p>Some autistic children are quiet, compliant, and apparently fine until they are not. This is particularly common in <strong>girls</strong>, and in children who have learned to mask their differences effectively. The school reports no concerns. The parent sees a different child at home. Both are telling the truth.</p>
            <p>Some autistic children are visibly distressed in school. By noise, by change, by social demands, by sensory overload. They may refuse to enter certain rooms. They may have significant meltdowns triggered by what looks to others like a minor event.</p>
            <p>Some autistic children are <strong>twice exceptional</strong>. Highly able academically while having significant support needs in other areas. Their ability can mask their difficulties. They may not be identified because they appear to be coping.</p>
            <p className="font-medium text-foreground mt-4">What tends to be consistent across autistic children in school settings:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Transitions are hard.</strong> The space between lessons, between activities, between home and school. The predictability of what comes next matters more than most people realise.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Unstructured time is often harder than structured time.</strong> Break and lunch can be the most difficult parts of the day. The social navigation, the noise, the lack of clear rules.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Explicit is easier than implicit.</strong> Autistic children generally do better with clear, direct communication than with hints, inference, and social expectation.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Sensory environment matters.</strong> Fluorescent lighting, classroom noise levels, the texture of a uniform, the smell of the dining hall. These are not minor irritants. For some autistic children they are <strong>genuinely disabling</strong>.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* At home */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What it looks like at home</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The child who coped at school often <strong>does not cope at home</strong>. This is not a contradiction. It is the cost of masking.</p>
            <p>Meltdowns after school, refusal to eat, inability to transition from one activity to another, extreme reactions to small changes in routine. These are common and they are explainable.</p>
            <p>Your child is not being manipulative. They are not worse at home because of your parenting. They are worse at home because <strong>home is where the mask comes off</strong>. Because the suppression they maintained all day costs something, and that cost gets paid somewhere.</p>
            <p>Understanding this is important when you are describing your child to the school. <strong>"She is fine at school but very difficult at home" is not a reason to dismiss the problem.</strong> It is evidence of the scale of the effort she is making during the school day.</p>
          </div>
        </div>
      </section>

      {/* What to ask for */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What to ask for</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Reasonable adjustments for autistic children <strong>do not require a diagnosis</strong>. They require a clear description of need and a school that is willing to respond to it.</p>
            <p className="font-medium text-foreground">Common and effective adjustments include:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Advance notice of changes</strong> to routine, timetable, or staffing. Even small changes.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>A quiet space available</strong> when sensory or social overload builds. Not as a consequence. As a regulation strategy.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Structured support during unstructured time.</strong> A defined role, a quiet area, a trusted adult nearby.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Explicit rather than implicit communication</strong> from teachers. No sarcasm as instruction. No assumed understanding of unspoken social expectation.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Written or visual timetables</strong> so the shape of the day is predictable.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Sensory adjustments.</strong> Permission to wear alternative clothing, use ear defenders, sit away from high-noise areas.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>A named adult</strong> the child can go to when things feel unmanageable.</span></li>
            </ul>
            <p className="mt-2">These are not extraordinary requests. They are the kinds of adjustments that make the difference between a child who copes and a child who does not.</p>
          </div>
        </div>
      </section>

      {/* How to describe */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>How to describe autism clearly in meetings</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Avoid <strong>"she finds things difficult"</strong>. Be specific.</p>
            <div className="rounded-lg bg-muted/50 border border-border p-4 italic text-foreground">
              "My daughter experiences significant sensory overload in noisy environments. This includes the classroom during group work and the dining hall. When overload builds she becomes unable to process verbal instruction. By the time she reaches home she has typically been in a suppressed state for several hours and frequently has meltdowns lasting between 20 minutes and an hour."
            </div>
            <p>That is specific. It is evidenced by lived experience. It points to a clear need. It is what <strong>useful written evidence</strong> looks like.</p>
            <p>The more specific you can be, the more useful you are to the people trying to help your child, and the <strong>harder it is for the people who might otherwise minimise the difficulty</strong>.</p>
          </div>
        </div>
      </section>

      {/* Diagnosis and waiting */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>On diagnosis and waiting lists</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Waiting times for autism assessment through the NHS currently run to <strong>years</strong> in most parts of England. Private assessment is available but costly and not accessible to most families.</p>
            <p><strong>You do not have to wait.</strong></p>
            <p>A school can identify a child as having SEND and put support in place based on observed need, without a diagnosis. An EHCP assessment can be requested without a diagnosis. Reasonable adjustments can be made without a diagnosis.</p>
            <p>What helps while you wait is <strong>evidence</strong>. Document what you observe. Get the school to document what they observe. Ask for written records of incidents, interventions, and outcomes. Build the picture now so that when assessment happens, or when you need to push for one, you have something concrete to work with.</p>
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/what-we-owe-our-children" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                → How to build an evidence jacket
              </Link>
              <Link to="/what-to-do-right-now" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                → What to do if the system is failing your child
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Confidence label */}
      <section className="content-section py-4">
        <ConfidenceLabel status="confirmed">
          School-based SEND support and EHCP assessment requests <strong>do not require a prior diagnosis</strong>.
        </ConfidenceLabel>
      </section>

      {/* Further reading */}
      <section className="content-section py-6">
        <h2 className="text-base font-display font-semibold text-foreground mb-4">Further reading</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-foreground">Resource</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">What it covers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3">
                  <a href="https://www.autism.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                    National Autistic Society <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">Detailed guides on autism in education, diagnosis, and support</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <a href="https://www.ambitiousaboutautism.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                    Ambitious about Autism <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">School-focused resources and reasonable adjustments guidance</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <a href="https://www.ipsea.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                    IPSEA <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">Legal rights around EHCP and school support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-link */}
      <section className="content-section py-4 pb-8">
        <Link
          to="/understanding-your-child/adhd"
          className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Also in this section</p>
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">ADHD - Understanding Your Child</p>
          </div>
          <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180 group-hover:text-primary transition-colors" />
        </Link>
      </section>
    </Layout>
  );
}
