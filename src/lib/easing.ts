/**
 * House easing curves — the single source of truth for motion feel.
 *
 * GSAP cannot parse `cubic-bezier(...)` strings, so each curve exists twice:
 *  1. As a named CustomEase (used by GSAP tweens: ease: "outExpo").
 *  2. As the raw bezier coordinates below (used by CSS via the --ease-* tokens
 *     in globals.css).
 *
 * KEEP IN SYNC with the --ease-* tokens in src/app/globals.css.
 */
import { CustomEase } from "gsap/CustomEase";

/** cubic-bezier control points, mirrored from globals.css --ease-* tokens. */
const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutBook: [0.76, 0, 0.24, 1],
  snap: [0.33, 1, 0.68, 1],
} as const;

/** Convert cubic-bezier control points to a CustomEase SVG path string. */
function bezierToPath([x1, y1, x2, y2]: readonly number[]): string {
  return `M0,0 C${x1},${y1} ${x2},${y2} 1,1`;
}

/**
 * Register every house curve as a named CustomEase. Invoked once, client-side,
 * from src/lib/gsap.ts.
 */
export function registerHouseEases(): void {
  for (const [name, points] of Object.entries(EASE)) {
    CustomEase.create(name, bezierToPath(points));
  }
}
