/**
 * LATEST UPDATES DATA FILE
 * ========================
 * Update this single file to push new entries to every page on the site
 * that includes the <LatestUpdatesStream /> component.
 *
 * HOW TO ADD A NEW ENTRY:
 * 1. Add a new object to the TOP of the `latestUpdates` array below.
 * 2. Fill in `date`, `headline`, and `body`.
 * 3. Save the file — every page will update automatically.
 *
 * STRUCTURE:
 * {
 *   date: "23 February 2026",        // Display date string
 *   headline: "Short headline here",  // Bold one-liner, ~10 words max
 *   body: "Longer paragraph..."       // 1–3 sentences of detail
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
    headline: "Schools White Paper published — Every Child Achieving and Thriving",
    body: "The government published its Schools White Paper today, confirming a £4bn SEND package, Individual Support Plans from 2030, the Experts at Hand programme, and a decade-long transition. No legislation has changed yet. EHCPs and tribunal rights remain fully in place.",
  },
  {
    date: "23 February 2026",
    headline: "£4bn SEND funding package confirmed with four named funds",
    body: "The package splits into the Inclusive Mainstream Fund (£1.6bn direct to schools), Experts at Hand (£1.8bn for local specialist pools), Local Authority Transformation (£200m), and Best Start Family Hubs (£200m). This is on top of £3.7bn for 60,000 new specialist places.",
  },
  {
    date: "23 February 2026",
    headline: "Individual Support Plans (ISPs) announced for every child with SEND",
    body: "ISPs will be school-led statutory plans for every child with identified SEND, including those without an EHCP. They come into force from 2030. EHCPs will continue but are expected to be reserved for the most complex needs.",
  },
  {
    date: "23 February 2026",
    headline: "Tribunal confirmed to remain — but access may change",
    body: "The DfE has confirmed there are no plans to abolish the SEND tribunal. However, reports indicate access may be restricted to process failures rather than content challenges. Mediation is expected to take a greater role. Tribunal rights remain fully in place right now.",
  },
  {
    date: "23 February 2026",
    headline: "Over 132,000 signatures on petition to protect disabled children's rights",
    body: "The Save Our Children's Rights petition has triggered a Westminster Hall debate. Over 130 organisations including Mencap, the National Autistic Society, and the Council for Disabled Children have written to ministers with four red lines.",
  },
  {
    date: "23 February 2026",
    headline: "Experts at Hand programme gives schools direct access to specialists",
    body: "The £1.8bn programme gives mainstream schools access to educational psychologists, speech and language therapists, occupational therapists, and SEND specialist teachers — without a diagnosis or EHCP being required. An average secondary school is expected to receive over 160 days of specialist time per year.",
  },
];
