import { useEffect, useRef } from 'react'
import { hero, person } from '../../data/siteContent'
import heroLoop from '../../assets/images/video-loop-new-updated.mp4'

/**
 * Hero — a looping video, fully designed and exported from Canva. This
 * "updated" cut has its own name/title text baked into the footage, so —
 * same rule as the original video hero — nothing is layered on top of it:
 * no overlay, no filter, no color adjustment, no HTML text. (An earlier
 * revision of this component drew "Afeefa Malik" / the eyebrow line over
 * the video in HTML for a text-less cut; that's removed here since it would
 * now double up with the video's own baked-in text.)
 *
 * The name/title text lives in the video pixels, so it's invisible to
 * screen readers and search engines — this sr-only h1 restores that
 * without putting anything back on screen.
 *
 * `<source type="video/mp4">` (rather than a bare `src`) and a manual
 * `.play()` call on mount are both belt-and-suspenders: autoplay already
 * works from the `autoPlay`/`muted`/`playsInline` attributes alone in every
 * evergreen browser, but the explicit MIME type and the fallback play()
 * call (its promise deliberately ignored — this only matters on browsers
 * stingy enough to need it, and there's nothing useful to do if it rejects)
 * cost nothing and remove any doubt about it actually running.
 *
 * `object-left` (not the cover default of centered): the baked-in text
 * sits near the left edge of the source frame, and on narrower viewports
 * this section is proportionally taller than the video (cover crops the
 * sides, not top/bottom, at those widths) — a centered crop cuts straight
 * through the text. Anchoring left keeps it fully in frame and only trims
 * empty background off the right instead. Desktop's wider aspect crops
 * top/bottom either way, so this doesn't change that framing.
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section
      id="hero"
      aria-label="Intro"
      className="relative h-[280px] overflow-hidden sm:h-[340px] lg:h-[420px]"
    >
      <h1 className="sr-only">
        {person.name} — {hero.eyebrow}
      </h1>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-full w-full object-cover object-left"
      >
        <source src={heroLoop} type="video/mp4" />
      </video>
    </section>
  )
}
