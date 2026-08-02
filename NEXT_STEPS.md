# Next Steps

## Completed today

- Replaced all four placeholder case studies with real projects: **Markaz**, **Setlist**, **Close the Curtain**, and **LORIS Redesign** — each rewritten in the site's voice, no fabricated research/metrics.
- Added award badges (🏆 Most Innovative Award on Setlist) and Behance as a supported link type.
- Split project images into `coverImage` (homepage card) and `heroImage` (case study banner) so they can use different crops independently.
- Wired in and compressed real cover images for Markaz, Setlist, Close the Curtain, and LORIS Redesign — all now under 260KB each.
- Fixed three spots that were silently stuck on the placeholder gradient even after a real image was set: the case study hero banner, the About portrait, and image-grid blocks.
- Rewrote the entire About section — copy and layout — to sound like an actual new grad instead of a design consultant, across six distinct visual beats instead of one static block.
- Replaced the static hero headline with a "Hi, I'm Afeefa" + looping typewriter role animation (measured, not guessed, to avoid any layout shift; respects reduced motion).
- Committed and pushed — live deploy triggered.

## What's left

- **Wayfind** is still the one fictional placeholder project — replace with real work whenever ready, or leave intentionally if you want to keep it.
- Wayfind's homepage card image is still the placeholder gradient.
- **Case study body images** are still placeholders across every project: hero banners (21:9), wireframes, before/afters, final mockups. Each is clearly labeled `PLACEHOLDER — replace with...` in `src/data/projects.ts` so they're easy to find.
- **Real links** — every Figma / Behance / GitHub / Live / PDF link is currently `url: '#'`. Swap in real URLs as they're ready.
- **About portrait photo** — still a placeholder; same for the small hackathon photo in the "Built under pressure" card.
- **Social links** (LinkedIn, GitHub, Read.cv) in the footer/contact section are still `#` placeholders. Email is already real.
- Consider whether the Hero's featured-project glass chip should point at a real project (currently still Wayfind, since it's first in the list) now that you have real, awarded work to lead with.
