import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
  OnThisPage,
  ContentBox,
} from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";

import { StatusBadge } from "@/components/StatusBadge";
import { RightsChecklist } from "@/components/templates/DataVisuals";
import { LatestUpdatesStream } from "@/components/templates/LatestUpdatesStream";
import { Users, BarChart3, Shield, HelpCircle, EyeOff, Heart, Filter, Zap, Lightbulb, Anchor } from "lucide-react";

const sections: PageSectionDef[] = [
  { id: "impact", icon: Users, title: "How will this impact children and parents" },
  { id: "statistics", icon: BarChart3, title: "Statistics and facts" },
  { id: "ground", icon: Shield, title: "Start with what cannot change overnight" },
  { id: "why-leak", icon: HelpCircle, title: "Why governments leak or kite fly ideas" },
  { id: "left-out", icon: EyeOff, title: "What leaks usually leave out" },
  { id: "fear", icon: Heart, title: "The fear underneath the headline" },
  { id: "filter", icon: Filter, title: "A simple way to filter leaks" },
  { id: "acting", icon: Zap, title: "Acting versus reacting" },
  { id: "useful", icon: Lightbulb, title: "What leaks are actually useful for" },
  { id: "bottom-line", icon: Anchor, title: "The bottom line, without false reassurance" },
];

