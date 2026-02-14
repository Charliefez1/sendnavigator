/**
 * Articles and information from the SEND Community.
 * External lived-experience resources referenced by the knowledge base.
 */

export interface CommunitySource {
  name: string;
  url: string;
  summary: string;
}

export interface CommunitySourceCategory {
  title: string;
  sources: CommunitySource[];
}

export const communitySourceCategories: CommunitySourceCategory[] = [
  {
    title: "First person parent and lived experience articles",
    sources: [
      { name: "Too Sensitive, Too Quiet, Too Missed", url: "https://thebigsmoke.com.au/2026/01/19/too-sensitive-too-quiet-too-missed-how-australian-schools-are-failing-girls-with-adhd/", summary: "Girls with ADHD overlooked in school systems." },
      { name: "The Quiet Crisis Facing Parents of Neurodiverse Children", url: "https://thebigsmoke.com.au/2026/02/13/the-quiet-crisis-facing-parents-of-neurodiverse-children/", summary: "Parents describe exhaustion and systemic pressure." },
      { name: "Why We Should Stop Trying to Fix Neurodiverse Kids", url: "https://thebigsmoke.com.au/2025/10/10/why-we-should-stop-trying-to-fix-neurodiverse-kids-fix-the-environment-instead/", summary: "Environment change over child compliance." },
    ],
  },
  {
    title: "EHCP and SEND journey stories",
    sources: [
      { name: "Cheshire East Council – A Parent's Experience of the EHCP Process", url: "https://www.cheshireeast.gov.uk/schools/education-and-learning/send/send-stories.aspx", summary: "Mum describes diagnosis wait and EHCP relief." },
      { name: "Oliver Finally Gets His EHCP", url: "https://www.ndcs.org.uk/information-and-support/parent-stories/oliver-finally-gets-his-ehcp/", summary: "Family narrates fight for EHCP approval." },
      { name: "Using an Online EHCP: A Parent's Story", url: "https://www.specialneedsjungle.com/using-an-online-ehcp-a-parents-story/", summary: "Digital EHCP and school transition experience." },
      { name: "Laura's Story – Our EHCP Journey", url: "https://www.paccshropshire.org.uk/lauras-story-our-ehcp-journey/", summary: "Refusal appeal and eventual EHCP success." },
      { name: "Seven Steps to Success: Autistic Son's EHCP", url: "https://www.specialneedsjungle.com/seven-steps-to-success-autistic-sons-ehcp/", summary: "Parent checklist from lived EHCP experience." },
    ],
  },
  {
    title: "Raw and emotionally driven parent pieces",
    sources: [
      { name: "The Heartbreaking Injustice of the SEND Parent", url: "https://www.happymumhappybaby.com/send-parent-injustice/", summary: "Emotional account of fighting education systems." },
      { name: "From the Challenges to the Joy: Parenting a Neurodivergent Child", url: "https://www.lionheart.org.uk/blog/parenting-a-neurodivergent-child/", summary: "ADHD diagnosis journey and school adjustments." },
    ],
  },
  {
    title: "Everyday parenting and home life reflections",
    sources: [
      { name: "Sensory Shine – The Hidden Load of Parenting a Neurodivergent Child", url: "https://www.sensoryshine.co.uk/blog/the-hidden-load-of-parenting-a-neurodivergent-child", summary: "Constant advocacy and invisible parental labour." },
      { name: "Neurotastic – Parent Wellbeing", url: "https://neurotastic.co.uk/category/parent-wellbeing/", summary: "Parent mental health and overwhelm explored." },
      { name: "OM Interactive – SEND Blogs", url: "https://www.om-interactive.co.uk/send-blogs/", summary: "Personal SEND stories with practical insight." },
      { name: "Gentle Parenting: Transforming an Autistic Child's Life", url: "https://attachmentparentinguk.org/gentle-parenting-transforming-an-autistic-childs-life/", summary: "Parent reflection on co-regulation approach." },
      { name: "Parenting an Autistic Child", url: "https://www.gingerbread.org.uk/information/parenting/parenting-an-autistic-child/", summary: "Single parent experiences and practical routines." },
    ],
  },
  {
    title: "Neurodivergent parents writing themselves",
    sources: [
      { name: "Autistic Parents UK – Blog", url: "https://autisticparentsuk.org/blog/", summary: "Autistic parents writing about parenting realities." },
    ],
  },
  {
    title: "Media and mainstream lived experience pieces",
    sources: [
      { name: "I Think My Daughter Might Be Neurodivergent", url: "https://www.thetimes.com/life-style/parenting/article/i-think-my-daughter-might-be-neurodivergent-should-she-be-tested-90qhqvr6r", summary: "Parent explores decision to seek assessment." },
      { name: "Temporary Accommodation Is Torture for Neurodivergent Children", url: "https://www.theguardian.com/society/2026/jan/27/temporary-accommodation-england-torture-neurodivergent-children-report", summary: "Housing instability impact on neurodivergent children." },
      { name: "Mattel Launches Its First Autistic Barbie", url: "https://www.theguardian.com/society/2026/jan/12/mattel-launches-its-first-autistic-barbie", summary: "Representation of autism in children's toys." },
    ],
  },
  {
    title: "Forums and unfiltered voices",
    sources: [
      { name: "Reddit – r/UKParenting", url: "https://www.reddit.com/r/UKParenting/", summary: "UK parents sharing SEND and EHCP experiences." },
    ],
  },
  {
    title: "Advocacy and rights rooted in parent testimony",
    sources: [
      { name: "Parental Experiences of the UK SEND System", url: "https://onlinelibrary.wiley.com/doi/10.1111/1467-8578.12456", summary: "Parent voices describing power imbalance." },
      { name: "Human Rights Must Be Core to SEND Support", url: "https://www.bihr.org.uk/blog/human-rights-must-be-core-to-send-support-now", summary: "SEND reform argued using parent experiences." },
    ],
  },
  {
    title: "Support and guidance written from experience",
    sources: [
      { name: "Empowering Parents and Carers of Neurodivergent Children", url: "https://www.newgladecounselling.co.uk/empowering-parents-carers-neurodivergent-children/", summary: "Experience led guidance on diagnosis decisions." },
      { name: "Supporting Your Neurodivergent Child", url: "https://healthwatchharingey.co.uk/supporting-your-neurodivergent-child/", summary: "Parent created practical guidance resource." },
    ],
  },
  {
    title: "Ongoing everyday discovery sources",
    sources: [
      { name: "Search: Our EHCP Journey", url: "https://www.google.com/search?q=our+EHCP+journey", summary: "Personal SEND stories across the UK." },
      { name: "Search: SEND Parent Story UK", url: "https://www.google.com/search?q=SEND+parent+story+UK", summary: "First person UK SEND experiences." },
      { name: "Search: Parenting Neurodivergent Child Blog UK", url: "https://www.google.com/search?q=parenting+neurodivergent+child+blog+UK", summary: "Blogs written by parents for parents." },
    ],
  },
];
