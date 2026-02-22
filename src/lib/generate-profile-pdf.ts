import jsPDF from "jspdf";
import { ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { sectionContent } from "@/config/child-profile-sections";
import { childVoiceQuestions } from "@/config/child-voice-questions";

interface ReportData {
  state: ChildProfileState;
  aiReport: string;
}

export function generateProfilePDF({ state, aiReport }: ReportData) {
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
  const dateCompact = new Date().toISOString().split("T")[0].replace(/-/g, "");

  const footer = (doc: jsPDF) => {
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(130, 130, 130);
    doc.text("This is not a diagnostic document. sendnavigator.neuro.support", margin, 285);
    doc.setTextColor(0, 0, 0);
  };

  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number,
    style: "normal" | "bold" | "italic" = "normal"
  ): number => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", style);
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      if (y > 268) {
        footer(doc);
        doc.addPage();
        y = margin;
      }
      doc.text(line, x, y);
      y += fontSize * 0.45;
    }
    return y;
  };

  // Parse AI report into sections
  const parseAIReport = (report: string) => {
    const sections: Record<string, string> = {};
    let waysOfWorking = "";

    // Split by section headings
    const lines = report.split("\n");
    let currentKey = "";
    let currentContent: string[] = [];

    for (const line of lines) {
      // Check for "Ways of Working" heading
      if (/^#+\s*Ways of Working/i.test(line) || /^\*\*Ways of Working\*\*/i.test(line) || line.trim() === "Ways of Working") {
        if (currentKey) {
          sections[currentKey] = currentContent.join("\n").trim();
        }
        currentKey = "__ways_of_working__";
        currentContent = [];
        continue;
      }

      // Check for section headings matching our titles
      for (let i = 0; i < SECTION_TITLES.length; i++) {
        const title = SECTION_TITLES[i];
        if (
          line.includes(title) &&
          (line.startsWith("#") || line.startsWith("**") || /^\d+\./.test(line.trim()))
        ) {
          if (currentKey) {
            sections[currentKey] = currentContent.join("\n").trim();
          }
          currentKey = `section_${i}`;
          currentContent = [];
          break;
        }
      }

      if (currentKey) {
        currentContent.push(line);
      }
    }

    // Save the last section
    if (currentKey) {
      sections[currentKey] = currentContent.join("\n").trim();
    }

    waysOfWorking = sections["__ways_of_working__"] || "";
    delete sections["__ways_of_working__"];

    // Get the opening line
    const openingLine = lines.find(l => l.includes("This profile was built by someone")) || "";

    return { sections, waysOfWorking, openingLine };
  };

  const parsed = parseAIReport(aiReport);

  // === PAGE 1: COVER ===
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("My Child: A Profile", margin, 70);

  doc.setFontSize(20);
  doc.setFont("helvetica", "normal");
  doc.text(childName, margin, 85);

  doc.setFontSize(12);
  doc.text(today, margin, 98);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("This is not a diagnostic document. It is a parent prepared profile.", margin, 260);
  doc.text("sendnavigator.neuro.support", margin, 266);
  footer(doc);

  // === PAGE 2: WHY WE BUILT THIS ===
  doc.addPage();
  let y = margin;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Why we built this profile", margin, y);
  y += 12;

  const reasonParts: string[] = [];
  if (state.setup.reason) {
    reasonParts.push(state.setup.reason);
  }
  if (state.setup.sharedWith.length > 0) {
    reasonParts.push(`We intend to share this with: ${state.setup.sharedWith.join(", ")}.`);
  }
  const whyText = reasonParts.length > 0
    ? `I am building this profile for ${childName} because ${reasonParts.join(" ").toLowerCase()}. This document contains what I know about my child. It is written from experience, not from a textbook.`
    : `I am building this profile for ${childName}. This document contains what I know about my child. It is written from experience, not from a textbook.`;

  y = addWrappedText(whyText, margin, y, contentWidth, 10);
  y += 8;

  if (parsed.openingLine) {
    y = addWrappedText(parsed.openingLine, margin, y, contentWidth, 10, "italic");
  }

  footer(doc);

  // === SECTION PAGES ===
  SECTION_TITLES.forEach((title, index) => {
    const section = state.sections[index];
    if (!section) return;

    const hasAnswers = Object.entries(section.answers).some(([key, v]) => {
      if (key.startsWith("cv_")) return false; // child voice handled separately
      return Array.isArray(v) ? v.length > 0 : v.trim().length > 0;
    });
    const hasReflection = section.reflection.trim().length > 0;
    const aiContent = parsed.sections[`section_${index}`];

    // Check for child voice answers
    const cvQuestions = childVoiceQuestions[index];
    const hasChildVoice = cvQuestions?.some(q => {
      const val = section.answers?.[q.id];
      return val && (Array.isArray(val) ? val.length > 0 : val.toString().trim().length > 0);
    });

    if (!hasAnswers && !hasReflection && !hasChildVoice) return;

    doc.addPage();
    y = margin;

    // Section title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${title}`, margin, y);
    y += 12;

    // Part 1: Parent answers as flowing prose
    const content = sectionContent[index];
    if (content && hasAnswers) {
      const answerTexts: string[] = [];
      content.questions.forEach((q) => {
        const val = section.answers?.[q.id];
        const displayValue = Array.isArray(val) ? val.join(", ") : val;
        if (displayValue && displayValue.trim()) {
          answerTexts.push(displayValue.trim());
        }
      });

      if (answerTexts.length > 0) {
        const prose = answerTexts.join(". ").replace(/\.\./g, ".");
        y = addWrappedText(prose, margin, y, contentWidth, 10);
        y += 8;
      }
    }

    // Part 2: Child voice block
    if (hasChildVoice && cvQuestions) {
      // Draw a light background box
      const cvStartY = y;
      y += 2;

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 60, 20);
      y = addWrappedText(`In ${childName}'s own words`, margin + 4, y + 4, contentWidth - 8, 11, "bold");
      doc.setTextColor(0, 0, 0);
      y += 4;

      const childTexts: string[] = [];
      cvQuestions.forEach((q) => {
        const val = section.answers?.[q.id];
        const strVal = Array.isArray(val) ? val.join(", ") : val;
        if (strVal && strVal.toString().trim()) {
          childTexts.push(strVal.toString().trim());
        }
      });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      for (const text of childTexts) {
        y = addWrappedText(text, margin + 4, y, contentWidth - 8, 10);
        y += 3;
      }

      // Draw background rectangle
      const cvHeight = y - cvStartY + 4;
      doc.setFillColor(255, 248, 235);
      doc.setDrawColor(220, 200, 160);
      doc.roundedRect(margin, cvStartY, contentWidth, cvHeight, 2, 2, "FD");

      // Re-render text on top of background (jsPDF renders in order)
      // Since jsPDF doesn't support z-index, we need to render bg first then text
      // Let's restructure: collect child voice content, draw bg, then text
      y = cvStartY + 2;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 60, 20);
      y = addWrappedText(`In ${childName}'s own words`, margin + 4, y + 4, contentWidth - 8, 11, "bold");
      doc.setTextColor(0, 0, 0);
      y += 4;

      for (const text of childTexts) {
        y = addWrappedText(text, margin + 4, y, contentWidth - 8, 10);
        y += 3;
      }

      y += 6;
    }

    // Part 3: AI response
    if (aiContent) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      y = addWrappedText("What this tells us", margin, y, contentWidth, 11, "bold");
      y += 3;

      // Clean up markdown formatting
      const cleanAI = aiContent
        .replace(/^#+\s+.*$/gm, "") // remove headings
        .replace(/\*\*/g, "")       // remove bold markers
        .replace(/\*/g, "")         // remove italic markers
        .trim();

      y = addWrappedText(cleanAI, margin, y, contentWidth, 10);
      y += 6;
    }

    // Part 4: Closing reflection in italics
    if (hasReflection) {
      y = addWrappedText(section.reflection, margin, y, contentWidth, 10, "italic");
      y += 4;
    }

    footer(doc);
  });

  // === FINAL PAGE ===
  doc.addPage();
  y = margin;

  // Ways of Working
  if (parsed.waysOfWorking) {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Ways of Working", margin, y);
    y += 12;

    const cleanWoW = parsed.waysOfWorking
      .replace(/^#+\s+.*$/gm, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .trim();

    y = addWrappedText(cleanWoW, margin, y, contentWidth, 10);
    y += 12;
  }

  // Final statement
  if (state.finalStatement.trim()) {
    if (y > 200) {
      footer(doc);
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("What we most want you to know", margin, y);
    y += 10;

    y = addWrappedText(state.finalStatement, margin, y, contentWidth, 11);
    y += 10;
  }

  // Closing statement
  const closingText = `This profile was built by ${childName}'s parent. It represents our knowledge of our child. We welcome questions and conversation. We ask that this document is read in full before any conclusions are drawn.`;
  y = addWrappedText(closingText, margin, y, contentWidth, 9, "italic");

  footer(doc);

  // Download
  const safeName = childName.toLowerCase().replace(/[^a-z0-9]/g, "");
  doc.save(`${safeName}profile${dateCompact}.pdf`);
}
