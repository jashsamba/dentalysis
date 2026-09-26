// The four featured personal projects, in display order.
// Each one has its own colour "world" that carries from the home page into its case study.

import type { FlowNode } from './types'

export type ProjectTheme = {
  /** Panel background */
  bg: string
  /** Slightly lighter surface for chips and diagram boxes */
  surface: string
  /** Main text on the panel */
  text: string
  /** Secondary text on the panel */
  muted: string
  /** Highlight colour on the dark panel */
  accent: string
  /** Planet sphere gradient (light side → dark side) */
  planet: [string, string]
  /** Draw a ring around the planet */
  ring?: boolean
}

export type ProjectMedia =
  | { kind: 'phones'; front: { src: string; alt: string }; back: { src: string; alt: string } }
  | { kind: 'flow'; nodes: FlowNode[]; caption: string }

export type Project = {
  slug: string
  title: string
  kicker: string
  oneLiner: string
  theme: ProjectTheme
  media: ProjectMedia
  stats: { value: string; label: string }[]
  stack: string[]
  github: { url: string | null; note?: string }
  /** Short notes shown as visible TODO chips on the home panel */
  pending?: string[]
}

export const projects: Project[] = [
  {
    slug: 'luna',
    title: 'Luna',
    kicker: 'Private voice assistant',
    oneLiner: 'A voice assistant that runs entirely on my laptop, with no cloud calls.',
    theme: {
      bg: '#120d33',
      surface: '#241e57',
      text: '#eeebff',
      muted: '#b3acd9',
      accent: '#b9a7ff',
      planet: ['#d9d0ff', '#4b3aa8'],
      ring: true,
    },
    media: {
      kind: 'flow',
      caption: 'Everything on this path runs locally.',
      nodes: [
        { label: 'Wake word', note: '"Luna"' },
        { label: 'Speaker recognition' },
        { label: 'Llama 3.2 3B', note: 'local model' },
        { label: 'Kokoro speech' },
      ],
    },
    stats: [
      { value: '59 tok/s', label: 'llama3.2:3b on an RTX 3050 Ti laptop GPU' },
      { value: '7 / 7', label: 'Airflow runs succeeded across 3 pipelines' },
      { value: '100%', label: 'of logged utterances embedded for memory' },
    ],
    stack: ['Python', 'Llama 3.2 (local)', 'Kokoro TTS', 'Speaker recognition', 'Apache Airflow', 'Semantic memory'],
    github: { url: null, note: 'Repo is clean (only .env.example tracked) but has no remote yet.' },
    pending: ['Demo video and dashboard screenshot', 'Median "hear you to first sound" latency'],
  },
  {
    slug: 'doom-trivia',
    title: 'Doom Trivia',
    kicker: 'Swipe-to-answer trivia game',
    oneLiner:
      'An endless trivia game whose questions come from an AI pipeline built on 40 topics and 2,000 subtopics.',
    theme: {
      bg: '#0b231c',
      surface: '#1a3d31',
      text: '#f4edd8',
      muted: '#b9c4b3',
      accent: '#e9b949',
      planet: ['#f3d27a', '#1f5a3f'],
    },
    media: {
      kind: 'phones',
      front: {
        src: '/images/doom-trivia-home-day.webp',
        alt: 'Doom Trivia home screen: a glowing lantern mascot on a mossy forest rock under a large mushroom, with the heading "Follow your curiosity" and New Game and Load Game buttons.',
      },
      back: {
        src: '/images/doom-trivia-tough-mode.webp',
        alt: 'Doom Trivia Tough mode: a question card asking which civilization built Machu Picchu, with four answers in the corners of the screen.',
      },
    },
    stats: [
      { value: '637', label: 'curated questions shipped' },
      { value: '6', label: 'game modes' },
      { value: '51', label: 'passing tests (2026-09-13)' },
    ],
    stack: ['Flutter', 'Supabase', 'LLM question-generation pipeline'],
    github: {
      url: null,
      note: 'github.com/jashsamba/AI_Trivia_App. Confirm row level security on all tables before making it public.',
    },
    pending: ['Question validation write-up'],
  },
  {
    slug: 'job-hunter',
    title: 'The Job Hunter',
    kicker: 'AI job application agent',
    oneLiner:
      'A multi-user agent that finds jobs, ranks them against your resume, and writes tailored cover letters.',
    theme: {
      bg: '#0f1a2f',
      surface: '#28324a',
      text: '#e9eef6',
      muted: '#a9b4c6',
      accent: '#7cc4ff',
      planet: ['#bfe3ff', '#1d4f8f'],
    },
    media: {
      kind: 'flow',
      caption: 'Every application is tracked end to end.',
      nodes: [
        { label: 'Indeed listings', note: 'Playwright' },
        { label: 'Fit score', note: 'Claude vs. resume' },
        { label: 'Cover letter PDF' },
        { label: 'Tracker', note: 'Supabase + React' },
      ],
    },
    stats: [],
    stack: ['Python', 'Playwright', 'FastAPI', 'Claude API', 'Supabase', 'React'],
    github: {
      url: null,
      note: 'Add .gitignore first. Never commit config files, API keys, or the friend\'s resume.',
    },
    pending: ['Real counts from Supabase', 'Row level security re-enabled', 'Dashboard screenshot with dummy data'],
  },
  {
    slug: 'voice-dental-scheduler',
    title: 'Voice Dental Scheduler',
    kicker: 'Voice-note appointment booking',
    oneLiner: 'A patient leaves a voice note and the appointment books itself.',
    theme: {
      bg: '#092d2f',
      surface: '#155050',
      text: '#e6f6f2',
      muted: '#a7cfc7',
      accent: '#7fe0c8',
      planet: ['#c6fbee', '#0f6b62'],
      ring: true,
    },
    media: {
      kind: 'flow',
      caption: 'From voice note to confirmed booking without a receptionist.',
      nodes: [
        { label: 'Voice note' },
        { label: 'Whisper', note: 'transcription' },
        { label: 'GPT', note: 'extracts details' },
        { label: 'Google Calendar' },
        { label: 'Twilio SMS', note: 'confirmation' },
      ],
    },
    stats: [{ value: '8', label: 'automated tests across 2 files (results pending)' }],
    stack: ['Python', 'OpenAI Whisper', 'GPT', 'Google Calendar API', 'Twilio'],
    github: { url: null, note: 'Never commit .env or the Google Calendar credentials file.' },
    pending: ['Run the tests and record results', 'Demo with a fake patient'],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
