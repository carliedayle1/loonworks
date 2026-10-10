"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Smooth scroll wiring for the App Router.
 *
 * Lenis and GSAP share ONE requestAnimationFrame loop: Lenis runs with
 * `autoRaf: false` and is driven by GSAP's ticker, and every Lenis scroll
 * event pushes ScrollTrigger.update(). This is the canonical integration and
 * avoids two competing rAF loops.
 *
 * `anchors: true` lets Lenis handle in-page `#id` links; it honours each
 * target's `scroll-margin-top`, which globals.css sets for the sticky header.
 *
 * Under reduced motion we do not instantiate Lenis at all — native scrolling is
 * used, and ScrollTrigger works fine on it.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      anchors: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    // Pins add spacer height that Lenis's ResizeObserver can miss; re-measure
    // whenever ScrollTrigger refreshes (after pins are built, fonts, routes).
    const remeasure = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", remeasure);

    // Dev-only handle for debugging/tooling (e.g. driving scroll in previews).
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = instance;
    }

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fonts change text metrics; re-measure all triggers once they load.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      cancelled = true;
      ScrollTrigger.removeEventListener("refresh", remeasure);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Remember where the visitor was, so a reload or Back can put them there
  // again (the browser's own restore runs before the pin spacer exists).
  useEffect(() => {
    const save = () => {
      try {
        sessionStorage.setItem(`scroll:${window.location.pathname}`, String(Math.round(window.scrollY)));
      } catch {
        // Storage blocked (private mode): fall back to the browser's restore.
      }
    };
    window.addEventListener("pagehide", save);
    return () => window.removeEventListener("pagehide", save);
  }, []);

  // On first load and route change: re-measure triggers, then jump to the
  // saved position (reload / Back), the #hash target, or the top. The browser
  // applies hashes and restores scroll before hydration, i.e. before pins add
  // their spacer height, so both have to be re-applied here.
  const firstRun = useRef(true);
  useEffect(() => {
    ScrollTrigger.refresh();
    const instance = lenisRef.current;
    const jump = (target: number | HTMLElement) => {
      if (instance) {
        instance.scrollTo(target, { immediate: true, force: true });
      } else if (typeof target === "number") {
        window.scrollTo(0, target);
      } else {
        target.scrollIntoView();
      }
    };

    const isFirstRun = firstRun.current;
    firstRun.current = false;
    const saved = isFirstRun ? savedScroll() : null;
    const hashTarget = window.location.hash
      ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      : null;

    if (saved !== null) {
      jump(saved);
    } else if (hashTarget) {
      jump(hashTarget);
    } else if (!isFirstRun) {
      jump(0);
    }
  }, [pathname]);

  return <>{children}</>;
}

/** Saved scrollY for this page, only when it was reloaded or reached via Back/Forward. */
function savedScroll(): number | null {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (nav?.type !== "reload" && nav?.type !== "back_forward") return null;
  try {
    const value = sessionStorage.getItem(`scroll:${window.location.pathname}`);
    return value === null ? null : Number(value);
  } catch {
    return null;
  }
}
