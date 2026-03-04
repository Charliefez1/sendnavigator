/**
 * Mini report uses 8 core sections (0-indexed).
 * Full report uses all 22.
 * When upgrading from mini to full, existing answers are preserved.
 */
export const MINI_SECTIONS = [0, 3, 5, 6, 9, 10, 11, 13] as const;

// Labels for UI display
export const MINI_SECTION_LABELS: Record<number, string> = {
  0: "Environment",
  3: "Nervous System and Dysregulation",
  5: "Sensory Processing",
  6: "Executive Function and the Knowing-Doing Gap",
  9: "Masking and the Cost of Compliance",
  10: "Communication and Social Understanding",
  11: "Behaviour",
  13: "Strength Profile",
};

export type ReportMode = "mini" | "full";
