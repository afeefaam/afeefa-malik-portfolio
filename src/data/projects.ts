import type { Project } from './projects.types'
import closeTheCurtainCover from '../assets/images/close-the-curtain-cover.jpg'
import setlistCover from '../assets/images/setlist-cover.jpg'
import lorisRedesignCover from '../assets/images/loris-redesign-cover.jpg'
import markazCover from '../assets/images/markaz-cover.jpg'

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
    // Held back temporarily — flip to true (or remove this line) to bring
    // it back. Route/content stay intact; this just hides it from the
    // public grid, featured pick, and next-project cycling.
    isPublished: false,
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
            text: 'Wayfind is a wayfinding app designed for first-year students navigating a large, unevenly signed campus. It combines indoor and outdoor directions with the small, human details students actually ask about: the nearest working water fountain, which entrance is quietest between classes.',
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
            text: "Existing campus maps were static PDFs. Accurate, but useless mid-walk. New students, especially transfers and international students, described the first two weeks of a semester as quietly stressful: showing up early to every class just to have time to get lost.",
          },
        ],
      },
      {
        type: 'research',
        heading: 'Research',
        blocks: [
          {
            kind: 'paragraph',
            text: 'I interviewed 11 first-year and transfer students and shadowed three of them walking to a class they had never been to. The friction wasn’t reading a map. It was translating a 2D map into a decision at a real intersection or unmarked stairwell.',
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
            text: 'The real product wasn’t "a map." It was a countdown-aware companion that could say, calmly, "you have 6 minutes, go through the east door." Reframing the problem from navigation to reassurance changed almost every subsequent design decision.',
          },
        ],
      },
      {
        type: 'process',
        heading: 'Design Process',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Early wireframes tried to show too much at once: full building layouts, every possible route. I stripped the default view down to one instruction at a time, with the full map available but never required.',
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
            text: 'This project taught me to distrust my first framing of a problem. "Students need a better map" was true and almost entirely beside the point. What they needed was less to think about, not more information.',
          },
        ],
      },
    ],
  },
  {
    id: 'markaz',
    slug: 'markaz',
    title: 'Markaz',
    tagline: 'Designing a pre-launch countdown experience that introduces Markaz and builds excitement before launch.',
    tags: ['UI Design', 'Landing Experience'],
    coverImage: {
      src: markazCover,
      alt: 'Markaz countdown landing page cover',
      tone: 'lavender',
    },
    year: '2025',
    isConfidential: false,
    links: [{ kind: 'figma', url: '#' }],
    meta: {
      role: 'UI Designer',
      timeline: 'December 2025',
      team: 'Markaz',
      tools: ['Figma'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Markaz is a platform for discovering community spaces, events, and opportunities: the kind of connection that’s hard to find just by searching. Before it could launch, it needed a public face, something that could explain what Markaz was, make it feel real, and convince a stranger to leave their email for a product that didn’t exist yet.',
          },
          {
            kind: 'paragraph',
            text: 'I designed that face: a countdown landing experience that introduces Markaz’s visual identity and builds anticipation ahead of launch.',
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: 'As a brand-new platform, Markaz had no public presence and no name recognition to lean on. Whoever landed on this page needed to understand what Markaz was within seconds, and feel enough trust to hand over their email before there was a product to actually try.',
          },
          {
            kind: 'list',
            items: [
              'Communicate the platform clearly',
              'Establish trust with zero track record',
              'Create real anticipation before launch',
              'Convert that anticipation into waitlist signups, without feeling like a sales pitch',
            ],
          },
        ],
      },
      {
        // "Research" didn't fit a solo pre-launch UI project with no users
        // to interview yet, so this section covers what actually happened:
        // studying comparable launches instead of running formal research.
        type: 'research',
        heading: 'Inspiration & Exploration',
        blocks: [
          {
            kind: 'paragraph',
            text: 'With nothing to test yet and no users to interview, I started by looking outward. I studied how early-stage startups and community-focused products handle the same problem: selling a feeling before there’s a product behind it.',
          },
          {
            kind: 'list',
            items: [
              'Showing the product, even as a mockup, reads as more credible than describing it',
              'Minimal layouts feel faster and more trustworthy than busy ones',
              'A clear hierarchy does more for comprehension than clever copy',
              'One focused call-to-action converts better than several competing ones',
            ],
          },
        ],
      },
      {
        type: 'process',
        heading: 'Design Decisions',
        blocks: [
          { kind: 'paragraph', text: 'Three decisions shaped the final interface.' },
          { kind: 'heading', text: 'Communicating value immediately', level: 3 },
          {
            kind: 'paragraph',
            text: 'This was most visitors’ first interaction with Markaz, so the page had one job before anything else: explain itself, fast. Hierarchy, spacing, and message length were all tuned around a single clear focal point instead of trying to say everything at once.',
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with a real mockup of Markaz displayed on a mobile device',
              tone: 'clay',
            },
          },
          { kind: 'heading', text: 'Making the product feel tangible', level: 3 },
          {
            kind: 'paragraph',
            text: 'Displaying the interface inside a device mockup let visitors picture themselves actually using Markaz, rather than reading a description of it. It was a small decision that did a lot to make an unlaunched product feel credible.',
          },
          { kind: 'heading', text: 'Guiding attention toward the waitlist', level: 3 },
          {
            kind: 'paragraph',
            text: 'Typography, spacing, and contrast were used deliberately to lead the eye toward the waitlist form, without tipping the page into feeling like an ad.',
          },
        ],
      },
      {
        type: 'behindTheDesign',
        heading: 'My Role',
        blocks: [
          {
            kind: 'paragraph',
            text: 'I owned the UI design of the countdown experience end to end, from early concept through the final high-fidelity file in Figma.',
          },
          {
            kind: 'list',
            items: [
              'Defined the visual direction and hierarchy',
              'Built the high-fidelity interface in Figma',
              'Balanced clarity and personality so the page felt considered, not templated',
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
            text: 'The shipped design is a focused, single-purpose landing page: a clear introduction to Markaz, a device mockup that makes the product feel real, and one obvious next step. Join the waitlist.',
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with a real screenshot of the final Markaz countdown page',
              tone: 'lavender',
            },
            bleed: true,
          },
          {
            kind: 'paragraph',
            text: 'Even as a pre-launch concept, this page gave Markaz a real visual identity to launch with, and set a design direction the rest of the product can build on.',
          },
        ],
      },
      {
        type: 'reflection',
        heading: 'Reflection',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Designing a product before it existed meant I couldn’t lean on interactions or real functionality to build trust. I only had how the page looked and felt in the first few seconds. Instead of designing flows, I was designing anticipation.',
          },
          {
            kind: 'paragraph',
            text: 'This project sharpened something I keep coming back to: a strong first impression, built on hierarchy and restraint, can earn trust before a user ever clicks anything.',
          },
        ],
      },
    ],
  },
  {
    id: 'setlist',
    slug: 'setlist',
    title: 'Setlist',
    tagline: 'Reimagining the concert experience through real-time audience participation.',
    tags: ['UX Design', 'Mobile App'],
    coverImage: {
      src: setlistCover,
      alt: 'Setlist app screens showing the home dashboard with a live artist card for The Weeknd, live song voting, and the ticket wallet',
      tone: 'sage',
    },
    year: '2025',
    isConfidential: false,
    isFeatured: true,
    award: '🏆 Most Innovative Award',
    links: [
      { kind: 'pdf', url: '#', label: 'View Case Study' },
      { kind: 'behance', url: '#' },
    ],
    meta: {
      role: 'UX Designer',
      timeline: '24-Hour UX Design Sprint, February 2025',
      team: 'Team of 3, with Victoria Leliveld & Amrit Nannar',
      tools: ['Figma'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Setlist is a mobile app that makes concerts more interactive by letting fans vote for songs in real time. I built it with two teammates during a 24-hour UX Design Sprint hosted by UX Laurier and sponsored by STGC Technologies, exploring how technology could strengthen the bond between artists and audiences without pulling attention away from the performance itself.',
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Concertgoers often hope to hear a specific song, usually an old favorite, but have almost no way to influence what actually gets played. At the same time, artists generally discourage heavy phone use during a show because it pulls people out of the moment.',
          },
          {
            kind: 'list',
            items: [
              'Fans have no meaningful way to influence a performance',
              'Typical phone use pulls attention away from the live show',
              'Artists need audience interaction that adds to a performance, not one that competes with it',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Our goal became specific from there: design something that deepens the connection between artist and audience. Interactive enough to matter, restrained enough to protect the energy of a live show.',
          },
        ],
      },
      {
        type: 'behindTheDesign',
        heading: 'My Role',
        blocks: [
          {
            kind: 'paragraph',
            text: 'I worked as part of a three-person team with Victoria Leliveld and Amrit Nannar, across research, ideation, interaction design, and the final high-fidelity screens.',
          },
          {
            kind: 'paragraph',
            text: 'A 24-hour sprint doesn’t leave room for precious decision-making. We had to choose a direction fast, commit to it, and keep refining instead of restarting.',
          },
        ],
      },
      {
        type: 'research',
        heading: 'Research & Insights',
        blocks: [
          {
            kind: 'paragraph',
            text: 'With one day on the clock, there was no time for formal research. Instead, we spent our first hour pooling our own experience as concertgoers and talking through the frustrations that came up again and again.',
          },
          {
            kind: 'list',
            items: [
              'Fans value surprise, but still want some way to shape the experience',
              'A phone should support a concert, not distract from it',
              'Interactive moments make people feel more invested in a show',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Those three ideas became the filter every feature had to pass through for the rest of the sprint.',
          },
        ],
      },
      {
        type: 'process',
        heading: 'The Solution',
        blocks: [
          { kind: 'paragraph', text: 'We landed on five features, each answering a specific piece of the problem.' },
          { kind: 'heading', text: 'Real-Time Song Voting', level: 3 },
          {
            kind: 'paragraph',
            text: 'The core of the app: fans vote on which song plays next, giving them a direct hand in shaping the set without taking the mic, or the setlist, away from the artist.',
          },
          {
            kind: 'imageGrid',
            images: [
              {
                src: null,
                alt: 'PLACEHOLDER — replace with a real mockup of the real-time song voting screen',
                tone: 'clay',
              },
              {
                src: null,
                alt: 'PLACEHOLDER — replace with a real mockup of Concert Mode',
                tone: 'neutral',
              },
            ],
          },
          { kind: 'heading', text: 'Concert Mode', level: 3 },
          {
            kind: 'paragraph',
            text: 'A stripped-down, battery-conscious mode that surfaces only what matters during the show, so using Setlist at a concert doesn’t mean staring at a bright, busy screen.',
          },
          { kind: 'heading', text: 'Song Bank', level: 3 },
          {
            kind: 'paragraph',
            text: 'Fans pick favorite songs before the show, quietly raising the odds those songs make it into the set. It’s participation that starts before the doors even open.',
          },
          { kind: 'heading', text: 'Live Poll Metrics', level: 3 },
          {
            kind: 'paragraph',
            text: 'A real-time view of how the vote is trending, so the room feels like it’s deciding together instead of shouting into the void.',
          },
          { kind: 'heading', text: 'Merch Integration', level: 3 },
          {
            kind: 'paragraph',
            text: 'Merch ordering with venue pickup, folded into the same app instead of a separate line. A small convenience, not the point of the product.',
          },
        ],
      },
      {
        type: 'iterations',
        heading: 'Design Process',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Twenty-four hours meant working in a tight loop: define the problem, sketch fast, get it in front of teammates, adjust, repeat. We moved from rough problem framing to low-fidelity wireframes within the first few hours, then spent the rest of the sprint trading feedback in real time and pushing the interface toward something we could actually present.',
          },
          {
            kind: 'paragraph',
            text: 'There was no room for a decision to sit unchallenged for long. If something wasn’t working, we heard about it within the hour, not the next sprint cycle.',
          },
        ],
      },
      {
        type: 'finalDesign',
        heading: 'Final Design',
        blocks: [
          {
            kind: 'paragraph',
            text: 'What we shipped by the end of the 24 hours was a cohesive mobile experience: real-time voting, a distraction-conscious concert mode, and a handful of small features that made the app feel like it belonged at a show, not just on a phone.',
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with a real screenshot of the final Setlist app',
              tone: 'lavender',
            },
            bleed: true,
          },
          {
            kind: 'paragraph',
            text: 'It’s still a sprint project, not a shipped product, but it held together as a real, presentable interface under real time pressure, which was the actual test.',
          },
        ],
      },
      {
        type: 'reflection',
        heading: 'Reflection',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Winning the Most Innovative Award was a nice surprise, but the bigger takeaway was how much thoughtful UX thinking you can pack into a single day when the team stays focused.',
          },
          {
            kind: 'paragraph',
            text: 'This project taught me to prioritize ruthlessly and iterate in public. There’s no time to be precious about an idea when you have hours, not weeks. It also reinforced something I keep relearning: a lot of good UX work isn’t inventing new behavior, it’s reframing an existing one. In this case, turning a phone from a distraction into a tool for connection.',
          },
        ],
      },
    ],
  },
  {
    id: 'close-the-curtain',
    slug: 'close-the-curtain',
    title: 'Close the Curtain',
    tagline: 'Helping people enjoy stories together without compromising comfort or context.',
    tags: ['Product Design', 'Streaming Experience'],
    coverImage: {
      src: closeTheCurtainCover,
      alt: 'Close the Curtain concept: a browser extension popup over a paused YouTube video, showing the "Enable Close the Curtains" toggle and description',
      tone: 'ink',
    },
    year: '2026',
    isConfidential: false,
    links: [{ kind: 'figma', url: '#' }],
    meta: {
      role: 'Product Designer',
      timeline: 'January 2026',
      team: 'Team of 4, with Mona Eletr, Aleena Rashid & Affan Arshad',
      tools: ['Figma'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Close the Curtain is a concept for an optional streaming mode that gently skips intimate or sensitive scenes while preserving story continuity through short, AI-generated plot summaries. Rather than blocking a title outright, it gives viewers more control over how they watch, making shared viewing more comfortable without compromising the story itself.',
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Streaming platforms serve an enormous range of viewers under one roof, and comfort with on-screen content varies a lot depending on who’s in the room: family, kids, a first date, a shared living space. Existing parental controls tend to force an all-or-nothing choice: block the whole title, or leave everything in and let people fend for themselves with the fast-forward button, usually losing track of the story in the process.',
          },
          {
            kind: 'paragraph',
            text: 'The goal we set was specific: design an optional viewing mode that lets people comfortably watch mainstream content together without losing the thread of the story. It needed to feel supportive and entirely user-controlled, never like it was making the decision for you.',
          },
        ],
      },
      {
        type: 'behindTheDesign',
        heading: 'My Role',
        blocks: [
          {
            kind: 'paragraph',
            text: 'I worked on this as part of a four-person team with Mona Eletr, Aleena Rashid, and Affan Arshad, contributing to product strategy, interaction design, interface design, and the high-fidelity prototype.',
          },
          {
            kind: 'paragraph',
            text: 'My focus sat at the intersection of the two: shaping how the experience actually worked, and how it looked and felt on screen.',
          },
        ],
      },
      {
        type: 'insights',
        heading: 'Key Insight',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The real problem wasn’t the content itself. It was that viewers had no middle ground between watching everything and watching nothing.',
          },
          {
            kind: 'paragraph',
            text: 'Reframing the challenge from censorship to control changed the direction of the whole project: this was never about deciding what people should watch, only about giving them a way to choose how they watched it. That reframe is what made the solution feel inclusive instead of restrictive.',
          },
        ],
      },
      {
        type: 'process',
        heading: 'The Solution',
        blocks: [
          { kind: 'paragraph', text: 'Four decisions defined the concept.' },
          { kind: 'heading', text: 'Optional Viewing Mode', level: 3 },
          {
            kind: 'paragraph',
            text: 'The feature is off by default and entirely opt-in. Nothing about the experience assumes what a viewer wants. It only responds to a choice they’ve actively made.',
          },
          { kind: 'heading', text: 'Scene Detection', level: 3 },
          {
            kind: 'paragraph',
            text: 'Content is analyzed ahead of playback, not monitored while someone watches. Scene boundaries are flagged in advance, so the experience stays private and never feels like it’s watching you back.',
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with a real mockup of the viewing-mode toggle and scene-skip transition',
              tone: 'clay',
            },
          },
          { kind: 'heading', text: 'Narrative Continuity', level: 3 },
          {
            kind: 'paragraph',
            text: 'Short, AI-generated summaries fill the gap left by a skipped scene, so a viewer never loses the thread of what just happened. The point was never to hide the story, only a moment of it.',
          },
          { kind: 'heading', text: 'Respectful Experience', level: 3 },
          {
            kind: 'paragraph',
            text: 'Transitions were designed to feel calm, not clinical: a soft fade and a brief summary card, rather than an abrupt jump cut that draws more attention to the skip than the scene itself would have.',
          },
        ],
      },
      {
        // No exact section type fits "how the concept mechanically works" —
        // reusing 'research' since, like Markaz, the heading is what carries
        // the meaning here, not the underlying type key.
        type: 'research',
        heading: 'How It Works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Close the Curtain is a concept, not a working product. The prototype demonstrates the intended experience rather than a production implementation. As we designed it, the intended flow works in four steps.',
          },
          {
            kind: 'list',
            items: [
              'A title is preprocessed before it becomes available in this mode',
              'Scene boundaries are identified during that preprocessing step',
              'A short plot summary is generated for each flagged scene',
              'During playback, the flagged scene is skipped automatically and its summary appears in its place',
            ],
          },
        ],
      },
      {
        type: 'iterations',
        heading: 'Design Process',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Designing around a sensitive subject meant a lot of the real work happened before any screens got drawn. We had to agree as a team on language, tone, and where the line was between helpful and presumptuous. Once that foundation felt right, the interaction design followed: how a viewer turns the mode on, how a skip is signaled, how much of a summary is enough without becoming a spoiler in itself.',
          },
          {
            kind: 'paragraph',
            text: 'Every round of feedback came back to the same question: does this feel like it’s respecting the viewer’s choice, or making one for them? That question shaped more of the final interface than any single feature did.',
          },
        ],
      },
      {
        type: 'finalDesign',
        heading: 'Final Design',
        blocks: [
          {
            kind: 'paragraph',
            text: 'What we landed on is a quiet, optional layer on top of a familiar streaming interface: a toggle, a scene-skip transition, and a short summary card, designed to feel like a natural part of the platform rather than a bolted-on filter.',
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with a real screenshot of the final Close the Curtain concept',
              tone: 'ink',
            },
            bleed: true,
          },
          {
            kind: 'paragraph',
            text: 'As a concept, it’s an exploration of what a more inclusive viewing experience could look like. Not a finished feature, but a considered starting point for one.',
          },
        ],
      },
      {
        type: 'reflection',
        heading: 'Reflection',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This project pushed me to think about accessibility more broadly than I had before. The interesting question was never whether content should be restricted. It was how a product could adapt to genuinely different viewing needs without treating any one of them as the default.',
          },
          {
            kind: 'paragraph',
            text: 'It reinforced something I keep coming back to: good design usually isn’t about adding a rule, it’s about adding a choice.',
          },
        ],
      },
    ],
  },
  {
    id: 'loris-redesign',
    slug: 'loris-redesign',
    title: 'LORIS Redesign',
    tagline: 'Simplifying a legacy student portal through clearer navigation and modern interaction design.',
    tags: ['UX Design', 'Enterprise UX', 'Information Architecture', 'Interaction Design'],
    coverImage: {
      src: lorisRedesignCover,
      alt: 'Redesigned LORIS student portal dashboard showing simplified navigation and grouped menus',
      tone: 'clay',
    },
    year: '2025',
    isConfidential: false,
    links: [{ kind: 'behance', url: '#' }],
    meta: {
      role: 'UX Designer (Team Lead)',
      timeline: 'May 2025',
      team: 'Team of 5, with Amrit Nannar, Jania Walia, Laura Lam & Gaooshan Sathiyakumar',
      tools: ['Figma'],
    },
    sections: [
      {
        type: 'overview',
        heading: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text: 'LORIS, Laurier’s Online Registration and Information System, is what students and faculty use for course registration, tuition, grades, and most of the university’s day-to-day administrative tasks. It’s powerful, but years of accumulated interface complexity had made routine tasks harder than they needed to be.',
          },
          {
            kind: 'paragraph',
            text: 'I led a team of five to redesign the experience: clearer navigation, less cognitive load, and an interface that felt intuitive, without touching the functionality people already depended on.',
          },
        ],
      },
      {
        type: 'challenge',
        heading: 'The Challenge',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Students rely on LORIS for some of the most consequential parts of university life, yet using it day to day often felt like the opposite of that experience.',
          },
          {
            kind: 'list',
            items: [
              'Cluttered, text-heavy screens',
              'Confusing navigation',
              'Inconsistent visual hierarchy',
              'Unnecessary clicks to complete routine tasks',
              'Outdated interface patterns',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Our goal was specific: help students complete common tasks more efficiently and make the platform feel approachable and modern, without changing the core functionality people already relied on.',
          },
        ],
      },
      {
        type: 'behindTheDesign',
        heading: 'My Role',
        blocks: [
          {
            kind: 'paragraph',
            text: 'I led a five-person team with Amrit Nannar, Jania Walia, Laura Lam, and Gaooshan Sathiyakumar, contributing to UX strategy, interaction design, interface design, and the overall direction of the project.',
          },
          {
            kind: 'paragraph',
            text: 'Alongside the team, I helped identify the platform’s usability issues, prioritize which ones were worth redesigning first, and build the high-fidelity concepts that became the final interface.',
          },
        ],
      },
      {
        type: 'process',
        heading: 'Design Decisions',
        blocks: [
          { kind: 'paragraph', text: 'Four principles guided every redesign decision.' },
          { kind: 'heading', text: 'Reducing Cognitive Load', level: 3 },
          {
            kind: 'paragraph',
            text: 'Simpler layouts and a clearer hierarchy meant students could focus on the task in front of them, registering for a course, checking a grade, instead of parsing a dense screen just to find where to start.',
          },
          { kind: 'heading', text: 'Prioritizing Frequent Actions', level: 3 },
          {
            kind: 'paragraph',
            text: 'The tasks students reach for constantly, registration, grades, schedules, were surfaced directly on the dashboard instead of buried a few clicks deep, so the most common path is also the shortest one.',
          },
          {
            kind: 'imageGrid',
            images: [
              {
                src: null,
                alt: 'PLACEHOLDER — replace with early wireframes exploring the redesigned dashboard',
                tone: 'neutral',
              },
              {
                src: null,
                alt: 'PLACEHOLDER — replace with a user flow diagram for course registration',
                tone: 'clay',
              },
            ],
          },
          { kind: 'heading', text: 'Improving Navigation', level: 3 },
          {
            kind: 'paragraph',
            text: 'Related tasks were grouped together under clearer labels, cutting down the number of menus someone has to guess through to find what they need.',
          },
          { kind: 'heading', text: 'Creating Visual Consistency', level: 3 },
          {
            kind: 'paragraph',
            text: 'Consistent spacing, typography, and a small set of reusable components made the interface predictable. Once you learn one screen, the rest behave the way you’d expect.',
          },
        ],
      },
      {
        type: 'iterations',
        heading: 'The Solution',
        blocks: [
          { kind: 'heading', text: 'Customizable Homepage', level: 3 },
          {
            kind: 'paragraph',
            text: 'Students can arrange their homepage around what they actually use, so the first screen they see is built around their own routine, not a generic default.',
          },
          { kind: 'heading', text: 'Streamlined Dashboard', level: 3 },
          {
            kind: 'paragraph',
            text: 'A single, decluttered view surfaces the essentials: registration status, grades, holds. No scavenger hunt across separate pages required.',
          },
          { kind: 'heading', text: 'Clearer Navigation & Grouped Menus', level: 3 },
          {
            kind: 'paragraph',
            text: 'Related actions live together under plain-language labels, replacing the maze of legacy menu items with something closer to how students actually think about their tasks.',
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with a real mockup of the streamlined dashboard',
              tone: 'sage',
            },
            bleed: true,
          },
          { kind: 'heading', text: 'Improved Search', level: 3 },
          {
            kind: 'paragraph',
            text: 'A more capable search means students can jump straight to what they need instead of navigating there step by step.',
          },
          { kind: 'heading', text: 'Responsive Layouts', level: 3 },
          {
            kind: 'paragraph',
            text: 'The redesigned interface adapts cleanly across screen sizes, since a meaningful share of students check LORIS from a phone between classes.',
          },
        ],
      },
      {
        type: 'insights',
        heading: 'Design System',
        blocks: [
          {
            kind: 'paragraph',
            text: 'To keep the redesign consistent across dozens of screens, we put together a small design system alongside the interface work: a shared language the rest of the redesign could draw from.',
          },
          {
            kind: 'list',
            items: [
              'Typography',
              'Color palette',
              'Buttons & components',
              'Spacing & layout grid',
              'Icons',
              'Navigation patterns',
            ],
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with the real LORIS design system sheet (typography, color, components)',
              tone: 'lavender',
            },
          },
        ],
      },
      {
        type: 'finalDesign',
        heading: 'Final Design',
        blocks: [
          {
            kind: 'paragraph',
            text: 'What shipped is a cleaner, more intuitive LORIS, one built around what students are actually trying to do, rather than the system’s internal structure. The goal from the start was to let people focus on finishing a task, not on figuring out how the platform works.',
          },
          {
            kind: 'image',
            image: {
              src: null,
              alt: 'PLACEHOLDER — replace with a real screenshot of the final redesigned LORIS interface',
              tone: 'clay',
            },
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
            text: 'Leading this redesign reinforced something I keep coming back to: design around what people are trying to do, not around how the existing system happens to be structured.',
          },
          {
            kind: 'paragraph',
            text: 'It sharpened my understanding of information architecture and interface hierarchy, and showed me how much more approachable a complex administrative system can feel with a few thoughtful, consistent decisions.',
          },
        ],
      },
    ],
  },
]

// The public-facing subset — homepage grid, featured pick, and next-project
// cycling all read from this instead of `projects`. `getProjectBySlug` below
// still searches the full list, so an unpublished project's case study route
// keeps working if visited directly; it's just not linked from anywhere.
export const publishedProjects: Project[] = projects.filter((project) => project.isPublished !== false)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
