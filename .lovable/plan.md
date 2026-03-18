

## Plan: Rescope Ask Rich from "SEND reform Q&A" to "Neurodiversity and children Q&A"

### The change

Ask Rich has evolved beyond SEND reform policy questions. It now answers questions about neurodivergence, children's behaviour, school experience, and family life. The UI copy, SEO metadata, placeholders, and descriptions across the site still say "SEND reform" when they should reflect the broader scope.

This is a copy and framing update across approximately 8 files. No structural or functional changes needed.

### New framing

- **Old**: "Ask a question about SEND reform"
- **New**: "Ask a question about SEND, neurodiversity, and your child"

The tool still covers reform, but that is now one topic among many (neurodivergence, behaviour, school, EHCPs, family life).

### Files to update

**1. `src/components/qanda/QuestionInput.tsx`**
- Placeholder: "Ask about SEND, neurodiversity, or your child..." (was "Ask a question about SEND reform...")
- aria-label: match the new scope

**2. `src/components/AskAICompact.tsx`**
- Label: "Ask Rich about SEND and neurodiversity" (was "Ask Rich about SEND reform")
- aria-label: updated to match

**3. `src/components/AskSendFloating.tsx`**
- Description: "Ask me anything about SEND, neurodiversity, and children." (was "Ask me anything about SEND reform.")

**4. `src/components/landing/HomeAskRich.tsx`**
- Placeholder: "Ask about SEND, neurodiversity, or your child..." (was "Ask a question about SEND reform...")

**5. `src/pages/QuestionsAndAnswers.tsx`**
- SEO title: "Ask Rich - SEND and Neurodiversity Q&A"
- SEO description: "Ask Rich a question about SEND, neurodiversity, and children. Get a grounded, plain English answer based on confirmed information."
- Hero description: update Rich's intro paragraph to reflect the broader scope

**6. `src/pages/landing/FeatureAskRich.tsx`**
- SEO description and hero copy: broaden from "SEND reform" to "SEND, neurodiversity, and children"
- "What you will find" section: update to mention neurodivergent conditions, behaviour, school experience alongside reform
- "Why it matters" section: broaden from "misinformation about SEND reform" to the wider information gap parents face
- Feature list: add items like "Covers neurodivergent conditions, behaviour, and family life"

**7. `src/components/landing/AnimatedFeatureShowcase.tsx`**
- Ask Rich description: update from "Ask any question about SEND reform" to broader scope

**8. `src/components/qanda/types.ts`**
- Example questions already reflect the broader scope (ADHD, PDA, school). No change needed here.

### What stays the same

- The edge function system prompt (already updated to cover neurodiversity)
- The knowledge base structure
- All component logic, types, and API calls
- Example questions (already broad)
- The trust notice (already correct)

