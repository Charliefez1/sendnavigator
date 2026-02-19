import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { StatusBadge } from "@/components/StatusBadge";
import { ExternalLink, Megaphone, PenLine, Users, Landmark, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { WordFromRich } from "@/components/WordFromRich";

function ResourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-sm"
    >
      → {label}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

export default function HaveYourSay() {
  return (
    <Layout>
      <SEOHead
        title="How To Have Your Say on SEND Reform | SEND Reform Navigator"
        description="The formal consultation has not opened yet. This page explains what is coming and how to write a response that carries weight."
      />

      <PageOrientation
        title="How To Have Your Say on SEND Reform"
        description="The government is reforming the SEND system. A formal consultation will open alongside the White Paper. This page explains how to make your voice count."
        lastUpdated="19th February 2026"
      />

      {/* ═══ PRE-CONSULTATION BANNER ═══ */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-accent bg-accent/10 p-5 max-w-3xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground">The formal consultation has not opened yet.</p>
            <p className="mt-1">When it does, this page will be updated with the direct link, closing date, and a summary of what is being asked. Check back or sign up for updates.</p>
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            At some point in 2026, the government will publish the <strong>Schools White Paper</strong>. Alongside it, there will be a formal public consultation — a <strong>12-week window</strong> in which anyone can submit a response.
          </p>
          <p>
            That window has not opened yet.
          </p>
          <p>
            This page explains what is coming, what a consultation response actually is, and <strong>how to write one that carries weight</strong>.
          </p>
          <StatusBadge status="confirmed" />
          <p className="text-xs text-muted-foreground">The DfE has confirmed a formal consultation will launch alongside the White Paper.</p>
        </div>
      </section>

      <WordFromRich>
        <p>I have sat in rooms where policy about neurodivergent people has been made, and the people making it had never spoken to a neurodivergent person, or a parent, or a teacher in a classroom that is not coping. Consultations matter not because government always listens, but because when they do not, the record exists. Your response is evidence. Your experience is data. Submit it. It counts.</p>
      </WordFromRich>

      {/* ═══ WHAT HAS ALREADY HAPPENED ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground">What has already happened</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The DfE ran a <strong>national conversation on SEND reform</strong> between December 2025 and January 2026. That window has now closed.
            </p>
            <p>
              A national conversation is not the same as a formal consultation. It was a broader engagement exercise — questionnaires, events, submissions. The government will use it to inform the White Paper. Responses are not published individually. There is no legal requirement for the government to respond to every point raised.
            </p>
            <p>
              The <strong>formal consultation</strong>, when it opens, will be different. It will contain specific proposals. It will ask for responses to specific questions. It will have a legal and political weight that the national conversation did not.
            </p>
            <ResourceLink label="DfE SEND reform national conversation page" url="https://consult.education.gov.uk/digital-communication-team/send-reform-national-conversation" />
          </div>
          <StatusBadge status="confirmed" />
        </div>
      </section>

      {/* ═══ WHAT IS COMING ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" />
            What is coming
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              When the White Paper is published, the government will open a formal consultation on its proposals. Based on the DfE's own statements, that consultation will run for <strong>12 weeks</strong>.
            </p>
            <p>
              During that window, you can submit a written response. Responses are read. They are counted. <strong>Well-evidenced responses from parents and families carry weight</strong> — particularly when they describe specific, concrete experience rather than general opinion.
            </p>
            <p>The consultation will likely cover some or all of the following areas:</p>
            <ul className="space-y-2">
              {[
                "Changes to how SEND support works in mainstream schools",
                "Changes to EHCP eligibility or process (detail not yet confirmed)",
                "The four-tier support model that has been discussed",
                "National SEND standards",
                "Changes to how the SEND Tribunal works",
                "The role of local authorities versus central government in funding and delivery",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <StatusBadge status="discussed" />
          <p className="text-xs text-muted-foreground">These areas reflect what has been reported publicly. The actual questions will not be known until the White Paper is published.</p>
        </div>
      </section>

      {/* ═══ WHY RESPONDING MATTERS ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground">Why responding matters</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Consultations are not performative. <strong>Government is legally required to consider responses</strong> before finalising policy.
            </p>
            <p>
              A consultation that receives tens of thousands of responses from parents describing specific failures gets noticed differently from one that receives a few hundred responses from professional bodies.
            </p>
            <p>
              The 2022 SEND Green Paper consultation received <strong>over 22,000 responses</strong>. The response from families and disabled people's organisations shaped the subsequent Improvement Plan. It did not stop all harmful proposals — but it shifted some of them.
            </p>
            <p><strong>Your response counts.</strong> Particularly if it is specific, evidenced, and direct.</p>
          </div>
        </div>
      </section>

      {/* ═══ HOW TO WRITE A RESPONSE ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" />
            How to write a response that carries weight
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most consultation responses from parents are dismissed not because they are wrong but because they are vague. Here is what works.
          </p>
          <div className="space-y-5">
            {[
              {
                title: "Be specific about your experience",
                body: "\"My child waited 27 weeks for an EHCP assessment\" is more useful than \"the system is too slow\". Specific detail anchors your response in reality. It is harder to discount.",
              },
              {
                title: "Respond to the actual questions",
                body: "When the consultation document is published, it will contain numbered questions. Answer them directly. A response that ignores the questions and submits a general letter is filed differently from one that addresses the consultation structure.",
              },
              {
                title: "Use evidence where you have it",
                body: "Dates, letters, decisions. If you have documentary evidence of a failure — a missed deadline, a provision not delivered, a refusal without grounds — reference it. You do not need to attach the documents. You need to describe them clearly.",
              },
              {
                title: "Keep it readable",
                body: "Civil servants read hundreds of responses. Short paragraphs. One point per paragraph. No jargon. The clearer it is to read, the more likely it is to be read properly.",
              },
              {
                title: "Say what you want, not just what is wrong",
                body: "The most effective responses include a clear ask. Not just \"the current system is failing\" but \"the right of appeal to the SEND Tribunal must be preserved and independently funded legal advice must be available to all families\". Specific asks give officials something to respond to.",
              },
              {
                title: "You do not need to answer every question",
                body: "Respond to the questions where you have something to say. A short, focused response on two or three questions is more useful than a thin response across all of them.",
              },
            ].map((tip, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OTHER WAYS TO INFLUENCE REFORM ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <Landmark className="w-5 h-5 text-primary" />
            Other ways to influence reform
          </h2>

          {/* Petitions */}
          <div className="space-y-3">
            <h3 className="text-sm font-display font-bold text-foreground">Parliamentary petitions</h3>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                Any UK resident can start or sign a petition on the UK Parliament website. Petitions that reach <strong>10,000 signatures</strong> get a written government response. Petitions that reach <strong>100,000 signatures</strong> are considered for debate in Parliament.
              </p>
              <p>
                Petitions work best when they are specific. "Protect EHCP rights" is less effective than "Require the government to publish the legal framework for SEND support before any White Paper proposals take effect."
              </p>
              <ResourceLink label="petition.parliament.uk" url="https://petition.parliament.uk" />
            </div>
          </div>

          {/* MP Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-display font-bold text-foreground">Contact your MP</h3>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                Your MP can raise SEND issues in Parliament — in debates, in written questions, and in letters to ministers. MPs are most useful when they have <strong>concrete, local evidence</strong>.
              </p>
              <p>
                When you write, include the specific issue you are raising, what you have already tried, and <strong>what you want the MP to do</strong>. A clear ask — "will you raise this with the Minister?" — is more likely to get a useful response than a general expression of concern.
              </p>
              <ResourceLink label="writetothem.com" url="https://www.writetothem.com" />
            </div>
          </div>

          {/* Committee evidence */}
          <div className="space-y-3">
            <h3 className="text-sm font-display font-bold text-foreground">Giving evidence to parliamentary committees</h3>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                The Education Select Committee and the SEND All-Party Parliamentary Group periodically call for written and oral evidence.
              </p>
              <p>
                Written evidence submissions are published on the Parliament website and are read by MPs and their staff. They are a <strong>direct route into parliamentary scrutiny</strong> of government policy.
              </p>
              <p>
                When a call for evidence is open, anyone can submit. The bar is not high. You do not need to be an organisation. A parent with clear, evidenced experience is exactly the kind of voice committees want to hear.
              </p>
              <ResourceLink label="Education Select Committee" url="https://committees.parliament.uk/committee/203/education-committee" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WILL BE UPDATED ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl rounded-xl border border-border bg-muted/30 p-5">
          <h2 className="text-sm font-display font-bold text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            This page will be updated
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              When the White Paper and formal consultation are published, this page will be updated with the <strong>direct link to the consultation</strong>, the closing date, and a summary of what is being asked.
            </p>
            <p>
              Check back. Or sign up for updates if the site has a mailing list.
            </p>
          </div>
          <div className="mt-3">
            <StatusBadge status="unconfirmed" />
            <p className="text-xs text-muted-foreground mt-1">The White Paper publication date has not been confirmed. The DfE has said it will publish in 2026.</p>
          </div>
        </div>
      </section>

      {/* ═══ CROSS LINKS ═══ */}
      <section className="content-section py-6 pb-8">
        <div className="max-w-3xl flex flex-wrap gap-3">
          <Link to="/what-is-changing" className="text-sm px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            What is changing →
          </Link>
          <Link to="/what-the-leaks-are-saying" className="text-sm px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            What the leaks say →
          </Link>
          <Link to="/what-we-do-not-know" className="text-sm px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            What we don't know →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
