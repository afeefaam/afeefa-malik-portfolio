import { useState } from 'react'
import { person, portrait, scrapbookFolders } from '../../data/siteContent'
import { cn } from '../../lib/cn'
import { Bounded } from './Bounded'
import { FolderGalleryModal } from './FolderGalleryModal'

/**
 * About Me — the folder collage from the reference: labelled dusty-rose
 * file folders scattered around a matted, name-tagged portrait. Absolutely
 * positioned on desktop; a simple stacked grid on smaller screens. Each
 * folder opens the same shared gallery popup, fed its own scrapbookFolders
 * entry.
 */

const FOLDERS = [
  'Fav drinks',
  'activities',
  'travel',
  'community',
  'hackathons',
] as const

type FolderLabel = (typeof FOLDERS)[number]

// Desktop placements (percentages within the collage box).
const PLACEMENT: Record<string, string> = {
  'Fav drinks': 'left-[22%] top-0',
  activities: 'right-[6%] top-[5%]',
  travel: 'left-0 top-[42%]',
  community: 'right-[1%] top-[53%]',
  hackathons: 'left-[9%] top-[80%]',
}

export function AboutMe() {
  const [openFolder, setOpenFolder] = useState<FolderLabel | null>(null)

  return (
    <section id="about" className="scroll-mt-[calc(var(--nav-height)+24px)] py-12 sm:py-16">
      <Bounded>
        <h2 className="font-display text-[1.875rem] font-semibold text-blush-500 sm:text-[2.25rem]">
          About Me
        </h2>
        <div className="mt-4 h-px w-full bg-blush-200" />

        {/* Desktop collage */}
        <div className="relative mx-auto mt-12 hidden h-[660px] max-w-4xl lg:block">
          {FOLDERS.map((label) => (
            <Folder
              key={label}
              label={label}
              className={cn('absolute w-28', PLACEMENT[label])}
              onOpen={() => setOpenFolder(label)}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2">
            <FramedPhoto />
          </div>
        </div>

        {/* Stacked layout for tablet / mobile */}
        <div className="mt-10 lg:hidden">
          <div className="mx-auto w-64 sm:w-72">
            <FramedPhoto />
          </div>
          <div className="mt-12 grid grid-cols-2 justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3">
            {FOLDERS.map((label) => (
              <Folder key={label} label={label} className="w-28" onOpen={() => setOpenFolder(label)} />
            ))}
          </div>
        </div>
      </Bounded>

      <FolderGalleryModal
        folder={openFolder ? scrapbookFolders[openFolder] : null}
        onClose={() => setOpenFolder(null)}
      />
    </section>
  )
}

function FramedPhoto() {
  return (
    <figure className="relative">
      <div className="rounded-xl bg-blush-300 p-2.5 sm:p-3">
        <img
          src={portrait.src ?? undefined}
          alt={portrait.alt}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-md object-cover"
          // Wide landscape source — full height always shows, so only the
          // horizontal position matters. Her face sits almost dead-center
          // in the source photo, so a true center crop is what keeps her
          // as the clear focal point instead of off to one side.
          style={{ objectPosition: 'center' }}
        />
      </div>
      <figcaption className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-blush-400 px-4 py-1 font-display text-lg text-white sm:px-5 sm:py-1.5 sm:text-xl">
        {person.name.split(' ')[0]}
      </figcaption>
    </figure>
  )
}

function Folder({
  label,
  className = '',
  onOpen,
}: {
  label: string
  className?: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Open ${label} photos`}
      className={cn(
        'group flex cursor-pointer flex-col items-center gap-2 text-center transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] motion-reduce:transition-none',
        className,
      )}
    >
      <span className="relative block w-full">
        <svg viewBox="0 0 64 52" className="block w-full" aria-hidden="true">
          <path
            d="M2 10a4 4 0 0 1 4-4h15.2a3 3 0 0 1 2.1.9l3.8 3.8a3 3 0 0 0 2.1.9H58a4 4 0 0 1 4 4v4H2Z"
            fill="var(--color-folder-tab)"
          />
          <path
            d="M2 15a3 3 0 0 1 3-3h54a3 3 0 0 1 3 3v29a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5Z"
            fill="var(--color-folder)"
          />
        </svg>

        {/* Persistent "this opens" cue — a tiny corner tag, not a UI badge,
            so it reads as a scrapbook detail (like a peeled photo corner)
            rather than a standard button affordance. Visible at rest;
            hover just nudges it up/right along with the folder's own lift,
            reinforcing the same "outward" motion instead of animating on
            its own. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0.5 right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-blush-50/70 bg-blush-50 text-folder-tab shadow-[0_1px_3px_rgba(150,70,70,0.25)] transition-[transform,background-color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-white motion-reduce:transition-none"
        >
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
          </svg>
        </span>
      </span>
      <span className="text-[15px] text-folder-label">{label}</span>
    </button>
  )
}
