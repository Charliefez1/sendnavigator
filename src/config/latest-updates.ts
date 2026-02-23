/**
 * LATEST UPDATES DATA FILE
 * ========================
 * Update this single file to push new entries to every page on the site
 * that includes the <LatestUpdatesStream /> component.
 *
 * HOW TO ADD A NEW ENTRY:
 * 1. Add a new object to the TOP of the `latestUpdates` array below.
 * 2. Fill in `date`, `headline`, and `body`.
 * 3. Save the file - every page will update automatically.
 *
 * STRUCTURE:
 * {
 *   date: "23 February 2026",        // Display date string
 *   headline: "Short headline here",  // Bold one-liner, ~10 words max
 *   body: "Longer paragraph..."       // 1-3 sentences of detail
 * }
 *
 * The component shows the 3 most recent entries by default.
 * Users can click "Show more" to see the full history.
 */

export interface UpdateEntry {
  date: string;
  headline: string;
  body: string;
}

export const latestUpdates: UpdateEntry[] = [
  {
    date: "23 February 2026",
    headline: "Schools White Paper published: Every Child Achieving and Thriving",
    body: "The government published its Schools White Paper today alongside a 12-week SEND consultation, proposing the most significant reform since the Children and Families Act 2014. A new four-tier support system, Individual Support Plans, £4bn in new funding, and a significant narrowing of who qualifies for an EHCP. Nothing in this white paper changes any parent's legal rights today. The consultation runs until 18 May 2026.",
  },
  {
    date: "23 February 2026",
    headline: "Individual Support Plans (ISPs) announced, but they are not EHCPs",
    body: "ISPs are new statutory plans schools must produce for every child with SEND, without needing a diagnosis. However, ISPs do not carry SEND Tribunal rights. Disputes go through school complaints with an independent SEND expert. ISPs are written by schools, not local authorities. They do not name a placement or carry the same legal weight as Section F of an EHCP. By 2030, 15-20% of pupils are projected to have an ISP.",
  },
  {
    date: "23 February 2026",
    headline: "EHCPs retained but significantly narrowed. One in eight may transition to ISPs",
    body: "EHCPs continue only for children needing a Specialist Provision Package. The DfE projects roughly one in eight children currently on EHCPs will transition to ISPs between 2030 and 2035. The EHCP rate is projected to drop from 7.7% to approximately 4.7% by 2034-35. The right to appeal to the SEND Tribunal is retained for EHCP decisions. No changes to existing EHCPs before September 2030.",
  },
  {
    date: "23 February 2026",
    headline: "Triple lock transition protections confirmed for existing EHCPs",
    body: "Three protections stated: (1) every child with a special school place in September 2029 keeps it until they finish education, (2) EHCP-to-ISP transition only begins from September 2030 at natural phase transitions, (3) ISPs must be in place before any EHCP is removed. Children in Year 3 or above today keep their EHCP until at least age 16.",
  },
  {
    date: "23 February 2026",
    headline: "£4bn reform funding package, but questions over sustainability",
    body: "The package splits into: Inclusive Mainstream Fund (£1.6bn direct to schools), Experts at Hand (£1.8bn for local specialist pools), Local Authority Transformation (£200m), and Best Start Family Hubs (£200m). Schools Week calculates the IMF works out at roughly £26,000 per setting per year. What happens after the initial three-year period is not stated.",
  },
  {
    date: "23 February 2026",
    headline: "Experts at Hand: £1.8bn programme, but acute workforce shortages",
    body: "The programme gives schools access to EPs, SLTs, OTs, and specialist SEND teachers without an EHCP. But the Royal College of SLTs reports a 20% vacancy rate, 88% of councils report EP recruitment difficulties, and training takes six years. The government commits £40m for training and 200+ EP trainees per year. A pipeline, not a solution.",
  },
  {
    date: "23 February 2026",
    headline: "Specialist Provision Packages: approximately seven nationally defined pathways",
    body: "These replace the current EHCP assessment model. An independent expert panel will define them after the consultation. The consultation states children with autism 'may not necessarily be supported by the same Specialist Provision Package.' Leaked reports suggest autism and ADHD may be classified as 'predictable' needs, with many children receiving ISPs instead of EHCPs.",
  },
  {
    date: "23 February 2026",
    headline: "Masking, EBSA, co-occurring conditions, and gender gaps: all absent",
    body: "The word 'masking' does not appear anywhere in the white paper or consultation. Neither does EBSA, school refusal, co-occurring conditions, or gender differences in identification. The reform is built on 'early identification' but does not address why identification fails, particularly for girls, children who mask, and those with internalising presentations.",
  },
  {
    date: "23 February 2026",
    headline: "SEND consultation open until 18 May 2026. 27 questions across five parts",
    body: "The consultation 'SEND reform: putting children and young people first' is at consult.education.gov.uk/SEND-Reform. Key questions for parents: Q15 (what makes ISPs high quality), Q22 (how Specialist Provision Packages should work), Q23 (what's needed for new EHCP proposals), Q25 (masking, co-occurring conditions, gender bias in assessment). Easy read, BSL, and child-friendly versions available.",
  },
  {
    date: "23 February 2026",
    headline: "90% write-off of council SEND deficits, estimated over £5 billion",
    body: "Councils must submit local SEND reform plans to DfE before receiving the write-off. The remaining 10% must be repaid by March 2028. The statutory override preventing SEND deficits from affecting council general funds is extended to March 2028.",
  },
  {
    date: "23 February 2026",
    headline: "Over 132,000 signatures on petition to protect disabled children's rights",
    body: "The Save Our Children's Rights petition has triggered a Westminster Hall debate. Over 130 organisations including Mencap, the National Autistic Society, and the Council for Disabled Children have written to ministers with four red lines. The NAS said reforms 'aren't anywhere near enough to fix the broken SEND system.'",
  },
  {
    date: "23 February 2026",
    headline: "What parents should do right now: continue or accelerate EHCP applications",
    body: "Nothing has changed legally. The Children and Families Act 2014 is in full force. Parents should not pause EHCP processes. The direction of travel is towards fewer EHCPs. A child with an EHCP before September 2029 has explicit transitional protections. A child without one will be assessed under a narrower system. Respond to the consultation by 18 May 2026.",
  },
];