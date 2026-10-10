/* eslint-disable @next/next/no-img-element -- static export, images are pre-sized */
import type { Project } from "@/content/site";
import { GearIcon } from "@/components/ui/GearIcon";
import { PlateArt } from "@/components/ui/PlateArt";
import { cn } from "@/lib/utils";

export function KindTag({ kind }: { kind: Project["kind"] }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[6px] bg-enamel/[0.07] px-2.5 py-1 text-[0.8125rem] font-semibold">
      <span aria-hidden="true" className={cn("size-2.5 rounded-full", kind === "ai" ? "bg-teal" : "bg-enamel")} />
      {kind === "ai" ? "AI automation" : "Web"}
    </span>
  );
}

/** A project as a riveted tin plate; the whole plate links to its case study. */
export function Plate({ project, size }: { project: Project; size: "lg" | "sm" }) {
  const { slug, title, pitch, stack, image, art, kind } = project;
  return (
    <article className="plate group relative flex h-full flex-col overflow-hidden transition-transform duration-300 ease-snap focus-within:-translate-y-0.5 hover:-translate-y-0.5 has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-enamel has-[a:focus-visible]:outline-solid">
      <div className="aspect-[16/10] overflow-hidden bg-enamel">
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        ) : (
          art && <PlateArt kind={art} />
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8 pt-6 md:px-8">
        <div className="flex items-center justify-between">
          <KindTag kind={kind} />
          <GearIcon className="size-6 text-enamel/30 transition-transform duration-500 ease-snap group-focus-within:rotate-45 group-hover:rotate-45" />
        </div>
        <h3 className={cn("mt-5 font-bold", size === "lg" ? "text-[clamp(1.6rem,2.6vw,2.2rem)]" : "text-[1.6rem]")}>
          {title}
        </h3>
        <p className="mt-3 max-w-[56ch] text-enamel/85">{pitch}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
          {stack.slice(0, 4).map((item) => (
            <li key={item} className="rounded-[6px] px-2 py-0.5 text-[0.8125rem] shadow-[inset_0_0_0_1px_rgb(31_42_68/0.18)]">
              {item}
            </li>
          ))}
        </ul>
        <a
          href={`/work/${slug}/`}
          className="mt-auto pt-7 font-semibold underline decoration-2 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] focus-visible:shadow-none! focus-visible:outline-none!"
        >
          Read the case study
          <span className="sr-only">: {title}</span>
        </a>
      </div>
    </article>
  );
}
