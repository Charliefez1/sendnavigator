import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import {
  PageOrientation,
  SixtySecondSummary,
} from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";

export default function WhatIsBeingDiscussed() {
  return (
    <Layout>
      <SEOHead title="Under discussion: SEND reform debates in 2026" description="What is being debated publicly right now about SEND reform in England." path="/what-is-being-discussed" />
      <PageOrientation
        title="Under discussion: what is being debated publicly right now"
        description="Ideas, proposals, and areas of debate that may shape future policy but are not settled."
        lastUpdated="14th February 2026"
      >
        <div className="mt-3">
          <StatusBadge status="discussed" />
        </div>
      </PageOrientation>

      <SixtySecondSummary
        prose={
          <div className="space-y-3">
            <p>
              Alongside confirmed changes, there is active public discussion about deeper reform of SEND in England. These discussions are happening in Parliament, in select committees, across the sector, and in the media.
            </p>
            <p>
              Nothing in this section is law. Nothing here has been enacted. These are ideas, proposals, and areas of debate that may shape future policy but are not settled.
            </p>
            <p>
              The common thread is this. The government is trying to reduce delay, conflict, and unsustainable cost, while families and professionals are trying to protect children's rights and access to real support. The tension sits between system efficiency and individual safeguards.
            </p>
          </div>
        }
      />

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          How will this impact children and parents
        </h2>
        <div className="prose-calm space-y-3">
          <p>
            Right now, the impact is uncertainty rather than change.
          </p>
          <p>
            Parents may feel anxious because discussions are often reported without context. It can sound as if decisions have already been made, when they have not.
          </p>
          <p>
            For children, nothing changes today because of these debates. For families, the risk is emotional and cognitive load. Trying to plan for a future that is still being argued over can be exhausting, especially when you are already stretched.
          </p>
          <p>
            Understanding what is under discussion, and what is not yet decided, helps reduce that uncertainty.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Statistics and facts
        </h2>
        <div className="prose-calm space-y-3">
          <p>These points reflect themes and issues raised in the checked research set, not enacted policy.</p>
          <ul className="space-y-2">
            <li>A SEND focused Schools White Paper is planned for late 2026.</li>
            <li>A national SEND reform consultation process ran from December 2025 to January 2026.</li>
            <li>Parliamentary committees and All Party Parliamentary Groups on SEND are actively scrutinising reform proposals.</li>
            <li>Tribunal volumes have increased significantly over the past decade, prompting debate about system design and incentives.</li>
            <li>Local authority SEND deficits and workforce shortages are cited repeatedly as drivers of reform discussion.</li>
          </ul>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What is actually being discussed, in plain language
        </h2>
        <div className="prose-calm space-y-6">

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Tiered models of support</h3>
            <p>
              One of the most discussed ideas is whether SEND support should be more clearly tiered.
            </p>
            <p>In simple terms, this means:</p>
            <ul className="space-y-2">
              <li>Stronger, better defined SEN Support as a first level.</li>
              <li>Clear expectations about what schools and settings must provide without an EHCP.</li>
              <li>EHCPs reserved for children with the most complex or multi-agency needs.</li>
            </ul>
            <p>
              Supporters argue this could reduce delay and conflict by making early help reliable and consistent. Critics argue that tiering risks recreating older systems where children had to fail before qualifying for help.
            </p>
            <p>
              This debate is ongoing. No tiered model has been confirmed.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Reducing over-reliance on EHCPs</h3>
            <p>
              There is broad agreement that too many families feel forced to seek EHCPs just to secure basic support.
            </p>
            <p>
              The discussion is about how to strengthen support earlier, not whether EHCPs should exist. However, families are understandably concerned that reducing reliance could become reducing access if not done carefully.
            </p>
            <p>
              The question being debated is not whether EHCPs matter, but how to ensure they are used appropriately without leaving children unsupported.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Funding models and incentives</h3>
            <p>
              Another area under discussion is how SEND funding flows through the system.
            </p>
            <p>
              At present, funding is strongly tied to EHCPs. This creates incentives for escalation and defensiveness. Discussions include whether more funding should sit with schools or local partnerships to provide support earlier.
            </p>
            <p>
              Parents are rightly asking how accountability would work if funding is less individualised. That question is central to the debate and remains unanswered.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Appeals and adversarial processes</h3>
            <p>
              The volume of tribunal appeals has prompted debate about whether the system has become too legalistic.
            </p>
            <p>
              Some argue the appeal system shows failure earlier in the process. Others worry that attempts to reduce appeals could weaken safeguards.
            </p>
            <p>
              There is no confirmed proposal to remove appeal rights. The discussion centres on whether better early decisions could reduce the need for appeals at all.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">Mainstream inclusion and specialist provision</h3>
            <p>
              There is active debate about how far a mainstream first approach should go.
            </p>
            <p>
              Most agree mainstream should be better supported. Families are concerned about children being kept in unsuitable settings for cost or policy reasons.
            </p>
            <p>
              The discussion is about balance, not absolutes. No policy currently forces children into mainstream against their needs.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">The pace and shape of reform</h3>
            <p>
              Finally, there is debate about timing. Some want rapid change because the system is failing now. Others warn that rushed reform risks unintended harm.
            </p>
            <p>
              This is why consultation, piloting, and phased implementation feature so heavily in the current approach.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">What this discussion phase really means</h3>
            <p>
              Discussion does not equal decision. Public debate is part of how policy is tested, challenged, and improved.
            </p>
            <p>
              For parents, the most important thing to know is that voices are being heard. Many of the concerns raised by families are the same concerns shaping the debate.
            </p>
          </div>

        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
}
