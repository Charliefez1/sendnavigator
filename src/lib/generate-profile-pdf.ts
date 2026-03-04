import jsPDF from "jspdf";
import { ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { sectionContent } from "@/config/child-profile-sections";
import { childVoiceQuestions } from "@/config/child-voice-questions";
import { StructuredAIReport, isStructuredReport } from "@/types/ai-report";
import { parseReflectionBlocks } from "@/lib/reflection-parser";
import beaconLogoUrl from "@/assets/neurodiversity-global-logo-trimmed.png";
import ngLogoUrl from "@/assets/neurodiversity-global-logo.jpeg";

interface ReportData {
  state: ChildProfileState;
  aiReport: string | StructuredAIReport;
}

// === Colour palette (RGB) ===
const NAVY = [30, 41, 59];       // headings, section titles
const DARK_TEXT = [15, 23, 42];   // body text
const MID_TEXT = [71, 85, 105];   // secondary text
const LIGHT_TEXT = [100, 116, 139]; // footer, subtle
const WARM_BG = [248, 245, 240];  // parent words background
const WARM_BORDER = [220, 210, 195]; // parent words border
const WHITE = [255, 255, 255];
const PAGE_BG = [252, 251, 249];  // very subtle warm white

// === Typography tokens (pt) — single scale, no shrink-to-fit ===
const TYPE = {
  COVER_NAME: 36,    // Cover page: child's name only
  H1: 20,            // Page titles (At a Glance, Ways of Working, Conclusion)
  H2: 16,            // Secondary page titles (Why we built this, About)
  H3: 13,            // Sub-page headings (What helps most, final statement heading)
  SUB: 11,           // Sub-headings within sections (In parent's words, reflection headings)
  BODY: 11,          // All body text, bullets, Q&A answers
  BODY_SMALL: 10,    // Q&A labels (bold), about page body
  CAPTION: 9,        // Section numbers, cover disclaimer
  DISCLAIMER: 6.5,   // Footer disclaimer
  FOOTER_URL: 7,     // Footer URL
} as const;

/** Exported for dev-mode visual regression check */
export const PDF_TYPE_TOKENS = TYPE;

/**
 * Load an image URL and return a base64 data URL suitable for jsPDF.
 */
function loadImageAsBase64(url: string): Promise<{ data: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context failed"));
      ctx.drawImage(img, 0, 0);
      resolve({ data: canvas.toDataURL("image/png"), width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

export async function generateProfilePDF({ state, aiReport }: ReportData) {
  // Check if any sections have content
  const hasAnySectionContent = SECTION_TITLES.some((_, index) => {
    const section = state.sections[index];
    if (!section) return false;
    const hasAnswers = Object.entries(section.answers).some(([key, v]) => {
      if (key.startsWith("cv_")) return false;
      return Array.isArray(v) ? v.length > 0 : v.trim().length > 0;
    });
    const hasReflection = section.reflection.trim().length > 0;
    return hasAnswers || hasReflection;
  });

  if (!hasAnySectionContent) {
    throw new Error("NO_SECTIONS_COMPLETED");
  }

  // Pre-load logos
  let beaconLogo: { data: string; width: number; height: number } | null = null;
  let ngLogo: { data: string; width: number; height: number } | null = null;
  try {
    [beaconLogo, ngLogo] = await Promise.all([
      loadImageAsBase64(beaconLogoUrl),
      loadImageAsBase64(ngLogoUrl),
    ]);
  } catch (e) {
    console.warn("Could not load logos for PDF:", e);
  }

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 22;
  const contentWidth = pageWidth - margin * 2;
  const childName = state.setup.childName || "Child";
  const filledBy = state.setup.filledBy || "their parent";
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateCompact = new Date().toISOString().split("T")[0].replace(/-/g, "");

  // === Helpers ===

  const setColor = (rgb: number[]) => doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  const setFill = (rgb: number[]) => doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  const setDraw = (rgb: number[]) => doc.setDrawColor(rgb[0], rgb[1], rgb[2]);

  const DISCLAIMER_TEXT = "This report is a personal guide created to help you understand and articulate your child's needs. While every care has been taken in producing this document, Neurodiversity Global cannot be held responsible for decisions made on the basis of its content. This is not a legal document and does not constitute professional medical, educational, or legal advice. Always seek qualified professional support where needed.";
  const FOOTER_ZONE_HEIGHT = 22;
  const maxContentY = pageHeight - FOOTER_ZONE_HEIGHT - 4;

  const footer = () => {
    setDraw(WARM_BORDER);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - FOOTER_ZONE_HEIGHT, pageWidth - margin, pageHeight - FOOTER_ZONE_HEIGHT);

    doc.setFontSize(TYPE.DISCLAIMER);
    doc.setFont("helvetica", "normal");
    setColor(LIGHT_TEXT);
    const disclaimerLines: string[] = doc.splitTextToSize(DISCLAIMER_TEXT, contentWidth);
    const dlLineH = TYPE.DISCLAIMER * 0.353 * 1.4;
    let dy = pageHeight - FOOTER_ZONE_HEIGHT + 3;
    for (const line of disclaimerLines) {
      doc.text(line, pageWidth / 2, dy, { align: "center" });
      dy += dlLineH;
    }

    doc.setFontSize(TYPE.FOOTER_URL);
    doc.text("send.neurodiversityglobal.com", pageWidth / 2, pageHeight - 7, { align: "center" });
    setColor(DARK_TEXT);
  };

  const newPage = (): number => {
    footer();
    doc.addPage();
    setFill(WHITE);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    return margin;
  };

  const checkPageBreak = (y: number, needed: number): number => {
    if (y + needed > maxContentY) {
      return newPage();
    }
    return y;
  };

  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number,
    style: "normal" | "bold" | "italic" = "normal",
    lineHeightMultiplier = 1.6
  ): number => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", style);
    const lines: string[] = doc.splitTextToSize(text, maxWidth);
    const lineHeight = fontSize * 0.353 * lineHeightMultiplier;
    for (const line of lines) {
      y = checkPageBreak(y, lineHeight + 2);
      doc.text(line, x, y);
      y += lineHeight;
    }
    return y;
  };

  /**
   * Render a block of text inside a warm background box.
   * Handles page breaks by drawing box segments per page.
   */
  const addBoxedText = (
    text: string,
    y: number,
  ): number => {
    doc.setFontSize(TYPE.BODY);
    doc.setFont("helvetica", "normal");
    const lines: string[] = doc.splitTextToSize(text, contentWidth - 14);
    const lineHeight = TYPE.BODY * 0.353 * 1.6;
    const boxPadTop = 5;
    const boxPadBottom = 5;
    const boxPadX = 7;

    // We render in segments that fit on each page
    let lineIdx = 0;
    while (lineIdx < lines.length) {
      // How many lines fit on this page?
      const availH = maxContentY - y - boxPadTop - boxPadBottom;
      const linesPerPage = Math.max(1, Math.floor(availH / lineHeight));
      const segmentLines = lines.slice(lineIdx, lineIdx + linesPerPage);
      const segmentH = segmentLines.length * lineHeight + boxPadTop + boxPadBottom;

      // If we can't even fit one line, go to next page
      if (y + segmentH > maxContentY && lineIdx < lines.length) {
        y = checkPageBreak(y, segmentH);
      }

      // Draw background box for this segment
      setFill(WARM_BG);
      setDraw(WARM_BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y - 3, contentWidth, segmentLines.length * lineHeight + boxPadTop + boxPadBottom, 2, 2, "FD");

      // Render lines
      setColor(DARK_TEXT);
      doc.setFontSize(TYPE.BODY);
      doc.setFont("helvetica", "normal");
      let ty = y + boxPadTop;
      for (const line of segmentLines) {
        doc.text(line, margin + boxPadX, ty);
        ty += lineHeight;
      }

      lineIdx += segmentLines.length;
      y = ty + boxPadBottom;

      // If more lines remain, break to new page
      if (lineIdx < lines.length) {
        y = newPage();
      }
    }

    return y;
  };

  /**
   * Render Q&A pairs inside a warm background box.
   * Each pair: question label in bold, answer in normal weight below it.
   */
  const addBoxedQAPairs = (
    pairs: { label: string; answer: string }[],
    startY: number,
  ): number => {
    const boxPadTop = 5;
    const boxPadBottom = 5;
    const boxPadX = 7;
    const innerWidth = contentWidth - 14;

    // Pre-calculate all lines for all pairs
    type RenderedPair = { labelLines: string[]; answerLines: string[] };
    const rendered: RenderedPair[] = pairs.map(p => {
      doc.setFontSize(TYPE.BODY_SMALL);
      doc.setFont("helvetica", "bold");
      const labelLines: string[] = doc.splitTextToSize(p.label, innerWidth);
      doc.setFontSize(TYPE.BODY);
      doc.setFont("helvetica", "normal");
      const answerLines: string[] = doc.splitTextToSize(p.answer, innerWidth);
      return { labelLines, answerLines };
    });

    const labelLineH = TYPE.BODY_SMALL * 0.353 * 1.5;
    const answerLineH = TYPE.BODY * 0.353 * 1.6;
    const pairGap = 4;

    // Flatten into drawable items for segment-based rendering
    type DrawItem = { text: string; fontSize: number; style: "bold" | "normal"; lineH: number; gapAfter: number };
    const items: DrawItem[] = [];
    rendered.forEach((r, ri) => {
      r.labelLines.forEach((line, li) => {
        items.push({ text: line, fontSize: TYPE.BODY_SMALL, style: "bold", lineH: labelLineH, gapAfter: li === r.labelLines.length - 1 ? 1 : 0 });
      });
      r.answerLines.forEach((line, li) => {
        const isLast = li === r.answerLines.length - 1;
        items.push({ text: line, fontSize: TYPE.BODY, style: "normal", lineH: answerLineH, gapAfter: isLast && ri < rendered.length - 1 ? pairGap : 0 });
      });
    });

    // Render in page-break-safe segments
    let y = startY;
    let itemIdx = 0;
    while (itemIdx < items.length) {
      const availH = maxContentY - y - boxPadTop - boxPadBottom;
      // Calculate how many items fit
      let fitH = 0;
      let fitCount = 0;
      for (let i = itemIdx; i < items.length; i++) {
        const needed = items[i].lineH + items[i].gapAfter;
        if (fitH + needed > availH && fitCount > 0) break;
        fitH += needed;
        fitCount++;
      }
      if (fitCount === 0) fitCount = 1;

      const segmentItems = items.slice(itemIdx, itemIdx + fitCount);
      const segmentH = segmentItems.reduce((sum, it) => sum + it.lineH + it.gapAfter, 0);

      if (y + segmentH + boxPadTop + boxPadBottom > maxContentY && itemIdx > 0) {
        y = newPage();
      }

      // Draw background box
      setFill(WARM_BG);
      setDraw(WARM_BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y - 3, contentWidth, segmentH + boxPadTop + boxPadBottom, 2, 2, "FD");

      setColor(DARK_TEXT);
      let ty = y + boxPadTop;
      for (const item of segmentItems) {
        doc.setFontSize(item.fontSize);
        doc.setFont("helvetica", item.style);
        doc.text(item.text, margin + boxPadX, ty);
        ty += item.lineH + item.gapAfter;
      }

      itemIdx += segmentItems.length;
      y = ty + boxPadBottom;

      if (itemIdx < items.length) {
        y = newPage();
      }
    }

    return y;
  };

  // Measure text height without rendering
  const measureText = (text: string, maxWidth: number, fontSize: number, lineHeightMultiplier = 1.6): number => {
    doc.setFontSize(fontSize);
    const lines: string[] = doc.splitTextToSize(text, maxWidth);
    return lines.length * fontSize * 0.353 * lineHeightMultiplier;
  };

  // Parse AI report into sections
  const parseAIReport = (report: string) => {
    const sections: Record<string, string> = {};
    const lines = report.split("\n");
    let currentKey = "";
    let currentContent: string[] = [];

    for (const line of lines) {
      // Check for "Some Things That May Help" section
      if (/^#+\s*Some Things That May Help/i.test(line) || /^\*\*Some Things That May Help\*\*/i.test(line) || line.trim().toLowerCase() === "some things that may help") {
        if (currentKey) sections[currentKey] = currentContent.join("\n").trim();
        currentKey = "__suggestions__";
        currentContent = [];
        continue;
      }

      // Check for "Conclusion" section
      if (/^#+\s*Conclusion/i.test(line) || /^\*\*Conclusion\*\*/i.test(line) || line.trim().toLowerCase() === "conclusion") {
        if (currentKey) sections[currentKey] = currentContent.join("\n").trim();
        currentKey = "__conclusion__";
        currentContent = [];
        continue;
      }

      if (/^#+\s*Ways of Working/i.test(line) || /^\*\*Ways of Working\*\*/i.test(line) || line.trim() === "Ways of Working") {
        if (currentKey) sections[currentKey] = currentContent.join("\n").trim();
        currentKey = "__ways_of_working__";
        currentContent = [];
        continue;
      }

      for (let i = 0; i < SECTION_TITLES.length; i++) {
        const title = SECTION_TITLES[i];
        if (line.includes(title) && (line.startsWith("#") || line.startsWith("**") || /^\d+\./.test(line.trim()))) {
          if (currentKey) sections[currentKey] = currentContent.join("\n").trim();
          currentKey = `section_${i}`;
          currentContent = [];
          break;
        }
      }

      if (currentKey) currentContent.push(line);
    }

    if (currentKey) sections[currentKey] = currentContent.join("\n").trim();

    const waysOfWorking = sections["__ways_of_working__"] || "";
    delete sections["__ways_of_working__"];

    const suggestions = sections["__suggestions__"] || "";
    delete sections["__suggestions__"];

    const conclusion = sections["__conclusion__"] || "";
    delete sections["__conclusion__"];

    const openingLine = lines.find(l => l.includes("Purpose and how to use this profile") || l.includes("This profile brings together")) || "";
    return { sections, waysOfWorking, suggestions, conclusion, openingLine };
  };

  const cleanMarkdown = (text: string): string =>
    text
      .replace(/^#+\s+.*$/gm, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/^[-–—]\s+/gm, "")
      .trim();

  /**
   * Break long paragraphs into shorter ones (~2-3 sentences each).
   * Preserves existing paragraph breaks (double newlines).
   */
  const breakLongParagraphs = (text: string): string[] => {
    const rawParas = text.split(/\n\n+/).filter(p => p.trim());
    const result: string[] = [];
    for (const para of rawParas) {
      const trimmed = para.trim();
      // Split on sentence boundaries (. followed by space and uppercase letter)
      const sentences = trimmed.match(/[^.!?]*[.!?]+(?:\s|$)/g) || [trimmed];
      if (sentences.length <= 3) {
        result.push(trimmed);
      } else {
        // Group into chunks of 2-3 sentences
        let chunk: string[] = [];
        for (let i = 0; i < sentences.length; i++) {
          chunk.push(sentences[i].trim());
          if (chunk.length >= 2 && (i === sentences.length - 1 || chunk.length >= 3)) {
            result.push(chunk.join(" "));
            chunk = [];
          }
        }
        if (chunk.length > 0) result.push(chunk.join(" "));
      }
    }
    return result;
  };

  /** Map structured AI report to the same shape as parseAIReport returns */
  const mapStructuredToParsed = (report: StructuredAIReport) => {
    const sections: Record<string, string> = {};
    for (const insight of report.sectionInsights) {
      sections[`section_${insight.sectionIndex}`] = insight.reflection;
    }
    return {
      sections,
      waysOfWorking: report.waysOfWorking,
      suggestions: report.someThingsThatMayHelp,
      conclusion: report.conclusion,
      openingLine: report.openingLine,
    };
  };

  // Parse AI report: structured JSON or legacy text blob
  const structured = isStructuredReport(aiReport) ? aiReport : null;
  const parsed = structured
    ? mapStructuredToParsed(structured)
    : parseAIReport(aiReport as string);

  // =============================================
  // PAGE 1: COVER
  // =============================================

  setFill(PAGE_BG);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // NG logo at top centre (replacing beacon logo)
  if (ngLogo) {
    try {
      const maxW = 180 * 0.264583; // 180px to mm
      const aspectRatio = ngLogo.width / ngLogo.height;
      const logoW = maxW;
      const logoH = logoW / aspectRatio;
      doc.addImage(ngLogo.data, "JPEG", pageWidth / 2 - logoW / 2, 20, logoW, logoH);
    } catch { /* ignore logo errors */ }
  }

  // Top decorative line
  setDraw(NAVY);
  doc.setLineWidth(0.8);
  doc.line(margin, 55, pageWidth - margin, 55);

  // Child's name
  doc.setFontSize(TYPE.COVER_NAME);
  doc.setFont("helvetica", "bold");
  setColor(NAVY);
  doc.text(childName, pageWidth / 2, 80, { align: "center" });

  // Subtitle
  doc.setFontSize(TYPE.H2);
  doc.setFont("helvetica", "normal");
  setColor(MID_TEXT);
  doc.text("A Profile", pageWidth / 2, 92, { align: "center" });

  // Date
  doc.setFontSize(TYPE.BODY);
  setColor(MID_TEXT);
  doc.text(today, pageWidth / 2, 108, { align: "center" });

  // Built by
  doc.setFontSize(TYPE.BODY);
  doc.setFont("helvetica", "normal");
  setColor(DARK_TEXT);
  doc.text(`This profile was built by ${filledBy}.`, pageWidth / 2, 125, { align: "center" });

  // Bottom decorative line
  doc.setLineWidth(0.4);
  setDraw(WARM_BORDER);
  doc.line(margin + 30, 140, pageWidth - margin - 30, 140);

  // Cover disclaimer
  doc.setFontSize(TYPE.CAPTION);
  setColor(LIGHT_TEXT);
  doc.text(
    "This is not a diagnostic document. It is a parent-prepared profile.",
    pageWidth / 2,
    pageHeight - 40,
    { align: "center" }
  );
  doc.setFontSize(TYPE.CAPTION);
  doc.text("send.neurodiversityglobal.com", pageWidth / 2, pageHeight - 34, { align: "center" });

  // =============================================
  // PAGE 1.5: AT A GLANCE (structured reports only)
  // =============================================
  let y = margin;
  if (structured && structured.topSummary) {
    doc.addPage();
    setFill(WHITE);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    y = margin;

    // Title
    doc.setFontSize(TYPE.H1);
    doc.setFont("helvetica", "bold");
    setColor(NAVY);
    doc.text("At a Glance", margin, y);
    y += 8;

    setDraw(NAVY);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 45, y);
    y += 12;

    // Opening line in italic
    if (structured.openingLine) {
      setColor(MID_TEXT);
      y = addWrappedText(structured.openingLine, margin, y, contentWidth, TYPE.BODY, "italic");
      y += 10;
    }

    // Headline
    if (structured.topSummary.headline) {
      setColor(DARK_TEXT);
      doc.setFontSize(TYPE.BODY);
      doc.setFont("helvetica", "bold");
      const headlineLines: string[] = doc.splitTextToSize(structured.topSummary.headline, contentWidth);
      const headlineLineH = TYPE.BODY * 0.353 * 1.6;
      for (const line of headlineLines) {
        doc.text(line, margin, y);
        y += headlineLineH;
      }
      y += 8;
    }

    // Bullets
    if (structured.topSummary.bullets.length > 0) {
      setColor(DARK_TEXT);
      for (const bullet of structured.topSummary.bullets) {
        y = checkPageBreak(y, 14);
        doc.setFontSize(TYPE.BODY);
        doc.setFont("helvetica", "normal");
        const bulletText = `\u2022  ${bullet}`;
        const bulletLines: string[] = doc.splitTextToSize(bulletText, contentWidth - 10);
        const bulletLineH = TYPE.BODY * 0.353 * 1.6;
        for (let i = 0; i < bulletLines.length; i++) {
          doc.text(bulletLines[i], margin + (i === 0 ? 0 : 6), y);
          y += bulletLineH;
        }
        y += 2;
      }
      y += 6;
    }

    // "What helps most" block from waysOfWorking (first 3 paragraphs, broken down)
    if (structured.waysOfWorking) {
      y = checkPageBreak(y, 30);
      doc.setFontSize(TYPE.H3);
      doc.setFont("helvetica", "bold");
      setColor(NAVY);
      doc.text("What helps most", margin, y);
      y += 10;

      const wowParas = breakLongParagraphs(structured.waysOfWorking);
      const firstParas = wowParas.slice(0, 5);
      setColor(DARK_TEXT);
      for (const para of firstParas) {
        y = addWrappedText(para, margin, y, contentWidth, TYPE.BODY);
        y += 5;
      }
    }

    footer();
  }

  // =============================================
  // PAGE 2: WHY WE BUILT THIS
  // =============================================
  doc.addPage();
  setFill(WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  y = margin;

  doc.setFontSize(TYPE.H2);
  doc.setFont("helvetica", "bold");
  setColor(NAVY);
  doc.text("Why we built this profile", margin, y);
  y += 14;

  setDraw(NAVY);
  doc.setLineWidth(0.5);
  doc.line(margin, y - 6, margin + 50, y - 6);
  y += 4;

  const reasonParts: string[] = [];
  if (state.setup.reason) reasonParts.push(state.setup.reason);
  if (state.setup.sharedWith.length > 0) {
    reasonParts.push(`We intend to share this with: ${state.setup.sharedWith.join(", ")}.`);
  }
  const whyText = reasonParts.length > 0
    ? `I am building this profile for ${childName} because ${reasonParts.join(" ").toLowerCase()}. This document contains what I know about my child. It is written from experience, not from a textbook.`
    : `I am building this profile for ${childName}. This document contains what I know about my child. It is written from experience, not from a textbook.`;

  setColor(DARK_TEXT);
  y = addWrappedText(whyText, margin, y, contentWidth, TYPE.BODY);
  y += 10;

  if (parsed.openingLine) {
    setColor(MID_TEXT);
    y = addWrappedText(parsed.openingLine, margin, y, contentWidth, TYPE.BODY, "italic");
    setColor(DARK_TEXT);
  }

  footer();

  // =============================================
  // SECTION PAGES
  // =============================================
  SECTION_TITLES.forEach((title, index) => {
    const section = state.sections[index];
    if (!section) return;

    const hasAnswers = Object.entries(section.answers).some(([key, v]) => {
      if (key.startsWith("cv_")) return false;
      return Array.isArray(v) ? v.length > 0 : v.trim().length > 0;
    });
    const hasReflection = section.reflection.trim().length > 0;
    const aiContent = parsed.sections[`section_${index}`];

    const cvQuestions = childVoiceQuestions[index];
    const hasChildVoice = cvQuestions?.some(q => {
      const val = section.answers?.[q.id];
      return val && (Array.isArray(val) ? val.length > 0 : val.toString().trim().length > 0);
    });

    if (!hasAnswers && !hasReflection && !hasChildVoice) return;

    // New page for each section — ensures no overlap between sections
    doc.addPage();
    setFill(WHITE);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    y = margin;

    // Section number + title
    doc.setFontSize(TYPE.CAPTION);
    doc.setFont("helvetica", "normal");
    setColor(LIGHT_TEXT);
    doc.text(`Section ${index + 1}`, margin, y);
    y += 6;

    doc.setFontSize(TYPE.H2);
    doc.setFont("helvetica", "bold");
    setColor(NAVY);
    doc.text(title, margin, y);
    y += 6;

    // Accent line
    setDraw(NAVY);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 40, y);
    y += 10;

    // --- PARENT'S WORDS BLOCK ---
    const content = sectionContent[index];
    const parentQAPairs: { label: string; answer: string }[] = [];
    if (content && hasAnswers) {
      content.questions.forEach((q) => {
        const val = section.answers?.[q.id];
        const displayValue = Array.isArray(val) ? val.join(", ") : val;
        if (displayValue && displayValue.trim()) {
          parentQAPairs.push({ label: q.label, answer: displayValue.trim() });
        }
      });
    }

    if (parentQAPairs.length > 0) {
      // Sub-heading
      doc.setFontSize(TYPE.SUB);
      doc.setFont("helvetica", "bold");
      setColor(NAVY);
      y = checkPageBreak(y, 14);
      doc.text(`In ${childName}'s parent's words`, margin, y);
      y += 8;

      // Render Q&A pairs inside warm background box
      y = addBoxedQAPairs(parentQAPairs, y);
      y += 8;
    }

    // --- CHILD VOICE BLOCK ---
    if (hasChildVoice && cvQuestions) {
      const childQAPairs: { label: string; answer: string }[] = [];
      cvQuestions.forEach((q) => {
        const val = section.answers?.[q.id];
        const strVal = Array.isArray(val) ? val.join(", ") : val;
        if (strVal && strVal.toString().trim()) {
          childQAPairs.push({ label: q.label, answer: strVal.toString().trim() });
        }
      });

      if (childQAPairs.length > 0) {
        y = checkPageBreak(y, 20);

        doc.setFontSize(TYPE.SUB);
        doc.setFont("helvetica", "bold");
        setColor([120, 90, 40]);
        doc.text(`In ${childName}'s own words`, margin, y);
        y += 8;

        setColor(DARK_TEXT);
        for (const pair of childQAPairs) {
          y = checkPageBreak(y, 18);
          y = addWrappedText(pair.label, margin + 7, y, contentWidth - 14, TYPE.BODY_SMALL, "bold");
          y += 1;
          y = addWrappedText(pair.answer, margin + 7, y, contentWidth - 14, TYPE.BODY, "italic");
          y += 5;
        }
        y += 4;
      }
    }

    // --- AI RESPONSE BLOCKS (What you told us / What this tells us / What could help) ---
    if (aiContent) {
      const blocks = parseReflectionBlocks(aiContent);
      for (const block of blocks) {
        y = checkPageBreak(y, 20);

        doc.setFontSize(TYPE.SUB);
        doc.setFont("helvetica", "bold");
        setColor(NAVY);
        doc.text(block.heading, margin, y);
        y += 8;

        const cleanAI = cleanMarkdown(block.content);
        const paragraphs = breakLongParagraphs(cleanAI);

        setColor(DARK_TEXT);
        for (const para of paragraphs) {
          y = addWrappedText(para, margin, y, contentWidth, TYPE.BODY);
          y += 5;
        }
        y += 4;
      }
    }

    // --- CLOSING REFLECTION ---
    if (hasReflection) {
      y = checkPageBreak(y, 20);

      doc.setFontSize(TYPE.SUB);
      doc.setFont("helvetica", "bold");
      setColor(NAVY);
      doc.text("Closing reflection", margin, y);
      y += 8;

      setColor(MID_TEXT);
      y = addWrappedText(section.reflection, margin, y, contentWidth, TYPE.BODY, "italic");
      setColor(DARK_TEXT);
      y += 6;
    }

    footer();
  });

  // =============================================
  // WAYS OF WORKING — own page
  // =============================================
  if (parsed.waysOfWorking) {
    doc.addPage();
    setFill(WHITE);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    y = margin;

    doc.setFontSize(TYPE.H1);
    doc.setFont("helvetica", "bold");
    setColor(NAVY);
    doc.text("Ways of Working", margin, y);
    y += 8;

    setDraw(NAVY);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 45, y);
    y += 12;

    const cleanWoW = cleanMarkdown(parsed.waysOfWorking);
    const wowParas = breakLongParagraphs(cleanWoW);
    setColor(DARK_TEXT);
    for (const para of wowParas) {
      y = addWrappedText(para, margin, y, contentWidth, TYPE.BODY, "normal", 1.7);
      y += 6;
    }

    footer();
  }

  // =============================================
  // SOME THINGS THAT MAY HELP — own page
  // =============================================
  if (parsed.suggestions) {
    doc.addPage();
    setFill(WHITE);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    y = margin;

    doc.setFontSize(TYPE.H1);
    doc.setFont("helvetica", "bold");
    setColor(NAVY);
    doc.text("Some Things That May Help", margin, y);
    y += 8;

    setDraw(NAVY);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 45, y);
    y += 12;

    const cleanSuggestions = cleanMarkdown(parsed.suggestions);
    const suggestionBlocks = cleanSuggestions.split(/(?=Have you tried)/i).filter(s => s.trim());

    setColor(DARK_TEXT);
    for (const block of suggestionBlocks) {
      y = checkPageBreak(y, 25);

      const questionMatch = block.match(/^(Have you tried [^?]+\?)\s*(.*)/is);
      if (questionMatch) {
        y = addWrappedText(questionMatch[1], margin, y, contentWidth, TYPE.BODY, "bold");
        y += 1;
        if (questionMatch[2].trim()) {
          y = addWrappedText(questionMatch[2].trim(), margin, y, contentWidth, TYPE.BODY);
        }
      } else {
        y = addWrappedText(block, margin, y, contentWidth, TYPE.BODY);
      }
      y += 6;
    }

    // --- ASK RICH SIGNPOST ---
    y += 4;
    y = checkPageBreak(y, 40);

    const askRichText = "Have more questions? Ask Rich is available on the Neurodiversity Global SEND Navigator and can answer questions about your child's needs, the system, your rights, and what to do next. Everything is confidential and there are no wrong questions. Visit send.neurodiversityglobal.com and use the Ask Rich feature.";
    const askRichHeight = measureText(askRichText, contentWidth - 14, TYPE.BODY) + 12;

    setFill([245, 248, 252]);
    setDraw([180, 195, 215]);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y - 3, contentWidth, askRichHeight, 2, 2, "FD");

    setColor(MID_TEXT);
    y = addWrappedText(askRichText, margin + 7, y + 4, contentWidth - 14, TYPE.BODY);
    y += 8;
    setColor(DARK_TEXT);

    footer();
  }

  // =============================================
  // CONCLUSION — own page
  // =============================================
  if (parsed.conclusion) {
    doc.addPage();
    setFill(WHITE);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    y = margin;

    doc.setFontSize(TYPE.H1);
    doc.setFont("helvetica", "bold");
    setColor(NAVY);
    doc.text("Conclusion", margin, y);
    y += 8;

    setDraw(NAVY);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 45, y);
    y += 12;

    const cleanConclusion = cleanMarkdown(parsed.conclusion);
    const conclusionParas = breakLongParagraphs(cleanConclusion);

    setColor(DARK_TEXT);
    for (const para of conclusionParas) {
      y = addWrappedText(para, margin, y, contentWidth, TYPE.BODY, "normal", 1.7);
      y += 6;
    }

    footer();
  }

  // =============================================
  // FINAL PAGE — closing statement
  doc.addPage();
  setFill(PAGE_BG);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  y = margin + 30;

  if (state.finalStatement.trim()) {
    doc.setFontSize(TYPE.H3);
    doc.setFont("helvetica", "bold");
    setColor(NAVY);
    doc.text("What we most want you to know", pageWidth / 2, y, { align: "center" });
    y += 14;

    setDraw(WARM_BORDER);
    doc.setLineWidth(0.4);
    doc.line(margin + 40, y - 6, pageWidth - margin - 40, y - 6);
    y += 4;

    setColor(DARK_TEXT);
    doc.setFontSize(TYPE.BODY);
    doc.setFont("helvetica", "normal");

    const stmtLines: string[] = doc.splitTextToSize(state.finalStatement, contentWidth - 20);
    const lineHeight = TYPE.BODY * 0.353 * 1.7;
    for (const line of stmtLines) {
      y = checkPageBreak(y, lineHeight + 2);
      doc.text(line, pageWidth / 2, y, { align: "center" });
      y += lineHeight;
    }

    y += 16;
  } else {
    y = pageHeight / 2 - 20;
  }

  // Closing paragraph
  setColor(MID_TEXT);
  const closingText = `This profile was built by ${childName}'s parent. It represents our knowledge of our child. We welcome questions and conversation. We ask that this document is read in full before any conclusions are drawn.`;
  const closingLines: string[] = doc.splitTextToSize(closingText, contentWidth - 30);
  const closingLineH = TYPE.CAPTION * 0.353 * 1.6;
  doc.setFontSize(TYPE.CAPTION);
  doc.setFont("helvetica", "italic");
  for (const line of closingLines) {
    doc.text(line, pageWidth / 2, y, { align: "center" });
    y += closingLineH;
  }

  footer();

  // =============================================
  // ABOUT NEURODIVERSITY GLOBAL — final page
  // =============================================
  doc.addPage();
  setFill(WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  y = margin;

  // Neurodiversity Global logo
  if (ngLogo) {
    try {
      const maxW = 160 * 0.264583; // 160px to mm
      const aspectRatio = ngLogo.width / ngLogo.height;
      const logoW = maxW;
      const logoH = logoW / aspectRatio;
      doc.addImage(ngLogo.data, "JPEG", pageWidth / 2 - logoW / 2, y, logoW, logoH);
      y += logoH + 6; // 16px (~6mm) clear space before heading
    } catch { /* ignore logo errors */ }
  }

  doc.setFontSize(TYPE.H2);
  doc.setFont("helvetica", "bold");
  setColor(NAVY);
  doc.text("About Neurodiversity Global", margin, y);
  y += 8;

  setDraw(NAVY);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 50, y);
  y += 12;

  const ngParagraphs = [
    "This profile was generated using a tool built by Neurodiversity Global.",
    "Neurodiversity Global provides neurodiversity training, consultancy, and practical support to organisations, schools, education providers, public bodies, and families internationally.",
    "The organisation was founded by Richard Ferriman and Charlie Ferriman, a father and son team who are both neurodivergent. Charlie is one of three neurodivergent children in the family, and between them they bring lived experience of autism, ADHD, and dyslexia alongside decades of senior leadership, systems design, and delivery experience across complex and regulated environments.",
    "Neurodiversity Global operates from a clear position. Neurodivergent people are not broken. The systems around them often are.",
    "The work focuses on understanding how environments, expectations, policies, leadership behaviours, and institutional processes unintentionally exclude neurodivergent children and adults, and how those systems can be redesigned to reduce harm and increase access, safety, and performance.",
    "This includes education systems that prioritise compliance over regulation, workplaces that reward narrow communication styles, and support pathways that intervene only once crisis has already occurred.",
    "Across all settings, the approach is grounded in lived reality rather than abstract theory. Training and consultancy draw directly on real world experience of parenting neurodivergent children, navigating education and SEND processes, leading large scale organisational change, and supporting individuals who have spent years masking to survive systems that were never built for them.",
    "Neurodiversity Global works with leaders, educators, parents, and practitioners to move beyond awareness and into practical, evidence informed change. The emphasis is on redesigning environments, improving decision making, reducing unnecessary cognitive and emotional load, and creating conditions where neurodivergent children and adults can be seen, supported, and succeed without having to hide who they are.",
    "The work is intentionally systems focused. Change is not driven by asking neurodivergent people to adapt to environments that harm them, but by equipping organisations, schools, and families to understand difference, recognise impact, and take responsibility for building spaces that fit the full range of human neurodevelopment.",
    "If this profile has been useful, we would welcome the opportunity to work with your school, organisation, or team.",
  ];

  setColor(DARK_TEXT);
  for (const para of ngParagraphs) {
    const paraHeight = measureText(para, contentWidth, TYPE.BODY_SMALL, 1.5);
    y = checkPageBreak(y, paraHeight + 4);
    y = addWrappedText(para, margin, y, contentWidth, TYPE.BODY_SMALL, "normal", 1.5);
    y += 4;
  }

  y += 6;
  doc.setFontSize(TYPE.BODY);
  doc.setFont("helvetica", "bold");
  setColor(NAVY);
  doc.text("Find out more at neurodiversityglobal.com", margin, y);

  footer();

  // === Download ===
  const safeName = childName.toLowerCase().replace(/[^a-z0-9]/g, "");
  doc.save(`${safeName}-profile-${dateCompact}.pdf`);
}
