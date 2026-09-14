import type { ReactNode } from 'react'
import {
  CanvaMark,
  FigmaMark,
  FireflyMark,
  IllustratorMark,
  InDesignMark,
  type MarkProps,
  PhotoshopMark,
  PremiereMark,
  WordMark,
} from './icons'

/** Tool key → icon mark. Keys are used in siteContent (tools, skillsUsed).
 * The `xd` key predates this asset pass and now renders the Adobe Firefly
 * mark (the site never used Adobe XD; no XD asset was ever supplied). */
export const TOOL_MARKS: Record<string, (props: MarkProps) => ReactNode> = {
  figma: FigmaMark,
  illustrator: IllustratorMark,
  canva: CanvaMark,
  xd: FireflyMark,
  premiere: PremiereMark,
  indesign: InDesignMark,
  photoshop: PhotoshopMark,
  word: WordMark,
}
