"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query. SSR-safe: returns `serverFallback` during
 * server render and initial hydration, then the real match after mount.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/** True when the user has requested reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

/** True on coarse (touch) pointers — used to disable magnetic/cursor effects. */
export function useCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)", false);
}
