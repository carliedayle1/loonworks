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

  // On route change, re-measure triggers for the new document, then jump to the
  // #hash target or the top. The browser applies a hash before hydration, i.e.
  // before pins add their spacer height, so it has to be re-applied here.
  useEffect(() => {
    ScrollTrigger.refresh();
    const instance = lenisRef.current;
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) {
      if (instance) {
        instance.scrollTo(target, { immediate: true, force: true });
      } else {
        target.scrollIntoView();
      }
    } else if (instance) {
      instance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
