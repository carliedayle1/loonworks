# Portfolio: "Contraption" — Spec + Implementation Plan

## Context

Erick Dayle Loon wants a portfolio site that wins **freelance clients** for two services: **web development** and **AI automation**. It must carry his CV credentials (7+ years, roles, degree, certs) and a curated set of his own projects from `D:\Coding\Projects`. Brief: modern, quirky, moving animations and scroll effects, expensive-looking. `D:\Coding\Projects\portfolio` is empty (not a git repo).

Decisions made with the user in brainstorming:
- Audience: freelance clients first. Services lead; projects are proof.
- Projects: solo work only — QuizBee (ai-quiz-generator), Bookture Media, Unplug, InventoryManagement. **Exclude** BahaAI, GradConnect, StockSense AI (other people's repos), and expense-tracker-starter, skills-test, internsync, evacu-ai.
- Years claim: **7+** (from Teradyne, April 2019).
- Contact: email + LinkedIn only. No phone, no form, no backend.
- Theme: **Contraption** — tin-toy automation machine; scroll runs a chain reaction.
- Case-study pages `/work/[slug]` for every project.
- QuizBee + Inventory get illustrated SVG plates (no screenshots exist); image slots stay for later.

This file holds two documents. On approval, Task 1 saves Part A to `docs/superpowers/specs/2026-10-10-portfolio-contraption-design.md` and Part B to `docs/superpowers/plans/2026-10-10-portfolio-contraption.md`, then commits.

---

# Part A — Design spec

## A1. Positioning and copy rules
- Name: Erick Dayle Loon. Role line: "Web developer and AI automation engineer". Location: Lapu-Lapu City, Cebu, Philippines.
- Email `daylecarlie@gmail.com` (from CV). LinkedIn `https://www.linkedin.com/in/erick-dayle-loon`.
- Never: the word "founder", the phone number, any `.env` value, family/author photos from unplug `public/images/*.jpeg` or `author_pic.jpg`, Bookture `studio-*.png` (shows a person).
- Never overclaim: QuizBee fallback is **Groq → Gemini for quiz generation only**; Bookture forms are **not** mentioned (they don't send); Inventory is not called concurrency-safe.
- Copy style (frontend-design): sentence case, plain verbs, no ALL-CAPS labels, no "→" appended to links, no "A · B · C" meta strings, no "WORD — fragment" labels, no single-word accent in headlines. Numbered markers only for real sequences (machine stations, timeline years).

## A2. Tokens
| Token | Hex | Use |
|---|---|---|
| `tin` | `#D9DEE3` | page background (galvanized) |
| `paper` | `#F7F8F6` | raised plate surfaces |
| `enamel` | `#1F2A44` | text, dark bands, track lines |
| `tomato` | `#E8452C` | ball, primary buttons, shapes only — **never body text** (fails AA on tin) |
| `mustard` | `#F2B705` | gear A, gauge needles, highlights |
| `teal` | `#138A86` | gear B, active station lamps, AI tag |

- Type: **Unbounded** (display, variable 300–900, used wide and heavy, tight tracking) + **Hanken Grotesk** (body 400/500/600). Both via `next/font/google`. Scale (rem): 0.875 / 1 / 1.25 / 1.563 / 1.953 / 2.441 / 3.815 / clamp hero `clamp(2.6rem, 7vw, 6.2rem)`. Body line-height 1.6, max 68ch.
- Texture: brushed-metal on `tin` (fine repeating-linear-gradient + feTurbulence noise data-URI at ~6% opacity). Plates get CSS rivets (4 corner radial-gradients) and a 1px enamel/15% inset edge. Radii vary by hierarchy: plates 18px, buttons full pill, chips 6px.
- Easing: copy bookture `outExpo`, `inOutBook`; rename `gold` → `snap` `[0.33,1,0.68,1]`.
- Light theme only.

## A3. Page structure (`/`)
1. **Header** (sticky): gear monogram "EDL" + links Work, Services, Experience, Contact (`/#work` etc.). No hamburger; fits 375px.
2. **Machine hero** (the one signature moment). Left: H1 "I build websites and the machines behind them." Sub: "Web development and AI automation from Lapu-Lapu City, Cebu. 7+ years building and rolling out software, most recently for life-sciences teams in 35+ countries." Buttons: "See my work" (`#work`), "Email me" (mailto). Right: Contraption SVG. Hint: "Scroll to run the machine".
   - Load (once, mount): H1 lines rise (RevealText mount); ball drops into chute with `bounce.out`; gears idle-spin via CSS.
   - Scroll (pinned, scrubbed): headline dims; ball runs 4 segments; each station lamp lights and its caption activates; at the end a "done" stamp pops and the closing line shows.
   - Stations (ordered, numbered):
     1. "A customer emails you at 2 a.m."
     2. "AI reads it and sorts it: a quote request."
     3. "It drafts the reply and logs the lead in your CRM."
     4. "You approve with one click. Done before coffee."
   - Closing line: "That's AI automation. I build these, and the websites they plug into."
3. **Services** (`#services`): two riveted panels.
   - Web development — intro "Sites and apps that look sharp, load fast and are easy to run." Offers: "Marketing sites with motion" / "Scroll-driven, animated sites in Next.js that still score well on speed."; "Web apps" / "Logins, dashboards and admin panels in Laravel and React."; "WordPress" / "New builds, theme fixes, plugin setup and speed-ups."
   - AI automation — intro "Hand the repetitive work to software that does it the same way every time." Offers: "AI inside your app" / "Content and quiz generation, AI grading, and chat over your own documents."; "Workflow automation" / "Email triage, syncing data between systems, and scheduled reports with Python and Power Automate."; "Microsoft 365 and Copilot" / "Setting up Copilot and automations for your team's day-to-day tools."
   - At-work strip under panels: "At BioTechnique I build Python integrations that connect an eQMS platform to client systems for life-sciences companies in 35+ countries."
4. **Work** (`#work`): 4 plates, asymmetric grid — QuizBee and Bookture large, Unplug and Inventory smaller. Plate = media (image or art), title, tag ("AI automation" teal / "Web" enamel), pitch, first 4 stack items, "Read the case study". Whole plate is one link. Hover/focus: corner gear rotates 45°, plate lifts 2px (user-triggered).
5. **Experience** (`#experience`): 3 tin dial gauges (needle sweeps once on scroll-in; number counts via AnimatedCounter; final values always in DOM): 7+ "years building and rolling out software" (max 10); 1,000+ "life-sciences clients on the eQMS I deploy" (max 1200); 35+ "countries those clients work in" (max 50). Below: vertical timeline, newest first, year ranges as markers.
6. **Credentials**: degree, 5 certificates, skills by group. Quiet, no motion.
7. **Contact** (`#contact`, enamel band): H2 "Have a site to build or a task to automate?" Big email as mailto link, "Copy email" button, LinkedIn link. Footer: "© 2026 Erick Dayle Loon" / "Lapu-Lapu City, Cebu, Philippines" on two lines.

## A4. Case pages (`/work/[slug]/`)
Back link "All work" (`/#work`) → H1 (RevealText mount) + pitch → facts `<dl>` (Client, Role, Year, Stack, plus `numbers`) → media in tin frame → "What it does" (features) → "How it's built" (architecture) → "Hard problems" (challenges) → gallery (if any) → links → "Next project" plate → Contact band. `generateStaticParams` + `dynamicParams = false`; unknown slugs 404.

## A5. Motion rules
- Everything animated goes through `useAnimation` (gsap.matchMedia no-preference). Hidden start states only via `gsap.set` inside it. Reduced motion ⇒ no Lenis, no pin, all 4 captions + closing line visible as an ordered list, ball at chute, stamp visible, gauges at final angle, CSS idle spin off.
- Only one scroll-scrubbed scene (hero). No fade-up on sections. Gauges and RevealText on H1/H2 headings of case pages only.
- Mobile `(max-width: 767px)`: SVG full width above captions; pin length `+=180%` (desktop `+=250%`).

## A6. Project content (source of truth for `src/content/site.ts`)
All years "2026". Repo links appear only if the URL returns HTTP 200 unauthenticated (checked in Task 2).

**quizbee** — QuizBee, kind `ai`, client "My own product, built for schools", role "Design, full-stack build and AI integration", art `quiz`, repo `https://github.com/carliedayle1/ai-quiz-generator`, no live link.
- Pitch: "Teachers turn a topic, a PDF or a voice recording into a ready quiz. Students get AI grading, feedback and a tutor that answers back."
- Numbers: Automated tests 442; Commits 175; Routes 113.
- Stack: Laravel 13, React, TypeScript, Inertia, laravel/ai, Groq, Gemini, Jina embeddings, Laravel Reverb, Capacitor.
- Features: "Generate quizzes from a topic, an uploaded document or an audio recording transcribed with Whisper." / "Five question types, including coding questions in a Monaco editor and essays graded by AI." / "Live, Kahoot-style sessions over websockets with leaderboards, timers and anti-cheat alerts." / "A streaming AI tutor for students and a co-pilot that drafts and publishes quizzes for teachers." / "A quiz bank with semantic search, sharing between teachers, gradebook export, streaks and push notifications." / "Installable as a web app and as an Android app through Capacitor."
- Architecture: "Laravel 13, Inertia and React with TypeScript, with a laravel/ai agent for each AI job." / "Quiz generation runs on Groq (Llama 3.3 70B) and falls back to Gemini if Groq fails." / "Uploaded documents are chunked, embedded with Jina v3 and searched by similarity; the five best chunks go into the prompt." / "Tutor and co-pilot replies stream over Server-Sent Events; grading runs in queued jobs." / "Laravel Reverb broadcasts every live-session event."
- Challenges: "Vector search on any database" — "Search uses pgvector on Postgres, native vector distance on MySQL 9, or a cosine fallback in PHP, picked once per process." / "Closing what an audit found" — "Answer keys no longer reach students, deadlines are enforced on the server, and queue timeouts were fixed so no submission is graded twice. Each fix has a regression test."

**bookture-media** — Bookture Media, kind `web`, client "Book publisher", role "Design and front-end build", live `https://bookturemedia.org` (only if reachable), repo `https://github.com/carliedayle1/bookture-media`.
- Image: `bookture-media/src/app/opengraph-image.png` (1200×630) → `public/work/bookture-media/cover.png`, alt "Bookture Media gold logo on a dark background". Gallery: `public/images/begin-dark.png`, `craft-dark.png` downscaled to 1600w JPEG → `public/work/bookture-media/begin.jpg`, `craft.jpg`; alts "Candlelit library hall from the Bookture site", "Spiral library staircase from the Bookture site".
- Pitch: "A cinematic site for a book publisher. Authors explore services, the catalogue, awards and book fairs, then pitch their manuscript."
- Numbers: Homepage sections 13; Commits 43.
- Stack: Next.js 16, React 19, Tailwind CSS 4, GSAP, Lenis, React Three Fiber.
- Features: "Thirteen scroll-driven homepage sections, including a pinned manifesto and a process timeline that draws itself." / "A 3D globe of the publisher's reach, built with React Three Fiber." / "Dark ink-and-gold and light parchment themes with matching images and hero video." / "An intro sequence: a drawn-logo preloader, a curtain exit and a video." / "Book fairs, FAQ and policy pages."
- Architecture: "Next.js 16, React 19 and Tailwind CSS 4." / "One GSAP module registers every plugin, and a lint rule blocks importing GSAP anywhere else." / "Lenis smooth scrolling runs on GSAP's ticker, so there is one animation loop instead of two." / "The globe is lazy-loaded and stops rendering when it is off screen."
- Challenges: "Motion that respects people who turn it off" — "Reduced motion is handled three ways: JS animations are skipped, smooth scrolling is never started, and CSS animations are cut. Content never waits on an animation to appear." / "One set of easing curves" — "GSAP can't read CSS cubic-bezier values, so the same control points are registered as named GSAP eases and mirrored as CSS tokens."

**unplug** — Unplug, kind `web`, client "Children's activity-book author", role "Design and build", repo `https://github.com/carliedayle1/unplug`, no live link.
- Image: `unplug/public/cover.jpg` (1500×1159) → `public/work/unplug/cover.jpg`, alt "UNPLUG! book cover with cartoon children on a yellow background". Gallery: `public/spreads/page-074.webp`, `page-075.webp` (1584×1224) → `public/work/unplug/`; alts "Book page: the Pig Latin activity", "Book page from the secret languages chapter".
- Pitch: "A playful site for a kids' activity book. Parents browse 101 screen-free activities, try the book's games and print a starter checklist."
- Numbers: Prerendered activity pages 101; Commits 11.
- Stack: Next.js 16, React 19, Tailwind CSS 4, Motion, Python.
- Features: "All 101 activities with live filters, each with its own page." / "A Boredom Button that picks a random activity to share." / "Pieces of the book you can play: a mind-reading trick, a secret-language translator and a dream planner." / "A sticker chart that remembers progress in the browser." / "A swipeable peek inside the book and print-ready pages."
- Architecture: "Next.js 16, React 19 and Tailwind CSS 4, animated with Motion." / "All copy lives in typed content files, and every activity page is generated at build time." / "Printing targets one element instead of the whole page."
- Challenges: "Keeping the book's secrets" — "A content check reads the raw data file and fails if a trick's secret or a puzzle's answer leaks into a teaser." / "Approval before publishing pages" — "A Python script renders manuscript pages into a holding folder. Nothing reaches the site until it's approved."

**inventory** — Inventory Manager, kind `web`, client "Self-initiated, for small retail stockrooms", role "Full-stack build", art `inventory`, no links.
- Pitch: "Staff track products, suppliers and stock movements, see what's running low, and import or export the catalogue as Excel or CSV."
- Numbers: Management screens 4.
- Stack: Laravel 13, Livewire 3, Tailwind CSS, maatwebsite/excel, Pest.
- Features: "Products, categories, suppliers and stock movements, each with search, pagination and modal forms." / "Stock in and out updates quantities inside a database transaction and blocks taking out more than is on hand." / "A dashboard with totals, a low-stock count and recent movements." / "Excel and CSV import that updates products by SKU and creates missing categories and suppliers." / "CSV export, soft deletes and login with email verification."
- Architecture: "Laravel 13 with Livewire 3 components rendered on the server." / "maatwebsite/excel handles import and export." / "A relational schema with unique SKUs and prices stored as decimals."
- Challenges: "Forgiving imports" — "Common column-name variants are accepted, and re-importing a SKU updates the product instead of duplicating it." / "Stock that can't go below zero" — "The stock check and the quantity change happen in one transaction."

## A7. Experience and credentials (from CV)
| Org | Title | Place | Start | End | Points |
|---|---|---|---|---|---|
| BioTechnique (PSC Biotech Corporation) | Software Implementation Engineer | Lapu-Lapu City | 2024-01 | present | "Configure and deploy eQMS for 1,000+ life-sciences clients in 35+ countries." / "Build Python integrations between the eQMS and client systems." / "Maintain the Android app for Zebra scanners used in pharma and manufacturing." |
| University of Cebu | Information Technology Instructor | Mandaue | 2024-01 | present | "Teach networking, programming and application development." / "Write hands-on labs in Java, Android and web technologies." |
| Timeless Medical Systems | Software Implementation Engineer | Mandaue | 2022-03 | 2023-12 | "Led medical software rollouts from requirements to go-live." / "Main technical contact between healthcare clients and developers; trained users and wrote the docs." |
| Freelance | React and WordPress Developer | Cebu | 2020-03 | 2022-03 | "Built React, Next.js and WordPress sites and shops for small and mid-sized businesses, from design to handover." |
| Teradyne | Data Analyst | Cebu | 2019-04 | 2020-03 | "Cleaned and analysed manufacturing data and turned it into reports for engineering and operations." |

- Education: BS Information Technology, University of Cebu, 2016–2021.
- Certificates (Udemy): MERN eCommerce from Scratch; NextJS and React – The Complete Guide; Android 14 and Kotlin Development; Complete Python Bootcamp; NextJS Dev to Deployment.
- Skills: Languages — Python, JavaScript, PHP, Java, Kotlin, SQL. Frameworks — React, Next.js, Node.js, Laravel, WordPress. Mobile — Android (Kotlin, Java), Zebra scanner integration. Enterprise — eQMS implementation, Microsoft 365, Microsoft Copilot, Power Automate. Databases — MySQL, SQL Server.

## A8. Quality floor
Responsive to 375px with no horizontal scroll; visible focus ring (2px mustard outline + enamel offset); AA contrast for all text; skip link "Skip to content"; every image has alt; SVG machine `role="img"` with `aria-label` and captions as real HTML `<ol>`; works with JS off (content present, no motion).

## A9. Out of scope (add later when needed)
Dark mode, contact form, blog, CMS, analytics, OG image generation, i18n, pricing, deployment (static `out/` is host-agnostic; Hostinger or Vercel later).

---

