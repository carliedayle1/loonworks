"use client";

import { useRef } from "react";

import { gsap } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up to `value` with an eased curve when scrolled into view (once).
 *
 * FOUC-safe: the final value is rendered in the DOM, so no-JS and reduced-motion
 * visitors see the real number. The count-up only runs inside the motion-gated
 * useAnimation callback.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useAnimation(
    ({ root }) => {
      const proxy = { n: 0 };
      const render = () => {
        root.textContent = `${prefix}${Math.round(proxy.n).toLocaleString()}${suffix}`;
      };
      render();
      gsap.to(proxy, {
        n: value,
        duration,
        ease: "outExpo",
        onUpdate: render,
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
