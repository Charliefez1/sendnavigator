// ───────────────────────────────────────────────────
// UK English normalisation — general + SEND-specific
// ───────────────────────────────────────────────────

const AMERICAN_TO_UK: Array<[string, string]> = [
  // General spelling
  ["behavior", "behaviour"],
  ["behaviors", "behaviours"],
  ["behavioral", "behavioural"],
  ["behaviorally", "behaviourally"],
  ["organize", "organise"],
  ["organizes", "organises"],
  ["organized", "organised"],
  ["organizing", "organising"],
  ["organization", "organisation"],
  ["organizations", "organisations"],
  ["recognize", "recognise"],
  ["recognizes", "recognises"],
  ["recognized", "recognised"],
  ["recognizing", "recognising"],
  ["analyze", "analyse"],
  ["analyzed", "analysed"],
  ["analyzing", "analysing"],
  ["center", "centre"],
  ["centers", "centres"],
  ["color", "colour"],
  ["colors", "colours"],
  ["colored", "coloured"],
  ["colorful", "colourful"],
  ["favorite", "favourite"],
  ["favorites", "favourites"],
  ["defense", "defence"],
  ["offense", "offence"],
  ["traveling", "travelling"],
  ["traveler", "traveller"],
  ["travelers", "travellers"],
  ["modeled", "modelled"],
  ["modeling", "modelling"],
  ["canceled", "cancelled"],
  ["counseling", "counselling"],
  ["catalog", "catalogue"],
  ["aging", "ageing"],
  ["pediatrician", "paediatrician"],
  ["pediatric", "paediatric"],
  ["pediatrics", "paediatrics"],
  ["specialized", "specialised"],
  ["specializing", "specialising"],
  ["specialize", "specialise"],
  ["apologize", "apologise"],
  ["apologized", "apologised"],
  ["apologizing", "apologising"],
  ["utilize", "utilise"],
  ["utilized", "utilised"],
  ["utilizing", "utilising"],
  ["prioritize", "prioritise"],
  ["prioritized", "prioritised"],
  ["prioritizing", "prioritising"],
  ["summarize", "summarise"],
  ["summarized", "summarised"],
  ["summarizing", "summarising"],
  ["maximize", "maximise"],
  ["minimize", "minimise"],
  ["normalize", "normalise"],
  ["normalized", "normalised"],
  ["stabilize", "stabilise"],
  ["stabilized", "stabilised"],
  ["emphasize", "emphasise"],
  ["emphasized", "emphasised"],
  ["characterize", "characterise"],
  ["characterized", "characterised"],
  ["customized", "customised"],
  ["customizing", "customising"],
  ["honor", "honour"],
  ["honored", "honoured"],
  ["honoring", "honouring"],
  ["labor", "labour"],
  ["neighbor", "neighbour"],
  ["neighbors", "neighbours"],
  ["neighborhood", "neighbourhood"],
  ["program", "programme"],
  ["programs", "programmes"],
  ["license", "licence"],
  ["practice", "practise"], // verb form
  ["gray", "grey"],
  ["dialog", "dialogue"],
  ["fulfill", "fulfil"],
  ["enrollment", "enrolment"],
  ["enrolled", "enrolled"], // same in both
  ["skeptical", "sceptical"],
  ["artifact", "artefact"],
  ["maneuver", "manoeuvre"],
  ["anesthesia", "anaesthesia"],
  ["anesthetic", "anaesthetic"],
  ["estrogen", "oestrogen"],
  ["mom", "mum"],
  ["moms", "mums"],
];

// SEND-specific vocabulary replacements (US → UK education/health terms)
const SEND_VOCABULARY: Array<[RegExp, string]> = [
  // Education system terms
  [/\bspecial education\b/gi, "SEND"],
  [/\bspecial educational needs\b(?!\s+and\s+disabilities\b)/gi, "special educational needs and disabilities"],
  [/\bkindergarten\b/gi, "reception"],
  [/\bgrade school\b/gi, "primary school"],
  [/\belementary school\b/gi, "primary school"],
  [/\bmiddle school\b/gi, "secondary school"],
  [/\bhigh school\b/gi, "secondary school"],
  [/\bschool district\b/gi, "local authority"],
  [/\bschool board\b/gi, "local authority"],
  [/\baccommodations?\b/gi, "adjustments"],
  [/\breasonable accommodations?\b/gi, "reasonable adjustments"],
  // US plan types → UK equivalents
  [/\bIEP\b/g, "EHCP"],
  [/\b504 plan\b/gi, "SEN Support"],
  [/\b504\b/g, "SEN Support"],

  // Holiday not vacation
  [/\bvacation\b/gi, "holiday"],
  [/\bvacations\b/gi, "holidays"],

  // Therapy/clinical — UK SEND professional terms
  [/\bspeech-language pathologist\b/gi, "speech and language therapist"],
  [/\bspeech language pathologist\b/gi, "speech and language therapist"],
  [/\bspeech pathologist\b/gi, "speech and language therapist"],
  [/\bSLP\b/g, "SALT"],
  [/\boccupational therapist\b/gi, "occupational therapist"],
  [/\bphysical therapist\b/gi, "physiotherapist"],
  [/\bphysical therapy\b/gi, "physiotherapy"],

  // Standalone "paediatrician" kept unchanged here to avoid recursive observer rewrites

  // US role terms
  [/\bschool psychologist\b/gi, "educational psychologist"],
  [/\bschool counselor\b/gi, "school counsellor"],
  [/\bguidance counselor\b/gi, "school counsellor"],
];

// Acronym casing fixes — ensure these always appear in correct form
const ACRONYM_FIXES: Array<[RegExp, string]> = [
  [/\behcp\b/gi, "EHCP"],
  [/\behcps\b/gi, "EHCPs"],
  [/\bsenco\b/gi, "SENCO"],
  [/\bsalt\b(?![\w])/g, "SALT"], // word boundary, not part of another word — case sensitive check below
  [/\bcamhs\b/gi, "CAMHS"],
  [/\bsend\b(?=\s+(?:reform|system|code|tribunal|process|support|provision|needs|assessment|review|parent|child|family|families|rights|policy|green paper|white paper|navigator))/gi, "SEND"],
];

function applyCase(source: string, replacement: string): string {
  if (source.toUpperCase() === source) return replacement.toUpperCase();
  if (source[0] && source[0] === source[0].toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

export function normaliseCopyToUkEnglish(input: string): string {
  let output = input
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, " - ");

  // General US → UK spelling
  for (const [american, british] of AMERICAN_TO_UK) {
    const pattern = new RegExp(`\\b${american}\\b`, "gi");
    output = output.replace(pattern, (match) => applyCase(match, british));
  }

  // SEND-specific vocabulary
  for (const [pattern, replacement] of SEND_VOCABULARY) {
    output = output.replace(pattern, replacement);
  }

  // Acronym casing
  for (const [pattern, replacement] of ACRONYM_FIXES) {
    output = output.replace(pattern, replacement);
  }

  return output
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\b(and disabilities)(?:\s+and disabilities)+\b/gi, "$1")
    .replace(/\bcommunity(?:\s+community)+\s+paediatrician\b/gi, "community paediatrician");
}

function normaliseUnknownValue(value: unknown): unknown {
  if (typeof value === "string") return normaliseCopyToUkEnglish(value);
  if (Array.isArray(value)) return value.map(normaliseUnknownValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, inner]) => [key, normaliseUnknownValue(inner)]),
    );
  }
  return value;
}

export function normaliseCopyObject<T>(value: T): T {
  return normaliseUnknownValue(value) as T;
}