export default function WhatTheLeaksDoNotMean() {
  return (
    <Layout>
      <SEOHead
        title="What leaks do not mean"
        description="Understanding what leaked SEND reform proposals do and do not mean for parents and children."
        path="/what-the-leaks-do-not-mean"
      />
      <PageOrientation
        title="What leaks do not mean, and why they happen at all"
        description="Understanding leaked proposals without being pulled into panic or rushed decisions."
        lastUpdated="23rd February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="confirmed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Leaks are not designed to help parents. <strong>They are designed to test ideas, manage risk, and shape reaction.</strong>
            </p>
            <p>
              They arrive without safeguards, without timelines, and without explanation. In a system where many parents already feel unsafe, they land hard.
            </p>
            <p>
              <strong>A leak does not mean a decision has been made.</strong> It does not mean your child is about to lose support. It does not change the law.
            </p>
            <p>
              This section exists to help you read leaks without being pulled into panic or forced into rushed decisions that may not serve your child.
            </p>
          </div>
        }
      />

      <LatestUpdatesStream />

      <OnThisPage sections={sections} />
      

      <ContentBox id="impact" icon={Users} title="How will this impact children and parents">
        <div className="space-y-3">
          <p>
            Leaks affect parents first. <strong>They heighten fear, urgency, and exhaustion.</strong> They can push families into action before they are ready or before it is actually needed.
          </p>
          <p>
            Children then feel the impact indirectly. Adults under threat behave differently. Home becomes more tense. School decisions feel heavier. Trust feels fragile.
          </p>
          <p>
            <strong>The real risk is not the leak itself. It is the pressure it puts on families to act from fear rather than need.</strong>
          </p>
          <p>
            Understanding what leaks are, and what they are not, <strong>helps protect both you and your child</strong>.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="statistics" icon={BarChart3} title="Statistics and facts">
        <div className="space-y-3">
          <p>This section is about interpretation, not new policy data.</p>
          <p>From the evidence:</p>
          <ul className="space-y-2">
            <li><strong>The Schools White Paper, Every Child Achieving and Thriving, was published on 23 February 2026.</strong></li>
            <li><strong>No leaked proposal has been introduced to Parliament as legislation.</strong></li>
            <li><strong>No leaked idea has legal force.</strong></li>
            <li>Any change to EHCP rights, thresholds, or appeals would require <strong>primary legislation</strong>.</li>
            <li>Existing statutory SEND rights <strong>remain in place as of 23 February 2026</strong>.</li>
          </ul>
        </div>
      </ContentBox>

      <ContentBox id="ground" icon={Shield} title="Start with what cannot change overnight">
        <div className="space-y-4">
          <RightsChecklist
            title="Until the law changes, these facts hold"
            items={[
              "EHCPs remain statutory and enforceable",
              "Local authorities remain responsible for securing provision in EHCPs",
              "Parents retain the right to request assessment",
              "Parents retain the right to appeal decisions",
            ]}
          />
          <p className="text-sm text-muted-foreground">
            <strong>A leak cannot switch these off. A headline does not override legislation.</strong> This is the ground you stand on, even when everything feels uncertain.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="why-leak" icon={HelpCircle} title="Why governments leak or kite fly ideas">
        <div className="space-y-3">
          <p>Governments rarely leak by accident. This is about process, not malice.</p>
          <p>Common reasons include:</p>
          <ul className="space-y-2">
            <li>Testing reaction without commitment.</li>
            <li>Softening the ground for later proposals.</li>
            <li>Surfacing problems in early thinking.</li>
            <li>Managing disagreement inside government.</li>
            <li>Shifting the narrative towards change being inevitable.</li>
          </ul>
          <p>
            SEND reform is politically sensitive, legally complex, and expensive. <strong>Leaks allow ideas to be floated without owning them.</strong>
          </p>
          <p>
            These messages are not written for parents. They are written for policy shaping.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="left-out" icon={EyeOff} title="What leaks usually leave out">
        <div className="space-y-3">
          <p><strong>Leaks strip away the parts that matter most to families:</strong></p>
          <ul className="space-y-2">
            <li>Who would be protected.</li>
            <li>What happens to children who already have EHCPs.</li>
            <li>How transitions would work.</li>
            <li>What funding would sit behind any new model.</li>
            <li>What challenge or appeal routes would exist.</li>
          </ul>
          <p>
            <strong>Without these details, any idea will sound harsher and more threatening than it would be in practice.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="fear" icon={Heart} title="The fear underneath the headline">
        <div className="space-y-3">
          <p>Most parents are not afraid of reform in theory. <strong>They are afraid of loss.</strong></p>
          <p>Common fears include:</p>
          <ul className="space-y-2">
            <li>My child will lose the support that is keeping them safe.</li>
            <li>I will not be believed again.</li>
            <li>We will be forced to start from scratch.</li>
            <li>School will stop trying once the paperwork changes.</li>
            <li>I do not have the strength for another fight.</li>
          </ul>
          <p>
            <strong>These fears are rational. They come from lived experience, not overreaction.</strong>
          </p>
        </div>
      </ContentBox>

      <ContentBox id="filter" icon={Filter} title="A simple way to filter leaks">
        <div className="space-y-3">
          <p><strong>When you see a leak, ask three questions:</strong></p>
          <ul className="space-y-2">
            <li>What exactly is this source.</li>
            <li>What would have to happen for this to become real.</li>
            <li>What does my child need this month.</li>
          </ul>
          <p>
            <strong>The third question matters most.</strong> It protects your child now, not an imagined future system.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="acting" icon={Zap} title="Acting versus reacting">
        <div className="space-y-3">
          <p>
            Some families will choose to push for statutory protection because support is not in place now. That can be the right decision.
          </p>
          <p>The difference is motive.</p>
          <p>
            <strong>Acting because your child needs protection is grounded.</strong>
          </p>
          <p>
            Acting only because of a headline often leads to burnout.
          </p>
          <p>
            Fear-driven urgency drains energy that children need from you.
          </p>
        </div>
      </ContentBox>

      <ContentBox id="useful" icon={Lightbulb} title="What leaks are actually useful for">
        <div className="space-y-3">
          <p>Leaks do have value when used properly. They show:</p>
          <ul className="space-y-2">
            <li>Where government pressure points are.</li>
            <li>Which rights may be under threat.</li>
            <li>Where parent voices will matter most.</li>
          </ul>
          <p><strong>They are signals, not instructions.</strong></p>
        </div>
      </ContentBox>

      <ContentBox id="bottom-line" icon={Anchor} title="The bottom line, without false reassurance">
        <div className="space-y-3">
          <p><strong>You are allowed to feel scared and still think clearly.</strong></p>
          <p>Right now:</p>
          <ul className="space-y-2">
            <li>Reform is being discussed.</li>
            <li>Some improvements are confirmed and underway.</li>
            <li><strong>Major rights changes are not confirmed.</strong></li>
            <li><strong>The law protecting your child has not changed.</strong></li>
          </ul>
          <p>
            If a change would seriously affect your child's rights, <strong>it would not arrive quietly</strong>. It would come with consultation, scrutiny, and time.
          </p>
          <p>
            <strong>You are not missing a secret deadline. You are not already too late.</strong>
          </p>
        </div>
      </ContentBox>

      <div className="content-section pb-16" />
    </Layout>
  );
}
