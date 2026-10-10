"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type AnimationScope = RefObject<Element | null>;

type UseAnimationOptions = {
  /** Ref to the section root — scopes all selector text and auto-cleanup. */
  scope: AnimationScope;
  /** Re-run the build when these change (same semantics as useGSAP). */
  dependencies?: unknown[];
};

/**
 * The sanctioned way to build GSAP animations in a component.
 *
 * The `build` callback runs ONLY when the user has no motion preference, via
 * gsap.matchMedia("(prefers-reduced-motion: no-preference)"). matchMedia also
 * auto-reverts everything created inside it if the preference flips at runtime.
 *
 * Because the callback is skipped under reduced motion, the non-negotiable
 * convention is: never hide content in CSS/markup. Set initial hidden states
 * with gsap.set() INSIDE this callback, so reduced-motion, no-JS, and crawler
 * cases all see fully visible content for free.
 *
 * useGSAP's scoped context handles teardown (killing tweens/ScrollTriggers) on
 * unmount — section code never cleans up manually.
 */
export function useAnimation(
  build: (context: {
    /** Scoped gsap timeline/tween factory (selectors resolve within scope). */
    self: typeof gsap;
    /** The resolved scope element (guaranteed non-null inside the callback). */
    root: Element;
  }) => void | (() => void),
  { scope, dependencies = [] }: UseAnimationOptions,
): void {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) {
          return;
        }
        return build({ self: gsap, root });
      });
      return () => mm.revert();
    },
    { scope, dependencies },
  );
}
