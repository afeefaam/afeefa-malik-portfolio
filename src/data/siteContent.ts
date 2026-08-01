// PLACEHOLDER CONTENT — everything in this file is realistic example copy,
// not final. Replace with Afeefa's real bio, experience, and contact details.

import type { ProjectImage } from './projects.types'

export const person = {
  name: 'Afeefa Malik',
  role: 'UX Designer & Computer Science Student',
  email: 'afeefam.am@gmail.com', // PLACEHOLDER
}

// Portrait shown in the About section. Swap `src: null` for a real photo
// (e.g. import photo from '../assets/images/portrait.jpg') when ready.
export const portrait: ProjectImage = {
  src: null,
  alt: `Portrait of ${person.name}`,
  tone: 'lavender',
}

export const hero = {
  eyebrow: 'UX Designer · CS Student',
  greeting: "Hi, I'm Afeefa.",
  // Cycled by the typewriter on the second headline line. Kept short and
  // parallel in structure — each one stands alone as "Hi, I'm Afeefa. ___."
  roles: [
    'UX Designer.',
    'Computer Science Student.',
    'Frontend Developer.',
    'Community Builder.',
    'Hackathon Enthusiast.',
  ],
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

// Second visual beat in About — a small photo/moment placeholder alongside
// the hackathon story. Swap `src: null` for a real photo when ready.
export const hackathonImage: ProjectImage = {
  src: null,
  alt: 'PLACEHOLDER — replace with a real photo from a hackathon',
  tone: 'clay',
}

export const about = {
  eyebrow: 'About',
  title: "Hi, I'm Afeefa.",
  intro:
    "I'm a computer science student with a UX design minor — currently interning, always curious, and a little too invested in whether a button actually looks clickable.",

  journey: {
    heading: 'How I got here',
    paragraph:
      "I didn't set out to become a designer. I started as a computer science student, writing code and mostly thinking about whether things worked. Somewhere around a particularly confusing error message, I started asking a different question — not just does this work, but does this make sense to the person using it?\n\nThat question turned into a UX minor, then an internship, then a habit I can't really turn off: noticing the small friction points in everyday apps and wondering how they could feel one decision simpler.",
  },

  pullQuote: 'Not just does this work — does this make sense to the person using it?',

  excites: {
    heading: 'What actually gets me excited',
    paragraph:
      "I like sitting at the overlap of technical and human. I want to know why something is hard to build, not just that it is — the best answer to a design problem usually lives somewhere between what's easy to design and what's actually possible to ship.\n\nAnd I'll admit it: I notice things most people don't. The form field that explains itself without a tooltip. The button that feels clickable versus the one that just technically is one. I think about that stuff more than is probably normal.",
  },

  hackathons: {
    heading: 'Built under pressure',
    paragraph:
      "Some of my favorite work has come out of 24 hours, not 24 weeks. I love hackathons — messy problems, a team of near-strangers, and a deadline that doesn't care how attached you are to your first idea. Setlist, one of the case studies on this site, came out of exactly that.",
  },

  community: {
    heading: 'Organizing, always',
    paragraph:
      "Outside of coursework, I spend a lot of time organizing — events, initiatives, the unglamorous logistics that make a community actually run. It's closer to UX than people expect: most of it is anticipating what people need before they have to ask.",
  },

  currentlyLearning: [
    'How to defend a design decision in a room full of engineers, without caving immediately or digging in for no reason',
    'When "good enough" is actually the right call, not a compromise',
    'How far a design system can bend before it breaks',
  ],

  funFacts: [
    'Reads interface copy out loud before shipping it',
    'Has pulled an all-nighter for a hackathon and would absolutely do it again',
    'Keeps a running list of the calmest, most "figured-out" feeling apps on her phone',
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
