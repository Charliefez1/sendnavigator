import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export default function RichsTake() {
  return (
    <Layout>
      <SEOHead
        title="Rich's Take"
        description="What Rich Ferriman thinks about the Schools White Paper. Not neutral. Not spin. Just honest."
        path="/richs-take"
      />

      {/* Header with violet accent */}
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

      {/* Editorial content with violet left-border treatment */}
      <section className="content-section py-8 space-y-6">

        <EditorialBlock>
          <p><strong>This is not a neutral page.</strong></p>
          <p>Everything else on this site tries to give you the facts without a view. This page is different. This is what I think. You can disagree. But you deserve to know where I stand.</p>
        </EditorialBlock>

        <EditorialBlock heading="The system was broken. The government knows it.">
          <p>That matters. For years families were told the system was working and they were the problem. Too demanding. Too anxious. Not trying hard enough to make things work.</p>
          <p>This white paper says plainly that children with SEND are not succeeding as they should. That too many have been told they cannot thrive in mainstream schools.</p>
          <p>That acknowledgement is not nothing. It is overdue. And it is correct.</p>
        </EditorialBlock>

        <EditorialBlock heading="The money is real. For now.">
          <p>£4bn is significant. The Inclusive Mainstream Fund, the Experts at Hand programme, the workforce investment. These are not imaginary numbers.</p>
          <p>But the funding runs to 2029. What happens after that is not confirmed. We have been here before with SEND investment that front-loads ambition and quietly disappears. I will believe the long-term commitment when I see a long-term plan.</p>
          <p><strong>Ask your MP what happens to SEND funding from 2029.</strong> That question matters more than almost anything else in this document.</p>
        </EditorialBlock>

        <EditorialBlock heading="The architecture has a serious hole.">
          <p>Here is what concerns me most.</p>
          <p>Individual Support Plans are school-led. Schools create them. Schools review them. And if your school gets it wrong, your route to challenge is a complaints panel.</p>
          <p><strong>Not a Tribunal. A complaints panel.</strong></p>
          <p>The SEND Tribunal has been the single most effective protection for families in this system. Around 95% of parents who appeal win. That number tells you everything about how often children are being failed before they get anywhere near a hearing.</p>
          <p>ISPs remove that route for the majority of children.</p>
          <p>The government says the Tribunal remains for children with EHCPs. That is true. But EHCPs are being reserved for the most complex needs only under the new thresholds. Which means more children will be on ISPs. Which means more children will have no Tribunal route.</p>
          <p><strong>That is not a technical detail. That is the mechanism that has protected the most vulnerable children being quietly removed from reach.</strong></p>
          <p>I am not saying the government intends harm. I am saying the consequence is harm if this goes wrong. And given the history of this system, the probability of it going wrong in places is high.</p>
        </EditorialBlock>

        <EditorialBlock heading="Neurodivergent children are almost invisible in this document.">
          <p>The word neurodivergent does not appear in the white paper. Not once.</p>
          <p>ADHD is mentioned twice.</p>
          <p>Masking is not mentioned. Emotionally based school avoidance is not mentioned. Identification failures for girls are not mentioned. Late diagnosis is not mentioned. The children who present well enough to be missed, who hold it together at school and fall apart at home, who are excluded not because they are violent but because nobody understands what is happening for them. Not in this document.</p>
          <p><strong>That is not an oversight. That is a failure of imagination. And it will cost children.</strong></p>
        </EditorialBlock>

        <EditorialBlock heading="The workforce problem is not solved.">
          <p>The government will train 200 new educational psychologists a year from 2026. That sounds significant until you understand the scale of the shortage. Speech and language therapy waiting lists in some areas run to two years. Occupational therapy access is a postcode lottery.</p>
          <p>Experts at Hand is a good idea. It will only work if the experts exist. Right now, in many areas, they do not.</p>
          <p>I want to be wrong about this. I hope I am.</p>
        </EditorialBlock>

        <EditorialBlock heading="What I think parents should do right now.">
          <p><strong>Do not relax because the white paper sounds positive.</strong> The current system and current rights are what protect your child today. Use them.</p>
          <p>If your child needs an EHCP assessment, request it now. Do not wait for the new system. The current legal threshold is the right one to use. The new thresholds will be higher.</p>
          <p>Respond to the consultation. This is where parent voices shape what the legislation actually says. The <Link to="/have-your-say" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">Have Your Say</Link> page has guidance on how to do that in a way that carries weight.</p>
          <p>Watch what happens with the Specialist Provision Package thresholds. That is where eligibility will be won or lost. Those thresholds have not been defined yet. That is the most important decision still to be made.</p>
        </EditorialBlock>

        <EditorialBlock heading="My honest verdict.">
          <p>The ambition is right. The system needed this level of intervention.</p>
          <p>The architecture has a serious gap where legal rights used to be.</p>
          <p>Neurodivergent children are close to invisible in this document.</p>
          <p>The funding has a cliff edge in 2029.</p>
          <p>The workforce cannot be built fast enough without sustained investment and a serious recruitment strategy.</p>
          <p><strong>This is a beginning. It is not a solution. And the gap between those two things is where too many children will still fall.</strong></p>
          <p>I will keep watching. I will keep updating this site. And I will keep saying what I see.</p>
          <p>That is what this site is for.</p>
        </EditorialBlock>

        {/* Sign-off */}
        <div className="border-l-4 border-l-[hsl(var(--accent-violet))] bg-[hsl(var(--accent-violet-bg))] border border-[hsl(var(--accent-violet)/0.2)] rounded-xl p-5 sm:p-6">
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
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}

/** Violet-accented editorial content block */
function EditorialBlock({ heading, children }: { heading?: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-l-[hsl(var(--accent-violet))] bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm">
      {heading && (
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">{heading}</h2>
      )}
      <div className="prose-calm space-y-3 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
