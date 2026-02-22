import jsPDF from "jspdf";
import { ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";

export function generateProfilePDF(state: ChildProfileState) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  const childName = state.setup.childName || "Child";
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Helper to add wrapped text and return new Y
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, style: "normal" | "bold" | "italic" = "normal"): number => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", style);
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      if (y > 270) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, x, y);
      y += fontSize * 0.5;
    }
    return y;
  };

  // --- COVER PAGE ---
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(`${childName}'s Profile`, margin, 60);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(today, margin, 75);

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(`Prepared by: ${state.setup.filledBy}`, margin, 90);

  if (state.setup.sharedWith.length > 0) {
    doc.text(`Intended audience: ${state.setup.sharedWith.join(", ")}`, margin, 98);
  }

  if (state.setup.reason) {
    doc.text(`Reason: ${state.setup.reason}`, margin, 106);
  }

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("This is not a diagnostic document. It is a parent-prepared profile.", margin, 280);
  doc.text("sendnavigator.neuro.support", margin, 285);

  // --- SECTIONS ---
  SECTION_TITLES.forEach((title, index) => {
    const section = state.sections[index];
    if (!section) return;

    const hasAnswers = Object.values(section.answers).some(
      (v) => (Array.isArray(v) ? v.length > 0 : v.trim().length > 0)
    );
    const hasReflection = section.reflection.trim().length > 0;

    if (!hasAnswers && !hasReflection) return;

    doc.addPage();
    let y = margin;

    // Section title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${title}`, margin, y);
    y += 12;

    // Answers
    Object.entries(section.answers).forEach(([questionId, value]) => {
      const displayValue = Array.isArray(value) ? value.join(", ") : value;
      if (!displayValue.trim()) return;

      y = addWrappedText(questionId.replace(/_/g, " "), margin, y, contentWidth, 10, "bold");
      y += 2;
      y = addWrappedText(displayValue, margin, y, contentWidth, 10);
      y += 6;
    });

    // Reflection
    if (hasReflection) {
      y += 4;
      y = addWrappedText("Reflection", margin, y, contentWidth, 10, "bold");
      y += 2;
      y = addWrappedText(section.reflection, margin, y, contentWidth, 10);
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("This is not a diagnostic document. It is a parent-prepared profile.", margin, 280);
    doc.text("sendnavigator.neuro.support", margin, 285);
  });

  // --- FINAL STATEMENT ---
  if (state.finalStatement.trim()) {
    doc.addPage();
    let y = margin;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("What matters most", margin, y);
    y += 12;

    y = addWrappedText(state.finalStatement, margin, y, contentWidth, 11);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("This is not a diagnostic document. It is a parent-prepared profile.", margin, 280);
    doc.text("sendnavigator.neuro.support", margin, 285);
  }

  // Download
  doc.save(`${childName.toLowerCase()}-profile.pdf`);
}
