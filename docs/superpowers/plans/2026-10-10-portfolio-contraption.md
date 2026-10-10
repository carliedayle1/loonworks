# Part B — Implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static, motion-rich, one-page portfolio with four case-study pages for Erick Dayle Loon.

**Architecture:** Next.js 16 App Router with `output: "export"`; all copy in one typed content module that a plain-Node check validates; GSAP + ScrollTrigger + MotionPath + Lenis motion foundation copied from `D:\Coding\Projects\bookture-media`, gated by reduced-motion.

**Tech Stack:** Next.js 16.2.11, React 19, TypeScript 5, Tailwind CSS 4, gsap ^3.15.0, @gsap/react ^2.1.2, lenis ^1.3.25, Node 26 (native type stripping), Python 3.13 (static preview of `out/`).

**Spec:** `docs/superpowers/specs/2026-10-10-portfolio-contraption-design.md` (Part A above).

## Global Constraints
- Project root `D:\Coding\Projects\portfolio`. Path alias `@/*` → `./src/*`.
- Only runtime deps: next, react, react-dom, gsap, @gsap/react, lenis. No framer-motion, three, clsx, tailwind-merge, UI kits.
- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`.
- GSAP is imported only from `@/lib/gsap` (ESLint `no-restricted-imports`; ignores `src/lib/gsap.ts` and `src/lib/easing.ts`).
- `src/content/site.ts` uses erasable TS only and no `@/` imports (Node runs it directly).
- Copy rules A1 apply to every string; tokens A2 are the only colors.
- Apply `frontend-design:frontend-design` guidance in Tasks 3–8: screenshot each section in the browser pane at 1440×900 and 375×812, critique, remove one accessory before committing.
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus
1. Reduced motion on: every caption, the closing line, stamp and gauge values visible; no pin; no blank space where a pin spacer was. → manual step in Task 3.
2. Nav anchor clicked while above the pinned hero: lands on the target section (pin spacing accounted for). → browser check in Task 4.
3. Direct load of `/work/<slug>/` on a static host and an unknown slug → real page / 404 page. → `--built` checks in Task 8.
4. 375px wide phone: no horizontal scroll anywhere, header fits on one line. → browser check in Tasks 3, 5, 8.
5. Clipboard unavailable or denied: "Copy email" reports failure and the mailto link still works. → browser check in Task 7.

## File structure
```
next.config.ts  eslint.config.mjs  package.json  .claude/launch.json
scripts/check-content.mjs              # content + build-output guard
src/app/layout.tsx                     # fonts, metadata, SmoothScrollProvider, skip link
src/app/page.tsx                       # composes home sections
src/app/globals.css                    # @theme tokens, texture, rivets, focus, idle spin, reduced-motion
src/app/icon.svg                       # gear favicon
src/app/not-found.tsx                  # 404
src/app/work/[slug]/page.tsx           # case page
src/content/site.ts                    # ALL copy + types
src/lib/{gsap,easing,utils}.ts         # copied (gsap.ts edited)
src/hooks/{useAnimation,useMediaQuery}.ts            # copied verbatim
src/components/providers/SmoothScrollProvider.tsx    # copied, + anchors:true
src/components/ui/{RevealText,AnimatedCounter}.tsx   # copied verbatim
src/components/ui/{Gauge,CopyEmail,Plate,PlateArt}.tsx
src/components/machine/{Contraption,MachineHero}.tsx
src/components/sections/{Header,Services,Work,Experience,Credentials,Contact}.tsx
public/work/<slug>/*                   # project images
```

---

### Task 1: Scaffold, tokens and motion foundation

**Files:** Create everything under "copied" above, `next.config.ts`, `eslint.config.mjs`, `src/app/{layout.tsx,page.tsx,globals.css,icon.svg}`, `.claude/launch.json`, `docs/superpowers/specs/…-design.md`, `docs/superpowers/plans/….md`.

**Interfaces — Produces:** `gsap, useGSAP, ScrollTrigger, SplitText, MotionPathPlugin, CustomEase` from `@/lib/gsap`; `useAnimation(build, { scope, dependencies? })`; `cn(...)`; `usePrefersReducedMotion()`, `useMediaQuery(q)`; `<SmoothScrollProvider>`; `<RevealText as split trigger>`; `<AnimatedCounter value prefix suffix>`; CSS utilities `.tin-bg`, `.plate` (rivets + edge), `.idle-spin`, Tailwind colors `tin paper enamel tomato mustard teal`, fonts `font-display` (Unbounded) / `font-sans` (Hanken Grotesk).

- [ ] **Step 1: Scaffold in the empty folder**
  Run: `npx create-next-app@16.2.11 . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`
  Then: `npm i gsap@^3.15.0 @gsap/react@^2.1.2 lenis@^1.3.25`
  Expected: `package.json` lists next 16.2.11 and the three deps.
- [ ] **Step 2: git init + save docs.** `git init`; write Part A and Part B of this file to the two `docs/superpowers/…` paths.
- [ ] **Step 3: Copy foundation from bookture-media** (`D:\Coding\Projects\bookture-media\src\…`): `lib/gsap.ts`, `lib/easing.ts`, `lib/utils.ts`, `hooks/useAnimation.ts`, `hooks/useMediaQuery.ts`, `components/providers/SmoothScrollProvider.tsx`, `components/ui/RevealText.tsx`, `components/ui/AnimatedCounter.tsx`. Edits: `gsap.ts` registers `useGSAP, ScrollTrigger, SplitText, MotionPathPlugin, CustomEase` (drop DrawSVG); `easing.ts` renames `gold`→`snap`; `SmoothScrollProvider` adds `anchors: true` to Lenis options. Copy bookture `eslint.config.mjs` with `ignores: ["src/lib/gsap.ts", "src/lib/easing.ts"]` (fixes bookture's own lint failure). Re-save any copied file whose comments show mojibake (`â€”`) as UTF-8 with correct dashes.
- [ ] **Step 4: Config + tokens.** `next.config.ts` per Global Constraints. `globals.css`: Tailwind 4 `@theme` with A2 colors, `--ease-*` tokens mirroring `easing.ts`, brushed-metal `.tin-bg`, `.plate` rivets, `:focus-visible` ring, `@keyframes spin` + `.idle-spin { transform-box: fill-box; transform-origin: center; animation: spin 18s linear infinite }`, and bookture's `prefers-reduced-motion` block. `layout.tsx`: `Unbounded` + `Hanken_Grotesk` from `next/font/google` as CSS vars, `<html lang="en">`, skip link to `#main`, `<SmoothScrollProvider>`, metadata title "Erick Dayle Loon | Web developer and AI automation engineer", description = hero sub (A3). `icon.svg`: 8-tooth mustard gear on enamel. `page.tsx`: `<main id="main">` with the H1 only for now.
- [ ] **Step 5: launch.json** with `dev` (`npm run dev`, port 3000) and `static` (`python -m http.server 4321 -d out`, port 4321).
- [ ] **Step 6: Verify.** Run: `npm run lint; npm run build`. Expected: both exit 0; `out/index.html` exists; no `no-restricted-imports` errors.
- [ ] **Step 7: Commit** `chore: scaffold next 16 static site with motion foundation`.

### Task 2: Content module + content check (TDD)

**Files:** Create `scripts/check-content.mjs`, `src/content/site.ts`; modify `package.json` scripts.

**Interfaces — Produces** (all exported from `src/content/site.ts`):
```ts
export type Img = { src: string; alt: string; width: number; height: number };
export type Link = { label: string; href: string };
export type Project = {
  slug: string; title: string; kind: "web" | "ai"; year: string;
  pitch: string; client: string; role: string;
  image?: Img; art?: "quiz" | "inventory"; gallery?: Img[];
  numbers: { label: string; value: string }[];
  stack: string[]; features: string[]; architecture: string[];
  challenges: { title: string; body: string }[]; links: Link[];
};
export type Role = { org: string; title: string; place: string; start: string; end: string | null; points: string[] };
export type Service = { id: "web" | "ai"; title: string; intro: string; offers: { title: string; body: string }[] };
export type Stat = { value: number; suffix: string; max: number; label: string };
export const profile: { name; role; location; email; linkedin; years: number };
export const hero: { title: string; sub: string; hint: string };
export const stations: string[];          // exactly 4
export const closingLine: string;
export const services: Service[];         // [web, ai]
export const atWork: string;
export const projects: Project[];         // order: quizbee, bookture-media, unplug, inventory
export const stats: Stat[];
export const experience: Role[];          // newest first
export const education: { degree: string; school: string; years: string };
export const certifications: string[];
export const skills: { group: string; items: string[] }[];
export const contact: { heading: string };
```

- [ ] **Step 1: Write the check** `scripts/check-content.mjs` (pattern: `D:\Coding\Projects\author websites\unplug\scripts\check-activities.mjs` — collect `problems`, print, `process.exit(1)` if any). Assertions:
  - `projects.map(p=>p.slug)` deep-equals `["quizbee","bookture-media","unplug","inventory"]`; every slug matches `/^[a-z0-9-]+$/`.
  - every project: non-empty `pitch, client, role`, `features.length >= 3`, `architecture.length >= 3`, `challenges.length >= 2`, `stack.length >= 3`, exactly one of `image`/`art` set.
  - every `image.src` and `gallery[].src` exists at `public/<src>`; every `alt` non-empty.
  - `stations.length === 4`; `profile.years === 7`; `profile.email === "daylecarlie@gmail.com"`.
  - `experience` sorted by `start` descending.
  - `JSON.stringify(allExports)` does not match `/founder/i`, `/\+?63\s?961/`, `/625\s?3725/`, `/→/`, `/ · /`.
  - with `--built`: `out/index.html`, `out/404.html`, and `out/work/<slug>/index.html` for every slug exist.
  Add scripts: `"check:content": "node scripts/check-content.mjs"`, `"verify": "npm run lint && npm run build && node scripts/check-content.mjs --built"`.
- [ ] **Step 2: Run** `npm run check:content`. Expected: FAIL (cannot find `src/content/site.ts`).
- [ ] **Step 3: Check external links.** For each repo/live URL in A6, `curl -s -o /dev/null -w "%{http_code}" <url>`; keep links returning 200, drop the rest (note dropped ones in the commit body).
- [ ] **Step 4: Copy images** into `public/work/<slug>/` per A6. Downscale Bookture `begin-dark.png`/`craft-dark.png` to 1600px wide JPEG q82 with PowerShell `System.Drawing` (HighQualityBicubic); each output < 400 KB. Record real pixel sizes in `Img.width/height`.
- [ ] **Step 5: Write `src/content/site.ts`** with the types above and the exact copy from A3, A6, A7. Stats: `{7,"+",10,…}, {1000,"+",1200,…}, {35,"+",50,…}`.
- [ ] **Step 6: Run** `npm run check:content`. Expected: PASS, prints nothing, exit 0.
- [ ] **Step 7: Commit** `feat: add portfolio content and content check`.

### Task 3: Machine hero (signature moment)

**Files:** Create `src/components/machine/Contraption.tsx`, `src/components/machine/MachineHero.tsx`; modify `src/app/page.tsx`.

**Interfaces — Consumes:** `hero, stations, closingLine, profile` from `@/content/site`; `useAnimation`, `RevealText`, `gsap`, `ScrollTrigger`. **Produces:** `<MachineHero />`; `<Contraption />` (pure SVG, no logic).

- [ ] **Step 1: `Contraption.tsx`** — `viewBox="0 0 1200 760"`, `role="img"`, `aria-label="A toy machine: a ball rolls through gears from an email to a finished task"`. Element ids (the hero's timeline targets these): `#chute` (tomato funnel, top-left), `#seg1`…`#seg4` (enamel 6px stroke, `fill="none"`, each ending at a station, together one continuous track), `#ball` (r=16, tomato, at `#seg1` start), `.station[data-step=1..4]` (lamp circles r=14 at each segment end, fill `tin` darkened), `#gearA` mustard r≈70, `#gearB` teal r≈50, `#gearC` enamel r≈60 (each an outer `<g>` for GSAP rotation wrapping an inner `<g class="idle-spin">`), `#stamp` (tomato circle + white check at the end). Helper `gearPath(cx: number, cy: number, r: number, teeth: number): string` builds trapezoid teeth with depth `0.18 * r`.
- [ ] **Step 2: `MachineHero.tsx`** — `<section id="top">`: left column H1 (`RevealText as="h1" split="lines" trigger="mount"`), sub, buttons "See my work" (`#work`, tomato pill, enamel text, ≥18px bold for AA-large) and "Email me" (mailto, outlined), hint; right column `<Contraption/>`; below/beside it `<ol>` of the 4 `stations` + `<p>` closingLine (all visible in markup).
  `useAnimation` build:
  - mount: ball `from { y: -220 }` `bounce.out` 1.1s.
  - `isMobile = window.matchMedia("(max-width: 767px)").matches`.
  - `gsap.set` captions 2–4 + closing + stamp to `{ autoAlpha: 0.25 }` / stamp `{ scale: 0, transformOrigin: "50% 50%" }`.
  - timeline `scrollTrigger: { trigger: section, start: "top top", end: isMobile ? "+=180%" : "+=250%", pin: true, scrub: 0.6 }`: headline block `to { autoAlpha: 0.2, y: -40 }`; for i in 1..4: ball `to { motionPath: { path: "#seg"+i, align: "#seg"+i, alignOrigin: [0.5,0.5] }, ease: "none" }`, then station i fill `teal` + caption i `autoAlpha: 1` (previous caption back to 0.6); gears `to { rotation: "+=360", svgOrigin: <gear centre> }` spanning the whole timeline (A clockwise, B counter); end: stamp `to { scale: 1, ease: "back.out(2)" }` + closing line `autoAlpha: 1`.
- [ ] **Step 3: Verify in browser pane** (`preview_start dev`). At 1440×900 screenshot at scroll 0, 35%, 70%, 100% of the pin: ball at stations 1→4, captions advance, stamp pops. At 375×812 repeat; `document.documentElement.scrollWidth <= 375` → true.
- [ ] **Step 4: Reduced-motion check (manual, Review Focus 1).** Windows Settings → Accessibility → Visual effects → Animation effects **Off**, reload: no pin, all 4 captions + closing line + stamp visible, gears still. Turn it back on.
- [ ] **Step 5:** `npm run lint; npm run build` → exit 0. **Commit** `feat: add scroll-driven contraption hero`.

### Task 4: Header, Services, at-work strip

**Files:** Create `src/components/sections/{Header,Services}.tsx`; modify `layout.tsx` (Header), `page.tsx`.
**Interfaces — Consumes:** `profile, services, atWork`.

- [ ] **Step 1: `Header`** — sticky, `tin-bg` at 90% with 1px enamel/10% bottom border once scrolled (CSS `position: sticky` only; no JS). Gear monogram "EDL" links `/`. Links: Work `/#work`, Services `/#services`, Experience `/#experience`, Contact `/#contact`; Hanken 600, 0.875rem on mobile.
- [ ] **Step 2: `Services`** — `#services`, H2 "What I do", two `.plate` panels (web, ai) each: Unbounded title, intro, 3 offers as `<dl>`-style title/body pairs; AI panel title has a teal gear glyph, web panel a tomato one. Strip below with `atWork`.
- [ ] **Step 3: Verify (Review Focus 2).** Browser pane, at scroll 0 click "Services": after 1.5s `document.querySelector('#services').getBoundingClientRect().top` is between -10 and 120. Repeat for Work/Experience/Contact once those exist (re-run in Task 7). 375px: header on one line, no horizontal scroll.
- [ ] **Step 4:** lint + build → exit 0. **Commit** `feat: add header and services`.

### Task 5: Work plates

**Files:** Create `src/components/ui/{Plate,PlateArt}.tsx`, `src/components/sections/Work.tsx`; modify `page.tsx`.
**Interfaces — Consumes:** `projects`, `Project`. **Produces:** `<Plate project={p} size="lg" | "sm" />` (reused by case page "Next project"); `<PlateArt kind="quiz" | "inventory" />`.

- [ ] **Step 1: `PlateArt`** — two inline SVGs in tin-toy style using A2 tokens only: `quiz` = tin card with three checkbox rows, two ticked, a spark/bee glyph; `inventory` = stacked crates with a barcode label. `aria-hidden="true"` (plate title carries meaning).
- [ ] **Step 2: `Plate`** — `<article class="plate">` with media (`<img>` with width/height from `Img`, `loading="lazy"`, `object-cover` 16:10 frame; else `PlateArt`), tag text ("AI automation" teal chip / "Web" enamel chip), H3 title, pitch, `stack.slice(0,4)` chips, stretched `<a href="/work/<slug>/">Read the case study</a>`. Hover/`:focus-within`: corner gear `rotate(45deg)`, `translateY(-2px)`, transition 300ms `var(--ease-snap)`.
- [ ] **Step 3: `Work`** — `#work`, H2 "Selected work", CSS grid: desktop `grid-cols-12`, quizbee + bookture `col-span-7`/`col-span-5` row 1 with `size="lg"`, unplug + inventory row 2 `col-span-5`/`col-span-7` `size="sm"`; single column < 768px.
- [ ] **Step 4: Verify** screenshots 1440 + 375; Tab through plates: focus ring visible on each, Enter opens `/work/<slug>/` (404 until Task 8 — expected). lint + build → exit 0.
- [ ] **Step 5: Commit** `feat: add work plates`.

### Task 6: Experience gauges, timeline, credentials

**Files:** Create `src/components/ui/Gauge.tsx`, `src/components/sections/{Experience,Credentials}.tsx`; modify `page.tsx`.
**Interfaces — Consumes:** `stats, experience, education, certifications, skills`, `AnimatedCounter`, `useAnimation`.

- [ ] **Step 1: `Gauge({ stat }: { stat: Stat })`** — SVG semicircle dial (tin face, enamel ticks every 10%, mustard needle). Final needle angle `-90 + 180 * value / max` rendered in markup; `useAnimation` sets needle to `-90` then tweens to final with `outExpo` 1.6s, `scrollTrigger: { start: "top 85%", once: true }`. Number below via `<AnimatedCounter value suffix>`; label below that.
- [ ] **Step 2: `Experience`** — `#experience`, H2 "Seven years of shipping", 3 gauges in a row (stack on mobile), then `<ol>` timeline: left rail with year range ("2024 – now", "2022 – 2023", …) formatted from `start/end`, right: org, title, place, points. Two current roles show "now".
- [ ] **Step 3: `Credentials`** — H2 "Credentials": degree block, certificates list, skills as grouped `<dl>`. No motion.
- [ ] **Step 4: Verify** screenshots 1440 + 375; gauges sweep once, end at 7+, 1,000+, 35+. lint + build → exit 0.
- [ ] **Step 5: Commit** `feat: add experience gauges, timeline and credentials`.

### Task 7: Contact band + copy email

**Files:** Create `src/components/ui/CopyEmail.tsx`, `src/components/sections/Contact.tsx`; modify `page.tsx`.
**Interfaces — Produces:** `<Contact />` (reused on case pages); `<CopyEmail email={string} />`.

- [ ] **Step 1: `CopyEmail`** — client button; states `"Copy email" | "Copied" | "Couldn't copy. Use the email link."`; `navigator.clipboard.writeText(email)` → "Copied", reverts after 2000ms; on missing clipboard or rejection → failure text (stays until next click). `aria-live="polite"` on the label.
- [ ] **Step 2: `Contact`** — `#contact`, enamel band, H2 = `contact.heading`, email as large Unbounded `<a href="mailto:…">` (paper text on enamel), `<CopyEmail>`, LinkedIn link, footer two lines per A3.
- [ ] **Step 3: Verify (Review Focus 5).** Browser pane: run `navigator.clipboard.writeText = () => Promise.reject(new Error("denied"))`, click "Copy email" → label reads "Couldn't copy. Use the email link."; mailto `href` equals `mailto:daylecarlie@gmail.com`. Re-run Task 4 Step 3 anchor check for all four nav links.
- [ ] **Step 4:** lint + build → exit 0. **Commit** `feat: add contact band`.

### Task 8: Case pages + 404

**Files:** Create `src/app/work/[slug]/page.tsx`, `src/app/not-found.tsx`.
**Interfaces — Consumes:** `projects`, `Plate`, `PlateArt`, `Contact`, `RevealText`.

- [ ] **Step 1: `page.tsx`** — `export const dynamicParams = false`; `generateStaticParams()` → `projects.map(({ slug }) => ({ slug }))`; `generateMetadata({ params })` → title `"<title> | Erick Dayle Loon"`, description = pitch. Next 16: `params` is a Promise — `await` it. Layout per A4; "Next project" = `projects[(i + 1) % projects.length]` as `<Plate size="sm">`; external links `target="_blank" rel="noopener noreferrer"`.
- [ ] **Step 2: `not-found.tsx`** — H1 "This page isn't on the machine.", link "Back to the home page" (`/`).
- [ ] **Step 3: Run** `npm run verify`. Expected: lint 0, build 0, check passes including `out/work/{quizbee,bookture-media,unplug,inventory}/index.html` and `out/404.html` (Review Focus 3).
- [ ] **Step 4: Verify static output** — `preview_start static`; open `/work/unplug/` directly → case page renders with images; open `/work/nope/` → 404 page; 375px: no horizontal scroll on each case page (Review Focus 4).
- [ ] **Step 5: Commit** `feat: add case study pages`.

### Task 9: Final review

- [ ] **Step 1:** `npm run verify` → exit 0.
- [ ] **Step 2:** Full-page screenshots 1440 + 375 of `/` and one case page from the `static` server; run the frontend-design self-critique (one memorable thing, nothing templated, remove one accessory) and fix.
- [ ] **Step 3:** Invoke `superpowers:requesting-code-review` on the whole branch; address findings.
- [ ] **Step 4:** Grep `src/` for `/founder|→| · |\+63/i` → no hits.
- [ ] **Step 5: Commit** `chore: final polish`. Pre-launch notes for the user (not code): confirm the Bookture and Unplug clients are fine being shown; add real QuizBee and Inventory screenshots to `public/work/<slug>/` when available.

## Verification (end-to-end)
1. `npm run verify` exits 0 (lint, static build, content + output checks).
2. `python -m http.server 4321 -d out` → `/`, `/work/<slug>/` ×4, `/work/nope/` (404) all behave.
3. Browser pane at 1440 and 375: hero machine runs on scroll; anchors land; gauges sweep; copy-email fallback works; no horizontal scroll.
4. Reduced motion (Windows Animation effects off): everything visible, no pin.
