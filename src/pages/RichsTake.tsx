import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Clock, ExternalLink } from "lucide-react";

export default function RichsTake() {
  return (
    <Layout>
      <SEOHead
        title="Rich's Take"
        description="What Rich Ferriman thinks about the Schools White Paper. Not neutral. Not spin. Just honest."
        path="/richs-take"
      />

      {/* Header */}
      <header className="content-section py-8 sm:py-10 border-b border-border">
        <div className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--accent-violet-bg))] border border-[hsl(var(--accent-violet)/0.3)] text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent-violet))] mb-4">
          Editorial. This is Rich's personal view.
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          Rich's Take
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          What Rich Ferriman thinks about the Schools White Paper. Not neutral. Not spin. Just honest.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span>Last updated: 23rd February 2026</span>
        </div>
      </header>

      {/* Article body */}
      <article className="content-section py-8 sm:py-10 max-w-2xl">
        <div className="prose-calm text-sm leading-relaxed space-y-6">

          <p><strong>This is not a neutral page.</strong></p>
          <p>Everything else on this site tries to give you the facts without a view. This page is different. This is what I think. You can disagree. But you deserve to know where I stand.</p>

          <ArticleHeading>The system was broken. The government knows it.</ArticleHeading>
          <p>That matters. For years families were told the system was working and they were the problem. Too demanding. Too anxious. Not trying hard enough to make things work.</p>
          <p>This white paper says plainly that children with SEND are not succeeding as they should. That too many have been told they cannot thrive in mainstream schools.</p>
          <p>That acknowledgement is not nothing. It is overdue. And it is correct.</p>

          <ArticleHeading>The money is real. For now.</ArticleHeading>
          <p>£4bn is significant. The Inclusive Mainstream Fund, the Experts at Hand programme, the workforce investment. These are not imaginary numbers.</p>
          <p>But the funding runs to 2029. What happens after that is not confirmed. We have been here before with SEND investment that front-loads ambition and quietly disappears. I will believe the long-term commitment when I see a long-term plan.</p>
          <p><strong>Ask your MP what happens to SEND funding from 2029.</strong> That question matters more than almost anything else in this document.</p>

          <ArticleHeading>The architecture has a serious hole.</ArticleHeading>
          <p>Here is what concerns me most.</p>
          <p>Individual Support Plans are school-led. Schools create them. Schools review them. And if your school gets it wrong, your route to challenge is a complaints panel.</p>
          <p><strong>Not a Tribunal. A complaints panel.</strong></p>
          <p>The SEND Tribunal has been the single most effective protection for families in this system. Around 95% of parents who appeal win. That number tells you everything about how often children are being failed before they get anywhere near a hearing.</p>
          <p>ISPs remove that route for the majority of children.</p>
          <p>The government says the Tribunal remains for children with EHCPs. That is true. But EHCPs are being reserved for the most complex needs only under the new thresholds. Which means more children will be on ISPs. Which means more children will have no Tribunal route.</p>
          <p><strong>That is not a technical detail. That is the mechanism that has protected the most vulnerable children being quietly removed from reach.</strong></p>
          <p>I am not saying the government intends harm. I am saying the consequence is harm if this goes wrong. And given the history of this system, the probability of it going wrong in places is high.</p>

          <ArticleHeading>Neurodivergent children are almost invisible in this document.</ArticleHeading>
          <p>The word neurodivergent does not appear in the white paper. Not once.</p>
          <p>ADHD is mentioned twice.</p>
          <p>Masking is not mentioned. Emotionally based school avoidance is not mentioned. Identification failures for girls are not mentioned. Late diagnosis is not mentioned. The children who present well enough to be missed, who hold it together at school and fall apart at home, who are excluded not because they are violent but because nobody understands what is happening for them. Not in this document.</p>
          <p><strong>That is not an oversight. That is a failure of imagination. And it will cost children.</strong></p>

          <ArticleHeading>Nobody is connecting the dots.</ArticleHeading>
          <p>SEND costs are rising. Everyone agrees on that. What nobody in this white paper is willing to say is why.</p>
          <p>More and more children need extra support at school. That is not because there is something wrong with our children. It is because the school system lacks the flexibility to accommodate the many different ways children learn and develop.</p>
          <p>We have built a system that treats behaviour as something to punish rather than feedback on a situation that is not working. A system that prioritises test results over developmental needs. That favours control over autonomy. That leaves little time or space for meaningful relationships between adults and children.</p>
          <p>It turns too many children into failures. It measures them against a narrow academic benchmark and finds them wanting. It punishes minor misdemeanours and teaches them that learning is mostly about doing what you are told. It prioritises attendance over meaningful engagement.</p>
          <p>And then when children show us that this is not working, we say there is something wrong with them. We say they need to attend more, try harder, put more effort in. And when that does not work, the system concludes they must have SEND. Because why else would they need something different?</p>
          <p>Of course SEND costs are rising. The school system is not fit for the children it serves.</p>
          <p>We do not need a more efficient version of the same broken model. We need a system that starts from what children need to thrive. Not from driving up standards or hitting 100% attendance.</p>
          <p>More play for the younger ones. More autonomy for the older ones. More diversity of opportunity. More focus on relationships. An emphasis on interest-led learning and finding purpose rather than on tests and exams.</p>
          <p>It is not complicated. The more you squeeze children into a narrow standard, the more children cannot fit. That is not a SEND crisis. That is a design flaw.</p>

          <ArticleHeading>Then we gave children dopamine on demand.</ArticleHeading>
          <p>Before we even get to school, something else has shifted.</p>
          <p>We handed children smartphones. Devices engineered by some of the most sophisticated behaviour design teams in the world, optimised to deliver instant reward, to hold attention, to make everything else feel slow and grey by comparison.</p>
          <p>For a neurotypical child that is a significant challenge. For a child whose brain already processes dopamine differently, whose attention system already struggles with low-stimulus environments, whose emotional regulation is already stretched, it is a different level of problem entirely.</p>
          <p>We then sit those children in classrooms designed in the nineteenth century, ask them to be still, be quiet, look at a board, and wait their turn. And we are surprised when it does not work.</p>
          <p>The smartphone piece is not separate from the SEND conversation. It is part of it. And this white paper does not mention it once.</p>

          <ArticleHeading>And then we blamed the parents.</ArticleHeading>
          <p>Parents of neurodivergent children know this pattern intimately.</p>
          <p>You raise a concern. You are told to wait. You push harder. You are told you are anxious. You push harder still. You are told your child just needs firmer boundaries, more routine, less screen time, a better diet.</p>
          <p>You become the expert on your own child through sheer necessity, because nobody else is doing it. You learn the law. You learn the paperwork. You learn to advocate in rooms where the system has more power than you do.</p>
          <p>And still, somewhere underneath all of it, the implication sits that if you were doing it right, your child would be fine.</p>
          <p>That implication is wrong. It has always been wrong. The white paper does not address it directly, but the scale of what it is trying to fix is, in part, the consequence of years of parents being dismissed, delayed, and blamed while their children fell further behind.</p>
          <p>The system did not fail because parents asked for too much. It failed because it gave too little, for too long, to too many children.</p>

          <ArticleHeading>This is not only the system's problem. And it is not only the school's.</ArticleHeading>
          <p>Teachers are carrying something that does not get talked about enough.</p>
          <p>Every day, in classrooms across the country, teachers are holding the weight of children whose needs have not been met at home. Not because those parents do not love their children. Most do, deeply. But love is not the same as understanding. And understanding does not come automatically.</p>
          <p>Some parents wait for the school to fix it. Wait for the diagnosis to explain it. Wait for the system to name it, fund it, and sort it. And meanwhile the teacher is in a classroom of thirty children, with one child in front of them who is drowning, and a parent who has not yet accepted that this is also theirs to carry.</p>
          <p>That is not fair on teachers. And in the end, it is not fair on the child.</p>
          <p>Families are not off the hook here.</p>
          <p>Understanding your child is your responsibility. Advocating for your child is your responsibility. The system should support you in that. But it cannot replace you in it. Nobody knows your child the way you do. Nobody has the access you have. Nobody can be present with them in the way you can.</p>
          <p>And so much happens outside school. In the way a child is spoken to at home. In whether they are believed when they say something is hard. In whether they are valued for who they are, not just measured against what they can produce. In whether the adults around them are curious about them, rather than frustrated by them.</p>
          <p>A child who meets the threshold for SEND has not failed. That matters. But it also needs to be said clearly: a diagnosis or a label is not the finish line. It is not permission to hand the child over to a system and step back.</p>
          <p>When a child is struggling, the instinct is often to push harder. More effort. More attendance. More intervention. And for some children, for a while, that works.</p>
          <p>But for a child who already feels like a failure, more pressure does not produce more progress. It produces more shame. And shame compounds. It accumulates quietly, over years, in a child who has learned that the world does not have space for them as they are.</p>
          <p>The anxiety, the rejection sensitivity, the emotional dysregulation, the school avoidance. These are not features of neurodivergence. They are what happens to a child who has been trying to fit somewhere they do not fit, for too long, without enough support from the people around them.</p>
          <p>We can medicalise that. We can refer it, diagnose it, and add it to an EHCP. Or we can ask an earlier question.</p>
          <p>Did we believe them? Did we listen? Did we find ways to be with them rather than manage them?</p>
          <p>Not just the school. Not just the system.</p>
          <p><strong>Us.</strong></p>

          <ArticleHeading>The workforce problem is not solved.</ArticleHeading>
          <p>The government will train 200 new educational psychologists a year from 2026. That sounds significant until you understand the scale of the shortage. Speech and language therapy waiting lists in some areas run to two years. Occupational therapy access is a postcode lottery.</p>
          <p>Experts at Hand is a good idea. It will only work if the experts exist. Right now, in many areas, they do not.</p>
          <p>I want to be wrong about this. I hope I am.</p>

          <ArticleHeading>What I think parents should do right now.</ArticleHeading>
          <p><strong>Do not relax because the white paper sounds positive.</strong> The current system and current rights are what protect your child today. Use them.</p>
          <p>If your child needs an EHCP assessment, request it now. Do not wait for the new system. The current legal threshold is the right one to use. The new thresholds will be higher.</p>
          <p>Respond to the consultation. This is where parent voices shape what the legislation actually says. The <Link to="/have-your-say" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">Have Your Say</Link> page has guidance on how to do that in a way that carries weight.</p>
          <p>Watch what happens with the Specialist Provision Package thresholds. That is where eligibility will be won or lost. Those thresholds have not been defined yet. That is the most important decision still to be made.</p>

          <ArticleHeading>My honest verdict.</ArticleHeading>
          <p>The ambition is right. The system needed this level of intervention.</p>
          <p>The architecture has a serious gap where legal rights used to be.</p>
          <p>Neurodivergent children are close to invisible in this document.</p>
          <p>The funding has a cliff edge in 2029.</p>
          <p>The workforce cannot be built fast enough without sustained investment and a serious recruitment strategy.</p>
          <p>Nobody in the white paper is asking why SEND demand is rising. Until we answer that question honestly, we will keep treating symptoms and missing the cause.</p>
          <p><strong>This is a beginning. It is not a solution. And the gap between those two things is where too many children will still fall.</strong></p>
          <p>I will keep watching. I will keep updating this site. And I will keep saying what I see.</p>
          <p>That is what this site is for.</p>
        </div>

        {/* Sign-off */}
        <div className="border-l-4 border-l-[hsl(var(--accent-violet))] bg-[hsl(var(--accent-violet-bg))] border border-[hsl(var(--accent-violet)/0.2)] rounded-xl p-5 sm:p-6 mt-10">
          <p className="font-display font-semibold text-foreground">Rich Ferriman</p>
          <p className="text-sm text-muted-foreground mt-1">Founder, Neurodiversity Global</p>
          <p className="text-sm text-muted-foreground">Father of four neurodivergent children</p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <Link to="/questions-and-answers" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">
              Ask Rich a question
            </Link>
            <Link to="/feedback" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">
              Leave feedback
            </Link>
          </div>
        </div>

        {/* More from Rich */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-display font-semibold text-foreground mb-5">More from Rich</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ArticleLink
              href="https://www.linkedin.com/pulse/grit-wont-save-children-system-isnt-built-them-rich-ferriman-ye5oe/"
              title="Grit Won't Save Children the System Isn't Built for Them"
              source="LinkedIn"
            />
            <ArticleLink
              href="https://www.linkedin.com/pulse/real-diagnosis-outdated-systems-neurodivergent-world-rich-ferriman-4zs3e/"
              title="The Real Diagnosis: Outdated Systems in a Neurodivergent World"
              source="LinkedIn"
            />
            <ArticleLink
              href="https://awbp.neuro.support/"
              title="A World Built for People"
              source="neuro.support"
            />
            <ArticleLink
              href="https://smartphonefree.neurodiversityglobal.com/"
              title="Smartphone Free"
              source="Neurodiversity Global"
            />
          </div>
        </div>
      </article>

      <div className="content-section pb-16" />
    </Layout>
  );
}

function ArticleHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-display font-semibold text-foreground pt-4 pb-1 border-b border-border/50">
      {children}
    </h2>
  );
}

function ArticleLink({ href, title, source }: { href: string; title: string; source: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground group-hover:text-[hsl(var(--accent-violet))] transition-colors leading-snug">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{source}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
    </a>
  );
}
