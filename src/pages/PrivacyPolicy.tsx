import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy"
        description="How the SEND Reform Navigator collects, uses, and protects your data."
        path="/privacy-policy"
      />
      <div className="content-section py-8 space-y-8">
        <PageOrientation
          title="Privacy Policy"
          description="How we collect, use, and protect your data. Last updated: 23 February 2026."
        />

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Who we are</h2>
            <p className="text-sm leading-relaxed">
              The SEND Reform Navigator is operated by Neurodiversity Global Ltd. This site provides information about SEND reform in England. It does not provide legal, medical, or professional advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">What data we collect</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li><strong>Analytics (with consent):</strong> Anonymous page views, device type, referrer, and session identifiers. No names, emails, or IP addresses are stored in analytics. Tracking only fires if you accept cookies.</li>
              <li><strong>Contact form:</strong> Name, email, organisation (optional), and message when you choose to contact us.</li>
              <li><strong>Feedback and questions:</strong> Name (optional) and the text you submit. These are moderated before publishing.</li>
              <li><strong>Child profile data:</strong> If you use the "My Child: A Profile" tool, the answers you provide are stored temporarily (up to 14 days) behind an access code, then automatically deleted. This data is encrypted in transit and at rest.</li>
              <li><strong>Authentication:</strong> Email and hashed password if you create an account.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Lawful basis</h2>
            <p className="text-sm leading-relaxed">
              We process data under <strong>legitimate interest</strong> (to provide and improve this free public resource) and <strong>consent</strong> (for analytics cookies and child profile data). You can withdraw consent at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">How we use your data</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li>To display your feedback or questions (after moderation) on the site</li>
              <li>To respond to contact form messages</li>
              <li>To understand how people use the site so we can improve it</li>
              <li>To generate your child's profile document (processed by AI, not stored beyond the 14-day window)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Data retention</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li><strong>Child profile data:</strong> Automatically deleted after 14 days</li>
              <li><strong>Analytics:</strong> Retained for up to 12 months, then deleted</li>
              <li><strong>Contact submissions:</strong> Retained for up to 12 months</li>
              <li><strong>Feedback and questions:</strong> Retained while the site is active</li>
              <li><strong>Accounts:</strong> Retained until you request deletion</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Data sharing</h2>
            <p className="text-sm leading-relaxed">
              We do not sell your data. We do not share it with advertisers. Data is processed by our hosting and database provider (Lovable Cloud). AI-generated profile reports are processed by Anthropic (Claude) — only the text you enter is sent, and it is not used to train their models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Cookies</h2>
            <p className="text-sm leading-relaxed">
              We use essential cookies (theme preference, text size, cookie consent choice) and optional analytics cookies (anonymous page view tracking). You can choose "Essential only" in the cookie banner to decline analytics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Your rights</h2>
            <p className="text-sm leading-relaxed">
              Under UK GDPR, you have the right to access, correct, or delete your personal data. You can also object to processing or request data portability. To exercise any of these rights, contact us using the details below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Contact</h2>
            <p className="text-sm leading-relaxed">
              For any privacy-related questions or requests, please use the contact form on this site or email us through Neurodiversity Global Ltd.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display">Changes to this policy</h2>
            <p className="text-sm leading-relaxed">
              We may update this policy from time to time. The "last updated" date at the top of this page will always reflect the most recent version.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
