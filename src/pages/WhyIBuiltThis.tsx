import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

const WhyIBuiltThis = () => {
  return (
    <Layout>
      <PageHeader
        title="Why I Built the SEND Navigator"
        description="A personal statement from Rich Ferriman"
        lastUpdated="7th February 2026"
      />

      <div className="content-narrow space-y-6">
        <p className="text-foreground leading-relaxed">
          I built the SEND Navigator because too many parents are fighting battles they should never have had to fight.
        </p>

        <div className="space-y-1">
          <p className="text-foreground leading-relaxed">Battles to be believed.</p>
          <p className="text-foreground leading-relaxed">Battles to be listened to.</p>
          <p className="text-foreground leading-relaxed">Battles to stop their children being reduced to behaviour, labels or problems to manage.</p>
        </div>

        <p className="text-foreground leading-relaxed font-semibold">
          And because doing nothing costs too much.
        </p>

        <p className="text-foreground leading-relaxed">
          For most families, it starts small. A concern raised. A conversation with school. A referral suggested. Then the waiting begins. Meetings. Forms. Reports. More waiting. Being told to wait longer. Being told your child will grow out of it. Being told the system knows best, even when your lived experience tells you otherwise.
        </p>

        <p className="text-foreground leading-relaxed">
          What should be support quickly turns into years of advocacy.
        </p>

        <p className="text-foreground leading-relaxed font-semibold">
          That experience changes you.
        </p>

        <div className="space-y-1">
          <p className="text-foreground leading-relaxed">It changes how you see education.</p>
          <p className="text-foreground leading-relaxed">It changes how you see health services.</p>
          <p className="text-foreground leading-relaxed">It changes how you understand power, responsibility, and who carries the consequences when systems fail.</p>
        </div>

        <p className="text-foreground leading-relaxed">
          Parents end up doing jobs they never trained for. Learning policy language. Interpreting guidance. Chasing referrals. Preparing evidence. Explaining their child again and again to people who hold decision-making power but not lived experience.
        </p>

        <p className="text-foreground leading-relaxed font-semibold text-primary">
          The SEND Navigator exists because parents should not have to become legal experts, case managers and campaigners just to protect their children's wellbeing.
        </p>

        <p className="text-foreground leading-relaxed">
          It exists because what families are dealing with is not individual failure. It is systemic failure. Fragmented systems. Inconsistent processes. Information that is technically available but practically inaccessible when you are exhausted, emotional and under pressure.
        </p>

        <p className="text-foreground leading-relaxed font-semibold">
          And it exists because silence has never protected our children.
        </p>

        <p className="text-foreground leading-relaxed">
          The reality of navigating SEND support is still too often minimised. The emotional toll on families is treated as unfortunate rather than unacceptable. The language of support is everywhere, while the burden of coping is quietly pushed back onto parents.
        </p>

        <p className="text-foreground leading-relaxed font-semibold text-primary">
          The SEND Navigator was built to change that.
        </p>

        <div className="space-y-1">
          <p className="text-foreground leading-relaxed">Not as another resource telling parents what they should do.</p>
          <p className="text-foreground leading-relaxed">But as a tool that helps them understand what is happening, what should be happening, and where they stand in the process.</p>
        </div>

        <div className="bg-secondary/50 rounded-2xl p-6 space-y-2">
          <p className="text-foreground leading-relaxed">It is about clarity instead of confusion.</p>
          <p className="text-foreground leading-relaxed">Context instead of guesswork.</p>
          <p className="text-foreground leading-relaxed font-semibold">Power through understanding, not conflict.</p>
        </div>

        <p className="text-foreground leading-relaxed">
          Advocacy should not depend on who shouts the loudest or who has the time, energy or confidence to push hardest. Parents are not being difficult when they ask questions, challenge decisions or refuse to accept harm as normal. They are filling the gaps the system has left.
        </p>

        <p className="text-foreground leading-relaxed font-semibold">
          The SEND Navigator exists to support that reality.
        </p>

        <div className="space-y-1">
          <p className="text-foreground leading-relaxed">Not to replace systems.</p>
          <p className="text-foreground leading-relaxed">But to help parents navigate them without losing themselves in the process.</p>
        </div>

        <div className="space-y-1">
          <p className="text-foreground leading-relaxed">And not just to ask for change.</p>
          <p className="text-foreground leading-relaxed font-semibold text-primary">But to make it possible.</p>
        </div>
      </div>
    </Layout>
  );
};

export default WhyIBuiltThis;
