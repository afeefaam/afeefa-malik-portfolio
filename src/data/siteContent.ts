// Afeefa's real bio, experience, and contact details.

import type { ProjectImage } from './projects.types'
import aboutMePhoto from '../assets/images/about-me.jpeg'
import caseHacksPhoto from '../assets/images/casehacks.jpg'
import bobaPhoto from '../assets/images/boba.jpg'

// Scrapbook folder gallery photos (About Me). The gallery only ever shows
// these around ~350px wide, so the five that came in at near-original
// camera resolution (up to 3840x5120, several MB each) have a "-web" copy
// downsized to fit within 1400px — sharp enough for any real display size,
// a fraction of the transfer weight. See scripts/resize-oversized.mjs.
// Originals are left in place, just no longer imported.
import matchaPhoto from '../assets/images/Matcha.jpeg'
import turkeyPhoto from '../assets/images/turkey-web.jpeg'
import vancouverPhoto from '../assets/images/vancouver.jpeg'
import signageBusinessPhoto from '../assets/images/signage buisiness.jpeg'
import skiPhoto from '../assets/images/ski-web.jpeg'
import moviesPhoto from '../assets/images/movies-web.jpeg'
import strawberryPickingPhoto from '../assets/images/strawberry picking w fam.jpeg'
import grandIftarPhoto from '../assets/images/grand iftar.jpeg'
import ramadanWithinPhoto from '../assets/images/ramadan-within-web.jpeg'
import hackthe6ixPhoto from '../assets/images/hackthe6ix-web.jpeg'

export const person = {
  name: 'Afeefa Malik',
  role: 'UX Designer & Computer Science Student',
  email: 'afeefam.am@gmail.com', // PLACEHOLDER
}

// Portrait shown in the center of the About Me folder collage.
export const portrait: ProjectImage = {
  src: aboutMePhoto,
  alt: `${person.name} smiling by the water in Vancouver`,
  tone: 'lavender',
}

// Shot 1 — Establishing. Static, no rotating identity list: a cycling
// typewriter was audited out as a generic-portfolio tic that fought the
// quieter studio pacing. Name, role, and CS background are stated once,
// plainly, and are legible within five seconds without waiting on a loop.
export const hero = {
  eyebrow: 'UX Designer + Computer Science Student',
  greeting: "Hi, I'm Afeefa Malik.",
  subhead:
    "I like making things easier to use. That's it, really. Whether it's an app, a website, or something built in a weekend with friends, I'm chasing the same feeling: when something just works and you don't even notice why.",
}

// Homepage "Skills / Tools / Social" block. Tool keys map to marks in
// components/home/icons.tsx. Each skill is one category bullet ("Research:
// interviews, heuristic evaluations, usability testing.") rather than a
// flat list of individual skill tags.
export const skills = [
  { category: 'Research', items: 'interviews, heuristic evaluations, usability testing.' },
  { category: 'Design', items: 'wireframing, prototyping, interaction design.' },
  { category: 'Accessibility', items: 'WCAG auditing, contrast, inclusive design.' },
]

export const tools: string[] = [
  'figma',
  'illustrator',
  'canva',
  'xd',
  'premiere',
  'indesign',
  'photoshop',
]

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
    { label: 'Current obsession', value: 'Cute cafés with strawberry matcha 🍓🍵' },
    { label: 'Always say yes to', value: 'A hackathon, a new café, or an excuse to organize something' },
    { label: 'Coffee chat topics', value: 'Design, hackathons, community building, or good boba recommendations' },
    { label: 'Weekend plans', value: 'Probably at an event I agreed to two weeks ago' },
    { label: 'Currently learning', value: 'How to defend a design decision in a room full of engineers' },
    { label: 'Favorite boba order', value: 'Gong Cha Mango Splash with pearls 🧋' },
  ],
}

// Scrapbook folder galleries — About Me's clickable folders. Keys match
// AboutMe's FOLDERS list. Omitting `src` renders a soft placeholder slide
// until real photos exist for that category.
export interface ScrapbookImage {
  src?: string
  alt: string
  caption: string
  /** CSS object-position for the object-cover crop, e.g. "center", "20%
   *  center", "top center". Defaults to "center" when omitted — set this
   *  per-image whenever the subject sits off-center so a fill crop doesn't
   *  cut off the focal point. */
  objectPosition?: string
}

export interface ScrapbookFolder {
  /** Short display title shown at the top of the gallery popup, e.g. "Drink". */
  title: string
  images: ScrapbookImage[]
}

