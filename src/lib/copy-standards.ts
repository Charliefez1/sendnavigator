const AMERICAN_TO_UK: Array<[string, string]> = [
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

  for (const [american, british] of AMERICAN_TO_UK) {
    const pattern = new RegExp(`\\b${american}\\b`, "gi");
    output = output.replace(pattern, (match) => applyCase(match, british));
  }

  return output
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1");
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
