/**
 * SEND Reform Navigator - Curated Knowledge Base
 * 
 * This is the ONLY source of information SEND AI may use.
 * SEND AI must NOT introduce external knowledge.
 * 
 * Last updated: 7th February 2026
 */

export const KNOWLEDGE_BASE = {
  lastUpdated: "7th February 2026",
  
  // ==========================================================================
  // CURRENT LEGAL POSITION
  // ==========================================================================
  currentLegalPosition: {
    confidence: "confirmed",
    content: `
The current legal framework for SEND in England is:

- SEND provision in England is governed by the Children and Families Act 2014 (UK Parliament, 13 March 2014)
- SEND Code of Practice 2015 remains the statutory guidance
- Education, Health and Care Plans (EHCPs) continue to be the mechanism for legally binding support
- Tribunal rights remain unchanged

Key statistics (2024 to 2025):
- Around 482,000 pupils in England had an EHC plan (Department for Education, 26 June 2025)
- Around 1.28 million pupils received SEN support without an EHC plan (Department for Education, 26 June 2025)
- Only around half of EHC plans were issued within the 20 week legal timescale (Public Accounts Committee, 15 January 2025)
- The SEND system has been described as financially unsustainable (National Audit Office, 24 October 2024)
- High needs funding reached around £9.4 billion in 2024/25 (Local Government Association, 23 April 2025)

These laws and protections are IN FORCE TODAY. No legislation has been passed to change them.
    `.trim(),
  },

  // ==========================================================================
  // CONFIRMED CHANGES
  // ==========================================================================
  confirmedChanges: {
    confidence: "confirmed",
    content: `
Confirmed government activity on SEND:

- The SEND and Alternative Provision Improvement Plan was published (Department for Education, 02 March 2023)
- A SEND Change Programme is testing reforms with selected local areas (Department for Education, 02 March 2023)
- A national conversation on SEND reform ran from December 2025 to January 2026 (Department for Education, 14 January 2026)
- Government announced £3 billion capital funding to expand specialist places (Department for Education, 02 March 2023)
- Government announced a £200 million SEND teacher training programme (Department for Education, 16 January 2026)

What is being tested:
- National SEND standards are being developed and tested (Department for Education, ongoing since 2023)
- Digital approaches to EHC plans are being piloted in some areas (Department for Education, ongoing since 2023)

IMPORTANT: Pilots are not national policy. No confirmed changes to EHC plan eligibility. Any changes to legal rights would require consultation and legislation.
    `.trim(),
  },

  // ==========================================================================
  // EHCPS AND RIGHTS
  // ==========================================================================
  ehcpsAndRights: {
    confidence: "confirmed",
    content: `
Current EHCP position:

EHCPs (Education, Health and Care Plans) remain the legal mechanism for specifying and securing support for children and young people with significant SEND.

Key facts:
- EHCPs are issued under the Children and Families Act 2014
- They create legally binding duties on local authorities
- Parents have the right to request an assessment
- There is a right of appeal to the SEND Tribunal
- Annual reviews are required

There is NO confirmed legislation to abolish EHCPs or remove the right to appeal.

Any proposals you may have heard about:
- Remain proposals only
- Would require primary legislation to implement
- Would require public consultation
- Would need parliamentary approval
    `.trim(),
  },

  // ==========================================================================
  // LEAKS AND UNCONFIRMED REPORTS
  // ==========================================================================
  leaksAndReports: {
    confidence: "unconfirmed",
    content: `
What the leaks and media reports say:

Various media outlets have reported on possible government plans for SEND reform. These include reports about:
- Possible changes to eligibility thresholds
- Discussions about funding mechanisms
- Potential reforms to the EHCP system

CRITICAL CONTEXT:
- These are NOT government policy
- They have NOT been formally announced
- They would require legislation to implement
- Consultation would be required
- Parliament would need to approve any changes

What would need to happen for changes to become real:
1. Formal government announcement or white paper
2. Public consultation period
3. Draft legislation published
4. Parliamentary scrutiny and debate
5. Royal Assent for any Bill
6. Implementation period
7. Commencement orders to bring provisions into force

Until these steps occur, the current law remains in effect.
    `.trim(),
  },

  // ==========================================================================
  // WHAT IS NOT KNOWN
  // ==========================================================================
  unknownAreas: {
    confidence: "unknown",
    content: `
Areas where information is not yet available:

Where we are now:
- How quickly performance on EHC plan timescales will improve
- Whether current spending levels will stabilise demand
- How outcomes beyond attainment will change

What is changing:
- Final content of national SEND standards
- Which elements will require changes to law
- How reforms will be implemented nationally

Timeline:
- Exact consultation launch date
- Content of draft legislation
- Implementation dates for any legal changes

We do not speculate on these matters. When information becomes available through official sources, this resource will be updated.
    `.trim(),
  },

  // ==========================================================================
  // PRACTICAL IMPLICATIONS
  // ==========================================================================
  practicalImplications: {
    confidence: "discussed",
    content: `
What current and proposed changes could mean in practice:

For families:
- Current EHCPs remain legally enforceable
- Rights to request assessment continue
- Tribunal rights remain available
- Local authority duties continue
- Wait times for EHC plan assessments may be longer than the legal timeframe in some areas

For schools:
- SENCO duties remain as defined in current law
- Duties to use best endeavours continue
- Reasonable adjustments duties continue
- Schools may have varying levels of capacity to provide SEN Support

For local authorities:
- Statutory duties under current law remain in force
- Assessment and provision duties continue
- Any new requirements would need to be implemented with guidance

When interpreting potential changes:
- "Could mean" indicates possible interpretation
- "May affect" indicates uncertain impact
- Current law takes precedence until changed
    `.trim(),
  },

  // ==========================================================================
  // TIMELINE INFORMATION
  // ==========================================================================
  timelineInformation: {
    confidence: "discussed",
    content: `
Timeline of key events:

Completed:
- March 2023: SEND Improvement Plan launched (Department for Education)
- 2023 to present: Change Programme testing has run
- 14 January 2026: National conversation closed (Department for Education)

Upcoming:
- 2026: Government has stated a formal consultation will take place (Department for Education, December 2025)

What is being discussed or reported:
- A Schools White Paper is expected to include SEND reform proposals (sector reporting, December 2025)

What we do not know yet:
- Exact consultation launch date
- Content of draft legislation
- Implementation dates for any legal changes

Important: Future dates are subject to parliamentary process. No changes apply until legislation is passed.
    `.trim(),
  },


  // ==========================================================================
  // INTERNAL NAVIGATION
  // ==========================================================================
  internalPages: [
    { path: "/where-we-are-now", label: "Where we are now", description: "Current SEND system and law" },
    { path: "/what-is-changing", label: "What is changing", description: "Confirmed reforms and plans" },
    { path: "/what-the-leaks-are-saying", label: "What the leaks are saying", description: "Unconfirmed reports" },
    { path: "/what-this-could-mean", label: "What this could mean", description: "Practical implications" },
    { path: "/timeline", label: "Timeline and next steps", description: "Key dates and milestones" },
    { path: "/questions-and-answers", label: "Questions and answers", description: "Common questions" },
    { path: "/sources", label: "Sources", description: "How we verify information" },
    { path: "/about", label: "About this resource", description: "Independence and scope" },
  ],
};

export type KnowledgeSection = keyof Omit<typeof KNOWLEDGE_BASE, 'lastUpdated' | 'internalPages'>;
