import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { Link } from "react-router-dom";

const WhyIBuiltThis = () => {
  return (
    <Layout>
      <PageOrientation
        title="Why I Built the SEND Navigator"
        description="A personal statement from Rich Ferriman"
        lastUpdated="7th February 2026"
      />

      <section className="content-section py-8 border-t border-border">
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            I built the SEND Navigator because too many parents are fighting battles they should never have had to fight.
          </p>
          <p>
            Battles to be believed.<br />
            Battles to be listened to.<br />
            Battles to stop their children being reduced to behaviour, labels or problems to manage.
          </p>
          <p className="font-semibold">
            And because doing nothing costs too much.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">The reality for families</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            For most families, it starts small. A concern raised. A conversation with school. A referral suggested. Then the waiting begins. Meetings. Forms. Reports. More waiting. Being told to wait longer. Being told your child will grow out of it. Being told the system knows best, even when your lived experience tells you otherwise.
          </p>
          <p>
            What should be support quickly turns into years of advocacy.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">That experience changes you</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            It changes how you see education.<br />
            It changes how you see health services.<br />
            It changes how you understand power, responsibility, and who carries the consequences when systems fail.
          </p>
          <p>
            Parents end up doing jobs they never trained for. Learning policy language. Interpreting guidance. Chasing referrals. Preparing evidence. Explaining their child again and again to people who hold decision-making power but not lived experience.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Why the SEND Navigator exists</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p className="font-semibold text-primary">
            The SEND Navigator exists because parents should not have to become legal experts, case managers and campaigners just to protect their children's wellbeing.
          </p>
          <p>
            It exists because what families are dealing with is not individual failure. It is systemic failure. Fragmented systems. Inconsistent processes. Information that is technically available but practically inaccessible when you are exhausted, emotional and under pressure.
          </p>
          <p className="font-semibold">
            And it exists because silence has never protected our children.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Built to change that</h2>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            The reality of navigating SEND support is still too often minimised. The emotional toll on families is treated as unfortunate rather than unacceptable. The language of support is everywhere, while the burden of coping is quietly pushed back onto parents.
          </p>
          <p className="font-semibold text-primary">
            The SEND Navigator was built to change that.
          </p>
          <p>
            Not as another resource telling parents what they should do.<br />
            But as a tool that helps them understand what is happening, what should be happening, and where they stand in the process.
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <div className="reassurance-banner mb-6">
          <p className="text-foreground font-medium mb-1">It is about clarity instead of confusion.</p>
          <p className="text-foreground font-medium mb-1">Context instead of guesswork.</p>
          <p className="text-foreground font-semibold">Power through understanding, not conflict.</p>
        </div>
        <div className="prose-calm max-w-2xl space-y-4">
          <p>
            Advocacy should not depend on who shouts the loudest or who has the time, energy or confidence to push hardest. Parents are not being difficult when they ask questions, challenge decisions or refuse to accept harm as normal. They are filling the gaps the system has left.
          </p>
          <p className="font-semibold">
            The SEND Navigator exists to support that reality.
          </p>
          <p>
            Not to replace systems.<br />
            But to help parents navigate them without losing themselves in the process.
          </p>
          <p>
            And not just to ask for change.<br />
            <span className="font-semibold text-primary">But to make it possible.</span>
          </p>
        </div>
      </section>

      <section className="content-section py-8 border-t border-border">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to="/rich-ferriman" className="text-primary hover:underline font-medium">
            About Rich Ferriman
          </Link>
          <Link to="/about" className="text-primary hover:underline font-medium">
            About this resource
          </Link>
        </div>
      </section>

      <div className="content-section pb-16" />
    </Layout>
  );
};

export default WhyIBuiltThis;
