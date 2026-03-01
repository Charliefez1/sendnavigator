import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, ArrowLeft, Zap } from "lucide-react";
import { ConfidenceLabel } from "@/components/ConfidenceLabel";
import { WordFromRich } from "@/components/WordFromRich";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-display font-semibold text-foreground mt-10 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

export default function UnderstandingADHD() {
  return (
    <Layout>
      <SEOHead
        title="ADHD - Understanding Your Child"
        description="What ADHD actually is, how the dopamine system works differently, what it looks like at school and home, and what reasonable adjustments make a practical difference."
        path="/understanding-your-child/adhd"
      />

      <PageOrientation
        icon={Zap}
        sectionLabel="Understanding Your Child"
        title="ADHD"
        description="ADHD is a difference in how the brain manages attention, motivation, impulse control, and emotional regulation. It is a lifelong neurological profile — not caused by bad parenting, too much screen time, or lack of effort."
        accentColor="hsl(330 60% 52%)"
      />

      <WordFromRich>
        <p>I am autistic. I have ADHD. I am dyslexic. For a long time I thought those things were problems to manage. They are not. They are a different operating system. One that most schools and systems were not designed around.</p>
        <p>What I know from the inside is this. Your child is probably working very hard to hold it together in school. Masking takes real effort. And when they get home, all of that effort collapses. That is not them being difficult at home. That is the cost of the day.</p>
        <p>Understanding what your child is experiencing means understanding the detail. Not just the label. When do they feel dysregulated? What are the flash points? Do they stim, and if so, is anyone stopping them when they should not be? Stimming (rocking, tapping, humming, flapping) is a regulation strategy, not a problem. If your child is stimming and being told to stop, that needs a conversation. The more you understand your child's specific experience, the more useful you are to everyone trying to help them.</p>
      </WordFromRich>

      {/* How the ADHD brain works */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>How the ADHD brain actually works</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p><strong>The key is dopamine.</strong></p>
            <p>Dopamine is the brain's motivation and reward system. It drives the ability to start tasks, sustain attention, manage impulses, and regulate emotions. In ADHD, this system works differently. The brain does not produce or use dopamine in the same way, which means the <strong>automatic processes that most people take for granted require conscious effort</strong>, and often still do not work reliably.</p>
            <p>The result is a brain that struggles to engage with tasks it finds unstimulating, cannot easily filter what is and is not worth paying attention to, shifts rapidly between states of <strong>intense focus and complete disengagement</strong>, and reacts more strongly to frustration, boredom, and perceived failure.</p>
            <p>This is not laziness. It is not a choice. It is a brain that is <strong>working harder than most</strong> to do things that most people do without thinking.</p>
            <p>The same brain, given something genuinely interesting, can produce <strong>hyperfocus</strong>. An intense, sustained, highly productive engagement that looks nothing like the ADHD the school describes. Both are real. Both are the same brain. The variable is stimulation and meaning, not effort or willingness.</p>
          </div>
        </div>
      </section>

      {/* At school */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What it looks like at school</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>ADHD in a school setting runs into <strong>specific and predictable friction points</strong>.</p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Sitting still for extended periods</strong> goes against how the ADHD nervous system regulates itself. Movement is not misbehaviour. It is often the body trying to maintain enough arousal to stay engaged.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Starting tasks is genuinely hard.</strong> The gap between "I need to do this" and actually beginning is much wider in ADHD. This looks like avoidance. It is usually not. It is a real difficulty with initiation.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Transitions are disruptive.</strong> Switching from one task to another requires the kind of flexible attention shifting that ADHD makes genuinely difficult.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Time blindness is real.</strong> Children with ADHD often have a distorted relationship with time. Deadlines do not produce the same urgency. This is neurological, not motivational.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Emotional regulation is harder.</strong> Frustration that most children can suppress can arrive as a visible reaction. This is frequently misread as a behaviour problem when it is a regulation difference.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>The gap between ability and output</strong> is often significant. A child may clearly understand the material and consistently underperform in written work. The school sees inconsistency. The parent sees a child who is trying. Both are right.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* At home */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What it looks like at home</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The ADHD child at home after a school day has usually spent hours <strong>suppressing impulses, forcing attention, managing social demands</strong>, and absorbing correction after correction. By the time they get home the regulatory system is depleted.</p>
            <p>This shows as inability to do homework, explosive reactions to minor requests, inability to transition off screens, difficulty eating, and often a prolonged period of chaotic behaviour before crash and exhaustion.</p>
            <p><strong>Screen and gaming use</strong> is a specific issue worth naming directly. The ADHD brain responds strongly to the unpredictable reward loops in games and social media. These platforms are engineered around exactly the kind of stimulation that the ADHD dopamine system responds to. This makes disengagement genuinely hard, <strong>harder than for neurotypical children</strong>, and removal genuinely distressing, not because of defiance but because of how the nervous system experiences the withdrawal.</p>
            <p>This does not mean unlimited access is the right approach. It means that managing screen use with an ADHD child requires understanding what is actually happening, and responding with <strong>structure and consistency</strong> rather than sudden removal and consequences.</p>
          </div>
        </div>
      </section>

      {/* What to ask for */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>What to ask for</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Reasonable adjustments for ADHD in school settings are often <strong>straightforward to implement and significant in their effect</strong>.</p>
            <ul className="space-y-2 ml-1">
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Movement breaks</strong> built into the school day. Not as reward. As a regulation strategy.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Flexible seating.</strong> A child who can stand, kneel, or use a wobble cushion is often able to concentrate better than one spending energy suppressing the need to move.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Tasks broken into shorter segments</strong> with clear checkpoints. Short, structured tasks with clear beginnings and ends are much more manageable.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Timers and visual time cues.</strong> Because time blindness is real, external cues that make time visible help with planning, transitions, and task completion.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Proximity to the teacher</strong>, away from high-distraction areas. Seating matters more than most schools realise.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Extended time in assessments.</strong> Processing and initiation take longer. Extended time addresses a genuine need, not an unfair advantage.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>Reduced homework load</strong> or flexible homework formats. The evening is often when ADHD children have the least regulatory capacity.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong>A trusted adult to check in with.</strong> Someone who helps them plan the day, review what is needed, and manage transitions.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to describe */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>How to describe ADHD clearly in meetings</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Avoid <strong>"he just cannot concentrate"</strong>. Be specific.</p>
            <div className="rounded-lg bg-muted/50 border border-border p-4 italic text-foreground">
              "My son has significant difficulty initiating tasks without external structure and support. He can hyperfocus for extended periods on topics he finds genuinely engaging, but requires scaffolding to begin work in most school contexts. He experiences emotional dysregulation under frustration, which can present as outbursts that are brief but intense. His written output does not reflect his verbal ability or his understanding of the material."
            </div>
            <p>That description points to specific adjustments. It separates ability from output. It is <strong>harder to minimise</strong>.</p>
          </div>
        </div>
      </section>

      {/* Diagnosis and waiting */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SectionHeading>On diagnosis and waiting lists</SectionHeading>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>NHS waiting times for ADHD assessment in England are significant, often <strong>two to four years</strong> in many areas. Private assessment exists but is expensive and inaccessible to many families.</p>
            <p>The practical position is the same as with autism. <strong>You do not need a diagnosis</strong> to request support, ask for reasonable adjustments, or pursue an EHCP.</p>
            <p>What helps while you wait is <strong>consistent, dated documentation</strong>. Your observations at home. The school's observations in class. Incident logs. Teacher reports. Evidence that the difficulty is persistent, pervasive, and affecting the child's ability to access education.</p>
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
                  <a href="https://www.adhduk.co.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                    ADHD UK <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">UK-specific guidance, waiting list information, lived experience</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <a href="https://chadd.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                    CHADD <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">Evidence-based information on ADHD across home and school</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <a href="https://www.addiss.co.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                    ADDISS <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">UK information and support service for ADHD</td>
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
          to="/understanding-your-child/autism"
          className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group"
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Also in this section</p>
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">Autism - Understanding Your Child</p>
          </div>
          <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180 group-hover:text-primary transition-colors" />
        </Link>
      </section>
    </Layout>
  );
}
