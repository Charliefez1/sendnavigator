

## Darken font colours across the entire site

### The problem
Text across the site appears too light. The root cause is in the CSS custom properties in `src/index.css`. Two key variables control nearly all text colour:

- `--foreground: 220 25% 14%` -- main text (already fairly dark)
- `--muted-foreground: 220 10% 46%` -- used heavily for body paragraphs, descriptions, timestamps, and secondary text (this is the main offender -- 46% lightness is quite washed out on a grey background)

Several other foreground variables also need darkening:
- `--secondary-foreground: 220 20% 25%`
- `--accent-foreground: 155 35% 30%`
- `--card-foreground` and `--popover-foreground` (currently same as foreground)

### The fix
Change **only the CSS variables** in `src/index.css` -- no individual page edits needed. Every component already uses these variables via Tailwind classes (`text-foreground`, `text-muted-foreground`, etc.), so updating the variables propagates everywhere automatically.

### Changes to `src/index.css`

**Light mode (`:root`):**

| Variable | Current | New | Reason |
|---|---|---|---|
| `--foreground` | `220 25% 14%` | `220 30% 10%` | Slightly deeper for main headings and body |
| `--card-foreground` | `220 25% 14%` | `220 30% 10%` | Match foreground |
| `--popover-foreground` | `220 25% 14%` | `220 30% 10%` | Match foreground |
| `--muted-foreground` | `220 10% 46%` | `220 12% 35%` | The biggest change -- from 46% to 35% lightness makes secondary text noticeably darker and more readable |
| `--secondary-foreground` | `220 20% 25%` | `220 22% 18%` | Darker secondary text |
| `--accent-foreground` | `155 35% 30%` | `155 40% 22%` | Darker accent text |

**Dark mode (`.dark`)** -- left unchanged since dark mode already has light text on dark backgrounds. Changes are light-mode only.

### What this affects
Every page, every card, every component -- all text gets darker without touching any individual files. This is a single-file, 6-line change.

