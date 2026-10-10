import { projects } from "@/content/site";
import { Plate } from "@/components/ui/Plate";

// Row one: the two biggest builds, large. Row two flips the widths.
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1280px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-[750]">Selected work</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
        {projects.map((project, i) => (
          <div key={project.slug} className={SPANS[i]}>
            <Plate project={project} size={i < 2 ? "lg" : "sm"} />
          </div>
        ))}
      </div>
    </section>
  );
}
