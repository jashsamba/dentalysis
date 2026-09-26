# Jaswanth Samba · portfolio

Next.js 16 (static export) + Tailwind CSS 4 + MDX.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out
```

## Where things live

| What | File |
| --- | --- |
| Home page copy (hero, impact, Musashi work, experience, skills, contact) | `lib/site.ts` |
| Featured projects (title, colours, stats, stack) | `lib/projects.ts` |
| Case study write-ups | `content/projects/<slug>.mdx` |
| Images | `public/images/` |
| Colours, fonts, animations | `app/globals.css` |

To add a project: add an entry in `lib/projects.ts` and a matching `content/projects/<slug>.mdx`.

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
