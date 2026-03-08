import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates/PageOrientation";
import { ContentBox } from "@/components/templates/ContentBox";
import { StatusExplainer } from "@/components/StatusExplainer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  Users, Bot, MessageCircleQuestion, Tag, Database,
  Baby, ShieldCheck, MessageSquare, Eye,
} from "lucide-react";

const ACCENT = "hsl(220 60% 50%)";

export default function HowThisSiteWorks() {
  return (
    <Layout>
      <SEOHead
        title="How this site works | SEND Navigator"
        description="How we research, build, and protect your information, and what Ask Rich can and cannot do."
      />

      <PageOrientation
        title="How this site works"
        description="How we research, build, and protect your information, and what Ask Rich can and cannot do."
        sectionLabel="Transparency"
        icon={Eye}
        accentColor={ACCENT}
        lastUpdated="8th March 2026"
      />

      {/* A — Who we are */}
      <ContentBox icon={Users} title="Who we are and what this site does" accentColor={ACCENT}>
        <p>
          SEND Navigator is built by <strong>Rich and Charlie Ferriman</strong>, through{" "}
          <strong>Neurodiversity Global Ltd</strong>. We are a father-and-son team with lived
          experience of the SEND system. Between us we have insights no textbook can replicate.
        </p>
        <p className="mt-3">
          This is an <strong>independent, free resource</strong>. We are not affiliated with
          government, any political party, or any advocacy organisation. We have personally
          researched and reviewed over <strong>1,000 separate information sources</strong> to
          build the content on this site.
        </p>
      </ContentBox>

      {/* B — How we use AI */}
      <ContentBox icon={Bot} title="How we use AI" accentColor={ACCENT}>
        <p>
          We have used AI tools to help us build this site and to assist in conducting our
          research across more than 1,000 sources. AI helps us work faster, but every piece
          of information published here has been <strong>researched and written by Charlie
          and Rich personally</strong>.
        </p>
        <p className="mt-3">
          The AI features on this site (such as Ask Rich and the child profile report
          generator) draw <strong>only from content we have researched and published on
          this site</strong>. Nothing else. No external data, no third-party databases,
          no guesswork.
        </p>
        <p className="mt-3">
          If something is unknown or the picture is incomplete, we will tell you that
          straight. We never fill gaps with speculation.
        </p>
      </ContentBox>

      {/* C — What Ask Rich can and cannot do */}
      <ContentBox icon={MessageCircleQuestion} title="What Ask Rich can and cannot do" accentColor={ACCENT}>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-1">What it can do</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Explain the big picture of what is happening with SEND reform</li>
              <li>Help you understand what we know right now</li>
              <li>Point you to the right section of this site for more detail</li>
              <li>Flag when information is unconfirmed or incomplete</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">What it cannot do</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Comment on your individual case or circumstances</li>
              <li>Give legal advice or clinical recommendations</li>
              <li>Predict what the government will do next</li>
              <li>Replace professional support from a SENDCo, solicitor, or therapist</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">How it works, step by step</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>You ask a question.</strong> Type anything about SEND reform, EHCPs, or your rights.</li>
              <li><strong>AI searches our knowledge base.</strong> It looks through the content we have published on this site.</li>
              <li><strong>You receive an answer grounded in our research.</strong> Every response is drawn from what we have written, not from the open internet.</li>
              <li><strong>Uncertainty is flagged.</strong> If the answer touches something unconfirmed or incomplete, we tell you.</li>
            </ol>
          </div>
        </div>
      </ContentBox>

      {/* D — How we label information */}
      <ContentBox icon={Tag} title="How we label information" accentColor={ACCENT}>
        <p className="mb-4">
          We never blur categories. If something is unknown, we say it is unknown.
        </p>
        <StatusExplainer />
      </ContentBox>

      {/* E — How we handle your data */}
      <ContentBox icon={Database} title="How we handle your data" accentColor={ACCENT}>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-1">What we collect</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Analytics:</strong> anonymous page views, device type, and referrer. No cookies are used for tracking. No personal data is captured.</li>
              <li><strong>Contact form:</strong> your name, email, and message when you choose to contact us.</li>
              <li><strong>Feedback:</strong> any feedback you submit through the site.</li>
              <li><strong>Questions:</strong> questions submitted to Ask Rich (text only, no personal identifiers).</li>
              <li><strong>Child profile:</strong> answers you provide when building a "This is me" profile (see below).</li>
              <li><strong>Authentication:</strong> email and password if you create an account.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">How long we keep it</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Child profiles: <strong>automatically deleted after 14 days</strong></li>
              <li>Analytics: up to 12 months, then purged</li>
              <li>Contact submissions and feedback: retained until resolved, then deleted</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Who processes it</h3>
            <p>
              Our site is hosted on <strong>Lovable Cloud</strong>, which provides secure
              database and authentication services. AI features use models provided through
              Lovable's infrastructure. <strong>Your data is not used to train any AI
              model.</strong>
            </p>
          </div>
          <p>
            For full details, read our{" "}
            <Link to="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </ContentBox>

      {/* F — Child profile data */}
      <ContentBox icon={Baby} title='Child profile ("This is me") — your data, step by step' accentColor={ACCENT}>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Consent</strong> — before anything is stored, you must read and accept our data notice. Nothing is saved until you do.</li>
          <li><strong>You enter information</strong> — you answer questions about your child. This stays in your browser until you choose to save.</li>
          <li><strong>Data is stored securely</strong> — when you save, your answers are encrypted in transit and at rest in our database.</li>
          <li><strong>AI generates a report</strong> — a profile document is created using only the information you provided, matched against our published content.</li>
          <li><strong>Access code</strong> — you receive a unique 8-character code to retrieve your profile. We do not link this to your name in analytics.</li>
          <li><strong>Automatic deletion</strong> — your profile is automatically deleted after <strong>14 days</strong>. You can also delete it manually at any time.</li>
        </ol>
        <p className="mt-3">
          <strong>GDPR lawful basis:</strong> consent. You choose to provide this data, and you
          can withdraw at any time by deleting your profile.
        </p>
      </ContentBox>

      {/* G — Security */}
      <ContentBox icon={ShieldCheck} title="Security measures" accentColor={ACCENT}>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Encryption</strong> — all data is encrypted in transit (HTTPS/TLS) and at rest in the database.</li>
          <li><strong>Row Level Security</strong> — every database table has access policies that prevent unauthorised reads or writes.</li>
          <li><strong>Admin access</strong> — protected by PIN code with per-IP rate limiting (5 attempts per 10 minutes). No default codes.</li>
          <li><strong>CORS validation</strong> — backend functions only accept requests from our verified domains.</li>
          <li><strong>Spam protection</strong> — all public forms include honeypot fields and timing-based checks to block automated submissions.</li>
          <li><strong>Password security</strong> — passwords are checked against known breach databases (Have I Been Pwned) during signup.</li>
          <li><strong>No advertising or data sales</strong> — we do not sell, share, or monetise your data in any way. There are no advertisers on this site.</li>
        </ul>
      </ContentBox>

      {/* H — How to challenge us */}
      <ContentBox icon={MessageSquare} title="How to challenge us" accentColor={ACCENT}>
        <p>
          If you believe we have something wrong, we want to know. We correct errors
          transparently and note when content has been updated.
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>
            Use our{" "}
            <Link to="/feedback" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              feedback form
            </Link>
          </li>
          <li>
            Contact Rich directly on{" "}
            <a
              href="https://www.linkedin.com/in/richferriman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          This page is not a substitute for our full{" "}
          <Link to="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>.
          If there is any conflict between this page and the Privacy Policy, the Privacy Policy takes precedence.
        </p>
      </ContentBox>
    </Layout>
  );
}
