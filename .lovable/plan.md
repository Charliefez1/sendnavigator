

# Make the Beta Warning More Prominent

**File:** `src/components/child-profile/OpeningScreen.tsx` (lines 217-225)

Currently the beta warning uses `text-xs` sizing, a small icon, and blends into the page. The fix:

- Increase the font size from `text-xs` to `text-sm` for both the heading and body text
- Make the heading larger (`text-base font-bold`) so it stands out
- Increase the icon size from `w-4 h-4` to `w-5 h-5`
- Add more padding (`p-5` instead of `p-4`)
- Use a stronger border colour (`border-amber-500/50` instead of `/30`)
- Add a slightly stronger background tint

This keeps the same position and style but makes it unmissable rather than easy to scroll past.

