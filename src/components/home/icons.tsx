import { cn } from '../../lib/cn'
import figmaIcon from '../../assets/images/icons8-figma-48.png'
import illustratorIcon from '../../assets/images/icons8-adobe-illustrator-24.png'
import canvaIcon from '../../assets/images/icons8-canva-48.png'
import fireflyIcon from '../../assets/images/icons8-adobe-firefly-48.png'
import premiereIcon from '../../assets/images/icons8-adobe-premiere-pro-48.png'
import indesignIcon from '../../assets/images/icons8-adobe-indesign-48.png'
import photoshopIcon from '../../assets/images/icons8-adobe-photoshop-48.png'
import wordIcon from '../../assets/images/icons8-word-48.png'
import linkedinIcon from '../../assets/images/icons8-linkedin-48.png'
import githubIcon from '../../assets/images/icons8-github-50.png'
import behanceIcon from '../../assets/images/icons8-behance-64.png'
import resumeIcon from '../../assets/images/icons8-resume-50.png'

/**
 * Homepage icon set — real brand-icon image assets (src/assets/images),
 * shown as plain floating artwork rather than boxed inside heavy outlined
 * tiles, to match the site's soft editorial style. Non-interactive tool
 * icons render bare, at a size where the artwork itself carries the visual
 * weight; clickable social/résumé icons get a soft rounded hover backdrop
 * (no border at rest) so they still read as tappable.
 */

export type MarkProps = { size?: 'md' | 'sm' }

// Every icon — Tool or Social — sits in an identically-sized outer box
// (WRAPPER) with its actual artwork rendered at one fixed size inside it
// (ICON_SIZE) and centered on both axes. ICON_SIZE is a fixed width+height,
// not a max-width/max-height cap: the source PNGs range from 24px to 64px
// native, and a max-size alone only ever shrinks an oversized source — a
// smaller one (Illustrator's is a 24px export) would render under-size
// instead of filling the same box as its neighbors. Forcing an explicit
// size (with object-contain guarding against distortion) upscales that one
// slightly softer, but every mark ends up the same true rendered footprint,
// which is the point. sm is used where the tool row sits in tighter
// company (ExperienceTimeline).
const WRAPPER = {
  md: 'h-12 w-12',
  sm: 'h-9 w-9',
}
const ICON_SIZE = {
  md: 'h-8 w-8',
  sm: 'h-6 w-6',
}

/** Tool icon — plain artwork, no container styling (no background, no
 * border) so it stays non-interactive-looking, but still centered in the
 * same invisible box as every other mark so mismatched source resolutions
 * don't throw off baseline alignment or spacing. */
function ToolIcon({
  src,
  alt,
  size = 'md',
  className,
}: {
  src: string
  alt: string
  size?: 'md' | 'sm'
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center justify-center', WRAPPER[size])}>
      <img src={src} alt={alt} className={cn('object-contain', ICON_SIZE[size], className)} />
    </span>
  )
}

/** Social / résumé icon — a soft circular button (light cream fill, hairline
 * border, faint shadow) so this whole group reads as clickable at a glance,
 * unlike the bare Tools artwork above it. Every button is the same fixed
 * WRAPPER size regardless of icon source dimensions, with the artwork
 * fixed at ICON_SIZE and centered — so LinkedIn/Behance/GitHub/Résumé line
 * up as identically-sized circles even though their source files don't
 * share a native resolution. The lift + focus ring live on the wrapping
 * `<a>` in each consumer (it needs `group` there for the hover/focus states
 * below to reach this nested span); this owns the button's own shape, the
 * icon's slight hover/focus scale, and a small tooltip naming the
 * destination — shown on hover *and* keyboard focus, not a permanent
 * label. */
function SocialIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border border-blush-100 bg-blush-50 shadow-[0_1px_4px_rgba(150,70,70,0.15)] transition-colors duration-200 group-hover:bg-blush-100 group-focus-visible:bg-blush-100 motion-reduce:transition-none',
        WRAPPER.md,
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          'object-contain transition-transform duration-200 group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none',
          ICON_SIZE.md,
        )}
      />
      {/* Below the icon, not above: this row sits close under a section
          heading, and there isn't reliably enough clearance above it for a
          floating label without overlapping that heading. */}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-blush-500 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        {alt}
      </span>
    </span>
  )
}

/* ── Tools ─────────────────────────────────────────────────────────────── */

export const FigmaMark = ({ size = 'md' }: MarkProps) => <ToolIcon src={figmaIcon} alt="Figma" size={size} />
export const IllustratorMark = ({ size = 'md' }: MarkProps) => (
  <ToolIcon src={illustratorIcon} alt="Adobe Illustrator" size={size} />
)
export const CanvaMark = ({ size = 'md' }: MarkProps) => <ToolIcon src={canvaIcon} alt="Canva" size={size} />
export const FireflyMark = ({ size = 'md' }: MarkProps) => <ToolIcon src={fireflyIcon} alt="Adobe Firefly" size={size} />
export const PremiereMark = ({ size = 'md' }: MarkProps) => <ToolIcon src={premiereIcon} alt="Adobe Premiere Pro" size={size} />
export const InDesignMark = ({ size = 'md' }: MarkProps) => <ToolIcon src={indesignIcon} alt="Adobe InDesign" size={size} />
export const PhotoshopMark = ({ size = 'md' }: MarkProps) => <ToolIcon src={photoshopIcon} alt="Adobe Photoshop" size={size} />
export const WordMark = ({ size = 'md' }: MarkProps) => <ToolIcon src={wordIcon} alt="Microsoft Word" size={size} />

/* ── Social ────────────────────────────────────────────────────────────── */

export const LinkedInMark = () => <SocialIcon src={linkedinIcon} alt="LinkedIn" />
export const GitHubMark = () => <SocialIcon src={githubIcon} alt="GitHub" />
export const BehanceMark = () => <SocialIcon src={behanceIcon} alt="Behance" />
export const ResumeMark = () => <SocialIcon src={resumeIcon} alt="Résumé" />

/* ── Utility ───────────────────────────────────────────────────────────── */

export function ArrowRightMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Diagonal "external link" arrow — used on links that leave the site
 * (e.g. the Marketing Portfolio card) so it reads distinctly from
 * ArrowRightMark's in-page "→" affordance. */
export function ExternalLinkMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}