export const scrapbookFolders: Record<string, ScrapbookFolder> = {
  'Fav drinks': {
    title: 'Drink',
    images: [
      {
        src: bobaPhoto,
        alt: 'Afeefa holding a Gong Cha mango splash boba drink with pearls',
        caption: 'Gong Cha mango splash with pearls',
        objectPosition: 'center 30%',
      },
      {
        src: matchaPhoto,
        alt: 'An iced strawberry matcha drink',
        caption: 'Currently into strawberry matcha',
        // Wide venue shot with zero vertical crop room (image is wider than
        // the frame, so the full height always shows) — centering
        // horizontally is what keeps her and the drink the clear focal point.
        objectPosition: '50% 35%',
      },
    ],
  },
  activities: {
    title: 'Activities',
    images: [
      { src: signageBusinessPhoto, alt: 'A custom sign made for a small side business', caption: 'A little side business moment' },
      { src: skiPhoto, alt: 'Afeefa in ski gear overlooking a lit-up ski hill at night', caption: 'Trying to survive the slopes 🎿' },
      { src: moviesPhoto, alt: 'An in-flight entertainment screen playing a movie', caption: 'Movies in the air' },
      {
        src: strawberryPickingPhoto,
        alt: 'Holding a basket of freshly picked strawberries in a field',
        caption: 'Strawberry picking with the fam',
        objectPosition: 'center 65%',
      },
    ],
  },
  travel: {
    title: 'Travel',
    images: [
      { src: turkeyPhoto, alt: 'A lantern-lit restaurant street in Türkiye at dusk', caption: 'Türkiye 🇹🇷' },
      { src: vancouverPhoto, alt: 'Overlooking forested mountains near Vancouver', caption: 'Vancouver adventures', objectPosition: 'center 60%' },
    ],
  },
  community: {
    title: 'Community',
    images: [
      {
        src: grandIftarPhoto,
        alt: 'Guests gathered at a Grand Iftar community dinner',
        caption: 'Community, connection, and iftar',
        // Wide banquet-hall shot — keep the stage screen and podium in frame
        // rather than the balloon decor at the far edges.
        objectPosition: '35% center',
      },
      {
        src: ramadanWithinPhoto,
        alt: 'Behind the scenes filming the Ramadan Within project',
        caption: 'Ramadan Within',
        // Tall shot — the crew, camera, and light stand sit in the lower
        // two-thirds, well below a mostly-empty ceiling. Push the crop
        // down (a high y%) so that midground fills the frame instead.
        objectPosition: '50% 75%',
      },
    ],
  },
  hackathons: {
    title: 'Hackathons',
    images: [
      {
        src: caseHacksPhoto,
        alt: 'Afeefa presenting on stage as a CaseHacks finalist',
        caption: 'Presenting at CaseHacks as a finalist',
        // She stands left-of-center, under the gold "CH" balloons.
        objectPosition: '30% center',
      },
      { src: hackthe6ixPhoto, alt: 'Opening ceremony welcome screen at Hack the 6ix', caption: 'Hack the 6ix opening ceremony' },
    ],
  },
}

export interface ExperienceEntry {
  role: string
  org: string
  period: string
  description: string
  /** Tool keys — map to marks in components/home/icons.tsx */
  skillsUsed: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Web Design Student',
    org: 'BlackBerry Ltd.',
    period: 'May 2026 – Aug 2026',
    description:
      'Led UX and accessibility work across BlackBerry web experiences, including a 10-week heuristic evaluation, stakeholder research, component recommendations, and an automated Storyblok audit across 1,300+ pages.',
    skillsUsed: ['figma', 'illustrator', 'xd'],
  },
  {
    role: 'UX Research & Design Support',
    org: 'MSR Information Systems Ltd',
    period: 'May 2023 – May 2025',
    description:
      'Conducted UX research and redesigned internal documentation and workflows, translating technical requirements into clearer, more accessible experiences for cross-functional teams.',
    skillsUsed: ['figma', 'word'],
  },
]

export const contact = {
  eyebrow: 'Contact',
  title: "Let's Connect.",
  subhead:
    "I'm open to internships, junior design roles, and collaborations. If something here stuck with you, feel free to reach out!",
  replyTime: 'Usually replies within a day or two',
}

export interface SocialLink {
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/afeefamalik' },
  { label: 'Behance', href: 'https://www.behance.net/afeefamalik' },
  { label: 'GitHub', href: 'https://github.com/afeefaam' },
  { label: 'Resume', href: 'https://drive.google.com/file/d/1Q0eInFTyBjdOsowdtf_6iGy5pUDFAH3Z/view?usp=sharing' },
]

/**
 * A secondary, external Canva portfolio (marketing/visual/event-branding
 * work) — kept out of `homeCaseStudies` on purpose so it never renders as
 * a UX case study; MarketingPortfolioCard is its own, visibly-external
 * card instead.
 */
export const marketingPortfolio = {
  title: 'Marketing Portfolio',
  description:
    'A collection of social campaigns, event branding, visual design, and marketing work.',
  cta: 'View Marketing Portfolio',
  href: 'https://www.canva.com/design/DAGxRuRSs4w/3DMRkYfvDd8Hf6waOP1Hcg/view?utm_content=DAGxRuRSs4w&utm_campaign=designshare&utm_medium=link&utm_source=viewer',
}
