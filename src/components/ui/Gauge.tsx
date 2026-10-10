"use client";

import { useRef } from "react";

import type { Stat } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const CX = 100;
const CY = 104;
const TICKS = Array.from({ length: 11 }, (_, i) => -90 + i * 18);

/** Tin dial. The needle's final angle is in the markup; the sweep only plays with motion allowed. */
export function Gauge({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const angle = -90 + (180 * Math.min(stat.value, stat.max)) / stat.max;

  useAnimation(
    ({ root }) => {
      gsap.fromTo(
        root.querySelector("[data-needle]"),
        { rotation: -90, svgOrigin: `${CX} ${CY}` },
        {
          rotation: angle,
          svgOrigin: `${CX} ${CY}`,
          duration: 1.6,
          ease: "outExpo",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="text-center">
      <svg viewBox="0 0 200 118" aria-hidden="true" className="mx-auto w-full max-w-[220px]">
        <path d={`M14 ${CY} A86 86 0 0 1 186 ${CY} Z`} fill="var(--color-paper)" stroke="var(--color-mustard)" strokeWidth="4" />
        {TICKS.map((t, i) => {
          const rad = ((t - 90) * Math.PI) / 180;
          const inner = i % 5 === 0 ? 62 : 70;
          return (
            <line
              key={t}
              x1={CX + inner * Math.cos(rad)}
              y1={CY + inner * Math.sin(rad)}
              x2={CX + 78 * Math.cos(rad)}
              y2={CY + 78 * Math.sin(rad)}
              stroke="var(--color-enamel)"
              strokeWidth={i % 5 === 0 ? 4 : 2.5}
              strokeLinecap="round"
            />
          );
        })}
        <g data-needle transform={`rotate(${angle} ${CX} ${CY})`}>
          <path d={`M${CX} ${CY} V${CY - 66}`} stroke="var(--color-enamel)" strokeWidth="9" strokeLinecap="round" />
          <path d={`M${CX} ${CY} V${CY - 64}`} stroke="var(--color-tomato)" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle cx={CX} cy={CY} r="9" fill="var(--color-enamel)" />
      </svg>
      <p className="mt-3 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-paper">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mx-auto mt-1 max-w-[26ch] text-paper/80">{stat.label}</p>
    </div>
  );
}
