import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { OnThisPage } from "@/components/templates";
import type { PageSectionDef } from "@/components/templates";

import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, AlertTriangle, ArrowRight, Clock, Info, FileText, MapPin, Scale } from "lucide-react";
import { WordFromRich } from "@/components/WordFromRich";
const pageSections: PageSectionDef[] = [
  { id: "reference-table", icon: FileText, title: "Quick reference" },
  { id: "wales", icon: MapPin, title: "Wales" },
  { id: "scotland", icon: MapPin, title: "Scotland" },
  { id: "northern-ireland", icon: MapPin, title: "Northern Ireland" },
  { id: "moving-between", icon: Scale, title: "Moving between nations" },
];

function SH({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-lg font-display font-semibold text-foreground mt-10 mb-4 first:mt-0 scroll-mt-20">{children}</h2>;
}

function CC({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-status-confirmed/10 border border-status-confirmed/30 p-4 flex items-start gap-3 mt-5">
      <CheckCircle2 className="w-5 h-5 text-status-confirmed flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-status-confirmed uppercase tracking-wider mb-1">Confirmed</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function EL({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{children}</span>
      <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
    </a>
  );
}

const tableData = [
  { label: "Term for the area", eng: "SEND", wal: "ALN", sco: "ASN", ni: "SEN" },
  { label: "Statutory plan", eng: "EHC plan", wal: "IDP", sco: "CSP (very high threshold)", ni: "Statement of SEN" },
  { label: "Legal basis", eng: "Children and Families Act 2014", wal: "ALN and Education Tribunal (Wales) Act 2018", sco: "Education (ASL) (Scotland) Act 2004", ni: "Education (NI) Order 1996; SENDO 2005" },
  { label: "Age range", eng: "0 to 25", wal: "0 to 25", sco: "School age and early years; post-16 with some differences", ni: "Up to 19 (school-based)" },
  { label: "Main advice org", eng: "IPSEA / SENDIASS", wal: "SNAP Cymru", sco: "Enquire / Let's Talk ASN", ni: "SENAC" },
  { label: "Tribunal", eng: "SEND Tribunal", wal: "Education Tribunal for Wales", sco: "First-tier Tribunal for Scotland", ni: "SENDIST Northern Ireland" },
];

export default function DevolvedNations() {
  return (
    <Layout>
      <SEOHead
        title="If You Are in Wales, Scotland, or Northern Ireland - SEND Navigator"
        description="SEND provision is devolved. Each nation has different legislation, terminology, and organisations. Find the right system and the right support for your nation."
        path="/devolved-nations"
      />

      <header className="content-section py-8 border-b border-border">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 mb-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">This site focuses on the English SEND system</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Education and SEND provision are devolved. If you are in Wales, Scotland, or Northern Ireland, <strong>most of the legal detail on this site does not apply to your situation</strong>. The rights, plans, and processes are different. This page gets you to the right places.</p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3">
          If You Are in Wales, Scotland, or Northern Ireland
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          This page explains the key differences between nations and points you to the right organisations. It does not attempt to replicate the depth of the England content. It is an honest signpost.
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Last reviewed: February 2026.</span>
        </div>
      </header>

      <WordFromRich>
        <p>If you are in Wales, Scotland, or Northern Ireland, I want to be straight with you. Most of this site was built around the English system. I am sorry this page cannot do more. What I can do is point you to the people who understand your system deeply, in your nation, with your legislation. The organisations listed here are the real thing. They know your rights. Use them.</p>
      </WordFromRich>

      <OnThisPage sections={pageSections} />
      

      {/* Quick reference table — placed high per build notes */}
      <section className="content-section py-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="reference-table">Quick reference: how the four nations compare</SH>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold text-foreground text-xs"></th>
                  <th className="text-left py-2 px-2 font-semibold text-foreground text-xs">England</th>
                  <th className="text-left py-2 px-2 font-semibold text-foreground text-xs">Wales</th>
                  <th className="text-left py-2 px-2 font-semibold text-foreground text-xs">Scotland</th>
                  <th className="text-left py-2 px-2 font-semibold text-foreground text-xs">N. Ireland</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="py-2.5 px-2 font-medium text-foreground text-xs whitespace-nowrap">{row.label}</td>
                    <td className="py-2.5 px-2 text-muted-foreground text-xs">{row.eng}</td>
                    <td className="py-2.5 px-2 text-muted-foreground text-xs">{row.wal}</td>
                    <td className="py-2.5 px-2 text-muted-foreground text-xs">{row.sco}</td>
                    <td className="py-2.5 px-2 text-muted-foreground text-xs">{row.ni}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Wales */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="wales">Wales</SH>

          <h3 className="text-sm font-semibold text-foreground mt-2 mb-2">The system</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Wales replaced the English SEND system with the <strong>Additional Learning Needs (ALN)</strong> system. The legal basis is the Additional Learning Needs and Education Tribunal (Wales) Act 2018. Implementation began in September 2021 and was <strong>phased in fully by August 2025</strong>.</p>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Key terms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            {[
              { eng: "SEND", wal: "ALN (Additional Learning Needs)" },
              { eng: "EHC plan", wal: "IDP (Individual Development Plan)" },
              { eng: "SENCO", wal: "ALNCo" },
            ].map((t) => (
              <div key={t.eng} className="rounded-lg bg-muted/30 border border-border p-3">
                <p className="text-xs text-muted-foreground">England: <strong>{t.eng}</strong></p>
                <p className="text-xs text-foreground font-medium mt-1">Wales: {t.wal}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Important differences from England</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>In England, statutory plans (EHCPs) are only issued for children with the most complex and severe needs. In Wales, <strong>any child or young person who has ALN and requires additional learning provision is entitled to a statutory IDP</strong> regardless of the severity of their needs. This is a wider entitlement than in England.</p>
            <p>The ALN system covers children and young people <strong>aged 0 to 25</strong>.</p>
            <p><strong>Welsh language rights</strong> are built into the system. Local authorities and schools must consider whether a child should receive support in Welsh.</p>
            <p>The tribunal for Wales is the <strong>Education Tribunal for Wales</strong>.</p>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Key organisations</h3>
          <div className="space-y-2">
             <EL href="https://www.snapcymru.org">SNAP Cymru - independent advice and advocacy for families in Wales</EL>
             <EL href="https://www.gov.wales/additional-learning-needs">Welsh Government ALN pages - statutory guidance and parent factsheets</EL>
            <EL href="https://educationtribunal.gov.wales">Education Tribunal for Wales</EL>
            <EL href="https://childrenslegalcentre.wales">Children's Legal Centre Wales - legal support for children's rights</EL>
          </div>

          <CC>Additional Learning Needs and Education Tribunal (Wales) Act 2018; ALN Code for Wales 2021; Welsh Government implementation guidance.</CC>
        </div>
      </section>

      {/* Scotland */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="scotland">Scotland</SH>

          <h3 className="text-sm font-semibold text-foreground mt-2 mb-2">The system</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Scotland uses the term <strong>Additional Support for Learning (ASL)</strong> and <strong>Additional Support Needs (ASN)</strong>. The legal framework is the Education (Additional Support for Learning) (Scotland) Act 2004, as amended in 2009.</p>
            <p>Scotland's approach is explicitly <strong>inclusion-first</strong>. The presumption of mainstreaming means all children with additional support needs have the right to be educated in mainstream schools unless specific circumstances apply.</p>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Key terms</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>There is <strong>no direct Scottish equivalent of the EHC plan</strong> for most children. Most children with ASN receive support through less formal, non-statutory planning processes (IEPs or Child Plans) that <strong>are not legally binding</strong>.</p>
            <p>The only statutory plan in Scotland is the <strong>Co-ordinated Support Plan (CSP)</strong>, a legally binding document available only to children with complex or multiple needs that require support from education and at least one other agency.</p>
          </div>

          {/* CSP threshold callout */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 mt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">The CSP threshold is significantly higher than the EHCP threshold</p>
                <p className="text-sm text-muted-foreground leading-relaxed">In practice, very few children receive a CSP. As of 2018, the proportion of the school population with a CSP was approximately <strong>0.12%</strong>, compared with around <strong>4.8%</strong> of the school population in England with an EHCP by 2024.</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">This means many children in Scotland who would qualify for an EHCP in England <strong>do not have a legally binding statutory plan</strong>.</p>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">If you have moved from England to Scotland</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Scottish schools have a duty to <strong>take your child's existing plan into account</strong> when assessing their needs. It does not automatically transfer into a CSP. Contact the local authority in your new area.</p>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Key organisations</h3>
          <div className="space-y-2">
             <EL href="https://enquire.org.uk">Enquire - Scottish advice service for additional support for learning</EL>
             <EL href="https://www.ltasn.scot">Let's Talk ASN - advocacy and legal representation for the ASN Tribunal</EL>
             <EL href="https://education.gov.scot/parentzone">Parentzone Scotland - information and guidance for parents</EL>
          </div>

          <CC>Education (Additional Support for Learning) (Scotland) Act 2004 as amended 2009; Scottish Government additional support for learning guidance 2017; Scottish Children's Services Coalition data.</CC>
        </div>
      </section>

      {/* Northern Ireland */}
      <section className="content-section py-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SH id="northern-ireland">Northern Ireland</SH>

          <h3 className="text-sm font-semibold text-foreground mt-2 mb-2">The system</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Northern Ireland retains the older <strong>SEN (Special Educational Needs)</strong> framework, most closely resembling the pre-2014 system that England replaced with EHCPs. The legal basis is the Education (Northern Ireland) Order 1996, as amended by the SENDO 2005.</p>
            <p>The <strong>Education Authority (EA)</strong> is the single body responsible for delivering SEN services across Northern Ireland. There are no separate local authority SEND teams as in England.</p>
          </div>

          {/* Partial implementation callout */}
          <div className="rounded-lg border border-status-discussed/30 bg-status-discussed/10 p-4 flex items-start gap-3 mt-4">
            <Clock className="w-5 h-5 text-status-discussed flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">The 2016 SEND Act is not fully in force</p>
              <p className="text-sm text-muted-foreground leading-relaxed">A new SEND Act for Northern Ireland received Royal Assent in 2016. However, <strong>only limited provisions have been commenced</strong>. A new SEN Code of Practice has been drafted but is not yet in force. This position may change as implementation continues.</p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Key terms</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The statutory plan is the <strong>Statement of Special Educational Needs</strong>, broadly equivalent to the old Statement of SEN in England before EHCPs.</p>
            <p>There is <strong>no EHC plan</strong> in Northern Ireland. The Statement does not include the health and care components that English EHCPs cover.</p>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Important differences from England</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>The statutory assessment process should be completed within <strong>26 weeks</strong>, similar to England.</p>
            <p>Appeals go to <strong>SENDIST Northern Ireland</strong>, not the SEND Tribunal in England and Wales.</p>
            <p><strong>IPSEA does not advise on Northern Ireland law.</strong> If you are in Northern Ireland, SENAC is the equivalent advisory service.</p>
            <p>The 2020 NICCY review "Too Little Too Late" documented significant failures in SEN provision, with <strong>nearly 20% of pupils</strong> having some form of SEN by 2021/22.</p>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">Key organisations</h3>
          <div className="space-y-2">
             <EL href="https://senac.co.uk">SENAC - free, independent advice and advocacy (advice line: 028 9079 5779)</EL>
             <EL href="https://www.eani.org.uk/parents/special-educational-needs-sen">Education Authority NI - statutory assessment and SEN information</EL>
             <EL href="https://contact.org.uk/northernireland">Contact - information and advice for families with disabled children</EL>
             <EL href="https://www.niccy.org">NICCY - Northern Ireland Commissioner for Children and Young People</EL>
          </div>

          <CC>Education (Northern Ireland) Order 1996; SENDO 2005; SEND Act (NI) 2016; Education Authority Northern Ireland; SENAC; NICCY Too Little Too Late review 2020. 2016 SEND Act: passed but not fully implemented as of early 2026.</CC>
        </div>
      </section>

      {/* Moving between nations */}
      <section className="content-section py-4">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 shadow-lg">
          <SH id="moving-between">If you are moving between nations</SH>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p><strong>Your child's existing plan does not automatically transfer.</strong> Each nation's legislation is different and the receiving authority will assess needs under its own framework.</p>
            <p>Before moving, <strong>get as much documentation as possible</strong>. Ask the current school and local authority or Education Authority for all reports, assessments, and plans in writing.</p>
            <p>Contact the relevant advice organisation in the nation you are moving to <strong>before the move</strong> if possible. They can tell you what to expect and how to prepare.</p>
          </div>

          <div className="rounded-lg bg-card border border-border p-4 mt-4 space-y-3">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed"><strong>Moving from England to another nation with an EHCP:</strong> the receiving authority has a duty to take your child's existing plan into account. It does not mean your child will receive an equivalent statutory plan automatically.</p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed"><strong>Moving from another nation to England:</strong> the receiving English local authority has duties under the Children and Families Act 2014 to assess your child's needs. They cannot refuse to consider support simply because your child does not arrive with an EHCP.</p>
            </div>
          </div>

          <CC>Children and Families Act 2014 (England); Education (Additional Support for Learning) (Scotland) Act 2004; the duty to consider existing plans on transfer is established in guidance across nations. Specific timescales and processes vary. Always get specialist advice from the relevant national organisation before and after a move.</CC>
        </div>
      </section>

      {/* Cross-links */}
      <section className="content-section py-6 pb-8">
        <div className="space-y-2">
          <Link to="/" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Back to the homepage</p>
          </Link>
          <Link to="/ehcps" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ The EHCP Guide (England only)</p>
          </Link>
          <Link to="/questions-and-answers" className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all group">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm flex-1">→ Ask SEND - search for answers (England-focused)</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
