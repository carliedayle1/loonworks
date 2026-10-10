# Loonworks

Portfolio of Erick Dayle Loon: web development and AI automation.

One-page portfolio with case studies, built as a static Next.js export. Theme: a tin-toy machine whose scroll-driven run explains AI automation.

## Scripts

```bash
npm run dev            # http://localhost:3000
npm run verify         # lint + static build + content/output checks
npm run check:content  # content checks only (no build)
```

`npm run build` writes the static site to `out/`. Upload that folder to any static host. `public/.htaccess` points Apache/LiteSpeed hosts at `404.html`.

## Editing

- All copy, projects, roles and stats live in `src/content/site.ts`. `scripts/check-content.mjs` guards it (slugs, image paths, banned words such as the phone number).
- Project images go in `public/work/<slug>/`. To replace an illustrated plate with a screenshot, add the file and set `image` (and remove `art`) for that project.
- Motion lives in `src/components/machine/`. All animation runs through `useAnimation`, so reduced-motion visitors get the finished diagram.

## Docs

- Design spec: `docs/superpowers/specs/2026-10-10-portfolio-contraption-design.md`
- Implementation plan: `docs/superpowers/plans/2026-10-10-portfolio-contraption.md`
