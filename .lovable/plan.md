

# Adding Colour and Visual Energy to Beacon SEND Navigator

## The Problem
Right now, the entire site is a single tone of warm beige/cream with navy headers. Every card looks the same. Every section blends into the next. It is clean, but it feels flat and corporate. There is no visual rhythm or personality.

## The Approach
We will add colour strategically - not randomly - so each section of the home page has its own visual identity. The site stays calm and accessible, but gains energy and variety. Nothing flashy. Just enough colour to make it feel alive.

## What Changes

### 1. Coloured Section Backgrounds on the Home Page
Instead of every section sitting on the same beige, alternate between subtle colour washes:
- **GuideMe hero**: Already navy - good. Add a subtle gradient (navy to deep teal) for more depth.
- **News Headlines**: Add a warm amber/gold left accent bar instead of the flat red-only banner.
- **Word from Rich**: Give it a warm teal-tinted background with a coloured left border strip, making it feel like a personal note.
- **SENDIASS signpost**: Shift from faint primary tint to a bolder sage green background that actually stands out.
- **Q&A section**: Add a soft blue-tinted background panel so it reads as its own zone.
- **"Made for families" card**: Give it a warm rose/coral accent to make it feel heartfelt.

### 2. Colour-Coded Content Cards (Browse Everything)
When users expand "Browse everything", each section already has an `accent` prop. We will make these bolder:
- Coloured left border strips on each card group
- Slightly tinted section backgrounds behind each group
- Bolder icon backgrounds with more saturation

### 3. Quick Links Bar - More Colourful Buttons
Replace the uniform navy buttons at the top with individually coloured pill buttons:
- SEND Reform Report: teal
- EHCP Guide: deep blue
- My Child Profile: amber
- What to do now: coral
- Ask Rich: purple/violet

### 4. PreFooter Cards - Individual Colour Accents
Each of the three PreFooter cards gets its own accent colour on the icon and top border:
- Neurodiversity Global: teal
- Stay Updated: amber/gold
- Get in Touch: coral/rose

### 5. CSS Enhancements
Add a few new utility classes:
- Subtle gradient backgrounds for section panels
- Coloured left-border accent class for cards
- A couple of new colour tokens for the additional accents (warm violet, deeper teal, soft gold)

## Files to Change

| File | Change |
|------|--------|
| `src/index.css` | Add new colour tokens and gradient utility classes |
| `src/pages/Start.tsx` | Add coloured backgrounds to sections, update quick link button colours |
| `src/components/GuideMe.tsx` | Add gradient to the navy hero |
| `src/components/WordFromRich.tsx` | Coloured left border strip, teal-tinted background |
| `src/components/SendiassSignpost.tsx` | Bolder sage green background |
| `src/components/NewsHeadlines.tsx` | Add coloured accent strip |
| `src/components/PreFooter.tsx` | Individual accent colours per card |

## What Does Not Change
- The navy header and footer stay as they are
- Typography stays the same (Fraunces headings, Inter body)
- The overall warm tone remains - we are adding colour, not replacing the palette
- Dark mode tokens will be updated to match

