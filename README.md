# Jaswanth Samba · portfolio

Next.js 16 (static export) + Tailwind CSS 4 + MDX.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out
```

## Where things live

Every folder has one job. To change **text**, edit `data/`. To change **how a section looks**, edit `components/sections/`.

```
app/                      pages (routes only)
  page.tsx                home page: the list of sections, in order
  projects/[slug]/        case study page template
  globals.css             colours, fonts, space animations
data/                     all the words and numbers, one file per section
  profile.ts              name, headline, email, phone, links, resume
  impact.ts               the 4 big numbers
  work.ts                 Musashi AI projects (+ their flowchart steps)
  data-engineering.ts
  projects.ts             the 4 personal projects (colours, stats, stack)
  experiments.ts
  experience.ts
  education.ts
  skills.ts
content/projects/*.mdx    the long case study write-ups
components/
  layout/                 header, starfield background, page transitions
  sections/               one file per home page section (Hero, Impact, ...)
  projects/               project panels, scroll deck, planets, before/after slider
  diagrams/               solar system (hero) and flowcharts
  ui/                     small building blocks: Button, Placeholder, SectionHeading
lib/                      helpers (theme colours, media query hook)
public/                   images and resume.pdf
```

To add a project: add an entry in `data/projects.ts` and a matching `content/projects/<slug>.mdx`.

## Placeholders

Anything unresolved renders as a dashed amber "To do" / "To confirm" box. Find them all with:

```bash
grep -rn "Placeholder\|<Todo\|<Confirm\|confirm:" app components content lib
```

Resume: replace `public/resume.pdf` to update the downloadable resume.

## Deploy (Vercel, free)

1. Push this folder to a GitHub repo (the `reference/` folder is git-ignored).
2. Sign in at vercel.com with GitHub → Add New → Project → import the repo → Deploy.
3. Add a custom domain later under Project → Settings → Domains.
