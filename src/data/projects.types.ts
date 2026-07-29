export type ProjectLinkKind = 'figma' | 'prototype' | 'pdf' | 'github' | 'live'

export interface ProjectLink {
  kind: ProjectLinkKind
  url: string
  label?: string
}

export interface ProjectImage {
  /** null renders an ImagePlaceholder instead of a real <img>. */
  src: string | null
  alt: string
  tone?: 'sage' | 'clay' | 'ink' | 'neutral'
}

export type ContentBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string; level?: 2 | 3 }
  | { kind: 'image'; image: ProjectImage; caption?: string; bleed?: boolean }
  | { kind: 'imageGrid'; images: ProjectImage[] }
  | { kind: 'statGrid'; stats: { value: string; label: string }[] }
  | { kind: 'quote'; text: string; attribution?: string }
  | { kind: 'list'; items: string[] }

export type CaseStudySectionType =
  | 'overview'
  | 'challenge'
  | 'research'
  | 'insights'
  | 'process'
  | 'iterations'
  | 'finalDesign'
  | 'reflection'
  | 'behindTheDesign'

export interface CaseStudySection {
  type: CaseStudySectionType
  heading: string
  blocks: ContentBlock[]
}

export interface CaseStudyMeta {
  role?: string
  timeline?: string
  team?: string
  tools?: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  tags: string[]
  coverImage: ProjectImage
  year: string
  isConfidential: boolean
  isFeatured?: boolean
  links: ProjectLink[]
  meta?: CaseStudyMeta
  /** Empty when isConfidential is true — ConfidentialNotice renders instead. */
  sections: CaseStudySection[]
  confidentialNote?: string
}
