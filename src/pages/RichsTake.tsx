import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Clock, ExternalLink } from "lucide-react";
import gritImage from "@/assets/resource-grit-wont-save.jpg";
import diagnosisImage from "@/assets/resource-real-diagnosis.jpg";
import awbpImage from "@/assets/resource-awbp.png";
import smartphoneFreeImage from "@/assets/resource-smartphone-free.png";

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

          <p><strong>This isn't a neutral page.</strong></p>
          <p>The rest of this site is facts. Evidence. What we know, what we don't, what's changed.</p>
          <p>This is my take. As a SEND dad. As someone who has been inside this system for a long time.</p>

          <ArticleHeading>We welcome this. And we mean it.</ArticleHeading>
          <p>Two documents. Billions of pounds. A government saying plainly that the SEND system has been failing children and families for too long.</p>
          <p>That matters. We should say so.</p>
          <p>For years, families were told the system was working and they were the problem. Too demanding. Too anxious. Not consistent enough at home. The white paper and the consultation document both say something different. They say children with SEND are not getting what they need. That the system has let them down. That this has to change.</p>
          <p>That acknowledgement is not nothing. It is overdue. And we welcome the intent behind it.</p>
          <p>The funding is significant. The Inclusive Mainstream Fund. The Experts at Hand programme. The workforce investment. These are real commitments, not just words on a page.</p>
          <p>We want this to work. We genuinely do.</p>
          <p>But we also have to ask the harder question. Because if we don't ask it now, while the consultation is open and the policy is still being shaped, we may spend the next decade building a better version of something that was already the wrong thing.</p>

          <ArticleHeading>Is SEND the problem? Or is it the system that keeps creating it?</ArticleHeading>
          <p>SEND costs are rising. EHCPs have doubled since 2014. More children than at any point in the last fifty years are now in special schools. Persistent absence is at record highs. Mental health referrals are overwhelming services. Waiting lists run to years in some areas.</p>
          <p>Everyone agrees something has gone wrong.</p>
          <p>But here is the question nobody in either document is asking directly.</p>
          <p><strong>Why?</strong></p>
          <p>Not how do we manage it better. Not how do we fund it more efficiently. But why is this happening? Why are more and more children struggling to function in mainstream education? Why are the numbers going up year on year regardless of how much money we put in?</p>
          <p>Because if the answer is that children are changing, then we need to understand what is changing them.</p>
          <p>And if the answer is that the system is no longer fit for the children it serves, then no amount of money poured into that system will fix the underlying problem.</p>
          <p>I think it is both. And I think we are only talking about one of them.</p>

          <ArticleHeading>We built a system in the 1890s. We are still running it.</ArticleHeading>
          <p>The education system we have today was designed for a different world. A world where the economy needed compliant workers who could follow instructions, sit still, absorb information in silence, and be assessed against a narrow standard. A world where difference was inconvenient, deviation was corrected, and the goal was uniformity.</p>
          <p>That world does not exist anymore. But the system does.</p>
          <p>We still measure children against a narrow academic benchmark and call those who do not reach it failures. We still treat behaviour as something to punish rather than as feedback on a situation that is not working. We still prioritise test results over developmental needs. We still favour control over autonomy. We still leave little time or space for meaningful relationships between adults and children.</p>
          <p>And then we wonder why so many children cannot function within it.</p>
          <p>Up to 50% of Gen Z now identify as neurodivergent. Whether that reflects better identification, changing environments, or genuine shifts in how brains are developing, it tells us something important. The mould was never right for this many people. Maybe it was never right at all.</p>
          <p>The rise in SEND is not a crisis of children. It is a crisis of fit. A growing gap between how children actually are and what the system was designed to accommodate.</p>
          <p>More play for younger children. More autonomy for older ones. More diversity of opportunity. More focus on relationships. Learning that connects to purpose rather than to tests.</p>
          <p>It is not complicated. The more you squeeze children into a narrow standard, the more children cannot fit. That is not a SEND crisis. That is a design flaw.</p>

          <ArticleHeading>Then we gave children dopamine on demand.</ArticleHeading>
          <p>Before we even get to school, something else has shifted.</p>
          <p>We handed children smartphones. Devices engineered by some of the most sophisticated behaviour design teams in the world, built to deliver instant reward, to hold attention, to make everything else feel slow and flat by comparison.</p>
          <p>For a neurotypical child that is a significant challenge. For a child whose brain already processes dopamine differently, whose attention system already struggles in low-stimulus environments, whose emotional regulation is already stretched, it is a different level of problem entirely.</p>
          <p>We then sit those children in classrooms designed in the nineteenth century and ask them to be still, be quiet, look at a board, and wait their turn.</p>
          <p>And we are surprised when it does not work.</p>
          <p>By ten years old, a neurodivergent child has received an estimated 20,000 more negative comments from adults than their neurotypical peers. Twenty thousand times they have been told they are doing it wrong. That they are too much. That they need to try harder, sit stiller, speak less, focus more.</p>
          <p>The anxiety, the rejection sensitivity, the emotional dysregulation, the school avoidance. These are not features of neurodivergence. They are what happens to a child who has been trying to fit somewhere they do not fit, for too long, without enough support from the people around them.</p>
          <p>The smartphone piece is not separate from the SEND conversation. It is part of it. Neither document mentions it seriously.</p>

          <ArticleHeading>The architecture of the new system has a real hole in it.</ArticleHeading>
          <p>We welcome Individual Support Plans in principle. Getting support to children earlier, without the need for a statutory plan, is right. The current system forces families into a battle for an EHCP just to access basic help. That needs to change.</p>
          <p>But ISPs are school-led. Schools create them. Schools review them. And if your school gets it wrong, your route to challenge is a complaints panel. Not a Tribunal.</p>
          <p>The SEND Tribunal has been the single most effective protection families have had. Around 95% of parents who appeal win. That number tells you everything about how often children are being failed before they even reach a hearing.</p>
          <p>EHCPs are now being reserved for the most complex needs only, under new Specialist Provision Package thresholds that have not yet been defined. Which means more children on ISPs. Which means more children with no Tribunal route.</p>
          <p>The consultation also revealed something that has not been talked about enough. The £6,000 notional EHCP funding threshold has been frozen since 2013. Based on costs from 2009. That is a more than 50% decrease in real terms. Families have not been demanding too much. The real-terms support they were entitled to quietly halved, and nobody said anything.</p>
          <p>That is not a family problem. That is a system problem. And it is part of why EHCP numbers doubled. Families were not becoming more demanding. The floor dropped away beneath them.</p>

          <ArticleHeading>Neurodivergent children are almost invisible in this document.</ArticleHeading>
          <p>The word neurodivergent does not appear in the white paper. Not once.</p>
          <p>ADHD is mentioned twice.</p>
          <p>The government's own Independent Neurodivergence Task and Finish Group, reporting in February 2026, said schools need better training on neurodivergence. That group's words appear in the consultation document. The government's own language does not reflect them.</p>
          <p>Masking is not mentioned. Emotionally based school avoidance is not mentioned. Identification failures for girls are not mentioned. Late diagnosis is not mentioned. The children who hold it together at school and fall apart at home. The children excluded not because they are violent but because nobody understands what is happening for them.</p>
          <p>The rise in EHCPs is being driven primarily by autism, social emotional and mental health needs, and speech language and communication needs. Not complex physical or learning disabilities. These are exactly the children most likely to be neurodivergent, most likely to be masking, most likely to have been missed for years. The document acknowledges the numbers. It does not connect them to why.</p>
          <p><strong>That is not an oversight. That is a failure of imagination. And it will cost children.</strong></p>

          <ArticleHeading>And then we blamed the parents.</ArticleHeading>
          <p>Parents of neurodivergent children know this pattern.</p>
          <p>You raise a concern. You are told to wait. You push harder. You are told you are anxious. You push harder still. You are told your child just needs firmer boundaries, more routine, less screen time.</p>
          <p>You become the expert on your own child through sheer necessity, because nobody else is doing it. You learn the law. You learn the paperwork. You learn to advocate in rooms where the system has more power than you do.</p>
          <p>And still, somewhere underneath it all, the implication sits that if you were doing it right, your child would be fine.</p>
          <p>That implication is wrong. It has always been wrong.</p>
          <p>The system did not fail because parents asked for too much. It failed because it gave too little, for too long, to too many children.</p>

          <ArticleHeading>This is not only the system's problem. And it is not only the school's.</ArticleHeading>
          <p>Teachers are carrying something that does not get talked about enough.</p>
          <p>Every day, teachers are holding the weight of children whose needs have not been understood at home. Not because those parents do not love their children. Most do, deeply. But love is not the same as understanding. And understanding does not come automatically.</p>
          <p>Some parents wait for the school to fix it. Wait for the diagnosis to explain it. Wait for the system to name it, fund it, and sort it. And meanwhile the teacher is in a room with thirty children, with one child who is drowning, and a parent who has not yet accepted that this is also theirs to carry.</p>
          <p>That is not fair on teachers. And it is not fair on the child.</p>
          <p>Families are not off the hook.</p>
          <p>Understanding your child is your responsibility. Advocating for your child is your responsibility. The system should support you in that. But it cannot replace you. Nobody knows your child the way you do. Nobody has the access you have. Nobody can be present with them in the way you can.</p>
          <p>So much happens outside school. In whether a child is believed when they say something is hard. In whether they are valued for who they are, not just measured against what they can produce. In whether the adults around them are curious about them rather than frustrated by them.</p>
          <p>Having a child who meets the threshold for SEND is not a failure. Not yours. Not the school's. And absolutely not theirs.</p>
          <p>But a diagnosis is not the finish line. It is not permission to hand the child over and step back.</p>
          <p>When a child is struggling, the instinct is often to push harder. More effort. More attendance. More intervention. And for some children, for a while, that works.</p>
          <p>But for a child who already feels like a failure, more pressure does not produce more progress. It produces more shame. And shame compounds quietly, over years, in a child who has learned that the world does not have space for them as they are.</p>
          <p>Did we believe them? Did we listen? Did we find ways to be with them rather than manage them?</p>
          <p>Not just the school. Not just the system.</p>
          <p><strong>Us.</strong></p>

          <ArticleHeading>The workforce problem is not solved.</ArticleHeading>
          <p>The government will train 200 new educational psychologists a year from 2026. Speech and language therapy waiting lists in some areas run to two years. Occupational therapy access is a postcode lottery.</p>
          <p>Experts at Hand is a good idea. It will only work if the experts exist. Right now, in many areas, they do not.</p>
          <p>I want to be wrong about this. I hope I am.</p>

          <ArticleHeading>What I think parents should do right now.</ArticleHeading>
          <p><strong>Do not relax because the documents sound positive.</strong> The current system and current rights are what protect your child today. Use them.</p>
          <p>If your child needs an EHCP assessment, request it now. Do not wait for the new system. The current legal threshold is the right one to use. The new thresholds will be higher.</p>
          <p>Respond to the consultation. The <Link to="/have-your-say" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">Have Your Say</Link> page on this site has guidance on how to do that in a way that carries weight. This is where parent voices shape what the legislation actually says.</p>
          <p>Watch what happens with the Specialist Provision Package thresholds. That is where eligibility will be won or lost. Those thresholds have not been defined yet. That is the most important decision still to be made in this entire reform.</p>

          <ArticleHeading>My honest verdict.</ArticleHeading>
          <p>The ambition is right. The intent feels genuine. The scale of investment is real.</p>
          <p>But we are trying to fix a SEND crisis without asking why it exists.</p>
          <p>The architecture has a gap where legal rights used to be.</p>
          <p>Neurodivergent children are close to invisible in the language of this reform.</p>
          <p>The funding has a cliff edge in 2029.</p>
          <p>The workforce cannot be built fast enough.</p>
          <p>And the system we are investing in was designed in the 1890s for a world that no longer exists.</p>
          <p>We do not just need a better SEND system. We need a different kind of school. One that starts from what children need to thrive. One that sees difference as information, not inconvenience. One that values relationships over results, curiosity over compliance, and belonging over performance.</p>
          <p>That is a bigger conversation than either of these documents is having.</p>
          <p>But it is the conversation we need.</p>
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
              image={gritImage}
            />
            <ArticleLink
              href="https://www.linkedin.com/pulse/real-diagnosis-outdated-systems-neurodivergent-world-rich-ferriman-4zs3e/"
              title="The Real Diagnosis: Outdated Systems in a Neurodivergent World"
              source="LinkedIn"
              image={diagnosisImage}
            />
            <ArticleLink
              href="https://awbp.neuro.support/"
              title="Are We Bad Parents?"
              source="neuro.support"
              image={awbpImage}
            />
            <ArticleLink
              href="https://smartphonefree.neurodiversityglobal.com/"
              title="The Day We Gave Children Dopamine on Demand"
              source="Neurodiversity Global"
              image={smartphoneFreeImage}
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

function ArticleLink({ href, title, source, image }: { href: string; title: string; source: string; image: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors group overflow-hidden flex flex-col"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
      <div className="p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground group-hover:text-[hsl(var(--accent-violet))] transition-colors leading-snug">
            {title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{source}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
      </div>
    </a>
  );
}
