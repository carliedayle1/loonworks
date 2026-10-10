"use client";

import { useRef } from "react";

import { closingLine, hero, profile, stations } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { RevealText } from "@/components/ui/RevealText";

import { Contraption, GEARS } from "./Contraption";

/**
 * The one signature moment: the hero pins, and scrolling runs the ball through
 * the four stations. Everything here is visible in markup; the animation only
 * dims and hides things inside useAnimation (reduced motion and no-JS get the
 * finished diagram with every caption showing).
 */
export function MachineHero() {
  const ref = useRef<HTMLElement>(null);

  useAnimation(
    ({ root }) => {
      // ponytail: breakpoint read once per build; crossing 768px mid-session keeps the old pin length until reload.
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const q = gsap.utils.selector(root);
      const captions = q("[data-caption]");
      const lamps = q(".lamp");
      const dim = isMobile ? 0 : 0.25;

      root.classList.add("is-running");

      gsap.from("#ball-drop", { y: -240, duration: 1.1, ease: "bounce.out", delay: 0.35 });

      gsap.set(lamps, { fill: "var(--color-tin-deep)" });
      gsap.set(captions, { autoAlpha: dim });
      gsap.set("[data-closing]", { autoAlpha: 0 });
      gsap.set("#stamp", { scale: 0, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: isMobile ? "+=180%" : "+=250%",
          pin: true,
          scrub: 0.6,
        },
      });

      tl.to("[data-intro]", { autoAlpha: 0.35, y: -24, duration: 0.6 }, 0);
      tl.to("[data-hint]", { autoAlpha: 0, duration: 0.3 }, 0);

      for (let i = 0; i < 4; i++) {
        const seg = `#seg${i + 1}`;
        tl.to("#ball", { motionPath: { path: seg, align: seg, alignOrigin: [0.5, 0.5] }, duration: 1 });
        tl.to(lamps[i], { fill: "var(--color-teal)", duration: 0.12 });
        tl.to(captions[i], { autoAlpha: 1, duration: 0.2 }, "<");
        if (i > 0) tl.to(captions[i - 1], { autoAlpha: isMobile ? 0 : 0.6, duration: 0.2 }, "<");
      }

      tl.to("#stamp", { scale: 1, ease: "back.out(2)", duration: 0.35 });
      tl.to("[data-closing]", { autoAlpha: 1, duration: 0.3 }, "<");
      if (isMobile) tl.to(captions[3], { autoAlpha: 0, duration: 0.2 }, "<");

      const total = tl.duration();
      tl.to("#gearA", { rotation: 540, svgOrigin: `${GEARS.gearA.cx} ${GEARS.gearA.cy}`, duration: total }, 0);
      tl.to("#gearB", { rotation: -720, svgOrigin: `${GEARS.gearB.cx} ${GEARS.gearB.cy}`, duration: total }, 0);
      tl.to("#gearC", { rotation: 600, svgOrigin: `${GEARS.gearC.cx} ${GEARS.gearC.cy}`, duration: total }, 0);

      return () => root.classList.remove("is-running");
    },
    { scope: ref },
  );

  return (
    <section
      id="top"
      ref={ref}
      className="machine-hero relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-8"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        <div data-intro className="grid items-end gap-6 md:grid-cols-12 md:gap-8">
          <RevealText
            as="h1"
            split="lines"
            trigger="mount"
            className="text-[clamp(2.3rem,min(5vw,8svh),4.4rem)] font-[750] md:col-span-8"
          >
            {hero.title}
          </RevealText>
          <div className="md:col-span-4 md:pb-2">
            <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-enamel/85">{hero.sub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 rounded-full bg-enamel px-6 py-3.5 font-semibold text-paper transition-transform duration-300 ease-snap hover:-translate-y-0.5"
              >
                <span aria-hidden="true" className="size-3 rounded-full bg-tomato ring-2 ring-paper/30" />
                See my work
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center rounded-full px-6 py-3.5 font-semibold shadow-[inset_0_0_0_2px_var(--color-enamel)] transition-colors duration-300 ease-snap hover:bg-enamel hover:text-paper"
              >
                Email me
              </a>
            </div>
            <p data-hint className="mt-5 flex items-center gap-2 motion-reduce:hidden text-sm font-semibold text-enamel/70">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
                <circle cx="8" cy="8" r="6.5" fill="var(--color-tomato)" />
              </svg>
              {hero.hint}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full md:max-w-[calc(36svh*3)]">
          <Contraption className="block h-auto w-full" />

          <div className="caption-slot mt-6 grid md:mt-4">
            <ol className="stations grid gap-4 md:grid-cols-4 md:gap-6">
              {stations.map((text, i) => (
                <li key={text} data-caption className="flex gap-3 md:block md:text-center">
                  <span className="font-display text-sm font-bold text-teal md:mb-1 md:block">{i + 1}</span>
                  <span className="text-[1.0625rem] font-medium leading-snug md:mx-auto md:block md:max-w-[22ch]">
                    {text}
                  </span>
                </li>
              ))}
            </ol>

            <p data-closing className="mt-6 font-display text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold md:mt-8 md:text-right">
              {closingLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
