import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ScrapbookFolder } from '../../data/siteContent'
import { getLenisInstance } from '../../lib/lenis'
import { cn } from '../../lib/cn'

interface FolderGalleryModalProps {
  /** The open folder's data, or null when the modal is closed. */
  folder: ScrapbookFolder | null
  onClose: () => void
}

/**
 * Scrapbook folder gallery — a single reusable popup every folder in
 * AboutMe opens, fed that folder's own { title, images } data. A pink-
 * bordered card floats over a dimmed backdrop rather than a generic
 * centered dialog: title up top, one photo at a time in the middle
 * (swipe/scroll or the arrow buttons move between them), caption below.
 */
export function FolderGalleryModal({ folder, onClose }: FolderGalleryModalProps) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const images = folder?.images ?? []
  const count = images.length
  const current = images[index]

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(count - 1, next))
      setIndex(clamped)
      const slide = trackRef.current?.children[clamped] as HTMLElement | undefined
      slide?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    },
    [count],
  )

  // Keep the index (and caption/counter) in sync when the user swipes or
  // scrolls the track by hand instead of using the arrow buttons.
  function handleScroll() {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const next = Math.round(track.scrollLeft / track.clientWidth)
    setIndex((prev) => (next !== prev ? Math.max(0, Math.min(count - 1, next)) : prev))
  }

  // Reset to the first image whenever a different folder is opened.
  useEffect(() => {
    setIndex(0)
  }, [folder])

  // Lock the page behind the popup (and pause Lenis's smooth scroll, which
  // otherwise keeps driving native scroll under a plain overflow:hidden).
  useEffect(() => {
    if (!folder) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const lenis = getLenisInstance()
    lenis?.stop()
    return () => {
      document.body.style.overflow = previousOverflow
      lenis?.start()
    }
  }, [folder])

  // Whatever had focus (the folder button that opened this) gets it back
  // once the dialog closes, instead of focus silently dropping to <body>.
  // Declared before the "focus the close button" effect below so it
  // captures document.activeElement before that effect moves it.
  useEffect(() => {
    if (!folder) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    return () => previouslyFocused?.focus()
  }, [folder])

  // Focus the close button on open so keyboard/screen-reader users land
  // inside the dialog immediately.
  useEffect(() => {
    if (folder) closeButtonRef.current?.focus()
  }, [folder])

  // Escape to close, arrow keys to navigate, Tab trapped inside the dialog
  // so it can't reach the (visually dimmed, but otherwise still-focusable)
  // page behind the modal.
  useEffect(() => {
    if (!folder) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
      if (e.key === 'Tab') {
        const dialog = dialogRef.current
        if (!dialog) return
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [folder, index, goTo, onClose])

  if (!folder) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-[22rem] flex-col overflow-y-auto rounded-[26px] border-[7px] border-blush-300 bg-card px-5 pb-6 pt-6 shadow-soft-lg sm:max-w-sm sm:border-[9px] sm:px-7 sm:pb-8 sm:pt-7"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-graphite transition-colors hover:bg-blush-50 sm:left-4 sm:top-4"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <h3 id={titleId} className="text-center font-display text-2xl font-semibold text-blush-500 sm:text-[1.75rem]">
          {folder.title}
        </h3>

        <div className="mt-5 flex flex-1 items-center gap-1.5 sm:mt-6 sm:gap-2.5">
          <NavArrow direction="left" disabled={count <= 1 || index === 0} onClick={() => goTo(index - 1)} />

          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, i) => (
              <div key={i} className="w-full shrink-0 snap-center">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-blush-200 bg-blush-50">
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: image.objectPosition ?? 'center' }}
                    />
                  ) : (
                    <PlaceholderSlide label={image.alt} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <NavArrow direction="right" disabled={count <= 1 || index === count - 1} onClick={() => goTo(index + 1)} />
        </div>

        {count > 1 && (
          <p aria-hidden="true" className="mt-3 text-center text-sm text-graphite-soft">
            {index + 1} / {count}
          </p>
        )}

        {current?.caption && (
          <p className="mt-2 text-center text-[1.0625rem] leading-snug text-blush-500">{current.caption}</p>
        )}
      </div>
    </div>
  )
}

function NavArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous image' : 'Next image'}
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-graphite transition-colors',
        disabled ? 'opacity-20' : 'hover:bg-blush-50',
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {direction === 'left' ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  )
}

/** Stand-in for a folder that doesn't have real photos yet. */
function PlaceholderSlide({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-blush-50),var(--color-blush-100))] px-6 text-center">
      <span className="text-sm text-blush-500/70">{label}</span>
    </div>
  )
}
