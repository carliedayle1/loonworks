/* Content check for src/content/site.ts.
   Run with `npm run check:content` (add `--built` after `next build` to also
   check the static export). Plain Node: it loads the .ts data file directly
   under Node's type stripping, which is why that file has no "@/" imports and
   uses only erasable TypeScript.

   It guards what is easy to get wrong while editing copy by hand, and what
   must never ship: the phone number, a "founder" title, broken image paths. */

import { existsSync } from "node:fs";
import { deepStrictEqual } from "node:assert";

import * as site from "../src/content/site.ts";

const problems = [];
const bad = (msg) => problems.push(msg);
const filled = (s) => typeof s === "string" && s.trim().length > 0;

const { projects, stations, profile, experience } = site;

/* 1. Projects */
const slugs = projects.map((p) => p.slug);
try {
  deepStrictEqual(slugs, ["quizbee", "bookture-media", "unplug", "inventory"]);
} catch {
  bad(`project slugs are ${JSON.stringify(slugs)}`);
}

for (const p of projects) {
  const at = `project "${p.slug}"`;
  if (!/^[a-z0-9-]+$/.test(p.slug)) bad(`${at}: slug has characters outside a-z0-9-`);
  for (const key of ["title", "pitch", "client", "role", "year"]) {
    if (!filled(p[key])) bad(`${at}: ${key} is empty`);
  }
  if (p.features.length < 3) bad(`${at}: needs at least 3 features`);
  if (p.architecture.length < 3) bad(`${at}: needs at least 3 architecture points`);
  if (p.challenges.length < 2) bad(`${at}: needs at least 2 challenges`);
  if (p.stack.length < 3) bad(`${at}: needs at least 3 stack items`);
  if (Boolean(p.image) === Boolean(p.art)) bad(`${at}: set exactly one of image or art`);

  for (const img of [p.image, ...(p.gallery ?? [])].filter(Boolean)) {
    if (!existsSync(`public${img.src}`)) bad(`${at}: missing file public${img.src}`);
    if (!filled(img.alt)) bad(`${at}: image ${img.src} has no alt text`);
    if (!(img.width > 0 && img.height > 0)) bad(`${at}: image ${img.src} needs width and height`);
  }
}

/* 2. Profile, hero, experience */
if (stations.length !== 4) bad(`expected 4 machine stations, found ${stations.length}`);
if (profile.years !== 7) bad(`profile.years is ${profile.years}, expected 7`);
if (profile.email !== "daylecarlie@gmail.com") bad(`profile.email is ${profile.email}`);

experience.forEach((role, i) => {
  const next = experience[i + 1];
  if (next && next.start > role.start) bad(`experience is not newest first at "${next.org}"`);
});

/* 3. Copy that must never ship */
const all = JSON.stringify(site);
const banned = [
  [/founder/i, 'the word "founder"'],
  [/\+?63\s?961/, "the phone number prefix"],
  [/625\s?3725/, "the phone number"],
  [/→/, 'an arrow "→" in copy'],
  [/ · /, 'a middle-dot meta string " · "'],
];
for (const [pattern, what] of banned) {
  if (pattern.test(all)) bad(`content contains ${what}`);
}

/* 4. Static export (only after `next build`) */
if (process.argv.includes("--built")) {
  const pages = ["out/index.html", "out/404.html", ...slugs.map((s) => `out/work/${s}/index.html`)];
  for (const page of pages) {
    if (!existsSync(page)) bad(`build output missing ${page}`);
  }
}

if (problems.length) {
  console.error(`check-content: ${problems.length} problem(s)\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
