

## Emailing the Profile Report

### What you want
Send the completed profile report to parents via email from `rich@neurodiversityglobal.com`, including the report content and a section about Neurodiversity Global.

### What's possible
Yes, this is achievable. However, Lovable's built-in email system only handles authentication emails (password resets, verification etc.), so for transactional emails like this we need **Resend** — a simple email API that works well from backend functions.

### What you'll need to do (outside Lovable)
1. **Create a free Resend account** at [resend.com](https://resend.com)
2. **Verify the domain** `neurodiversityglobal.com` in Resend (add DNS records they provide)
3. **Get your Resend API key** from the Resend dashboard

Once you provide the API key, I'll store it securely and build everything else.

### What I'll build

**1. Collect email address in FinalScreen**
- Add an email input field on the final screen (before report generation)
- Optional — the user can skip it and just download the PDF

**2. New edge function: `email-profile-report`**
- Receives: parent email, child name, the generated report text (structured sections)
- Builds an HTML email in Rich's voice with:
  - A warm intro from Rich
  - The full AI-generated report (formatted for email)
  - An "About Neurodiversity Global" footer section
- Sends from `rich@neurodiversityglobal.com` via Resend API
- Note: PDF attachment is not straightforward from edge functions (PDF is generated client-side with jsPDF). Instead, the email will contain the report as formatted HTML, which is arguably better for email anyway.

**3. Trigger after report generation**
- After the AI report is generated and cached, if the user provided an email, call the edge function
- Show a toast confirmation: "Report sent to your email"

### Files changed
- `src/components/child-profile/FinalScreen.tsx` — add email input
- `supabase/functions/email-profile-report/index.ts` — new edge function
- `supabase/config.toml` — register the new function
- `src/pages/MyChildProfile.tsx` — trigger email send after report ready

### One question
Shall I proceed with setting up Resend for this, or would you prefer a different approach?

