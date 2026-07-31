import type { Project } from './projects.types'

// PLACEHOLDER PROJECTS — realistic example content standing in for Afeefa's
// real case studies. Each project is a self-contained object in this array;
// add, remove, or reorder freely. Replace copy, links, and coverImage.src
// (currently null, which renders a soft placeholder) with real material.

export const projects: Project[] = [
  {
    id: 'wayfind',
    slug: 'wayfind',
    title: 'Wayfind',
    tagline: 'Helping new students navigate a sprawling campus without feeling lost on day one.',
    tags: ['Product Design', 'Mobile App'],
    coverImage: { src: null, alt: 'Wayfind campus navigation app cover', tone: 'sage' },
    year: '2025',
    isConfidential: false,
    isFeatured: true,
    links: [
      { kind: 'figma', url: '#' },
      { kind: 'prototype', url: '#' },
    ],
    meta: {
      role: 'Product Designer (solo)',
      timeline: '8 weeks',
      tools: ['Figma', 'Maze', 'Notion'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Wayfind is a wayfinding app designed for first-year students navigating a large, unevenly signed campus. It combines indoor and outdoor directions with the small, human details students actually ask about — the nearest working water fountain, which entrance is quietest between classes.',
          },
          {
            kind: 'statGrid',
            stats: [
              { value: '86%', label: 'of test users found their room faster than with maps alone' },
              { value: '12', label: 'campus buildings mapped in the pilot' },
              { value: '4.6', label: 'average usability score out of 5' },
            ],
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: "Existing campus maps were static PDFs — accurate, but useless mid-walk. New students, especially transfers and international students, described the first two weeks of a semester as quietly stressful: showing up early to every class just to have time to get lost.",
          },
        ],
      },
      {
        type: 'research',
        heading: 'Research',
        blocks: [
          {
            kind: 'paragraph',
            text: 'I interviewed 11 first-year and transfer students and shadowed three of them walking to a class they had never been to. The friction wasn’t reading a map — it was translating a 2D map into a decision at a real intersection or unmarked stairwell.',
          },
          {
            kind: 'list',
            items: [
              'Students trusted peers’ directions more than signage',
              'Indoor wayfinding broke down at multi-entrance buildings',
              'Anxiety peaked in the 10 minutes before an unfamiliar class, not during general exploration',
            ],
          },
        ],
      },
      {
        type: 'insights',
        heading: 'Insights',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The real product wasn’t "a map" — it was a countdown-aware companion that could say, calmly, "you have 6 minutes, go through the east door." Reframing the problem from navigation to reassurance changed almost every subsequent design decision.',
          },
        ],
      },
      {
        type: 'process',
        heading: 'Design Process',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Early wireframes tried to show too much at once — full building layouts, every possible route. I stripped the default view down to one instruction at a time, with the full map available but never required.',
          },
          { kind: 'imageGrid', images: [
            { src: null, alt: 'Low-fidelity wireframes exploring route instruction density', tone: 'neutral' },
            { src: null, alt: 'Mid-fidelity screens testing single-instruction navigation', tone: 'clay' },
          ] },
        ],
      },
      {
        type: 'finalDesign',
        heading: 'Final Design',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The shipped design leads with a single next step, a live countdown to class, and a gentle "you’re on track" confirmation rather than a constant stream of turn-by-turn detail.',
          },
          { kind: 'image', image: { src: null, alt: 'Final Wayfind route screen showing a single next instruction', tone: 'sage' }, bleed: true },
        ],
      },
      {
        type: 'reflection',
        heading: 'Reflection',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This project taught me to distrust my first framing of a problem. "Students need a better map" was true and almost entirely beside the point — what they needed was less to think about, not more information.',
          },
        ],
      },
    ],
  },
  {
    id: 'ledger',
    slug: 'ledger',
    title: 'Ledger',
    tagline: 'A budgeting app that treats irregular student income as the normal case, not the edge case.',
    tags: ['UX Research', 'FinTech'],
    coverImage: { src: null, alt: 'Ledger student budgeting app cover', tone: 'clay' },
    year: '2024',
    isConfidential: false,
    isFeatured: true,
    links: [
      { kind: 'prototype', url: '#' },
      { kind: 'pdf', url: '#', label: 'Read the case study' },
    ],
    meta: {
      role: 'UX Designer',
      timeline: '10 weeks',
      team: 'Design partner + 1 engineer',
      tools: ['Figma', 'UserTesting', 'Airtable'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Most budgeting apps assume a steady paycheck. Ledger was designed around the reality of student income — part-time shifts, financial aid disbursements, the occasional freelance gig — and what "on track" looks like when your income doesn’t look like a line.',
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: 'In generic budgeting apps, students consistently saw red — overspent categories, broken streaks — despite behaving responsibly for their actual income pattern. The tools were making people feel worse at exactly the moment they needed help.',
          },
        ],
      },
      {
        type: 'research',
        heading: 'Research',
        blocks: [
          {
            kind: 'paragraph',
            text: 'A survey of 40 students plus 6 follow-up interviews mapped out how income actually arrived: financial aid in two lump sums, work-study paid biweekly, occasional gig income with no schedule at all.',
          },
        ],
      },
      {
        type: 'insights',
        heading: 'Insights',
        blocks: [
          {
            kind: 'quote',
            text: 'I don’t need an app to tell me I’m bad at budgeting. I need it to tell me if I’m okay right now.',
            attribution: 'Research participant, junior year',
          },
          {
            kind: 'paragraph',
            text: 'The core reframe: replace monthly budgets with a rolling "runway" — how many days until your balance would hit zero at current spending — which matches how students already think about money.',
          },
        ],
      },
      {
        type: 'iterations',
        heading: 'Iterations',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The first runway visualization used a strict line chart, which tested as anxiety-inducing on its own. Softening it into a rounded, color-graduated band — never a hard red line — kept the same information without the alarm-bell feeling.',
          },
        ],
      },
      {
        type: 'finalDesign',
        heading: 'Final Design',
        blocks: [
          {
            kind: 'image',
            image: { src: null, alt: 'Ledger runway view showing days of spending buffer remaining', tone: 'clay' },
            bleed: true,
          },
        ],
      },
      {
        type: 'reflection',
        heading: 'Reflection',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Ledger is the project that made "tone" feel like a design decision to me, not a copywriting afterthought — the same data, presented calmly instead of urgently, changed how people actually used the product.',
          },
        ],
      },
    ],
  },
  {
    id: 'clarity-audit',
    slug: 'clarity-audit',
    title: 'Clarity',
    tagline: 'An accessibility audit and component rebuild for a university course-registration portal.',
    tags: ['Accessibility', 'Design Systems'],
    coverImage: { src: null, alt: 'Clarity accessibility audit cover', tone: 'ink' },
    year: '2024',
    isConfidential: false,
    links: [{ kind: 'pdf', url: '#', label: 'Read the audit' }],
    meta: {
      role: 'UX Researcher & Designer',
      timeline: '5 weeks',
      tools: ['Figma', 'axe DevTools', 'NVDA'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'A WCAG 2.1 AA audit of my university’s course-registration portal, paired with rebuilt components for the six most broken patterns — turned into a proposal the registrar’s office could actually act on.',
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Registration week is high-stakes and time-boxed. For screen reader and keyboard-only users, it was close to unusable: unlabeled form controls, focus traps in the course-search modal, and color-only status indicators for seat availability.',
          },
        ],
      },
      {
        type: 'research',
        heading: 'Research',
        blocks: [
          {
            kind: 'paragraph',
            text: 'I ran the portal through automated tooling, then a manual keyboard-only and screen-reader pass, then a short session with a student who uses NVDA daily to register.',
          },
          {
            kind: 'list',
            items: [
              '23 distinct WCAG failures logged and severity-ranked',
              'Course-search modal had no visible focus indicator at all',
              'Seat availability shown only as a green or red dot',
            ],
          },
        ],
      },
      {
        type: 'finalDesign',
        heading: 'Final Design',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Rebuilt six core components — search modal, seat-availability badge, course card, filter panel, pagination, and the registration confirmation flow — each shipped with both a Figma spec and annotated ARIA behavior.',
          },
          {
            kind: 'compare',
            before: { src: null, alt: 'Original seat-availability indicator shown only as a colored dot', tone: 'ink' },
            after: { src: null, alt: 'Rebuilt seat-availability badge with an icon, text label, and seat count', tone: 'sage' },
          },
          {
            kind: 'image',
            image: { src: null, alt: 'Rebuilt course-search modal with a visible focus ring', tone: 'neutral' },
            caption: 'The rebuilt course-search modal, now with a visible focus ring and proper labeling.',
          },
        ],
      },
      {
        type: 'reflection',
        heading: 'Reflection',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This was the project that made accessibility feel like a design skill rather than a compliance checklist — most of the fixes were also, simply, better design.',
          },
        ],
      },
    ],
  },
  {
    id: 'internal-tools',
    slug: 'internal-tools',
    title: 'Internal Tools Redesign',
    tagline: 'A confidential internship project redesigning an internal operations dashboard.',
    tags: ['Product Design', 'B2B'],
    coverImage: { src: null, alt: 'Confidential internal tools project cover', tone: 'neutral' },
    year: '2025',
    isConfidential: true,
    confidentialNote:
      'This project was completed during an internship under an NDA. Details, screens, and outcomes are withheld out of respect for the company’s confidentiality — happy to speak to the process and my role directly in conversation.',
    links: [],
    meta: {
      role: 'UX Design Intern',
      timeline: 'Summer 2025',
    },
    sections: [],
  },
  {
    id: 'devkit',
    slug: 'devkit',
    title: 'DevKit',
    tagline: 'An open-source, accessible component library built to bridge how designers and engineers talk about UI.',
    tags: ['Design Systems', 'Open Source'],
    coverImage: { src: null, alt: 'DevKit component library cover', tone: 'sage' },
    year: '2023',
    isConfidential: false,
    links: [
      { kind: 'github', url: '#' },
      { kind: 'live', url: '#' },
    ],
    meta: {
      role: 'Designer & Developer',
      timeline: 'Ongoing side project',
      tools: ['Figma', 'React', 'Storybook'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'DevKit is a small, accessible React component library I design and build myself — an attempt to close the gap between a Figma file and the component someone actually has to implement.',
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: 'On group projects, I kept seeing the same failure mode: a beautiful design file that quietly assumed states — loading, error, empty, disabled — that no one had actually designed. The handoff gap wasn’t a communication problem, it was a missing-artifact problem.',
          },
        ],
      },
      {
        type: 'process',
        heading: 'Design Process',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Every component in DevKit is designed and built state-first: default, hover, focus, disabled, loading, and error are designed together before a single pixel of the "happy path" is polished.',
          },
        ],
      },
      {
        type: 'behindTheDesign',
        heading: 'Behind the Design',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Being the designer and the engineer on the same component removed a debate I used to have often: "is this a design decision or an engineering constraint?" Usually, it turned out to be both, and neither of us was wrong.',
          },
        ],
      },
      {
        type: 'reflection',
        heading: 'Reflection',
        blocks: [
          {
            kind: 'paragraph',
            text: 'DevKit is unglamorous, ongoing, and probably my most honest portfolio piece — it’s the project I keep returning to whenever I want to test whether a design idea actually survives implementation.',
          },
        ],
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
