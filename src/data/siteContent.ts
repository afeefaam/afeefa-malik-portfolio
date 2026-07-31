// PLACEHOLDER CONTENT — everything in this file is realistic example copy,
// not final. Replace with Afeefa's real bio, experience, and contact details.

import type { ProjectImage } from './projects.types'

export const person = {
  name: 'Afeefa Malik',
  role: 'UX Designer & Computer Science Student',
  email: 'afeefam.am@gmail.com', // PLACEHOLDER
}

export const hero = {
  eyebrow: 'UX Designer · CS Student',
  headline: 'Designing digital experiences that make complexity feel effortless.',
  subhead:
    "I study computer science and design interfaces — trying to find the quiet, obvious solution underneath a complicated problem, then build it well enough that no one notices the work it took.",
  primaryCta: { label: 'Selected work', href: '#work' },
  secondaryCta: { label: 'About me', href: '#about' },
}

// Hero's layered device mockups. Swap `src: null` for a real screenshot path
// (e.g. import shot from '../assets/images/wayfind-browser.png') once you
// have one; leaving it null keeps the soft placeholder treatment. `browser`
// fills a landscape browser-window frame, `phone` fills a portrait phone frame.
export const heroVisual: { browser: ProjectImage; phone: ProjectImage } = {
  browser: { src: null, alt: 'Browser preview of a recent case study', tone: 'lavender' },
  phone: { src: null, alt: 'Mobile screen preview of an earlier project', tone: 'sage' },
}

export const about = {
  eyebrow: 'About',
  title: 'Design is how I think out loud.',
  paragraphs: [
    // PLACEHOLDER — replace with Afeefa's real story
    "I came to design sideways — through code first. Learning how software actually gets built changed how I look at every interface: not as a picture, but as a series of decisions someone had to make under constraints.",
    'That mix is still how I work. I sketch and prototype like a designer, but I read a system closely enough to know what a "simple" change actually costs — which makes the case for restraint a lot easier to argue for.',
  ],
  values: [
    {
      title: 'Clarity over cleverness',
      description: 'If a user has to think twice, the design has more work to do — not the user.',
    },
    {
      title: 'Close the loop',
      description: 'Research, design, and code are one conversation. I try to stay fluent in all three.',
    },
    {
      title: 'Small, honest details',
      description: 'The parts no one asked for are usually the parts people remember.',
    },
  ],
  funFacts: [
    'Currently learning how far a design system can bend before it breaks',
    'Reads interface copy out loud before shipping it',
    'Keeps a running list of the calmest apps on her phone',
  ],
}

export interface ExperienceEntry {
  role: string
  org: string
  period: string
  description: string
}

// PLACEHOLDER — replace with real roles/internships/coursework
export const experience: ExperienceEntry[] = [
  {
    role: 'Web Design Student',
    org: 'BlackBerry',
    period: 'May2026 — Aug 2026',
    description: 'Designing end-to-end flows for a small product team, from research through shipped UI.',
  },
  {
    role: 'Teaching Assistant, Human-Computer Interaction',
    org: 'University Name',
    period: '2024 — 2025',
    description: 'Ran design critiques for a 60-student course, grading for both usability reasoning and craft.',
  },
  {
    role: 'Freelance UX Designer',
    org: 'Self-directed',
    period: '2023 — 2024',
    description: 'Took on small case-study projects to learn the full arc of a design process, start to finish.',
  },
]

export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something worth using.",
  subhead:
    "I'm open to internships, junior design roles, and collaborations. If something here resonates, I'd like to hear from you.",
  replyTime: 'Usually replies within a day or two',
}

export interface SocialLink {
  label: string
  href: string
}

// PLACEHOLDER — replace # with real profile URLs
export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Read.cv', href: '#' },
]
