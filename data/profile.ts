// Who you are and how to reach you. Shown in the hero and contact sections.
// Unresolved items use `confirm` / `todo` and render as visible placeholders.

export const profile = {
  name: 'Jaswanth Samba',
  headline: 'AI Engineer building production LLM agents and the data platforms behind them.',
  subline:
    'Turning enterprise data into working systems since January 2020, across manufacturing, retail, and healthcare. Based in Ontario, Canada.',
  email: 'jashsamba@gmail.com',
  phone: { display: '+1 (647) 769-5588', href: 'tel:+16477695588' },
  github: 'https://github.com/jashsamba',
  linkedin: 'https://www.linkedin.com/in/jaswanth-samba-2944a7106/' as string | null,
  upwork: null as string | null,
  resume: '/resume.pdf' as string | null,
  portrait: {
    src: '/images/portrait.webp',
    alt: 'Jaswanth Samba smiling, wearing a dark-collared checked jacket.',
  },
}
