// Afeefa's real bio, experience, and contact details.

import type { ProjectImage } from './projects.types'
import karamiaPhoto from '../assets/images/karamia.jpg'
import caseHacksPhoto from '../assets/images/casehacks.jpg'
import bobaPhoto from '../assets/images/boba.jpg'
import setlistCoverPhoto from '../assets/images/setlist-cover.jpg'
import setlistUiPhoto from '../assets/images/setlist-ui.jpg'

export const person = {
  name: 'Afeefa Malik',
  role: 'UX Designer & Computer Science Student',
  email: 'afeefam.am@gmail.com', // PLACEHOLDER
}

// Portrait shown in the About section.
export const portrait: ProjectImage = {
  src: karamiaPhoto,
  alt: `Portrait of ${person.name}`,
  tone: 'lavender',
}

export const hero = {
  eyebrow: 'UX Designer & Computer Science Student',
  greeting: "Hi, I'm Afeefa.",
  // Cycled by the typewriter on the second headline line. Kept short and
  // parallel in structure — each one stands alone as "Hi, I'm Afeefa. ___."
  roles: [
    'UX Designer.',
    'Community Builder.',
    'Computer Science Student.',
    'Creative Problem Solver.',
    'Always Learning.',
  ],
  subhead:
    "I've always loved building things. Whether it's a digital product, a community, or an event, I'm happiest creating experiences that bring people together and make life a little easier.",
  primaryCta: { label: 'Selected work', href: '#work' },
  secondaryCta: { label: 'About me', href: '#about' },
}

// Hero's layered device mockups. `browser` fills a landscape browser-window
// frame, `phone` fills a portrait phone frame.
export const heroVisual: { browser: ProjectImage; phone: ProjectImage } = {
  browser: { src: setlistCoverPhoto, alt: 'Setlist app preview', tone: 'lavender' },
  phone: { src: setlistUiPhoto, alt: 'Setlist app song-voting screen', tone: 'sage' },
}

// About-page photo moments — small, editorial, not full-bleed.
export const caseHacksImage: ProjectImage = {
  src: caseHacksPhoto,
  alt: 'Presenting at the CaseHacks Finals',
  tone: 'lavender',
}

export const bobaImage: ProjectImage = {
  src: bobaPhoto,
  alt: 'Holding a boba',
  tone: 'clay',
}

export const about = {
  eyebrow: 'About',
  title: "Hi, I'm Afeefa.",
  intro:
    "I'm a computer science student with a UX design minor, though that's the boring way to put it. I say yes before I feel ready, I'm probably holding a boba right now, and I've organized more events than I can count.",

  origin: {
    heading: 'How I accidentally found UX',
    paragraph:
      "I started in computer science, mostly caring about whether things worked. Somewhere along the way, I noticed I cared just as much about how they felt to use. That noticing became a UX minor before I'd fully decided to let it.",
  },

  pullQuote: 'I cared just as much about how something felt to use as whether it worked.',

  community: {
    heading: 'Why community matters to me',
    paragraph:
      "Outside class, I'm usually organizing something: a volunteer initiative, a student event, a hackathon team that came together 48 hours before a deadline. I like bringing people into a room and seeing what happens. I even ended up presenting at the CaseHacks Finals, which still feels a little surreal to say.",
  },

  caseHacksCaption: 'Presenting at the CaseHacks Finals.',

  outside: {
    heading: 'Outside of design',
    paragraph:
      "If you know me in real life, there's a good chance I'm holding a boba. I'm always chasing a new café, saying yes before checking my schedule, and finding a reason to meet someone new.",
  },

  bobaCaption: 'Trying yet another boba place.',

  rightNow: [
    { label: 'Current obsession', value: "Whatever boba place I haven't tried yet" },
    { label: 'Always say yes to', value: 'A hackathon, a new café, or an excuse to organize something' },
    { label: 'Coffee chat topics', value: 'Design, hackathons, or good boba recs' },
    { label: 'Weekend plans', value: 'Probably an event I said yes to two weeks ago' },
    { label: 'Currently learning', value: 'How to defend a design decision in a room full of engineers' },
    { label: 'Favorite boba order', value: 'Brown sugar oat milk, less ice' },
  ],
}

export interface ExperienceEntry {
  role: string
  org: string
  period: string
  description: string
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Web Design Student',
    org: 'BlackBerry',
    period: 'May 2026 – Aug 2026',
    description:
      'Conducted heuristic evaluations and accessibility audits for enterprise products, redesigned internal documentation in Figma, and created production-ready visual assets. Collaborated with cross-functional teams to improve usability, consistency, and the overall user experience.',
  },
  {
    role: 'Graphic Designer & UX Designer (Volunteer)',
    org: 'Markaz',
    period: 'Oct 2025 – Mar 2026',
    description:
      'Designed the pre-launch user experience and visual identity for a community platform. Created UI designs, reusable components, and branding assets while collaborating closely with developers to refine the product before launch.',
  },
  {
    role: 'UX Research & Design Support',
    org: 'MSR Information Systems',
    period: 'May 2023 – May 2025',
    description:
      'Conducted UX research, improved information architecture, and redesigned technical documentation to simplify complex workflows. Worked with cross-functional teams to make systems and information more intuitive and accessible.',
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

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/afeefamalik' },
  { label: 'GitHub', href: 'https://github.com/afeefaam' },
  { label: 'Resume', href: 'https://drive.google.com/file/d/1Q0eInFTyBjdOsowdtf_6iGy5pUDFAH3Z/view?usp=sharing' },
]
