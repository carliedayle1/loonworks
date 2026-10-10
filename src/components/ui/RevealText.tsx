"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { gsap, SplitText } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";

type SplitMode = "lines" | "words" | "chars";

type RevealTextProps = {
  as?: ElementType;
  /** Granularity of the reveal. All modes mask by line for a clean rise. */
  split?: SplitMode;
  /** Start the reveal on scroll-into-view (default) or immediately on mount. */
  trigger?: "scroll" | "mount";
  stagger?: number;
  delay?: number;
  /** Only play once (default true). */
  once?: boolean;
  className?: string;
  children: ReactNode;
};

const TYPE_MAP: Record<SplitMode, string> = {
  lines: "lines",
  words: "lines,words",
  chars: "lines,chars",
};

const DEFAULT_STAGGER: Record<SplitMode, number> = {
  lines: 0.12,
  words: 0.045,
  chars: 0.02,
};

/**
 * Reveals text by rising it up from behind a masked baseline — the single most
 * "premium-reading" text motion. Uses GSAP SplitText with `mask: "lines"`.
 *
 * Content is always rendered visibly in the DOM; the hidden start state is set
 * only inside the (motion-gated) animation. So reduced-motion, no-JS, and
 * crawlers all see the full text. SplitText's `aria: "auto"` keeps the
 * accessible text intact after splitting.
 */
export function RevealText({
  as = "span",
  split = "lines",
  trigger = "scroll",
  stagger,
  delay = 0,
  once = true,
  className,
  children,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useAnimation(
    ({ root }) => {
      const unit = split;
      const step = stagger ?? DEFAULT_STAGGER[unit];

      const instance = SplitText.create(root, {
        type: TYPE_MAP[unit],
        mask: "lines",
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          const targets =
            unit === "lines" ? self.lines : unit === "words" ? self.words : self.chars;
          return gsap.from(targets, {
            yPercent: 115,
            duration: 0.95,
            ease: "outExpo",
            stagger: step,
            delay,
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: root, start: "top 82%", once }
                : undefined,
          });
        },
      });

      return () => instance.revert();
    },
    { scope: ref, dependencies: [split, trigger] },
  );

  const Tag = as;
  return (
    <Tag ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  );
}
