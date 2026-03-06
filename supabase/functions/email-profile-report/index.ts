import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface StructuredSection {
  sectionIndex: number;
  sectionTitle: string;
  reflection: string;
}

interface StructuredReport {
  version: 2;
  openingLine: string;
  topSummary: { headline: string; bullets: string[] };
  sectionInsights: StructuredSection[];
  waysOfWorking: string;
  someThingsThatMayHelp: string;
  conclusion: string;
}

interface RequestBody {
  email: string;
  childName: string;
  report: string;
  structured?: StructuredReport;
  pdfBase64?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function markdownToHtml(text: string): string {
  return escapeHtml(text)
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 12px 0;line-height:1.6;">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function buildStructuredHtml(s: StructuredReport, childName: string): string {
  const sections = s.sectionInsights
    .map(
      (si) => `
      <tr><td style="padding:16px 24px;border-bottom:1px solid #e5e5e5;">
        <h3 style="margin:0 0 8px 0;font-size:16px;color:#1a1a1a;">${escapeHtml(si.sectionTitle)}</h3>
        <p style="margin:0;line-height:1.6;color:#333;">${escapeHtml(si.reflection)}</p>
      </td></tr>`
    )
    .join("");

  return `
    <tr><td style="padding:24px;background:#f8f5f0;border-radius:8px;">
      <h2 style="margin:0 0 8px 0;font-size:20px;color:#1a1a1a;">${escapeHtml(s.topSummary.headline)}</h2>
      <ul style="margin:0;padding-left:20px;color:#333;">
        ${s.topSummary.bullets.map((b) => `<li style="margin-bottom:6px;line-height:1.5;">${escapeHtml(b)}</li>`).join("")}
      </ul>
    </td></tr>
    <tr><td style="padding:24px 0;">
      <p style="margin:0 0 16px 0;line-height:1.6;color:#333;font-style:italic;">${escapeHtml(s.openingLine)}</p>
    </td></tr>
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
        ${sections}
      </table>
    </td></tr>
    ${s.waysOfWorking ? `
    <tr><td style="padding:24px 0;">
      <h2 style="margin:0 0 12px 0;font-size:18px;color:#1a1a1a;">Ways of Working</h2>
      ${markdownToHtml(s.waysOfWorking)}
    </td></tr>` : ""}
    ${s.someThingsThatMayHelp ? `
    <tr><td style="padding:0 0 24px 0;">
      <h2 style="margin:0 0 12px 0;font-size:18px;color:#1a1a1a;">Some Things That May Help</h2>
      ${markdownToHtml(s.someThingsThatMayHelp)}
    </td></tr>` : ""}
    ${s.conclusion ? `
    <tr><td style="padding:0 0 24px 0;">
      <h2 style="margin:0 0 12px 0;font-size:18px;color:#1a1a1a;">Conclusion</h2>
      ${markdownToHtml(s.conclusion)}
    </td></tr>` : ""}
  `;
}

function buildEmail(childName: string, report: string, structured?: StructuredReport): string {
  const displayName = childName || "your child";

  const reportHtml = structured
    ? buildStructuredHtml(structured, displayName)
    : `<tr><td style="padding:24px 0;">${markdownToHtml(report)}</td></tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <tr><td style="padding:0 0 24px 0;border-bottom:2px solid #d4a843;">
      <h1 style="margin:0;font-size:24px;color:#1a1a1a;">My Child: This is me</h1>
      <p style="margin:4px 0 0 0;font-size:14px;color:#666;">A profile of ${escapeHtml(displayName)}</p>
    </td></tr>

    <!-- Personal note from Rich -->
    <tr><td style="padding:24px 0;">
      <p style="margin:0 0 12px 0;line-height:1.6;color:#333;">Hello,</p>
      <p style="margin:0 0 12px 0;line-height:1.6;color:#333;">Thank you for taking the time to complete this profile. I know how much thought, energy, and emotion goes into describing your child to others — especially when you feel like the system is not seeing them clearly.</p>
      <p style="margin:0 0 12px 0;line-height:1.6;color:#333;">Below is a summary of the report that was generated from everything you shared, and the full report is attached as a PDF. It is yours. Use it however helps — for school meetings, EHCP reviews, educational psychologist assessments, or simply as a record of who ${escapeHtml(displayName)} really is.</p>
      <p style="margin:0 0 0 0;line-height:1.6;color:#333;">You are doing an extraordinary thing for your child.</p>
      <p style="margin:12px 0 0 0;line-height:1.6;color:#333;font-weight:600;">Rich Ferriman</p>
    </td></tr>

    <!-- Divider -->
    <tr><td style="padding:0;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:0;"></td></tr>

    <!-- Report content -->
    ${reportHtml}

    <!-- Divider -->
    <tr><td style="padding:24px 0 0 0;"><hr style="border:none;border-top:2px solid #d4a843;margin:0;"></td></tr>

    <!-- About Neurodiversity Global -->
    <tr><td style="padding:24px 0;">
      <h2 style="margin:0 0 12px 0;font-size:18px;color:#1a1a1a;">About Neurodiversity Global</h2>
      <p style="margin:0 0 12px 0;line-height:1.6;color:#333;">Neurodiversity Global is an independent platform built by Rich Ferriman — a parent of neurodivergent children and founder of the SEND Navigator.</p>
      <p style="margin:0 0 12px 0;line-height:1.6;color:#333;">We believe every neurodivergent child deserves to be understood on their own terms. Our tools are designed to give families a voice — not through jargon or tick-boxes, but through genuine understanding of who their child is.</p>
      <p style="margin:0 0 12px 0;line-height:1.6;color:#333;">
        <a href="https://send.neurodiversityglobal.com" style="color:#d4a843;text-decoration:underline;">Visit SEND Navigator</a> &nbsp;|&nbsp;
        <a href="https://neurodiversityglobal.com" style="color:#d4a843;text-decoration:underline;">Neurodiversity Global</a>
      </p>
    </td></tr>

    <!-- Parent-to-parent notice -->
    <tr><td style="padding:16px 0;background:#f8f5f0;border-radius:6px;">
      <p style="margin:0 16px 8px 16px;font-size:13px;color:#333;line-height:1.6;font-weight:600;">A note about what this is</p>
      <p style="margin:0 16px 8px 16px;font-size:12px;color:#555;line-height:1.6;">This profile was created by a parent, for their child. It is not a clinical assessment, a diagnosis, or professional advice. It is a practical document built from lived experience, designed to help you describe your child in your own words.</p>
      <p style="margin:0 16px 8px 16px;font-size:12px;color:#555;line-height:1.6;">The SEND Navigator is built by parents who have been through the system themselves. We share guidance, strategies, and ideas that work for families in our community. We always recommend working alongside qualified professionals — SENDCOs, educational psychologists, speech and language therapists, and your child's school team — for formal assessments and decisions about provision.</p>
    </td></tr>

    <!-- Comprehensive disclaimer -->
    <tr><td style="padding:20px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #c9a227;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:20px 16px;background:#faf6ed;">
          <p style="margin:0 0 10px 0;font-size:14px;color:#1a1a1a;font-weight:700;">Important information about this document</p>

          <p style="margin:0 0 10px 0;font-size:12px;color:#444;line-height:1.7;"><strong>This is not a legal, medical, or clinical document.</strong> It cannot be used as evidence in legal proceedings, tribunal hearings, or formal assessments. It does not constitute a diagnosis, a clinical opinion, or a professional recommendation. It should not be treated as a substitute for advice from qualified professionals including educational psychologists, speech and language therapists, community paediatricians, or your child's school SENCO.</p>

          <p style="margin:0 0 10px 0;font-size:12px;color:#444;line-height:1.7;"><strong>How AI is used.</strong> Parts of this report were generated using artificial intelligence. The AI draws on a curated knowledge base built by the SEND Navigator team. It uses observational language based on what you told us — it does not diagnose, label, or make clinical judgements. AI can make mistakes. You should always review the content and remove or correct anything that does not accurately reflect your child.</p>

          <p style="margin:0 0 10px 0;font-size:12px;color:#444;line-height:1.7;"><strong>Language and tone.</strong> This report uses careful, observational language. It describes what a child tends to do, what appears to help, and what has been observed — not what a child "is". If any phrasing feels inaccurate, negative, or does not reflect your child fairly, please amend it before sharing. The report should always represent your child honestly and with dignity.</p>

          <p style="margin:0 0 10px 0;font-size:12px;color:#444;line-height:1.7;"><strong>How to use this document.</strong> This profile is designed to help you communicate with schools, SENCOs, and professionals. It is an informational starting point — a way to share who your child is, what helps, and what they find difficult. It works best when used alongside professional assessments and advice, not instead of them.</p>

          <p style="margin:0 0 10px 0;font-size:12px;color:#444;line-height:1.7;"><strong>Your data.</strong> The answers you provided are stored temporarily (up to 14 days) and then automatically deleted. Your data is encrypted in transit and at rest. It is not used to train AI models and is not shared with third parties. This email and the attached PDF are the only copies sent outside your device.</p>

          <p style="margin:0;font-size:12px;color:#444;line-height:1.7;"><strong>Who built this.</strong> The SEND Navigator and "My Child: This is me" tool are built by Neurodiversity Global Ltd — an independent, neurodivergent-led organisation. We are parents and practitioners, not a government body, a campaign group, or a medical provider. Everything here is offered in good faith, from lived experience, and should be used as a guide only.</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:16px 0 0 0;border-top:1px solid #e5e5e5;">
      <p style="margin:0;font-size:11px;color:#999;line-height:1.5;">This report was generated using the "My Child: This is me" tool on SEND Navigator. © ${new Date().getFullYear()} Neurodiversity Global Ltd. All rights reserved.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const body: RequestBody = await req.json();

    if (!body.email || !body.email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!body.report && !body.structured) {
      return new Response(JSON.stringify({ error: "Report content is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const childName = body.childName || "your child";
    const html = buildEmail(childName, body.report || "", body.structured);

    // Build Resend payload
    const safeName = childName.toLowerCase().replace(/[^a-z0-9]/g, "") || "child";
    const emailPayload: Record<string, unknown> = {
      from: "Rich Ferriman <rich@neurodiversityglobal.com>",
      to: [body.email],
      subject: `This is ${childName} — from SEND Navigator`,
      html,
    };

    // Attach full PDF if provided
    if (body.pdfBase64) {
      emailPayload.attachments = [
        {
          filename: `${safeName}-profile-report.pdf`,
          content: body.pdfBase64,
        },
      ];
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", errText);
      throw new Error(`Email send failed: ${res.status}`);
    }

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("email-profile-report error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
