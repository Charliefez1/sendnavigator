import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation, OnThisPage } from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";
import { PageSearch } from "@/components/PageSearch";
import { StatusBadge } from "@/components/StatusBadge";
import { ExternalLink, MapPin, Phone, Scale, Users, ShieldCheck, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { WordFromRich } from "@/components/WordFromRich";

const pageSections: PageSectionDef[] = [
  { id: "what-sendiass-does", icon: HelpCircle, title: "What SENDIASS does" },
  { id: "find-yours", icon: MapPin, title: "Find your local SENDIASS" },
  { id: "what-to-expect", icon: ShieldCheck, title: "What to expect" },
  { id: "beyond-sendiass", icon: Scale, title: "Beyond SENDIASS" },
];

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

function HelpCard({ name, description, url, icon: Icon }: {
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
    </a>
  );
}

export default function Sendiass() {
  return (
    <Layout>
      <SEOHead
        title="Free Help in Your Area - SENDIASS | SEND Reform Navigator"
        description="Every local authority in England funds a free SEND advice service called SENDIASS. Most parents have never heard of it."
      />

      <PageOrientation
        title="Free Help in Your Area"
        description="Every local authority in England is legally required to fund a free, impartial Information, Advice and Support Service for families with SEND children and young people."
        lastUpdated="19th February 2026"
      />

      {/* ═══ INTRO ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            It is called <strong>SENDIASS</strong>. Sometimes IASS. Sometimes by a local name entirely.
          </p>
          <p>
            <strong>Most parents have never heard of it.</strong>
          </p>
          <p>
            That is a failure of the system, not a failure of parents. This page exists to change that.
          </p>
        </div>
      </section>

      <OnThisPage sections={pageSections} />
      <PageSearch />


      <WordFromRich>
        <p>Most parents I speak to have never heard of SENDIASS. That is not their fault. It is a failure of how the system communicates. Free, independent, legally grounded advice, available to every family in England, and most people navigating the hardest experiences of their parenting lives have no idea it exists. Find yours. Use it. That is what it is there for.</p>
      </WordFromRich>

      {/* ═══ WHAT SENDIASS DOES ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            What SENDIASS does
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>SENDIASS provides <strong>free, impartial, legally-based advice and support</strong> to:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>children and young people with SEND</li>
              <li>their parents and carers</li>
            </ul>
            <p>
              It covers education, health, and social care, across the <strong>0 to 25 age range</strong>.
            </p>
            <p>
              It is funded by the local authority but is legally required to operate independently of it. Its job is to <strong>support you</strong>, not to represent the council.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU CAN USE IT FOR ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            What you can use it for
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            {[
              "Understanding the EHCP process - assessments, drafts, annual reviews",
              "Help preparing for meetings with the school or local authority",
              "Understanding your rights and what the law says",
              "Support preparing for or attending mediation",
              "Help writing letters or responding to the LA",
              "Signposting to other services including tribunal support",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            It is not a legal representation service. It will not represent you at tribunal. But it can help you <strong>understand what is happening and prepare you to take the right next steps</strong>.
          </p>
        </div>
      </section>

      {/* ═══ COST ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl">
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-5">
            <h2 className="text-base font-display font-bold text-foreground mb-2">What it costs</h2>
            <p className="text-2xl font-display font-bold text-primary">Nothing.</p>
            <p className="text-sm text-muted-foreground mt-2">
              It is free at the point of use. It is funded by the local authority as a <strong>legal duty under the Children and Families Act 2014</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FIND YOURS ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            How to find yours
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Every LA area has one. They vary in name, staffing, and capacity. Some are excellent. Some are under-resourced. But they <strong>exist everywhere</strong> and they are a starting point.
            </p>
            <p>The national finder is run by the Council for Disabled Children.</p>
          </div>
          <a
            href="https://councilfordisabledchildren.org.uk/iassnetwork/find-your-local-iass"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            <MapPin className="w-4 h-4" />
            Find your local SENDIASS
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-muted-foreground">Search by postcode or local authority name.</p>
        </div>
      </section>

      {/* ═══ IF HARD TO REACH ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-base font-display font-bold text-foreground">If your SENDIASS is hard to reach</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            SENDIASS services are unevenly resourced. Some have waiting lists. Some are difficult to contact. If you are struggling to get help, these <strong>national organisations</strong> can also help:
          </p>
          <div className="space-y-3">
            <HelpCard
              name="IPSEA"
              description="Free legally-based advice, model letters, tribunal support."
              url="https://www.ipsea.org.uk"
              icon={Scale}
            />
            <HelpCard
              name="SOS!SEN"
              description="Free telephone helpline. Tribunal support."
              url="https://www.sossen.org.uk"
              icon={Phone}
            />
            <HelpCard
              name="Contact"
              description="Support for families with disabled children, including benefit and care advice."
              url="https://contact.org.uk"
              icon={Users}
            />
          </div>
        </div>
      </section>

      {/* ═══ NOTE ON INDEPENDENCE ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl">
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <h2 className="text-sm font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              A note on independence
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                SENDIASS is funded by the local authority but must by law <strong>operate impartially</strong>.
              </p>
              <p>
                That means it should give you honest advice even when that advice involves challenging your local authority's decisions.
              </p>
              <p>
                If you feel the advice you are getting is not impartial, if it feels like the service is steering you away from your rights rather than towards them, you can raise a complaint with the local authority or seek support from a national organisation instead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CROSS LINKS ═══ */}
      <section className="content-section py-6">
        <div className="max-w-3xl flex flex-wrap gap-3">
          <Link
            to="/what-to-do-right-now"
            className="text-sm px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            What to do right now →
          </Link>
          <Link
            to="/ehcps"
            className="text-sm px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            The EHCP guide →
          </Link>
        </div>
      </section>

      {/* ═══ CONFIDENCE LABEL ═══ */}
      <section className="content-section py-4 pb-8">
        <StatusBadge status="confirmed" />
      </section>
    </Layout>
  );
}
