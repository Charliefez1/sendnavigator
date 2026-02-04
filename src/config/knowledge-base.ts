/**
 * SEND Reform Navigator - Curated Knowledge Base
 * 
 * This is the ONLY source of information the AI may use.
 * AI must NOT introduce external knowledge.
 * 
 * Last updated: 4th February 2026
 */

export const KNOWLEDGE_BASE = {
  lastUpdated: "4th February 2026",
  
  // ==========================================================================
  // CURRENT LEGAL POSITION
  // ==========================================================================
  currentLegalPosition: {
    confidence: "confirmed",
    content: `
The current legal framework for SEND in England is:

- Children and Families Act 2014: This remains the primary legislation governing SEND
- SEND Code of Practice 2015: This remains the statutory guidance
- Education, Health and Care Plans (EHCPs): These continue to be the mechanism for legally binding support
- Tribunal rights: The SEND Tribunal system remains in place

These laws and protections are IN FORCE TODAY. No legislation has been passed to change them.

Local authority duties under the current law include:
- Identifying children with SEND
- Assessing needs where requested
- Issuing EHCPs where the legal threshold is met
- Ensuring provision in the EHCP is delivered
- Conducting annual reviews
    `.trim(),
  },

  // ==========================================================================
  // CONFIRMED CHANGES
  // ==========================================================================
  confirmedChanges: {
    confidence: "confirmed",
    content: `
Confirmed government activity on SEND:

March 2022: The SEND Review was published, followed by the Green Paper consultation.

March 2023: The SEND and Alternative Provision Improvement Plan was published. This set out government intentions but is NOT legislation. It includes:
- Plans to develop national standards
- Proposals for strengthening early support
- Intentions around workforce development
- Commitment to improving local SEND services

Implementation is ongoing through pilot programmes and regional work.

IMPORTANT: The Improvement Plan describes intentions and plans. It does not automatically change the law. Any changes to legal rights would require consultation and legislation.
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

- Full implementation timeline for announced improvement plan commitments
- Detailed guidance to accompany any policy changes
- How funding will be allocated across local authorities
- What any future legislation might contain (if any is brought forward)
- When or if consultations will be launched on specific changes
- How any changes would affect existing EHCPs

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

For schools:
- SENCO duties remain as defined in current law
- Duties to use best endeavours continue
- Reasonable adjustments duties continue

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
- March 2022: SEND Review and Green Paper published
- March 2023: SEND and AP Improvement Plan published

Ongoing:
- Implementation of improvement plan commitments
- Regional SEND partnerships being developed
- Pilot programmes in some areas

What to watch:
- Any formal announcement of new consultations
- Publication of draft legislation (if any)
- Updates to statutory guidance

We do not include speculative dates. When confirmed dates become available, they will be added.
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
